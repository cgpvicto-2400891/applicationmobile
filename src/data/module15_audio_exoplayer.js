// MODULE 15 — Lecture audio et ExoPlayer (Media3)
// Intégration audio MP3, ExoPlayer, contrôle de lecture, Composables audio.

export const MODULE_15 = {
  id: 'module-15',
  number: 15,
  title: 'Lecture audio avec Media3 (ExoPlayer)',
  subtitle: 'Intégrer la lecture de fichiers audio MP3 dans votre application Android',
  description: 'De la musique d\'ambiance aux podcasts en passant par les effets sonores : la lecture audio est un incontournable. Apprenez à utiliser ExoPlayer (maintenant Media3) pour lire des fichiers audio MP3 dans votre application Compose.',
  prerequisites: 'Avoir complété le Module 8 (Effets de bord et LaunchedEffect) et le Module 7 (ViewModel).',
  lessons: [
    {
      id: 'audio-intro',
      title: 'Pourquoi ExoPlayer (Media3) plutôt que MediaPlayer ?',
      analogy: 'MediaPlayer est comme un vieux lecteur CD : il lit les pistes mais gère mal les formats modernes, les listes de lecture et les erreurs. ExoPlayer est comme Spotify : flexible, puissant, et capable de gérer des flux, des DRM et des formats multiples de façon transparente.',
      definition: 'ExoPlayer est le lecteur multimédia recommandé par Google, maintenant intégré dans la bibliothèque AndroidX Media3. Il remplace l\'ancien MediaPlayer qui était limité et source de nombreux bugs. ExoPlayer supporte les formats audio modernes, le streaming, les playlists et fournit un meilleur contrôle du cycle de vie.',
      codeExample: {
        code: `// 1. Ajouter les dépendances dans app/build.gradle.kts :
// implementation("androidx.media3:media3-exoplayer:1.4.1")
// implementation("androidx.media3:media3-ui:1.4.1")

// 2. Placer votre fichier MP3 dans le dossier :
//    app/src/main/res/raw/ma_musique.mp3
//    ⚠️ Le nom DOIT être en minuscules avec underscores, sans espaces ni accents.

// 3. Créer le lecteur dans un ViewModel :
class AudioViewModel(application: Application) : AndroidViewModel(application) {
    private val context = application.applicationContext
    
    // Le lecteur ExoPlayer — créé UNE seule fois
    val player: ExoPlayer = ExoPlayer.Builder(context).build()
    
    init {
        // Charger le fichier MP3 depuis les ressources raw
        val mediaItem = MediaItem.fromUri(
            "android.resource://\${context.packageName}/\${R.raw.ma_musique}"
        )
        player.setMediaItem(mediaItem)
        player.prepare()
        // ⚠️ Ne pas appeler player.play() ici : laissons l'utilisateur décider.
    }
    
    // Libérer les ressources quand le ViewModel est détruit
    override fun onCleared() {
        super.onCleared()
        player.release()
    }
}`,
        lineByLine: [
          {
            line: 10,
            code: 'class AudioViewModel(application: Application) : AndroidViewModel(application)',
            explanation: 'On hérite de AndroidViewModel (pas ViewModel) car on a besoin du contexte de l\'application pour accéder aux fichiers de ressources (res/raw). Le contexte est injecté via le constructeur.'
          },
          {
            line: 14,
            code: 'val player: ExoPlayer = ExoPlayer.Builder(context).build()',
            explanation: 'Crée le lecteur ExoPlayer avec le pattern Builder. Le contexte est nécessaire pour accéder aux ressources du système (audio, réseau, etc.).'
          },
          {
            line: 18,
            code: 'val mediaItem = MediaItem.fromUri(...)',
            explanation: 'Crée un MediaItem à partir de l\'URI qui pointe vers le fichier MP3 dans le dossier raw. L\'URI suit le format android.resource://nomDuPackage/identifiant.'
          },
          {
            line: 21,
            code: 'player.prepare()',
            explanation: 'Prépare le lecteur en chargeant les métadonnées du fichier audio (durée, codec, etc.). Le fichier n\'est pas encore joué.'
          },
          {
            line: 28,
            code: 'player.release()',
            explanation: 'TRÈS IMPORTANT : libère toutes les ressources du lecteur (mémoire, threads audio). Sans cela, le lecteur continuerait à consommer des ressources en arrière-plan.'
          }
        ]
      },
      visualMockup: {
        type: 'audio-lifecycle',
        title: 'Cycle de vie du lecteur ExoPlayer',
        steps: [
          'ExoPlayer.Builder().build() → Création',
          'player.setMediaItem(mediaItem) → Chargement',
          'player.prepare() → Préparation',
          'player.play() → Lecture',
          'player.pause() → Pause',
          'player.release() → Libération des ressources'
        ]
      },
      commonMistakes: [
        {
          mistake: 'Créer le ExoPlayer directement dans un Composable',
          correction: 'Le ExoPlayer doit être créé dans un ViewModel (AndroidViewModel) pour survivre aux rotations et recompositions. Le créer dans un Composable causerait des fuites mémoire et des créations multiples.'
        },
        {
          mistake: 'Oublier d\'appeler player.release() dans onCleared()',
          correction: 'Sans release(), le lecteur audio continuera à fonctionner en arrière-plan, consommant de la batterie et de la mémoire. C\'est une fuite de ressources critique.'
        },
        {
          mistake: 'Nommer le fichier MP3 avec des espaces ou des majuscules',
          correction: 'Les fichiers dans res/raw doivent suivre la convention snake_case : ma_musique.mp3. Les espaces, accents et majuscules sont interdits par Android.'
        }
      ],
      quiz: [
        {
          question: 'Pourquoi utiliser AndroidViewModel plutôt que ViewModel pour ExoPlayer ?',
          options: [
            'Parce que AndroidViewModel est plus rapide',
            'Parce que AndroidViewModel fournit le contexte d\'application nécessaire pour accéder aux ressources',
            'Parce que ViewModel ne supporte pas l\'audio',
            'Il n\'y a aucune différence'
          ],
          correctIndex: 1,
          explanation: 'AndroidViewModel reçoit Application en paramètre, ce qui donne accès au contexte d\'application nécessaire pour charger des fichiers depuis res/raw et créer le ExoPlayer.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 65.1 : ExoPlayer',
          url: '#'
        },
        {
          title: '« Media3 ExoPlayer » - Android Developers',
          url: 'https://developer.android.com/media/media3/exoplayer'
        }
      ]
    },
    {
      id: 'audio-compose-ui',
      title: 'Contrôler la lecture audio depuis Compose',
      analogy: 'Le Composable de contrôle audio est comme une télécommande : elle envoie des ordres (play, pause, stop) au lecteur (ExoPlayer dans le ViewModel) sans jamais gérer elle-même la musique. La télécommande ne contient pas la chaîne Hi-Fi !',
      definition: 'Pour contrôler la lecture audio depuis l\'interface Compose, on crée des boutons qui appellent les méthodes du player ExoPlayer (play(), pause(), stop()) via le ViewModel. L\'état de lecture (en cours, en pause) est observé pour mettre à jour l\'interface en temps réel.',
      codeExample: {
        code: `@Composable
fun LecteurAudio(audioViewModel: AudioViewModel) {
    val player = audioViewModel.player
    
    // Observer l'état de lecture
    var estEnLecture by remember { mutableStateOf(false) }
    
    // Synchroniser l'état avec le player via un listener
    DisposableEffect(player) {
        val listener = object : Player.Listener {
            override fun onIsPlayingChanged(isPlaying: Boolean) {
                estEnLecture = isPlaying
            }
        }
        player.addListener(listener)
        onDispose {
            player.removeListener(listener)
        }
    }
    
    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = if (estEnLecture) "🎵 Lecture en cours..." else "⏸️ En pause",
            style = MaterialTheme.typography.titleMedium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            // Bouton Play
            Button(
                onClick = { player.play() },
                enabled = !estEnLecture
            ) {
                Icon(Icons.Default.PlayArrow, contentDescription = "Lecture")
                Text("Play")
            }
            
            // Bouton Pause
            Button(
                onClick = { player.pause() },
                enabled = estEnLecture
            ) {
                Icon(Icons.Filled.Pause, contentDescription = "Pause")
                Text("Pause")
            }
            
            // Bouton Stop (revient au début)
            OutlinedButton(
                onClick = {
                    player.stop()
                    player.seekTo(0)
                    player.prepare()
                }
            ) {
                Icon(Icons.Default.Stop, contentDescription = "Stop")
                Text("Stop")
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 6,
            code: 'var estEnLecture by remember { mutableStateOf(false) }',
            explanation: 'Un état local qui reflète si le player est en train de lire ou non. Il sera mis à jour par le listener du player.'
          },
          {
            line: 9,
            code: 'DisposableEffect(player) {',
            explanation: 'DisposableEffect est utilisé pour enregistrer un listener sur le player. Il s\'exécute une fois et fournit onDispose pour nettoyer le listener quand le Composable disparaît.'
          },
          {
            line: 11,
            code: 'override fun onIsPlayingChanged(isPlaying: Boolean)',
            explanation: 'Cette méthode du Player.Listener est appelée automatiquement par ExoPlayer chaque fois que l\'état de lecture change. Elle met à jour notre état local.'
          },
          {
            line: 17,
            code: 'player.removeListener(listener)',
            explanation: 'CRITIQUE : dans le onDispose, on retire le listener pour éviter une fuite mémoire. Sans cela, le listener resterait actif même après la disparition du Composable.'
          },
          {
            line: 36,
            code: 'enabled = !estEnLecture',
            explanation: 'Le bouton Play n\'est actif que quand la musique N\'EST PAS en lecture. Cela empêche l\'utilisateur d\'appuyer sur Play alors que la musique joue déjà.'
          },
          {
            line: 54,
            code: 'player.seekTo(0)',
            explanation: 'Après player.stop(), on remet le curseur de lecture au début du fichier (position 0). Puis on re-prepare() pour pouvoir relancer la lecture.'
          }
        ]
      },
      visualMockup: {
        type: 'audio-player-ui',
        title: 'Interface de contrôle audio',
        status: '🎵 Lecture en cours...',
        buttons: [
          { label: '▶ Play', enabled: false },
          { label: '⏸ Pause', enabled: true },
          { label: '⏹ Stop', enabled: true }
        ]
      },
      commonMistakes: [
        {
          mistake: 'Oublier de retirer le listener dans onDispose',
          correction: 'Sans removeListener dans onDispose, le listener reste actif et cause une fuite mémoire. Utilisez toujours DisposableEffect pour les listeners.'
        },
        {
          mistake: 'Appeler player.play() directement dans le corps du Composable',
          correction: 'Cela déclencherait la lecture à chaque recomposition ! Les appels à play/pause/stop doivent être dans un onClick ou un LaunchedEffect.'
        }
      ],
      quiz: [
        {
          question: 'Pourquoi utiliser DisposableEffect pour le Player.Listener ?',
          options: [
            'Pour lancer la lecture automatiquement',
            'Pour enregistrer le listener une fois et le nettoyer proprement quand le Composable disparaît',
            'Pour jouer la musique en boucle',
            'Pour changer le volume'
          ],
          correctIndex: 1,
          explanation: 'DisposableEffect permet d\'enregistrer un listener à l\'entrée du Composable (addListener) et de le retirer à sa sortie (removeListener dans onDispose), évitant les fuites mémoire.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 65.2 : Contrôle de la lecture avec Compose',
          url: '#'
        }
      ]
    },
    {
      id: 'audio-playlist',
      title: 'Créer une playlist et lire plusieurs fichiers audio',
      analogy: 'Une playlist ExoPlayer, c\'est comme une file d\'attente dans un jukebox : tu ajoutes plusieurs chansons à la file, le jukebox les joue dans l\'ordre, et tu peux passer à la suivante ou revenir à la précédente avec les boutons de contrôle.',
      definition: 'ExoPlayer peut gérer une liste de MediaItem (playlist) et passer automatiquement d\'un morceau au suivant. On ajoute plusieurs MediaItem avec addMediaItem() ou setMediaItems() et on utilise seekToNextMediaItem() et seekToPreviousMediaItem() pour naviguer.',
      codeExample: {
        code: `// Dans le ViewModel : créer une playlist
class PlaylistViewModel(application: Application) : AndroidViewModel(application) {
    private val context = application.applicationContext
    val player: ExoPlayer = ExoPlayer.Builder(context).build()
    
    // Liste des morceaux disponibles
    val morceaux = listOf(
        R.raw.chanson_01 to "Premier morceau",
        R.raw.chanson_02 to "Deuxième morceau",
        R.raw.chanson_03 to "Troisième morceau"
    )
    
    init {
        // Ajouter tous les morceaux à la playlist
        morceaux.forEach { (resId, _) ->
            val uri = "android.resource://\${context.packageName}/\$resId"
            player.addMediaItem(MediaItem.fromUri(uri))
        }
        player.prepare()
    }
    
    fun morceau_suivant() {
        if (player.hasNextMediaItem()) {
            player.seekToNextMediaItem()
        }
    }
    
    fun morceau_precedent() {
        if (player.hasPreviousMediaItem()) {
            player.seekToPreviousMediaItem()
        }
    }
    
    override fun onCleared() {
        super.onCleared()
        player.release()
    }
}

// Dans le Composable : boutons Précédent / Suivant
Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    IconButton(onClick = { viewModel.morceau_precedent() }) {
        Icon(Icons.Default.SkipPrevious, "Précédent")
    }
    IconButton(onClick = { player.play() }) {
        Icon(Icons.Default.PlayArrow, "Lecture")
    }
    IconButton(onClick = { player.pause() }) {
        Icon(Icons.Filled.Pause, "Pause")
    }
    IconButton(onClick = { viewModel.morceau_suivant() }) {
        Icon(Icons.Default.SkipNext, "Suivant")
    }
}`,
        lineByLine: [
          {
            line: 7,
            code: 'val morceaux = listOf(',
            explanation: 'Une liste de paires (Pair) associant l\'identifiant de ressource à un titre lisible. R.raw.chanson_01 est l\'ID du fichier dans res/raw/.'
          },
          {
            line: 17,
            code: 'player.addMediaItem(MediaItem.fromUri(uri))',
            explanation: 'Ajoute un morceau à la playlist du player. On peut en ajouter autant qu\'on veut.'
          },
          {
            line: 23,
            code: 'if (player.hasNextMediaItem())',
            explanation: 'Vérifie qu\'il existe un morceau suivant dans la playlist avant de tenter d\'y accéder. Cela évite les plantages.'
          },
          {
            line: 24,
            code: 'player.seekToNextMediaItem()',
            explanation: 'Passe au morceau suivant dans la playlist. Le player commence automatiquement la lecture du nouveau morceau.'
          }
        ]
      },
      visualMockup: {
        type: 'playlist-player',
        title: 'Lecteur avec playlist',
        tracks: ['🎵 Premier morceau', '🎵 Deuxième morceau', '🎵 Troisième morceau'],
        controls: '⏮ | ▶ | ⏸ | ⏭',
        currentTrack: 1
      },
      commonMistakes: [
        {
          mistake: 'Ne pas vérifier hasNextMediaItem() avant seekToNextMediaItem()',
          correction: 'Sans vérification, appeler seekToNextMediaItem() sur le dernier morceau ne causera pas un plantage, mais c\'est une bonne pratique de vérifier pour désactiver le bouton Suivant.'
        },
        {
          mistake: 'Recréer toute la playlist à chaque recomposition',
          correction: 'La playlist doit être configurée une seule fois dans le init du ViewModel, pas dans le Composable. Le ViewModel persiste à travers les recompositions.'
        }
      ],
      quiz: [
        {
          question: 'Comment passer au morceau suivant dans une playlist ExoPlayer ?',
          options: [
            'player.next()',
            'player.seekToNextMediaItem()',
            'player.skipForward()',
            'player.playNext()'
          ],
          correctIndex: 1,
          explanation: 'La méthode officielle est player.seekToNextMediaItem(). Il est recommandé de vérifier player.hasNextMediaItem() avant l\'appel.'
        }
      ],
      furtherReading: [
        {
          title: 'Notes du cours — Section 65.3 : Playlist',
          url: '#'
        }
      ]
    }
  ]
};
