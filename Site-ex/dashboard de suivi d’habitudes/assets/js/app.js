/**
 * Rythme — Habit Tracker Application Logic
 * Architecture sobre style Linear / Things
 * Zéro scroll, Raccourcis clavier réels (N, Espace, Flèches, 1-4),
 * Grille GitHub 30 jours, Graphique hebdomadaire en SVG fin,
 * Données en mémoire de session.
 */

(function () {
  'use strict';

  // 1. Détection de la langue
  const currentLang = document.documentElement.lang || 'fr';
  const t = (window.I18N && window.I18N[currentLang]) ? window.I18N[currentLang] : window.I18N.fr;

  // Formateur clé de date YYYY-MM-DD
  function toDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const today = new Date();
  const todayKey = toDateKey(today);

  // 2. Définitions d'icônes SVG nettes (PAS D'EMOJIS)
  const SVG_ICONS = {
    target: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.8"/><circle cx="12" cy="12" r="5" stroke-width="1.8"/><circle cx="12" cy="12" r="1.5" stroke-width="2"/></svg>',
    book: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
    code: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    activity: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    droplet: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 21.5c4.142 0 7.5-3.358 7.5-7.5 0-4.5-7.5-11.5-7.5-11.5S4.5 9.5 4.5 14c0 4.142 3.358 7.5 7.5 7.5z"/></svg>',
    sun: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke-width="1.8"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41"/></svg>',
    coffee: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>',
    flame: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>'
  };

  // 3. Habitudes d'exemple réalistes
  function getDemoHabits() {
    const pastDates = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      pastDates.push(toDateKey(d));
    }

    function generateHistory(rate, recentStreak) {
      const hist = {};
      pastDates.forEach((dateStr, idx) => {
        if (idx >= 30 - recentStreak) {
          hist[dateStr] = true;
        } else {
          hist[dateStr] = Math.random() < rate;
        }
      });
      return hist;
    }

    const titles = {
      fr: [
        { title: 'Revue de code & veille technique', cat: 'code', icon: 'code', rate: 0.85, streak: 8 },
        { title: 'Lecture approfondie 30 min', cat: 'learning', icon: 'book', rate: 0.78, streak: 5 },
        { title: 'Session de concentration sans interruption', cat: 'focus', icon: 'target', rate: 0.90, streak: 12 },
        { title: 'Hydratation régulière 2L', cat: 'health', icon: 'droplet', rate: 0.80, streak: 4 },
        { title: 'Entraînement physique & étirements', cat: 'routine', icon: 'activity', rate: 0.70, streak: 3 },
      ],
      en: [
        { title: 'Code review & tech architecture', cat: 'code', icon: 'code', rate: 0.85, streak: 8 },
        { title: 'In-depth reading 30 min', cat: 'learning', icon: 'book', rate: 0.78, streak: 5 },
        { title: 'Deep work focus block (no distractions)', cat: 'focus', icon: 'target', rate: 0.90, streak: 12 },
        { title: 'Hydration 2L baseline', cat: 'health', icon: 'droplet', rate: 0.80, streak: 4 },
        { title: 'Physical conditioning & mobility', cat: 'routine', icon: 'activity', rate: 0.70, streak: 3 },
      ],
      es: [
        { title: 'Revisión de código y arquitectura técnica', cat: 'code', icon: 'code', rate: 0.85, streak: 8 },
        { title: 'Lectura técnica profunda 30 min', cat: 'learning', icon: 'book', rate: 0.78, streak: 5 },
        { title: 'Bloque de enfoque profundo sin interrupción', cat: 'focus', icon: 'target', rate: 0.90, streak: 12 },
        { title: 'Hidratación constante 2L', cat: 'health', icon: 'droplet', rate: 0.80, streak: 4 },
        { title: 'Entrenamiento físico y movilidad', cat: 'routine', icon: 'activity', rate: 0.70, streak: 3 },
      ]
    };

    const set = titles[currentLang] || titles.fr;
    return set.map((item, index) => {
      const hist = generateHistory(item.rate, item.streak);
      // état d'aujourd'hui
      hist[todayKey] = index % 2 === 0;
      return {
        id: 'habit-' + (index + 1),
        title: item.title,
        category: item.cat,
        icon: item.icon,
        history: hist
      };
    });
  }

  // 4. État de l'application
  const STATE = {
    habits: [],
    currentView: 'today',
    currentPage: 1,
    pageSize: 5, // Liste paginée à 5 éléments max pour garantir l'absence totale de défilement
    selectedIndex: 0, // Navigation clavier
    selectedIconKey: 'target',
    theme: 'dark'
  };

  function initSession() {
    try {
      const saved = sessionStorage.getItem(`rythme_habits_${currentLang}`);
      if (saved) {
        STATE.habits = JSON.parse(saved);
      } else {
        STATE.habits = getDemoHabits();
        saveSession();
      }
    } catch (e) {
      STATE.habits = getDemoHabits();
    }

    const savedTheme = sessionStorage.getItem('rythme_theme') || 'dark';
    setTheme(savedTheme);
  }

  function saveSession() {
    try {
      sessionStorage.setItem(`rythme_habits_${currentLang}`, JSON.stringify(STATE.habits));
    } catch (e) {
      // Stockage mémoire session
    }
  }

  // 5. Calculs des séries et taux
  function calculateHabitStreak(habit) {
    let streak = 0;
    const checkDate = new Date();

    const isTodayChecked = !!habit.history[todayKey];
    if (isTodayChecked) {
      streak = 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      checkDate.setDate(checkDate.getDate() - 1);
      if (!habit.history[toDateKey(checkDate)]) {
        return 0;
      }
    }

    while (true) {
      const key = toDateKey(checkDate);
      if (habit.history[key]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  function calculateHabitBestStreak(habit) {
    let max = 0;
    let curr = 0;
    const d = new Date();
    for (let i = 29; i >= 0; i--) {
      const dateObj = new Date();
      dateObj.setDate(d.getDate() - i);
      const key = toDateKey(dateObj);
      if (habit.history[key]) {
        curr++;
        if (curr > max) max = curr;
      } else {
        curr = 0;
      }
    }
    return Math.max(max, calculateHabitStreak(habit));
  }

  function getGlobalStats() {
    if (!STATE.habits.length) {
      return { currentStreak: 0, bestStreak: 0, rate: 0, totalCompleted: 0 };
    }

    let totalPossible = STATE.habits.length * 30;
    let totalCompleted = 0;
    let bestHabitStreak = 0;
    let totalCurrentStreaks = 0;

    STATE.habits.forEach(h => {
      const streak = calculateHabitStreak(h);
      const best = calculateHabitBestStreak(h);
      totalCurrentStreaks += streak;
      if (best > bestHabitStreak) bestHabitStreak = best;

      for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        if (h.history[toDateKey(d)]) {
          totalCompleted++;
        }
      }
    });

    const avgStreak = Math.round(totalCurrentStreaks / STATE.habits.length);
    const rate = Math.round((totalCompleted / totalPossible) * 100);

    return {
      currentStreak: avgStreak,
      bestStreak: bestHabitStreak,
      rate: rate,
      totalCompleted: totalCompleted
    };
  }

  // 6. Gestion du Thème (Noir profond vs Gris très clair)
  function setTheme(theme) {
    STATE.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    sessionStorage.setItem('rythme_theme', theme);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.innerHTML = theme === 'dark'
        ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke-width="1.8"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41"/></svg>'
        : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
    }

    document.querySelectorAll('.btn-theme-choice').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === theme);
    });
  }

  // 7. Rendu : Vue Aujourd'hui (Liste stricte paginée, Raccourcis)
  function renderTodayView() {
    const listContainer = document.getElementById('habitsContainer');
    if (!listContainer) return;

    const totalHabits = STATE.habits.length;
    const totalPages = Math.max(1, Math.ceil(totalHabits / STATE.pageSize));
    if (STATE.currentPage > totalPages) STATE.currentPage = totalPages;

    const startIdx = (STATE.currentPage - 1) * STATE.pageSize;
    const paginatedHabits = STATE.habits.slice(startIdx, startIdx + STATE.pageSize);

    // Ajustement de la sélection clavier
    if (STATE.selectedIndex >= paginatedHabits.length) {
      STATE.selectedIndex = Math.max(0, paginatedHabits.length - 1);
    }

    // Statistiques du jour
    let doneToday = 0;
    STATE.habits.forEach(h => {
      if (h.history[todayKey]) doneToday++;
    });
    const percent = totalHabits > 0 ? Math.round((doneToday / totalHabits) * 100) : 0;

    // Mise à jour de la barre d'avancement
    const fillBar = document.getElementById('todayProgressFill');
    const doneText = document.getElementById('todayDoneCount');
    const percentText = document.getElementById('todayPercent');
    const todayMsg = document.getElementById('todaySubtitleMsg');
    const sidebarStreakCount = document.getElementById('sidebarStreakCount');

    if (fillBar) fillBar.style.width = `${percent}%`;
    if (doneText) doneText.textContent = `${doneToday}/${totalHabits}`;
    if (percentText) percentText.textContent = `${percent}%`;

    if (todayMsg) {
      if (totalHabits > 0 && doneToday === totalHabits) {
        todayMsg.textContent = t.today.allHabitsDone;
        todayMsg.style.color = 'var(--lime)';
      } else {
        todayMsg.textContent = t.today.subtitle;
        todayMsg.style.color = '';
      }
    }

    const globalStats = getGlobalStats();
    if (sidebarStreakCount) {
      sidebarStreakCount.textContent = `${globalStats.currentStreak} ${t.stats.days}`;
    }

    // Gestion de l'état vide
    if (totalHabits === 0) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-symbol">∅</div>
          <h3>${t.today.emptyTitle}</h3>
          <p>${t.today.emptyDesc}</p>
          <button class="btn-primary" id="emptyStateAddBtn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 4v16m8-8H4"/></svg>
            ${t.today.emptyAction} <kbd>N</kbd>
          </button>
        </div>
      `;
      document.getElementById('emptyStateAddBtn')?.addEventListener('click', openAddModal);
      const paginBar = document.getElementById('paginationBar');
      if (paginBar) paginBar.style.display = 'none';
      return;
    }

    const paginBar = document.getElementById('paginationBar');
    if (paginBar) paginBar.style.display = 'flex';

    // Rendu des lignes d'habitudes style Linear
    let html = '<div class="habits-table" id="habitsTable">';
    paginatedHabits.forEach((habit, idx) => {
      const isDone = !!habit.history[todayKey];
      const streak = calculateHabitStreak(habit);
      const isSelected = (idx === STATE.selectedIndex);
      const iconSvg = SVG_ICONS[habit.icon] || SVG_ICONS.target;
      const catLabel = t.categories[habit.category] || habit.category;

      html += `
        <div class="habit-row ${isDone ? 'completed' : ''} ${isSelected ? 'keyboard-selected' : ''}"
             data-id="${habit.id}"
             data-index="${idx}">
          <div class="habit-row-left">
            <button class="checkbox-btn" data-action="toggle" data-id="${habit.id}" aria-label="${isDone ? t.today.uncheckAction : t.today.checkAction}">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </button>
            <div class="habit-icon">
              ${iconSvg}
            </div>
            <div class="habit-info">
              <span class="habit-name" title="${habit.title}">${habit.title}</span>
              <span class="habit-category-badge">${catLabel}</span>
            </div>
          </div>
          <div class="habit-row-right">
            <span class="habit-streak-count ${streak > 0 ? 'active-streak' : ''}" title="${t.today.streakLabel}">
              <span style="font-size: 10px;">▲</span> ${streak} ${t.stats.days}
            </span>
            <button class="btn-row-action" data-action="delete" data-id="${habit.id}" title="${t.today.deleteConfirm}">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      `;
    });
    html += '</div>';

    listContainer.innerHTML = html;

    // Gestion des événements clics sur lignes et boutons
    const rows = listContainer.querySelectorAll('.habit-row');
    rows.forEach(row => {
      row.addEventListener('click', (e) => {
        const idx = parseInt(row.dataset.index, 10);
        STATE.selectedIndex = idx;
        updateRowSelection();

        // Si le clic n'est pas sur le bouton supprimer
        if (!e.target.closest('[data-action="delete"]')) {
          const habitId = row.dataset.id;
          if (e.target.closest('[data-action="toggle"]')) {
            toggleHabit(habitId);
          }
        }
      });
    });

    listContainer.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        deleteHabit(id);
      });
    });

    // Pagination
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (pageInfo) {
      pageInfo.textContent = t.today.pageInfo
        .replace('{current}', STATE.currentPage)
        .replace('{total}', totalPages);
    }
    if (prevBtn) prevBtn.disabled = STATE.currentPage <= 1;
    if (nextBtn) nextBtn.disabled = STATE.currentPage >= totalPages;
  }

  function updateRowSelection() {
    const rows = document.querySelectorAll('.habit-row');
    rows.forEach((r, idx) => {
      r.classList.toggle('keyboard-selected', idx === STATE.selectedIndex);
    });
  }

  function toggleHabit(id) {
    const habit = STATE.habits.find(h => h.id === id);
    if (!habit) return;

    habit.history[todayKey] = !habit.history[todayKey];
    saveSession();
    renderTodayView();
    renderCalendarView();
    renderStatsView();
  }

  function deleteHabit(id) {
    STATE.habits = STATE.habits.filter(h => h.id !== id);
    saveSession();
    renderTodayView();
    renderCalendarView();
    renderStatsView();
  }

  // 8. Rendu : Vue Calendrier (Grille de 30 jours façon contributions GitHub)
  function renderCalendarView() {
    const matrixContainer = document.getElementById('calendarMatrixContent');
    if (!matrixContainer) return;

    if (STATE.habits.length === 0) {
      matrixContainer.innerHTML = `<div class="empty-state"><p>${t.calendar.noData}</p></div>`;
      return;
    }

    const past30 = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      past30.push({
        dateObj: d,
        key: toDateKey(d),
        label: t.shortDateFormat(d),
        isToday: i === 0
      });
    }

    // Calcul des métriques globales calendrier
    let totalCells = STATE.habits.length * 30;
    let completedCells = 0;
    const dailyCounts = {};

    STATE.habits.forEach(h => {
      past30.forEach(day => {
        if (h.history[day.key]) {
          completedCells++;
          dailyCounts[day.key] = (dailyCounts[day.key] || 0) + 1;
        }
      });
    });

    const completionRate = Math.round((completedCells / totalCells) * 100);
    const activeDays = Object.keys(dailyCounts).filter(k => dailyCounts[k] > 0).length;

    // Jour le plus prolifique
    let bestDayKey = todayKey;
    let maxDone = 0;
    Object.entries(dailyCounts).forEach(([k, count]) => {
      if (count > maxDone) {
        maxDone = count;
        bestDayKey = k;
      }
    });

    const rateElem = document.getElementById('calMetricRate');
    const activeElem = document.getElementById('calMetricActive');
    const bestElem = document.getElementById('calMetricBest');

    if (rateElem) rateElem.textContent = `${completionRate}%`;
    if (activeElem) activeElem.textContent = `${activeDays} / 30`;
    if (bestElem) {
      const bd = new Date(bestDayKey);
      bestElem.textContent = `${t.shortDateFormat(bd)} (${maxDone})`;
    }

    // Matrice de contribution GitHub par habitude
    let matrixHtml = '';
    STATE.habits.forEach(habit => {
      const iconSvg = SVG_ICONS[habit.icon] || SVG_ICONS.target;
      let cellsHtml = '';

      past30.forEach(day => {
        const isChecked = !!habit.history[day.key];
        const statusText = isChecked ? t.calendar.statusDone : t.calendar.statusMissed;
        const tip = `${habit.title} • ${day.label}: ${statusText}`;

        cellsHtml += `
          <div class="matrix-cell ${isChecked ? 'active' : ''} ${day.isToday ? 'today-cell' : ''}"
               title="${tip}"
               data-habit-id="${habit.id}"
               data-date-key="${day.key}">
          </div>
        `;
      });

      matrixHtml += `
        <div class="matrix-row">
          <div class="matrix-habit-label">
            <span class="habit-icon" style="width: 16px; height: 16px;">${iconSvg}</span>
            <span title="${habit.title}">${habit.title}</span>
          </div>
          <div class="matrix-squares-strip">
            ${cellsHtml}
          </div>
        </div>
      `;
    });

    matrixContainer.innerHTML = matrixHtml;

    // Permettre de basculer un jour spécifique dans la matrice
    matrixContainer.querySelectorAll('.matrix-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const habitId = cell.dataset.habitId;
        const dateKey = cell.dataset.dateKey;
        const habit = STATE.habits.find(h => h.id === habitId);
        if (habit) {
          habit.history[dateKey] = !habit.history[dateKey];
          saveSession();
          renderCalendarView();
          renderTodayView();
          renderStatsView();
        }
      });
    });
  }

  // 9. Rendu : Vue Statistiques (Chiffres monospace + Graphique hebdomadaire SVG fin)
  function renderStatsView() {
    const stats = getGlobalStats();

    const statCur = document.getElementById('statCurrentStreak');
    const statBest = document.getElementById('statBestStreak');
    const statRate = document.getElementById('statSuccessRate');
    const statTotal = document.getElementById('statTotalCompleted');

    if (statCur) statCur.textContent = `${stats.currentStreak} ${t.stats.days}`;
    if (statBest) statBest.textContent = `${stats.bestStreak} ${t.stats.days}`;
    if (statRate) statRate.textContent = `${stats.rate}%`;
    if (statTotal) statTotal.textContent = `${stats.totalCompleted}`;

    // Graphique hebdomadaire en SVG fin
    const chartBox = document.getElementById('weeklySvgChart');
    if (chartBox) {
      const last7Days = [];
      const habitCount = Math.max(1, STATE.habits.length);

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dayKey = toDateKey(d);
        const dayName = t.daysShort[d.getDay()];

        let count = 0;
        STATE.habits.forEach(h => {
          if (h.history[dayKey]) count++;
        });

        const percent = Math.min(100, Math.round((count / habitCount) * 100));
        last7Days.push({ dayName, count, percent, isToday: i === 0 });
      }

      // Construction de l'élément SVG fin
      const width = 480;
      const height = 150;
      const paddingLeft = 32;
      const paddingBottom = 26;
      const paddingTop = 14;
      const paddingRight = 14;

      const chartW = width - paddingLeft - paddingRight;
      const chartH = height - paddingTop - paddingBottom;
      const colStep = chartW / 7;

      let gridLines = '';
      [0, 25, 50, 75, 100].forEach(p => {
        const y = paddingTop + chartH - (p / 100) * chartH;
        gridLines += `
          <line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" stroke="var(--border)" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="${paddingLeft - 6}" y="${y + 3}" fill="var(--text-dim)" font-size="9" font-family="var(--font-mono)" text-anchor="end">${p}%</text>
        `;
      });

      let barsAndLabels = '';
      const barWidth = 24;

      last7Days.forEach((item, idx) => {
        const x = paddingLeft + idx * colStep + (colStep - barWidth) / 2;
        const bHeight = Math.max(3, (item.percent / 100) * chartH);
        const y = paddingTop + chartH - bHeight;
        const centerX = x + barWidth / 2;

        const barColor = item.isToday ? 'var(--lime)' : 'rgba(198, 241, 53, 0.45)';
        const textColor = item.isToday ? 'var(--lime)' : 'var(--text-muted)';
        const fontWeight = item.isToday ? '700' : '500';

        barsAndLabels += `
          <!-- Barre fine -->
          <rect x="${x}" y="${y}" width="${barWidth}" height="${bHeight}" rx="2" fill="${barColor}" stroke="var(--border)" stroke-width="0.8"/>
          <!-- Compte numérique au dessus -->
          <text x="${centerX}" y="${y - 4}" fill="var(--text-muted)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">${item.count}</text>
          <!-- Jour de la semaine -->
          <text x="${centerX}" y="${height - 6}" fill="${textColor}" font-size="10" font-family="var(--font-mono)" font-weight="${fontWeight}" text-anchor="middle">${item.dayName}</text>
        `;
      });

      chartBox.innerHTML = `
        <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          ${gridLines}
          ${barsAndLabels}
        </svg>
      `;
    }

    // Liste de maintien par habitude
    const breakdownContainer = document.getElementById('habitsBreakdownList');
    if (breakdownContainer) {
      if (!STATE.habits.length) {
        breakdownContainer.innerHTML = `<p style="color: var(--text-dim); font-size: 11px;">${t.stats.noStatsYet}</p>`;
        return;
      }

      let bHtml = '';
      STATE.habits.forEach(h => {
        let count = 0;
        for (let i = 0; i < 30; i++) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          if (h.history[toDateKey(d)]) count++;
        }
        const rate = Math.round((count / 30) * 100);
        const streak = calculateHabitStreak(h);

        bHtml += `
          <div class="breakdown-row">
            <div class="breakdown-row-meta">
              <span class="breakdown-name">${h.title}</span>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-dim);">▲ ${streak} ${t.stats.days}</span>
                <span class="breakdown-rate">${rate}%</span>
              </div>
            </div>
            <div class="breakdown-track">
              <div class="breakdown-fill" style="width: ${rate}%;"></div>
            </div>
          </div>
        `;
      });

      breakdownContainer.innerHTML = bHtml;
    }
  }

  // 10. Navigation entre les vues
  function switchView(viewName) {
    STATE.currentView = viewName;

    document.querySelectorAll('.view-pane').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.view === viewName);
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === viewName);
    });

    if (viewName === 'today') renderTodayView();
    if (viewName === 'calendar') renderCalendarView();
    if (viewName === 'stats') renderStatsView();
  }

  // 11. Boîte de dialogue : Ajouter une habitude
  const modal = document.getElementById('addHabitModal');
  const addForm = document.getElementById('addHabitForm');

  function openAddModal() {
    if (!modal) return;
    modal.classList.add('active');
    const input = document.getElementById('habitNameInput');
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  function closeAddModal() {
    if (!modal) return;
    modal.classList.remove('active');
  }

  // 12. Raccourcis clavier réels (N, Espace, Flèches Haut/Bas, 1-4, Escape)
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      const activeElement = document.activeElement;
      const isInput = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT' || activeElement.tagName === 'TEXTAREA');

      // Touche Escape : ferme la modal
      if (e.key === 'Escape') {
        if (modal?.classList.contains('active')) {
          e.preventDefault();
          closeAddModal();
          return;
        }
      }

      // Si l'utilisateur est en train de taper dans un champ de saisie, on n'intercepte pas les touches de raccourci
      if (isInput) return;

      // Touche N : Nouvelle habitude
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        openAddModal();
        return;
      }

      // Touches 1, 2, 3, 4 : Bascule de vue
      if (e.key === '1') { e.preventDefault(); switchView('today'); return; }
      if (e.key === '2') { e.preventDefault(); switchView('calendar'); return; }
      if (e.key === '3') { e.preventDefault(); switchView('stats'); return; }
      if (e.key === '4') { e.preventDefault(); switchView('settings'); return; }

      // Touches Flèches Haut/Bas ou j/k : Navigation dans la liste des habitudes (Vue Aujourd'hui)
      if (STATE.currentView === 'today') {
        const rows = document.querySelectorAll('.habit-row');
        if (rows.length === 0) return;

        if (e.key === 'ArrowDown' || e.key === 'j') {
          e.preventDefault();
          if (STATE.selectedIndex < rows.length - 1) {
            STATE.selectedIndex++;
            updateRowSelection();
          }
          return;
        }

        if (e.key === 'ArrowUp' || e.key === 'k') {
          e.preventDefault();
          if (STATE.selectedIndex > 0) {
            STATE.selectedIndex--;
            updateRowSelection();
          }
          return;
        }

        // Touche Espace : Cocher / décocher l'habitude sélectionnée
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          const selectedRow = rows[STATE.selectedIndex];
          if (selectedRow) {
            const habitId = selectedRow.dataset.id;
            toggleHabit(habitId);
          }
          return;
        }

        // Touche Suppr / Backspace : Supprimer l'habitude sélectionnée
        if (e.key === 'Delete' || e.key === 'Backspace') {
          const selectedRow = rows[STATE.selectedIndex];
          if (selectedRow) {
            e.preventDefault();
            const habitId = selectedRow.dataset.id;
            deleteHabit(habitId);
          }
          return;
        }
      }
    });
  }

  // 13. Initialisation des événements de l'interface
  function setupEvents() {
    // Badge de date supérieure
    const dateBadge = document.getElementById('todayDateBadge');
    if (dateBadge) {
      dateBadge.innerHTML = `<span class="status-pip"></span> ${t.dateFormat(today)}`;
    }

    // Navigation de vue (Desktop + Mobile)
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        switchView(btn.dataset.view);
      });
    });

    // Boutons d'ajout d'habitude
    document.getElementById('topAddHabitBtn')?.addEventListener('click', openAddModal);
    document.getElementById('closeModalBtn')?.addEventListener('click', closeAddModal);
    document.getElementById('cancelModalBtn')?.addEventListener('click', closeAddModal);

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeAddModal();
    });

    // Choix d'icônes SVG dans le modal
    document.querySelectorAll('.icon-choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.icon-choice-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.selectedIconKey = btn.dataset.icon;
      });
    });

    // Soumission du formulaire d'ajout
    addForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('habitNameInput');
      const catSelect = document.getElementById('habitCategorySelect');
      const name = input?.value.trim();

      if (!name) return;

      const newHabit = {
        id: 'habit-' + Date.now(),
        title: name,
        category: catSelect ? catSelect.value : 'focus',
        icon: STATE.selectedIconKey || 'target',
        history: { [todayKey]: true }
      };

      STATE.habits.unshift(newHabit);
      STATE.selectedIndex = 0;
      saveSession();
      closeAddModal();
      switchView('today');
      renderTodayView();
      renderCalendarView();
      renderStatsView();
    });

    // Boutons de pagination
    document.getElementById('prevPageBtn')?.addEventListener('click', () => {
      if (STATE.currentPage > 1) {
        STATE.currentPage--;
        STATE.selectedIndex = 0;
        renderTodayView();
      }
    });
    document.getElementById('nextPageBtn')?.addEventListener('click', () => {
      const totalPages = Math.ceil(STATE.habits.length / STATE.pageSize);
      if (STATE.currentPage < totalPages) {
        STATE.currentPage++;
        STATE.selectedIndex = 0;
        renderTodayView();
      }
    });

    // Bascule de thème
    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
      const next = STATE.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });

    document.querySelectorAll('.btn-theme-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        setTheme(btn.dataset.theme);
      });
    });

    // Boutons de réinitialisation des données de session
    document.getElementById('btnReloadDemo')?.addEventListener('click', () => {
      if (confirm(t.settings.dataResetConfirm)) {
        STATE.habits = getDemoHabits();
        saveSession();
        renderTodayView();
        renderCalendarView();
        renderStatsView();
      }
    });

    document.getElementById('btnClearData')?.addEventListener('click', () => {
      if (confirm(t.today.deleteConfirm)) {
        STATE.habits = [];
        saveSession();
        renderTodayView();
        renderCalendarView();
        renderStatsView();
      }
    });

    // Raccourcis clavier réels
    setupKeyboardShortcuts();
  }

  // 14. Lancement au chargement du DOM
  function init() {
    initSession();
    setupEvents();
    renderTodayView();
    renderCalendarView();
    renderStatsView();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
