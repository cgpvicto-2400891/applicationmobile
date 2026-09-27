// MODULE 14 — Internationalisation, liens et Card
// i18n, localisation, liens hypertexte, composant Card.

export const MODULE_14 = {
  id: 'module-14',
  number: 14,
  title: 'Internationalisation, Liens et Card',
  subtitle: 'Adapter votre application au monde entier et enrichir votre interface',
  description: 'Une application professionnelle doit pouvoir s\'adapter à la langue de l\'utilisateur. Découvrez comment internationaliser votre application, créer des liens hypertextes cliquables et utiliser le composant Card pour des interfaces modernes.',
  prerequisites: 'Avoir complété le Module 3 (Composants UI) et le Module 2 (Composables).',
  lessons: [
    {
      id: 'i18n-intro',
      title: 'Internationalisation : Adapter votre app à toutes les langues',
      analogy: 'Internationaliser une application, c\'est comme cuisiner un plat avec des ingrédients interchangeables : tu prépares la recette (le code) une seule fois, et tu changes juste les épices (les textes) selon les goûts (la langue) du convive.',
      definition: 'L\'internationalisation (i18n) consiste à préparer le code pour que les textes puissent être traduits dans différentes langues. La localisation (l10n) est le fait d\'ajouter les traductions pour une langue/région spécifique (ex: fr_CA, en_US). La règle d\'or : ne JAMAIS écrire de texte visible en dur dans le code.',
      codeExample: {
        code: `// ❌ MAUVAISE PRATIQUE : texte en dur
Text(text = "Bonjour!")

// ✅ BONNE PRATIQUE : texte internationalisé
Text(text = stringResource(R.string.salutation_accueil))

// Fichier res/values/strings.xml (langue par défaut)
// <resources>
//     <string name="salutation_accueil">Welcome!</string>
// </resources>

// Fichier res/values-fr-rCA/strings.xml (français Canada)
// <resources>
//     <string name="salutation_accueil">Bienvenue!</string>
// </resources>`,
        lineByLine: [
          {
            line: 2,
            code: 'Text(text = "Bonjour!")',
            explanation: '❌ Écrire du texte directement dans le code rend l\'application impossible à traduire. C\'est un anti-patron à éviter absolument.'
          },
          {
            line: 5,
            code: 'Text(text = stringResource(R.string.salutation_accueil))',
            explanation: '✅ stringResource() va chercher le texte dans le fichier de ressources correspondant à la langue configurée sur le téléphone de l\'utilisateur.'
          },
          {
            line: 8,
            code: '// <string name="salutation_accueil">Welcome!</string>',
            explanation: 'Le fichier strings.xml par défaut contient les textes en anglais (ou dans la langue de base). C\'est la valeur utilisée si la langue du téléphone n\'est pas supportée.'
          },
          {
            line: 13,
            code: '// <string name="salutation_accueil">Bienvenue!</string>',
            explanation: 'Le fichier dans values-fr-rCA contient la traduction en français canadien. Android choisira automatiquement le bon fichier selon la langue du téléphone.'
          }
        ]
      },
      visualMockup: {
        type: 'i18n-flow',
        title: 'Le flux d\'internationalisation',
        steps: [
          'Extraire les chaînes (Alt+Entrée → Extract string resource)',
          'Ajouter les localisations (Open Translations Editor → Add Locale)',
          'Entrer les traductions dans l\'éditeur',
          'Android choisit automatiquement le bon fichier au runtime'
        ]
      },
      commonMistakes: [
        {
          mistake: 'Écrire des textes visibles directement dans le code Kotlin',
          correction: 'Utilisez toujours stringResource(R.string.ma_cle) dans les Composables. Les noms de ressources suivent la casse serpent (snake_case).'
        },
        {
          mistake: 'Utiliser stringResource() dans un ViewModel (non-composable)',
          correction: 'stringResource() ne fonctionne que dans un Composable. Dans un ViewModel qui hérite de AndroidViewModel, utilisez application.applicationContext.getString(R.string.ma_cle).'
        }
      ],
      quiz: [
        {
          question: 'Quelle est la différence entre internationalisation et localisation ?',
          options: [
            'C\'est la même chose',
            'L\'internationalisation prépare le code, la localisation ajoute les traductions',
            'L\'internationalisation est pour le web, la localisation pour le mobile',
            'La localisation est automatique, l\'internationalisation est manuelle'
          ],
          correctIndex: 1,
          explanation: 'L\'internationalisation (i18n) prépare le code pour être traduit (utilisation de stringResource). La localisation (l10n) est l\'ajout des traductions dans les fichiers de ressources pour une langue/région spécifique.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 59.1 : Internationalisation et localisation',
          url: '#'
        },
        {
          title: '« Localiser votre application » - Android Developers',
          url: 'https://developer.android.com/guide/topics/resources/localization'
        }
      ]
    },
    {
      id: 'hyperlinks',
      title: 'Liens hypertextes cliquables avec buildAnnotatedString',
      analogy: 'Un texte enrichi avec des liens, c\'est comme un livre où certains mots sont surlignés et mènent vers d\'autres chapitres. Le buildAnnotatedString est le surligneur, et LinkAnnotation.Url est le portail vers un site web.',
      definition: 'En Jetpack Compose, on peut créer des liens hypertextes cliquables dans du texte à l\'aide de buildAnnotatedString avec withLink et LinkAnnotation.Url. Quand l\'utilisateur clique sur le lien, le navigateur s\'ouvre automatiquement.',
      codeExample: {
        code: `// Lien hypertexte simple
Text(
    buildAnnotatedString {
        withLink(
            LinkAnnotation.Url("https://apical.xyz")
        ) {
            append("Visiter Apical")
        }
    }
)

// Lien avec style personnalisé
Text(
    buildAnnotatedString {
        append("Documentation : ")
        withLink(
            LinkAnnotation.Url(
                "https://developer.android.com/jetpack/compose",
                styles = TextLinkStyles(
                    style = SpanStyle(
                        fontSize = 18.sp,
                        color = Color.Blue,
                        textDecoration = TextDecoration.Underline
                    )
                )
            )
        ) {
            append("Android Developers")
        }
    }
)`,
        lineByLine: [
          {
            line: 2,
            code: 'buildAnnotatedString {',
            explanation: 'Crée un texte enrichi qui peut contenir des styles différents pour différentes portions du texte, y compris des liens cliquables.'
          },
          {
            line: 4,
            code: 'LinkAnnotation.Url("https://apical.xyz")',
            explanation: 'Définit un lien vers une URL. Quand l\'utilisateur clique sur le texte associé, le navigateur s\'ouvrira avec cette URL.'
          },
          {
            line: 6,
            code: 'append("Visiter Apical")',
            explanation: 'Le texte qui sera affiché comme lien cliquable. C\'est ce que l\'utilisateur verra et pourra cliquer.'
          },
          {
            line: 20,
            code: 'styles = TextLinkStyles(',
            explanation: 'Permet de personnaliser l\'apparence du lien : taille de police, couleur, soulignement, etc.'
          }
        ]
      },
      visualMockup: {
        type: 'hyperlink-demo',
        title: 'Aperçu des liens hypertextes',
        normalText: 'Documentation : ',
        linkText: 'Android Developers',
        linkStyle: 'bleu, souligné, 18sp'
      },
      commonMistakes: [
        {
          mistake: 'Utiliser l\'ancien ClickableText avec addStringAnnotation',
          correction: 'Le composable ClickableText est obsolète depuis Compose Foundation 1.7.0. Utilisez le nouveau système avec buildAnnotatedString + withLink + LinkAnnotation.Url.'
        },
        {
          mistake: 'Oublier de styliser le lien pour qu\'il soit reconnaissable',
          correction: 'Sans style spécifique, le lien peut ne pas être visuellement distinguable du texte normal. Ajoutez au minimum une couleur bleue et un soulignement avec TextLinkStyles.'
        }
      ],
      quiz: [
        {
          question: 'Quel composable est OBSOLÈTE pour créer des liens depuis Compose 1.7.0 ?',
          options: ['Text', 'ClickableText', 'LinkText', 'HyperlinkText'],
          correctIndex: 1,
          explanation: 'ClickableText avec addStringAnnotation est obsolète. La méthode moderne utilise Text avec buildAnnotatedString + withLink + LinkAnnotation.Url.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 60.1 : Lien hypertexte avec buildAnnotatedString',
          url: '#'
        }
      ]
    },
    {
      id: 'card-component',
      title: 'Le composant Card : Regrouper des éléments avec style',
      analogy: 'Un Card, c\'est comme une fiche cartonnée dans un classeur : elle encadre et regroupe des informations visuellement, avec des bords arrondis, une ombre et parfois même un fond coloré. C\'est la fiche de présentation de tes données.',
      definition: 'Le composant Card de Material 3 permet de regrouper des Composables dans un rectangle stylisé avec des coins arrondis et optionnellement une élévation (ombre). Il existe aussi ElevatedCard (avec ombre par défaut) et OutlinedCard (avec bordure). Un Card est essentiellement un Surface contenant un Column.',
      codeExample: {
        code: `// Card de base avec padding
Card {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Titre de la carte")
        Text("Description de la carte")
    }
}

// Card stylisé avec couleur, coins arrondis et bordure
Card(
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.background
    ),
    shape = RoundedCornerShape(25),
    border = BorderStroke(1.dp, Color.Black)
) {
    Column(modifier = Modifier.padding(24.dp)) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}

// Card cliquable avec icône
Card(
    onClick = { faireQuelqueChose() },
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer
    )
) {
    Row(
        modifier = Modifier.padding(20.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Info, contentDescription = "info")
        Spacer(Modifier.width(16.dp))
        Text("Cliquez ici pour plus de détails.")
    }
}

// ElevatedCard avec image et dégradé
ElevatedCard(
    elevation = CardDefaults.elevatedCardElevation(5.dp),
    modifier = Modifier.size(250.dp, 100.dp)
) {
    Box(modifier = Modifier.fillMaxSize()) {
        Image(
            painter = painterResource(R.drawable.versailles),
            contentDescription = "fond",
            contentScale = ContentScale.Crop
        )
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color.Transparent,
                            Color.Black.copy(alpha = 0.6f)
                        )
                    )
                )
        )
        Text(
            "Notre vision",
            color = Color.White,
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(12.dp)
        )
    }
}`,
        lineByLine: [
          {
            line: 2,
            code: 'Card {',
            explanation: 'Le Card de base crée un rectangle avec des coins arrondis. À l\'intérieur, on place généralement un Column ou Row pour organiser le contenu.'
          },
          {
            line: 14,
            code: 'containerColor = MaterialTheme.colorScheme.background',
            explanation: 'Utilise la couleur de fond du thème Material 3. Cela assure une cohérence visuelle avec le reste de l\'application.'
          },
          {
            line: 16,
            code: 'shape = RoundedCornerShape(25),',
            explanation: 'Personnalise la forme des coins. 25 = 25% d\'arrondi. On peut aussi utiliser CutCornerShape pour des coins coupés.'
          },
          {
            line: 26,
            code: 'onClick = { faireQuelqueChose() },',
            explanation: 'Le Card peut être rendu cliquable en ajoutant un paramètre onClick. Au clic, la fonction sera exécutée.'
          },
          {
            line: 55,
            code: 'Brush.verticalGradient(',
            explanation: 'Crée un dégradé vertical du transparent vers le noir semi-transparent. Cela permet de superposer du texte blanc lisible sur une image.'
          }
        ]
      },
      visualMockup: {
        type: 'card-variants',
        title: 'Les variantes de Card Material 3',
        variants: [
          { name: 'Card', description: 'Simple, sans ombre' },
          { name: 'ElevatedCard', description: 'Avec ombre par défaut' },
          { name: 'OutlinedCard', description: 'Avec bordure fine' }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Ne pas ajouter de padding à l\'intérieur du Card',
          correction: 'Un Card sans padding intérieur colle le texte aux bords. Ajoutez toujours un Column avec Modifier.padding(24.dp) à l\'intérieur.'
        },
        {
          mistake: 'Essayer d\'ajouter une bordure à un ElevatedCard',
          correction: 'ElevatedCard ne supporte pas le paramètre border. Si vous avez besoin d\'une bordure, utilisez un Card classique à la place.'
        }
      ],
      quiz: [
        {
          question: 'Quel est l\'avantage principal d\'ElevatedCard par rapport à Card ?',
          options: [
            'Il est plus rapide',
            'Il a une bordure par défaut',
            'Il a une élévation (ombre) par défaut',
            'Il supporte les images'
          ],
          correctIndex: 2,
          explanation: 'ElevatedCard a une élévation (ombre portée) par défaut, ce qui donne un effet de profondeur sans configuration supplémentaire.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 60.2 : Card()',
          url: '#'
        },
        {
          title: '« Card » - Android Developers',
          url: 'https://developer.android.com/reference/kotlin/androidx/compose/material3/package-summary#Card'
        }
      ]
    }
  ]
};
