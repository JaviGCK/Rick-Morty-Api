import { setSideBar } from "./setHTML.js";
export function setEpisodeList() {
    const urlEpisodes = "https://rickandmortyapi.com/api/episode";
    let nextPage = 1;
    fetch(`${urlEpisodes}?page=${nextPage}`)
        .then(response => response.json())
        .then((data) => {
        setSideBar();
    });
    console.log("hola");
}
//# sourceMappingURL=fetchLoader.js.map