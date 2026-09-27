export const MODULE_18 = {
  id: 'module-18',
  number: 18,
  title: 'Animations : Donner vie aux composants',
  subtitle: 'Rendez votre application fluide, professionnelle et réactive avec les animations Compose',
  description: 'Une application sans animation semble abrupte et saccadée. Découvrez comment ajouter des transitions douces et professionnelles en quelques lignes de code seulement avec les outils d\'animation intégrés de Jetpack Compose.',
  prerequisites: 'Avoir complété le Module 6 (Gérer l\'état avec mutableStateOf), car toutes les animations sont déclenchées par des changements d\'état.',
  lessons: [
    {
      id: 'animation-content-size',
      title: 'Le plus facile : animateContentSize()',
      analogy: 'Imagine une tente magique : au lieu de s\'agrandir instantanément avec un bruit sec quand tu l\'ouvres, la toile s\'étire doucement en une seconde. C\'est ce que fait animateContentSize() avec tes composants.',
      definition: 'Le Modifier .animateContentSize() est la façon la plus simple d\'animer un composant. Il anime automatiquement tout changement de taille de ce composant (par exemple, si on affiche un long texte ou qu\'on ajoute des éléments dans une colonne).',
      codeExample: {
        code: `@Composable
fun CarteExtensible() {
    // État pour savoir si la carte est ouverte ou fermée
    var estEtendu by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .clickable { estEtendu = !estEtendu } // Change l'état au clic
            // 🌟 C'est LUI qui fait toute la magie de l'animation !
            .animateContentSize() 
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Titre de la carte", fontWeight = FontWeight.Bold)
            
            // On n'affiche le texte que si la carte est étendue
            if (estEtendu) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "Voici beaucoup de détails supplémentaires qui " +
                    "vont agrandir la carte. Grâce au modifier " +
                    "animateContentSize(), cet agrandissement se " +
                    "fera en douceur plutôt que d'un coup sec !"
                )
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 4,
            code: 'var estEtendu by remember { mutableStateOf(false) }',
            explanation: 'La variable d\'état qui va déclencher le changement de taille.'
          },
          {
            line: 12,
            code: '.animateContentSize()',
            explanation: 'Doit être placé AVANT le contenu qui change. Il observe la taille interne et crée une transition fluide quand cette taille change.'
          },
          {
            line: 18,
            code: 'if (estEtendu) { ... }',
            explanation: 'Quand cette condition devient vraie, le Text est ajouté, ce qui agrandit la Card. Sans animateContentSize(), la carte sauterait instantanément à sa nouvelle taille.'
          }
        ]
      },
      visualMockup: {
        type: 'animation-preview',
        title: 'Carte Extensible',
        startState: '[ Titre de la carte ] (Cliquable)',
        endState: '[ Titre de la carte \\n Voici beaucoup de détails... ]',
        transition: 'Agrandissement fluide du cadre'
      },
      commonMistakes: [
        {
          mistake: 'Oublier d\'importer androidx.compose.animation.animateContentSize.',
          fix: 'Faites Alt+Entrée (ou Option+Entrée) sur le modifier en rouge pour l\'importer correctement.',
          explanation: 'Contrairement à padding() ou fillMaxWidth(), les modifiers d\'animation nécessitent parfois un import spécifique.'
        }
      ],
      quiz: {
        question: 'Que se passe-t-il si vous mettez .animateContentSize() MAIS que la taille du composant ne change jamais ?',
        options: [
          'L\'application crashe (plante)',
          'Le composant clignote en permanence',
          'Il ne se passe rien, l\'animation n\'est déclenchée que si la taille varie',
          'Le composant tourne sur lui-même'
        ],
        correctIndex: 2,
        explanation: 'animateContentSize observe silencieusement. S\'il n\'y a pas de changement de taille, il n\'a rien à animer et n\'a aucun impact visuel.'
      },
      furtherReading: [
        {
          title: 'Documentation : Animer les changements de taille',
          url: 'https://developer.android.com/develop/ui/compose/animation/composables-modifiers#animatecontentsize'
        }
      ]
    },
    {
      id: 'animated-visibility',
      title: 'Apparaître et Disparaître : AnimatedVisibility',
      analogy: 'Au lieu d\'allumer la lumière avec un simple interrupteur on/off (apparition brutale), AnimatedVisibility fonctionne comme un gradateur qui augmente ou baisse doucement la lumière.',
      definition: 'Le composant AnimatedVisibility remplace un simple `if (visible)` pour afficher ou cacher un élément. Par défaut, il anime l\'apparition en s\'agrandissant et avec un fondu (fade in/out).',
      codeExample: {
        code: `@Composable
fun MessageAlerte() {
    var messageVisible by remember { mutableStateOf(false) }

    Column(modifier = Modifier.padding(16.dp)) {
        Button(onClick = { messageVisible = !messageVisible }) {
            Text("Basculer le message")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // 🌟 Remplace le classique "if (messageVisible)"
        AnimatedVisibility(visible = messageVisible) {
            Card(
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.errorContainer
                ),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = "Ce message apparaît et disparaît en douceur !",
                    modifier = Modifier.padding(16.dp),
                    color = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        }
    }
}`,
        lineByLine: [
          {
            line: 13,
            code: 'AnimatedVisibility(visible = messageVisible) {',
            explanation: 'Le conteneur magique. Tout ce qui est à l\'intérieur apparaîtra avec une animation au lieu d\'apparaître d\'un coup sec.'
          }
        ]
      },
      visualMockup: {
        type: 'animation-preview',
        title: 'Bascule de visibilité',
        startState: '[ Basculer le message ] (Bouton seul)',
        endState: '[ Basculer le message ]\\n[ Ce message apparaît en douceur ]',
        transition: 'Fondu (Fade) et glissement (Slide) depuis le haut'
      },
      commonMistakes: [
        {
          mistake: 'Mettre un `if` autour de AnimatedVisibility.',
          fix: 'N\'écrivez JAMAIS `if (visible) { AnimatedVisibility(...) }`. Passez simplement la variable booléenne directement dans le paramètre : `AnimatedVisibility(visible = ...)`',
          explanation: 'Si vous utilisez un `if` classique, Compose détruit instantanément le composant. AnimatedVisibility a besoin de rester dans l\'arbre des vues pour pouvoir "jouer" l\'animation de disparition avant de se détruire.'
        }
      ],
      quiz: {
        question: 'Pourquoi ne faut-il pas mettre AnimatedVisibility à l\'intérieur d\'un "if" classique ?',
        options: [
          'Parce que le "if" l\'empêche de jouer son animation de disparition (il est détruit d\'un coup)',
          'Parce que le compilateur Kotlin va refuser de compiler',
          'Parce que cela va créer une boucle infinie',
          'Parce que la couleur du texte deviendra rouge'
        ],
        correctIndex: 0,
        explanation: 'En effet ! L\'animation de disparition prend du temps (ex: 300ms). Un "if" classique détruit le composant en 0 milliseconde, tuant l\'animation instantanément.'
      },
      furtherReading: [
        {
          title: 'Documentation : AnimatedVisibility',
          url: 'https://developer.android.com/develop/ui/compose/animation/composables-modifiers#animatedvisibility'
        }
      ]
    },
    {
      id: 'animate-color-as-state',
      title: 'Changer de couleur doucement : animateColorAsState',
      analogy: 'Quand un feu de circulation passe au rouge, c\'est instantané. Mais animateColorAsState agit plutôt comme le ciel lors d\'un coucher de soleil : le bleu devient violet, puis rouge en passant par toutes les nuances intermédiaires.',
      definition: 'Au lieu de changer une couleur brusquement, "animateColorAsState" crée une variable de couleur qui transitionne doucement d\'une valeur à l\'autre. C\'est parfait pour les boutons de sélection ou de "J\'aime".',
      codeExample: {
        code: `@Composable
fun BoutonFavori() {
    var estFavori by remember { mutableStateOf(false) }

    // 🌟 On anime la couleur en fonction de l'état
    val couleurBouton by animateColorAsState(
        targetValue = if (estFavori) Color.Red else Color.LightGray,
        label = "Animation de couleur" // Obligatoire pour le débogage
    )

    IconButton(onClick = { estFavori = !estFavori }) {
        Icon(
            imageVector = Icons.Filled.Favorite,
            contentDescription = "Favori",
            // On utilise la couleur animée ici !
            tint = couleurBouton,
            modifier = Modifier.size(48.dp)
        )
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: 'val couleurBouton by animateColorAsState(',
            explanation: 'Crée une couleur qui va évoluer dans le temps.'
          },
          {
            line: 6,
            code: 'targetValue = if (estFavori) Color.Red else Color.LightGray',
            explanation: 'La couleur finale désirée. Si on clique, la cible passe de Gris à Rouge, et la fonction calcule toutes les teintes roses intermédiaires.'
          },
          {
            line: 15,
            code: 'tint = couleurBouton',
            explanation: 'On applique la couleur animée à notre icône.'
          }
        ]
      },
      visualMockup: {
        type: 'animation-preview',
        title: 'Bouton Coeur',
        startState: '🤍 (Cœur Gris)',
        endState: '❤️ (Cœur Rouge)',
        transition: 'Gris -> Rose clair -> Rose foncé -> Rouge (en 300ms)'
      },
      commonMistakes: [
        {
          mistake: 'Oublier le paramètre "label".',
          fix: 'Depuis les versions récentes de Compose, vous devez fournir un texte descriptif dans paramètre "label" (ex: label = "CouleurCoeur").',
          explanation: 'Ce label sert exclusivement aux outils développeur d\'Android Studio pour vous aider à déboguer les animations si elles ont un problème.'
        }
      ],
      quiz: {
        question: 'Quel est l\'intérêt d\'utiliser animateColorAsState plutôt que if(estFavori) Color.Red else Color.Gray directement sur le composant ?',
        options: [
          'Ça économise de la batterie',
          'Ça produit une transition fluide et calculée des couleurs intermédiaires (comme un fondu enchaîné)',
          'Ça permet d\'ajouter du son lors du clic',
          'C\'est obligatoire sinon Android Studio affiche une erreur'
        ],
        correctIndex: 1,
        explanation: 'L\'animation calcule automatiquement toutes les étapes entre le Gris et le Rouge, donnant une sensation premium à l\'interface.'
      },
      furtherReading: [
        {
          title: 'Documentation : animate*AsState',
          url: 'https://developer.android.com/develop/ui/compose/animation/value-based#animate-as-state'
        }
      ]
    },
    {
      id: 'animate-dp-as-state',
      title: 'Déplacements fluides : animateDpAsState',
      analogy: 'C\'est l\'équivalent de déplacer un meuble lourd dans le salon. Plutôt que de le téléporter magiquement d\'un coin à l\'autre, tu le fais glisser sur le sol. animateDpAsState calcule ce glissement.',
      definition: 'Fonctionnant de la même façon que pour la couleur, "animateDpAsState" permet d\'animer tout ce qui s\'exprime en DP (Dp = Density-independent Pixels) : les marges (padding), les tailles (width, height), l\'arrondi des bords, etc.',
      codeExample: {
        code: `@Composable
fun BoutonGlissant() {
    var estAroite by remember { mutableStateOf(false) }

    // 🌟 On anime un espacement (padding) de 0 à 100 dp
    val margeGauche by animateDpAsState(
        targetValue = if (estAroite) 100.dp else 0.dp,
        label = "Marge animée"
    )

    Column(modifier = Modifier.padding(16.dp)) {
        Button(
            onClick = { estAroite = !estAroite },
            // On applique la marge animée au bouton pour le déplacer
            modifier = Modifier.padding(start = margeGauche)
        ) {
            Text("Clique pour me déplacer")
        }
    }
}`,
        lineByLine: [
          {
            line: 5,
            code: 'val margeGauche by animateDpAsState(',
            explanation: 'Génère une valeur en DP qui s\'anime doucement.'
          },
          {
            line: 6,
            code: 'targetValue = if (estAroite) 100.dp else 0.dp',
            explanation: 'Si cliqué, la valeur va glisser de 0.dp, 10.dp, 20.dp... jusqu\'à 100.dp très rapidement.'
          },
          {
            line: 14,
            code: 'modifier = Modifier.padding(start = margeGauche)',
            explanation: 'En insérant cette valeur dynamique dans le Modifier.padding, on repousse le bouton vers la droite, créant un effet de déplacement.'
          }
        ]
      },
      visualMockup: {
        type: 'animation-preview',
        title: 'Bouton Glissant',
        startState: '[ Bouton à gauche ]',
        endState: '       [ Bouton à droite ]',
        transition: 'Glissement horizontal fluide'
      },
      commonMistakes: [
        {
          mistake: 'Créer une animation trop lente ou trop rapide en ignorant les spécifications (Spec).',
          fix: 'Vous pouvez personnaliser la vitesse en ajoutant animationSpec = tween(durationMillis = 1000) pour une animation d\'une seconde.',
          explanation: 'Par défaut, Compose utilise un effet ressort naturel très satisfaisant. Mais parfois on a besoin d\'un contrôle manuel précis.'
        }
      ],
      quiz: {
        question: 'Outre les marges (padding), sur quelle autre propriété animateDpAsState pourrait très bien fonctionner ?',
        options: [
          'La transparence d\'une image',
          'La couleur de l\'ombre d\'une carte',
          'La taille (height/width) ou le rayon de bordure (RoundedCornerShape(XX.dp)) d\'une image',
          'Le texte contenu dans un composant Text'
        ],
        correctIndex: 2,
        explanation: 'Tout ce qui prend un chiffre suivi de .dp (taille, bordure, élévation, ombre) peut être animé avec animateDpAsState !'
      },
      furtherReading: [
        {
          title: 'Documentation avancée : AnimationSpec',
          url: 'https://developer.android.com/develop/ui/compose/animation/customize'
        }
      ]
    }
  ]
};
