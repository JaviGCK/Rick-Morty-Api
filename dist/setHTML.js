import { setEpisodeList, loadEpisode, loadCharacter } from "./promiseFunction.js";
import { clearInfo, scrollInfinity } from "./utils.js";
export function setHeaderContainer() {
    const body = document.querySelector("body");
    const headerNav = document.createElement("nav");
    const headerNavDiv = document.createElement("div");
    const headerNavDivH1 = document.createElement("h1");
    const headerNavDivBtn = document.createElement("button");
    const headerNavDivBtnImg = document.createElement("img");
    if (body === null)
        return;
    if (headerNav === null)
        return;
    if (headerNavDiv === null)
        return;
    if (headerNavDivH1 === null)
        return;
    if (headerNavDivBtn === null)
        return;
    if (headerNavDivBtnImg === null)
        return;
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
}
function setMainContainer() {
    const body = document.querySelector("body");
    const main = document.createElement("main");
    if (body === null)
        return;
    if (main === null)
        return;
    main.setAttribute("id", "main");
    main.classList.add("flex-display", "display-respons", "align-items-center", "full-heigth");
    body.appendChild(main);
    setSideBar();
    setSectionInfo();
}
export function setSideBar() {
    clearInfo();
    const main = document.querySelector("main");
    const sideBarAside = document.createElement("div");
    const sideBarDiv = document.createElement("div");
    const sideBarDivTitle = document.createElement("h2");
    const sideBarDivUl = document.createElement("div");
    const sideBarUlList = document.createElement("ul");
    if (main === null)
        return;
    if (sideBarAside === null)
        return;
    if (sideBarDiv === null)
        return;
    if (sideBarDivTitle === null)
        return;
    if (sideBarDivUl === null)
        return;
    if (sideBarUlList === null)
        return;
    sideBarAside.classList.add("container-border");
    sideBarAside.setAttribute("id", "side-bar");
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
export function createList(data) {
    const sideBarUl = document.querySelector("#ul-list");
    if (sideBarUl === null)
        return;
    const episodes = data.results;
    episodes.forEach(episode => {
        const sideBarLi = document.createElement("li");
        const sideBarLiTitle = document.createElement("h5");
        if (sideBarLi === null)
            return;
        if (sideBarLiTitle === null)
            return;
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
export function setSectionInfo() {
    const main = document.querySelector("#main");
    const sectionInfo = document.createElement("section");
    if (main === null)
        return;
    if (sectionInfo === null)
        return;
    sectionInfo.setAttribute("id", "section-info");
    main.appendChild(sectionInfo);
}
export function setContainerInfo(data) {
    clearInfo();
    const sectionInfo = document.querySelector("#section-info");
    const sectionInfoHeaderDiv = document.createElement("div");
    const sectionInfoHeaderTitleEpisode = document.createElement("h2");
    const sectionInfoHeaderTitleAirData = document.createElement("h2");
    const sectionCardDiv = document.createElement("div");
    if (sectionInfo === null)
        return;
    if (sectionInfoHeaderDiv === null)
        return;
    if (sectionInfoHeaderTitleEpisode === null)
        return;
    if (sectionInfoHeaderTitleAirData === null)
        return;
    if (sectionCardDiv === null)
        return;
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
export function createCardsInfo(characterData) {
    console.log("cards");
    const sectionCardDiv = document.querySelector("#section-card-div");
    const cardDiv = document.createElement("div");
    const cardDivImg = document.createElement("img");
    const cardDivBody = document.createElement("div");
    const cardBodyDivTitleName = document.createElement("h5");
    const cardBodyDivTileStatus = document.createElement("p");
    const cardBodyDivTileSpecie = document.createElement("p");
    if (sectionCardDiv === null)
        return;
    if (cardDiv === null)
        return;
    if (cardDivImg === null)
        return;
    if (cardDivBody === null)
        return;
    if (cardBodyDivTitleName === null)
        return;
    if (cardBodyDivTileSpecie === null)
        return;
    if (cardBodyDivTileSpecie === null)
        return;
    cardDiv.setAttribute("characterId", `${characterData.id}`);
    cardDiv.classList.add("container-border", "text-yellow", "bg-pink", "border-card", "size-respons-card", "cursor-select");
    cardDivImg.src = characterData.image;
    cardDivImg.alt = characterData.image;
    cardDivImg.classList.add("card-img-top");
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
    (cardDiv);
}
export function createCharcacterInfo(data) {
    const sectionInfo = document.querySelector("#section-info");
    const sectionInfoDivRow = document.createElement("div");
    const sectionInfoDivCol = document.createElement("div");
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
    sectionInfoDivRow.classList.add("row", "g-0", "display-respons", "no-cursor");
    sectionInfoDivCol.classList.add("col-md-4", "p-3");
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
    sectionInfoDivRow.appendChild(sectionInfoDivCol);
    sectionInfoDivCol.appendChild(imageElement);
    sectionInfoDivRow.appendChild(infoColDiv);
    infoColDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(titleElement);
    cardBodyDiv.appendChild(statusElement);
    cardBodyDiv.appendChild(speciesElement);
    cardBodyDiv.appendChild(genderElement);
    cardBodyDiv.appendChild(originElement);
    lineDiv.classList.add("border-top", "border-warning");
    cardBodyDiv.appendChild(lineDiv);
    sectionInfoDivRow.appendChild(episodeElement);
}
//# sourceMappingURL=setHTML.js.map