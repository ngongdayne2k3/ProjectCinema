const AbrSem1 = [
    { title: "Uma Prova de Coragem", text: "Direção: Simon Cellan Jones" },
    { title: "A Primeira Profecia", text: "Direção: Arkasha Stevenson" },
    { title: "Uma Família Feliz", text: "Direção: José Eduardo Belmonte" },
    { title: "O Homem dos Sonhos", text: "Direção: Kristoffer Borgli" },
    { title: "Tô de Graça - O Filme", text: "Direção: César Rodrigues" },
    { title: "Domingo à Noite", text: "Direção: André Bushatsky" },
    { title: "Meu Amigo Lorenzo", text: "Direção: André Luiz Oliveira" },
    { title: "SUGA Agust D TOUR 'D-DAY' THE MOVIE", text: "Direção: Jun-Soo Park" },
    { title: "Licença para Enlouquecer", text: "Direção: Hsu Chien" },
    { title: "Music", text: "Direção: Angela Schanelec" },
]

const AbrSem2 = [ 
    { title: "Ghostbusters: Apocalipse de Gelo", text: "Direção: Gil Kenan" },
    { title: "Evidências do Amor", text: "Direção: Pedro Antonio Paes" },
    { title: "O Sabor da Vida", text: "Direção: Tran Anh Hung" },
    { title: "Uma Parede Entre Nós", text: "Direção: Patricia Font" },
    { title: "Um Gato de Sorte", text: "Direção: Christopher Jenkins" },
    { title: "20.000 Espécies de Abelhas", text: "Direção: Estibaliz Urresola Solaguren" },
    { title: "Depois da Morte", text: "Direção: Stephen Gray, Chris Radtke" },
    { title: "As Linhas da Minha Mão", text: "Direção: João Dumans" },
    { title: "Uma Babá Gloriosa", text: "Direção: Juan Pablo Pires" },
    { title: "A Serena Onda que o Mar me Trouxe", text: "Direção: Edson Ferreira" },
    { title: "Cinema é uma Droga Pesada", text: "Direção: Cédric Kahn" },
]

const AbrSem3 = [
    { title: "Guerra Civil", text: "Direção: Alex Garland" },
    { title: "Abigail", text: "Direção: Matt Bettinelli-Olpin, Tyler Gillett" },
    { title: "Jorge da Capadócia", text: "Direção: Alexandre Machafer" },
    { title: "Sem Coração", text: "Direção: Nara Normande, Tião" },
    { title: "Vidente por Acidente", text: "Direção: Rodrigo Van Der Put" },
    { title: "E a Festa Continua!", text: "Direção: Robert Guédiguian" },
    { title: "Haikyu!! 4: A Batalha de Conceitos", text: "Direção: Susumu Mitsunaka" },
    { title: "Aespa World Tour nos Cinemas", text: "Direção: Yoon-Dong Oh, Hamin Kim" },
    { title: "Zona de Exclusão", text: "Direção: Agnieszka Holland" },
    { title: "Uma Baía", text: "Direção: Murilo Salles" },
    { title: "José Aparecido de Oliveira: O Maior Mineiro do Mundo", text: "Direção: Mário Lúcio Brandão Filho, Gustavo Brandão" },
    { title: "Névoa Prateada", text: "Direção: Sacha Polak" },
]

const AbrSem4 = [
    { title: "Garfield: Fora de Casa", text: "Direção: Mark Dindal" },
    { title: "Rivais", text: "Direção: Luca Guadagnino" },
    { title: "Spy x Family Código: Branco", text: "Direção: Kazuhiro Furuhashi" },
    { title: "Aumenta que é Rock'n Roll", text: "Direção: Tomás Portella" },
    { title: "Contra o Mundo", text: "Direção: Moritz Mohr" },
    { title: "Ursinho Pooh: Sangue e Mel 2", text: "Direção: Rhys Frake-Waterfield" },
    { title: "La Chimera", text: "Direção: Alice Rohrwacher" },
    { title: "Dorival Caymmi - Um Homem de Afetos", text: "Direção: Daniela Broitman" },
    { title: "A Natureza do Amor", text: "Direção: Monia Chokri" },
    { title: "Plano 75", text: "Direção: Chie Hayakawa" },
    { title: "Vidro Fumê", text: "Direção: Pedro Varela" }
];


function createCardsAbril1(AbrSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${AbrSem1.title}</h5>
                    <p class="card-text">${AbrSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsAbril2(AbrSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${AbrSem2.title}</h5>
                    <p class="card-text">${AbrSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsAbril3(AbrSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${AbrSem3.title}</h5>
                    <p class="card-text">${AbrSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsAbril4(AbrSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${AbrSem4.title}</h5>
                    <p class="card-text">${AbrSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}
  

function renderCardsAbr1() {
    const cardContainer = document.getElementById("card-container-abr1");
    cardContainer.innerHTML = "";
    AbrSem1.forEach(AbrSem1 => {
        const cardHTML = createCardsAbril1(AbrSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsAbr2() {
    const cardContainer = document.getElementById("card-container-abr2");
    cardContainer.innerHTML = "";
    AbrSem2.forEach(AbrSem2 => {
        const cardHTML = createCardsAbril2(AbrSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsAbr3() {
    const cardContainer = document.getElementById("card-container-abr3");
    cardContainer.innerHTML = "";
    AbrSem3.forEach(AbrSem3 => {
        const cardHTML = createCardsAbril3(AbrSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsAbr4() {
    const cardContainer = document.getElementById("card-container-abr4");
    cardContainer.innerHTML = "";
    AbrSem4.forEach(AbrSem4 => {
        const cardHTML = createCardsAbril4(AbrSem4);
        cardContainer.innerHTML += cardHTML;
    });
}
  

renderCardsAbr1();
renderCardsAbr2();
renderCardsAbr3();
renderCardsAbr4();