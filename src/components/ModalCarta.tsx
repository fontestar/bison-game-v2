import { useCallback, useEffect, useState } from "react";
import {
  ESPECIAIS,
  ROTULO_DIFICULDADE,
  type CartaEspecial,
  type CartaPergunta,
} from "../game/deck";
import { TEMAS } from "../game/equipes";
import { CORES_DIF } from "./CartaTabuleiro";
import { IconeEspecial } from "./Icones";

const LETRAS = ["A", "B", "C", "D", "E"];

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="anim-fade fixed inset-0 z-[80] flex items-center justify-center bg-couro-950/92 p-4 backdrop-blur-sm sm:p-8">
      {children}
    </div>
  );
}

/* =======================================================================
 * CARTA DE PERGUNTA
 * ===================================================================== */
interface ModalPerguntaProps {
  carta: CartaPergunta;
  numero: number;
  equipeNome: string;
  equipeIndice: number;
  proximaNome: string;
  onResponder: (acertou: boolean) => void;
  onFechar: () => void;
}

export function ModalPergunta({
  carta,
  numero,
  equipeNome,
  equipeIndice,
  proximaNome,
  onResponder,
  onFechar,
}: ModalPerguntaProps) {
  const tema = TEMAS[equipeIndice];
  const cor = CORES_DIF[carta.dificuldade];
  const [escolhida, setEscolhida] = useState<number | null>(null);
  const respondida = escolhida !== null;
  const acertou = escolhida === carta.dados.correta;

  // Ajusta a densidade tipográfica conforme o tamanho do texto,
  // para que enunciados longos caibam na tela sem rolagem.
  const carga =
    carta.dados.pergunta.length + carta.dados.alternativas.join("").length;
  const nivel = carga > 800 ? 2 : carga > 600 ? 1 : 0;

  const clsEnunciado = [
    "text-[clamp(1.5rem,2.9vw,2.4rem)] mb-6",
    "text-[clamp(1.3rem,2.3vw,1.95rem)] mb-5",
    "text-[clamp(1.15rem,1.9vw,1.6rem)] mb-4",
  ][nivel];

  const clsAlternativa = [
    "text-[clamp(1rem,1.6vw,1.35rem)]",
    "text-[clamp(0.95rem,1.35vw,1.15rem)]",
    "text-[clamp(0.88rem,1.15vw,1.02rem)]",
  ][nivel];

  const clsCaixa = ["px-4 py-3", "px-4 py-2.5", "px-3.5 py-2"][nivel];
  const clsLetra = [
    "h-10 w-10 text-lg sm:h-11 sm:w-11 sm:text-xl",
    "h-9 w-9 text-base sm:h-10 sm:w-10 sm:text-lg",
    "h-8 w-8 text-sm sm:h-9 sm:w-9 sm:text-base",
  ][nivel];

  const responder = useCallback(
    (i: number) => {
      if (escolhida !== null) return;
      setEscolhida(i);
      onResponder(i === carta.dados.correta);
    },
    [escolhida, carta.dados.correta, onResponder],
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!respondida) {
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= 5) responder(n - 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onFechar();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [respondida, responder, onFechar]);

  return (
    <Overlay>
      <div className="anim-pop flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-md border border-creme-100/12 bg-couro-900">
        <span className="h-1 w-full shrink-0" style={{ background: cor }} />

        {/* topo */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-creme-100/8 px-5 py-3 sm:px-8">
          <p className="font-display text-[0.7rem] font-semibold tracking-[0.28em] text-creme-400 uppercase">
            Carta {String(numero).padStart(2, "0")} · {carta.assuntoNome} ·{" "}
            <span style={{ color: cor }}>
              {ROTULO_DIFICULDADE[carta.dificuldade]} — {carta.pontos} pts
            </span>
          </p>
          <p
            className="font-display rounded-sm px-3 py-1 text-sm font-bold sm:text-base"
            style={{ background: tema.cor, color: tema.texto }}
          >
            {equipeNome}
          </p>
        </div>

        {/* pergunta + alternativas */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <h2
            className={`font-display leading-tight font-bold text-creme-100 ${clsEnunciado}`}
          >
            {carta.dados.pergunta}
          </h2>

          <div className="grid gap-2">
            {carta.dados.alternativas.map((alt, i) => {
              const eCorreta = i === carta.dados.correta;
              const foiEscolhida = escolhida === i;

              let cardCls =
                "border-creme-100/10 bg-couro-850 text-creme-200 hover:border-mostarda-400/70 hover:bg-couro-800";
              let letraCls = "bg-creme-100/8 text-creme-300";

              if (respondida && eCorreta) {
                cardCls = "border-savana-400 bg-savana-500/18 text-creme-100";
                letraCls = "bg-savana-400 text-couro-950";
              } else if (respondida && foiEscolhida) {
                cardCls = "border-red-500/80 bg-red-900/25 text-creme-100";
                letraCls = "bg-red-500 text-white";
              } else if (respondida) {
                cardCls = "border-creme-100/8 bg-couro-850/50 text-creme-400";
              }

              return (
                <button
                  key={i}
                  onClick={() => responder(i)}
                  disabled={respondida}
                  className={`flex items-start gap-3.5 rounded-md border text-left transition-colors sm:gap-4 ${clsCaixa} ${cardCls} ${
                    respondida ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <span
                    className={`font-display grid shrink-0 place-items-center rounded-sm font-bold transition-colors ${clsLetra} ${letraCls}`}
                  >
                    {LETRAS[i]}
                  </span>
                  <span
                    className={`flex-1 leading-snug font-medium ${clsAlternativa}`}
                  >
                    {alt}
                  </span>
                  {respondida && eCorreta && (
                    <span className="font-display mt-1 shrink-0 text-xs font-bold tracking-widest text-savana-300 uppercase sm:text-sm">
                      Correta
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* rodapé */}
        {respondida && (
          <div className="anim-rise shrink-0 border-t border-creme-100/8">
            {carta.dados.explicacao && (
              <p className="max-h-40 overflow-y-auto border-b border-creme-100/8 px-5 py-3 text-sm leading-relaxed text-creme-300 sm:px-8 sm:text-base">
                <span className="font-display mr-2 text-xs font-bold tracking-[0.2em] text-mostarda-400 uppercase">
                  Por quê
                </span>
                {carta.dados.explicacao}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <p className="font-display text-lg font-bold sm:text-2xl">
                {acertou ? (
                  <span className="text-savana-300">
                    Resposta correta · +{carta.pontos} para {equipeNome}
                  </span>
                ) : (
                  <span className="text-red-300">
                    Resposta errada · 0 ponto para {equipeNome}
                  </span>
                )}
              </p>
              <button
                onClick={onFechar}
                autoFocus
                className="font-display rounded-md bg-mostarda-400 px-6 py-3 text-base font-bold text-couro-950 transition hover:bg-mostarda-300 sm:text-lg"
              >
                Vez de {proximaNome} →
              </button>
            </div>
          </div>
        )}
      </div>
    </Overlay>
  );
}

/* =======================================================================
 * CARTA ESPECIAL
 * ===================================================================== */
interface ModalEspecialProps {
  carta: CartaEspecial;
  numero: number;
  equipeNome: string;
  equipeIndice: number;
  proximaNome: string;
  resumo: string;
  onFechar: () => void;
}

export function ModalEspecial({
  carta,
  numero,
  equipeNome,
  equipeIndice,
  proximaNome,
  resumo,
  onFechar,
}: ModalEspecialProps) {
  const info = ESPECIAIS[carta.especial];
  const tema = TEMAS[equipeIndice];

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onFechar();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onFechar]);

  return (
    <Overlay>
      <div className="anim-pop w-full max-w-2xl overflow-hidden rounded-md border border-creme-100/12 bg-couro-900">
        <span className="block h-1 w-full" style={{ background: info.cor }} />

        <div className="flex items-center justify-between border-b border-creme-100/8 px-5 py-3 sm:px-8">
          <p className="font-display text-[0.7rem] font-semibold tracking-[0.28em] text-creme-400 uppercase">
            Carta {String(numero).padStart(2, "0")} · Especial
          </p>
          <p
            className="font-display rounded-sm px-3 py-1 text-sm font-bold sm:text-base"
            style={{ background: tema.cor, color: tema.texto }}
          >
            {equipeNome}
          </p>
        </div>

        <div className="px-6 py-9 text-center sm:px-10">
          <span style={{ color: info.cor }}>
            <IconeEspecial
              tipo={carta.especial}
              className="anim-float mx-auto h-14 w-14 sm:h-16 sm:w-16"
            />
          </span>
          <h2
            className="font-display mt-5 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-extrabold"
            style={{ color: info.cor }}
          >
            {info.titulo}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[clamp(0.95rem,1.4vw,1.15rem)] text-creme-300">
            {info.descricao}
          </p>
          <p className="font-display mt-6 border-y border-creme-100/8 py-3 text-[clamp(1rem,1.8vw,1.4rem)] font-bold text-creme-100">
            {resumo}
          </p>
          <button
            onClick={onFechar}
            autoFocus
            className="font-display mt-7 rounded-md bg-mostarda-400 px-7 py-3 text-base font-bold text-couro-950 transition hover:bg-mostarda-300 sm:text-lg"
          >
            Vez de {proximaNome} →
          </button>
        </div>
      </div>
    </Overlay>
  );
}
