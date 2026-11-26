const url = 'https://dynamic-events-api.onrender.com/api/eventos';

const lista = document.getElementById('listaProgramas');
const mensagem = document.getElementById('mensagem');
const busca = document.getElementById('campoBusca');
const detalhe = document.getElementById('detalhePrograma');

let eventos = [];
let categoria = '';
let carregado = false;

// 1. CONSUMO DA API: fetch -> verificar resposta -> json.
async function buscarEventos() {
  mensagem.textContent = 'Carregando programas...';

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error('Erro na API');
    }

    eventos = await resposta.json();

    // Destaques primeiro.
    eventos.sort((a, b) => b.destaque - a.destaque);

    carregado = true;
    listarEventos();
  } catch (erro) {
    mensagem.textContent = 'Erro ao carregar programas.';
    mensagem.className = 'mensagem erro';
    console.log(erro);
  }
}

// 2. DOM: criar, configurar e adicionar ao pai com appendChild.
function criarElemento(pai, tag, classe = '', texto = '') {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  pai.appendChild(elemento);
  return elemento;
}

// 3. CRIAR UM CARD.
function criarCard(evento) {
  const card = document.createElement('article');
  card.className = 'program-card';

  if (evento.destaque) {
    card.classList.add('program-card--featured');
  }

  const imageWrap = criarElemento(card, 'div', 'program-card__image-wrap');
  const imagem = criarElemento(imageWrap, 'img', 'program-card__image');
  imagem.src = evento.imagem;
  imagem.alt = evento.nome;

  const body = criarElemento(card, 'div', 'program-card__body');
  const meta = criarElemento(body, 'div', 'program-card__meta');
  criarElemento(meta, 'span', 'badge', evento.categoria);

  if (evento.destaque) {
    criarElemento(meta, 'span', 'badge badge--primary', 'Destaque');
  }

  criarElemento(body, 'h3', '', evento.nome);
  criarElemento(body, 'p', '', evento.descricao);

  const dados = criarElemento(body, 'div', 'program-card__details');
  criarElemento(dados, 'span', '', evento.data);
  criarElemento(dados, 'span', '', evento.local);

  const footer = criarElemento(body, 'div', 'program-card__footer');
  criarElemento(footer, 'strong', '', 'R$ ' + evento.preco);

  const vagas = criarElemento(footer, 'span', 'vagas', evento.vagas_disponiveis + ' vagas disponíveis');
  if (evento.vagas_disponiveis < 10) {
    vagas.classList.add('vagas--baixas');
  }

  const link = criarElemento(body, 'a', 'btn btn-outline', 'Ver detalhes');
  link.href = 'detalhe.html?id=' + encodeURIComponent(evento.id);

  lista.appendChild(card);
}

// 4. FILTRAR E LISTAR: filter seleciona; forEach percorre.
function listarEventos() {
  if (!carregado) return;

  lista.textContent = '';
  const texto = busca.value.toLowerCase().trim();

  const filtrados = eventos.filter(evento => {
    const mesmaCategoria = categoria === '' || evento.categoria === categoria;
    const encontrouTexto = evento.nome.toLowerCase().includes(texto) ||
      evento.descricao.toLowerCase().includes(texto) ||
      evento.local.toLowerCase().includes(texto);

    return mesmaCategoria && encontrouTexto;
  });

  filtrados.forEach(evento => {
    criarCard(evento);
  });

  if (filtrados.length === 0) {
    mensagem.textContent = 'Nenhum programa encontrado.';
  } else {
    mensagem.textContent = '';
  }
}

// 5. DETALHES: pegar ID da URL e consultar um único evento.
async function buscarDetalhe() {
  const aviso = document.getElementById('mensagemDetalhe');
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('id');

  if (!id) {
    aviso.textContent = 'Nenhum ID informado.';
    return;
  }

  aviso.textContent = 'Carregando detalhes...';

  try {
    const resposta = await fetch(url + '/' + encodeURIComponent(id));

    if (resposta.status === 404) {
      aviso.textContent = 'Programa não encontrado.';
      return;
    }

    if (!resposta.ok) {
      throw new Error('Erro na API');
    }

    const evento = await resposta.json();
    detalhe.textContent = '';

    const imageWrap = criarElemento(detalhe, 'div', 'detail-card__image-wrap');
    const imagem = criarElemento(imageWrap, 'img', 'detail-card__image');
    imagem.src = evento.imagem;
    imagem.alt = evento.nome;

    const body = criarElemento(detalhe, 'div', 'detail-card__content');
    const meta = criarElemento(body, 'div', 'program-card__meta');
    criarElemento(meta, 'span', 'badge', evento.categoria);

    if (evento.destaque) {
      criarElemento(meta, 'span', 'badge badge--primary', 'Destaque');
    }

    criarElemento(body, 'h1', '', evento.nome);
    criarElemento(body, 'p', '', evento.descricao);

    const dados = criarElemento(body, 'div', 'detail-list');
    criarElemento(dados, 'div', '', 'Preço: R$ ' + evento.preco);
    criarElemento(dados, 'div', '', 'Data: ' + evento.data);
    criarElemento(dados, 'div', '', 'Local: ' + evento.local);

    const vagas = criarElemento(dados, 'strong', 'vagas', evento.vagas_disponiveis + ' vagas disponíveis');
    if (evento.vagas_disponiveis < 10) {
      vagas.classList.add('vagas--baixas');
    }

    aviso.textContent = '';
  } catch (erro) {
    aviso.textContent = 'Erro ao carregar detalhes.';
    aviso.className = 'mensagem erro';
    console.log(erro);
  }
}

// 6. EVENTOS DO HTML: executar apenas na página correspondente.
if (lista) {
  buscarEventos();

  busca.addEventListener('input', listarEventos);

  const botoes = document.querySelectorAll('.filtro');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      botoes.forEach(item => item.classList.remove('ativo'));
      botao.classList.add('ativo');
      categoria = botao.dataset.categoria;
      listarEventos();
    });
  });
}

if (detalhe) {
  buscarDetalhe();
}
