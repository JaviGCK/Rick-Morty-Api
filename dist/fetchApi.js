import { setList, setContainerInfo, setCardsInfo, setCharcacterInfo, setEpisodeCharacter, setOriginInfo, setResidents } from "./setHTML.js";
import { clearInfo } from "./utils.js";
export function loadEpisodesList() {
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
        setList(data);
    })
        .catch(error => {
        console.error("Error loading Episodes", error);
    });
}
export function loadEpisode() {
    clearInfo();
    const episodeId = this.getAttribute("episodeId");
    const urlEpisode = `https://rickandmortyapi.com/api/episode/${episodeId}`;
    fetch(urlEpisode)
        .then(response => response.json())
        .then((data) => {
        setContainerInfo(data);
        const characterURLs = data.characters;
        characterURLs.forEach((characterURL) => {
            fetch(characterURL)
                .then(response => response.json())
                .then((data) => {
                setCardsInfo(data);
            })
                .catch(error => {
                console.error("Error loading Episode", error);
            });
        });
    })
        .catch(error => {
        console.error("Error loading Character", error);
    });
}
export function loadCharacter() {
    clearInfo();
    const characterId = this.getAttribute("characterId");
    const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`;
    fetch(urlCharacter)
        .then((response) => response.json())
        .then((data) => {
        setCharcacterInfo(data);
        const episodes = data.episode;
        episodes.forEach(episodeUrl => {
            fetch(episodeUrl)
                .then(response => response.json())
                .then((data) => {
                setEpisodeCharacter(data);
            })
                .catch(error => {
                console.error("Error loading Character", error);
            });
        });
    })
        .catch(error => {
        console.error("Error loading Episode", error);
    });
}
export function loadOrigin() {
    clearInfo();
    const urlOrigin = this.getAttribute("data-origin-URL");
    fetch(`${urlOrigin}`)
        .then(response => response.json())
        .then((data) => {
        setOriginInfo(data);
        const residents = data.residents;
        residents.forEach((residents) => {
            fetch(residents)
                .then(response => response.json())
                .then((characterData) => {
                setResidents(characterData);
            })
                .catch(error => {
                console.error("Error loading character", error);
            });
        });
    })
        .catch(error => {
        console.error("Error loading location", error);
    });
}
//# sourceMappingURL=fetchApi.js.map