const lang = document.documentElement.lang === "en" ? "en" : "fr";
const labels = {
  fr: { back: "← Retour au catalogue", source: "Source", wiki: "Wikipédia en français ↗", map: "Carte issue de", mapAlt: "Carte de situation de" },
  en: { back: "← Back to the catalog", source: "Source", wiki: "English Wikipedia ↗", map: "Map from", mapAlt: "Location map of" },
}[lang];
const milieux = {
  "ocean-arctique": {
    name: { fr: "Océan Arctique", en: "Arctic Ocean" }, kind: { fr: "Océan", en: "Ocean" },
    description: { fr: "Centré autour du pôle Nord, il est bordé par l'Amérique du Nord, l'Asie et l'Europe. C'est le plus petit des océans et une grande partie de sa surface est couverte par la banquise selon les saisons.", en: "Centered around the North Pole, it is bordered by North America, Asia and Europe. It is the smallest ocean, and much of its surface is seasonally covered by sea ice." },
    facts: { fr: [["5,2 millions de km²", "Superficie de l'océan proprement dit"], ["1 038 m", "Profondeur moyenne"], ["Environ 4 000 m", "Profondeur maximale"]], en: [["5.2 million km²", "Ocean area"], ["1,038 m", "Average depth"], ["About 4,000 m", "Maximum depth"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Oc%C3%A9an_Arctique", en: "https://en.wikipedia.org/wiki/Arctic_Ocean" }, map: "https://upload.wikimedia.org/wikipedia/commons/d/de/LocationArcticOcean.png", mapPage: "https://commons.wikimedia.org/wiki/File:LocationArcticOcean.png",
  },
  "ocean-atlantique": {
    name: { fr: "Océan Atlantique", en: "Atlantic Ocean" }, kind: { fr: "Océan", en: "Ocean" },
    description: { fr: "Situé entre les Amériques à l'ouest et l'Europe et l'Afrique à l'est, l'Atlantique est le deuxième plus vaste océan de la planète.", en: "Located between the Americas to the west and Europe and Africa to the east, the Atlantic is the world's second-largest ocean." },
    facts: { fr: [["82,4 millions de km²", "Superficie"], ["3 332 m", "Profondeur moyenne"], ["8 376 m", "Profondeur maximale"], ["34 à 37 g/L", "Salinité"]], en: [["82.4 million km²", "Area"], ["3,332 m", "Average depth"], ["8,376 m", "Maximum depth"], ["34 to 37 g/L", "Salinity"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Oc%C3%A9an_Atlantique", en: "https://en.wikipedia.org/wiki/Atlantic_Ocean" }, map: "https://upload.wikimedia.org/wikipedia/commons/6/65/Oc%C3%A9an_Atlantique.png", mapPage: "https://commons.wikimedia.org/wiki/File:Oc%C3%A9an_Atlantique.png",
  },
  "ocean-indien": {
    name: { fr: "Océan Indien", en: "Indian Ocean" }, kind: { fr: "Océan", en: "Ocean" },
    description: { fr: "Il s'étend entre l'Afrique, l'Asie, l'Australie et l'Antarctique. Il représente environ un cinquième de la surface océanique mondiale.", en: "It extends between Africa, Asia, Australia and Antarctica and represents about one fifth of the world's ocean surface." },
    facts: { fr: [["70,56 millions de km²", "Superficie"], ["4 210 m", "Profondeur moyenne"], ["7 450 m", "Profondeur maximale"], ["34,5 g/L", "Salinité"]], en: [["70.56 million km²", "Area"], ["4,210 m", "Average depth"], ["7,450 m", "Maximum depth"], ["34.5 g/L", "Salinity"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Oc%C3%A9an_Indien", en: "https://en.wikipedia.org/wiki/Indian_Ocean" }, map: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Oc%C3%A9an_Indien.png", mapPage: "https://commons.wikimedia.org/wiki/File:Oc%C3%A9an_Indien.png",
  },
  "ocean-pacifique": {
    name: { fr: "Océan Pacifique", en: "Pacific Ocean" }, kind: { fr: "Océan", en: "Ocean" },
    description: { fr: "Entre les Amériques et l'Asie-Océanie, le Pacifique est le plus grand et le plus profond océan de la planète.", en: "Between the Americas and Asia-Oceania, the Pacific is the largest and deepest ocean on Earth." },
    facts: { fr: [["165,25 millions de km²", "Superficie"], ["4 300 m", "Profondeur moyenne"], ["10 984 m", "Profondeur maximale"]], en: [["165.25 million km²", "Area"], ["4,300 m", "Average depth"], ["10,984 m", "Maximum depth"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Oc%C3%A9an_Pacifique", en: "https://en.wikipedia.org/wiki/Pacific_Ocean" }, map: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Oc%C3%A9an_Pacifique_d%C3%A9tour%C3%A9e.png", mapPage: "https://commons.wikimedia.org/wiki/File:Oc%C3%A9an_Pacifique_d%C3%A9tour%C3%A9e.png",
  },
  "mer-caraibes": {
    name: { fr: "Mer des Caraïbes", en: "Caribbean Sea" }, kind: { fr: "Mer", en: "Sea" },
    description: { fr: "Cette mer bordière de l'Atlantique se trouve à l'est de l'Amérique centrale, au nord de l'Amérique du Sud et au sud des Grandes Antilles.", en: "This marginal sea of the Atlantic lies east of Central America, north of South America and south of the Greater Antilles." },
    facts: { fr: [["2,64 millions de km²", "Superficie"], ["3 020 km", "Longueur"], ["7 686 m", "Profondeur maximale"]], en: [["2.64 million km²", "Area"], ["3,020 km", "Length"], ["7,686 m", "Maximum depth"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Mer_des_Cara%C3%AFbes", en: "https://en.wikipedia.org/wiki/Caribbean_Sea" }, map: "https://upload.wikimedia.org/wikipedia/commons/9/91/La2-demis-caribbean.png", mapPage: "https://commons.wikimedia.org/wiki/File:La2-demis-caribbean.png",
  },
  "mer-groenland": {
    name: { fr: "Mer du Groenland", en: "Greenland Sea" }, kind: { fr: "Mer", en: "Sea" },
    description: { fr: "Mer bordière de l'océan Arctique, elle se situe entre la côte orientale du Groenland, l'Islande, Jan Mayen et le Spitzberg.", en: "A marginal sea of the Arctic Ocean, it lies between eastern Greenland, Iceland, Jan Mayen and Spitsbergen." },
    facts: { fr: [["1,205 million de km²", "Superficie"], ["1 450 m", "Profondeur moyenne"], ["4 800 m", "Profondeur maximale"]], en: [["1.205 million km²", "Area"], ["1,450 m", "Average depth"], ["4,800 m", "Maximum depth"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Mer_du_Groenland", en: "https://en.wikipedia.org/wiki/Greenland_Sea" }, map: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fram_Strait_map.png", mapPage: "https://commons.wikimedia.org/wiki/File:Fram_Strait_map.png",
  },
  "mer-mediterranee": {
    name: { fr: "Mer Méditerranée", en: "Mediterranean Sea" }, kind: { fr: "Mer", en: "Sea" },
    description: { fr: "Presque entièrement fermée, elle se trouve entre l'Europe, l'Afrique et l'Asie occidentale. Le détroit de Gibraltar la relie à l'océan Atlantique.", en: "Almost entirely enclosed, it lies between Europe, Africa and western Asia. The Strait of Gibraltar connects it to the Atlantic Ocean." },
    facts: { fr: [["2,51 millions de km²", "Superficie"], ["1 500 m", "Profondeur moyenne"], ["5 369 m", "Profondeur maximale"], ["38 g/L", "Salinité"]], en: [["2.51 million km²", "Area"], ["1,500 m", "Average depth"], ["5,369 m", "Maximum depth"], ["38 g/L", "Salinity"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Mer_M%C3%A9diterran%C3%A9e", en: "https://en.wikipedia.org/wiki/Mediterranean_Sea" }, map: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Carte_Mediterranee_03.jpg", mapPage: "https://commons.wikimedia.org/wiki/File:Carte_Mediterranee_03.jpg",
  },
  "mer-noire": {
    name: { fr: "Mer Noire", en: "Black Sea" }, kind: { fr: "Mer", en: "Sea" },
    description: { fr: "Située entre l'Europe, le Caucase et l'Anatolie, elle communique avec la Méditerranée par le Bosphore, la mer de Marmara et les Dardanelles. Ses eaux profondes sont pauvres en oxygène.", en: "Located between Europe, the Caucasus and Anatolia, it connects to the Mediterranean through the Bosporus, the Sea of Marmara and the Dardanelles. Its deep waters are oxygen-poor." },
    facts: { fr: [["Environ 436 000 km²", "Superficie"], ["2 206 m", "Profondeur maximale"]], en: [["About 436,000 km²", "Area"], ["2,206 m", "Maximum depth"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Mer_Noire", en: "https://en.wikipedia.org/wiki/Black_Sea" }, map: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Mer_Noire_%28carte%29.png", mapPage: "https://commons.wikimedia.org/wiki/File:Mer_Noire_(carte).png",
  },
  "mer-rouge": {
    name: { fr: "Mer Rouge", en: "Red Sea" }, kind: { fr: "Mer", en: "Sea" },
    description: { fr: "Mer bordière de l'océan Indien, elle sépare l'Afrique du Nord de l'Asie de l'Ouest. Le canal de Suez la relie à la Méditerranée.", en: "A marginal sea of the Indian Ocean, it separates northeastern Africa from western Asia. The Suez Canal connects it to the Mediterranean." },
    facts: { fr: [["450 000 km²", "Superficie"], ["500 m", "Profondeur moyenne"], ["Environ 2 500 m", "Profondeur maximale"], ["42 USP", "Salinité"]], en: [["450,000 km²", "Area"], ["500 m", "Average depth"], ["About 2,500 m", "Maximum depth"], ["42 PSU", "Salinity"]] },
    wiki: { fr: "https://fr.wikipedia.org/wiki/Mer_Rouge", en: "https://en.wikipedia.org/wiki/Red_Sea" }, map: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Red_Sea_topographic_map-fr.svg", mapPage: "https://commons.wikimedia.org/wiki/File:Red_Sea_topographic_map-fr.svg",
  },
};

const milieu = milieux[document.body.dataset.milieu];
if (milieu) {
  const name = milieu.name[lang];
  document.title = `${name} - Cette baleine`;
  document.querySelector(".back-link").textContent = labels.back;
  document.querySelector(".milieu-kind").textContent = milieu.kind[lang];
  document.querySelector("h1").textContent = name;
  document.querySelector(".milieu-copy").textContent = milieu.description[lang];
  document.querySelector(".milieu-facts").replaceChildren(...milieu.facts[lang].map(([value, label]) => {
    const item = document.createElement("div"); item.className = "milieu-fact";
    const strong = document.createElement("strong"); strong.textContent = value;
    const span = document.createElement("span"); span.textContent = label;
    item.append(strong, span); return item;
  }));
  const image = document.querySelector(".milieu-map img"); image.src = milieu.map; image.alt = `${labels.mapAlt} ${name}`;
  document.querySelector(".map-caption-prefix").textContent = `${labels.map} `;
  const mapLink = document.querySelector(".map-source"); mapLink.href = milieu.mapPage;
  const wikiLink = document.querySelector(".wiki-source"); wikiLink.href = milieu.wiki[lang]; wikiLink.textContent = labels.wiki;
  try { localStorage.setItem("cette-baleine-language", lang); } catch {}
}
