// const lang = localStorage.getItem("lang") || "ar";
// const htmlEl = document.documentElement;
// htmlEl.lang = lang;
// document.querySelectorAll("[data-ar]").forEach((element) => {
//   element.textContent = lang === "ar" ? element.dataset.ar : element.dataset.en;
// });

// const offcanvas = document.getElementById("offcanvasDarkNavbar");
// if (lang === "ar") {
//   offcanvas.classList.remove("offcanvas-end");
//   offcanvas.classList.add("offcanvas-start");
// }

// const toggleBtn = document.getElementById("lang-toggler");
// toggleBtn.textContent = lang === "ar" ? "En" : "Ar";

// toggleBtn.addEventListener("click", () => {
//   const currentLang = htmlEl.lang;
//   const newLang = currentLang === "ar" ? "en" : "ar";
//   localStorage.setItem("lang", newLang);
//   location.reload();
// });

// // ################################################################################

// const getLocationBtn = document.getElementById("getLocationBtn");
// const useMyLocationBtn = document.getElementById("use-my-location-btn");
// function handleGetLocation() {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       let url = `prayer-times.html?latitude=${latitude}&longitude=${longitude}`;
//       spinnerLoading.style.display = "block";
//       window.location.href = url;
//     },
//     () => {
//       alert("error");
//     }
//   );
// }
// getLocationBtn.addEventListener("click", handleGetLocation);
// useMyLocationBtn.addEventListener("click", handleGetLocation);

// // ################################################################################

// const countrySelect = document.getElementById("country-select");
// const citySelect = document.getElementById("city-select");
// const ShowPrayerTimesBtn = document.getElementById("show-prayer-times-btn");
// const spinnerLoading = document.getElementById("loading-section");
// const selectionSection = document.getElementById("selection-section");

// let citiesData = [];
// fetch("data/cities.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("failed to load the cities.json file");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     citiesData = data;
//   })
//   .catch((error) => {
//     alert(error);
//   });

// fetch("data/countries.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("failed to load the countries.json file");
//     }
//     return response.json();
//   })
//   .then((countries) => {
//     const countriesChoices = new Choices(countrySelect, {
//       position: "top",
//       searchEnabled: true,
//       placeholderValue:
//         document.documentElement.lang === "ar"
//           ? "اختر الدولة"
//           : "Choose the country",
//       searchPlaceholderValue:
//         document.documentElement.lang === "ar"
//           ? "ابحث عن الدولة"
//           : "Search for the country",
//       noResultsText:
//         document.documentElement.lang === "ar"
//           ? "لا توجد نتائج."
//           : "No results found.",
//       itemSelectText: "",
//       shouldSort: true,
//       allowHTML: true,
//     });
//     countriesChoices.setChoices(
//       countries.map((country) => ({
//         value: JSON.stringify(country),
//         label: `<img src="${
//           country.flag_svg
//         }" style="width:20px; margin-inline-end:8px; margin-top:3px"> ${
//           document.documentElement.lang === "ar"
//             ? country.country_ar
//             : country.country_en
//         }`,
//         customProperties: { cca2: country.cca2, cca3: country.cca3 },
//       })),
//       "value",
//       "label",
//       true
//     );

//     let citiesChoices = new Choices(citySelect, {
//       position: "top",
//       searchEnabled: true,
//       placeholderValue:
//         document.documentElement.lang === "ar"
//           ? "اختر المدينة"
//           : "Choose the city",
//       searchPlaceholderValue:
//         document.documentElement.lang === "ar"
//           ? "ابحث عن المدينة"
//           : "Search for the city",
//       itemSelectText: "",
//       shouldSort: true,
//       allowHTML: true,
//       noResultsText:
//         document.documentElement.lang === "ar"
//           ? "لا توجد نتائج."
//           : "No results found.",
//       noChoicesText:
//         document.documentElement.lang === "ar"
//           ? "لا توجد خيارات."
//           : "No choices found.",
//     });

//     let selectedCountry = "";
//     let selectedCountry_cca2 = "";
//     countrySelect.addEventListener("change", (event) => {
//       selectedCountry = JSON.parse(event.target.value);
//       selectedCountry_cca2 = selectedCountry.cca2;
//       let citiesOfCountry = citiesData.find(
//         (cityObject) => cityObject.cca2 === selectedCountry_cca2
//       ).cities;
//       citiesChoices.clearStore();
//       citiesChoices.setChoices(
//         citiesOfCountry.map((city) => ({
//           value: JSON.stringify(city),
//           label: `${
//             document.documentElement.lang === "ar" ? city.city_ar : city.city_en
//           }`,
//           customProperties: {
//             lat: city.coordinates.lat,
//             lon: city.coordinates.lon,
//           },
//         })),
//         "value",
//         "label",
//         true
//       );
//     });

//     let selectedCity = "";
//     let selectedCity_coordinates = "";
//     citySelect.addEventListener("change", (event) => {
//       ShowPrayerTimesBtn.disabled = false;
//       selectedCity = JSON.parse(event.target.value);
//       selectedCity_coordinates = selectedCity.coordinates;
//     });

//     ShowPrayerTimesBtn.addEventListener("click", () => {
//       ShowPrayerTimesBtn.disabled = true;
//       spinnerLoading.style.display = "block";

//       // localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
//       // localStorage.setItem("selectedCity", JSON.stringify(selectedCity));

//       let latitude = selectedCity_coordinates.lat;
//       let longitude = selectedCity_coordinates.lon;
//       let url = `prayer-times.html?latitude=${latitude}&longitude=${longitude}`;
//       window.location.href = url;
//     });
//   })
//   .catch((error) => {
//     alert(error);
//   });

// ###############################################################################

const lang = localStorage.getItem("lang") || "ar";
const htmlEl = document.documentElement;
htmlEl.lang = lang;
document.querySelectorAll("[data-ar]").forEach((element) => {
  element.textContent = lang === "ar" ? element.dataset.ar : element.dataset.en;
});

const offcanvas = document.getElementById("offcanvasDarkNavbar");
if (lang === "ar") {
  offcanvas.classList.remove("offcanvas-end");
  offcanvas.classList.add("offcanvas-start");
}

const toggleBtn = document.getElementById("lang-toggler");
toggleBtn.textContent = lang === "ar" ? "En" : "Ar";

toggleBtn.addEventListener("click", () => {
  const currentLang = htmlEl.lang;
  const newLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("lang", newLang);
  location.reload();
});

// ################################################################################

const getLocationBtn = document.getElementById("getLocationBtn");
const useMyLocationBtn = document.getElementById("use-my-location-btn");
function handleGetLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      let url = `prayer-times.html?latitude=${latitude}&longitude=${longitude}`;
      spinnerLoading.style.display = "block";
      window.location.href = url;
    },
    () => {
      alert("error");
    }
  );
}
getLocationBtn.addEventListener("click", handleGetLocation);
useMyLocationBtn.addEventListener("click", handleGetLocation);

// ################################################################################

const countrySelect = document.getElementById("country-select");
const citySelect = document.getElementById("city-select");
const ShowPrayerTimesBtn = document.getElementById("show-prayer-times-btn");
const spinnerLoading = document.getElementById("loading-section");
const selectionSection = document.getElementById("selection-section");

axios
  .get("data/countries.json")
  .then((data) => {
    const countriesChoices = new Choices(countrySelect, {
      position: "top",
      searchEnabled: true,
      placeholderValue:
        document.documentElement.lang === "ar"
          ? "اختر الدولة"
          : "Choose the country",
      searchPlaceholderValue:
        document.documentElement.lang === "ar"
          ? "ابحث عن الدولة"
          : "Search for the country",
      noResultsText:
        document.documentElement.lang === "ar"
          ? "لا توجد نتائج."
          : "No results found.",
      itemSelectText: "",
      shouldSort: true,
      allowHTML: true,
    });
    const countries = data.data;
    countriesChoices.setChoices(
      countries.map((country) => ({
        value: JSON.stringify(country),
        label: `<img src="${
          country.flag
        }" alt="" style="margin-inline-end:8px; width: 20px"/>${
          document.documentElement.lang === "ar"
            ? country.country_ar
            : country.country_en
        }`,
        customProperties: { code: country.code },
      })),
      "value",
      "label",
      true
    );
  })
  .catch((error) => {
    alert(error);
  });

let citiesChoices = new Choices(citySelect, {
  position: "top",
  searchEnabled: true,
  placeholderValue:
    document.documentElement.lang === "ar" ? "اختر المدينة" : "Choose the city",
  searchPlaceholderValue:
    document.documentElement.lang === "ar"
      ? "ابحث عن المدينة"
      : "Search for the city",
  itemSelectText: "",
  shouldSort: true,
  allowHTML: true,
  noResultsText:
    document.documentElement.lang === "ar"
      ? "لا توجد نتائج."
      : "No results found.",
  noChoicesText:
    document.documentElement.lang === "ar"
      ? "لا توجد خيارات."
      : "No choices found.",
});

let selectedCountry = "";
let selectedCountry_code = "";
countrySelect.addEventListener("change", (event) => {
  spinnerLoading.style.display = "block";
  selectedCountry = JSON.parse(event.target.value);
  selectedCountry_code = selectedCountry.code;
  axios
    .get(
      `http://api.geonames.org/searchJSON?country=${selectedCountry_code}&featureClass=P&featureCode=PPLC&featureCode=PPLA&orderby=population&maxRows=50&lang=${lang}&username=mahmoud_t_ghanem77`
    )
    .then((data) => {
      spinnerLoading.style.display = "none";
      const cities = data.data.geonames;
      citiesChoices.clearStore();
      citiesChoices.setChoices(
        cities.map((city) => ({
          value: JSON.stringify(city),
          label: city.name,
          customProperties: {
            lat: city.lat,
            lon: city.lng,
          },
        })),
        "value",
        "label",
        true
      );
    })
    .catch((error) => {
      alert(error);
    });
});

let selectedCity = "";
let latitude = "";
let longitude = "";
citySelect.addEventListener("change", (event) => {
  ShowPrayerTimesBtn.disabled = false;
  selectedCity = JSON.parse(event.target.value);
  latitude = selectedCity.lat;
  longitude = selectedCity.lng;
});

ShowPrayerTimesBtn.addEventListener("click", () => {
  ShowPrayerTimesBtn.disabled = true;
  spinnerLoading.style.display = "block";
  let url = `prayer-times.html?latitude=${latitude}&longitude=${longitude}`;
  window.location.href = url;
});
