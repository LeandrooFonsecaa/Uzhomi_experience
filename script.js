/* ============================================================================
   UZ HOMI · SHOW EXPERIENCE 2026
   script.js — JavaScript puro, sem dependências.

   Sumário:
   01 · DADOS         → todo o conteúdo editável fica aqui em cima
   02 · UTILITÁRIOS
   03 · ÍCONES (SVG inline)
   04 · CONSTRUÇÃO    → gera slides de bloco, cards, curva
   05 · DECK          → navegação (mouse, scroll, teclado, botões)
   06 · ATMOSFERA     → partículas, cursor, luz do mouse
   07 · CENAS         → animações específicas (curva, contador, final)
   08 · BOOT
   ========================================================================= */

/* ============================================================
   01 · DADOS — edite aqui para mudar a apresentação
   ============================================================ */

/** Dados do show. A contagem regressiva usa DATA_HORA_SHOW. */
const SHOW = {
  data:        '17.07.2026',
  diaSemana:   'Sexta-feira',
  passagemSom: '15:30',
  inicio:      '23:00',
  local:       'Praça pública',
  publicoMin:  2,   // em milhares
  publicoMax:  3,
  dataHora:    new Date(2026, 6, 17, 23, 0, 0) // mês 6 = julho
};

/** Blocos do show, na ordem em que sobem ao palco. */
const BLOCOS = [
  {
    id: 'bahia',
    nome: 'Vem Bahia',
    cor: 'var(--c-bahia)',
    energia: 78,
    icone: 'sun',
    resumo: 'Levantar o público',
    tag: 'A primeira nota já decide a noite. Ninguém senta, ninguém espera, ninguém respira.',
    objetivos: ['Abrir o show', 'Levantar o público', 'Fazer todos levantarem', 'Nunca deixar silêncio']
  },
  {
    id: 'samba',
    nome: 'Samba',
    cor: 'var(--c-samba)',
    energia: 70,
    icone: 'smile',
    resumo: 'Alegria e interação',
    tag: 'Aqui o show vira conversa. Olho no olho, sorriso puxando sorriso.',
    objetivos: ['Alegria', 'Sorrisos', 'Interação', 'Leveza', 'Muito contato com o público']
  },
  {
    id: 'forro',
    nome: 'Forró',
    cor: 'var(--c-forro)',
    energia: 55,
    icone: 'heart',
    resumo: 'Conectar casais',
    tag: 'O único momento em que a energia desce de propósito — para poder subir mais alto depois.',
    objetivos: ['Conectar casais', 'Respirar', 'Criar clima']
  },
  {
    id: 'buteco',
    nome: 'Buteco',
    cor: 'var(--c-buteco)',
    energia: 68,
    icone: 'mic',
    resumo: 'Todo mundo cantando',
    tag: 'Quando o público canta mais alto que a banda, o bloco cumpriu a função.',
    objetivos: ['Todo mundo cantar', 'Criar nostalgia', 'Emoção']
  },
  {
    id: 'rock',
    nome: 'Rock',
    cor: 'var(--c-rock)',
    energia: 92,
    icone: 'bolt',
    resumo: 'Explosão de energia',
    tag: 'Palco inteiro ocupado. Volume, luz e movimento no mesmo lugar.',
    objetivos: ['Explodir energia', 'Banda inteira ocupando palco', 'Movimento', 'Luzes'],
    obsTecnicas: ['Executar com muita energia', 'Grande presença de palco', 'Movimentação intensa']
  },
  {
    id: 'final',
    nome: 'Final',
    cor: 'var(--c-final)',
    energia: 100,
    icone: 'star',
    resumo: 'Deixar saudade',
    tag: 'O público precisa ir embora querendo mais uma. É isso que traz ele de volta.',
    objetivos: ['Não deixar a energia cair', 'Encerrar em altíssimo nível', 'Deixar saudade'],
    obsTecnicas: ['Executar conforme a versão oficial da banda', 'Seguir exatamente a estrutura do Spotify', 'Sem alterações']
  }
];

/** Presença de palco. */
const PRESENCA = [
  { icone: 'smile',  t: 'Sorriso',       d: 'A cara da banda é a cara da festa. Sorriso é instrumento.' },
  { icone: 'move',   t: 'Movimentação',  d: 'Palco parado esfria o público. Ocupe o espaço.' },
  { icone: 'eye',    t: 'Contato visual',d: 'Olhe para as pessoas. Cada olhar puxa uma pessoa para o show.' },
  { icone: 'wave',   t: 'Expressões',    d: 'O rosto conta a música antes da letra chegar.' },
  { icone: 'shield', t: 'Confiança',     d: 'Errou? Segue. O público sente insegurança na hora.' },
  { icone: 'flame',  t: 'Entrega',       d: 'Toque como se fosse o único show do ano. Para alguém ali, é.' }
];

/** Erros que derrubam o show. */
const ERROS = [
  'Cara fechada',
  'Conversar durante o show',
  'Mexer no celular',
  'Olhar para o chão',
  'Afinar instrumento durante a música',
  'Quebrar o clima',
  'Falta de energia'
];

/** Formação da banda — instrumento + função dentro do show. */
const BANDA = [
  { nome: 'Leandro Fonseca', papel: 'Saxofone · Violão · Voz principal', itens: ['Liderança', 'Improviso', 'Comunicação', 'Energia'] },
  { nome: 'Júnior Mendes',   papel: 'Trompete · Percussão · Vocais',     itens: ['Naipe de sopro', 'Back vocal', 'Movimentação'] },
  { nome: 'Mike Alves',      papel: 'Guitarra · Flauta · Vocais',        itens: ['Peso da guitarra', 'Back vocal', 'Movimentação'] },
  { nome: 'Ziel',            papel: 'Teclados · Sanfona',                itens: ['Clima', 'Texturas', 'Cor do forró'] },
  { nome: 'Fabiano',         papel: 'Baixo',                             itens: ['Segurança', 'Pulsação'] },
  { nome: 'Marco',           papel: 'Bateria',                           itens: ['Controle', 'Energia', 'Precisão'] },
  { nome: 'Diego',           papel: 'Percussão',                         itens: ['Groove', 'Movimento'] }
];

/** Equipe fora do palco. */
const EQUIPE = [
  { icone: 'clipboard', k: 'Produção',       v: 'Vinícius' },
  { icone: 'sliders',   k: 'Técnico de som', v: 'Renato' },
  { icone: 'wrench',    k: 'Roadie',         v: 'Del' },
  { icone: 'megaphone', k: 'Marketing',      v: 'Juliana' }
];

/** Uniforme da noite. dc = cor da peça, dcInk = cor do ícone sobre ela. */
const VESTIMENTA = [
  { icone: 'shoe',  t: 'Tênis branco',      d: 'Branco, limpo, sem exceção',   dc: '#F6F6F4', dcInk: '#050506' },
  { icone: 'pants', t: 'Calça preta',       d: 'Preta lisa',                   dc: '#141417', dcInk: '#8A8A93' },
  { icone: 'shirt', t: 'Camisa preta',      d: 'Camisa ou blusa preta',        dc: '#141417', dcInk: '#8A8A93' },
  { icone: 'bow',   t: 'Gravata borboleta', d: 'Vermelha — o detalhe da noite', dc: '#E63946', dcInk: '#FFFFFF', red: true }
];

/** Público estimado (usado no contador do slide Compromisso). */
const PESSOAS_POR_SHOW = 3000;

/* ----------------------------------------------------------------
   REPERTÓRIO — anexo, uma página por item.
   Um item pode ter 1 ou várias músicas (pot-pourri / emenda).
   Formato:
     { bloco: 'bahia', musicas: [ { nome: 'SELVA BRANCA', tom: 'Em' } ] }
   · bloco  → opcional; usa os ids de BLOCOS para puxar a cor.
   · tom    → deixe '' quando ainda não estiver definido.
   Basta acrescentar itens no array: as páginas se criam sozinhas.
   ---------------------------------------------------------------- */
const SETLIST = [
  /* ---- VEM BAHIA ---- */
  { bloco: 'bahia', musicas: [
      { nome: 'Selva Branca', tom: 'Em' },
      { nome: 'Voa Voa', tom: 'Am' },
      { nome: 'Diga Que Valeu', tom: 'D' },
    ],
    obs: [
      'Solo inicial no teclado',
      'Em seguida entra o trompete no segundo solo',
      'Transição normal para Voa Voa',
      'Diga Que Valeu: tom corrigido para Ré Maior (D)'
    ] },
  { bloco: 'bahia', musicas: [
      { nome: 'Prefixo de Verão', tom: 'F#m' },
      { nome: 'Baianidade Nagô', tom: 'D' },
    ],
    obs: ['Prefixo de Verão: executar com bastante swing', 'Groove bem marcado'] },
  { bloco: 'bahia', musicas: [
      { nome: 'Anunciação', tom: 'G' },
      { nome: 'La Belle de Jour', tom: 'G' },
    ],
    obs: ['Antes de Anunciação: groove em Sol Menor (Gm) antes da entrada'] },
  { bloco: 'bahia', musicas: [{ nome: 'Te Espero no Farol', tom: 'G' }],
    obs: [
      'Executar exatamente como a versão do Spotify',
      'Introdução completa',
      'Todas as paradas',
      'Todas as voltas',
      'Não simplificar a estrutura'
    ] },

  /* ---- SAMBA DA UZ HOMI ---- */
  { bloco: 'samba', musicas: [
      { nome: 'Cheia de Manias', tom: 'Am' },
      { nome: 'Gostava Tanto de Você', tom: 'G' },
    ],
    obs: ['Cheia de Manias: solo de sax', 'Cheia de Manias: solo de trompete', 'Gostava Tanto de Você: sem observações'] },
  { bloco: 'samba', musicas: [
      { nome: 'É Tarde Demais', tom: 'E' },
      { nome: 'Que Se Chama Amor', tom: 'G' },
      { nome: 'Marrom Bombom', tom: 'G' },
    ],
    obs: [
      'É Tarde Demais: introdução começa no teclado',
      'É Tarde Demais: solo de teclado',
      'É Tarde Demais: solo de sax durante a música',
      'Na transição: mudança de tonalidade Dó → Ré → Sol',
      'Preparação para Sol Maior'
    ] },
  { bloco: 'samba', musicas: [
      { nome: 'Não Deixa o Samba Morrer', tom: 'Am' },
      { nome: 'Trem das Onze', tom: 'Dm' },
    ],
    obs: [
      'Mike assume o violão fazendo levada de samba',
      'Entrada iniciada com solo de sax',
      'Trem das Onze: mesmo formato'
    ] },
  { bloco: 'samba', part: 'Mike Alves', musicas: [{ nome: 'Como Nossos Pais', tom: '' }],
    obs: ['Participação especial: Mike assume a interpretação', 'Entra logo após Trem das Onze'] },

  /* ---- XOTE DA UZ HOMI ---- */
  { bloco: 'forro', musicas: [
      { nome: 'Milonga', tom: 'Em' },
      { nome: 'Inquilina', tom: 'Em' },
    ],
    obs: [
      'Ziel troca para a sanfona',
      'Ziel vai para a frente do palco',
      'Sax e sanfona dividem o protagonismo',
      'No final de Milonga, Ziel assume o solo da sanfona e entra direto em Inquilina'
    ] },
  { bloco: 'forro', musicas: [
      { nome: 'Xote das Meninas', tom: 'Em' },
      { nome: 'Espumas ao Vento', tom: 'Am' },
    ],
    obs: ['Xote das Meninas: solo de sanfona'] },
  { bloco: 'forro', musicas: [
      { nome: 'Xote dos Milagres', tom: 'G' },
      { nome: 'Eu Quero um Xodó', tom: 'G' },
    ] },
  { bloco: 'forro', musicas: [
      { nome: 'Sobradinho', tom: 'E' },
      { nome: 'Vida de Viajante', tom: 'E' },
      { nome: 'Esperando na Janela', tom: 'E' },
    ] },

  /* ---- BUTECO DA UZ HOMI ---- */
  { bloco: 'buteco', musicas: [{ nome: 'Telefone Mudo', tom: 'E' }] },
  { bloco: 'buteco', musicas: [
      { nome: 'Boate Azul', tom: 'Am' },
      { nome: 'Saudade Palavra Triste', tom: 'Am' },
    ] },
  { bloco: 'buteco', musicas: [
      { nome: 'Dama de Vermelho', tom: 'C' },
      { nome: 'Fruto Especial', tom: 'C' },
    ] },
  { bloco: 'buteco', musicas: [
      { nome: 'Tentei Te Esquecer', tom: 'C' },
      { nome: 'Seu Amor Ainda É Tudo', tom: 'Bm', part: 'Omar Santiago' },
      { nome: 'Declaração de Amor', tom: 'C' },
    ],
    obs: [
      'Participação especial: Omar Santiago em Seu Amor Ainda É Tudo',
      'Tom: Si Menor (Bm) — no impresso está Ré Menor (Dm)',
      'Entra logo depois de Fruto Especial',
      'Depois o bloco segue normalmente'
    ] },
  { bloco: 'buteco', musicas: [
      { nome: 'Cheiro de Shampoo', tom: 'C' },
      { nome: 'Cigana', tom: 'C' },
    ] },
  { bloco: 'buteco', musicas: [
      { nome: 'Caso Indefinido', tom: 'C#m' },
      { nome: 'Coração em Pedaços', tom: 'C' },
    ] },
  { bloco: 'buteco', musicas: [
      { nome: 'Irmãos da Lua', tom: 'C' },
      { nome: 'Evidências', tom: 'C' },
    ] },

  /* ---- ROCK DA UZ HOMI ---- */
  { bloco: 'rock', musicas: [
      { nome: 'Do Seu Lado', tom: 'D' },
      { nome: 'Vou Deixar', tom: 'D' },
      { nome: 'Além do Horizonte', tom: 'A' },
    ] },
  { bloco: 'rock', musicas: [
      { nome: 'Tempo Perdido', tom: 'C' },
      { nome: 'Pais e Filhos', tom: 'C' },
      { nome: 'Stand By Me', tom: 'G' },
    ] },
  { bloco: 'rock', part: 'André', musicas: [{ nome: 'Adivinha o Quê', tom: 'Em' }],
    obs: ['Participação especial: André', 'Música de Lulu Santos', 'Tom: Mi Menor (Em)', 'Entra logo após Stand By Me'] },

  /* ---- BLOCO FINAL ---- */
  { bloco: 'final', musicas: [
      { nome: 'Eva', tom: 'C' },
      { nome: 'Mila', tom: 'C' },
    ] },
  { bloco: 'final', musicas: [
      { nome: 'Não Quero Dinheiro', tom: 'G' },
      { nome: 'Descobridor dos 7 Mares', tom: 'Em' },
      { nome: 'Sonífera Ilha', tom: 'Am' },
      { nome: 'Morena Tropicana', tom: 'Am' },
    ] },
  { bloco: 'final', musicas: [
      { nome: 'País Tropical', tom: 'A' },
      { nome: 'Arerê', tom: 'A' },
      { nome: 'Taj Mahal', tom: 'Em' },
    ] },
];

/* ============================================================
   02 · UTILITÁRIOS
   ============================================================ */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const pad2  = n => String(n).padStart(2, '0');
const REDUZIDO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   03 · ÍCONES — SVG inline (stroke), sem bibliotecas
   ============================================================ */
const ICONES = {
  sun:   '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  heart: '<path d="M20.8 6.6a5 5 0 0 0-8.8-2 5 5 0 0 0-8.8 2c-1 3.5 2.3 6.9 8.8 12.4 6.5-5.5 9.8-8.9 8.8-12.4z"/>',
  mic:   '<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/>',
  bolt:  '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  star:  '<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9z"/>',
  move:  '<path d="M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3"/>',
  eye:   '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  wave:  '<path d="M2 12h2.5M7 6v12M11.5 3v18M16 7.5v9M20.5 10.5v3"/>',
  shield:'<path d="M12 2 4 5.5v6c0 5 3.4 9.3 8 10.5 4.6-1.2 8-5.5 8-10.5v-6z"/><path d="m9 12 2 2 4-4"/>',
  flame: '<path d="M12 22c4 0 7-2.8 7-6.5 0-4.6-4.5-6.3-4-11.5-3 1.5-6 5-6 8 0 1.2.4 2.2 1 3-1.5-.3-2.5-1.5-2.8-3C6 13.5 5 14.8 5 16.5 5 19.2 8 22 12 22z"/>',
  clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  wrench:'<path d="M20 5.5a4.5 4.5 0 0 1-5.9 4.3L6 17.9a2.1 2.1 0 0 1-3-3l8.1-8.1A4.5 4.5 0 0 1 15.5 2c.6 0 1.2.1 1.7.3l-3 3 2.5 2.5 3-3c.2.5.3 1.1.3 1.7z"/>',
  megaphone:'<path d="M3 10v4a1 1 0 0 0 1 1h3l7 4V5L7 9H4a1 1 0 0 0-1 1zM18 9a4 4 0 0 1 0 6"/>',
  sliders:'<path d="M6 3v8M6 15v6M12 3v4M12 11v10M18 3v12M18 19v2"/><circle cx="6" cy="13" r="2"/><circle cx="12" cy="9" r="2"/><circle cx="18" cy="17" r="2"/>',
  shoe:  '<path d="M2 17v-6h4l3 2h5.5c3 0 5.5 1.4 5.5 4v1H2zM6 11V8"/>',
  pants: '<path d="M7 3h10l1 18h-4l-2-9-2 9H5z"/>',
  shirt: '<path d="M9 3 5 5 3 9l3 1.5V21h12V10.5L21 9l-2-4-4-2a3 3 0 0 1-6 0z"/>',
  bow:   '<path d="M10 8 4 5v14l6-3zM14 8l6-3v14l-6-3z"/><rect x="10" y="8" width="4" height="8" rx="1.2"/>',
  check: '<path d="M9 5h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1"/><rect x="8" y="3" width="8" height="4" rx="1"/><path d="m8 12 2 2 4-4M8 17h6"/>',
  note:  '<circle cx="7" cy="18" r="3"/><circle cx="18" cy="15" r="3"/><path d="M10 18V5l11-2v12"/><path d="M10 8l11-2"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>'
};
const svgIcon = (nome, classe) =>
  `<svg class="${classe}" viewBox="0 0 24 24" aria-hidden="true">${ICONES[nome] || ''}</svg>`;

/* ============================================================
   04 · CONSTRUÇÃO DO CONTEÚDO
   ============================================================ */

/** Cards expansíveis do slide Repertório: objetivo emocional + músicas + observações. */
function montarRepertorio() {
  const alvo = $('#blocks');

  alvo.innerHTML = BLOCOS.map((b, i) => {
    const itens = SETLIST.filter(s => s.bloco === b.id);
    const musicas = itens.flatMap(s => s.musicas.map(m => m.nome));
    const paginasComObs = itens.filter(s => s.obs?.length).length;
    const temObs = paginasComObs > 0 || !!b.obsTecnicas?.length;

    return `
    <div class="block" style="--acc:${b.cor}" data-block="${b.id}">
      <button class="block__head" aria-expanded="false">
        ${svgIcon(b.icone, 'block__icon')}
        <span class="block__idx">Bloco ${pad2(i + 1)} · ${musicas.length} músicas</span>
        <h3 class="block__name">${b.nome}</h3>
        <p class="block__goal">${b.resumo}</p>
        ${etiqueta(temObs)}
      </button>

      <div class="block__body">
        <div class="block__inner">
          <p class="block__sub">Objetivo emocional</p>
          <ul class="block__list">${b.objetivos.map(o => `<li>${o}</li>`).join('')}</ul>

          <p class="block__sub">Músicas do bloco</p>
          <p class="block__songs">${musicas.join(' · ')}</p>

          ${temObs ? `
            <p class="block__sub">Observações técnicas</p>
            <ul class="block__list block__list--obs">
              ${(b.obsTecnicas || []).map(o => `<li>${o}</li>`).join('')}
              ${paginasComObs ? `<li class="block__ref">${paginasComObs} ${paginasComObs > 1 ? 'páginas do repertório têm' : 'página do repertório tem'} observações — ver no anexo</li>` : ''}
            </ul>` : ''}
        </div>
      </div>
      <p class="block__more">Toque para ver o detalhamento</p>
    </div>`;
  }).join('');

  // Accordion: abre um por vez.
  $$('.block__head', alvo).forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.parentElement;
      const abrindo = !card.classList.contains('is-open');
      $$('.block', alvo).forEach(o => {
        o.classList.remove('is-open');
        $('.block__head', o).setAttribute('aria-expanded', 'false');
      });
      if (abrindo) { card.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
}

/** Um slide dedicado para cada bloco do show (slides 5 a 10). */
function montarSlidesDeBloco() {
  const deck = $('#deck');
  const ancora = $('[data-anchor="presenca"]');

  BLOCOS.forEach((b, i) => {
    const sec = document.createElement('section');
    sec.className = 'slide slide--block';
    sec.style.setProperty('--acc', b.cor);
    sec.dataset.chapter = b.nome;
    sec.dataset.title = b.nome;
    sec.innerHTML = `
      <div class="wrap wrap--wide">
        <div class="blockhero">
          <p class="blockhero__idx r" data-r="1">Bloco ${pad2(i + 1)} · Energia ${b.energia}%</p>
          <h2 class="blockhero__name r" data-r="2">${b.nome}</h2>
          <p class="blockhero__tag r" data-r="3">${b.tag}</p>
        </div>
        <div class="goals">
          ${b.objetivos.map((o, j) => `
            <div class="goal r" data-r="${clamp(j + 3, 3, 8)}">
              <span class="goal__n">${pad2(j + 1)}</span>
              <span class="goal__t">${o}</span>
            </div>`).join('')}
        </div>
      </div>`;
    deck.insertBefore(sec, ancora);
  });
}

/** Cards de presença de palco. */
function montarPresenca() {
  $('#presence').innerHTML = PRESENCA.map((p, i) => `
    <article class="pcard" style="transition-delay:${0.35 + i * 0.09}s">
      ${svgIcon(p.icone, 'pcard__icon')}
      <h3 class="pcard__t">${p.t}</h3>
      <p class="pcard__d">${p.d}</p>
    </article>`).join('');
}

/** Cards vermelhos de erro. */
function montarErros() {
  $('#errors').innerHTML = ERROS.map((e, i) => `
    <article class="ecard" style="transition-delay:${0.3 + i * 0.08}s">
      <span class="ecard__x" aria-hidden="true">✕</span>
      <h3 class="ecard__t">${e}</h3>
    </article>`).join('');
}

/** Cards das funções de cada músico. */
function montarBanda() {
  $('#crew').innerHTML = BANDA.map((m, i) => `
    <article class="mcard" style="transition-delay:${0.32 + i * 0.09}s">
      <p class="mcard__role">${m.papel}</p>
      <h3 class="mcard__name">${m.nome}</h3>
      <ul class="mcard__list">${m.itens.map(x => `<li>${x}</li>`).join('')}</ul>
    </article>`).join('');
}

/** Cards da equipe fora do palco. */
function montarEquipe() {
  $('#staff').innerHTML = EQUIPE.map((e, i) => `
    <article class="scard" style="transition-delay:${0.35 + i * 0.1}s">
      ${svgIcon(e.icone, 'scard__icon')}
      <div>
        <span class="scard__k">${e.k}</span>
        <span class="scard__v">${e.v}</span>
      </div>
    </article>`).join('');
}

/** Cards do uniforme, cada um com a cor real da peça. */
function montarVestimenta() {
  $('#dress').innerHTML = VESTIMENTA.map((v, i) => `
    <article class="dcard ${v.red ? 'dcard--red' : ''}"
             style="--dc:${v.dc}; --dc-ink:${v.dcInk}; transition-delay:${0.35 + i * 0.1}s">
      <div class="dcard__swatch">${svgIcon(v.icone, '')}</div>
      <h3 class="dcard__t">${v.t}</h3>
      <p class="dcard__d">${v.d}</p>
    </article>`).join('');
}

/* ----------------------------------------------------------------
   Etiquetas de status técnico — usadas nas páginas do repertório
   e nos cards do slide Repertório.
   ---------------------------------------------------------------- */
const etiqueta = temObs => temObs
  ? `<span class="tag tag--warn">${svgIcon('note', 'tag__i')}Atenção especial</span>`
  : `<span class="tag tag--ok">${svgIcon('check', 'tag__i')}Sem observações técnicas</span>`;

/** Card de observações técnicas (accordion). Devolve '' quando não há nada a dizer. */
function cardObs(obs, obsBloco, nomeBloco) {
  const listas = [];
  if (obs && obs.length) {
    listas.push(`<ul class="obs__list">${obs.map(o => `<li>${o}</li>`).join('')}</ul>`);
  }
  if (obsBloco && obsBloco.length) {
    listas.push(`
      <p class="obs__sub">Observação geral do bloco ${nomeBloco}</p>
      <ul class="obs__list obs__list--bloco">${obsBloco.map(o => `<li>${o}</li>`).join('')}</ul>`);
  }
  if (!listas.length) return '';

  return `
    <div class="obs">
      <button class="obs__head" aria-expanded="false">
        ${svgIcon('check', 'obs__icon')}
        <span class="obs__t">Observações Técnicas</span>
        <span class="obs__n">${(obs?.length || 0) + (obsBloco?.length || 0)}</span>
        ${svgIcon('chevron', 'obs__chev')}
      </button>
      <div class="obs__body"><div class="obs__inner">${listas.join('')}</div></div>
    </div>`;
}

/** Liga o accordion das observações dentro de um contexto. */
function ligarObs(ctx) {
  $$('.obs__head', ctx).forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const abriu = btn.parentElement.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', abriu);
    });
  });
}

/* ----------------------------------------------------------------
   PDF PARA O TIME
   Monta uma folha limpa (preto no branco) com o repertório completo
   e as observações técnicas, e chama a impressão do navegador.
   O usuário escolhe "Salvar como PDF" e envia no grupo da banda.
   ---------------------------------------------------------------- */
function montarPdf() {
  const doc = $('#printDoc');
  let n = 0;

  const blocos = BLOCOS.map(b => {
    const itens = SETLIST.filter(s => s.bloco === b.id);
    if (!itens.length) return '';

    const linhas = itens.map(item => {
      n++;
      const musicas = item.musicas.map(m => `
        <div class="p-song">
          <span class="p-song__n">${m.nome}${m.part ? ` <em>· part. ${m.part}</em>` : ''}</span>
          <span class="p-song__k">${m.tom || '—'}</span>
        </div>`).join('');

      const obs = item.obs?.length
        ? `<ul class="p-obs">${item.obs.map(o => `<li>${o}</li>`).join('')}</ul>`
        : '';

      return `<div class="p-item"><span class="p-item__n">${n}.</span><div class="p-item__c">${musicas}${obs}</div></div>`;
    }).join('');

    const obsBloco = b.obsTecnicas?.length
      ? `<ul class="p-obs p-obs--bloco">${b.obsTecnicas.map(o => `<li>${o}</li>`).join('')}</ul>`
      : '';

    return `<section class="p-block"><h2 class="p-block__t">${b.nome} da Uz Homi</h2>${obsBloco}${linhas}</section>`;
  }).join('');

  const totalMusicas = SETLIST.reduce((t, i) => t + i.musicas.length, 0);

  doc.innerHTML = `
    <header class="p-head">
      <img src="assets/uz-homi-logo.png" alt="Uz Homi">
      <div>
        <h1>Show Baile 2026 · Repertório</h1>
        <p>${SHOW.data} · ${SHOW.diaSemana} — Passagem de som ${SHOW.passagemSom} · Show ${SHOW.inicio}</p>
        <p>${SETLIST.length} itens · ${totalMusicas} músicas · ${SHOW.local}</p>
      </div>
    </header>
    ${blocos}
    <footer class="p-foot">
      <p><b>Banda Uz Homi</b> · Música Boa ao Vivo</p>
      <p>Rua Arlindo José de Oliveira, 495, Acácias, Capelinha - MG · bandauzhomi@gmail.com</p>
      <p>Projeto por Leandro Fonseca</p>
    </footer>`;
}

/** Repertório em texto puro, formatado para o grupo do WhatsApp. */
function textoRepertorio() {
  let n = 0;
  const linhas = [
    `*SHOW BAILE 2026 — REPERTÓRIO*`,
    `${SHOW.data} · ${SHOW.diaSemana}`,
    `Passagem de som ${SHOW.passagemSom} · Show ${SHOW.inicio}`,
    ''
  ];

  BLOCOS.forEach(b => {
    const itens = SETLIST.filter(s => s.bloco === b.id);
    if (!itens.length) return;
    linhas.push(`*${b.nome.toUpperCase()}*`);
    itens.forEach(item => {
      n++;
      item.musicas.forEach((m, j) => {
        const prefixo = j === 0 ? `${n}. ` : '   ';
        const tom = m.tom ? ` - ${m.tom}` : ' - (tom a definir)';
        const part = m.part ? ` [part. ${m.part}]` : '';
        linhas.push(`${prefixo}${m.nome.toUpperCase()}${tom}${part}`);
      });
      if (item.part) linhas[linhas.length - 1] += ` [part. ${item.part}]`;
    });
    linhas.push('');
  });

  const comObs = SETLIST.filter(i => i.obs?.length).length;
  linhas.push(`_${SETLIST.length} itens · ${SETLIST.reduce((t, i) => t + i.musicas.length, 0)} músicas_`);
  linhas.push(`_${comObs} itens têm observações técnicas — estão no PDF do briefing._`);
  linhas.push('');
  linhas.push('Banda Uz Homi · Música Boa ao Vivo');

  return linhas.join('\n');
}

/** Liga os botões de envio do repertório. */
function ligarAcoesRepertorio() {
  const dica = $('#repHint');
  const avisar = msg => {
    const original = dica.textContent;
    dica.textContent = msg;
    dica.classList.add('is-ok');
    setTimeout(() => { dica.textContent = original; dica.classList.remove('is-ok'); }, 3200);
  };

  // PDF: abre a impressão do navegador (o usuário escolhe "Salvar como PDF").
  $('#btnPdf').addEventListener('click', () => window.print());

  // WhatsApp: abre o app já com o repertório em texto; o usuário escolhe o grupo.
  $('#btnWpp').addEventListener('click', () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(textoRepertorio())}`, '_blank', 'noopener');
  });

  // Cópia: útil para colar em qualquer lugar (e-mail, notas, outro grupo).
  $('#btnCopy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textoRepertorio());
      avisar('✓ Repertório copiado — é só colar no grupo');
    } catch {
      avisar('Não consegui copiar — use o botão do WhatsApp');
    }
  });
}

/** Anexo do repertório: uma página por item, depois do slide final. */
function montarSetlist() {
  const deck = $('#deck');
  const total = SETLIST.length;

  SETLIST.forEach((item, i) => {
    const b = BLOCOS.find(x => x.id === item.bloco);
    const n = i + 1;
    const varias = item.musicas.length > 1;
    const temObs = !!(item.obs?.length || b?.obsTecnicas?.length);

    const sec = document.createElement('section');
    sec.className = `slide slide--song ${item.part ? 'slide--part' : ''}`;
    sec.dataset.appendix = 'true';
    sec.dataset.chapter = `Música ${pad2(n)}`;
    sec.dataset.title = item.musicas[0].nome;
    sec.style.setProperty('--acc', b ? b.cor : 'var(--gold)');

    sec.innerHTML = `
      <div class="wrap wrap--wide">
        <div class="song__head r" data-r="1">
          <span class="song__n">${pad2(n)}<i>/${pad2(total)}</i></span>
          ${b ? `<span class="song__block">${svgIcon(b.icone, 'song__bicon')}${b.nome}</span>` : ''}
          ${item.part ? `<span class="song__part">${svgIcon('star', 'song__bicon')}Participação especial · ${item.part}</span>` : ''}
          ${varias ? `<span class="song__medley">Emenda · ${item.musicas.length} músicas</span>` : ''}
          ${etiqueta(temObs)}
        </div>
        <ol class="song__list ${varias ? 'song__list--multi' : ''}">
          ${item.musicas.map((m, j) => `
            <li class="song r" data-r="${clamp(j + 2, 2, 8)}">
              ${varias ? `<span class="song__seq">${j + 1}</span>` : ''}
              <span class="song__name">${m.nome}${m.part ? `<span class="song__guest">${svgIcon('star', 'song__gicon')}${m.part}</span>` : ''}</span>
              <span class="song__key ${m.tom ? '' : 'song__key--todo'}">${m.tom || 'tom a definir'}</span>
            </li>`).join('')}
        </ol>
        <div class="r" data-r="6">${cardObs(item.obs, b?.obsTecnicas, b?.nome)}</div>
      </div>`;
    deck.appendChild(sec);
    ligarObs(sec);
  });
}

/** Marca d'água da banda em todos os slides (exceto intro e final, que já têm a logo grande). */
function montarMarcaDagua() {
  $$('.slide').forEach(s => {
    if (s.classList.contains('slide--intro') || s.classList.contains('slide--finale')) return;
    const img = document.createElement('img');
    img.className = 'slide__mark';
    img.src = 'assets/uz-homi-logo.png';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    s.appendChild(img);
  });
}

/* ----------------------------------------------------------------
   IMAGEM QUE NÃO CARREGA NÃO PODE QUEBRAR A APRESENTAÇÃO.
   Se um logo faltar (ex.: a pasta assets/ não subiu no deploy), entra
   um wordmark tipográfico no lugar do ícone de imagem quebrada.
   ---------------------------------------------------------------- */
function protegerImagens() {
  const cair = img => {
    if (img.classList.contains('intro__logo') || img.classList.contains('finale__logo')) {
      const w = document.createElement('span');
      w.className = `wordmark ${img.classList.contains('finale__logo') ? 'wordmark--xl' : ''}`;
      w.textContent = 'Uz Homi';
      img.replaceWith(w);
    } else {
      img.remove();   // marca d'água, HUD e crédito somem sem deixar buraco
    }
  };

  $$('img').forEach(img => {
    // A imagem pode ter falhado antes deste script rodar: checa o estado também.
    if (img.complete && img.naturalWidth === 0) cair(img);
    else img.addEventListener('error', () => cair(img), { once: true });
  });
}

/** Numera os capítulos automaticamente — some ou acrescente slides sem renumerar na mão. */
function numerarCapitulos() {
  let n = 0;
  $$('.slide').forEach(s => {
    const alvo = $('[data-auto-chapter]', s);
    if (!alvo) return;
    alvo.textContent = `Capítulo ${pad2(++n)}`;
  });
}

/** Curva do show: grade, linha, área, pontos e eixo. */
function montarCurva() {
  const W = 1000, H = 380, PAD = 40;
  const pontos = BLOCOS.map((b, i) => ({
    x: PAD + (i * (W - PAD * 2)) / (BLOCOS.length - 1),
    y: H - PAD - ((b.energia / 100) * (H - PAD * 2)),
    ...b
  }));

  // Grade horizontal (referência de energia)
  $('#curveGrid').innerHTML = [0, 25, 50, 75, 100]
    .map(p => { const y = H - PAD - (p / 100) * (H - PAD * 2); return `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`; })
    .join('');

  // Caminho suavizado (Catmull-Rom → Bézier cúbica)
  const d = pontos.map((p, i, a) => {
    if (!i) return `M ${p.x} ${p.y}`;
    const p0 = a[i - 2] || a[i - 1], p1 = a[i - 1], p3 = a[i + 1] || p;
    const c1x = p1.x + (p.x - p0.x) / 6,  c1y = p1.y + (p.y - p0.y) / 6;
    const c2x = p.x  - (p3.x - p1.x) / 6, c2y = p.y  - (p3.y - p1.y) / 6;
    return `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p.x} ${p.y}`;
  }).join(' ');

  const linha = $('#curveLine');
  linha.setAttribute('d', d);
  $('#curveArea').setAttribute('d', `${d} L ${pontos.at(-1).x} ${H - PAD} L ${pontos[0].x} ${H - PAD} Z`);
  linha.style.setProperty('--len', linha.getTotalLength());

  // Pontos nos picos
  $('#curveDots').innerHTML = pontos.map((p, i) => `
    <g class="cdot" style="animation-delay:${1 + i * 0.32}s">
      <circle cx="${p.x}" cy="${p.y}" r="13" fill="${p.cor}" opacity=".18"/>
      <circle cx="${p.x}" cy="${p.y}" r="5"  fill="${p.cor}"/>
      <circle cx="${p.x}" cy="${p.y}" r="5"  fill="none" stroke="#050506" stroke-width="1.5"/>
    </g>`).join('');

  // Eixo: nome do bloco + energia
  $('#curveAxis').innerHTML = pontos.map((p, i) => `
    <div class="axis__item" style="color:${p.cor}; transition-delay:${1.1 + i * 0.32}s">
      <div class="axis__bar"></div>
      <div class="axis__name">${p.nome}</div>
      <div class="axis__val">${p.energia}% energia</div>
    </div>`).join('');
}

/* ============================================================
   05 · DECK — navegação
   ============================================================ */
const Deck = {
  slides: [], atual: 0, travado: false,

  iniciar() {
    this.slides = $$('.slide');
    this.principais = this.slides.filter(s => !s.dataset.appendix); // briefing (sem o anexo)
    this.anexo = this.slides.filter(s => s.dataset.appendix);       // repertório
    $('#counterAll').textContent = pad2(this.principais.length - 1);
    this.montarTrilha();
    this.ligarEventos();
    this.ir(0, true);
  },

  /** Trilha lateral: capítulos do briefing + salto direto para cada bloco do repertório. */
  montarTrilha() {
    let html = this.principais.map((s, i) =>
      `<button class="rail__item" data-go="${i}" aria-label="Ir para ${s.dataset.title}">
         <span>${s.dataset.chapter}</span><i></i>
       </button>`).join('');

    // Uma entrada por bloco: aponta para a primeira música daquele bloco.
    const vistos = new Set();
    SETLIST.forEach((item, i) => {
      if (vistos.has(item.bloco)) return;
      vistos.add(item.bloco);
      const b = BLOCOS.find(x => x.id === item.bloco);
      const nome = b ? b.nome : 'Repertório';
      const primeiro = i === 0 ? ' rail__item--anexo' : '';
      html += `<button class="rail__item rail__item--song${primeiro}"
                       style="--acc:${b ? b.cor : 'var(--gold)'}"
                       data-go="${this.principais.length + i}"
                       aria-label="Ir para o bloco ${nome} no repertório">
                 <span>${nome}</span><i></i>
               </button>`;
    });

    $('#rail').innerHTML = html;
    $$('#rail .rail__item').forEach(b =>
      b.addEventListener('click', () => this.ir(+b.dataset.go)));
  },

  ligarEventos() {
    $('#btnNext').addEventListener('click', () => this.proximo());
    $('#btnPrev').addEventListener('click', () => this.anterior());
    $('#btnStart').addEventListener('click', () => this.proximo());
    $('#btnReplay').addEventListener('click', () => this.ir(0));

    // Scroll / trackpad — com trava para não pular vários slides
    let acumulado = 0, ocioso;
    window.addEventListener('wheel', e => {
      if (this.travado) return;
      const alvo = e.target.closest('.wrap');
      if (alvo && alvo.scrollHeight > alvo.clientHeight + 4) {
        const noTopo = alvo.scrollTop <= 0, noFim = alvo.scrollTop + alvo.clientHeight >= alvo.scrollHeight - 1;
        if (!(noTopo && e.deltaY < 0) && !(noFim && e.deltaY > 0)) return; // deixa o card rolar
      }
      acumulado += e.deltaY;
      clearTimeout(ocioso);
      ocioso = setTimeout(() => acumulado = 0, 180);
      if (Math.abs(acumulado) > 40) { acumulado > 0 ? this.proximo() : this.anterior(); acumulado = 0; }
    }, { passive: true });

    // Teclado
    window.addEventListener('keydown', e => {
      const avanca = ['ArrowRight', 'ArrowDown', ' ', 'Spacebar', 'Enter', 'PageDown'];
      const volta  = ['ArrowLeft', 'ArrowUp', 'PageUp'];
      if (avanca.includes(e.key)) { e.preventDefault(); this.proximo(); }
      else if (volta.includes(e.key)) { e.preventDefault(); this.anterior(); }
      else if (e.key === 'Home') { e.preventDefault(); this.ir(0); }
      else if (e.key === 'End')  { e.preventDefault(); this.ir(this.slides.length - 1); }
    });

    // Toque
    let y0 = null;
    window.addEventListener('touchstart', e => y0 = e.touches[0].clientY, { passive: true });
    window.addEventListener('touchend', e => {
      if (y0 === null) return;
      const dy = y0 - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 60) dy > 0 ? this.proximo() : this.anterior();
      y0 = null;
    }, { passive: true });
  },

  proximo()  { this.ir(this.atual + 1); },
  anterior() { this.ir(this.atual - 1); },

  ir(i, forcado = false) {
    i = clamp(i, 0, this.slides.length - 1);
    if (!forcado && (i === this.atual || this.travado)) return;

    this.travado = true;
    setTimeout(() => this.travado = false, REDUZIDO ? 60 : 720);

    this.slides.forEach((s, k) => {
      s.classList.toggle('is-active', k === i);
      s.classList.toggle('is-past', k < i);
    });
    this.atual = i;
    this.atualizarHud();
    Cenas.aoEntrar(this.slides[i], i);
  },

  atualizarHud() {
    const ultimoBriefing = this.principais.length - 1;
    const naIntro   = this.atual === 0;
    const noAnexo   = this.atual > ultimoBriefing;
    const posAnexo  = this.atual - this.principais.length;   // 0-based dentro do repertório

    // O progresso mede o briefing; no anexo ele fica cheio e vira barra do repertório.
    $('#progressBar').style.width = noAnexo
      ? `${((posAnexo + 1) / this.anexo.length) * 100}%`
      : `${(this.atual / ultimoBriefing) * 100}%`;
    $('#progressBar').classList.toggle('progress__bar--anexo', noAnexo);

    // Contador: "07 / 18" no briefing, "MÚSICA 01 / 12" no repertório.
    $('#counterNow').textContent = noAnexo ? pad2(posAnexo + 1) : pad2(this.atual);
    $('#counterAll').textContent = pad2(noAnexo ? this.anexo.length : ultimoBriefing);
    $('#counterLabel').textContent = noAnexo ? 'Música' : '';

    $('#btnPrev').disabled = naIntro;
    $('#btnNext').disabled = this.atual === this.slides.length - 1;

    // HUD some na intro para a abertura ocupar a tela inteira; a autoria fica sempre.
    ['#hudTop', '#hudBottom', '#rail'].forEach(sel => $(sel).classList.toggle('is-on', !naIntro));
    $('#credit').classList.add('is-on');

    $$('#rail .rail__item').forEach((b, k) => {
      const alvo = +b.dataset.go;
      if (b.classList.contains('rail__item--song')) {
        // Bloco ativo: da primeira música dele até a próxima entrada de bloco.
        const proximo = $$('#rail .rail__item--song').find(o => +o.dataset.go > alvo);
        const limite = proximo ? +proximo.dataset.go : this.slides.length;
        b.classList.toggle('is-on', noAnexo && this.atual >= alvo && this.atual < limite);
      } else {
        b.classList.toggle('is-on', !noAnexo && k === this.atual);
      }
    });
  }
};

/* ============================================================
   06 · ATMOSFERA
   ============================================================ */

/** Partículas discretas — poeira no facho de luz. */
function iniciarParticulas() {
  if (REDUZIDO) return;
  const cv = $('#particles'), ctx = cv.getContext('2d');
  let w, h, itens = [];

  const dimensionar = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const qtd = clamp(Math.round((innerWidth * innerHeight) / 26000), 30, 110);
    itens = Array.from({ length: qtd }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.5 + 0.35,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -(Math.random() * 0.24 + 0.05),
      a: Math.random() * 0.4 + 0.08,
      f: Math.random() * Math.PI * 2
    }));
  };

  const desenhar = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    itens.forEach(p => {
      p.f += 0.012;
      p.x += p.vx + Math.sin(p.f) * 0.12;
      p.y += p.vy;
      if (p.y < -10) { p.y = innerHeight + 10; p.x = Math.random() * innerWidth; }
      if (p.x < -10) p.x = innerWidth + 10;
      if (p.x > innerWidth + 10) p.x = -10;
      const brilho = p.a * (0.6 + 0.4 * Math.sin(p.f * 1.6));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(233,196,106,${brilho.toFixed(3)})`;
      ctx.fill();
    });
    requestAnimationFrame(desenhar);
  };

  dimensionar();
  addEventListener('resize', dimensionar);
  desenhar();
}

/** Cursor + luz que segue o mouse (com suavização). */
function iniciarPonteiro() {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const dot = $('#cursorDot'), ring = $('#cursorRing'), luz = $('#mouseLight');
  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my, lx = mx, ly = my;

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    const alvo = e.target.closest('button, a, .block, .goal, .buy, .pcard, .mcard, .fact, .scard, .dcard, .rail__item');
    ring.classList.toggle('is-hot', !!alvo);

    // Parallax: -1 a 1 em cada eixo, lido pela marca d'água
    const px = (mx / innerWidth  - 0.5) * 2;
    const py = (my / innerHeight - 0.5) * 2;
    document.documentElement.style.setProperty('--px', px.toFixed(3));
    document.documentElement.style.setProperty('--py', py.toFixed(3));
  });

  (function suavizar() {
    rx += (mx - rx) * 0.18;  ry += (my - ry) * 0.18;   // anel: segue rápido
    lx += (mx - lx) * 0.045; ly += (my - ly) * 0.045;  // luz: segue devagar
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    luz.style.transform  = `translate(${lx}px, ${ly}px)`;
    requestAnimationFrame(suavizar);
  })();
}

/* ============================================================
   07 · CENAS — animações disparadas ao entrar em cada slide
   ============================================================ */
const Cenas = {
  timers: [],

  limpar() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    clearInterval(this.relogio);
  },
  agendar(fn, ms) { this.timers.push(setTimeout(fn, REDUZIDO ? 0 : ms)); },

  aoEntrar(slide, i) {
    this.limpar();
    document.body.classList.toggle('is-locked', i === 0);
    if (slide.classList.contains('slide--info'))   this.info();
    if (slide.classList.contains('slide--curve'))  this.curva();
    if (slide.classList.contains('slide--commit')) this.contador($('#peopleCount'), PESSOAS_POR_SHOW, 1800);

    if (slide.classList.contains('slide--finale')) {
      this.final();
    } else {
      $$('.fseq').forEach(p => p.classList.remove('is-on'));
      $('#btnReplay').classList.remove('is-on');
    }
  },

  /** Contagem regressiva ao vivo + público estimado. */
  info() {
    const caixa = $('#countdown'), saida = $('#countdownValue');

    const tique = () => {
      const falta = SHOW.dataHora - Date.now();
      if (falta <= 0) {
        caixa.classList.add('is-live');
        $('.countdown__k', caixa).textContent = 'Agora é';
        saida.textContent = 'no palco';
        $$('.countdown__k', caixa)[1].textContent = '— vale cada segundo';
        clearInterval(this.relogio);
        return;
      }
      const d = Math.floor(falta / 864e5);
      const h = Math.floor(falta / 36e5) % 24;
      const m = Math.floor(falta / 6e4) % 60;
      const s = Math.floor(falta / 1e3) % 60;
      saida.textContent = d > 0
        ? `${d}d ${pad2(h)}h ${pad2(m)}m ${pad2(s)}s`
        : `${pad2(h)}h ${pad2(m)}m ${pad2(s)}s`;
    };

    tique();
    this.relogio = setInterval(tique, 1000);
    this.contador($('#crowdCount'), SHOW.publicoMax, 1400);
  },

  /** Medidor de energia acompanhando o traço da curva. */
  curva() {
    const saida = $('#curveValue');
    const picos = BLOCOS.map(b => b.energia);
    let t0 = null;
    const dur = 2600, atraso = 500;

    const passo = ts => {
      if (!t0) t0 = ts;
      const p = clamp((ts - t0 - atraso) / dur, 0, 1);
      const pos = p * (picos.length - 1);
      const a = picos[Math.floor(pos)], b = picos[Math.ceil(pos)] ?? a;
      const v = a + (b - a) * (pos - Math.floor(pos));
      saida.textContent = `${Math.round(v)}%`;
      if (p < 1 && $('.slide--curve').classList.contains('is-active')) requestAnimationFrame(passo);
    };
    saida.textContent = '0%';
    REDUZIDO ? (saida.textContent = '100%') : requestAnimationFrame(passo);
  },

  /** Contador com desaceleração. */
  contador(el, alvo, dur) {
    if (REDUZIDO) { el.textContent = alvo; return; }
    let t0 = null;
    const passo = ts => {
      if (!t0) t0 = ts;
      const p = clamp((ts - t0) / dur, 0, 1);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  },

  /** Sequência do slide final: logo → frases → botão. */
  final() {
    const frases = $$('.fseq'), replay = $('#btnReplay');
    frases.forEach(p => p.classList.remove('is-on'));
    replay.classList.remove('is-on');

    const base = 2200, hold = 3000;
    frases.forEach((p, i) => {
      this.agendar(() => {
        frases.forEach(o => o.classList.remove('is-on'));
        p.classList.add('is-on');
      }, base + i * hold);
    });
    this.agendar(() => replay.classList.add('is-on'), base + frases.length * hold);
  }
};

/* ============================================================
   08 · BOOT
   ============================================================ */
function iniciar() {
  montarSlidesDeBloco();   // precisa vir antes de o Deck ler os slides
  montarRepertorio();
  montarPresenca();
  montarErros();
  montarBanda();
  montarEquipe();
  montarVestimenta();
  montarCurva();
  montarPdf();             // folha do repertório para impressão / PDF
  ligarAcoesRepertorio();  // botões WhatsApp / PDF / copiar
  montarSetlist();          // anexo do repertório, depois do slide final
  montarMarcaDagua();
  numerarCapitulos();
  protegerImagens();       // precisa vir depois de toda <img> existir

  Deck.iniciar();
  iniciarParticulas();
  iniciarPonteiro();

  // Recalcula o traço da curva se a tela mudar de tamanho
  addEventListener('resize', () => {
    const l = $('#curveLine');
    if (l) l.style.setProperty('--len', l.getTotalLength());
  });
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', iniciar)
  : iniciar();
