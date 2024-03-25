let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

// data atual
let date = new Date();
console.log(date.getTime());

// Variaveis  para autenticação na API
const timestamp = ts;
const apiKey = publicKey;
const hashValue = hashVal;


function displayWords(value) {
    input.value = value;
    removeElements();
}


function removeElements() {
    listContainer.innerHTML = "";
}

// Adicionando um ouvinte de evento 
input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.length < 4) {
        return false;
    }

    // URL para consulta da API 
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

    // Fazendo a requisição HTTP para a API 
    const response = await fetch(url);
    const jsonData = await response.json();

    // Iterando para exibir sugestoes de personagens
    jsonData.data["results"].forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", "displayWords('" + name + "')");
        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="item">${word}</p>`;
        listContainer.appendChild(div); // Adicionando a sugestão a lista
    });
});

// Adicionando um ouvinte de evento para o botão de pesquisa
button.addEventListener(
    "click",
    (getRsult = async () => {
        if (input.value.trim().length < 1) {
            alert("Input cannot be blank");
        }
        showContainer.innerHTML = "";
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

        // Fazendo a requisição para obter detalhes sobre o personagem
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.data["results"].forEach((element) => {
            showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
                }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
        });
    })
);

// Evento de carregamento para obter os resultados ao carregar a pagina
window.onload = () => {
    getRsult();
};