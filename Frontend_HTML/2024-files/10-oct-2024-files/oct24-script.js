const OutSem1 = [
    { title: "Coringa: Delírio a Dois", text: "Direção: Todd Phillips" },
    { title: "Querido David", text: "Direção: John McPhail" }
];


const OutSem2 = [
    { title: "Pássaro Branco - Uma História de Extraordinário", text: "Direção: Marc Forster" },
    { title: "Arca de Noé", text: "Direção: Sérgio Machado" },
    { title: "A Menina e o Dragão", text: "Direção: Salvador Simó, Li Jianping" },
    { title: "Termodielétrico", text: "Direção: Ana Costa Ribeiro" }
];


const OutSem3 = [
    { title: "Thug", text: "Direção: Hans Petter Moland" }
];


const OutSem5 = [
    { title: "The Ascent", text: "Direção: William Brent Bell" }
];


function createCardsOut1(OutSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${OutSem1.title}</h5>
                    <p class="card-text">${OutSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsOut2(OutSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${OutSem2.title}</h5>
                    <p class="card-text">${OutSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsOut3(OutSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${OutSem3.title}</h5>
                    <p class="card-text">${OutSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsOut5(OutSem5) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${OutSem5.title}</h5>
                    <p class="card-text">${OutSem5.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function renderCardsOut1() {
    const cardContainer = document.getElementById("card-container-out1");
    cardContainer.innerHTML = "";
    OutSem1.forEach(OutSem1 => {
        const cardHTML = createCardsOut1(OutSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsOut2() {
    const cardContainer = document.getElementById("card-container-out2");
    cardContainer.innerHTML = "";
    OutSem2.forEach(OutSem2 => {
        const cardHTML = createCardsOut2(OutSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsOut3() {
    const cardContainer = document.getElementById("card-container-out3");
    cardContainer.innerHTML = "";
    OutSem3.forEach(OutSem3 => {
        const cardHTML = createCardsOut3(OutSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsOut5() {
    const cardContainer = document.getElementById("card-container-out5");
    cardContainer.innerHTML = "";
    OutSem5.forEach(OutSem5 => {
        const cardHTML = createCardsOut5(OutSem5);
        cardContainer.innerHTML += cardHTML;
    });
}


renderCardsOut1();
renderCardsOut2();
renderCardsOut3();
renderCardsOut5();