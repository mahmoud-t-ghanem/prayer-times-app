import { initLayout, locateAndGo, showToast } from "./layout.js";
import { t, getLang, pick, onLangChange } from "./i18n.js";
import { createCombobox } from "./combobox.js";
import { loadCountries, fetchCities } from "./api.js";
import {
  IMPORTANCE,
  PRAYERS_OVERVIEW,
  WUDU_STEPS,
  PRAYER_STEPS,
} from "./content.js";

initLayout();

const $ = (id) => document.getElementById(id);
const showBtn = $("show-btn");

const countryCombo = createCombobox($("country-combo"), {
  placeholderKey: "select.country",
  searchKey: "select.countrySearch",
});
const cityCombo = createCombobox($("city-combo"), {
  placeholderKey: "select.chooseCountryFirst",
  searchKey: "select.citySearch",
});
cityCombo.setDisabled(true);

let countries = [];
let cityRequestId = 0;

$("use-location-btn").addEventListener("click", (e) =>
  locateAndGo(e.currentTarget),
);

function countryOptions() {
  const lang = getLang();
  return countries
    .map((c) => ({
      value: c.code,
      label: lang === "ar" ? c.country_ar : c.country_en,
      alt: lang === "ar" ? c.country_en : c.country_ar,
      icon: c.flag,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, lang));
}

loadCountries()
  .then((list) => {
    countries = list;
    countryCombo.setOptions(countryOptions());
  })
  .catch(() => showToast(t("select.countriesError"), "error"));

async function loadCities(code) {
  const id = ++cityRequestId;
  cityCombo.setDisabled(true);
  cityCombo.setPlaceholder("select.loadingCities");
  try {
    const cities = await fetchCities(code, getLang());
    if (id !== cityRequestId) return;
    cityCombo.setOptions(
      cities.map((c) => ({
        value: String(c.geonameId),
        label: c.name,
        sub: c.adminName1 && c.adminName1 !== c.name ? c.adminName1 : "",
        data: { lat: c.lat, lng: c.lng },
      })),
    );
    cityCombo.setPlaceholder("select.city");
    cityCombo.setDisabled(false);
    showBtn.disabled = !cityCombo.getSelected();
  } catch (err) {
    if (id !== cityRequestId) return;
    console.error(err);
    cityCombo.setPlaceholder("select.citiesError");
    showToast(t("select.citiesError"), "error");
  }
}

countryCombo.onChange((country) => {
  cityCombo.clear();
  showBtn.disabled = true;
  loadCities(country.value);
});

cityCombo.onChange(() => {
  showBtn.disabled = false;
});

showBtn.addEventListener("click", () => {
  const city = cityCombo.getSelected();
  const country = countryCombo.getSelected();
  if (!city || !country) return;
  showBtn.classList.add("is-loading");
  showBtn.disabled = true;
  const q = new URLSearchParams({
    latitude: Number(city.data.lat).toFixed(4),
    longitude: Number(city.data.lng).toFixed(4),
    city: city.label,
    cc: country.value,
  });
  location.href = `prayer-times.html?${q}`;
});

window.addEventListener("pageshow", () => {
  showBtn.classList.remove("is-loading");
  showBtn.disabled = !cityCombo.getSelected();
});

const io =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.12 },
      )
    : null;

function renderContent(animate) {
  const cls = `reveal${animate ? "" : " is-visible"}`;

  $("importance-grid").innerHTML = IMPORTANCE.map(
    (i) => `
    <article class="info-card glass ${cls}">
      <div class="info-card__icon"><i class="fa-solid ${i.icon}"></i></div>
      <h3>${pick(i.title)}</h3>
      <p>${pick(i.text)}</p>
      <small class="ref">${pick(i.ref)}</small>
    </article>`,
  ).join("");

  $("prayers-grid").innerHTML = PRAYERS_OVERVIEW.map(
    (p) => `
    <article class="prayer-chip glass ${cls}">
      <i class="fa-solid ${p.icon}"></i>
      <h3>${t("prayer." + p.key)}</h3>
      <strong>${pick(p.rakat)}</strong>
      <span>${pick(p.hint)}</span>
    </article>`,
  ).join("");

  const steps = (list) =>
    list
      .map(
        (s, i) => `
      <li class="step glass ${cls}">
        <span class="step__num">${i + 1}</span>
        <div>
          <h3>${pick(s.title)}</h3>
          <p>${pick(s.text)}</p>
          ${s.dua ? `<p class="step__dua">${pick(s.dua)}</p>` : ""}
        </div>
      </li>`,
      )
      .join("");

  $("wudu-steps").innerHTML = steps(WUDU_STEPS);
  $("guide-steps").innerHTML = steps(PRAYER_STEPS);

  if (animate) {
    document
      .querySelectorAll(".reveal:not(.is-visible)")
      .forEach((el) => (io ? io.observe(el) : el.classList.add("is-visible")));
  }
}

renderContent(true);

onLangChange(() => {
  countryCombo.setOptions(countryOptions());
  countryCombo.refreshTexts();
  cityCombo.refreshTexts();
  const country = countryCombo.getSelected();
  if (country) loadCities(country.value);
  renderContent(false);
});
