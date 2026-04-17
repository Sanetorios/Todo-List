# Todo App

## Description

Cette application Todo est un projet simple pour gérer une liste de tâches. Elle permet d'ajouter, marquer comme terminées et supprimer des tâches. L'application est composée d'un backend (serveur) écrit en Node.js avec Express, et d'un frontend (interface utilisateur) en HTML, CSS et JavaScript.

Le backend stocke les tâches dans un fichier JSON (`todos.json`), et le frontend communique avec le backend via des requêtes HTTP (API REST).

## Fonctionnalités

- Ajouter une nouvelle tâche avec un titre et une description optionnelle
- Afficher la liste des tâches
- Marquer une tâche comme terminée ou non terminée
- Supprimer une tâche
- Interface utilisateur simple et moderne

## Technologies utilisées

- **Backend** :
  - Node.js : Environnement d'exécution JavaScript côté serveur
  - Express.js : Framework pour créer des API web
  - CORS : Pour permettre les requêtes depuis le frontend
  - JSON : Format de stockage des données

- **Frontend** :
  - HTML : Structure de la page
  - CSS : Styles pour l'apparence
  - JavaScript : Logique pour interagir avec l'utilisateur et l'API

## Installation

### Prérequis

- Node.js installé sur votre ordinateur (version 14 ou supérieure)
- Un navigateur web (comme Chrome ou Firefox)

### Étapes d'installation

1. **Téléchargez ou clonez le projet** :
   - Si vous avez un fichier ZIP, extrayez-le.
   - Ou utilisez Git : `git clone <url-du-repo>`

2. **Installez les dépendances du backend** :
   - Ouvrez un terminal (ou invite de commandes).
   - Allez dans le dossier `Backend` : `cd Backend`
   - Installez les paquets : `npm install`

3. **Vérifiez les fichiers** :
   - Assurez-vous que les fichiers sont présents :
     - `Backend/app.js`
     - `Backend/package.json`
     - `Backend/todos.json`
     - `frontend/index.html`
     - `frontend/script.js`

## Utilisation

### Démarrer le serveur backend

1. Ouvrez un terminal.
2. Allez dans le dossier `Backend` : `cd Backend`
3. Lancez le serveur : `npm start`
4. Vous devriez voir : "Serveur démarré sur http://localhost:3000"

Le serveur doit rester en cours d'exécution pour que l'application fonctionne.

### Ouvrir l'application

1. Ouvrez votre navigateur web.
2. Allez à l'adresse : `http://localhost:3000` (mais attendez, le frontend est servi statiquement ? Non, le frontend est dans un dossier séparé.

Le frontend est dans `frontend/`, et le backend sert l'API, mais pour ouvrir le site, il faut ouvrir `frontend/index.html` dans le navigateur.

Dans le script.js, l'URL de l'API est `http://localhost:3000`, donc le frontend doit être ouvert via un serveur local ou directement.

Pour simplifier, l'utilisateur peut ouvrir `frontend/index.html` directement dans le navigateur, mais les requêtes CORS pourraient poser problème si pas servi localement.

Dans app.js, CORS est activé avec origin: '*', donc ça devrait aller.

Pour les étudiants de première année, expliquer simplement.

### Comment utiliser l'app

- **Ajouter une tâche** : Tapez un titre (obligatoire) et une description (optionnelle), puis cliquez sur "+ Ajouter la tâche".
- **Marquer comme faite** : Cliquez sur "✔ Fait" pour une tâche en cours, ou "↩ Annuler" pour une tâche faite.
- **Supprimer** : Cliquez sur "🗑 Supprimer".

Les tâches sont sauvegardées dans `todos.json` côté serveur.

## Structure du projet

```
TP-Todo-DavidGomez/
├── Backend/
│   ├── app.js              # Point d'entrée du serveur
│   ├── package.json        # Dépendances et scripts
│   ├── todos.json          # Stockage des tâches
│   ├── controller/
│   │   └── todos.js        # Logique pour gérer les tâches
│   └── router/
│       └── todos.js        # Routes de l'API
└── frontend/
    ├── index.html          # Page principale
    └── script.js           # JavaScript pour le frontend
```

## API (pour référence)

Le backend expose une API REST simple :

- `GET /todos` : Récupérer toutes les tâches
- `POST /todos` : Créer une nouvelle tâche (body: { titre, description })
- `PUT /todos/:id` : Modifier une tâche (marquer faite/non faite)
- `DELETE /todos/:id` : Supprimer une tâche

## Dépannage

- **Le bouton "Ajouter" ne marche pas** : Vérifiez que le serveur backend est démarré (`npm start` dans Backend).
- **Erreur de connexion** : Assurez-vous que le port 3000 n'est pas utilisé par autre chose.
- **Tâches ne se sauvegardent pas** : Vérifiez les permissions d'écriture sur `todos.json`.

## Améliorations possibles

- Ajouter une base de données (comme MongoDB) au lieu d'un fichier JSON.
- Ajouter une authentification utilisateur.
- Déployer l'application en ligne.

Ce projet est un bon exemple pour apprendre les bases du développement web full-stack avec JavaScript.