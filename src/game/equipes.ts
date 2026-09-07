/* Identidade visual das 3 equipes — cores sólidas, sem emojis. */

export interface Equipe {
  id: number;
  nome: string;
  pontos: number;
}

export interface TemaEquipe {
  /** cor de destaque da equipe */
  cor: string;
  /** cor do texto sobre a cor sólida */
  texto: string;
  /** versão translúcida para fundos sutis */
  suave: string;
}

export const TEMAS: TemaEquipe[] = [
  { cor: "#f0b429", texto: "#1b1310", suave: "rgba(240,180,41,.14)" },
  { cor: "#e2683c", texto: "#1b1310", suave: "rgba(226,104,60,.14)" },
  { cor: "#4faa7b", texto: "#0d1f16", suave: "rgba(79,170,123,.14)" },
];

export const NOMES_PADRAO = ["Equipe 1", "Equipe 2", "Equipe 3"];
