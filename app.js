const API_URL = 'https://dynamic-events-api.onrender.com/api/eventos';

// Os dados ficam salvos para a busca e os filtros não precisarem chamar a API novamente.
let eventos = [];
let categoriaAtual = '';

function precoEmReais(preco) {
  const valor = Number(preco);
  return Number.isFinite(valor)
    ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Preço indisponível';
}

function mostrarMensagem(elemento, texto, erro = false) {
  elemento.textContent = texto;
  elemento.className = erro ? 'mensagem erro' : 'mensagem';
}

// Monta um card usando as classes CSS fornecidas na prova.
function criarCard(evento) {
  const card = document.createElement('article');
  card.className = 'program-card';

  if (evento.destaque) {
    card.classList.add('program-card--featured');
  }

  card.innerHTML = `
    <div class="program-card__image-wrap">
      <img class="program-card__image" alt="">
    </div>
    <div class="program-card__body">
      <div class="program-card__meta">
        <span class="badge categoria"></span>
      </div>
      <h3></h3>
      <p class="descricao"></p>
      <div class="program-card__details">
        <span class="data"></span>
        <span class="local"></span>
      </div>
      <div class="program-card__footer">
        <strong class="preco"></strong>
        <span class="vagas"></span>
      </div>
      <a class="btn btn-outline">Ver detalhes</a>
    </div>
  `;

  const imagem = card.querySelector('.program-card__image');
  imagem.src = evento.imagem || '';
  imagem.alt = evento.nome || 'Imagem do programa';

  card.querySelector('.categoria').textContent = evento.categoria || '';
  card.querySelector('h3').textContent = evento.nome || '';
  card.querySelector('.descricao').textContent = evento.descricao || '';
  card.querySelector('.data').textContent = evento.data || '';
  card.querySelector('.local').textContent = evento.local || '';
  card.querySelector('.preco').textContent = precoEmReais(evento.preco);

  const vagas = card.querySelector('.vagas');
  vagas.textContent = `${evento.vagas_disponiveis} vagas disponíveis`;
  if (Number(evento.vagas_disponiveis) < 10) {
    vagas.classList.add('vagas--baixas');
  }

  if (evento.destaque) {
    const badge = document.createElement('span');
    badge.className = 'badge badge--primary';
    badge.textContent = 'Destaque';
    card.querySelector('.program-card__meta').appendChild(badge);
  }

  card.querySelector('a').href = `detalhe.html?id=${encodeURIComponent(evento.id)}`;
  return card;
}

// Atualiza os cards sem recarregar a página.
function renderizarEventos() {
  const lista = document.getElementById('listaProgramas');
  const mensagem = document.getElementById('mensagem');
  const texto = document.getElementById('campoBusca').value.trim().toLocaleLowerCase('pt-BR');

  const filtrados = eventos.filter(evento => {
    const categoria = String(evento.categoria || '').toLocaleLowerCase('pt-BR');
    const categoriaCorreta = !categoriaAtual || categoria === categoriaAtual.toLocaleLowerCase('pt-BR');
    const conteudo = `${evento.nome || ''} ${evento.descricao || ''} ${evento.local || ''}`.toLocaleLowerCase('pt-BR');
    return categoriaCorreta && conteudo.includes(texto);
  });

  lista.replaceChildren(); // Remove os cards antigos.

  if (filtrados.length === 0) {
    mostrarMensagem(mensagem, 'Nenhum programa encontrado.');
    return;
  }

  // appendChild coloca cada card na div #listaProgramas.
  filtrados.forEach(evento => lista.appendChild(criarCard(evento)));
  mostrarMensagem(mensagem, '');
}

// Consulta todos os eventos e ordena os destaques primeiro.
async function listarEventos() {
  const mensagem = document.getElementById('mensagem');
  mostrarMensagem(mensagem, 'Carregando programas...');

  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

    const dados = await resposta.json();
    if (!Array.isArray(dados)) throw new Error('Formato inesperado da API');

    eventos = dados.sort((a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)));
    renderizarEventos();
  } catch (erro) {
    console.error('Erro ao carregar programas:', erro);
    mostrarMensagem(mensagem, 'Não foi possível carregar os programas.', true);
  }
}

// Lê o ID na URL e busca as informações de um único programa.
async function carregarDetalhe() {
  const mensagem = document.getElementById('mensagemDetalhe');
  const container = document.getElementById('detalhePrograma');
  const id = new URLSearchParams(window.location.search).get('id');

  if (!id) {
    mostrarMensagem(mensagem, 'Nenhum ID de programa informado.', true);
    return;
  }

  mostrarMensagem(mensagem, 'Carregando detalhes do programa...');

  try {
    const resposta = await fetch(`${API_URL}/${encodeURIComponent(id)}`);
    if (resposta.status === 404) {
      mostrarMensagem(mensagem, 'Programa não encontrado.', true);
      return;
    }
    if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

    const evento = await resposta.json();
    if (!evento || typeof evento !== 'object' || !evento.id) {
      throw new Error('Dados inválidos do programa');
    }

    container.innerHTML = `
      <div class="detail-card__image-wrap">
        <img class="detail-card__image" alt="">
      </div>
      <div class="detail-card__content">
        <div class="program-card__meta">
          <span class="badge categoria"></span>
        </div>
        <h1></h1>
        <p class="descricao"></p>
        <div class="detail-list">
          <div><span>Preço</span><strong class="preco"></strong></div>
          <div><span>Data</span><strong class="data"></strong></div>
          <div><span>Local</span><strong class="local"></strong></div>
          <div><span>Disponibilidade</span><strong class="vagas"></strong></div>
        </div>
      </div>
    `;

    const imagem = container.querySelector('.detail-card__image');
    imagem.src = evento.imagem || '';
    imagem.alt = evento.nome || 'Imagem do programa';

    container.querySelector('.categoria').textContent = evento.categoria || '';
    container.querySelector('h1').textContent = evento.nome || '';
    container.querySelector('.descricao').textContent = evento.descricao || '';
    container.querySelector('.preco').textContent = precoEmReais(evento.preco);
    container.querySelector('.data').textContent = evento.data || '';
    container.querySelector('.local').textContent = evento.local || '';

    const vagas = container.querySelector('.vagas');
    vagas.textContent = `${evento.vagas_disponiveis} vagas disponíveis`;
    if (Number(evento.vagas_disponiveis) < 10) vagas.classList.add('vagas--baixas');

    if (evento.destaque) {
      const badge = document.createElement('span');
      badge.className = 'badge badge--primary';
      badge.textContent = 'Destaque';
      container.querySelector('.program-card__meta').appendChild(badge);
    }

    mostrarMensagem(mensagem, '');
  } catch (erro) {
    console.error('Erro ao carregar detalhes:', erro);
    mostrarMensagem(mensagem, 'Não foi possível carregar os detalhes do programa.', true);
  }
}

// Executa apenas a parte correspondente à página aberta.
if (document.getElementById('listaProgramas')) {
  document.getElementById('campoBusca').addEventListener('input', renderizarEventos);

  document.querySelectorAll('.filtro').forEach(botao => {
    botao.addEventListener('click', () => {
      document.querySelectorAll('.filtro').forEach(item => item.classList.remove('ativo'));
      botao.classList.add('ativo');
      categoriaAtual = botao.dataset.categoria;
      renderizarEventos();
    });
  });

  listarEventos();
}

if (document.getElementById('detalhePrograma')) {
  carregarDetalhe();
}
