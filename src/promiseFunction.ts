import { Character, Episode, Episodes, CharacterLocation } from "./types";
import { setSideBar, createList, setContainerInfo, createCardsInfo, setSectionInfo, createCharcacterInfo } from "./setHTML.js";
import { clearInfo } from "./utils.js";
/**
 * 
 * this is working to show the name of episodes and call a function to show the character of episodes its working on the side bar
 */

export function setEpisodeList(): void {
    clearInfo();
    const urlEpisodes: string = "https://rickandmortyapi.com/api/episode";
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
        });

}




export function loadEpisode(this: HTMLElement) {

    const episodeId = this.getAttribute("episodeId");
    const urlEpisode: string = `https://rickandmortyapi.com/api/episode/${episodeId}`;
    fetch(urlEpisode)
        .then(response => response.json())
        .then((data: Episode) => {

            setContainerInfo(data);

            const characterURLs: string[] = data.characters;
            console.log(characterURLs)
            characterURLs.forEach((characterURL: string) => {
                fetch(characterURL)
                    .then(response => response.json())
                    .then((data: Character) => {
                        createCardsInfo(data);



                    });

            })
        })
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

                    });
            });
        });
}
