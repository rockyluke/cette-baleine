# CETTE BALEINE ?

Le catalogue bilingue des baleines, disponible en
[français](https://cette-baleine.fr/fr/) et en [anglais](https://cette-baleine.fr/en/).

Les fiches Markdown sont rangées dans les dossiers [`current/`](current/) et
[`fictional/`](fictional/). Le site statique destiné à GitHub Pages se trouve
dans [`docs/`](docs/).

## Catalogue

Le catalogue contient onze espèces actuelles — baleines à fanons, baleine
grise, grand cachalot et cachalots du genre *Kogia* — ainsi que Moby Dick dans
la catégorie des baleines fictives. Chaque fiche utilise un nom de fichier en
minuscules.

Les fiches utilisent WoRMS comme référence taxonomique, des références
scientifiques ou institutionnelles lorsqu'elles sont disponibles, ainsi que les
articles Wikipédia en français et en anglais pour faciliter la vérification et
l'approfondissement.

Les clés des fiches sont en anglais. Les champs éditoriaux portent un suffixe
`_fr` ou `_en`, tandis que la taxonomie et les sources restent communes. Les
champs `altname_fr` et `altname_en` rassemblent les noms alternatifs séparés par
`|`. Les océans, mers et zones utilisent des identifiants neutres traduits par
le site.

Une nouvelle espèce se crée à partir de [`template.md`](template.md). Sa fiche doit
être placée dans le dossier correspondant à son type, puis son chemin ajouté à
`markdownFiles` dans [`docs/app.js`](docs/app.js).
