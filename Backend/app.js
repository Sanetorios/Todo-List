// On importe Express, un outil pour créer des serveurs web en Node.js
const express = require('express');
// On importe CORS pour permettre au frontend de communiquer avec le backend
const cors = require('cors');

// On crée une application Express
const app = express();
// On définit le port sur lequel le serveur va écouter (comme une adresse)
const port = 3000;

// On active CORS pour que le frontend puisse faire des requêtes sans problème
app.use(cors({ origin: '*' }));

// On dit à Express de comprendre les données JSON envoyées par le frontend
app.use(express.json());

// On importe les routes pour les tâches (comme les chemins pour ajouter/supprimer des todos)
const todosRoutes = require('./router/todos');
// On utilise ces routes dans notre app
app.use(todosRoutes);

// On démarre le serveur et on écoute sur le port défini
app.listen(port, () => {
  // On affiche un message pour dire que le serveur fonctionne
  console.log(`Serveur démarré sur http://localhost:${port}`);
});