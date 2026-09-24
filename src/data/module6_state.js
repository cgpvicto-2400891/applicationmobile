// MODULE 6 — Gestion de l'état (State)
// Variables d'état, remember/rememberSaveable, state hoisting, derivedStateOf, 3 syntaxes.

export const MODULE_6 = {
  id: 'module-6',
  number: 6,
  title: 'Gestion de l\'état (State)',
  subtitle: 'Donner vie et mémoire à vos composants Compose',
  description: 'Jusqu\'ici, nos composants étaient statiques. L\'état (State) est la mémoire vivante de votre application : dès qu\'une donnée change, Compose réexécute automatiquement l\'affichage pour le mettre à jour. C\'est la recomposition.',
  prerequisites: 'Avoir complété le Module 3 (composants) et Module 4 (modifiers).',
  lessons: [
    {
      id: 'state-intro',
      title: 'Qu\'est-ce que l\'état et la Recomposition ?',
      analogy: 'L\'état, c\'est comme le tableau d\'affichage des scores dans un stade de soccer : les joueurs jouent sur le terrain (la logique), et dès qu\'un ballon franchit la ligne, le chiffre sur le tableau change pour que tout le public voie instantanément 1-0.',
      definition: 'L\'état ("State") est toute valeur qui varie dans le temps et affecte ce qui est affiché (le texte saisi par l\'utilisateur, un compteur, une liste de messages). Lorsque vous modifiez un état observable dans Compose, le moteur déclenche la "Recomposition" : il réexécute intelligemment les seuls morceaux d\'écran qui dépendent de cette valeur.',
      codeExample: {
        code: `@Composable
fun CompteurNaifBug() {
    // ❌ ERREUR CLASSIQUE DU DÉBUTANT :
    var clics = 0 

    Button(onClick = { clics++ }) {
        Text("Nombre de clics : $clics")
    }
    // Problème : Compose ne surveille pas une variable 'var' ordinaire !
    // De plus, à chaque réaffichage, la fonction serait réexécutée et clics remis à 0 !
}`,
        lineByLine: [
          {
            line: 4,
            code: 'var clics = 0',
            explanation: 'Une variable Kotlin ordinaire "var" n\'est PAS observable par Compose. Son incrémentation ne prévient personne.'
          },
          {
            line: 6,
            code: 'Button(onClick = { clics++ })',
            explanation: 'Même si "clics" passe à 1 en mémoire, Compose ne le sait pas et ne redessine rien à l\'écran.'
          },
          {
            line: 7,
            code: 'Text("Nombre de clics : $clics")',
            explanation: 'L\'écran reste figé sur "Nombre de clics : 0".'
          }
        ]
      },
      visualMockup: {
        type: 'recomposition-cycle',
        title: 'Le cycle magique de la Recomposition',
        step1: '1. Action utilisateur (ex: clic)',
        step2: '2. Modification de l\'état (State)',
        step3: '3. Recomposition automatique (L\'UI se redessine avec la nouvelle valeur)'
      },
      commonMistakes: [
        {
          mistake: 'Déclarer une variable `var compteur = 0` dans un Composable et s\'étonner que le chiffre à l\'écran ne change jamais.',
          fix: 'Utilisez toujours `remember { mutableStateOf(0) }` pour que Compose surveille la variable et conserve sa valeur entre les recompositions.',
          explanation: 'Chaque recomposition réexécute la fonction depuis le début : sans "remember", la variable est réinitialisée à 0 en boucle !'
        }
      ],
      quiz: {
        question: 'Comment s\'appelle le processus par lequel Compose réexécute automatiquement une fonction pour actualiser l\'écran ?',
        options: ['La recompilation', 'La recomposition', 'Le redémarrage', 'La réfraction'],
        correctIndex: 1,
        explanation: 'Bravo ! La Recomposition est le cœur battant de Jetpack Compose.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 21.1 : Les variables d\'état',
          url: '#',
          note: 'Découvre pourquoi les composables doivent être idempotents.'
        }
      ]
    },
    {
      id: 'state-three-syntaxes',
      title: 'Les 3 syntaxes pour déclarer un MutableState',
      analogy: 'C\'est comme avoir 3 façons d\'écrire un texto : en toutes lettres formelles, en style SMS abrégé ou avec un raccourci vocal. Les trois envoient exactement le même message, mais le style avec le mot-clé "by" est de loin le plus agréable au quotidien.',
      definition: 'Pour créer une variable d\'état observée par Compose, on utilise la fonction "mutableStateOf()". Il existe trois syntaxes Kotlin pour la déclarer dans un Composable.',
      codeExample: {
        code: `// SYNTAXE 1 : Avec accès direct à .value (Très explicite)
val etat1 = remember { mutableStateOf(0) }
// Lecture : etat1.value | Écriture : etat1.value = 5

// SYNTAXE 2 : Avec délégation de propriété "by" (LA PLUS POPULAIRE !)
var etat2 by remember { mutableStateOf(0) }
// Lecture : etat2 | Écriture : etat2 = 5 (comme une variable normale !)

// SYNTAXE 3 : Par déstructuration (valeur + setter)
val (compteur, setCompteur) = remember { mutableStateOf(0) }
// Lecture : compteur | Écriture : setCompteur(5)`,
        lineByLine: [
          {
            line: 2,
            code: 'val etat1 = remember { mutableStateOf(0) }',
            explanation: 'Crée un objet MutableState<Int>. Vous devez taper ".value" à chaque lecture ou modification.'
          },
          {
            line: 6,
            code: 'var etat2 by remember { mutableStateOf(0) }',
            explanation: 'Le mot-clé "by" (délégation) masque le ".value" en coulisses. On lit et écrit directement la variable "etat2" sans tracas !'
          },
          {
            line: 10,
            code: 'val (compteur, setCompteur) = remember { mutableStateOf(0) }',
            explanation: 'Sépare la valeur en lecture seule et la fonction de mise à jour (très familier pour ceux qui connaissent useState en React).'
          }
        ]
      },
      visualMockup: {
        type: 'syntax-comparison',
        title: 'Comparatif des 3 syntaxes de State',
        syn1: '1️⃣ val s = remember { mutableStateOf(0) } ➔ s.value = 1',
        syn2: '2️⃣ var s by remember { mutableStateOf(0) } ➔ s = 1 (⭐ Recommandée)',
        syn3: '3️⃣ val (s, setS) = remember { mutableStateOf(0) } ➔ setS(1)'
      },
      commonMistakes: [
        {
          mistake: 'Utiliser "by" sans importer les deux extensions obligatoires de Kotlin dans le fichier.',
          fix: 'Ajoutez ces deux imports en haut : `import androidx.compose.runtime.getValue` et `import androidx.compose.runtime.setValue`.',
          explanation: 'Sans ces imports, le compilateur affiche une erreur rouge sous le mot "by".'
        }
      ],
      quiz: {
        question: 'Quel mot-clé Kotlin permet d\'utiliser la syntaxe déléguée `var texte by remember { mutableStateOf("") }` ?',
        options: ['delegate', 'by', 'as', 'with'],
        correctIndex: 1,
        explanation: 'Exact ! "by" délègue les opérations get et set à l\'objet MutableState.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 21.1 : Syntaxes de déclaration d\'état',
          url: '#',
          note: 'Retrouve les détails sur getValue et setValue.'
        }
      ]
    },
    {
      id: 'state-remember-saveable',
      title: 'remember vs rememberSaveable : Survivre aux rotations',
      analogy: 'remember, c\'est comme noter un numéro de téléphone sur un morceau de papier brouillon : tant que tu restes à ta table, tout va bien. Mais si un coup de vent fait voler tes feuilles (rotation du téléphone de portrait à paysage), tu perds tout. rememberSaveable, c\'est graver le numéro dans un carnet relié : même en cas de tempête, rien n\'est perdu.',
      definition: '"remember" préserve l\'état pendant les simples recompositions de l\'écran. En revanche, lorsque l\'utilisateur fait pivoter son téléphone (changement de configuration) ou change de langue, Android détruit et recrée complètement l\'Activity ! Pour survivre à cette destruction, on utilise "rememberSaveable".',
      codeExample: {
        code: `@Composable
fun FormulaireSaisie() {
    // ❌ Perdu lors d'une rotation d'écran :
    var textePerdu by remember { mutableStateOf("") }

    // ✅ Sauvegardé même si le téléphone tourne :
    var texteGarde by rememberSaveable { mutableStateOf("") }

    OutlinedTextField(
        value = texteGarde,
        onValueChange = { texteGarde = it },
        label = { Text("Votre nom") }
    )
}`,
        lineByLine: [
          {
            line: 4,
            code: 'var textePerdu by remember { mutableStateOf("") }',
            explanation: '"remember" survit uniquement aux recompositions. Lors d\'une rotation d\'écran, le texte est effacé !'
          },
          {
            line: 7,
            code: 'var texteGarde by rememberSaveable { mutableStateOf("") }',
            explanation: '"rememberSaveable" enregistre automatiquement la valeur dans le "Bundle" d\'Android. Lors de la rotation, la valeur est restaurée sans accroc.'
          }
        ]
      },
      visualMockup: {
        type: 'rotation-test',
        title: 'Comportement lors de la rotation Portrait ➔ Paysage',
        remember: '❌ remember : Le champ redevient vide ""',
        saveable: '✅ rememberSaveable : Le texte reste intact "Alex Tremblay"'
      },
      commonMistakes: [
        {
          mistake: 'Croire que "remember" suffit pour tous les champs d\'un formulaire de saisie.',
          fix: 'Pour tout texte entré par un utilisateur, privilégiez "rememberSaveable" ou stockez la donnée dans un ViewModel (Module 7).',
          explanation: 'L\'utilisateur sera très frustré de voir son long texte tapé s\'effacer juste parce qu\'il a incliné son téléphone.'
        }
      ],
      quiz: {
        question: 'Que se passe-t-il avec une variable déclarée avec `remember` lorsque l\'utilisateur tourne son téléphone à l\'horizontale ?',
        options: [
          'La variable est sauvegardée dans le cloud',
          'L\'activité Android est recréée et la variable est réinitialisée à sa valeur de départ',
          'Le téléphone vibre pour avertir',
          'Compose inverse la couleur du texte'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! Le changement d\'orientation recrée l\'Activity. Pour survivre, il faut rememberSaveable.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 43.1 : Survivre à la recréation de l\'activité',
          url: '#',
          note: 'Explication du changement de configuration d\'Android.'
        }
      ]
    },
    {
      id: 'state-hoisting',
      title: 'Hisser l\'état (State Hoisting) : Unidirectional Data Flow',
      analogy: 'Hisser l\'état, c\'est comme une caisse enregistreuse au magasin : le tiroir-caisse n\'appartient pas au tapis roulant des articles. Le tiroir est sous la responsabilité du gérant (le parent) ; le tapis se contente de signaler "un article est passé" (événement), et le gérant met à jour le montant.',
      definition: 'Le hissage d\'état ("State Hoisting") est le patron de conception le plus fondamental de Jetpack Compose. Il consiste à retirer l\'état d\'un composable pour le confier à son composant parent. Le composant devient ainsi "stateless" (sans état interne), recevant la valeur actuelle en paramètre et renvoyant une lambda d\'événement lors des changements.',
      codeExample: {
        code: `// COMPOSANT STATELESS (Réutilisable et testable) :
@Composable
fun Interrupteur(estAllume: Boolean, onChangement: (Boolean) -> Unit) {
    Switch(
        checked = estAllume,
        onCheckedChange = { onChangement(it) }
    )
}

// COMPOSANT PARENT (Détenteur de l'état) :
@Composable
fun EcranReglages() {
    var modeNuit by rememberSaveable { mutableStateOf(false) }

    // On passe la valeur vers le bas et on écoute l'événement vers le haut :
    Interrupteur(
        estAllume = modeNuit,
        onChangement = { nouvelleValeur -> modeNuit = nouvelleValeur }
    )
}`,
        lineByLine: [
          {
            line: 3,
            code: 'fun Interrupteur(estAllume: Boolean, onChangement: (Boolean) -> Unit)',
            explanation: 'Pattern State Hoisting : 1 paramètre pour la valeur (estAllume) + 1 paramètre pour l\'événement (onChangement).'
          },
          {
            line: 12,
            code: 'var modeNuit by rememberSaveable { mutableStateOf(false) }',
            explanation: 'L\'état vit dans le parent qui sait comment l\'utiliser.'
          },
          {
            line: 17,
            code: 'onChangement = { nouvelleValeur -> modeNuit = nouvelleValeur }',
            explanation: 'Unidirectional Data Flow (UDF) : l\'état descend vers l\'enfant, l\'événement remonte vers le parent.'
          }
        ]
      },
      visualMockup: {
        type: 'udf-diagram',
        title: 'Flux de données unidirectionnel (UDF)',
        down: '⬇️ ÉTAT (State) : Le parent envoie la valeur courante au composable enfant',
        up: '⬆️ ÉVÉNEMENT (Event) : L\'enfant prévient le parent quand l\'utilisateur clique'
      },
      commonMistakes: [
        {
          mistake: 'Enfermer l\'état à l\'intérieur d\'un petit composant, rendant impossible pour le reste de l\'écran de savoir si le switch est activé.',
          fix: 'Hissez l\'état : créez deux paramètres `(valeur: T, onValeurChange: (T) -> Unit)`.',
          explanation: 'Un composant sans état interne (stateless) est 10 fois plus facile à réutiliser, à prévisualiser dans @Preview et à tester.'
        }
      ],
      quiz: {
        question: 'Quels sont les deux paramètres indispensables d\'un composant selon le principe du State Hoisting ?',
        options: [
          'Un identifiant SQL et un mot de passe',
          'La valeur actuelle de l\'état et une fonction lambda de rappel d\'événement (callback)',
          'Une couleur et une taille en dp',
          'Un fichier XML et un fichier CSS'
        ],
        correctIndex: 1,
        explanation: 'Très bien ! La valeur descend, l\'événement lambda remonte : c\'est le flux unidirectionnel (UDF).'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 28.1 : Hisser l\'état (state hoisting)',
          url: '#',
          note: 'Consulte l\'exemple du cours avec un compteur partagé.'
        }
      ]
    },
    {
      id: 'state-derived',
      title: 'derivedStateOf : Optimiser les calculs d\'état',
      analogy: 'derivedStateOf, c\'est comme le voyant "Carburant faible" de ton tableau de bord : la jauge d\'essence descend goutte par goutte en continu, mais le voyant d\'alerte ne s\'allume QUE quand le niveau passe en dessous des 10 litres.',
      definition: '"derivedStateOf" permet de créer un état calculé à partir d\'autres états, qui ne déclenche une recomposition QUE lorsque le résultat final du calcul change réellement, évitant ainsi de redessiner l\'écran pour rien à chaque micro-changement intermédiaire.',
      codeExample: {
        code: `@Composable
fun ExempleBoutonHautDePage(listeState: LazyListState) {
    // Ne se déclenche QUE si l'index dépasse 0 (évite des recompositions à chaque pixel défilé) :
    val afficherBouton by remember {
        derivedStateOf {
            listeState.firstVisibleItemIndex > 0
        }
    }

    if (afficherBouton) {
        Button(onClick = { /* Remonter en haut */ }) {
            Text("⬆️ Haut de page")
        }
    }
}`,
        lineByLine: [
          {
            line: 4,
            code: 'val afficherBouton by remember { derivedStateOf { ... } }',
            explanation: '"derivedStateOf" surveille la condition à l\'intérieur.'
          },
          {
            line: 6,
            code: 'listeState.firstVisibleItemIndex > 0',
            explanation: 'Tant que ce booléen vaut "false", aucune recomposition inutile n\'est générée, même si l\'utilisateur fait défiler 500 pixels de liste.'
          }
        ]
      },
      visualMockup: {
        type: 'derived-state-flow',
        title: 'Filtrage intelligent de derivedStateOf',
        raw: 'Défilement frénétique : scrollY = 12px, 14px, 18px...',
        derived: 'derivedStateOf (index > 0) ➔ Reste FALSE sans aucune recomposition !',
        trigger: 'Index atteint 1 ➔ Bascule à TRUE ➔ Recomposition déclenchée une seule fois.'
      },
      commonMistakes: [
        {
          mistake: 'Calculer une condition complexe directement dans le corps du Composable sans `derivedStateOf`.',
          fix: 'Utilisez derivedStateOf lorsque l\'état source change beaucoup plus vite que le résultat utile (ex: défilement au pixel).',
          explanation: 'Cela économise le processeur et la batterie du téléphone.'
        }
      ],
      quiz: {
        question: 'À quoi sert principalement `derivedStateOf` ?',
        options: [
          'À connecter une base de données MySQL',
          'À éviter des recompositions inutiles quand un état source varie plus souvent que son résultat',
          'À effacer les variables d\'état',
          'À forcer le téléphone à redémarrer'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! C\'est un filtre d\'optimisation de performances pour l\'interface.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 79.1 : derivedStateOf()',
          url: '#',
          note: 'Découvre les cas d\'usage recommandés par Google.'
        }
      ]
    },
    {
      id: 'state-collections',
      title: 'Collections réactives : mutableStateListOf vs mutableListOf',
      analogy: 'Une liste `mutableListOf`, c\'est comme un carnet secret caché dans ton tiroir : si tu y ajoutes une ligne, personne d\'autre dans la maison ne le sait. Une liste `mutableStateListOf`, c\'est un tableau blanc lumineux fixé au mur du salon : dès que tu écris un mot dessus, tout le monde dans la pièce le voit aussitôt.',
      definition: 'Si vous utilisez un `mutableListOf()` classique en Kotlin, l\'ajout (`.add()`) d\'un élément modifie la liste en mémoire, mais Compose est incapable de le détecter car la référence de la liste n\'a pas changé. Pour qu\'une liste notifie Compose et mette à jour l\'écran, il faut utiliser "mutableStateListOf()".',
      codeExample: {
        code: `@Composable
fun ExempleListeTaches() {
    // ✅ Liste observable par Jetpack Compose :
    val taches = remember { mutableStateListOf("Acheter du pain", "Réviser Kotlin") }

    Column {
        Button(onClick = { taches.add("Nouvelle tâche !") }) {
            Text("Ajouter")
        }

        LazyColumn {
            items(taches) { tache ->
                Text("• $tache")
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 4,
            code: 'val taches = remember { mutableStateListOf(...) }',
            explanation: '"mutableStateListOf" crée une liste spéciale dont chaque ajout, suppression ou modification est immédiatement notifié au moteur de rendu Compose.'
          },
          {
            line: 7,
            code: 'taches.add("Nouvelle tâche !")',
            explanation: 'Dès que .add() est exécuté, Compose recompose instantanément la LazyColumn ci-dessous.'
          }
        ]
      },
      visualMockup: {
        type: 'list-reactivity-demo',
        title: 'Réactivité des listes',
        button: '[ + Ajouter ]',
        items: ['• Acheter du pain', '• Réviser Kotlin', '• Nouvelle tâche ! (Ajoutée instantanément)']
      },
      commonMistakes: [
        {
          mistake: 'Faire `val liste = remember { mutableStateOf(mutableListOf<String>()) }` puis appeler `liste.value.add(...)`.',
          fix: 'Compose ne détecte pas les mutations internes d\'une liste dans un simple mutableStateOf ! Utilisez TOUJOURS `mutableStateListOf()`.',
          explanation: 'La référence de la liste ne changeant pas, mutableStateOf ne sait pas qu\'un élément a été ajouté.'
        }
      ],
      quiz: {
        question: 'Quelle fonction devez-vous utiliser pour créer une liste réactive dont les ajouts et retraits mettent à jour l\'écran en direct ?',
        options: ['arrayListOf()', 'mutableStateListOf()', 'listOf()', 'observableList()'],
        correctIndex: 1,
        explanation: 'Parfait ! mutableStateListOf() est la collection d\'état dédiée dans Jetpack Compose.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 79.2 : mutableListOf comme variable d\'état',
          url: '#',
          note: 'Consulte l\'analyse des pièges liés aux collections réactives.'
        }
      ]
    }
  ]
};
