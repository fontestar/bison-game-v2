/* =========================================================================
 * JOGO DO BISÃO — MONTAGEM DO TABULEIRO
 * -------------------------------------------------------------------------
 * 24 cartas no total:
 *   • 18 cartas de pergunta  → 9 do Assunto 1 + 9 do Assunto 2
 *        (por assunto: 3 fáceis = 10 pts, 4 médias = 20 pts, 2 difíceis = 30 pts)
 *   • 6 cartas especiais:
 *        1x Perca 10 | 1x Ganhe 10 | 1x Ganhe 20 | 1x Passe 10 | 2x Passe a vez
 *
 * As posições são SORTEADAS a cada nova partida (Fisher–Yates).
 * ========================================================================= */

import { perguntas, type Pergunta } from "../data/perguntas";

export type Dificuldade = "facil" | "media" | "dificil";

export type EspecialTipo =
  | "perde10"
  | "ganha10"
  | "ganha20"
  | "passa10"
  | "passaVez";

export interface CartaPergunta {
  id: string;
  tipo: "pergunta";
  assuntoId: "assunto1" | "assunto2";
  assuntoNome: string;
  dificuldade: Dificuldade;
  pontos: number;
  dados: Pergunta;
}

export interface CartaEspecial {
  id: string;
  tipo: "especial";
  especial: EspecialTipo;
}

export type Carta = CartaPergunta | CartaEspecial;

export const PONTOS: Record<Dificuldade, number> = {
  facil: 10,
  media: 20,
  dificil: 30,
};

export const ROTULO_DIFICULDADE: Record<Dificuldade, string> = {
  facil: "Fácil",
  media: "Média",
  dificil: "Difícil",
};

export interface InfoEspecial {
  titulo: string;
  curto: string;
  descricao: string;
  cor: string;
  bom: boolean;
}

export const ESPECIAIS: Record<EspecialTipo, InfoEspecial> = {
  perde10: {
    titulo: "Perca 10 pontos",
    curto: "−10",
    descricao: "A equipe da vez perde 10 pontos.",
    cor: "#c0392b",
    bom: false,
  },
  ganha10: {
    titulo: "Ganhe 10 pontos",
    curto: "+10",
    descricao: "A equipe da vez ganha 10 pontos.",
    cor: "#4faa7b",
    bom: true,
  },
  ganha20: {
    titulo: "Ganhe 20 pontos",
    curto: "+20",
    descricao: "A equipe da vez ganha 20 pontos.",
    cor: "#f0b429",
    bom: true,
  },
  passa10: {
    titulo: "Passe 10 pontos",
    curto: "10 →",
    descricao:
      "A equipe da vez perde 10 pontos e a próxima equipe da ordem ganha 10.",
    cor: "#8e6bd1",
    bom: false,
  },
  passaVez: {
    titulo: "Passe a vez",
    curto: "Passa",
    descricao: "Nada muda no placar. A vez passa para a próxima equipe.",
    cor: "#6b7f93",
    bom: false,
  },
};

/** Embaralhamento Fisher–Yates (retorna um novo array). */
export function embaralhar<T>(lista: T[]): T[] {
  const arr = [...lista];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Monta as 24 cartas e sorteia suas posições.
 * A carta nº X do tabuleiro é simplesmente o índice X-1 do array retornado,
 * ou seja, o conteúdo muda a cada partida.
 */
export function montarTabuleiro(): Carta[] {
  const cartas: Carta[] = [];

  (["assunto1", "assunto2"] as const).forEach((assuntoId) => {
    const assunto = perguntas[assuntoId];

    const blocos: { chave: keyof typeof assunto; dif: Dificuldade }[] = [
      { chave: "faceis", dif: "facil" },
      { chave: "medias", dif: "media" },
      { chave: "dificeis", dif: "dificil" },
    ];

    blocos.forEach(({ chave, dif }) => {
      const lista = assunto[chave] as Pergunta[];
      lista.forEach((p, i) => {
        cartas.push({
          id: `${assuntoId}-${dif}-${i}`,
          tipo: "pergunta",
          assuntoId,
          assuntoNome: assunto.nome,
          dificuldade: dif,
          pontos: PONTOS[dif],
          dados: p,
        });
      });
    });
  });

  const especiais: EspecialTipo[] = [
    "perde10",
    "ganha10",
    "ganha20",
    "passa10",
    "passaVez",
    "passaVez",
  ];
  especiais.forEach((e, i) =>
    cartas.push({ id: `especial-${e}-${i}`, tipo: "especial", especial: e }),
  );

  return embaralhar(cartas);
}
