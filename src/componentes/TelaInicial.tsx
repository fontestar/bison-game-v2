import { useState } from "react";
import { Bisao } from "./Bisao";
import { NOMES_PADRAO, TEMAS } from "../game/equipes";
import { perguntas } from "../data/perguntas";

interface TelaInicialProps {
  nomesIniciais: string[];
  mudo: boolean;
  onAlternarSom: () => void;
  onComecar: (nomes: string[]) => void;
}

export function TelaInicial({
  nomesIniciais,
  mudo,
  onAlternarSom,
  onComecar,
}: TelaInicialProps) {
  const [nomes, setNomes] = useState<string[]>(nomesIniciais);

  const atualizar = (i: number, v: string) =>
    setNomes((n) => n.map((item, idx) => (idx === i ? v : item)));

  const comecar = () =>
    onComecar(nomes.map((n, i) => (n.trim() === "" ? NOMES_PADRAO[i] : n.trim())));

  return (
    <div className="linhas-fundo flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* Logotipo */}
        <div className="anim-rise mb-12 flex items-center gap-5">
          <Bisao className="anim-float h-20 w-20 shrink-0 sm:h-24 sm:w-24" />
          <div>
            <p className="font-display text-[0.7rem] font-semibold tracking-[0.4em] text-creme-400 uppercase">
              Revisão de Geografia
            </p>
            <h1 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-creme-100 sm:text-6xl">
              Jogo do <span className="text-mostarda-400">Bisão</span>
            </h1>
          </div>
        </div>

        {/* Equipes */}
        <div className="anim-rise" style={{ animationDelay: "80ms" }}>
          <p className="font-display mb-4 text-[0.7rem] font-semibold tracking-[0.3em] text-creme-400 uppercase">
            Nome das equipes
          </p>

          <div className="flex flex-col divide-y divide-creme-100/8 border-y border-creme-100/8">
            {nomes.map((nome, i) => (
              <div key={i} className="flex items-stretch">
                <span
                  className="w-1.5 shrink-0"
                  style={{ background: TEMAS[i].cor }}
                />
                <span className="font-display grid w-14 shrink-0 place-items-center text-xl font-bold text-creme-400">
                  {i + 1}
                </span>
                <input
                  value={nome}
                  onChange={(e) => atualizar(i, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && comecar()}
                  maxLength={24}
                  placeholder={NOMES_PADRAO[i]}
                  className="font-display w-full bg-transparent py-4 pr-4 text-2xl font-semibold text-creme-100 placeholder:text-creme-100/20 focus:outline-none sm:text-3xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div
          className="anim-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "160ms" }}
        >
          <button
            onClick={comecar}
            className="font-display flex-1 rounded-md bg-mostarda-400 px-8 py-4 text-xl font-bold tracking-tight text-couro-950 transition hover:bg-mostarda-300"
          >
            Começar partida
          </button>
          <button
            onClick={onAlternarSom}
            className="font-display rounded-md border border-creme-100/15 px-5 py-4 text-sm font-semibold tracking-wide text-creme-300 uppercase transition hover:border-creme-100/35 hover:text-creme-100"
          >
            Som: {mudo ? "off" : "on"}
          </button>
        </div>

        <div
          className="anim-rise mt-10 border-t border-creme-100/8 pt-5"
          style={{ animationDelay: "220ms" }}
        >
          <p className="font-display mb-3 text-[0.65rem] font-semibold tracking-[0.3em] text-creme-400 uppercase">
            Temas da rodada
          </p>
          <ol className="space-y-1.5 text-sm text-creme-300 sm:text-base">
            <li className="flex gap-3">
              <span className="font-display shrink-0 text-mostarda-400">01</span>
              {perguntas.assunto1.nome}
            </li>
            <li className="flex gap-3">
              <span className="font-display shrink-0 text-mostarda-400">02</span>
              {perguntas.assunto2.nome}
            </li>
          </ol>
          <p className="mt-4 text-xs text-creme-400 sm:text-sm">
            18 perguntas + 6 cartas especiais, sorteadas nas 24 posições a cada
            partida.
          </p>
        </div>
      </div>
    </div>
  );
}
