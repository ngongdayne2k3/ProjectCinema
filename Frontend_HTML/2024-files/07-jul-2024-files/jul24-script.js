const JulSem1 = [
    { title: "Entrevista com o Demônio", text: "Direção: Colin Cairnes, Cameron Cairnes" },
    { title: "Tuesday – O Último Abraço", text: "Elenco: Lola Petticrew, Julia Louis-Dreyfus, Arinzé Kene" }
];


const JulSem2 = [
    { title: "Infestação", text: "Direção: Sébastien Vaniček" },
    { title: "Venom: The Last Dance", text: "Direção: Kelly Marcel" },
    { title: "Como Vender a Lua", text: "Direção: Greg Berlanti" }
];


const JulSem3 = [
    { title: "Twisters", text: "Direção: Lee Isaac Chung" },
    { title: "Os Inseparáveis", text: "Direção: Jérémie Degruson" }
];


const JulSem4 = [
    { title: "Deadpool & Wolverine", text: "Direção: Shawn Levy" },
    { title: "Cold Storage", text: "Direção: Jonny Campbell" }
];


function createCardsJul1(JulSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JulSem1.title}</h5>
                    <p class="card-text">${JulSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJul2(JulSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JulSem2.title}</h5>
                    <p class="card-text">${JulSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJul3(JulSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JulSem3.title}</h5>
                    <p class="card-text">${JulSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJul4(JulSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JulSem4.title}</h5>
                    <p class="card-text">${JulSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function renderCardsJul1() {
    const cardContainer = document.getElementById("card-container-jul1");
    cardContainer.innerHTML = "";
    JulSem1.forEach(JulSem1 => {
        const cardHTML = createCardsJul1(JulSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJul2() {
    const cardContainer = document.getElementById("card-container-jul2");
    cardContainer.innerHTML = "";
    JulSem2.forEach(JulSem2 => {
        const cardHTML = createCardsJul2(JulSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJul3() {
    const cardContainer = document.getElementById("card-container-jul3");
    cardContainer.innerHTML = "";
    JulSem3.forEach(JulSem3 => {
        const cardHTML = createCardsJul3(JulSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJul4() {
    const cardContainer = document.getElementById("card-container-jul4");
    cardContainer.innerHTML = "";
    JulSem4.forEach(JulSem4 => {
        const cardHTML = createCardsJul4(JulSem4);
        cardContainer.innerHTML += cardHTML;
    });
}


renderCardsJul1();
renderCardsJul2();
renderCardsJul3();
renderCardsJul4();