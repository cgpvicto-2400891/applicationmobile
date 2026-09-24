// MODULE 2 — Les fondations de Jetpack Compose
// On pose les briques théoriques et la structure de départ : aucun composant visuel poussé ici.

export const MODULE_2 = {
  id: 'module-2',
  number: 2,
  title: 'Les fondations de Jetpack Compose',
  subtitle: 'Comprendre l\'architecture déclarative moderne d\'Android',
  description: 'Fini les vieux fichiers XML compliqués ! Découvrez comment Jetpack Compose permet de créer toute l\'interface d\'une application directement en Kotlin avec des fonctions intelligentes.',
  prerequisites: 'Avoir complété le Module 1 (syntaxe Kotlin, fonctions et lambdas).',
  lessons: [
    {
      id: 'composable-intro',
      title: 'Qu\'est-ce qu\'un Composable ?',
      analogy: 'Un Composable, c\'est comme une recette de cuisine : tu donnes des ingrédients (paramètres) et elle produit un plat (un élément visuel à l\'écran). Si les ingrédients changent, elle refait le plat automatiquement.',
      definition: 'Un Composable est une fonction Kotlin spéciale qui décrit l\'apparence d\'une partie de l\'interface graphique selon l\'approche déclarative. Au lieu de dire à Android "crée un bouton, puis change sa couleur, puis écris un texte dedans", vous décrivez simplement l\'état final désiré : "Voici à quoi doit ressembler l\'écran avec ces données".',
      codeExample: {
        code: `// Un Composable simple qui accueille un étudiant :
@Composable
fun MessageBienvenue(nom: String) {
    Text(text = "Bonjour $nom !")
}`,
        lineByLine: [
          {
            line: 2,
            code: '@Composable',
            explanation: 'Cette annotation signale au compilateur que cette fonction n\'est pas du code ordinaire, mais qu\'elle va dessiner des éléments sur l\'écran du téléphone.'
          },
          {
            line: 3,
            code: 'fun MessageBienvenue(nom: String) {',
            explanation: 'Note la majuscule à "MessageBienvenue" : par convention dans Compose, un composable qui émet de l\'UI commence TOUJOURS par une majuscule (PascalCase).'
          },
          {
            line: 4,
            code: 'Text(text = "Bonjour $nom !")',
            explanation: 'Appel d\'un autre Composable de base fourni par Android pour afficher du texte. On lui passe le paramètre nommé "text".'
          }
        ]
      },
      visualMockup: {
        type: 'phone-screen',
        title: 'Rendu sur l\'écran Android',
        content: 'Bonjour Thomas !',
        details: 'Un simple texte noir net affiché en haut à gauche de l\'écran.'
      },
      commonMistakes: [
        {
          mistake: 'Tenter de faire retourner une valeur à un Composable (ex: "return monBouton").',
          fix: 'Un Composable visuel ne retourne rien (type Unit implicite). Il n\'a pas de valeur de retour car il émet directement des instructions de dessin dans le graphe d\'interface de Compose.',
          explanation: 'Compose n\'instancie pas d\'objets "View" comme en ancien XML Android. Il génère directement l\'arbre d\'éléments graphiques.'
        }
      ],
      quiz: {
        question: 'Quelle est la différence fondamentale entre l\'ancienne approche XML et Jetpack Compose ?',
        options: [
          'Compose nécessite de dessiner manuellement les pixels avec un pinceau',
          'Compose est déclaratif : on décrit l\'UI directement en Kotlin en fonction des données',
          'Compose ne fonctionne que sur les ordinateurs portables',
          'Compose utilise des scripts Bash pour générer l\'écran'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! Compose est une boîte à outils déclarative : l\'interface est une fonction directe de vos données.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 15.1 : Qu\'est-ce que Jetpack Compose ?',
          url: '#',
          note: 'Consulte l\'historique du passage d\'Android de XML vers Jetpack Compose.'
        }
      ]
    },
    {
      id: 'annotation-composable',
      title: 'L\'annotation @Composable et ses règles d\'or',
      analogy: 'L\'annotation @Composable est comme un badge d\'accès spécial VIP : seuls ceux qui portent ce badge ont le droit d\'entrer dans la zone VIP et d\'inviter d\'autres personnes portant ce même badge.',
      definition: 'L\'annotation @Composable informe le plugin du compilateur Kotlin que cette fonction est destinée à convertir des données en interface graphique. Elle applique une règle absolue : un Composable ne peut être appelé QUE depuis un autre Composable ou depuis la fonction setContent d\'une Activity.',
      codeExample: {
        code: `// RÈGLE 1 : Convention de nommage PascalCase (Majuscule)
// RÈGLE 2 : Peut seulement être appelé depuis un contexte Composable

@Composable
fun CarteEtudiant(nom: String, programme: String) {
    // Appel d'autres composables autorisés à l'intérieur
    Text(text = "Nom : $nom")
    Text(text = "Programme : $programme")
}

// ❌ ERREUR : Une fonction standard sans @Composable ne peut pas appeler CarteEtudiant !
// fun fonctionOrdinaire() {
//     CarteEtudiant("Alex", "Informatique") // Compilation Error !
// }`,
        lineByLine: [
          {
            line: 4,
            code: '@Composable',
            explanation: '"@Composable" est une annotation. Elle change la façon dont le compilateur traite la fonction en lui injectant en coulisses un gestionnaire d\'interface ("Composer").'
          },
          {
            line: 5,
            code: 'fun CarteEtudiant(nom: String, programme: String) {',
            explanation: 'Nommé en PascalCase (majuscule au début) car il représente un composant visuel (comme un nom commun).'
          },
          {
            line: 7,
            code: 'Text(text = "Nom : $nom")',
            explanation: 'Comme nous sommes dans une fonction annotée @Composable, l\'appel au composable Text() est 100% légal.'
          },
          {
            line: 12,
            code: '// CarteEtudiant("Alex", "Informatique") // Compilation Error !',
            explanation: 'Si une fonction normale tente d\'appeler un Composable, le compilateur bloque net avec : "@Composable invocations can only happen from the context of a @Composable function".'
          }
        ]
      },
      visualMockup: {
        type: 'rules-box',
        title: 'Les 3 règles d\'or du développeur Compose',
        rule1: '1️⃣ Toujours débuter par une MAJUSCULE (ex: ProfilUtilisateur, pas profilUtilisateur).',
        rule2: '2️⃣ Ne s\'appelle qu\'à l\'intérieur d\'un autre Composable ou dans setContent { }.',
        rule3: '3️⃣ Doit être rapide et sans effet de bord (pas d\'appel réseau sauvage en plein milieu !).'
      },
      commonMistakes: [
        {
          mistake: 'Nommer un composable avec une minuscule (ex: fun saluerUtilisateur()).',
          fix: 'Renommer avec une majuscule : fun SaluerUtilisateur().',
          explanation: 'En Kotlin Compose, les fonctions avec @Composable décrivent des éléments visuels et doivent être nommées comme des noms/classes (PascalCase).'
        }
      ],
      quiz: {
        question: 'D\'où avez-vous le droit d\'appeler une fonction annotée `@Composable` ?',
        options: [
          'De n\'importe quelle boucle for dans n\'importe quelle classe',
          'Uniquement depuis une autre fonction annotée @Composable ou dans le bloc setContent',
          'Seulement depuis un fichier HTML',
          'Exclusivement depuis le fichier AndroidManifest.xml'
        ],
        correctIndex: 1,
        explanation: 'Bravo ! Le compilateur veille strictement à ce qu\'un Composable ne soit invoqué que dans l\'écosystème Compose.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 15.2 : Les fonctions modulables',
          url: '#',
          note: 'Découvre pourquoi les composables sont réexécutés lors des recompositions.'
        }
      ]
    },
    {
      id: 'where-code-starts-manifest',
      title: 'Où commence le code : AndroidManifest.xml',
      analogy: 'L\'AndroidManifest.xml est comme le registre d\'état civil ou le plan d\'évacuation officiel du bâtiment : avant même que quelqu\'un n\'entre dans l\'application, Android consulte ce document pour savoir quelles pièces existent et par quelle porte d\'entrée principale commencer.',
      definition: 'Le fichier "AndroidManifest.xml" est la carte d\'identité de votre application pour le système Android. Il déclare les permissions nécessaires (Internet, caméra...), le nom de l\'application, son icône, et surtout quelle "Activity" doit démarrer en premier lorsque l\'utilisateur clique sur l\'icône de l\'application.',
      codeExample: {
        code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.MonProjet">

        <!-- L'Activity de démarrage de votre application : -->
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <!-- Indique qu'il s'agit du point d'entrée principal -->
                <action android:name="android.intent.action.MAIN" />
                <!-- Indique qu'une icône doit apparaître sur l'écran d'accueil -->
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>
</manifest>`,
        lineByLine: [
          {
            line: 4,
            code: '<application ... android:label="@string/app_name">',
            explanation: 'Définit les paramètres globaux de l\'appli. "@string/app_name" fait référence au texte du nom stocké dans res/values/strings.xml.'
          },
          {
            line: 11,
            code: 'android:name=".MainActivity"',
            explanation: 'Le point "." indique que la classe MainActivity se trouve dans le package racine défini pour votre projet.'
          },
          {
            line: 12,
            code: 'android:exported="true"',
            explanation: '"exported=true" est obligatoire pour l\'activité de démarrage pour qu\'Android OS ait l\'autorisation de la lancer depuis l\'extérieur.'
          },
          {
            line: 15,
            code: '<action android:name="android.intent.action.MAIN" />',
            explanation: '"MAIN" annonce au système d\'exploitation Android : "C\'est moi la porte d\'entrée principale de l\'application".'
          },
          {
            line: 17,
            code: '<category android:name="android.intent.category.LAUNCHER" />',
            explanation: '"LAUNCHER" ordonne au lanceur d\'applications du téléphone de créer une icône cliquable sur le bureau.'
          }
        ]
      },
      visualMockup: {
        type: 'manifest-diagram',
        title: 'Le rôle de filtre de démarrage d\'Android',
        flow: [
          { step: '1. Clic utilisateur', detail: 'Sur l\'icône de l\'app sur le téléphone' },
          { step: '2. Lecture Manifest', detail: 'Trouve l\'activité avec MAIN + LAUNCHER' },
          { step: '3. Lancement', detail: 'Instancie la classe MainActivity.kt' }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Oublier "android:exported=true" sur une activité qui contient un intent-filter.',
          fix: 'Depuis Android 12, toute activité ayant un <intent-filter> doit obligatoirement expliciter "android:exported="true"" ou "false", sinon l\'appli refuse de s\'installer.',
          explanation: 'C\'est une sécurité imposée par Google pour éviter les failles de sécurité entre applications.'
        }
      ],
      quiz: {
        question: 'Quelle balise dans AndroidManifest.xml indique à Android quelle classe lancer au démarrage de l\'application ?',
        options: [
          '<service android:name=".Demarrage" />',
          '<activity> contenant l\'action MAIN et la catégorie LAUNCHER',
          '<permission android:name="android.permission.START" />',
          '<entrypoint href="index.html" />'
        ],
        correctIndex: 1,
        explanation: 'Parfait ! C\'est la combinaison de l\'action android.intent.action.MAIN et de la catégorie LAUNCHER qui désigne l\'écran de lancement.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 15.3 : Par où commence le code ? Fichier AndroidManifest.xml',
          url: '#',
          note: 'Relis la structure complète du manifest généré par Android Studio.'
        }
      ]
    },
    {
      id: 'where-code-starts-activity',
      title: 'Où commence le code : MainActivity.kt',
      analogy: 'MainActivity.kt est le chef d\'orchestre qui allume la lumière dans la salle de spectacle : la méthode onCreate() ouvre les rideaux, et setContent { } invite la troupe de théâtre (vos Composables) à monter sur scène.',
      definition: 'L\'Activity est la fenêtre principale fournie par Android pour accueillir l\'interface. Dans une application moderne Jetpack Compose, l\'Activity hérite de ComponentActivity et contient la méthode onCreate(). C\'est à l\'intérieur de la fonction setContent { } que vous connectez votre code Compose au monde Android.',
      codeExample: {
        code: `package com.mondomaine.helloworld

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Active l'affichage moderne bord à bord (edge-to-edge)
        enableEdgeToEdge()
        
        // Point de rencontre entre Android et Compose :
        setContent {
            // Vos composables sont appelés ici !
            MessageBienvenue(nom = "Camille")
        }
    }
}`,
        lineByLine: [
          {
            line: 7,
            code: 'class MainActivity : ComponentActivity() {',
            explanation: '"ComponentActivity" est la classe de base moderne fournie par Google qui intègre le support natif de Jetpack Compose.'
          },
          {
            line: 8,
            code: 'override fun onCreate(savedInstanceState: Bundle?) {',
            explanation: '"onCreate()" est la première méthode du cycle de vie appelée par le système Android quand l\'écran s\'allume.'
          },
          {
            line: 9,
            code: 'super.onCreate(savedInstanceState)',
            explanation: 'Obligatoire en programmation orientée objet : on demande à la classe mère d\'initialiser ses mécanismes internes.'
          },
          {
            line: 12,
            code: 'enableEdgeToEdge()',
            explanation: '"enableEdgeToEdge()" permet au contenu de l\'application de s\'étendre sous la barre d\'état du haut et la barre de navigation du bas.'
          },
          {
            line: 15,
            code: 'setContent { ... }',
            explanation: '"setContent" (de l\'anglais "définir le contenu") est LA passerelle magique : tout ce qui se trouve entre ses accolades { } est votre monde Jetpack Compose.'
          }
        ]
      },
      visualMockup: {
        type: 'phone-frame',
        title: 'Ce qui s\'affiche lors de l\'exécution sur un vrai Pixel 8',
        body: 'Bonjour Camille !',
        status: 'Edge-to-edge actif (barre d\'état translucide)'
      },
      commonMistakes: [
        {
          mistake: 'Garder l\'ancienne fonction "setContentView(R.layout.activity_main)" de l\'époque XML.',
          fix: 'Avec Compose, on supprime tout appel à setContentView() et on utilise UNIQUEMENT "setContent { }".',
          explanation: 'Compose n\'a plus besoin d\'aucun layout XML généré.'
        }
      ],
      quiz: {
        question: 'Quelle fonction dans MainActivity sert de passerelle pour démarrer l\'affichage des Composables ?',
        options: ['startCompose()', 'setContent { }', 'launchApp()', 'openScreen()'],
        correctIndex: 1,
        explanation: 'Exact ! setContent { } prend une lambda Composable et configure le moteur de rendu pour remplir l\'écran.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 15.3 : Fichier MainActivity.kt',
          url: '#',
          note: 'Découvre le code complet généré par l\'assistant de création de projet Android Studio.'
        }
      ]
    },
    {
      id: 'compose-preview',
      title: 'La prévisualisation avec @Preview',
      analogy: 'L\'annotation @Preview est comme un miroir magique dans votre atelier : vous n\'avez pas besoin d\'habiller un vrai mannequin et de l\'envoyer sur la passerelle (lancer le lourd émulateur Android), vous jetez simplement un coup d\'œil au miroir directement dans Android Studio.',
      definition: 'L\'annotation @Preview permet aux développeurs d\'inspecter instantanément le rendu d\'un Composable directement dans le panneau de droite d\'Android Studio ("Split" ou "Design"), sans avoir à compiler l\'application entière ni à démarrer un émulateur ou brancher un câble USB.',
      codeExample: {
        code: `@Composable
fun CarteEtudiant(nom: String) {
    Text(text = "Étudiant : $nom")
}

// Fonction spéciale de prévisualisation (ne prend AUCUN paramètre) :
@Preview(showBackground = true, name = "Aperçu Carte Étudiant")
@Composable
fun CarteEtudiantPreview() {
    CarteEtudiant(nom = "Antoine")
}`,
        lineByLine: [
          {
            line: 6,
            code: '@Preview(showBackground = true, name = "Aperçu Carte Étudiant")',
            explanation: '"@Preview" active l\'aperçu dans Android Studio. "showBackground = true" ajoute un fond blanc pour voir le texte si le fond par défaut est transparent. "name" personnalise le libellé.'
          },
          {
            line: 7,
            code: '@Composable',
            explanation: 'La fonction d\'aperçu doit également être annotée avec @Composable.'
          },
          {
            line: 8,
            code: 'fun CarteEtudiantPreview() {',
            explanation: 'RÈGLE OBLIGATOIRE : une fonction @Preview ne doit recevoir AUCUN paramètre, car Android Studio ne saurait pas quoi lui fournir !'
          },
          {
            line: 9,
            code: 'CarteEtudiant(nom = "Antoine")',
            explanation: 'On appelle notre vrai composable en lui passant des fausses données de test (mock data) pour admirer le résultat.'
          }
        ]
      },
      visualMockup: {
        type: 'android-studio-preview',
        title: 'Panneau Split dans Android Studio',
        paneLeft: 'Code Kotlin (éditeur)',
        paneRight: 'Aperçu Carte Étudiant [📱 Rendu blanc avec : Étudiant : Antoine]'
      },
      commonMistakes: [
        {
          mistake: 'Mettre des paramètres dans la fonction @Preview (ex: @Preview fun MonPreview(nom: String)).',
          fix: 'Une fonction @Preview doit toujours avoir 0 paramètre () ou utiliser des ParameterProvider spécialisés.',
          explanation: 'Android Studio refuse d\'afficher un aperçu s\'il ne peut pas appeler la fonction de façon autonome.'
        }
      ],
      quiz: {
        question: 'À quoi sert le paramètre `showBackground = true` dans l\'annotation `@Preview` ?',
        options: [
          'À afficher une photo de paysage trouvée sur Internet',
          'À afficher un fond opaque (blanc en mode clair) pour que le texte sombre soit visible',
          'À démarrer l\'application en arrière-plan sur le téléphone',
          'À masquer les messages d\'erreur de compilation'
        ],
        correctIndex: 1,
        explanation: 'Tout à fait ! Par défaut, le fond d\'un aperçu est transparent ; sur un IDE en thème sombre, du texte noir sur fond transparent devient illisible sans showBackground = true.'
      },
      furtherReading: [
        {
          title: 'Documentation Android — Prévisualiser vos composables avec @Preview',
          url: 'https://developer.android.com/develop/ui/compose/tooling/previews',
          note: 'Découvre comment prévisualiser en mode sombre ou sur différentes tailles d\'écrans (tablettes, montres).'
        }
      ]
    }
  ]
};
