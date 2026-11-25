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
    events.forEach(eventt => {

      const card = document.createElement('article');

      card.innerHTML = `
                <article class="program-card program-card--featured">
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
          </article>
            `

       
      if (eventt.vagas_disponiveis < 10) {

        const vagas_baixas = 

      } else {

        vagas_disponiveis.set.color("#1a1a1a");

      }
      */

      wrapper.appendChild(card);

    })
  } catch (error) {

    console.error('Nenhum programa encontrado!')
  }

}

listEvents();

async function eventInitializer() {

  const events = await listEvents();

  for (let i = 0; i < events.length; i++) {

    renderEvent(events[i]);

  }
}

async function renderEvent(eventt) {

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

  const btn = document.querySelector('.btn');

  btn.addEventListener('click', )

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