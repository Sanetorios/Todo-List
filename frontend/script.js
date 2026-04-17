// L'adresse de notre serveur backend (où on envoie les requêtes)
const urlAPI = "http://localhost:3000";

// On récupère les éléments HTML pour les manipuler
const listeTodos = document.getElementById('liste-todos'); // La liste où afficher les tâches
const inputTitre = document.getElementById('input-titre'); // Le champ pour le titre
const inputDescription = document.getElementById('input-description'); // Le champ pour la description
const btnAjouter = document.getElementById('btn-ajouter'); // Le bouton pour ajouter
const messageErreur = document.getElementById('message-erreur'); // Le message d'erreur
const aucuneTache = document.getElementById('aucune-tache'); // Le message quand pas de tâches

// On vérifie que le bouton est bien trouvé (pour debug)
console.log('Bouton trouvé :', btnAjouter);

// Quand la page se charge, on récupère les tâches
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page chargée, on récupère les tâches...');
  getAllTodos(); // Appel de la fonction pour charger les tâches
});

// Quand on clique sur le bouton ajouter, on crée une tâche
btnAjouter.addEventListener('click', function() {
  console.log('Bouton cliqué !');
  createTodo(); // Appel de la fonction pour créer
});

// Fonction pour récupérer toutes les tâches depuis le serveur (GET)
function getAllTodos() {
  console.log('Appel API GET /todos...');

  // On fait une requête fetch pour demander les tâches
  fetch(urlAPI + '/todos')
    .then(function(response) {
      console.log('Réponse reçue :', response.status);
      // Si la réponse n'est pas ok, on lance une erreur
      if (!response.ok) {
        throw new Error('Erreur serveur : ' + response.status);
      }
      // Sinon, on transforme la réponse en JSON
      return response.json();
    })
    .then(function(todos) {
      console.log('Tâches reçues :', todos);
      // On affiche les tâches dans la page
      afficherTodos(todos);
    })
    .catch(function(err) {
      console.error('Erreur GET :', err);
      // On affiche une alerte si problème
      alert('Impossible de contacter le serveur. Est-ce que npm start est lancé dans le terminal ?');
    });
}

// Fonction pour créer une nouvelle tâche (POST)
function createTodo() {
  // On récupère les valeurs saisies par l'utilisateur
  const titre = inputTitre.value.trim(); // On enlève les espaces
  const description = inputDescription.value.trim();

  console.log('Titre saisi :', titre);

  // Vérification côté frontend : titre obligatoire
  if (!titre) {
    messageErreur.style.display = 'block'; // On montre le message d'erreur
    return; // On arrête
  }

  messageErreur.style.display = 'none'; // On cache l'erreur

  // On prépare les données à envoyer
  const nouvelleTache = { titre: titre, description: description };
  console.log('Envoi de la tâche :', nouvelleTache);

  // On envoie une requête POST pour créer la tâche
  fetch(urlAPI + '/todos', {
    method: 'POST', // Méthode POST pour créer
    headers: {
      'Content-Type': 'application/json' // On dit que c'est du JSON
    },
    body: JSON.stringify(nouvelleTache) // On transforme l'objet en texte JSON
  })
    .then(function(response) {
      console.log('Réponse POST :', response.status);
      if (!response.ok) {
        throw new Error('Erreur serveur : ' + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      console.log('Tâche créée :', data);
      // On vide les champs
      inputTitre.value = '';
      inputDescription.value = '';
      // On recharge la liste
      getAllTodos();
    })
    .catch(function(err) {
      console.error('Erreur POST :', err);
      alert('Erreur lors de la création de la tâche : ' + err.message);
    });
}

// Fonction pour marquer une tâche comme faite ou non (PUT)
function toggleFait(id, faitActuel) {
  // On envoie une requête PUT pour changer le statut
  fetch(urlAPI + '/todos/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fait: !faitActuel }) // On inverse le statut
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erreur serveur : ' + response.status);
      }
      return response.json();
    })
    .then(function() {
      // On recharge la liste après modification
      getAllTodos();
    })
    .catch(function(err) {
      console.error('Erreur PUT :', err);
      alert('Erreur lors de la modification : ' + err.message);
    });
}

// Fonction pour supprimer une tâche (DELETE)
function deleteTodo(id) {
  // On envoie une requête DELETE
  fetch(urlAPI + '/todos/' + id, {
    method: 'DELETE'
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erreur serveur : ' + response.status);
      }
      return response.json();
    })
    .then(function() {
      // On recharge la liste après suppression
      getAllTodos();
    })
    .catch(function(err) {
      console.error('Erreur DELETE :', err);
      alert('Erreur lors de la suppression : ' + err.message);
    });
}

// Fonction pour afficher les tâches dans la page HTML
function afficherTodos(todos) {
  // On vide la liste actuelle
  listeTodos.innerHTML = '';
  // On remet le message "aucune tâche"
  listeTodos.appendChild(aucuneTache);

  // Si pas de tâches, on montre le message
  if (todos.length === 0) {
    aucuneTache.style.display = 'block';
    return;
  }

  // Sinon, on cache le message
  aucuneTache.style.display = 'none';

  // Pour chaque tâche, on crée une carte HTML
  todos.forEach(function(todo) {
    // On crée un div pour la carte
    const carte = document.createElement('div');
    carte.classList.add('todo-carte'); // On ajoute la classe CSS
    if (todo.fait) carte.classList.add('fait'); // Si faite, on ajoute la classe

    // On met le contenu HTML de la carte
    carte.innerHTML = `
      <div class="todo-contenu">
        <p class="todo-titre">${todo.titre}</p>
        <p class="todo-description">${todo.description}</p>
      </div>
      <div class="todo-boutons">
        <button class="btn-fait">${todo.fait ? '↩ Annuler' : '✔ Fait'}</button>
        <button class="btn-supprimer">🗑 Supprimer</button>
      </div>
    `;

    // On ajoute un écouteur pour le bouton "Fait"
    carte.querySelector('.btn-fait').addEventListener('click', function() {
      toggleFait(todo.id, todo.fait); // Appel de la fonction pour changer
    });

    // On ajoute un écouteur pour le bouton "Supprimer"
    carte.querySelector('.btn-supprimer').addEventListener('click', function() {
      deleteTodo(todo.id); // Appel de la fonction pour supprimer
    });

    // On ajoute la carte à la liste
    listeTodos.appendChild(carte);
  });
}