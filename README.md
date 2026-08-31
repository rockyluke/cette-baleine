# CETTE BALEINE ?

Le catalogue bilingue des baleines, disponible en
[français](https://cette-baleine.fr/fr/) et en [anglais](https://cette-baleine.fr/en/).

Les fiches Markdown sont rangées dans le dossier [`current/`](current/). Le site
statique destiné à GitHub Pages se trouve dans [`docs/`](docs/).

## Catalogue

La première version contient onze espèces actuelles : baleines à fanons,
baleine grise, grand cachalot et cachalots du genre *Kogia*. Chaque fiche utilise
un nom de fichier scientifique en minuscules, au format `genre-espece.md`.

Les fiches utilisent WoRMS comme référence taxonomique, des références
scientifiques ou institutionnelles lorsqu'elles sont disponibles, ainsi que les
articles Wikipédia en français et en anglais pour faciliter la vérification et
l'approfondissement.

Les clés des fiches sont en anglais. Les champs éditoriaux portent un suffixe
`_fr` ou `_en`, tandis que la taxonomie et les sources restent communes. Les
champs `altname_fr` et `altname_en` rassemblent les noms alternatifs séparés par
`|`. Les océans, mers et zones utilisent des identifiants neutres traduits par
le site.

Une nouvelle espèce se crée à partir de [`MODELE.md`](MODELE.md). Sa fiche doit
être placée dans [`current/`](current/), puis son chemin ajouté à `markdownFiles`
dans [`docs/app.js`](docs/app.js).
