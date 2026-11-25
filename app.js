const url = 'https://dynamic-events-api.onrender.com/api/eventos';

const lista = document.getElementById('listaProgramas');
const mensagem = document.getElementById('mensagem');
const busca = document.getElementById('campoBusca');
const detalhe = document.getElementById('detalhePrograma');

let eventos = [];
let categoria = '';

// Cria um elemento e adiciona ao elemento pai.
function criarElemento(pai, tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  pai.appendChild(elemento);
  return elemento;
}

// Busca os eventos na API.
async function listEvents() {
  mensagem.textContent = 'Carregando programas...';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro na API');

    eventos = await response.json();
    eventos.sort((a, b) => Number(b.destaque) - Number(a.destaque));
    renderEvents();
  } catch (error) {
    mensagem.textContent = 'Erro ao carregar programas.';
    mensagem.className = 'mensagem erro';
  }
}

// Cria um card e adiciona na lista.
function renderEvent(evento) {
  const card = criarElemento(lista, 'article', 'program-card', '');

  if (evento.destaque) {
    card.classList.add('program-card--featured');
  }

  const imageWrap = criarElemento(card, 'div', 'program-card__image-wrap', '');
  const imagem = criarElemento(imageWrap, 'img', 'program-card__image', '');
  imagem.src = evento.imagem;
  imagem.alt = evento.nome;

  const body = criarElemento(card, 'div', 'program-card__body', '');
  const meta = criarElemento(body, 'div', 'program-card__meta', '');
  criarElemento(meta, 'span', 'badge', evento.categoria);

  if (evento.destaque) {
    criarElemento(meta, 'span', 'badge badge--primary', 'Destaque');
  }

  criarElemento(body, 'h3', '', evento.nome);
  criarElemento(body, 'p', '', evento.descricao);

  const details = criarElemento(body, 'div', 'program-card__details', '');
  criarElemento(details, 'span', '', evento.data);
  criarElemento(details, 'span', '', evento.local);

  const footer = criarElemento(body, 'div', 'program-card__footer', '');
  criarElemento(footer, 'strong', '', 'R$ ' + Number(evento.preco).toFixed(2));

  const vagas = criarElemento(footer, 'span', 'vagas', evento.vagas_disponiveis + ' vagas disponíveis');

  if (evento.vagas_disponiveis < 10) {
    vagas.classList.add('vagas--baixas');
  }

  const link = criarElemento(body, 'a', 'btn btn-outline', 'Ver detalhes');
  link.href = 'detalhe.html?id=' + encodeURIComponent(evento.id);
}

// Filtra e lista os eventos.
function renderEvents() {
  lista.textContent = '';
  const texto = busca.value.trim().toLowerCase();

  const filtrados = eventos.filter(evento => {
    const categoriaCorreta = categoria === '' || evento.categoria.toLowerCase() === categoria.toLowerCase();
    const textoCorreto = evento.nome.toLowerCase().includes(texto) ||
      evento.descricao.toLowerCase().includes(texto) ||
      evento.local.toLowerCase().includes(texto);

    return categoriaCorreta && textoCorreto;
  });

  filtrados.forEach(evento => renderEvent(evento));

  mensagem.textContent = filtrados.length === 0 ? 'Nenhum programa encontrado.' : '';
}

// Busca e exibe os detalhes.
async function detailsRender() {
  const mensagemDetalhe = document.getElementById('mensagemDetalhe');
  const id = new URLSearchParams(window.location.search).get('id');

  if (!id) {
    mensagemDetalhe.textContent = 'Nenhum ID informado.';
    return;
  }

  mensagemDetalhe.textContent = 'Carregando detalhes...';

  try {
    const response = await fetch(url + '/' + encodeURIComponent(id));

    if (response.status === 404) {
      mensagemDetalhe.textContent = 'Programa não encontrado.';
      return;
    }

    if (!response.ok) throw new Error('Erro na API');

    const evento = await response.json();
    detalhe.textContent = '';

    const imageWrap = criarElemento(detalhe, 'div', 'detail-card__image-wrap', '');
    const imagem = criarElemento(imageWrap, 'img', 'detail-card__image', '');
    imagem.src = evento.imagem;
    imagem.alt = evento.nome;

    const content = criarElemento(detalhe, 'div', 'detail-card__content', '');
    criarElemento(content, 'span', 'badge', evento.categoria);

    if (evento.destaque) {
      criarElemento(content, 'span', 'badge badge--primary', 'Destaque');
    }

    criarElemento(content, 'h1', '', evento.nome);
    criarElemento(content, 'p', '', evento.descricao);

    const dados = criarElemento(content, 'div', 'detail-list', '');
    criarElemento(dados, 'div', '', 'Preço: R$ ' + Number(evento.preco).toFixed(2));
    criarElemento(dados, 'div', '', 'Data: ' + evento.data);
    criarElemento(dados, 'div', '', 'Local: ' + evento.local);

    const vagas = criarElemento(dados, 'strong', 'vagas', evento.vagas_disponiveis + ' vagas disponíveis');

    if (evento.vagas_disponiveis < 10) {
      vagas.classList.add('vagas--baixas');
    }

    mensagemDetalhe.textContent = '';
  } catch (error) {
    mensagemDetalhe.textContent = 'Erro ao carregar detalhes.';
    mensagemDetalhe.className = 'mensagem erro';
  }
}

// Executa de acordo com a página aberta.
if (lista) {
  listEvents();
  busca.addEventListener('input', renderEvents);

  const botoes = document.querySelectorAll('.filtro');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      botoes.forEach(item => item.classList.remove('ativo'));
      botao.classList.add('ativo');
      categoria = botao.dataset.categoria;
      renderEvents();
    });
  });
}

if (detalhe) {
  detailsRender();
}
