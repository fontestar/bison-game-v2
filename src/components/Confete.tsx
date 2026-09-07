import { useEffect, useRef } from "react";

/**
 * Chuva de confete em <canvas>. Dispara sempre que a prop `gatilho` muda
 * (use um contador incremental). `intensidade` controla a quantidade.
 */
interface ConfeteProps {
  gatilho: number;
  intensidade?: number;
}

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  cor: string;
  vida: number;
  forma: "quad" | "circ";
}

const CORES = [
  "#f0b429",
  "#ffce5c",
  "#e2683c",
  "#c85a2e",
  "#4faa7b",
  "#82cfa8",
  "#f7f1e6",
];

export function Confete({ gatilho, intensidade = 120 }: ConfeteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particulas = useRef<Particula[]>([]);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const vivos: Particula[] = [];
      for (const p of particulas.current) {
        p.vy += 0.28;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.vida -= 1;
        if (p.vida > 0 && p.y < canvas.height + 60) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.cor;
          ctx.globalAlpha = Math.min(1, p.vida / 40);
          if (p.forma === "circ") {
            ctx.beginPath();
            ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }
          ctx.restore();
          vivos.push(p);
        }
      }
      particulas.current = vivos;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    if (!gatilho) return;
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    const novas: Particula[] = [];
    const fontes = [
      { x: largura * 0.15, y: altura * 0.75 },
      { x: largura * 0.85, y: altura * 0.75 },
      { x: largura * 0.5, y: altura * 0.25 },
    ];
    for (let i = 0; i < intensidade; i++) {
      const f = fontes[i % fontes.length];
      const ang = -Math.PI / 2 + (Math.random() - 0.5) * 1.7;
      const vel = 9 + Math.random() * 13;
      novas.push({
        x: f.x + (Math.random() - 0.5) * 60,
        y: f.y,
        vx: Math.cos(ang) * vel * (f.x < largura / 2 ? 1 : -1) * 0.7,
        vy: Math.sin(ang) * vel,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        w: 7 + Math.random() * 9,
        h: 9 + Math.random() * 12,
        cor: CORES[Math.floor(Math.random() * CORES.length)],
        vida: 130 + Math.random() * 80,
        forma: Math.random() > 0.72 ? "circ" : "quad",
      });
    }
    particulas.current = [...particulas.current, ...novas].slice(-600);
  }, [gatilho, intensidade]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90] h-full w-full"
    />
  );
}
