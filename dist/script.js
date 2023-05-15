"use strict";
window.addEventListener("load", createEpisodeElement);
const urlApi = "https://rickandmortyapi.com/api";
function createEpisodeElement(episode) {
    const listElement = document.createElement("li");
    listElement.classList.add("mb-3", "sidebar-lineheight");
    const episodeList = document.createElement("h5");
    episodeList.classList.add("text-center", "text-warning");
    episodeList.textContent = `${episode.id} - ${episode.name}`;
    listElement.appendChild(episodeList);
    listElement.setAttribute("episodeId", `${episode.id}`);
    listElement.addEventListener("click", loadEpisode);
    return listElement;
}
function createInfoEpisode(episode) {
    const infoEpisode = document.querySelector("#sectionInfo");
    const divElement = document.createElement("div");
    infoEpisode === null || infoEpisode === void 0 ? void 0 : infoEpisode.appendChild(divElement);
    const titleElementEpisode = document.createElement("h2");
    titleElementEpisode.classList.add("text-yellow");
    titleElementEpisode.textContent = episode.name;
    divElement.appendChild(titleElementEpisode);
    const airDateElement = document.createElement("h2");
    airDateElement.classList.add("text-yellow");
    airDateElement.textContent = episode.air_date;
    divElement.appendChild(airDateElement);
    return divElement;
}
function createCharacterCards(character) {
    const cardContainer = document.getElementById("cardContainer");
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("container-border", "text-yellow", "bg-green");
    cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.appendChild(cardDiv);
    const imageElement = document.createElement("img");
    imageElement.src = character.image;
    imageElement.classList.add("card-img-top");
    imageElement.alt = "Character Image";
    cardDiv.appendChild(imageElement);
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    cardDiv.appendChild(cardBodyDiv);
    const titleElement = document.createElement("h5");
    titleElement.classList.add("card-title", "mt-2");
    titleElement.textContent = character.name;
    cardBodyDiv.appendChild(titleElement);
    const statusElement = document.createElement("p");
    statusElement.classList.add("card-text", "mt-2");
    statusElement.textContent = `Status: ${character.status}`;
    cardBodyDiv.appendChild(statusElement);
    const speciesElement = document.createElement("p");
    speciesElement.classList.add("card-text", "mb-1");
    speciesElement.textContent = `Species: ${character.species}`;
    cardBodyDiv.appendChild(speciesElement);
    return cardDiv;
}
let nextPage = 1;
function loadSideBar() {
    const urlEpisodes = "https://rickandmortyapi.com/api/episode";
    fetch(`${urlEpisodes}?page=${nextPage}`)
        .then(response => response.json())
        .then(data => {
        const listEpisodes = document.querySelector("#ulList");
        const episodes = data.results;
        episodes.forEach((episode) => {
            const liElement = createEpisodeElement(episode);
            liElement.setAttribute("episodeId", `${episode.id}`);
            listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(liElement);
            liElement.addEventListener("click", loadEpisode);
        });
        nextPage = data.info.next ? parseInt(data.info.next.split("=")[1]) : -1;
    })
        .catch(error => {
        console.error("Error loading episodes", error);
    });
}
function loadEpisode() {
    clearInfo();
    const episodeId = this.getAttribute("episodeId");
    const urlEpisode = `https://rickandmortyapi.com/api/episode/${episodeId}`;
    fetch(urlEpisode)
        .then(response => response.json())
        .then(data => {
        const infoEpisode = document.querySelector("#sectionInfo");
        const cardInfoChar = document.createElement("div");
        cardInfoChar.classList.add("card-container", "grid-container", "scroll");
        cardInfoChar.setAttribute('id', 'cardContainer');
        infoEpisode === null || infoEpisode === void 0 ? void 0 : infoEpisode.appendChild(cardInfoChar);
        const episode = data;
        const episodeInfoElement = createInfoEpisode(episode);
        infoEpisode === null || infoEpisode === void 0 ? void 0 : infoEpisode.insertBefore(episodeInfoElement, infoEpisode.firstChild);
        const characterURLs = episode.characters;
        characterURLs.forEach((characterURL) => {
            fetch(characterURL)
                .then(response => response.json())
                .then(characterData => {
                const cardElement = createCharacterCards(characterData);
                cardElement.setAttribute("episodeId", `${episode.id}`);
                cardInfoChar === null || cardInfoChar === void 0 ? void 0 : cardInfoChar.appendChild(cardElement);
            })
                .catch(error => {
                console.error("Error loading character", error);
            });
        });
    })
        .catch(error => {
        console.error("Error loading episode", error);
    });
}
window.addEventListener("load", () => {
    loadSideBar();
    const listEpisodes = document.querySelector("#ulContainer");
    listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 200 && nextPage !== -1) {
            loadSideBar();
        }
    });
});
function clearInfo() {
    const containerInfo1 = document.querySelector("#sectionInfo");
    containerInfo1 === null || containerInfo1 === void 0 ? void 0 : containerInfo1.replaceChildren();
}
//# sourceMappingURL=script.js.map