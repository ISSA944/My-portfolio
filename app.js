/* ============================================================
   ISO — Iskander Portfolio  |  app.js  v3
   Preloader, Particles, Theme, Language, Form, Animations
   ============================================================ */

/* ---------- PRELOADER ---------- */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const fill = document.getElementById("preloaderFill");
  const textEl = document.getElementById("preloaderText");
  const pctEl  = document.getElementById("preloaderPercent");

  const messages = [
    { at: 0,  text: "Инициализация..." },
    { at: 12, text: "Загрузка шрифтов" },
    { at: 25, text: "Подключение стилей" },
    { at: 40, text: "Подготовка контента" },
    { at: 55, text: "Рендеринг интерфейса" },
    { at: 70, text: "Почти готово..." },
    { at: 85, text: "Финальная полировка ✨" },
    { at: 96, text: "Добро пожаловать!" },
  ];

  const preloaderLang = localStorage.getItem("iskander_lang") || document.documentElement.lang || "ru";
  const safePreloaderLang = preloaderLang === "en" ? "en" : "ru";
  const pageName = window.location.pathname.split("/").pop() || "index.html";

  const preloaderTexts = {
    "javascript.html": {
      ru: [
        "Инициализация JavaScript...",
        "Подготовка JS-файлов",
        "Подключение модулей",
        "Настройка DOM-логики",
        "Прогрев интерактивных блоков",
        "Проверка асинхронных сценариев",
        "Финальная оптимизация скриптов",
        "Страница JavaScript готова!",
      ],
      en: [
        "Initializing JavaScript...",
        "Preparing JS files",
        "Loading modules",
        "Configuring DOM logic",
        "Warming up interactive blocks",
        "Checking async flows",
        "Final script optimization",
        "JavaScript page is ready!",
      ]
    },
    "html-css.html": {
      ru: [
        "Инициализация HTML/CSS...",
        "Загрузка типографики",
        "Подготовка сеток и переменных",
        "Сборка стилей компонентов",
        "Проверка адаптивности",
        "Оптимизация анимаций",
        "Финальная полировка макета",
        "Страница HTML & CSS готова!",
      ],
      en: [
        "Initializing HTML/CSS...",
        "Loading typography",
        "Preparing grids and variables",
        "Building component styles",
        "Checking responsiveness",
        "Optimizing animations",
        "Final layout polish",
        "HTML & CSS page is ready!",
      ]
    },
    "react.html": {
      ru: [
        "Инициализация React-страницы...",
        "Подготовка компонентов",
        "Сборка UI-структуры",
        "Настройка состояния",
        "Подключение маршрутов",
        "Проверка хуков",
        "Финальная полировка интерфейса",
        "Страница React готова!",
      ],
      en: [
        "Initializing React page...",
        "Preparing components",
        "Building UI structure",
        "Configuring state",
        "Wiring up routes",
        "Checking hooks",
        "Final interface polish",
        "React page is ready!",
      ]
    },
    "tools.html": {
      ru: [
        "Инициализация инструментов...",
        "Подготовка окружения",
        "Загрузка конфигураций",
        "Проверка интеграций",
        "Синхронизация рабочего процесса",
        "Подключение утилит",
        "Финальная настройка",
        "Страница инструментов готова!",
      ],
      en: [
        "Initializing tools page...",
        "Preparing environment",
        "Loading configurations",
        "Checking integrations",
        "Syncing workflow",
        "Connecting utilities",
        "Final setup",
        "Tools page is ready!",
      ]
    },
    "portfolio.html": {
      ru: [
        "Инициализация портфолио...",
        "Подготовка проектов",
        "Загрузка превью",
        "Сборка галереи",
        "Проверка мобильной версии",
        "Синхронизация RU/EN контента",
        "Финальная полировка карточек",
        "Портфолио готово!",
      ],
      en: [
        "Initializing portfolio...",
        "Preparing projects",
        "Loading previews",
        "Building gallery",
        "Checking mobile layout",
        "Syncing RU/EN content",
        "Final card polish",
        "Portfolio is ready!",
      ]
    },
    "project.html": {
      ru: [
        "Открытие проекта...",
        "Подготовка страницы проекта",
        "Загрузка превью",
        "Сборка галереи",
        "Проверка контента",
        "Синхронизация RU/EN",
        "Финальная полировка",
        "Проект готов!",
      ],
      en: [
        "Opening project...",
        "Preparing project page",
        "Loading preview",
        "Building gallery",
        "Checking content",
        "Syncing RU/EN",
        "Final polish",
        "Project is ready!",
      ]
    }
  };

  const genericEnMessages = [
    "Initialization...",
    "Loading fonts",
    "Loading styles",
    "Preparing content",
    "Rendering interface",
    "Almost ready...",
    "Final polish...",
    "Welcome!",
  ];

  const pageSpecificMessages = preloaderTexts[pageName]?.[safePreloaderLang];
  const fallbackMessages = safePreloaderLang === "en" ? genericEnMessages : null;
  const activeMessages = pageSpecificMessages || fallbackMessages;

  if (activeMessages) {
    messages.forEach((msg, idx) => {
      if (activeMessages[idx]) msg.text = activeMessages[idx];
    });
  }
  const skipPreloaderStepPattern = /(почти\s*готов|almost\s*ready)/i;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (skipPreloaderStepPattern.test(messages[i].text)) {
      messages.splice(i, 1);
    }
  }

  let progress = 0;
  let msgIdx = 0;
  let pageLoaded = document.readyState === "complete";
  let completed = false;
  let nextAllowedMsgAt = 0;
  const minMsgVisibleMs = 700;
  let msgSwitchQueued = false;
  let finalHoldUntil = 0;
  let finalHoldApplied = false;

  function setMessage(txt) {
    if (!textEl) return;
    textEl.classList.add("is-switching");
    setTimeout(() => {
      textEl.textContent = txt;
      textEl.classList.remove("is-switching");
    }, 200);
  }

  // Set first message immediately
  if (textEl) textEl.textContent = messages[0].text;

  window.addEventListener("load", () => { pageLoaded = true; });

  function tick() {
    if (completed) return;
    const now = performance.now();
    // Медленнее до загрузки страницы, чуть быстрее после
    const target = pageLoaded ? 100 : 74;
    // Было: 3 / 0.6
    let speed = pageLoaded ? 0.52 : 0.18;
    let dynamicTarget = target;

    // Финальная зона: после 90% замедляем и даем время дочитать текст
    if (pageLoaded && progress >= 90) {
      speed = 0.12;
      if (!finalHoldApplied) {
        finalHoldApplied = true;
        finalHoldUntil = now + 900;
      }
      if (now < finalHoldUntil) {
        dynamicTarget = Math.min(dynamicTarget, 92);
      }
    }

    if (progress < dynamicTarget) {
      const step = speed + Math.random() * speed * 0.35;
      progress = Math.min(progress + step, dynamicTarget);
    }

    const pct = Math.round(progress);
    if (fill) fill.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";

    // Update message (добавим задержку между сменой сообщений)
    let nextMsgIdx = msgIdx;
    while (nextMsgIdx < messages.length - 1 && pct >= messages[nextMsgIdx + 1].at) {
      nextMsgIdx++;
    }
    if (nextMsgIdx !== msgIdx && !msgSwitchQueued && now >= nextAllowedMsgAt) {
      // Задержка перед сменой текста, чтобы успеть прочитать
      msgSwitchQueued = true;
      setTimeout(() => {
        msgIdx = nextMsgIdx;
        setMessage(messages[msgIdx].text);
        nextAllowedMsgAt = performance.now() + minMsgVisibleMs;
        msgSwitchQueued = false;
      }, 420);
    }

    if (pct >= 100) {
      completed = true;
      if (fill) fill.style.width = "100%";
      if (pctEl) pctEl.textContent = "100%";
      if (msgIdx !== messages.length - 1) {
        msgIdx = messages.length - 1;
        setMessage(messages[msgIdx].text);
      }
      setTimeout(() => {
        preloader.classList.add("hidden");
        setTimeout(() => preloader.remove(), 600);
      }, 1200);
      return;
    }

    setTimeout(tick, 34);
  }

  // Start after letters animate in
  setTimeout(tick, 1100);
}
initPreloader();

/* ---------- PARTICLES ---------- */
function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  const count = Math.min(35, Math.floor(window.innerWidth / 40));
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.width = p.style.height = (Math.random() * 2 + 1) + "px";
    p.style.animationDuration = (Math.random() * 12 + 8) + "s";
    p.style.animationDelay = (Math.random() * 10) + "s";
    p.style.opacity = String(Math.random() * 0.3 + 0.1);
    container.appendChild(p);
  }
}
initParticles();

/* ---------- STORAGE ---------- */
const STORE_KEYS = { theme: "iskander_theme", lang: "iskander_lang" };

function getStored(key) { return localStorage.getItem(key); }
function setStored(key, val) { localStorage.setItem(key, val); }

/* ---------- THEME ---------- */
function applyTheme(theme) {
  document.documentElement.classList.add("theme-transitioning");
  document.documentElement.setAttribute("data-theme", theme);
  setStored(STORE_KEYS.theme, theme);
  setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 450);
}
function getTheme() { return getStored(STORE_KEYS.theme) || "dark"; }
function toggleTheme() { applyTheme(getTheme() === "dark" ? "light" : "dark"); }

/* ---------- LANGUAGE ---------- */
function getLang() { return getStored(STORE_KEYS.lang) || "ru"; }

function applyLang(lang) {
  const safeLang = lang === "en" ? "en" : "ru";
  document.documentElement.lang = safeLang;
  setStored(STORE_KEYS.lang, safeLang);
  applyI18n(safeLang);
  applyMetaI18n(safeLang);
  applyPageSpecificI18n(safeLang);
  updateLangPills(safeLang);
  updateAccessibilityLabels(safeLang);
  renderSkills(safeLang);
  renderProjects(safeLang);
  renderProjectDetail(safeLang);
}

function applyI18n(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = I18N[lang]?.[key];
    if (!el.dataset.i18nDefaultText) el.dataset.i18nDefaultText = el.textContent;
    if (val != null) {
      el.textContent = val;
    } else if (el.dataset.i18nDefaultText) {
      el.textContent = el.dataset.i18nDefaultText;
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = I18N[lang]?.[key];
    if (!el.dataset.i18nDefaultPlaceholder) {
      el.dataset.i18nDefaultPlaceholder = el.getAttribute("placeholder") || "";
    }
    if (val != null) {
      el.setAttribute("placeholder", val);
    } else {
      el.setAttribute("placeholder", el.dataset.i18nDefaultPlaceholder);
    }
  });
}

function updateLangPills(lang) {
  document.querySelectorAll(".lang-toggle__pill").forEach(p => {
    p.classList.toggle("active", p.dataset.lang === lang);
  });
}

/* ---------- I18N DICTIONARY ---------- */
const I18N = {
  ru: {
    nav_contact: "Контакты",
    nav_about: "Обо мне",
    nav_skills: "Навыки",
    nav_portfolio: "Портфолио",
    nav_home: "Главная",

    brand_name: "Искандер",

    hero_badge: "Доступен для проектов",
    hero_hi: "Привет, я",
    hero_role: "Junior Frontend Developer",
    hero_desc: "Делаю современные сайты с чистым кодом, плавными анимациями и идеальным адаптивом. HTML, CSS, JavaScript — знаю полностью. React — активно осваиваю.",
    hero_cta: "Связаться со мной",
    hero_portfolio: "Моё портфолио",
    card_role: "Frontend Developer",
    card_link: "Открыть навыки →",
    stat_tech: "Технологий",
    stat_markup: "Изучено полностью",
    stat_react: "В процессе изучения",

    about_title: "Обо мне",
    about_subtitle: "Меня зовут Искандер. Я Junior Frontend Developer. Создаю современные интерфейсы с акцентом на качество, анимации и адаптивность.",
    about_c1_t: "Быстро и аккуратно",
    about_c1_d: "Пишу понятный, структурированный код. Собираю интерфейс поэтапно — от макета до финальной полировки.",
    about_c2_t: "Интерактив и UX",
    about_c2_d: "Формы, меню, модалки, микро-анимации. Делаю интерфейс живым и удобным для пользователя.",
    about_c3_t: "Клиентский уровень",
    about_c3_d: 'Цель — результат, который можно продавать. Визуальная полировка, ритм отступов, "дорогой" UI.',

    skills_title: "Мои навыки",
    skills_subtitle: "Нажми на карточку — откроется подробная страница навыка.",

    projects_title: "Проекты",
    projects_subtitle: "Две реальные работы: ISO AI и Шымкент Май. На главной — афиши проектов, в портфолио — полный разбор.",
    projects_more: "Портфолио",

    contact_title: "Связаться",
    contact_subtitle: "Опиши задачу — я отвечу и предложу план работ.",
    f_name: "Имя",
    f_phone: "Телефон",
    f_email: "Email",
    f_subject: "Тема",
    f_message: "Сообщение",
    ph_name: "Ваше имя",
    ph_phone: "+7 (___) ___-__-__",
    ph_email: "your@email.com",
    ph_subject: "Тема сообщения",
    ph_message: "Коротко опишите задачу...",
    err_name: "Минимум 2 символа.",
    err_phone: "Введите корректный номер.",
    err_email: "Введите корректный email.",
    err_subject: "Минимум 5 символов.",
    err_message: "Минимум 10 символов.",
    send_btn: "Отправить",
    contact_note: "Сообщение будет отправлено на мою почту.",
    msg_ok: "Сообщение отправлено! Скоро отвечу.",
    msg_err: "Ошибка отправки. Попробуйте ещё раз.",

    side_title: "Что ты получишь",
    side_1: "План работ и сроки",
    side_2: "Чистая верстка + адаптив",
    side_3: "Анимации и интерактив",
    side_4: "Полировка UI до клиентского уровня",
    side_btn: "Открыть портфолио",

    footer_text: "Спасибо за просмотр ✦",
    footer_contact: "Связаться",
    sticky_cta: "Связаться",

    p_badge: "Портфолио",
    p_title: "Мои проекты",
    p_subtitle: "Два реальных проекта с полным описанием: визуал, мобильная адаптация, RU/EN и продуманный UX.",
    p_cta: "Связаться",
    p_back: "На главную",
    p_work_title: "Портфолио",
    p_work_text: "Детальные карточки проектов: лицевая сайта, галерея проекта и описание с акцентом на мобильную оптимизацию и RU/EN.",
    exp_title: "Опыт",
    exp_text: "Junior уровень, но собираю и пишу как профессионал.",
    exp_r1: "Junior фронтенд-разработчик",
    exp_d1: "Создаю современные сайты с нуля: адаптивная вёрстка, качественные анимации, формы с валидацией, тёмная/светлая тема, RU/EN переключение, интерактивные UI-компоненты. Стек: HTML, CSS, JavaScript, React.",
    exp_r2: "Обучение и практика",
    exp_d2: "HTML/CSS/JS + React. Проекты + оттачивание навыков.",
    t_title: "Отзывы",
    t_text: "Что говорят о моей работе.",
    t1: '"Сделано быстро и аккуратно. UI современный, адаптив идеальный."',
    t1_who: "— Заказчик",
    t2: '"Коммуникация чёткая: план → этапы → результат."',
    t2_who: "— Клиент",

    tc_cta: "Связаться",
    tc_back: "Назад к Skills",
    tc_what_title: "Что я умею",

    tc_html_badge: "HTML & CSS",
    tc_html_title: "Верстка и стиль",
    tc_html_sub: "Семантика, адаптив, Flexbox/Grid, типографика, UI-ритм, аккуратная структура. Знаю HTML и CSS полностью.",
    tc_html_detail_title: "Мои знания HTML & CSS",
    tc_html_detail_text: "Я владею HTML и CSS на высоком уровне. Создаю семантическую верстку, сложные адаптивные сетки, красивые анимации и переходы. Придерживаюсь чистой структуры и BEM-методологии.",
    tc_html_c1_t: "Семантическая верстка",
    tc_html_c1_d: "Правильные теги, доступность, структурированный HTML5. Каждый элемент на своём месте.",
    tc_html_c2_t: "Адаптивный дизайн",
    tc_html_c2_d: "Flexbox, CSS Grid, медиа-запросы. Сайт идеально выглядит на любом устройстве — от телефона до десктопа.",
    tc_html_c3_t: "CSS-система и анимации",
    tc_html_c3_d: "CSS-переменные, кастомные свойства, плавные переходы и keyframe-анимации. Чистый, организованный код.",
    tc_html_c4_t: "Типографика и UI-ритм",
    tc_html_c4_d: "Модульная сетка, правильные отступы, визуальная иерархия. Каждый пиксель продуман.",
    tc_html_c5_t: "Формы и валидация",
    tc_html_c5_d: "Стилизованные формы, кастомные чекбоксы, валидация, состояния полей — всё идеально.",
    tc_html_c6_t: "Кроссбраузерность",
    tc_html_c6_d: "Работает одинаково во всех современных браузерах. Тестирую на Chrome, Firefox, Safari, Edge.",

    tc_js_badge: "JavaScript",
    tc_js_title: "JavaScript — изучен полностью",
    tc_js_sub: "DOM, события, API, валидация, UI-компоненты, localStorage, асинхронный код. Владею JavaScript на продвинутом уровне.",
    tc_js_detail_title: "Мои знания JavaScript",
    tc_js_detail_text: "JavaScript изучен мной полностью. Пишу чистую, структурированную логику. Создаю интерактивные компоненты, работаю с API, управляю состоянием через localStorage.",
    tc_js_c1_t: "DOM и события",
    tc_js_c1_d: "Полное владение DOM API. Создание, удаление, модификация элементов. Делегирование событий, обработка кликов, скроллов, ввода.",
    tc_js_c2_t: "UI-компоненты",
    tc_js_c2_d: "Модалки, табы, слайдеры, бургер-меню, аккордеоны, фильтры — всё на чистом JS без библиотек.",
    tc_js_c3_t: "Асинхронный код",
    tc_js_c3_d: "Promises, async/await, fetch API. Работа с сервером, обработка ответов и ошибок.",
    tc_js_c4_t: "LocalStorage и состояние",
    tc_js_c4_d: "Сохранение темы, языка, настроек. Персистентность данных между сессиями.",
    tc_js_c5_t: "Валидация форм",
    tc_js_c5_d: "Кастомная валидация: regex, real-time проверки, визуальные индикаторы ошибок.",
    tc_js_c6_t: "ES6+ и качество кода",
    tc_js_c6_d: "Деструктуризация, spread, модули, шаблонные строки. Чистый, читаемый код.",

    tc_react_badge: "React",
    tc_react_title: "React — в процессе изучения",
    tc_react_sub: "Активно осваиваю React: компоненты, props, state, хуки, роутинг. Иду от базы к реальным проектам.",
    tc_react_detail_title: "Мой прогресс в React",
    tc_react_detail_text: "Я на стадии активного изучения React. Уже понимаю компонентную архитектуру, работаю с хуками и создаю мини-проекты для закрепления знаний.",
    tc_react_c1_t: "Компоненты и JSX",
    tc_react_c1_d: "Функциональные компоненты, JSX-синтаксис, композиция и переиспользование.",
    tc_react_c2_t: "Хуки (Hooks)",
    tc_react_c2_d: "useState, useEffect — управление состоянием и побочными эффектами.",
    tc_react_c3_t: "Props и данные",
    tc_react_c3_d: "Передача данных между компонентами, условный рендеринг, списки.",
    tc_react_c4_t: "React Router",
    tc_react_c4_d: "Навигация между страницами в SPA. Изучаю роутинг и структуру приложения.",
    tc_react_c5_t: "Практика",
    tc_react_c5_d: "Создаю мини-проекты: todo-лист, калькулятор, компоненты UI.",
    tc_react_c6_t: "Следующие шаги",
    tc_react_c6_d: "Context API, кастомные хуки, работа с API, оптимизация рендера.",

    tc_tools_badge: "Инструменты",
    tc_tools_title: "Мои инструменты",
    tc_tools_sub: "GitHub, GitHub Copilot, Figma и VS Code — мой рабочий набор для продуктивной разработки.",
    tc_github_t: "GitHub",
    tc_github_d: "Репозитории, коммиты, ветки, Pull Request, README. Полный workflow с Git.",
    tc_copilot_t: "GitHub Copilot",
    tc_copilot_d: "Ускоряю разработку с помощью AI. Генерация кода, подсказки, быстрая реализация идей.",
    tc_figma_t: "Figma",
    tc_figma_d: "Работа с макетами: размеры, сетка, типографика, цвета. Pixel-perfect верстка.",
    tc_vscode_t: "Visual Studio Code",
    tc_vscode_d: "Мой основной редактор. Расширения, горячие клавиши, сниппеты, терминал.",
  },

  en: {
    nav_contact: "Contact",
    nav_about: "About",
    nav_skills: "Skills",
    nav_portfolio: "Portfolio",
    nav_home: "Home",

    brand_name: "Iskander",

    hero_badge: "Available for projects",
    hero_hi: "Hi, I'm",
    hero_role: "Junior Frontend Developer",
    hero_desc: "I build modern websites with clean code, smooth animations and perfect responsiveness. HTML, CSS, JavaScript — fully learned. React — actively learning.",
    hero_cta: "Contact me",
    hero_portfolio: "My portfolio",
    card_role: "Frontend Developer",
    card_link: "Open skills →",
    stat_tech: "Technologies",
    stat_markup: "Fully learned",
    stat_react: "Currently learning",

    about_title: "About me",
    about_subtitle: "My name is Iskander. I'm a Junior Frontend Developer. I create modern interfaces focused on quality, animations and responsiveness.",
    about_c1_t: "Fast & clean",
    about_c1_d: "Readable, structured code. I build interfaces step by step — from wireframe to final polish.",
    about_c2_t: "Interactivity & UX",
    about_c2_d: "Forms, menus, modals, micro-animations. Making the interface alive and user-friendly.",
    about_c3_t: "Client-ready",
    about_c3_d: "Goal: a result you can sell. Visual polish, spacing rhythm, premium UI.",

    skills_title: "My Skills",
    skills_subtitle: "Click a card — it opens a detailed skill page.",

    projects_title: "Projects",
    projects_subtitle: "Two real projects: ISO AI and Shymkent May. Teaser posters on home, full project breakdown in portfolio.",
    projects_more: "Portfolio",

    contact_title: "Contact",
    contact_subtitle: "Describe your task — I'll reply with a plan.",
    f_name: "Name",
    f_phone: "Phone",
    f_email: "Email",
    f_subject: "Subject",
    f_message: "Message",
    ph_name: "Your name",
    ph_phone: "+7 (___) ___-__-__",
    ph_email: "your@email.com",
    ph_subject: "Message subject",
    ph_message: "Briefly describe the task...",
    err_name: "At least 2 characters.",
    err_phone: "Enter a valid phone.",
    err_email: "Enter a valid email.",
    err_subject: "At least 5 characters.",
    err_message: "At least 10 characters.",
    send_btn: "Send",
    contact_note: "Message will be sent to my email.",
    msg_ok: "Message sent! I'll reply soon.",
    msg_err: "Sending error. Please try again.",

    side_title: "What you get",
    side_1: "Plan and timeline",
    side_2: "Clean layout + responsive",
    side_3: "Animations and interactivity",
    side_4: "UI polish to client-ready level",
    side_btn: "Open portfolio",

    footer_text: "Thanks for scrolling ✦",
    footer_contact: "Contact",
    sticky_cta: "Contact",

    p_badge: "Portfolio",
    p_title: "My projects",
    p_subtitle: "Two real projects with full descriptions: visual system, mobile optimization, RU/EN, and polished UX.",
    p_cta: "Contact",
    p_back: "Back to home",
    p_work_title: "Portfolio",
    p_work_text: "Detailed project cards: website front, project gallery, and project overview with mobile optimization and RU/EN.",
    exp_title: "Experience",
    exp_text: "Junior level, but I build and code like a pro.",
    exp_r1: "Junior Frontend Developer",
    exp_d1: "Building modern websites from scratch: responsive layout, quality animations, validated forms, dark/light theme, RU/EN switching, interactive UI components. Stack: HTML, CSS, JavaScript, React.",
    exp_r2: "Learning & Practice",
    exp_d2: "HTML/CSS/JS + React. Projects + skill sharpening.",
    t_title: "Testimonials",
    t_text: "What people say about my work.",
    t1: '"Fast and clean. Modern UI and perfect responsive behavior."',
    t1_who: "— Client",
    t2: '"Clear communication: plan → milestones → result."',
    t2_who: "— Client",

    tc_cta: "Contact",
    tc_back: "Back to Skills",
    tc_what_title: "What I know",

    tc_html_badge: "HTML & CSS",
    tc_html_title: "Layout & styling",
    tc_html_sub: "Semantics, responsive, Flexbox/Grid, typography, UI rhythm, clean structure. I know HTML and CSS completely.",
    tc_html_detail_title: "My HTML & CSS knowledge",
    tc_html_detail_text: "I have advanced HTML & CSS skills. I create semantic markup, complex responsive grids, beautiful animations and transitions. I follow clean structure and BEM methodology.",
    tc_html_c1_t: "Semantic markup",
    tc_html_c1_d: "Correct tags, accessibility, structured HTML5. Every element in its place.",
    tc_html_c2_t: "Responsive design",
    tc_html_c2_d: "Flexbox, CSS Grid, media queries. The site looks perfect on any device — from phone to desktop.",
    tc_html_c3_t: "CSS system & animations",
    tc_html_c3_d: "CSS variables, custom properties, smooth transitions and keyframe animations. Clean, organized code.",
    tc_html_c4_t: "Typography & UI rhythm",
    tc_html_c4_d: "Modular grid, proper spacing, visual hierarchy. Every pixel is intentional.",
    tc_html_c5_t: "Forms & validation",
    tc_html_c5_d: "Styled forms, custom checkboxes, validation, field states — everything polished.",
    tc_html_c6_t: "Cross-browser",
    tc_html_c6_d: "Works consistently across all modern browsers. Tested on Chrome, Firefox, Safari, Edge.",

    tc_js_badge: "JavaScript",
    tc_js_title: "JavaScript — fully learned",
    tc_js_sub: "DOM, events, API, validation, UI components, localStorage, async code. Advanced JavaScript skills.",
    tc_js_detail_title: "My JavaScript knowledge",
    tc_js_detail_text: "I've fully learned JavaScript. I write clean, structured logic. I create interactive components, work with APIs, manage state through localStorage.",
    tc_js_c1_t: "DOM & events",
    tc_js_c1_d: "Full DOM API mastery. Creating, removing, modifying elements. Event delegation, click/scroll/input handling.",
    tc_js_c2_t: "UI components",
    tc_js_c2_d: "Modals, tabs, sliders, burger menus, accordions, filters — all in vanilla JS without libraries.",
    tc_js_c3_t: "Async code",
    tc_js_c3_d: "Promises, async/await, fetch API. Server communication, response and error handling.",
    tc_js_c4_t: "LocalStorage & state",
    tc_js_c4_d: "Saving theme, language, settings. Data persistence between sessions.",
    tc_js_c5_t: "Form validation",
    tc_js_c5_d: "Custom validation: regex, real-time checks, visual error indicators.",
    tc_js_c6_t: "ES6+ & code quality",
    tc_js_c6_d: "Destructuring, spread, modules, template literals. Clean, readable code.",

    tc_react_badge: "React",
    tc_react_title: "React — currently learning",
    tc_react_sub: "Actively learning React: components, props, state, hooks, routing. Going from basics to real projects.",
    tc_react_detail_title: "My React progress",
    tc_react_detail_text: "I'm actively learning React. I already understand component architecture, work with hooks and create mini-projects to reinforce my knowledge.",
    tc_react_c1_t: "Components & JSX",
    tc_react_c1_d: "Functional components, JSX syntax, composition and reuse.",
    tc_react_c2_t: "Hooks",
    tc_react_c2_d: "useState, useEffect — state management and side effects.",
    tc_react_c3_t: "Props & data",
    tc_react_c3_d: "Data passing between components, conditional rendering, lists.",
    tc_react_c4_t: "React Router",
    tc_react_c4_d: "SPA navigation. Learning routing and app structure.",
    tc_react_c5_t: "Practice",
    tc_react_c5_d: "Building mini-projects: todo list, calculator, UI components.",
    tc_react_c6_t: "Next steps",
    tc_react_c6_d: "Context API, custom hooks, API integration, render optimization.",

    tc_tools_badge: "Tools",
    tc_tools_title: "My tools",
    tc_tools_sub: "GitHub, GitHub Copilot, Figma and VS Code — my workflow kit for productive development.",
    tc_github_t: "GitHub",
    tc_github_d: "Repositories, commits, branches, Pull Requests, README. Full Git workflow.",
    tc_copilot_t: "GitHub Copilot",
    tc_copilot_d: "Speeding up development with AI. Code generation, suggestions, quick MVP building.",
    tc_figma_t: "Figma",
    tc_figma_d: "Working with designs: extracting sizes, grid, typography, colors. Pixel-perfect implementation.",
    tc_vscode_t: "Visual Studio Code",
    tc_vscode_d: "My main editor. Extensions, shortcuts, snippets, terminal.",
  }
};

const ACCESSIBILITY_LABELS = {
  ru: {
    langToggle: "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u044f\u0437\u044b\u043a\u0430",
    themeToggle: "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u0442\u0435\u043c\u044b",
    menu: "\u041c\u0435\u043d\u044e",
    tooltipClose: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c",
  },
  en: {
    langToggle: "Switch language",
    themeToggle: "Switch theme",
    menu: "Menu",
    tooltipClose: "Close",
  }
};

const META_I18N_EN = {
  "index.html": {
    title: "ISO - Iskander | Frontend Developer",
    description: "ISO - Iskander, Junior Frontend Developer. HTML, CSS, JavaScript, React, Git/GitHub, Figma, VS Code."
  },
  "portfolio.html": {
    title: "Portfolio - ISO | Iskander",
    description: "ISO - Iskander. Portfolio, projects, and experience."
  },
  "project.html": {
    title: "Project - ISO | Iskander",
    description: "ISO - Iskander. Project details, gallery, and links."
  },
  "html-css.html": {
    title: "HTML & CSS - ISO | Iskander",
    description: "ISO - Iskander. HTML & CSS skills: semantic markup, responsive design, animations."
  },
  "javascript.html": {
    title: "JavaScript - ISO | Iskander",
    description: "ISO - Iskander. JavaScript skills: DOM, events, async flows, and UI components."
  },
  "react.html": {
    title: "React - ISO | Iskander",
    description: "ISO - Iskander. React skills: components, hooks, routing, and continuous learning."
  },
  "tools.html": {
    title: "Tools - ISO | Iskander",
    description: "ISO - Iskander. Development tools: GitHub, Copilot, Figma, VS Code."
  },
};

const PAGE_SPECIFIC_I18N_EN = {
  "html-css.html": {
    text: {
      ".tech-detail__level-label": "Proficiency level",
      ".tech-philosophy__item:nth-child(1) .tech-philosophy__heading": "Semantics first",
      ".tech-philosophy__item:nth-child(1) .tech-philosophy__text": "Every HTML tag has meaning. Proper document structure is the foundation of accessibility, SEO, and maintainable code. I always start with markup that is clear for both people and machines.",
      ".tech-philosophy__item:nth-child(2) .tech-philosophy__heading": "Design system in CSS",
      ".tech-philosophy__item:nth-child(2) .tech-philosophy__text": "Custom Properties, modular typography, and thoughtful spacing tokens. For me, CSS is a system, not chaos. Every variable and class is part of one visual language.",
      ".tech-philosophy__item:nth-child(3) .tech-philosophy__heading": "Mobile-first approach",
      ".tech-philosophy__item:nth-child(3) .tech-philosophy__text": "Mobile first, desktop second. It is not just a methodology - it guarantees the site works perfectly on any screen, from 320px to 4K.",
      ".tech-stack__title": "Tech stack",
      ".tech-stack__hint": "Click a technology to see details."
    },
    tooltips: [
      "HTML5 - The markup language and foundation of every web page. It defines structure: headings, paragraphs, images, links, and forms.",
      "CSS3 - The style language for visual design: colors, typography, spacing, animations, shadows, and gradients.",
      "Flexbox - A one-dimensional layout system for aligning and distributing elements in rows or columns.",
      "CSS Grid - A two-dimensional grid system for building complex layouts with full placement control.",
      "BEM - A CSS naming methodology (Block, Element, Modifier) for scalable and conflict-free styles.",
      "Custom Properties - Native CSS variables. Define once and reuse everywhere for easy theming and consistency.",
      "Animations - Transitions and keyframes that make interfaces feel alive and interactive.",
      "Media Queries - CSS rules that apply by viewport size to build responsive interfaces across devices.",
      "ARIA - Accessibility attributes that help assistive technologies interpret and navigate UI elements.",
      "Responsive Design - An approach where layout, typography, and media adapt to any screen size."
    ]
  },
  "javascript.html": {
    text: {
      ".tech-detail__level-label": "Proficiency level",
      ".tech-philosophy__item:nth-child(1) .tech-philosophy__heading": "Clean and readable code",
      ".tech-philosophy__item:nth-child(1) .tech-philosophy__text": "Each function has a single responsibility. Variable names are explicit. Code is organized into clear modules so another developer can understand the logic quickly.",
      ".tech-philosophy__item:nth-child(2) .tech-philosophy__heading": "Performance first",
      ".tech-philosophy__item:nth-child(2) .tech-philosophy__text": "Debounce, throttle, requestAnimationFrame, and lazy loading. I optimize DOM updates, reduce reflow/repaint, and keep event handling efficient.",
      ".tech-philosophy__item:nth-child(3) .tech-philosophy__heading": "Reliable error handling",
      ".tech-philosophy__item:nth-child(3) .tech-philosophy__text": "try/catch for async operations, graceful degradation, and robust input validation. The app does not crash - it informs the user and stays stable.",
      ".tech-stack__title": "Tech stack",
      ".tech-stack__hint": "Click a technology to see details."
    },
    tooltips: [
      "ES6+ - Modern JavaScript features: arrow functions, destructuring, spread, template literals, let/const, classes.",
      "DOM API - Browser interface for reading and modifying page structure, content, attributes, and classes.",
      "Fetch API - Built-in API for HTTP requests, JSON handling, and network communication with promises.",
      "Async/Await - A clear way to write async logic that reads like synchronous code.",
      "LocalStorage - Persistent browser storage for theme, language, preferences, and other lightweight state.",
      "JSON - Standard text format for data exchange between frontend and backend.",
      "Regex - Pattern matching for validating and processing text like emails, phones, and user input.",
      "Event Delegation - Attach one listener to a parent to handle child events efficiently.",
      "Modules - Split code into reusable files with import/export for maintainability.",
      "EmailJS - Client-side email delivery for contact forms without a custom backend."
    ]
  },
  "react.html": {
    text: {
      ".tech-detail__level-label": "Proficiency level",
      ".tech-philosophy__item:nth-child(1) .tech-philosophy__heading": "Component mindset",
      ".tech-philosophy__item:nth-child(1) .tech-philosophy__text": "I split interfaces into reusable components. Each block is isolated, predictable, and easy to scale as the product grows.",
      ".tech-philosophy__item:nth-child(2) .tech-philosophy__heading": "Practice through projects",
      ".tech-philosophy__item:nth-child(2) .tech-philosophy__text": "I do not only read docs - I build real mini-apps: todo list, calculator, UI components, and focused React experiments.",
      ".tech-philosophy__item:nth-child(3) .tech-philosophy__heading": "Continuous growth",
      ".tech-philosophy__item:nth-child(3) .tech-philosophy__text": "Context API, custom hooks, external APIs, and render optimization are my next milestones. The growth path is systematic.",
      ".tech-stack__title": "Tech stack",
      ".tech-stack__hint": "Click a technology to see details."
    },
    tooltips: [
      "React - A component-based JavaScript library for building modern user interfaces.",
      "JSX - Syntax extension that lets you describe UI structure directly in JavaScript.",
      "Hooks - Functions like useState and useEffect that add state and side effects to functional components.",
      "React Router - Navigation library for SPA routing without full page reloads.",
      "Components - Reusable building blocks: buttons, cards, forms, and full sections.",
      "Props - Read-only inputs passed from parent to child components.",
      "State - Internal component data that triggers reactive re-rendering when updated.",
      "useEffect - Hook for side effects such as fetch calls, subscriptions, and timers."
    ]
  },
  "tools.html": {
    text: {
      ".tech-detail__title": "My workflow",
      ".tech-detail__text": "Productive development is not only code - it is the right toolchain. My workflow combines Git for version control, VS Code as the main editor, Figma for design handoff, and GitHub Copilot for faster iteration. Everything is integrated into one process that keeps delivery fast, clean, and organized.",
      ".tech-philosophy__item:nth-child(1) .tech-philosophy__heading": "Version control",
      ".tech-philosophy__item:nth-child(1) .tech-philosophy__text": "Git and GitHub are the backbone of my process. Every change is tracked, every commit is intentional, and history stays clean.",
      ".tech-philosophy__item:nth-child(2) .tech-philosophy__heading": "Well-tuned environment",
      ".tech-philosophy__item:nth-child(2) .tech-philosophy__text": "VS Code with curated extensions, snippets, and shortcuts. Emmet, Live Server, Prettier, and ESLint are configured for speed and quality.",
      ".tech-philosophy__item:nth-child(3) .tech-philosophy__heading": "AI as an assistant",
      ".tech-philosophy__item:nth-child(3) .tech-philosophy__text": "GitHub Copilot accelerates repetitive work and boilerplate, but every suggestion is reviewed and validated by me.",
      ".tech-stack__title": "Toolset",
      ".tech-stack__hint": "Click a tool to see details."
    },
    tooltips: [
      "Git - Distributed version control for tracking code history, branching, and safe collaboration.",
      "GitHub - Cloud platform for repositories, pull requests, issues, actions, and team workflows.",
      "VS Code - Fast editor with extensions, integrated terminal, debugging, and strong DX.",
      "Figma - Design collaboration platform used for handoff, spacing, typography, and visual specs.",
      "Copilot - AI coding assistant for generating boilerplate, suggestions, and faster prototyping.",
      "Emmet - Abbreviation-based HTML/CSS expansion for dramatically faster markup authoring.",
      "Live Server - Local dev server with auto-reload for instant visual feedback while editing.",
      "Prettier - Opinionated formatter that keeps code style consistent across the project.",
      "ESLint - Static analysis tool that catches JavaScript problems before runtime.",
      "Terminal - Command-line interface for Git, npm scripts, tooling, and automation."
    ]
  }
};

function getPageName() {
  const page = window.location.pathname.split("/").pop();
  return page || "index.html";
}

function applyMetaI18n(lang) {
  const page = getPageName();
  const enMeta = META_I18N_EN[page];
  const descMeta = document.querySelector('meta[name="description"]');

  if (!document.documentElement.dataset.defaultTitle) {
    document.documentElement.dataset.defaultTitle = document.title;
  }
  if (descMeta && !descMeta.dataset.defaultContent) {
    descMeta.dataset.defaultContent = descMeta.getAttribute("content") || "";
  }

  if (lang === "en" && enMeta) {
    document.title = enMeta.title;
    if (descMeta) descMeta.setAttribute("content", enMeta.description);
    return;
  }

  if (document.documentElement.dataset.defaultTitle) {
    document.title = document.documentElement.dataset.defaultTitle;
  }
  if (descMeta && descMeta.dataset.defaultContent) {
    descMeta.setAttribute("content", descMeta.dataset.defaultContent);
  }
}

function applyPageSpecificI18n(lang) {
  const cfg = PAGE_SPECIFIC_I18N_EN[getPageName()];
  if (!cfg) return;

  Object.entries(cfg.text || {}).forEach(([selector, enText]) => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (!el.dataset.i18nDefaultText) el.dataset.i18nDefaultText = el.textContent;
    el.textContent = lang === "en" ? enText : el.dataset.i18nDefaultText;
  });

  const pills = document.querySelectorAll(".tech-stack__pill[data-tooltip]");
  if (!pills.length) return;
  pills.forEach((pill, index) => {
    if (!pill.dataset.i18nDefaultTooltip) {
      pill.dataset.i18nDefaultTooltip = pill.getAttribute("data-tooltip") || "";
    }
    if (lang === "en" && cfg.tooltips?.[index]) {
      pill.setAttribute("data-tooltip", cfg.tooltips[index]);
    } else {
      pill.setAttribute("data-tooltip", pill.dataset.i18nDefaultTooltip);
    }
  });
}

function updateAccessibilityLabels(lang) {
  const labels = ACCESSIBILITY_LABELS[lang] || ACCESSIBILITY_LABELS.ru;
  const langToggle = document.getElementById("langToggle");
  const themeToggle = document.getElementById("themeToggle");
  const burger = document.getElementById("burger");
  const tooltipClose = document.querySelector(".pill-tooltip__close");
  const projectQuickClose = document.querySelector(".project-quick-modal__close");

  if (langToggle) langToggle.setAttribute("aria-label", labels.langToggle);
  if (themeToggle) themeToggle.setAttribute("aria-label", labels.themeToggle);
  if (burger) burger.setAttribute("aria-label", labels.menu);
  if (tooltipClose) tooltipClose.setAttribute("aria-label", labels.tooltipClose);
  if (projectQuickClose) projectQuickClose.setAttribute("aria-label", labels.tooltipClose);
}

/* ---------- SKILL IMAGES ---------- */
const SKILL_IMAGES = {
  html: "image/material-icon-theme-html-24px.svg",
  css: "image/skill-icons-css-24px.svg",
  js: "image/vscode-icons-file-type-js-official-24px.svg",
  react: "image/devicon-react-24px.svg",
  git: "image/material-icon-theme-git-24px.svg",
  copilot: "image/devicon-plain-githubcopilot-64px.svg",
  figma: "image/devicon-figma-24px.svg",
  vscode: "image/logos-visual-studio-code-24px.svg"
};

/* Fallback inline SVG for icons without image files */
const SKILL_ICONS_SVG = {
  git: `<svg viewBox="0 0 40 40" fill="none"><path d="M37.2 18.4L21.6 2.8a2.8 2.8 0 00-4 0l-3.2 3.2 4 4a3.4 3.4 0 014.2 4.2l3.8 3.8a3.4 3.4 0 11-2 2l-3.6-3.6v9.4a3.4 3.4 0 11-2.8-.2v-9.4a3.4 3.4 0 01-1.8-4.4l-4-4L2.8 17.6a2.8 2.8 0 000 4l15.6 15.6a2.8 2.8 0 004 0l14.8-14.8a2.8 2.8 0 000-4z" fill="#F05032"/></svg>`
};

/* ---------- SKILLS DATA ---------- */
const SKILLS = [
  {
    key: "html",
    cls: "skill--html",
    name: "HTML",
    level: { ru: "Полностью", en: "Full" },
    href: "html-css.html"
  },
  {
    key: "css",
    cls: "skill--css",
    name: "CSS",
    level: { ru: "Полностью", en: "Full" },
    href: "html-css.html"
  },
  {
    key: "js",
    cls: "skill--js",
    name: "JavaScript",
    level: { ru: "Полностью", en: "Full" },
    href: "javascript.html"
  },
  {
    key: "react",
    cls: "skill--react",
    name: "React",
    level: { ru: "Изучаю", en: "Learning" },
    href: "react.html"
  },
  {
    key: "git",
    cls: "skill--git",
    name: "GitHub",
    level: { ru: "Уверенно", en: "Confident" },
    href: "tools.html"
  },
  {
    key: "copilot",
    cls: "skill--copilot",
    name: "Copilot",
    level: { ru: "Активно", en: "Active" },
    href: "tools.html"
  },
  {
    key: "figma",
    cls: "skill--figma",
    name: "Figma",
    level: { ru: "Уверенно", en: "Confident" },
    href: "tools.html"
  },
  {
    key: "vscode",
    cls: "skill--vscode",
    name: "VS Code",
    level: { ru: "Ежедневно", en: "Daily" },
    href: "tools.html"
  }
];

function renderSkills(lang) {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  SKILLS.forEach((s, i) => {
    const a = document.createElement("a");
    a.className = `skill ${s.cls}`;
    a.href = s.href;
    a.style.animationDelay = `${i * 70}ms`;

    const iconHTML = SKILL_IMAGES[s.key]
      ? `<img class="skill__img" src="${SKILL_IMAGES[s.key]}" alt="${s.name}" width="56" height="56" loading="lazy" />`
      : (SKILL_ICONS_SVG[s.key] || '');

    a.innerHTML = `
      <div class="skill__icon-wrap">${iconHTML}</div>
      <div class="skill__name">${s.name}</div>
    `;
    grid.appendChild(a);
  });
}

/* ---------- PROJECTS DATA ---------- */
const PROJECTS = [
  {
    key: "iso-ai",
    tone: "iso-ai",
    title: { ru: "ISO AI", en: "ISO AI" },
    logoText: "ISO",
    logoSub: { ru: "AI", en: "AI" },
    cover: "image/iso-ai-cover.svg",
    gallery: {
      ru: ["Главный экран", "Галерея проекта", "Мобильная версия"],
      en: ["Main screen", "Project gallery", "Mobile version"]
    },
    teaser: {
      ru: "AI-платформа с современным интерфейсом, упором на скорость сценариев и понятный UX.",
      en: "AI platform with a modern interface, fast user flows, and clear UX."
    },
    overview: {
      ru: "Полноценный проект с продуманной архитектурой экранов и компонентным UI. Проект адаптирован под мобильные устройства, отточен по визуалу и подготовлен в двух языках: русский и английский.",
      en: "A full project with thoughtful screen architecture and component-based UI. It is fully optimized for mobile devices, visually polished, and available in two languages: Russian and English."
    },
    highlights: {
      ru: [
        "Mobile-first адаптация: корректная верстка и удобная навигация на смартфонах и планшетах.",
        "RU/EN локализация интерфейса с аккуратной подачей контента на обоих языках.",
        "Оптимизация UI: быстрые состояния, чистая структура и приятные микровзаимодействия."
      ],
      en: [
        "Mobile-first adaptation: clean layout and smooth navigation on phones and tablets.",
        "RU/EN localization with consistent, readable content on both languages.",
        "UI optimization: fast states, clean structure, and polished micro-interactions."
      ]
    },
    tags: ["AI UI", "Responsive", "RU/EN", "UX", "Frontend"],
    repo: "https://github.com/ISSA944/ISO-AI",
    readme: "https://github.com/ISSA944/ISO-AI#readme"
  },
  {
    key: "shymkent",
    tone: "shymkent",
    title: { ru: "Шымкент Май", en: "Shymkent May" },
    logoText: "SM",
    logoSub: { ru: "Shymkent May", en: "Shymkent May" },
    cover: "image/image.png",
    gallery: {
      ru: ["Лицевая сайта", "Галерея проекта", "О проекте"],
      en: ["Website front", "Project gallery", "About project"]
    },
    teaser: {
      ru: "Проект с акцентом на визуальную подачу, адаптив и аккуратную структуру контента.",
      en: "A project focused on visual presentation, responsiveness, and clean content structure."
    },
    overview: {
      ru: "Проработанный проект с современным UI и цельной стилистикой. Отдельно уделено внимание мобильной версии, плавному поведению интерфейса и двуязычной подаче (RU/EN), чтобы продукт смотрелся цельно на любом устройстве.",
      en: "A polished project with modern UI and cohesive visual language. Extra focus was placed on mobile behavior, smooth interface interactions, and bilingual delivery (RU/EN) so the product feels consistent on any device."
    },
    highlights: {
      ru: [
        "Гибкая адаптивная сетка: интерфейс стабилен на всех ключевых разрешениях.",
        "Двуязычие RU/EN для удобного использования в разной аудитории.",
        "Визуальная полировка: ритм отступов, типографика и анимации в едином стиле."
      ],
      en: [
        "Flexible responsive grid: stable interface across key breakpoints.",
        "RU/EN bilingual experience for different target audiences.",
        "Visual polish: spacing rhythm, typography, and animations in one style."
      ]
    },
    tags: ["UI/UX", "Mobile", "Bilingual", "Animations", "Frontend"],
    repo: "https://github.com/ISSA944/Shymkent",
    readme: "https://github.com/ISSA944/Shymkent#readme"
  }
];

function getProjectHomeSummary(project, lang) {
  const safeLang = lang === "en" ? "en" : "ru";
  const summaries = {
    "iso-ai": {
      ru: "AI-платформа ISO AI: быстрые сценарии, чистый интерфейс и сильная мобильная адаптация.",
      en: "ISO AI platform: fast user flows, clean interface, and strong mobile adaptation."
    },
    "shymkent": {
      ru: "Шымкент Май: современная подача бренда, аккуратная структура контента и адаптив под мобильные устройства.",
      en: "Shymkent May: modern brand presentation, clean content structure, and responsive mobile layout."
    }
  };
  return summaries[project.key]?.[safeLang] || project.teaser?.[safeLang] || project.teaser?.ru || "";
}

function getProjectQuickSummary(project, lang) {
  const safeLang = lang === "en" ? "en" : "ru";
  const summaries = {
    "iso-ai": {
      ru: "ISO AI — проект с упором на скорость, понятный UX и логичную структуру экранов. Интерфейс сделан так, чтобы пользователь быстро находил нужный инструмент и без лишних шагов переходил к результату.",
      en: "ISO AI focuses on speed, clear UX, and a logical screen structure. The interface helps users quickly find the right tool and reach results with minimal steps."
    },
    "shymkent": {
      ru: "Шымкент Май — коммерческий проект, где важны доверие к бренду и визуальная подача продукта. Основной акцент сделан на читабельности, ритме секций и удобстве использования на телефонах.",
      en: "Shymkent May is a commercial project focused on brand trust and product presentation. The core focus is readability, section rhythm, and smooth phone usability."
    }
  };
  return summaries[project.key]?.[safeLang] || project.overview?.[safeLang] || project.overview?.ru || project.teaser?.[safeLang] || project.teaser?.ru || "";
}

function getProjectQuickLabels(lang) {
  const safeLang = lang === "en" ? "en" : "ru";
  return safeLang === "en"
    ? {
        badge: "Short project overview",
        more: "More details in my portfolio",
        close: "Close"
      }
    : {
        badge: "Кратко о проекте",
        more: "Подробнее в моём портфолио",
        close: "Закрыть"
      };
}

function closeProjectQuickModal() {
  const modal = document.getElementById("projectQuickModal");
  if (!modal) return;
  modal.classList.remove("is-visible");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openProjectQuickModal(projectKey, lang) {
  const modal = document.getElementById("projectQuickModal");
  if (!modal) return;

  const safeLang = lang === "en" ? "en" : "ru";
  const labels = getProjectQuickLabels(safeLang);
  const project = PROJECTS.find((item) => item.key === projectKey);
  if (!project) return;

  const badgeEl = document.getElementById("projectQuickBadge");
  const titleEl = document.getElementById("projectQuickTitle");
  const textEl = document.getElementById("projectQuickText");
  const listEl = document.getElementById("projectQuickList");
  const linkEl = document.getElementById("projectQuickLink");
  const closeBtn = document.getElementById("projectQuickCloseBtn");
  const closeButtons = modal.querySelectorAll("[data-close-project-quick]");

  const title = project.title?.[safeLang] || project.title?.ru || "";
  const summary = getProjectQuickSummary(project, safeLang);
  const points = (project.highlights?.[safeLang] || project.highlights?.ru || []).slice(0, 2);

  if (badgeEl) badgeEl.textContent = labels.badge;
  if (titleEl) titleEl.textContent = title;
  if (textEl) textEl.textContent = summary;
  if (closeBtn) closeBtn.textContent = labels.close;
  closeButtons.forEach((btn) => btn.setAttribute("aria-label", labels.close));

  if (linkEl) {
    linkEl.textContent = labels.more;
    linkEl.href = `portfolio.html#project-${project.key}`;
  }

  if (listEl) {
    listEl.innerHTML = "";
    points.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      listEl.appendChild(li);
    });
  }

  modal.classList.add("is-visible");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function initProjectQuickPreview(grid, lang) {
  const modal = document.getElementById("projectQuickModal");
  if (!grid || !modal) return;

  if (!grid.dataset.quickPreviewBound) {
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-project-preview]");
      if (!btn) return;
      const projectKey = btn.getAttribute("data-open-project-preview");
      if (!projectKey) return;
      openProjectQuickModal(projectKey, getLang());
    });
    grid.dataset.quickPreviewBound = "1";
  }

  if (!modal.dataset.quickPreviewBound) {
    modal.querySelectorAll("[data-close-project-quick]").forEach((btn) => {
      btn.addEventListener("click", closeProjectQuickModal);
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProjectQuickModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-visible")) {
        closeProjectQuickModal();
      }
    });
    modal.dataset.quickPreviewBound = "1";
  }

  const labels = getProjectQuickLabels(lang);
  const badgeEl = document.getElementById("projectQuickBadge");
  const linkEl = document.getElementById("projectQuickLink");
  const closeBtn = document.getElementById("projectQuickCloseBtn");
  if (badgeEl) badgeEl.textContent = labels.badge;
  if (linkEl) linkEl.textContent = labels.more;
  if (closeBtn) closeBtn.textContent = labels.close;
}

function renderProjects(lang) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const safeLang = lang === "en" ? "en" : "ru";
  const isIndex = getPageName().toLowerCase() === "index.html";
  const labels = safeLang === "en"
    ? {
        teaser: "Portfolio",
        about: "About project",
        plus: "Open project overview"
      }
    : {
        teaser: "Портфолио",
        about: "О проекте",
        plus: "Открыть страницу проекта"
      };

  grid.classList.toggle("projects-grid--preview", isIndex);
  grid.classList.toggle("projects-grid--portfolio", !isIndex);

  grid.innerHTML = "";
  PROJECTS.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = `project project--${p.tone} ${isIndex ? "project--home" : "project--full"}`;
    card.id = `project-${p.key}`;
    card.style.transitionDelay = `${i * 80}ms`;

    const title = p.title[safeLang] || p.title.ru;
    const teaser = p.teaser[safeLang] || p.teaser.ru;
    const homeSummary = getProjectHomeSummary(p, safeLang);
    const projectHref = `project.html?project=${encodeURIComponent(p.key)}`;
    const safeCoverSrc = p.cover ? encodeURI(p.cover) : "";
    const homeLogoSub = p.key === "shymkent"
      ? title
      : (p.logoSub?.[safeLang] || p.logoSub?.ru || title);
    const homeLogoMarkup = `<span class="project-home__logo-mark">${p.logoText || "ISO"}</span><span class="project-home__logo-sub">${homeLogoSub}</span>`;
    if (isIndex) {
      card.innerHTML = `
        <div class="project-home__top">
          <div class="project-home__logo">${homeLogoMarkup}</div>
          <button class="project-home__plus" type="button" aria-label="${labels.plus}" data-open-project-preview="${p.key}">
            <span class="project-home__plus-line"></span>
            <span class="project-home__plus-line"></span>
          </button>
        </div>
        <div class="project-home__body">
          <div class="project-home__title">${title}</div>
          <p class="project-home__text">${homeSummary}</p>
          <div class="project-home__actions">
            <button class="project__btn project__btn--accent project-home__about" type="button" data-open-project-preview="${p.key}">
              ${labels.about}
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
      return;
    }
    const plusBtn = `<a class="project__plus" href="${projectHref}" aria-label="${labels.plus}">
        <span class="project__plus-line"></span>
        <span class="project__plus-line"></span>
      </a>`;
    const actions = `<div class="project__actions ${isIndex ? "project__actions--preview" : ""}">
        <a class="project__btn project__btn--accent" href="${projectHref}">${labels.about}</a>
      </div>`;

    card.innerHTML = `
      <div class="project__thumb">
        ${safeCoverSrc ? `<img class="project__cover-img" src="${safeCoverSrc}" alt="${title} cover" loading="lazy" decoding="async">` : ""}
        <div class="project__thumb-mask"></div>
        ${plusBtn}
        <div class="project__thumb-content">
          <span class="project__thumb-note">${labels.teaser}</span>
          <div class="project__thumb-title">${title}</div>
        </div>
      </div>
      <div class="project__body">
        <div class="project__title">${title}</div>
        <div class="project__text">${teaser}</div>
        <div class="project__tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        ${actions}
      </div>
    `;
    grid.appendChild(card);
  });

  if (isIndex) {
    initProjectQuickPreview(grid, safeLang);
  }
}

function renderProjectDetail(lang) {
  const root = document.getElementById("projectDetail");
  if (!root) return;

  const safeLang = lang === "en" ? "en" : "ru";
  const labels = safeLang === "en"
    ? {
        badge: "Portfolio",
        gallery: "Project gallery",
        front: "Website front",
        about: "About project",
        highlights: "What is done",
        tags: "Stack",
        github: "Project link",
        readme: "Readme",
        back: "Back to portfolio"
      }
    : {
        badge: "Портфолио",
        gallery: "Галерея проекта",
        front: "Лицевая сайта",
        about: "О проекте",
        highlights: "Что сделано",
        tags: "Стек",
        github: "Ссылка на проект",
        readme: "Readme",
        back: "Назад в портфолио"
      };

  const params = new URLSearchParams(window.location.search);
  const key = (params.get("project") || "").toLowerCase().trim();
  const project = PROJECTS.find(item => item.key === key) || PROJECTS[0];
  const title = project.title[safeLang] || project.title.ru;
  const teaser = project.teaser[safeLang] || project.teaser.ru;
  const overview = project.overview[safeLang] || project.overview.ru;
  const highlights = project.highlights[safeLang] || project.highlights.ru;
  const gallery = project.gallery?.[safeLang] || project.gallery?.ru || [];
  const logoSub = project.key === "shymkent"
    ? title
    : (project.logoSub?.[safeLang] || project.logoSub?.ru || title);
  const safeLogoSrc = project.logoSrc ? encodeURI(project.logoSrc) : "";
  const safeCoverSrc = project.cover ? encodeURI(project.cover) : "";
  const logoMarkup = project.logoSrc
    ? `<img class="project-detail__logo-img" src="${safeLogoSrc}" alt="${title} logo" loading="lazy" decoding="async">`
    : `<span class="project-detail__logo-chip">${project.logoText || "ISO"}</span>`;
  const detailCoverMarkup = safeCoverSrc
    ? `<img class="project-detail__cover-img" src="${safeCoverSrc}" alt="${title} cover" loading="lazy" decoding="async">`
    : "";
  const descMeta = document.querySelector('meta[name="description"]');

  if (safeLang === "en") {
    document.title = `${title} - Project | ISO`;
    if (descMeta) descMeta.setAttribute("content", `${title}. ${teaser}`);
  } else {
    document.title = `${title} - Проект | ISO`;
    if (descMeta) descMeta.setAttribute("content", `${title}. ${teaser}`);
  }

  root.className = `project-detail project-detail--${project.tone}`;
  root.innerHTML = `
    <article class="project-detail__hero" data-anim="fade-up">
      <div class="project-detail__main">
        <span class="project-detail__badge">${labels.badge}</span>
        <h1 class="project-detail__title">${title}</h1>
        <p class="project-detail__teaser">${teaser}</p>
        <div class="project-detail__actions">
          <a class="btn btn--primary" href="${project.repo}" target="_blank" rel="noopener">${labels.github}</a>
          <a class="btn btn--outline" href="${project.readme}" target="_blank" rel="noopener">${labels.readme}</a>
          <a class="btn btn--outline" href="portfolio.html">${labels.back}</a>
        </div>
      </div>
      <div class="project-detail__preview">
        ${detailCoverMarkup}
        <div class="project-detail__preview-brand">${logoMarkup}<span>${logoSub}</span></div>
      </div>
    </article>
    <section class="project-detail__block" data-anim="fade-up">
      <h2 class="project-detail__block-title">${labels.front}</h2>
      <div class="project-detail__front">
        ${detailCoverMarkup}
        <div class="project-detail__front-head">${logoMarkup}<span>${title}</span></div>
      </div>
    </section>
    <section class="project-detail__block" data-anim="fade-up">
      <h2 class="project-detail__block-title">${labels.gallery}</h2>
      <div class="project-detail__gallery">
        ${gallery.map((item, idx) => `
          <article class="project-detail__gallery-card">
            <span class="project-detail__gallery-no">0${idx + 1}</span>
            <h3>${item}</h3>
            <p>${teaser}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="project-detail__block" data-anim="fade-up">
      <h2 class="project-detail__block-title">${labels.about}</h2>
      <p class="project-detail__about">${overview}</p>
      <h3 class="project-detail__sub-title">${labels.highlights}</h3>
      <ul class="project-detail__points">${highlights.map(item => `<li>${item}</li>`).join("")}</ul>
      <h3 class="project-detail__sub-title">${labels.tags}</h3>
      <div class="project-detail__tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
    </section>
  `;
}

/* ---------- PHONE MASK ---------- */
function phoneMask(input) {
  input.addEventListener("input", () => {
    // Allow only +, spaces, and digits
    input.value = input.value.replace(/[^\d\s\+]/g, "");
  });
}

/* ---------- FORM VALIDATION + EMAILJS ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const phone = document.getElementById("phone");
  if (phone) phoneMask(phone);

  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } catch (e) {
    console.warn("EmailJS not loaded:", e);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const lang = getLang();
    const btn = document.getElementById("sendBtn");
    const status = document.getElementById("formStatus");

    let ok = true;
    const fields = [
      { id: "name",    validate: v => v.trim().length >= 2 },
      { id: "email",   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: "subject", validate: v => v.trim().length >= 5 },
      { id: "message", validate: v => v.trim().length >= 10 },
    ];

    const phoneVal = document.getElementById("phone")?.value.replace(/\D/g, "") || "";
    const phoneField = document.getElementById("phone")?.closest(".field");
    if (phoneField) {
      if (phoneVal.length > 0 && phoneVal.length < 7) {
        phoneField.classList.add("is-error");
        phoneField.classList.remove("is-ok");
        ok = false;
      } else {
        phoneField.classList.remove("is-error");
        if (phoneVal.length >= 7) phoneField.classList.add("is-ok");
      }
    }

    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const field = el?.closest(".field");
      if (!field) return;
      if (!f.validate(el.value)) {
        field.classList.add("is-error");
        field.classList.remove("is-ok");
        ok = false;
      } else {
        field.classList.remove("is-error");
        field.classList.add("is-ok");
      }
    });

    if (!ok) return;

    btn.classList.add("is-loading");
    btn.disabled = true;
    status.className = "form__status";
    status.textContent = "";

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        phone: document.getElementById("phone")?.value || "",
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      });

      status.className = "form__status is-ok";
      status.textContent = I18N[lang]?.msg_ok || "Отправлено!";
      form.reset();
      form.querySelectorAll(".field").forEach(f => { f.classList.remove("is-ok", "is-error"); });
    } catch (err) {
      console.error("EmailJS error:", err);
      status.className = "form__status is-err";
      status.textContent = I18N[lang]?.msg_err || "Ошибка";
    } finally {
      btn.classList.remove("is-loading");
      btn.disabled = false;
    }
  });

  form.querySelectorAll(".field__input").forEach(input => {
    input.addEventListener("input", () => {
      const field = input.closest(".field");
      if (field) field.classList.remove("is-error");
    });
  });
}

/* ---------- SCROLL ANIMATIONS ---------- */
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => entry.target.classList.add("is-visible"), delay);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll("[data-anim]").forEach(el => observer.observe(el));
}

/* ---------- PROGRESS BARS ---------- */
function initProgressBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".progress-bar__fill");
          if (fill) {
            fill.classList.add("is-visible");
            fill.style.width = fill.dataset.width || "80%";
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".progress-bar").forEach(el => observer.observe(el));
}

/* ---------- BURGER MENU ---------- */
function initBurger() {
  const burger = document.getElementById("burger");
  const mnav = document.getElementById("mnav");
  if (!burger || !mnav) return;

  burger.addEventListener("click", () => {
    const isOpen = mnav.classList.toggle("is-open");
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
    mnav.setAttribute("aria-hidden", !isOpen);
  });

  mnav.querySelectorAll(".mnav__link").forEach(link => {
    link.addEventListener("click", () => {
      mnav.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      mnav.setAttribute("aria-hidden", "true");
    });
  });

  document.addEventListener("click", (e) => {
    if (!mnav.contains(e.target) && !burger.contains(e.target) && mnav.classList.contains("is-open")) {
      mnav.classList.remove("is-open");
      burger.classList.remove("is-open");
    }
  });
}

/* ---------- TOPBAR SCROLL SHADOW ---------- */
function initTopbarScroll() {
  const topbar = document.getElementById("topbar");
  if (!topbar) return;
  window.addEventListener("scroll", () => {
    topbar.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });
}

/* ---------- STICKY CTA VISIBILITY ---------- */
function initStickyCta() {
  const cta = document.getElementById("stickyCta");
  const contact = document.getElementById("contact");
  if (!cta || !contact) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      cta.style.display = entry.isIntersecting ? "none" : "";
    },
    { threshold: 0.3 }
  );
  observer.observe(contact);
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ---------- PILL TOOLTIPS ---------- */
function initPillTooltips() {
  const pills = document.querySelectorAll('.tech-stack__pill[data-tooltip]');
  if (!pills.length) return;

  // Create overlay once
  const overlay = document.createElement('div');
  overlay.className = 'pill-tooltip';
  overlay.innerHTML = `
    <div class="pill-tooltip__card">
      <button class="pill-tooltip__close" type="button" aria-label="Close">&times;</button>
      <div class="pill-tooltip__name"></div>
      <div class="pill-tooltip__text"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const nameEl = overlay.querySelector('.pill-tooltip__name');
  const textEl = overlay.querySelector('.pill-tooltip__text');
  const closeBtn = overlay.querySelector('.pill-tooltip__close');
  let activePill = null;
  updateAccessibilityLabels(getLang());

  function openTooltip(pill) {
    const raw = pill.getAttribute('data-tooltip') || '';
    const dash = "\u2014";
    const mojibakeDash = "\u0432\u0402\u201d";
    const withSep = raw.indexOf(" - ") > -1
      ? " - "
      : (raw.indexOf(` ${dash} `) > -1 ? ` ${dash} ` : ` ${mojibakeDash} `);
    const separatorIndex = raw.indexOf(withSep);
    const parsedName = separatorIndex > -1 ? raw.substring(0, separatorIndex).trim() : pill.textContent.trim();
    const parsedDesc = separatorIndex > -1 ? raw.substring(separatorIndex + withSep.length).trim() : raw;

    nameEl.textContent = parsedName;
    textEl.textContent = parsedDesc;
    if (activePill) activePill.classList.remove('is-active');
    activePill = pill;
    pill.classList.add('is-active');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeTooltip() {
    overlay.classList.remove('is-visible');
    if (activePill) activePill.classList.remove('is-active');
    activePill = null;
    document.body.style.overflow = '';
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => openTooltip(pill));
  });

  closeBtn.addEventListener('click', closeTooltip);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeTooltip();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-visible')) closeTooltip();
  });
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getTheme());

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  const lang = getLang();
  applyLang(lang);

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      const pill = e.target.closest(".lang-toggle__pill");
      if (pill && pill.dataset.lang) {
        applyLang(pill.dataset.lang);
      }
    });
  }

  initBurger();
  initTopbarScroll();
  initContactForm();
  initSmoothScroll();

  requestAnimationFrame(() => {
    initAnimations();
    initProgressBars();
    initStickyCta();
    initPillTooltips();
  });
});
