// MODULE 12 — Notifications
// Notifications de base, styles de messagerie, réponse directe, intents plein écran, bonnes pratiques.

export const MODULE_12 = {
  id: 'module-12',
  number: 12,
  title: 'Notifications',
  subtitle: 'Alerter et interagir avec l\'utilisateur même quand l\'application est fermée',
  description: 'Les notifications permettent de garder le contact avec l\'utilisateur pour un rappel de cours, un message urgent ou une alarme. Découvrez comment les concevoir proprement dans le respect des règles d\'Android moderne.',
  prerequisites: 'Avoir complété le Module 2 (Manifest et Activity).',
  lessons: [
    {
      id: 'notifications-intro',
      title: 'Introduction aux notifications Android et permissions (Android 13+)',
      analogy: 'La permission de notification, c\'est comme l\'autocollant "Pas de publicité s\'il vous plaît" sur ta boîte aux lettres : depuis Android 13, le facteur n\'a plus le droit de déposer quoi que ce soit dans ta boîte tant que tu ne lui as pas signé une autorisation expresse en face à face.',
      definition: 'Une notification est un message affiché par le système d\'exploitation Android en dehors de l\'interface standard de votre application (dans la barre d\'état en haut et dans le volet déroulant). Depuis Android 13 (API 33), la permission d\'exécution `POST_NOTIFICATIONS` doit obligatoirement être déclarée dans le Manifest et demandée explicitement à l\'utilisateur.',
      codeExample: {
        code: `<!-- 1. Déclaration dans AndroidManifest.xml : -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    
    <application ...>
        <!-- Reste de l'application -->
    </application>
</manifest>`,
        lineByLine: [
          {
            line: 3,
            code: '<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />',
            explanation: '"POST_NOTIFICATIONS" est la permission système obligatoire depuis Android 13. Sans elle, vos notifications sont silencieusement bloquées.'
          }
        ]
      },
      visualMockup: {
        type: 'permission-dialog-preview',
        title: 'Boîte système Android 13+',
        prompt: 'Autoriser MonApplication à vous envoyer des notifications ?',
        buttons: ['[ Ne pas autoriser ]', '[ Autoriser ]']
      },
      commonMistakes: [
        {
          mistake: 'Tenter d\'émettre une notification sur un téléphone récent sous Android 13 ou 14 sans avoir demandé la permission à l\'utilisateur.',
          fix: 'Déclarez la permission dans le Manifest et demandez-la au moment opportun avec `rememberLauncherForActivityResult`.',
          explanation: 'Sur les versions modernes d\'Android, les notifications sont désactivées par défaut tant que l\'utilisateur n\'a pas cliqué sur "Autoriser".'
        }
      ],
      quiz: {
        question: 'Depuis quelle version majeure d\'Android la permission `POST_NOTIFICATIONS` doit-elle être demandée au moment de l\'exécution ?',
        options: ['Android 5', 'Android 9', 'Android 13 (API 33)', 'Android 2.0'],
        correctIndex: 2,
        explanation: 'Bravo ! Google a renforcé la vie privée des utilisateurs en exigeant cette autorisation explicite depuis Android 13.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 82 : Les notifications',
          url: '#',
          note: 'Consulte les règles de permissions pour les différentes versions d\'Android.'
        }
      ]
    },
    {
      id: 'notification-channel',
      title: 'Création d\'un canal de notification (NotificationChannel)',
      analogy: 'Un canal de notification, c\'est comme les sonnettes personnalisées sur un téléphone d\'accueil : une mélodie douce pour les courriels ordinaires et une alarme stridente pour les alertes incendie. L\'utilisateur peut ainsi couper le son des alertes météo sans couper les alertes d\'urgence.',
      definition: 'Depuis Android 8.0 (API 26), chaque notification doit obligatoirement être rattachée à un "Canal de notification" (NotificationChannel). Les canaux permettent à l\'utilisateur de contrôler dans les paramètres du téléphone l\'importance, le son, le vibreur et l\'apparition de voyants pour chaque type d\'alerte.',
      codeExample: {
        code: `fun creerCanalNotification(context: Context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val canalId = "canal_rappels_cours"
        val nom = "Rappels de cours du Cégep"
        val descriptionTexte = "Alertes pour le début des cours et remises de devoirs"
        val importance = NotificationManager.IMPORTANCE_HIGH

        val canal = NotificationChannel(canalId, nom, importance).apply {
            description = descriptionTexte
            enableVibration(true)
        }

        // Enregistrement auprès du système Android :
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.createNotificationChannel(canal)
    }
}`,
        lineByLine: [
          {
            line: 3,
            code: 'val canalId = "canal_rappels_cours"',
            explanation: '"canalId" est l\'identifiant textuel unique de ce canal. Vous le réutiliserez pour émettre chaque notification.'
          },
          {
            line: 6,
            code: 'val importance = NotificationManager.IMPORTANCE_HIGH',
            explanation: '"IMPORTANCE_HIGH" fait sonner le téléphone et affiche la notification en bannière déroulante en haut de l\'écran (Heads-up).'
          },
          {
            line: 14,
            code: 'notificationManager.createNotificationChannel(canal)',
            explanation: 'Inscrit officiellement le canal dans les paramètres système du téléphone Android.'
          }
        ]
      },
      visualMockup: {
        type: 'android-settings-channel',
        title: 'Paramètres système du téléphone (Vue utilisateur)',
        app: 'MonApplication Cégep ➔ Notifications',
        channel1: '🔔 Rappels de cours du Cégep [ Activé - Son par défaut ]',
        channel2: '🔕 Actualités générales [ Désactivé par l\'utilisateur ]'
      },
      commonMistakes: [
        {
          mistake: 'Tenter d\'émettre une notification sans créer préalablement le canal sur Android 8.0 ou supérieur.',
          fix: 'Créez toujours vos canaux au démarrage de l\'application (par exemple dans le onCreate de MainActivity ou dans la classe Application).',
          explanation: 'Sans canal valide, Android refuse d\'émettre la notification et écrit un avertissement dans le Logcat.'
        }
      ],
      quiz: {
        question: 'À quoi servent les canaux de notification (NotificationChannel) ?',
        options: [
          'À diffuser la radio FM sur le téléphone',
          'À catégoriser les notifications pour permettre à l\'utilisateur de régler séparément le son et l\'importance de chaque catégorie',
          'À remplacer les câbles USB',
          'À crypter les connexions Bluetooth'
        ],
        correctIndex: 1,
        explanation: 'Tout à fait ! Les canaux redonnent le contrôle à l\'utilisateur sur les types d\'alertes qu\'il accepte de recevoir.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 82 : NotificationChannel',
          url: '#',
          note: 'Découvre comment attribuer des sons personnalisés à un canal.'
        }
      ]
    },
    {
      id: 'notification-basic',
      title: 'Notification simple avec NotificationCompat.Builder',
      analogy: 'Construire une notification avec Builder, c\'est comme remplir une carte postale : tu écris le titre en haut ("Salut !"), le petit mot au milieu ("N\'oublie pas le cours de 14h"), tu colles un timbre en haut à droite (la petite icône) et tu indiques où aller si la personne clique dessus (le PendingIntent).',
      definition: 'Pour envoyer une notification, on utilise la classe `NotificationCompat.Builder` issue de la bibliothèque AndroidX. Elle garantit la compatibilité avec toutes les versions d\'Android. Les 3 éléments obligatoires sont : la petite icône (`setSmallIcon`), le titre (`setContentTitle`) et le texte (`setContentText`).',
      codeExample: {
        code: `fun afficherNotificationSimple(context: Context) {
    val canalId = "canal_rappels_cours"
    val notificationId = 1001

    // Intention d'ouverture si l'utilisateur clique sur la notification :
    val intent = Intent(context, MainActivity::class.java)
    val pendingIntent = PendingIntent.getActivity(
        context, 0, intent, PendingIntent.FLAG_IMMUTABLE
    )

    val notification = NotificationCompat.Builder(context, canalId)
        .setSmallIcon(R.drawable.ic_notification) // Icône blanche monochrome
        .setContentTitle("Rappel de laboratoire")
        .setContentText("Le laboratoire d'Android commence dans 15 minutes !")
        .setPriority(NotificationCompat.PRIORITY_HIGH)
        .setContentIntent(pendingIntent) // Ouvre l'appli au clic
        .setAutoCancel(true)             // S'efface quand on clique dessus
        .build()

    val notificationManager = NotificationManagerCompat.from(context)
    notificationManager.notify(notificationId, notification)
}`,
        lineByLine: [
          {
            line: 6,
            code: 'val pendingIntent = PendingIntent.getActivity(...)',
            explanation: '"PendingIntent" (intention en attente) donne le droit au système Android de lancer votre MainActivity quand l\'utilisateur touchera la notification.'
          },
          {
            line: 12,
            code: '.setSmallIcon(R.drawable.ic_notification)',
            explanation: 'RÈGLE GOOGLE : La petite icône DOIT être une silhouette blanche monochrome avec fond transparent.'
          },
          {
            line: 16,
            code: '.setAutoCancel(true)',
            explanation: '"setAutoCancel(true)" fait disparaître la notification du volet dès que l\'utilisateur a cliqué dessus.'
          },
          {
            line: 20,
            code: 'notificationManager.notify(notificationId, notification)',
            explanation: '"notify()" envoie immédiatement la notification au système Android avec son numéro d\'identification unique.'
          }
        ]
      },
      visualMockup: {
        type: 'notification-shade-preview',
        title: 'Rendu dans le volet des notifications Android',
        appTitle: 'MonApplication • il y a 2 min',
        headline: 'Rappel de laboratoire',
        body: 'Le laboratoire d\'Android commence dans 15 minutes !',
        icon: '🔔 ic_notification'
      },
      commonMistakes: [
        {
          mistake: 'Utiliser une icône multicolore pour `setSmallIcon()`.',
          fix: 'La petite icône de barre d\'état doit être un tracé blanc vectoriel pur sur fond transparent.',
          explanation: 'Si vous mettez une icône avec des couleurs, Android la dessinera sous la forme d\'un carré blanc ou gris uni complètement illisible.'
        }
      ],
      quiz: {
        question: 'À quoi sert l\'option `.setAutoCancel(true)` sur le Builder de notification ?',
        options: [
          'À supprimer automatiquement la notification dès que l\'utilisateur clique dessus',
          'À annuler l\'examen de programmation',
          'À éteindre le téléphone',
          'À bloquer les messages des amis'
        ],
        correctIndex: 0,
        explanation: 'Exactement ! Elle évite que la notification ne reste polluée dans le tiroir après avoir été consultée.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 82 : NotificationCompat.Builder',
          url: '#',
          note: 'Consulte l\'usage des drapeaux PendingIntent.FLAG_IMMUTABLE.'
        }
      ]
    },
    {
      id: 'notification-styles',
      title: 'Styles avancés : MessagingStyle, BigTextStyle, BigPictureStyle',
      analogy: 'Les styles avancés, c\'est comme déplier un carton télescopique : par défaut, la boîte est toute petite avec 2 lignes visibles, mais quand l\'utilisateur glisse deux doigts vers le bas, elle s\'agrandit pour afficher une conversation entière comme dans WhatsApp ou une grande photo HD.',
      definition: 'Par défaut, Android tronque le texte d\'une notification après deux lignes. Grâce à la méthode `.setStyle()`, vous pouvez adopter des présentations riches : `BigTextStyle` pour de longs paragraphes, `BigPictureStyle` pour afficher une grande photo promotionnelle, et `MessagingStyle` pour un fil de discussion entre personnes avec avatars.',
      codeExample: {
        code: `fun afficherNotificationDiscussion(context: Context) {
    val canalId = "canal_messages"
    
    // 1. Définition des interlocuteurs :
    val utilisateur = Person.Builder().setName("Moi").build()
    val professeur = Person.Builder().setName("Professeur Martin").build()

    // 2. Création du style de messagerie :
    val styleMessagerie = NotificationCompat.MessagingStyle(utilisateur)
        .addMessage("Bonjour, le devoir est-il remis ?", System.currentTimeMillis() - 60000, utilisateur)
        .addMessage("Oui, la date limite est vendredi à 23h59 !", System.currentTimeMillis(), professeur)

    // 3. Construction de la notification avec le style :
    val notification = NotificationCompat.Builder(context, canalId)
        .setSmallIcon(R.drawable.ic_chat)
        .setStyle(styleMessagerie)
        .build()

    NotificationManagerCompat.from(context).notify(2002, notification)
}`,
        lineByLine: [
          {
            line: 5,
            code: 'val professeur = Person.Builder().setName("Professeur Martin").build()',
            explanation: '"Person" identifie chaque participant de la conversation avec son nom et éventuellement son avatar.'
          },
          {
            line: 9,
            code: 'val styleMessagerie = NotificationCompat.MessagingStyle(utilisateur)',
            explanation: '"MessagingStyle" est le format officiel de Google pour les applications de clavardage (chat).'
          },
          {
            line: 10,
            code: '.addMessage("Oui, la date limite...", ..., professeur)',
            explanation: 'Ajoute chaque bulle de message avec l\'auteur et l\'heure précise (timestamp).'
          }
        ]
      },
      visualMockup: {
        type: 'messaging-style-preview',
        title: 'Rendu MessagingStyle déplié',
        chatHeader: '💬 Professeur Martin (2 messages)',
        bubble1: 'Moi : Bonjour, le devoir est-il remis ?',
        bubble2: 'Professeur : Oui, la date limite est vendredi à 23h59 !'
      },
      commonMistakes: [
        {
          mistake: 'Mettre un long paragraphe dans `setContentText()` sans utiliser `BigTextStyle`.',
          fix: 'Ajoutez `.setStyle(NotificationCompat.BigTextStyle().bigText("..."))`.',
          explanation: 'Sans ce style, Android coupera brutalement votre phrase au milieu avec des points de suspension (...).'
        }
      ],
      quiz: {
        question: 'Quel style de notification offre un rendu adapté aux applications de messagerie instantanée avec liste d\'auteurs et bulles de texte ?',
        options: ['BigPictureStyle', 'NotificationCompat.MessagingStyle', 'MediaStyle', 'InboxStyle'],
        correctIndex: 1,
        explanation: 'Bravo ! MessagingStyle est spécialement conçu pour reproduire les fils de conversation.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 82 : Styles de messagerie',
          url: '#',
          note: 'Découvre comment insérer des images et des pièces jointes dans un message.'
        }
      ]
    },
    {
      id: 'notification-direct-reply',
      title: 'Réponse directe (RemoteInput) depuis le volet',
      analogy: 'La réponse directe, c\'est comme glisser un mot sous la porte sans ouvrir la maison : tu reçois un message sur ton téléphone, et tu tapes ta réponse directement dans la petite boîte de saisie du volet déroulant sans jamais avoir besoin d\'ouvrir l\'application.',
      definition: 'La fonctionnalité "RemoteInput" (réponse directe) permet d\'insérer un champ texte et un bouton d\'envoi directement dans la notification. Lorsque l\'utilisateur clique sur "Envoyer", le texte est transmis à un BroadcastReceiver ou à un service en arrière-plan sans interrompre l\'application en cours.',
      codeExample: {
        code: `// 1. Clé identifiant la réponse texte :
const val CLE_REPONSE_TEXTE = "cle_reponse_rapide"

fun creerActionReponse(context: Context): NotificationCompat.Action {
    // 2. Définition du champ de saisie dans la notification :
    val remoteInput = RemoteInput.Builder(CLE_REPONSE_TEXTE)
        .setLabel("Tapez votre réponse ici...")
        .build()

    // 3. Intention qui recevra le message tapé :
    val intent = Intent(context, ReponseReceiver::class.java)
    val pendingIntent = PendingIntent.getBroadcast(
        context, 0, intent, PendingIntent.FLAG_MUTABLE // MUTABLE obligatoire pour RemoteInput !
    )

    // 4. Bouton d'action avec le champ de réponse attaché :
    return NotificationCompat.Action.Builder(
        R.drawable.ic_send, "Répondre", pendingIntent
    ).addRemoteInput(remoteInput).build()
}`,
        lineByLine: [
          {
            line: 6,
            code: 'val remoteInput = RemoteInput.Builder(CLE_REPONSE_TEXTE)...',
            explanation: '"RemoteInput" déclare le champ de saisie de texte qui apparaîtra dans la notification.'
          },
          {
            line: 13,
            code: 'PendingIntent.FLAG_MUTABLE',
            explanation: 'RÈGLE OBLIGATOIRE : Pour RemoteInput, le PendingIntent doit être MUTABLE afin qu\'Android puisse y injecter le texte tapé par l\'utilisateur.'
          },
          {
            line: 19,
            code: '.addRemoteInput(remoteInput)',
            explanation: 'Attache le champ texte au bouton d\'action de la notification.'
          }
        ]
      },
      visualMockup: {
        type: 'direct-reply-preview',
        title: 'Bandeau avec champ de réponse directe',
        notif: 'Message de Sophie : "Tu arrives bientôt ?"',
        inputField: '[ Tapez votre réponse ici...      ] ➔ [ Envoyer ]'
      },
      commonMistakes: [
        {
          mistake: 'Mettre `PendingIntent.FLAG_IMMUTABLE` avec un RemoteInput.',
          fix: 'Pour les réponses directes uniquement, utilisez obligatoirement `FLAG_MUTABLE`.',
          explanation: 'Si le flag est IMMUTABLE, le système Android a l\'interdiction de modifier l\'intent pour y insérer la réponse tapée, provoquant une erreur d\'exécution.'
        }
      ],
      quiz: {
        question: 'Quelle classe AndroidX permet d\'ajouter un champ de saisie interactif à une notification pour une réponse directe ?',
        options: ['DirectBox', 'RemoteInput', 'QuickReply', 'KeyboardNotification'],
        correctIndex: 1,
        explanation: 'Parfait ! RemoteInput capte la réponse de l\'utilisateur directement depuis la barre de notification.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 82 : Réponse directe',
          url: '#',
          note: 'Consulte la récupération du texte reçu dans le BroadcastReceiver.'
        }
      ]
    },
    {
      id: 'notification-fullscreen-bestpractices',
      title: 'Notifications plein écran (FullScreenIntent) et bonnes pratiques',
      analogy: 'Une notification plein écran, c\'est comme lorsque ton téléphone sonne pour un appel téléphonique entrant ou un réveil-matin : l\'écran s\'allume en grand et prend le contrôle total de l\'affichage, car il s\'agit d\'une urgence qui ne peut pas attendre que tu déroules un volet.',
      definition: 'Un "FullScreenIntent" permet d\'afficher une activité en plein écran directement par-dessus l\'écran de verrouillage lorsque le téléphone est en veille (réservé aux appels entrants et aux alarmes d\'urgence). Sur les applications ordinaires, il est strictement encadré pour éviter le harcèlement.',
      codeExample: {
        code: `// Configuration d'une alerte prioritaire réveil / appel :
fun declencherAlerteUrgente(context: Context) {
    val intentPleinEcran = Intent(context, EcranAlarmeActivity::class.java)
    val pendingIntent = PendingIntent.getActivity(
        context, 0, intentPleinEcran, PendingIntent.FLAG_IMMUTABLE
    )

    val notification = NotificationCompat.Builder(context, "canal_urgences")
        .setSmallIcon(R.drawable.ic_alarm)
        .setContentTitle("Alarme de laboratoire !")
        .setPriority(NotificationCompat.PRIORITY_MAX)
        .setCategory(NotificationCompat.CATEGORY_ALARM)
        // Active l'affichage plein écran par-dessus l'écran de verrouillage :
        .setFullScreenIntent(pendingIntent, true)
        .build()

    NotificationManagerCompat.from(context).notify(9999, notification)
}`,
        lineByLine: [
          {
            line: 12,
            code: 'setPriority(NotificationCompat.PRIORITY_MAX)',
            explanation: 'Indique le niveau d\'urgence absolu.'
          },
          {
            line: 15,
            code: '.setFullScreenIntent(pendingIntent, true)',
            explanation: '"setFullScreenIntent" lance directement l\'Activity en plein écran si l\'appareil est verrouillé dans la poche de l\'utilisateur.'
          }
        ]
      },
      visualMockup: {
        type: 'fullscreen-alarm-preview',
        title: 'Écran de verrouillage réveillé par FullScreenIntent',
        alarmTitle: '⏰ 07:00 — ALARME DE LABORATOIRE',
        slide: '👉 [ Glisser pour éteindre le réveil ]'
      },
      commonMistakes: [
        {
          mistake: 'Abuser du FullScreenIntent pour des simples promotions ou des notifications banales.',
          fix: 'Réservez le FullScreenIntent exclusivement aux alarmes de réveil et aux appels téléphoniques entrants.',
          explanation: 'Google Play bannit les applications qui réveillent brutalement l\'écran des utilisateurs pour des motifs non urgents.'
        }
      ],
      quiz: {
        question: 'Pour quels types d\'usages précis les notifications plein écran (FullScreenIntent) sont-elles légitimes ?',
        options: [
          'Pour envoyer de la publicité à 3h du matin',
          'Exclusivement pour les alarmes de réveil et les appels téléphoniques entrants',
          'Pour changer la couleur du fond d\'écran',
          'Pour installer une mise à jour d\'application'
        ],
        correctIndex: 1,
        explanation: 'Exactement ! Le FullScreenIntent doit être réservé aux urgences temporelles critiques.'
      },
      furtherReading: [
        {
          title: 'Notes du cours — Section 82 : Intents plein écran et bonnes pratiques',
          url: '#',
          note: 'Consulte les politiques d\'acceptation Google Play sur USE_FULL_SCREEN_INTENT.'
        }
      ]
    }
  ]
};
