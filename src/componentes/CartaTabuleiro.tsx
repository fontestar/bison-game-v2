import { BisaoSilhueta } from "./Bisao";
import { IconeEspecial } from "./Icones";
import {
  ESPECIAIS,
  ROTULO_DIFICULDADE,
  type Carta,
  type CartaEspecial,
  type CartaPergunta,
  type Dificuldade,
} from "../game/deck";
import { TEMAS } from "../game/equipes";

export interface ResultadoCarta {
  equipe: number;
  acertou: boolean | null;
  delta: number;
}

interface CartaTabuleiroProps {
  numero: number;
  carta: Carta;
  virada: boolean;
  usada: boolean;
  bloqueada: boolean;
  resultado?: ResultadoCarta;
  atraso?: number;
  onClick: () => void;
}

export const CORES_DIF: Record<Dificuldade, string> = {
  facil: "#4faa7b",
  media: "#f0b429",
  dificil: "#e2683c",
};

export function CartaTabuleiro({
  numero,
  carta,
  virada,
  usada,
  bloqueada,
  resultado,
  atraso = 0,
  onClick,
}: CartaTabuleiroProps) {
  const pergunta = carta.tipo === "pergunta" ? (carta as CartaPergunta) : null;
  const especial = carta.tipo === "especial" ? (carta as CartaEspecial) : null;
  const info = especial ? ESPECIAIS[especial.especial] : null;
  const cor = pergunta ? CORES_DIF[pergunta.dificuldade] : (info?.cor ?? "#7a5539");

  return (
    <div
      className="flip-scene anim-rise aspect-[4/3] w-full lg:aspect-auto lg:h-full"
      style={{ animationDelay: `${atraso}ms` }}
    >
      <button
        type="button"
        disabled={bloqueada}
        onClick={onClick}
        aria-label={`Carta ${numero}`}
        className={`group h-full w-full rounded-md transition-transform duration-150 ${
          bloqueada ? "cursor-default" : "cursor-pointer hover:-translate-y-1"
        } ${usada ? "opacity-35" : ""}`}
      >
        <div className={`flip-inner ${virada ? "is-flipped" : ""}`}>
          {/* ---------- VERSO ---------- */}
          <div className="flip-face border border-creme-100/12 bg-couro-850 transition-colors group-hover:border-mostarda-400/60 group-hover:bg-couro-800">
            <BisaoSilhueta className="absolute -right-4 -bottom-5 h-3/4 w-3/4 text-creme-100/4" />
            <div className="relative flex h-full items-center justify-center">
              <span className="font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-none font-extrabold text-creme-200/85 tabular-nums transition-colors group-hover:text-mostarda-300">
                {numero}
              </span>
            </div>
          </div>

          {/* ---------- FRENTE ---------- */}
          <div
            className="flip-face--back flip-face border bg-couro-900"
            style={{ borderColor: `${cor}88` }}
          >
            <span
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: cor }}
            />
            <div className="flex h-full flex-col items-center justify-center gap-1.5 px-2 text-center">
              {pergunta ? (
                <>
                  <span
                    className="font-display text-[clamp(1.3rem,2.6vw,2.1rem)] leading-none font-extrabold"
                    style={{ color: cor }}
                  >
                    {pergunta.pontos}
                  </span>
                  <span className="font-display text-[0.58rem] font-semibold tracking-[0.2em] text-creme-400 uppercase">
                    {ROTULO_DIFICULDADE[pergunta.dificuldade]}
                  </span>
                </>
              ) : (
                especial && (
                  <>
                    <span style={{ color: cor }}>
                      <IconeEspecial
                        tipo={especial.especial}
                        className="h-6 w-6 sm:h-8 sm:w-8"
                      />
                    </span>
                    <span
                      className="font-display text-[clamp(0.85rem,1.6vw,1.25rem)] leading-none font-bold"
                      style={{ color: cor }}
                    >
                      {info?.curto}
                    </span>
                  </>
                )
              )}

              {resultado && (
                <span
                  className="font-display absolute inset-x-0 bottom-0 py-0.5 text-[0.6rem] font-bold tracking-wide"
                  style={{
                    background: TEMAS[resultado.equipe].cor,
                    color: TEMAS[resultado.equipe].texto,
                  }}
                >
                  {resultado.acertou === null
                    ? "—"
                    : resultado.acertou
                      ? "Certo"
                      : "Errado"}
                  {resultado.delta !== 0 &&
                    ` ${resultado.delta > 0 ? "+" : ""}${resultado.delta}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
