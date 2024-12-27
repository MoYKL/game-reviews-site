    document.querySelectorAll(".menu a").forEach(link => 
        link.addEventListener("click",(e) => {
        e.preventDefault();
        document.querySelector(".dd").classList.remove("active");
        
        const catValue = link.text;
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "10d2368917msh490d55a983d5196p14bc44jsnb4a50e3ba4e6",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          };
          console.log(catValue)

          fetch(
            `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${catValue}`,
            options
          )
            .then((response) => response.json())
            .then((response) =>displayDataGame(response))
            .catch((err) => console.error(err))
    }));

function displayDataGame(data) {
    let gamesBox = ``;
     for (let i = 0; i < data.length; i++) {
       gamesBox += `
       <div class="col">
       <div data-id="${data[i].id}" class="card h-100 bg-transparent text-light" role="button" ">
       <p class="game-id">${data[i].id}</p>
          
          <div class="card-body">
             <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
             
             </figure>
 
             <figcaption>
 
                <div class="hstack justify-content-between">
                   <h3 class="h6 small">${data[i].title}</h3>
                   <span class="badge text-bg-primary p-2">Free</span>
                </div>
 
                <p class="card-text small text-center opacity-50">
                   ${data[i].short_description}
                </p>
 
             </figcaption>
          </div>
 
          <footer class="card-footer small hstack justify-content-between">
 
             <span class="badge badge-color">${data[i].genre}</span>
             <span class="badge badge-color">${data[i].platform}</span>
 
          </footer>
       </div>
    </div> `;
    }

    document.getElementById("gameData").innerHTML = gamesBox;
 }

document.getElementById("gameData").addEventListener("click", function (e) {
    const card = e.target.closest(".card");

    if (card) {
        const gameId = card.getAttribute("data-id");

        if (gameId) {
            getDetails(gameId);

            document.querySelector(".details").classList.remove("d-none");
            document.querySelector(".home").classList.add("d-none");
        }
    }
});

function displayDetails(data) { 
    const content = `
        <div class="col-md-4">
            <img src="${data.thumbnail}" class="w-100" alt="image details" />
        </div>
        <div class="col-md-8">
            <h3>Title: ${data.title}</h3>
            <p>Category: <span class="badge text-bg-info">${data.genre}</span></p>
            <p>Platform: <span class="badge text-bg-info">${data.platform}</span></p>
            <p>Status: <span class="badge text-bg-info">${data.status}</span></p>
            <p class="small">${data.description}</p>
            <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">Show Game</a>
        </div>
    `;

    document.getElementById("detailsContent").innerHTML = content;
}

function getDetails(idGames) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "10d2368917msh490d55a983d5196p14bc44jsnb4a50e3ba4e6",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
    };

    fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`,
        options
    )
        .then((response) => response.json())
        .then((response) => displayDetails(response))
        .catch((err) => console.error(err))
        .finally(() => {
            loading.classList.add("d-none");
        });
}

// Close the details view and return to the main game list
document.getElementById("btnClose").addEventListener("click", function () {
    document.querySelector(".details").classList.add("d-none");
    document.querySelector(".home").classList.remove("d-none");
});


