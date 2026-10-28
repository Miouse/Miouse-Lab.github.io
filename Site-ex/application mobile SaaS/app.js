/**
 * FOKUS — APPLICATION DE CONCENTRATION SYSTÈME
 * Architecture multilingue (FR / EN / ES), Navigation 100vh stricte sans défilement,
 * Recalcul dynamique des prix et interactions Swiss Brutalism.
 */

(function () {
  'use strict';

  // =========================================================================
  // DICTIONNAIRES MULTILINGUES RÉÉCRITS SPÉCIFIQUEMENT POUR CHAQUE MARCHÉ
  // =========================================================================
  const TRANSLATIONS = {
    fr: {
      doc_title: "FOKUS — Débarrasse-toi du bruit. Travaille en profondeur.",
      nav_home: "ACCUEIL",
      nav_features: "FONCTIONS",
      nav_pricing: "TARIFS",
      nav_faq: "FAQ",
      nav_contact: "CONTACT",
      header_cta: "ACTIVER LE PROTOCOLE",

      // Accueil
      home_tag: "DISTRACTION ZÉRO // KERNEL-BLOCK",
      home_live: "24 819 SESSIONS ACTIVES",
      home_title: "DÉTRUIS LE BRUIT.<br>RETROUVE TON FLUX.",
      home_lead: "Les applications de concentration habituelles t'envoient des notifications pour méditer. Fokus verrouille tes apps distrayantes au niveau système et t'empêche de les contourner. Pas de seconde chance. Juste ton travail.",
      home_cta: "INSTALLER FOKUS →",
      home_secondary: "ANALYSER L'ARCHITECTURE",
      home_stat1_label: "TEMPS SAUVÉ / JOUR",
      home_stat2_label: "BYPASS TOLÉRÉS",
      home_stat3_label: "IMPACT NEURO",

      // Téléphone UI
      phone_mode: "BLOCAGE RADICAL // EN COURS",
      phone_session_label: "SESSION ULTRADIENNE : ÉCRITURE SYSTÈME",
      phone_blocked_count: "47 APPS QUARANTAINÉES",
      phone_emergency: "AUCUNE SORTIE POSSIBLE",
      phone_caption: "VERROUILLAGE SANS DÉTOURNEMENT POSSIBLE. REDÉMARRAGE INUTILE.",

      // Fonctionnalités
      features_title: "ARCHITECTURE SANS CONCESSION.",
      features_tag: "05 MODULES OPÉRATIONNELS",
      features_sub: "Chaque ligne représente un verrou technique conçu pour écraser la dépendance cognitive.",
      ft1_name: "SÉQUESTRATION NIVEAU SYSTÈME",
      ft1_type: "HARDWARE SHIELD",
      ft1_desc: "Fokus intercepte les sockets réseau et bloque les processus ciblés. Même modifier l'horloge système ou supprimer l'application en cours de session est rendu impossible par le profil superviseur.",
      ft1_m_label: "RÉSISTANCE AU BYPASS",
      ft1_m_label2: "LATENCE D'INTERCEPTION",

      ft2_name: "SPRINTS ULTRADIENS SYNCHRONISÉS",
      ft2_type: "BIORHYTHM SYNC",
      ft2_desc: "Oublie les minuteurs rigides de 25 minutes. Fokus calibre la durée de tes sessions selon tes cycles ultradiens naturels (de 50 à 90 minutes) et impose de vraies pauses sans écran pour restaurer l'adénosine.",
      ft2_m_label: "DURÉE STANDARD",
      ft2_m_label2: "PAUSE FORCÉE",

      ft3_name: "INTERCEPTEUR D'ERRANCE COMPULSIVE",
      ft3_type: "ANTI-DOOMSCROLL",
      ft3_desc: "Détection en direct de l'ouverture convulsive de nouveaux onglets, du rafraîchissement d'emails et des micro-fuites d'attention. L'écran passe en négatif pendant 3 secondes dès qu'un réflexe distrayant s'amorce.",
      ft3_m_label: "MICRO-DÉRIVES ÉVITÉES",
      ft3_m_label2: "SIGNAL DE RAPPEL",

      ft4_name: "TÉLÉMÉTRIE BRUTE SANS SCORE SOCIAL",
      ft4_type: "RAW LOGGING",
      ft4_desc: "Aucun badge enfantin ni médaille virtuelle. Tu obtiens un journal de bord brut en texte clair : heures exactes de travail pur, applications abattues et temps cumulé en état de flow. Exportable en CSV/JSON.",
      ft4_m_label: "FORMAT JOURNAL",
      ft4_m_label2: "CONFIDENTIALITÉ",

      ft5_name: "PACTE DE CONCENTRATION SYNCHRONE",
      ft5_type: "COLLECTIVE LOCK",
      ft5_desc: "Verrouille toute ton équipe en même temps dans un couloir d'immersion totale. Slack et boîtes mails coupés sur le parc entier pendant 2 heures de fabrication collective ininterrompue.",
      ft5_m_label: "CALCUL DU TEMPS D'ÉQUIPE",
      ft5_m_label2: "POUVOIR DE DÉVERROUILLAGE",

      // Tarifs
      pricing_title: "INVESTIS DANS TON TEMPS.",
      price_billing_monthly: "MENSUEL",
      price_billing_annual: "ANNUEL",
      price_billing_save: "-20% RÉDUCTION",
      plan_free_badge: "BASE LOCALE",
      plan_free_name: "GRATUIT",
      plan_free_desc: "Pour tester la résistance au blocage sur une seule machine.",
      price_period_free: "POUR TOUJOURS // SANS CB",
      plan_free_cta: "TÉLÉCHARGER LE CLIENT",
      p_f1: "1 machine active (Mac/Win/Linux)",
      p_f2: "Blocage jusqu'à 15 applications",
      p_f3: "Sessions Pomodoro classiques 25m",
      p_f4: "Bypass de sécurité désactivable",
      p_f5: "Synchronisation mobile iOS/Android",

      plan_pro_flag: "STANDARD DES DÉVELOPPEURS & CRÉATEURS",
      plan_pro_badge: "ISOLATION TOTALE",
      plan_pro_name: "PRO",
      plan_pro_desc: "Le bouclier impénétrable sur tous vos ordinateurs et téléphones.",
      price_period_monthly: "PAR MOIS // FACTURÉ MENSUEL",
      price_period_annual: "PAR MOIS // FACTURÉ ANNUELLEMENT",
      plan_pro_cta: "COMMENCER L'ISOLATION PRO",
      p_pro1: "Blocage matériel absolu (zéro bypass)",
      p_pro2: "Applis et sites illimités",
      p_pro3: "Sync instantanée 5 appareils (Desktop + Mobile)",
      p_pro4: "Cycles ultradiens 90 min adaptatifs",
      p_pro5: "Export de télémétrie CSV & API locale",

      plan_team_badge: "FLUX COLLECTIF",
      plan_team_name: "ÉQUIPE",
      plan_team_desc: "Pour les studios et équipes d'ingénierie qui construisent vite.",
      price_period_team_monthly: "PAR SIÈGE / MOIS // MENSUEL",
      price_period_team_annual: "PAR SIÈGE / MOIS // ANNUEL",
      plan_team_cta: "DÉPLOYER POUR L'ÉQUIPE",
      p_team1: "Tout le forfait Pro pour chaque membre",
      p_team2: "Sessions collectives synchronisées",
      p_team3: "Console centrale d'administration IT & SSO",
      p_team4: "Règles d'extinction d'outils d'entreprise",
      p_team5: "Facturation consolidée sur facture",

      // FAQ
      faq_title: "LA VÉRITÉ BRUTE.<br>RÉPONSES SANS DÉTOUR.",
      faq_intro: "Aucune langue de bois. Pas de marketing édulcoré. Voici exactement comment fonctionne le système et pourquoi il refuse de plier face à tes envies de défiler.",
      faq_warning_title: "AVERTISSEMENT PROTOCOLE",
      faq_warning_text: "Si tu lances une session de 90 minutes en mode Strict, nous ne pourrons pas déverrouiller ton ordinateur même si tu écris au support en suppliant. C'est l'essence même du contrat.",
      faq_q1: "Puis-je forcer la fermeture de Fokus pour vérifier mes messages ?",
      faq_a1: "En mode Strict : non. Fokus s’exécute avec les privilèges d’un démon système. Le gestionnaire des tâches ou le Terminal ne peuvent pas tuer le processus sans désactivation d'un timer chiffré. Même redémarrer l’ordinateur relance automatiquement la session avec le temps restant.",
      faq_q2: "Comment Fokus bloque-t-il sur iOS et Android ?",
      faq_a2: "Sur iOS, nous utilisons l'API Screen Time et un profil VPN local sans aucun serveur distant. Sur Android, nous utilisons le profil administrateur d'appareil. Aucune de tes données de navigation n'est interceptée ni analysée extérieurement : le routage est coupé en local (127.0.0.1 drop).",
      faq_q3: "Mes données et mon historique de travail restent-ils privés ?",
      faq_a3: "À 100%. Fokus ne possède pas de serveurs de suivi d'activité. Tes journaux de sessions, tes applications bloquées et tes statistiques de temps restent gravés dans une base SQLite chiffrée sur ton disque dur local. Pas de télémétrie cachée, pas de revente de données.",
      faq_q4: "Que se passe-t-il en cas d'urgence absolue ?",
      faq_a4: "Tu peux préconfigurer une \"Liste Blanche Vitale\" (appels téléphoniques, urgences médicales, messages d'un contact d'astreinte spécifique). Tout le reste reste hermétiquement verrouillé. Tu décides de ces règles avant de lancer ta session, jamais pendant la tentation.",
      faq_q5: "Puis-je annuler mon abonnement Pro à tout moment ?",
      faq_a5: "Oui, en un seul clic dans l'interface de gestion de compte. Aucun formulaire de rétention abusif, aucun appel téléphonique obligatoire. Tu gardes l'accès jusqu'au dernier jour de ta période payée, puis ton application rétrograde au forfait Gratuit.",

      // Contact & Newsletter
      contact_title: "REÇOIS LE RAPPORT DE FLOW.",
      contact_lead: "Un dispatch bi-mensuel sans publicité. Protocoles neuroscientifiques d'attention, audits de déconnexion et mises à jour système du noyau Fokus.",
      contact_email_label: "ADRESSE COURRIEL PROFESSIONNELLE",
      contact_role_label: "ACTIVITÉ PRINCIPALE",
      role_dev: "INGÉNIERIE LOGICIELLE",
      role_research: "RECHERCHE & THÈSE",
      role_design: "CONCEPTION / ARCHITECTURE",
      role_writing: "ÉCRITURE / CRÉATION",
      role_other: "AUTRE DISCIPLINE EXIGEANTE",
      contact_submit_btn: "S'ABONNER AU PROTOCOLE →",
      contact_direct_label: "LIAISON TECHNIQUE DIRECTE :",
      testi_badge: "RETEX OPÉRATIONNELS",
      quote_1_text: "« Fokus m’a fait gagner 3 heures par jour. Zéro fioriture, juste du travail brut. »",
      quote_1_author: "Marc V.",
      quote_1_role: "Développeur backend — Lyon",
      quote_1_metric: "184 SESSIONS COMPLÉTÉES // 0 ABANDONS",
      quote_2_text: "« J’ai enfin bouclé la rédaction de ma thèse. L’impossibilité absolue de bypasser les blocages est redoutable. »",
      quote_2_author: "Sophie R.",
      quote_2_role: "Chercheuse en neurosciences — Bordeaux",
      quote_2_metric: "620 HEURES EN ISOLATION TOTALE",
      quote_3_text: "« Les autres applications t'envoient des notifications stupides pour te dire de te calmer. Fokus se tait et abat les distractions. »",
      quote_3_author: "Karim B.",
      quote_3_role: "Architecte d'intérieur — Marseille",
      quote_3_metric: "4 LIVRABLES DE CHANTIER EN AVANCE",

      // Footer
      footer_status: "KERNEL SHIELD v4.0.8 [ACTIF]",
      footer_legal: "TOUS DROITS RÉSERVÉS.",

      // Feedback messages
      feedback_success: "[PROTOCOLE VALIDÉ] Vous êtes inscrit au dispatch bimensuel.",
      feedback_error: "[ERREUR SYSTÈME] Veuillez saisir une adresse courriel valide."
    },

    en: {
      doc_title: "FOKUS — Kill The Noise. Reclaim Deep Flow.",
      nav_home: "HOME",
      nav_features: "FEATURES",
      nav_pricing: "PRICING",
      nav_faq: "FAQ",
      nav_contact: "CONTACT",
      header_cta: "ENGAGE PROTOCOL",

      // Home
      home_tag: "ZERO DISTRACTION // KERNEL-BLOCK",
      home_live: "24,819 ACTIVE SESSIONS",
      home_title: "KILL THE NOISE.<br>ENTER PURE FLOW.",
      home_lead: "Traditional focus apps nudge you with mindfulness quotes. Fokus locks down your offending apps at the operating system level and prevents bypass. No second chances. Just raw uninterrupted output.",
      home_cta: "INSTALL FOKUS →",
      home_secondary: "INSPECT ARCHITECTURE",
      home_stat1_label: "TIME CLAWED BACK / DAY",
      home_stat2_label: "BYPASS TOLERANCE",
      home_stat3_label: "COGNITIVE IMPACT",

      // Phone UI
      phone_mode: "RADICAL LOCKDOWN // ACTIVE",
      phone_session_label: "ULTRADIAN SPRINT: SYSTEM KERNEL CODE",
      phone_blocked_count: "47 APPS QUARANTINED",
      phone_emergency: "NO EXIT GRANTED",
      phone_caption: "IMPOSSIBLE TO BYPASS. REBOOTING WON'T SAVE YOU.",

      // Features
      features_title: "UNCOMPROMISING ARCHITECTURE.",
      features_tag: "05 HARDWARE MODULES",
      features_sub: "Each layer represents an unbendable technical lock built to crush digital compulsive dependency.",
      ft1_name: "KERNEL-LEVEL APP QUARANTINE",
      ft1_type: "HARDWARE SHIELD",
      ft1_desc: "Fokus intercepts networking sockets and terminates unauthorized process spawns. Changing system clock or removing the app during a sprint is rendered impossible by the supervisor profile.",
      ft1_m_label: "BYPASS RESISTANCE",
      ft1_m_label2: "INTERCEPTION LATENCY",

      ft2_name: "SYNCHRONIZED ULTRADIAN SPRINTS",
      ft2_type: "BIORHYTHM SYNC",
      ft2_desc: "Trash the rigid 25-minute Pomodoro timers. Fokus calibrates work intervals to your biological ultradian rhythm (50 to 90 minutes) and enforces blackout screen-free rests to clear adenosine debt.",
      ft2_m_label: "SPRINT DURATION",
      ft2_m_label2: "ENFORCED BREAK",

      ft3_name: "COMPULSIVE DOOMSCROLL INTERCEPTOR",
      ft3_type: "ANTI-DOOMSCROLL",
      ft3_desc: "Live detection of restless browser tab cycling, twitch inbox refreshing, and attention leakage. Screen flashes negative for 3 seconds the microsecond a distractive habit pattern triggers.",
      ft3_m_label: "LEAKS PREVENTED",
      ft3_m_label2: "ALERT VECTOR",

      ft4_name: "RAW TELEMETRY WITHOUT SOCIAL CARROTS",
      ft4_type: "RAW LOGGING",
      ft4_desc: "No juvenile gamification, no streak stickers, no confetti. Just crisp plain-text logs: unadulterated deep work hours, intercepted app casualties, and sustained flow metrics. Exportable to CSV/JSON.",
      ft4_m_label: "LOG FORMAT",
      ft4_m_label2: "PRIVACY",

      ft5_name: "SYNCHRONOUS COLLECTIVE PACT",
      ft5_type: "COLLECTIVE LOCK",
      ft5_desc: "Drop your entire development squadron into an impenetrable immersion tunnel. Slack and corporate communications severed across your entire fleet for 2 hours of synchronized shipping.",
      ft5_m_label: "TIME SYNC ENGINE",
      ft5_m_label2: "UNLOCK THRESHOLD",

      // Pricing
      pricing_title: "INVEST IN UNDIVIDED TIME.",
      price_billing_monthly: "MONTHLY",
      price_billing_annual: "ANNUAL",
      price_billing_save: "SAVE 20%",
      plan_free_badge: "LOCAL BASELINE",
      plan_free_name: "FREE",
      plan_free_desc: "To verify lockout hardness on a single workstation.",
      price_period_free: "FOREVER // NO CARD NEEDED",
      plan_free_cta: "DOWNLOAD CLIENT",
      p_f1: "1 active workstation (Mac/Win/Linux)",
      p_f2: "Block up to 15 apps & domain roots",
      p_f3: "Standard 25m interval timer",
      p_f4: "Emergency kill-switch enabled",
      p_f5: "Mobile device companion pairing",

      plan_pro_flag: "THE DEVELOPER & FOUNDER STANDARD",
      plan_pro_badge: "TOTAL ISOLATION",
      plan_pro_name: "PRO",
      plan_pro_desc: "The unbreachable shield across all your workstations and phones.",
      price_period_monthly: "PER MONTH // BILLED MONTHLY",
      price_period_annual: "PER MONTH // BILLED ANNUALLY",
      plan_pro_cta: "COMMENCE PRO LOCKDOWN",
      p_pro1: "Hardware-level absolute block (zero bypass)",
      p_pro2: "Unlimited applications and URL targets",
      p_pro3: "Instant sync across 5 devices (Desktop + Mobile)",
      p_pro4: "Adaptive 90-minute ultradian cycles",
      p_pro5: "Raw CSV telemetry export & localhost API",

      plan_team_badge: "COLLECTIVE FLOW",
      plan_team_name: "TEAM",
      plan_team_desc: "For software studios and engineering squads shipping against deadlines.",
      price_period_team_monthly: "PER SEAT / MO // MONTHLY",
      price_period_team_annual: "PER SEAT / MO // ANNUALLY",
      plan_team_cta: "DEPLOY FLEET PROTOCOL",
      p_team1: "Full Pro capabilities for every operator",
      p_team2: "Fleet-wide synchronized focus sessions",
      p_team3: "Central IT management & SSO integration",
      p_team4: "Automated workplace tool blackout rules",
      p_team5: "Consolidated enterprise invoicing",

      // FAQ
      faq_title: "THE RAW TRUTH.<br>ZERO FLUFF ANSWERS.",
      faq_intro: "No diplomatic dodging. No corporate spin. Here is precisely how the engine operates and why it refuses to capitulate when your thumb twitches to scroll.",
      faq_warning_title: "PROTOCOL ADVISORY",
      faq_warning_text: "If you initiate a 90-minute session under Strict Mode, our engineering team cannot unlock your workstation even if you email support begging. That constraint is the product.",
      faq_q1: "Can I kill Fokus via Task Manager to check an incoming ping?",
      faq_a1: "Under Strict Mode: negative. Fokus executes as an OS-level supervisor daemon. Neither Task Manager, Activity Monitor, nor 'kill -9' can terminate the process without deciphering a secure physical key. Even rebooting reboots straight into the remaining session timer.",
      faq_q2: "How does Fokus enforce quarantine on iOS and Android?",
      faq_a2: "On iOS, we utilize Apple's Screen Time entitlement API combined with an on-device local loopback tunnel. On Android, Device Admin API enforces process halts. Your traffic is never beamed anywhere: blacklisted packets drop locally at 127.0.0.1.",
      faq_q3: "Does my session telemetry remain completely private?",
      faq_a3: "100%. Fokus runs zero remote activity profiling servers. Your deep work stamps, blocked apps list, and focus intervals reside exclusively in an encrypted SQLite database on your local drive. No hidden tracking, no data monetisation.",
      faq_q4: "What occurs in a genuine medical or family emergency?",
      faq_a4: "You can pre-authorize an emergency Whitelist (telephony, family contact numbers, medical services). Everything else stays locked tight. You formulate these parameters before session activation, never in a moment of weakness.",
      faq_q5: "Can I cancel my Pro subscription at any time?",
      faq_a5: "Yes, in exactly one click within the account settings panel. No deceptive retention labyrinths, no mandatory phone calls. Your license remains active until the last second of the current billing cycle, then reverts seamlessly to Free.",

      // Contact & Newsletter
      contact_title: "RECEIVE THE FLOW DISPATCH.",
      contact_lead: "A bi-weekly dispatch without sponsored fluff. Applied neurobiology protocols, digital detox teardowns, and Fokus kernel changelogs.",
      contact_email_label: "PROFESSIONAL EMAIL ADDRESS",
      contact_role_label: "PRIMARY DISCIPLINE",
      role_dev: "SOFTWARE ENGINEERING",
      role_research: "SCIENTIFIC RESEARCH / PHD",
      role_design: "INDUSTRIAL / PRODUCT DESIGN",
      role_writing: "AUTHOR / DEEP WRITING",
      role_other: "OTHER HIGH-COGNITION CRAFT",
      contact_submit_btn: "COMMENCE SUBSCRIPTION →",
      contact_direct_label: "DIRECT ENGINEERING LINK:",
      testi_badge: "OPERATIONAL RETEX",
      quote_1_text: "\"Fokus clawed back 3 hours of my day. No fluff, just brutal flow.\"",
      quote_1_author: "Liam S.",
      quote_1_role: "Systems Engineer — London",
      quote_1_metric: "184 SESSIONS COMPLETED // 0 ABANDONS",
      quote_2_text: "\"Shipped our compiler rewrite 2 weeks early. The impossible-to-kill blocklist is a game changer.\"",
      quote_2_author: "Sarah K.",
      quote_2_role: "Compiler Architect — Dublin",
      quote_2_metric: "620 HOURS UNDER STRICT QUARANTINE",
      quote_3_text: "\"Every focus app pings you to 'stay mindful'. Fokus just pulls the plug on the noise.\"",
      quote_3_author: "Alex T.",
      quote_3_role: "Quantitative Analyst — Edinburgh",
      quote_3_metric: "4 MAJOR RELEASES AHEAD OF CADENCE",

      // Footer
      footer_status: "KERNEL SHIELD v4.0.8 [RUNNING]",
      footer_legal: "ALL RIGHTS RESERVED.",

      // Feedback messages
      feedback_success: "[PROTOCOL ACKNOWLEDGED] Dispatch subscription active.",
      feedback_error: "[SYSTEM ERROR] Please provide a valid email format."
    },

    es: {
      doc_title: "FOKUS — Silencia el Ruido. Recupera tu Flujo.",
      nav_home: "INICIO",
      nav_features: "FUNCIONES",
      nav_pricing: "PRECIOS",
      nav_faq: "FAQ",
      nav_contact: "CONTACTO",
      header_cta: "ACTIVAR PROTOCOLO",

      // Inicio
      home_tag: "DISTRACCIÓN CERO // KERNEL-BLOCK",
      home_live: "24.819 SESIONES ACTIVAS",
      home_title: "SILENCIA EL RUIDO.<br>ENTRA EN EL FLUJO.",
      home_lead: "Las apps de concentración habituales te mandan notificaciones para meditar. Fokus bloquea tus aplicaciones distractivas a nivel de sistema operativo e impide eludirlo. Sin segundas oportunidades. Solo tu trabajo.",
      home_cta: "INSTALAR FOKUS →",
      home_secondary: "ANALIZAR ARQUITECTURA",
      home_stat1_label: "TIEMPO GANADO / DÍA",
      home_stat2_label: "BYPASS TOLERADOS",
      home_stat3_label: "IMPACTO NEURONAL",

      // Teléfono UI
      phone_mode: "BLOQUEO RADICAL // EN CURSO",
      phone_session_label: "SESIÓN ULTRADIANA : ESCRITURA DE SISTEMA",
      phone_blocked_count: "47 APPS EN CUARENTENA",
      phone_emergency: "SALIDA BLOQUEADA",
      phone_caption: "BLOQUEO INFRANQUEABLE. REINICIAR NO SIRVE DE NADA.",

      // Funciones
      features_title: "ARQUITECTURA SIN CONCESIONES.",
      features_tag: "05 MÓDULOS OPERATIVOS",
      features_sub: "Cada línea representa un cerrojo técnico diseñado para erradicar la dispersión digital compulsiva.",
      ft1_name: "BLOQUEO A NIVEL DE SISTEMA",
      ft1_type: "HARDWARE SHIELD",
      ft1_desc: "Fokus intercepta los sockets de red y detiene procesos no autorizados. Incluso modificar el reloj o intentar desinstalar la app durante una sesión queda vetado por el supervisor del sistema.",
      ft1_m_label: "RESISTENCIA AL BYPASS",
      ft1_m_label2: "LATENCIA DE INTERCEPCIÓN",

      ft2_name: "SPRINTS ULTRADIANOS SINCRONIZADOS",
      ft2_type: "BIORHYTHM SYNC",
      ft2_desc: "Olvida los temporizadores rígidos de 25 minutos. Fokus adapta la duración a tus ciclos biológicos ultradianos (de 50 a 90 minutos) y exige descansos sin pantalla para restaurar la lucidez.",
      ft2_m_label: "DURACIÓN ESTÁNDAR",
      ft2_m_label2: "PAUSA FORZADA",

      ft3_name: "INTERCEPTOR DE DISPERSIÓN DIGITAL",
      ft3_type: "ANTI-DOOMSCROLL",
      ft3_desc: "Detección instantánea de la apertura compulsiva de pestañas, refresco de correo y fugas de atención. La pantalla pasa a negativo durante 3 segundos al detectar un tic distractivo.",
      ft3_m_label: "MICROFUGAS FRENADAS",
      ft3_m_label2: "SEÑAL DE ALERTA",

      ft4_name: "MÉTRICAS CRUDAS SIN DISTRACTORES",
      ft4_type: "RAW LOGGING",
      ft4_desc: "Nada de medallas infantiles ni confeti virtual. Obtienes registros limpios en texto plano: horas exactas de trabajo puro, apps bloqueadas y tiempo en flujo. Exportación en CSV/JSON.",
      ft4_m_label: "FORMATO REGISTRO",
      ft4_m_label2: "PRIVACIDAD",

      ft5_name: "PACTO DE CONCENTRACIÓN DE EQUIPO",
      ft5_type: "COLLECTIVE LOCK",
      ft5_desc: "Sincroniza a todo tu equipo en un túnel de inmersión total. Slack y correos desconectados en toda la oficina durante 2 horas de producción continua y coordinada.",
      ft5_m_label: "SINCRONIZACIÓN",
      ft5_m_label2: "CONDICIÓN DE DESBLOQUEO",

      // Precios
      pricing_title: "INVIERTE EN TIEMPO REAL.",
      price_billing_monthly: "MENSUAL",
      price_billing_annual: "ANUAL",
      price_billing_save: "-20% DESCUENTO",
      plan_free_badge: "BASE LOCAL",
      plan_free_name: "GRATUITO",
      plan_free_desc: "Para comprobar la solidez del bloqueo en un único equipo.",
      price_period_free: "PARA SIEMPRE // SIN TARJETA",
      plan_free_cta: "DESCARGAR CLIENTE",
      p_f1: "1 equipo activo (Mac/Win/Linux)",
      p_f2: "Bloqueo de hasta 15 aplicaciones",
      p_f3: "Sesiones clásicas Pomodoro de 25m",
      p_f4: "Bypass de seguridad desactivable",
      p_f5: "Sincronización móvil iOS/Android",

      plan_pro_flag: "EL ESTÁNDAR DE DESARROLLADORES Y CREADORES",
      plan_pro_badge: "AISLAMIENTO TOTAL",
      plan_pro_name: "PRO",
      plan_pro_desc: "El blindaje infranqueable en todos tus ordenadores y teléfonos.",
      price_period_monthly: "AL MES // FACTURADO MENSUAL",
      price_period_annual: "AL MES // FACTURADO ANUALMENTE",
      plan_pro_cta: "ACTIVAR AISLAMIENTO PRO",
      p_pro1: "Bloqueo estricto por hardware (cero bypass)",
      p_pro2: "Aplicaciones y dominios ilimitados",
      p_pro3: "Sync instantánea en 5 dispositivos (Desktop + Móvil)",
      p_pro4: "Ciclos ultradianos adaptativos de 90 min",
      p_pro5: "Exportación de telemetría CSV y API local",

      plan_team_badge: "FLUJO COLECTIVO",
      plan_team_name: "EQUIPO",
      plan_team_desc: "Para estudios y equipos de ingeniería con entregas exigentes.",
      price_period_team_monthly: "POR PUESTO / MES // MENSUAL",
      price_period_team_annual: "POR PUESTO / MES // ANUAL",
      plan_team_cta: "DESPLEGAR EN EL EQUIPO",
      p_team1: "Todas las capacidades Pro para cada miembro",
      p_team2: "Sesiones de equipo sincronizadas",
      p_team3: "Panel central de administración IT y SSO",
      p_team4: "Reglas de apagado de herramientas corporativas",
      p_team5: "Facturación unificada por empresa",

      // FAQ
      faq_title: "LA VERDAD CRUDA.<br>RESPUESTAS DIRECTAS.",
      faq_intro: "Sin rodeos ni lenguaje corporativo edulcorado. Así opera exactamente el sistema y por qué no cede ante tus impulsos de navegar sin rumbo.",
      faq_warning_title: "ADVERTENCIA DE PROTOCOLO",
      faq_warning_text: "Si inicias una sesión de 90 minutos en modo Estricto, ni siquiera nuestro soporte técnico podrá desbloquear tu máquina si nos escribes suplicando. Ese es el trato.",
      faq_q1: "¿Puedo forzar el cierre de Fokus para revisar mis mensajes?",
      faq_a1: "En modo Estricto: no. Fokus funciona como un demonio a nivel de sistema. Ni el Administrador de tareas ni el Terminal pueden detener el proceso sin una clave segura. Reiniciar el ordenador vuelve a arrancar con el tiempo pendiente.",
      faq_q2: "¿Cómo bloquea Fokus en iOS y Android?",
      faq_a2: "En iOS empleamos la API oficial de Screen Time y un perfil VPN local sin servidores externos. En Android usamos privilegios de administrador de dispositivo. Tus datos no salen de tu terminal: el tráfico distractor cae en 127.0.0.1.",
      faq_q3: "¿Mis datos e historial de trabajo son privados?",
      faq_a3: "Al 100%. Fokus no cuenta con servidores de rastreo de actividad. Tus registros, apps restringidas y métricas de tiempo se almacenan en una base SQLite cifrada en tu disco local. Cero telemetría invasiva, cero venta de datos.",
      faq_q4: "¿Qué ocurre si se presenta una emergencia familiar o médica?",
      faq_a4: "Puedes preconfigurar una \"Lista Blanca Vital\" (llamadas, urgencias sanitarias o contactos críticos concretos). Todo lo demás permanece cerrado a cal y canto. Defines estas reglas antes de iniciar la sesión, nunca en pleno impulso.",
      faq_q5: "¿Puedo cancelar mi suscripción Pro en cualquier momento?",
      faq_a5: "Sí, con un solo clic desde tu panel de usuario. Sin cuestionarios trampa ni llamadas telefónicas. Conservas el acceso hasta el último día facturado y luego tu cuenta pasa al plan Gratuito.",

      // Contacto
      contact_title: "RECIBE EL INFORME DE ENFOQUE.",
      contact_lead: "Un envío quincenal sin publicidad. Protocolos neurocientíficos de concentración, auditorías de desconexión y notas del núcleo de Fokus.",
      contact_email_label: "CORREO ELECTRÓNICO PROFESIONAL",
      contact_role_label: "ACTIVIDAD PRINCIPAL",
      role_dev: "INGENIERÍA DE SOFTWARE",
      role_research: "INVESTIGACIÓN CIENTÍFICA / TESIS",
      role_design: "DISEÑO / ARQUITECTURA",
      role_writing: "ESCRITURA / CREACIÓN",
      role_other: "OTRA DISCIPLINA EXIGENTE",
      contact_submit_btn: "SUSCRIBIRSE AL PROTOCOLO →",
      contact_direct_label: "CONEXIÓN TÉCNICA DIRECTA:",
      testi_badge: "EXPERIENCIAS REALES",
      quote_1_text: "« Fokus me devolvió 3 horas al día. Cero adornos, solo trabajo en estado puro. »",
      quote_1_author: "Mateo G.",
      quote_1_role: "Ingeniero de software — Madrid",
      quote_1_metric: "184 SESIONES COMPLETADAS // 0 ABANDONOS",
      quote_2_text: "« Terminé mi novela técnica sin revisar redes ni una sola vez. El bloqueo absoluto es implacable. »",
      quote_2_author: "Elena M.",
      quote_2_role: "Escritora técnica — Barcelona",
      quote_2_metric: "620 HORAS EN AISLAMIENTO TOTAL",
      quote_3_text: "« Las demás apps te bombardean con avisos para meditar. Fokus se calla y neutraliza el ruido. »",
      quote_3_author: "Carlos P.",
      quote_3_role: "Diseñador de producto — Valencia",
      quote_3_metric: "4 HITOS DE PRODUCCIÓN ADELANTADOS",

      // Footer
      footer_status: "KERNEL SHIELD v4.0.8 [ACTIVO]",
      footer_legal: "TODOS LOS DERECHOS RESERVADOS.",

      // Feedback messages
      feedback_success: "[PROTOCOLO CONFIRMADO] Suscripción activa al informe quincenal.",
      feedback_error: "[ERROR DE SISTEMA] Introduce una dirección de correo válida."
    }
  };

  // Matrice de prix adaptée aux devises et spécifications du prompt:
  // "Prix au format local : 1,99 € en FR/ES, €1.99 en EN."
  const PRICING_DATA = {
    fr: {
      free: "0 €",
      proMonthly: "4,99 €",
      proAnnual: "3,99 €",
      teamMonthly: "12,99 €",
      teamAnnual: "9,99 €"
    },
    en: {
      free: "€0",
      proMonthly: "€4.99",
      proAnnual: "€3.99",
      teamMonthly: "€12.99",
      teamAnnual: "€9.99"
    },
    es: {
      free: "0 €",
      proMonthly: "4,99 €",
      proAnnual: "3,99 €",
      teamMonthly: "12,99 €",
      teamAnnual: "9,99 €"
    }
  };

  // État de l'application
  const state = {
    lang: 'fr',
    page: 'accueil',
    billingAnnual: false,
    activeFeatureTab: 0,
    activePricingTab: 1, // Pro par défaut
    activeTestimonial: 0,
    phoneTimerSeconds: 42 * 60 + 18
  };

  // =========================================================================
  // GESTION DU MULTILINGUISME
  // =========================================================================
  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    state.lang = lang;
    document.documentElement.lang = lang;

    // Mise à jour de tous les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    // Remplacement des textes traduits
    const dict = TRANSLATIONS[lang];
    document.title = dict.doc_title;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        // Préserver le balisage HTML si présent (e.g. <br>)
        if (dict[key].includes('<') && dict[key].includes('>')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Recalcul des tarifs dans la devise et le format adéquat
    updatePricingDisplay();
  }

  // =========================================================================
  // NAVIGATION 100VH SANS AUCUN DÉFILEMENT
  // =========================================================================
  function navigateTo(pageId) {
    const targetView = document.getElementById('view-' + pageId);
    if (!targetView) return;

    state.page = pageId;

    // Mise à jour visuelle des vues
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.toggle('is-active', view.dataset.view === pageId);
    });

    // Mise à jour des onglets de navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.page === pageId);
    });

    // Mise à jour du hash sans défilement intempestif
    if (window.location.hash !== '#' + pageId) {
      history.replaceState(null, '', '#' + pageId);
    }
  }

  // =========================================================================
  // RECALCUL DYNAMIQUE DES PRIX
  // =========================================================================
  function updatePricingDisplay() {
    const curPricing = PRICING_DATA[state.lang] || PRICING_DATA.fr;
    const isAnnual = state.billingAnnual;

    const elFree = document.getElementById('priceValFree');
    const elPro = document.getElementById('priceValPro');
    const elTeam = document.getElementById('priceValTeam');
    const elPeriodPro = document.getElementById('pricePeriodPro');
    const elPeriodTeam = document.getElementById('pricePeriodTeam');

    if (elFree) elFree.textContent = curPricing.free;

    if (elPro) {
      elPro.textContent = isAnnual ? curPricing.proAnnual : curPricing.proMonthly;
    }
    if (elTeam) {
      elTeam.textContent = isAnnual ? curPricing.teamAnnual : curPricing.teamMonthly;
    }

    const dict = TRANSLATIONS[state.lang];
    if (elPeriodPro) {
      elPeriodPro.textContent = isAnnual ? dict.price_period_annual : dict.price_period_monthly;
    }
    if (elPeriodTeam) {
      elPeriodTeam.textContent = isAnnual ? dict.price_period_team_annual : dict.price_period_team_monthly;
    }
  }

  // =========================================================================
  // INTERACTIVITÉ ACCORDÉON FONCTIONNALITÉS & FAQ
  // =========================================================================
  function setupAccordions() {
    // Accordéon Fonctionnalités Desktop (Hover + Click)
    const ftRows = document.querySelectorAll('.feature-row');
    ftRows.forEach((row, idx) => {
      row.addEventListener('mouseenter', () => {
        ftRows.forEach(r => r.classList.remove('is-expanded'));
        row.classList.add('is-expanded');
      });
      row.addEventListener('click', () => {
        ftRows.forEach(r => r.classList.remove('is-expanded'));
        row.classList.add('is-expanded');
      });
    });

    // Accordéon FAQ (Thin-line, sobre)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        faqItems.forEach(i => {
          i.classList.remove('is-open');
          const t = i.querySelector('.faq-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
          const icon = i.querySelector('.faq-icon-indicator');
          if (icon) icon.innerHTML = '+';
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          const icon = item.querySelector('.faq-icon-indicator');
          if (icon) icon.innerHTML = '&minus;';
        }
      });
    });
  }

  // =========================================================================
  // SOUS-ONGLETS MOBILES STRICTS SANS DÉFILEMENT (100VH)
  // =========================================================================
  function setupMobileTabs() {
    // Onglets pour Fonctionnalités sur mobile
    const fTabs = document.querySelectorAll('#featuresMobileTabs .m-tab-btn');
    const fRows = document.querySelectorAll('.feature-row');

    function selectFeatureTab(index) {
      state.activeFeatureTab = index;
      fTabs.forEach(b => b.classList.toggle('is-active', parseInt(b.dataset.ftab, 10) === index));
      fRows.forEach((r, i) => {
        r.classList.toggle('is-active-tab', i === index);
        if (i === index) r.classList.add('is-expanded');
      });
    }

    fTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        selectFeatureTab(parseInt(tab.dataset.ftab, 10));
      });
    });

    // Initialisation du premier tab features
    selectFeatureTab(0);

    // Onglets pour Tarifs sur mobile
    const pTabs = document.querySelectorAll('#pricingMobileTabs .m-tab-btn');
    const pCols = document.querySelectorAll('.pricing-col');

    function selectPricingTab(index) {
      state.activePricingTab = index;
      pTabs.forEach(b => b.classList.toggle('is-active', parseInt(b.dataset.ptab, 10) === index));
      pCols.forEach((col, i) => {
        col.classList.toggle('is-active-tab', i === index);
      });
    }

    pTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        selectPricingTab(parseInt(tab.dataset.ptab, 10));
      });
    });

    // Pro sélectionné par défaut sur mobile (index 1)
    selectPricingTab(1);
  }

  // =========================================================================
  // CAROUSEL DE TÉMOIGNAGES (CONTACT / RETEX)
  // =========================================================================
  function setupTestimonials() {
    const cards = document.querySelectorAll('.testi-card');
    const counter = document.getElementById('testiCounter');
    const prevBtn = document.getElementById('testiPrevBtn');
    const nextBtn = document.getElementById('testiNextBtn');

    function showTestimonial(index) {
      if (index < 0) index = cards.length - 1;
      if (index >= cards.length) index = 0;
      state.activeTestimonial = index;

      cards.forEach((card, i) => {
        card.classList.toggle('is-active', i === index);
      });

      if (counter) {
        counter.textContent = `0${index + 1} / 0${cards.length}`;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => showTestimonial(state.activeTestimonial - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => showTestimonial(state.activeTestimonial + 1));
    }
  }

  // =========================================================================
  // SIMULATEUR DE TÉLÉPHONE CSS (HORLOGE RÉELLE & TIMER DÉCOMPTE)
  // =========================================================================
  function setupPhoneMockup() {
    const clockEl = document.getElementById('phoneClock');
    const timerEl = document.getElementById('appTimerDisplay');
    const emergencyBtn = document.getElementById('phoneEmergencyBtn');

    // Horloge en temps réel
    function updateClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      if (clockEl) clockEl.textContent = `${h}:${m}`;
    }
    updateClock();
    setInterval(updateClock, 30000);

    // Décompte de session
    setInterval(() => {
      if (state.phoneTimerSeconds > 0) {
        state.phoneTimerSeconds--;
        const mins = String(Math.floor(state.phoneTimerSeconds / 60)).padStart(2, '0');
        const secs = String(state.phoneTimerSeconds % 60).padStart(2, '0');
        if (timerEl) timerEl.textContent = `${mins}:${secs}`;
      }
    }, 1000);

    // Interaction sur le bouton rouge d'urgence du téléphone
    if (emergencyBtn) {
      emergencyBtn.addEventListener('click', () => {
        emergencyBtn.textContent = "[DÉVERROUILLAGE REFUSÉ // PROTOCOLE STRICT]";
        emergencyBtn.style.backgroundColor = 'var(--color-safety)';
        setTimeout(() => {
          emergencyBtn.textContent = TRANSLATIONS[state.lang].phone_emergency;
          emergencyBtn.style.backgroundColor = '#000';
        }, 1800);
      });
    }
  }

  // =========================================================================
  // FORMULAIRE DE NEWSLETTER / CONTACT
  // =========================================================================
  function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const feedback = document.getElementById('newsletterFeedback');

    if (!form || !emailInput || !feedback) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const dict = TRANSLATIONS[state.lang];

      if (!email || !email.includes('@') || !email.includes('.')) {
        feedback.textContent = dict.feedback_error;
        feedback.className = 'newsletter-feedback feedback-error';
        return;
      }

      feedback.textContent = dict.feedback_success;
      feedback.className = 'newsletter-feedback feedback-success';
      emailInput.value = '';

      setTimeout(() => {
        feedback.textContent = '';
      }, 5000);
    });
  }

  // =========================================================================
  // ATTACHEMENT DES ÉVÉNEMENTS GLOBAUX
  // =========================================================================
  function initEvents() {
    // Boutons de navigation du header
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        navigateTo(page);
      });
    });

    // Liens de marque et boutons CTA redirigeant vers une page
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(el.dataset.nav);
      });
    });

    // Bouton explorer les fonctionnalités
    const exploreBtn = document.getElementById('homeExploreFeatures');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => navigateTo('fonctionnalites'));
    }

    // Boutons CTA redirigeant vers tarifs
    const quickStartBtn = document.getElementById('quickStartBtn');
    const homeMainCta = document.getElementById('homeMainCta');
    if (quickStartBtn) {
      quickStartBtn.addEventListener('click', () => navigateTo('tarifs'));
    }
    if (homeMainCta) {
      homeMainCta.addEventListener('click', () => navigateTo('tarifs'));
    }

    // Bascule de langue FR | EN | ES
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
      });
    });

    // Bascule Mensuel / Annuel
    const billingSwitch = document.getElementById('billingSwitch');
    if (billingSwitch) {
      billingSwitch.addEventListener('click', () => {
        state.billingAnnual = !state.billingAnnual;
        billingSwitch.setAttribute('aria-checked', state.billingAnnual ? 'true' : 'false');
        updatePricingDisplay();
      });
    }

    // Gestion du hash initial dans l'URL (#tarifs, #faq, etc.)
    const hash = window.location.hash.replace('#', '');
    if (['accueil', 'fonctionnalites', 'tarifs', 'faq', 'contact'].includes(hash)) {
      navigateTo(hash);
    } else {
      navigateTo('accueil');
    }

    // Détection de l'historique popstate
    window.addEventListener('popstate', () => {
      const currentHash = window.location.hash.replace('#', '') || 'accueil';
      navigateTo(currentHash);
    });
  }

  // Initialisation au chargement du DOM
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    setupAccordions();
    setupMobileTabs();
    setupTestimonials();
    setupPhoneMockup();
    setupNewsletter();
    setLanguage('fr');
  });

})();
