
async function listarEventos() {

    try {
        
    }
    const res = await fetch("https://dynamic-events-api.onrender.com/api/eventos");
    const events = await Response.json();

    console.log(events)
}