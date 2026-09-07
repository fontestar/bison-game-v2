import { Bisao } from "./Bisao";
import { TEMAS, type Equipe } from "../game/equipes";

interface TelaFinalProps {
  equipes: Equipe[];
  onNovaPartida: () => void;
  onVerTabuleiro: () => void;
}

export function TelaFinal({
  equipes,
  onNovaPartida,
  onVerTabuleiro,
}: TelaFinalProps) {
  const ordenadas = equipes
    .map((e, i) => ({ ...e, indice: i }))
    .sort((a, b) => b.pontos - a.pontos);

  const maior = ordenadas[0].pontos;
  const campeas = ordenadas.filter((e) => e.pontos === maior);

  return (
    <div className="anim-fade fixed inset-0 z-[85] flex items-center justify-center overflow-y-auto bg-couro-950/95 p-5 backdrop-blur-sm">
      <div className="anim-pop w-full max-w-2xl">
        <div className="mb-8 flex items-center gap-5">
          <Bisao className="anim-float h-16 w-16 shrink-0" humor="feliz" />
          <div>
            <p className="font-display text-[0.7rem] font-semibold tracking-[0.4em] text-creme-400 uppercase">
              Fim de jogo
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight font-extrabold text-creme-100">
              {campeas.length > 1 ? (
                "Empate!"
              ) : (
                <>
                  <span className="text-mostarda-400">{campeas[0].nome}</span>{" "}
                  venceu
                </>
              )}
            </h2>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-creme-100/8 border-y border-creme-100/8">
          {ordenadas.map((e, pos) => {
            const tema = TEMAS[e.indice];
            const campea = e.pontos === maior;
            return (
              <div key={e.id} className="flex items-stretch">
                <span
                  className="w-1.5 shrink-0"
                  style={{ background: tema.cor, opacity: campea ? 1 : 0.4 }}
                />
                <span className="font-display grid w-14 shrink-0 place-items-center text-xl font-bold text-creme-400">
                  {pos + 1}
                </span>
                <span
                  className={`font-display flex-1 truncate py-4 text-xl font-bold sm:text-2xl ${
                    campea ? "text-creme-100" : "text-creme-300"
                  }`}
                >
                  {e.nome}
                </span>
                <span
                  className="font-display px-4 py-4 text-2xl font-extrabold tabular-nums sm:text-3xl"
                  style={{ color: campea ? tema.cor : "#94836c" }}
                >
                  {e.pontos}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={onNovaPartida}
            className="font-display flex-1 rounded-md bg-mostarda-400 px-7 py-3.5 text-lg font-bold text-couro-950 transition hover:bg-mostarda-300"
          >
            Nova partida
          </button>
          <button
            onClick={onVerTabuleiro}
            className="font-display rounded-md border border-creme-100/15 px-6 py-3.5 text-sm font-semibold tracking-wide text-creme-300 uppercase transition hover:border-creme-100/35 hover:text-creme-100"
          >
            Ver tabuleiro
          </button>
        </div>
      </div>
    </div>
  );
}
