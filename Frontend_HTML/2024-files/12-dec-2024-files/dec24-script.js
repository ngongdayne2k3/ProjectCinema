const DezSem2 = [
    { title: "The Lord Of The Rings: The War Of Rohirrim", text: "Direção: Kenji Kamiyama" }
];


const DezSem3 = [
    { title: "O Auto da Compadecida 2", text: "Direção: Guel Arraes, Flavia Lacerda" },
    { title: "Mufasa: O Rei Leão", text: "Direção: Barry Jenkins" },
    { title: "Avatar 3", text: "Direção: James Cameron" }
];


const DezSem4 = [
    { title: "Rambo 6: Forever", text: "Direção: Sylvester Stallone" },
    { title: "Tudo Por Um Pop Star 2", text: "Direção: Marco Antonio de Carvalho" },
    { title: "As Visões de Ulisses", text: "Direção: Rodrigo Van Der Put" },
    { title: "O Clube das Mulheres de Negócios", text: "Direção: Anna Muylaert" },
    { title: "Nós Somos o Amanhã", text: "Direção: Não especificada" }
];


function createCardsDez2(DezSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${DezSem2.title}</h5>
                    <p class="card-text">${DezSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsDez3(DezSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${DezSem3.title}</h5>
                    <p class="card-text">${DezSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsDez4(DezSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${DezSem4.title}</h5>
                    <p class="card-text">${DezSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function renderCardsDez2() {
    const cardContainer = document.getElementById("card-container-dec2");
    cardContainer.innerHTML = "";
    DezSem2.forEach(DezSem2 => {
        const cardHTML = createCardsDez2(DezSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsDez3() {
    const cardContainer = document.getElementById("card-container-dec3");
    cardContainer.innerHTML = "";
    DezSem3.forEach(DezSem3 => {
        const cardHTML = createCardsDez3(DezSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsDez4() {
    const cardContainer = document.getElementById("card-container-dec4");
    cardContainer.innerHTML = "";
    DezSem4.forEach(DezSem4 => {
        const cardHTML = createCardsDez4(DezSem4);
        cardContainer.innerHTML += cardHTML;
    });
}


renderCardsDez2();
renderCardsDez3();
renderCardsDez4();