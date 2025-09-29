# Application Electron avec Vue.js

Cette application est une démonstration d'une application de gestion d'articles construite avec Electron et Vue.js.

## Configuration de l'environnement

### Prérequis
- Node.js
- npm

### Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/A-Gaborit/ElectronJSDemo.git
   cd app_demo
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

### Développement

Pour lancer l'application en mode développement :
```bash
npm run start
```

## Structure du projet

### `/src` - Code source principal

#### `/components`: Composants réutilisables de l'application
- `Navbar.vue` : Barre de navigation principale

#### `/router`: Configuration du routeur Vue.js
- `index.js` : Définition des routes de l'application

#### `/services`: Services pour l'interaction avec l'API
- `api.js` : Configuration de l'URL de base de l'API (définie sur `http://localhost:3000`)
- `auth.js` : Service d'authentification
- `article.js` : Service pour la gestion des articles

#### `/views`: Pages principales de l'application
- `Login.vue` : Page de connexion / inscription
- `/Articles` : Dossier contenant les vues liées aux articles
  - `ArticleList.vue` : Liste des articles
  - `ArticleDetail.vue` : Détail d'un article
  - `ArticleForm.vue` : Formulaire de création/édition d'un article

#### Fichiers racine
- `App.vue` : Composant racine de l'application
- `main.js` : Point d'entrée principal de l'application
- `preload.js` : Script de préchargement Electron
- `renderer.js` : Point d'entrée du processus de rendu

## Configuration de l'API

L'URL de l'API est configurée dans le fichier `src/services/api.js` :
```javascript
const API_URL = 'http://localhost:3000';
```

Assurez-vous que le serveur API est en cours d'exécution sur ce port avant de démarrer l'application.
