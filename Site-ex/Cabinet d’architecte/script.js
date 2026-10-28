/**
 * ATELIER MARCHETTI — INTERACTIONS & ACCESSIBILITÉ
 * JavaScript Vanilla sans dépendance externe
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initScrollReveal();
    initContactForm();
    initSmoothAnchors();
});

/**
 * Gestion de la transparence et bordure du header au défilement
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.style.backgroundColor = 'rgba(22, 22, 22, 0.96)';
            header.style.borderBottomColor = '#333333';
        } else {
            header.style.backgroundColor = 'rgba(22, 22, 22, 0.94)';
            header.style.borderBottomColor = '#262626';
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Révélation progressive et douce des sections et projets au scroll
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
        // Fallback pour anciens navigateurs
        revealElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Défilement fluide compensant la hauteur du header fixe
 */
function initSmoothAnchors() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.site-header');
    const headerOffset = header ? header.offsetHeight : 72;

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Déplacement du focus pour les technologies d'assistance
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({ preventScroll: true });
            }
        });
    });
}

/**
 * Traitement du formulaire de prise de contact
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-button');

    if (!form || !statusDiv || !submitBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validation basique des champs requis
        const nameInput = document.getElementById('client-name');
        const emailInput = document.getElementById('client-email');
        const typeSelect = document.getElementById('project-type');
        const notesTextarea = document.getElementById('project-notes');

        if (!nameInput.value.trim() || !emailInput.value.trim() || !typeSelect.value || !notesTextarea.value.trim()) {
            displayStatus('Veuillez compléter l\'ensemble des champs obligatoires afin d\'étudier votre dossier.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            displayStatus('L\'adresse électronique fournie ne semble pas valide.', 'error');
            return;
        }

        // Simulation de transmission avec retour visuel mesuré
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmission de l\'étude en cours...</span>';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            form.reset();
            displayStatus('Votre demande d\'étude a bien été enregistrée. Lucas Marchetti ou un architecte de l\'atelier prendra attache avec vous sous 48 heures.', 'success');
        }, 800);
    });

    function displayStatus(message, type) {
        statusDiv.className = `form-status ${type}`;
        statusDiv.textContent = message;
        statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
