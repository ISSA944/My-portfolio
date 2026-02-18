/* ============================================================
   ISO — Iskander Portfolio  |  app.js  v3
   Preloader, Particles, Theme, Language, Form, Animations
   ============================================================ */

/* ---------- PRELOADER ---------- */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => preloader.remove(), 600);
    }, 2000);
  });
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
  document.documentElement.lang = lang;
  setStored(STORE_KEYS.lang, lang);
  applyI18n(lang);
  updateLangPills(lang);
  renderSkills(lang);
  renderProjects(lang);
}

function applyI18n(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = I18N[lang]?.[key];
    if (val != null) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = I18N[lang]?.[key];
    if (val != null) el.setAttribute("placeholder", val);
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

    skills_title: "My Skills",
    skills_subtitle: "Нажми на карточку — откроется подробная страница навыка.",

    projects_title: "Проекты",
    projects_subtitle: "Подборка работ. Полный список — на странице портфолио.",
    projects_more: "Смотреть всё портфолио",

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
    p_subtitle: "Здесь — примеры работ. Везде: адаптив, аккуратный UI и интерактив.",
    p_cta: "Связаться",
    p_back: "На главную",
    p_work_title: "Работы",
    p_work_text: "Проекты с адаптивом, анимациями и современным UI.",
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
    projects_subtitle: "Selection of work. Full list — on the portfolio page.",
    projects_more: "View full portfolio",

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
    p_subtitle: "Examples of work. Always responsive, polished UI and interactions.",
    p_cta: "Contact",
    p_back: "Back to home",
    p_work_title: "Work",
    p_work_text: "Projects with responsive design, animations and modern UI.",
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
    title: { ru: "Premium Landing Page", en: "Premium Landing Page" },
    text: { ru: "Адаптивный лендинг с анимациями, формой и тёмной темой.", en: "Responsive landing with animations, form and dark theme." },
    tags: ["HTML", "CSS", "JS"],
    demo: "index.html",
    code: "#"
  },
  {
    title: { ru: "Multi-page Portfolio", en: "Multi-page Portfolio" },
    text: { ru: "Портфолио из нескольких страниц с единой дизайн-системой.", en: "Multi-page portfolio with a unified design system." },
    tags: ["UX", "UI", "LocalStorage"],
    demo: "portfolio.html",
    code: "#"
  },
  {
    title: { ru: "Skill Pages", en: "Skill Pages" },
    text: { ru: "Отдельные страницы навыков с уникальной стилизацией.", en: "Dedicated skill pages with unique tech-styled accent." },
    tags: ["Design", "Brand"],
    demo: "html-css.html",
    code: "#"
  },
  {
    title: { ru: "Contact Form + EmailJS", en: "Contact Form + EmailJS" },
    text: { ru: "Форма с валидацией, маской и реальной отправкой.", en: "Form with validation, mask and real email delivery." },
    tags: ["JS", "EmailJS"],
    demo: "index.html#contact",
    code: "#"
  },
  {
    title: { ru: "Theme & Language System", en: "Theme & Language System" },
    text: { ru: "Тёмная/светлая тема + RU/EN с сохранением.", en: "Dark/light theme + RU/EN with persistence." },
    tags: ["JS", "UX"],
    demo: "index.html",
    code: "#"
  },
  {
    title: { ru: "Mobile-first UI", en: "Mobile-first UI" },
    text: { ru: "Бургер-меню, sticky CTA, адаптив всех компонентов.", en: "Burger menu, sticky CTA, all components responsive." },
    tags: ["CSS", "Mobile"],
    demo: "index.html",
    code: "#"
  }
];

function renderProjects(lang) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const isIndex = !window.location.pathname.includes("portfolio");
  const items = isIndex ? PROJECTS.slice(0, 3) : PROJECTS;

  grid.innerHTML = "";
  items.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "project";
    card.style.transitionDelay = `${i * 80}ms`;

    card.innerHTML = `
      <div class="project__thumb"></div>
      <div class="project__body">
        <div class="project__title">${p.title[lang] || p.title.ru}</div>
        <div class="project__text">${p.text[lang] || p.text.ru}</div>
        <div class="project__tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="project__actions">
          <a class="project__btn project__btn--accent" href="${p.demo}">${lang === "en" ? "Demo" : "Демо"}</a>
          <a class="project__btn" href="${p.code}">${lang === "en" ? "Code" : "Код"}</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
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
      status.textContent = I18N[lang]?.msg_ok || "Sent!";
      form.reset();
      form.querySelectorAll(".field").forEach(f => { f.classList.remove("is-ok", "is-error"); });
    } catch (err) {
      console.error("EmailJS error:", err);
      status.className = "form__status is-err";
      status.textContent = I18N[lang]?.msg_err || "Error";
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
  });
});
