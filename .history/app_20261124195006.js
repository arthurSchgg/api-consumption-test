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


            /**
            if(eventt.vagas_disponiveis < 10) {
              
              vagas_disponiveis.color("#b3262b");

            } else {

              vagas_disponiveis.color("#1a1a1a");

            }

            wrapper.appendChild(card);
           
        })
    } catch (error) {

        console.error('Nenhum programa encontrado!')
    }

}

listEvents();

async function renderEvent() {

  const wrapper = document.getElementById('detalhePrograma');

    const renderCard = document.createElement('article');

            renderCard.innerHTML = `
                <article id="detalhePrograma" class="detail-card">
          <div class="detail-card__image-wrap">
            <img
              class="detail-card__image"
              src="${eventt.imagem}"
              alt="${eventt.nome}"
            />
          </div>

          <div class="detail-card__content">
            <div class="program-card__meta">
              <span class="badge">${eventt.categoria}</span>
              <span class="badge badge--primary">${eventt.destaque ? `<span>Destaque</span>` : ""}</span>
            </div>

            <h1>${eventt.nome}</h1>
            <p>
              ${eventt.descricao}
            </p>

            <div class="detail-list">
              <div>
                <span>Investimento</span>
                <strong>R$ ${eventt.preco},00</strong>
              </div>
              <div>
                <span>Data</span>
                <strong>${eventt.data}</strong>
              </div>
              <div>
                <span>Local</span>
                <strong>${eventt.local}</strong>
              </div>
              <div>
                <span>Vagas disponíveis</span>
                <strong class="vagas vagas--baixas">${eventt.vagas_disponiveis}</strong>
              </div>
            </div>
          </div>
        </article>
            `

            wrapper.appendChild(card);
}


async function orderCards() {

    const events = await listEvents();

    for(let i = 0; i < events.length; i++) {

        if(events.destaque === true) {

        }

    }

}


async function searchByFilter() {

}