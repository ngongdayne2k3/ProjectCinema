const FevSem1 = [
    { title: "Pobres Criaturas", text: "Direção: Yorgos Lanthimos" },
    { title: "O Mal que nos Habita", text: "Direção: Demián Rugna" },
    { title: "Argylle - O Superespião", text: "Direção: Matthew Vaughn" },
    { title: "Gato Galáctico e o Feitiço do Tempo", text: "Direção: Rodrigo Zanforlin" },
    { title: "Os Colonos", text: "Direção: Felipe Gálvez Haberle" },
    { title: "Peppa Pig - Festa no Cinema", text: "Direção: Andrea Tran" },
]


const FevSem2 = [ 
    { title: "Bob Marley: One Love", text: "Direção: Reinaldo Marcus Green" },
    { title: "A Cor Púrpura", text: "Direção: Blitz Bazawule" },
    { title: "Baghead: A Bruxa dos Mortos", text: "Elenco: Freya Allan, Jeremy Irvine, Ruby Barker" },
    { title: "Atrevida - A Paixão Não Tem Regras", text: "Direção: Dmitriy Suvorov" },
    { title: "Duna: Parte Um Relançamento", text: "Direção: Denis Villeneuve" },
    { title: "Todo Mundo Ama Jeanne", text: "Direção: Céline Devaux" },
    { title: "Moneyboys", text: "Elenco: Kai Ko, J.C. Lin" },
    { title: "A Viagem de Ernesto e Celestine", text: "Direção: Julien Chheng, Jean-Christophe Roger (II)" },
]


const FevSem3 = [
    { title: "Zona de Interesse", text: "Direção: Jonathan Glazer" },
    { title: "O Abismo", text: "Direção: Richard Holm" },
    { title: "Masha e o Urso : Diversão em Dobro", text: "Direção: Artyom Naumov, Vasiko Bedoshvili" },
    { title: "Até o Cair da Noite", text: "Direção: Christoph Hochhäusler" },
    { title: "Horizonte", text: "Direção: Rafael Calomeni" },
]


const FevSem4 = [
    { title: "Demon Slayer: Para a Vila do Espadachim", text: "Direção: Haruo Sotozaki" },
    { title: "O Menino e a Garça", text: "Direção: Hayao Miyazaki" },
    { title: "Ferrari", text: "Direção: Michael Mann" },
    { title: "O Jogo da Morte", text: "Direção: Alaa Morsy" },
    { title: "Levante", text: "Direção: Lillah Halla" },
    { title: "Cedo Demais", text: "Direção: José Lavigne" },
]


const FevSem5 = [
    { title: "Dias Perfeitos", text: "Direção: Wim Wenders" },
    { title: "Duna: Parte 2", text: "Direção: Denis Villeneuve" },
    { title: "Zona de Risco", text: "Direção: William Eubank" },
    { title: "Eu, Capitão", text: "Direção: Matteo Garrone" },
    { title: "A Sala dos Professores", text: "Direção: İlker Çatak" },
    { title: "Plano de Aposentadoria", text: "Direção: Tim Brown (XV)" },
    { title: "A Serva", text: "Direção: Pablo Moreno" },
    { title: "Empirion: Uma Aventura com Einstein", text: "Direção: Michael Ruman" },
    { title: "Amanhã", text: "Direção: Marcos Pimentel" }
]


function createCardsFev1(FevSem1) {
    return `
    <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${FevSem1.title}</h5>
                    <p class="card-text">${FevSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsFev2(FevSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${FevSem2.title}</h5>
                    <p class="card-text">${FevSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsFev3(FevSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${FevSem3.title}</h5>
                    <p class="card-text">${FevSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsFev4(FevSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${FevSem4.title}</h5>
                    <p class="card-text">${FevSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsFev5(FevSem) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${FevSem5.title}</h5>
                    <p class="card-text">${FevSem5.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}
  

function renderCardsFev1() {
    const cardContainer = document.getElementById("card-container-fev1");
    cardContainer.innerHTML = "";
    FevSem1.forEach(FevSem1 => {
        const cardHTML = createCardsFev1(FevSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsFev2() {
    const cardContainer = document.getElementById("card-container-fev2");
    cardContainer.innerHTML = "";
    FevSem2.forEach(FevSem2 => {
        const cardHTML = createCardsFev2(FevSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsFev3() {
    const cardContainer = document.getElementById("card-container-fev3");
    cardContainer.innerHTML = "";
    FevSem3.forEach(FevSem3 => {
        const cardHTML = createCardsFev3(FevSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsFev4() {
    const cardContainer = document.getElementById("card-container-fev4");
    cardContainer.innerHTML = "";
    FevSem4.forEach(FevSem4 => {
        const cardHTML = createCardsFev4(FevSem4);
        cardContainer.innerHTML += cardHTML;
    });
}



function renderCardsFev5() {
    const cardContainer = document.getElementById("card-container-fev5");
    cardContainer.innerHTML = "";
    FevSem5.forEach(FevSem5 => {
        const cardHTML = createCardsFev4(FevSem5);
        cardContainer.innerHTML += cardHTML;
    });
}
  

renderCardsFev1();
renderCardsFev2();
renderCardsFev3();
renderCardsFev4();
renderCardsFev5();