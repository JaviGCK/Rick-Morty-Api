"use strict";
const urlApi = "https://rickandmortyapi.com/api";
window.addEventListener("load", loadSideBar);
let nextPage = 1;
function loadSideBar() {
    const urlEpisodes = "https://rickandmortyapi.com/api/episode";
    const sideBar = document.querySelector("#sideBarContainer");
    const ul = document.querySelector("#ulList");
    if ((ul === null || ul === void 0 ? void 0 : ul.childElementCount) === 51)
        return;
    if ((sideBar === null || sideBar === void 0 ? void 0 : sideBar.childElementCount) === 0) {
        fetch(`${urlEpisodes}?page=${nextPage}`)
            .then(response => response.json())
            .then(data => {
            const containerDiv = document.createElement("div");
            containerDiv.classList.add("container-fluid");
            const h2 = document.createElement("h2");
            h2.classList.add("text-center", "mt-4", "text-yellow");
            h2.textContent = "Episode";
            containerDiv.appendChild(h2);
            const ulContainerDiv = document.createElement("div");
            ulContainerDiv.classList.add("sidebar-scroll-size", "scroll");
            ulContainerDiv.setAttribute("id", "ulContainer");
            const ul = document.createElement("ul");
            ul.classList.add("nav", "flex-column", "sidebar-menu");
            ul.id = "ulList";
            ulContainerDiv.appendChild(ul);
            containerDiv.appendChild(ulContainerDiv);
            sideBar === null || sideBar === void 0 ? void 0 : sideBar.appendChild(containerDiv);
            const episodes = data.results;
            episodes.forEach((episode) => {
                const listElement = document.createElement("li");
                listElement.classList.add("mb-3", "sidebar-lineheight");
                const episodeList = document.createElement("h5");
                episodeList.classList.add("text-center", "text-warning");
                episodeList.textContent = `${episode.id} - ${episode.name}`;
                listElement.appendChild(episodeList);
                listElement.setAttribute("episodeId", `${episode.id}`);
                listElement.addEventListener("click", loadEpisode);
                ul.appendChild(listElement);
                ulContainerDiv === null || ulContainerDiv === void 0 ? void 0 : ulContainerDiv.addEventListener("scroll", scrollInfinity);
            });
        });
    }
    else {
        const ul = document.querySelector("#ulList");
        let url = "";
        if ((ul === null || ul === void 0 ? void 0 : ul.childElementCount) === 20) {
            url = "https://rickandmortyapi.com/api/episode?page=2";
        }
        else if ((ul === null || ul === void 0 ? void 0 : ul.childElementCount) === 40) {
            url = "https://rickandmortyapi.com/api/episode?page=3";
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
            const episodes = data.results;
            episodes.forEach((episode) => {
                const listElement = document.createElement("li");
                listElement.classList.add("mb-3", "sidebar-lineheight");
                const episodeList = document.createElement("h5");
                episodeList.classList.add("text-center", "text-warning");
                episodeList.textContent = `${episode.id} - ${episode.name}`;
                listElement.appendChild(episodeList);
                listElement.setAttribute("episodeId", `${episode.id}`);
                listElement.addEventListener("click", loadEpisode);
                ul === null || ul === void 0 ? void 0 : ul.appendChild(listElement);
            });
        });
    }
}
function scrollInfinity() {
    const ulContainerDiv = document.querySelector("#ulContainer");
    if (ulContainerDiv === null)
        return;
    const scrollTop = ulContainerDiv.scrollTop;
    const scrollHeight = ulContainerDiv.scrollHeight;
    const clientHeight = ulContainerDiv.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 200 && nextPage !== -1) {
        loadSideBar();
    }
    ;
}
function loadEpisode() {
    clearInfo();
    const episodeId = this.getAttribute("episodeId");
    const urlEpisode = `https://rickandmortyapi.com/api/episode/${episodeId}`;
    fetch(urlEpisode)
        .then(response => response.json())
        .then((data) => {
        const infoEpisode = document.querySelector("#sectionInfo");
        const episodeHeader = document.createElement("div");
        episodeHeader.classList.add("episode-header");
        const titleElementEpisode = document.createElement("h2");
        titleElementEpisode.classList.add("text-yellow");
        titleElementEpisode.textContent = `${data.name}`;
        episodeHeader.appendChild(titleElementEpisode);
        const airDateElement = document.createElement("h2");
        airDateElement.classList.add("text-yellow");
        airDateElement.textContent = `${data.air_date}`;
        episodeHeader.appendChild(airDateElement);
        infoEpisode === null || infoEpisode === void 0 ? void 0 : infoEpisode.appendChild(episodeHeader);
        const cardInfoChar = document.createElement("div");
        cardInfoChar.classList.add("card-container", "grid-container", "scroll");
        cardInfoChar.setAttribute('id', 'cardContainer');
        infoEpisode === null || infoEpisode === void 0 ? void 0 : infoEpisode.appendChild(cardInfoChar);
        const characterURLs = data.characters;
        characterURLs.forEach((characterURL) => {
            fetch(characterURL)
                .then(response => response.json())
                .then((characterData) => {
                const character = characterData;
                const cardContainer = document.querySelector("#cardContainer");
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("container-border", "text-yellow", "bg-green");
                const imageElement = document.createElement("img");
                imageElement.src = character.image;
                imageElement.classList.add("card-img-top");
                imageElement.alt = "Character Image";
                cardDiv.appendChild(imageElement);
                const cardBodyDiv = document.createElement("div");
                cardBodyDiv.classList.add("card-body");
                const titleElement = document.createElement("h5");
                titleElement.classList.add("card-title", "mt-2");
                titleElement.textContent = `${character.name}`;
                cardBodyDiv.appendChild(titleElement);
                const statusElement = document.createElement("p");
                statusElement.classList.add("card-text", "mt-2");
                statusElement.textContent = `Status: ${character.status}`;
                cardBodyDiv.appendChild(statusElement);
                const speciesElement = document.createElement("p");
                speciesElement.classList.add("card-text", "mb-1");
                speciesElement.textContent = `Species: ${character.species}`;
                cardBodyDiv.appendChild(speciesElement);
                cardDiv.appendChild(cardBodyDiv);
                cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.appendChild(cardDiv);
                cardDiv.setAttribute("characterId", `${character.id}`);
                cardDiv.addEventListener("click", loadCharacter);
                console.log(cardDiv);
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
function loadCharacter() {
    clearInfo();
    console.log(this);
    const characterId = this.getAttribute("characterId");
    console.log(this);
    const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`;
    console.log(urlCharacter);
    fetch(urlCharacter)
        .then(response => response.json())
        .then((data) => {
        const infoCharacter = document.querySelector("#sectionInfo");
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("mb-3", "container-border", "text-yellow", "bg-green");
        cardDiv.style.maxWidth = "60vw";
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "g-0");
        cardDiv.appendChild(rowDiv);
        const imageColDiv = document.createElement("div");
        imageColDiv.classList.add("col-md-4", "p-3");
        rowDiv.appendChild(imageColDiv);
        const imageElement = document.createElement("img");
        imageElement.src = data.image;
        imageElement.classList.add("img-fluid", "rounded-start");
        imageElement.alt = "Character Image";
        imageColDiv.appendChild(imageElement);
        const infoColDiv = document.createElement("div");
        infoColDiv.classList.add("col-md-8");
        rowDiv.appendChild(infoColDiv);
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add("card-body");
        infoColDiv.appendChild(cardBodyDiv);
        const titleElement = document.createElement("h5");
        titleElement.classList.add("card-title", "mb-2", "fs-2", "text-center");
        titleElement.textContent = data.name;
        cardBodyDiv.appendChild(titleElement);
        const statusElement = document.createElement("p");
        statusElement.classList.add("card-text", "fs-3", "text-center");
        statusElement.textContent = "Status: " + data.status;
        cardBodyDiv.appendChild(statusElement);
        const speciesElement = document.createElement("p");
        speciesElement.classList.add("card-text", "fs-3", "text-center");
        speciesElement.textContent = "Species: " + data.species;
        cardBodyDiv.appendChild(speciesElement);
        const genderElement = document.createElement("p");
        genderElement.classList.add("card-text", "fs-3", "text-center");
        genderElement.textContent = "Gender: " + data.gender;
        cardBodyDiv.appendChild(genderElement);
        const locationElement = document.createElement("p");
        locationElement.classList.add("card-text", "fs-3", "text-center");
        locationElement.textContent = "Location: " + data.location;
        cardBodyDiv.appendChild(locationElement);
        infoCharacter === null || infoCharacter === void 0 ? void 0 : infoCharacter.appendChild(cardDiv);
    });
}
function clearInfo() {
    const containerInfo1 = document.querySelector("#sectionInfo");
    containerInfo1 === null || containerInfo1 === void 0 ? void 0 : containerInfo1.replaceChildren();
}
//# sourceMappingURL=script.js.map