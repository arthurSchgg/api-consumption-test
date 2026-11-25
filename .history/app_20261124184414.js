
async function listarEventos() {

    try {

        const response = await fetch("https://dynamic-events-api.onrender.com/api/eventos");
        const events = await Response.json();
        
    }

    console.log(events)
}