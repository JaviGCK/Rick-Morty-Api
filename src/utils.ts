import { loadEpisodesList } from "./fetchApi.js";
//This is a global variable that we need to stop the scrollInfinity function
let isScrolling = false;
/**
 * 
 * clean the info inside the sectionInfo, each time to get some new information
 */
export function clearInfo(): void {

    const sectionInfo: (HTMLElement | null) = document.querySelector("#section-info");
    if (sectionInfo === null) return;
    sectionInfo.replaceChildren();
}
/**
 * 
 * make a scrollbarinfinity taken the sizes of sibarUl and make a comparation to stop generate when all the elements its loader, this function call to the another function to load the rest of episodes
 */
export function scrollInfinity(): void {
  if (isScrolling) {
    return;
  }

  isScrolling = true;

  const sideBarUl: (HTMLUListElement | null) = document.querySelector("#ul-list");
  if (sideBarUl === null) return;

  const scrollTop = sideBarUl.scrollTop;
  const scrollHeight = sideBarUl.scrollHeight;
  const clientHeight = sideBarUl.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 200 && sideBarUl.childElementCount !== 51) {
    loadEpisodesList()
      isScrolling = false;
  }
}



