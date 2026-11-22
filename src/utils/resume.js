import {greeting} from "../portfolio";

const RESUME_DOWNLOAD_URL =
  "https://drive.google.com/u/0/uc?id=1CTVIrO6Zrdu-FQJbVob93QevwWAP6l0U&export=download";

/** Opens the resume in a new tab and starts a PDF download, as the site always has. */
export function openResume() {
  window.open(greeting.resumeLink, "_blank", "noopener,noreferrer");
  const link = document.createElement("a");
  link.href = RESUME_DOWNLOAD_URL;
  link.download = "file.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
