# 📱 Plateforme d'Apprentissage Android — Kotlin & Jetpack Compose (Niveau Cégep)

Ce site web éducatif complet est spécialement conçu pour des étudiants de cégep en informatique n'ayant jamais touché au développement mobile. Il couvre l'intégralité des notes de cours tout en respectant strictement les règles pédagogiques de vulgarisation et de séparation des concepts.

---

## 🌟 Points Forts Pédagogiques

1. **Règle d'or respectée à 100% : Aucune confusion de concepts**
   - L'interface UI (Module 3) est étudiée **nue**, sans mélange avec le style (Module 4) ni avec la logique d'état (Module 6).
2. **Gabarit obligatoire sur chaque leçon** :
   - 💬 **Analogie du quotidien** (sans jargon)
   - 📖 **Définition technique simple**
   - 💻 **Code minimal avec explication ligne par ligne** (avec traduction systématique de tous les termes anglais)
   - 📱 **Visualisation Android simulée** (mockup dynamique sur Pixel 8 en mode clair ou sombre)
   - ⚠️ **Erreurs fréquentes pour un débutant + comment les éviter**
   - ❓ **Exercice pratique interactif** (auto-évaluation avec correction et explication immédiates)
   - 📚 **Pour aller plus loin** (accordéon replié par défaut avec références des notes de cours)
3. **Barre de progression persistante** :
   - Affichage en temps réel de votre position (ex: *"Module 3/12 — UI"*) et du pourcentage global de progression.
   - Suivi sauvegardé dans le navigateur (`localStorage`).
4. **Schémas d'architecture interactifs** :
   - Cycle de vie d'un Composable (*Entrée ➔ Recomposition ➔ Sortie*)
   - Trinité du Layout (*Column vs Row vs Box* avec visualisation interactive)
   - Clean Architecture UDF (*UI ⇄ ViewModel ⇄ Repository ⇄ Room / Retrofit*)
5. **Glossaire global centralisé** :
   - Dictionnaire complet de tous les termes vulgarisés, avec moteur de recherche instantané et analogies.
6. **Recherche instantanée plein texte (Ctrl+K)** :
   - Retrouvez n'importe quelle leçon, composant, analogie ou ligne de code en une frappe.

---

## 📚 Les 12 Modules du Programme

- **Module 1 — Kotlin de base** : Variables (`val`/`var`), types fondamentaux, fonctions & paramètres nommés, `class` vs `data class`, lambdas & trailing lambda, null safety (`?.`, `?:`, `!!`), coroutines.
- **Module 2 — Les fondations de Jetpack Compose** : Qu'est-ce qu'un Composable, annotation `@Composable`, `AndroidManifest.xml`, `MainActivity.kt` (`setContent`), `@Preview`.
- **Module 3 — Les composants d'interface (UI) UNIQUEMENT** : `Text()`, `Column()`, `Row()`, `Box()`, `Image()`, `AsyncImage()`, `Button()`, `TextField()` / `OutlinedTextField()`, `Icon()`, `LazyColumn` / `LazyRow`, `Card()`, `Popup()`, `AlertDialog()`, `Snackbar()`.
- **Module 4 — Le style et les Modifiers UNIQUEMENT** : Règle de l'ordre d'application, `padding()`, `size()`, `fillMaxWidth()`, `background()`, `weight()`, `clickable()`, alignements & arrangements, thèmes Material 3, formes (`clip`), fond d'écran, edge-to-edge.
- **Module 5 — Mise en page globale** : `Scaffold`, zones de l'écran (`topBar`, `bottomBar`, `floatingActionButton`, `content`), `innerPadding`, un scaffold par app vs par écran.
- **Module 6 — Gestion de l'état (State)** : Recomposition, les 3 syntaxes de déclaration (`by mutableStateOf`), `remember` vs `rememberSaveable`, Hissage d'état (`State Hoisting`), `derivedStateOf`, collections réactives (`mutableStateListOf`).
- **Module 7 — Architecture avec ViewModel** : Survie aux rotations, séparation Logique vs UI, `UiState` immuable, `StateFlow` & `asStateFlow()`, `ViewModelFactory`.
- **Module 8 — Effets de bord et asynchrone** : Qu'est-ce qu'un effet secondaire, `LaunchedEffect`, `rememberCoroutineScope` pour les clics et Snackbars.
- **Module 9 — Persistance des données** : Deux besoins distincts, Preferences DataStore (clé-valeur), Base de données Room (`@Entity`, `@Dao`, Repository pattern, migrations de schéma, Flow).
- **Module 10 — Formulaires et CRUD** : `TextField` relié au ViewModel, validation avec `isError` et `supportingText`, opérations CRUD complètes (Ajout, Lecture, Modification avec pré-chargement, Suppression).
- **Module 11 — Données distantes (API REST)** : Principes Client/Serveur, configuration Retrofit, interface d'API (`@GET`, `@POST`, suspend), gestion des états réseau (*Loading, Success, Error*), stratégie *Offline-First* avec Room en cache.
- **Module 12 — Notifications** : Permissions système Android 13+ (`POST_NOTIFICATIONS`), `NotificationChannel`, `NotificationCompat.Builder`, styles riches (`MessagingStyle`), réponse directe (`RemoteInput`), `FullScreenIntent`.

---

## 🚀 Comment lancer le site

Depuis le dossier `sitewebAppMobile` :

```bash
# Pour lancer le serveur de développement :
npm run dev

# Ou pour prévisualiser la version de production optimisée :
npm run preview
```

Ouvrez ensuite simplement l'adresse affichée dans votre navigateur (ex: `http://localhost:5173/` ou `http://localhost:4173/`).
