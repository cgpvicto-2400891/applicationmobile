export const MODULE_19 = {
  id: 'module-19',
  number: 19,
  title: 'Projet Synthèse : L\'App Complète',
  subtitle: 'Assembler ViewModel, Coroutines, Navigation et UI dans un seul projet',
  description: 'Vous avez appris chaque brique individuellement. Il est temps de construire la maison complète ! Voici le code intégral d\'une mini-application "Météo" qui télécharge des données (Coroutines), conserve son état (ViewModel), affiche le résultat (UI) et change d\'écran (Navigation).',
  prerequisites: 'Avoir complété les modules sur le ViewModel (Mod 7), les Coroutines (Mod 8) et la Navigation (Mod 13).',
  lessons: [
    {
      id: 'full-app-monolithic',
      title: 'Code complet : MainActivity.kt',
      analogy: 'Au lieu de te donner les pièces du puzzle une par une, voici le puzzle entièrement assemblé. Tu peux copier ce bloc entier, le coller dans ton projet, et l\'exécuter pour voir comment la magie opère.',
      definition: 'Ce fichier complet intègre toutes les couches d\'une architecture moderne : Les imports, le ViewModel (pour la logique et les coroutines), et la fonction Compose principale avec son NavHost (pour l\'interface et la navigation).',
      codeExample: {
        code: `package com.moncegep.appmeteo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

// ==========================================
// 1. LE VIEWMODEL (La logique et les données)
// ==========================================
class MeteoViewModel : ViewModel() {
    private val _meteoList = MutableStateFlow<List<String>>(emptyList())
    val meteoList: StateFlow<List<String>> = _meteoList.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    init {
        chargerDonnees()
    }

    private fun chargerDonnees() {
        // Lance une coroutine liée au cycle de vie du ViewModel
        viewModelScope.launch {
            _isLoading.value = true
            
            // Simule un appel réseau (téléchargement)
            delay(2000)
            
            _meteoList.value = listOf(
                "Montréal: 22°C ☀️",
                "Québec: 19°C ⛅",
                "Sherbrooke: 24°C 🌧️",
                "Gatineau: 21°C 🌤️"
            )
            
            _isLoading.value = false
        }
    }
}

// ==========================================
// 2. L'APPLICATION (UI + Navigation)
// ==========================================
@Composable
fun AppMeteoComplete(viewModel: MeteoViewModel = viewModel()) {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "liste") {
        
        // --- ÉCRAN 1 : LISTE DES VILLES ---
        composable("liste") {
            // L'UI observe l'état du ViewModel (se met à jour automatiquement)
            val isLoading by viewModel.isLoading.collectAsState()
            val meteoList by viewModel.meteoList.collectAsState()

            if (isLoading) {
                // Affiche un cercle de chargement centré
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator()
                }
            } else {
                // Affiche la liste une fois chargée
                LazyColumn(Modifier.fillMaxSize()) {
                    items(meteoList) { ville ->
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(8.dp)
                                .clickable { 
                                    // Navigation : On passe le nom de la ville dans l'URL
                                    navController.navigate("details/\$ville") 
                                }
                        ) {
                            Text(ville, modifier = Modifier.padding(16.dp))
                        }
                    }
                }
            }
        }

        // --- ÉCRAN 2 : DÉTAILS ---
        composable(
            route = "details/{nomVille}",
            arguments = listOf(navArgument("nomVille") { type = NavType.StringType })
        ) { backStackEntry ->
            // Récupération du paramètre passé dans la navigation
            val ville = backStackEntry.arguments?.getString("nomVille") ?: ""
            
            Column(Modifier.fillMaxSize().padding(16.dp)) {
                Text("Détails météo complets", style = MaterialTheme.typography.titleLarge)
                Spacer(Modifier.height(16.dp))
                Text(ville, style = MaterialTheme.typography.headlineMedium)
                
                Spacer(Modifier.height(32.dp))
                Button(onClick = { navController.popBackStack() }) { // Retour arrière
                    Text("Retour à la liste")
                }
            }
        }
    }
}

// ==========================================
// 3. LE POINT D'ENTRÉE (MainActivity)
// ==========================================
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    AppMeteoComplete()
                }
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 32,
            code: 'class MeteoViewModel : ViewModel()',
            explanation: 'Gère la logique. Survit aux rotations de l\'écran.'
          },
          {
            line: 45,
            code: 'viewModelScope.launch { ... delay(2000) ... }',
            explanation: 'La Coroutine qui simule un téléchargement sans geler l\'interface.'
          },
          {
            line: 67,
            code: 'fun AppMeteoComplete(viewModel: MeteoViewModel = viewModel())',
            explanation: 'Fonction racine de l\'UI. Le ViewModel y est injecté.'
          },
          {
            line: 75,
            code: 'val isLoading by viewModel.isLoading.collectAsState()',
            explanation: 'Connexion vitale : L\'interface s\'abonne aux changements d\'état du ViewModel.'
          },
          {
            line: 122,
            code: 'setContent { AppMeteoComplete() }',
            explanation: 'Attache notre architecture complète à l\'activité Android principale.'
          }
        ]
      },
      visualMockup: {
        type: 'navigation-preview',
        title: 'App Complète (Copier/Coller)',
        startState: 'Liste: [ Montréal ] [ Québec ] (Cliquables)',
        endState: 'Détails: "Détails pour Montréal" + Bouton Retour',
        transition: 'Glissement d\'un écran à l\'autre'
      },
      commonMistakes: [
        {
          mistake: 'Mettre plusieurs ViewModels pour la même fonctionnalité.',
          fix: 'Partagez le ViewModel au sommet (ici dans AppMeteoComplete), et laissez l\'UI se mettre à jour en écoutant les StateFlow.',
          explanation: 'Si vous créez un ViewModel différent dans chaque écran, ils ne partageront pas les mêmes données !'
        }
      ],
      quiz: {
        question: 'Où doit être collé l\'intégralité de ce code pour tester l\'application ?',
        options: [
          'Dans le fichier AndroidManifest.xml',
          'Dans le fichier build.gradle',
          'Dans MainActivity.kt (en ajustant le "package" à la ligne 1)',
          'Dans un fichier XML'
        ],
        correctIndex: 2,
        explanation: 'En Compose, tout (UI, ViewModel, Navigation) s\'écrit en Kotlin. MainActivity.kt est le point de départ classique.'
      },
      furtherReading: [
        {
          title: 'Documentation : L\'architecture Android',
          url: 'https://developer.android.com/topic/architecture'
        }
      ]
    }
  ]
};
