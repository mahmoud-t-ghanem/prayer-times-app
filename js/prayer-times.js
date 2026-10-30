import { initLayout, showToast } from "./layout.js";
import {
  t,
  getLang,
  locale,
  pick,
  onLangChange,
  applyTranslations,
} from "./i18n.js";
import { fetchTimings, reverseGeocode, loadCountries } from "./api.js";
import { REMINDERS } from "./content.js";

initLayout();

const KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const ICONS = {
  Fajr: "fa-cloud-moon",
  Sunrise: "fa-mountain-sun",
  Dhuhr: "fa-sun",
  Asr: "fa-cloud-sun",
  Maghrib: "fa-moon",
  Isha: "fa-star",
};
const DAY = 86400000;

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");

const params = new URLSearchParams(location.search);
const lat = parseFloat(params.get("latitude"));
const lng = parseFloat(params.get("longitude"));
const validCoords =
  Number.isFinite(lat) &&
  Number.isFinite(lng) &&
  Math.abs(lat) <= 90 &&
  Math.abs(lng) <= 180;

const state = {
  data: null,
  place: { city: "", country: "" },
  schedule: [],
  tz: "UTC",
  dateKey: "",
  use12: localStorage.getItem("fmt") !== "24",
  timer: null,
  nextKey: null,
  tomorrow: false,
  refreshing: false,
  retryAt: 0,
};

function show(view) {
  ["loading", "error", "content"].forEach(
    (v) => ($(`state-${v}`).hidden = v !== view),
  );
}

function showError(key) {
  $("error-msg").dataset.i18n = key;
  applyTranslations();
  show("error");
}

function tzOffset(ts, tz) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date(ts));
  const g = (type) => Number(parts.find((p) => p.type === type).value);
  const asUTC = Date.UTC(
    g("year"),
    g("month") - 1,
    g("day"),
    g("hour"),
    g("minute"),
    g("second"),
  );
  return asUTC - Math.floor(ts / 1000) * 1000;
}

function zonedToUtc(y, m, d, h, min, tz) {
  const guess = Date.UTC(y, m - 1, d, h, min);
  let ts = guess - tzOffset(guess, tz);
  ts = guess - tzOffset(ts, tz);
  return ts;
}

function todayInZone(tz) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());
  const g = (type) => Number(parts.find((p) => p.type === type).value);
  return { y: g("year"), m: g("month"), d: g("day") };
}

const dateKeyOf = ({ y, m, d }) => `${y}-${m}-${d}`;

const fmt = (ts, opts) =>
  new Intl.DateTimeFormat(locale(), { timeZone: state.tz, ...opts }).format(ts);
const timeOpts = () =>
  state.use12
    ? { hour: "numeric", minute: "2-digit", hour12: true }
    : { hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
const clockOpts = () =>
  state.use12
    ? { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true }
    : {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      };

async function getTimings() {
  let data = await fetchTimings(lat, lng);
  const today = todayInZone(data.meta.timezone);
  const want = `${pad(today.d)}-${pad(today.m)}-${today.y}`;
  if (data.date.gregorian.date !== want)
    data = await fetchTimings(lat, lng, want);
  return data;
}

async function resolvePlace() {
  const cityParam = params.get("city");
  if (cityParam) {
    let country = "";
    try {
      const list = await loadCountries();
      const c = list.find((x) => x.code === params.get("cc"));
      if (c) country = getLang() === "ar" ? c.country_ar : c.country_en;
    } catch {}
    return { city: cityParam, country };
  }
  try {
    return await reverseGeocode(lat, lng, getLang());
  } catch {
    return { city: "", country: "" };
  }
}

function buildSchedule(data) {
  const [d, m, y] = data.date.gregorian.date.split("-").map(Number);
  let prev = 0;
  state.schedule = KEYS.map((key) => {
    const [, hh, mm] = data.timings[key].match(/(\d{1,2}):(\d{2})/);
    let time = zonedToUtc(y, m, d, Number(hh), Number(mm), state.tz);
    while (time < prev) time += DAY; // e.g. Isha after midnight at high latitudes
    prev = time;
    return { key, time };
  });
  state.dateKey = dateKeyOf({ y, m, d });
}

function getNext(now) {
  const s = state.schedule;
  const i = s.findIndex((p) => p.time > now);
  if (i === -1)
    return {
      next: { key: "Fajr", time: s[0].time + DAY },
      prev: s[5],
      idx: 0,
      tomorrow: true,
    };
  if (i === 0)
    return {
      next: s[0],
      prev: { key: "Isha", time: s[5].time - DAY },
      idx: 0,
      tomorrow: false,
    };
  return { next: s[i], prev: s[i - 1], idx: i, tomorrow: false };
}

function renderPlace() {
  const { city, country } = state.place;
  const fallback = `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
  $("place-name").textContent = city || country || fallback;
  $("place-country").textContent = city ? country : "";
  $("place-country-wrap").hidden = !(city && country);
}

function renderStatic() {
  const { data } = state;
  const [d, m, y] = data.date.gregorian.date.split("-").map(Number);

  renderPlace();

  $("date-greg").textContent = new Intl.DateTimeFormat(locale(), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(Date.UTC(y, m - 1, d, 12));

  const h = data.date.hijri;
  $("date-hijri").textContent =
    `${h.day} ${getLang() === "ar" ? h.month.ar : h.month.en} ${h.year} ${t("times.ah")}`;
  $("tz").textContent = state.tz;
  $("method").textContent = t("times.method", {
    method: data.meta?.method?.name || "—",
  });

  $("prayer-grid").innerHTML = state.schedule
    .map(
      (p) => `
    <article class="prayer-card glass" data-key="${p.key}">
      <span class="prayer-card__tag">${t("times.nextTag")}</span>
      <div class="prayer-card__icon"><i class="fa-solid ${ICONS[p.key]}"></i></div>
      <h3>${t("prayer." + p.key)}</h3>
      <time class="prayer-card__time">${fmt(p.time, timeOpts())}</time>
    </article>`,
    )
    .join("");

  const dayOfYear = Math.floor(
    (Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / DAY,
  );
  const reminder = REMINDERS[dayOfYear % REMINDERS.length];
  $("reminder-text").textContent = pick(reminder.text);
  $("reminder-ref").textContent = pick(reminder.ref);

  $("fmt12").classList.toggle("is-active", state.use12);
  $("fmt24").classList.toggle("is-active", !state.use12);
  applyTranslations();
}

function updateNextUI(info) {
  $("next-name").textContent = t("prayer." + info.next.key);
  $("next-time").textContent = fmt(info.next.time, timeOpts());
  $("next-icon").className = `fa-solid ${ICONS[info.next.key]}`;

  document.querySelectorAll(".prayer-card").forEach((card, i) => {
    card.classList.toggle("is-next", card.dataset.key === info.next.key);
    card.classList.toggle("is-passed", info.tomorrow || i < info.idx);
  });
}

function tick() {
  if (!state.data) return;
  const now = Date.now();

  if (
    dateKeyOf(todayInZone(state.tz)) !== state.dateKey &&
    !state.refreshing &&
    now >= state.retryAt
  ) {
    load({ silent: true });
  }

  $("clock").textContent = fmt(now, clockOpts());

  const info = getNext(now);
  if (info.next.key !== state.nextKey || info.tomorrow !== state.tomorrow) {
    state.nextKey = info.next.key;
    state.tomorrow = info.tomorrow;
    updateNextUI(info);
  }

  const secs = Math.max(0, Math.floor((info.next.time - now) / 1000));
  $("cd-h").textContent = pad(Math.floor(secs / 3600));
  $("cd-m").textContent = pad(Math.floor((secs % 3600) / 60));
  $("cd-s").textContent = pad(secs % 60);

  const span = info.next.time - info.prev.time;
  const progress = Math.min(1, Math.max(0, (now - info.prev.time) / span));
  $("progress-bar").style.width = `${(progress * 100).toFixed(1)}%`;
}

async function load({ silent = false } = {}) {
  if (!validCoords) return showError("times.error.coords");
  if (!silent) show("loading");
  state.refreshing = true;

  try {
    const [data, place] = await Promise.all([getTimings(), resolvePlace()]);
    state.data = data;
    state.place = place;
    state.tz = data.meta.timezone;
    buildSchedule(data);
    renderStatic();
    state.nextKey = null;
    show("content");
    tick();
    if (!state.timer) state.timer = setInterval(tick, 1000);
  } catch (err) {
    console.error(err);
    if (silent) {
      state.retryAt = Date.now() + 60000;
      showToast(t("times.error.msg"), "error");
    } else {
      showError(navigator.onLine ? "times.error.msg" : "times.error.offline");
    }
  } finally {
    state.refreshing = false;
  }
}

function setFormat(use12) {
  state.use12 = use12;
  localStorage.setItem("fmt", use12 ? "12" : "24");
  if (!state.data) return;
  renderStatic();
  state.nextKey = null;
  tick();
}

$("fmt12").addEventListener("click", () => setFormat(true));
$("fmt24").addEventListener("click", () => setFormat(false));
$("retry-btn").addEventListener("click", () => load());
$("refresh-btn").addEventListener("click", () => load());

onLangChange(() => {
  if (!state.data) return;
  renderStatic();
  state.nextKey = null;
  tick();
  resolvePlace().then((place) => {
    state.place = place;
    renderPlace();
  });
});

load();
