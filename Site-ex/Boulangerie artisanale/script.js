/**
 * MAISON AUBRAC — BOULANGERIE ARTISANALE
 * Script Vanilla JS : Navigation accessible, révélation au défilement
 * et calcul dynamique du statut d'ouverture en direct.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollReveal();
  initOpeningHours();
});

/**
 * 01. NAVIGATION MOBILE & SMOOTH SCROLL ACCESSIBLE
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navToggle || !primaryNav || !header) return;

  function toggleMenu(forceClose = false) {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    const nextState = forceClose ? false : !isExpanded;

    navToggle.setAttribute("aria-expanded", String(nextState));
    navToggle.setAttribute("aria-label", nextState ? "Fermer le menu" : "Ouvrir le menu");
    header.classList.toggle("nav-open", nextState);
  }

  navToggle.addEventListener("click", () => toggleMenu());

  // Fermer le menu lors du clic sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu(true);
    });
  });

  // Fermer avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("nav-open")) {
      toggleMenu(true);
      navToggle.focus();
    }
  });

  // Fermer si clic en dehors du header sur mobile
  document.addEventListener("click", (e) => {
    if (header.classList.contains("nav-open") && !header.contains(e.target)) {
      toggleMenu(true);
    }
  });
}

/**
 * 02. APPARITION DOUCE DES SECTIONS AU SCROLL
 */
function initScrollReveal() {
  const elementsToReveal = [
    ".hero-content",
    ".hero-visual",
    ".section-header",
    ".story-text",
    ".story-visuals",
    ".bread-card",
    ".testimonial-layout",
    ".contact-card",
  ];

  const targets = document.querySelectorAll(elementsToReveal.join(", "));

  targets.forEach((el) => {
    el.classList.add("reveal-on-scroll");
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  targets.forEach((target) => observer.observe(target));
}

/**
 * 03. CALCUL ET AFFICHAGE DU STATUT D'OUVERTURE DU FOURNIL
 */
function initOpeningHours() {
  const liveIndicator = document.getElementById("liveIndicator");
  const liveIndicatorText = document.getElementById("liveIndicatorText");
  const liveStatusHero = document.getElementById("liveStatusHero");
  const scheduleRows = document.querySelectorAll(".schedule-table tbody tr");

  if (!liveIndicator || !liveIndicatorText) return;

  const now = new Date();
  const currentDay = now.getDay(); // 0: Dimanche, 1: Lundi, ..., 6: Samedi
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Mise en évidence du jour actuel dans la table
  scheduleRows.forEach((row) => {
    const rowDay = parseInt(row.getAttribute("data-day"), 10);
    if (rowDay === currentDay) {
      row.classList.add("today-row");
    }
  });

  // Plages horaires définies en minutes depuis minuit
  // Format : [début, fin]
  const scheduleConfig = {
    0: [{ start: 8 * 60, end: 13 * 60 }], // Dimanche : 08h00 - 13h00
    1: [], // Lundi : Fermé
    2: [
      { start: 7 * 60, end: 13 * 60 + 30 },
      { start: 16 * 60, end: 19 * 60 + 30 },
    ], // Mardi
    3: [
      { start: 7 * 60, end: 13 * 60 + 30 },
      { start: 16 * 60, end: 19 * 60 + 30 },
    ], // Mercredi
    4: [
      { start: 7 * 60, end: 13 * 60 + 30 },
      { start: 16 * 60, end: 19 * 60 + 30 },
    ], // Jeudi
    5: [
      { start: 7 * 60, end: 13 * 60 + 30 },
      { start: 16 * 60, end: 19 * 60 + 30 },
    ], // Vendredi
    6: [{ start: 7 * 60 + 30, end: 18 * 60 + 30 }], // Samedi : 07h30 - 18h30
  };

  const todaySlots = scheduleConfig[currentDay] || [];
  let isOpenNow = false;
  let closingMinute = null;
  let nextOpeningInfo = "Mardi à 07:00";

  for (const slot of todaySlots) {
    if (currentMinutes >= slot.start && currentMinutes < slot.end) {
      isOpenNow = true;
      closingMinute = slot.end;
      break;
    }
  }

  function formatTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
  }

  if (isOpenNow && closingMinute !== null) {
    liveIndicator.classList.add("status-open");
    liveIndicator.classList.remove("status-closed");
    const statusMsg = `Actuellement ouvert · Jusqu'à ${formatTime(closingMinute)}`;
    liveIndicatorText.textContent = statusMsg;

    if (liveStatusHero) {
      liveStatusHero.textContent = `Fournil ouvert jusqu'à ${formatTime(closingMinute)}`;
      liveStatusHero.classList.add("hero-status-open");
    }
  } else {
    liveIndicator.classList.add("status-closed");
    liveIndicator.classList.remove("status-open");

    if (liveStatusHero) {
      liveStatusHero.classList.remove("hero-status-open");
    }

    // Trouver le prochain créneau d'ouverture
    let foundNext = false;
    for (let slot of todaySlots) {
      if (currentMinutes < slot.start) {
        nextOpeningInfo = `Aujourd'hui à ${formatTime(slot.start)}`;
        foundNext = true;
        break;
      }
    }

    if (!foundNext) {
      if (currentDay === 0) {
        nextOpeningInfo = "Mardi à 07h00";
      } else if (currentDay === 1) {
        nextOpeningInfo = "Demain (mardi) à 07h00";
      } else if (currentDay === 6) {
        nextOpeningInfo = "Dimanche à 08h00";
      } else {
        nextOpeningInfo = "Demain à 07h00";
      }
    }

    const statusMsg = `Actuellement fermé · Réouverture ${nextOpeningInfo}`;
    liveIndicatorText.textContent = statusMsg;

    if (liveStatusHero) {
      liveStatusHero.textContent = `Fournil fermé · Réouverture ${nextOpeningInfo}`;
    }
  }
}
