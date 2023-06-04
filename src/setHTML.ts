import { Character, Episode, Episodes, CharacterLocation } from "./types";
import { setEpisodeList, loadEpisode, loadCharacter } from "./promiseFunction.js";
import { clearInfo, scrollInfinity } from "./utils.js";

/**
 * 
 * this create header on the body like a top position, even call setMainContainer
 */
export function setHeaderContainer(): void {
  const body: (HTMLBodyElement | null) = document.querySelector("body");
  const headerNav: (HTMLElement | null) = document.createElement("nav");
  const headerNavDiv: (HTMLDivElement | null) = document.createElement("div");
  const headerNavDivH1: (HTMLHeadingElement | null) = document.createElement("h1");
  const headerNavDivBtn: (HTMLButtonElement | null) = document.createElement("button");
  const headerNavDivBtnImg: (HTMLImageElement | null) = document.createElement("img");
  if (body === null) return;
  if (headerNav === null) return;
  if (headerNavDiv === null) return;
  if (headerNavDivH1 === null) return;
  if (headerNavDivBtn === null) return;
  if (headerNavDivBtnImg === null) return;


  headerNav.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-transparent");
  headerNavDiv.classList.add("container-fluid");
  headerNavDivH1.classList.add("text-yellow", "fs-1", "text", "center-title", "center-title-respons", "mt-4", "no-cursor");
  headerNavDivBtn.classList.add("button-style", "container-border");
  headerNavDivBtn.setAttribute("type", "button");
  headerNavDivBtn.setAttribute("data-bs-toggle", "collapse");
  headerNavDivBtn.setAttribute("data-bs-target", "#collapse-side-bar");
  headerNavDivBtn.setAttribute("aria-expanded", "false");
  headerNavDivBtn.setAttribute("aria-controls", "collapse-side-bar");
  headerNavDivBtnImg.classList.add("img-size-button");
  headerNavDivBtnImg.setAttribute("src", "images/portal.png");

  headerNavDivH1.innerText = "Rick & Morty";

  body.appendChild(headerNav);
  headerNav.appendChild(headerNavDiv);
  headerNavDiv.appendChild(headerNavDivH1);
  headerNavDiv.appendChild(headerNavDivBtn);
  headerNavDivBtn.appendChild(headerNavDivBtnImg);

  setMainContainer();
  //scrollInfinity();
}


/**
 * 
 * i create a main with some neccesary class
 */
function setMainContainer(): void {

  const body: (HTMLBodyElement | null) = document.querySelector("body");
  const main: (HTMLElement | null) = document.createElement("main");
  if (body === null) return;
  if (main === null) return;

  main.setAttribute("id", "main")
  main.classList.add("flex-display", "display-respons", "align-items-center", "full-heigth");

  body.appendChild(main);

  setSideBar();
  setSectionInfo();
  //setContainerInfo();

}


/**
 * 
 * here i have a side bar to create all elements to use for the list episodes, its function calls a function to call the api from promise
 */
export function setSideBar(): void {
  clearInfo();

  const main: (HTMLElement | null) = document.querySelector("main");
  const sideBarAside: (HTMLElement | null) = document.createElement("div");
  const sideBarDiv: (HTMLDivElement | null) = document.createElement("div");
  const sideBarDivTitle: (HTMLHeadingElement | null) = document.createElement("h2");
  const sideBarDivUl: (HTMLDivElement | null) = document.createElement("div");
  const sideBarUlList: (HTMLUListElement | null) = document.createElement("ul");

  if (main === null) return;
  if (sideBarAside === null) return;
  if (sideBarDiv === null) return;
  if (sideBarDivTitle === null) return;
  if (sideBarDivUl === null) return;
  if (sideBarUlList === null) return;

  sideBarAside.classList.add("container-border");
  sideBarAside.setAttribute("id", "side-bar")
  sideBarDiv.classList.add("container-fluid");
  sideBarDivTitle.classList.add("text-center", "mt-4", "text-yellow", "no-cursor");
  sideBarDivUl.classList.add("scroll-size", "size-respons-scroll");
  sideBarDivUl.setAttribute("id", "ulContainer");
  sideBarUlList.classList.add("nav", "flex-column", "sidebar-menu");
  sideBarUlList.setAttribute("id", "ul-list");

  sideBarDivTitle.innerText = "Episode";

  main.appendChild(sideBarAside);
  sideBarAside.appendChild(sideBarDiv);
  sideBarDiv.appendChild(sideBarDivTitle);
  sideBarAside.appendChild(sideBarDivUl);
  sideBarDivUl.appendChild(sideBarUlList);

  setEpisodeList();
  sideBarDivUl.addEventListener("scroll", scrollInfinity);

}

/**
 * 
 * @param data is a list episodes
 * create the elements neccesary to show name & id of each episode
 */
export function createList(data: Episodes) {

  const sideBarUl: (HTMLUListElement | null) = document.querySelector("#ul-list");
  if (sideBarUl === null) return;
  const episodes = data.results;
  episodes.forEach(episode => {

    const sideBarLi: (HTMLLIElement | null) = document.createElement("li");
    const sideBarLiTitle: (HTMLHeadingElement | null) = document.createElement("h5");

    if (sideBarLi === null) return;
    if (sideBarLiTitle === null) return;

    sideBarLi.setAttribute("episodeId", `${episode.id}`);
    sideBarLi.setAttribute("id", "sidebar-li");
    sideBarLi.classList.add("mb-3", "mt-divs", "cursor-select");
    sideBarLiTitle.classList.add("text-center", "text-yellow");

    sideBarLiTitle.textContent = `${episode.id} - ${episode.name}`;

    sideBarLi.appendChild(sideBarLiTitle);
    sideBarUl.appendChild(sideBarLi);
    sideBarLi.addEventListener("click", loadEpisode);


  });

}






export function setSectionInfo(): void {

  const main: (HTMLElement | null) = document.querySelector("#main");
  const sectionInfo: (HTMLElement | null) = document.createElement("section");

  if (main === null) return;
  if (sectionInfo === null) return;
  sectionInfo.setAttribute("id", "section-info");

  main.appendChild(sectionInfo);
}


/**
 * 
 * @param data recive the episode data to print the episode we real need from id
 * @returns 
 */
export function setContainerInfo(data: Episode) {

  clearInfo();

  const sectionInfo: (HTMLElement | null) = document.querySelector("#section-info");
  const sectionInfoHeaderDiv: (HTMLDivElement | null) = document.createElement("div");
  const sectionInfoHeaderTitleEpisode: (HTMLHeadingElement | null) = document.createElement("h2");
  const sectionInfoHeaderTitleAirData: (HTMLHeadingElement | null) = document.createElement("h2");
  const sectionCardDiv: (HTMLDivElement | null) = document.createElement("div");

  if (sectionInfo === null) return;
  if (sectionInfoHeaderDiv === null) return;
  if (sectionInfoHeaderTitleEpisode === null) return;
  if (sectionInfoHeaderTitleAirData === null) return;
  if (sectionCardDiv === null) return;

  sectionInfo.classList.add("size-respons", "full-width", "container-border");
  sectionInfoHeaderDiv.classList.add("episode-header");
  sectionInfoHeaderTitleEpisode.classList.add("text-yellow", "no-cursor");
  sectionInfoHeaderTitleAirData.classList.add("text-yellow", "no-cursor");
  sectionCardDiv.setAttribute("id", "section-card-div");
  sectionCardDiv.classList.add("grid-display", "display-respons", "w-100", "overflow-auto", "full-height", "cursor-select");

  sectionInfoHeaderTitleEpisode.innerText = `${data.name}`;
  sectionInfoHeaderTitleAirData.innerText = `${data.air_date}`;

  sectionInfo.appendChild(sectionInfoHeaderDiv);
  sectionInfo.appendChild(sectionCardDiv);
  sectionInfoHeaderDiv.appendChild(sectionInfoHeaderTitleEpisode);
  sectionInfoHeaderDiv.appendChild(sectionInfoHeaderTitleAirData);

}

export function createCardsInfo(characterData: Character) {
  console.log("cards");
  const sectionCardDiv: (HTMLElement | null) = document.querySelector("#section-card-div");
  const cardDiv: (HTMLDivElement | null) = document.createElement("div");
  const cardDivImg: (HTMLImageElement | null) = document.createElement("img");
  const cardDivBody: (HTMLDivElement | null) = document.createElement("div");
  const cardBodyDivTitleName: (HTMLHeadingElement | null) = document.createElement("h5");
  const cardBodyDivTileStatus: (HTMLParagraphElement | null) = document.createElement("p");
  const cardBodyDivTileSpecie: (HTMLParagraphElement | null) = document.createElement("p");

  if (sectionCardDiv === null) return;
  if (cardDiv === null) return;
  if (cardDivImg === null) return;
  if (cardDivBody === null) return;
  if (cardBodyDivTitleName === null) return;
  if (cardBodyDivTileSpecie === null) return;
  if (cardBodyDivTileSpecie === null) return;



  cardDiv.setAttribute("characterId", `${characterData.id}`);
  cardDiv.classList.add("container-border", "text-yellow", "bg-pink", "border-card", "size-respons-card", "cursor-select");
  cardDivImg.src = characterData.image;
  cardDivImg.alt = characterData.image;
  cardDivImg.classList.add("card-img-top",);
  cardDivBody.classList.add("card-body");
  cardBodyDivTitleName.classList.add("card-title", "mt-2");
  cardBodyDivTileStatus.classList.add("card-text", "mt-2");
  cardBodyDivTileSpecie.classList.add("card-text", "mb-1");

  cardBodyDivTitleName.innerText = `${characterData.name}`;
  cardBodyDivTileStatus.innerText = `Status: ${characterData.status}`;
  cardBodyDivTileSpecie.innerText = `Species: ${characterData.species}`;

  sectionCardDiv.appendChild(cardDiv);
  cardDiv.appendChild(cardDivImg);
  cardDivBody.appendChild(cardBodyDivTitleName);
  cardDivBody.appendChild(cardBodyDivTileStatus);
  cardDivBody.appendChild(cardBodyDivTileSpecie);
  cardDiv.appendChild(cardDivBody);


  cardDiv.addEventListener("click", loadCharacter);
  
}
/** fixed this part of code*/
export function createCharcacterInfo(data: Character) {

  clearInfo();

  const sectionInfo: (HTMLElement | null) = document.querySelector("#section-info");
  const sectionInfoContainerDiv = document.createElement("div");
  const sectionInfoDivRow = document.createElement("div");
  const sectionInfoDivCol = document.createElement("div");
  const sectionInfoImg = document.createElement("img");
  const sectionInfoColDiv = document.createElement("div");
  const sectionInfoBodyDiv = document.createElement("div");
  const sectionInfoTitle = document.createElement("h5");
  const sectionInfoStatus = document.createElement("p");
  const sectionInfoSpecies = document.createElement("p");
  const sectionInfoGender = document.createElement("p");
  const sectionInfoOrigin = document.createElement("p");
  const sectionInfoLineDiv = document.createElement("div");
  const sectionInfoEpisodes = document.createElement("div");

  if (sectionInfo === null) return;

  sectionInfoImg.src = data.image;
  sectionInfoImg.alt = "Character Image";

  sectionInfoContainerDiv.classList.add("container-border", "text-yellow", "bg-pink", "border-card", "full-h-respons", "full-character", "scroll-respons");
  sectionInfoDivRow.classList.add("row", "g-0", "display-respons", "no-cursor");
  sectionInfoDivCol.classList.add("col-md-4", "p-3");
  sectionInfoImg.classList.add("img-fluid", "rounded-start");
  sectionInfoColDiv.classList.add("col-md-8", "text-yellow");
  sectionInfoBodyDiv.classList.add("card-body", "border-bottom", "border-green");
  sectionInfoTitle.classList.add("card-title", "mb-2", "fs-2", "text-center");
  sectionInfoStatus.classList.add("card-text", "fs-3", "text-center");
  sectionInfoSpecies.classList.add("card-text", "fs-3", "text-center");
  sectionInfoGender.classList.add("card-text", "fs-3", "text-center");
  sectionInfoOrigin.setAttribute("data-origin-URL", `${data.origin.url}`);
  sectionInfoOrigin.classList.add("card-text", "fs-3", "text-center", "cursor-select");
  sectionInfoLineDiv.classList.add("border-top", "border-warning");
  sectionInfoEpisodes.setAttribute("id", "section-info-episodes");
  sectionInfoEpisodes.classList.add("grid-display", "display-respons", "size-respons", "display-respons", "overflow-auto", "scroll-size-mid");

  sectionInfoTitle.innerText = data.name;
  sectionInfoStatus.innerText = "Status: " + data.status;
  sectionInfoSpecies.innerText = "Species: " + data.species;
  sectionInfoGender.innerText = "Gender: " + data.gender;
  sectionInfoOrigin.innerText = "origin: " + data.origin.name;

  sectionInfo.appendChild(sectionInfoContainerDiv);
  sectionInfoContainerDiv.appendChild(sectionInfoDivRow);
  sectionInfoDivRow.appendChild(sectionInfoDivCol);
  sectionInfoDivCol.appendChild(sectionInfoImg);
  sectionInfoDivRow.appendChild(sectionInfoColDiv);
  sectionInfoColDiv.appendChild(sectionInfoBodyDiv);
  sectionInfoBodyDiv.appendChild(sectionInfoTitle);
  sectionInfoBodyDiv.appendChild(sectionInfoStatus);
  sectionInfoBodyDiv.appendChild(sectionInfoSpecies);
  sectionInfoBodyDiv.appendChild(sectionInfoGender);
  sectionInfoBodyDiv.appendChild(sectionInfoOrigin);
  sectionInfoBodyDiv.appendChild(sectionInfoLineDiv);
  sectionInfoDivRow.appendChild(sectionInfoEpisodes);

  //if (data.origin.name !== "unknown") {
  //sectionInfoOrigin.addEventListener("click", loadOrigin);
  // }

  
}

export function createEpisodeCharacter(episodeData: Episode) {
  const sectionInfoEpisodes = document.querySelector("#section-info-episodes");
  const elementDiv = document.createElement("div");
            const elementTitle = document.createElement("h5");

            if(sectionInfoEpisodes === null) return;

            elementDiv.setAttribute("episodeId", `${episodeData.id}`);

            elementDiv.classList.add("mb-3", "mt-divs");
            elementTitle.classList.add("text-center", "text-yellow");

            elementTitle.textContent = `${episodeData.id} - ${episodeData.name}`;
            
            elementDiv.appendChild(elementTitle);
            sectionInfoEpisodes.appendChild(elementDiv);

            elementDiv.addEventListener("click", loadEpisode);
}


/**
 * 
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
*/
