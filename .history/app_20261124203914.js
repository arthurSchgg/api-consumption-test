const vagas_baixas = document.getElementsByClassName('vagas vagas--baixas');

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

      const card = document.createElement('article');

      card.innerHTML = `
                <article class="program-card program-card--featured">
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
          </article>
            `x

      wrapper.appendChild(card);

    })
  } catch (error) {

    console.error('Nenhum programa encontrado!')
  }

}

listEvents();