// MODULE 4 — Le style et les Modifiers UNIQUEMENT
// Règle d'or : On applique le style aux composants "nus" vus au Module 3. Aucune logique d'état complexe ici.

export const MODULE_4 = {
  id: 'module-4',
  number: 4,
  title: 'Le style et les Modifiers UNIQUEMENT',
  subtitle: 'Transformer et habiller les composants avec la puissance des Modifiers',
  description: 'Maintenant que vous connaissez les composants nus du Module 3, découvrez comment les positionner, les dimensionner, les colorer et styliser l\'écran avec les Modifiers.',
  prerequisites: 'Avoir complété le Module 3 (connaître les composants de base Text, Column, Row, Box, Button).',
  lessons: [
    {
      id: 'modifier-intro',
      title: 'Qu\'est-ce qu\'un Modifier et pourquoi l\'ordre compte ?',
      analogy: 'Un Modifier, c\'est comme les couches de vêtements que tu enfiles le matin : si tu mets tes sous-vêtements par-dessus ton pantalon (comme Superman), le résultat visuel est radicalement différent que si tu les mets dans le bon ordre !',
      definition: 'Un "Modifier" (modificateur en français) est un objet chaîné que l\'on transmet à un composable pour altérer sa taille, ses marges, sa couleur de fond ou son comportement au clic. Règle fondamentale : Compose applique les modificateurs séquentiellement dans l\'ordre exact où ils sont écrits.',
      codeExample: {
        code: `@Composable
fun ExempleOrdreModifiers() {
    // CAS A : Fond jaune PUIS marge de 16.dp
    Text(
        text = "Marge à l'extérieur du jaune",
        modifier = Modifier
            .background(Color.Yellow)
            .padding(16.dp)
    )

    // CAS B : Marge de 16.dp PUIS fond jaune
    Text(
        text = "Fond jaune uniquement au centre",
        modifier = Modifier
            .padding(16.dp)
            .background(Color.Yellow)
    )
}`,
        lineByLine: [
          {
            line: 5,
            code: 'modifier = Modifier',
            explanation: '"Modifier" avec une majuscule est l\'objet de départ vide fourni par Compose à partir duquel on enchaîne les méthodes avec un point ".".'
          },
          {
            line: 6,
            code: '.background(Color.Yellow)',
            explanation: 'Dans le CAS A, on peint d\'abord le fond en jaune.'
          },
          {
            line: 7,
            code: '.padding(16.dp)',
            explanation: 'Ensuite, on applique un espacement intérieur de 16 dp. Le jaune s\'étend sur toute la zone !'
          },
          {
            line: 13,
            code: '.padding(16.dp).background(Color.Yellow)',
            explanation: 'Dans le CAS B, on crée une marge invisible d\'abord, puis on ne peint en jaune que le petit rectangle de texte restant.'
          }
        ]
      },
      visualMockup: {
        type: 'modifier-order-comparison',
        title: 'L\'ordre d\'application des modificateurs en action',
        caseA: '🟡 Fond coloré large (padding intérieur)',
        caseB: '⚪ Marge blanche extérieure puis petit carré jaune'
      },
      commonMistakes: [
        {
          mistake: 'Croire qu\'en inversant `.padding()` et `.background()`, le résultat visuel reste identique comme en CSS.',
          fix: 'Rappelle-toi : en Compose, chaque appel de fonction enveloppe l\'élément précédent. L\'ordre d\'écriture est strictement l\'ordre d\'application.',
          explanation: 'Compose n\'a pas de distinction entre "margin" et "padding" : tout est fait avec `padding()` selon l\'ordre dans lequel il est placé !'
        }
      ],
      quiz: {
        question: 'Comment Compose réalise-t-il l\'équivalent d\'une marge extérieure ("margin") ?',
        options: [
          'Avec le modificateur Modifier.margin()',
          'En plaçant Modifier.padding() AVANT le Modifier.background()',
          'En utilisant un fichier XML séparé',
          'Ce n\'est pas possible en Compose'
        ],
        correctIndex: 1,
        explanation: 'Génial ! Placer un padding avant le fond crée un espace vide autour, ce qui agit exactement comme une marge extérieure.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 6 : Les Modifieurs',
          url: '#',
          note: 'Consulte les explications détaillées sur le chaînage d\'instructions.'
        }
      ]
    },
    {
      id: 'modifier-padding',
      title: 'padding() : Espacements et marges',
      analogy: 'Le padding, c\'est comme la distance de sécurité que tu laisses entre ta serviette de plage et celle de ton voisin pour ne pas être trop collé.',
      definition: 'Le modificateur "padding()" ajoute un espace vide autour du contenu d\'un composant. On mesure toujours ces espacements en "dp" (Density-independent Pixels), une unité spéciale qui s\'adapte automatiquement à la densité de l\'écran pour garder la même taille physique sur tous les téléphones.',
      codeExample: {
        code: `@Composable
fun ExempleVariationsPadding() {
    Column {
        // 1. Padding uniforme sur les 4 côtés :
        Text("Tous côtés à 16 dp", modifier = Modifier.padding(16.dp))

        // 2. Padding horizontal et vertical séparés :
        Text("Large horizontal", modifier = Modifier.padding(horizontal = 24.dp, vertical = 8.dp))

        // 3. Padding personnalisé sur chaque côté individuel :
        Text("Chaque côté", modifier = Modifier.padding(start = 12.dp, top = 4.dp, end = 20.dp, bottom = 8.dp))
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: 'modifier = Modifier.padding(16.dp)',
            explanation: '"16.dp" applique 16 pixels indépendants de la densité en haut, en bas, à gauche et à droite.'
          },
          {
            line: 8,
            code: 'padding(horizontal = 24.dp, vertical = 8.dp)',
            explanation: '"horizontal" règle simultanément la gauche et la droite ; "vertical" règle le haut et le bas.'
          },
          {
            line: 11,
            code: 'padding(start = 12.dp, top = 4.dp, end = 20.dp, bottom = 8.dp)',
            explanation: '"start" et "end" remplacent gauche/droite pour s\'adapter automatiquement aux langues s\'écrivant de droite à gauche (comme l\'arabe ou l\'hébreu).'
          }
        ]
      },
      visualMockup: {
        type: 'padding-diagram',
        title: 'Les 4 bords configurables avec start / top / end / bottom',
        top: '⬆️ top: 4.dp',
        start: '⬅️ start: 12.dp',
        center: '[ Contenu texte ]',
        end: '➡️ end: 20.dp',
        bottom: '⬇️ bottom: 8.dp'
      },
      commonMistakes: [
        {
          mistake: 'Écrire "padding(16)" au lieu de "padding(16.dp)".',
          fix: 'Ajoute toujours ".dp" derrière le chiffre et importe "androidx.compose.ui.unit.dp".',
          explanation: 'En Android, les pixels bruts (px) sont interdits pour les tailles d\'interface : on utilise des "dp" pour garantir une taille physique identique sur un petit téléphone et sur une tablette.'
        }
      ],
      quiz: {
        question: 'Pourquoi utilise-t-on les mots `start` et `end` plutôt que `left` et `right` dans `padding()` ?',
        options: [
          'Pour faire plus joli dans le code',
          'Pour supporter automatiquement les langues s\'écrivant de droite à gauche (RTL)',
          'Parce que le mot "left" n\'existe pas en anglais',
          'Pour empêcher le téléphone de pivoter'
        ],
        correctIndex: 1,
        explanation: 'Tout à fait ! "start" correspond au côté naturel où commence la lecture du texte selon la langue de l\'utilisateur.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 6.1 : padding()',
          url: '#',
          note: 'Découvre comment aérer une fiche de produit.'
        }
      ]
    },
    {
      id: 'modifier-size',
      title: 'size(), fillMaxWidth() et fillMaxSize() : Dimensions',
      analogy: 'size(), c\'est comme acheter un jean sur mesure à ta taille exacte (ex: 200 dp de large). fillMaxWidth(), c\'est comme un pantalon avec un élastique qui s\'étire pour occuper tout l\'espace disponible d\'un bord à l\'autre de l\'écran.',
      definition: 'Pour dimensionner un composant, Compose propose soit des tailles fixes en dp ("size()", "width()", "height()"), soit des modificateurs dynamiques et réactifs ("fillMaxWidth()" pour prendre 100% de la largeur, "fillMaxSize()" pour occuper tout l\'écran).',
      codeExample: {
        code: `@Composable
fun ExempleDimensions() {
    Column {
        // Bouton occupant TOUTE la largeur de l'écran du téléphone :
        Button(
            onClick = {},
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Plein écran en largeur")
        }

        // Boîte avec dimensions carrées fixes :
        Box(
            modifier = Modifier.size(width = 100.dp, height = 100.dp)
        )
    }
}`,
        lineByLine: [
          {
            line: 6,
            code: 'modifier = Modifier.fillMaxWidth()',
            explanation: '"fillMaxWidth()" (remplir la largeur max en anglais) étire le bouton d\'un bord à l\'autre de l\'écran.'
          },
          {
            line: 12,
            code: 'modifier = Modifier.size(width = 100.dp, height = 100.dp)',
            explanation: '"size()" impose une largeur et une hauteur spécifiques en pixels indépendants de la densité (dp).'
          }
        ]
      },
      visualMockup: {
        type: 'dimension-comparison',
        title: 'Taille fixe vs Pleine largeur',
        buttonWide: '[ ==== Bouton fillMaxWidth (100% de l\'écran) ==== ]',
        boxFixed: '[ Carré 100dp x 100dp ]'
      },
      commonMistakes: [
        {
          mistake: 'Fixer la largeur d\'un bouton en dur à 400.dp sans tester sur un petit écran de téléphone.',
          fix: 'Privilégie "fillMaxWidth()" combiné avec un padding horizontal plutôt que des valeurs fixes en largeur qui déborderont sur les téléphones étroits.',
          explanation: 'Les dimensions fixes en dur créent des bugs d\'affichage sur la mosaïque des milliers de modèles d\'écrans Android.'
        }
      ],
      quiz: {
        question: 'Quel modificateur permet à un composant de s\'étendre sur toute la hauteur et toute la largeur de l\'écran ?',
        options: ['Modifier.allScreen()', 'Modifier.fillMaxSize()', 'Modifier.size(100%)', 'Modifier.expand()'],
        correctIndex: 1,
        explanation: 'Bravo ! fillMaxSize() occupe la totalité de l\'espace horizontal et vertical disponible.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 6.2 : size()',
          url: '#',
          note: 'Découvre les paramètres de fraction de fillMaxWidth(fraction = 0.5f).'
        }
      ]
    },
    {
      id: 'modifier-background',
      title: 'background() : Couleurs de fond',
      analogy: 'background(), c\'est comme donner un coup de rouleau de peinture fraîche sur un mur avant d\'y accrocher un tableau.',
      definition: 'Le modificateur "background()" colore le fond de la zone occupée par le composable. On peut lui donner une couleur unie ("Color.Red", "Color(0xFF6200EE)") ou même lui associer une forme géométrique ("CircleShape", "RoundedCornerShape").',
      codeExample: {
        code: `@Composable
fun ExempleCouleurFond() {
    Text(
        text = "Texte avec fond bleu clair",
        modifier = Modifier
            .background(color = Color(0xFFE0F2FE))
            .padding(12.dp)
    )
}`,
        lineByLine: [
          {
            line: 5,
            code: '.background(color = Color(0xFFE0F2FE))',
            explanation: '"background" peint la zone. "0xFF..." est le code hexadécimal de couleur ARGB (0xFF = opacité 100%, E0F2FE = teinte bleu ciel).'
          },
          {
            line: 6,
            code: '.padding(12.dp)',
            explanation: 'Ajoute 12 dp de marge intérieure pour que le texte ne colle pas aux bords de la couleur.'
          }
        ]
      },
      visualMockup: {
        type: 'background-preview',
        title: 'Zone peinte avec Modifier.background',
        box: '🟦 [ Texte avec fond bleu clair ] (Padding 12dp)'
      },
      commonMistakes: [
        {
          mistake: 'Écrire un code hexadécimal sous forme de texte "#E0F2FE" comme en CSS.',
          fix: 'En Kotlin Compose, les couleurs s\'écrivent en binaire avec le préfixe "0xFF" : `Color(0xFFE0F2FE)`.',
          explanation: '"Color(0xFF...)" garantit un calcul natif à la compilation sans conversion lente de texte.'
        }
      ],
      quiz: {
        question: 'En Compose, que signifient les deux premiers caractères `0xFF` dans `Color(0xFF3B82F6)` ?',
        options: [
          'Le niveau de flou',
          'Le canal Alpha (opacité à 100%)',
          'La luminosité du rétroéclairage',
          'Le contraste du texte'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! FF en hexadécimal correspond à 255 sur 255, soit une opacité totale sans transparence.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 5.8 et 6.4 : background()',
          url: '#',
          note: 'Découvre comment appliquer un dégradé avec Brush.linearGradient().'
        }
      ]
    },
    {
      id: 'modifier-weight',
      title: 'weight() : Distribution proportionnelle de l\'espace',
      analogy: 'weight(), c\'est comme couper un gâteau d\'anniversaire en parts : si une part a un poids de 1 et l\'autre un poids de 2, la deuxième sera deux fois plus grosse que la première.',
      definition: 'Le modificateur "weight()" (poids en anglais) ne peut être utilisé qu\'à l\'intérieur d\'une Row ou d\'une Column. Il distribue l\'espace libre restant proportionnellement aux poids attribués à chaque élément.',
      codeExample: {
        code: `@Composable
fun ExemplePoidsProportionnel() {
    Row(modifier = Modifier.fillMaxWidth()) {
        // Occupe 1/3 de l'espace disponible :
        Box(
            modifier = Modifier
                .weight(1f)
                .background(Color.Red)
        ) {
            Text("Poids 1")
        }

        // Occupe 2/3 de l'espace disponible (2 fois plus large) :
        Box(
            modifier = Modifier
                .weight(2f)
                .background(Color.Green)
        ) {
            Text("Poids 2")
        }
    }
}`,
        lineByLine: [
          {
            line: 6,
            code: '.weight(1f)',
            explanation: '"weight(1f)" réserve 1 part de l\'espace libre (le \'f\' indique un nombre flottant en Kotlin).'
          },
          {
            line: 14,
            code: '.weight(2f)',
            explanation: '"weight(2f)" réserve 2 parts de l\'espace libre. La boîte verte sera donc deux fois plus large que la rouge !'
          }
        ]
      },
      visualMockup: {
        type: 'weight-diagram',
        title: 'Répartition de la largeur d\'écran (1f vs 2f)',
        left: '[ 🟥 Poids 1 (33.3%) ]',
        right: '[ 🟩🟩 Poids 2 (66.6%) ]'
      },
      commonMistakes: [
        {
          mistake: 'Tenter d\'appeler `.weight()` sur un composant situé à l\'extérieur d\'une Row ou d\'une Column.',
          fix: '`.weight()` n\'existe que dans le "RowScope" ou le "ColumnScope". En dehors, le compilateur refuse la ligne.',
          explanation: 'La notion de répartition proportionnelle n\'a de sens qu\'au sein d\'une rangée ou colonne.'
        }
      ],
      quiz: {
        question: 'Si vous avez 2 boutons avec chacun `Modifier.weight(1f)` dans une Row de pleine largeur, comment l\'espace est-il réparti ?',
        options: [
          'Le premier bouton prend tout l\'espace',
          'Chacun prend exactement 50% de la largeur',
          'Le deuxième bouton est écrasé',
          'Une erreur d\'exécution se produit'
        ],
        correctIndex: 1,
        explanation: 'Parfait ! 1 part + 1 part = 2 parts égales, donc 50% de la largeur pour chacun.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 6.5 : .weight()',
          url: '#',
          note: 'Essentiel pour aligner proprement des colonnes de données.'
        }
      ]
    },
    {
      id: 'modifier-clickable',
      title: 'clickable() : Rendre n\'importe quoi interactif',
      analogy: 'clickable(), c\'est comme poser une puce tactile invisible sur n\'importe quel objet : ton texte, ta photo ou ta carte deviennent instantanément sensibles au toucher comme un bouton.',
      definition: 'Le modificateur "clickable()" permet de capter les clics de l\'utilisateur sur n\'importe quel composable (un Text, une Image, une Card ou une Box) sans avoir besoin d\'un Button. Il fournit en plus l\'effet d\'ondulation Material (Ripple) au doigt.',
      codeExample: {
        code: `@Composable
fun ExempleZoneCliquable() {
    Text(
        text = "Clique sur moi !",
        modifier = Modifier
            .clickable {
                println("Le texte a été cliqué !")
            }
            .padding(16.dp)
    )
}`,
        lineByLine: [
          {
            line: 6,
            code: '.clickable {',
            explanation: '"clickable" intercepte le tap de l\'utilisateur et déclenche la lambda fournie.'
          },
          {
            line: 7,
            code: 'println("Le texte a été cliqué !")',
            explanation: 'Action exécutée lors du tap.'
          },
          {
            line: 9,
            code: '.padding(16.dp)',
            explanation: 'Note bien : placer le padding après clickable agrandit la surface tactile pour que le doigt touche facilement.'
          }
        ]
      },
      visualMockup: {
        type: 'clickable-preview',
        title: 'Surface tactile avec effet d\'ondulation',
        element: '👆 [ Clique sur moi ! ]',
        feedback: 'Vague lumineuse semi-transparente au toucher du doigt'
      },
      commonMistakes: [
        {
          mistake: 'Placer `.clickable` sur une zone trop petite (ex: 10 dp).',
          fix: 'Les directives d\'ergonomie de Google recommandent une zone tactile d\'au moins 48 dp x 48 dp pour que l\'utilisateur ne rate pas la cible avec son pouce.',
          explanation: 'Sur un écran tactile, des cibles minuscules créent une grande frustration chez l\'utilisateur.'
        }
      ],
      quiz: {
        question: 'Quel est l\'effet visuel produit automatiquement par `clickable()` au moment où l\'utilisateur touche l\'écran ?',
        options: [
          'L\'écran s\'éteint',
          'Une onde de ripple (ondulation lumineuse Material Design)',
          'Une vibration longue de 30 secondes',
          'Une fenêtre d\'erreur s\'affiche'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! Le "ripple effect" est le retour visuel standard indiquant la prise en compte du toucher.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 6.6 : .clickable()',
          url: '#',
          note: 'Découvre comment combiner clickable avec des cartes d\'articles.'
        }
      ]
    },
    {
      id: 'modifier-alignment',
      title: 'Alignement et arrangements dans Column et Row',
      analogy: 'L\'alignement, c\'est comme ordonner une rangée d\'élèves en classe : l\'arrangement décide comment ils s\'espacent le long de la ligne (serrés à gauche, espacés également), tandis que l\'alignement décide de leur posture (centrés verticalement par rapport à la ligne).',
      definition: 'Dans Compose, on contrôle la position des enfants avec deux concepts précis : l\'Arrangement (le long de l\'axe principal) et l\'Alignment (le long de l\'axe perpendiculaire). Par exemple, dans une Column, l\'axe principal est vertical et l\'axe perpendiculaire est horizontal.',
      codeExample: {
        code: `@Composable
fun ExempleAlignements() {
    Column(
        modifier = Modifier.fillMaxSize(),
        // Sur l'axe principal (vertical) : centré au milieu
        verticalArrangement = Arrangement.Center,
        // Sur l'axe perpendiculaire (horizontal) : centré
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Totalement centré dans l'écran !")
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: 'verticalArrangement = Arrangement.Center,',
            explanation: '"verticalArrangement" positionne les éléments au milieu de la hauteur disponible.'
          },
          {
            line: 7,
            code: 'horizontalAlignment = Alignment.CenterHorizontally',
            explanation: '"horizontalAlignment" centre chaque élément entre le bord gauche et le bord droit.'
          }
        ]
      },
      visualMockup: {
        type: 'alignment-preview',
        title: 'Centrage parfait dans l\'écran',
        position: '🎯 [ Totalement centré dans l\'écran ! ]',
        axes: 'Vertical : Center | Horizontal : CenterHorizontally'
      },
      commonMistakes: [
        {
          mistake: 'Confondre `Arrangement` (axe principal) et `Alignment` (axe secondaire).',
          fix: 'Retiens ce mémo : dans Column, vertical = Arrangement et horizontal = Alignment. Dans Row, c\'est l\'inverse : horizontal = Arrangement et vertical = Alignment !',
          explanation: 'L\'Arrangement distribue plusieurs éléments le long de la marche. L\'Alignment cale l\'élément sur la largeur.'
        }
      ],
      quiz: {
        question: 'Quel paramètre d\'une Row permet d\'espacer au maximum deux éléments pour en mettre un tout à gauche et un tout à droite ?',
        options: [
          'horizontalArrangement = Arrangement.SpaceBetween',
          'verticalAlignment = Alignment.Top',
          'modifier = Modifier.separate()',
          'padding = 100.dp'
        ],
        correctIndex: 0,
        explanation: 'Bravo ! Arrangement.SpaceBetween pousse les éléments aux extrémités opposées.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 6.4 et Alignements',
          url: '#',
          note: 'Essaye les arrangements SpaceEvenly, SpaceAround et SpaceBetween.'
        }
      ]
    },
    {
      id: 'modifier-themes-colors',
      title: 'Couleurs et thèmes : Material Design 2 vs Material Design 3',
      analogy: 'Un thème, c\'est comme la charte graphique officielle d\'une entreprise : au lieu de choisir un rose ou un bleu au hasard sur chaque bouton, tu définis une palette harmonieuse une seule fois et toute l\'application s\'y conforme automatiquement.',
      definition: 'Jetpack Compose moderne utilise Material Design 3 (M3). La différence majeure avec l\'ancien Material 2 (M2) réside dans le nom du conteneur de couleurs : on utilise désormais "MaterialTheme.colorScheme" au lieu de "MaterialTheme.colors", avec des teintes dynamiques et une accessibilité de contraste renforcée.',
      codeExample: {
        code: `@Composable
fun ExempleThemeCouleurs() {
    // Accéder aux couleurs du thème officiel Material 3 :
    val couleurPrimaire = MaterialTheme.colorScheme.primary
    val couleurFond = MaterialTheme.colorScheme.background

    Text(
        text = "Texte aux couleurs du thème M3",
        color = MaterialTheme.colorScheme.onPrimary,
        modifier = Modifier.background(couleurPrimaire)
    )
}`,
        lineByLine: [
          {
            line: 4,
            code: 'val couleurPrimaire = MaterialTheme.colorScheme.primary',
            explanation: '"MaterialTheme.colorScheme" est le magasin officiel des couleurs M3. "primary" est la couleur vedette de votre marque.'
          },
          {
            line: 9,
            code: 'color = MaterialTheme.colorScheme.onPrimary',
            explanation: 'Les couleurs préfixées par "on" (ex: onPrimary) garantissent un contraste parfait pour écrire PAR-DESSUS la couleur de fond (ex: texte blanc sur bouton bleu).'
          }
        ]
      },
      visualMockup: {
        type: 'theme-palette',
        title: 'Les rôles de couleur Material Design 3',
        primary: '🟣 Primary (Boutons d\'action principale)',
        onPrimary: '⚪ onPrimary (Texte contrasté sur Primary)',
        surface: '📄 Surface (Cartes et conteneurs)',
        error: '🔴 Error (Messages de validation rouges)'
      },
      commonMistakes: [
        {
          mistake: 'Mélanger des imports Material 2 (`androidx.compose.material.*`) et Material 3 (`androidx.compose.material3.*`).',
          fix: 'Vérifiez toujours vos imports en haut du fichier : ils doivent TOUS pointer vers `androidx.compose.material3.*`.',
          explanation: 'Mélanger les deux versions provoque des erreurs de type "colorScheme vs colors" déroutantes.'
        }
      ],
      quiz: {
        question: 'En Material Design 3, quelle propriété remplace l\'ancien `MaterialTheme.colors` ?',
        options: ['MaterialTheme.colorScheme', 'MaterialTheme.palette', 'MaterialTheme.styles', 'MaterialTheme.paint'],
        correctIndex: 0,
        explanation: 'Exact ! C\'est désormais "colorScheme" qui orchestre toutes les tonalités dans Material 3.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 5.8 : Les couleurs et le thème',
          url: '#',
          note: 'Découvre comment fonctionne le fichier ui/theme/Color.kt.'
        }
      ]
    },
    {
      id: 'modifier-shapes',
      title: 'Les formes : Découpage et arrondis',
      analogy: 'Les formes avec `clip()`, c\'est comme utiliser un emporte-pièce de cuisine : tu prends une pâte carrée et tu découpes un cercle parfait pour faire un biscuit rond.',
      definition: 'Le modificateur "clip()" découpe le composable selon une forme géométrique définie par l\'objet "Shape". Les formes les plus fréquentes sont "CircleShape" (pour faire une photo de profil parfaitement ronde) et "RoundedCornerShape" (pour adoucir les angles).',
      codeExample: {
        code: `@Composable
fun ExempleFormesArrondies() {
    Column {
        // Image ou boîte 100% ronde (avatar) :
        Box(
            modifier = Modifier
                .size(64.dp)
                .clip(CircleShape)
                .background(Color.Magenta)
        )

        // Rectangle aux coins adoucis de 16 dp :
        Box(
            modifier = Modifier
                .size(width = 120.dp, height = 40.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(Color.Cyan)
        )
    }
}`,
        lineByLine: [
          {
            line: 7,
            code: '.clip(CircleShape)',
            explanation: '"clip(CircleShape)" découpe la zone en cercle parfait.'
          },
          {
            line: 8,
            code: '.background(Color.Magenta)',
            explanation: 'Comme background vient après clip, la couleur magenta est contenue à l\'intérieur du cercle.'
          },
          {
            line: 15,
            code: '.clip(RoundedCornerShape(16.dp))',
            explanation: '"RoundedCornerShape(16.dp)" arrondit les 4 coins avec un rayon de courbure de 16 dp.'
          }
        ]
      },
      visualMockup: {
        type: 'shapes-preview',
        title: 'Exemples de formes géométriques',
        circle: '🟣 [ Cercle parfait (CircleShape) ]',
        rounded: '🩵 [ Rectangle aux coins arrondis 16dp ]'
      },
      commonMistakes: [
        {
          mistake: 'Mettre `.clip()` APRÈS `.background()`.',
          fix: 'Place toujours `.clip()` AVANT `.background()` si tu souhaites que la couleur de fond soit découpée !',
          explanation: 'Si tu peins le carré d\'abord puis que tu appliques clip sans fond additionnel, la découpe n\'aura aucun effet sur la peinture déjà appliquée.'
        }
      ],
      quiz: {
        question: 'Quelle forme utilise-t-on couramment pour transformer une photo d\'utilisateur carrée en avatar rond ?',
        options: ['SquareShape', 'CircleShape', 'OvalShape', 'TriangleShape'],
        correctIndex: 1,
        explanation: 'Très bien ! CircleShape découpe le composable en un disque parfait.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 5.11 : Les formes',
          url: '#',
          note: 'Découvre comment arrondir uniquement deux coins spécifiques.'
        }
      ]
    },
    {
      id: 'modifier-screen-background',
      title: 'Fond d\'écran de l\'application',
      analogy: 'Le fond d\'écran, c\'est la tapisserie posée sur le mur du fond de la pièce : tout le mobilier (boutons, listes, formulaires) vient se poser devant elle.',
      definition: 'Pour donner un arrière-plan à tout un écran, on combine "Modifier.fillMaxSize()" avec "background()" ou avec une "Box" recouvrant l\'écran pour insérer une image de fond grand format.',
      codeExample: {
        code: `@Composable
fun EcranAvecFondColore() {
    // Conteneur racine occupant 100% de la surface du téléphone :
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC)) // Gris très doux
    ) {
        Text("Mon contenu sur fond personnalisé")
    }
}`,
        lineByLine: [
          {
            line: 4,
            code: 'modifier = Modifier.fillMaxSize()',
            explanation: 'Garantit que la boîte s\'étire sur l\'intégralité des dimensions de l\'écran.'
          },
          {
            line: 5,
            code: '.background(Color(0xFFF8FAFC))',
            explanation: 'Peint l\'ensemble de l\'écran avec une teinte claire relaxante.'
          }
        ]
      },
      visualMockup: {
        type: 'fullscreen-background',
        title: 'Écran complet avec fond personnalisé',
        color: 'Fond gris ardoise 100% écran (#F8FAFC)',
        content: 'Texte posé par-dessus le fond'
      },
      commonMistakes: [
        {
          mistake: 'Oublier "fillMaxSize()" et constater que la couleur de fond s\'arrête juste derrière le petit texte.',
          fix: 'Sans "fillMaxSize()", un composable n\'occupe que la taille minimale requise par son contenu intérieur.',
          explanation: 'La Box doit explicitement demander à remplir tout l\'espace disponible.'
        }
      ],
      quiz: {
        question: 'Pourquoi est-il nécessaire d\'ajouter `Modifier.fillMaxSize()` sur le conteneur de fond ?',
        options: [
          'Pour que la couleur couvre tout l\'écran au lieu de s\'arrêter au ras du texte',
          'Pour accélérer la connexion Wi-Fi',
          'Pour masquer la caméra frontale',
          'Pour autoriser le téléchargement d\'images'
        ],
        correctIndex: 0,
        explanation: 'Exact ! Sans fillMaxSize(), la zone de fond ne mesurerait que la taille exacte du texte intérieur.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 37.1 : Changer le fond d\'écran',
          url: '#',
          note: 'Consulte comment utiliser painterResource dans une Box pour créer un fond d\'écran imagé.'
        }
      ]
    },
    {
      id: 'modifier-system-bars',
      title: 'Couleurs des barres d\'application et Edge-to-Edge',
      analogy: 'L\'Edge-to-edge, c\'est comme les téléviseurs modernes sans bordure : l\'image va jusqu\'aux rebords de l\'appareil, y compris sous l\'horloge et l\'indicateur de batterie en haut.',
      definition: 'Avec les versions récentes d\'Android (depuis Android 15 et avec "enableEdgeToEdge()"), l\'application dessine par défaut derrière la barre d\'état (en haut) et la barre de navigation (en bas). Il est crucial d\'adapter les couleurs pour préserver la lisibilité de l\'horloge et de la batterie.',
      codeExample: {
        code: `// Dans MainActivity.kt :
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // Active l'extension moderne bord-à-bord :
    enableEdgeToEdge()
    
    setContent {
        MonApplicationTheme {
            // Le Scaffold du Module 5 gérera les marges de sécurité !
        }
    }
}`,
        lineByLine: [
          {
            line: 6,
            code: 'enableEdgeToEdge()',
            explanation: '"enableEdgeToEdge()" indique à Android de rendre la barre d\'état et la barre de navigation transparentes pour une immersion visuelle totale.'
          },
          {
            line: 9,
            code: 'MonApplicationTheme { ... }',
            explanation: 'Le thème applique les teintes coordonnées aux barres système selon le mode clair ou sombre.'
          }
        ]
      },
      visualMockup: {
        type: 'edge-to-edge-preview',
        title: 'Affichage Edge-to-Edge moderne',
        topBar: '🔋 12:45 | 100% (Icônes sombres sur fond translucide)',
        content: 'Contenu s\'étendant de façon élégante',
        navBar: '— Barre de navigation inférieure transparente'
      },
      commonMistakes: [
        {
          mistake: 'Tenter de teinter manuellement la barre d\'état avec des fonctions obsolètes comme `window.statusBarColor`.',
          fix: 'Depuis Android 14/15, on utilise "enableEdgeToEdge()" combiné avec "Scaffold" et "innerPadding" (Module 5).',
          explanation: 'Google a rendu l\'Edge-to-edge obligatoire pour offrir une expérience fluide uniforme sur tous les appareils.'
        }
      ],
      quiz: {
        question: 'Quel est l\'objectif de `enableEdgeToEdge()` dans MainActivity ?',
        options: [
          'Afficher une bordure noire épaisse autour de l\'écran',
          'Étendre l\'affichage de l\'application d\'un bord à l\'autre de l\'appareil sous les barres système',
          'Fermer l\'application dès qu\'on touche le bord',
          'Désactiver la caméra du téléphone'
        ],
        correctIndex: 1,
        explanation: 'Bravo ! Edge-to-edge élimine les vieilles barres opaques pour une immersion d\'un bord à l\'autre.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 27.1 et edge-to-edge',
          url: '#',
          note: 'Nous verrons dans le Module 5 comment innerPadding empêche le texte d\'être caché sous l\'encoche de la caméra.'
        }
      ]
    },
    {
      id: 'modifier-scroll',
      title: 'Rendre un écran défilant : verticalScroll et horizontalScroll',
      analogy: 'Un écran sans scroll, c\'est comme une affiche collée au mur : si le texte est trop long, il déborde sur le plancher et on ne le voit plus. Le modifier verticalScroll, c\'est comme imprimer ce texte sur un parchemin que l\'on peut dérouler à l\'infini.',
      definition: 'Dans Compose, une Column (ou une Row) ne défile pas par défaut. Si son contenu dépasse l\'écran, il est tout simplement coupé. Pour permettre le défilement (Scroll View), on ajoute le modifier .verticalScroll(rememberScrollState()) pour une Column, ou .horizontalScroll(rememberScrollState()) pour une Row.',
      codeExample: {
        code: `@Composable
fun EcranDefilant() {
    // État mémorisé de la position du défilement
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            // 🌟 C'est ce Modifier qui active le défilement vertical !
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        Text("Début de l'écran", fontSize = 24.sp)
        
        // Un très long texte qui dépasserait de l'écran sans le scroll
        Text(
            text = "Un très long paragraphe... ".repeat(50),
            modifier = Modifier.padding(vertical = 20.dp)
        )
        
        Text("Fin de l'écran", fontSize = 24.sp)
    }
}`,
        lineByLine: [
          {
            line: 4,
            code: 'val scrollState = rememberScrollState()',
            explanation: 'Crée et mémorise l\'état du défilement (quelle position est actuellement visible). C\'est requis par les modifiers de scroll.'
          },
          {
            line: 10,
            code: '.verticalScroll(scrollState)',
            explanation: 'Transforme la simple Column statique en une "Scroll View" verticale. Sans cette ligne, la fin du texte serait invisible et inaccessible.'
          }
        ]
      },
      visualMockup: {
        type: 'scroll-preview',
        title: 'Défilement activé',
        content: 'Début de l\'écran\\nUn très long paragraphe...\\nUn très long paragraphe...\\n(L\'utilisateur peut glisser le doigt pour voir la suite)'
      },
      commonMistakes: [
        {
          mistake: 'Utiliser verticalScroll() pour une liste de 1000 éléments tirés d\'une base de données.',
          fix: 'Pour de longues listes dynamiques, n\'utilisez JAMAIS verticalScroll(). Utilisez plutôt LazyColumn (voir Module 3), qui est optimisé pour ne pas saturer la mémoire.',
          explanation: 'verticalScroll "dessine" tout le contenu d\'un coup, même ce qui est caché. Pour 50 paragraphes statiques c\'est parfait, pour 1000 c\'est un crash assuré.'
        }
      ],
      quiz: {
        question: 'Comment rendre une Column défilante pour afficher un long texte d\'explications ?',
        options: [
          'En remplaçant Column par ScrollColumn',
          'En ajoutant l\'attribut scroll=true dans la Column',
          'En ajoutant le modifier .verticalScroll(rememberScrollState())',
          'En mettant le texte en plus petit'
        ],
        correctIndex: 2,
        explanation: 'En Compose, le défilement est simplement un Modifier qu\'on applique à un conteneur standard comme Column ou Row.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 54.1 : Défilement (Scroll)',
          url: '#'
        }
      ]
    }
  ]
};
