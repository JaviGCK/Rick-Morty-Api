import { createList, setContainerInfo, createCardsInfo, createCharcacterInfo } from "./setHTML.js";
import { clearInfo } from "./utils.js";
export function setEpisodeList() {
    clearInfo();
    const urlEpisodes = "https://rickandmortyapi.com/api/episode";
    const sideBarAside = document.querySelector("#side-bar");
    const sideBarDivUl = document.createElement("div");
    const sideBarUl = document.querySelector("#ul-list");
    if (sideBarAside === null)
        return;
    if (sideBarDivUl === null)
        return;
    if (sideBarUl === null)
        return;
    let url = "";
    if (sideBarUl.childElementCount === 0) {
        url = "https://rickandmortyapi.com/api/episode";
    }
    else if (sideBarUl.childElementCount === 20) {
        url = "https://rickandmortyapi.com/api/episode?page=2";
    }
    else if (sideBarUl.childElementCount === 40) {
        url = "https://rickandmortyapi.com/api/episode?page=3";
    }
    fetch(url)
        .then(response => response.json())
        .then((data) => {
        createList(data);
    });
}
export function loadEpisode() {
    const episodeId = this.getAttribute("episodeId");
    const urlEpisode = `https://rickandmortyapi.com/api/episode/${episodeId}`;
    fetch(urlEpisode)
        .then(response => response.json())
        .then((data) => {
        setContainerInfo(data);
        const characterURLs = data.characters;
        console.log(characterURLs);
        characterURLs.forEach((characterURL) => {
            fetch(characterURL)
                .then(response => response.json())
                .then((data) => {
                createCardsInfo(data);
            });
        });
    });
}
export function loadCharacter() {
    clearInfo();
    const characterId = this.getAttribute("characterId");
    const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`;
    fetch(urlCharacter)
        .then((response) => response.json())
        .then((data) => {
        createCharcacterInfo(data);
        const episodes = data.episode;
        episodes.forEach(episodeUrl => {
            fetch(episodeUrl)
                .then(response => response.json())
                .then((data) => {
            });
        });
    });
}
//# sourceMappingURL=promiseFunction.js.map