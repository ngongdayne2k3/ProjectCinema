const SetSem1 = [
    { title: "Os Fantasmas Ainda se Divertem: Beetlejuice Beetlejuice", text: "Direção: Tim Burton" },
    { title: "SILVIO", text: "Direção: Marcelo Antunez" },
    { title: "Alarum", text: "Direção: Michael Polish" },
    { title: "Algas Marinhas", text: "" }
];


const SetSem3 = [
    { title: "Robô Selvagem", text: "Direção: Chris Sanders" }
];


const SetSem4 = [
    { title: "Transformers: O Início", text: "Direção: Josh Cooley" },
    { title: "Hellboy: The Crooked Man", text: "Direção: Brian Taylor" },
    { title: "Mato ou Morro", text: "Direção: Caco Souza" }
];


function createCardsSet1(SetSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${SetSem1.title}</h5>
                    <p class="card-text">${SetSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsSet3(SetSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${SetSem3.title}</h5>
                    <p class="card-text">${SetSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsSet4(SetSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${SetSem4.title}</h5>
                    <p class="card-text">${SetSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function renderCardsSet1() {
    const cardContainer = document.getElementById("card-container-set1");
    cardContainer.innerHTML = "";
    SetSem1.forEach(SetSem1 => {
        const cardHTML = createCardsSet1(SetSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsSet3() {
    const cardContainer = document.getElementById("card-container-set3");
    cardContainer.innerHTML = "";
    SetSem3.forEach(SetSem3 => {
        const cardHTML = createCardsSet3(SetSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsSet4() {
    const cardContainer = document.getElementById("card-container-set4");
    cardContainer.innerHTML = "";
    SetSem4.forEach(SetSem4 => {
        const cardHTML = createCardsSet4(SetSem4);
        cardContainer.innerHTML += cardHTML;
    });
}


renderCardsSet1();
renderCardsSet2();
renderCardsSet3();
renderCardsSet4();