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

// ########################################################################

let params = new URLSearchParams(window.location.search);
let latitude = params.get("latitude");
let longitude = params.get("longitude");

const spinnerLoading = document.getElementById("loading-section");
spinnerLoading.style.display = "block";

const prayerTimesSection = document.getElementById("prayer-times-section");
const method = 4;

let country = "";
let city = "";
axios
  .get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${lang}`
  )
  .then((response) => {
    country = response.data.countryName;
    country = country.includes("(the)")
      ? country.replace("(the)", "")
      : country;
    city = response.data.city;

    axios
      .get(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`
      )
      .then((response) => {
        spinnerLoading.style.display = "none";
        document.getElementById("content-title").innerHTML =
          lang === "ar"
            ? `مواقيت الصلاة في ${city} - ${country} :`
            : `Prayer Times in ${city} - ${country} :`;

        prayerTimesSection.style.display = "block";
        let dateObj = response.data.data.date;
        let prayerTimesObj = response.data.data.timings;
        let timeZone = response.data.data.meta.timezone;
        const prayers_langs = {
          Fajr: { name_en: "Fajr", name_ar: "الفجر" },
          Sunrise: { name_en: "Sunrise", name_ar: "الشروق" },
          Dhuhr: { name_en: "Dhuhr", name_ar: "الظهر" },
          Asr: { name_en: "Asr", name_ar: "العصر" },
          Maghrib: { name_en: "Maghrib", name_ar: "المغرب" },
          Isha: { name_en: "Isha", name_ar: "العشاء" },
        };

        const selectedPrayers = [
          "Fajr",
          "Sunrise",
          "Dhuhr",
          "Asr",
          "Maghrib",
          "Isha",
        ];
        const times = Object.fromEntries(
          Object.entries(prayerTimesObj).filter((prayerTime) =>
            selectedPrayers.includes(prayerTime[0]) ? prayerTime : ""
          )
        );

        function updateClock() {
          const now = new Date();
          const options = {
            timeZone,
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          };
          let timeStr = new Intl.DateTimeFormat("en-US", options).format(now);
          lang === "ar"
            ? (timeStr = timeStr.replace("AM", "ص").replace("PM", "م"))
            : timeStr;
          document.getElementById("clock").innerHTML = `${
            lang === "ar" ? "الوقت الآن :" : "Time Now :"
          } ${timeStr}`;
          return timeStr;
        }

        function parsePrayerTime(time12) {
          const now = new Date();
          const dateStr = now.toLocaleDateString("en-US", { timeZone });
          const date = new Date(`${dateStr} ${time12}`);
          return date;
        }
        function getNextPrayer() {
          const now = new Date();
          const currentTimeStr = updateClock();
          for (let prayer of selectedPrayers) {
            const prayerTime = parsePrayerTime(times[prayer]);
            if (prayerTime > now) {
              return { name: prayer, time: prayerTime };
            }
          }
          let fajrDate = parsePrayerTime(times["Fajr"]);
          fajrDate.setDate(fajrDate.getDate() + 1);
          return { name: "Fajr", time: fajrDate };
        }
        function updateCountdown() {
          const now = new Date();
          const next = getNextPrayer();
          const next_ar = prayers_langs[next.name].name_ar;
          let diff = next.time - now;
          const hours = Math.floor(diff / 1000 / 60 / 60);
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          document.getElementById("next-prayer").innerHTML =
            lang === "ar"
              ? "الصلاة التالية :" +
                " " +
                next_ar +
                " " +
                "بعد" +
                " " +
                hours +
                "س" +
                " " +
                minutes +
                "د" +
                " " +
                seconds +
                "ث"
              : `Next Prayer : ${next.name} in ${hours}h ${minutes}m ${seconds}s`;
        }

        document.getElementById("gregorian-date").innerHTML = `${
          lang === "ar" ? "التاريخ الميلادي :" : "Gregorian Date :"
        } ${dateObj.gregorian.date}`;

        document.getElementById("hijri-date").innerHTML = `${
          lang === "ar" ? "التاريخ الهجري :" : "Hijri Date :"
        } ${dateObj.hijri.date}`;

        setInterval(() => {
          updateClock();
          updateCountdown();
        }, 1000);
        updateClock();
        updateCountdown();

        document.getElementById("prayer-times").innerHTML = `
            <div class="row g-3 text-center">
            <div class="col-6 col-md-4 col-lg-2">
              <div class="p-2 prayer-time">
              <div class="icon">
              <img src="../prayer-times-icons/fajr.svg" alt="fajr-icon">
              </div>
              <div class="text">
              <h5>${
                lang === "ar"
                  ? prayers_langs.Fajr.name_ar
                  : prayers_langs.Fajr.name_en
              }</h5>
              <p>${prayerTimesObj.Fajr} ${lang === "ar" ? "ص" : "AM"}</p>
              </div>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-2">
              <div class="p-2 prayer-time">
              <div class="icon">
              <img src="../prayer-times-icons/sunrise.svg" alt="sunrise-icon">
              </div>
              <div class="text">
              <h5>${
                lang === "ar"
                  ? prayers_langs.Sunrise.name_ar
                  : prayers_langs.Sunrise.name_en
              }</h5>
              <p>${prayerTimesObj.Sunrise} ${lang === "ar" ? "ص" : "AM"}</p>
              </div>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-2">
              <div class="p-2 prayer-time">
              <div class="icon">
              <img src="../prayer-times-icons/dhuhr.svg" alt="dhuhr-icon">
              </div>
              <div class="text">
              <h5>${
                lang === "ar"
                  ? prayers_langs.Dhuhr.name_ar
                  : prayers_langs.Dhuhr.name_en
              }</h5>
              <p>${prayerTimesObj.Dhuhr} ${lang === "ar" ? "م" : "PM"}</p>
              </div>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-2">
              <div class="p-2 prayer-time">
              <div class="icon">
              <img src="../prayer-times-icons/asr.svg" alt="asr-icon">
              </div>
              <div class="text">
              <h5>${
                lang === "ar"
                  ? prayers_langs.Asr.name_ar
                  : prayers_langs.Asr.name_en
              }</h5>
              <p>${prayerTimesObj.Asr} ${lang === "ar" ? "م" : "PM"}</p>
              </div>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-2">
              <div class="p-2 prayer-time">
              <div class="icon">
              <img src="../prayer-times-icons/maghrib.svg" alt="maghrib-icon">
              </div>
              <div class="text">
              <h5>${
                lang === "ar"
                  ? prayers_langs.Maghrib.name_ar
                  : prayers_langs.Maghrib.name_en
              }</h5>
              <p>${prayerTimesObj.Maghrib} ${lang === "ar" ? "م" : "PM"}</p>
              </div>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-2">
              <div class="p-2 prayer-time">
              <div class="icon">
              <img src="../prayer-times-icons/isha.svg" alt="isha-icon">
              </div>
              <div class="text">
              <h5>${
                lang === "ar"
                  ? prayers_langs.Isha.name_ar
                  : prayers_langs.Isha.name_en
              }</h5>
              <p>${prayerTimesObj.Isha} ${lang === "ar" ? "م" : "PM"}</p>
              </div>
              </div>
            </div>
            
          </div>`;
      })
      .catch((error) => {
        alert(error);
      });
  })
  .catch((error) => {
    alert(error);
  });
