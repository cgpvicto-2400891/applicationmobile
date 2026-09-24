// MODULE 8 — Effets de bord et asynchrone
// Qu'est-ce qu'un effet secondaire, LaunchedEffect, coroutines appliquées.

export const MODULE_8 = {
  id: 'module-8',
  number: 8,
  title: 'Effets de bord et asynchrone',
  subtitle: 'Maîtriser les opérations asynchrones dans le cycle de vie de Compose',
  description: 'Un Composable peut être réexécuté des dizaines de fois par seconde. Si vous y lancez une requête réseau ou un son directement, cela se produirait en boucle chaotique ! Découvrez comment dompter les effets secondaires.',
  prerequisites: 'Avoir complété le Module 1 (Coroutines) et le Module 6 (Recomposition et State).',
  lessons: [
    {
      id: 'side-effects-intro',
      title: 'Qu\'est-ce qu\'un effet secondaire (Side Effect) ?',
      analogy: 'Regarder la carte d\'un restaurant est un acte sans effet extérieur : tes yeux lisent les plats (le rendu de l\'UI). En revanche, commander une pizza ou payer l\'addition est un effet secondaire : cela change le monde extérieur au-delà de ton simple regard.',
      definition: 'Dans Jetpack Compose, un "effet secondaire" (Side Effect) est tout changement d\'état ou toute action qui se produit en dehors de la portée pure de la fonction Composable (ex: afficher une Snackbar, charger des données réseau, naviguer vers un autre écran, ou démarrer un chronomètre).',
      codeExample: {
        code: `@Composable
fun ErreurDangereuseAffichage() {
    // ❌ ERREUR GRAVE : Lancer un effet sauvage dans le corps du Composable !
    // Si l'écran se recompose 50 fois, ce code sera exécuté 50 fois d'affilée !
    println("Attention : Je suis exécuté à CHAQUE recomposition !")
    
    // Pire encore :
    // api.telechargerDonnees() // Déclencherait 50 requêtes simultanées et ferait planter le serveur !
    
    Text("Mon écran")
}`,
        lineByLine: [
          {
            line: 5,
            code: 'println("Attention : Je suis exécuté à CHAQUE recomposition !")',
            explanation: 'Comme Compose peut réexécuter cette fonction à tout moment dès qu\'un pixel change, ce print se répètera sans fin.'
          },
          {
            line: 8,
            code: '// api.telechargerDonnees()',
            explanation: 'Ne JAMAIS appeler de requêtes réseau ou de bases de données sauvagement dans un composable !'
          }
        ]
      },
      visualMockup: {
        type: 'side-effect-risk',
        title: 'Le piège de la Recomposition intempestive',
        composableCall: 'Recomposition 1 ➔ Exécution !',
        recomp2: 'Recomposition 2 ➔ Réexécution !',
        recomp3: 'Recomposition 3 ➔ Réexécution inutile !',
        solution: '🛡️ Solution obligatoire : Encadrer avec LaunchedEffect ou un gestionnaire d\'effet.'
      },
      commonMistakes: [
        {
          mistake: 'Faire un appel réseau ou modifier une base de données directement dans le corps d\'un Composable sans utiliser LaunchedEffect.',
          fix: 'Encadrez toujours vos tâches asynchrones d\'initialisation dans un bloc `LaunchedEffect`.',
          explanation: 'Compose garantit ainsi que la tâche ne sera lancée qu\'une seule fois lors de l\'apparition du composant.'
        }
      ],
      quiz: {
        question: 'Pourquoi est-il dangereux de lancer un téléchargement de données directement dans le corps d\'une fonction Composable ?',
        options: [
          'Parce que le téléphone va changer de couleur',
          'Parce que la fonction peut être recomposée plusieurs fois et relancerait le téléchargement en boucle',
          'Parce que Kotlin n\'aime pas Internet',
          'Parce que les boutons deviennent invisibles'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! La recomposition relancerait la requête réseau de façon incontrôlée.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 67.1 : Qu\'est-ce qu\'un effet secondaire ?',
          url: '#',
          note: 'Documentation sur la pureté des fonctions de rendu Compose.'
        }
      ]
    },
    {
      id: 'side-effects-launchedeffect',
      title: 'LaunchedEffect : Lancer une coroutine avec le cycle de vie',
      analogy: 'LaunchedEffect, c\'est comme allumer la lumière automatique dans un couloir : la lumière s\'allume dès que quelqu\'un entre dans le couloir (le composant apparaît à l\'écran) et s\'éteint automatiquement dès qu\'il en sort (le composant quitte l\'écran).',
      definition: '"LaunchedEffect" est un composable qui démarre une coroutine en toute sécurité dès que le composable entre dans la composition. Il prend une ou plusieurs "clés" (keys) en paramètre : la coroutine ne sera relancée QUE si la clé change de valeur. Si la clé est "Unit" ou "true", elle ne s\'exécute qu\'une seule et unique fois.',
      codeExample: {
        code: `@Composable
fun EcranChargement(idArticle: Int) {
    var texteArticle by remember { mutableStateOf("Chargement en cours...") }

    // Se lance à l'apparition de l'écran ou si idArticle change :
    LaunchedEffect(key1 = idArticle) {
        // Nous sommes dans une coroutine Kotlin sécurisée !
        val resultat = recupererArticleDepuisServeur(idArticle) // suspend fun
        texteArticle = resultat
    }

    Text(text = texteArticle)
}`,
        lineByLine: [
          {
            line: 6,
            code: 'LaunchedEffect(key1 = idArticle) {',
            explanation: '"LaunchedEffect" ouvre un scope de coroutine. Si idArticle reste le même, aucune relance n\'a lieu même si l\'écran se recompose.'
          },
          {
            line: 8,
            code: 'val resultat = recupererArticleDepuisServeur(idArticle)',
            explanation: 'Appel sécurisé d\'une fonction "suspend" (vue au Module 1) sans bloquer l\'UI du téléphone.'
          },
          {
            line: 9,
            code: 'texteArticle = resultat',
            explanation: 'Mise à jour de l\'état : l\'UI se recompose automatiquement avec le texte final.'
          }
        ]
      },
      visualMockup: {
        type: 'launchedeffect-flow',
        title: 'Cycle de vie d\'un LaunchedEffect',
        entry: '1️⃣ Entrée en composition ➔ Lance la coroutine en tâche de fond',
        idle: '2️⃣ Recompositions d\'affichage ➔ La coroutine continue sans être interrompue',
        exit: '3️⃣ Sortie de l\'écran ➔ La coroutine est AUTOMATIQUEMENT annulée (pas de fuite !)'
      },
      commonMistakes: [
        {
          mistake: 'Mettre une clé qui change à chaque microseconde sans le vouloir, provoquant l\'annulation et le redémarrage permanent de la coroutine.',
          fix: 'Si vous voulez que la coroutine ne s\'exécute qu\'une seule fois à l\'ouverture, passez `key1 = Unit`.',
          explanation: '"Unit" étant constant, LaunchedEffect ne redémarrera jamais la tâche pendant toute la durée de vie du composant.'
        }
      ],
      quiz: {
        question: 'Que se passe-t-il si l\'utilisateur quitte l\'écran pendant qu\'une tâche lancée par `LaunchedEffect` est en train de tourner ?',
        options: [
          'Le téléphone plante',
          'La coroutine est automatiquement annulée de manière propre pour économiser la mémoire',
          'L\'application refuse de fermer la page',
          'La tâche continue de tourner en tâche de fond pour toujours'
        ],
        correctIndex: 1,
        explanation: 'Superbe ! C\'est la grande force de Compose : l\'annulation automatique liée au cycle de vie évite les fuites de mémoire.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 67.2 : LaunchedEffect',
          url: '#',
          note: 'Consulte l\'usage des clés de déclenchement dans les notes de cours.'
        }
      ]
    },
    {
      id: 'side-effects-coroutine-scope',
      title: 'rememberCoroutineScope : Coroutines sur clic utilisateur',
      analogy: 'rememberCoroutineScope, c\'est comme avoir une télécommande universelle dans ta poche : quand TU décides d\'appuyer sur le bouton "Ouvrir le garage" (clic utilisateur), la télécommande envoie l\'ordre au moteur sans t\'obliger à pousser la porte toi-même.',
      definition: 'Alors que LaunchedEffect se déclenche tout seul à l\'affichage de l\'écran, "rememberCoroutineScope" est utilisé lorsque vous devez lancer une opération asynchrone EN RÉPONSE À UNE ACTION UTILISATEUR (comme appuyer sur un Button ou tirer pour rafraîchir). Typiquement indispensable pour afficher une Snackbar !',
      codeExample: {
        code: `@Composable
fun EcranAvecSnackbar() {
    val snackbarHostState = remember { SnackbarHostState() }
    
    // Obtenir un CoroutineScope lié au cycle de vie de ce composable :
    val scope = rememberCoroutineScope()

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { padding ->
        Button(
            onClick = {
                // onClick n'est pas suspendu, on lance donc la coroutine via scope :
                scope.launch {
                    snackbarHostState.showSnackbar("Message envoyé avec succès !")
                }
            },
            modifier = Modifier.padding(padding)
        ) {
            Text("Envoyer")
        }
    }
}`,
        lineByLine: [
          {
            line: 6,
            code: 'val scope = rememberCoroutineScope()',
            explanation: '"rememberCoroutineScope()" crée un environnement de coroutine sûr capable de survivre aux recompositions.'
          },
          {
            line: 15,
            code: 'scope.launch { ... }',
            explanation: '"scope.launch" lance la coroutine asynchrone dès que l\'utilisateur clique sur le bouton.'
          },
          {
            line: 16,
            code: 'snackbarHostState.showSnackbar(...)',
            explanation: '"showSnackbar" est une fonction "suspend" qui attend la fermeture du bandeau par l\'utilisateur ou le délai imparti.'
          }
        ]
      },
      visualMockup: {
        type: 'snackbar-action-flow',
        title: 'Action utilisateur ➔ Snackbar asynchrone',
        click: '👆 Clic sur [ Envoyer ]',
        action: '🚀 scope.launch démarre la coroutine',
        result: '💬 Snackbar noire apparaît en bas d\'écran : "Message envoyé avec succès !"'
      },
      commonMistakes: [
        {
          mistake: 'Tenter d\'appeler directement `snackbarHostState.showSnackbar("...")` dans le `onClick = { }` sans `scope.launch`.',
          fix: 'Le compilateur bloque avec l\'erreur : "Suspend function \'showSnackbar\' should be called only from a coroutine or another suspend function". Enveloppez-le toujours dans `scope.launch { }`.',
          explanation: 'Les lambdas de clic ne sont pas des fonctions suspendues par défaut.'
        }
      ],
      quiz: {
        question: 'Quand devez-vous choisir `rememberCoroutineScope` plutôt que `LaunchedEffect` ?',
        options: [
          'Quand vous voulez changer la couleur de fond',
          'Quand l\'action asynchrone doit se déclencher suite à un événement utilisateur (comme un clic de bouton)',
          'Quand vous n\'avez pas de connexion Internet',
          'Uniquement pour charger des images'
        ],
        correctIndex: 1,
        explanation: 'Parfait ! LaunchedEffect = automatique à l\'affichage. rememberCoroutineScope = déclenché manuellement par un clic ou un geste.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 39.3 et 81.2 : Appeler des fonctions asynchrones',
          url: '#',
          note: 'Consulte l\'interaction entre SnackbarHostState et le scope de coroutine.'
        }
      ]
    }
  ]
};
