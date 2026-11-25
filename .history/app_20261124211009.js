function createCardPrograms(program) {

  const card = document.createElement('article');
  card.classList.add('program-card');

  const imagem = document.createElement('img');
  imagem.className = 'program-card__image-wrap';
  imagem.alt = program.nome;

  if(program.imagem) {
    imagem.src = program.imagem;
  } else {
    imagem.src = "https://placehold.co/300x150/333/fff?text=No+Image";
  }

  const categoria = document.createElement('span');
  categoria.textContent = `${program.categoria}`;

  const destaque = document.createElement('span');
  destaque.textContent = `${program.destaque}`;

  const nome = document.createElement('h3');
  nome.textContent = program.nome;

  const descricao = document.createElement('p');
  descricao.textContent = program.descricao;

  const data = document.createElement('span');
  data.textContent = program.data;

  const local = document.createElement('span');
  local.textContent = program.local;

  const preco = document.createElement('strong');
  preco.textContent = `R$ ${program.preco},00`;

  const vagas_disponiveis = document.createElement('span');
  vagas_disponiveis = ``
}

async function listEvents() {

  try {

    const response = await fetch('https://dynamic-events-api.onrender.com/api/eventos');

    if (!response.ok) {
      throw new Error(console.error);
    }

    const events = await response.json();

    console.log('Eventos carregados: ', events);

    const wrapper = document.getElementById('listaProgramas');

    //só estou utilizando esse "eventt", pois o event nao é possível
    events.forEach(event => {

      card.innerHTML = `
                <span class="vagas vagas--baixas">${event.vagas_disponiveis} Vagas disponíveis</span>
              </div>

              <a class="btn btn-outline" href="detalhe.html?${event.id}">Ver detalhes</a>
            </div>
          </article>
            `


      if (event.vagas_disponiveis < 10) {

        event.vagas_disponiveis === vagas_baixas

      }

      wrapper.appendChild(card);

    })
  } catch (error) {

    console.error('Nenhum programa encontrado!')
  }

}

listEvents();

async function orderEvents(event) {

  listEvents.forEach(eventos => {

    eventos.sort();

  })

}

async function eventInitializer() {

  const events = await listEvents();

  for (let i = 0; i < events.length; i++) {

    renderEvent(events[i]);

  }
}

async function renderEvent(event) {

  const cardRender = document.createElement('article');

  cardRender.innerHTML = `
            <div class="program-card__image-wrap">
              <img
                class="program-card__image"
                src="${event.imagem}"
                alt="${event.nome}"
              />
            </div>

            <div class="program-card__body">
              <div class="program-card__meta">
                <span class="badge">${event.categoria}</span>
                <span class="badge badge--primary">${event.destaque ? `<span>Destaque</span>` : ""}</span>
                
              </div>

              <h3>${event.nome}</h3>
              <p>
                ${event.descricao}
              </p>

              <div class="program-card__details">
                <span>${event.data}</span>
                <span>${event.local}</span>
              </div>

              <div class="program-card__footer">
                <strong>R$ ${event.preco},00</strong>
                <span class="vagas vagas--baixas">${event.vagas_disponiveis} Vagas disponíveis</span>
              </div>

              <a class="btn btn-outline" href="detalhe.html?${event.id}">Ver detalhes</a>
            </div>
            `

  const btn = document.querySelector('.btn');

  btn.addEventListener('click',)

}

function detailsRender(eventt) {

  const cardRender = document.createElement('article');

  cardRender.innerHTML = `
            <div class="program-card__image-wrap">
              <img
                class="program-card__image"
                src="${eventt.imagem}"
                alt="${eventt.nome}"
              />
            </div>

            <div class="program-card__body">
              <div class="program-card__meta">
                <span class="badge">${eventt.categoria}</span>
                <span class="badge badge--primary">${eventt.destaque ? `<span>Destaque</span>` : ""}</span>
                
              </div>

              <h3>${eventt.nome}</h3>
              <p>
                ${eventt.descricao}
              </p>

              <div class="program-card__details">
                <span>${eventt.data}</span>
                <span>${eventt.local}</span>
              </div>

              <div class="program-card__footer">
                <strong>R$ ${eventt.preco},00</strong>
                <span class="vagas vagas--baixas">${eventt.vagas_disponiveis} Vagas disponíveis</span>
              </div>

              <a class="btn btn-outline" href="detalhe.html?id=ev_1e6d6ac9">Ver detalhes</a>
            </div>
            `

}