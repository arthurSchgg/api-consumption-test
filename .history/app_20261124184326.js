
async function listarEventos() {

    const res = await fetch("https://dynamic-events-api.onrender.com/api/eventos");
    const events = await Response.json();

    console.log(events)
}