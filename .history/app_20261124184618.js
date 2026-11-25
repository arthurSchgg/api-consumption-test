async function listEvents() {

    try {

        const response = await fetch('https://dynamic-events-api.onrender.com/api/eventos');

        if(!response.ok) {
            throw new Error(console.error);
        }

        const events = await response.json();

        console.log('Eventos carregados: ', events);
        
    }

    console.log(events)
}