import { setEpisodeList } from "./promiseFunction.js";
export function clearInfo() {
    const sectionInfo = document.querySelector("#section-info");
    if (sectionInfo === null)
        return;
    sectionInfo.replaceChildren();
}
export function scrollInfinity() {
    console.log("functionscroll dentro");
    const sideBarUl = document.querySelector("#ul-list");
    if (sideBarUl === null)
        return;
    const scrollTop = sideBarUl.scrollTop;
    const scrollHeight = sideBarUl.scrollHeight;
    const clientHeight = sideBarUl.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 200 && sideBarUl.childElementCount !== 51) {
        setEpisodeList();
    }
    ;
}
//# sourceMappingURL=utils.js.map