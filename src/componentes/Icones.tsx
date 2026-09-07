/* Ícones lineares para as cartas especiais (sem emoji). */

import type { EspecialTipo } from "../game/deck";

interface Props {
  tipo: EspecialTipo;
  className?: string;
}

export function IconeEspecial({ tipo, className = "" }: Props) {
  const comum = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {tipo === "perde10" && (
        <g {...comum}>
          <path d="M12 4v13" />
          <path d="M6.5 11.5 12 17l5.5-5.5" />
          <path d="M4 20h16" />
        </g>
      )}
      {tipo === "ganha10" && (
        <g {...comum}>
          <path d="M12 20V7" />
          <path d="M6.5 12.5 12 7l5.5 5.5" />
          <path d="M4 4h16" />
        </g>
      )}
      {tipo === "ganha20" && (
        <g {...comum}>
          <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8L6.7 20l1-6L3.4 9.9 9.4 9z" />
        </g>
      )}
      {tipo === "passa10" && (
        <g {...comum}>
          <path d="M3 8h14" />
          <path d="m13.5 4.5 4 3.5-4 3.5" />
          <path d="M21 16H7" />
          <path d="m10.5 12.5-4 3.5 4 3.5" />
        </g>
      )}
      {tipo === "passaVez" && (
        <g {...comum}>
          <path d="m4 5 8 7-8 7z" />
          <path d="m12 5 8 7-8 7z" />
        </g>
      )}
    </svg>
  );
}
