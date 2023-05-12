

window.addEventListener("load", createEpisodeElement);

const urlApi: string = "https://rickandmortyapi.com/api";
const urlEpisodes: string = "https://rickandmortyapi.com/api/episode";


function createEpisodeElement(episode: any) {
  const ulList = document.createElement("ul");
  ulList.classList.add("nav", "flex-column", "sidebar-menu");

  const listElement = document.createElement("li");
  listElement.classList.add("mb-3", "sidebar-lineheight");
  ulList.appendChild(listElement);

  const episodeList = document.createElement("h5");
  episodeList.classList.add("text-center", "text-warning");
  episodeList.textContent = `${episode.id} - ${episode.name}`;
  listElement.appendChild(episodeList);

  return ulList;
}
let nextPage: number = 1;
function loadEpisodes() {
  fetch(`${urlEpisodes}?page=${nextPage}`)
    .then(response => response.json())
    .then(data => {
      const listEpisodes = document.querySelector("#divUlContainer");
      const episodes = data.results;

      episodes.forEach((episode: any) => {
        const ulList = createEpisodeElement(episode);
        listEpisodes?.appendChild(ulList);
      });

      nextPage = data.info.next ? parseInt(data.info.next.split("=")[1]) : -1;
    })
    .catch(error => {
      console.error("Error loading episodes", error);
    });
}

window.addEventListener("load", () => {
  loadEpisodes();

const listEpisodes = document.querySelector("#divUlContainer");

listEpisodes?.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200 && nextPage !== -1) {
      loadEpisodes();
    }
  });
});
