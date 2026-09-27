export const MODULE_17 = {
  id: 'module-17',
  number: 17,
  title: 'Boîte à outils : Modèles prêts à l\'emploi',
  subtitle: 'Copiez, collez et adaptez ces composants standards pour accélérer votre développement',
  description: 'Gagnez du temps ! Cette section regroupe des structures complètes de composants (Barres de navigation, Grilles, Formulaires, Boutons) utilisant les meilleures pratiques de Material Design 3.',
  prerequisites: 'Avoir compris les concepts de Layouts (Module 5) et d\'État (Module 6).',
  lessons: [
    {
      id: 'template-scaffold-bars',
      title: 'Structure de base : Scaffold, TopBar et BottomBar',
      analogy: 'Un Scaffold, c\'est comme les fondations et la charpente d\'une maison. Il prévoit exactement où placer le toit (TopBar) et le plancher (BottomBar) sans que tu aies à tout mesurer toi-même.',
      definition: 'Le composant Scaffold simplifie la création d\'écrans complexes en fournissant des emplacements dédiés pour les barres de navigation (haute et basse), le bouton flottant (FAB) et le contenu principal.',
      codeExample: {
        code: `@Composable
fun EcranPrincipal() {
    Scaffold(
        topBar = {
            ExperimentalMaterial3Api // Requis pour TopAppBar
            TopAppBar(
                title = { Text("Mon Application") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.primary,
                ),
                actions = {
                    IconButton(onClick = { /* Action profil */ }) {
                        Icon(Icons.Filled.Person, contentDescription = "Profil")
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    icon = { Icon(Icons.Filled.Home, contentDescription = "Accueil") },
                    label = { Text("Accueil") },
                    selected = true,
                    onClick = { /* Naviguer vers Accueil */ }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Filled.Search, contentDescription = "Recherche") },
                    label = { Text("Recherche") },
                    selected = false,
                    onClick = { /* Naviguer vers Recherche */ }
                )
            }
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { /* Action Ajouter */ }) {
                Icon(Icons.Filled.Add, contentDescription = "Ajouter")
            }
        }
    ) { innerPadding ->
        // Le contenu principal DOIT utiliser innerPadding
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
        ) {
            Text("Contenu de l'application ici...")
        }
    }
}`,
        lineByLine: [
          {
            line: 4,
            code: 'topBar = { TopAppBar(...) }',
            explanation: 'Définit la barre d\'en-tête (en haut de l\'écran).'
          },
          {
            line: 19,
            code: 'bottomBar = { NavigationBar(...) }',
            explanation: 'Définit la barre de navigation avec ses onglets (en bas de l\'écran).'
          },
          {
            line: 39,
            code: ') { innerPadding ->',
            explanation: 'Le Scaffold calcule la taille des barres et fournit innerPadding. Il FAUT l\'appliquer au contenu principal pour qu\'il ne soit pas caché sous les barres.'
          }
        ]
      },
      visualMockup: {
        type: 'layout-preview',
        title: 'Structure Scaffold',
        topBar: 'Mon Application (Icône Profil)',
        content: 'Contenu de l\'application ici...\\n(Espace principal avec un FAB "Ajouter" en bas à droite)',
        bottomBar: '🏠 Accueil | 🔍 Recherche'
      },
      commonMistakes: [
        {
          mistake: 'Ignorer la variable "innerPadding" dans le contenu du Scaffold.',
          fix: 'Appliquez TOUJOURS modifier = Modifier.padding(innerPadding) au premier composant (souvent une Column ou LazyColumn) à l\'intérieur du Scaffold.',
          explanation: 'Si vous l\'ignorez, le texte du haut sera caché sous la TopBar, et celui du bas sous la BottomBar.'
        }
      ],
      quiz: {
        question: 'Quelle est la règle absolue lorsqu\'on utilise un Scaffold ?',
        options: [
          'Il faut toujours mettre la BottomBar en premier dans le code',
          'Il faut utiliser innerPadding sur le composant parent du contenu principal',
          'On ne peut pas y mettre de bouton flottant (FAB)',
          'Il doit toujours être placé dans une LazyColumn'
        ],
        correctIndex: 1,
        explanation: 'Le innerPadding est crucial : c\'est lui qui décale le contenu pour laisser de la place aux barres de navigation.'
      },
      furtherReading: [
        {
          title: 'Documentation officielle : Scaffold',
          url: 'https://developer.android.com/develop/ui/compose/layouts/basics#scaffold'
        }
      ]
    },
    {
      id: 'template-grids-cards',
      title: 'Cartes et Grilles : Afficher un catalogue',
      analogy: 'La LazyVerticalGrid, c\'est comme les rayonnages d\'une bibliothèque, et chaque Card est un livre mis en valeur. Au lieu d\'empiler les livres sur une seule colonne (LazyColumn), on les étale sur plusieurs colonnes pour optimiser l\'espace.',
      definition: 'LazyVerticalGrid permet d\'afficher une liste d\'éléments sous forme de grille (ex: 2 colonnes). La Card (Carte) est le conteneur Material Design parfait pour encapsuler chaque élément avec une belle ombre et des coins arrondis.',
      codeExample: {
        code: `@Composable
fun CatalogueGrille() {
    // LazyVerticalGrid : Une liste optimisée sous forme de grille
    LazyVerticalGrid(
        columns = GridCells.Fixed(2), // 2 colonnes fixes
        contentPadding = PaddingValues(16.dp), // Marge autour de la grille
        verticalArrangement = Arrangement.spacedBy(16.dp), // Espace vertical
        horizontalArrangement = Arrangement.spacedBy(16.dp), // Espace horizontal
        modifier = Modifier.fillMaxSize()
    ) {
        items(10) { index -> 
            // La Card pour chaque élément
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(150.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.Star, 
                        contentDescription = "Étoile",
                        tint = MaterialTheme.colorScheme.primary
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Produit \${index + 1}",
                        style = MaterialTheme.typography.titleMedium
                    )
                }
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: 'columns = GridCells.Fixed(2),',
            explanation: 'Force la grille à avoir exactement 2 colonnes. On peut aussi utiliser GridCells.Adaptive(minSize = 128.dp) pour s\'adapter automatiquement à la largeur de l\'écran.'
          },
          {
            line: 13,
            code: 'Card( ... )',
            explanation: 'Composant visuel qui donne un fond, des bords arrondis et une ombre (élévation) à son contenu.'
          }
        ]
      },
      visualMockup: {
        type: 'grid-preview',
        title: 'Catalogue Grille (2 colonnes)',
        items: [
          '⭐ Produit 1', '⭐ Produit 2',
          '⭐ Produit 3', '⭐ Produit 4'
        ]
      },
      commonMistakes: [
        {
          mistake: 'Faire une boucle `for` avec des Row et des Column pour simuler une grille.',
          fix: 'Utilisez toujours LazyVerticalGrid pour les grilles. Elle est hautement optimisée et ne charge en mémoire que les cartes visibles à l\'écran.',
          explanation: 'Comme LazyColumn, LazyVerticalGrid "recycle" les vues. Une grille bricolée à la main crashera l\'application avec beaucoup de données.'
        }
      ],
      quiz: {
        question: 'Comment rendre la grille adaptative pour qu\'elle ait 2 colonnes sur un petit téléphone et 4 sur une tablette ?',
        options: [
          'Utiliser if(estTablette) GridCells.Fixed(4) else GridCells.Fixed(2)',
          'Utiliser GridCells.Adaptive(minSize = 150.dp)',
          'C\'est impossible avec LazyVerticalGrid',
          'Utiliser un Modifier.gridColumns(auto)'
        ],
        correctIndex: 1,
        explanation: 'GridCells.Adaptive calcule automatiquement le nombre de colonnes en fonction de la place disponible et de la taille minimum demandée.'
      },
      furtherReading: [
        {
          title: 'Documentation officielle : Listes et Grilles',
          url: 'https://developer.android.com/develop/ui/compose/lists'
        }
      ]
    },
    {
      id: 'template-forms-inputs',
      title: 'Formulaires : Champs de texte et validation',
      analogy: 'Un formulaire, c\'est comme un guichet d\'aéroport. Tu as des cases précises pour entrer ton nom et ton passeport, et l\'agent (le bouton) refuse de te laisser passer si tu n\'as pas rempli les cases correctement.',
      definition: 'OutlinedTextField est le composant standard pour la saisie de texte. Il faut toujours l\'accompagner d\'un état (State) pour stocker la valeur saisie, et on peut y ajouter des icônes ou des messages d\'erreur.',
      codeExample: {
        code: `@Composable
fun FormulaireConnexion() {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isError by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.padding(16.dp).fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Connectez-vous", style = MaterialTheme.typography.headlineMedium)

        OutlinedTextField(
            value = email,
            onValueChange = { 
                email = it
                isError = false // Réinitialise l'erreur à la frappe
            },
            label = { Text("Adresse courriel") },
            leadingIcon = { Icon(Icons.Filled.Email, contentDescription = null) },
            isError = isError,
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
        )

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Mot de passe") },
            leadingIcon = { Icon(Icons.Filled.Lock, contentDescription = null) },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            visualTransformation = PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password)
        )

        if (isError) {
            Text(
                text = "Courriel invalide", 
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall
            )
        }

        Button(
            onClick = {
                if (!email.contains("@")) {
                    isError = true
                } else {
                    /* Connexion... */
                }
            },
            modifier = Modifier.fillMaxWidth().height(50.dp)
        ) {
            Text("Se connecter")
        }
    }
}`,
        lineByLine: [
          {
            line: 13,
            code: 'OutlinedTextField(...)',
            explanation: 'Le champ de texte avec une bordure contour (le style Material 3 recommandé).'
          },
          {
            line: 20,
            code: 'leadingIcon = { ... }',
            explanation: 'Ajoute une icône à l\'intérieur du champ, à gauche.'
          },
          {
            line: 33,
            code: 'visualTransformation = PasswordVisualTransformation()',
            explanation: 'Masque le texte tapé avec des points (pour les mots de passe).'
          },
          {
            line: 34,
            code: 'keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)',
            explanation: 'Ouvre le clavier optimisé (par exemple, avec la touche @ pour un courriel).'
          }
        ]
      },
      visualMockup: {
        type: 'form-preview',
        title: 'Formulaire de connexion',
        fields: [
          '[ ✉️ Adresse courriel     ]',
          '[ 🔒 Mot de passe         ]',
          '[     Se connecter     ] (Bouton bleu)'
        ]
      },
      commonMistakes: [
        {
          mistake: 'Ne pas configurer les `keyboardOptions`.',
          fix: 'Définissez toujours le bon type de clavier (KeyboardType.Number, KeyboardType.Email, etc.).',
          explanation: 'L\'expérience utilisateur est catastrophique s\'il faut basculer manuellement le clavier vers les symboles pour trouver le @ dans un champ courriel.'
        }
      ],
      quiz: {
        question: 'Comment masquer la saisie d\'un mot de passe dans un TextField ?',
        options: [
          'En utilisant password = true',
          'En modifiant la police pour qu\'elle affiche des étoiles',
          'En appliquant visualTransformation = PasswordVisualTransformation()',
          'En changeant la couleur du texte pour qu\'elle soit transparente'
        ],
        correctIndex: 2,
        explanation: 'PasswordVisualTransformation se charge automatiquement de remplacer chaque caractère tapé par un point de masquage sécurisé.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section Formulaires',
          url: '#'
        }
      ]
    },
    {
      id: 'template-buttons-variants',
      title: 'Boutons : Les 4 variantes Material Design',
      analogy: 'Les boutons, c\'est comme les panneaux de signalisation. L\'arrêt rouge fluo (Filled Button) attire toute ton attention, tandis que le panneau de stationnement blanc et noir (Text Button) est là pour informer sans distraire.',
      definition: 'Material Design propose une hiérarchie de boutons. Utilisez "Button" pour l\'action principale (haute priorité), "ElevatedButton" ou "OutlinedButton" pour les actions secondaires, et "TextButton" pour les actions mineures (comme Annuler).',
      codeExample: {
        code: `@Composable
fun GalerieBoutons() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // 1. Action Principale (Pleine couleur)
        Button(onClick = { }) {
            Icon(Icons.Filled.Check, contentDescription = null)
            Spacer(Modifier.width(8.dp))
            Text("Action Principale (Button)")
        }

        // 2. Action Secondaire avec ombre (Blanc/Clair avec texte coloré)
        ElevatedButton(onClick = { }) {
            Text("Action Secondaire (ElevatedButton)")
        }

        // 3. Action Secondaire sans ombre, avec bordure
        OutlinedButton(onClick = { }) {
            Text("Alternative (OutlinedButton)")
        }

        // 4. Action Tertiaire / Discrète (Juste du texte, pas de fond)
        TextButton(onClick = { }) {
            Text("Action Mineure (TextButton)")
        }
    }
}`,
        lineByLine: [
          {
            line: 9,
            code: 'Button',
            explanation: 'Affiche un fond plein (couleur primary). À n\'utiliser qu\'une ou deux fois par écran pour l\'action la plus importante.'
          },
          {
            line: 16,
            code: 'ElevatedButton',
            explanation: 'Fond de la couleur de la surface avec une légère ombre. Pour une action moins urgente.'
          },
          {
            line: 21,
            code: 'OutlinedButton',
            explanation: 'Pas de fond, juste une bordure. Parfait pour l\'alternative à l\'action principale (ex: Bouton Annuler à côté d\'un bouton Confirmer).'
          },
          {
            line: 26,
            code: 'TextButton',
            explanation: 'Uniquement du texte cliquable. Souvent utilisé dans les boîtes de dialogue.'
          }
        ]
      },
      visualMockup: {
        type: 'components-preview',
        title: 'Variantes de boutons',
        items: [
          '🟦 Action Principale',
          '⬜ Action Secondaire (Ombre)',
          '🔳 Alternative (Bordure)',
          '📄 Action Mineure (Texte seul)'
        ]
      },
      commonMistakes: [
        {
          mistake: 'Mettre 5 boutons pleins (Button) sur le même écran.',
          fix: 'Établissez une hiérarchie visuelle. Utilisez un seul "Button" pour l\'action principale, et des "OutlinedButton" ou "TextButton" pour les autres.',
          explanation: 'Si tout clignote et attire l\'œil avec la même intensité, l\'utilisateur ne sait plus ce qu\'il est censé faire.'
        }
      ],
      quiz: {
        question: 'Quel bouton devriez-vous utiliser pour une action "Annuler" dans un formulaire, juste à côté d\'un bouton "Sauvegarder" (qui est un Button plein) ?',
        options: [
          'Un autre Button (plein) en rouge',
          'Un FloatingActionButton',
          'Un OutlinedButton ou un TextButton',
          'Une icône cliquable cachée'
        ],
        correctIndex: 2,
        explanation: 'Pour guider l\'utilisateur vers l\'action désirée (Sauvegarder), l\'action opposée (Annuler) doit être visuellement moins lourde. Le TextButton est parfait pour cela.'
      },
      furtherReading: [
        {
          title: 'Directives Material Design : Boutons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      ]
    }
  ]
};
