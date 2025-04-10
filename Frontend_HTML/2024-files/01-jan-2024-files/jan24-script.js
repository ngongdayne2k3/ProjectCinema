const JanSem1 = [
    { title: "Wish - O Poder dos Desejos", text: "Direção: Chris Buck, Fawn Veerasunthorn", link: "../../../5_movie-detail-files/movie-detail.html" }, 
    { title: "Patos!", text: "Direção: Benjamin Renner, Guylo Homsy", link: "https://www.imdb.com/title/tt6495056/?ref_=fn_al_tt_1"}, 
    { title: "Dogman", text: "Direção: Luc Besson" }, 
    { title: "Priscilla", text: "Direção: Sofia Coppola" }, 
    { title: "O Melhor Está Por Vir", text: "Direção: Nanni Moretti" }, 
]


const JanSem2 = [
    { title: "Beekeeper - Rede de Vingança", text: "Direção: David Ayer" }, 
    { title: "Os Rejeitados", text: "Direção: Alexander Payne" }, 
    { title: "Meninas Malvadas: O Musical", text: "Direção: Samantha Jayne, Arturo Perez Jr." }, 
    { title: "O Jogo do Disfarce", text: "Direção: Thomas Vincent" },
    { title: "Maboroshi", text: "Direção: Mari Okada" }, 
    { title: "Chama a Bebel", text: "Direção: Paulo Nascimento" }, 
    { title: "Praia da Saudade", text: "Direção: Sinai Sganzerla" },
]


const JanSem3 = [
    { title: "Segredos de um Escândalo", text: "Direção: Todd Haynes" }, 
    { title: "Sobreviventes - Depois do Terremoto", text: "Direção: Um Tae-hwa" }, 
    { title: "Mergulho Noturno", text: "Direção: Bryce McGuire" },
    { title: "Turma da Mônica Jovem: Reflexos do Medo", text: "Direção: Mauricio Eça" }, 
    { title: "Meu Amigo Robô", text: "Direção: Pablo Berger" }, 
    { title: "Alarme de Incêndio", text: "Direção: Khaled Fahed" },
    { title: "Minha Solidão Tem Asas", text: "Direção: Mario Casas" }, 
    { title: "Mal Viver", text: "Direção: João Canijo" }, 
    { title: "O Natal do Bruno Aleixo", text: "Direção: João Moreira (II), João Alves, Bruno Caetano" },
]


const JanSem4 = [
    { title: "Todos Menos Você", text: "Direção: Will Gluck" }, 
    { title: "Anatomia de Uma Queda", text: "Direção: Justine Triet" }, 
    { title: "Nosso Lar 2: Os Mensageiros", text: "Direção: Wagner de Assis" },
    { title: "Vidas Passadas", text: "Direção: Celine Song" }, 
    { title: "Príncipe Lu e a Lenda do Dragão", text: "Direção: Leandro Neri" }, 
    { title: "O Refém - Atentado em Madri", text: "Direção: Daniel Calparsoro" },
    { title: "Fighter", text: "Direção: Siddharth Anand" }, 
    { title: "The Underdogs", text: "Direção: Charles Stone III" }, 
    { title: "As Bestas", text: "Direção: Rodrigo Sorogoyen" },
    { title: "Servidão", text: "Direção: Neto Borges, Renato Barbieri" }, 
    { title: "Bizarros Peixes das Fossas Abissais", text: "Direção: Marcelo Fabri Marão" }, 
    { title: "Seu Cavalcanti", text: "Direção: Leonardo Lacca" },
    { title: "Nauel e o Livro Mágico", text: "Direção: German Acuña, Cristobal Carvajal" },
];


function createCardsJan1(JanSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JanSem1.title}</h5>
                    <p class="card-text">${JanSem1.text}</p>
                    <a href="${JanSem1.link}" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJan2(JanSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JanSem2.title}</h5>
                    <p class="card-text">${JanSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJan3(JanSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JanSem3.title}</h5>
                    <p class="card-text">${JanSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsJan4(JanSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${JanSem4.title}</h5>
                    <p class="card-text">${JanSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}
  

function renderCardsJan1() {
    const cardContainer = document.getElementById("card-container-jan1");
    cardContainer.innerHTML = "";
    JanSem1.forEach(JanSem1 => {
        const cardHTML = createCardsJan1(JanSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJan2() {
    const cardContainer = document.getElementById("card-container-jan2");
    cardContainer.innerHTML = "";
    JanSem1.forEach(JanSem2 => {
        const cardHTML = createCardsJan2(JanSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJan3() {
    const cardContainer = document.getElementById("card-container-jan3");
    cardContainer.innerHTML = "";
    JanSem3.forEach(JanSem3 => {
        const cardHTML = createCardsJan3(JanSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsJan4() {
    const cardContainer = document.getElementById("card-container-jan4");
    cardContainer.innerHTML = "";
    JanSem4.forEach(JanSem4 => {
        const cardHTML = createCardsJan4(JanSem4);
        cardContainer.innerHTML += cardHTML;
    });
}
  

renderCardsJan1();
renderCardsJan2();
renderCardsJan3();
renderCardsJan4();
