const AgoSem1 = [
    { title: "Armadilha", text: "Direção: M. Night Shyamalan" },
    { title: "O Exorcismo", text: "Direção: Joshua John Miller, M.A. Fortin" },
    { title: "Harold e o Lápis Mágico", text: "Direção: Carlos Saldanha" }
];


const AgoSem2 = [
    { title: "Os Dragões", text: "Direção: Gustavo Spolidoro" }
];


const AgoSem3 = [
    { title: "Estômago 2: O Poderoso Chef", text: "Direção: Marcos Jorge" },
    { title: "Vitória", text: "Direção: Andrucha Waddington" },
    { title: "Se a Vida Começasse Agora", text: "Direção: Alexandre Klemperer" }
];


const AgoSem4 = [
    { title: "Pisque Duas Vezes", text: "Direção: Zoë Kravitz" }
];


const AgoSem5 = [
    { title: "Kraven - O Caçador", text: "Direção: J.C. Chandor" },
    { title: "Deus Ainda é Brasileiro", text: "Direção: Carlos Diegues" }
];


function createCardsAgo1(AgoSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${AgoSem1.title}</h5>
                    <p class="card-text">${AgoSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsAgo2(AgoSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${AgoSem2.title}</h5>
                    <p class="card-text">${AgoSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsAgo3(AgoSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${AgoSem3.title}</h5>
                    <p class="card-text">${AgoSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsAgo4(AgoSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${AgoSem4.title}</h5>
                    <p class="card-text">${AgoSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function renderCardsAgo1() {
    const cardContainer = document.getElementById("card-container-ago1");
    cardContainer.innerHTML = "";
    AgoSem1.forEach(AgoSem1 => {
        const cardHTML = createCardsAgo1(AgoSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsAgo2() {
    const cardContainer = document.getElementById("card-container-ago2");
    cardContainer.innerHTML = "";
    AgoSem2.forEach(AgoSem2 => {
        const cardHTML = createCardsAgo2(AgoSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsAgo3() {
    const cardContainer = document.getElementById("card-container-ago3");
    cardContainer.innerHTML = "";
    AgoSem3.forEach(AgoSem3 => {
        const cardHTML = createCardsAgo3(AgoSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsAgo4() {
    const cardContainer = document.getElementById("card-container-ago4");
    cardContainer.innerHTML = "";
    AgoSem4.forEach(AgoSem4 => {
        const cardHTML = createCardsAgo4(AgoSem4);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsAgo5() {
    const cardContainer = document.getElementById("card-container-ago5");
    cardContainer.innerHTML = "";
    AgoSem5.forEach(AgoSem5 => {
        const cardHTML = createCardsAgo4(AgoSem5);
        cardContainer.innerHTML += cardHTML;
    });
}


renderCardsAgo1();
renderCardsAgo2();
renderCardsAgo3();
renderCardsAgo4();
renderCardsAgo5();