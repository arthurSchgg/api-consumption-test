
async function listEvents() {

    try {

        const response = await fetch("https://dynamic-events-api.onrender.com/api/eventos");

        if(!response.ok) {
            throw new Error(console.error);
        }

        const events = await Response.json();

        console.log('')
        
    }

    console.log(events)
}