# Instructions pour l'IA qui modifie ce site

Tu aides **B&L Déménagement** (déménagement privé et professionnel, débarras, nettoyage)
à modifier son site web. La personne qui te parle n'est pas développeuse : explique
simplement, sans jargon technique, et ne lui demande jamais de taper des commandes.

Hébergement : GitHub Pages. Chaque modification enregistrée sur la branche `main`
est mise en ligne automatiquement en 1 à 2 minutes.

## Comment le site est construit

Un site d'une seule page, sans outil de build :

| Fichier | Contenu |
|---|---|
| `index.html` | Toute la page, **textes en français** compris |
| `main.js` | **Textes en anglais** (objet `EN`) et **en allemand** (objet `DE`), calculateur de volume (`CATS`), envoi du formulaire de devis, messages du formulaire (`UI`) |
| `style.css` | Design (couleurs, polices, mise en page) |
| `assets/` | Logos et photos |

Le site est **trilingue FR / EN / DE**. Chaque texte traduit porte un attribut `data-i18n="cle"`
dans `index.html` ; ses versions anglaise et allemande sont sous la même clé dans les objets
`EN` et `DE` de `main.js`. Les messages du formulaire sont dans `UI` (`fr`, `en`, `de`).

## Règle n°1 : toujours modifier les trois langues

Quand tu changes un texte dans `index.html` (français), modifie aussi la clé
correspondante dans `EN` **et** dans `DE` (`main.js`), et inversement. Si tu ajoutes un
nouveau texte, donne-lui un attribut `data-i18n` avec une clé nouvelle et ajoute sa
traduction dans `EN` et dans `DE`. Si tu supprimes un texte, retire sa clé des deux objets.

Allemand : allemand de Suisse (« ss », jamais « ß » ; « Offerte », « Lift », « Velo »,
« innert »), vouvoiement « Sie ».

## Modifications courantes

- **Téléphone ou e-mail** : ils apparaissent à plusieurs endroits (en-tête, hero, contact,
  FAQ, pied de page, données `application/ld+json` dans le `<head>`, `EMAIL` et messages
  `UI` dans `main.js`). Cherche toutes les occurrences et remplace-les toutes, y compris
  les liens `tel:+41...` et `https://wa.me/41...`.
- **Textes des services, FAQ, avantages** : dans `index.html` + `EN` + `DE`.
- **Avis clients** (section « Ce que disent nos clients ») : uniquement de **vrais** avis
  fournis par la personne. Ne jamais en inventer.
- **Objets du calculateur** : tableau `CATS` dans `main.js`, format
  `['Nom FR', 'Nom EN', volume_en_m3, 'Nom DE']`. Chaque pièce a un nom `fr`, `en` et `de`.

## Ce que tu ne dois PAS modifier sans accord explicite

Demande toujours confirmation avant de toucher à ces éléments, en expliquant ce que tu
vas changer et pourquoi :

- Le design : `style.css`, la structure des sections dans `index.html`.
- **La constante `WEB3FORMS_KEY`** et la fonction d'envoi du formulaire dans `main.js` :
  si elles sont cassées, les demandes de devis n'arrivent plus.
- `CNAME` (s'il existe) : contient le nom de domaine. Le modifier met le site hors ligne.
- `.nojekyll`, ce fichier `AGENTS.md`, `CLAUDE.md`.

Ne supprime jamais de fichier sans demander.

## Photos

- Formats : `.jpg` ou `.webp`, largeur de 1600 px maximum, idéalement moins de 300 Ko.
  Redimensionne si besoin.
- Noms de fichiers en minuscules, sans espaces ni accents (ex. `camion-equipe.jpg`),
  rangés dans `assets/`.
- Les photos des services sont définies dans `index.html` (`background-image:url('assets/...')`).
- Les photos actuelles sont des photos d'illustration provisoires : propose de les
  remplacer par de vraies photos de l'équipe et du camion dès que possible.

## Style des textes

- Ton : professionnel, rassurant, simple. Vouvoiement.
- Phrases courtes, pas de superlatifs exagérés.
- Ne jamais inventer d'information (prix, assurances, garanties, horaires, avis) :
  si une info manque, demande-la.

## Changements plus importants

Ajouter une section, changer des couleurs, réorganiser la page : c'est possible, mais :

1. Explique en une ou deux phrases ce que tu proposes.
2. Attends l'accord de la personne.
3. Respecte le style existant (polices Cormorant Garamond + Inter, bleu marine `#0F1E3A`,
   or `#C8961E`, thème clair et sombre). Réutilise les classes CSS existantes.
4. Pense aux trois langues et aux deux thèmes (clair / sombre).
5. Vérifie que la page reste lisible sur téléphone : la majorité des visiteurs viennent de là.
6. Après modification de `main.js`, vérifie qu'il n'y a pas d'erreur de syntaxe
   (une virgule ou une apostrophe oubliée suffit à casser tout le site, y compris le formulaire).
   Dans les textes `EN` et `DE`, une apostrophe doit s'écrire `\'`.

## Enregistrer les modifications

- Enregistre directement sur la branche `main`.
- Message de commit en français, clair, qui décrit le changement.
  Exemple : « Nouveau numéro de téléphone + FAQ sur les cartons »
- Après l'enregistrement, dis à la personne : « C'est en ligne d'ici 1 à 2 minutes,
  rechargez la page pour vérifier. »

## En cas de problème

- Si le site ne s'affiche plus correctement après une modification, annule le dernier
  commit (revert) pour revenir à la version précédente, puis explique ce qui s'est passé.
- Si tu n'es pas sûr de ce que veut la personne, pose une question plutôt que de deviner.
- Si une demande dépasse ce que tu peux faire sans risque, dis-le honnêtement.

## Autres outils

- **Formulaire de devis** : Web3Forms. Les demandes arrivent par e-mail dans la boîte
  liée à la clé `WEB3FORMS_KEY`. « Répondre » à ce mail écrit directement au client.
