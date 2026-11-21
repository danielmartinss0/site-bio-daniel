(() => {
  const measurementId = "G-0M7Z7P6DS2";
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  const preferenceKey = "powered-digital-analytics";
  const adConsent = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
  const disableFlag = `ga-disable-${measurementId}`;
  let preference;
  try {
    preference = localStorage.getItem(preferenceKey);
  } catch {
    return;
  }
  let accepted = preference === "accepted";
  let started = false;
  window[disableFlag] = !accepted;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("consent", "default", { ...adConsent, analytics_storage: "denied" });

  function startAnalytics() {
    if (started) return;
    started = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }

  document.body.insertAdjacentHTML("beforeend", `
    <button class="analytics-settings" type="button" aria-controls="analytics-preferences"
      aria-expanded="false">Privacidade</button>
    <section class="analytics-panel" id="analytics-preferences"
      aria-label="Preferências de medição" hidden>
      <p>Podemos usar o Google Analytics e cookies para medir visitas e cliques no site.
      Você pode mudar sua escolha a qualquer momento em Privacidade.</p>
      <div>
        <button type="button" data-analytics-choice="declined">Recusar</button>
        <button type="button" data-analytics-choice="accepted">Aceitar medição</button>
      </div>
    </section>`);

  const settings = document.querySelector(".analytics-settings");
  const panel = document.querySelector(".analytics-panel");
  function showPanel(show) {
    panel.hidden = !show;
    settings.setAttribute("aria-expanded", String(show));
  }
  showPanel(preference === null);
  settings.addEventListener("click", () => showPanel(panel.hidden));
  panel.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-analytics-choice]");
    if (!choice) return;
    const wasAccepted = accepted;
    accepted = choice.dataset.analyticsChoice === "accepted";
    try {
      localStorage.setItem(preferenceKey, choice.dataset.analyticsChoice);
    } catch {
      // The choice still applies to this page when storage is unavailable.
    }
    window[disableFlag] = !accepted;
    showPanel(false);
    settings.focus();

    if (accepted) {
      startAnalytics();
    } else if (wasAccepted) {
      gtag("consent", "update", { analytics_storage: "denied" });
      location.reload();
    }
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-ga-event]");
    if (accepted && link) gtag("event", link.dataset.gaEvent, { send_to: measurementId });
  });

  if (accepted) startAnalytics();
})();
