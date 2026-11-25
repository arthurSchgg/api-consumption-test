
async function listarEventos() {

    const res = await fetch("https://dynamic-events-api.onrender.com/api/eventos");
    const events =  Response.json();

    console.log(events);
}