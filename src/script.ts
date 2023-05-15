
window.addEventListener("load", createEpisodeElement);

const urlApi: string = "https://rickandmortyapi.com/api";


// This function creates a li element using the DOM, where it shows the name and ID of the episodes.

function createEpisodeElement(episode: any) {
  const listElement = document.createElement("li");
  listElement.classList.add("mb-3", "sidebar-lineheight");

  const episodeList = document.createElement("h5");
  episodeList.classList.add("text-center", "text-warning");
  episodeList.textContent = `${episode.id} - ${episode.name}`;
  listElement.appendChild(episodeList);

  listElement.setAttribute("episodeId", `${episode.id}`); // Asignar la ID del episodio al atributo episodeId
  listElement.addEventListener("click", loadEpisode); // Agregar el evento click para cargar el episodio

  return listElement;
}


//  This function creates a title of episode using the DOM, where it shows the info of characters.

function createInfoEpisode(episode: any) {
  const infoEpisode = document.querySelector("#sectionInfo");

  const divElement = document.createElement("div");
  infoEpisode?.appendChild(divElement);

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
//  This function creates a card element using the DOM, where it shows the info of characters.



function createCharacterCards(character: any) {

  const cardContainer = document.getElementById("cardContainer");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("container-border", "text-yellow", "bg-green");
  cardContainer?.appendChild(cardDiv);

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


//the loadSideBar function fetches episodes data from the API, creates ul elements for each episode, and appends them to the designated container on the webpage. It also keeps track of the next page number to load subsequent episodes.

let nextPage: number = 1;

function loadSideBar() {

  const urlEpisodes: string = "https://rickandmortyapi.com/api/episode";

  fetch(`${urlEpisodes}?page=${nextPage}`)
    .then(response => response.json())
    .then(data => {
      const listEpisodes = document.querySelector("#ulList");

      const episodes = data.results;

      episodes.forEach((episode: any) => {
        const liElement = createEpisodeElement(episode);
        liElement.setAttribute("episodeId", `${episode.id}`);
        listEpisodes?.appendChild(liElement);
        liElement.addEventListener("click", loadEpisode);
      });

      nextPage = data.info.next ? parseInt(data.info.next.split("=")[1]) : -1;
    })
    .catch(error => {
      console.error("Error loading episodes", error);
    });
}

function loadEpisode(this: HTMLElement) {

  clearInfo();

  const episodeId = this.getAttribute("episodeId");
  const urlEpisode: string = `https://rickandmortyapi.com/api/episode/${episodeId}`;

  fetch(urlEpisode)
    .then(response => response.json())
    .then(data => {
      const infoEpisode = document.querySelector("#sectionInfo");
      const cardInfoChar = document.createElement("div");
      cardInfoChar.classList.add("card-container", "grid-container", "scroll");
      cardInfoChar.setAttribute('id', 'cardContainer');
      infoEpisode?.appendChild(cardInfoChar);

      
      const episode = data;

      const episodeInfoElement = createInfoEpisode(episode);
      infoEpisode?.insertBefore(episodeInfoElement, infoEpisode.firstChild);

      const characterURLs = episode.characters;
      characterURLs.forEach((characterURL: string) => {
        fetch(characterURL)
          .then(response => response.json())
          .then(characterData => {
            const cardElement = createCharacterCards(characterData);
            cardElement.setAttribute("episodeId", `${episode.id}`);
            cardInfoChar?.appendChild(cardElement);
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


//This code sets up a listener for the window's load event and adds a scroll event listener to the ulContainer element. When the user scrolls near the bottom of the container, it triggers the loading of more episodes.

window.addEventListener("load", () => {
  loadSideBar();

  const listEpisodes = document.querySelector("#ulContainer");

  listEpisodes?.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200 && nextPage !== -1) {
      loadSideBar();
    }
  });
});


function clearInfo() {
  //const containerInfo = document.querySelector("#cardContainer");
  //containerInfo?.replaceChildren();
  const containerInfo1 = document.querySelector("#sectionInfo");
  containerInfo1?.replaceChildren();
  
}
