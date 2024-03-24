
// header
$(function () {
    $(window).scroll(function () {
        var winTop = $(window).scrollTop();
        if (winTop >= 30) {
            $("body").addClass("sticky-header");
            $("header").css("background-color", "#3c3c3c"); // Mantém a cor do cabeçalho
        } else {
            $("body").removeClass("sticky-header");

        }
    });
});
// header


async function searchCharacter() {
    const publicKey = '6725d388f48f4532fcc10b54d67e29d8';
    const privateKey = 'd26c4836ad0a449688977ecbc8b6f776836dd9d2';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    const characterName = document.getElementById('searchInput').value;

    if (characterName.trim() === '') {
        alert('Por favor, digite o nome do personagem.');
        return;
    }

    const apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayResults(data.data.results);
    } catch (error) {
        console.error('Erro ao buscar personagem:', error);
    }
}

function displayResults(characters) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (characters.length === 0) {
        resultsContainer.innerHTML = 'Nenhum resultado encontrado.';
        return;
    }

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <p>${character.description}</p>
        `;
        resultsContainer.appendChild(characterDiv);
    });
}