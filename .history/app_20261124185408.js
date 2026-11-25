async function listEvents() {

    try {

        const response = await fetch('https://dynamic-events-api.onrender.com/api/eventos');

        if(!response.ok) {
            throw new Error(console.error);
        }

        const events = await response.json();

        console.log('Eventos carregados: ', events);
        
        const wrapper = document.getElementById('listaProgramas');

        //só estou utilizando esse "eventt", pois o event nao é possível
        events.forEach(eventt => {

            const card = document.createElement('article');

            card.innerHTML = `
                <div class="program-card__image-wrap">
                  <img class="program-card__image"
            `

            /**
             * <article class="program-card program-card--featured">
            <div class="program-card__image-wrap">
              <img
                class="program-card__image"
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200"
                alt="Imagem do programa Eficiência Energética em Motores IE4"
              />
            </div>

            <div class="program-card__body">
              <div class="program-card__meta">
                <span class="badge">Treinamentos</span>
                <span class="badge badge--primary">Destaque</span>
              </div>

              <h3>Eficiência Energética em Motores IE4</h3>
              <p>
                Treinamento para engenheiros e técnicos sobre dimensionamento de motores de alta eficiência e retorno de investimento.
              </p>

              <div class="program-card__details">
                <span>20/03/2026, 09:00</span>
                <span>Auditório WEG Motores — Jaraguá do Sul, SC</span>
              </div>

              <div class="program-card__footer">
                <strong>R$ 690,00</strong>
                <span class="vagas vagas--baixas">6 vagas disponíveis</span>
              </div>

              <a class="btn btn-outline" href="detalhe.html?id=ev_1e6d6ac9">Ver detalhes</a>
            </div>
          </article>
             */
        })
    } catch (error) {

        console.error(error.message)
    }

    console.log(events)
}