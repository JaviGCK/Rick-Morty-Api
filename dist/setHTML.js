import { loadEpisodesList, loadEpisode, loadCharacter, loadOrigin } from "./fetchApi.js";
import { scrollInfinity } from "./utils.js";
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
    const main = document.querySelector("main");
    const sideBarAside = document.createElement("aside");
    const sideBarDiv = document.createElement("div");
    const sideBarHeaderDiv = document.createElement("div");
    const sideBarDivTitle = document.createElement("h2");
    const sideBarDivUl = document.createElement("div");
    const sideBarUlList = document.createElement("ul");
    if (main === null)
        return;
    if (sideBarAside === null)
        return;
    if (sideBarDiv === null)
        return;
    if (sideBarHeaderDiv === null)
        return;
    if (sideBarDivTitle === null)
        return;
    if (sideBarDivUl === null)
        return;
    if (sideBarUlList === null)
        return;
    sideBarAside.setAttribute("id", "side-bar");
    sideBarAside.classList.add("w-25", "h-50");
    sideBarDiv.setAttribute("id", "collapse-side-bar");
    sideBarDiv.classList.add("container-border", "size-respons");
    sideBarHeaderDiv.classList.add("container-fluid");
    sideBarDivTitle.classList.add("text-center", "mt-4", "text-yellow", "no-cursor");
    sideBarDivUl.classList.add("scroll-size", "size-respons-scroll");
    sideBarDivUl.setAttribute("id", "ulContainer");
    sideBarUlList.classList.add("nav", "flex-column", "sidebar-menu");
    sideBarUlList.setAttribute("id", "ul-list");
    sideBarDivTitle.innerText = "Episode";
    main.appendChild(sideBarAside);
    sideBarAside.appendChild(sideBarDiv);
    sideBarDiv.appendChild(sideBarHeaderDiv);
    sideBarHeaderDiv.appendChild(sideBarDivTitle);
    sideBarDiv.appendChild(sideBarDivUl);
    sideBarDivUl.appendChild(sideBarUlList);
    loadEpisodesList();
    sideBarDivUl.addEventListener("scroll", scrollInfinity);
}
export function setList(data) {
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
    sectionInfo.classList.add("h-75");
    main.appendChild(sectionInfo);
}
export function setContainerInfo(data) {
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
export function setCardsInfo(characterData) {
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
}
export function setCharcacterInfo(data) {
    const sectionInfo = document.querySelector("#section-info");
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
    if (sectionInfo === null)
        return;
    if (sectionInfoContainerDiv === null)
        return;
    if (sectionInfoDivRow === null)
        return;
    if (sectionInfoDivCol === null)
        return;
    if (sectionInfoImg === null)
        return;
    if (sectionInfoColDiv === null)
        return;
    if (sectionInfoBodyDiv === null)
        return;
    if (sectionInfoTitle === null)
        return;
    if (sectionInfoStatus === null)
        return;
    if (sectionInfoSpecies === null)
        return;
    if (sectionInfoGender === null)
        return;
    if (sectionInfoOrigin === null)
        return;
    if (sectionInfoLineDiv === null)
        return;
    if (sectionInfoEpisodes === null)
        return;
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
    if (data.origin.name !== "unknown") {
        sectionInfoOrigin.addEventListener("click", loadOrigin);
    }
}
export function setEpisodeCharacter(episodeData) {
    const sectionInfoEpisodes = document.querySelector("#section-info-episodes");
    const sectionInfoEpisodesDiv = document.createElement("div");
    const sectionInfoEpisodesTitle = document.createElement("h5");
    if (sectionInfoEpisodes === null)
        return;
    if (sectionInfoEpisodesDiv === null)
        return;
    if (sectionInfoEpisodesTitle === null)
        return;
    sectionInfoEpisodesDiv.setAttribute("episodeId", `${episodeData.id}`);
    sectionInfoEpisodesDiv.classList.add("mb-3", "mt-divs");
    sectionInfoEpisodesTitle.classList.add("text-center", "text-yellow");
    sectionInfoEpisodesTitle.innerText = `${episodeData.id} - ${episodeData.name}`;
    sectionInfoEpisodes.appendChild(sectionInfoEpisodesDiv);
    sectionInfoEpisodesDiv.appendChild(sectionInfoEpisodesTitle);
    sectionInfoEpisodesDiv.addEventListener("click", loadEpisode);
}
export function setOriginInfo(data) {
    const sectionInfo = document.querySelector("#section-info");
    const sectionInfoHeaderDiv = document.createElement("div");
    const sectionInfoHeaderTitle = document.createElement("h2");
    const sectionInfoHeaderType = document.createElement("h2");
    const sectionResident = document.createElement("div");
    if (sectionInfo === null)
        return;
    if (sectionInfoHeaderDiv === null)
        return;
    if (sectionInfoHeaderTitle === null)
        return;
    if (sectionInfoHeaderType === null)
        return;
    if (sectionResident === null)
        return;
    sectionInfo.classList.add("container-border");
    sectionInfoHeaderDiv.classList.add("episode-header", "no-cursor");
    sectionInfoHeaderTitle.classList.add("text-yellow");
    sectionInfoHeaderType.classList.add("text-yellow");
    sectionResident.setAttribute("id", "section-resident");
    sectionResident.classList.add("grid-display", "display-respons", "w-100", "overflow-auto", "full-height", "cursor-select");
    sectionResident.style.maxHeight = "73vh";
    sectionInfoHeaderTitle.innerText = `${data.name}`;
    sectionInfoHeaderType.innerText = `${data.type}`;
    sectionInfoHeaderDiv.appendChild(sectionInfoHeaderTitle);
    sectionInfoHeaderDiv.appendChild(sectionInfoHeaderType);
    sectionInfo.appendChild(sectionInfoHeaderDiv);
    sectionInfo.appendChild(sectionResident);
}
export function setResidents(characterData) {
    const sectionResident = document.querySelector("#section-resident");
    const sectionResidentDiv = document.createElement("div");
    const sectionResidentImg = document.createElement("img");
    const sectionResidentBodyDiv = document.createElement("div");
    const sectionResidentTitle = document.createElement("h5");
    const sectionResidentStatus = document.createElement("p");
    const sectionResidentSpecies = document.createElement("p");
    const character = characterData;
    if (sectionResident === null)
        return;
    if (sectionResidentDiv === null)
        return;
    if (sectionResidentImg === null)
        return;
    if (sectionResidentBodyDiv === null)
        return;
    if (sectionResidentTitle === null)
        return;
    if (sectionResidentStatus === null)
        return;
    if (sectionResidentSpecies === null)
        return;
    sectionResidentDiv.setAttribute("characterId", `${character.id}`);
    sectionResidentDiv.classList.add("container-border", "text-yellow", "bg-pink", "border-card", "size-respons-card");
    sectionResidentImg.src = character.image;
    sectionResidentImg.alt = "Character Image";
    sectionResidentImg.classList.add("card-img-top");
    sectionResidentBodyDiv.classList.add("card-body");
    sectionResidentTitle.classList.add("card-title", "mt-2");
    sectionResidentStatus.classList.add("card-text", "mt-2");
    sectionResidentSpecies.classList.add("card-text", "mb-1");
    sectionResidentTitle.innerText = `${character.name}`;
    sectionResidentStatus.innerText = `Status: ${character.status}`;
    sectionResidentSpecies.innerText = `Species: ${character.species}`;
    sectionResident.appendChild(sectionResidentDiv);
    sectionResidentDiv.appendChild(sectionResidentBodyDiv);
    sectionResidentDiv.appendChild(sectionResidentImg);
    sectionResidentBodyDiv.appendChild(sectionResidentTitle);
    sectionResidentBodyDiv.appendChild(sectionResidentStatus);
    sectionResidentBodyDiv.appendChild(sectionResidentSpecies);
    sectionResidentDiv.addEventListener("click", loadCharacter);
}
//# sourceMappingURL=setHTML.js.map