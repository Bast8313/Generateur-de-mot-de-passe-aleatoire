// ========================================
// SÉLECTION DES ÉLÉMENTS HTML
// ========================================

// Sélectionne le bouton "Generate" dans le DOM (Document Object Model)
// querySelector() cherche le premier élément qui correspond au sélecteur CSS ".btn"
const btnElement = document.querySelector(".btn");

// Sélectionne le champ de texte (input) par son ID "input"
// getElementById() est plus rapide que querySelector pour les IDs
const inputElement = document.getElementById("input");

// Sélectionne l'icône de copie (l'icône Font Awesome)
// querySelector() cherche le premier élément avec la classe "fa-copy"
const copyIconElement = document.querySelector(".fa-copy");

// Sélectionne le conteneur de la notification (la boîte jaune qui apparaît)
// Cette notification affiche "Password Copied!" quand on copie le mot de passe
const alertContainer = document.querySelector(".alert-container");

// ========================================
// ÉVÉNEMENT: CLIC SUR LE BOUTON "GENERATE"
// ========================================

// addEventListener() permet d'écouter un événement (ici "click")
// Quand l'utilisateur clique sur le bouton, la fonction fléchée () => {} s'exécute
btnElement.addEventListener("click", () => {
  // Appelle la fonction createPassword() pour générer un nouveau mot de passe
  createPassword();
});

// ========================================
// ÉVÉNEMENT: CLIC SUR L'ICÔNE DE COPIE
// ========================================

// Écoute les clics sur l'icône de copie
copyIconElement.addEventListener("click", () => {
  // Étape 1: Copie le mot de passe dans le presse-papier
  copyPassword();
  
  // Étape 2: Vérification - si le champ est vide, on arrête l'exécution
  // !inputElement.value signifie "si inputElement.value est vide/faux"
  // Le ! (point d'exclamation) inverse la valeur : vrai devient faux, faux devient vrai
  if (!inputElement.value) {
    return; // return arrête l'exécution de la fonction (on ne va pas plus loin)
  }
  
  // Étape 3: Affiche la notification en ajoutant la classe CSS "active"
  // classList.add() ajoute une classe à l'élément
  // La classe "active" déclenche l'animation CSS qui fait apparaître la notification
  alertContainer.classList.add("active");
  
  // Étape 4: Programme la disparition de la notification après 2 secondes
  // setTimeout() exécute du code après un délai (en millisecondes)
  // 2000 millisecondes = 2 secondes
  setTimeout(() => {
    // Retire la classe "active" pour cacher la notification
    // classList.remove() supprime une classe de l'élément
    // L'animation CSS fait glisser la notification vers le bas
    alertContainer.classList.remove("active");
  }, 2000); // Délai de 2000ms (2 secondes)
});

// ========================================
// FONCTION: CRÉER UN MOT DE PASSE ALÉATOIRE
// ========================================

function createPassword() {
  // Définit tous les caractères possibles pour le mot de passe
  // Inclut: chiffres (0-9), lettres minuscules (a-z), lettres majuscules (A-Z), 
  // et caractères spéciaux (!@#$%^&*())
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  // Définit la longueur du mot de passe (14 caractères)
  const passwordLength = 14;
  
  // Initialise une variable vide qui contiendra le mot de passe final
  // let (et non const) car cette variable va changer à chaque tour de boucle
  let password = "";
  
  // Boucle for qui s'exécute 15 fois (de i=0 à i=14, donc 15 tours)
  // À chaque tour, on ajoute un caractère aléatoire au mot de passe
  for (let i = 0; i <= passwordLength; i++) {
    // Génère un nombre aléatoire entre 0 et la longueur de chars (0 à 73)
    // Math.random() génère un nombre entre 0 (inclus) et 1 (exclus)
    // Multiplier par chars.length donne un nombre entre 0 et 73.999...
    // Math.floor() arrondit vers le bas pour obtenir un entier (0 à 73)
    const randomNumber = Math.floor(Math.random() * chars.length);
    
    // Extrait 1 caractère de la chaîne chars à la position randomNumber
    // substring(début, fin) extrait les caractères entre deux positions
    // randomNumber à randomNumber+1 = 1 seul caractère
    // += ajoute ce caractère à la fin de la variable password
    password += chars.substring(randomNumber, randomNumber + 1);
    
    // Affiche dans la console du navigateur (F12 pour voir):
    // - Le numéro aléatoire généré
    // - Le mot de passe en cours de construction
    // Utile pour le débogage (voir ce qui se passe étape par étape)
    console.log(randomNumber, password);
  }
  
  // Affiche le mot de passe complet dans le champ de texte HTML
  // inputElement.value permet de lire ou modifier le contenu d'un input
  inputElement.value = password;
}

// ========================================
// FONCTION: COPIER LE MOT DE PASSE
// ========================================

function copyPassword() {
  // Sélectionne automatiquement tout le texte dans le champ input
  // Comme si l'utilisateur faisait Ctrl+A ou triple-clic
  inputElement.select();
  
  // Définit la plage de sélection du texte (du caractère 0 au caractère 9999)
  // Nécessaire pour la compatibilité avec les appareils mobiles (iOS/Android)
  // 9999 est un grand nombre pour s'assurer que tout le texte est sélectionné
  inputElement.setSelectionRange(0, 9999);
  
  // Copie le texte sélectionné dans le presse-papier du système
  // navigator.clipboard est l'API moderne pour accéder au presse-papier
  // writeText() écrit du texte dans le presse-papier (comme Ctrl+C)
  // inputElement.value récupère le contenu du champ de texte
  navigator.clipboard.writeText(inputElement.value);
}
