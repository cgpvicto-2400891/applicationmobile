// MODULE 9 — Persistance des données
// Preferences DataStore vs Base de données Room (entités, DAO, repository, migrations)

export const MODULE_9 = {
  id: 'module-9',
  number: 9,
  title: 'Persistance des données',
  subtitle: 'Sauvegarder vos données de façon durable sur le stockage du téléphone',
  description: 'Si l\'utilisateur éteint son téléphone, toutes les variables en mémoire vive s\'envolent ! Découvrez les deux solutions officielles d\'Android pour rendre vos données permanentes : Preferences DataStore et Room Database.',
  prerequisites: 'Avoir complété le Module 7 (ViewModel) et le Module 8 (Coroutines et Flow).',
  lessons: [
    {
      id: 'persistence-two-solutions',
      title: 'Deux besoins, deux solutions de stockage distinctes',
      analogy: 'Pour ranger tes affaires à la maison, tu as deux meubles très différents : une petite coupelle sur la table d\'entrée pour déposer tes clés de maison (DataStore pour des réglages simples), et une grande armoire avec des tiroirs étiquetés pour classer tes 500 dossiers administratifs (Room pour des données tabulaires complexes).',
      definition: 'Android propose deux technologies de persistance modernes : 1) "Preferences DataStore" pour enregistrer de simples paires clé-valeur (ex: thème sombre activé, nom d\'utilisateur, volume audio), et 2) "Room Database" pour gérer des données relationnelles structurées et volumineuses avec requêtes SQL complexes, clés primaires et relations.',
      codeExample: {
        code: `// QUELLE SOLUTION CHOISIR ?

// SCÉNARIO 1 : Enregistrer le choix "Mode Sombre" (Vrai ou Faux)
// ➔ RÉPONSE : Preferences DataStore (Clé: "is_dark_mode" -> Valeur: true)

// SCÉNARIO 2 : Enregistrer une liste de 1200 produits avec prix, catégorie et stock
// ➔ RÉPONSE : Base de données Room (Table SQL avec requêtes WHERE, ORDER BY...)`,
        lineByLine: [
          {
            line: 3,
            code: '// SCÉNARIO 1 : Mode Sombre',
            explanation: 'Inutile de créer une base de données SQL pour un simple booléen : Preferences DataStore est 10 fois plus léger et rapide à mettre en place.'
          },
          {
            line: 6,
            code: '// SCÉNARIO 2 : 1200 produits avec filtres',
            explanation: 'Dès qu\'on a besoin de filtrer, trier, faire des recherches textuelles ou paginer des données, Room est la solution professionnelle incontournable.'
          }
        ]
      },
      visualMockup: {
        type: 'persistence-decision-tree',
        title: 'Arbre de décision : Quel outil choisir ?',
        light: '🔑 Clé-Valeur simple (paramètres, réglages) ➔ Preferences DataStore',
        heavy: '🗄️ Données structurées / Listes (étudiants, commandes) ➔ Room Database'
      },
      commonMistakes: [
        {
          mistake: 'Utiliser l\'ancienne bibliothèque obsolète "SharedPreferences".',
          fix: 'Google a déprécié SharedPreferences au profit de DataStore, car SharedPreferences bloquait le thread UI et provoquait des plantages.',
          explanation: 'DataStore est entièrement asynchrone, sécurisé et basé sur les coroutines Kotlin et Flow.'
        }
      ],
      quiz: {
        question: 'Quel outil de stockage devez-vous privilégier pour mémoriser si l\'utilisateur souhaite recevoir ou non les notifications sonores ?',
        options: ['Room Database avec 3 tables', 'Preferences DataStore', 'Un fichier XML sur une disquette', 'Firebase Firestore uniquement'],
        correctIndex: 1,
        explanation: 'Excellent ! Un simple booléen de réglage est le cas d\'usage idéal pour Preferences DataStore.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 32.2 et 32.3 : DataStore vs SharedPreferences',
          url: '#',
          note: 'Pourquoi Google a remplacé SharedPreferences par DataStore.'
        }
      ]
    },
    {
      id: 'datastore-preferences',
      title: 'Preferences DataStore : Clé-valeur moderne et asynchrone',
      analogy: 'Preferences DataStore, c\'est comme un carnet de post-it numérique dans le téléphone : chaque note porte un mot-clé (la clé) et une information collée dessus (la valeur). Quand tu demandes à lire une note, il te la tend sans jamais bloquer ce que tu es en train de faire.',
      definition: 'Preferences DataStore stocke des données de type clé-valeur de manière transactionnelle et asynchrone grâce aux Coroutines et à Flow de Kotlin. L\'écriture se fait via la fonction `edit { }` et la lecture produit un flux continu `Flow`.',
      codeExample: {
        code: `import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit

// 1. Définition de la clé typée :
val CLE_MODE_SOMBRE = booleanPreferencesKey("mode_sombre_actif")

// 2. Sauvegarder une valeur (suspend fun) :
suspend fun sauvegarderModeSombre(context: Context, actif: Boolean) {
    context.dataStore.edit { preferences ->
        preferences[CLE_MODE_SOMBRE] = actif
    }
}

// 3. Lire la valeur en continu sous forme de Flow :
fun lireModeSombre(context: Context): Flow<Boolean> {
    return context.dataStore.data.map { preferences ->
        preferences[CLE_MODE_SOMBRE] ?: false // Valeur par défaut
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: 'val CLE_MODE_SOMBRE = booleanPreferencesKey("mode_sombre_actif")',
            explanation: 'DataStore exige des clés fortement typées pour empêcher d\'écrire un texte dans une case booléenne.'
          },
          {
            line: 9,
            code: 'context.dataStore.edit { preferences ->',
            explanation: '"edit" est une fonction suspendue qui effectue une transaction sécurisée sans risquer de corrompre le fichier.'
          },
          {
            line: 16,
            code: 'context.dataStore.data.map { ... }',
            explanation: 'Renvoie un "Flow" : chaque fois que la préférence est modifiée sur le disque, l\'interface est automatiquement prévenue !'
          }
        ]
      },
      visualMockup: {
        type: 'datastore-storage-card',
        title: 'Fichier de préférences DataStore',
        key1: '🔑 "mode_sombre_actif" ➔ 🟢 true',
        key2: '🔑 "nom_utilisateur" ➔ 👤 "Alexandre"',
        key3: '🔑 "volume_sonore" ➔ 🔊 80'
      },
      commonMistakes: [
        {
          mistake: 'Essayer de faire un appel bloquant synchrone pour lire DataStore dans le thread principal.',
          fix: 'Collectez toujours le flux Flow dans votre ViewModel via un StateFlow ou dans un LaunchedEffect.',
          explanation: 'DataStore est conçu pour ne jamais ralentir l\'interface utilisateur.'
        }
      ],
      quiz: {
        question: 'Comment s\'appelle la fonction suspendue utilisée pour écrire ou modifier une donnée dans Preferences DataStore ?',
        options: ['dataStore.write()', 'dataStore.edit { }', 'dataStore.saveNow()', 'dataStore.commit()'],
        correctIndex: 1,
        explanation: 'Parfait ! edit { } garantit que la mise à jour s\'exécute de façon atomique et sécurisée.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 32.2 : Travailler avec Preferences DataStore',
          url: '#',
          note: 'Consulte l\'extension pour créer l\'instance unique de dataStore.'
        }
      ]
    },
    {
      id: 'room-entities',
      title: 'Room : Les Entités (@Entity)',
      analogy: 'Une Entité Room, c\'est comme le modèle d\'une fiche cartonnée dans un classeur médical : elle définit exactement quelles cases doivent être remplies pour chaque patient (nom, numéro de dossier unique, date de naissance).',
      definition: 'Dans la bibliothèque de persistance Room, une "Entité" est une data class Kotlin annotée avec `@Entity`. Chaque entité correspond directement à une table dans la base de données SQLite sous-jacente, et chaque propriété de la classe devient une colonne de cette table.',
      codeExample: {
        code: `import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.ColumnInfo

@Entity(tableName = "etudiants")
data class Etudiant(
    // Clé primaire avec auto-incrémentation automatique (1, 2, 3...) :
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,

    @ColumnInfo(name = "nom_complet")
    val nom: String,

    val courriel: String,

    val age: Int
)`,
        lineByLine: [
          {
            line: 5,
            code: '@Entity(tableName = "etudiants")',
            explanation: '"@Entity" ordonne à Room de créer une table SQL nommée "etudiants".'
          },
          {
            line: 8,
            code: '@PrimaryKey(autoGenerate = true) val id: Int = 0',
            explanation: '"@PrimaryKey" définit la clé unique obligatoire. "autoGenerate = true" confie à SQLite le soin d\'incrémenter l\'id automatiquement.'
          },
          {
            line: 11,
            code: '@ColumnInfo(name = "nom_complet")',
            explanation: '"@ColumnInfo" permet de renommer la colonne SQL si on souhaite un nom différent du champ Kotlin.'
          }
        ]
      },
      visualMockup: {
        type: 'sql-table-preview',
        title: 'Table SQL générée : "etudiants"',
        headers: ['id (PK)', 'nom_complet', 'courriel', 'age'],
        row1: ['1', 'Tremblay, Marc', 'marc@cegep.ca', '19'],
        row2: ['2', 'Gagnon, Julie', 'julie@cegep.ca', '20']
      },
      commonMistakes: [
        {
          mistake: 'Oublier d\'annoter la clé primaire `@PrimaryKey` sur une entité.',
          fix: 'Chaque table Room DOIT posséder obligatoirement au moins une clé primaire.',
          explanation: 'Sans clé primaire, SQLite ne peut pas identifier ni modifier un enregistrement unique avec certitude.'
        }
      ],
      quiz: {
        question: 'À quoi correspond une classe Kotlin annotée avec `@Entity` dans Room ?',
        options: [
          'À un fichier image PNG',
          'À une table dans la base de données SQLite',
          'À un bouton sur l\'écran',
          'À un thread de coroutine'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! Chaque @Entity devient une table SQL et chaque instance devient une ligne de données.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 53.1 et 53.2 : Installation et Entités Room',
          url: '#',
          note: 'Découvre comment configurer les clés étrangères et les index.'
        }
      ]
    },
    {
      id: 'room-dao',
      title: 'Room : Le DAO (Data Access Object)',
      analogy: 'Le DAO, c\'est comme le guichetier d\'une bibliothèque municipale : tu n\'as pas le droit d\'entrer toi-même fouiller dans les archives poussiéreuses sous le plancher. Tu t\'adresses au guichetier avec une demande précise ("Donne-moi tous les livres de science-fiction"), et il te rapporte exactement ce que tu as demandé.',
      definition: 'Le DAO (Data Access Object) est une interface Kotlin annotée avec `@Dao`. Il contient les méthodes qui exécutent les opérations SQL sur la base de données. Room se charge de vérifier la syntaxe SQL à la compilation et génère le code d\'exécution réel.',
      codeExample: {
        code: `import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface EtudiantDao {
    // 1. Obtenir tous les étudiants en temps réel via Flow :
    @Query("SELECT * FROM etudiants ORDER BY nom_complet ASC")
    fun obtenirTous(): Flow<List<Etudiant>>

    // 2. Insérer un nouvel étudiant (suspendu pour ne pas bloquer l'UI) :
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun inserer(etudiant: Etudiant)

    // 3. Modifier un étudiant existant :
    @Update
    suspend fun modifier(etudiant: Etudiant)

    // 4. Supprimer un étudiant :
    @Delete
    suspend fun supprimer(etudiant: Etudiant)
}`,
        lineByLine: [
          {
            line: 4,
            code: '@Dao interface EtudiantDao {',
            explanation: '"@Dao" signale à Room que cette interface rassemble les opérations de base de données.'
          },
          {
            line: 7,
            code: '@Query("SELECT * FROM etudiants ORDER BY nom_complet ASC")',
            explanation: '"@Query" permet d\'écrire du vrai SQL. Room vérifie lors de la compilation que la table et les colonnes existent bien !'
          },
          {
            line: 8,
            code: 'fun obtenirTous(): Flow<List<Etudiant>>',
            explanation: 'En renvoyant un "Flow", la fonction notifiera automatiquement l\'application dès qu\'une modification survient dans la table !'
          },
          {
            line: 12,
            code: '@Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun inserer(...)',
            explanation: '"suspend" garantit que l\'écriture sur disque s\'exécute en arrière-plan sans geler l\'écran.'
          }
        ]
      },
      visualMockup: {
        type: 'dao-methods-card',
        title: 'Les 4 commandes maîtresses du DAO',
        m1: '📥 @Query("SELECT...") ➔ Récupère les enregistrements (avec Flow)',
        m2: '➕ @Insert ➔ Ajoute un nouvel objet dans la table',
        m3: '✏️ @Update ➔ Met à jour un enregistrement existant (via son id)',
        m4: '🗑️ @Delete ➔ Supprime une ligne précise'
      },
      commonMistakes: [
        {
          mistake: 'Faire une faute de frappe dans la requête SQL de `@Query` (ex: "SELECT * FROM etudiant_inexistant").',
          fix: 'Room vérifie vos requêtes SQL DÈS LA COMPILATION ! Corrigez le nom selon votre `@Entity(tableName = "...")`.',
          explanation: 'Contrairement au SQLite traditionnel où l\'erreur survenait pendant l\'utilisation chez le client, Room stoppe l\'erreur immédiatement dans Android Studio.'
        }
      ],
      quiz: {
        question: 'Pourquoi la fonction `obtenirTous()` du DAO renvoie-t-elle un `Flow<List<Etudiant>>` ?',
        options: [
          'Pour que la liste se mette à jour toute seule dans l\'interface dès qu\'un étudiant est ajouté ou modifié en base',
          'Pour envoyer la liste sur Facebook',
          'Pour effacer la base de données',
          'Parce que Room ne supporte pas les listes normales'
        ],
        correctIndex: 0,
        explanation: 'Bravo ! Flow rend votre base de données réactive : tout changement sur le disque se propage instantanément à l\'écran.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 53.3 : Le DAO',
          url: '#',
          note: 'Découvre comment passer des paramètres dans les requêtes avec `:id`.'
        }
      ]
    },
    {
      id: 'room-repository',
      title: 'Le patron Dépôt (Repository Pattern)',
      analogy: 'Le Repository, c\'est comme le comptoir d\'un magasin de pièces automobiles : le mécanicien (le ViewModel) demande un filtre à huile au comptoir. Il ne sait pas et ne veut pas savoir si le magasinier va chercher le filtre dans l\'étagère du magasin local (Room) ou s\'il le commande en urgence à l\'usine en Allemagne (API Web).',
      definition: 'Le Repository (Dépôt) est une classe intermédiaire dont la responsabilité est d\'abstraire les sources de données pour le reste de l\'application. Le ViewModel ne communique jamais directement avec le DAO de Room ni avec les clients HTTP : il s\'adresse exclusivement au Repository, garantissant une architecture propre et découplée.',
      codeExample: {
        code: `class EtudiantRepository(private val etudiantDao: EtudiantDao) {
    // Expose le flux de données propre sans détails SQL :
    val tousLesEtudiants: Flow<List<Etudiant>> = etudiantDao.obtenirTous()

    suspend fun ajouterEtudiant(etudiant: Etudiant) {
        etudiantDao.inserer(etudiant)
    }

    suspend fun supprimerEtudiant(etudiant: Etudiant) {
        etudiantDao.supprimer(etudiant)
    }
}`,
        lineByLine: [
          {
            line: 1,
            code: 'class EtudiantRepository(private val etudiantDao: EtudiantDao) {',
            explanation: 'Le Repository reçoit le DAO par injection de dépendances dans son constructeur.'
          },
          {
            line: 3,
            code: 'val tousLesEtudiants: Flow<List<Etudiant>> = etudiantDao.obtenirTous()',
            explanation: 'Redirige le flux de données réactif vers le ViewModel.'
          },
          {
            line: 5,
            code: 'suspend fun ajouterEtudiant(...)',
            explanation: 'Fournit une API claire et expressive pour les opérations métier.'
          }
        ]
      },
      visualMockup: {
        type: 'repository-architecture-pipe',
        title: 'La chaîne de Clean Architecture Android',
        flow: 'UI (Composable) ⇄ ViewModel ⇄ Repository ⇄ Room DAO / API Web'
      },
      commonMistakes: [
        {
          mistake: 'Faire des appels directs à la base de données Room depuis un Composable ou directement depuis le ViewModel.',
          fix: 'Passez toujours par une classe Repository.',
          explanation: 'Si un jour vous décidez d\'ajouter un cache ou de synchroniser vos données avec une API web, vous n\'aurez qu\'à modifier le Repository sans jamais toucher au ViewModel ni aux écrans !'
        }
      ],
      quiz: {
        question: 'Quel est le rôle fondamental d\'un Repository en architecture Android ?',
        options: [
          'Changer la police de caractères des boutons',
          'Servir d\'intermédiaire unique et masquer la provenance des données vis-à-vis du ViewModel',
          'Installer l\'application sur le Play Store',
          'Rendre le téléphone étanche à l\'eau'
        ],
        correctIndex: 1,
        explanation: 'Exact ! C\'est la source unique de vérité ("Single Source of Truth") pour les données.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 53.4 : Le dépôt de données (repository)',
          url: '#',
          note: 'Découvre comment organiser les classes dans le dossier data/repository.'
        }
      ]
    },
    {
      id: 'room-database-migrations',
      title: 'La classe RoomDatabase et la gestion des versions',
      analogy: 'La classe RoomDatabase, c\'est comme l\'acte notarié de fondation d\'une maison : il consigne la liste exacte des pièces existantes (la liste des entités) et le numéro de version du plan cadastral (version = 1, 2...). Si tu ajoutes un garage plus tard, le notaire doit consigner une mise à jour officielle (une migration).',
      definition: 'La classe abstraite annotée `@Database` hérite de `RoomDatabase`. Elle rassemble toutes les entités de votre projet, spécifie le numéro de version de la base, et fournit des méthodes d\'accès à chaque DAO. C\'est elle que vous instanciez via `Room.databaseBuilder()`.',
      codeExample: {
        code: `import androidx.room.Database
import androidx.room.RoomDatabase

@Database(entities = [Etudiant::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    // Méthode abstraite permettant d'obtenir le DAO :
    abstract fun etudiantDao(): EtudiantDao
}

// Instanciation de la base (Singleton) :
val db = Room.databaseBuilder(
    context.applicationContext,
    AppDatabase::class.java,
    "gestion_cegep.db"
).build()`,
        lineByLine: [
          {
            line: 4,
            code: '@Database(entities = [Etudiant::class], version = 1, ...)',
            explanation: '"entities" liste toutes les tables. "version = 1" est le numéro de version initial du schéma SQL.'
          },
          {
            line: 5,
            code: 'abstract class AppDatabase : RoomDatabase() {',
            explanation: 'Classe abstraite : Room génère son implémentation concrète automatiquement en coulisses.'
          },
          {
            line: 7,
            code: 'abstract fun etudiantDao(): EtudiantDao',
            explanation: 'Permet à l\'application d\'obtenir l\'instance du DAO pour exécuter les requêtes.'
          },
          {
            line: 14,
            code: '"gestion_cegep.db"',
            explanation: 'Le nom du fichier physique créé sur la mémoire interne du téléphone.'
          }
        ]
      },
      visualMockup: {
        type: 'database-builder-card',
        title: 'Fondations de la base Room',
        dbName: '📁 Fichier : "gestion_cegep.db"',
        version: '🔢 Version schéma : 1',
        entities: '📋 Tables enregistrées : [ Etudiant ]'
      },
      commonMistakes: [
        {
          mistake: 'Modifier la structure d\'une entité (ex: ajouter un champ) sans changer le numéro de version, provoquant un crash au démarrage ("IllegalStateException: Room cannot verify the data integrity").',
          fix: 'Dès que vous ajoutez ou modifiez une colonne, incrémentez `version = 2` et configurez une migration ou utilisez `fallbackToDestructiveMigration()` en phase d\'apprentissage.',
          explanation: 'SQLite refuse d\'ouvrir une base dont la structure sur disque ne correspond plus à celle du code Kotlin.'
        }
      ],
      quiz: {
        question: 'Que devez-vous obligatoirement faire si vous ajoutez une nouvelle propriété dans une classe `@Entity` existante ?',
        options: [
          'Désinstaller Android Studio',
          'Incrémenter le numéro de version dans `@Database(version = ...)` et gérer la migration',
          'Acheter un nouveau téléphone',
          'Renommer la fonction MainActivity'
        ],
        correctIndex: 1,
        explanation: 'Tout à fait ! Modifier la structure de table requiert d\'incrémenter le numéro de version du schéma.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 58.2 et 58.3 : Gérer les versions de la base de données',
          url: '#',
          note: 'Consulte fallbackToDestructiveMigration() et les migrations manuelles.'
        }
      ]
    },
    {
      id: 'room-viewmodel-flow',
      title: 'Connecter Room au ViewModel et à l\'UI avec Flow',
      analogy: 'C\'est comme un robinet magique connecté directement au lac : dès qu\'une pluie tombe sur le lac (une nouvelle ligne insérée en base), l\'eau coule instantanément du robinet dans ton verre dans la cuisine (l\'écran Composable), sans que tu aies besoin d\'aller pomper à la main.',
      definition: 'Grâce à la synergie entre Room, Flow et Jetpack Compose, connecter votre base de données à l\'écran se fait de manière entièrement réactive : le DAO émet un `Flow`, le ViewModel le convertit en `StateFlow` via `.stateIn()`, et l\'écran le consomme avec `collectAsState()`. Tout ajout dans la base redessine l\'écran instantanément !',
      codeExample: {
        code: `// DANS LE VIEWMODEL :
class EtudiantViewModel(private val repository: EtudiantRepository) : ViewModel() {
    
    // Conversion directe du Flow Room en StateFlow prêt pour l'UI :
    val listeEtudiants: StateFlow<List<Etudiant>> = repository.tousLesEtudiants
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun ajouter(nom: String, courriel: String) {
        viewModelScope.launch {
            repository.ajouterEtudiant(Etudiant(nom = nom, courriel = courriel, age = 20))
        }
    }
}

// DANS LE COMPOSABLE :
@Composable
fun EcranListeEtudiants(viewModel: EtudiantViewModel = viewModel()) {
    val etudiants by viewModel.listeEtudiants.collectAsState()

    LazyColumn {
        items(etudiants) { etudiant ->
            Card { Text(etudiant.nom) }
        }
    }
}`,
        lineByLine: [
          {
            line: 6,
            code: 'val listeEtudiants: StateFlow<List<Etudiant>> = repository.tousLesEtudiants.stateIn(...)',
            explanation: '"stateIn" transforme le flux de base de données en StateFlow officiel pour l\'UI avec mise en cache.'
          },
          {
            line: 13,
            code: 'viewModelScope.launch { repository.ajouterEtudiant(...) }',
            explanation: '"viewModelScope" est le scope de coroutine automatique lié à la vie du ViewModel.'
          },
          {
            line: 22,
            code: 'val etudiants by viewModel.listeEtudiants.collectAsState()',
            explanation: 'L\'interface observe le flux. Dès qu\'une insertion Room se produit, la LazyColumn se recompose automatiquement.'
          }
        ]
      },
      visualMockup: {
        type: 'reactive-database-ui',
        title: 'Cycle réactif complet Room ➔ Compose',
        step1: '1. Clic utilisateur [ + Ajouter Marc ]',
        step2: '2. Insertion SQL asynchrone dans Room SQLite',
        step3: '3. Room émet la nouvelle liste dans le Flow',
        step4: '4. LazyColumn affiche instantanément le nouvel étudiant !'
      },
      commonMistakes: [
        {
          mistake: 'Tenter de faire une requête d\'insertion en base directement dans le thread principal sans passer par `viewModelScope.launch`.',
          fix: 'Room interdit formellement les requêtes en écriture sur le thread principal pour éviter de figer l\'interface.',
          explanation: 'Lancer l\'opération dans une coroutine garantit la parfaite fluidité de l\'écran.'
        }
      ],
      quiz: {
        question: 'Quel opérateur utilise-t-on dans le ViewModel pour convertir le `Flow` de Room en un `StateFlow` observable par Compose ?',
        options: ['convertToState()', 'stateIn()', 'flowToView()', 'saveToUI()'],
        correctIndex: 1,
        explanation: 'Bravo ! `.stateIn(viewModelScope, ...)` est l\'opérateur standard recommandé par Google.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 53.6 : Utiliser le dépôt via le ViewModel',
          url: '#',
          note: 'Consulte l\'exemple complet de gestion d\'état avec Room.'
        }
      ]
    }
  ]
};
