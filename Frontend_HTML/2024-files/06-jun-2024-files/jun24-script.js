const JunSem1 = [
    { title: "Os Observadores", text: "Direção: Ishana Shyamalan" }, 
    { title: "Assassino por Acaso", text: "Direção: Richard Linklater" }, 
    { title: "Grande Sertão", text: "Direção: Guel Arraes" }, 
    { title: "O Corvo", text: "Direção: Rupert Sanders" }, 
    { title: "Letícia", text: "Direção: Cristiano Vieira" }, 
    { title: "O Cara da Piscina", text: "Direção: Chris Pine" }, 
    { title: "A Musa de Bonnard", text: "Direção: Martin Provost" }, 
    { title: "Vencer ou Morrer", text: "Direção: Vincent Mottez, Paul Mignot" }
];


const JunSem2 = [
    { title: "Divertida Mente 2", text: "Direção: Kelsey Mann" },
    { title: "Bad Boys: Até o Fim", text: "Direção: Adil El Arbi, Bilall Fallah" },
    { title: "Bandida - A Número Um", text: "Direção: João Wainer" },
    { title: "Uma Vida de Esperança", text: "Direção: Jon Gunn" },
    { title: "Avassaladoras 2.0", text: "Direção: Mara Mourão" },
    { title: "Mallandro, O Errado Que Deu Certo", text: "Direção: Marco Antonio de Carvalho" },
    { title: "A semente do mal", text: "Direção: Gabriel Abrantes" },
    { title: "13 Sentimentos", text: "Direção: Daniel Ribeiro" },
    { title: "O Anel de Eva", text: "Direção: Duflair Barradas" },
    { title: "A Ordem do Tempo", text: "Direção: Liliana Cavani" },
    { title: "Rapto", text: "Direção: Iris Kaltenbäck" },
    { title: "Porto Príncipe", text: "Direção: Maria Emília de Azevedo" },
    { title: "A Estação", text: "Direção: Cristina Maure" }
];


const JunSem3 = [
    { title: "É Assim Que Acaba", text: "Direção: Justin Baldoni" },
    { title: "Tipos de Gentileza", text: "Direção: Yorgos Lanthimos" },
    { title: "Clube dos Vândalos", text: "Direção: Jeff Nichols" },
    { title: "A maldição de Cinderela", text: "Direção: Louisa Warren" },
    { title: "Tudo O Que Você Podia Ser", text: "Direção: Ricardo Alves Junior" }
];


const JunSem4 = [
    { title: "Um Lugar Silencioso: Dia Um", text: "Direção: Michael Sarnoski" },
    { title: "Homem-Aranha: Além do Aranhaverso", text: "Direção: Joaquim Dos Santos, Kemp Powers, Justin Thompson" },
    { title: "Meu Malvado Favorito 4", text: "Direção: Chris Renaud, Patrick Delage" },
    { title: "Horizon: An American Saga Chapter 1", text: "Direção: Kevin Costner" },
    { title: "O Reencontro da Turma", text: "Direção: Chris Nelson" },
    { title: "A Grande Fuga", text: "Direção: Oliver Parker" },
    { title: "Ainda Somos os Mesmos", text: "Direção: Paulo Nascimento" },
    { title: "Casa Izabel", text: "Direção: Gil Baroni" },
    { title: "Testamento", text: "Direção: Denys Arcand" }
];


function createCardsJun1(JunSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JunSem1.title}</h5>
                    <p class="card-text">${JunSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJun2(JunSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JunSem2.title}</h5>
                    <p class="card-text">${JunSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJun3(JunSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JunSem3.title}</h5>
                    <p class="card-text">${JunSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJun4(JunSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JunSem4.title}</h5>
                    <p class="card-text">${JunSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function renderCardsJun1() {
    const cardContainer = document.getElementById("card-container-jun1");
    cardContainer.innerHTML = "";
    JunSem1.forEach(JunSem1 => {
        const cardHTML = createCardsJun1(JunSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJun2() {
    const cardContainer = document.getElementById("card-container-jun2");
    cardContainer.innerHTML = "";
    JunSem2.forEach(JunSem2 => {
        const cardHTML = createCardsJun2(JunSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJun3() {
    const cardContainer = document.getElementById("card-container-jun3");
    cardContainer.innerHTML = "";
    JunSem3.forEach(JunSem3 => {
        const cardHTML = createCardsJun3(JunSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJun4() {
    const cardContainer = document.getElementById("card-container-jun4");
    cardContainer.innerHTML = "";
    JunSem4.forEach(JunSem4 => {
        const cardHTML = createCardsJun4(JunSem4);
        cardContainer.innerHTML += cardHTML;
    });
}


renderCardsJun1();
renderCardsJun2();
renderCardsJun3();
renderCardsJun4();