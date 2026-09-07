/* =========================================================================
 * Efeitos sonoros gerados na hora com a Web Audio API.
 * Nenhum arquivo externo → funciona 100% offline.
 * ========================================================================= */

type Ctx = AudioContext | null;
let ctx: Ctx = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

interface ToneOpts {
  freq: number;
  dur?: number;
  delay?: number;
  type?: OscillatorType;
  vol?: number;
  sweepTo?: number;
}

function tone({
  freq,
  dur = 0.18,
  delay = 0,
  type = "sine",
  vol = 0.18,
  sweepTo,
}: ToneOpts) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function noise(dur = 0.16, vol = 0.12) {
  const ac = getCtx();
  if (!ac) return;
  const frames = Math.floor(ac.sampleRate * dur);
  const buffer = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frames) ** 2;
  }
  const src = ac.createBufferSource();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1200;
  gain.gain.value = vol;
  src.buffer = buffer;
  src.connect(filter).connect(gain).connect(ac.destination);
  src.start();
}

export type SomTipo =
  | "flip"
  | "acerto"
  | "erro"
  | "bom"
  | "ruim"
  | "clique"
  | "vitoria"
  | "turno";

export function tocar(tipo: SomTipo, mudo: boolean) {
  if (mudo) return;
  switch (tipo) {
    case "flip":
      noise(0.14, 0.1);
      tone({ freq: 420, dur: 0.1, type: "triangle", vol: 0.1, sweepTo: 780 });
      break;
    case "clique":
      tone({ freq: 620, dur: 0.06, type: "square", vol: 0.06 });
      break;
    case "turno":
      tone({ freq: 330, dur: 0.12, type: "triangle", vol: 0.09 });
      tone({ freq: 494, dur: 0.16, delay: 0.09, type: "triangle", vol: 0.09 });
      break;
    case "acerto":
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone({
          freq: f,
          dur: 0.22,
          delay: i * 0.085,
          type: "triangle",
          vol: 0.16,
        }),
      );
      break;
    case "erro":
      tone({ freq: 220, dur: 0.32, type: "sawtooth", vol: 0.14, sweepTo: 90 });
      tone({
        freq: 160,
        dur: 0.34,
        delay: 0.04,
        type: "square",
        vol: 0.08,
        sweepTo: 70,
      });
      break;
    case "bom":
      [659.25, 880, 1174.66].forEach((f, i) =>
        tone({ freq: f, dur: 0.2, delay: i * 0.07, type: "sine", vol: 0.15 }),
      );
      break;
    case "ruim":
      tone({ freq: 300, dur: 0.25, type: "sawtooth", vol: 0.12, sweepTo: 120 });
      break;
    case "vitoria":
      [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5].forEach((f, i) =>
        tone({
          freq: f,
          dur: 0.3,
          delay: i * 0.13,
          type: "triangle",
          vol: 0.17,
        }),
      );
      break;
  }
}
