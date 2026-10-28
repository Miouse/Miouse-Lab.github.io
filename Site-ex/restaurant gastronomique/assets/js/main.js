/**
 * MAISON LUMIÈRE — LYON
 * Direction Contemporaine & Éditoriale
 * Contrôleur JavaScript :
 * - Balayage horizontal entre les pages
 * - Onglets éditoriaux à défilement nul (100vh strict)
 * - Menu mobile plein écran
 * - Carrousel & séries photographiques asymétriques
 * - Réservation interactive 28 couverts
 */

document.addEventListener('DOMContentLoaded', () => {
  initHorizontalSweep();
  initEditorialTabs();
  initMobileMenu();
  initGallerySeries();
  initBookingForm();
});

/* -------------------------------------------------------------------
   1. TRANSITIONS EN BALAYAGE HORIZONTAL
   ------------------------------------------------------------------- */
function initHorizontalSweep() {
  let overlay = document.querySelector('.page-sweep-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-sweep-overlay';
    document.body.appendChild(overlay);
  }

  // Intercepter les clics sur les liens internes
  const internalLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const destination = link.getAttribute('href');
      if (!destination || destination === '#' || destination.startsWith('javascript:')) return;

      e.preventDefault();
      overlay.classList.add('sweeping');

      setTimeout(() => {
        window.location.href = destination;
      }, 320);
    });
  });
}

/* -------------------------------------------------------------------
   2. ONGLETS ÉDITORIAUX SANS DÉFILEMENT (ZERO-SCROLL)
   ------------------------------------------------------------------- */
function initEditorialTabs() {
  const tabStrips = document.querySelectorAll('[data-tabs]');

  tabStrips.forEach(strip => {
    const groupName = strip.getAttribute('data-tabs');
    const triggers = strip.querySelectorAll('.tab-trigger');
    const paneContainer = document.querySelector(`[data-tab-group="${groupName}"]`);
    
    if (!paneContainer) return;
    const panes = paneContainer.querySelectorAll('.tab-pane');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-target');

        triggers.forEach(t => t.classList.remove('active'));
        trigger.classList.add('active');

        panes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  });
}

/* -------------------------------------------------------------------
   3. MENU MOBILE PLEIN ÉCRAN
   ------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');

  if (!toggleBtn || !menuOverlay) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = menuOverlay.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    
    // Animation barres du burger
    const spans = toggleBtn.querySelectorAll('span');
    if (spans.length === 3) {
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });
}

/* -------------------------------------------------------------------
   4. GALERIE : COMPOSITION ASYMÉTRIQUE & SÉRIES SANS DÉFILEMENT
   ------------------------------------------------------------------- */
function initGallerySeries() {
  const prevBtn = document.getElementById('galPrev');
  const nextBtn = document.getElementById('galNext');
  const seriesIndicator = document.getElementById('galSeriesIndicator');
  const seriesViews = document.querySelectorAll('.gallery-series-view');

  if (!seriesViews.length) return;

  let currentIdx = 0;

  function updateGallery(idx) {
    seriesViews.forEach((view, i) => {
      view.style.display = (i === idx) ? 'grid' : 'none';
    });
    if (seriesIndicator) {
      seriesIndicator.textContent = `0${idx + 1} / 0${seriesViews.length}`;
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + seriesViews.length) % seriesViews.length;
      updateGallery(currentIdx);
    });

    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % seriesViews.length;
      updateGallery(currentIdx);
    });
  }
}

/* -------------------------------------------------------------------
   5. FORMULAIRE DE RÉSERVATION INTERACTIF (TABLE 28 COUVERTS)
   ------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const modal = document.getElementById('bookingConfirmationModal');
  const closeModalBtn = document.getElementById('closeBookingModal');

  if (!form || !modal) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = form.querySelector('[name="name"]')?.value || 'Client';
    const dateVal = form.querySelector('[name="date"]')?.value || '';
    const timeVal = form.querySelector('[name="time"]')?.value || '';
    const coversVal = form.querySelector('[name="covers"]')?.value || '2';

    const targetName = modal.querySelector('.modal-guest-name');
    const targetDetails = modal.querySelector('.modal-reservation-details');

    if (targetName) targetName.textContent = nameVal;
    if (targetDetails) {
      targetDetails.textContent = `${coversVal} · ${dateVal} à ${timeVal} · 14 Rue Saint-Jean, Lyon`;
    }

    modal.classList.add('active');
    form.reset();
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}
