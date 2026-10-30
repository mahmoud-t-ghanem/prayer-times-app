const GEONAMES_USER = "mahmoud_t_ghanem77";

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

let countriesPromise = null;
export function loadCountries() {
  countriesPromise ??= getJSON("data/countries.json")
    .then((json) => (Array.isArray(json) ? json : json.data))
    .catch((err) => {
      countriesPromise = null;
      throw err;
    });
  return countriesPromise;
}

export async function fetchCities(code, lang) {
  const cacheKey = `cities:${code}:${lang}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {}

  const q = new URLSearchParams({
    country: code,
    featureClass: "P",
    orderby: "population",
    maxRows: "100",
    lang,
    username: GEONAMES_USER,
  });
  ["PPLC", "PPLA", "PPLA2"].forEach((c) => q.append("featureCode", c));

  const json = await getJSON(`https://secure.geonames.org/searchJSON?${q}`);
  if (json.status) throw new Error(json.status.message);

  const seen = new Set();
  const cities = (json.geonames || [])
    .filter((c) => c.name && !seen.has(c.name) && seen.add(c.name))
    .map(({ geonameId, name, adminName1, lat, lng }) => ({
      geonameId,
      name,
      adminName1,
      lat,
      lng,
    }));

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(cities));
  } catch {}
  return cities;
}

export async function reverseGeocode(lat, lng, lang) {
  const q = new URLSearchParams({
    latitude: lat,
    longitude: lng,
    localityLanguage: lang,
  });
  const j = await getJSON(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?${q}`,
  );
  return {
    city: j.city || j.locality || j.principalSubdivision || "",
    country: (j.countryName || "").replace(/\s*\(the\)/i, ""),
  };
}

export async function fetchTimings(lat, lng, date = "") {
  const url = `https://api.aladhan.com/v1/timings${date ? `/${date}` : ""}?latitude=${lat}&longitude=${lng}`;
  const json = await getJSON(url);
  if (json.code !== 200) throw new Error(json.status || "API error");
  return json.data;
}
