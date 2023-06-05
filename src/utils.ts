import { loadEpisodesList } from "./fetchApi.js";
/**
 * 
 * clean the info
 */
export function clearInfo(): void {
    
    const sectionInfo: (HTMLElement | null) = document.querySelector("#section-info");
    if(sectionInfo === null) return;
    sectionInfo.replaceChildren();
}
/**
 * 
 * make a scrollbarinfinity taken the sizes of sibarUl and make a comparation to stop generate when all the elements its loader
 */  
export function scrollInfinity(): void {
    console.log("functionscroll dentro");
    const sideBarUl: (HTMLUListElement | null) = document.querySelector("#ul-list");
    if (sideBarUl === null) return;

    const scrollTop = sideBarUl.scrollTop;
    const scrollHeight = sideBarUl.scrollHeight;
    const clientHeight = sideBarUl.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 200 && sideBarUl.childElementCount !== 51) {
        loadEpisodesList();
    };
    console.log();
}
