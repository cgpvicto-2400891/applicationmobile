// Glossaire global vulgarisé pour étudiants de cégep débutants
export const GLOSSARY_TERMS = [
  {
    id: 'composable',
    term: 'Composable (Fonction modulable)',
    translation: 'Bloc de construction visuel',
    definition: 'Une fonction Kotlin spéciale annotée avec @Composable qui décrit une partie de l\'interface visuelle. Elle prend des données en entrée et génère un morceau d\'écran.',
    analogy: 'Comme une recette de cuisine : tu donnes des ingrédients (paramètres) et la fonction te prépare un plat (un bouton, une boîte, un texte).',
    module: 2,
    lessonId: 'composable-intro'
  },
  {
    id: 'recomposition',
    term: 'Recomposition',
    translation: 'Régénération / Réaffichage automatique',
    definition: 'Le processus par lequel Jetpack Compose réexécute automatiquement une fonction Composable lorsque les données (l\'état) dont elle dépend ont changé, afin de mettre l\'écran à jour.',
    analogy: 'Comme actualiser automatiquement une page web ou un tableau de bord dès qu\'un chiffre change, sans avoir à tout redessiner manuellement.',
    module: 6,
    lessonId: 'state-intro'
  },
  {
    id: 'state',
    term: 'État (State)',
    translation: 'La mémoire de l\'application à un instant T',
    definition: 'Toute valeur qui peut changer au fil du temps et qui influence ce qui est affiché à l\'écran (ex: le texte tapé dans un champ, un booléen pour savoir si un menu est ouvert, le score d\'une partie).',
    analogy: 'Comme le tableau d\'affichage d\'un match de hockey : le score affiché change à chaque but.',
    module: 6,
    lessonId: 'state-intro'
  },
  {
    id: 'modifier',
    term: 'Modifier (Modifieur)',
    translation: 'Modificateur d\'apparence ou de comportement',
    definition: 'Un objet que l\'on passe en paramètre à un Composable pour modifier sa taille, son espacement (padding), sa couleur, sa forme, ou lui ajouter des interactions (clic).',
    analogy: 'Comme les accessoires que tu enfiles sur un mannequin : tu lui mets un manteau (padding), un chapeau (couleur) et des lunettes (taille).',
    module: 4,
    lessonId: 'modifier-intro'
  },
  {
    id: 'scaffold',
    term: 'Scaffold',
    translation: 'Échafaudage / Structure d\'écran standard',
    definition: 'Un composant de haut niveau qui fournit la structure standard d\'un écran Android selon Material Design (emplacement pour la barre du haut, du bas, le bouton flottant et le contenu central).',
    analogy: 'Comme le châssis d\'une voiture ou l\'ossature d\'une maison : les fondations sur lesquelles viennent se brancher les portes, le toit et les roues.',
    module: 5,
    lessonId: 'scaffold-intro'
  },
  {
    id: 'state-hoisting',
    term: 'Hissage d\'état (State Hoisting)',
    translation: 'Remonter l\'état au parent',
    definition: 'Un patron de conception qui consiste à déplacer la gestion de l\'état d\'un composant vers le composant parent qui l\'appelle, en passant la valeur et un événement (lambda) pour la modifier.',
    analogy: 'Comme un enfant qui demande la permission à son parent pour acheter un bonbon : l\'enfant informe le parent du clic, le parent décide et met à jour le porte-monnaie.',
    module: 6,
    lessonId: 'state-hoisting'
  },
  {
    id: 'viewmodel',
    term: 'ViewModel',
    translation: 'Gestionnaire de données et de logique de l\'écran',
    definition: 'Une classe Android spécialisée conçue pour stocker et gérer les données nécessaires à l\'interface utilisateur. Sa particularité essentielle est de survivre aux rotations d\'écran.',
    analogy: 'Comme le régisseur en coulisses d\'un théâtre : les acteurs sur scène (l\'UI) changent de costume ou de place, mais le régisseur garde le scénario et les accessoires intacts.',
    module: 7,
    lessonId: 'viewmodel-intro'
  },
  {
    id: 'stateflow',
    term: 'StateFlow',
    translation: 'Tuyau de données réactif observable',
    definition: 'Un conteneur de données qui émet toujours une valeur courante et avertit instantanément tous ses observateurs (l\'interface Composable) dès que cette valeur change.',
    analogy: 'Comme un fil d\'actualité en direct sur les réseaux sociaux : dès qu\'une nouvelle publication arrive, ton fil se rafraîchit sans que tu aies à recharger la page.',
    module: 7,
    lessonId: 'stateflow'
  },
  {
    id: 'coroutine',
    term: 'Coroutine',
    translation: 'Micro-tâche coopérative et asynchrone',
    definition: 'Un mécanisme ultra-léger de Kotlin permettant d\'exécuter des opérations longues (téléchargement, lecture de base de données) en arrière-plan sans geler l\'écran du téléphone.',
    analogy: 'Comme lancer la bouilloire pour le thé : tu n\'attends pas figé devant sans rien faire, tu prépares ta tasse pendant qu\'elle chauffe en arrière-plan.',
    module: 1,
    lessonId: 'kotlin-coroutines'
  },
  {
    id: 'suspend-function',
    term: 'Fonction suspendue (suspend fun)',
    translation: 'Fonction qui peut faire une pause',
    definition: 'Une fonction Kotlin marquée du mot-clé `suspend` qui peut interrompre son exécution sans bloquer le thread principal, puis reprendre quand le résultat est prêt.',
    analogy: 'Comme poser un marque-page dans un livre pour aller répondre au facteur, puis reprendre la lecture exactement là où tu en étais.',
    module: 1,
    lessonId: 'kotlin-coroutines'
  },
  {
    id: 'side-effect',
    term: 'Effet de bord (Side Effect)',
    translation: 'Action extérieure au rendu visuel pur',
    definition: 'Toute opération effectuée dans un Composable qui modifie l\'état de l\'application en dehors du champ de la fonction (ex: faire un appel réseau, naviguer, modifier une base de données).',
    analogy: 'Commander une pizza en regardant le menu : regarder le menu est purement visuel, mais appeler le livreur est un effet de bord qui a un impact dans le monde réel.',
    module: 8,
    lessonId: 'side-effect-intro'
  },
  {
    id: 'dao',
    term: 'DAO (Data Access Object)',
    translation: 'Objet d\'accès aux données',
    definition: 'Une interface Kotlin dans Room qui définit toutes les méthodes SQL (SELECT, INSERT, UPDATE, DELETE) pour interagir avec la base de données.',
    analogy: 'Comme la serveuse au restaurant : tu lui donnes ta commande (« donne-moi tous les clients ») et elle s\'occupe d\'aller chercher les plats en cuisine sans que tu voies les casseroles.',
    module: 9,
    lessonId: 'room-dao'
  },
  {
    id: 'repository',
    term: 'Dépôt de données (Repository)',
    translation: 'Source unique de vérité pour les données',
    definition: 'Une classe intermédiaire qui masque la complexité de l\'accès aux données (base de données Room, API REST ou cache local) vis-à-vis du ViewModel.',
    analogy: 'Comme le guichetier d\'une banque : tu lui demandes ton solde, peu importe s\'il le cherche dans son ordinateur local ou s\'il appelle le siège central à Montréal.',
    module: 9,
    lessonId: 'repository-pattern'
  },
  {
    id: 'datastore',
    term: 'Preferences DataStore',
    translation: 'Coffre-fort clé-valeur moderne',
    definition: 'La solution officielle d\'Android pour enregistrer des petites préférences simples (ex: thème sombre activé, nom d\'utilisateur, langue) de façon asynchrone et sécurisée.',
    analogy: 'Comme un petit carnet de post-it où tu notes quelques réglages persos importants sur ton bureau.',
    module: 9,
    lessonId: 'datastore-intro'
  },
  {
    id: 'crud',
    term: 'CRUD',
    translation: 'Créer, Lire, Mettre à jour, Supprimer',
    definition: 'Acronyme des 4 opérations fondamentales de manipulation de données : Create (créer), Read (lire/afficher), Update (modifier), Delete (supprimer).',
    analogy: 'Comme un classeur de fiches de contacts : tu peux ajouter une fiche, la consulter, raturer un numéro pour en mettre un neuf, ou déchirer la fiche.',
    module: 10,
    lessonId: 'crud-intro'
  },
  {
    id: 'retrofit',
    term: 'Retrofit',
    translation: 'Bibliothèque client HTTP pour Android',
    definition: 'Une bibliothèque créée par Square qui transforme une interface Kotlin en requêtes HTTP (GET, POST, etc.) vers une API web et convertit automatiquement le JSON en objets Kotlin.',
    analogy: 'Comme un traducteur universel par téléphone : tu parles en Kotlin, il traduit en requêtes web vers le serveur à l\'autre bout du monde et te redonne la réponse en Kotlin.',
    module: 11,
    lessonId: 'retrofit-intro'
  },
  {
    id: 'notification-channel',
    term: 'Canal de notification (NotificationChannel)',
    translation: 'Catégorie de notifications configurée par l\'utilisateur',
    definition: 'Depuis Android 8.0, chaque notification doit être rattachée à un canal (ex: "Messages urgents", "Promotions") pour permettre à l\'utilisateur de régler finement le son et l\'importance.',
    analogy: 'Comme les boîtes aux lettres séparées dans un immeuble : courrier urgent dans l\'une, prospectus publicitaires dans l\'autre.',
    module: 12,
    lessonId: 'notification-channel'
  }
];
