/* =========================================================================
 * JOGO DO BISÃO — BANCO DE PERGUNTAS
 * -------------------------------------------------------------------------
 * Estrutura (não mude os nomes das chaves):
 *
 *   perguntas = {
 *     assunto1: {
 *       nome: "Nome do Assunto 1",
 *       faceis:   [ 3 perguntas — 10 pontos ]
 *       medias:   [ 4 perguntas — 20 pontos ]
 *       dificeis: [ 2 perguntas — 30 pontos ]
 *     },
 *     assunto2: { ...mesma coisa... }
 *   }
 *
 * Cada pergunta tem SEMPRE 5 alternativas (A, B, C, D, E) e o campo
 * `correta` guarda o ÍNDICE da alternativa certa:
 *      0 = A | 1 = B | 2 = C | 3 = D | 4 = E
 *
 * O campo `explicacao` é OPCIONAL: quando preenchido, o texto aparece na
 * tela logo depois que a equipe responde, servindo de correção comentada.
 *
 * Total: 9 perguntas por assunto → 18 cartas de pergunta
 *        + 6 cartas especiais    → 24 cartas no tabuleiro.
 *
 * -------------------------------------------------------------------------
 * GABARITO (as alternativas foram reordenadas de propósito para que nenhuma
 * letra predomine — no total: A = 4, B = 3, C = 4, D = 4, E = 3)
 *
 *   ASSUNTO 1 — África: aspectos físicos, humanos e econômicos
 *     Q1 A | Q2 B | Q3 D | Q4 C | Q5 E | Q6 A | Q7 D | Q8 B | Q9 C
 *
 *   ASSUNTO 2 — Geopolítica africana
 *     Q10 E | Q11 C | Q12 A | Q13 D | Q14 B | Q15 E | Q16 C | Q17 D | Q18 A
 * ========================================================================= */

export interface Pergunta {
  /** Enunciado da pergunta */
  pergunta: string;
  /** Exatamente 5 alternativas, na ordem A, B, C, D, E */
  alternativas: string[];
  /** Índice (0 a 4) da alternativa correta */
  correta: number;
  /** Correção comentada, exibida após a resposta (opcional) */
  explicacao?: string;
}

export interface Assunto {
  nome: string;
  faceis: Pergunta[]; // 3 perguntas → 10 pontos cada
  medias: Pergunta[]; // 4 perguntas → 20 pontos cada
  dificeis: Pergunta[]; // 2 perguntas → 30 pontos cada
}

export interface BancoDePerguntas {
  assunto1: Assunto;
  assunto2: Assunto;
}

export const perguntas: BancoDePerguntas = {
  /* ======================================================================
   * TEMA 1 — África: aspectos físicos, humanos e econômicos
   * ==================================================================== */
  assunto1: {
    nome: "África: Aspectos Físicos, Humanos e Econômicos",

    /* ---- 3 PERGUNTAS FÁCEIS (10 pontos) ---- */
    faceis: [
      {
        // Q1 — resposta: A
        pergunta:
          "O relevo africano é caracterizado por sua antiguidade e desgaste, resultado de processos erosivos atuando por um longo período geológico sobre estruturas cristalinas estáveis. Uma exceção marcante a essa paisagem geralmente aplainada é justamente o ponto mais elevado do continente. Esse ponto culminante corresponde a:",
        alternativas: [
          "Monte Kilimanjaro",
          "Cordilheira do Atlas",
          "Vale do Rift (Rift Valley)",
          "Monte Drakensberg",
          "Maciço da Etiópia",
        ],
        correta: 0,
        explicacao:
          "O Kilimanjaro, na Tanzânia, é um vulcão antigo e isolado que rompe com o padrão geral de relevo antigo e aplainado do continente, sendo seu ponto mais elevado. O Atlas e o Drakensberg são dobramentos (moderno e antigo, respectivamente), o Maciço da Etiópia é um planalto antigo, e o Vale do Rift é uma falha transcorrente, não um pico.",
      },
      {
        // Q2 — resposta: B
        pergunta:
          "Em pleno deserto do Saara, viajantes relatam paisagens de dunas praticamente sem vegetação, adaptadas a condições de extrema escassez hídrica. O tipo de vegetação típica desse clima extremamente seco, com plantas capazes de armazenar água e reduzir a perda por evaporação, é conhecido como:",
        alternativas: [
          "Vegetação de savana",
          "Vegetação xerófita",
          "Floresta equatorial úmida",
          "Vegetação de maquis e garrigues",
          "Vegetação de estepe",
        ],
        correta: 1,
        explicacao:
          "A vegetação xerófita é adaptada a climas desérticos, com folhas reduzidas/espinhos e capacidade de armazenar água. A savana está associada ao clima tropical, a estepe ao semiárido do Sahel, os maquis e garrigues ao mediterrâneo, e a floresta equatorial ao clima equatorial da porção central.",
      },
      {
        // Q3 — resposta: D
        pergunta:
          "As chamadas “fronteiras artificiais” são apontadas como uma das causas dos conflitos étnico-nacionalistas observados atualmente na África. Esse tipo de conflito é mais característico de qual porção do continente?",
        alternativas: [
          "No Magreb, ao norte do Saara",
          "Na região mediterrânea do continente",
          "Apenas nos países produtores de petróleo",
          "Na África subsaariana (África negra)",
          "Exclusivamente no Egito e na África do Sul",
        ],
        correta: 3,
        explicacao:
          "Os conflitos ligados às “fronteiras artificiais” são característicos da África subsaariana (África negra), região de forte heterogeneidade étnica. O Magreb é mais associado a conflitos ligados ao fundamentalismo islâmico.",
      },
    ],

    /* ---- 4 PERGUNTAS MÉDIAS (20 pontos) ---- */
    medias: [
      {
        // Q4 — resposta: C
        pergunta:
          "Observa-se, ao longo do território africano, uma diversidade climática que vai desde regiões de vegetação mediterrânea até florestas equatoriais, passando por zonas desérticas e de transição. Assinale a alternativa que relaciona corretamente domínio climático, localização e vegetação:",
        alternativas: [
          "O clima mediterrâneo ocorre na porção central do continente, com vegetação de floresta equatorial",
          "O clima equatorial ocorre nos extremos norte e sul do continente, com vegetação de savana",
          "O clima semiárido ocorre nas bordas dos desertos, especialmente na faixa do Sahel, com predomínio de vegetação de estepe (gramíneas)",
          "O clima tropical está restrito à linha do Equador, com vegetação de maquis e garrigues",
          "O clima desértico predomina exclusivamente na porção sul do continente, na região do Kalahari",
        ],
        correta: 2,
        explicacao:
          "O Sahel é a faixa de transição entre o Saara e as savanas tropicais, com clima semiárido e vegetação de estepe. As demais trocam as combinações reais (o mediterrâneo ocorre nos extremos norte/sul, não no centro; o desértico ocorre ao norte e ao sul).",
      },
      {
        // Q5 — resposta: E
        pergunta:
          "A bacia hidrográfica de um continente costuma refletir diretamente seu regime de chuvas e a distribuição do relevo. Considerando a hidrografia africana, é correto afirmar que:",
        alternativas: [
          "Os principais rios do continente têm suas nascentes concentradas na porção norte, próximas ao Saara",
          "O continente africano é marcado pela escassez de rios e lagos de grande porte, resultado de seu relevo antigo e desgastado",
          "Os grandes lagos de origem tectônica do continente, como Vitória e Tanganica, situam-se na porção oeste",
          "A escassez de recursos hídricos é generalizada em todo o território africano, inclusive na porção central",
          "A maior parte dos grandes rios do continente, como Nilo, Congo, Orange e Zambeze, nasce na porção central, mais úmida",
        ],
        correta: 4,
        explicacao:
          "A porção central, mais úmida (clima equatorial), concentra as nascentes da maioria dos grandes rios (Nilo, Congo, Orange, Zambeze). Os lagos tectônicos (Vitória, Tanganica, Niassa) estão no leste, não no oeste, e o continente é rico em rios e lagos, ao contrário do que sugerem as demais alternativas.",
      },
      {
        // Q6 — resposta: A
        pergunta:
          "Do ponto de vista geomorfológico, nem todo relevo dobrado tem a mesma origem temporal — alguns dobramentos resultam de movimentos tectônicos recentes, enquanto outros são remanescentes de eras geológicas muito anteriores. Sobre os dobramentos do relevo africano, assinale a alternativa correta:",
        alternativas: [
          "A Cordilheira do Atlas, ao norte, é um dobramento moderno e instável, enquanto o Monte Drakensberg, ao sul, é um dobramento antigo",
          "Tanto o Atlas quanto o Drakensberg são dobramentos modernos, formados pela mesma movimentação tectônica",
          "O Rift Valley é um dobramento antigo localizado na porção sul do continente, próximo ao Drakensberg",
          "O Monte Drakensberg, ao norte, é um dobramento moderno, enquanto a Cordilheira do Atlas, ao sul, é um dobramento antigo",
          "Os dobramentos africanos, ao norte e ao sul, são formações recentes associadas ao Rift Valley",
        ],
        correta: 0,
        explicacao:
          "O Atlas, no norte, é um dobramento moderno e instável; o Drakensberg, no sul, é antigo e desgastado. O Rift Valley não é um dobramento, e sim uma falha transcorrente no leste do continente.",
      },
      {
        // Q7 — resposta: D
        pergunta:
          "A matriz econômica de boa parte dos países africanos permanece fortemente concentrada em atividades primárias, ainda que existam exceções relevantes de maior diversificação produtiva. Considerando esse panorama econômico, assinale a alternativa correta:",
        alternativas: [
          "A totalidade dos países africanos apresenta economia diversificada, com predomínio do setor terciário",
          "O Egito é o único país do continente com produção relevante de petróleo, sendo também o mais industrializado",
          "Apenas países da África branca (Magreb) dependem do setor primário, enquanto a África subsaariana já é majoritariamente industrializada",
          "Nigéria, Líbia e Angola destacam-se pela exploração de petróleo, enquanto Egito e África do Sul apresentam os processos de industrialização mais avançados do continente",
          "África do Sul e Líbia são reconhecidos como os principais produtores de petróleo do continente, enquanto a Nigéria concentra o parque industrial mais avançado",
        ],
        correta: 3,
        explicacao:
          "Nigéria, Líbia e Angola destacam-se pela produção petrolífera; Egito e África do Sul, pela industrialização. As demais trocam essas atribuições ou generalizam de forma incorreta.",
      },
    ],

    /* ---- 2 PERGUNTAS DIFÍCEIS (30 pontos) ---- */
    dificeis: [
      {
        // Q8 — resposta: B
        pergunta:
          "Um pesquisador, ao mapear os domínios climático-vegetacionais do continente africano, identificou uma distribuição relativamente simétrica: certos domínios se repetem tanto ao norte quanto ao sul do continente, enquanto outros ocorrem de forma concentrada na porção central, mais próxima à linha do Equador. Com base nessa lógica, assinale a alternativa que descreve corretamente essa organização:",
        alternativas: [
          "Tropical e semiárido se repetem nos extremos norte e sul; o mediterrâneo concentra-se na porção central, associado à floresta úmida",
          "Mediterrâneo e desértico se repetem nos extremos norte e sul do continente; o equatorial concentra-se na porção central, associado à floresta úmida do Congo e Zaire",
          "Semiárido e equatorial se repetem nos extremos norte e sul; o desértico concentra-se na porção central, associado à floresta do Congo",
          "Mediterrâneo e tropical se repetem nos extremos norte e sul; o desértico concentra-se exclusivamente na porção central do continente",
          "Equatorial e desértico se repetem nos extremos norte e sul; o mediterrâneo concentra-se na porção central, associado à vegetação de estepe",
        ],
        correta: 1,
        explicacao:
          "O mediterrâneo (extremos norte e sul) e o desértico (Saara ao norte, Kalahari ao sul) têm distribuição simétrica. O equatorial concentra-se na porção central e mais úmida, onde está a floresta da bacia do Congo/Zaire. As demais atribuem essa simetria a domínios que na realidade se distribuem de outra forma.",
      },
      {
        // Q9 — resposta: C
        pergunta:
          "A divisão do continente africano entre “África branca” e “África negra” é usada em estudos geográficos para explicar diferenças históricas, religiosas e de conflitos territoriais entre as duas regiões. Assinale a alternativa que descreve corretamente as duas regiões:",
        alternativas: [
          "África branca (região subsaariana) — árabes, islamismo; África negra (Magreb) — religiões animistas e cristã, conflitos de fronteiras artificiais",
          "A divisão entre África branca e África negra é definida apenas pelo nível de industrialização de cada região, sem relação com religião ou etnia",
          "África branca (Magreb, norte do Saara) — árabes, islamismo, conflitos ligados ao fundamentalismo religioso; África negra (subsaariana) — etnicamente heterogênea, religiões animistas e cristã, conflitos ligados a fronteiras artificiais",
          "África branca (Magreb) — etnicamente heterogênea, religiões animistas; África negra (subsaariana) — árabes, islamismo",
          "Tanto a África branca quanto a África negra apresentam os mesmos conflitos, ligados exclusivamente ao fundamentalismo religioso",
        ],
        correta: 2,
        explicacao:
          "A África branca corresponde ao Magreb, ao norte do Saara — população árabe, religião islâmica, conflitos de fundamentalismo religioso. A África negra corresponde à região subsaariana — etnicamente heterogênea, religiões animistas e cristã, conflitos de “fronteiras artificiais”. As demais alternativas invertem essas características ou atribuem a divisão a um critério que não corresponde ao conteúdo.",
      },
    ],
  },

  /* ======================================================================
   * TEMA 2 — Geopolítica Africana
   * ==================================================================== */
  assunto2: {
    nome: "Geopolítica Africana",

    /* ---- 3 PERGUNTAS FÁCEIS (10 pontos) ---- */
    faceis: [
      {
        // Q10 — resposta: E
        pergunta:
          "O Congresso (Conferência) de Berlim, realizado entre 1884 e 1885, ficou historicamente marcado por:",
        alternativas: [
          "Criar a União Africana como organismo de cooperação regional",
          "Encerrar definitivamente o tráfico de escravos no Atlântico",
          "Conceder a independência formal às colônias africanas",
          "Estabelecer o fim do regime de apartheid na África do Sul",
          "Dividir o continente africano entre as potências coloniais europeias",
        ],
        correta: 4,
      },
      {
        // Q11 — resposta: C
        pergunta:
          "O regime de segregação racial conhecido como apartheid, encerrado em 1994, ocorreu em qual país africano?",
        alternativas: [
          "Ruanda",
          "Nigéria",
          "África do Sul",
          "Sudão do Sul",
          "Sudão",
        ],
        correta: 2,
      },
      {
        // Q12 — resposta: A
        pergunta:
          "O grupo de vertente radical islâmica que dominou parte do interior da Nigéria, promovendo ataques terroristas na região, é conhecido como:",
        alternativas: [
          "Boko Haram",
          "Hutu Power",
          "Al-Shabaab",
          "Frente Popular Sudanesa",
          "Estado Islâmico",
        ],
        correta: 0,
      },
    ],

    /* ---- 4 PERGUNTAS MÉDIAS (20 pontos) ---- */
    medias: [
      {
        // Q13 — resposta: D
        pergunta:
          "A principal herança geopolítica deixada pelas potências europeias na África, apontada como fonte de conflitos até os dias atuais, foi:",
        alternativas: [
          "A imposição de um único idioma oficial em todo o continente",
          "A distribuição igualitária de terras entre colonizadores e colonizados",
          "A implantação de sistemas democráticos multipartidários em todas as colônias",
          "A criação de fronteiras artificiais que não respeitavam as divisões étnicas e culturais dos povos africanos",
          "A unificação religiosa forçada entre as populações colonizadas",
        ],
        correta: 3,
      },
      {
        // Q14 — resposta: B
        pergunta:
          "O genocídio ocorrido em Ruanda, em 1994, considerado um dos episódios mais violentos da história recente da África, teve como principais grupos envolvidos:",
        alternativas: [
          "Brancos e negros, no contexto do fim de um regime de segregação racial",
          "Hutus e Tutsis, com o extermínio de mais de 1 milhão de pessoas em menos de três meses",
          "Forças coloniais europeias contra movimentos locais de independência",
          "Muçulmanos e cristãos, em disputa por território petrolífero",
          "Membros do Boko Haram contra a população cristã do interior do país",
        ],
        correta: 1,
      },
      {
        // Q15 — resposta: E
        pergunta: "Sobre a guerra civil sudanesa, é correto afirmar que:",
        alternativas: [
          "Foi uma das mais curtas da história africana, durando menos de um ano",
          "Teve como estopim a atuação do grupo Boko Haram na região",
          "Resultou na unificação do Sudão com o Egito em um único Estado",
          "Foi encerrada por meio de intervenção direta do regime do apartheid sul-africano",
          "Envolveu principalmente populações muçulmanas e cristãs, e se estendeu até 2011, quando o país foi dividido em dois",
        ],
        correta: 4,
      },
      {
        // Q16 — resposta: C
        pergunta:
          "O regime do apartheid, vigente na África do Sul entre 1948 e 1994, caracterizava-se por:",
        alternativas: [
          "Uma política de integração racial promovida pelo governo colonial britânico",
          "A divisão do país em dois Estados independentes, um branco e um negro",
          "Um sistema de segregação racial em que a minoria branca detinha o poder político sobre a maioria negra",
          "Um regime instaurado imediatamente após o Congresso de Berlim, em 1885",
          "Um conflito religioso entre cristãos e muçulmanos pelo controle do governo",
        ],
        correta: 2,
      },
    ],

    /* ---- 2 PERGUNTAS DIFÍCEIS (30 pontos) ---- */
    dificeis: [
      {
        // Q17 — resposta: D
        pergunta:
          "Sobre o processo de colonização europeia na África, é correto afirmar que:",
        alternativas: [
          "A exploração europeia teve início apenas após o Congresso de Berlim, no final do séc. XIX",
          "O Congresso de Berlim garantiu a soberania dos povos africanos sobre suas fronteiras tradicionais",
          "A dominação europeia se restringiu ao litoral africano durante todo o período colonial, sem avançar para o interior do continente",
          "As primeiras feitorias no litoral africano datam do séc. XV, mas a dominação europeia só se intensificou a partir do séc. XVIII, sendo formalizada com a partilha territorial do Congresso de Berlim (1884-1885)",
          "A independência das colônias africanas ocorreu majoritariamente antes da Segunda Guerra Mundial, antecipando o processo de descolonização mundial",
        ],
        correta: 3,
      },
      {
        // Q18 — resposta: A
        pergunta:
          "Sobre os conflitos envolvendo o Sudão, é correto afirmar que:",
        alternativas: [
          "A guerra civil sudanesa, marcada pelo confronto entre populações de maioria muçulmana e cristã, foi a mais longa da história africana e resultou na divisão do país em 2011, mas as tensões por áreas petrolíferas persistem entre Sudão e Sudão do Sul",
          "O conflito sudanês teve motivação majoritariamente étnica entre Hutus e Tutsis, de forma semelhante ao ocorrido em Ruanda",
          "As tensões atuais entre Sudão e Sudão do Sul dizem respeito exclusivamente a disputas religiosas, sem qualquer interesse econômico envolvido",
          "A divisão do Sudão em dois países ocorreu ainda no séc. XIX, logo após o Congresso de Berlim",
          "O Sudão foi o único país africano a evitar conflitos internos após sua independência, tornando-se um modelo de estabilidade regional",
        ],
        correta: 0,
      },
    ],
  },
};
