const NovSem2 = [
    { title: "Reality de Horror - Influencers em Pânico", text: "Direção: Mike Ware, Dame Pierre" },
    { title: "MMA - Meu Melhor Amigo", text: "Direção: José Alvarenga Jr." },
    { title: "Alto Knights", text: "Direção: Barry Levinson" }
];

const NovSem3 = [
    { title: "Rosario", text: "Direção: Felipe Vargas (XI)" }
];

const NovSem4 = [
    { title: "Wicked", text: "Direção: Jon M. Chu" }
];


function createCardsNov2(NovSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${NovSem2.title}</h5>
                    <p class="card-text">${NovSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsNov3(NovSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${NovSem3.title}</h5>
                    <p class="card-text">${NovSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsNov4(NovSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${NovSem4.title}</h5>
                    <p class="card-text">${NovSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}



function renderCardsNov2() {
    const cardContainer = document.getElementById("card-container-nov2");
    cardContainer.innerHTML = "";
    NovSem2.forEach(NovSem2 => {
        const cardHTML = createCardsNov2(NovSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsNov3() {
    const cardContainer = document.getElementById("card-container-nov3");
    cardContainer.innerHTML = "";
    NovSem3.forEach(NovSem3 => {
        const cardHTML = createCardsNov3(NovSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsNov4() {
    const cardContainer = document.getElementById("card-container-nov4");
    cardContainer.innerHTML = "";
    NovSem4.forEach(NovSem4 => {
        const cardHTML = createCardsNov4(NovSem4);
        cardContainer.innerHTML += cardHTML;
    });
}


renderCardsNov2();
renderCardsNov3();
renderCardsNov4();