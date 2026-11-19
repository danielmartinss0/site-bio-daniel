(() => {
  const config = window.bioConfig ?? {};
  const links = config.links ?? {};
  const images = config.images ?? {};

  function webUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;

    try {
      const url = new URL(value.trim());
      return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  for (const link of document.querySelectorAll("[data-link]")) {
    const key = link.dataset.link;
    const url = webUrl(links[key]);

    if (url) {
      link.href = url;
      link.removeAttribute("aria-disabled");
      link.removeAttribute("role");
    } else {
      link.title = `URL a configurar em js/config.js (${key})`;
    }
  }

  function loadImage(id, source, description) {
    if (typeof source !== "string" || !source.trim()) return;

    const image = document.getElementById(id);
    const replacement = new Image();
    replacement.onload = () => {
      image.src = replacement.src;
      image.alt = description;
      image.hidden = false;
    };
    replacement.src = source.trim();
  }

  loadImage("profile-photo", images.profile, "Daniel Martins");

  const statusUrl = webUrl(config.kickStatusUrl);
  if (!statusUrl || !webUrl(links.kick)) return;

  const badge = document.getElementById("kick-live");
  let expiration;

  async function updateLiveStatus() {
    try {
      const response = await fetch(statusUrl, {
        cache: "no-store",
        credentials: "omit",
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error("Status da Kick indisponível");

      const status = await response.json();
      const age = Date.now() - Date.parse(status?.checkedAt);
      const confirmed = status?.isLive === true && age >= 0 && age < 30000;

      clearTimeout(expiration);
      badge.hidden = !confirmed;
      if (confirmed) {
        expiration = setTimeout(() => { badge.hidden = true; }, 30000 - age);
      }
    } catch {
      clearTimeout(expiration);
      badge.hidden = true;
    } finally {
      setTimeout(updateLiveStatus, 15000);
    }
  }

  updateLiveStatus();
})();
