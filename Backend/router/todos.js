// On importe Express pour utiliser le routeur
const express = require('express');
// On crée un routeur pour organiser les chemins de l'API
const router = express.Router();
// On importe le contrôleur qui contient la logique pour les tâches
const controller = require('../controller/todos');

// Route pour récupérer toutes les tâches (GET /todos)
router.get('/todos', controller.getAllTodos);

// Route pour récupérer une tâche spécifique par son ID (GET /todos/1)
router.get('/todos/:id', controller.getTodoById);

// Route pour créer une nouvelle tâche (POST /todos)
router.post('/todos', controller.createTodo);

// Route pour modifier une tâche (PUT /todos/1)
router.put('/todos/:id', controller.updateTodo);

// Route pour supprimer une tâche (DELETE /todos/1)
router.delete('/todos/:id', controller.deleteTodo);

// On exporte le routeur pour l'utiliser dans app.js
module.exports = router;
