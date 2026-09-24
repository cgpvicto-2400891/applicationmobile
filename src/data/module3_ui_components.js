// MODULE 3 — Les composants d'interface (UI) UNIQUEMENT
// Règle d'or : Chaque composant a sa fiche dédiée. Aucun mélange avec les Modifiers (Module 4) ni la logique d'état (Module 6).

export const MODULE_3 = {
  id: 'module-3',
  number: 3,
  title: 'Les composants d\'interface (UI) UNIQUEMENT',
  subtitle: 'Les briques visuelles natives de Jetpack Compose présentées à l\'état pur',
  description: 'Chaque élément visible sur un téléphone Android est un composant. Découvrez les 14 composants indispensables du cours, un par un, sous leur forme la plus pure et la plus simple.',
  prerequisites: 'Avoir complété le Module 2 (comprendre ce qu\'est une fonction @Composable).',
  lessons: [
    {
      id: 'component-text',
      title: 'Text() : Afficher du texte brut',
      analogy: 'Text(), c\'est comme une étiquette de prix ou une bande de ruban adhésif sur laquelle tu écris un mot au feutre noir pour l\'afficher sur une boîte.',
      definition: 'Le composable "Text()" est l\'élément fondamental le plus simple de Jetpack Compose. Son unique but est d\'afficher une chaîne de caractères à l\'écran.',
      codeExample: {
        code: `@Composable
fun ExempleTexteSimple() {
    Text(text = "Bienvenue au cégep !")
}`,
        lineByLine: [
          {
            line: 1,
            code: '@Composable',
            explanation: 'Annotation indispensable pour déclarer un composant visuel.'
          },
          {
            line: 2,
            code: 'fun ExempleTexteSimple() {',
            explanation: 'Déclaration de notre composable en PascalCase.'
          },
          {
            line: 3,
            code: 'Text(text = "Bienvenue au cégep !")',
            explanation: '"Text" est le composant natif. Le paramètre "text" reçoit la chaîne de caractères à dessiner à l\'écran.'
          }
        ]
      },
      visualMockup: {
        type: 'phone-screen',
        title: 'Rendu brut de Text()',
        content: 'Bienvenue au cégep !',
        details: 'Un simple texte lisible affiché à la position courante.'
      },
      commonMistakes: [
        {
          mistake: 'Tenter de modifier la couleur ou la taille de la police directement sans savoir que le style et les Modifiers sont étudiés spécifiquement au Module 4.',
          fix: 'Dans ce module, concentre-toi sur le composant en lui-même. Nous verrons comment le colorer et lui donner des styles typographiques au Module 4.',
          explanation: 'Séparer la fonction d\'un composant de son style visuel permet de garder un code propre et structuré.'
        }
      ],
      quiz: {
        question: 'Quel paramètre obligatoire devez-vous fournir à `Text()` pour qu\'il affiche un message ?',
        options: ['message = "..."', 'content = "..."', 'text = "..."', 'label = "..."'],
        correctIndex: 2,
        explanation: 'Bravo ! Le paramètre principal s\'appelle "text".'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 15.1 : Greeting et Text',
          url: '#',
          note: 'Le composant Text() est utilisé dans quasiment tous les écrans du cours.'
        }
      ]
    },
    {
      id: 'component-column',
      title: 'Column() : Empiler verticalement',
      analogy: 'Column(), c\'est comme un distributeur de canettes ou une pile d\'assiettes : chaque nouvel élément que tu ajoutes se place directement EN DESSOUS du précédent.',
      definition: 'Le composable "Column()" est un conteneur de disposition (layout) vertical. Tous les éléments placés à l\'intérieur de son bloc d\'accolades { } sont rangés les uns en dessous des autres, de haut en bas.',
      codeExample: {
        code: `@Composable
fun ExempleColonne() {
    Column {
        Text(text = "Premier étage (en haut)")
        Text(text = "Deuxième étage (au milieu)")
        Text(text = "Troisième étage (en bas)")
    }
}`,
        lineByLine: [
          {
            line: 2,
            code: 'Column {',
            explanation: '"Column" crée un conteneur vertical. Les accolades ouvrent la liste des enfants à empiler.'
          },
          {
            line: 3,
            code: 'Text(text = "Premier étage (en haut)")',
            explanation: 'Premier enfant : s\'affiche tout en haut.'
          },
          {
            line: 4,
            code: 'Text(text = "Deuxième étage (au milieu)")',
            explanation: 'Deuxième enfant : s\'affiche juste en dessous du premier.'
          },
          {
            line: 5,
            code: 'Text(text = "Troisième étage (en bas)")',
            explanation: 'Troisième enfant : s\'affiche sous le deuxième.'
          }
        ]
      },
      visualMockup: {
        type: 'layout-column',
        title: 'Disposition verticale d\'une Column',
        items: ['Premier étage (en haut)', 'Deuxième étage (au milieu)', 'Troisième étage (en bas)']
      },
      commonMistakes: [
        {
          mistake: 'Écrire deux Text() l\'un après l\'autre sans Column() ni Row().',
          fix: 'Si vous mettez deux Text() nus à la racine sans conteneur, Compose les superpose exactement au même endroit (l\'un par-dessus l\'autre, ce qui donne un fouillis illisible). Placez-les toujours dans une Column().',
          explanation: 'Par défaut, sans conteneur de mise en page, l\'origine de dessin est le coin supérieur gauche (0,0).'
        }
      ],
      quiz: {
        question: 'Comment sont organisés les composants placés à l\'intérieur d\'une `Column { }` ?',
        options: [
          'De gauche à droite sur une même ligne',
          'De haut en bas, empilés verticalement',
          'En diagonale vers le bas',
          'Aléatoirement selon la taille de l\'écran'
        ],
        correctIndex: 1,
        explanation: 'Exact ! Column organise ses enfants en colonne verticale.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 15.3 : Mise en page avec Column',
          url: '#',
          note: 'Consulte l\'agencement classique des écrans mobiles.'
        }
      ]
    },
    {
      id: 'component-row',
      title: 'Row() : Aligner horizontalement',
      analogy: 'Row(), c\'est comme des wagons de train attachés les uns derrière les autres ou des amis qui se tiennent par les épaules : chaque nouvel élément s\'installe à DROITE du précédent.',
      definition: 'Le composable "Row()" est le conteneur de disposition horizontal. Tous les composants enfants placés dans son corps sont alignés côte à côte sur une seule et même ligne, de gauche à droite.',
      codeExample: {
        code: `@Composable
fun ExempleLigne() {
    Row {
        Text(text = "Gauche")
        Text(text = " | ")
        Text(text = "Centre")
        Text(text = " | ")
        Text(text = "Droite")
    }
}`,
        lineByLine: [
          {
            line: 2,
            code: 'Row {',
            explanation: '"Row" (ligne en anglais) ouvre un conteneur horizontal pour ranger ses enfants de gauche à droite.'
          },
          {
            line: 3,
            code: 'Text(text = "Gauche")',
            explanation: 'Premier élément affiché à l\'extrémité gauche.'
          },
          {
            line: 5,
            code: 'Text(text = "Centre")',
            explanation: 'Placé immédiatement à la droite du séparateur.'
          },
          {
            line: 7,
            code: 'Text(text = "Droite")',
            explanation: 'Placé à la suite vers la droite.'
          }
        ]
      },
      visualMockup: {
        type: 'layout-row',
        title: 'Disposition horizontale d\'une Row',
        items: ['Gauche', '|', 'Centre', '|', 'Droite']
      },
      commonMistakes: [
        {
          mistake: 'Placer trop d\'éléments dans une Row sans se préoccuper de la largeur de l\'écran.',
          fix: 'Une Row ne passe pas automatiquement à la ligne suivante si elle déborde de l\'écran ! Pour de très longues listes horizontales défilantes, nous utiliserons LazyRow.',
          explanation: 'Row calcule l\'espace de façon linéaire et tronque les éléments qui dépassent du bord droit de l\'écran.'
        }
      ],
      quiz: {
        question: 'Dans quelle direction les composants enfants d\'une `Row` se rangent-ils ?',
        options: ['Verticale (de haut en bas)', 'Horizontale (de gauche à droite)', 'En profondeur (z-index)', 'Circulaire'],
        correctIndex: 1,
        explanation: 'Exactement ! Row signifie ligne horizontale.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 15.3 : Utilisation de Row',
          url: '#',
          note: 'Très utile pour afficher une icône à côté d\'un libellé texte.'
        }
      ]
    },
    {
      id: 'component-box',
      title: 'Box() : Superposer en profondeur (Z-Index)',
      analogy: 'Box(), c\'est comme empiler des feuilles de calque ou des verres transparents : ce que tu poses en dernier recouvre ce qui a été posé en premier.',
      definition: 'Le composable "Box()" permet de superposer des éléments les uns sur les autres selon l\'axe de profondeur (Z-index). Le premier élément déclaré est au fond, et chaque élément suivant vient se déposer par-dessus.',
      codeExample: {
        code: `@Composable
fun ExempleBoiteSuperposee() {
    Box {
        // En arrière-plan (fond) :
        Text(text = "JE SUIS DERRIÈRE")
        
        // Au premier plan (par-dessus) :
        Text(text = "Je suis au-dessus !")
    }
}`,
        lineByLine: [
          {
            line: 2,
            code: 'Box {',
            explanation: '"Box" (boîte en anglais) active la superposition tridimensionnelle.'
          },
          {
            line: 4,
            code: 'Text(text = "JE SUIS DERRIÈRE")',
            explanation: 'Premier élément : dessiné sur le calque inférieur (au fond).'
          },
          {
            line: 7,
            code: 'Text(text = "Je suis au-dessus !")',
            explanation: 'Deuxième élément : dessiné par-dessus le premier élément.'
          }
        ]
      },
      visualMockup: {
        type: 'layout-box',
        title: 'Superposition en couches (Box)',
        layer1: 'Calque 1 (Fond) : [ JE SUIS DERRIÈRE ]',
        layer2: 'Calque 2 (Premier plan) : [ Je suis au-dessus ! ]'
      },
      commonMistakes: [
        {
          mistake: 'Confondre Box() avec Column() et penser que Box met les éléments l\'un sous l\'autre.',
          fix: 'Rappelle-toi toujours : Column = un en-dessous de l\'autre. Row = un à côté de l\'autre. Box = un PAR-DESSUS l\'autre.',
          explanation: 'La Box sert typiquement à placer un badge de notification rouge par-dessus une icône de cloche.'
        }
      ],
      quiz: {
        question: 'Quel composant de disposition permet de placer un badge rouge par-dessus l\'icône d\'un panier d\'achat ?',
        options: ['Column()', 'Row()', 'Box()', 'Scaffold()'],
        correctIndex: 2,
        explanation: 'Superbe ! Box() est spécifiquement conçu pour superposer des éléments en profondeur.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 6.2 et Box',
          url: '#',
          note: 'Box est également utilisé comme conteneur avec dimensions personnalisées.'
        }
      ]
    },
    {
      id: 'component-image',
      title: 'Image() : Afficher une image locale',
      analogy: 'Image(), c\'est comme un cadre photo accroché au mur : tu lui donnes une photo stockée dans ton tiroir de photos locales (le dossier res/drawable) et tu ajoutes une petite note au dos pour décrire ce qu\'elle représente.',
      definition: 'Le composable "Image()" affiche une ressource graphique locale intégrée dans les fichiers du projet Android (dossier res/drawable). Il exige deux paramètres fondamentaux : le "painter" (qui pointe sur l\'image) et "contentDescription" (une description textuelle pour l\'accessibilité des personnes malvoyantes).',
      codeExample: {
        code: `@Composable
fun ExempleImageLocale() {
    Image(
        painter = painterResource(id = R.drawable.logo_cegep),
        contentDescription = "Logo officiel du Cégep"
    )
}`,
        lineByLine: [
          {
            line: 2,
            code: 'Image(',
            explanation: '"Image" est le composant Compose standard pour afficher un visuel.'
          },
          {
            line: 3,
            code: 'painter = painterResource(id = R.drawable.logo_cegep),',
            explanation: '"painterResource" va chercher l\'image vectorielle ou PNG nommée "logo_cegep" dans le dossier "res/drawable" de votre application.'
          },
          {
            line: 4,
            code: 'contentDescription = "Logo officiel du Cégep"',
            explanation: '"contentDescription" traduit en texte l\'image pour les lecteurs d\'écran (TalkBack). Obligatoire pour l\'accessibilité !'
          }
        ]
      },
      visualMockup: {
        type: 'image-preview',
        title: 'Rendu du composant Image()',
        badge: '🖼️ Logo Cégep (Ressource locale res/drawable)',
        altText: 'Description : Logo officiel du Cégep'
      },
      commonMistakes: [
        {
          mistake: 'Mettre "contentDescription = null" sans raison valable sur des images importantes.',
          fix: 'Ne mettez "null" que si l\'image est purement décorative (ex: un petit motif géométrique en arrière-plan). Sinon, fournissez toujours une description claire.',
          explanation: 'L\'accessibilité numérique est une exigence professionnelle standard en développement mobile.'
        }
      ],
      quiz: {
        question: 'Quelle fonction utilise-t-on pour charger une image située dans le dossier res/drawable ?',
        options: ['loadImage()', 'painterResource(id = R.drawable...)', 'getFile()', 'urlPicture()'],
        correctIndex: 1,
        explanation: 'Exactement ! painterResource() extrait le visuel à partir de l\'identifiant de ressource R.drawable.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 15.3 : Afficher une image',
          url: '#',
          note: 'Découvre comment importer des fichiers SVG et PNG dans Android Studio.'
        }
      ]
    },
    {
      id: 'component-asyncimage',
      title: 'AsyncImage() : Charger une image depuis une URL Web (Coil)',
      analogy: 'AsyncImage, c\'est comme commander une photo en ligne par la poste : le composant se charge d\'aller chercher l\'image sur un serveur Internet à l\'autre bout du monde pendant que ton application continue de tourner, puis l\'affiche dès qu\'elle arrive.',
      definition: 'Le composable "AsyncImage()" (issu de la bibliothèque populaire Coil pour Compose) permet d\'afficher une image provenant d\'une adresse web (URL HTTP/HTTPS). Il gère automatiquement le téléchargement en arrière-plan, la mise en cache et l\'affichage.',
      codeExample: {
        code: `@Composable
fun ExempleImageReseau() {
    AsyncImage(
        model = "https://example.com/photos/avatar.png",
        contentDescription = "Photo de profil de l'utilisateur"
    )
}`,
        lineByLine: [
          {
            line: 3,
            code: 'AsyncImage(',
            explanation: '"AsyncImage" (Image Asynchrone) télécharge et affiche l\'image sans geler l\'écran.'
          },
          {
            line: 4,
            code: 'model = "https://example.com/photos/avatar.png",',
            explanation: '"model" reçoit l\'adresse URL web de l\'image (ou une requête d\'image personnalisée).'
          },
          {
            line: 5,
            code: 'contentDescription = "Photo de profil de l\'utilisateur"',
            explanation: 'Description d\'accessibilité lue aux personnes ayant une déficience visuelle.'
          }
        ]
      },
      visualMockup: {
        type: 'network-image',
        title: 'Rendu AsyncImage (Coil)',
        status: '🌐 Image téléchargée depuis le web',
        preview: '👤 [Photo distante chargée dynamiquement]'
      },
      commonMistakes: [
        {
          mistake: 'Oublier d\'ajouter la permission Internet dans le fichier AndroidManifest.xml ("android.permission.INTERNET").',
          fix: 'Toute application qui contacte le web doit obligatoirement avoir `<uses-permission android:name="android.permission.INTERNET" />` dans son Manifest.',
          explanation: 'Sans cette permission, le système bloque la connexion et l\'image reste désespérément blanche sans afficher d\'erreur évidente.'
        }
      ],
      quiz: {
        question: 'Quelle permission système Android est obligatoire pour qu\'AsyncImage puisse télécharger une image ?',
        options: ['android.permission.CAMERA', 'android.permission.INTERNET', 'android.permission.STORAGE', 'android.permission.LOCATION'],
        correctIndex: 1,
        explanation: 'Parfait ! L\'autorisation INTERNET dans AndroidManifest.xml est requise pour contacter tout serveur externe.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section AsyncImage et Coil',
          url: '#',
          note: 'Coil est la bibliothèque recommandée par Google pour Compose car elle est 100% basée sur les coroutines Kotlin.'
        }
      ]
    },
    {
      id: 'component-button',
      title: 'Button() : Bouton interactif standard',
      analogy: 'Button(), c\'est comme une sonnette de porte : tu as la coque en plastique sur laquelle le visiteur appuie (le déclencheur onClick), et à l\'intérieur tu places l\'étiquette qui indique le nom de l\'habitant (le texte ou l\'icône).',
      definition: 'Le composable "Button()" est le composant interactif classique de Material Design. Il réagit au toucher de l\'utilisateur grâce à son paramètre "onClick" et reçoit entre ses accolades { } le contenu à afficher à l\'intérieur de sa capsule.',
      codeExample: {
        code: `@Composable
fun ExempleBoutonSimple() {
    Button(
        onClick = { 
            // Action déclenchée quand l'utilisateur clique !
            println("Bouton cliqué !") 
        }
    ) {
        // Contenu placé À L'INTÉRIEUR du bouton :
        Text(text = "Valider")
    }
}`,
        lineByLine: [
          {
            line: 3,
            code: 'Button(',
            explanation: '"Button" crée la surface cliquable avec le relief et l\'animation de pulsation Material.'
          },
          {
            line: 4,
            code: 'onClick = { println("Bouton cliqué !") }',
            explanation: '"onClick" (au clic en anglais) est une lambda contenant le code à exécuter lors du tap de l\'utilisateur.'
          },
          {
            line: 9,
            code: ') { Text(text = "Valider") }',
            explanation: 'Les accolades finales définissent le contenu intérieur du bouton (ici un simple composable Text).'
          }
        ]
      },
      visualMockup: {
        type: 'button-preview',
        title: 'Bouton Material Design 3',
        buttonText: 'Valider',
        effect: 'Effet de vague lumineuse (Ripple Effect) au toucher'
      },
      commonMistakes: [
        {
          mistake: 'Tenter de passer le texte du bouton en paramètre direct : "Button(text = "Valider")".',
          fix: 'Un Button() ne possède pas de paramètre "text" ! On place un composable "Text("...")" à l\'intérieur de son corps d\'accolades { }.',
          explanation: 'Cette conception en "slot" (fente) permet de mettre ce que l\'on veut dans un bouton : du texte, une icône, ou même une Row combinant les deux !'
        }
      ],
      quiz: {
        question: 'Où place-t-on le texte qui doit s\'afficher à l\'intérieur d\'un Button en Jetpack Compose ?',
        options: [
          'Dans un paramètre label = "Mon texte"',
          'Dans un composable Text() placé à l\'intérieur des accolades { } du Button',
          'Dans le fichier AndroidManifest.xml',
          'Dans la méthode onCreate'
        ],
        correctIndex: 1,
        explanation: 'Exact ! Button est un conteneur : son contenu s\'écrit entre accolades sous la forme d\'un Text() ou d\'une icône.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 5.12 : Button()',
          url: '#',
          note: 'Découvre aussi les variantes FilledButton, OutlinedButton et TextButton.'
        }
      ]
    },
    {
      id: 'component-textfield',
      title: 'TextField() & OutlinedTextField() : Saisie de texte',
      analogy: 'Un TextField, c\'est comme une case blanche sur un formulaire papier officiel avec une ligne pour écrire son prénom au stylo.',
      definition: 'Les composables "TextField()" et "OutlinedTextField()" permettent à l\'utilisateur de taper du texte au clavier virtuel. OutlinedTextField est la version moderne entourée d\'une bordure élégante.',
      codeExample: {
        code: `@Composable
fun ExempleChampTexteBrut() {
    OutlinedTextField(
        value = "Texte saisi",
        onValueChange = { nouveauTexte -> 
            // Sera relié à une variable d'état au Module 6 !
        },
        label = { Text("Votre prénom") }
    )
}`,
        lineByLine: [
          {
            line: 3,
            code: 'OutlinedTextField(',
            explanation: '"OutlinedTextField" crée un champ de saisie délimité par une bordure périphérique.'
          },
          {
            line: 4,
            code: 'value = "Texte saisi",',
            explanation: '"value" est le texte actuellement affiché à l\'intérieur de la boîte.'
          },
          {
            line: 5,
            code: 'onValueChange = { nouveauTexte -> ... },',
            explanation: '"onValueChange" est déclenché chaque fois que l\'utilisateur tape ou efface une lettre sur son clavier.'
          },
          {
            line: 8,
            code: 'label = { Text("Votre prénom") }',
            explanation: '"label" est l\'étiquette flottante qui indique quoi saisir dans le champ.'
          }
        ]
      },
      visualMockup: {
        type: 'text-field-preview',
        title: 'OutlinedTextField avec étiquette flottante',
        label: 'Votre prénom',
        value: 'Texte saisi',
        border: 'Bordure violette arrondie Material 3'
      },
      commonMistakes: [
        {
          mistake: 'Écrire "value = "Alex"" avec un "onValueChange = {}" vide et s\'étonner qu\'on ne peut rien taper au clavier dans l\'émulateur.',
          fix: 'En Compose, un champ est contrôlé par son état. Si la valeur reste figée, le clavier ne peut rien écrire ! Nous verrons la gestion complète au Module 6 (State).',
          explanation: 'Compose ne stocke pas de texte en interne de façon magique : c\'est votre code qui doit lui renvoyer la nouvelle valeur.'
        }
      ],
      quiz: {
        question: 'Quel paramètre d\'OutlinedTextField est appelé chaque fois qu\'une touche du clavier est pressée ?',
        options: ['onKeyPress', 'onValueChange', 'onTextSubmit', 'updateText'],
        correctIndex: 1,
        explanation: 'Très bien ! onValueChange reçoit le nouveau texte complet tapé par l\'utilisateur.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 66.1 : TextField() et OutlinedTextField()',
          url: '#',
          note: 'Nous y reviendrons en détail au Module 10 pour bâtir des formulaires complets.'
        }
      ]
    },
    {
      id: 'component-icon',
      title: 'Icon() : Afficher des symboles vectoriels',
      analogy: 'Icon(), c\'est comme les pictogrammes universels sur les panneaux de signalisation ou sur la porte des toilettes : un symbole graphique pur compris d\'un coup d\'œil sans avoir besoin de lire une phrase.',
      definition: 'Le composable "Icon()" affiche une icône vectorielle nette à toutes les résolutions. Compose intègre nativement la bibliothèque Material Icons (Icons.Default) avec des centaines d\'icônes prêtes à l\'emploi (maison, favoris, panier, profil...).',
      codeExample: {
        code: `@Composable
fun ExempleIconeFavori() {
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "Ajouter aux favoris"
    )
}`,
        lineByLine: [
          {
            line: 3,
            code: 'Icon(',
            explanation: '"Icon" est le composable dédié aux pictogrammes vectoriels.'
          },
          {
            line: 4,
            code: 'imageVector = Icons.Default.Favorite,',
            explanation: '"imageVector" reçoit l\'icône vectorielle. "Icons.Default.Favorite" fournit le cœur Material officiel.'
          },
          {
            line: 5,
            code: 'contentDescription = "Ajouter aux favoris"',
            explanation: 'Texte d\'accessibilité vocale pour expliquer l\'action du bouton aux malvoyants.'
          }
        ]
      },
      visualMockup: {
        type: 'icon-preview',
        title: 'Rendu vectoriel d\'Icon()',
        symbol: '❤️',
        name: 'Icons.Default.Favorite'
      },
      commonMistakes: [
        {
          mistake: 'Utiliser le composant Image() au lieu d\'Icon() pour des petits pictogrammes monochromes.',
          fix: 'Utilise toujours Icon() pour les symboles : il applique automatiquement la bonne teinte (tint) selon le thème clair ou sombre.',
          explanation: 'Icon gère automatiquement le contraste et le redimensionnement vectoriel des symboles d\'interface.'
        }
      ],
      quiz: {
        question: 'D\'où provient l\'icône vectorielle standard `Icons.Default.Home` ?',
        options: ['D\'un site web externe', 'Du catalogue officiel Material Icons intégré à Android', 'De l\'appareil photo du téléphone', 'D\'un fichier texte'],
        correctIndex: 1,
        explanation: 'Exact ! Compose inclut une vaste collection d\'icônes vectorielles officielles Material Icons.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 31.1 : Icône avec Material Symbols',
          url: '#',
          note: 'Consulte la liste complète des icônes disponibles.'
        }
      ]
    },
    {
      id: 'component-lazycolumn-lazyrow',
      title: 'LazyColumn & LazyRow : Listes défilantes performantes',
      analogy: 'LazyColumn, c\'est comme le tapis roulant d\'une caisse d\'épicerie : même si le supermarché possède 10 000 articles dans son entrepôt, seuls les 5 ou 6 articles qui passent sous vos yeux existent physiquement sur le tapis. Les autres sont créés au fur et à mesure que le tapis avance.',
      definition: 'Contrairement à une simple Column qui essaierait de créer d\'un coup 10 000 éléments en mémoire (provoquant un crash immédiat du téléphone par saturation de RAM), "LazyColumn" (verticale) et "LazyRow" (horizontale) ne dessinent QUE les éléments actuellement visibles sur l\'écran du téléphone.',
      codeExample: {
        code: `@Composable
fun ExempleListeEtudiants(noms: List<String>) {
    LazyColumn {
        items(noms) { nom ->
            Text(text = "Étudiant(e) : $nom")
        }
    }
}`,
        lineByLine: [
          {
            line: 3,
            code: 'LazyColumn {',
            explanation: '"LazyColumn" (colonne paresseuse en anglais) crée la liste défilante optimisée avec recyclage d\'éléments.'
          },
          {
            line: 4,
            code: 'items(noms) { nom ->',
            explanation: '"items()" prend la collection de données et génère une ligne pour chaque élément au fur et à mesure du défilement.'
          },
          {
            line: 5,
            code: 'Text(text = "Étudiant(e) : $nom")',
            explanation: 'Le composable dessiné pour représenter chaque ligne individuelle de la liste.'
          }
        ]
      },
      visualMockup: {
        type: 'lazy-list-preview',
        title: 'Défilement infini ultra-fluide',
        items: [
          'Étudiant(e) : Alexandre',
          'Étudiant(e) : Béatrice',
          'Étudiant(e) : Charles',
          'Étudiant(e) : Daphnée',
          'Étudiant(e) : Émile (défilement...)'
        ]
      },
      commonMistakes: [
        {
          mistake: 'Mettre une Column standard avec 500 éléments et s\'étonner que l\'écran fige ou saccade lors du défilement.',
          fix: 'Dès que le nombre d\'éléments peut dépasser la hauteur de l\'écran ou provient d\'une base de données, utilise TOUJOURS "LazyColumn".',
          explanation: 'Le mot "Lazy" (paresseux) signifie qu\'il ne travaille qu\'au strict minimum nécessaire pour l\'affichage présent.'
        }
      ],
      quiz: {
        question: 'Pourquoi préfère-t-on `LazyColumn` à `Column` pour afficher une liste de 1000 produits ?',
        options: [
          'Parce que LazyColumn colore les textes en bleu',
          'Parce que LazyColumn ne charge en mémoire que les éléments visibles à l\'écran et recycle les vues',
          'Parce que LazyColumn désactive l\'utilisation de la batterie',
          'Parce que Column est interdite en Kotlin'
        ],
        correctIndex: 1,
        explanation: 'Excellente réponse ! Le recyclage intelligent des vues est le secret de la fluidité à 120 FPS.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 55.1 : LazyColumn',
          url: '#',
          note: 'Découvre comment passer des clés uniques avec "key = { it.id }".'
        }
      ]
    },
    {
      id: 'component-card',
      title: 'Card() : Conteneur surélevé avec ombre et bordure',
      analogy: 'Card(), c\'est comme une carte de jeu de société ou une carte de visite rigide posée sur une table en bois : elle a une petite ombre portée dessous qui la détache nettement du fond de la table.',
      definition: 'Le composable "Card()" est un conteneur Material qui regroupe des informations visuellement liées dans un rectangle stylisé pourvu de coins arrondis et d\'une légère élévation (ombre 3D).',
      codeExample: {
        code: `@Composable
fun ExempleCarteInfo() {
    Card {
        Column {
            Text(text = "Titre de la carte")
            Text(text = "Description détaillée du cours")
        }
    }
}`,
        lineByLine: [
          {
            line: 3,
            code: 'Card {',
            explanation: '"Card" crée la surface cartonnée avec bordures et ombre Material.'
          },
          {
            line: 4,
            code: 'Column {',
            explanation: 'On utilise une Column à l\'intérieur pour empiler verticalement le titre et le texte.'
          },
          {
            line: 5,
            code: 'Text(text = "Titre de la carte")',
            explanation: 'Texte d\'en-tête de la carte.'
          },
          {
            line: 6,
            code: 'Text(text = "Description détaillée du cours")',
            explanation: 'Corps du texte de la carte.'
          }
        ]
      },
      visualMockup: {
        type: 'card-preview',
        title: 'Rendu du composable Card',
        headline: 'Titre de la carte',
        body: 'Description détaillée du cours',
        elevation: 'Surface blanche surélevée avec ombre douce et coins arrondis'
      },
      commonMistakes: [
        {
          mistake: 'Mettre plusieurs Text() directement dans Card sans Column() intermédiaire.',
          fix: 'Card se comporte comme une Box par défaut : si tu mets deux Text() directement dedans, ils vont se superposer ! Mets toujours une Column { } à l\'intérieur de ta Card.',
          explanation: 'Card est un conteneur de surface, pas un gestionnaire d\'alignement vertical.'
        }
      ],
      quiz: {
        question: 'Que se passe-t-il si vous insérez deux textes directement dans une `Card { Text("A") Text("B") }` sans Column ?',
        options: [
          'Ils sont alignés horizontalement',
          'Ils se superposent l\'un sur l\'autre au même endroit',
          'Une erreur de compilation survient',
          'Le deuxième texte est effacé'
        ],
        correctIndex: 1,
        explanation: 'Exact ! Comme Card empile par défaut comme une Box, il faut toujours mettre une Column à l\'intérieur.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 5.14 et 60.2 : Card()',
          url: '#',
          note: 'Consulte l\'usage des cartes pour lister des enregistrements de base de données.'
        }
      ]
    },
    {
      id: 'component-popup',
      title: 'Popup() : Fenêtre flottante contextuelle',
      analogy: 'Popup(), c\'est comme une bulle d\'aide ou un menu dépliant qui apparaît au bout de ton doigt lorsque tu cliques sur un bouton, puis disparaît dès que tu touches à côté.',
      definition: 'Le composable "Popup()" permet d\'afficher une petite vue flottante au-dessus du contenu ordinaire de l\'écran sans bloquer tout le reste de l\'application.',
      codeExample: {
        code: `@Composable
fun ExemplePopupSimple() {
    Popup(
        onDismissRequest = { 
            // Action quand l'utilisateur touche en dehors du popup
        }
    ) {
        Card {
            Text(text = "Je suis un petit menu flottant !")
        }
    }
}`,
        lineByLine: [
          {
            line: 3,
            code: 'Popup(',
            explanation: '"Popup" ouvre une fenêtre temporaire volante au-dessus de la hiérarchie standard.'
          },
          {
            line: 4,
            code: 'onDismissRequest = { ... }',
            explanation: '"onDismissRequest" (sur demande de fermeture) est exécuté si l\'utilisateur clique hors de la bulle ou appuie sur le bouton Retour.'
          },
          {
            line: 8,
            code: ') { Card { Text(...) } }',
            explanation: 'Le contenu visuel affiché dans la bulle flottante (ici une carte contenant du texte).'
          }
        ]
      },
      visualMockup: {
        type: 'popup-preview',
        title: 'Bulle flottante au-dessus de l\'interface',
        floatingContent: '💬 Je suis un petit menu flottant !',
        context: 'L\'arrière-plan reste visible sous la bulle'
      },
      commonMistakes: [
        {
          mistake: 'Oublier de conditionner l\'affichage du Popup à un booléen.',
          fix: 'Si vous écrivez Popup() sans condition "if (afficherMenu)", le Popup sera affiché en permanence à l\'écran ! Nous apprendrons la condition avec un état au Module 6.',
          explanation: 'En Compose déclaratif, un composable écrit sans condition est toujours rendu.'
        }
      ],
      quiz: {
        question: 'Quel paramètre du composable Popup gère la demande de fermeture lorsque l\'utilisateur clique à l\'extérieur ?',
        options: ['onClose()', 'onDismissRequest', 'exitPopup()', 'hide()'],
        correctIndex: 1,
        explanation: 'Parfait ! onDismissRequest intercepte l\'événement de fermeture spontanée.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 5.13 et 39.1 : Popup()',
          url: '#',
          note: 'Différences d\'usage entre Popup et AlertDialog.'
        }
      ]
    },
    {
      id: 'component-alertdialog',
      title: 'AlertDialog() : Boîte de dialogue de confirmation',
      analogy: 'AlertDialog(), c\'est comme le videur de boîte de nuit qui t\'arrête net et te demande les yeux dans les yeux : "Es-tu absolument certain de vouloir supprimer tout ton travail ?" avec deux boutons clairs : OUI ou NON.',
      definition: 'Le composable "AlertDialog()" est une fenêtre modale qui assombrit le reste de l\'écran et oblige l\'utilisateur à prendre une décision critique avant de pouvoir poursuivre. Elle est structurée en 4 emplacements dédiés : titre, texte explicatif, bouton de confirmation et bouton d\'annulation.',
      codeExample: {
        code: `@Composable
fun ExempleBoiteConfirmation() {
    AlertDialog(
        onDismissRequest = { /* Fermeture si clic extérieur */ },
        title = { Text(text = "Confirmation de suppression") },
        text = { Text(text = "Voulez-vous vraiment supprimer cet étudiant ?") },
        confirmButton = {
            Button(onClick = { /* Action suppression */ }) {
                Text(text = "Oui, supprimer")
            }
        },
        dismissButton = {
            Button(onClick = { /* Annuler */ }) {
                Text(text = "Annuler")
            }
        }
    )
}`,
        lineByLine: [
          {
            line: 3,
            code: 'AlertDialog(',
            explanation: '"AlertDialog" crée la boîte modale centrée avec assombrissement de l\'arrière-plan.'
          },
          {
            line: 5,
            code: 'title = { Text(text = "Confirmation de suppression") },',
            explanation: '"title" est le slot réservé au titre principal de l\'alerte.'
          },
          {
            line: 6,
            code: 'text = { Text(text = "Voulez-vous vraiment...") },',
            explanation: '"text" est le slot pour le message explicatif détaillé.'
          },
          {
            line: 7,
            code: 'confirmButton = { Button(...) { Text("Oui...") } },',
            explanation: '"confirmButton" accueille le bouton d\'action positive (confirmer).'
          },
          {
            line: 12,
            code: 'dismissButton = { Button(...) { Text("Annuler") } }',
            explanation: '"dismissButton" accueille le bouton de rejet ou d\'annulation.'
          }
        ]
      },
      visualMockup: {
        type: 'modal-preview',
        title: 'Boîte modale AlertDialog',
        header: '⚠️ Confirmation de suppression',
        body: 'Voulez-vous vraiment supprimer cet étudiant ?',
        actions: ['[ Annuler ]', '[ Oui, supprimer ]']
      },
      commonMistakes: [
        {
          mistake: 'Inverser l\'ordre des boutons confirmButton et dismissButton et mélanger les actions.',
          fix: 'Assurez-vous toujours que le bouton dismissButton annule l\'opération sans danger.',
          explanation: 'L\'ergonomie mobile exige que l\'utilisateur ne perde jamais ses données par inadvertance.'
        }
      ],
      quiz: {
        question: 'Comment AlertDialog s\'assure-t-elle de capter toute l\'attention de l\'utilisateur ?',
        options: [
          'Elle fait vibrer le téléphone en continu pendant 1 minute',
          'Elle assombrit tout le reste de l\'écran et bloque les interactions avec l\'arrière-plan',
          'Elle envoie un courriel au professeur',
          'Elle ferme l\'application'
        ],
        correctIndex: 1,
        explanation: 'Exact ! C\'est le principe d\'une boîte modale : l\'arrière-plan est grisé et rendu inactif.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 39.2 : AlertDialog()',
          url: '#',
          note: 'Découvre comment personnaliser les icônes d\'en-tête de dialogue.'
        }
      ]
    },
    {
      id: 'component-snackbar',
      title: 'Snackbar() : Notification éphémère en bas d\'écran',
      analogy: 'Une Snackbar, c\'est comme lorsque tu envoies un courriel et qu\'un petit bandeau noir discret apparaît 3 secondes en bas de ton écran pour dire "Message envoyé — [ANNULER]".',
      definition: 'Le composable "Snackbar()" affiche un message court et non intrusif tout en bas de l\'écran. Il s\'efface tout seul après quelques secondes et peut proposer une action rapide de rattrapage (comme "Annuler").',
      codeExample: {
        code: `@Composable
fun ExempleSnackbarVisuel() {
    Snackbar(
        action = {
            Text(text = "ANNULER")
        }
    ) {
        Text(text = "Message supprimé avec succès")
    }
}`,
        lineByLine: [
          {
            line: 3,
            code: 'Snackbar(',
            explanation: '"Snackbar" dessine le bandeau sombre classique au bas de l\'écran.'
          },
          {
            line: 4,
            code: 'action = { Text(text = "ANNULER") }',
            explanation: '"action" est le bouton textuel optionnel permettant à l\'utilisateur d\'annuler l\'opération.'
          },
          {
            line: 8,
            code: ') { Text(text = "Message supprimé avec succès") }',
            explanation: 'Le corps d\'accolades contient le message d\'information principal.'
          }
        ]
      },
      visualMockup: {
        type: 'snackbar-preview',
        title: 'Bandeau Snackbar au bas de l\'écran',
        message: 'Message supprimé avec succès',
        actionText: 'ANNULER'
      },
      commonMistakes: [
        {
          mistake: 'Confondre une Snackbar avec les anciennes notifications "Toast".',
          fix: 'Les Toasts sont désuets car non personnalisables et sans action possible. Google recommande désormais systématiquement la Snackbar.',
          explanation: 'La Snackbar respecte Material Design et permet d\'offrir un bouton d\'annulation ("Undo").'
        }
      ],
      quiz: {
        question: 'Quel est le grand avantage d\'une Snackbar par rapport à une boîte modale AlertDialog ?',
        options: [
          'Elle bloque complètement le téléphone',
          'Elle est discrète, ne bloque pas le travail de l\'utilisateur et disparaît toute seule',
          'Elle redémarre l\'application',
          'Elle s\'affiche en plein milieu de l\'écran'
        ],
        correctIndex: 1,
        explanation: 'Tout à fait ! La Snackbar informe sans interrompre le flux de travail de l\'utilisateur.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 39.3 : Snackbar : notification de courte durée',
          url: '#',
          note: 'Nous verrons au Module 5 et 8 comment la déclencher avec Scaffold et SnackbarHostState.'
        }
      ]
    }
  ]
};
