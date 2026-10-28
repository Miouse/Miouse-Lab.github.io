/**
 * Rythme — Habit Tracker
 * i18n Dictionary & Localization Utilities
 * Languages: FR, EN, ES
 */

const I18N = {
  fr: {
    locale: 'fr-FR',
    appName: 'Rythme',
    tagline: 'Outil de suivi sobre & focalisé',
    nav: {
      today: 'Aujourd\'hui',
      calendar: 'Calendrier',
      stats: 'Statistiques',
      settings: 'Réglages',
    },
    today: {
      title: 'Aujourd\'hui',
      subtitle: 'Exécutez vos engagements quotidiens sans distraction.',
      allHabitsDone: 'Toutes les habitudes sont cochées. Vous avez vaincu aujourd\'hui. Reposez-vous avant que votre esprit n\'invente une nouvelle obsession.',
      progressLabel: 'Complétées',
      addHabitBtn: 'Nouvelle habitude',
      streakBadge: '{count} j.',
      streakLabel: 'jours d\'affilée',
      activeStreak: 'Série active',
      checkAction: 'Cocher',
      uncheckAction: 'Décocher',
      deleteConfirm: 'Supprimer cette habitude ?',
      emptyTitle: 'Aucune habitude enregistrée',
      emptyDesc: 'Vous pouvez continuer à fixer ce rectangle vide, ou appuyer sur N pour commencer à faire semblant d\'être productif.',
      emptyAction: 'Créer une habitude',
      pageInfo: 'Page {current} sur {total}',
      prevPage: 'Précédent',
      nextPage: 'Suivant',
      shortcutsHint: {
        add: 'Ajouter',
        toggle: 'Cocher',
        nav: 'Naviguer',
        del: 'Supprimer'
      }
    },
    calendar: {
      title: 'Calendrier',
      subtitle: 'Régularité des 30 derniers jours (grille d\'activité GitHub).',
      last30Days: '30 derniers jours',
      completionRate: 'Taux de régularité',
      activeDays: 'Jours actifs',
      bestDay: 'Jour le plus prolifique',
      legendLess: 'Moins',
      legendMore: 'Plus',
      noData: 'Aucune habitude active pour alimenter la matrice.',
      habitRow: 'Habitude',
      dayTooltip: '{date} : {status}',
      statusDone: 'Accompli',
      statusMissed: 'Non fait'
    },
    stats: {
      title: 'Statistiques',
      subtitle: 'Données brutes, séries de rigueur et dynamique hebdomadaire.',
      currentStreak: 'Série en cours',
      bestStreak: 'Record de série',
      successRate: 'Taux de réussite',
      totalCompleted: 'Total validé (30j)',
      weeklyChartTitle: 'Activité de la semaine',
      weeklyChartDesc: 'Volume d\'habitudes cochées par jour (SVG fin)',
      habitsBreakdown: 'Maintien par habitude',
      days: 'j.',
      noStatsYet: 'Pas encore assez de données enregistrées.',
    },
    settings: {
      title: 'Réglages',
      subtitle: 'Préférences d\'affichage, raccourcis et gestion des données.',
      languageTitle: 'Langue de l\'interface',
      languageDesc: 'Basculez instantanément entre FR, EN et ES',
      themeTitle: 'Apparence',
      themeDesc: 'Mode sombre (noir profond) ou mode clair (gris très clair)',
      themeDark: 'Sombre',
      themeLight: 'Clair',
      dataTitle: 'Données de session',
      dataDesc: 'Stockées en mémoire pour cette session uniquement.',
      loadDemoData: 'Recharger les exemples',
      clearData: 'Tout effacer',
      dataResetConfirm: 'Réinitialiser avec les habitudes d\'exemple ?',
      dataClearedConfirm: 'Toutes les habitudes ont été effacées.',
      shortcutsTitle: 'Raccourcis clavier réels',
      shortcutsDesc: 'Naviguez à pleine vitesse sans quitter le clavier',
      shortcutAdd: 'Ajouter une habitude',
      shortcutToggle: 'Cocher / décocher la sélection',
      shortcutNav: 'Naviguer dans la liste',
      shortcutViews: 'Changer de vue (1 à 4)',
      shortcutEscape: 'Fermer la boîte de dialogue',
    },
    modal: {
      addTitle: 'Nouvelle habitude',
      nameLabel: 'Intitulé',
      namePlaceholder: 'ex. Lecture technique 25 min',
      categoryLabel: 'Catégorie',
      iconLabel: 'Icône vectorielle',
      cancelBtn: 'Annuler',
      saveBtn: 'Ajouter',
    },
    categories: {
      focus: 'Focus',
      health: 'Santé',
      learning: 'Apprentissage',
      code: 'Code',
      routine: 'Routine',
    },
    daysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    daysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    dateFormat: (date) => {
      return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }).format(date);
    },
    shortDateFormat: (date) => {
      return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'short'
      }).format(date);
    }
  },

  en: {
    locale: 'en-US',
    appName: 'Rythme',
    tagline: 'Sober & focused habit tracking',
    nav: {
      today: 'Today',
      calendar: 'Calendar',
      stats: 'Statistics',
      settings: 'Settings',
    },
    today: {
      title: 'Today',
      subtitle: 'Execute your daily commitments without distraction.',
      allHabitsDone: 'All habits completed. You have officially defeated today. Go rest before your brain invents a new life goal.',
      progressLabel: 'Completed',
      addHabitBtn: 'New Habit',
      streakBadge: '{count} d.',
      streakLabel: 'days streak',
      activeStreak: 'Active streak',
      checkAction: 'Check',
      uncheckAction: 'Uncheck',
      deleteConfirm: 'Delete this habit?',
      emptyTitle: 'Zero habits tracked',
      emptyDesc: 'You can keep staring into this void, or press N to start pretending to be disciplined.',
      emptyAction: 'Create habit',
      pageInfo: 'Page {current} of {total}',
      prevPage: 'Previous',
      nextPage: 'Next',
      shortcutsHint: {
        add: 'Add',
        toggle: 'Check',
        nav: 'Navigate',
        del: 'Delete'
      }
    },
    calendar: {
      title: 'Calendar',
      subtitle: '30-day consistency matrix (GitHub-style activity grid).',
      last30Days: 'Last 30 Days',
      completionRate: 'Consistency rate',
      activeDays: 'Active days',
      bestDay: 'Most productive day',
      legendLess: 'Less',
      legendMore: 'More',
      noData: 'No active habit to populate the matrix.',
      habitRow: 'Habit',
      dayTooltip: '{date}: {status}',
      statusDone: 'Completed',
      statusMissed: 'Missed'
    },
    stats: {
      title: 'Statistics',
      subtitle: 'Raw metrics, streak records and fine SVG weekly cadence.',
      currentStreak: 'Current streak',
      bestStreak: 'Best streak',
      successRate: 'Success rate',
      totalCompleted: 'Total checked (30d)',
      weeklyChartTitle: 'Weekly Activity',
      weeklyChartDesc: 'Volume of completed habits per day (Fine SVG)',
      habitsBreakdown: 'Habit Consistency',
      days: 'd.',
      noStatsYet: 'Not enough data recorded yet.',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Display preferences, shortcuts and session data management.',
      languageTitle: 'Interface Language',
      languageDesc: 'Instantly toggle between FR, EN and ES',
      themeTitle: 'Appearance',
      themeDesc: 'Deep black dark mode or very light grey mode',
      themeDark: 'Dark',
      themeLight: 'Light',
      dataTitle: 'Session Data',
      dataDesc: 'Held in memory for this session only.',
      loadDemoData: 'Reload demo habits',
      clearData: 'Clear all',
      dataResetConfirm: 'Reset habits with demo dataset?',
      dataClearedConfirm: 'All habits have been cleared.',
      shortcutsTitle: 'Real Keyboard Shortcuts',
      shortcutsDesc: 'Operate at speed without taking your hands off the keyboard',
      shortcutAdd: 'Add new habit',
      shortcutToggle: 'Toggle selected habit',
      shortcutNav: 'Navigate habit list',
      shortcutViews: 'Switch view (1 to 4)',
      shortcutEscape: 'Close modal dialog',
    },
    modal: {
      addTitle: 'New Habit',
      nameLabel: 'Habit Title',
      namePlaceholder: 'e.g. 25-min technical reading',
      categoryLabel: 'Category',
      iconLabel: 'Vector Icon',
      cancelBtn: 'Cancel',
      saveBtn: 'Add Habit',
    },
    categories: {
      focus: 'Focus',
      health: 'Health',
      learning: 'Learning',
      code: 'Code',
      routine: 'Routine',
    },
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dateFormat: (date) => {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }).format(date);
    },
    shortDateFormat: (date) => {
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short'
      }).format(date);
    }
  },

  es: {
    locale: 'es-ES',
    appName: 'Rythme',
    tagline: 'Seguimiento sobrio y enfocado',
    nav: {
      today: 'Hoy',
      calendar: 'Calendario',
      stats: 'Estadísticas',
      settings: 'Ajustes',
    },
    today: {
      title: 'Hoy',
      subtitle: 'Ejecuta tus compromisos diarios sin distracciones.',
      allHabitsDone: 'Todos los hábitos completados. Has vencido el día. Descansa antes de que a tu mente se le ocurra otra meta.',
      progressLabel: 'Completados',
      addHabitBtn: 'Nuevo hábito',
      streakBadge: '{count} d.',
      streakLabel: 'días seguidos',
      activeStreak: 'Racha activa',
      checkAction: 'Marcar',
      uncheckAction: 'Desmarcar',
      deleteConfirm: '¿Eliminar este hábito?',
      emptyTitle: 'Cero hábitos registrados',
      emptyDesc: 'Puedes seguir mirando este rectángulo vacío, o pulsar N para empezar a fingir que eres productivo.',
      emptyAction: 'Crear hábito',
      pageInfo: 'Página {current} de {total}',
      prevPage: 'Anterior',
      nextPage: 'Siguiente',
      shortcutsHint: {
        add: 'Añadir',
        toggle: 'Marcar',
        nav: 'Navegar',
        del: 'Eliminar'
      }
    },
    calendar: {
      title: 'Calendario',
      subtitle: 'Constancia de los últimos 30 días (matriz tipo GitHub).',
      last30Days: 'Últimos 30 días',
      completionRate: 'Tasa de constancia',
      activeDays: 'Días activos',
      bestDay: 'Día más prolífico',
      legendLess: 'Menos',
      legendMore: 'Más',
      noData: 'No hay hábitos activos para alimentar la matriz.',
      habitRow: 'Hábito',
      dayTooltip: '{date}: {status}',
      statusDone: 'Completado',
      statusMissed: 'No realizado'
    },
    stats: {
      title: 'Estadísticas',
      subtitle: 'Métricas precisas, récords de racha y ritmo semanal en SVG fino.',
      currentStreak: 'Racha actual',
      bestStreak: 'Mejor racha',
      successRate: 'Tasa de éxito',
      totalCompleted: 'Total completado (30d)',
      weeklyChartTitle: 'Actividad semanal',
      weeklyChartDesc: 'Volumen de hábitos marcados por día (SVG fino)',
      habitsBreakdown: 'Rendimiento por hábito',
      days: 'd.',
      noStatsYet: 'Aún no hay suficientes datos registrados.',
    },
    settings: {
      title: 'Ajustes',
      subtitle: 'Preferencias visuales, atajos y gestión de datos de sesión.',
      languageTitle: 'Idioma de la interfaz',
      languageDesc: 'Cambia al instante entre FR, EN y ES',
      themeTitle: 'Aspecto',
      themeDesc: 'Modo oscuro (negro profundo) o claro (gris muy claro)',
      themeDark: 'Oscuro',
      themeLight: 'Claro',
      dataTitle: 'Datos de sesión',
      dataDesc: 'Conservados en memoria únicamente durante esta visita.',
      loadDemoData: 'Recargar ejemplos',
      clearData: 'Borrar todo',
      dataResetConfirm: '¿Restablecer hábitos con datos de ejemplo?',
      dataClearedConfirm: 'Todos los hábitos han sido borrados.',
      shortcutsTitle: 'Atajos de teclado reales',
      shortcutsDesc: 'Control total de la aplicación sin tocar el ratón',
      shortcutAdd: 'Añadir nuevo hábito',
      shortcutToggle: 'Marcar hábito seleccionado',
      shortcutNav: 'Navegar por la lista',
      shortcutViews: 'Cambiar de vista (1 a 4)',
      shortcutEscape: 'Cerrar diálogo modal',
    },
    modal: {
      addTitle: 'Nuevo hábito',
      nameLabel: 'Título del hábito',
      namePlaceholder: 'ej. Lectura técnica 25 min',
      categoryLabel: 'Categoría',
      iconLabel: 'Icono vectorial',
      cancelBtn: 'Cancelar',
      saveBtn: 'Añadir hábito',
    },
    categories: {
      focus: 'Enfoque',
      health: 'Salud',
      learning: 'Aprendizaje',
      code: 'Código',
      routine: 'Rutina',
    },
    daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    daysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    dateFormat: (date) => {
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }).format(date);
    },
    shortDateFormat: (date) => {
      return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'short'
      }).format(date);
    }
  }
};

window.I18N = I18N;
