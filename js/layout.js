import { t, applyTranslations, toggleLang } from "./i18n.js";
const CONTACT = [
  {
    key: "website",
    icon: "fa-solid fa-globe",
    href: "https://mahmoud-t-ghanem.netlify.app/",
  },
  {
    key: "whatsapp",
    icon: "fa-brands fa-whatsapp",
    href: "https://wa.me/963968139188",
  },
  {
    key: "github",
    icon: "fa-brands fa-github",
    href: "https://github.com/mahmoud-t-ghanem",
  },
  {
    key: "linkedin",
    icon: "fa-brands fa-linkedin-in",
    href: "https://www.linkedin.com/in/mahmoud-ghanem-133245314",
  },
  {
    key: "email",
    icon: "fa-solid fa-envelope",
    href: "mailto:mahmoud.taha.ghanem@gmail.com",
  },
];

const LOGO = `
<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
  <path d="M33.74 6.4A4 4 0 1 0 33.74 13.6A3.6 3.6 0 0 1 33.74 6.4Z"/>
  <rect x="31.5" y="14" width="1" height="6"/>
  <path d="M18 38C18 27 24.5 20 32 20S46 27 46 38Z"/>
  <path d="M18 38H46V52H36V46A4 4 0 0 0 28 46V52H18Z"/>
  <path d="M8 28L11 19L14 28Z"/><rect x="8" y="28" width="6" height="24"/>
  <path d="M50 28L53 19L56 28Z"/><rect x="50" y="28" width="6" height="24"/>
  <rect x="4" y="52" width="56" height="3" rx="1.5"/>
</svg>`;

const LINKS = [
  { key: "nav.times", href: "index.html#search", icon: "fa-clock" },
  { key: "nav.importance", href: "index.html#importance", icon: "fa-heart" },
  { key: "nav.wudu", href: "index.html#wudu", icon: "fa-droplet" },
  { key: "nav.guide", href: "index.html#guide", icon: "fa-person-praying" },
  {
    key: "nav.azkar",
    href: "https://islamicazkar.com/",
    icon: "fa-quran",
    external: true,
  },
];

const linkAttrs = (l) => (l.external ? 'target="_blank" rel="noopener"' : "");

const headerHTML = () => `
<header class="navbar" id="navbar">
  <div class="container navbar__inner">
    <a class="brand" href="index.html">
      <span class="brand__logo">${LOGO}</span>
      <span class="brand__name" data-i18n="brand"></span>
    </a>

    <nav class="nav" id="nav" aria-label="Main">
      ${LINKS.map(
        (l) => `
        <a class="nav__link" href="${l.href}" ${linkAttrs(l)}>
          <i class="fa-solid ${l.icon}"></i><span data-i18n="${l.key}"></span>
        </a>`,
      ).join("")}
    </nav>

    <div class="actions">
      <button class="icon-btn icon-btn--round" id="geo-btn" type="button" data-i18n-tip="tip.location">
        <i class="fa-solid fa-location-crosshairs"></i>
      </button>
      <button class="icon-btn icon-btn--round" id="theme-btn" type="button" data-i18n-tip="tip.theme">
        <i class="fa-solid fa-moon icon-dark"></i><i class="fa-solid fa-sun icon-light"></i>
      </button>
      <button class="icon-btn icon-btn--lang" id="lang-btn" type="button" data-i18n-tip="tip.lang">
        <i class="fa-solid fa-globe"></i><span data-i18n="lang.btn"></span>
      </button>
      <button class="icon-btn icon-btn--round nav-toggle" id="menu-btn" type="button" data-i18n-tip="tip.menu" aria-expanded="false" aria-controls="nav">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </div>
</header>
<div class="nav-backdrop" id="nav-backdrop"></div>`;

const footerHTML = () => `
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <a class="brand" href="index.html">
        <span class="brand__logo">${LOGO}</span>
        <span class="brand__name" data-i18n="brand"></span>
      </a>
      <p data-i18n="footer.about"></p>
    </div>

    <div>
      <h4 data-i18n="footer.links"></h4>
      <ul class="footer__links">
        ${LINKS.map(
          (l) => `
          <li><a href="${l.href}" ${linkAttrs(l)}>
            <i class="fa-solid ${l.icon}"></i><span data-i18n="${l.key}"></span>
          </a></li>`,
        ).join("")}
      </ul>
    </div>

    <div>
      <h4 data-i18n="footer.contact"></h4>
      <p data-i18n="footer.contactText"></p>
      <div class="socials">
        ${CONTACT.map(
          (c) => `
          <a class="social" href="${c.href}" ${c.href.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'} data-i18n-tip="social.${c.key}">
            <i class="${c.icon}"></i>
          </a>`,
        ).join("")}
      </div>
    </div>
  </div>

  <div class="footer__bottom-wrap">
    <div class="container footer__bottom">
      <p>© ${new Date().getFullYear()} <span data-i18n="footer.rights"></span></p>
      <p><span data-i18n="footer.dev"></span> <strong data-i18n="footer.name"></strong></p>
      <button class="icon-btn icon-btn--round" id="top-btn" type="button" data-i18n-tip="tip.top">
        <i class="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  </div>
</footer>`;

export function showToast(message, type = "info") {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.append(wrap);
  }
  const el = document.createElement("div");
  el.className = `toast toast--${type}`;
  el.textContent = message;
  wrap.append(el);
  setTimeout(() => {
    el.classList.add("is-leaving");
    setTimeout(() => el.remove(), 300);
  }, 4000);
}

export function locateAndGo(button) {
  if (!("geolocation" in navigator)) {
    showToast(t("geo.unsupported"), "error");
    return;
  }
  button?.classList.add("is-loading");
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const q = new URLSearchParams({
        latitude: coords.latitude.toFixed(5),
        longitude: coords.longitude.toFixed(5),
      });
      location.href = `prayer-times.html?${q}`;
    },
    (err) => {
      button?.classList.remove("is-loading");
      const key =
        { 1: "geo.denied", 3: "geo.timeout" }[err.code] || "geo.unavailable";
      showToast(t(key), "error");
    },
    { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 },
  );
}

export function initLayout() {
  document.getElementById("app-header").innerHTML = headerHTML();
  document.getElementById("app-footer").innerHTML = footerHTML();
  applyTranslations();

  const html = document.documentElement;
  const navbar = document.getElementById("navbar");
  const nav = document.getElementById("nav");
  const backdrop = document.getElementById("nav-backdrop");
  const menuBtn = document.getElementById("menu-btn");
  const menuIcon = menuBtn.querySelector("i");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  }

  menuBtn.addEventListener("click", () =>
    setMenu(!nav.classList.contains("is-open")),
  );
  backdrop.addEventListener("click", () => setMenu(false));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) setMenu(false);
  });

  document.getElementById("theme-btn").addEventListener("click", () => {
    const next = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  document.getElementById("lang-btn").addEventListener("click", toggleLang);

  const geoBtn = document.getElementById("geo-btn");
  geoBtn.addEventListener("click", () => {
    setMenu(false);
    locateAndGo(geoBtn);
  });
  window.addEventListener("pageshow", () =>
    geoBtn.classList.remove("is-loading"),
  );

  document.getElementById("top-btn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const onScroll = () =>
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
