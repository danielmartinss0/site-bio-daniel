const ebookDownload = document.querySelector("[data-ga-event='clique_baixar_ebook']");

const downloadHelp = document.querySelector(".ajuda-download");
const isInstagram = /Instagram/i.test(navigator.userAgent);
const isAppleMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent)
  || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isSafari = /Safari/i.test(navigator.userAgent)
  && !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS|Android/i.test(navigator.userAgent);

if (isInstagram && isAppleMobile) downloadHelp.open = true;

ebookDownload.addEventListener("click", async (event) => {
  // Keep the real tap as the download trigger in Safari and in-app browsers.
  if (isAppleMobile || isSafari || isInstagram) {
    if (isAppleMobile || isInstagram) downloadHelp.open = true;
    return;
  }

  event.preventDefault();

  const link = document.createElement("a");
  let objectUrl;
  link.href = ebookDownload.href;
  link.download = ebookDownload.download;

  try {
    const response = await fetch(ebookDownload.href);
    if (!response.ok) throw new Error("Não foi possível obter o PDF.");
    const bytes = await response.arrayBuffer();
    objectUrl = URL.createObjectURL(new Blob([bytes], { type: "application/octet-stream" }));
    link.href = objectUrl;
  } catch {
    // Retry via the browser's native download link if the fetch fails.
  }

  // Only the visible button carries the analytics event.
  document.body.append(link);
  link.click();
  link.remove();
  if (objectUrl) setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
});
