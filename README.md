# Mode d'emploi du portfolio — Alexandre Vincent

Ce dossier contient la page d'accueil du portfolio d'Alexandre Vincent ainsi que les sites réalisés dans le sous-dossier `Site-ex`.

## 1. Structure des fichiers

```text
Portfolio/
├── index.html         (structure de la page d'accueil)
├── css/
│   └── style.css      (feuille de style sombre)
├── README.md          (ce guide)
└── Site-ex/           (les 6 sites réalisés, intacts)
```

## 2. Ajouter tes coordonnées de contact

Lorsque tu souhaiteras afficher ton adresse e-mail, ton profil GitHub ou ton profil LinkedIn, ouvre `index.html` et complète la section `#contact` (`<section id="contact" ...>`).

---

## 3. Mettre le portfolio en ligne gratuitement

### Option A : Netlify Drop (le plus rapide, sans ligne de commande)

1. Va sur le site [app.netlify.com/drop](https://app.netlify.com/drop) et crée un compte gratuit si tu n'en as pas.
2. Prends ton dossier `Portfolio` complet (qui contient `index.html`, `css/` et `Site-ex/`) depuis ton ordinateur et glisse-le directement dans la zone encadrée sur la page Netlify.
3. Attends quelques secondes : ton site est en ligne avec une adresse du type `nom-aleatoire.netlify.app`. Tu peux modifier ce sous-domaine gratuitement dans **Site configuration > Change site name**.

**Pour mettre à jour plus tard sur Netlify :**
Retourne dans l'onglet **Deploys** de ton site sur Netlify et glisse à nouveau ton dossier `Portfolio` mis à jour dans la zone de dépôt.

---

### Option B : GitHub Pages (hébergement gratuit via Git)

1. Crée un compte sur [github.com](https://github.com) et installe [Git](https://git-scm.com/) sur ton ordinateur.
2. Sur GitHub, clique sur **New repository**, donne-lui un nom (par exemple `portfolio`), coche **Public**, puis clique sur **Create repository** sans cocher d'autres options.
3. Ouvre un terminal (PowerShell ou Invite de commandes) dans le dossier `Portfolio` et copie-colle ces commandes une par une :

```bash
git init
git add .
git commit -m "Premiere mise en ligne du portfolio"
git branch -M main
git remote add origin https://github.com/Miouse/Miouse-Lab.github.io.git
git push -u origin main
```

4. Sur la page GitHub de ton dépôt, va dans **Settings** > **Pages** (dans le menu de gauche).
5. Sous **Build and deployment** > **Branch**, choisis `main` et `/ (root)`, puis clique sur **Save**.
6. Après une à deux minutes, ton site sera accessible à l'adresse `https://miouse.github.io/Miouse-Lab.github.io/`.

**Pour mettre à jour plus tard sur GitHub Pages :**
Après avoir modifié un fichier ou ajouté un site, ouvre le terminal dans le dossier `Portfolio` et lance :

```bash
git add .
git commit -m "Mise a jour du portfolio"
git push
```

---

## 4. Brancher un nom de domaine personnalisé (optionnel)

Si tu achètes un nom de domaine (ex. `alexandre-vincent.fr` chez OVH, Gandi, Cloudflare, etc.) :
- **Sur Netlify** : va dans **Domain management** > **Add a domain**, indique ton domaine et suis les instructions pour pointer les serveurs DNS ou l'enregistrement CNAME vers Netlify. Le certificat HTTPS est activé automatiquement.
- **Sur GitHub Pages** : va dans **Settings** > **Pages** > **Custom domain**, tape ton nom de domaine, enregistre, puis configure chez ton hébergeur DNS un enregistrement `CNAME` pointant vers `TON-UTILISATEUR.github.io` (ou les 4 adresses IP `A` fournies par la documentation GitHub), puis coche **Enforce HTTPS**.

---

## 5. Poids actuel des sites et checklist d'allègement

### Poids mesuré pour chaque sous-dossier de `Site-ex`

| Sous-dossier | Poids total | État |
| :--- | :--- | :--- |
| `application mobile SaaS` | 113,5 Ko (0,11 Mo) | Très léger |
| `Boulangerie artisanale` | 46,5 Ko (0,05 Mo) | Très léger |
| `Cabinet d’architecte` | 47,2 Ko (0,05 Mo) | Très léger |
| `dashboard de suivi d’habitudes` | 147,5 Ko (0,14 Mo) | Très léger |
| `Photographe` | 61,3 Ko (0,06 Mo) | Très léger |
| `restaurant gastronomique` | 4 885 Ko (4,77 Mo) | À alléger en priorité (6 photos JPG entre 767 Ko et 862 Ko chacune) |

Aucun fichier ne dépasse la limite bloquante de 25 Mo, mais le dossier `restaurant gastronomique` représente à lui seul 92 % du poids total.

### Checklist avant d'ajouter de nouveaux sites

- **Compresser les images** : passe les photos JPG/PNG dans [squoosh.app](https://squoosh.app) et convertis-les au format **WebP** (ou JPG qualité 75-80 %) en réduisant leur largeur à 1600 px maximum. Les 6 images de `restaurant gastronomique/assets/images/` peuvent ainsi passer de 4,8 Mo à moins de 600 Ko au total.
- **Héberger les vidéos ailleurs** : ne mets pas de fichiers `.mp4` ou `.mov` lourds dans les dossiers. Héberge-les sur YouTube en mode « Non répertorié » et intègre-les avec une balise `<iframe>`.
- **Supprimer les fichiers inutiles** : avant la mise en ligne, vérifie qu'aucun projet ne contient de dossier `node_modules`, de fichiers `.zip`, `.psd` ou de sauvegardes temporaires (`.bak`, copies).
- **Vérifier la taille maximale par fichier** : assure-toi qu'aucun fichier individuel ne dépasse **25 Mo** (limite stricte sur l'interface web de GitHub et recommandation pour un chargement rapide).
