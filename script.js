
let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let errorMessage = document.getElementById("error-message");

// data atual
let date = new Date();
console.log(date.getTime());

//autenticação na API
const timestamp = ts;
const apiKey = publicKey;
const hashValue = hashVal;

// Funçao para exibir sugestões
function displayWords(value) {
    input.value = value;
    removeElements();
}

// Funçao para remover elementos da lista de sugestoes
function removeElements() {
    listContainer.innerHTML = "";
}

//ouvinte de evento para o campo de entrada
input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.length < 4) {
        return false;
    }

    //consulta da API
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

    // Fazendo a requisiçao para a API
    const response = await fetch(url);
    const jsonData = await response.json();

    // Iterando para exibir sugestões de personagens
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

// tratamento de erro
button.addEventListener(
    "click",
    async () => {
        if (input.value.trim().length < 1) {
            errorMessage.innerText = "A pesquisa não pode ser em branco";
            return;
        }
        if (input.value.trim().length < 4) {
            errorMessage.innerText = "A pesquisa tem que ter mais de 3 caracteres";
            return;
        }

        // Limpa a mensagem de erro se a entrada for valida
        errorMessage.innerText = "";

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
    }
);


//obter os resultados ao carregar a página
window.onload = () => {
    getRsult();
};