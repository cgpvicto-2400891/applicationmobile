// MODULE 5 — Mise en page globale
// Scaffold, zones de l'écran, innerPadding, un scaffold par app vs par écran.

export const MODULE_5 = {
  id: 'module-5',
  number: 5,
  title: 'Mise en page globale',
  subtitle: 'Scaffold, zones d\'écran et marges de sécurité',
  description: 'Un écran d\'application mobile moderne possède une barre de titre en haut, une barre de navigation en bas et un bouton d\'action flottant. Découvrez comment le Scaffold structure tout cela avec harmonie.',
  prerequisites: 'Avoir complété le Module 3 (composants UI) et le Module 4 (modifiers et padding).',
  lessons: [
    {
      id: 'scaffold-intro',
      title: 'Qu\'est-ce que le Scaffold ?',
      analogy: 'Le Scaffold (qui signifie "échafaudage" en anglais), c\'est comme le meuble d\'étagères déjà tout monté dans ton salon : il possède déjà les cases prévues sur mesure pour la télévision au milieu, la barre de son en haut et les tiroirs en bas.',
      definition: 'Le composable "Scaffold" est le conteneur de mise en page de plus haut niveau dans Material Design. Au lieu de vous battre à calculer manuellement la position de la barre de titre ou de la barre de navigation, Scaffold propose des "emplacements" (slots) prévus à cet effet.',
      codeExample: {
        code: `@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EcranDeBase() {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Mon Application") })
        }
    ) { paddingValeurs ->
        // Le contenu principal de l'écran s'insère ici !
        Text(
            text = "Bienvenue dans l'écran !",
            modifier = Modifier.padding(paddingValeurs)
        )
    }
}`,
        lineByLine: [
          {
            line: 4,
            code: 'Scaffold(',
            explanation: '"Scaffold" initialise le squelette d\'écran selon les normes visuelles de Google.'
          },
          {
            line: 5,
            code: 'topBar = { TopAppBar(...) },',
            explanation: '"topBar" est l\'emplacement réservé à la barre d\'application supérieure.'
          },
          {
            line: 9,
            code: ') { paddingValeurs ->',
            explanation: 'Scaffold fournit obligatoirement une variable "paddingValeurs" (PaddingValues) calculant la hauteur exacte des barres.'
          },
          {
            line: 13,
            code: 'modifier = Modifier.padding(paddingValeurs)',
            explanation: 'RÈGLE D\'OR : On applique ce padding sur le conteneur de contenu pour qu\'il ne soit pas caché sous la barre !'
          }
        ]
      },
      visualMockup: {
        type: 'scaffold-anatomy',
        title: 'Structure en blocs d\'un Scaffold',
        top: '🔝 TopAppBar : [ Mon Application ]',
        content: '📱 Content central avec marge intérieure (innerPadding)',
        bottom: '🔻 BottomBar ou Floating Action Button (FAB)'
      },
      commonMistakes: [
        {
          mistake: 'Ignorer le paramètre "paddingValeurs" (ex: écrire `_ ->` sans l\'utiliser dans le modifier de contenu).',
          fix: 'Appliquez TOUJOURS `Modifier.padding(paddingValeurs)` sur le premier conteneur enfant (généralement une Column ou une Box).',
          explanation: 'Si vous ignorez ces valeurs, le haut de votre texte passera DIRECTEMENT sous la TopAppBar et deviendra totalement invisible !'
        }
      ],
      quiz: {
        question: 'Que signifie le mot anglais "Scaffold" et quel est son rôle principal en Compose ?',
        options: [
          'Échafaudage : il structure les zones officielles de l\'écran (haut, bas, contenu)',
          'Escalade : il accélère le téléchargement des images',
          'Scanner : il vérifie la présence de virus sur le téléphone',
          'Scission : il coupe l\'écran en deux moitiés égales'
        ],
        correctIndex: 0,
        explanation: 'Exactement ! Scaffold sert d\'échafaudage architectural pour agencer toutes les composantes d\'un écran.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 27.1 : Structure de l\'écran avec Scaffold',
          url: '#',
          note: 'Consulte l\'anatomie complète recommandée par Material Design 3.'
        }
      ]
    },
    {
      id: 'scaffold-zones',
      title: 'Les 4 zones majeures du Scaffold',
      analogy: 'Les zones du Scaffold sont comme les compartiments d\'un sac à dos d\'école : une poche zippée en haut pour les lunettes (topBar), une grande poche centrale pour les manuels (content), une poche extérieure rapide pour la bouteille d\'eau (FAB) et le compartiment du fond pour les souliers (bottomBar).',
      definition: 'Le composable Scaffold dispose de plusieurs paramètres spécialisés appelés "slots" : `topBar` (barre supérieure), `bottomBar` (barre de navigation inférieure), `floatingActionButton` (bouton d\'action flottant ou FAB), `snackbarHost` (gestionnaire de notifications éphémères), et le corps principal `content`.',
      codeExample: {
        code: `@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EcranCompletZones() {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Accueil") })
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = true,
                    onClick = {},
                    icon = { Icon(Icons.Default.Home, contentDescription = "Accueil") },
                    label = { Text("Accueil") }
                )
            }
        },
        floatingActionButton = {
            FloatingActionButton(onClick = {}) {
                Icon(Icons.Default.Add, contentDescription = "Ajouter")
            }
        }
    ) { innerPadding ->
        Column(modifier = Modifier.padding(innerPadding)) {
            Text("Contenu de l'écran")
        }
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: 'topBar = { TopAppBar(...) },',
            explanation: 'Zone 1 : La barre d\'en-tête avec titre et icônes d\'actions éventuelles.'
          },
          {
            line: 8,
            code: 'bottomBar = { NavigationBar { ... } },',
            explanation: 'Zone 2 : La barre inférieure de navigation (onglets Accueil, Profil, Réglages).'
          },
          {
            line: 18,
            code: 'floatingActionButton = { FloatingActionButton(...) },',
            explanation: 'Zone 3 : Le bouton rond flottant emblématique de Material pour l\'action vedette (ex: nouveau message ou ajouter).'
          },
          {
            line: 23,
            code: ') { innerPadding -> Column(...) { ... } }',
            explanation: 'Zone 4 : Le corps central de l\'écran, protégé par innerPadding.'
          }
        ]
      },
      visualMockup: {
        type: 'phone-scaffold-full',
        title: 'Les 4 zones assemblées à l\'écran',
        topBar: 'TopAppBar : Accueil',
        fab: '➕ FAB flottant au-dessus du coin inférieur droit',
        bottomBar: '🏠 Accueil | 👤 Profil',
        content: 'Corps de page protégé des chevauchements'
      },
      commonMistakes: [
        {
          mistake: 'Tenter de placer manuellement le FloatingActionButton dans une Box avec un alignement complexe.',
          fix: 'Passez-le simplement au paramètre `floatingActionButton = { ... }` du Scaffold. Scaffold calcule automatiquement sa position exacte et évite qu\'il ne masque la barre du bas.',
          explanation: 'Scaffold applique automatiquement les règles de géométrie et d\'animation de Material Design.'
        }
      ],
      quiz: {
        question: 'Quel paramètre du Scaffold accueille le célèbre bouton rond flottant d\'Android ?',
        options: ['roundButton', 'floatingActionButton', 'actionSlot', 'hoverButton'],
        correctIndex: 1,
        explanation: 'Parfait ! "floatingActionButton" (souvent abrégé FAB) gère son élévation et sa position d\'ancrage.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 27.2 et 63.3 : TopBar et BottomAppBar',
          url: '#',
          note: 'Exemples complets avec menus et actions de navigation.'
        }
      ]
    },
    {
      id: 'scaffold-innerpadding',
      title: 'innerPadding : La règle de sécurité vitale',
      analogy: 'L\'innerPadding, c\'est comme la marge de sécurité que tu laisses entre le bord d\'un tableau noir et la craie : si tu écris trop près du rebord en bois, tes doigts coincent et l\'écriture est illisible.',
      definition: 'L\'argument "innerPadding" (de type PaddingValues) transmis à la lambda de contenu du Scaffold représente la hauteur exacte occupée par la TopAppBar en haut et la BottomBar en bas. Appliquer `Modifier.padding(innerPadding)` est impératif pour empêcher vos textes et boutons de se glisser sous les barres.',
      codeExample: {
        code: `@Composable
fun ComparaisonInnerPadding() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Titre d'en-tête") }) }
    ) { innerPadding ->
        // ✅ CORRECT : Le texte démarre exactement sous la TopAppBar :
        Column(modifier = Modifier.padding(innerPadding)) {
            Text("Je suis parfaitement visible !")
        }
        
        // ❌ PIÈGE : Si vous écriviez Column() sans innerPadding :
        // Le texte "Je suis caché" serait dessiné DERRIÈRE la barre de titre !
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: ') { innerPadding ->',
            explanation: 'Compose injecte ici l\'objet "innerPadding" contenant : top (hauteur de la TopAppBar) et bottom (hauteur de la BottomBar).'
          },
          {
            line: 7,
            code: 'Column(modifier = Modifier.padding(innerPadding)) {',
            explanation: 'En appliquant ce padding, la Column est repoussée juste en dessous de la barre supérieure. Tout le contenu reste 100% lisible.'
          }
        ]
      },
      visualMockup: {
        type: 'innerpadding-danger',
        title: 'Avec vs Sans innerPadding',
        without: '❌ SANS innerPadding : Le premier texte est masqué sous la TopAppBar bleue !',
        with: '✅ AVEC innerPadding : Le premier texte commence avec netteté juste sous la barre.'
      },
      commonMistakes: [
        {
          mistake: 'Écrire `innerPadding ->` mais oublier d\'écrire `modifier = Modifier.padding(innerPadding)` sur le premier élément enfant.',
          fix: 'Relie toujours innerPadding au modificateur du premier conteneur racine de ton contenu.',
          explanation: 'C\'est l\'une des erreurs les plus fréquentes de tous les débutants en Jetpack Compose.'
        }
      ],
      quiz: {
        question: 'Que risque-t-il d\'arriver si vous n\'appliquez pas `Modifier.padding(innerPadding)` dans le Scaffold ?',
        options: [
          'Le téléphone redémarre instantanément',
          'Les premiers éléments de votre écran seront cachés derrière la TopAppBar',
          'Le texte sera traduit en allemand',
          'La batterie se déchargera deux fois plus vite'
        ],
        correctIndex: 1,
        explanation: 'Exact ! Sans ce décalage, le dessin commence à l\'angle (0,0) tout en haut sous la barre de titre.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 27.1 : innerPadding et Scaffold',
          url: '#',
          note: 'Découvre comment fonctionne le calcul dynamique des marges système.'
        }
      ]
    },
    {
      id: 'scaffold-app-vs-screen',
      title: 'Architecture : Un Scaffold par app vs par écran',
      analogy: 'C\'est comme choisir entre un grand immeuble qui possède un hall d\'accueil unique avec un seul concierge pour tout le monde (Scaffold global), ou un ensemble de petites maisons individuelles ayant chacune leur propre porte d\'entrée personnalisée (Scaffold par écran).',
      definition: 'Dans une application Android comportant plusieurs écrans, deux architectures s\'opposent : soit déclarer un Scaffold unique au sommet de l\'application (pratique si la barre inférieure et le titre restent constants), soit déclarer un Scaffold dans chaque écran distinct (recommandé si chaque écran a ses propres actions, barres ou couleurs de thème).',
      codeExample: {
        code: `// APPROCHE RECOMMANDÉE EN JETPACK COMPOSE MODERNE :
// Chaque écran est indépendant et possède son propre Scaffold :

@Composable
fun EcranAccueil() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Accueil") }) }
    ) { innerPadding ->
        Text("Contenu accueil", modifier = Modifier.padding(innerPadding))
    }
}

@Composable
fun EcranDetailsProduit() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Fiche produit") }) }
    ) { innerPadding ->
        Text("Détails du produit", modifier = Modifier.padding(innerPadding))
    }
}`,
        lineByLine: [
          {
            line: 4,
            code: 'fun EcranAccueil() { Scaffold(...) { ... } }',
            explanation: 'L\'écran Accueil contrôle sa propre TopAppBar et son bouton d\'action.'
          },
          {
            line: 13,
            code: 'fun EcranDetailsProduit() { Scaffold(...) { ... } }',
            explanation: 'L\'écran Détails gère sa propre barre (par exemple avec une flèche Retour pour revenir en arrière).'
          }
        ]
      },
      visualMockup: {
        type: 'scaffold-architecture-diagram',
        title: 'Scaffold par écran (Modularité)',
        screenA: '📱 Écran Accueil [ TopAppBar Accueil + FAB Ajouter ]',
        screenB: '📱 Écran Détails [ TopAppBar avec Flèche Retour + Pas de FAB ]'
      },
      commonMistakes: [
        {
          mistake: 'Créer un Scaffold global géant avec des dizaines de variables booléennes compliquées pour savoir quelle barre afficher sur chaque sous-page.',
          fix: 'Modularisez : donnez à chaque écran sa propre fonction Composable avec son propre Scaffold sur mesure.',
          explanation: 'Cela rend les écrans totalement indépendants, testables isolément dans @Preview et réutilisables.'
        }
      ],
      quiz: {
        question: 'Pourquoi l\'approche "un Scaffold par écran" est-elle généralement préférée pour des écrans variés ?',
        options: [
          'Elle utilise moins de mémoire vive',
          'Elle permet à chaque écran de personnaliser facilement son titre, ses actions et ses barres en toute indépendance',
          'Parce que Google interdit d\'avoir un Scaffold global',
          'Pour désactiver le Wi-Fi'
        ],
        correctIndex: 1,
        explanation: 'Excellent ! Chaque écran devient ainsi autonome et facile à prévisualiser indépendamment.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 27.1 et 63.1 : Scaffold et navigation',
          url: '#',
          note: 'Consulte l\'intégration de la navigation entre écrans modulaires.'
        }
      ]
    }
  ]
};
