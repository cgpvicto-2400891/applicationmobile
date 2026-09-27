export const MODULE_20 = {
  id: 'module-20',
  number: 20,
  title: 'Kotlin : Opérations sur les Listes',
  subtitle: 'Maîtriser map, filter, find et la manipulation de données',
  description: 'Dans une application, on manipule constamment des listes (liste d\'utilisateurs, liste de produits, météo). Kotlin offre des fonctions extrêmement puissantes pour trier, filtrer et transformer ces listes en une seule ligne de code sans jamais avoir à écrire de boucle "for" complexe.',
  prerequisites: 'Avoir complété le Module 1 (Bases de Kotlin).',
  lessons: [
    {
      id: 'collections-basics',
      title: 'Créer, Lire et Supprimer (get, add, remove)',
      analogy: 'Une liste (List) normale, c\'est comme un menu de restaurant imprimé : tu peux le lire mais pas le modifier. Une liste modifiable (MutableList), c\'est comme un tableau blanc où tu peux ajouter ou effacer des plats.',
      definition: 'En Kotlin, il existe deux types de listes : "listOf" (lecture seule, impossible à modifier) et "mutableListOf" (on peut y ajouter ou supprimer des éléments).',
      codeExample: {
        code: `fun manipulationDeBase() {
    // 1. Liste immuable (Lecture seule)
    val fruits = listOf("Pomme", "Banane", "Cerise")
    
    // Obtenir un élément (get) via son index (commence à 0)
    val premier = fruits[0] // ou fruits.get(0) -> "Pomme"
    // fruits.add("Orange") // ❌ ERREUR ! listOf ne peut pas être modifié.

    // 2. Liste modifiable (Mutable)
    val panier = mutableListOf("Pomme", "Banane")
    
    // Ajouter un élément à la fin
    panier.add("Orange") // ["Pomme", "Banane", "Orange"]
    
    // Supprimer un élément spécifique
    panier.remove("Banane") // ["Pomme", "Orange"]
    
    // Supprimer l'élément à l'index 0
    panier.removeAt(0) // ["Orange"]
    
    // Vider complètement la liste
    panier.clear() // []
}`,
        lineByLine: [
          {
            line: 3,
            code: 'listOf("Pomme", "Banane", "Cerise")',
            explanation: 'Crée une liste figée. Très utile et sécuritaire quand on sait que les données ne changeront jamais (ex: les jours de la semaine).'
          },
          {
            line: 10,
            code: 'mutableListOf("Pomme", "Banane")',
            explanation: 'Crée une liste dynamique. On utilise toujours celle-ci quand on doit récupérer des données d\'une base de données ou ajouter des éléments depuis un formulaire.'
          },
          {
            line: 16,
            code: 'panier.remove("Banane")',
            explanation: 'Cherche l\'élément "Banane" et le supprime s\'il existe. S\'il y a plusieurs "Banane", seul le premier est supprimé.'
          }
        ]
      },
      visualMockup: {
        type: 'kotlin-console',
        title: 'Console Kotlin',
        output: 'Liste initiale : [Pomme, Banane, Cerise]\nPremier fruit : Pomme\nPanier après ajout : [Pomme, Banane, Orange]\nPanier après retrait : [Pomme, Orange]'
      },
      commonMistakes: [
        {
          mistake: 'Utiliser listOf() puis essayer de faire .add() ou .remove().',
          fix: 'Déclarez votre liste avec mutableListOf() si vous prévoyez de la modifier plus tard.',
          explanation: 'Contrairement à d\'autres langages comme JavaScript où tous les tableaux sont modifiables par défaut, Kotlin sépare strictement ce qui est modifiable de ce qui ne l\'est pas pour éviter les bugs.'
        }
      ],
      quiz: {
        question: 'Quelle est la façon la plus courante d\'obtenir le deuxième élément de la liste "animaux" ?',
        options: [
          'animaux.get(2)',
          'animaux[2]',
          'animaux[1]',
          'animaux.second()'
        ],
        correctIndex: 2,
        explanation: 'En programmation, on commence à compter à 0 ! Le premier élément est à l\'index 0, donc le deuxième élément est à l\'index 1.'
      },
      furtherReading: [
        {
          title: 'Documentation : Collections Kotlin',
          url: 'https://kotlinlang.org/docs/collections-overview.html'
        }
      ]
    },
    {
      id: 'collections-filter-find',
      title: 'Trouver et Filtrer (filter, find, contains)',
      analogy: 'Si tu as un panier de 100 fruits : "contains" te dit SI tu as une pomme (Oui/Non). "find" te donne LA PREMIÈRE pomme qu\'il trouve. "filter" te donne un nouveau panier contenant TOUTES les pommes.',
      definition: 'Kotlin propose des fonctions dites "d\'ordre supérieur" (qui utilisent des accolades {}) pour parcourir la liste automatiquement et tester chaque élément selon une condition que vous définissez.',
      codeExample: {
        code: `data class Etudiant(val nom: String, val note: Int)

fun rechercheEtFiltrage() {
    val etudiants = listOf(
        Etudiant("Alice", 85),
        Etudiant("Bob", 42),
        Etudiant("Charlie", 95),
        Etudiant("Diane", 42)
    )

    // 1. filter : Garder TOUS ceux qui respectent la condition
    // "it" représente l'étudiant en cours d'inspection
    val reussites = etudiants.filter { it.note >= 60 }
    // Résultat: [Alice(85), Charlie(95)]

    // 2. find : Trouver LE PREMIER qui respecte la condition
    val lePire = etudiants.find { it.note < 50 }
    // Résultat: Bob(42) (Diane est ignorée car Bob a été trouvé en premier)

    // 3. contains : Vérifier si un élément exact existe
    val listeNoms = listOf("Alice", "Bob", "Charlie")
    val aBob = listeNoms.contains("Bob") // true
    val aZoe = listeNoms.contains("Zoe") // false
    
    // 4. any / all : Vérifications globales
    val quelquunAEchoue = etudiants.any { it.note < 60 } // true
    val tousOntReussi = etudiants.all { it.note >= 60 } // false
}`,
        lineByLine: [
          {
            line: 13,
            code: 'val reussites = etudiants.filter { it.note >= 60 }',
            explanation: 'Le mot magique "it" désigne l\'élément actuellement vérifié par la boucle invisible. "filter" crée une NOUVELLE liste ne contenant que ceux qui ont passé le test.'
          },
          {
            line: 17,
            code: 'val lePire = etudiants.find { it.note < 50 }',
            explanation: '"find" s\'arrête dès qu\'il trouve une correspondance. S\'il ne trouve personne, il retourne "null".'
          },
          {
            line: 25,
            code: 'etudiants.any { it.note < 60 }',
            explanation: 'Retourne un Booléen (true/false). Très pratique pour afficher ou cacher un message d\'erreur dans une interface si un élément spécifique existe.'
          }
        ]
      },
      visualMockup: {
        type: 'kotlin-console',
        title: 'Console Kotlin',
        output: 'Tous les étudiants : 4\nÉtudiants en réussite (filter) : 2\nPremier échec (find) : Bob\nY a-t-il un échec (any) : true'
      },
      commonMistakes: [
        {
          mistake: 'Faire une boucle `for` manuelle pour filtrer des éléments.',
          fix: 'Privilégiez TOUJOURS la fonction `.filter {}`. C\'est plus court, plus lisible et moins sujet aux bugs.',
          explanation: 'Créer une liste vide, puis faire un for, puis faire un if, puis faire un .add()... C\'est la façon de faire des années 2000. En Kotlin, `.filter {}` fait tout ça en arrière-plan de manière optimisée.'
        }
      ],
      quiz: {
        question: 'Que retourne la fonction `find` s\'il n\'y a absolument aucun élément qui respecte la condition ?',
        options: [
          'Une erreur (Crash)',
          'Une liste vide []',
          'null',
          '0'
        ],
        correctIndex: 2,
        explanation: 'C\'est la beauté de Kotlin ! Au lieu de crasher, `find` retourne `null`. Il faut donc souvent l\'utiliser avec le Safe Call (?.) ou l\'opérateur Elvis (?:).'
      },
      furtherReading: [
        {
          title: 'Documentation : Filtrer des collections',
          url: 'https://kotlinlang.org/docs/collection-filtering.html'
        }
      ]
    },
    {
      id: 'collections-map',
      title: 'Transformer des données (map)',
      analogy: 'La fonction "map", c\'est comme une machine dans une usine : une liste de pommes entre d\'un côté, la machine applique la même action sur chaque pomme (la peler et la cuire), et il en ressort une liste de tartes aux pommes de l\'autre côté.',
      definition: 'La fonction "map" parcourt une liste, applique une transformation à CHAQUE élément, et retourne une NOUVELLE liste contenant les résultats de ces transformations.',
      codeExample: {
        code: `data class Produit(val nom: String, val prix: Double)

fun transformationMap() {
    val produits = listOf(
        Produit("Livre", 15.0),
        Produit("Clavier", 40.0),
        Produit("Écran", 200.0)
    )

    // 1. Extraire une seule propriété (Créer une liste de noms)
    val nomsSeulement = produits.map { it.nom }
    // Résultat: ["Livre", "Clavier", "Écran"]

    // 2. Faire un calcul sur chaque élément (Ajouter les taxes)
    val prixAvecTaxes = produits.map { it.prix * 1.15 }
    // Résultat: [17.25, 46.0, 230.0]

    // 3. Transformer en composant Compose ! (Très fréquent)
    // (Ceci est un concept, pas du vrai code exécutable ici)
    // val cartesProduits = produits.map { Text(it.nom) }
    
    // 4. Chaîner les opérations (Filter PUIS Map)
    val nomsDesProduitsChers = produits
        .filter { it.prix > 30.0 }  // On garde Clavier et Écran
        .map { it.nom.uppercase() } // On les met en majuscules
    // Résultat: ["CLAVIER", "ÉCRAN"]
}`,
        lineByLine: [
          {
            line: 11,
            code: 'val nomsSeulement = produits.map { it.nom }',
            explanation: 'Prend une liste de type "Produit", et retourne une liste de type "String". La structure de la liste a littéralement muté !'
          },
          {
            line: 23,
            code: '.filter { ... }.map { ... }',
            explanation: 'Les opérations sur les listes peuvent être chaînées à l\'infini de manière très élégante. L\'ordre est important : on filtre d\'abord pour éviter de faire des calculs sur des éléments qu\'on va jeter de toute façon.'
          }
        ]
      },
      visualMockup: {
        type: 'kotlin-console',
        title: 'La machine "Map"',
        output: 'Entrée (map) : [Produit(Livre), Produit(Clavier), Produit(Ecran)]\nSortie (map) : ["Livre", "Clavier", "Ecran"]\n\nProduits chers (filter + map) : ["CLAVIER", "ÉCRAN"]'
      },
      commonMistakes: [
        {
          mistake: 'Confondre `map` et `filter`.',
          fix: 'Rappelez-vous : `filter` change la QUANTITÉ (ex: passe de 10 à 4 éléments) mais ne change pas le type. `map` garde la MÊME QUANTITÉ (10 rentrent, 10 sortent) mais change la FORME ou le TYPE des éléments.',
          explanation: 'Si vous voulez supprimer des éléments, c\'est filter. Si vous voulez extraire des noms d\'une liste d\'utilisateurs, c\'est map.'
        }
      ],
      quiz: {
        question: 'Si j\'ai une liste `val nombres = listOf(1, 2, 3)` et que je fais `nombres.map { it * 10 }`, quel sera le résultat ?',
        options: [
          '[1, 2, 3, 10, 20, 30]',
          '[10, 20, 30]',
          'Un seul nombre: 60',
          'Une erreur'
        ],
        correctIndex: 1,
        explanation: 'Exact ! Map prend CHAQUE élément et le multiplie par 10. Il retourne la nouvelle liste transformée : 1 devient 10, 2 devient 20, 3 devient 30.'
      },
      furtherReading: [
        {
          title: 'Documentation : Transformer des collections (Map)',
          url: 'https://kotlinlang.org/docs/collection-transformations.html#map'
        }
      ]
    },
    {
      id: 'collections-ui-display',
      title: 'Afficher des listes dans l\'UI (avec ou sans index)',
      analogy: 'Afficher une liste sans index, c\'est comme lire la liste des invités à une fête. Avec index, c\'est comme annoncer leur position d\'arrivée : "Invité numéro 1 : Alice, Invité numéro 2 : Bob".',
      definition: 'Dans Jetpack Compose, on utilise "LazyColumn" pour afficher des listes verticalement. Pour parcourir la liste, on utilise "items(liste)" si on n\'a besoin que de l\'élément, et "itemsIndexed(liste)" si on a besoin de savoir à quelle position (0, 1, 2...) se trouve l\'élément.',
      codeExample: {
        code: `@Composable
fun ListeInvitations() {
    val invites = listOf("Alice", "Bob", "Charlie")

    Column(modifier = Modifier.padding(16.dp)) {
        
        Text("Liste simple (Sans Index) :", fontWeight = FontWeight.Bold)
        // LazyColumn est idéal pour les longues listes, 
        // mais ici pour l'exemple on montre la syntaxe items()
        LazyColumn(modifier = Modifier.height(100.dp)) {
            items(invites) { personne ->
                // "personne" est juste le nom ("Alice", "Bob"...)
                Text(text = "Bonjour \$personne ! 👋")
            }
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        Text("Liste numérotée (Avec Index) :", fontWeight = FontWeight.Bold)
        LazyColumn(modifier = Modifier.height(100.dp)) {
            itemsIndexed(invites) { index, personne ->
                // "index" vaut 0, 1, 2...
                // On fait index + 1 pour un affichage humain (1, 2, 3...)
                Text(text = "Arrivée #\${index + 1} : \$personne")
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 11,
            code: 'items(invites) { personne ->',
            explanation: 'Boucle classique. Pour chaque élément de la liste "invites", on lui donne le nom de variable "personne", puis on dessine un composant (ici un Text).'
          },
          {
            line: 21,
            code: 'itemsIndexed(invites) { index, personne ->',
            explanation: 'Boucle numérotée ! En plus de nous donner l\'élément ("personne"), Compose nous donne sa position exacte dans la liste ("index"). Très utile pour numéroter une liste, faire des tableaux de classement, ou colorer différemment les rangées paires et impaires.'
          }
        ]
      },
      visualMockup: {
        type: 'android-preview',
        title: 'Rendu UI : Listes',
        description: 'Liste simple (Sans Index) :\nBonjour Alice ! 👋\nBonjour Bob ! 👋\nBonjour Charlie ! 👋\n\nListe numérotée (Avec Index) :\nArrivée #1 : Alice\nArrivée #2 : Bob\nArrivée #3 : Charlie'
      },
      commonMistakes: [
        {
          mistake: 'Créer une variable "var i = 0" à l\'extérieur et l\'incrémenter manuellement dans items().',
          fix: 'Ne jamais faire cela en Compose ! Utilisez toujours "itemsIndexed()".',
          explanation: 'Compose recompose (redessine) l\'interface de façon imprévisible. Si vous gérez l\'index manuellement avec "var i = 0", votre compteur va se dérégler complètement lorsque l\'utilisateur fera défiler l\'écran vers le haut ou vers le bas.'
        }
      ],
      quiz: {
        question: 'Quelle combinaison est idéale pour colorer une ligne sur deux (Lignes paires en gris, lignes impaires en blanc) ?',
        options: [
          'items() avec un if sur le nom',
          'itemsIndexed() avec `if (index % 2 == 0)`',
          'Impossible en Compose',
          'Utiliser un Row()'
        ],
        correctIndex: 1,
        explanation: 'En utilisant itemsIndexed(), on accède au numéro de la ligne (l\'index). En utilisant le modulo `% 2`, on peut facilement savoir si la ligne est paire ou impaire, et appliquer une couleur de fond différente à la Card ou au Text.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Les listes dans Compose',
          url: '#'
        }
      ]
    }
  ]
};
