// MODULE 7 — Architecture avec ViewModel
// Pourquoi un ViewModel, UiState, StateFlow, ViewModelFactory, logique métier séparée de l'UI.

export const MODULE_7 = {
  id: 'module-7',
  number: 7,
  title: 'Architecture avec ViewModel',
  subtitle: 'Séparer la logique métier de l\'affichage avec le composant d\'architecture officiel',
  description: 'Mettre du calcul, de la validation ou des requêtes directement dans un Composable transforme rapidement votre code en un plat de spaghettis indigeste. Le ViewModel est le gardien de votre logique et de vos données.',
  prerequisites: 'Avoir complété le Module 1 (classes et data class) et le Module 6 (gestion de l\'état).',
  lessons: [
    {
      id: 'viewmodel-intro',
      title: 'Pourquoi un ViewModel ? Cycle de vie et robustesse',
      analogy: 'Le ViewModel, c\'est comme le régisseur en coulisses d\'un théâtre : les acteurs sur scène (l\'écran) changent de costume ou entrent et sortent, mais le régisseur en coulisses reste toujours à son poste, avec le cahier de texte et les accessoires sous la main.',
      definition: 'Un "ViewModel" est une classe fournie par la bibliothèque AndroidX conçue pour stocker et préparer les données d\'un écran. Sa caractéristique magique : il survit aux changements de configuration (comme la rotation du téléphone ou le passage en mode multifenêtre) sans perdre aucune donnée.',
      codeExample: {
        code: `import androidx.lifecycle.ViewModel

// Déclaration d'un ViewModel :
class CompteurViewModel : ViewModel() {
    var score: Int = 0
        private set // Protégé en écriture de l'extérieur !

    fun incrementer() {
        score++
    }
}`,
        lineByLine: [
          {
            line: 1,
            code: 'import androidx.lifecycle.ViewModel',
            explanation: 'Import de la classe de base officielle d\'architecture Android.'
          },
          {
            line: 4,
            code: 'class CompteurViewModel : ViewModel() {',
            explanation: 'Notre classe hérite de "ViewModel()". Android gère automatiquement son cycle de vie.'
          },
          {
            line: 6,
            code: 'private set',
            explanation: 'Bonne pratique d\'encapsulation : l\'UI peut lire la valeur, mais seule la classe ViewModel peut la modifier.'
          },
          {
            line: 8,
            code: 'fun incrementer() { score++ }',
            explanation: 'Toute modification de données se fait via une méthode explicite.'
          }
        ]
      },
      visualMockup: {
        type: 'lifecycle-comparison',
        title: 'Cycle de vie Activity vs ViewModel',
        activity: 'Activity Android : 🔄 Détruite et recréée lors d\'une rotation',
        viewmodel: 'ViewModel : 🛡️ Reste VIVANT en mémoire durant toute la session !'
      },
      commonMistakes: [
        {
          mistake: 'Passer une référence d\'Activity ou de Contexte d\'interface dans un ViewModel (ex: `var activity: Activity`).',
          fix: 'Ne passez JAMAIS de référence d\'Activity ou de vue dans un ViewModel. Si vous avez besoin d\'un contexte, héritez d\'AndroidViewModel pour utiliser l\'ApplicationContext.',
          explanation: 'Garder une référence vers une Activity détruite crée une fuite de mémoire ("memory leak") majeure.'
        }
      ],
      quiz: {
        question: 'Quelle est la particularité essentielle d\'un ViewModel lors de la rotation de l\'écran ?',
        options: [
          'Il est détruit et réinitialisé',
          'Il survit à la destruction de l\'Activity et conserve ses données intactes',
          'Il s\'enregistre sur une clé USB',
          'Il coupe le son du téléphone'
        ],
        correctIndex: 1,
        explanation: 'Excellent ! C\'est la raison première de l\'existence du ViewModel sous Android.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 44.3 : Le ViewModel comme conteneur d\'état',
          url: '#',
          note: 'Découvre comment Android Studio connecte le ViewModel au composable.'
        }
      ]
    },
    {
      id: 'viewmodel-separation',
      title: 'Séparation stricte : Logique métier vs Interface utilisateur',
      analogy: 'C\'est la séparation entre le chef cuisinier en cuisine (le ViewModel) et le serveur en salle (le Composable) : le serveur prend les commandes et apporte les assiettes garnies aux clients, mais il ne touche jamais aux poêles ni au sel.',
      definition: 'L\'interface utilisateur (les fonctions @Composable) ne doit s\'occuper QUE de l\'affichage et de la capture des événements utilisateurs. Tous les calculs, règles d\'affaires, validations de données et accès aux dépôts doivent être confinés dans le ViewModel.',
      codeExample: {
        code: `// 1. LE VIEWMODEL (Cuisine : logique et calculs) :
class CalculatriceViewModel : ViewModel() {
    fun calculerTotalAvecTaxes(sousTotal: Double): Double {
        return sousTotal * 1.14975 // TPS + TVQ du Québec
    }
}

// 2. LE COMPOSABLE (Salle : affichage pur) :
@Composable
fun EcranFacture(viewModel: CalculatriceViewModel = viewModel()) {
    val total = viewModel.calculerTotalAvecTaxes(100.0)
    
    // Le composable se contente d'afficher le résultat prêt :
    Text(text = "Total à payer : $total $")
}`,
        lineByLine: [
          {
            line: 2,
            code: 'class CalculatriceViewModel : ViewModel() {',
            explanation: 'Contient la règle de calcul financière (formule TPS + TVQ).'
          },
          {
            line: 9,
            code: 'fun EcranFacture(viewModel: CalculatriceViewModel = viewModel()) {',
            explanation: '"viewModel()" est la fonction magique de Compose pour récupérer ou instancier le bon ViewModel automatiquement.'
          },
          {
            line: 14,
            code: 'Text(text = "Total à payer : $total $")',
            explanation: 'Le composable reste limpide, court et facile à maintenir.'
          }
        ]
      },
      visualMockup: {
        type: 'separation-architecture',
        title: 'Séparation des rôles',
        ui: '🎨 UI (Composable) : Afficher le texte, boutons, écouter les clics',
        divider: '⚡ Séparation stricte ⚡',
        vm: '🧠 ViewModel : Règles de gestion, calculs de taxes, validation'
      },
      commonMistakes: [
        {
          mistake: 'Écrire des requêtes HTTP ou des requêtes SQL directement dans le corps d\'un Composable.',
          fix: 'Déléguez toute opération de traitement ou de données au ViewModel.',
          explanation: 'L\'interface doit rester une simple fonction d\'affichage.'
        }
      ],
      quiz: {
        question: 'Quel composant doit contenir les règles de calcul de taxes d\'une commande ?',
        options: ['La TopAppBar', 'Le ViewModel', 'Le fichier strings.xml', 'Le composable Text()'],
        correctIndex: 1,
        explanation: 'Parfait ! Toute logique métier appartient au ViewModel.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 44.4 : Plus petit ancêtre commun',
          url: '#',
          note: 'Où injecter le ViewModel dans l\'arborescence des composables.'
        }
      ]
    },
    {
      id: 'viewmodel-uistate',
      title: 'UiState : Modéliser l\'état complet avec une data class',
      analogy: 'Un UiState, c\'est comme une capture d\'écran imprimée ou un instantané Polaroid : à une seconde précise, il contient l\'intégralité des éléments visibles sur l\'écran (le nom, le score, si le chargement tourne ou si une erreur est survenue).',
      definition: 'Au lieu d\'éparpiller 15 variables d\'état distinctes, l\'architecture moderne Android recommande de regrouper TOUT l\'état d\'un écran dans une seule "data class" immuable appelée `UiState`. Cela garantit la cohérence absolue de l\'écran.',
      codeExample: {
        code: `// L'état complet de l'écran regroupé en une seule data class :
data class ProfilUiState(
    val nomUtilisateur: String = "",
    val nombreAmis: Int = 0,
    val estEnTrainDeCharger: Boolean = false,
    val messageErreur: String? = null
)

// Dans le ViewModel :
class ProfilViewModel : ViewModel() {
    // Un seul état pour tout l'écran !
    var uiState by mutableStateOf(ProfilUiState())
        private set
}`,
        lineByLine: [
          {
            line: 2,
            code: 'data class ProfilUiState(',
            explanation: 'Utilisation d\'une "data class" Kotlin (vue au Module 1) avec valeurs par défaut.'
          },
          {
            line: 5,
            code: 'val estEnTrainDeCharger: Boolean = false',
            explanation: 'Drapeau pour afficher ou masquer une roue de chargement.'
          },
          {
            line: 11,
            code: 'var uiState by mutableStateOf(ProfilUiState())',
            explanation: 'Le ViewModel n\'expose qu\'un seul conteneur d\'état, rendant impossible d\'avoir des états incohérents.'
          }
        ]
      },
      visualMockup: {
        type: 'uistate-card',
        title: 'Photographie de l\'état d\'écran (UiState)',
        snapshot: [
          'nomUtilisateur : "Marie-Claire"',
          'nombreAmis : 42',
          'estEnTrainDeCharger : false',
          'messageErreur : null (aucune erreur)'
        ]
      },
      commonMistakes: [
        {
          mistake: 'Avoir 8 variables MutableState séparées dans le ViewModel qui se contredisent (ex: estErreur = true et estSucces = true en même temps).',
          fix: 'Regroupez votre état dans un UiState ou une sealed interface (Loading, Success, Error).',
          explanation: 'L\'état unique supprime tous les états impossibles ou contradictoires.'
        }
      ],
      quiz: {
        question: 'Quel est l\'avantage principal de regrouper l\'état d\'un écran dans une data class `UiState` ?',
        options: [
          'Diminuer la taille de la batterie du téléphone',
          'Garantir un état cohérent, prévisible et facile à tester pour tout l\'écran',
          'Convertir le code Kotlin en C++',
          'Empêcher l\'utilisateur de cliquer'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! Une seule source de vérité pour tout ce qui s\'affiche.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 44.2 et UiState',
          url: '#',
          note: 'Consulte les modèles de data class pour l\'UI.'
        }
      ]
    },
    {
      id: 'viewmodel-stateflow',
      title: 'StateFlow et asStateFlow() : Le tuyau réactif officiel',
      analogy: 'StateFlow, c\'est comme un tuyau d\'arrosage transparent d\'où coule toujours de l\'eau : quiconque branche un arroseur au bout (l\'écran) voit immédiatement la pression actuelle et toute nouvelle goutte qui passe.',
      definition: '"StateFlow" est un flux de données réactif moderne de la bibliothèque Kotlin Coroutines. Dans le ViewModel, on déclare un `_uiState` privé et modifiable (`MutableStateFlow`), et on expose un `uiState` public en lecture seule via `.asStateFlow()`. Dans Compose, on l\'observe avec `collectAsState()`.',
      codeExample: {
        code: `class EtudiantViewModel : ViewModel() {
    // 1. Version privée modifiable (réservée au ViewModel) :
    private val _uiState = MutableStateFlow(ProfilUiState())
    
    // 2. Version publique en lecture seule exposée à l'UI :
    val uiState: StateFlow<ProfilUiState> = _uiState.asStateFlow()

    fun mettreAJourNom(nouveauNom: String) {
        _uiState.update { etatActuel ->
            etatActuel.copy(nomUtilisateur = nouveauNom)
        }
    }
}

// Dans le Composable :
@Composable
fun EcranProfil(viewModel: EtudiantViewModel = viewModel()) {
    // 3. Conversion du StateFlow en State Compose observable :
    val state by viewModel.uiState.collectAsState()
    
    Text("Nom : \${state.nomUtilisateur}")
}`,
        lineByLine: [
          {
            line: 3,
            code: 'private val _uiState = MutableStateFlow(ProfilUiState())',
            explanation: 'Le préfixe souligné "_" est la convention officielle pour la variable privée mutable.'
          },
          {
            line: 6,
            code: 'val uiState: StateFlow<ProfilUiState> = _uiState.asStateFlow()',
            explanation: '"asStateFlow()" convertit le flux en lecture seule pour empêcher l\'écran de modifier l\'état en fraude.'
          },
          {
            line: 9,
            code: '_uiState.update { etatActuel -> etatActuel.copy(...) }',
            explanation: '".update" garantit une mise à jour thread-safe de la data class grâce à .copy().'
          },
          {
            line: 19,
            code: 'val state by viewModel.uiState.collectAsState()',
            explanation: '"collectAsState()" est le pont magique qui transforme le StateFlow en état réactif pour Compose.'
          }
        ]
      },
      visualMockup: {
        type: 'stateflow-pipe',
        title: 'Architecture StateFlow sécurisée',
        inside: '🔒 _uiState (MutableStateFlow) ➔ Contrôlé en interne',
        pipe: '======== .asStateFlow() ➔ Flux en lecture seule ========>',
        outside: '👁️ uiState (collectAsState) ➔ Consommé par le Composable'
      },
      commonMistakes: [
        {
          mistake: 'Exposer directement `MutableStateFlow` publiquement dans le ViewModel.',
          fix: 'Gardez toujours le MutableStateFlow privé et exposez uniquement un `StateFlow` immuable avec `.asStateFlow()`.',
          explanation: 'L\'UI ne doit jamais pouvoir écrire directement dans l\'état sans passer par une fonction du ViewModel.'
        }
      ],
      quiz: {
        question: 'Quelle fonction Compose utilise-t-on pour observer un StateFlow dans un composable ?',
        options: ['readState()', 'collectAsState()', 'flowToCompose()', 'listen()'],
        correctIndex: 1,
        explanation: 'Bravo ! collectAsState() s\'abonne au flux et déclenche la recomposition dès qu\'une valeur arrive.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 44.3 : StateFlow et Compose',
          url: '#',
          note: 'Documentation Google sur le pattern StateFlow recommandé.'
        }
      ]
    },
    {
      id: 'viewmodel-factory',
      title: 'viewModel() et ViewModelFactory : Passer des paramètres',
      analogy: 'Une Factory (usine en français), c\'est comme commander une paire de chaussures sur mesure avec ta pointure exacte : par défaut, le magasin n\'a que des modèles standards sans argument, mais si tu as besoin de spécifier un numéro de série spécial (un paramètre), tu passes par l\'atelier de fabrication.',
      definition: 'Par défaut, la fonction `viewModel()` n\'accepte que des ViewModel ayant un constructeur vide sans paramètres. Si votre ViewModel a besoin d\'un identifiant d\'enregistrement, d\'un contexte ou d\'un Repository, vous devez lui fournir une "ViewModelFactory" pour expliquer à Android comment le fabriquer.',
      codeExample: {
        code: `// ViewModel nécessitant un identifiant d'étudiant :
class DetailsEtudiantViewModel(private val idEtudiant: Int) : ViewModel() {
    // Logique basée sur idEtudiant...
}

// Fabrique (Factory) avec le constructeur moderne initializer :
val DetailsEtudiantViewModelFactory = viewModelFactory {
    initializer {
        // Logique de création personnalisée
        DetailsEtudiantViewModel(idEtudiant = 42)
    }
}

// Dans le composable :
@Composable
fun EcranDetails(factory: ViewModelProvider.Factory = DetailsEtudiantViewModelFactory) {
    val vm: DetailsEtudiantViewModel = viewModel(factory = factory)
}`,
        lineByLine: [
          {
            line: 2,
            code: 'class DetailsEtudiantViewModel(private val idEtudiant: Int)',
            explanation: 'Ce ViewModel exige un paramètre "idEtudiant" dans son constructeur.'
          },
          {
            line: 7,
            code: 'val DetailsEtudiantViewModelFactory = viewModelFactory {',
            explanation: 'Fonction utilitaire moderne pour déclarer la fabrique sans classe verbeuse.'
          },
          {
            line: 16,
            code: 'val vm: DetailsEtudiantViewModel = viewModel(factory = factory)',
            explanation: 'On fournit la fabrique à "viewModel(factory = ...)" pour qu\'Android instancie le bon objet.'
          }
        ]
      },
      visualMockup: {
        type: 'factory-diagram',
        title: 'Rôle de la ViewModelFactory',
        defaultCase: 'ViewModel() vide ➔ Android l\'instancie tout seul avec viewModel()',
        paramCase: 'ViewModel(id = 42) ➔ Exige une Factory pour expliquer à Android comment le créer'
      },
      commonMistakes: [
        {
          mistake: 'Tenter de faire `val vm = MonViewModel(id = 5)` manuellement sans passer par la fonction `viewModel()`.',
          fix: 'N\'instanciez JAMAIS un ViewModel avec des parenthèses directes ! Utilisez toujours la fonction `viewModel(factory = ...)`.',
          explanation: 'Si vous l\'instanciez vous-même à la main, Android ne peut pas lier son cycle de vie et il perdra tout à la rotation de l\'écran !'
        }
      ],
      quiz: {
        question: 'Quand devez-vous obligatoirement fournir une ViewModelFactory ?',
        options: [
          'Chaque fois que vous utilisez une police de caractères bleue',
          'Dès que votre ViewModel requiert des paramètres dans son constructeur',
          'Uniquement les jours fériés',
          'Jamais, les ViewModels ne peuvent avoir aucun paramètre'
        ],
        correctIndex: 1,
        explanation: 'Tout à fait ! Android a besoin d\'instructions personnalisées pour créer un ViewModel avec paramètres.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 69.1 : ViewModelFactory',
          url: '#',
          note: 'Consulte les patterns de fabrique appliqués à la base de données Room.'
        }
      ]
    }
  ]
};
