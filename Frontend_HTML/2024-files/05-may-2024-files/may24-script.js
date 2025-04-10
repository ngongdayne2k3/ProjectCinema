const MaiSem1 = [
    { title: "O Dublê", text: "Direção: David Leitch" },
    { title: "Férias Trocadas", text: "Direção: Bruno Barreto" },
    { title: "A Teia", text: "Direção: Adam Cooper" },
    { title: "Guadalupe - Mãe da Humanidade", text: "Direção: Andrés Garrigó, Pablo Moreno" },
    { title: "Love Lies Bleeding - O Amor Sangra", text: "Direção: Rose Glass" },
    { title: "Transe", text: "Direção: Carolina Jabor, Anne Pinheiro Guimarães" },
    { title: "Conduzindo Madeleine", text: "Direção: Christian Carion" },
    { title: "Verissimo", text: "Direção: Angelo Defanti" },
    { title: "Clube Zero", text: "Direção: Jessica Hausner" },
    { title: "Here", text: "Direção: Bas Devos" }
];


const MaiSem2 = [ 
    { title: "Planeta dos Macacos: O Reinado", text: "Direção: Wes Ball" }, 
    { title: "Vermelho Monet", text: "Direção: Halder Gomes" }, 
    { title: "Foram os Sussurros que me Mataram", text: "Direção: Arthur Tuoto" }, 
    { title: "Diálogos com Ruth de Souza", text: "Direção: Juliana Vicente" }
];


const MaiSem3 = [
    { title: "Amigos Imaginários", text: "Direção: John Krasinski" }, 
    { title: "Belo Desastre - O Casamento", text: "Direção: Roger Kumble" }, 
    { title: "Back To Black", text: "Direção: Sam Taylor-Johnson" },
    { title: "O Tarô da Morte", text: "Direção: Anna Halberg, Spenser Cohen" }, 
    { title: "Um Dia Nossos Segredos Serão Revelados", text: "Direção: Emily Atef" }, 
    { title: "A Hora da Estrela", text: "Direção: Suzana Amaral" }, 
    { title: "A Estrela Cadente", text: "Direção: Dominique Abel, Fiona Gordon" }, 
    { title: "Maestro(s)", text: "Direção: Bruno Chiche" }
];


const MaiSem4 = [
    { title: "Furiosa: Uma Saga Mad Max", text: "Direção: George Miller" }, 
    { title: "Fúria Primitiva", text: "Direção: Dev Patel" }, 
    { title: "Morando com o Crush", text: "Direção: Hsu Chien" },
    { title: "De Repente, Miss!", text: "Direção: Hsu Chien" }, 
    { title: "The Shift - O Deslocamento", text: "Direção: Brock Heasley" }, 
    { title: "Às Vezes Quero Sumir", text: "Direção: Rachel Lambert" },
    { title: "Conto de Fadas", text: "Direção: Alexandre Sokourov" },
    { title: "Mundo Novo", text: "Direção: Álvaro Campos" },
    { title: "A Alegria é a Prova dos Nove", text: "Direção: Helena Ignêz" }
];


const MaiSem5 = [
    { title: "Imaculada", text: "Direção: Michael Mohan" }, 
    { title: "Os Estranhos: Capítulo 1", text: "Direção: Renny Harlin" }, 
    { title: "Meu Sangue Ferve Por Você", text: "Direção: Paulo Machline" },
    { title: "A Filha do Palhaço", text: "Direção: Pedro Diógenes" }, 
    { title: "Por Trás da Verdade", text: "Direção: Miles Joris-Peyrafitte" }, 
    { title: "A Festa de Léo", text: "Direção: Luciana Bezerra, Gustavo Melo" },
    { title: "Toda Noite Estarei Lá", text: "Direção: Tati Franklin, Suellen Vasconcelos" }, 
    { title: "Empirion: Uma Aventura com Einstein", text: "Direção: Michael Ruman" }, 
    { title: "A metade de nós", text: "Direção: Flávio Botelho" },
    { title: "Terra Revolta", text: "Direção: Barbara Goulart, Caio Bortolotti" },
    { title: "Crônicas do Irã", text: "Direção: Ali Asgari, Alireza Khatami" },
    { title: "1798 - Revolta dos Búzios", text: "Direção: Antônio Olavo" },
    { title: "The Hunted", text: "Direção: Louis Lagayette" },
    { title: "Disfarce Divino", text: "Direção: Virginie Sauveur" }
];


function createCardsMai1(MaiSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MaiSem1.title}</h5>
                    <p class="card-text">${MaiSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsMai2(MaiSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MaiSem2.title}</h5>
                    <p class="card-text">${MaiSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsMai3(MaiSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MaiSem3.title}</h5>
                    <p class="card-text">${MaiSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsMai4(MaiSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MaiSem4.title}</h5>
                    <p class="card-text">${MaiSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsMai5(MaiSem5) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MaiSem5.title}</h5>
                    <p class="card-text">${MaiSem5.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function renderCardsMai1() {
    const cardContainer = document.getElementById("card-container-mai1");
    cardContainer.innerHTML = "";
    MaiSem1.forEach(MaiSem1 => {
        const cardHTML = createCardsMai1(MaiSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsMai2() {
    const cardContainer = document.getElementById("card-container-mai2");
    cardContainer.innerHTML = "";
    MaiSem2.forEach(MaiSem2 => {
        const cardHTML = createCardsMai2(MaiSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsMai3() {
    const cardContainer = document.getElementById("card-container-mai3");
    cardContainer.innerHTML = "";
    MaiSem3.forEach(MaiSem3 => {
        const cardHTML = createCardsMai3(MaiSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsMai4() {
    const cardContainer = document.getElementById("card-container-mai4");
    cardContainer.innerHTML = "";
    MaiSem4.forEach(MaiSem4 => {
        const cardHTML = createCardsMai4(MaiSem4);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsMai5() {
    const cardContainer = document.getElementById("card-container-mai5");
    cardContainer.innerHTML = "";
    MaiSem5.forEach(MaiSem5 => {
        const cardHTML = createCardsMai5(MaiSem5);
        cardContainer.innerHTML += cardHTML;
    });
}


renderCardsMai1();
renderCardsMai2();
renderCardsMai3();
renderCardsMai4();
renderCardsMai5();