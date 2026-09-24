// MODULE 10 — Formulaires et CRUD
// TextField avec ViewModel, validation, ajout/modification/suppression d'enregistrements.

export const MODULE_10 = {
  id: 'module-10',
  number: 10,
  title: 'Formulaires et CRUD',
  subtitle: 'Saisie utilisateur, validation de formulaires et cycle CRUD complet',
  description: 'Une application mobile sans formulaires ne permettrait aucune interaction riche. Découvrez comment relier des champs de saisie à un ViewModel, valider des données et implémenter les 4 opérations clés du CRUD.',
  prerequisites: 'Avoir complété le Module 7 (ViewModel) et le Module 9 (Persistance Room).',
  lessons: [
    {
      id: 'crud-intro',
      title: 'Qu\'est-ce que le CRUD ?',
      analogy: 'Le CRUD, c\'est comme gérer son carnet d\'adresses papier : tu peux y inscrire un nouvel ami (Create), feuilleter les pages pour trouver son numéro (Read), raturer son adresse pour écrire la nouvelle lorsqu\'il déménage (Update), ou barrer définitivement la page s\'il s\'agit d\'un vieux contact (Delete).',
      definition: 'Le sigle CRUD désigne les 4 opérations fondamentales de toute application gérant des données : Create (Créer / Insérer), Read (Lire / Afficher), Update (Mettre à jour / Modifier) et Delete (Supprimer). Elles constituent l\'ossature de la grande majorité des applications mobiles professionnelles.',
      codeExample: {
        code: `// Les 4 piliers du CRUD résumés :

// 1. CREATE : Insérer un nouvel enregistrement
suspend fun creerEtudiant(nom: String, courriel: String)

// 2. READ : Lire la liste ou un enregistrement par son identifiant
fun lireTousLesEtudiants(): Flow<List<Etudiant>>
suspend fun lireParId(id: Int): Etudiant?

// 3. UPDATE : Mettre à jour des informations existantes
suspend fun modifierEtudiant(etudiant: Etudiant)

// 4. DELETE : Supprimer un enregistrement de la mémoire/disque
suspend fun supprimerEtudiant(etudiant: Etudiant)`,
        lineByLine: [
          {
            line: 4,
            code: 'suspend fun creerEtudiant(nom: String, courriel: String)',
            explanation: 'Create : création d\'un nouvel objet et insertion dans la base de données.'
          },
          {
            line: 7,
            code: 'fun lireTousLesEtudiants(): Flow<List<Etudiant>>',
            explanation: 'Read : consultation réactive des données.'
          },
          {
            line: 11,
            code: 'suspend fun modifierEtudiant(etudiant: Etudiant)',
            explanation: 'Update : mise à jour des champs d\'une ligne existante.'
          },
          {
            line: 14,
            code: 'suspend fun supprimerEtudiant(etudiant: Etudiant)',
            explanation: 'Delete : retrait définitif de l\'élément.'
          }
        ]
      },
      visualMockup: {
        type: 'crud-matrix',
        title: 'La matrice CRUD en action',
        c: '➕ CREATE ➔ Formulaire d\'ajout avec bouton [ Enregistrer ]',
        r: '👁️ READ ➔ LazyColumn affichant chaque élément dans une Card',
        u: '✏️ UPDATE ➔ Clic sur l\'élément pour pré-remplir le formulaire et modifier',
        d: '🗑️ DELETE ➔ Icône de corbeille pour supprimer instantanément'
      },
      commonMistakes: [
        {
          mistake: 'Supprimer un enregistrement immédiatement au clic sans demander confirmation à l\'utilisateur.',
          fix: 'Associez toujours l\'opération Delete à une boîte de dialogue AlertDialog (vue au Module 3) pour éviter les suppressions accidentelles.',
          explanation: 'Sur un écran tactile, un dérapage du pouce est vite arrivé.'
        }
      ],
      quiz: {
        question: 'Que signifie la lettre "U" dans le sigle CRUD ?',
        options: ['Upload', 'Update (Mettre à jour)', 'Unlock', 'User'],
        correctIndex: 1,
        explanation: 'Bravo ! Update correspond à la mise à jour ou modification d\'un enregistrement existant.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 66 et 68 : Formulaire et modification',
          url: '#',
          note: 'Consulte l\'architecture complète du formulaire CRUD.'
        }
      ]
    },
    {
      id: 'crud-textfield-viewmodel',
      title: 'TextField relié au ViewModel',
      analogy: 'Relier un TextField au ViewModel, c\'est comme dicter un texte à ton secrétaire : chaque fois que tu prononces une lettre (onValueChange), le secrétaire la note dans son grand cahier (le ViewModel), puis te tend la feuille pour que tu voies le texte écrit (la propriété value).',
      definition: 'Pour qu\'un champ de saisie `OutlinedTextField` soit propre et testable, sa valeur ne doit pas être stockée dans une variable locale du composable, mais directement dans l\'état géré par le ViewModel. On connecte `value` à la propriété du ViewModel et `onValueChange` à une méthode de mise à jour.',
      codeExample: {
        code: `// DANS LE VIEWMODEL :
class FormulaireViewModel : ViewModel() {
    var nomSaisi by mutableStateOf("")
        private set

    fun onNomChange(nouveauNom: String) {
        nomSaisi = nouveauNom
    }
}

// DANS LE COMPOSABLE :
@Composable
fun EcranFormulaire(viewModel: FormulaireViewModel = viewModel()) {
    OutlinedTextField(
        value = viewModel.nomSaisi,
        onValueChange = { viewModel.onNomChange(it) },
        label = { Text("Nom complet") },
        modifier = Modifier.fillMaxWidth()
    )
}`,
        lineByLine: [
          {
            line: 3,
            code: 'var nomSaisi by mutableStateOf("") private set',
            explanation: 'La donnée vit dans le ViewModel, protégée contre les modifications externes intempestives.'
          },
          {
            line: 6,
            code: 'fun onNomChange(nouveauNom: String) { nomSaisi = nouveauNom }',
            explanation: 'Méthode dédiée pour recevoir le texte tapé par l\'utilisateur.'
          },
          {
            line: 14,
            code: 'value = viewModel.nomSaisi,',
            explanation: 'Le TextField lit sa valeur directement depuis l\'état du ViewModel.'
          },
          {
            line: 15,
            code: 'onValueChange = { viewModel.onNomChange(it) },',
            explanation: 'Chaque frappe au clavier est transmise au ViewModel qui actualise son état et déclenche la recomposition.'
          }
        ]
      },
      visualMockup: {
        type: 'two-way-binding-demo',
        title: 'Flux de saisie contrôlé par le ViewModel',
        step1: '1. Touche clavier pressée ("M")',
        step2: '2. onValueChange transmet "M" au ViewModel',
        step3: '3. nomSaisi = "M" ➔ Recomposition immédiate',
        step4: '4. Le champ affiche "M" avec fluidité'
      },
      commonMistakes: [
        {
          mistake: 'Garder l\'état du formulaire dans `remember { mutableStateOf("") }` tout en voulant envoyer les données depuis le ViewModel.',
          fix: 'Faites remonter l\'état dans le ViewModel dès le départ.',
          explanation: 'Cela permet au ViewModel de valider les champs au fur et à mesure et de survivre aux rotations d\'écran.'
        }
      ],
      quiz: {
        question: 'Pourquoi préfère-t-on stocker le texte d\'un champ dans le ViewModel plutôt que dans un `remember` local ?',
        options: [
          'Pour que le texte ne disparaisse pas lors d\'une rotation et pour permettre au ViewModel de le valider facilement',
          'Parce que remember est interdit dans les formulaires',
          'Pour rendre le clavier plus grand',
          'Pour désactiver le correcteur orthographique'
        ],
        correctIndex: 0,
        explanation: 'Exactement ! Le ViewModel survit aux changements de configuration et centralise la logique de validation.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 66.1 : TextField et OutlinedTextField',
          url: '#',
          note: 'Consulte la gestion des claviers numériques avec KeyboardOptions.'
        }
      ]
    },
    {
      id: 'crud-validation',
      title: 'Validation des entrées utilisateur et gestion d\'erreurs',
      analogy: 'La validation, c\'est comme l\'agent de sécurité à l\'entrée d\'un manège : si la toise indique que l\'enfant mesure moins d\'un mètre (courriel mal formé ou champ vide), la barrière refuse de s\'ouvrir (le bouton Enregistrer reste grisé) et un voyant rouge s\'allume.',
      definition: 'La validation consiste à vérifier que les données saisies respectent les critères exigés (champ obligatoire non vide, adresse courriel valide avec un "@", longueur minimale). Dans Compose, on utilise le paramètre `isError = true` sur `OutlinedTextField` et on affiche un message d\'erreur d\'aide sous le champ dans `supportingText`.',
      codeExample: {
        code: `class InscriptionViewModel : ViewModel() {
    var courriel by mutableStateOf("")
        private set

    // Règle de validation calculée :
    val estCourrielValide: Boolean
        get() = courriel.contains("@") && courriel.contains(".")

    val formulaireValide: Boolean
        get() = courriel.isNotBlank() && estCourrielValide
}

@Composable
fun ChampCourrielValide(viewModel: InscriptionViewModel = viewModel()) {
    val aUneErreur = viewModel.courriel.isNotEmpty() && !viewModel.estCourrielValide

    Column {
        OutlinedTextField(
            value = viewModel.courriel,
            onValueChange = { viewModel.courriel = it },
            isError = aUneErreur,
            supportingText = {
                if (aUneErreur) {
                    Text(text = "Courriel invalide (doit contenir un @ et un point)", color = MaterialTheme.colorScheme.error)
                }
            }
        )

        // Le bouton reste désactivé tant que la saisie n'est pas correcte :
        Button(
            onClick = { /* Valider */ },
            enabled = viewModel.formulaireValide
        ) {
            Text("Créer mon compte")
        }
    }
}`,
        lineByLine: [
          {
            line: 7,
            code: 'val estCourrielValide: Boolean get() = ...',
            explanation: 'Propriété calculée qui vérifie la présence du symbole "@" et d\'un point.'
          },
          {
            line: 22,
            code: 'isError = aUneErreur,',
            explanation: '"isError = true" colore automatiquement la bordure et le curseur du champ en rouge Material.'
          },
          {
            line: 23,
            code: 'supportingText = { ... }',
            explanation: '"supportingText" (texte d\'accompagnement) affiche le message d\'aide ou d\'erreur juste en dessous du champ.'
          },
          {
            line: 33,
            code: 'enabled = viewModel.formulaireValide',
            explanation: '"enabled = false" grise le bouton et le rend incliquable tant que le formulaire n\'est pas 100% valide.'
          }
        ]
      },
      visualMockup: {
        type: 'validation-preview',
        title: 'Rendu d\'un champ avec erreur de validation',
        field: '🟥 [ test@cegep ] (Bordure rouge vif)',
        errorMsg: '⚠️ Courriel invalide (doit contenir un @ et un point)',
        btn: '🔒 [ Créer mon compte ] (Grisé / Inactif)'
      },
      commonMistakes: [
        {
          mistake: 'Afficher le message d\'erreur en rouge vif dès la première milliseconde où l\'écran s\'ouvre alors que l\'utilisateur n\'a même pas encore commencé à taper.',
          fix: 'Ne montrez l\'erreur que si le champ a déjà été touché ou si `texte.isNotEmpty()`.',
          explanation: 'Agresser l\'utilisateur avec un écran rouge avant même qu\'il n\'ait tapé une seule lettre nuit grandement à l\'expérience utilisateur.'
        }
      ],
      quiz: {
        question: 'Quel paramètre d\'OutlinedTextField active l\'affichage visuel rouge d\'erreur de Material Design ?',
        options: ['hasError = true', 'isError = true', 'redBorder = true', 'alert = true'],
        correctIndex: 1,
        explanation: 'Superbe ! isError = true déclenche la palette de couleurs d\'erreur.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 66.3 : Enregistrement et validation',
          url: '#',
          note: 'Découvre les validateurs de longueur minimale et d\'expressions régulières.'
        }
      ]
    },
    {
      id: 'crud-create-read-delete',
      title: 'Opérations complètes : Ajout, Liste et Suppression',
      analogy: 'C\'est comme un tableau des scores sur un frigo : tu as un bloc de post-it pour ajouter un prénom (Create), la liste des post-it collés (Read), et une poubelle juste à côté où tu jettes les post-it périmés d\'un geste sec (Delete).',
      definition: 'L\'assemblage des opérations Create, Read et Delete combine un formulaire de saisie, un bouton d\'ajout, une LazyColumn avec Card pour chaque élément et un bouton ou icône de corbeille (Icons.Default.Delete) qui déclenche la suppression dans le Repository.',
      codeExample: {
        code: `@Composable
fun GestionTachesEcran(viewModel: TachesViewModel = viewModel()) {
    val taches by viewModel.listeTaches.collectAsState()

    Column(modifier = Modifier.padding(16.dp)) {
        // ZONE 1 : CREATE (Ajout)
        Row(modifier = Modifier.fillMaxWidth()) {
            OutlinedTextField(
                value = viewModel.nouveauTexte,
                onValueChange = { viewModel.nouveauTexte = it },
                modifier = Modifier.weight(1f)
            )
            Button(onClick = { viewModel.ajouterTache() }) {
                Text("Ajouter")
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // ZONE 2 : READ & DELETE (Affichage et suppression)
        LazyColumn {
            items(taches, key = { it.id }) { tache ->
                Card(modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)) {
                    Row(
                        modifier = Modifier.padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = tache.titre)
                        IconButton(onClick = { viewModel.supprimerTache(tache) }) {
                            Icon(Icons.Default.Delete, contentDescription = "Supprimer")
                        }
                    }
                }
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 7,
            code: 'Row(modifier = Modifier.fillMaxWidth()) { ... }',
            explanation: 'La rangée supérieure combine le champ texte et le bouton d\'ajout sur la même ligne grâce à .weight(1f).'
          },
          {
            line: 20,
            code: 'items(taches, key = { it.id }) { tache ->',
            explanation: 'Toujours fournir un paramètre "key" unique pour que Compose anime proprement l\'ajout et la suppression des lignes !'
          },
          {
            line: 27,
            code: 'IconButton(onClick = { viewModel.supprimerTache(tache) }) {',
            explanation: 'Un bouton d\'icône qui demande au ViewModel de supprimer l\'enregistrement ciblé.'
          }
        ]
      },
      visualMockup: {
        type: 'crud-dashboard-preview',
        title: 'Écran complet Create / Read / Delete',
        createBar: '[ Champ nouvelle tâche ] [ + Ajouter ]',
        item1: 'Card 1 : Acheter lait | 🗑️',
        item2: 'Card 2 : TP Android Cégep | 🗑️'
      },
      commonMistakes: [
        {
          mistake: 'Oublier le paramètre `key = { it.id }` dans `items(taches)` de la LazyColumn.',
          fix: 'Spécifiez toujours l\'identifiant unique de chaque entité.',
          explanation: 'Sans clé unique, lorsqu\'une ligne est supprimée au milieu, Compose risque de redessiner les mauvais éléments ou de perdre les animations.'
        }
      ],
      quiz: {
        question: 'Pourquoi est-il primordial de renseigner `key = { it.id }` dans les listes `items()` ?',
        options: [
          'Pour crypter les données de l\'utilisateur',
          'Pour que Compose suive précisément l\'identité de chaque ligne lors des ajouts et suppressions',
          'Pour changer la couleur de l\'icône de suppression',
          'Pour activer le Wi-Fi'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! La clé permet à Compose de savoir quel élément précis a été retiré sans tout recalculer.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 55.1 et 66.3 : Listes et enregistrement',
          url: '#',
          note: 'Découvre comment animer les suppressions avec Modifier.animateItemPlacement().'
        }
      ]
    },
    {
      id: 'crud-update-form',
      title: 'Modification d\'un enregistrement : Chargement et mise à jour',
      analogy: 'Modifier un enregistrement, c\'est comme apporter sa voiture au garage avec sa fiche technique : le garagiste ne repart pas d\'une feuille blanche, il sort ton dossier, charge ton kilométrage actuel sur son écran (chargement préalable), change la ligne d\'huile et sauvegarde la fiche mise à jour.',
      definition: 'L\'opération Update exige deux étapes distinctes : 1) Récupérer l\'enregistrement ciblé dans la base de données pour pré-remplir les champs du formulaire avec ses données existantes, et 2) Exécuter la fonction `repository.modifier(entite.copy(...))` lorsque l\'utilisateur clique sur "Enregistrer les modifications".',
      codeExample: {
        code: `class ModifierEtudiantViewModel(
    private val repository: EtudiantRepository,
    private val idEtudiant: Int
) : ViewModel() {
    var nomSaisi by mutableStateOf("")
    var courrielSaisi by mutableStateOf("")

    init {
        // ÉTAPE 1 : Pré-charger les données actuelles de l'enregistrement
        viewModelScope.launch {
            val etudiantExistant = repository.obtenirParId(idEtudiant)
            etudiantExistant?.let {
                nomSaisi = it.nom
                courrielSaisi = it.courriel
            }
        }
    }

    // ÉTAPE 2 : Sauvegarder la version modifiée
    fun sauvegarderModifications() {
        viewModelScope.launch {
            val etudiantAJour = Etudiant(
                id = idEtudiant, // Conserve le MÊME identifiant clé primaire !
                nom = nomSaisi,
                courriel = courrielSaisi,
                age = 20
            )
            repository.modifierEtudiant(etudiantAJour)
        }
    }
}`,
        lineByLine: [
          {
            line: 8,
            code: 'init { viewModelScope.launch { ... } }',
            explanation: 'Dès que le ViewModel est créé, il va chercher l\'enregistrement existant dans la base Room.'
          },
          {
            line: 12,
            code: 'nomSaisi = it.nom; courrielSaisi = it.courriel',
            explanation: 'Les champs du formulaire s\'ouvrent déjà pré-remplis avec les données actuelles.'
          },
          {
            line: 21,
            code: 'id = idEtudiant, // Conserve le MÊME id !',
            explanation: 'RÈGLE CRITIQUE : Conserver le même id permet à SQLite de faire un "UPDATE ... WHERE id = :id" au lieu d\'un nouvel ajout.'
          }
        ]
      },
      visualMockup: {
        type: 'update-flow-card',
        title: 'Cinématique de modification (Update)',
        step1: '1. Clic sur l\'étudiant #42 dans la liste',
        step2: '2. Ouverture du formulaire ➔ Champs pré-remplis : "Marc Tremblay"',
        step3: '3. Modification du texte ➔ "Marc-André Tremblay"',
        step4: '4. Clic [ Sauvegarder ] ➔ UPDATE SQL exécuté avec succès'
      },
      commonMistakes: [
        {
          mistake: 'Mettre `id = 0` dans l\'objet envoyé à `@Update`.',
          fix: 'Fournissez TOUJOURS l\'identifiant réel de l\'objet existant (`id = idEtudiant`).',
          explanation: 'Si vous laissez id = 0, Room cherchera la ligne 0, ne trouvera rien et la mise à jour ne modifiera aucune ligne !'
        }
      ],
      quiz: {
        question: 'Quelle est la condition indispensable pour que Room puisse exécuter une commande `@Update` sur la bonne ligne ?',
        options: [
          'Avoir une connexion Internet active',
          'L\'objet entité doit contenir l\'identifiant exact (@PrimaryKey) de la ligne existante',
          'La couleur de l\'écran doit être rouge',
          'Le texte doit être écrit en majuscules'
        ],
        correctIndex: 1,
        explanation: 'Bravo ! C\'est la valeur de la @PrimaryKey qui permet à SQL de savoir quelle ligne exacte modifier.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 68.1 : Retrouver les données de l\'enregistrement à modifier',
          url: '#',
          note: 'Consulte l\'usage des paramètres de navigation pour transmettre l\'ID.'
        }
      ]
    }
  ]
};
