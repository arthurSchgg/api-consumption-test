
async function listarEventos() {

    try {

        const response = await fetch("https://dynamic-events-api.onrender.com/api/eventos");

        if(!response.ok) {
            
        }
        const events = await Response.json();
        
    }

    console.log(events)
}