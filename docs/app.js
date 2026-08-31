const markdownFiles = [
  "current/balaenoptera-musculus.md",
  "current/megaptera-novaeangliae.md",
  "current/balaenoptera-physalus.md",
  "current/eubalaena-glacialis.md",
  "current/balaena-mysticetus.md",
  "current/balaenoptera-borealis.md",
  "current/eschrichtius-robustus.md",
  "current/physeter-macrocephalus.md",
  "current/kogia-breviceps.md",
  "current/kogia-sima.md",
  "current/balaenoptera-omurai.md",
];

const lang = document.documentElement.lang === "en" ? "en" : "fr";
const messages = {
  fr: { all: "Tous", allFeminine: "Toutes", current: "Baleines actuelles", extinct: "Espèces disparues", fictional: "Baleines fictives", whale: "baleine", whales: "baleines", game: "Jeu vidéo", movie: "Film", series: "Série", fictionalBadge: "Fictive", extinctBadge: "Disparue", source: "Source", sources: "Sources", loadError: "Le catalogue n'a pas pu être chargé.", viewMarkdown: "Consulter les fichiers Markdown sur GitHub." },
  en: { all: "All", allFeminine: "All", current: "Living whales", extinct: "Extinct species", fictional: "Fictional whales", whale: "whale", whales: "whales", game: "Video game", movie: "Movie", series: "TV series", fictionalBadge: "Fictional", extinctBadge: "Extinct", source: "Source", sources: "Sources", loadError: "The catalog could not be loaded.", viewMarkdown: "Browse the Markdown files on GitHub." },
}[lang];
const oceanNames = {
  arctic: { fr: "Océan Arctique", en: "Arctic Ocean" }, atlantic: { fr: "Océan Atlantique", en: "Atlantic Ocean" },
  indian: { fr: "Océan Indien", en: "Indian Ocean" }, pacific: { fr: "Océan Pacifique", en: "Pacific Ocean" },
};
const seaNames = {
  caribbean: { fr: "Mer des Caraïbes", en: "Caribbean Sea" }, greenland: { fr: "Mer du Groenland", en: "Greenland Sea" },
  mediterranean: { fr: "Mer Méditerranée", en: "Mediterranean Sea" }, black: { fr: "Mer Noire", en: "Black Sea" }, red: { fr: "Mer Rouge", en: "Red Sea" },
};
const zoneNames = {
  epipelagic: { fr: "Épipélagique", en: "Epipelagic" }, mesopelagic: { fr: "Mésopélagique", en: "Mesopelagic" },
  bathypelagic: { fr: "Bathypélagique", en: "Bathypelagic" }, abyssopelagic: { fr: "Abyssopélagique", en: "Abyssopelagic" },
  hadalpelagic: { fr: "Hadopélagique", en: "Hadalpelagic" }, "fictional universe": { fr: "Univers fictif", en: "Fictional universe" },
};

const state = { whales: [], query: "", ocean: "all", sea: "all", type: "all" };
const elements = {
  form: document.querySelector("#search-form"), input: document.querySelector("#search-input"),
  grid: document.querySelector("#whale-grid"), filters: document.querySelector("#ocean-filters"), seaFilters: document.querySelector("#sea-filters"), typeFilters: document.querySelector("#type-filters"),
  count: document.querySelector("#whale-count"), countLabel: document.querySelector("#whale-count-label"),
  empty: document.querySelector("#empty-state"), reset: document.querySelector("#reset-search"),
  template: document.querySelector("#whale-card-template"),
};

function normalize(value) { return value.toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function list(value = "") { return value.split("|").map((item) => item.trim()).filter(Boolean); }
const placePages = {
  arctic: "oceans/arctique.html", atlantic: "oceans/atlantique.html", indian: "oceans/indien.html", pacific: "oceans/pacifique.html",
  caribbean: "mers/caraibes.html", greenland: "mers/groenland.html", mediterranean: "mers/mediterranee.html", black: "mers/noire.html", red: "mers/rouge.html",
};
function renderPlaces(element, whale) {
  const places = [...whale.oceans.map((id) => ({ id, label: oceanNames[id]?.[lang] || id })), ...whale.seas.map((id) => ({ id, label: seaNames[id]?.[lang] || id })), ...whale.locations.map((label) => ({ label }))];
  places.forEach((place, index) => {
    if (index) element.append(document.createTextNode(" · "));
    if (!placePages[place.id]) { element.append(document.createTextNode(place.label)); return; }
    const link = document.createElement("a"); link.href = placePages[place.id]; link.textContent = place.label; link.className = "place-link"; element.append(link);
  });
}
function universeItems(value, category) {
  return list(value).map((item) => { const separator = item.indexOf("::"); return { category, name: separator < 0 ? item : item.slice(0, separator), url: separator < 0 ? "" : item.slice(separator + 2) }; });
}
function renderUniverses(element, whale) {
  const items = [...universeItems(whale.universe_games, messages.game), ...universeItems(whale.universe_movies, messages.movie), ...universeItems(whale.universe_series, messages.series)];
  items.forEach((item, index) => {
    if (index) element.append(document.createTextNode(" · "));
    const label = `${item.category} : ${item.name}`;
    if (!item.url) { element.append(document.createTextNode(label)); return; }
    const link = document.createElement("a"); link.href = item.url; link.target = "_blank"; link.rel = "noreferrer"; link.textContent = `${label} ↗`; element.append(link);
  });
  return items.length;
}
function zoneId(value) { return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function renderZoneLinks(element, zones) {
  zones.forEach((zone, index) => {
    if (index) element.append(document.createTextNode(" · "));
    if (zone === "fictional universe") { element.append(document.createTextNode(zoneNames[zone][lang])); return; }
    const link = document.createElement("a");
    link.href = `zones.html#${zone}`;
    link.textContent = zoneNames[zone]?.[lang] || zone;
    link.className = "zone-link";
    element.append(link);
  });
}
function parseMarkdown(markdown, file) {
  const block = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!block) return null;
  const data = Object.fromEntries(block[1].split("\n").map((line) => {
    const index = line.indexOf(":"); return index < 0 ? [line, ""] : [line.slice(0, index).trim(), line.slice(index + 1).trim()];
  }));
  return { ...data, file, name: data[`name_${lang}`] || data.name_fr, altnames: list(data[`altname_${lang}`] || data.altname_fr), oceans: list(data.oceans), seas: list(data.seas), locations: list(data[`locations_${lang}`] || data.locations_fr), size: data[`size_${lang}`] || data.size_fr, weight: data[`weight_${lang}`] || data.weight_fr, dietItems: list(data[`diet_${lang}`] || data.diet_fr), waterColumn: list(data.water_column), depth: data[`depth_${lang}`] || data.depth_fr };
}

async function copyPlainText(text, button) {
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else {
      const field = document.createElement("textarea");
      field.value = text; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0";
      document.body.append(field); field.select(); document.execCommand("copy"); field.remove();
    }
    button.classList.add("copied"); window.setTimeout(() => button.classList.remove("copied"), 1200);
  } catch {}
}

function createCard(whale) {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector(".whale-card");
  const nameButton = fragment.querySelector(".common-name");
  const scientificButton = fragment.querySelector(".scientific-name");
  nameButton.textContent = whale.name;
  const scientificName = whale.type === "fictional" && whale.scientific_name === "Créature fictive" ? (lang === "fr" ? "Créature fictive" : "Fictional creature") : whale.scientific_name;
  scientificButton.textContent = scientificName;
  nameButton.setAttribute("aria-label", `${lang === "fr" ? "Copier" : "Copy"} ${whale.name}`);
  scientificButton.setAttribute("aria-label", `${lang === "fr" ? "Copier" : "Copy"} ${scientificName}`);
  nameButton.dataset.copyFeedback = lang === "fr" ? "Copié" : "Copied";
  scientificButton.dataset.copyFeedback = lang === "fr" ? "Copié" : "Copied";
  nameButton.addEventListener("click", () => copyPlainText(whale.name, nameButton));
  scientificButton.addEventListener("click", () => copyPlainText(scientificName, scientificButton));
  const badge = fragment.querySelector(".status-badge");
  if (whale.type === "fictional") { card.classList.add("fictional"); badge.textContent = messages.fictionalBadge; badge.hidden = false; }
  if (whale.type === "extinct") { card.classList.add("extinct"); badge.textContent = lang === "fr" ? `${messages.extinctBadge} - ${whale.extinct_million_years.replace(".", ",")} millions d'années` : `${messages.extinctBadge} - ${whale.extinct_million_years} million years`; badge.hidden = false; }
  renderPlaces(fragment.querySelector(".places"), whale);
  const altnameRow = fragment.querySelector(".altname-row");
  altnameRow.hidden = whale.altnames.length === 0;
  fragment.querySelector(".altnames").textContent = whale.altnames.join(" · ");
  fragment.querySelector(".size").textContent = whale.size;
  fragment.querySelector(".weight").textContent = whale.weight;
  fragment.querySelector(".food").textContent = whale.dietItems.join(" · ");
  renderZoneLinks(fragment.querySelector(".water-column"), whale.waterColumn);
  fragment.querySelector(".depth").textContent = whale.depth;
  const universeRow = fragment.querySelector(".universe-row");
  universeRow.hidden = renderUniverses(fragment.querySelector(".universes"), whale) === 0;
  if (whale.source_doris) fragment.querySelector(".doris").href = whale.source_doris; else fragment.querySelector(".doris").remove();
  if (whale.source_wikipedia_fr) fragment.querySelector(".wikipedia-fr").href = whale.source_wikipedia_fr; else fragment.querySelector(".wikipedia-fr").remove();
  if (whale.source_wikipedia_en) fragment.querySelector(".wikipedia-en").href = whale.source_wikipedia_en; else fragment.querySelector(".wikipedia-en").remove();
  if (whale.source_worms) fragment.querySelector(".worms").href = whale.source_worms; else fragment.querySelector(".worms").remove();
  if (whale.source_inpn) fragment.querySelector(".inpn").href = whale.source_inpn; else fragment.querySelector(".inpn").remove();
  if (whale.source_fishbase) fragment.querySelector(".fishbase").href = whale.source_fishbase; else fragment.querySelector(".fishbase").remove();
  if (whale.source_scientific) fragment.querySelector(".scientific-source").href = whale.source_scientific; else fragment.querySelector(".scientific-source").remove();
  fragment.querySelector(".markdown").href = `https://github.com/rockyluke/cette-baleine/edit/main/${whale.file}`;
  const sourceCount = fragment.querySelectorAll(".sources a").length;
  if (!sourceCount) fragment.querySelector(".source-row").remove(); else fragment.querySelector(".source-label").textContent = sourceCount === 1 ? messages.source : messages.sources;
  whale.searchText = normalize([whale.name, ...whale.altnames, whale.scientific_name, whale.genus, whale.family, ...whale.oceans.map((id) => oceanNames[id]?.[lang] || id), ...whale.seas.map((id) => seaNames[id]?.[lang] || id), ...whale.locations].join(" "));
  card.id = whale.slug;
  return card;
}

function render() {
  const query = normalize(state.query.trim());
  const visible = state.whales.filter((whale) => (!query || whale.searchText.includes(query)) && (state.ocean === "all" || whale.oceans.includes(state.ocean)) && (state.sea === "all" || whale.seas.includes(state.sea)) && (state.type === "all" || whale.type === state.type));
  elements.grid.replaceChildren(...visible.map((whale) => whale.card));
  elements.grid.hidden = visible.length === 0; elements.empty.hidden = visible.length !== 0;
  elements.grid.setAttribute("aria-busy", "false"); elements.count.textContent = visible.length;
  elements.countLabel.textContent = visible.length === 1 ? messages.whale : messages.whales;
  document.querySelectorAll(".filter-button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.ocean === state.ocean)));
  document.querySelectorAll(".sea-button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.sea === state.sea)));
  document.querySelectorAll(".type-button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.type === state.type)));
}

function renderFilters() {
  const oceans = [...new Set(state.whales.flatMap((whale) => whale.oceans))].sort((a, b) => a.localeCompare(b, "fr"));
  const options = [{ label: messages.all, value: "all" }, ...oceans.map((ocean) => ({ label: oceanNames[ocean]?.[lang] || ocean, value: ocean }))];
  elements.filters.replaceChildren(...options.map(({ label, value }) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "filter-button";
    button.dataset.ocean = value; button.textContent = label; button.setAttribute("aria-pressed", String(value === state.ocean));
    button.addEventListener("click", () => { state.ocean = value; render(); }); return button;
  }));
  const seas = [...new Set(state.whales.flatMap((whale) => whale.seas))].sort((a, b) => a.localeCompare(b, "fr"));
  const seaOptions = [{ label: messages.allFeminine, value: "all" }, ...seas.map((sea) => ({ label: seaNames[sea]?.[lang] || sea, value: sea }))];
  elements.seaFilters.replaceChildren(...seaOptions.map(({ label, value }) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "filter-button sea-button";
    button.dataset.sea = value; button.textContent = label; button.setAttribute("aria-pressed", String(value === state.sea));
    button.addEventListener("click", () => { state.sea = value; render(); }); return button;
  }));
  const types = [{ label: messages.all, value: "all" }, { label: messages.current, value: "current" }, { label: messages.extinct, value: "extinct" }, { label: messages.fictional, value: "fictional" }];
  elements.typeFilters.replaceChildren(...types.map(({ label, value }) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "filter-button type-button";
    button.dataset.type = value; button.textContent = label; button.setAttribute("aria-pressed", String(value === state.type));
    button.addEventListener("click", () => { state.type = value; render(); }); return button;
  }));
}

async function loadMarkdown(file) {
  const local = `../../${file}`;
  const remote = `https://raw.githubusercontent.com/rockyluke/cette-baleine/main/${file}`;
  try { const response = await fetch(local, { cache: "no-store" }); if (response.ok) return response.text(); } catch {}
  const response = await fetch(remote, { cache: "no-store" }); if (!response.ok) throw new Error(file); return response.text();
}

async function init() {
  try {
    const documents = await Promise.all(markdownFiles.map(async (file) => parseMarkdown(await loadMarkdown(file), file)));
    state.whales = documents.filter(Boolean).sort((a, b) => a.name.localeCompare(b.name, lang));
    state.whales.forEach((whale) => { whale.card = createCard(whale); }); renderFilters(); render();
  } catch {
    elements.grid.innerHTML = `<p>${messages.loadError} <a href="https://github.com/rockyluke/cette-baleine">${messages.viewMarkdown}</a></p>`;
  }
}

try { localStorage.setItem("cette-baleine-language", lang); } catch {}
elements.form.addEventListener("submit", (event) => event.preventDefault());
elements.input.addEventListener("input", (event) => { state.query = event.target.value; render(); });
elements.reset.addEventListener("click", () => { state.query = ""; state.ocean = "all"; state.sea = "all"; state.type = "all"; elements.input.value = ""; render(); elements.input.focus(); });
document.addEventListener("keydown", (event) => { if (event.key === "/" && document.activeElement !== elements.input) { event.preventDefault(); elements.input.focus(); } });
init();
