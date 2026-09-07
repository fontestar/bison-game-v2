import { useEffect, useRef, useState } from "react";
import { TEMAS, type Equipe } from "../game/equipes";

interface PlacarProps {
  equipes: Equipe[];
  vez: number;
}

function ItemPlacar({
  equipe,
  indice,
  ativa,
}: {
  equipe: Equipe;
  indice: number;
  ativa: boolean;
}) {
  const tema = TEMAS[indice];
  const anterior = useRef(equipe.pontos);
  const [delta, setDelta] = useState<number | null>(null);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const d = equipe.pontos - anterior.current;
    anterior.current = equipe.pontos;
    if (d !== 0) {
      setDelta(d);
      setBump(true);
      const t1 = setTimeout(() => setBump(false), 500);
      const t2 = setTimeout(() => setDelta(null), 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [equipe.pontos]);

  return (
    <div
      className="relative flex min-w-0 flex-1 items-stretch transition-colors duration-300"
      style={{
        background: ativa ? tema.cor : "transparent",
        color: ativa ? tema.texto : "#c8b79c",
      }}
    >
      {!ativa && (
        <span className="w-1 shrink-0" style={{ background: tema.cor }} />
      )}
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
        <div className="min-w-0 flex-1">
          <span
            className={`font-display block text-[0.6rem] leading-none font-bold tracking-[0.25em] uppercase ${
              ativa ? "opacity-65" : "opacity-0"
            }`}
          >
            Vez de
          </span>
          <span className="font-display mt-0.5 block truncate text-base leading-tight font-bold sm:text-xl">
            {equipe.nome}
          </span>
        </div>
        <span
          className={`font-display shrink-0 text-2xl leading-none font-extrabold tabular-nums sm:text-3xl ${
            bump ? "anim-bump" : ""
          }`}
        >
          {equipe.pontos}
        </span>
      </div>

      {delta !== null && (
        <span
          className="font-display anim-rise pointer-events-none absolute -top-1 right-1 px-1.5 py-0.5 text-xs font-bold"
          style={{
            background: delta > 0 ? "#4faa7b" : "#c0392b",
            color: "#fff",
          }}
        >
          {delta > 0 ? `+${delta}` : delta}
        </span>
      )}
    </div>
  );
}

export function Placar({ equipes, vez }: PlacarProps) {
  return (
    <div className="flex w-full gap-px overflow-hidden rounded-md border border-creme-100/10 bg-creme-100/10">
      {equipes.map((e, i) => (
        <ItemPlacar key={e.id} equipe={e} indice={i} ativa={i === vez} />
      ))}
    </div>
  );
}
