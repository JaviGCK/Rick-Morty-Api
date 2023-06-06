import { loadEpisodesList } from "./fetchApi.js";
let isScrolling = false;
export function clearInfo() {
    const sectionInfo = document.querySelector("#section-info");
    if (sectionInfo === null)
        return;
    sectionInfo.replaceChildren();
}
export function scrollInfinity() {
    if (isScrolling) {
        return;
    }
    isScrolling = true;
    const sideBarUl = document.querySelector("#ul-list");
    if (sideBarUl === null)
        return;
    const scrollTop = sideBarUl.scrollTop;
    const scrollHeight = sideBarUl.scrollHeight;
    const clientHeight = sideBarUl.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 200 && sideBarUl.childElementCount !== 51) {
        loadEpisodesList();
        isScrolling = false;
    }
}
//# sourceMappingURL=utils.js.map