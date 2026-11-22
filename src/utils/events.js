// Lets distant components (e.g. the hero phone) open a project's detail sheet.
export const OPEN_PROJECT_EVENT = "portfolio:open-project";

export function requestOpenProject(index, originEl) {
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, {detail: {index, originEl}}));
}
