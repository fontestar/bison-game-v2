import { useCallback, useEffect, useRef, useState } from "react";
import { Bisao } from "./components/Bisao";
import {
  CartaTabuleiro,
  type ResultadoCarta,
} from "./components/CartaTabuleiro";
import { Confete } from "./components/Confete";
import { ModalEspecial, ModalPergunta } from "./components/ModalCarta";
import { Placar } from "./components/Placar";
import { TelaFinal } from "./components/TelaFinal";
import { TelaInicial } from "./components/TelaInicial";
import {
  montarTabuleiro,
  type Carta,
  type CartaEspecial,
  type CartaPergunta,
} from "./game/deck";
import { NOMES_PADRAO, type Equipe } from "./game/equipes";
import { tocar } from "./game/sound";

const TOTAL_CARTAS = 24;
const vazio = () => Array<boolean>(TOTAL_CARTAS).fill(false);

export default function App() {
  /* ------------------------------- estado ------------------------------- */
  const [tela, setTela] = useState<"inicio" | "jogo">("inicio");
  const [nomes, setNomes] = useState<string[]>(NOMES_PADRAO);
  const [equipes, setEquipes] = useState<Equipe[]>(() =>
    NOMES_PADRAO.map((n, i) => ({ id: i, nome: n, pontos: 0 })),
  );
  const [vez, setVez] = useState(0);
  const [cartas, setCartas] = useState<Carta[]>(() => montarTabuleiro());
  const [viradas, setViradas] = useState<boolean[]>(vazio);
  const [usadas, setUsadas] = useState<boolean[]>(vazio);
  const [resultados, setResultados] = useState<Record<number, ResultadoCarta>>(
    {},
  );
  const [aberta, setAberta] = useState<number | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [resumoEspecial, setResumoEspecial] = useState("");
  const [mudo, setMudo] = useState(false);
  const [fim, setFim] = useState(false);
  const [confirmarNova, setConfirmarNova] = useState(false);
  const [confeteGatilho, setConfeteGatilho] = useState(0);
  const [confeteIntensidade, setConfeteIntensidade] = useState(120);

  const timer = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const proxima = (vez + 1) % 3;
  const restantes = usadas.filter((u) => !u).length;

  const soltarConfete = useCallback((n: number) => {
    setConfeteIntensidade(n);
    setConfeteGatilho((c) => c + 1);
  }, []);

  /* --------------------------- nova partida ----------------------------- */
  const iniciarPartida = (novosNomes: string[]) => {
    setNomes(novosNomes);
    setEquipes(novosNomes.map((n, i) => ({ id: i, nome: n, pontos: 0 })));
    setCartas(montarTabuleiro()); // <<< sorteio das 24 posições
    setViradas(vazio());
    setUsadas(vazio());
    setResultados({});
    setAberta(null);
    setModalVisivel(false);
    setVez(0);
    setFim(false);
    setConfirmarNova(false);
    setTela("jogo");
  };

  const voltarParaConfiguracao = () => {
    setConfirmarNova(false);
    setFim(false);
    setAberta(null);
    setModalVisivel(false);
    setTela("inicio");
  };

  /* ---------------------- abrir carta (flip + modal) --------------------- */
  const abrirCarta = (i: number) => {
    if (usadas[i] || aberta !== null || fim) return;
    tocar("flip", mudo);
    setViradas((v) => v.map((x, idx) => (idx === i ? true : x)));
    setAberta(i);
    timer.current = window.setTimeout(() => {
      const carta = cartas[i];
      if (carta.tipo === "especial") aplicarEspecial(carta, i);
      setModalVisivel(true);
    }, 560);
  };

  /* -------------------- efeitos das cartas especiais --------------------- */
  const aplicarEspecial = (carta: CartaEspecial, indice: number) => {
    const atual = vez;
    const prox = (vez + 1) % 3;
    let delta = 0;
    let resumo = "";

    switch (carta.especial) {
      case "perde10":
        delta = -10;
        resumo = `${equipes[atual].nome} −10`;
        break;
      case "ganha10":
        delta = 10;
        resumo = `${equipes[atual].nome} +10`;
        break;
      case "ganha20":
        delta = 20;
        resumo = `${equipes[atual].nome} +20`;
        break;
      case "passa10":
        delta = -10;
        resumo = `${equipes[atual].nome} −10  →  ${equipes[prox].nome} +10`;
        break;
      case "passaVez":
        delta = 0;
        resumo = "Nenhuma mudança no placar";
        break;
    }

    setEquipes((es) =>
      es.map((e, idx) => {
        if (idx === atual) return { ...e, pontos: e.pontos + delta };
        if (idx === prox && carta.especial === "passa10")
          return { ...e, pontos: e.pontos + 10 };
        return e;
      }),
    );

    setResumoEspecial(resumo);
    setResultados((r) => ({
      ...r,
      [indice]: {
        equipe: atual,
        acertou: delta === 0 ? null : delta > 0,
        delta,
      },
    }));

    if (carta.especial === "ganha20") {
      tocar("bom", mudo);
      soltarConfete(140);
    } else if (carta.especial === "ganha10") {
      tocar("bom", mudo);
      soltarConfete(50);
    } else if (carta.especial === "passaVez") {
      tocar("turno", mudo);
    } else {
      tocar("ruim", mudo);
    }
  };

  /* ---------------- equipe marca a alternativa escolhida ----------------- */
  const responderPergunta = (acertou: boolean) => {
    if (aberta === null) return;
    const carta = cartas[aberta] as CartaPergunta;
    const ganho = acertou ? carta.pontos : 0;

    setEquipes((es) =>
      es.map((e, idx) => (idx === vez ? { ...e, pontos: e.pontos + ganho } : e)),
    );
    setResultados((r) => ({
      ...r,
      [aberta]: { equipe: vez, acertou, delta: ganho },
    }));

    if (acertou) {
      tocar("acerto", mudo);
      soltarConfete(carta.dificuldade === "dificil" ? 170 : 60);
    } else {
      tocar("erro", mudo);
    }
  };

  /* ----------------- fechar carta, marcar usada, passar vez -------------- */
  const fecharCarta = () => {
    if (aberta === null) return;
    const i = aberta;
    const novasUsadas = usadas.map((u, idx) => (idx === i ? true : u));
    setUsadas(novasUsadas);
    setModalVisivel(false);
    setAberta(null);

    if (novasUsadas.every(Boolean)) {
      timer.current = window.setTimeout(() => {
        setFim(true);
        soltarConfete(220);
        tocar("vitoria", mudo);
      }, 500);
    } else {
      setVez((v) => (v + 1) % 3);
      tocar("turno", mudo);
    }
  };

  /* -------------------------------- telas -------------------------------- */
  if (tela === "inicio") {
    return (
      <>
        <TelaInicial
          nomesIniciais={nomes}
          mudo={mudo}
          onAlternarSom={() => setMudo((m) => !m)}
          onComecar={iniciarPartida}
        />
        <Confete gatilho={confeteGatilho} intensidade={confeteIntensidade} />
      </>
    );
  }

  const cartaAberta = aberta !== null ? cartas[aberta] : null;

  return (
    <div className="linhas-fundo flex min-h-screen flex-col">
      {/* ============================ CABEÇALHO ============================ */}
      <header className="sticky top-0 z-40 border-b border-creme-100/8 bg-couro-950/90 px-4 py-2.5 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex shrink-0 items-center gap-3">
            <Bisao className="h-9 w-9 sm:h-11 sm:w-11" />
            <div className="leading-none">
              <h1 className="font-display text-lg leading-none font-extrabold tracking-tight text-creme-100 sm:text-2xl">
                Jogo do <span className="text-mostarda-400">Bisão</span>
              </h1>
              <span className="font-display text-[0.6rem] font-semibold tracking-[0.25em] text-creme-400 uppercase">
                {restantes} de 24 cartas
              </span>
            </div>
          </div>

          <div className="order-3 w-full lg:order-2 lg:w-auto lg:max-w-3xl lg:flex-1">
            <Placar equipes={equipes} vez={vez} />
          </div>

          <div className="order-2 ml-auto flex shrink-0 items-center gap-2 lg:order-3">
            {restantes === 0 && !fim && (
              <button
                onClick={() => setFim(true)}
                className="font-display rounded-md border border-mostarda-400/50 px-3 py-2 text-xs font-semibold tracking-wide text-mostarda-300 uppercase transition hover:bg-mostarda-400/10"
              >
                Resultado
              </button>
            )}
            <button
              onClick={() => setMudo((m) => !m)}
              title="Ligar/desligar som"
              className="font-display rounded-md border border-creme-100/12 px-3 py-2 text-xs font-semibold tracking-wide text-creme-400 uppercase transition hover:border-creme-100/30 hover:text-creme-100"
            >
              Som {mudo ? "off" : "on"}
            </button>
            <button
              onClick={() => setConfirmarNova(true)}
              className="font-display rounded-md border border-creme-100/12 px-3 py-2 text-xs font-semibold tracking-wide text-creme-400 uppercase transition hover:border-creme-100/30 hover:text-creme-100"
            >
              Nova partida
            </button>
          </div>
        </div>
      </header>

      {/* ============================ TABULEIRO ============================ */}
      <main className="mx-auto w-full max-w-[1700px] flex-1 px-4 py-4 sm:px-6 sm:py-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-2.5 lg:h-[calc(100dvh-11rem)] lg:min-h-[380px] lg:grid-cols-6 lg:grid-rows-4">
          {cartas.map((carta, i) => (
            <CartaTabuleiro
              key={carta.id}
              numero={i + 1}
              carta={carta}
              virada={viradas[i]}
              usada={usadas[i]}
              bloqueada={usadas[i] || aberta !== null || fim}
              resultado={resultados[i]}
              atraso={i * 18}
              onClick={() => abrirCarta(i)}
            />
          ))}
        </div>
      </main>

      {/* ============================== MODAIS ============================= */}
      {modalVisivel && cartaAberta?.tipo === "pergunta" && aberta !== null && (
        <ModalPergunta
          carta={cartaAberta as CartaPergunta}
          numero={aberta + 1}
          equipeNome={equipes[vez].nome}
          equipeIndice={vez}
          proximaNome={equipes[proxima].nome}
          onResponder={responderPergunta}
          onFechar={fecharCarta}
        />
      )}

      {modalVisivel && cartaAberta?.tipo === "especial" && aberta !== null && (
        <ModalEspecial
          carta={cartaAberta as CartaEspecial}
          numero={aberta + 1}
          equipeNome={equipes[vez].nome}
          equipeIndice={vez}
          proximaNome={equipes[proxima].nome}
          resumo={resumoEspecial}
          onFechar={fecharCarta}
        />
      )}

      {fim && (
        <TelaFinal
          equipes={equipes}
          onNovaPartida={voltarParaConfiguracao}
          onVerTabuleiro={() => setFim(false)}
        />
      )}

      {/* ---------------------- confirmação nova partida ------------------- */}
      {confirmarNova && (
        <div className="anim-fade fixed inset-0 z-[95] flex items-center justify-center bg-couro-950/92 p-5 backdrop-blur-sm">
          <div className="anim-pop w-full max-w-md rounded-md border border-creme-100/12 bg-couro-900 p-7">
            <h3 className="font-display text-2xl font-bold text-creme-100">
              Começar uma nova partida?
            </h3>
            <p className="mt-2 text-base text-creme-300">
              O placar zera, as 24 cartas são sorteadas de novo e os nomes das
              equipes podem ser reconfigurados.
            </p>
            <div className="mt-7 flex gap-3">
              <button
                onClick={voltarParaConfiguracao}
                className="font-display flex-1 rounded-md bg-mostarda-400 px-5 py-3 text-base font-bold text-couro-950 transition hover:bg-mostarda-300"
              >
                Nova partida
              </button>
              <button
                onClick={() => setConfirmarNova(false)}
                className="font-display rounded-md border border-creme-100/15 px-5 py-3 text-sm font-semibold tracking-wide text-creme-300 uppercase transition hover:border-creme-100/35 hover:text-creme-100"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      <Confete gatilho={confeteGatilho} intensidade={confeteIntensidade} />
    </div>
  );
}
