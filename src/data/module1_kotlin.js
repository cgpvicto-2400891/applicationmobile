// MODULE 1 — Kotlin de base (syntaxe et logique du langage)
// Strictement réservé au langage Kotlin : aucune notion d'UI ni de Compose ici.

export const MODULE_1 = {
  id: 'module-1',
  number: 1,
  title: 'Kotlin de base',
  subtitle: 'Syntaxe et logique du langage',
  description: 'Avant de construire la moindre interface, maîtrisons le langage officiel d\'Android. Kotlin est moderne, concis et sécurisé.',
  prerequisites: 'Aucun prérequis en mobile. Tu as juste besoin de savoir ce qu\'est une variable et une condition dans n\'importe quel langage (Python, C#, Java ou JS).',
  lessons: [
    {
      id: 'kotlin-val-var',
      title: 'Variables : val vs var',
      analogy: 'Imagine une boîte de rangement : avec "val", la boîte est scellée avec de la cire une fois fermée, son contenu ne changera jamais. Avec "var", c\'est une boîte avec un couvercle amovible que tu peux vider et remplir à volonté.',
      definition: 'En Kotlin, on déclare toujours une variable avec le mot-clé "val" (pour valeur immuable / constante) ou "var" (pour variable modifiable). Par convention et pour éviter les bugs, on utilise toujours "val" par défaut, sauf si l\'on a explicitement besoin de modifier la variable plus tard.',
      codeExample: {
        code: `val nomApplication: String = "Mon Super Projet"
var compteurClics: Int = 0

// Tentative de modification :
// nomApplication = "Autre nom" // ERREUR de compilation !
compteurClics = compteurClics + 1 // VALIDE car déclaré avec var`,
        lineByLine: [
          {
            line: 1,
            code: 'val nomApplication: String = "Mon Super Projet"',
            explanation: '"val" (de l\'anglais "value") déclare une variable en lecture seule qui ne pourra JAMAIS être réassignée. On précise son type "String" (chaîne de caractères).'
          },
          {
            line: 2,
            code: 'var compteurClics: Int = 0',
            explanation: '"var" (de l\'anglais "variable") déclare une variable réassignable dont le contenu pourra être modifié durant l\'exécution. "Int" signifie entier (Integer).'
          },
          {
            line: 4,
            code: '// nomApplication = "Autre nom"',
            explanation: 'Cette ligne provoquerait une erreur de compilation ("Val cannot be reassigned"). C\'est une protection automatique du langage.'
          },
          {
            line: 5,
            code: 'compteurClics = compteurClics + 1',
            explanation: 'Ici, Kotlin autorise la modification car compteurClics a été créé avec le mot-clé "var".'
          }
        ]
      },
      visualMockup: {
        type: 'memory-box',
        title: 'Représentation en mémoire vive',
        items: [
          { label: 'val nomApplication', value: '"Mon Super Projet"', badge: '🔒 Cadenas (Fixe / Immuable)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
          { label: 'var compteurClics', value: '1 (était 0)', badge: '✏️ Stylo (Modifiable / Mutable)', color: 'bg-amber-100 text-amber-800 border-amber-300' }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Mettre "var" partout par habitude comme en JavaScript ou en Python.',
          fix: 'Prendre le réflexe de taper "val" en premier. Si le compilateur se plaint que tu dois réassigner la variable, change-la alors seulement en "var".',
          explanation: 'En programmation mobile réactive, l\'immuabilité (utiliser val) évite 90% des bugs d\'effets secondaires imprévus.'
        }
      ],
      quiz: {
        question: 'Quel mot-clé devez-vous choisir pour stocker l\'identifiant unique d\'un utilisateur qui ne changera jamais après sa connexion ?',
        options: ['var', 'val', 'const var', 'immutable'],
        correctIndex: 1,
        explanation: 'Excellent ! Comme l\'identifiant ne change jamais, on utilise "val" pour garantir qu\'aucune ligne de code ne pourra l\'écraser par accident.'
      },
      furtherReading: [
        {
          title: 'Documentation officielle Kotlin — Déclaration de variables',
          url: 'https://kotlinlang.org/docs/basic-syntax.html#variables',
          note: 'Consulte les sections officielles sur la mutabilité et l\'inférence.'
        }
      ]
    },
    {
      id: 'kotlin-types',
      title: 'Types fondamentaux et inférence',
      analogy: 'L\'inférence de type, c\'est comme lorsque tu vois un fruit jaune courbé sur la table : personne n\'a besoin de te crier "C\'est une banane !", ton cerveau le déduit immédiatement à la forme.',
      definition: 'Kotlin est un langage à typage statique fort, mais il possède un mécanisme intelligent appelé "inférence de type" : si vous assignez directement une valeur à une variable, Kotlin devine son type sans que vous n\'ayez besoin de l\'écrire explicitement.',
      codeExample: {
        code: `val prenom = "Alex"           // Kotlin infère automatiquement le type String
val age = 20                  // Type inféré : Int (Entier)
val moyenne = 88.5            // Type inféré : Double (Nombre décimal)
val estInscrit = true         // Type inféré : Boolean (Vrai ou Faux)`,
        lineByLine: [
          {
            line: 1,
            code: 'val prenom = "Alex"',
            explanation: 'Grâce aux guillemets doubles, Kotlin comprend seul que la variable est de type String (texte).'
          },
          {
            line: 2,
            code: 'val age = 20',
            explanation: 'Un nombre sans virgule est automatiquement reconnu comme un Int (entier sur 32 bits).'
          },
          {
            line: 3,
            code: 'val moyenne = 88.5',
            explanation: 'Un nombre avec un point décimal est automatiquement typé en Double (nombre à virgule flottante).'
          },
          {
            line: 4,
            code: 'val estInscrit = true',
            explanation: '"true" ou "false" sont les deux seules valeurs possibles pour le type Boolean (booléen).'
          }
        ]
      },
      visualMockup: {
        type: 'types-table',
        title: 'Les 4 types rois de Kotlin pour débuter',
        types: [
          { name: 'String', example: '"Bonjour"', desc: 'Chaîne de texte entourée de guillemets' },
          { name: 'Int', example: '42, -5, 0', desc: 'Nombre entier positif ou négatif' },
          { name: 'Double', example: '3.14, 0.99', desc: 'Nombre à virgule (séparateur point)' },
          { name: 'Boolean', example: 'true, false', desc: 'Condition logique binaire' }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Tenter de mettre un nombre décimal dans une variable déclarée avec un entier : "var score = 10; score = 10.5"',
          fix: 'Si une variable doit contenir des décimales, initialisez-la à 10.0 ou indiquez "Double" explicitement.',
          explanation: 'Même si le type n\'est pas écrit, une fois qu\'une variable est typée Int, elle ne pourra jamais recevoir un Double.'
        }
      ],
      quiz: {
        question: 'Quel sera le type inféré de la variable suivante : `val prix = 19.99` ?',
        options: ['Int', 'Float', 'Double', 'Currency'],
        correctIndex: 2,
        explanation: 'En Kotlin, tout nombre décimal littéral par défaut est inféré comme un Double (64 bits).'
      },
      furtherReading: [
        {
          title: 'Documentation Kotlin — Types de base',
          url: 'https://kotlinlang.org/docs/basic-types.html',
          note: 'Découvre aussi les types Long, Float et Char si tu as des besoins spécifiques.'
        }
      ]
    },
    {
      id: 'kotlin-functions',
      title: 'Fonctions et paramètres par défaut',
      analogy: 'Une fonction est comme un robot ménager : tu lui verses des ingrédients (les paramètres), il appuie sur ses boutons internes (le corps de la fonction) et il te livre un gâteau prêt à manger (la valeur de retour).',
      definition: 'En Kotlin, les fonctions se déclarent avec le mot-clé "fun". Une immense force de Kotlin est la possibilité de nommer les paramètres lors de l\'appel et de définir des valeurs par défaut pour les paramètres facultatifs.',
      codeExample: {
        code: `fun saluer(prenom: String, titre: String = "Étudiant(e)"): String {
    return "Bonjour $titre $prenom, bienvenue au cégep !"
}

// Appels possibles :
val message1 = saluer("Sophie") 
// Résultat : "Bonjour Étudiant(e) Sophie, bienvenue au cégep !"

val message2 = saluer(prenom = "Lucas", titre = "Professeur")
// Résultat : "Bonjour Professeur Lucas, bienvenue au cégep !"`,
        lineByLine: [
          {
            line: 1,
            code: 'fun saluer(prenom: String, titre: String = "Étudiant(e)"): String {',
            explanation: '"fun" (de l\'anglais "function") déclare la fonction. "titre" possède une valeur par défaut "Étudiant(e)". Le ": String" final indique le type de retour.'
          },
          {
            line: 2,
            code: 'return "Bonjour $titre $prenom, bienvenue au cégep !"',
            explanation: '"return" renvoie le résultat. Le symbole "$" sert à injecter une variable directement dans la chaîne (interpolation de chaîne).'
          },
          {
            line: 5,
            code: 'val message1 = saluer("Sophie")',
            explanation: 'On n\'a pas fourni de titre : Kotlin utilise automatiquement la valeur par défaut définie dans la signature.'
          },
          {
            line: 8,
            code: 'val message2 = saluer(prenom = "Lucas", titre = "Professeur")',
            explanation: 'Les paramètres nommés permettent de préciser le nom du paramètre (ex: prenom = ...), ce qui rend le code ultra lisible.'
          }
        ]
      },
      visualMockup: {
        type: 'function-flow',
        title: 'Fonctionnement d\'une fonction avec paramètre par défaut',
        input: 'prenom = "Sophie" (titre omis)',
        process: 'titre prend la valeur par défaut "Étudiant(e)"',
        output: '"Bonjour Étudiant(e) Sophie, bienvenue au cégep !"'
      },
      commonMistakes: [
        {
          mistake: 'Oublier le symbole "$" pour concaténer des variables et écrire "Bonjour prenom".',
          fix: 'Toujours préfixer la variable par "$" à l\'intérieur des guillemets (ex: "Bonjour $prenom"). Pour une expression complexe, utilise des accolades : "${user.nom}".',
          explanation: 'Sans le $, Kotlin considère que c\'est le mot brut et non la valeur de la variable.'
        }
      ],
      quiz: {
        question: 'Comment appelle-t-on la syntaxe qui permet d\'écrire `saluer(prenom = "Maxime")` ?',
        options: ['Les paramètres variables', 'Les paramètres nommés (named arguments)', 'Les pointeurs de fonction', 'La surcharge dynamique'],
        correctIndex: 1,
        explanation: 'Exact ! Les arguments nommés ("named arguments") évitent de se tromper dans l\'ordre des paramètres, surtout quand une fonction en a beaucoup.'
      },
      furtherReading: [
        {
          title: 'Documentation Kotlin — Fonctions',
          url: 'https://kotlinlang.org/docs/functions.html',
          note: 'Indispensable pour comprendre la syntaxe des fonctions simples et à expression unique.'
        }
      ]
    },
    {
      id: 'kotlin-classes-dataclass',
      title: 'Classes standard vs Data Class',
      analogy: 'Une "class" normale, c\'est comme un plan d\'architecte complet avec tout à concevoir toi-même. Une "data class", c\'est une fiche d\'identité toute faite : son seul but est de transporter des données, et elle sait déjà se photocopier et s\'imprimer proprement.',
      definition: 'En Kotlin, le mot-clé "data class" est spécialement conçu pour créer des classes dont l\'unique rôle est de contenir des données. Le compilateur génère automatiquement en coulisses les méthodes "toString()", "equals()", "hashCode()" et "copy()", ce qui évite d\'écrire des dizaines de lignes de code répétitif.',
      codeExample: {
        code: `// Une data class pour représenter un étudiant :
data class Etudiant(
    val id: Int,
    val nom: String,
    val courriel: String
)

val etudiant1 = Etudiant(1, "Tremblay", "tremblay@cegep.qc.ca")

// On peut créer une copie modifiée en une seule ligne :
val etudiantModifie = etudiant1.copy(courriel = "nouveau@cegep.qc.ca")

// Affichage automatique élégant :
println(etudiant1) 
// Affiche : Etudiant(id=1, nom=Tremblay, courriel=tremblay@cegep.qc.ca)`,
        lineByLine: [
          {
            line: 2,
            code: 'data class Etudiant(',
            explanation: 'Le mot "data" indique à Kotlin de générer automatiquement les fonctions utilitaires pour manipuler les données.'
          },
          {
            line: 3,
            code: 'val id: Int, val nom: String, val courriel: String',
            explanation: 'Dans le constructeur principal, chaque propriété est déclarée avec "val".'
          },
          {
            line: 8,
            code: 'val etudiant1 = Etudiant(1, "Tremblay", "tremblay@cegep.qc.ca")',
            explanation: 'Instanciation d\'un objet Etudiant. Note qu\'en Kotlin, le mot-clé "new" n\'existe pas !'
          },
          {
            line: 11,
            code: 'val etudiantModifie = etudiant1.copy(courriel = "nouveau@cegep.qc.ca")',
            explanation: 'La fonction générée ".copy()" crée un nouvel objet identique en ne changeant que le champ spécifié.'
          }
        ]
      },
      visualMockup: {
        type: 'data-card',
        title: 'Avantages automatiques d\'une data class',
        features: [
          { name: 'copy()', desc: 'Clone l\'objet avec modification partielle instantanée' },
          { name: 'toString()', desc: 'Affichage lisible pour le débogage au lieu d\'une adresse mémoire bizarre' },
          { name: 'equals() ==', desc: 'Compare le CONTENU des valeurs, pas l\'adresse mémoire' }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Écrire "new Etudiant(...)" comme en Java ou en C#.',
          fix: 'Supprime le mot "new". En Kotlin, on instancie directement avec le nom de la classe : "Etudiant(...)".',
          explanation: 'Kotlin a complètement éliminé le mot-clé "new" pour alléger la syntaxe.'
        }
      ],
      quiz: {
        question: 'Que produit automatiquement Kotlin pour une "data class" ?',
        options: [
          'Une interface graphique Android',
          'Les méthodes toString(), equals(), hashCode() et copy()',
          'Une connexion automatique vers une base de données MySQL',
          'Une variable globale accessible partout'
        ],
        correctIndex: 1,
        explanation: 'Parfait ! Une data class génère toutes les méthodes standard de gestion de données sans aucun code verbeux.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 44.2 : class vs data class',
          url: '#',
          note: 'Très utilisé pour définir l\'état de l\'écran (UiState) dans les modules d\'architecture.'
        }
      ]
    },
    {
      id: 'kotlin-lambdas',
      title: 'Lambdas et Trailing Lambda',
      analogy: 'Une lambda, c\'est comme donner une note écrite avec des instructions à un ami : "Quand le livreur sonne, fais CECI". Tu ne fais pas l\'action maintenant, tu lui transmets le petit bloc d\'instructions à exécuter au bon moment.',
      definition: 'Une lambda (ou fonction anonyme) est un bloc de code entouré d\'accolades { } qu\'on peut stocker dans une variable ou passer en paramètre à une fonction. En Kotlin, si le dernier paramètre d\'une fonction est une lambda, on peut sortir les accolades des parenthèses : c\'est la syntaxe dite "Trailing Lambda", omniprésente dans Jetpack Compose !',
      codeExample: {
        code: `val listeNombres = listOf(1, 2, 3, 4, 5)

// 1. Lambda classique passée en paramètre :
val doubles = listeNombres.map({ nombre -> nombre * 2 })

// 2. Syntax Trailing Lambda + mot-clé 'it' :
val carres = listeNombres.map { it * it }

// 3. Stocker une lambda dans une variable :
val direBonjour: (String) -> Unit = { prenom ->
    println("Salut $prenom !")
}`,
        lineByLine: [
          {
            line: 1,
            code: 'val listeNombres = listOf(1, 2, 3, 4, 5)',
            explanation: 'Crée une liste immuable de nombres entiers.'
          },
          {
            line: 4,
            code: 'val doubles = listeNombres.map({ nombre -> nombre * 2 })',
            explanation: 'map() applique une fonction à chaque élément. { nombre -> ... } est la lambda où "nombre" est le paramètre d\'entrée.'
          },
          {
            line: 7,
            code: 'val carres = listeNombres.map { it * it }',
            explanation: 'Trailing Lambda : les parenthèses () disparaissent. "it" (en anglais "ça") est le nom par défaut du paramètre unique.'
          },
          {
            line: 10,
            code: 'val direBonjour: (String) -> Unit = { prenom -> ... }',
            explanation: '"(String) -> Unit" est le type de la fonction (prend un texte et ne renvoie rien, comme "void").'
          }
        ]
      },
      visualMockup: {
        type: 'lambda-diagram',
        title: 'La règle de la Trailing Lambda en action',
        step1: 'Button(onClick = { /* faire qqc */ })',
        step2: 'Si la lambda est le DERNIER argument :',
        step3: 'Button(onClick) { /* contenu du bouton */ }'
      },
      commonMistakes: [
        {
          mistake: 'Être dérouté en voyant un Composable écrit avec des accolades directement après le nom, comme "Column { ... }".',
          fix: 'Rappelle-toi que "Column { }" est simplement l\'appel d\'une fonction "Column()" dont la lambda finale a été sortie des parenthèses vides !',
          explanation: 'Cette particularité syntaxique de Kotlin est le secret qui rend le code de Jetpack Compose si propre et élégant.'
        }
      ],
      quiz: {
        question: 'En Kotlin, lorsque votre lambda ne possède qu\'un seul paramètre, quel mot-clé implicite pouvez-vous utiliser pour le désigner ?',
        options: ['this', 'it', 'arg', 'self'],
        correctIndex: 1,
        explanation: 'Bravo ! "it" est le raccourci magique fourni par Kotlin pour éviter de nommer inutilement un paramètre unique.'
      },
      furtherReading: [
        {
          title: 'Documentation Kotlin — Lambdas et fonctions d\'ordre supérieur',
          url: 'https://kotlinlang.org/docs/lambdas.html',
          note: 'Comprendre "it" et la trailing lambda te rendra immédiatement à l\'aise avec Jetpack Compose.'
        }
      ]
    },
    {
      id: 'kotlin-null-safety',
      title: 'Null Safety : en finir avec le NullPointerException',
      analogy: 'Le type normal en Kotlin, c\'est comme une tasse garantie remplie d\'eau. Le type nullable (avec un point d\'interrogation "?"), c\'est une tasse qui pourrait être vide : avant d\'essayer d\'en boire une gorgée, Kotlin t\'oblige à vérifier si elle contient quelque chose.',
      definition: 'L\'inventeur de la valeur "null" a appelé cela son "erreur à un milliard de dollars" en raison des innombrables crashs causés dans les logiciels. Kotlin résout ce fléau en distinguant nativement les types qui peuvent être nuls (ex: String?) des types qui ne peuvent JAMAIS l\'être (ex: String).',
      codeExample: {
        code: `var nomCertain: String = "Marie"
// nomCertain = null // ERREUR de compilation ! Impossible.

var nomOptionnel: String? = null // Le '?' autorise la valeur null

// 1. Appel sécurisé (?.)
val longueur: Int? = nomOptionnel?.length 
// Si nomOptionnel est null, 'longueur' vaudra null sans planter !

// 2. Opérateur Elvis (?:) pour donner une valeur de secours
val longueurGarantie: Int = nomOptionnel?.length ?: 0 
// Si c'est null, remplace par 0.`,
        lineByLine: [
          {
            line: 1,
            code: 'var nomCertain: String = "Marie"',
            explanation: 'Un type sans "?" ne pourra JAMAIS valoir null. Le compilateur garantit l\'absence de crash.'
          },
          {
            line: 4,
            code: 'var nomOptionnel: String? = null',
            explanation: 'Le point d\'interrogation "?" indique explicitement au compilateur que cette variable peut être vide (null).'
          },
          {
            line: 7,
            code: 'val longueur: Int? = nomOptionnel?.length',
            explanation: 'L\'opérateur "?." (Safe Call) n\'accède à la propriété .length QUE si la variable n\'est pas nulle.'
          },
          {
            line: 11,
            code: 'val longueurGarantie: Int = nomOptionnel?.length ?: 0',
            explanation: 'L\'opérateur Elvis "?:" (qui ressemble aux yeux et à la mèche d\'Elvis Presley) fournit une valeur de repli si la partie gauche est nulle.'
          }
        ]
      },
      visualMockup: {
        type: 'null-safety-check',
        title: 'Le filtre de sécurité de Kotlin',
        rule1: 'Type "String" ➔ 🟢 100% sûr, crash impossible',
        rule2: 'Type "String?" ➔ 🟡 Peut être null, vérification obligatoire avec ?. ou ?:',
        rule3: 'Opérateur Elvis "?:" ➔ 🛡️ Assure une valeur par défaut en cas de nullité'
      },
      commonMistakes: [
        {
          mistake: 'Utiliser l\'opérateur "!!" (ex: nomOptionnel!!.length).',
          fix: 'Évite absolument le "!!" sauf si tu es 1000% sûr de toi lors de tests unitaires. Utilise toujours "?." ou l\'opérateur Elvis "?:".',
          explanation: '"!!" force Kotlin à ignorer la sécurité. Si la variable est effectivement null, l\'application crashe immédiatement avec un NullPointerException.'
        }
      ],
      quiz: {
        question: 'À quoi sert l\'opérateur Elvis `?:` en Kotlin ?',
        options: [
          'À forcer le plantage de l\'application',
          'À fournir une valeur de repli par défaut si l\'expression de gauche est nulle',
          'À chanter une chanson de rock n\' roll',
          'À convertir un texte en entier'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! `val nom = reponse ?: "Anonyme"` utilisera "Anonyme" si reponse est null.'
      },
      furtherReading: [
        {
          title: 'Documentation Kotlin — Null Safety',
          url: 'https://kotlinlang.org/docs/null-safety.html',
          note: 'Une des fonctionnalités les plus admirées du langage Kotlin.'
        }
      ]
    },
    {
      id: 'kotlin-coroutines',
      title: 'Coroutines : le concept général',
      analogy: 'Imagine que tu prépares un souper : tu mets une pizza au four pour 20 minutes. Tu ne restes pas immobile devant la porte du four pendant 20 minutes les bras croisés ! Tu profites de ce temps pour couper les tomates de la salade. C\'est ça, une coroutine.',
      definition: 'Dans une application mobile, le processeur consacre un fil d\'exécution spécial (appelé Thread Principal ou UI Thread) à dessiner l\'écran à 60 ou 120 images par seconde. Si vous bloquez ce fil pour télécharger un fichier ou lire une base de données, l\'écran fige (« L\'application ne répond plus »). Une coroutine est une micro-tâche qui permet de mettre une fonction en pause ("suspend") sans figer l\'écran.',
      codeExample: {
        code: `// Le mot-clé "suspend" prévient Kotlin que cette fonction prend du temps
suspend fun telechargerProfil(idUtilisateur: Int): String {
    // Simule une attente réseau de 2 secondes sans bloquer l'écran
    kotlinx.coroutines.delay(2000) 
    return "Données du profil de l'utilisateur #$idUtilisateur"
}

// On verra au Module 8 comment l'appeler proprement dans l'écran !`,
        lineByLine: [
          {
            line: 2,
            code: 'suspend fun telechargerProfil(idUtilisateur: Int): String {',
            explanation: '"suspend" (de l\'anglais "suspendre") indique que la fonction peut être mise en pause et reprise plus tard sans bloquer le téléphone.'
          },
          {
            line: 4,
            code: 'kotlinx.coroutines.delay(2000)',
            explanation: '"delay()" suspend la coroutine pendant 2000 millisecondes (2 secondes). Contrairement à Thread.sleep(), elle ne bloque PAS le téléphone !'
          },
          {
            line: 5,
            code: 'return "Données du profil de l\'utilisateur #$idUtilisateur"',
            explanation: 'Quand les données sont prêtes, la fonction reprend exactement là où elle s\'était arrêtée et retourne son résultat.'
          }
        ]
      },
      visualMockup: {
        type: 'coroutine-comparison',
        title: 'Bloquant vs Non-Bloquant (Coroutine)',
        blocking: '❌ Thread.sleep() ➔ L\'écran fige, l\'utilisateur ne peut plus toucher aucun bouton (Crash ANR).',
        nonBlocking: '✅ suspend fun + delay() ➔ L\'opération attend en arrière-plan, l\'animation et les boutons restent 100% fluides.'
      },
      commonMistakes: [
        {
          mistake: 'Tenter d\'appeler une fonction "suspend" depuis une fonction normale ordinaire sans scope de coroutine.',
          fix: 'Une fonction "suspend" ne peut être appelée que depuis une autre fonction "suspend" ou à l\'intérieur d\'un environnement de coroutine dédié (nous apprendrons LaunchedEffect au Module 8 pour cela).',
          explanation: 'Kotlin empêche ainsi par avance d\'exécuter du code asynchrone n\'importe comment.'
        }
      ],
      quiz: {
        question: 'Que se passe-t-il si vous exécutez une opération de 5 secondes qui bloque le fil principal (UI Thread) d\'un téléphone Android ?',
        options: [
          'Le téléphone accélère sa batterie pour compenser',
          'L\'interface fige et le système affiche un message d\'erreur ANR (Application Not Responding)',
          'Android ferme automatiquement toutes les autres applications',
          'Le code est automatiquement converti en tâche de fond'
        ],
        correctIndex: 1,
        explanation: 'Très bien ! Bloquer l\'UI thread produit l\'infâme boîte de dialogue "L\'application ne répond pas". Les coroutines sont là pour sauver la fluidité.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 81.1 : Les coroutines',
          url: '#',
          note: 'Nous reverrons les coroutines en pratique concrète dans les Modules 8, 9 et 11.'
        }
      ]
    }
  ]
};
