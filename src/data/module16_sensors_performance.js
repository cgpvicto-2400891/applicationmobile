// MODULE 16 — Capteurs (Sensors) et performances
// SensorManager, accéléromètre, luminosité, optimisation des recompositions.

export const MODULE_16 = {
  id: 'module-16',
  number: 16,
  title: 'Capteurs et optimisation',
  subtitle: 'Exploiter les capteurs physiques du téléphone et optimiser les performances',
  description: 'Votre téléphone est truffé de capteurs : accéléromètre, gyroscope, capteur de lumière, magnétomètre... Apprenez à les lire depuis Compose. Puis découvrez comment optimiser vos recompositions pour une application fluide.',
  prerequisites: 'Avoir complété le Module 8 (Effets de bord et DisposableEffect) et le Module 7 (ViewModel).',
  lessons: [
    {
      id: 'sensors-intro',
      title: 'Le SensorManager : Accéder aux capteurs du téléphone',
      analogy: 'Le SensorManager est comme le chef de la sécurité d\'un immeuble : il sait quels capteurs (caméras, détecteurs de mouvement, capteurs de température) sont installés et peut te brancher sur les informations de chacun d\'eux en temps réel.',
      definition: 'Le SensorManager est un service système Android qui permet d\'accéder à tous les capteurs physiques du téléphone. Un capteur (Sensor) mesure une grandeur physique (accélération, lumière, rotation, etc.) et envoie ses mesures à un SensorEventListener enregistré. Il faut toujours se désinscrire quand on n\'a plus besoin des données.',
      codeExample: {
        code: `// Accéder au SensorManager dans un ViewModel
class CapteurViewModel(application: Application) : AndroidViewModel(application) {
    private val sensorManager: SensorManager = application
        .getSystemService(Context.SENSOR_SERVICE) as SensorManager
    
    // Lister tous les capteurs du téléphone
    fun obtenirTousLesCapteurs(): List<Sensor> {
        return sensorManager.getSensorList(Sensor.TYPE_ALL)
    }
    
    // Obtenir un capteur spécifique
    fun obtenirAccelerometre(): Sensor? {
        return sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
    }
    
    fun obtenirCapteurLumiere(): Sensor? {
        return sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)
    }
}

// Types de capteurs courants :
// Sensor.TYPE_ACCELEROMETER    → Accélération (x, y, z) en m/s²
// Sensor.TYPE_GYROSCOPE        → Vitesse de rotation (x, y, z) en rad/s
// Sensor.TYPE_LIGHT            → Luminosité ambiante en lux
// Sensor.TYPE_MAGNETIC_FIELD   → Champ magnétique (x, y, z) en μT
// Sensor.TYPE_PROXIMITY        → Distance à l'objet le plus proche en cm`,
        lineByLine: [
          {
            line: 3,
            code: 'private val sensorManager: SensorManager = application.getSystemService(Context.SENSOR_SERVICE) as SensorManager',
            explanation: 'Récupère le SensorManager via le service système. On utilise AndroidViewModel pour avoir accès à application.getSystemService().'
          },
          {
            line: 8,
            code: 'return sensorManager.getSensorList(Sensor.TYPE_ALL)',
            explanation: 'Retourne la liste de TOUS les capteurs physiques disponibles sur le téléphone. Utile pour découvrir les capacités de l\'appareil.'
          },
          {
            line: 13,
            code: 'return sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)',
            explanation: 'Retourne le capteur d\'accélération par défaut, ou null si le téléphone n\'en a pas (rare, mais possible sur un émulateur). Toujours vérifier null !'
          }
        ]
      },
      visualMockup: {
        type: 'sensor-types',
        title: 'Capteurs courants d\'un smartphone',
        sensors: [
          { icon: '📐', name: 'Accéléromètre', type: 'TYPE_ACCELEROMETER', unit: 'm/s²' },
          { icon: '🔄', name: 'Gyroscope', type: 'TYPE_GYROSCOPE', unit: 'rad/s' },
          { icon: '💡', name: 'Lumière', type: 'TYPE_LIGHT', unit: 'lux' },
          { icon: '🧲', name: 'Magnétomètre', type: 'TYPE_MAGNETIC_FIELD', unit: 'μT' },
          { icon: '📏', name: 'Proximité', type: 'TYPE_PROXIMITY', unit: 'cm' }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Ne pas vérifier si le capteur existe (résultat null)',
          correction: 'getDefaultSensor() retourne null si le capteur n\'existe pas. Vérifiez toujours avec une condition if/let avant d\'utiliser le capteur.'
        },
        {
          mistake: 'Accéder au SensorManager dans un Composable au lieu du ViewModel',
          correction: 'Le SensorManager et les listeners doivent être gérés dans le ViewModel (AndroidViewModel) pour survivre aux recompositions et rotations.'
        }
      ],
      quiz: [
        {
          question: 'Pourquoi getDefaultSensor() peut-il retourner null ?',
          options: [
            'Parce qu\'il y a un bug',
            'Parce que le téléphone ne possède pas forcément ce capteur',
            'Parce que le capteur est éteint',
            'Parce que l\'application n\'a pas les permissions'
          ],
          correctIndex: 1,
          explanation: 'Certains appareils (surtout les émulateurs ou les tablettes bon marché) ne possèdent pas tous les capteurs physiques. getDefaultSensor() retourne null dans ce cas.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 69.1 : SensorManager',
          url: '#'
        }
      ]
    },
    {
      id: 'sensors-compose',
      title: 'Lire les données d\'un capteur dans Compose',
      analogy: 'Lire un capteur dans Compose, c\'est comme écouter la radio : tu t\'abonnes (registerListener) à la fréquence du capteur, tu reçois les mesures en temps réel, et quand tu changes de pièce (le Composable disparaît), tu éteins la radio (unregisterListener) pour économiser la batterie.',
      definition: 'Pour afficher les données d\'un capteur dans Compose, on utilise un SensorEventListener dans un DisposableEffect. Le listener est enregistré auprès du SensorManager avec registerListener() et désinscrit dans onDispose avec unregisterListener(). Les valeurs mesurées sont stockées dans des mutableStateOf pour déclencher la recomposition.',
      codeExample: {
        code: `@Composable
fun AfficherAccelerometre(capteurViewModel: CapteurViewModel) {
    var x by remember { mutableFloatStateOf(0f) }
    var y by remember { mutableFloatStateOf(0f) }
    var z by remember { mutableFloatStateOf(0f) }
    
    val context = LocalContext.current
    val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    val accelerometre = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
    
    // Enregistrer et désenregistrer le listener avec DisposableEffect
    DisposableEffect(Unit) {
        val listener = object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                // event.values contient les mesures du capteur
                x = event.values[0]  // Accélération sur l'axe X
                y = event.values[1]  // Accélération sur l'axe Y
                z = event.values[2]  // Accélération sur l'axe Z
            }
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
                // Optionnel : réagir au changement de précision
            }
        }
        
        accelerometre?.let {
            sensorManager.registerListener(
                listener,
                it,
                SensorManager.SENSOR_DELAY_UI  // Fréquence adaptée à l'UI
            )
        }
        
        onDispose {
            sensorManager.unregisterListener(listener)
        }
    }
    
    // Afficher les valeurs
    Column(
        modifier = Modifier.fillMaxWidth().padding(16.dp)
    ) {
        Text("📐 Accéléromètre", style = MaterialTheme.typography.titleLarge)
        Spacer(modifier = Modifier.height(8.dp))
        Text("X : \${"%.2f".format(x)} m/s²")
        Text("Y : \${"%.2f".format(y)} m/s²")
        Text("Z : \${"%.2f".format(z)} m/s²")
    }
}`,
        lineByLine: [
          {
            line: 3,
            code: 'var x by remember { mutableFloatStateOf(0f) }',
            explanation: 'Utilise mutableFloatStateOf au lieu de mutableStateOf<Float> pour de meilleures performances. Chaque changement de valeur déclenchera une recomposition.'
          },
          {
            line: 12,
            code: 'DisposableEffect(Unit) {',
            explanation: 'DisposableEffect avec la clé Unit signifie qu\'il s\'exécute une seule fois à l\'entrée du Composable. Le onDispose sera appelé quand le Composable disparaît.'
          },
          {
            line: 16,
            code: 'x = event.values[0]',
            explanation: 'L\'accéléromètre retourne 3 valeurs dans event.values : [0] = axe X (gauche-droite), [1] = axe Y (haut-bas), [2] = axe Z (avant-arrière).'
          },
          {
            line: 29,
            code: 'SensorManager.SENSOR_DELAY_UI',
            explanation: 'La fréquence de mise à jour. SENSOR_DELAY_UI (~60ms) est adapté à l\'interface. SENSOR_DELAY_GAME est plus rapide mais consomme plus de batterie.'
          },
          {
            line: 34,
            code: 'sensorManager.unregisterListener(listener)',
            explanation: 'ABSOLUMENT CRITIQUE : sans cette ligne, le capteur continuerait à envoyer des données même après la fermeture de l\'écran, vidant la batterie.'
          }
        ]
      },
      visualMockup: {
        type: 'sensor-display',
        title: 'Affichage des données de l\'accéléromètre',
        values: [
          'X : 0.12 m/s²',
          'Y : 9.78 m/s²',
          'Z : 0.03 m/s²'
        ],
        note: '⚠️ Y ≈ 9.81 = la gravité terrestre (téléphone à plat)'
      },
      commonMistakes: [
        {
          mistake: 'Oublier unregisterListener dans onDispose',
          correction: 'FUITE CRITIQUE ! Le capteur continuera à envoyer des données en arrière-plan, vidant la batterie. Utilisez TOUJOURS onDispose { sensorManager.unregisterListener(listener) }.'
        },
        {
          mistake: 'Utiliser SENSOR_DELAY_FASTEST pour l\'interface',
          correction: 'SENSOR_DELAY_FASTEST envoie des données des centaines de fois par seconde, ce qui est excessif pour l\'UI et consomme énormément de batterie. Utilisez SENSOR_DELAY_UI pour l\'affichage.'
        }
      ],
      quiz: [
        {
          question: 'Que se passe-t-il si vous oubliez unregisterListener dans onDispose ?',
          options: [
            'Rien, Android le fait automatiquement',
            'Le capteur continue d\'envoyer des données et vide la batterie',
            'L\'application plante',
            'Le capteur se met en veille'
          ],
          correctIndex: 1,
          explanation: 'Android NE désinscrit PAS automatiquement les listeners de capteurs. Sans unregisterListener(), le capteur continue à envoyer des événements, consommant CPU et batterie inutilement.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 69.2 : SensorEventListener et DisposableEffect',
          url: '#'
        }
      ]
    },
    {
      id: 'perf-recomposition',
      title: 'Optimisation : Comprendre et réduire les recompositions',
      analogy: 'La recomposition, c\'est comme repasser un examen : si la réponse n\'a pas changé, c\'est une perte de temps. L\'optimisation consiste à mettre en place un système qui détecte les réponses identiques et ne repasse que les questions dont la réponse a changé.',
      definition: 'La recomposition est le processus par lequel Compose re-exécute un Composable quand un état qu\'il lit a changé. Une recomposition inutile se produit quand le Composable est réexécuté alors que ses données n\'ont pas changé. Compose essaie de "sauter" ces recompositions, mais certains schémas de code les empêchent. Surveiller et optimiser les recompositions est essentiel pour des applications fluides.',
      codeExample: {
        code: `// ─── PROBLÈME : Recompositions inutiles ───
@Composable
fun ParentScreen() {
    var compteur by remember { mutableIntStateOf(0) }
    
    Column {
        Text("Compteur : \$compteur")
        Button(onClick = { compteur++ }) {
            Text("Incrémenter")
        }
        
        // ❌ Ce composant sera recomposé à CHAQUE changement de compteur
        // même s'il n'utilise pas compteur !
        EnfantQuiNeChangePas()
    }
}

@Composable
fun EnfantQuiNeChangePas() {
    // Ce composable ne dépend d'aucun état changeant
    Text("Je ne change jamais, mais je suis quand même recomposé si mal structuré")
}

// ─── SOLUTION 1 : Extraire dans un Composable séparé stable ───
// Compose peut "sauter" la recomposition d'un Composable enfant
// si TOUS ses paramètres sont inchangés et stables.

@Composable
fun CompteurOptimise() {
    var compteur by remember { mutableIntStateOf(0) }
    
    Column {
        AfficherCompteur(valeur = compteur)
        Button(onClick = { compteur++ }) {
            Text("Incrémenter")
        }
        TexteStatique(texte = "Je ne suis recomposé QUE si 'texte' change.")
    }
}

@Composable
fun AfficherCompteur(valeur: Int) {
    Text("Compteur : \$valeur")
}

@Composable
fun TexteStatique(texte: String) {
    Text(texte)
}

// ─── SOLUTION 2 : Utiliser remember pour les calculs coûteux ───
@Composable
fun ListeFiltree(items: List<String>, filtre: String) {
    // ✅ Le filtrage ne sera recalculé QUE si items ou filtre change
    val resultats = remember(items, filtre) {
        items.filter { it.contains(filtre, ignoreCase = true) }
    }
    
    LazyColumn {
        items(resultats) { item ->
            Text(item)
        }
    }
}`,
        lineByLine: [
          {
            line: 14,
            code: 'EnfantQuiNeChangePas()',
            explanation: '❌ Quand compteur change, Compose recompose le Column parent, et ses enfants directs aussi, sauf si Compose peut prouver que leurs paramètres n\'ont pas changé.'
          },
          {
            line: 47,
            code: 'fun TexteStatique(texte: String) {',
            explanation: '✅ En tant que Composable séparé avec un paramètre stable (String est stable), Compose peut sauter sa recomposition si la valeur de texte n\'a pas changé.'
          },
          {
            line: 55,
            code: 'val resultats = remember(items, filtre) {',
            explanation: '✅ remember avec des clés (items, filtre) mémorise le résultat du calcul. Le filtrage ne sera recalculé QUE si items ou filtre change, pas à chaque recomposition.'
          }
        ]
      },
      visualMockup: {
        type: 'recomposition-counter',
        title: 'Compteur de recompositions (Layout Inspector)',
        before: 'Sans optimisation : ParentScreen ×50, EnfantQuiNeChangePas ×50',
        after: 'Avec optimisation : ParentScreen ×50, TexteStatique ×1',
        tip: '💡 Activez Layout Inspector dans Android Studio pour visualiser les recompositions en temps réel.'
      },
      commonMistakes: [
        {
          mistake: 'Passer un objet instable (MutableList, objet personnalisé) en paramètre',
          correction: 'Compose ne peut pas sauter la recomposition d\'un Composable si un paramètre est "instable". Utilisez des List (au lieu de MutableList) et des data class. Vérifiez la stabilité avec le plugin Compose Compiler.'
        },
        {
          mistake: 'Créer des lambdas ou objets dans le corps du Composable parent',
          correction: 'Chaque recomposition du parent crée une nouvelle instance de la lambda, ce qui force la recomposition de l\'enfant. Utilisez remember pour mémoriser les lambdas ou callback.'
        },
        {
          mistake: 'Optimiser prématurément sans mesurer',
          correction: 'N\'optimisez que si vous constatez un problème de performance. Utilisez le Layout Inspector ou le Compose Compiler Report pour identifier les vrais goulots d\'étranglement.'
        }
      ],
      quiz: [
        {
          question: 'Quand est-ce que Compose peut "sauter" (skip) la recomposition d\'un Composable enfant ?',
          options: [
            'Toujours, automatiquement',
            'Quand tous ses paramètres sont stables et n\'ont pas changé',
            'Quand il n\'a aucun paramètre',
            'Quand il est marqué @Stable'
          ],
          correctIndex: 1,
          explanation: 'Compose peut sauter la recomposition d\'un Composable si tous ses paramètres sont de types "stables" (primitifs, String, data class de types stables) ET que les valeurs n\'ont pas changé depuis la dernière composition.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 68.1 : Recomposition et performances',
          url: '#'
        },
        {
          title: '« Performance » - Android Developers Compose',
          url: 'https://developer.android.com/develop/ui/compose/performance'
        }
      ]
    },
    {
      id: 'sensors-light',
      title: 'Le capteur de lumière : Adapter l\'UI à la luminosité',
      analogy: 'Le capteur de lumière est comme un œil qui mesure en permanence la luminosité de la pièce. Avec cette information, votre application peut s\'adapter : texte plus grand et fond plus lumineux en plein soleil, ou passage en mode sombre dans l\'obscurité.',
      definition: 'Le capteur de lumière (Sensor.TYPE_LIGHT) mesure la luminosité ambiante en lux. Il retourne une seule valeur dans event.values[0]. Cette information peut être utilisée pour adapter dynamiquement le thème, la taille du texte ou la luminosité de l\'écran.',
      codeExample: {
        code: `@Composable
fun AdaptateurLuminosite() {
    var luminosite by remember { mutableFloatStateOf(0f) }
    val context = LocalContext.current
    val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    val capteurLumiere = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)
    
    DisposableEffect(Unit) {
        val listener = object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                luminosite = event.values[0]
            }
            override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
        }
        capteurLumiere?.let {
            sensorManager.registerListener(listener, it, SensorManager.SENSOR_DELAY_UI)
        }
        onDispose { sensorManager.unregisterListener(listener) }
    }
    
    // Adapter l'interface selon la luminosité
    val estSombre = luminosite < 50f
    val couleurFond = if (estSombre) Color.DarkGray else Color.White
    val couleurTexte = if (estSombre) Color.White else Color.Black
    
    Surface(
        color = couleurFond,
        modifier = Modifier.fillMaxSize()
    ) {
        Column(
            modifier = Modifier.padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                "💡 Luminosité : \${"%.0f".format(luminosite)} lux",
                color = couleurTexte,
                style = MaterialTheme.typography.headlineMedium
            )
            Spacer(Modifier.height(16.dp))
            Text(
                if (estSombre) "🌙 Mode sombre activé" else "☀️ Mode clair activé",
                color = couleurTexte
            )
        }
    }
}

// Échelle de luminosité en lux :
// 0 lux        → Obscurité totale
// 10-50 lux    → Pièce sombre
// 100-300 lux  → Intérieur éclairé
// 1000 lux     → Ciel couvert
// 10 000+ lux  → Plein soleil`,
        lineByLine: [
          {
            line: 6,
            code: 'sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)',
            explanation: 'Récupère le capteur de lumière. Contrairement à l\'accéléromètre qui retourne 3 valeurs (x,y,z), le capteur de lumière n\'en retourne qu\'une seule : la luminosité en lux.'
          },
          {
            line: 11,
            code: 'luminosite = event.values[0]',
            explanation: 'Pour le capteur de lumière, event.values[0] est la seule valeur : la luminosité ambiante en lux (unité internationale de mesure de l\'éclairement).'
          },
          {
            line: 23,
            code: 'val estSombre = luminosite < 50f',
            explanation: 'Un seuil de 50 lux correspond environ à une pièce sombre. En dessous, on active le mode sombre. Ce seuil est ajustable selon les besoins.'
          }
        ]
      },
      visualMockup: {
        type: 'light-sensor-demo',
        title: 'Adaptation à la luminosité',
        modes: [
          { condition: '< 50 lux', fond: 'Sombre (DarkGray)', texte: 'Blanc', icon: '🌙' },
          { condition: '≥ 50 lux', fond: 'Clair (White)', texte: 'Noir', icon: '☀️' }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Adapter l\'UI trop fréquemment à chaque changement mineur de luminosité',
          correction: 'Ajoutez un seuil ou un délai pour éviter que l\'interface ne clignote. Par exemple, ne changez de mode que si la luminosité est restée sous 50 lux pendant plus de 2 secondes.'
        },
        {
          mistake: 'Oublier de gérer le cas où le capteur de lumière n\'existe pas',
          correction: 'Certains émulateurs ou appareils bon marché n\'ont pas de capteur de lumière. Vérifiez toujours que getDefaultSensor() ne retourne pas null et affichez un message alternatif.'
        }
      ],
      quiz: [
        {
          question: 'Combien de valeurs retourne le capteur de lumière (TYPE_LIGHT) ?',
          options: [
            '3 valeurs (x, y, z)',
            '1 seule valeur (luminosité en lux)',
            '2 valeurs (luminosité et température)',
            'Aucune, il retourne un booléen'
          ],
          correctIndex: 1,
          explanation: 'Le capteur de lumière retourne une seule valeur dans event.values[0] : la luminosité ambiante en lux. Contrairement à l\'accéléromètre qui retourne 3 axes.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 69.3 : Capteur de lumière',
          url: '#'
        },
        {
          title: '« Sensors Overview » - Android Developers',
          url: 'https://developer.android.com/develop/sensors-and-location/sensors/sensors_overview'
        }
      ]
    }
  ]
};
