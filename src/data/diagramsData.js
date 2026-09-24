// Données et étapes interactives pour les schémas et diagrammes d'architecture

export const DIAGRAMS_DATA = {
  composableLifecycle: {
    id: 'composable-lifecycle',
    title: 'Cycle de vie d\'un Composable',
    subtitle: 'Comment Compose crée, met à jour et détruit les éléments de l\'arbre d\'interface',
    steps: [
      {
        id: 'enter',
        phase: '1. Entrée dans la Composition',
        badge: '🟢 Initialisation',
        title: 'Première apparition à l\'écran',
        description: 'La fonction Composable est exécutée pour la première fois. Compose instancie sa place dans l\'arbre de rendu, alloue la mémoire pour les blocs "remember", et déclenche les LaunchedEffect(key1 = Unit).',
        codeSnippet: `@Composable
fun MonBouton() {
    // 1. Initialisé une seule fois ici :
    val compteur = remember { mutableStateOf(0) }
}`
      },
      {
        id: 'recompose',
        phase: '2. Recomposition (0, 1 ou plusieurs fois)',
        badge: '🔄 Cycle Réactif',
        title: 'Mise à jour ciblée sur changement d\'état',
        description: 'Chaque fois qu\'une variable d\'état lue par ce composable est modifiée, Compose réexécute UNIQUEMENT ce composant. Les blocs "remember" conservent leur valeur précédente. Les composants dont les données n\'ont pas changé sont ignorés ("Smart Recomposition").',
        codeSnippet: `// Dès que 'compteur.value' passe de 0 à 1 :
Text("Clics : \${compteur.value}") // <-- Recomposé automatiquement !`
      },
      {
        id: 'exit',
        phase: '3. Sortie de la Composition',
        badge: '🔴 Nettoyage',
        title: 'Retrait de l\'écran',
        description: 'Lorsque le composable n\'est plus requis (par exemple si une condition "if (afficher)" devient fausse ou que l\'utilisateur change d\'écran), il quitte la composition. Compose annule automatiquement les coroutines en cours et libère la mémoire.',
        codeSnippet: `if (estVisible) {
    MonComposant() // Quitte la composition quand estVisible = false
}`
      }
    ]
  },

  layoutHierarchy: {
    id: 'layout-hierarchy',
    title: 'La Trinité du Layout : Column vs Row vs Box',
    subtitle: 'Comprendre en un clin d\'œil les axes et la superposition dans l\'espace 2D/3D',
    types: [
      {
        id: 'column',
        name: 'Column { }',
        direction: 'Verticale ⬇️',
        mainAxis: 'Axe principal : Vertical (Arrangement)',
        crossAxis: 'Axe secondaire : Horizontal (Alignment)',
        explanation: 'Empile chaque nouvel enfant sous le précédent, comme les étages d\'un immeuble.',
        items: ['Enfant 1 (Haut)', 'Enfant 2 (Milieu)', 'Enfant 3 (Bas)']
      },
      {
        id: 'row',
        name: 'Row { }',
        direction: 'Horizontale ➡️',
        mainAxis: 'Axe principal : Horizontal (Arrangement)',
        crossAxis: 'Axe secondaire : Vertical (Alignment)',
        explanation: 'Range chaque enfant à droite du précédent, comme les wagons d\'un train.',
        items: ['Enfant 1 (Gauche)', 'Enfant 2 (Centre)', 'Enfant 3 (Droite)']
      },
      {
        id: 'box',
        name: 'Box { }',
        direction: 'Profondeur 🔲 (Z-Index)',
        mainAxis: 'Pas d\'axe d\'enfilade : Calques superposés',
        crossAxis: 'Alignement libre de chaque enfant (Alignment.TopEnd, Center, etc.)',
        explanation: 'Superpose les enfants les uns par-dessus les autres, comme des calques Photoshop.',
        items: ['Calque 1 (Fond)', 'Calque 2 (Premier plan)']
      }
    ]
  },

  cleanArchitectureFlow: {
    id: 'clean-architecture-flow',
    title: 'Flux de données complet (Clean Architecture Android)',
    subtitle: 'De l\'écran tactile Composable jusqu\'à la base de données Room et l\'API REST',
    nodes: [
      {
        id: 'ui',
        name: '1. Interface UI (Composable)',
        role: 'Affichage pur & Événements',
        desc: 'Observe le StateFlow via collectAsState(). Dès que l\'utilisateur clique sur un bouton, émet un événement vers le ViewModel.',
        color: 'border-blue-500 bg-blue-50 text-blue-900',
        icon: '🎨'
      },
      {
        id: 'viewmodel',
        name: '2. ViewModel',
        role: 'Gestionnaire d\'état & Logique d\'écran',
        desc: 'Survit aux rotations d\'écran. Contient les règles de calcul, met à jour le UiState et lance les coroutines via viewModelScope.',
        color: 'border-purple-500 bg-purple-50 text-purple-900',
        icon: '🧠'
      },
      {
        id: 'repository',
        name: '3. Repository (Dépôt)',
        role: 'Source unique de vérité',
        desc: 'Isole le ViewModel des détails techniques. Décide s\'il faut lire le cache local Room ou faire une requête réseau vers l\'API.',
        color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
        icon: '📦'
      },
      {
        id: 'sources',
        name: '4. Sources de données (Room & Retrofit)',
        role: 'Persistance locale & Données distantes',
        desc: 'Room stocke les tables SQL sur le disque du téléphone. Retrofit effectue les requêtes HTTP JSON vers le serveur distant.',
        color: 'border-amber-500 bg-amber-50 text-amber-900',
        icon: '🗄️ / 🌐'
      }
    ]
  }
};
