// "Tech Stack : React , Redux ,HTML ." -> ["React", "Redux", "HTML"]
export function parseTech(tech = "") {
  return tech
    .replace(/^\s*tech stacks?\s*:\s*/i, "")
    .split(",")
    .map(item => item.trim().replace(/\s*\.$/, "").trim())
    .filter(Boolean);
}

export function isRepoLink(link) {
  return /github/i.test(link.name) || /github\.com/i.test(link.url);
}

export function linkIcon(link) {
  return isRepoLink(link) ? "fab fa-github" : "fas fa-external-link-alt";
}

// "https://quick-car.netlify.app/" -> "quick-car.netlify.app"
export function hostOf(url = "") {
  try {
    return new URL(url).host;
  } catch (e) {
    return url;
  }
}
