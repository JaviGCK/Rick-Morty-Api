import { Character, Episode, Episodes, CharacterLocation } from "./types";

window.addEventListener("load", loadEpisodeList);

/* This function loads a list of episodes and creates a sidebar,
If the sidebar already has 51 episodes, the function does not perform any further action, if it is empty it makes a request regarding the episodes it already has loaded. */

function loadEpisodeList() {

  let nextPage = 1;
  const urlEpisodes = "https://rickandmortyapi.com/api/episode";
  const sideBar = document.querySelector("#side-bar");
  const ul = document.querySelector("#ulList");

  if (ul?.childElementCount === 51) return
  if (sideBar?.childElementCount === 0) {

    fetch(`${urlEpisodes}?page=${nextPage}`)
      .then(response => response.json())
      .then((data: Episodes) => {

        const containerDiv = document.createElement("div");
        const h2 = document.createElement("h2");
        const ulContainerDiv = document.createElement("div");
        const ul = document.createElement("ul");

        ulContainerDiv.setAttribute("id", "ulContainer");
        ul.id = "ulList";

        containerDiv.classList.add("container-fluid");
        h2.classList.add("text-center", "mt-4", "text-yellow", "no-cursor");
        ulContainerDiv.classList.add("scroll-size", "size-respons-scroll");
        ul.classList.add("nav", "flex-column", "sidebar-menu");

        
        h2.textContent = "Episode";
        
        containerDiv.appendChild(h2);
        containerDiv.appendChild(ulContainerDiv);
        ulContainerDiv.appendChild(ul);
        sideBar?.appendChild(containerDiv);
        
        const episodes = data.results;

        episodes.forEach(episode => {
          const listElement = document.createElement("li");
          const episodeList = document.createElement("h5");

          listElement.setAttribute("episodeId", `${episode.id}`);

          listElement.classList.add("mb-3", "mt-divs", "cursor-select");
          episodeList.classList.add("text-center", "text-yellow");

          episodeList.textContent = `${episode.id} - ${episode.name}`;

          listElement.appendChild(episodeList);
          ul.appendChild(listElement);

          listElement.addEventListener("click", loadEpisode);
          ulContainerDiv?.addEventListener("scroll", scrollInfinity);
        });
      });
  } else {

    const ul = document.querySelector("#ulList");
    let url = "";
    if (ul?.childElementCount === 20) {
      url = "https://rickandmortyapi.com/api/episode?page=2"
    } else if (ul?.childElementCount === 40) {
      url = "https://rickandmortyapi.com/api/episode?page=3"
    }
    fetch(url)
      .then(response => response.json())
      .then((data: Episodes) => {

        const episodes = data.results;

        episodes.forEach(episode => {

          const listElement = document.createElement("li");
          const episodeList = document.createElement("h5");

          listElement.setAttribute("episodeId", `${episode.id}`);

          listElement.classList.add("mb-3", "mt-divs");
          episodeList.classList.add("text-center", "text-yellow", "cursor-select");

          episodeList.textContent = `${episode.id} - ${episode.name}`;

          listElement.appendChild(episodeList);
          ul?.appendChild(listElement);

          listElement.addEventListener("click", loadEpisode);
        });
      });
  }
}

/* This feature loads and displays detailed information for a specific episode. Dynamically create HTML elements to display the episode info, displaying the character details on a card. */

function loadEpisode(this: HTMLElement) {

  clearInfo();

  const episodeId = this.getAttribute("episodeId");
  const urlEpisode: string = `https://rickandmortyapi.com/api/episode/${episodeId}`;

  fetch(urlEpisode)
    .then(response => response.json())
    .then((data: Episode) => {

      const infoEpisode = document.querySelector("#section-info");
      const episodeHeader = document.createElement("div");
      const titleElementEpisode = document.createElement("h2");
      const airDateElement = document.createElement("h2");
      const cardInfoChar = document.createElement("div");

      cardInfoChar.setAttribute('id', 'cardContainer');

      infoEpisode?.classList.add("container-border");
      episodeHeader.classList.add("episode-header");
      titleElementEpisode.classList.add("text-yellow", "no-cursor");
      airDateElement.classList.add("text-yellow", "no-cursor");
      cardInfoChar.classList.add("card-container", "grid-display", "display-respons", "overflow-auto", "w-100", "full-height");

      titleElementEpisode.textContent = `${data.name}`;
      airDateElement.textContent = `${data.air_date}`;

      episodeHeader.appendChild(titleElementEpisode);
      episodeHeader.appendChild(airDateElement);
      infoEpisode?.appendChild(episodeHeader);

      infoEpisode?.appendChild(cardInfoChar);

      const characterURLs: string[] = data.characters;

      characterURLs.forEach((characterURL: string) => {
        fetch(characterURL)
          .then(response => response.json())
          .then((characterData: Character) => {

            const character = characterData;
            const cardContainer = document.querySelector("#cardContainer");
            const cardDiv = document.createElement("div");
            const imageElement = document.createElement("img");
            const cardBodyDiv = document.createElement("div");
            const titleElement = document.createElement("h5");
            const statusElement = document.createElement("p");
            const speciesElement = document.createElement("p");

            cardDiv.classList.add("container-border", "text-yellow", "bg-pink", "border-card", "size-respons-card", "cursor-select");
            imageElement.classList.add("card-img-top",);
            cardBodyDiv.classList.add("card-body");
            titleElement.classList.add("card-title", "mt-2");
            statusElement.classList.add("card-text", "mt-2");
            speciesElement.classList.add("card-text", "mb-1");

            cardDiv.setAttribute("characterId", `${character.id}`);

            imageElement.src = character.image;
            imageElement.alt = "Character Image";

            titleElement.textContent = `${character.name}`;
            statusElement.textContent = `Status: ${character.status}`;
            speciesElement.textContent = `Species: ${character.species}`;
            
            cardDiv.appendChild(imageElement);
            cardBodyDiv.appendChild(titleElement);
            cardBodyDiv.appendChild(statusElement);
            cardBodyDiv.appendChild(speciesElement);
            cardDiv.appendChild(cardBodyDiv);
            cardContainer?.appendChild(cardDiv);

            cardDiv.addEventListener("click", loadCharacter);
            (cardDiv);
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

/*This function loads and displays detailed information for a specific character. Dynamically creates HTML elements to display character information, also displays the episodes the character has appeared in.*/

function loadCharacter(this: HTMLElement) {
  clearInfo();
  (this);
  const characterId = this.getAttribute("characterId");
  (this);
  const urlCharacter: string = `https://rickandmortyapi.com/api/character/${characterId}`;

  fetch(urlCharacter)
    .then((response) => response.json())
    .then((data: Character) => {

      const infoCharacter = document.querySelector("#section-info");
      infoCharacter?.classList.add("container-border");
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("container-border", "text-yellow", "bg-pink", "border-card", "overflow-auto", "full-h-respons", "full-character");
      const rowDiv = document.createElement("div");
      const imageColDiv = document.createElement("div");
      const imageElement = document.createElement("img");
      const infoColDiv = document.createElement("div");
      const cardBodyDiv = document.createElement("div");
      const titleElement = document.createElement("h5");
      const statusElement = document.createElement("p");
      const speciesElement = document.createElement("p");
      const genderElement = document.createElement("p");
      const originElement = document.createElement("p");
      const lineDiv = document.createElement("div");
      const episodeElement = document.createElement("div");
      
      originElement.setAttribute("data-origin-URL", `${data.origin.url}`);

      imageElement.src = data.image;
      imageElement.alt = "Character Image";

      rowDiv.classList.add("row", "g-0", "display-respons", "no-cursor");
      imageColDiv.classList.add("col-md-4", "p-3");
      imageElement.classList.add("img-fluid", "rounded-start");
      infoColDiv.classList.add("col-md-8");
      cardBodyDiv.classList.add("card-body", "border-bottom", "border-green");
      titleElement.classList.add("card-title", "mb-2", "fs-2", "text-center");
      statusElement.classList.add("card-text", "fs-3", "text-center");
      speciesElement.classList.add("card-text", "fs-3", "text-center");
      genderElement.classList.add("card-text", "fs-3", "text-center");
      originElement.classList.add("card-text", "fs-3", "text-center", "cursor-select");
      episodeElement.classList.add("grid-display", "display-respons", "size-respons", "display-respons");

      titleElement.textContent = data.name;
      statusElement.textContent = "Status: " + data.status;
      speciesElement.textContent = "Species: " + data.species;
      genderElement.textContent = "Gender: " + data.gender;
      originElement.textContent = "origin: " + data.origin.name;
      cardDiv.appendChild(rowDiv);

      rowDiv.appendChild(imageColDiv);
      imageColDiv.appendChild(imageElement);
      rowDiv.appendChild(infoColDiv);
      infoColDiv.appendChild(cardBodyDiv);
      cardBodyDiv.appendChild(titleElement);
      cardBodyDiv.appendChild(statusElement);
      cardBodyDiv.appendChild(speciesElement);
      cardBodyDiv.appendChild(genderElement);
      cardBodyDiv.appendChild(originElement);
      infoCharacter?.appendChild(cardDiv);
      lineDiv.classList.add("border-top", "border-warning");
      cardBodyDiv.appendChild(lineDiv);
      rowDiv.appendChild(episodeElement);
      
      if (data.origin.name !== "unknown") {
        originElement.addEventListener("click", loadOrigin);
      }

      const episodes = data.episode;

      episodes.forEach(episodeUrl => {
        fetch(episodeUrl)
          .then(response => response.json())
          .then((episodeData: Episode) => {

            const elementDiv = document.createElement("div");
            const elementTitle = document.createElement("h5");

            elementDiv.setAttribute("episodeId", `${episodeData.id}`);

            elementDiv.classList.add("mb-3", "mt-divs");
            elementTitle.classList.add("text-center", "text-yellow");

            elementTitle.textContent = `${episodeData.id} - ${episodeData.name}`;
            
            elementDiv.appendChild(elementTitle);
            episodeElement.appendChild(elementDiv);

            elementDiv.addEventListener("click", loadEpisode);
          });
      });
    });
}

/*This function loads and displays detailed information for a specific source. Dynamically creates HTML elements a list of associated characters. The characters are displayed in the form of cards.*/

function loadOrigin(this: HTMLElement) {
  clearInfo();

  const urlOrigin = this.getAttribute("data-origin-URL");
  
  fetch(`${urlOrigin}`)
    .then(response => response.json())
    .then((data: CharacterLocation) => {

      const infoOrigin = document.querySelector("#section-info");
      const episodeHeader = document.createElement("div");
      const titleElementEpisode = document.createElement("h2");
      const typeElement = document.createElement("h2");
      const cardInfoChar = document.createElement("div");
      const residents: any = data.residents;

      cardInfoChar.setAttribute('id', 'cardContainer');
      
      infoOrigin?.classList.add("container-border");
      episodeHeader.classList.add("episode-header", "no-cursor");
      titleElementEpisode.classList.add("text-yellow");
      typeElement.classList.add("text-yellow");
      cardInfoChar.classList.add("grid-display", "display-respons", "w-100", "overflow-auto", "full-height", "cursor-select");
      cardInfoChar.style.maxHeight = "73vh";

      titleElementEpisode.textContent = `${data.name}`;
      typeElement.textContent = `${data.type}`;
      
      episodeHeader.appendChild(titleElementEpisode);
      episodeHeader.appendChild(typeElement);
      infoOrigin?.appendChild(episodeHeader);
      infoOrigin?.appendChild(cardInfoChar);

      residents.forEach((residents: string) => {
        fetch(residents)
          .then(response => response.json())
          .then((characterData: Character) => {
            const character = characterData;
            const infoEpisode = document.querySelector("#section-info");
            const cardContainer = document.querySelector("#cardContainer");
            const cardDiv = document.createElement("div");
            const imageElement = document.createElement("img");
            const cardBodyDiv = document.createElement("div");
            const titleElement = document.createElement("h5");
            const statusElement = document.createElement("p");
            const speciesElement = document.createElement("p");
            
            cardDiv.setAttribute("characterId", `${character.id}`);
            
            imageElement.src = character.image;
            imageElement.alt = "Character Image";

            cardDiv.classList.add("container-border", "text-yellow", "bg-pink", "border-card", "size-respons-card");
            imageElement.classList.add("card-img-top",);
            cardBodyDiv.classList.add("card-body");
            titleElement.classList.add("card-title", "mt-2");
            statusElement.classList.add("card-text", "mt-2");
            speciesElement.classList.add("card-text", "mb-1");

            titleElement.textContent = `${character.name}`;
            statusElement.textContent = `Status: ${character.status}`;
            speciesElement.textContent = `Species: ${character.species}`;
            
            cardDiv.appendChild(imageElement);
            cardBodyDiv.appendChild(titleElement);
            cardBodyDiv.appendChild(statusElement);
            cardBodyDiv.appendChild(speciesElement);
            cardDiv.appendChild(cardBodyDiv);
            cardContainer?.appendChild(cardDiv);

            cardDiv.addEventListener("click", loadCharacter);
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

/* The function checks if the end of the list has been reached. 
If the above condition is met and a next page is available. */

function scrollInfinity() {
  let nextPage = 1;
  const ulContainerDiv = document.querySelector("#ulContainer");
  if (ulContainerDiv === null) return;

  const scrollTop = ulContainerDiv.scrollTop;
  const scrollHeight = ulContainerDiv.scrollHeight;
  const clientHeight = ulContainerDiv.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 200 && nextPage !== -1) {
    loadEpisodeList();
  };
}

/* This function is responsible for cleaning the information section as required */

function clearInfo() {
  const containerInfo1 = document.querySelector("#section-info");
  containerInfo1?.replaceChildren();
}
