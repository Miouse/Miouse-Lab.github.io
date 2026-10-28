/**
 * Inès Valcourt — Photographie Documentaire
 * Script interactif vanilla (script.js)
 * Fonctions : Navigation mobile, apparition douce au défilement,
 * pré-sélection des formules, validation épurée du formulaire.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ----------------------------------------------------------------------
       01. MISE À JOUR DE L'ANNÉE DE COPYRIGHT
       ---------------------------------------------------------------------- */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------------
       02. GESTION DU MENU MOBILE
       ---------------------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');

    if (navToggle && primaryNav) {
        const toggleNav = (forceState) => {
            const isOpen = forceState !== undefined 
                ? forceState 
                : primaryNav.classList.contains('is-open');

            if (isOpen) {
                primaryNav.classList.remove('is-open');
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                primaryNav.classList.add('is-open');
                navToggle.classList.add('is-active');
                navToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        };

        navToggle.addEventListener('click', () => toggleNav());

        // Fermeture automatique lors d'un clic sur un lien d'ancrage
        const navLinks = primaryNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.classList.contains('is-open')) {
                    toggleNav(true);
                }
            });
        });

        // Fermeture avec la touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
                toggleNav(true);
            }
        });
    }

    /* ----------------------------------------------------------------------
       03. APPARITION DOUCE DES SECTIONS AU SCROLL (IntersectionObserver)
       ---------------------------------------------------------------------- */
    const animatedSections = document.querySelectorAll('.section');

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedSections.forEach(sec => sectionObserver.observe(sec));
    } else {
        // Rétrocompatibilité si IntersectionObserver n'est pas supporté
        animatedSections.forEach(sec => sec.classList.add('is-visible'));
    }

    /* ----------------------------------------------------------------------
       04. PRÉ-SÉLECTION DE LA FORMULE AU CLIC SUR LES TARIFS
       ---------------------------------------------------------------------- */
    const pricingButtons = document.querySelectorAll('.pricing-row .btn-outline');
    const formulaSelect = document.getElementById('eventFormula');

    pricingButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenPack = btn.getAttribute('data-pack');
            if (formulaSelect && chosenPack) {
                for (let i = 0; i < formulaSelect.options.length; i++) {
                    if (formulaSelect.options[i].value === chosenPack) {
                        formulaSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });

    /* ----------------------------------------------------------------------
       05. VALIDATION ÉPURÉE DU FORMULAIRE DE CONTACT
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    // Validation du format courriel standard
    const isValidEmail = (val) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    };

    const clearErrors = () => {
        [nameError, emailError, messageError].forEach(el => {
            if (el) el.textContent = '';
        });
        document.querySelectorAll('.form-group').forEach(grp => {
            grp.classList.remove('has-error');
        });
        if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            let hasError = false;

            // Vérification du nom
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Veuillez renseigner votre nom complet.';
                nameInput.closest('.form-group').classList.add('has-error');
                hasError = true;
            }

            // Vérification du courriel
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Votre adresse électronique est requise.';
                emailInput.closest('.form-group').classList.add('has-error');
                hasError = true;
            } else if (!isValidEmail(emailInput.value)) {
                emailError.textContent = 'Veuillez saisir une adresse électronique valide.';
                emailInput.closest('.form-group').classList.add('has-error');
                hasError = true;
            }

            // Vérification du message
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Merci de décrire votre projet en quelques mots.';
                messageInput.closest('.form-group').classList.add('has-error');
                hasError = true;
            } else if (messageInput.value.trim().length < 15) {
                messageError.textContent = 'Votre message est un peu court (15 caractères minimum).';
                messageInput.closest('.form-group').classList.add('has-error');
                hasError = true;
            }

            if (hasError) {
                // Focus sur le premier champ invalide
                const firstInvalid = contactForm.querySelector('.has-error input, .has-error textarea');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Simulation d'envoi soigné
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Transmission en cours&hellip;</span>';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                formStatus.className = 'form-status success';
                formStatus.textContent = 'Merci pour votre message. Inès Valcourt a bien reçu votre demande et vous répondra personnellement sous 48 heures.';

                // Réinitialisation du formulaire
                contactForm.reset();
            }, 750);
        });

        // Effacer l'erreur en direct lorsque l'utilisateur corrige
        [nameInput, emailInput, messageInput].forEach(field => {
            if (field) {
                field.addEventListener('input', () => {
                    const group = field.closest('.form-group');
                    if (group && group.classList.contains('has-error')) {
                        group.classList.remove('has-error');
                        const errorEl = group.querySelector('.error-msg');
                        if (errorEl) errorEl.textContent = '';
                    }
                });
            }
        });
    }
});
