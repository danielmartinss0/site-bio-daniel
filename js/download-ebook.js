const ebookDownload = document.querySelector("[data-ga-event='clique_baixar_ebook']");

ebookDownload.addEventListener("click", async (event) => {
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
