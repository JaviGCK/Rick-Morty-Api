import { Character, Episode, Episodes, CharacterLocation } from "./types";
import { createList, setContainerInfo, createCardsInfo, createCharcacterInfo, createEpisodeCharacter, createOriginInfo, setResidents } from "./setHTML.js";
import { clearInfo } from "./utils.js";
/**
 * 
 * this is working to show the name of episodes and call a function to show the character of episodes its working on the side bar
 */

export function setEpisodeList(): void {

    const sideBarAside: (HTMLElement | null) = document.querySelector("#side-bar");
    const sideBarDivUl: (HTMLDivElement | null) = document.createElement("div");
    const sideBarUl: (HTMLUListElement | null) = document.querySelector("#ul-list");

    if (sideBarAside === null) return;
    if (sideBarDivUl === null) return;
    if (sideBarUl === null) return;
    let url = "";
    if (sideBarUl.childElementCount === 0) {
        url = "https://rickandmortyapi.com/api/episode";
    }
    else if (sideBarUl.childElementCount === 20) {
        url = "https://rickandmortyapi.com/api/episode?page=2"
    } else if (sideBarUl.childElementCount === 40) {
        url = "https://rickandmortyapi.com/api/episode?page=3"
    }
    fetch(url)
        .then(response => response.json())
        .then((data: Episodes) => {
            createList(data);
        })
        .catch(error => {
            console.error("Error loading Episodes", error);
        });
}




export function loadEpisode(this: HTMLElement) {

    clearInfo();

    const episodeId = this.getAttribute("episodeId");
    const urlEpisode: string = `https://rickandmortyapi.com/api/episode/${episodeId}`;
    fetch(urlEpisode)
        .then(response => response.json())
        .then((data: Episode) => {

            setContainerInfo(data);

            const episodes = data.episode;
            const characterURLs: string[] = data.characters;

            characterURLs.forEach((characterURL: string) => {
                fetch(characterURL)
                    .then(response => response.json())
                    .then((data: Character) => {
                        createCardsInfo(data);
                    })
                    .catch(error => {
                        console.error("Error loading Episode", error);
                    });
            })
        })
        .catch(error => {
            console.error("Error loading Character", error);
        });
}


export function loadCharacter(this: HTMLElement) {

    clearInfo();

    const characterId = this.getAttribute("characterId");

    const urlCharacter: string = `https://rickandmortyapi.com/api/character/${characterId}`;

    fetch(urlCharacter)
        .then((response) => response.json())
        .then((data: Character) => {

            createCharcacterInfo(data);

            const episodes = data.episode;

            episodes.forEach(episodeUrl => {
                fetch(episodeUrl)
                    .then(response => response.json())
                    .then((data: Episode) => {
                        createEpisodeCharacter(data);
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


export function loadOrigin(this: HTMLElement) {

    clearInfo();

    const urlOrigin = this.getAttribute("data-origin-URL");

    fetch(`${urlOrigin}`)
        .then(response => response.json())
        .then((data: CharacterLocation) => {
            createOriginInfo(data);


            const residents = data.residents
            residents.forEach((residents: string) => {
                fetch(residents)
                    .then(response => response.json())
                    .then((characterData: Character) => {
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