// MODULE 13 — Navigation multi-écrans
// NavController, NavHost, routes, paramètres, BottomAppBar, NavigationBar.

export const MODULE_13 = {
  id: 'module-13',
  number: 13,
  title: 'Navigation multi-écrans',
  subtitle: 'Naviguer entre les écrans de votre application avec NavController',
  description: 'La plupart des applications mobiles ont plusieurs écrans. Apprenez à utiliser l\'API NavController pour passer d\'un écran à l\'autre, envoyer des données entre écrans et créer des barres de navigation professionnelles.',
  prerequisites: 'Avoir complété le Module 7 (ViewModel) et le Module 2 (Composables).',
  lessons: [
    {
      id: 'nav-intro',
      title: 'NavController et NavHost : Le GPS de votre application',
      analogy: 'Imagine un GPS dans une voiture : tu entres une destination (le nom d\'un écran), le GPS (NavController) sait où tu es, où aller, et comment revenir en arrière. Le NavHost est la carte routière qui contient toutes les routes possibles.',
      definition: 'Le NavController est un objet central qui gère la navigation entre les écrans d\'une application. Le NavHost est un conteneur Composable qui affiche l\'écran correspondant à la route actuelle. Ensemble, ils forment le système de navigation officiel recommandé par Google pour Jetpack Compose.',
      codeExample: {
        code: `// 1. Ajouter la dépendance dans app/build.gradle.kts :
// implementation("androidx.navigation:navigation-compose:2.9.5")

// 2. Créer le NavController dans votre Composable principal :
@Composable
fun MainScreen() {
    val navController = rememberNavController()
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            CenterAlignedTopAppBar(
                title = { Text("Mon Application") }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier.padding(innerPadding)
        ) {
            NavigationHost(navController = navController)
        }
    }
}`,
        lineByLine: [
          {
            line: 6,
            code: 'val navController = rememberNavController()',
            explanation: 'Crée une instance du NavController qui mémorise la pile de navigation. Le remember assure qu\'il ne sera pas recréé à chaque recomposition.'
          },
          {
            line: 7,
            code: 'Scaffold(',
            explanation: 'Le Scaffold contient la structure de base de l\'écran : barre du haut, contenu, barre du bas, etc.'
          },
          {
            line: 17,
            code: 'NavigationHost(navController = navController)',
            explanation: 'On passe le navController au NavigationHost qui décidera quel écran afficher selon la route actuelle.'
          }
        ]
      },
      visualMockup: {
        type: 'nav-architecture',
        title: 'Architecture de navigation Compose',
        topBar: '🔝 CenterAlignedTopAppBar',
        content: '📱 NavigationHost → affiche le bon écran',
        bottomBar: '🔽 BottomAppBar (optionnel)',
        routes: ['home', 'pageUn', 'pageDeux']
      },
      commonMistakes: [
        {
          mistake: 'Créer un NavController avec `NavController()` directement',
          correction: 'Toujours utiliser `rememberNavController()` pour que Compose mémorise l\'état de navigation entre les recompositions.'
        },
        {
          mistake: 'Oublier d\'ajouter la dépendance navigation-compose',
          correction: 'Sans la dépendance, Android Studio ne reconnaîtra pas les fonctions de navigation. Ajoutez-la dans app/build.gradle.kts et resynchronisez.'
        }
      ],
      quiz: {
        question: 'Quel objet gère la navigation entre les écrans dans Compose ?',
        options: ['NavHost', 'NavController', 'Scaffold', 'Router'],
        correctIndex: 1,
        explanation: 'Le NavController est l\'objet central qui commande la navigation. Le NavHost est le conteneur qui affiche l\'écran correspondant.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 63.1 : La navigation',
          url: '#'
        }
      ]
    },
    {
      id: 'navhost-routes',
      title: 'Définir les routes avec NavHost et composable()',
      analogy: 'Le NavHost est comme un carnet d\'adresses : chaque page a un nom (la route) et une adresse (le Composable à afficher). Quand tu cherches "pageDeux" dans le carnet, il t\'emmène directement à la bonne page.',
      definition: 'Le NavHost est le Composable qui contient la liste de toutes les destinations possibles de l\'application. Chaque destination est définie avec la fonction composable() qui associe un nom de route à un Composable spécifique. Le paramètre startDestination indique quel écran s\'affiche en premier.',
      codeExample: {
        code: `// Fichier NavigationHost.kt — Au même niveau que MainActivity.kt
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost

@Composable
fun NavigationHost(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen()
        }
        composable("pageUn") {
            PageUn()
        }
        composable("pageDeux") {
            PageDeux()
        }
    }
}`,
        lineByLine: [
          {
            line: 7,
            code: 'NavHost(',
            explanation: 'Le NavHost est le conteneur qui va afficher dynamiquement le Composable correspondant à la route actuelle.'
          },
          {
            line: 8,
            code: 'navController = navController,',
            explanation: 'On passe le NavController reçu en paramètre pour que le NavHost puisse réagir aux changements de navigation.'
          },
          {
            line: 9,
            code: 'startDestination = "home"',
            explanation: 'Le premier écran affiché au lancement de l\'application sera celui qui porte le nom de route "home".'
          },
          {
            line: 11,
            code: 'composable("home") {',
            explanation: 'Définit une route nommée "home". Quand le navController navigue vers "home", le contenu entre accolades (HomeScreen) sera affiché.'
          }
        ]
      },
      visualMockup: {
        type: 'nav-routes-map',
        title: 'Carte des routes de l\'application',
        routes: [
          { name: 'home', composable: 'HomeScreen()', isStart: true },
          { name: 'pageUn', composable: 'PageUn()', isStart: false },
          { name: 'pageDeux', composable: 'PageDeux()', isStart: false }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Écrire le code de l\'écran directement dans composable() au lieu de le mettre dans une fonction séparée',
          correction: 'Chaque écran doit être dans sa propre fonction Composable, dans son propre fichier sous le dossier ui/. Cela respecte le principe de séparation des responsabilités.'
        },
        {
          mistake: 'Utiliser des noms de route avec des espaces ou caractères spéciaux',
          correction: 'Les noms de route sont des chaînes simples, sans espaces. Utilisez des noms descriptifs comme "listeCategories" ou "detailsItem".'
        }
      ],
      quiz: {
        question: 'Quel paramètre du NavHost indique le premier écran à afficher ?',
        options: ['firstRoute', 'startDestination', 'initialRoute', 'homePage'],
        correctIndex: 1,
        explanation: 'Le paramètre startDestination du NavHost détermine quel écran est affiché au démarrage de l\'application.'
      },
      furtherReading: [
        {
          title: '« Naviguer avec Compose » - Android Developers',
          url: 'https://developer.android.com/develop/ui/compose/navigation'
        }
      ]
    },
    {
      id: 'nav-navigate-back',
      title: 'Naviguer entre les écrans : navigate() et popBackStack()',
      analogy: 'Naviguer avec navigate(), c\'est comme empiler des assiettes : chaque nouvel écran s\'ajoute au-dessus de la pile. Appuyer sur popBackStack(), c\'est retirer l\'assiette du dessus pour revenir à celle d\'en dessous.',
      definition: 'La méthode navController.navigate("nomRoute") permet d\'afficher un nouvel écran et de l\'ajouter à la pile de navigation. La méthode navController.popBackStack() permet de revenir à l\'écran précédent en le retirant de la pile. Cette mécanique de pile permet au bouton "Retour" d\'Android de fonctionner naturellement.',
      codeExample: {
        code: `@Composable
fun HomeScreen(navController: NavController) {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Bouton pour aller vers la page "pageUn"
        Button(
            onClick = {
                navController.navigate("pageUn")
            }
        ) {
            Text(text = "Aller à la Page 1")
        }
    }
}

@Composable
fun PageUn(navController: NavController) {
    Column(...) {
        Text(text = "Bienvenue sur la Page 1 !")
        
        // Bouton pour revenir en arrière
        Button(
            onClick = {
                navController.popBackStack()
            }
        ) {
            Text(text = "← Retour")
        }
    }
}`,
        lineByLine: [
          {
            line: 11,
            code: 'navController.navigate("pageUn")',
            explanation: 'Ajoute l\'écran "pageUn" au sommet de la pile de navigation. L\'écran "home" reste en dessous dans la pile.'
          },
          {
            line: 27,
            code: 'navController.popBackStack()',
            explanation: 'Retire l\'écran actuel de la pile et revient à l\'écran précédent (ici "home"). C\'est l\'équivalent programmatique du bouton Retour d\'Android.'
          }
        ]
      },
      visualMockup: {
        type: 'nav-stack',
        title: 'La pile de navigation (Back Stack)',
        steps: [
          { stack: ['home'], label: 'Départ : seul "home" est dans la pile' },
          { stack: ['home', 'pageUn'], label: 'Après navigate("pageUn")' },
          { stack: ['home'], label: 'Après popBackStack() : retour à "home"' }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Naviguer en boucle sans vider la pile (navigate sans fin)',
          correction: 'Si vous naviguez toujours avec navigate() sans popBackStack(), la pile de navigation grandit sans fin et consomme de la mémoire. Utilisez popBackStack() ou des options de navigation avancées pour nettoyer la pile.'
        },
        {
          mistake: 'Appeler popBackStack() sur un écran sans écran parent dans la pile',
          correction: 'Si la pile est vide, popBackStack() n\'a aucun effet. Vérifiez toujours qu\'il y a un écran précédent avant de l\'appeler.'
        }
      ],
      quiz: {
        question: 'Que fait navController.popBackStack() ?',
        options: [
          'Il détruit l\'application',
          'Il retire l\'écran actuel de la pile et revient à l\'écran précédent',
          'Il navigue vers l\'écran d\'accueil',
          'Il recharge l\'écran actuel'
        ],
        correctIndex: 1,
        explanation: 'popBackStack() retire l\'écran du sommet de la pile (Back Stack) et affiche l\'écran qui se trouvait en dessous.'
      },
      furtherReading: [
        {
          title: '« Navigation et pile Retour » - Android Developers',
          url: 'https://developer.android.com/guide/navigation/backstack'
        }
      ]
    },
    {
      id: 'nav-route-params',
      title: 'Passer des paramètres entre les écrans via les routes',
      analogy: 'Passer un paramètre dans une route, c\'est comme envoyer un colis avec une adresse et un numéro de colis. L\'adresse amène au bon endroit (l\'écran) et le numéro permet de retrouver l\'article exact (la donnée).',
      definition: 'Il est possible de passer des données d\'un écran à un autre en ajoutant des paramètres dans le nom de la route, par exemple "editerItem/{itemId}". Le paramètre est extrait dans le Composable de destination via navBackStackEntry.arguments. C\'est la technique recommandée par la documentation officielle Android : ne jamais passer un objet complet, uniquement un identifiant.',
      codeExample: {
        code: `// Dans NavigationHost.kt — Route avec un paramètre entier
composable(
    route = "editerItem/{itemId}",
    arguments = listOf(
        navArgument("itemId") { type = NavType.IntType }
    )
) { navBackStackEntry ->
    // Extraire le paramètre à partir de la route
    val itemId: Int = navBackStackEntry.arguments?.getInt("itemId") ?: -1
    // Passer le paramètre au Composable
    EditerItem(navController, itemId)
}

// Pour naviguer vers cette route avec un paramètre :
navController.navigate("editerItem/\${item.id}")

// ─── Route avec un paramètre String ───
composable("rechercherItem/{texte}") { navBackStackEntry ->
    val texte: String? = navBackStackEntry.arguments?.getString("texte")
    RechercherItem(navController, texte)
}

// Navigation :
navController.navigate("rechercherItem/\$maRecherche")`,
        lineByLine: [
          {
            line: 2,
            code: 'route = "editerItem/{itemId}",',
            explanation: 'Les accolades {itemId} indiquent un paramètre variable dans la route. Le nom "itemId" sera la clé pour le récupérer.'
          },
          {
            line: 4,
            code: 'navArgument("itemId") { type = NavType.IntType }',
            explanation: 'Par défaut, les paramètres sont des String. Ici on précise que "itemId" est un entier (IntType). Cela permet d\'utiliser getInt() au lieu de getString().'
          },
          {
            line: 8,
            code: 'val itemId: Int = navBackStackEntry.arguments?.getInt("itemId") ?: -1',
            explanation: 'On extrait le paramètre entier nommé "itemId" depuis les arguments de la route. Le ?: -1 est une valeur par défaut de sécurité.'
          },
          {
            line: 15,
            code: 'navController.navigate("editerItem/${item.id}")',
            explanation: 'On insère l\'identifiant de l\'item directement dans la chaîne de la route. Si item.id = 42, la route sera "editerItem/42".'
          }
        ]
      },
      visualMockup: {
        type: 'nav-params-flow',
        title: 'Flux de données entre écrans',
        from: 'ListeItems → clic sur item #42',
        route: 'navigate("editerItem/42")',
        to: 'EditerItem reçoit itemId = 42'
      },
      commonMistakes: [
        {
          mistake: 'Passer un objet complet (data class) comme paramètre de route',
          correction: 'Anti-patron ! Passez uniquement un identifiant (Int ou String). Le Composable de destination ira chercher l\'objet complet dans la base de données via le ViewModel. Cela évite les limites de taille et les données obsolètes.'
        },
        {
          mistake: 'Oublier de déclarer le type du paramètre quand ce n\'est pas un String',
          correction: 'Si le paramètre est un Int, il FAUT ajouter arguments = listOf(navArgument("id") { type = NavType.IntType }), sinon l\'application plantera.'
        }
      ],
      quiz: {
        question: 'Pourquoi ne faut-il JAMAIS passer un objet complet en paramètre de route ?',
        options: [
          'Parce que Kotlin ne le supporte pas',
          'Parce qu\'il y a une limite de taille et les données pourraient être obsolètes',
          'Parce que c\'est trop lent',
          'Parce que NavController ne supporte que les Int'
        ],
        correctIndex: 1,
        explanation: 'La documentation officielle recommande de passer un identifiant (ID) et de laisser chaque écran charger ses données. Cela évite les limites de taille et les incohérences si les données changent.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 63.1 : Passer des paramètres à une route',
          url: '#'
        }
      ]
    },
    {
      id: 'nav-bottombar',
      title: 'BottomAppBar et NavigationBar : Barre de navigation du bas',
      analogy: 'La barre de navigation en bas de l\'écran, c\'est comme les onglets d\'un classeur : chaque onglet mène à une section différente et tu peux voir d\'un coup d\'œil où tu te trouves grâce à l\'onglet en surbrillance.',
      definition: 'BottomAppBar est un composable libre pour créer une barre du bas personnalisée avec des icônes ou des boutons. NavigationBar (Material 3) est un composable spécialisé pour 3 à 5 destinations, qui gère automatiquement l\'espacement et l\'indicateur visuel de l\'élément actif. C\'est la solution recommandée par Material Design 3.',
      codeExample: {
        code: `// ─── NavigationBar : pour 3 à 5 destinations ───
val navController = rememberNavController()
val currentRoute = navController
    .currentBackStackEntryAsState().value?.destination?.route

Scaffold(
    bottomBar = {
        NavigationBar {
            NavigationBarItem(
                icon = {
                    Icon(Icons.Default.Home, contentDescription = "Accueil")
                },
                label = { Text("Accueil") },
                selected = currentRoute == "home",
                onClick = { navController.navigate("home") }
            )
            NavigationBarItem(
                icon = {
                    Icon(Icons.Default.Info, contentDescription = "Info")
                },
                label = { Text("Info") },
                selected = currentRoute == "information",
                onClick = { navController.navigate("information") }
            )
            NavigationBarItem(
                icon = {
                    Icon(Icons.Default.Person, contentDescription = "Compte")
                },
                label = { Text("Compte") },
                selected = currentRoute == "compte",
                onClick = { navController.navigate("compte") }
            )
        }
    }
) { innerPadding ->
    Column(modifier = Modifier.padding(innerPadding)) {
        NavigationHost(navController)
    }
}`,
        lineByLine: [
          {
            line: 3,
            code: 'val currentRoute = navController.currentBackStackEntryAsState().value?.destination?.route',
            explanation: 'Récupère le nom de la route actuellement affichée, en tant qu\'état observable. Cela permet de mettre en surbrillance l\'élément actif dans la barre.'
          },
          {
            line: 8,
            code: 'NavigationBar {',
            explanation: 'Le composable NavigationBar de Material 3. Il espace automatiquement les éléments sur toute la largeur et gère l\'indicateur visuel de sélection.'
          },
          {
            line: 13,
            code: 'selected = currentRoute == "home",',
            explanation: 'Compare la route actuelle avec "home" pour déterminer si cet élément est l\'onglet actif. Si oui, l\'indicateur visuel sera affiché.'
          },
          {
            line: 14,
            code: 'onClick = { navController.navigate("home") }',
            explanation: 'Au clic sur l\'icône, le navController navigue vers la route "home" et le NavHost affichera le Composable HomeScreen.'
          }
        ]
      },
      visualMockup: {
        type: 'bottom-nav',
        title: 'Barre de navigation Material 3',
        items: [
          { icon: '🏠', label: 'Accueil', active: true },
          { icon: 'ℹ️', label: 'Info', active: false },
          { icon: '👤', label: 'Compte', active: false }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Utiliser NavigationBar avec plus de 5 ou moins de 3 éléments',
          correction: 'La documentation officielle spécifie : "NavigationBar should contain three to five NavigationBarItems". Si vous avez plus ou moins d\'éléments, utilisez un BottomAppBar personnalisé.'
        },
        {
          mistake: 'Oublier de comparer la route actuelle pour le paramètre selected',
          correction: 'Sans la logique selected = currentRoute == "maRoute", aucun indicateur visuel ne sera affiché et l\'utilisateur ne saura pas sur quel onglet il se trouve.'
        }
      ],
      quiz: {
        question: 'Combien d\'éléments peut contenir un NavigationBar selon la documentation officielle ?',
        options: ['1 à 3', '2 à 4', '3 à 5', 'Illimité'],
        correctIndex: 2,
        explanation: 'La documentation Material 3 recommande entre 3 et 5 éléments NavigationBarItem dans un NavigationBar. Au-delà, il faut utiliser BottomAppBar.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 63.3 : BottomAppBar',
          url: '#'
        },
        {
          title: 'Notes du cours — Section 63.4 : NavigationBar',
          url: '#'
        }
      ]
    },
    {
      id: 'nav-viewmodel-integration',
      title: 'Le ViewModel et la navigation : Où instancier ?',
      analogy: 'Le ViewModel est comme le cerveau de l\'application : il n\'y en a qu\'un et tous les écrans doivent consulter le même. Il faut donc le placer à un endroit accessible par tous les écrans, comme un tableau d\'affichage au centre du bureau.',
      definition: 'Dans une application avec navigation, le ViewModel ne doit exister qu\'en un seul exemplaire. Il peut être instancié dans le NavigationHost (puis passé aux routes qui en ont besoin) ou au même endroit que le navController. L\'essentiel est qu\'il soit créé au plus petit ancêtre commun des Composables qui l\'utilisent.',
      codeExample: {
        code: `// Technique 1 : Déclarer le ViewModel dans le NavigationHost
@Composable
fun NavigationHost(navController: NavHostController) {
    val categorieViewModel: CategorieViewModel = viewModel()
    
    NavHost(navController = navController, startDestination = "home") {
        composable("listeCategories") {
            ListeCategories(categorieViewModel, navController)
        }
        composable(
            route = "editerCategorie/{id}",
            arguments = listOf(navArgument("id") { type = NavType.IntType })
        ) { backStackEntry ->
            val id = backStackEntry.arguments?.getInt("id") ?: -1
            EditerCategorie(categorieViewModel, navController, id)
        }
    }
}

// Technique 2 : Déclarer au même endroit que navController
@Composable
fun MainScreen() {
    val navController = rememberNavController()
    val categorieViewModel: CategorieViewModel = viewModel()
    Scaffold(content = { paddingValues ->
        Column(modifier = Modifier.padding(paddingValues)) {
            NavigationHost(navController, categorieViewModel)
        }
    })
}`,
        lineByLine: [
          {
            line: 4,
            code: 'val categorieViewModel: CategorieViewModel = viewModel()',
            explanation: 'Instancie le ViewModel UNE seule fois. Grâce à viewModel(), il ne sera pas recréé à chaque recomposition ni rotation du téléphone.'
          },
          {
            line: 8,
            code: 'ListeCategories(categorieViewModel, navController)',
            explanation: 'On passe LE MÊME ViewModel à chaque écran. Tous les écrans travaillent avec les mêmes données.'
          }
        ]
      },
      visualMockup: {
        type: 'nav-viewmodel',
        title: 'Un seul ViewModel partagé entre les routes',
        center: 'CategorieViewModel (unique)',
        screens: ['ListeCategories', 'EditerCategorie', 'AjouterCategorie']
      },
      commonMistakes: [
        {
          mistake: 'Instancier un nouveau ViewModel dans chaque écran avec viewModel()',
          correction: 'Chaque appel à viewModel() dans un Composable différent peut créer une instance distincte selon le scope. Instanciez le ViewModel au plus petit ancêtre commun et passez-le en paramètre.'
        },
        {
          mistake: 'Passer le ViewModel complet alors que seul le uiState est nécessaire',
          correction: 'Bien que la documentation recommande de ne pas passer un ViewModel en paramètre, dans le cadre de ce cours, cette pratique est autorisée pour simplifier le code.'
        }
      ],
      quiz: {
        question: 'Pourquoi le ViewModel ne doit-il exister qu\'en un seul exemplaire ?',
        options: [
          'Pour économiser de la mémoire',
          'Pour que tous les écrans partagent les mêmes données (source unique de vérité)',
          'Parce que Kotlin interdit les copies',
          'Pour aller plus vite'
        ],
        correctIndex: 1,
        explanation: 'Le ViewModel est la Source Unique de Vérité (SSOT). S\'il y avait plusieurs copies, les données pourraient être incohérentes entre les écrans.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 63.2 : Le ViewModel et la navigation',
          url: '#'
        }
      ]
    }
  ]
};
