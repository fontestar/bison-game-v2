/* Mascote do jogo: bisão estilizado em cores chapadas (flat). */

interface BisaoProps {
  className?: string;
  humor?: "normal" | "feliz" | "triste";
}

export function Bisao({ className = "", humor = "normal" }: BisaoProps) {
  return (
    <svg
      viewBox="0 0 220 196"
      className={className}
      role="img"
      aria-label="Mascote bisão"
    >
      {/* corpo */}
      <path
        d="M12 196C14 138 48 108 76 102h68c28 6 62 36 64 94Z"
        fill="#3d2c22"
      />
      <circle cx="70" cy="116" r="18" fill="#4a3527" />

      {/* chifres */}
      <g fill="#e9dcc6">
        <path d="M62 62C44 46 20 48 14 63c-5 13 5 25 18 24-11-7-11-20-1-25 10-6 22-2 28 8Z" />
        <path d="M158 62c18-16 42-14 48 1 5 13-5 25-18 24 11-7 11-20 1-25-10-6-22-2-28 8Z" />
      </g>

      {/* juba / cabeça */}
      <g fill="#553b2b">
        <ellipse cx="110" cy="92" rx="58" ry="52" />
        <circle cx="72" cy="56" r="20" />
        <circle cx="110" cy="46" r="22" />
        <circle cx="148" cy="56" r="20" />
        <circle cx="58" cy="94" r="17" />
        <circle cx="162" cy="94" r="17" />
      </g>

      {/* topete */}
      <g fill="#6b4b34">
        <circle cx="93" cy="50" r="13" />
        <circle cx="127" cy="50" r="13" />
        <circle cx="110" cy="40" r="12" />
      </g>

      {/* olhos */}
      {humor === "feliz" ? (
        <g stroke="#120c09" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M78 94c5-8 15-8 20 0" />
          <path d="M122 94c5-8 15-8 20 0" />
        </g>
      ) : (
        <g fill="#120c09">
          <ellipse cx="88" cy="92" rx="9" ry="10" />
          <ellipse cx="132" cy="92" rx="9" ry="10" />
        </g>
      )}

      {/* focinho */}
      <ellipse cx="110" cy="130" rx="33" ry="27" fill="#c8b79c" />
      <ellipse cx="99" cy="124" rx="5" ry="6.5" fill="#553b2b" />
      <ellipse cx="121" cy="124" rx="5" ry="6.5" fill="#553b2b" />
      <path
        d={humor === "triste" ? "M98 146c6-6 18-6 24 0" : "M96 140c7 9 21 9 28 0"}
        stroke="#553b2b"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* barba */}
      <path d="M84 146c4 30 48 30 52 0-4 22-48 22-52 0Z" fill="#2e211a" />
    </svg>
  );
}

/** Silhueta usada como marca d'água no verso das cartas. */
export function BisaoSilhueta({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 196" className={className} aria-hidden="true">
      <g fill="currentColor">
        <path d="M12 196C14 138 48 108 76 102h68c28 6 62 36 64 94Z" />
        <ellipse cx="110" cy="92" rx="58" ry="52" />
        <circle cx="72" cy="56" r="20" />
        <circle cx="110" cy="46" r="22" />
        <circle cx="148" cy="56" r="20" />
        <path d="M62 62C44 46 20 48 14 63c-5 13 5 25 18 24-11-7-11-20-1-25 10-6 22-2 28 8Z" />
        <path d="M158 62c18-16 42-14 48 1 5 13-5 25-18 24 11-7 11-20 1-25-10-6-22-2-28 8Z" />
      </g>
    </svg>
  );
}
