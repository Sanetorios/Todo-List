// On importe fs pour lire/écrire des fichiers
const fs = require('fs');
// On importe path pour gérer les chemins de fichiers
const path = require('path');

// On définit le chemin vers le fichier où on stocke les tâches
const fichierTodos = path.join(__dirname, '../todos.json');

// Fonction pour lire les tâches depuis le fichier JSON
function lireTodos() {
  // On lit le contenu du fichier en texte
  const contenu = fs.readFileSync(fichierTodos, 'utf-8');
  // On transforme le texte JSON en objet JavaScript
  return JSON.parse(contenu);
}

// Fonction pour sauvegarder les tâches dans le fichier JSON
function sauvegarderTodos(todos) {
  // On transforme l'objet en texte JSON et on l'écrit dans le fichier
  fs.writeFileSync(fichierTodos, JSON.stringify(todos, null, 2));
}

// Fonction pour récupérer toutes les tâches
const getAllTodos = (req, res) => {
  try {
    // On lit les tâches
    const todos = lireTodos();
    // On renvoie les tâches avec un code de succès
    res.status(200).json(todos);
  } catch (erreur) {
    // Si erreur, on renvoie un message d'erreur
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
};

// Fonction pour récupérer une tâche par son ID
const getTodoById = (req, res) => {
  try {
    // On récupère l'ID depuis l'URL
    const id = parseInt(req.params.id);
    const todos = lireTodos();
    // On cherche la tâche avec cet ID
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      // Si pas trouvée, erreur 404
      res.status(404).json({ message: 'Tâche non trouvée' });
    } else {
      // Sinon, on la renvoie
      res.status(200).json(todo);
    }
  } catch (erreur) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche' });
  }
};

// Fonction pour créer une nouvelle tâche
const createTodo = (req, res) => {
  try {
    // On récupère les données envoyées par le frontend
    const { titre, description } = req.body;

    // Vérification : le titre est obligatoire
    if (!titre) {
      return res.status(400).json({ message: 'Le titre est obligatoire' });
    }

    const todos = lireTodos();

    // On calcule un nouvel ID (le plus grand +1)
    const nouvelId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    // On crée la nouvelle tâche
    const nouvelleTache = {
      id: nouvelId,
      titre: titre,
      description: description || '', // Si pas de description, on met vide
      fait: false // Par défaut, pas faite
    };

    // On ajoute à la liste
    todos.push(nouvelleTache);
    // On sauvegarde
    sauvegarderTodos(todos);

    // On renvoie la nouvelle tâche créée
    res.status(201).json(nouvelleTache);
  } catch (erreur) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
  }
};

// Fonction pour modifier une tâche
const updateTodo = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // On récupère les champs à modifier
    const { titre, description, fait } = req.body;

    const todos = lireTodos();
    // On trouve l'index de la tâche
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // On met à jour seulement les champs fournis
    if (titre !== undefined) todos[index].titre = titre;
    if (description !== undefined) todos[index].description = description;
    if (fait !== undefined) todos[index].fait = fait;

    sauvegarderTodos(todos);

    res.status(200).json(todos[index]);
  } catch (erreur) {
    res.status(500).json({ message: 'Erreur lors de la modification de la tâche' });
  }
};

// Fonction pour supprimer une tâche
const deleteTodo = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todos = lireTodos();
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // On retire la tâche de la liste
    todos.splice(index, 1);
    sauvegarderTodos(todos);

    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (erreur) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
};

// On exporte toutes les fonctions pour les utiliser dans le routeur
module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };