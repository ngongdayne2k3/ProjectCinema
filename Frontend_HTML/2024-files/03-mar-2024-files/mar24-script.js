const MarSem1 = [
    { title: "Os Farofeiros 2", text: "Direção: Roberto Santucci" },
    { title: "Desespero Profundo", text: "Direção: Claudio Fäh" },
    { title: "Todos Nós Desconhecidos", text: "Direção: Andrew Haigh" },
    { title: "A Paixão Segundo G.H.", text: "Direção: Luiz Fernando Carvalho" },
    { title: "Garra de Ferro", text: "Direção: Sean Durkin" },
    { title: "Apaixonada", text: "Direção: Natália Warth" },
    { title: "20 Dias em Mariupol", text: "Direção: Mstyslav Chernov" },
    { title: "Pacto com o demônio - Não diga que ele não te avisou", text: "Direção: Alex Herron" },
    { title: "As 4 Filhas de Olfa", text: "Direção: Kaouther Ben Hania" },
    { title: "O Último Animal", text: "Direção: Leonel Vieira" },
    { title: "Utopia Tropical", text: "Direção: João Amorim" },
    { title: "Viva a Vida!", text: "Direção: Cris D'Amato" },
    { title: "Hamlet", text: "Direção: Zeca Brito" },
    { title: "Werdum: Acima da Dor", text: "Direção: Kleber Luiz da Silva" },
]


const MarSem2 = [ 
    { title: "Uma Vida - A História de Nicholas Winton", text: "Direção: James Hawes" },
    { title: "Imaginário - Brinquedo Diabólico", text: "Direção: Jeff Wadlow" },
    { title: "Lupicínio Rodrigues - Confissões de um Sofredor", text: "Direção: Alfredo Manevy" },
    { title: "Ervas Secas", text: "Direção: Nuri Bilge Ceylan" },
    { title: "Lilith", text: "Direção: Bruno Safadi" },
    { title: "Viver Mal", text: "Direção: João Canijo" },
    { title: "O Livro da Discórdia", text: "Direção: Baya Kasmi" },
]


const MarSem3 = [
    { title: "Kung Fu Panda 4", text: "Direção: Mike Mitchell (V)" },
    { title: "Saudosa Maloca", text: "Direção: Pedro Serrano" },
    { title: "Alice no País das Trevas", text: "Direção: Richard John Taylor" },
    { title: "O Primeiro Dia da Minha Vida", text: "Direção: Paolo Genovese" },
    { title: "Knox Vai Embora", text: "Direção: Michael Keaton" },
    { title: "No Submundo de Moscou", text: "Direção: Karen Shakhnazarov" },
]


const MarSem4 = [
    { title: "Godzilla e Kong: O Novo Império", text: "Direção: Adam Wingard" },
    { title: "Instinto Materno", text: "Direção: Benoît Delhomme" },
    { title: "Dona Lurdes - O Filme", text: "Direção: Cristiano Marques, José Luiz Villamarim" },
    { title: "Dois é Demais em Orlando", text: "Direção: Rodrigo Van Der Put" },
    { title: "Nada Será Como Antes - A Música do Clube da Esquina", text: "Direção: Ana Rieper" },
    { title: "Ascensão e Queda - John Galliano", text: "Direção: Kevin Macdonald" },
    { title: "Morcego Negro", text: "Direção: Chaim Litewski, Cleisson Vidal" },
    { title: "A Matriarca", text: "Direção: Matthew Saville" },
    { title: "Tudo ou Nada", text: "Direção: Delphine Deloget" },
    { title: "Jango no Exílio", text: "Direção: Pedro Isaias Lucas" },
];


function createCardsMar1(MarSem1) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MarSem1.title}</h5>
                    <p class="card-text">${MarSem1.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsMar2(MarSem2) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MarSem2.title}</h5>
                    <p class="card-text">${MarSem2.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsMar3(MarSem3) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MarSem3.title}</h5>
                    <p class="card-text">${MarSem3.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function createCardsMar4(MarSem4) {
    return `
        <div class="col-sm-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${MarSem4.title}</h5>
                    <p class="card-text">${MarSem4.text}</p>
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        </div>
    `;
}
  

function renderCardsMar1() {
    const cardContainer = document.getElementById("card-container-mar1");
    cardContainer.innerHTML = "";
    MarSem1.forEach(MarSem1 => {
        const cardHTML = createCardsMar1(MarSem1);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsMar2() {
    const cardContainer = document.getElementById("card-container-mar2");
    cardContainer.innerHTML = "";
    MarSem2.forEach(MarSem2 => {
        const cardHTML = createCardsMar2(MarSem2);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsMar3() {
    const cardContainer = document.getElementById("card-container-mar3");
    cardContainer.innerHTML = "";
    MarSem3.forEach(MarSem3 => {
        const cardHTML = createCardsMar3(MarSem3);
        cardContainer.innerHTML += cardHTML;
    });
}


function renderCardsMar4() {
    const cardContainer = document.getElementById("card-container-mar4");
    cardContainer.innerHTML = "";
    MarSem4.forEach(MarSem4 => {
        const cardHTML = createCardsMar4(MarSem4);
        cardContainer.innerHTML += cardHTML;
    });
}
  

renderCardsMar1();
renderCardsMar2();
renderCardsMar3();
renderCardsMar4();