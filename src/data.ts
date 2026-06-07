import { TabContent, BonusItem, TestimonialChat, PricingTier, FAQItem } from "./types";

export const TAB_CONTENTS: TabContent[] = [
  {
    id: "brinquedos",
    number: "01",
    title: "Ala dos Brinquedos Caseiros",
    subtitle: "Brinquedos manuais construídos do zero com materiais recicláveis simples.",
    tag: "230 BRINQUEDOS",
    items: [
      "Fliperama do Mario em Caixa de Sapato",
      "Pinball Artesanal Interativo",
      "Tiro ao Alvo Seguro com Elástico",
      "Fliperama de Papelão Funcional"
    ],
    image: "https://i.ibb.co/qYjVjPLY/imagem-01.png"
  },
  {
    id: "engenhocas",
    number: "02",
    title: "Ala das Engenhocas Malucas",
    subtitle: "Mecanismos práticos de física e engenharia divertida montados com materiais de casa.",
    tag: "190 PROJETOS",
    items: [
      "Claw Machine — Máquina de garra",
      "Elevador Manual com Roldanas",
      "Catapulta de Copinho de Sorvete",
      "Mini Automóvel a Propulsão"
    ],
    image: "https://i.ibb.co/BmFtzkB/imagem-02.png"
  },
  {
    id: "cientistas",
    number: "03",
    title: "Ala dos Cientistas Mirins",
    subtitle: "Experimentos visuais e reações científicas fascinantes para encantar pequenas mentes.",
    tag: "150 EXPERIÊNCIAS",
    items: [
      "Gelo Instantâneo — a Água que Vira Gelo na Mão",
      "Erupção Vulcânica Controlada",
      "Fluido Não-Newtoniano Divertido",
      "Lâmpada de Lava de Cozinha"
    ],
    image: "https://i.ibb.co/HLJymTxB/imagem-03.png"
  },
  {
    id: "magicas",
    number: "04",
    title: "Ala das Mágicas Impossíveis",
    subtitle: "Truques de ilusionismo e segredos revelados de forma simples e estimulante.",
    tag: "120 TRUQUES",
    items: [
      "Moedas que Atravessam a Caneca",
      "Ilusão de Óptica em Recorte de Papel",
      "Bastão Mágico Flutuante",
      "Caixa Secreta de Desaparecimento"
    ],
    image: "https://i.ibb.co/wFq5j8tW/imagem-04.png"
  },
  {
    id: "raciocinio",
    number: "05",
    title: "Ala do Raciocínio Lógico",
    subtitle: "Quebra-cabeças e desafios que instigam e estimulam o foco cognitivo.",
    tag: "180 ATIVIDADES",
    items: [
      "Labirinto Tridimensional de Bolinha de Gude",
      "Tetris de Recorte de Papelão",
      "Resta Um com Copos de Descarte",
      "Desafio dos Bloquinhos de Encaixe"
    ],
    image: "https://i.ibb.co/RMCM3FP/imagem-05.png"
  },
  {
    id: "quintal",
    number: "06",
    title: "Ala do Quintal Perdido",
    subtitle: "brincadeiras que gastam energia, rendem risada e viram memória boa",
    tag: "152 BRINCADEIRAS",
    items: [
      "Guerra de Bexiga d'Água Estratégica",
      "Cabana Secreta de Lençol",
      "Acampamento na Sala com Lanterna",
      "Pista de Obstáculos no Corredor"
    ],
    image: "https://i.ibb.co/hJwP2RTz/imagem-06.png"
  },
  {
    id: "robotica",
    number: "07",
    title: "Ala da Robótica Maker",
    subtitle: "Projetos de engenharia mecânica avançada e robótica simples com materiais do dia a dia.",
    tag: "110 PROJETOS",
    items: [
      "Bicicleta com Bonequinho que Pedala Sozinho",
      "Mão Robótica em Papelão",
      "Maquete de Semáforo Manual",
      "Robô de Sucata Inteligente"
    ],
    image: "https://i.ibb.co/xqYCdhzP/imagem-07.png"
  }
];

export const BONUS_ITEMS: BonusItem[] = [
  {
    id: "bonus1",
    badge: "BÔNUS 01",
    title: "ARSENAL DAS GARGALHADAS",
    description: "500 piadas infantis saudáveis organizadas por idade para tirar o riso sincero do seu adolescente ou criança.",
    value: "Valor: R$ 37",
    image: "/src/assets/images/arcade_mario_short_1779326006483.png"
  },
  {
    id: "bonus2",
    badge: "BÔNUS 02",
    title: "COFRE DAS MÁGICAS QUE FAZEM BRILHAR",
    description: "100 truques que seu filho aprende a executar e a explicar de queixo caído para impressionar os parentes em reuniões.",
    value: "Valor: R$ 57",
    image: "/src/assets/images/gelo_instantaneo_card_1779326048039.png"
  },
  {
    id: "bonus3",
    badge: "BÔNUS 03",
    title: "A TURMA DOS DESPLUGADOS - HQ",
    description: "A revistinha interativa digital que só convida e avança o enredo à medida que a criança executa ideias práticas em casa.",
    value: "Valor: R$ 47",
    image: "/src/assets/images/claw_machine_short_1779326026327.png"
  }
];

export const TESTIMONIALS: TestimonialChat[] = [
  {
    id: "patricia",
    name: "Patrícia S. (Mãe)",
    avatar: "👩‍🦰",
    status: "visto por último às 21:39",
    messages: [
      { text: "Oi gente, passando pra agradecer por esse Laboratório!", time: "21:30", origin: "client" },
      { text: "Semana passada eu estava desesperada porque meu filho de 7 anos passava o dia colado no TikTok. Não sabia mais o que inventar.", time: "21:31", origin: "client" },
      { text: "Depois que comprei e começamos, ele mudou demais. Hoje acordou cedo querendo fazer a Mão Robótica!", time: "21:32", origin: "client" },
      { text: "Foi um descanso real pro meu coração ver ele pegando uma caixa de papelão velha e se concentrando por 1 hora.", time: "21:34", origin: "client" },
      { text: "Nossa, fico extremamente feliz Patrícia! Que orgulho ver ele criando com as próprias mãos 😭❤️", time: "21:35", origin: "user" },
      { text: "Obrigada de verdade por criar algo tão sincero e útil!", time: "21:37", origin: "client" }
    ]
  },
  {
    id: "priscila",
    name: "Priscilla M. (Mãe)",
    avatar: "👩",
    status: "online",
    messages: [
      { text: "Eu tinha muito medo de ser difícil de montar ou precisar comprar mil materiais caros.", time: "18:04", origin: "client" },
      { text: "Mas que nada! A gente filtrou por 'papelão e tesoura' e já montou o Fliperama do Mario com caixa de sapato velha.", time: "18:05", origin: "client" },
      { text: "Ele pediu pra pintar, decorou tudo... Ficou a tarde inteira jogando e rindo.", time: "18:07", origin: "client" },
      { text: "Fico babando de ver ele explicando a física por trás pras visitas haha", time: "18:08", origin: "client" }
    ]
  },
  {
    id: "caroline",
    name: "Caroline R. (Mãe)",
    avatar: "👩‍⚕️",
    status: "visto por último hoje às 14:22",
    messages: [
      { text: "Comprei ontem meio desacreditada pq meu filho de 10 anos só quer PC gamer.", time: "14:10", origin: "client" },
      { text: "Mas propus pra ele montar o Pinball ontem no final da tarde.", time: "14:11", origin: "client" },
      { text: "Ele ficou até as 22h montando, ajustando as gominhas de elástico e os disparadores.", time: "14:15", origin: "client" },
      { text: "Achei incrível o foco mental que ele teve para solucionar problemas sozinho.", time: "14:16", origin: "client" },
      { text: "Foi de longe o melhor investimento de R$ 27 que já fiz na vida kkk", time: "14:18", origin: "client" }
    ]
  },
  {
    id: "juliana",
    name: "Juliana T. (Profª)",
    avatar: "👩‍🏫",
    status: "online",
    messages: [
      { text: "Queria parabenizar pelo excelente material didático!", time: "19:40", origin: "client" },
      { text: "Sou professora do Ensino Fundamental I e usei duas ideias do Laboratório na aula de Artes/Ciências.", time: "19:42", origin: "client" },
      { text: "As crianças ficaram enlouquecidas com o boneco que pedala sozinho.", time: "19:43", origin: "client" },
      { text: "Super alinhado com as competências da BNCC! Meus dias de planejamento ficaram muito mais leves.", time: "19:45", origin: "client" }
    ]
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "basico",
    name: "📦 PLANO BÁSICO (FOCO INICIAL)",
    subtitle: "Ideal apenas para conhecer o método e testar as primeiras dinâmicas básicas em texto.",
    price: "10",
    cents: ",00",
    pixPrice: "R$ 10,00",
    installments: "Pagamento único, acesso permanente",
    features: [
      "✅ Recebe 100 Atividades Sensoriais Básicas contra a agitação",
      "✅ Passo a passo ilustrado em formato PDF/Texto",
      "✅ Filtro simples por idade (4 a 12 anos)",
      "✅ Garantia incondicional de 7 dias",
      "❌ Sem acesso aos vídeos guiados",
      "❌ Sem a Ala de Engenhocas Mecânicas (Fliperama, Garra e Robótica)",
      "❌ Sem os +400 Projetos Avançados de Foco Profundo"
    ],
    nonFeatures: [],
    ctaText: "COMEÇAR NO PLANO BÁSICO POR R$ 10 →",
    highlighted: false
  },
  {
    id: "genio",
    name: "🔥 PLANO GÊNIO DO FOCO (COMPLETO)",
    subtitle: "94% das mães escolhem este plano pela autonomia dos vídeos e pelos projetos avançados de alta retenção.",
    price: "29",
    cents: ",90",
    pixPrice: "R$ 29,90",
    installments: "Ou em até 6x no cartão de crédito",
    originalPrice: "R$ 197,00",
    badge: "94% MAIS ESCOLHIDO",
    features: [
      "✅ Recebe o Acervo Completo com +500 Projetos de Estímulo Psicomotor",
      "✅ Acesso Liberado à Ala dos Brinquedos Mecânicos de Alta Concentração",
      "✅ Vídeo-tutoriais curtos com áudio explicativo (Autonomia para a criança)",
      "✅ Filtros avançados por tempo, nível de agitação e materiais de casa",
      "✅ Acesso permanente com todas as atualizações mensais inclusas",
      "✅ Garantia incondicional de 7 dias"
    ],
    nonFeatures: [],
    ctaText: "COMEÇAR NO LABORATÓRIO COMPLETO POR R$ 29,90 →",
    highlighted: true
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Meu filho tem diagnóstico de TDAH/TEA. O Laboratório ajuda?",
    answer: "Com certeza! Crianças atípicas precisam de forte estímulo visual e previsibilidade estruturada. O passo a passo visual e o trabalho físico e tátil das atividades funcionam como excelentes reguladores sensoriais, ajudando a diminuir a ansiedade e a canalizar a hiperatividade de forma produtiva."
  },
  {
    question: "Preciso comprar materiais caros ou ferramentas especiais?",
    answer: "De jeito nenhum. O projeto foi desenhado para usar o lixo limpo e reciclável da sua casa: caixas de sapato, rolos de papel higiênico, tampinhas de garrafa, pedaços de papelão, tesoura sem ponta e cola escolar comum."
  },
  {
    question: "Como eu recebo o material?",
    answer: "A entrega é feita de forma 100% automatizada. Assim que o pagamento for aprovado (Pix cai na hora, cartão em poucos minutos), os dados de login e a senha do portal chegam direto no e-mail que você informou na compra."
  },
  {
    question: "Eu não tenho paciência ou tempo para ensinar, vai funcionar?",
    answer: "Esse é o grande diferencial do Nosso Plano Completo! Ao contrário de e-books em que você precisa ficar lendo e traduzindo para a criança, os vídeos com áudio explicativo dão autonomia total. A criança olha, entende o movimento e executa sozinha."
  }
];
