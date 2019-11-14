const theatreId = 993;
const THEATRE_URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
let CURRENT_THEATRE;
const TICKETS_URL = "https://evening-plateau-54365.herokuapp.com/tickets"
document.addEventListener('DOMContentLoaded', ()=>{
    fetchdata()
})

function fetchdata(){
    fetch(THEATRE_URL)
    .then (resp => resp.json())
    .then (json => {
        CURRENT_THEATRE = json
        displayData()
        console.log(CURRENT_THEATRE)
    })
}

function displayData(){
    let showings = CURRENT_THEATRE.showings
    console.log("showings:",showings)
    let showingDiv = document.querySelector(".showings")
    console.log(showingDiv)
    showings.forEach(show => {
        let tickets_left = show.capacity - show.tickets_sold
        let cardDiv = document.createElement("div")
        cardDiv.className = "card"
        let contentDiv = document.createElement("div")
        contentDiv.className = "content"
        let headerDiv = document.createElement("div")
        headerDiv.className = "header"
        headerDiv.textContent = show.film.title
        console.log(headerDiv.textContent)
        let metaDiv = document.createElement("div")
        metaDiv.className = "meta"
        metaDiv.textContent= `${show.film.runtime} minutes`
        let descriptionDiv = document.createElement("div")
        descriptionDiv.className = "description"
        descriptionDiv.textContent = `${tickets_left} remaining tickets`
        let uiLabelSpan = document.createElement("span")
        uiLabelSpan.className = "ui label"
        uiLabelSpan.textContent = show.showtime
        let extraContentDiv = document.createElement("div")
        extraContentDiv.className = "extra content"
        let uiBlueButtonDiv = document.createElement("div")
        uiBlueButtonDiv.className = "ui blue button"
        uiBlueButtonDiv.textContent = "Buy Ticket"
        uiBlueButtonDiv.addEventListener('click', (ev)=>{
            ev.preventDefault();
            decreaseTickets(uiBlueButtonDiv, descriptionDiv, show)
        })
        contentDiv.append(headerDiv, metaDiv, descriptionDiv, uiLabelSpan)
        extraContentDiv.append(uiBlueButtonDiv)
        cardDiv.append(contentDiv, extraContentDiv)
        showingDiv.append(cardDiv)
    });   
}

function decreaseTickets(uiBlueButtonDiv, descriptionDiv, show){
    let tickets_left = show.capacity - show.tickets_sold
    console.log(show.tickets_sold)
    console.log(descriptionDiv.textContent)
    if (show.tickets_sold === show.capacity){
        uiBlueButtonDiv.textContent = "sold out"
    }else{
        show.tickets_sold--
        tickets_left--
        descriptionDiv.textContent = `${tickets_left} remaining tickets`

    fetch (TICKETS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json"
        },
        body: JSON.stringify({
           showing_id: show.id
        })
      })
      .then(resp => resp.json())
      .then(json => console.log(json))
    }
}



