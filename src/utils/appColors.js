// Brand-ish colours so tech skills read like apps on a phone's home screen.
// [gradient start, gradient end, icon colour]
const APP_COLORS = {
  html5: ["#ff7a45", "#e34f26", "#fff"],
  css3: ["#3b82f6", "#1d4ed8", "#fff"],
  javascript: ["#fde047", "#eab308", "#1a1a1a"],
  "react.js": ["#1f2937", "#0b1220", "#61dafb"],
  "node.js": ["#4ade80", "#15803d", "#fff"],
  firebase: ["#fbbf24", "#f97316", "#fff"],
  mongodb: ["#22c55e", "#166534", "#fff"],
};

const FALLBACK = ["var(--accent)", "var(--accent)", "var(--accent-ink)"];

/** CSS custom properties for an app-icon tile (see .app-icon-tile). */
export function appIconStyle(skillName) {
  const [from, to, ink] = APP_COLORS[String(skillName).toLowerCase()] || FALLBACK;
  return {"--app-from": from, "--app-to": to, "--app-ink": ink};
}
