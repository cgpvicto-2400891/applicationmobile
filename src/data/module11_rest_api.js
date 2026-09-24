// MODULE 11 — Données distantes (API REST)
// Retrofit, appels API, gestion des cas succès/erreur.

export const MODULE_11 = {
  id: 'module-11',
  number: 11,
  title: 'Données distantes (API REST)',
  subtitle: 'Connecter votre application Android au monde extérieur avec Retrofit',
  description: 'Une application isolée est limitée. Pour afficher la météo, un fil d\'actualité ou authentifier des utilisateurs, votre application doit dialoguer avec des serveurs web via des APIs REST.',
  prerequisites: 'Avoir complété le Module 1 (Coroutines) et le Module 7 (ViewModel et UiState).',
  lessons: [
    {
      id: 'rest-api-intro',
      title: 'Introduction aux APIs REST et architecture Client/Serveur',
      analogy: 'Une API REST, c\'est comme le serveur au restaurant : tu es le client à table (l\'application Android), la cuisine est le serveur distant à l\'autre bout du monde. Tu consultes le menu, tu demandes au serveur "Apportez-moi le plat #4" (requête HTTP GET), et le serveur revient de la cuisine avec une assiette bien dressée en format standard (un paquet de données JSON).',
      definition: 'Une API REST (Representational State Transfer) permet à deux ordinateurs de communiquer sur Internet en utilisant le protocole HTTP. L\'application mobile envoie des requêtes (GET pour lire, POST pour envoyer) et reçoit des réponses généralement formatées en JSON (JavaScript Object Notation), un format texte structuré et léger.',
      codeExample: {
        code: `// Exemple de texte JSON renvoyé par un serveur web :
/*
{
    "id": 101,
    "nom": "Ordinateur portable",
    "prix": 899.99,
    "disponible": true
}
*/

// Équivalent en data class Kotlin :
data class Produit(
    val id: Int,
    val nom: String,
    val prix: Double,
    val disponible: Boolean
)`,
        lineByLine: [
          {
            line: 3,
            code: '{ "id": 101, "nom": "Ordinateur portable" ... }',
            explanation: 'Le JSON est du texte pur composé de paires clé-valeur entre accolades.'
          },
          {
            line: 12,
            code: 'data class Produit(...)',
            explanation: 'En Kotlin, on crée une data class miroir dont les propriétés correspondent exactement aux clés du JSON.'
          }
        ]
      },
      visualMockup: {
        type: 'client-server-diagram',
        title: 'Communication HTTP REST',
        req: '📱 Application Android === [ Requête GET /produits ] ===> ☁️ Serveur Web',
        res: '📱 Application Android <=== [ Réponse JSON 200 OK ] === ☁️ Serveur Web'
      },
      commonMistakes: [
        {
          mistake: 'Donner un nom différent dans la data class Kotlin sans faire attention aux minuscules/majuscules du JSON (ex: "idProduit" au lieu de "id").',
          fix: 'Faites correspondre exactement les noms, ou utilisez l\'annotation `@SerializedName("id_produit")` de Gson/Kotlinx Serialization.',
          explanation: 'Le parseur JSON a besoin d\'une correspondance exacte pour remplir les variables de votre objet.'
        }
      ],
      quiz: {
        question: 'Quel est le format d\'échange de données le plus répandu pour les APIs REST mobiles ?',
        options: ['JSON', 'MP3', 'Fichier Word .docx', 'PDF'],
        correctIndex: 0,
        explanation: 'Bravo ! JSON est le standard universel du web pour transmettre des données textuelles structurées.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 72.1 : Application qui se sert d\'informations distantes',
          url: '#',
          note: 'Consulte l\'architecture générale des services web pour mobiles.'
        }
      ]
    },
    {
      id: 'retrofit-setup',
      title: 'Configuration de Retrofit et du convertisseur JSON',
      analogy: 'Retrofit, c\'est comme acheter un adaptateur de prise universel pour voyager : tu branches ton câble d\'appareil québécois d\'un côté (Kotlin) et l\'adaptateur convertit le courant pour qu\'il fonctionne sur le réseau électrique européen (le Web HTTP JSON).',
      definition: 'Retrofit est la bibliothèque client HTTP de référence pour Android, créée par Square. Elle convertit automatiquement votre interface Kotlin en requêtes réseau réelles et utilise un convertisseur (comme Gson ou Kotlinx Serialization) pour traduire instantanément le JSON reçu en objets Kotlin typés.',
      codeExample: {
        code: `import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

// URL de base de l'API (doit TOUJOURS se terminer par un slash '/') :
private const val BASE_URL = "https://api.cegep.qc.ca/v1/"

// Objet Singleton Retrofit :
object RetrofitInstance {
    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create()) // Traducteur JSON -> Kotlin
            .build()
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: 'private const val BASE_URL = "https://api.cegep.qc.ca/v1/"',
            explanation: '"BASE_URL" est l\'adresse racine du serveur. Google et Retrofit exigent qu\'elle finisse par un "/" final.'
          },
          {
            line: 8,
            code: 'val retrofit: Retrofit by lazy {',
            explanation: '"by lazy" retarde l\'initialisation au premier appel pour économiser les ressources mémoire.'
          },
          {
            line: 11,
            code: '.addConverterFactory(GsonConverterFactory.create())',
            explanation: 'Injecte le convertisseur Gson qui transforme le flux texte JSON en data classes Kotlin en un clin d\'œil.'
          }
        ]
      },
      visualMockup: {
        type: 'retrofit-pipeline',
        title: 'La chaîne de conversion Retrofit',
        step1: '1. Texte JSON brut reçu du Web',
        step2: '2. GsonConverterFactory ➔ Décodage automatique',
        step3: '3. Objets Kotlin Produit() prêts à l\'emploi dans le code'
      },
      commonMistakes: [
        {
          mistake: 'Oublier le slash final "/" à la fin de la BASE_URL (ex: "https://api.monsite.com/api").',
          fix: 'Ajoutez TOUJOURS un "/" final : "https://api.monsite.com/api/".',
          explanation: 'Retrofit lancera une exception `IllegalArgumentException: baseUrl must end in /` au premier lancement !'
        }
      ],
      quiz: {
        question: 'Quelle est la règle obligatoire concernant la syntaxe de la `BASE_URL` dans Retrofit ?',
        options: [
          'Elle doit obligatoirement se terminer par un slash final "/"',
          'Elle doit être écrite en lettres minuscules uniquement',
          'Elle doit commencer par "ftp://"',
          'Elle ne doit pas dépasser 10 caractères'
        ],
        correctIndex: 0,
        explanation: 'Exact ! Retrofit combine l\'URL de base et les chemins d\'endpoints selon les standards RFC, ce qui impose le "/" final.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 72.4 : Service Web pour synchroniser les données',
          url: '#',
          note: 'Consulte la configuration des dépendances build.gradle.kts pour Retrofit.'
        }
      ]
    },
    {
      id: 'retrofit-interface',
      title: 'Déclarer l\'interface API Retrofit (@GET, @POST)',
      analogy: 'L\'interface Retrofit, c\'est comme le sommaire d\'un livre de commandes par catalogue : chaque ligne annonce ce que tu peux commander ("Donne-moi la liste des produits") avec le numéro de référence (@GET("produits")), et Retrofit s\'occupe de tout le travail de livraison.',
      definition: 'Avec Retrofit, vous ne tapez aucun code d\'envoi HTTP manuel ! Vous décrivez simplement une interface Kotlin avec des annotations comme `@GET` ou `@POST` et des fonctions marquées du mot-clé `suspend`. Retrofit génère l\'implémentation réseau complète à votre place.',
      codeExample: {
        code: `import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Body

interface CegepApiService {
    // 1. Requête GET pour obtenir la liste de tous les produits :
    @GET("produits")
    suspend fun obtenirProduits(): List<Produit>

    // 2. Requête GET avec paramètre dynamique dans l'URL :
    @GET("produits/{id}")
    suspend fun obtenirProduitParId(@Path("id") idProduit: Int): Produit

    // 3. Requête POST pour envoyer un nouveau produit :
    @POST("produits")
    suspend fun creerProduit(@Body nouveauProduit: Produit): Produit
}`,
        lineByLine: [
          {
            line: 8,
            code: '@GET("produits")',
            explanation: '"@GET" demande à Retrofit d\'effectuer une requête HTTP GET vers https://api.cegep.qc.ca/v1/produits.'
          },
          {
            line: 9,
            code: 'suspend fun obtenirProduits(): List<Produit>',
            explanation: '"suspend" rend la fonction asynchrone (non-bloquante) grâce aux Coroutines. Le type de retour est une liste d\'objets Produit directement typés !'
          },
          {
            line: 12,
            code: '@GET("produits/{id}") ... @Path("id")',
            explanation: '"@Path" remplace automatiquement l\'étiquette {id} dans l\'adresse web par la valeur fournie en paramètre.'
          },
          {
            line: 17,
            code: '@POST("produits") ... @Body nouveauProduit',
            explanation: '"@Body" prend l\'objet Kotlin, le convertit en JSON et le place dans le corps de la requête POST vers le serveur.'
          }
        ]
      },
      visualMockup: {
        type: 'api-endpoints-summary',
        title: 'Endpoints déclarés dans l\'interface',
        ep1: '🟢 GET /produits ➔ Renvoie List<Produit>',
        ep2: '🔵 GET /produits/42 ➔ Renvoie Produit unique #42',
        ep3: '🟠 POST /produits ➔ Envoie Produit en JSON vers la base distante'
      },
      commonMistakes: [
        {
          mistake: 'Mettre un slash au début de l\'annotation (ex: `@GET("/produits")`).',
          fix: 'Écrivez `@GET("produits")` sans slash initial.',
          explanation: 'Mettre un slash initial écraserait le chemin configuré dans la BASE_URL (ex: v1/ serait effacé).'
        }
      ],
      quiz: {
        question: 'Quel mot-clé Kotlin doit obligatoirement précéder vos fonctions d\'API Retrofit pour qu\'elles s\'exécutent de façon non-bloquante ?',
        options: ['async', 'suspend', 'thread', 'coroutine'],
        correctIndex: 1,
        explanation: 'Tout à fait ! "suspend" permet à Kotlin d\'intégrer nativement les appels réseau aux Coroutines.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 72.1 : Retrofit et requêtes REST',
          url: '#',
          note: 'Découvre les requêtes PUT et DELETE dans Retrofit.'
        }
      ]
    },
    {
      id: 'rest-api-states',
      title: 'Gestion robuste des états réseau dans l\'UI (Loading, Success, Error)',
      analogy: 'Les états réseau, c\'est comme commander un colis en ligne : au début, le livreur t\'affiche "Colis en route" avec une barre de progression (Loading) ; s\'il sonne à ta porte avec la boîte, tu as ton cadeau (Success) ; et s\'il y a une tempête de neige et que le camion est bloqué, tu reçois un texto d\'alerte avec un bouton Réessayer (Error).',
      definition: 'Un appel réseau distant peut prendre 300 ms, 5 secondes ou échouer si le Wi-Fi coupe. L\'interface utilisateur ne doit JAMAIS afficher un écran blanc gelé. On modélise l\'état de la requête avec une "sealed interface" à 3 branches : Chargement (Loading), Succès (Success avec données) et Erreur (Error avec message).',
      codeExample: {
        code: `// 1. Modélisation stricte des 3 états possibles :
sealed interface ProduitsUiState {
    data class Succes(val produits: List<Produit>) : ProduitsUiState
    data class Erreur(val message: String) : ProduitsUiState
    object Chargement : ProduitsUiState
}

// 2. Dans le Composable, gestion exhaustive avec "when" :
@Composable
fun EcranProduits(uiState: ProduitsUiState) {
    when (uiState) {
        is ProduitsUiState.Chargement -> {
            // Affiche la roue circulaire de chargement :
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        }
        is ProduitsUiState.Succes -> {
            // Affiche les produits reçus :
            LazyColumn {
                items(uiState.produits) { produit ->
                    Card { Text(produit.nom) }
                }
            }
        }
        is ProduitsUiState.Erreur -> {
            // Affiche le message d'erreur et un bouton pour réessayer :
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(text = "Erreur : \${uiState.message}", color = MaterialTheme.colorScheme.error)
                Button(onClick = { /* Relancer */ }) { Text("Réessayer") }
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 2,
            code: 'sealed interface ProduitsUiState { ... }',
            explanation: '"sealed interface" (interface scellée) garantit que seuls ces 3 cas peuvent exister. Le compilateur nous oblige à tous les gérer dans le "when".'
          },
          {
            line: 14,
            code: 'CircularProgressIndicator()',
            explanation: 'Roue tournante animée officielle de Material Design pendant l\'attente réseau.'
          },
          {
            line: 18,
            code: 'is ProduitsUiState.Succes -> LazyColumn(...)',
            explanation: 'Les données sont arrivées en toute sécurité : on les affiche dans la liste défilante.'
          },
          {
            line: 26,
            code: 'is ProduitsUiState.Erreur -> Button(...) { Text("Réessayer") }',
            explanation: 'L\'expérience utilisateur reste irréprochable : l\'étudiant comprend ce qui cloche et peut retenter.'
          }
        ]
      },
      visualMockup: {
        type: 'network-states-trio',
        title: 'Les 3 écrans de l\'état réseau',
        loading: '⏳ CHARGEMENT : Roue circulaire tournante au milieu de l\'écran',
        success: '✅ SUCCÈS : 10 produits affichés dans une LazyColumn fluide',
        error: '❌ ERREUR : "Serveur injoignable" avec bouton [ Réessayer ]'
      },
      commonMistakes: [
        {
          mistake: 'Faire planter l\'application entière avec un crash rouge si l\'appareil passe sous un tunnel sans connexion (UnknownHostException).',
          fix: 'Enveloppez toujours vos appels Retrofit dans un bloc `try { ... } catch (e: Exception) { ... }` dans le ViewModel.',
          explanation: 'Une panne de réseau ne doit JAMAIS faire crasher l\'application entre les mains de l\'utilisateur.'
        }
      ],
      quiz: {
        question: 'Pourquoi une `sealed interface` est-elle idéale pour représenter les états réseau dans Compose ?',
        options: [
          'Elle oblige le compilateur à vérifier que vous avez géré les cas Loading, Success et Error dans votre when',
          'Elle accélère la vitesse de téléchargement',
          'Elle supprime le besoin de connexion Internet',
          'Elle fonctionne sans Kotlin'
        ],
        correctIndex: 0,
        explanation: 'Exactement ! L\'exhaustivité du mot-clé sealed protège contre les oublis d\'affichage.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 72.3 : Synchronisation et états',
          url: '#',
          note: 'Découvre comment capturer les codes d\'erreur HTTP 404 et 500.'
        }
      ]
    },
    {
      id: 'rest-api-sync-offline',
      title: 'Stratégie de synchronisation : Cache local Room + Données distantes',
      analogy: 'C\'est comme télécharger tes séries préférées sur Netflix avant de prendre l\'avion : quand tu es chez toi avec le Wi-Fi, l\'application télécharge les nouveautés depuis le serveur central. Mais une fois dans l\'avion sans aucun réseau, tu peux continuer à regarder tes vidéos sauvegardées dans la mémoire locale de ton téléphone sans la moindre interruption.',
      definition: 'L\'architecture mobile professionnelle moderne est dite "Offline-First" (priorité au mode hors-ligne). L\'interface utilisateur n\'affiche que les données contenues dans la base locale Room. Le Repository télécharge les mises à jour depuis l\'API Retrofit en arrière-plan et les insère dans Room. Room notifie alors automatiquement l\'UI via son Flow !',
      codeExample: {
        code: `class SynchronisationRepository(
    private val api: CegepApiService,
    private val dao: ProduitDao
) {
    // 1. La source unique de vérité pour l'UI est TOUJOURS Room :
    val produitsLocaux: Flow<List<Produit>> = dao.obtenirTous()

    // 2. Fonction de synchronisation réseau :
    suspend fun rafraichirDepuisLeServeur() {
        try {
            // Télécharge les dernières données depuis l'API distante :
            val donneesDistantes = api.obtenirProduits()
            // Sauvegarde dans la base locale Room :
            dao.insererTous(donneesDistantes)
        } catch (e: Exception) {
            // Si pas d'Internet, pas de panique : les données de Room restent visibles !
            println("Mode hors-ligne : impossible de contacter le serveur distant.")
        }
    }
}`,
        lineByLine: [
          {
            line: 6,
            code: 'val produitsLocaux: Flow<List<Produit>> = dao.obtenirTous()',
            explanation: 'Single Source of Truth : l\'écran observe uniquement Room, assurant une ouverture instantanée même dans le métro sans réseau.'
          },
          {
            line: 12,
            code: 'val donneesDistantes = api.obtenirProduits()',
            explanation: 'Retrofit va chercher les dernières nouveautés publiées sur le serveur.'
          },
          {
            line: 14,
            code: 'dao.insererTous(donneesDistantes)',
            explanation: 'Dès que Room reçoit les nouveautés, son Flow met à jour l\'écran Composable en direct.'
          }
        ]
      },
      visualMockup: {
        type: 'offline-first-architecture',
        title: 'Flux Offline-First (Source unique de vérité)',
        flow: '📱 UI ⬅️ (Observe Flow) ⬅️ 🗄️ Room Local ⬅️ (Met à jour) ⬅️ 🌐 Retrofit Distant'
      },
      commonMistakes: [
        {
          mistake: 'Faire dépendre l\'affichage de l\'application d\'une connexion Internet permanente pour afficher la moindre liste.',
          fix: 'Mettez les données en cache dans Room et lisez la base locale en priorité.',
          explanation: 'Cela offre une rapidité d\'affichage fulgurante (0 ms d\'attente) et rend l\'appli utilisable hors-ligne.'
        }
      ],
      quiz: {
        question: 'Dans une architecture "Offline-First", quelle est la source de données observée directement par l\'interface utilisateur ?',
        options: [
          'La base de données locale Room (qui sert de cache)',
          'Le serveur distant en permanence',
          'Une page Wikipédia',
          'La carte SIM du téléphone'
        ],
        correctIndex: 0,
        explanation: 'Bravo ! La base locale Room agit comme source unique de vérité réactive pour l\'UI.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 72.3 : Synchroniser les données locales avec les distantes',
          url: '#',
          note: 'Consulte la documentation officielle Google sur le guide de l\'architecture des applications.'
        }
      ]
    }
  ]
};
