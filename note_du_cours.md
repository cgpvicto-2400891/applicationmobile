Bases de Jetpack Compose¶
15.1 Qu'est-ce que Jetpack Compose?¶
Jetpack Compose est une boîte d'outils qui permet de définir des interfaces utilisateur (UI) pour applications Android écrites avec Kotlin.

Jetpack Compose implémente Material Design , une bibliothèque spécialisée pour bâtir des interfaces utilisateur.

Auparavant, les interfaces étaient bâties à l'aide de code XML. Avec Jetpack Compose, l'interface sera décrite par programmation à l'aide de fonctions modulables.

Si vous avez déjà programmé des applications mobiles pour iPhone avec SwiftUI ou des applications pour iPhone ou Android avec Flutter, vous trouverez plusieurs ressemblances entre ces technologies.

À titre d'exemple, voici une fonction modulable qui permet d'afficher le mot Hello suivi d'une information reçue en paramètre. Chaque fonction modulable est en fait un élément graphique.

Kotlin

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!", fontWeight = FontWeight.Bold)
}
Pour plus d'information¶
« Créez de meilleures applications plus rapidement avec Jetpack Compose » - Android Developers

« Tutoriel Jetpack Compose » - Android Developers

« Qu’est ce que Jetpack Compose ? Conseils, » - mobiskill

« Flutter est mort; Vive Jetpack Compose. » - Kossi Mathias KALIPE

« The Ultimate Jetpack Compose Cheat Sheet » - HackerNoon

« Introducing the Compose Material Catalog » - Material Design Blog

15.2 Les fonctions modulables¶
Avec Jetpack Compose, tout ce qui est affiché à l'écran est défini dans une fonction modulable, aussi appelée fonction composable ou simplement composable.

Il s'agit d'une fonction précédée par l'annotation @Composable. Cette fonction appelle généralement d'autres fonctions modulables, par exemple Text() ou Image().

Chaque fonction modulable est en fait un élément graphique.

À titre d'exemple, lors de la création initiale d'un projet, une fonction modulable est définie pour afficher le mot Hello suivi d'une information reçue en paramètre.

Kotlin

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}
Pour plus d'information¶
« Lifecycle of composables » - Android Developer

« Compose layout basics » - Android Developer

« Thinking in Compose » - Android Developer

15.3 Par où commence le code de mon application?¶
Afin de bien comprendre où le code doit être placé, il faut avoir une vue globale du fonctionnement d'une application Android bâtie avec Kotlin et Jetpack Compose.

Fichier AndroidManifest.xml¶
C'est ce fichier qui détermine quel autre fichier démarrera l'application.

Voici son code initial. On y voit que la classe de départ s'appelle MainActivity. Le point qui précède ce nom indique que la classe fait partie de l'espace de nom spécifié dans le fichier app/build.gradle.kts .

Fichier AndroidManifest.xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld"
        tools:targetApi="31">
        <activity
             android:name=" .MainActivity "
             android:exported="true"
             android:label="@string/app_name"
             android:theme="@style/Theme.HelloWorld">
             <intent-filter>
                 <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
             </intent-filter>
        </activity>
    </application>
</manifest>
Et voici le code du fichier qui définit cette classe.

Fichier MainActivity.kt (Kotlin)

package com.mondomaine.helloworld
import ...
class MainActivity : ComponentActivity () {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            HelloWorldTheme {
                 Scaffold (modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting (
                        name = "Android"
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}
@Composable
fun Greeting (name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
@Preview (showBackground = true)
@Composable
fun GreetingPreview() {
    HelloWorldTheme {
        Greeting("Android")
    }
}
Quelques explications :

La classe MainActivity hérite de ComponentActivity (). Vous pouvez consulter le code de cette classe en faisant
Ctrl +Clic (Windows) ou ⌘ Cmd +Clic (Mac) sur son nom.
Dans son constructeur, on commence par exécuter le constructeur de la classe parent. On définit ensuite que l'application utilise le thème nommé HelloWorldTheme . Ce thème est défini dans le fichier
app/src/main/java/com.mondomaine.helloworld/ui.theme/Theme.kt . On peut y accéder facilement en faisant Ctrl +Clic (Windows) ou ⌘ Cmd +Clic (Mac) sur son nom.
Le constructeur spécifie ensuite la structure de l'écran ( Scaffold ) et son contenu.
Le contenu est défini par la fonction modulable Greeting() .
Au bas du fichier, on remarque l'annotation @Preview . Ceci permet d'avoir un aperçu en temps réel de l'interface utilisateur dans l'environnement de développement sans avoir à lancer l'application.


Éléments d'interface utilisateur Compose¶
Text()¶
La fonction modulable Text permet d'afficher un texte à l'écran.

Kotlin

import androidx.compose.material3.Text
...
@Composable
fun UneFonction() {
    Text(text = "Bonjour!")
}
Il est possible de lui fournir des paramètres pour indiquer l'apparence que le texte prendra.

Jetpack Compose (Kotlin)

Text(
    text = "Bonjour!",
    fontSize = 25.sp,
    fontStyle = FontStyle.Italic,
    fontFamily = FontFamily.SansSerif,
    color = MaterialTheme.colorScheme.primary
)
Centrer du texte horizontalement¶
Si un texte s'étend sur plus d'une ligne, il peut être intéressant de le centrer horizontalement.

Jetpack Compose (Kotlin)

Text(
    text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    textAlign = TextAlign.Center,
)
Texte enrichi¶
buildAnnotatedString permet de créer du texte enrichi.

Il est possible, par exemple, d'appliquer un style sur une partie précise d'une chaîne de caractères.

Ici, on crée un texte dont un mot apparaît en rouge.

Jetpack Compose (Kotlin)

val texteAvecMotRouge = buildAnnotatedString {
    append("Ma couleur préférée est le ")
    withStyle(style = SpanStyle(color = Color.Red)) {
        append("rouge")
    }
    append(".")
}
Text(texteAvecMotRouge)
Lien hypertexte¶
buildAnnotatedString permet également de créer un lien hypertexte pour ouvrir l'URL dans un navigateur.

Jetpack Compose (Kotlin)

Text(
    buildAnnotatedString {
        withLink(
            LinkAnnotation.Url(
                "https://apical.xyz",
            )
        ) {
            append("Apical")
        }
    }
)
Et pour styler le texte du lien :

Jetpack Compose (Kotlin)

Text(
    buildAnnotatedString {
        withLink(
            LinkAnnotation.Url(
                "https://apical.xyz",
                styles = TextLinkStyles(
                    style = SpanStyle(
                        fontSize = 25.sp,
                    )
                ),
            )
        ) {
            append("Apical")
        }
    }
)
Limiter la longueur du texte affiché à l'écran¶
Prenons le cas où on a une ligne (Row()) avec du texte à gauche et une icône à droite. Dans le cas où le texte est plus long que la largeur de l'écran, l'icône ne sera plus visible.

Pour corriger la situation, on peut limiter la largeur du texte à la place disponible et indiquer comment on veut que le débordement se comporte.

Ici, on limite le texte à une seule ligne et on ajoute des points de suspension.

Jetpack Compose (Kotlin)

Row(
    verticalAlignment = Alignment.CenterVertically,
) {
    Text(
        text = "Ce texte est plus large que l'écran alors il sera tronqué",
        // sans ces trois lignes, un long texte poussait les boutons hors de l'écran
        modifier = Modifier.weight(1f),
        maxLines = 1,
        overflow = TextOverflow.Ellipsis
    )
    // pour ne pas que les points de suspension soient collés à l'icône
    Spacer(modifier = Modifier.width(8.dp))
    IconButton(onClick = {
        ...
    }) {
        Icon(Icons.Filled.Edit, contentDescription = "Modifier")
    }
}
Illustration

Pour plus d'information¶
« Texte dans Compose » - Android Developers

« Typography - Type scale » - Material Design 3

« Appliquer un style au texte » - Android Developers

* « Composing AnnotatedString — Poetry, Music, Code, Blogs, Expandables and Beyond » - Medium¶
music-code-blogs-expandables-and-beyond-b5f7ec35a49b 5.2 Column()

Column()¶
La fonction modulable Column permet de placer les composants en colonne, l'un sous l'autre.

Jetpack Compose (Kotlin)

import androidx.compose.foundation.layout.Column
...
@Composable
fun UneFonction() {
    Column {
        Text(text = "Première ligne")
        Text(text = "Deuxième ligne")
    }
}
Centrage¶
Il est possible d'ajouter des modificateurs directement sur la colonne.

Par exemple, pour centrer le contenu de la colonne horizontalement et verticalement :

Jetpack Compose (Kotlin)

Column(
    modifier = Modifier.fillMaxSize(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center,
) {
    ...
}
Espacement¶
Ici, on ajoute de l'espace autour du contenu de la colonne.

Attention : le concept est différent du padding qu'on connaît en Web avec les feuilles de style. Dans JetPack compose, le padding est l'équivalent d'un margin en CSS. En effet, si la colonne avait une couleur de fond, l'espace créé par le padding ne prendrait pas la couleur de fond.

Jetpack Compose (Kotlin)

Column(
    modifier = Modifier
        .padding(all = 25.dp)
) {
    ...
}
Pour ajouter de l'espace entre les composables affichés dans la colonne :

Jetpack Compose (Kotlin)

Column(
    verticalArrangement = Arrangement.spacedBy(10.dp)
) {
    ...
}
Défilement¶
Pour assurer que le contenu de la colonne puisse défiler à l'écran si jamais il est trop long, on peut lui ajouter un verticalScroll.

Jetpack Compose (Kotlin)

Column(
    modifier = Modifier
        .padding(all = 25.dp)
        .verticalScroll(rememberScrollState())
) {
    ...
}
Pour plus d'information¶
« Listes et grilles » - Android Developers

« 07 Compose - Layout – Column + Row + Spacer » - DEV Community

* « Principes de base de la mise en page dans Compose » - Android Developers¶
Row()¶
La fonction modulable Row permet de placer les composants en rangée, l'un à côté de l'autre.

Kotlin

import androidx.compose.foundation.layout.Row
...
@Composable
fun UneFonction() {
    Row {
        Text(text = "Texte de gauche")
        Text(text = "Texte de droite")
    }
}
Centrage¶
Il est possible d'ajouter des modificateurs directement sur la ligne.

Par exemple, pour centrer le contenu de la ligne verticalement :

Jetpack Compose (Kotlin)

Row(
    verticalAlignment = Alignment.CenterVertically
) {
    ...
}
Pour centrer le contenu de la ligne horizontalement :

Jetpack Compose (Kotlin)

Row(
    horizontalArrangement = Arrangement.Center
) {
    ...
}
Espacement¶
Ici, on ajoute de l'espace autour de chaque composable de la ligne de façon à remplir toute la largeur disponible.

Jetpack Compose (Kotlin)

Row(
    modifier = Modifier
        .fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween
) {
    ...
}
Ici, on ajoute plutôt un espacement fixe entre les composables de la ligne.

Jetpack Compose (Kotlin)

Row(
    horizontalArrangement = Arrangement.spacedBy(16.dp)
) {
    ...
}
Pour plus d'information¶
« Listes et grilles » - Android Developers

« 07 Compose - Layout – Column + Row + Spacer » - DEV Community

* « Principes de base de la mise en page dans Compose » - Android Developers¶
Box()¶
La fonction modulable Box permet de placer les éléments en couches perpendiculaires à l'écran, l'un par-dessus l'autre.

Jetpack Compose (Kotlin)

import androidx.compose.foundation.layout.Box
...
@Composable
fun UneFonction() {
    Box {
        Text(text = "Texte du fond")
        Text(text = "Texte du dessus")
    }
}
Illustration

Il est également possible d'utiliser un Box pour dessiner des rectangles. Il faudra prendre soin de les placer dans un Column ou dans un Row pour ne pas qu'ils soient empilés l'un sur l'autre.

Jetpack Compose (Kotlin)

Column(
    modifier = Modifier
        .fillMaxSize(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
) {
    Box(
        modifier = Modifier
        .size(100.dp)
        .background(Color.Blue)
    )
    Box(
        modifier = Modifier
        .size(100.dp)
        .background(Color.Red)
    )
}
Illustration

Un Box peut aussi servir à encadrer autre chose.

Jetpack Compose (Kotlin)

Box(
    modifier = Modifier
        .border(5.dp, Color.Cyan, RoundedCornerShape(15.dp))
        .padding(horizontal = 40.dp, vertical = 20.dp),
    contentAlignment = Alignment.Center
) {
    Text(
        text = "Hello world!",
        fontSize = 50.sp
    )
}
Illustration

Une utilisation intéressante du box : réserver de l'espace pour des éléments graphiques qui ne sont affichés que lorsqu'une condition est remplie.

Ceci est intéressant dans un design centré verticalement sinon, tout l'écran « bouge » quand la condition est remplie et que de nouveaux éléments sont affichés.

Jetpack Compose (Kotlin)

Column(
    modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center,
) {
    ...
    // pour réserver l'espace utilisé par la partie du bas même si rien n'est affiché
    Box(
        modifier = Modifier
            .size(200.dp)
            .padding(25.dp)
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            if (...) {
                Text(...)
                Image(...)
            }
        }
    }
}
Comme beaucoup d'autres composables, un Box peut réagir à un clic.

Jetpack Compose (Kotlin)

Box(
    modifier = Modifier
        .clickable(
            onClick = {
                // ...
            },
        ),
    ...
) {
    ...
}
Pour plus d'information¶
« Listes et grilles » - Android Developers

« 07 Compose - Layout – Column + Row + Spacer » - DEV Community

* « Principes de base de la mise en page dans Compose » - Android Developers¶
Image()¶
Pour afficher une image dans une interface utilisateur, il faut d'abord l'ajouter en tant que ressource dans l'onglet Resource Manager -> Import Drawables.

Plusieurs types d'images sont supportés: JPG, PNG, SVG, GIF, BMP, WebP, HEIF et autres.

L'image sera affichée à l'aide de l'élément Image et le nom de resource sera fourni à l'aide de R.drawable.<nom_ressource>.

Jetpack Compose (Kotlin)

import androidx.compose.foundation.Image
import androidx.compose.ui.res.painterResource
...
@Composable
fun UneFonction() {
    Image(
        painter = painterResource(R.drawable.nom_ressource),
        contentDescription = "Description",
    )
}
Il est possible d'appliquer des modificateurs pour changer l'apparence de l'image.

Jetpack Compose (Kotlin)

Image(
    painter = painterResource(R.drawable.nom_ressource),
    contentDescription = "Description",
    modifier = Modifier
       .fillMaxSize()
)
ou encore :

Jetpack Compose (Kotlin)

Image(
    painter = painterResource(R.drawable.nom_ressource),
    contentDescription = "Description",
    modifier = Modifier
        .size(75.dp)
        .clip(CircleShape)
        .border(2.dp, MaterialTheme.colorScheme.outline, CircleShape)
)
encore un exemple, cette fois le code affiche deux images côte-à-côte en remplissant la largeur de l'écran :

Jetpack Compose (Kotlin)

Row {
    Image(
        painter = painterResource(R.drawable.image_1),
        contentDescription = "Première image",
        contentScale = ContentScale.FillWidth,
        modifier = Modifier
            .weight(1f)
    )
    Image(
        painter = painterResource(R.drawable.image_2),
        contentDescription = "Deuxième image",
        contentScale = ContentScale.FillWidth,
        modifier = Modifier
            .weight(1f)
    )
}
Image dont le nom est contenu dans une variable¶
Dans les exemples précédents, le nom de l'image, ou plutôt son identifiant, était une propriété de R.drawable. Ce n'était pas une chaîne de caractères.

Lorsque le nom de l'image est contenu dans une variable sous forme de chaîne de caractères, il faut utiliser une technique pour retrouver l'identifiant de la ressource à partir de cette chaîne.

Attention : cette technique nuit à l'optimisation du code et devrait être réservée pour les cas où il n'est pas possible de fournir directement l'identifiant de l'image.

Android Studio générera d'ailleurs cet avertissement : « Use of this function is discouraged because resource reflection makes it harder to perform build optimizations and compile-time verification of code. It is much more efficient to retrieve resources by identifier (e.g. R.foo.bar) than by name (e.g. getIdentifier("bar", "foo", null)). ».

Jetpack Compose (Kotlin)

val context = LocalContext.current
val ressourceId = remember(nomImage) {
    context.resources.getIdentifier(
        nomImage,
        "drawable",
        context.packageName
    )
}
if (ressourceId != 0) {
    Image(
        painter = painterResource(ressourceId),
        contentDescription = "Description",
    )
}
Pour plus d'information¶
« Utiliser des images » - Android Developer

« Supported media formats - Image support » - Adroid Developers

* « Personnaliser une image » - Android Developers¶
AsyncImage()¶
Avec AsyncImage() , il est possible d'afficher une image à partir d'un URL.

D'abord, il faut ajouter une dépendance.

Cette ligne doit être ajoutée dans le fichier build.gradle.kts qui se trouve dans le dossier app .

Fichier app/build.gradle.kts

...
dependencies {
    ...
    // pour image à partir d'un URL
    implementation("io.coil-kt:coil-compose:2.7.0")
}
Une fois la dépendance ajoutée, il faut resynchroniser le projet pour qu'il tienne compte de l'ajout.

Pour afficher l'image :

Jetpack Compose (Kotlin)

AsyncImage(
    model ="https://apical.xyz/Sourire.png",
    contentDescription = "Sourire",
    modifier = Modifier.size(300.dp)
)
Icône avec la bibliothèque Material Symbols¶
La fonction modulable Icon permet d'afficher une icône à l'écran.

Les icônes disponibles par défaut sont tirées de la bibliothèque gratuite Material Icons .

Jetpack Compose (Kotlin)

Icon(imageVector = Icons.Default.Home, contentDescription = "home")
Illustration

Pour connaître la liste des icônes disponibles par défaut, entrez Icons.Default. puis parcourez la liste de suggestions.

Illustration

Chaque icône peut être affichée dans différents styles.

Jetpack Compose (Kotlin)

Row() {
    Icon(imageVector = Icons.Default.Home, contentDescription = "home")
    Icon(imageVector = Icons.Outlined.Home, contentDescription = "home")
    Icon(imageVector = Icons.Filled.Home, contentDescription = "home")
    Icon(imageVector = Icons.Rounded.Home, contentDescription = "home")
    Icon(imageVector = Icons.Sharp.Home, contentDescription = "home")
    Icon(imageVector = Icons.TwoTone.Home, contentDescription = "home")
}
Illustration

Il est possible d'appliquer des attributs et des modifiers afin de mieux contrôler l'apparence de l'icône.

Jetpack Compose (Kotlin)

Icon(
    imageVector = Icons.Default.Home,
    contentDescription = "home",
    tint = MaterialTheme.colorScheme.secondary,
    modifier = Modifier.size(30.dp)
)
Illustration

Autre exemple :

Jetpack Compose (Kotlin)

Icon(
    imageVector = Icons.Default.Info,
    contentDescription = "info",
    tint = Color.Blue
)
Icône cliquable¶
Pour rendre l'icône cliquable, il faut l'intégrer dans un IconButton .

Jetpack Compose (Kotlin)

IconButton(onClick = {
    ...
}) {
    Icon(Icons.Filled.Edit, contentDescription = "Modifier")
}
Pour avoir accès à plus d'icônes¶
Pour avoir accès à une plus grande quantité d'icônes, soit aux icônes de la bibliothèque Material Symbols , il faut ajouter une dépendance au projet.

Ajoutez cette ligne dans le fichier build.gradle.kts qui se trouve dans le dossier app .

Attention : ceci augmentera substantiellement la taille de l'application. Je vous conseille de vérifier parmi les icônes disponibles de base (il y en a près d'une cinquantaine) avant d'ajouter cette dépendance.

Fichier app/build.gradle.kts

...
dependencies {
    ...
    // pour avoir accès à plus d'icônes (alourdit l'application)
    implementation("androidx.compose.material:material-icons-extended")
}
Une fois la dépendance ajoutée, il faut resynchroniser le projet pour qu'il tienne compte de l'ajout.

Vous avez désormais accès à plus d'icônes.

Jetpack Compose (Kotlin)

Icon(imageVector = Icons.Default.SwipeUp, contentDescription = "Glisser vers le haut")
Pour plus d'information¶
* « Introducing Material Symbols » - Google¶
5.8 Les couleurs

La gestion des couleurs dans une application Android basée sur Jetpack Compose est réalisée à l'aide de la bibliothèque Material Design 3 .

Constantes de couleur¶
Pour définir une couleur, Kotlin met à votre disposition des constantes pour identifier les principales couleurs , par exemple Color.Black.

Dans l'image qui suit, celle qui n'est pas visible s'appelle Color.Transparent ;-)

J'ai légèrement grisé le fond d'écran pour qu'on puisse voir le blanc.

Illustration

Pour utiliser une de ces constantes :

Kotlin

val couleur = Color.Black
Code hexadécimal¶
Il est également possible d'utiliser un code hexadécimal pour définir une couleur. Il suffit d'ajouter 0xFF devant le code de couleur à 6 caractères.

Le 0x indique que c'est une valeur hexadécimale.

Le FF signifie aucune transparence.

Kotlin

val couleur = Color(0xFF20A1C9)
Autre technique équivalente : convertir une chaîne en couleur à l'aide de toColor().

Kotlin

val couleur = "#20A1C9".toColor()
Couleurs du thème¶
Lorsque vous créez un projet basé sur Jetpack Compose, le projet est automatiquement basé sur un thème.

Les couleurs du thème par défaut sont illustrées sur le site de Material Design 3 . J'ai reproduit l'image ici pour plus de commodité.

Illustration

En utilisant le rôle d'une couleur (ex : MaterialTheme.colorScheme.primary) plutôt qu'un nom (ex : Color.Black) ou un code hexadécimal (ex : #000000), on laisse le soin au système d'adapter la couleur selon que l'appareil mobile utilise le thème clair ou foncé.

Attention : avec Material Design 2, on utilisait la méthode color alors qu'avec Material Design 3, c'est plutôt¶
colorScheme.

Kotlin

Text(
    text = "Hello World!",
    color = MaterialTheme.colorScheme.primary
)
Il est possible de visualiser les couleurs du thème à l'aide de cet extrait de code :

Kotlin

Column(
    modifier = Modifier
        .padding(all = 25.dp)
        .verticalScroll(rememberScrollState())
) {
    Text(text = "primary", color = MaterialTheme.colorScheme.onPrimary, modifier = Modifier.background(color =
MaterialTheme.colorScheme.primary).padding(10.dp))
    Text(text = "onPrimary", color = MaterialTheme.colorScheme.primary, modifier = Modifier.background(color =
MaterialTheme.colorScheme.onPrimary).padding(10.dp))
    Text(text = "inversePrimary", color = MaterialTheme.colorScheme.primary, modifier = Modifier.background(color =
MaterialTheme.colorScheme.inversePrimary).padding(10.dp))
    Text(text = "primaryContainer ", color = MaterialTheme.colorScheme.onPrimaryContainer, modifier =
Modifier.background(color = MaterialTheme.colorScheme.primaryContainer).padding(10.dp))
    Text(text = "onPrimaryContainer", color = MaterialTheme.colorScheme.primaryContainer, modifier = Modifier.background(color
= MaterialTheme.colorScheme.onPrimaryContainer).padding(10.dp))
    Spacer(modifier = Modifier.height(30.dp))
    Text(text = "secondary", color = MaterialTheme.colorScheme.onSecondary, modifier = Modifier.background(color =
MaterialTheme.colorScheme.secondary).padding(10.dp))
    Text(text = "onSecondary", color = MaterialTheme.colorScheme.secondary, modifier = Modifier.background(color =
MaterialTheme.colorScheme.onSecondary).padding(10.dp))
    Text(text = "secondaryContainer ", color = MaterialTheme.colorScheme.onSecondaryContainer, modifier =
Modifier.background(color = MaterialTheme.colorScheme.secondaryContainer).padding(10.dp))
    Text(text = "onSecondaryContainer", color = MaterialTheme.colorScheme.secondaryContainer, modifier =
Modifier.background(color = MaterialTheme.colorScheme.onSecondaryContainer).padding(10.dp))
    Spacer(modifier = Modifier.height(30.dp))
    Text(text = "tertiary", color = MaterialTheme.colorScheme.onTertiary, modifier = Modifier.background(color =
MaterialTheme.colorScheme.tertiary).padding(10.dp))
    Text(text = "onTertiary", color = MaterialTheme.colorScheme.tertiary, modifier = Modifier.background(color =
MaterialTheme.colorScheme.onTertiary).padding(10.dp))
    Text(text = "tertiaryContainer ", color = MaterialTheme.colorScheme.onTertiaryContainer, modifier =
Modifier.background(color = MaterialTheme.colorScheme.tertiaryContainer).padding(10.dp))
    Text(text = "onTertiaryContainer", color = MaterialTheme.colorScheme.tertiaryContainer, modifier =
Illustration


Modifier.background(color =
MaterialTheme.colorScheme.onTertiaryContainer).padding(10.dp))
    Spacer(modifier = Modifier.height(30.dp))
    Text(text = "background", color = MaterialTheme.colorScheme.onBackground,
modifier = Modifier.background(color =
MaterialTheme.colorScheme.background).padding(10.dp))
    Text(text = "onBackground", color = MaterialTheme.colorScheme.background,
modifier = Modifier.background(color =
MaterialTheme.colorScheme.onBackground).padding(10.dp))
    Spacer(modifier = Modifier.height(30.dp))
    Text(text = "surface", color = MaterialTheme.colorScheme.onSurface, modifier =
Modifier.background(color = MaterialTheme.colorScheme.surface).padding(10.dp))
    Text(text = "onSurface", color = MaterialTheme.colorScheme.surface, modifier =
Modifier.background(color = MaterialTheme.colorScheme.onSurface).padding(10.dp))
    Text(text = "inverseSurface", color =
MaterialTheme.colorScheme.inverseOnSurface, modifier = Modifier.background(color =
MaterialTheme.colorScheme.inverseSurface).padding(10.dp))
    Text(text = "inverseOnSurface", color =
MaterialTheme.colorScheme.inverseSurface, modifier = Modifier.background(color =
MaterialTheme.colorScheme.inverseOnSurface).padding(10.dp))
    Text(text = "onSurfaceVariant", color = MaterialTheme.colorScheme.surface,
modifier = Modifier.background(color =
MaterialTheme.colorScheme.onSurfaceVariant).padding(10.dp))
    Text(text = "surfaceTint", color = MaterialTheme.colorScheme.surface, modifier
= Modifier.background(color =
MaterialTheme.colorScheme.surfaceTint).padding(10.dp))
    Spacer(modifier = Modifier.height(30.dp))
    Text(text = "error", color = MaterialTheme.colorScheme.onError, modifier =
Modifier.background(color = MaterialTheme.colorScheme.error).padding(10.dp))
    Text(text = "onError", color = MaterialTheme.colorScheme.error, modifier =
Modifier.background(color = MaterialTheme.colorScheme.onError).padding(10.dp))
    Text(text = "errorContainer", color =
MaterialTheme.colorScheme.onErrorContainer, modifier = Modifier.background(color =
MaterialTheme.colorScheme.errorContainer).padding(10.dp))
    Text(text = "onErrorContainer", color =
MaterialTheme.colorScheme.errorContainer, modifier = Modifier.background(color =
MaterialTheme.colorScheme.onErrorContainer).padding(10.dp))
    Spacer(modifier = Modifier.height(30.dp))
    Text(text = "outline", color = Color.White, modifier =
Modifier.background(color = MaterialTheme.colorScheme.outline).padding(10.dp))
}
Configurer les couleurs du thème¶
Les couleurs du thème peuvent être configurées pour répondre à vos besoins.

Il faut d'abord définir des couleurs dans le fichier app/src/main/java/com/mondomaine/monprojet/ui/theme/Color.kt.

Fichier Color.kt

val BleuPale = Color(0xFF36D8F4)
val BleuFonce = Color(0xFF20A1C9)
Il faut ensuite associer ces couleurs à un rôle dans le fichier

app/src/main/java/com/mondomaine/monprojet/ui/theme/Theme.kt .

Fichier Theme.kt

private val DarkColorScheme = darkColorScheme(
    primary = BleuPale,
    ...
)
private val LightColorScheme = lightColorScheme(
    primary = BleuFonce,
    ...
}
Par défaut, le thème utilise des couleurs dynamiques c'est-à-dire que les couleurs s'adaptent automatiquement aux couleurs du papier peint installé sur l'appareil mobile.

Si vous désirez imposer les couleurs que vous venez de configurer, vous devrez désactiver les couleurs dynamiques.

Fichier Theme.kt

@Composable
fun HelloWorldTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
Illustration


    dynamicColor: Boolean = false ,
    content: @Composable () -> Unit
) {...}
!!! warning "Attention : n'utilis" Attention : n'utilisez pas le gestionnaire de ressources pour configurer les couleurs du thème. Il permet de définir des couleurs qui seront synchronisées avec le fichier XML app/src/main/res/values/colors.xml . Ce fichier est utilisé avec l'approche traditionnelle pour définir des interfaces utilisateur. Jetpack Compose ne l'utilise pas. Il se sert plutôt du fichier Color.kt.

Pour plus d'information¶
« Color System - Tokens » - Material Design 3

« Understanding Themes in Jetpack Compose » - SemicolonSpace

* « Using Hex Colors in Jetpack Compose » - DeveloperMemos¶
5.9 Spacer()

Un espaceur (Spacer) est un composable qui permet d'ajouter de l'espace entre des éléments à l'écran.

Pour ajouter de l'espace entre deux éléments dans un Column, on précisera la hauteur de l'espaceur.

Ici, l'unité .dp représente des pixels indépendants de la densité (density-independent pixels), aussi appelés pixels indépendants de l'appareil (device-independent pixels).

Kotlin

Column {
    Text(text = "Première ligne")
    Spacer(modifier = Modifier.height(4.dp))
    Text(text = "Deuxième ligne")
}
Dans le cas d'un Row, on précisera la largeur de l'espaceur.

Kotlin

Row {
    Text(text = "Texte de gauche")
    Spacer(modifier = Modifier.width(8.dp))
    Text(text = "Texte de droite")
}
Dans les deux cas, il est possible de spécifier la hauteur et la largeur à l'aide de size.

Kotlin

Column {
    Text("Hello")
    Spacer(modifier = Modifier.size(10.dp))
    Text("World")
}
Remplir l'espace disponible¶
Plutôt que l'utiliser les unités .dp pour spécifier une taille, il est possible de spécifier un poids (weight).

Le poids sera un nombre de type float donc il sera suivi de la lettre f.

La valeur 1 signifie 1 fois l'espace restant. Dans cet exemple, le mot Hello sera dans le haut de l'écran et le mot World sera dans le bas puisque l'espaceur remplira l'espace disponible.

Kotlin

Column {
    Text("Hello")
    Spacer(modifier = Modifier.weight(1f))
    Text("World")
}
S'il y a plusieurs espaceurs, ils pourront se partager l'espace restant selon le poids de chaque espaceur.

Ici, le deuxième espaceur prend 2 fois plus d'espace que le premier.

Kotlin

Column {
    Text("Haut")
    Spacer(modifier = Modifier.weight(1f))
    Text("En bas du centre")
    Spacer(modifier = Modifier.weight(2f))
    Text("Bas")
}
Pour plus d'information¶
« Spacer » - Jetpack Compose Playground
* « Support different pixel densities » - Android Developers¶
5.10 Surface()

Le composable Surface() représente une surface matérielle à laquelle on peut appliquer des modifieurs différents styles comme une forme, une couleur et même une élévation.

On placera d'autres composables à l'intérieur de la surface.

Notez qu'avec Material Design 2, on pouvait utiliser elevation(). Avec Material Design 3, on utilisera plutôt shadowElevation() ou tonalElevation().

Kotlin

Surface(
    shape = MaterialTheme.shapes.large,
    shadowElevation = 1.dp,
) {
    Text(
        text = "Bonjour",
        modifier = Modifier.padding(10.dp),
        style = MaterialTheme.typography.titleSmall
    )
}
Illustration

Pour plus d'information¶
« Beware of this pitfall in Jetpack Compose! » - Medium
5.11 Les formes¶
Dessiner une forme¶
La fonction modulable Canvas permet de dessiner une forme.

Vous utiliserez une des méthodes proposées , par exemple drawRect, drawRoundRect, drawCircle, drawLine, drawOval, drawArc, drawPoints.

Jetpack Compose (Kotlin)

Canvas (
    modifier = Modifier
    .fillMaxSize()
) {
    drawRoundRect (
        color = Color.Red,
        size = Size(size.width, 200f),
        cornerRadius = CornerRadius(25f)
    )
}
Forme d'une image¶
Jetpack Compose vous propose différents composables qui permettent notamment de délimiter une image : CircleShape, RectangleShape, RoundedCornerShape et CutCornerShape.

Jetpack Compose (Kotlin)

import androidx.compose.foundation.shape.CircleShape
...
Image(
    ...
    modifier = Modifier
        .clip( CircleShape )
        .border(1.5.dp, MaterialTheme.colorScheme.outline, CircleShape )
)
Pour plus d'information¶
« Canvas in Jetpack Compose » - Medium

« Jetpack Compose in Many Shapes and Forms » - Cups of Code

5.12 Button()¶
Avec Jetpack Compose, un bouton est défini à l'aide de la fonction modulable Button .

Jetpack Compose (Kotlin)

Button(
    onClick = {
        // ...
    }
) {
    Text(text = "Enregistrer")
}
Pour modifier la couleur de fond du bouton :

Jetpack Compose (Kotlin)

Button(
    colors = ButtonDefaults.buttonColors(containerColor = Color.Red),
    onClick = {
        // ...
    }
) {
    Text(text = "Enregistrer")
}
Remarquez qu'avec Material Design 3, on utilise containerColor alors qu'avec Material Design 2, il fallait¶
utiliser backgroundColor.

Pour désactiver un bouton, par exemple quand les données ne sont pas valides, il suffit d'utiliser une variable d'état booléenne avec l'attribut enabled :

Jetpack Compose (Kotlin)

Button(
    enabled = donneesValides,
    onClick = {
        // ...
    }
) {
    Text(text = "Enregistrer")
}
Pour plus d'information¶
« Buttons in Jetpack Compose » - Jetpack Compose
5.13 Popup()¶
La fonction modulable Popup permet d'afficher un composable à l'écran par-dessus ce qui y est déjà affiché.

Popup() servira généralement à afficher un message. Si vous avez besoin d'une confirmation, vous utiliserez plutôt AlertDialog().

Pour utiliser Popup(), on travaillera avec une variable d'état (la variable d'état pourrait aussi faire partie d'un ViewModel) qui détermine si le popup doit être affiché ou non.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
     var afficherPopup: Boolean by remember { mutableStateOf(false) }
    // contenu de l'écran principal
    ...
    // bouton pour afficher le popup
    Button (
        onClick = {
            afficherPopup = true
        }
    ) {
        Text(text = "Afficher le popup")
    }
    if (afficherPopup) {
        Popup(
            alignment = Alignment.Center,   // centrer le Popup dans son parent
            onDismissRequest = { afficherPopup = false },   // le popup se refermera si on clique en dehors
        ) {
            // contenu du popup
            ...
            // bouton qui fait quelque chose puis referme le popup
            Button(
                onClick = {
                    ...
                    afficherPopup = false
                }
            ) {
                Text(text = "Faire quelque chose")
            }
        }
    }
}
Voici un exemple.

Remarquez que pour donner une couleur de fond au popup, j'ai utilisé un Card().

Jetpack Compose (Kotlin)

Popup(
    alignment = Alignment.Center, // centrer le Popup dans son parent
    ...
) {
    Card (
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant,
        ),
        shape = RoundedCornerShape(10),
        border = BorderStroke(1.dp, Color.Black),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 6.dp
        ),
    ) {
        Column(
            // centrer le contenu du Popup
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(25.dp)
        ) {
            Text("Vous passez au niveau 3!")
            Spacer(modifier = Modifier.height(14.dp))
            Button(
                 onClick = {...}
            ) {
                 Text("OK")
            }
        }
    }
}
Illustration

Pour plus d'information¶
* « Jetpack Compose Popup — Master It! » - Medium¶
5.14 Card()

La fonction modulable Card permet de regrouper des composables en les plaçant par exemple dans un rectangle stylisé.

Voici un exemple de base du Card.

Jetpack Compose (Kotlin)

Card {
    Text("Première ligne")
    Text("Deuxième ligne")
}
Illustration

Si on fait Ctrl +Clic sur le mot Card dans Android Studio, on voit que le Card est simplement un composable Surface qui contient un Column.

Dans les faits, on ajoutera souvent un Column ou un Row à l'intérieur du Card pour ajouter de l'espacement intérieur (padding).

Jetpack Compose (Kotlin)

Card {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Il est possible de modifier l'apparence du Card à l'aide de ses propriétés, par exemple sa couleur, le rayon de ses coins et sa bordure.

Jetpack Compose (Kotlin)

Card (
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.background,
    ),
    shape = RoundedCornerShape(25),
    border = BorderStroke(1.dp, Color.Black)
) {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

On peut aussi ajouter de l'élévation pour modifier légèrement le visuel.

Jetpack Compose (Kotlin)

Card (
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.background,
    ),
    shape = RoundedCornerShape(25),
    border = BorderStroke(1.dp, Color.Black),
    elevation = CardDefaults.cardElevation(10.dp)
) {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Il existe également le composable ElevatedCard qui contient une élévation par défaut.

Cette fois, pas possible de lui ajouter de bordure.

Vous remarquerez également que la couleur par défaut n'est pas la même qu'avec Card.

Jetpack Compose (Kotlin)

ElevatedCard  {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Je vous présente ici quelques exemples intéressants de configurations avec Card ou ElevatedCard.

Jetpack Compose (Kotlin)

Card(
    shape = CutCornerShape(topStart = 16.dp, bottomEnd = 8.dp) ,
) {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Jetpack Compose (Kotlin)

ElevatedCard(
    shape = RoundedCornerShape(
        topStart = 24.dp,
        topEnd = 0.dp,
        bottomStart = 0.dp,
        bottomEnd = 24.dp
    ),
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.inverseSurface
    ),
) {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Jetpack Compose (Kotlin)

Card(
    onClick = { faireQuelqueChose() } ,
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer
    )
) {
    Row(
        modifier = Modifier.padding(20.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Info, contentDescription = "info")
        Spacer(Modifier.width(16.dp))
        Text("Cliquez ici pour plus de détails.")
    }
}
Illustration

Jetpack Compose (Kotlin)

ElevatedCard(
    shape = RoundedCornerShape(20.dp),
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 8.dp),
    colors = CardDefaults.elevatedCardColors(
        containerColor = Color.Red
    ),
    modifier = Modifier.size(width = 200.dp, height = 150.dp)
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            Icons.Default.Warning,
            contentDescription = "Alerte",
            tint = Color.White,
            modifier = Modifier.size(32.dp)
        )
        Spacer(Modifier.height(8.dp))
        Text(
            text = "Attention!",
            color = Color.White
        )
    }
}
Illustration

Jetpack Compose (Kotlin)

ElevatedCard(
    elevation = CardDefaults.elevatedCardElevation(5.dp),
    modifier = Modifier.size(250.dp, 100.dp)
) {
    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        Image(
            painter = painterResource(R.drawable.versailles),
            contentDescription = "fond",
            contentScale = ContentScale.Crop,
        )
        Box(
            modifier = Modifier
                 .fillMaxSize()
                 .background(
                      Brush.verticalGradient(
                          colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.6f)),
                      )
                 )
         )
         Text(
            "Notre vision",
            color = Color.White,
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.align(Alignment.BottomStart).padding(12.dp)
         )
    }
}
Illustration

Pour plus d'information¶
* « Card » - Android Developers¶
Alignement et espacement¶
Il existe plusieurs techniques pour spécifier l'alignement et l'espacement des composables dans Jetpack Compose.

Parfois, il s'agira d'appliquer des attributs sur la ligne ou la colonne, par exemple :

horizontalAlignment = Alignment.Start
horizontalAlignment = Alignment.CenterHorizontally
horizontalAlignment = Alignment.End
verticalArrangement = Arrangement.Top
verticalArrangement = Arrangement.Center
verticalArrangement = Arrangement.Bottom
horizontalArrangement = Arrangement.SpaceEvenly
horizontalArrangement = Arrangement.Center
horizontalArrangement = Arrangement.End
Ici, on centre horizontalement tout le contenu d'une colonne :

Jetpack Compose (Kotlin)

Column (
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
) {
    ...
}
Parfois, il s'agira d'ajouter des modificateurs sur le composable à aligner, par exemple :

Modifier.align(Alignment.Start)¶
Modifier.align(Alignment.CenterHorizontally)¶
Modifier.align(Alignment.End)¶
Ceci est possible seulement si le composable auquel le modifier est appliqué se trouve dans un Row, un Column ou un Box.

Ici, on centre horizontalement un bouton :

Jetpack Compose (Kotlin)

Column(modifier = Modifier.fillMaxWidth()) {
    Button(
         modifier = Modifier.align(Alignment.CenterHorizontally),
        onClick = {
            ...
        }
    ) {
        Text(text = "Ok")
    }
{
Parfois, il s'agira d'ajouter des espaceurs (Spacer) à l'endroit approprié.

Ici encore, on centre horizontalement un bouton :

Jetpack Compose (Kotlin)

Row {
    Spacer(modifier = Modifier.weight(1f))
    Button(
        onClick = {
            ...
        }
    ) {
        Text(text = "Ok")
    }
     Spacer(modifier = Modifier.weight(1f))
}
Certains composables contiennent des attributs qui leur permettent de modifier leur propre alignement.

Jetpack Compose (Kotlin)

Text(
    text = "Ce texte est long et s'étend sur plus d'une ligne. Il sera centré.",
    textAlign = TextAlign.Center,
)
Pour plus d'information¶
« Column » - Jetpack Compose Playground

« Row » - Jetpack Compose Playground

« Composing Alignment & Arrangement » - Medium

« Jetpack Compose: filling max width or height » - Medium

* « Cheatsheet for centering items in Jetpack Compose » - Medium¶
Changer le fond d'écran¶
Je vous présente ici quelques techniques pour modifier le fond de votre application Android avec Jetpack Compose.

Configurer une couleur de fond d'écran avec le thème
Couleur des barres d'application
Configurer une couleur de fond d'écran par programmation
Couleur des barres d'application - technique 1
Couleur des barres d'application - technique 2
Utiliser une image en fond d'écran
Image sous les barres d'application
Configurer une couleur de fond d'écran avec le thème
La technique la plus intéressante pour modifier la couleur de fond consiste à travailler avec le thème de l'application.

Les fichiers du thème sont situés dans le dossier ui/theme , que vous retrouverez au même niveau que MainActivity.kt .

Fichier Color.kt

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)
val JaunePale = Color(0xFFFFFF33)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)
val JauneFonce = Color(0xFFB57A0D)
Fichier Theme.kt

private val DarkColorScheme = darkColorScheme(
    primary = Purple80,
    secondary = PurpleGrey80,
    tertiary = Pink80,
    background = JauneFonce,
)
private val LightColorScheme = lightColorScheme(
    primary = Purple40,
    secondary = PurpleGrey40,
    tertiary = Pink40,
    background = JaunePale,
)
@Composable
fun MonApplicationTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    ...
}
Sans rien changer de plus, le fond d'écran sera jaune pâle ou jaune foncé selon que l'appareil est en mode clair ou en mode sombre.

Illustration

Illustration

Couleur des barres d'application¶
Dans le cas où l'application comprend une barre de titre ou une barre de navigation, il faudra préciser que leur couleur de fond est transparente pour que la couleur dictée par le thème les affecte.

Jetpack Compose (Kotlin)

Scaffold(
    modifier = Modifier
        .fillMaxSize(),
    topBar = {
        CenterAlignedTopAppBar(
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = Color.Transparent
            ),
            title = {
                Text(text = "Mon application")
            },
        )
    },
    bottomBar = {
        BottomAppBar(
            containerColor = Color.Transparent
        ) {
            //...
        }
    },
    content = {
        ...
    }
)
Configurer une couleur de fond d'écran par programmation¶
Dans certaines applications, on voudra plutôt modifier la couleur dynamiquement. Ici, j'ai utilisé des couleurs codées en dur mais il serait facile d'adapter ce code pour que les couleurs proviennent de variables.

Puisque, dans cet exemple, la couleur est spécifiée dans le contenu de l'application (paramètre content du Scaffold ou partie entre accolades), la couleur de fond ne sera pas appliquée à la barre de titre ni à la barre de navigation.

Remarquez la condition pour spécifier la couleur en mode clair et en mode sombre.

Jetpack Compose (Kotlin)

Box(
    modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding)
        .background(if (isSystemInDarkTheme()) Color.Gray else Color.LightGray)
) {
    Text(
        text = "Mon fond de couleur",
        modifier = Modifier
            .padding(10.dp)
    )
}
Illustration

Couleur des barres d'application - technique 1¶
Pour appliquer une couleur de fond partout, il faut placer le Scaffold à l'intérieur du Box et préciser que la couleur de fond du Scaffold, de la barre de titre et de la barre de navigation sont transparentes.

Jetpack Compose (Kotlin)

Box(
    modifier = Modifier
        .fillMaxSize()
        .background(if (isSystemInDarkTheme()) Color.Gray else Color.LightGray)
) {
    Scaffold(
        modifier = Modifier
            .fillMaxSize(),
         containerColor = Color.Transparent,
        topBar = {
            CenterAlignedTopAppBar(
                colors = TopAppBarDefaults.topAppBarColors(
                     containerColor = Color.Transparent
                ),
                title = {
                    Text(text = "Mon application")
                },
            )
        },
        bottomBar = {
            BottomAppBar(
                 containerColor = Color.Transparent
            ) {
                //...
            }
        },
        content = {
            ...
        }
    )
}
Couleur des barres d'application - technique 2¶
Voici une autre technique qui permet de modifier le fond partout. Il s'agit de préciser la couleur directement dans les différentes sections du Scaffold.

Avec cette technique, on n'a plus besoin du Box.

Jetpack Compose (Kotlin)

Scaffold(
    modifier = Modifier
        .fillMaxSize(),
     containerColor = if (isSystemInDarkTheme()) Color.Gray else Color.LightGray,
    topBar = {
        CenterAlignedTopAppBar(
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = if (isSystemInDarkTheme()) Color.Gray else Color.LightGray,
            ),
            title = {
                Text(text = "Mon application")
            },
        )
    },
    bottomBar = {
        BottomAppBar(
            containerColor = containerColor = if (isSystemInDarkTheme()) Color.Gray else Color.LightGray,
        ) {
            //...
        }
    },
    content = {
        ...
    }
)
Utiliser une image en fond d'écran¶
Ce code permet d'utiliser une image comme fond d'écran pour le contenu de l'application mais pas derrière la barre de titre ni la barre de navigation.

Remarquez que puisque l'image est la même en mode clair et en mode sombre, j'ai spécifié la couleur du texte afin qu'il soit toujours bien visible.

Kotlin

Box(
    modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding)
        .paint(
            painterResource(id = R.drawable.coucher_soleil),
            contentScale = ContentScale.Crop
        )
) {
    Text(
        text = "Mon image de fond",
        color = Color.White,
        modifier = Modifier
            .padding(10.dp)
    )
}
Illustration

Image sous les barres d'application¶
Ici encore, si on veut que l'image soit également derrière la barre de titre et la barre de navigation, il faut travailler au niveau du Scaffold. Cette fois, j'ai placé le Scaffold dans un Box qui spécifie le fond d'écran et j'ai mis le fond en transparence pour le contenu, la barre de titre et la barre de navigation.

Plus besoin du Box dans le contenu.

Je n'ai pas modifié les couleurs dans la barre de titre ni dans la barre de navigation afin d'illustrer les dangers au niveau de la lisibilité lorsque l'image de fond couvre tout l'écran.

Jetpack Compose (Kotlin)

Box(
    modifier = Modifier
        .fillMaxSize()
        .paint(
            painterResource(id = R.drawable.coucher_soleil),
            contentScale = ContentScale.Crop
        )
) {
    Scaffold(
        modifier = Modifier
            .fillMaxSize(),
         containerColor = Color.Transparent,
        topBar = {
            CenterAlignedTopAppBar(
                colors = TopAppBarDefaults.topAppBarColors(
                     containerColor = Color.Transparent
                ),
                title = {
                    Text(text = "Mon application")
                },
            )
        },
        bottomBar = {
            BottomAppBar(
                 containerColor = Color.Transparent
            ) {
                //...
            }
        },
        content = {
            ...
        }
    )
}

Modificateurs (Modifiers)¶
6.1 padding()¶
Le modificateur .padding() est une autre façon d'ajouter de l'espace dans une interface utilisateur.

Contrairement à Spacer(), qui est un composable en lui-même, .padding() est une méthode de la classe Modifier . Il doit être appliqué à un composable.

De plus, Spacer() ajoute de l'espace entre des éléments alors que .padding() ajoute de l'espace alentour de l'élément auquel il est appliqué.

.padding() doit être appliqué à la classe Modifier.

Voici quelques exemples d'utilisation.

Kotlin

Text(
    text = "Bonjour!",
    modifier = Modifier
        .background(color = Color.LightGray)
        .padding(10.dp)    // espacement égal tout autour du texte
)
Illustration

Kotlin

Text(
    text = "Bonjour!",
    modifier = Modifier
        .background(color = Color.LightGray)
        .padding(start = 10.dp)    // espacement seulement à gauche
)
Illustration

Kotlin

Text(
    text = "Bonjour!",
    modifier = Modifier
        .background(color = Color.LightGray)
        .padding(start = 10.dp, top = 15.dp)    // espacement à gauche et au-dessus
)
Illustration

Kotlin

Text(
    text = "Bonjour!",
    modifier = Modifier
        .background(color = Color.LightGray)
        .padding(horizontal = 25.dp, vertical = 10.dp)
)
Illustration

6.2 size()¶
Comme son nom l'indique, le modifieur size() permet de déterminer la taille d'un composable, par exemple une image.

Par défaut, l'image ne sera ni étirée, ni tronquée. J'ai ajouté un fond noir pour mieux illustrer comment la taille est calculée.

Kotlin

Column(
    verticalArrangement = Arrangement.spacedBy(10.dp),
    modifier = Modifier
        .padding(all = 25.dp)
) {
    Image(
        painter = painterResource(R.drawable.bonbons_paris),
        contentDescription = "Bonbons",
        modifier = Modifier
              .size(100.dp)
             .background(color = Color.Black)
     )
    Image(
        painter = painterResource(R.drawable.bonbons),
        contentDescription = "Bonbons",
        modifier = Modifier
             . size(300.dp, 100.dp)
             .background(color = Color.Black)
    )
}
Illustration

Pour plus d'information¶
* « androidx.compose.foundation.layout - size » - Android Developer¶
summary#size 6.3 style()

La méthode style() permet de préciser la typographie du texte.

Contrairement à .size(), .clip() ou .border(), pour ne nommer que ceux-là, style() ne doit pas être appliquée à la classe Modifier.

Tout comme les couleurs, la typographie peut être modifiée dans le thème.

Kotlin

Text(
    text = "Bonjour",
    style = MaterialTheme.typography.titleSmall
    modifier = Modifier(...)
)
6.4 .background()¶
Le modifieur .background() permet de spécifier la couleur de fond d'un composable.

.background() doit être appliqué à la classe Modifier.

Kotlin

Row(
    modifier = Modifier
        ...
        .background(color = MaterialTheme.colorScheme.tertiary)
) {
    Text(...)
}
6.5 .weight()¶
Le modifieur .weight() permet de spécifier le poids d'un composable dans une ligne ou une colonne.

S'il est utilisé dans une ligne, le poids aura une incidence sur la largeur du composable.

Je vous fais la démonstration ici à l'aide du composable Surface. Il aurait été possible d'appliquer le modifieur .weight() à d'autres composables, par exemple à une image.

Dans cet exemple, j'ai imposé une taille pour que chaque surface ait une certaine hauteur même si je n'y ai ajouté aucun contenu.

Kotlin

Row() {
    Surface(
        modifier = Modifier
            .weight(weight = 1f)
            .size(300.dp),
        color = MaterialTheme.colorScheme.primaryContainer,
    ) {
        // ...
    }
    Surface(
        modifier = Modifier
            .weight(weight = 2f)
            .size(300.dp),
        color = MaterialTheme.colorScheme.tertiaryContainer
    ) {
        // ...
    }
}
Illustration

Si le poids est donné dans une colonne, il affectera la hauteur du composable.

Kotlin

Column() {
    Surface(
        modifier = Modifier
            .weight(weight = 1f)
            .size(300.dp),
        color = MaterialTheme.colorScheme.primaryContainer,
    ) {
        // ...
    }
    Surface(
        modifier = Modifier
            .weight(weight = 2f)
            .size(300.dp),
        color = MaterialTheme.colorScheme.tertiaryContainer
    ) {
        // ...
    }
}
Illustration

6.6 .clickable()¶
Le modifieur clickable() permet de réagir à un clic sur différents éléments visuels, par exemple un texte ou une image.

Jetpack Compose (Kotlin)

Image(
    painter = painterResource(id = R.drawable.mon_image),
    modifier = Modifier.clickable {
        Log.d("*****", "L'image a été cliquée!")
    },
    contentDescription = "Mon image",
)
ou

Jetpack Compose (Kotlin)

Image(
    painter = painterResource(id = R.drawable.mon_image),
    modifier = Modifier.clickable(
        onClick = {
            Log.d("*****", "L'image a été cliquée!")
        },
        onClickLabel = "..."
    ),
    contentDescription = "Mon image",
)
Pour plus d'information¶
« Using the Clickable Modifier in Jetpack Compose » - DeveloperMemos
6.7 Modifieur conditionnel¶
Avec Jetpack Compose, il est possible de déclarer un modifieur dont la valeur dépend d'une condition.

Malheureusement, l'opérateur ternaire n'existe pas en Kotlin. Qu'à cela ne tienne, il est possible de travailler avec un if régulier.

Jetpack Compose (Kotlin)

Box(
    modifier= Modifier
        .background( if (...) {Color.Blue} else {Color.Red} ),
)
La syntaxe suivante permet d'ajouter un modifieur seulement lorsqu'une condition est rencontrée sans avoir à répéter les autres modifieurs.

Jetpack Compose (Kotlin)

Box(
    modifier= Modifier
        .size(100.dp)
        .background(Color.Yellow)
        .let { modifier ->
            if (...) {
                modifier.clickable {   // le composable ne sera cliquable que si la condition est rencontrée
                    faireQuelqueChose()
                }
            }
            else {
                modifier // si la condition est fausse, on conserve le modifieur original
            }
        }
)
7. Dépannage (troubleshooting)

Mise en page et Scaffold¶
27.1 Structure de l'écran avec Scaffold¶
Le composable Scaffold (qui peut être traduit par échafaud ou structure) offre des emplacement préprogrammés, notamment des barres d'application pour le haut de l'écran (barre de titre) et pour le bas de l'écran (barre de navigation).

Dans cette fiche :

Emplacement du scaffold¶
Zones définies par le scaffold¶
Contenu de l'application dans un fonction modulable distincte¶
Paramètre innerPadding (ou it)¶
Modifier vs modifier¶
Un seul scaffold par application ou un scaffold par écran?¶
Emplacement du scaffold¶
Lors de la création du projet initial, un scaffold est d'ailleurs déjà présent directement dans MainActivity.

Jetpack Compose (Kotlin)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting(
                        name = "Android",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}
Au besoin, il est possible de déplacer le Scaffold dans une fonction modulable.

Jetpack Compose (Kotlin)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                MainScreen()
            }
        }
    }
}
@Composable
fun MainScreen() {
    Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
        ...
    }
}
Zones définies par le scaffold¶
Voici un exemple de scaffold qui définit différentes zones à l'écran.

Jetpack Compose (Kotlin)

Scaffold(
    modifier = Modifier
        ...,
    topBar = {
        ...
    },
    bottomBar = {
        ...
    },
    snackbarHost = {
        ...        
    },
    content = {
        ...
    }
)
Plutôt que de placer le contenu de l'application sous le paramètre content, il est possible d'ouvrir des accolades après les paramètres du scaffold pour y coder ce contenu.

Jetpack Compose (Kotlin)

Scaffold(
    modifier = Modifier
        ...,
    topBar = {
        ...
    },
    bottomBar = {
        ...
    },
) {
    ...
}
Contenu de l'application dans un fonction modulable distincte¶
Afin d'alléger le code, il est intéressant de placer le contenu dans sa propre fonction modulable.

Vous pouvez appeler cette fonction comme vous voulez.

Dans une application à un seul écran, MainContent est un nom intéressant.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
    Scaffold(
        ...
    ) {
         MainContent(...)
    }
}
@Composable
fun MainContent(...) { 
    ...
}
Paramètre innerPadding (ou it)¶
Le contenu de l'application (paramètre content ou partie entre accolades) reçoit automatiquement du scaffold un paramètre qui lui indique notamment la taille des différentes barres : barre de titre de l'application, barre de navigation de l'application et barre d'état du téléphone (celle où on retrouve l'heure et les icônes de notification).

Ce paramètre est de type PaddingValues .

Il est possible de nommer le paramètre comme bon vous semble, par exemple innerPadding.

Jetpack Compose (Kotlin)

Scaffold(
    ...
) { innerPadding ->
    MainContent(innerPadding)
}
S'il n'est pas nommé, on dira que c'est un paramètre implicite et il s'appellera it.

Jetpack Compose (Kotlin)

Scaffold(
    ...
) {
    MainContent( it )
}
Ce paramètre, qu'il soit nommé ou non, doit obligatoirement être utilisé dans le contenu.

Dans cet exemple, il est passé en paramètre à une fonction modulable.

Si la fonction modulable en fait bon usage, ceci assurera que le contenu de l'application ne soit pas caché sous une¶
des barres.

Il est à noter que même si une application n'a pas de barre de titre, ses composables pourraient être affichés sous la barre d'état du téléphone (celle où on retrouve l'heure et les icônes de notification) si ce paramètre n'est pas correctement utilisé.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
    Scaffold(
        ...
    ) {
        MainContent( it )
    }
}
@Composable
fun MainContent( innerPadding: PaddingValues ) { 
    Column(
        modifier = Modifier
            .padding(innerPadding) ,
        ...
    ) {
        ...
    }
}
Illustration

Illustration

Illustration

Bonne utilisation du innerPadding innerPadding pas utilisé Aucune barre de titre et innerPadding pas utilisé

Modifier vs modifier¶
Dans le code généré lors de la création d'un projet, le paramètre innerPadding n'est pas passé directement à la fonction modulable.

Plutôt, il est utilisé pour initialiser un modifieur qui, lui, est passé en paramètre.

Jetpack Compose (Kotlin)

Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
    Greeting(
        name = "Android",
        modifier = Modifier.padding(innerPadding)
    )
}
Si vous conservez cette approche dans votre projet, vous devez être conscients de la différence entre l'utilisation de Modifier (M majuscule) et modifier (m minuscule) à l'intérieur de la fonction modulable.

Selon vous, laquelle de ces approche est correcte ?

Version A :

Jetpack Compose (Kotlin)

fun Greeting(name: String, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(
            text = "Hello $name!",
            modifier = modifier
                .background(Color.Yellow),
            fontSize = 25.sp
        )
        Text(
            text = "🚀",
            modifier = modifier
                .clickable {
                    // ...
                },
            fontSize = 100.sp
        )
    }
}
Version B :

Jetpack Compose (Kotlin)

fun Greeting(name: String, modifier: Modifier = Modifier) {
    Column(
        modifier = Modifier
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(
            text = "Hello $name!",
            modifier = Modifier
                .background(Color.Yellow),
            fontSize = 25.sp
        )
        Text(
            text = "🚀",
            modifier = Modifier
                .clickable {
                    // ...
                },
            fontSize = 100.sp
        )
    }
}
Version C :

Jetpack Compose (Kotlin)

fun Greeting(name: String, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(
            text = "Hello $name!",
            modifier = Modifier
                .background(Color.Yellow),
            fontSize = 25.sp
        )
        Text(
            text = "🚀",
            modifier = Modifier
                .clickable {
                    // ...
                },
            fontSize = 100.sp
        )
    }
}
Voici le visuel de chacune de ces versions.

Illustration

Illustration

Illustration

Version A Version B Version C

Dans la version A, chaque composable utilise le modifieur reçu en paramètre (celui avec un m minuscule). Il y a donc toujours un padding appliqué.

Le problème avec cette approche, c'est que le padding a été calculé par Jetpack Compose pour tenir compte des barres de l'application et de la barre d'état du téléphone. Dans une application avec une barre de titre, par exemple, l'espacement devriendrait inutilement trop grand entre les composables.

Sur l'image qui suit, la fonction modulable est identique à la version A présentée plus haut. Seul le scaffold s'est vu ajouter un titre.

Illustration

Dans la version B, il n'y a aucune utilisation du modifieur reçu en paramètre. Chaque composable initialise un modifieur vierge (celui avec un M majuscule) sans tenir compte du innerPadding calculé par Jetpack Compose. C'est pourquoi les composables se retrouvent sous la barre d'état du téléphone.

La version C est la plus intéressante. Le composable englobant (ici, c'est le Column) utilise le modifieur reçu en paramètre. Ceci assure que rien ne sera affiché sous les barres. Les autres composables initialisent un modifieur vierge qu'ils sont libres de personnaliser selon le besoin.

Un seul scaffold par application ou un scaffold par écran?¶
Il n'y pas de recommendation officielle quand au nombre de scaffold qu'on peut utiliser dans une application.

Cependant, gardez en tête que s'il n'y a qu'un seul scaffold dans l'application, la barre de titre et la barre de navigation seront définies à un seul endroit, ce qui assurera une apparence constante entre les écrans.

Pour plus d'information¶
« Barres d'application » - Android Developer

« Composants et mises en page Material - Barres d'application » - Android Developpers bars

* « Should I use Scaffold in every screen ? what are best practices while using topBar, bottomBar, drawer, etc. in compose » - StackOverflow¶
27.2 topBar

Il est possible de définir une barre de titre, située en haut de l'écran, à l'aide du scaffold.

Jetpack Compose (Kotlin)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen() {
    Scaffold(
        topBar = {
            CenterAlignedTopAppBar (
                title = {
                    Text(text = "Mon application")
                },
            )
        }
    ) {
        MainContent(it)
    }
}
Notez qu'au moment d'écrire ces lignes, CenterAlignedTopAppBar et les autres fonctions pour définir la barre de titre étaient encore expérimentales .

!!! warning "Attention : avec Mat" Attention : avec Material Design 2, la barre du haut utilisait TopAppBar. Avec Material Design 3, il faut utiliser CenterAlignedTopAppBar, SmallTopAppBar, MediumTopAppBar ou LargeTopAppBar.

Icônes dans une barre¶
La barre de titre peut également comprendre des icônes cliquables.

Jetpack Compose (Kotlin)

Scaffold(
    topBar = {
        CenterAlignedTopAppBar(
            title = {
                Text(text = "Mon application")
            },
            navigationIcon = {
                IconButton(
                    onClick = {
                        ...
                    }
                ) {
                    Icon(
                        Icons.Default.AddCircle,
                        contentDescription = "..."
                    )
                }
            },
        )
    }
) {
    MainContent(it)
}
Illustration

Barre de titre en dehors d'un Scaffold?¶
Grâce au Scaffold, Jetpack Compose est capable de calculer l'espace qui doit être ajouté alentour du contenu principal (content) afin que ce dernier ne soit pas caché par les barres de l'application. C'est d'ailleurs cette valeur qui apparaît comme paramètre implicite dans le contenu principal.

Si vous tentez de définir une barre de titre directement dans une application qui n'a pas de Scaffold, Jetpack Compose ne sera pas capable de calculer cet espace.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen(innerPadding: PaddingValues) {
    // Si on met un CenterAlignedTopAppBar ici sans le placer dans un Scaffold,
    // il cache le texte même si le texte utilise le innerPadding puisque
    // le Scaffold n'a pas pu calculer le innerPadding nécessaire.
    CenterAlignedTopAppBar(
        title = {
            Text(text = "Mon application")
        },
    )
    Text(
        text = "Hello!",
        modifier = Modifier.padding(innerPadding)
    )
}
C'est pourquoi il faut toujours définir les barres de l'application à l'intérieur d'un Scaffold.¶
Pour plus d'information¶
« Barres d'application » - Android Developer
* « Composants et mises en page Material - Barres d'application » - Android Developpers¶
bars 28. Aller plus loin avec les variables d'état

Saisie de texte et clavier virtuel¶
TextField() et OutlinedTextField()¶
Une case de saisie peut être ajoutée à l'aide du composable TextField() ou de OutlinedTextField() .

Pour que le texte entré dans une boîte de saisie soit affiché dans la boîte, il faut que sa valeur provienne d'une variable d'état.

En lien avec les cases de saisie:

TextField
OutlinedTextField
supportingText
Type de clavier
TextField ou OutlinedTextField avec ViewModel
TextField¶
Le TextField, dans sa plus simple expression, va comme suit :

Jetpack Compose (Kotlin)

var titre by rememberSaveable { mutableStateOf("") }   // la variable d'état pourrait aussi faire partie du ViewModel

TextField(
    value = titre ,
    onValueChange = { titre = it },
    label = { Text("Titre") }
)
Remarquez l'utilisation de rememberSaveable. Si vous débutez avec Jetpack Compose, vous aurez sans doute appris à déclarer les variables d'état avec remember. Dès que vous avancerez dans vos apprentissages, vous comprendrez pourquoi il est préférable d'utiliser rememberSaveable pour la valeur d'une case de saisie.

Voici le TextField vide puis avec focus ou rempli.

Illustration

Illustration

OutlinedTextField¶
Voici le même exemple mais avec un OutlinedTextField.

Jetpack Compose (Kotlin)

var titre by rememberSaveable { mutableStateOf("") }

OutlinedTextField(
    value = titre,
    onValueChange = { titre = it },
    label = { Text("Titre") }
)
La différence entre TextField et OutlinedTextField est au niveau de l'apparence.

Voici le OutlinedTextField vide puis avec focus ou rempli.

Illustration

Illustration

supportingText¶
Depuis Jetpack Compose 1.3, il est possible d'ajouter un texte d'accompagnement sous la boîte de saisie.

Dans la forme la plus simple, un texte statique sera affiché. Mais puisque le code est entre accolades, ceci ouvre la porte à une panoplie de possibilités afin d'afficher un texte contextualisé.

Jetpack Compose (Kotlin)

var titre by rememberSaveable { mutableStateOf("") }

OutlinedTextField(
    value = titre,
    onValueChange = { titre = it },
    label = { Text("Titre") },
    supportingText = { Text("Max. 10 caractères") }
)
Illustration

Type de clavier¶
Afin d'améliorer l'expérience utilisateur, il est important de spécifier le type de clavier virtuel selon le rôle de la case de saisie.

Les principaux types de clavier sont :

Text (par défaut)
Number
Decimal (dans derniers tests effectués, était identique à Number)
Email (semblable à Text mais la virgule est remplacée par un @)
Password (lettres et chiffres dans un même écran)
Phone (chiffres avec lettres imprimées sur les touches correspondantes - ex : 2 ABC)
Uri (semblable à Text mais la virgule est remplacée par un /)
Illustration

KeyboardType.Text

Illustration

KeyboardType.Email

Illustration

KeyboardType.Password

Illustration

KeyboardType.Number

Illustration

KeyboardType.Phone

Pour spécifier le type clavier désiré :

Jetpack Compose (Kotlin)

TextField(
    ...,
    keyboardOptions = KeyboardOptions
(keyboardType
 = KeyboardType.Number)
)
TextField ou OutlinedTextField avec ViewModel¶
Dans une application qui utilise un ViewModel comme conteneur d'état, la syntaxe d'une case de saisie sera légèrement différente.

Notez que j'ai utilisé ici un ViewModel de type HomeViewModel mais la classe du ViewModel pourrait porter un autre nom dans votre application.

Fonction composable (Kotlin)

@Composable
fun monComposable() {
    val viewModel: HomeViewModel = viewModel()
    val uiState by viewModel.uiState.collectAsState()
    ...
    TextField(
        value = uiState.nom ,
        onValueChange = {
             viewModel.ajusterNom(it)
        },
        ...
    )
    ...
}
Et dans le ViewModel (dans cet exemple, le uiState est un flux observable, d'où la nécessité d'utiliser _uiState.update) :

ViewModel (Kotlin)

class HomeViewModel: ViewModel() {
    ...
    fun ajusterNom(valeur: String) {
        _uiState.update {
            it.copy (
                _nom = valeur
            )
        }
    }
}
Pour plus d'information¶
« Handle user input » - Android Developers

« Jetpack Compose Basics - How to use text field composables to meet the Material design specification » - Good Request

« Textfields » - Material Design 3

« androidx.compose.material3 - TextField » - Android Developers

* « androidx.compose.material3 - OutlinedTextField » - Android Developers¶
26.1 Clavier virtuel de l'émulateur¶
Quand vous lancez une application dans l'émulateur d'Android Studio, il peut arriver que le clavier virtuel ne soit pas visible. À ce moment, seul le clavier physique de votre ordinateur peut interagir avec l'émulateur.

Je vous présente ici deux techniques pour faire apparaître le clavier virtuel dans l'émulateur.

Attention : quand vous testez une application, le clavier virtuel disparaîtra dès que vous appuyez sur une touche du clavier de l'ordinateur. Pour tester comme sur un téléphone physique, vous devez utiliser exclusivement le clavier virtuel.

Afficher le clavier virtuel automatiquement¶
Si vous souhaitez toujours tester votre application telle qu'elle apparaîtrait sur un téléphone physique, vous pouvez ajouter une configuration dans le fichier

AndroidManifest.xml .

Fichier app/src/main/AndroidManifest.xml

<manifest ...>
    <application ...>
        <activity
            android:name=".MainActivity"
            android:windowSoftInputMode="stateAlwaysVisible|adjustResize"
            ...>
        </activity>
    </application>
</manifest>
Le clavier virtuel apparaîtra automatiquement lorsque requis, par exemple quand l'usager mettra le focus dans une case de saisie.

Illustration

Afficher le clavier virtuel manuellement¶
Si vous souhaitez faire apparaître le clavier virtuel seulement au besoin, n'ajoutez pas l'instruction windowSoftInputMode dans le fichier AndroidManifest.xml .

Plutôt, quand vous lancerez l'application dans l'émulateur, vous cliquerez sur le menu rond qui apparaît au centre gauche de l'écran quand une case de saisie a le focus.

L'option Show on-screen keyboard fera apparaître le clavier virtuel.

Illustration

Pour plus d'information¶
* « Gérer la visibilité du mode de saisie » - Android Developer¶
Cacher le clavier virtuel¶
Lorsqu'un usager clique sur une zone d'édition dans une application Android, le clavier virtuel apparaît automatiquement.

Si ce comportement est généralement souhaitable, il peut arriver que ce clavier cache une partie importante de l'écran. D'où l'importance de pouvoir le cacher lorsqu'il n'est plus utile.

Une technique intéressante pour y arriver consiste à enlever le focus de la zone d'édition.

Jetpack Compose (Kotlin)

val focusManager = LocalFocusManager.current
Button(
    onClick = {
        ...
        focusManager.clearFocus()
    }
) {
    Text(text = "Terminer")
}
Il est également possible de travailler directement avec un contrôleur de clavier et de lui demander de cacher le clavier.

Jetpack Compose (Kotlin)

val keyboardController = LocalSoftwareKeyboardController.current
Button(
    onClick = {
        ...
        keyboardController?.hide()
    }
) {
    Text(text = "Terminer")
}


Couleurs, thèmes et hasard¶
37.1 Changer le fond d'écran¶
Je vous présente ici quelques techniques pour modifier le fond de votre application Android avec Jetpack Compose.

Dans cette fiche :

Configurer une couleur de fond d'écran avec le thème¶
Couleur des barres d'application¶
Configurer une couleur de fond d'écran par programmation¶
Couleur des barres d'application - technique 1¶
Couleur des barres d'application - technique 2¶
Utiliser une image en fond d'écran¶
Image sous les barres d'application¶
Configurer une couleur de fond d'écran avec le thème¶
La technique la plus intéressante pour modifier la couleur de fond consiste à travailler avec le thème de l'application.

Les fichiers du thème sont situés dans le dossier ui/theme , que vous retrouverez au même niveau que MainActivity.kt .

Fichier Color.kt

val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)
val JaunePale = Color(0xFFFFFF33)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)
val JauneFonce = Color(0xFFB57A0D)
Fichier Theme.kt

private val DarkColorScheme = darkColorScheme(
    primary = Purple80,
    secondary = PurpleGrey80,
    tertiary = Pink80,
    background = JauneFonce,
)
private val LightColorScheme = lightColorScheme(
    primary = Purple40,
    secondary = PurpleGrey40,
    tertiary = Pink40,
    background = JaunePale,
)
@Composable
fun MonApplicationTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    ...
}
Sans rien changer de plus, le fond d'écran sera jaune pâle ou jaune foncé selon que l'appareil est en mode clair ou en mode sombre.

Illustration

Illustration

Couleur des barres d'application¶
Dans le cas où l'application comprend une barre de titre ou une barre de navigation, il faudra préciser que leur couleur de fond est transparente pour que la couleur dictée par le thème les affecte.

Jetpack Compose (Kotlin)

Scaffold(
    modifier = Modifier
        .fillMaxSize(),
    topBar = {
        CenterAlignedTopAppBar(
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = Color.Transparent
            ),
            title = {
                Text(text = "Mon application")
            },
        )
    },
    bottomBar = {
        BottomAppBar(
            containerColor = Color.Transparent
        ) {
            //...
        }
    },
    content = {
        ...
    }
)
Configurer une couleur de fond d'écran par programmation¶
Dans certaines applications, on voudra plutôt modifier la couleur dynamiquement. Ici, j'ai utilisé des couleurs codées en dur mais il serait facile d'adapter ce code pour que les couleurs proviennent de variables.

Puisque, dans cet exemple, la couleur est spécifiée dans le contenu de l'application (paramètre content du Scaffold ou partie entre accolades), la couleur de fond ne sera pas appliquée à la barre de titre ni à la barre de navigation.

Remarquez la condition pour spécifier la couleur en mode clair et en mode sombre.

Jetpack Compose (Kotlin)

Box(
    modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding)
        .background(if (isSystemInDarkTheme()) Color.Gray else Color.LightGray)
) {
    Text(
        text = "Mon fond de couleur",
        modifier = Modifier
            .padding(10.dp)
    )
}
Illustration

Couleur des barres d'application - technique 1¶
Pour appliquer une couleur de fond partout, il faut placer le Scaffold à l'intérieur du Box et préciser que la couleur de fond du Scaffold, de la barre de titre et de la barre de navigation sont transparentes.

Jetpack Compose (Kotlin)

Box(
    modifier = Modifier
        .fillMaxSize()
        .background(if (isSystemInDarkTheme()) Color.Gray else Color.LightGray)
) {
    Scaffold(
        modifier = Modifier
            .fillMaxSize(),
         containerColor = Color.Transparent,
        topBar = {
            CenterAlignedTopAppBar(
                colors = TopAppBarDefaults.topAppBarColors(
                     containerColor = Color.Transparent
                ),
                title = {
                    Text(text = "Mon application")
                },
            )
        },
        bottomBar = {
            BottomAppBar(
                 containerColor = Color.Transparent
            ) {
                //...
            }
        },
        content = {
            ...
        }
    )
}
Couleur des barres d'application - technique 2¶
Voici une autre technique qui permet de modifier le fond partout. Il s'agit de préciser la couleur directement dans les différentes sections du Scaffold.

Avec cette technique, on n'a plus besoin du Box.

Jetpack Compose (Kotlin)

Scaffold(
    modifier = Modifier
        .fillMaxSize(),
     containerColor = if (isSystemInDarkTheme()) Color.Gray else Color.LightGray,
    topBar = {
        CenterAlignedTopAppBar(
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = if (isSystemInDarkTheme()) Color.Gray else Color.LightGray,
            ),
            title = {
                Text(text = "Mon application")
            },
        )
    },
    bottomBar = {
        BottomAppBar(
            containerColor = containerColor = if (isSystemInDarkTheme()) Color.Gray else Color.LightGray,
        ) {
            //...
        }
    },
    content = {
        ...
    }
)
Utiliser une image en fond d'écran¶
Ce code permet d'utiliser une image comme fond d'écran pour le contenu de l'application mais pas derrière la barre de titre ni la barre de navigation.

Remarquez que puisque l'image est la même en mode clair et en mode sombre, j'ai spécifié la couleur du texte afin qu'il soit toujours bien visible.

Kotlin

Box(
    modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding)
        .paint(
            painterResource(id = R.drawable.coucher_soleil),
            contentScale = ContentScale.Crop
        )
) {
    Text(
        text = "Mon image de fond",
        color = Color.White,
        modifier = Modifier
            .padding(10.dp)
    )
}
Illustration

Image sous les barres d'application¶
Ici encore, si on veut que l'image soit également derrière la barre de titre et la barre de navigation, il faut travailler au niveau du Scaffold. Cette fois, j'ai placé le Scaffold dans un Box qui spécifie le fond d'écran et j'ai mis le fond en transparence pour le contenu, la barre de titre et la barre de navigation.

Plus besoin du Box dans le contenu.

Je n'ai pas modifié les couleurs dans la barre de titre ni dans la barre de navigation afin d'illustrer les dangers au niveau de la lisibilité lorsque l'image de fond couvre tout l'écran.

Jetpack Compose (Kotlin)

Box(
    modifier = Modifier
        .fillMaxSize()
        .paint(
            painterResource(id = R.drawable.coucher_soleil),
            contentScale = ContentScale.Crop
        )
) {
    Scaffold(
        modifier = Modifier
            .fillMaxSize(),
         containerColor = Color.Transparent,
        topBar = {
            CenterAlignedTopAppBar(
                colors = TopAppBarDefaults.topAppBarColors(
                     containerColor = Color.Transparent
                ),
                title = {
                    Text(text = "Mon application")
                },
            )
        },
        bottomBar = {
            BottomAppBar(
                 containerColor = Color.Transparent
            ) {
                //...
            }
        },
        content = {
            ...
        }
    )
}
Illustration

38. Le hasard¶
38.1 Générer un nombre au hasard¶
Pour générer un nombre au hasard entre deux bornes incluses :

Kotlin

val nombre = (0..10).random()   // nombre entre 0 (inclus) et 10 (inclus)
Pour exclure la borne supérieure :

Kotlin

val nombre = (0..<10).random()   // nombre entre 0 (inclus) et 10 (exclu)
Pour générer un nombre au hasard parmi toutes les valeurs possibles d'un Integer :

Kotlin

val nombre = Random.nextInt()   // nombre entre Int.MIN_VALUE = -2147483648 (inclus) and Int.MAX_VALUE =2147483647 (inclus)
Avec cette technique, la borne supérieure est exclue :

Kotlin

val nombre = Random.nextInt(5, 10)   // nombre entre 5 (inclus) et 10 (exclu)
Si on ne précise qu'un seul chiffre, la borne inférieure est 0 et la borne supérieure est exclue :

Kotlin

val nombre = Random.nextInt(10)   // nombre entre 0 (inclus) et 10 (exclu)
Pour plus d'information¶
« Finding out random numbers in Kotlin » - Code vs Color
38.2 Sélectionner au hasard un élément d'une collection¶
Quand on a en main une collection, par exemple une liste déclarée avec listOf() ou un tableau déclaré avec arrayOf(), la méthode random() permet de sélectionner au hasard un élément du tableau.

Jetpack Compose (Kotlin)

val couleurs = listOf("Rouge", "Vert", "Bleu", "Jaune")
val hasard = couleurs.random()
Log.d("MainActivity", "Couleur choisie : $hasard")
Si la collection pouvait être vide, il faudra utiliser randomOrNull().

Jetpack Compose (Kotlin)

val couleurs = listOf()
...   // le tableau pourrait être rempli par exemple sur le clic d'un bouton

// dans un gestionnaire d'événement
val hasard = couleurs.randomOrNull()
Log.d("MainActivity", "Couleur choisie : $hasard")   // si le tableau est vide, on verra "Couleur choisie : null"
39. Les fenêtres popup¶

Icônes et gestion d'images¶
31.1 Icône avec la bibliothèque Material Symbols¶
La fonction modulable Icon permet d'afficher une icône à l'écran.

Les icônes disponibles par défaut sont tirées de la bibliothèque gratuite Material Icons .

Jetpack Compose (Kotlin)

Icon(imageVector = Icons.Default.Home, contentDescription = "home")
Illustration

Pour connaître la liste des icônes disponibles par défaut, entrez Icons.Default. puis parcourez la liste de suggestions.

Illustration

Chaque icône peut être affichée dans différents styles.

Jetpack Compose (Kotlin)

Row() {
    Icon(imageVector = Icons.Default.Home, contentDescription = "home")
    Icon(imageVector = Icons.Outlined.Home, contentDescription = "home")
    Icon(imageVector = Icons.Filled.Home, contentDescription = "home")
    Icon(imageVector = Icons.Rounded.Home, contentDescription = "home")
    Icon(imageVector = Icons.Sharp.Home, contentDescription = "home")
    Icon(imageVector = Icons.TwoTone.Home, contentDescription = "home")
}
Illustration

Il est possible d'appliquer des attributs et des modifieurs afin de mieux contrôler l'apparence de l'icône.

Jetpack Compose (Kotlin)

Icon(
    imageVector = Icons.Default.Home,
    contentDescription = "home",
    tint = MaterialTheme.colorScheme.secondary,
    modifier = Modifier.size(30.dp)
)
Illustration

Autre exemple :

Jetpack Compose (Kotlin)

Icon(
    imageVector = Icons.Default.Info,
    contentDescription = "info",
    tint = Color.Blue
)
Icône cliquable¶
Pour rendre l'icône cliquable, il faut l'intégrer dans un IconButton .

Jetpack Compose (Kotlin)

IconButton(onClick = {
    ...
}) {
    Icon(Icons.Filled.Edit, contentDescription = "Modifier")
}
Pour avoir accès à plus d'icônes¶
Pour avoir accès à une plus grande quantité d'icônes, soit aux icônes de la bibliothèque Material Symbols , il faut ajouter une dépendance au projet.

Ajoutez cette ligne dans le fichier build.gradle.kts qui se trouve dans le dossier app .

Attention : ceci augmentera substentiellement la taille de l'application. Je vous conseille de vérifier parmi les icônes¶
disponibles de base (il y en a près d'une cinquantaine) avant d'ajouter cette dépendance.

Fichier app/build.gradle.kts

...
dependencies {
    ...
    // pour avoir accès à plus d'icônes (alourdit l'application)
    implementation("androidx.compose.material:material-icons-extended")
}
Une fois la dépendance ajoutée, il faut resynchroniser le projet pour qu'il tienne compte de l'ajout.

Vous avez désormais accès à plus d'icônes.

Jetpack Compose (Kotlin)

Icon(imageVector = Icons.Default.SwipeUp, contentDescription = "Glisser vers le haut")
Pour plus d'information¶
* « Introducing Material Symbols » - Google¶
Les préférences utilisateur

Fenêtres popup et dialogues¶
39.1 Popup()¶
La fonction modulable Popup permet d'afficher un composable à l'écran par-dessus ce qui y est déjà affiché.

Popup() servira généralement à afficher un message. Si vous avez besoin d'une confirmation, vous utiliserez plutôt AlertDialog().

Pour utiliser Popup(), on travaillera avec une variable d'état (la variable d'état pourrait aussi faire partie d'un ViewModel) qui détermine si le popup doit être affiché ou non.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
     var afficherPopup: Boolean by remember { mutableStateOf(false) }
    // contenu de l'écran principal
    ...
    // bouton pour afficher le popup
    Button (
        onClick = {
            afficherPopup = true
        }
    ) {
        Text(text = "Afficher le popup")
    }
    if (afficherPopup) {
        Popup(
            alignment = Alignment.Center,   // centrer le Popup dans son parent
            onDismissRequest = { afficherPopup = false },   // le popup se refermera si on clique en dehors
        ) {
            // contenu du popup
            ...
            // bouton qui fait quelque chose puis referme le popup
            Button(
                onClick = {
                    ...
                    afficherPopup = false
                }
            ) {
                Text(text = "Faire quelque chose")
            }
        }
    }
}
Voici un exemple.

Remarquez que pour donner une couleur de fond au popup, j'ai utilisé un Card().

Jetpack Compose (Kotlin)

Popup(
    alignment = Alignment.Center, // centrer le Popup dans son parent
    ...
) {
    Card (
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant,
        ),
        shape = RoundedCornerShape(10),
        border = BorderStroke(1.dp, Color.Black),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 6.dp
        ),
    ) {
        Column(
            // centrer le contenu du Popup
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(25.dp)
        ) {
            Text("Vous passez au niveau 3!")
            Spacer(modifier = Modifier.height(14.dp))
            Button(
                 onClick = {...}
            ) {
                 Text("OK")
            }
        }
    }
}
Illustration

Pour plus d'information¶
* « Jetpack Compose Popup — Master It! » - Medium¶
39.2 AlertDialog()

AlertDialog() permet d'afficher une fenêtre popup de confirmation.

Il est important de montrer clairement à l'usager qu'il peut accepter (ex : bouton OK ou Oui) ou refuser (ex : bouton Annuler ou Non) ce qui lui est demandé.

Jetpack Compose (Kotlin)

AlertDialog(
    icon = { ... },
    title = { ... },
    text = { ... },
    onDismissRequest = {
        ...    // ce qui se passe si on clique en dehors de la boîte de dialogue
    },
    confirmButton = {
        Button(
            onClick = {
                ...   // ne pas oublier de faire le nécessaire pour que la boîte ne soit plus affichée après avoir fait le
traitement
            }
        ) {
            ...
        }
    },
    dismissButton = {
        Button(
            onClick = {
                ...   // doit faire le nécessaire pour que la boîte ne soit plus affichée
            }
        ) {
            ...
        }
    }
)
Voici un exemple :

Jetpack Compose (Kotlin)

AlertDialog(
    icon = {
        Icon(imageVector = Icons.Default.Info, contentDescription = "info")
    },
    title = {
        Text("Confirmation requise")
    },
    text = {
        Text("Désirez-vous vraiment réinitialiser la partie?")
    },
    confirmButton = {
        Button(
            onClick = {
                ...
            }
        ) {
            Text("Oui")
        }
    },
    dismissButton = {
        Button(
            onClick = {
                ...
            }
        ) {
            Text("Non")
        }
    }
)
Illustration

Pour plus d'information¶
* « Alert dialog » - Android Developers¶
39.3 Snackbar : notification de courte durée avec possibilité d'action

Le snackbar est une notification qui apparaît au bas de l'écran pour informer l'usager du résultat d'une opération.

Le snackbar est préférable au toast puisqu'il offre plus de possibilités, notamment la possibilité qu'il se referme de lui-même après un laps de temps ou sur un clic de l'usager ou les deux.

De plus, il se charge de gérer la file de notifications à afficher.

Jetpack Compose (Kotlin)

val scope = rememberCoroutineScope()
val snackbarHostState = remember { SnackbarHostState() }    // contrôle la file de snackbars à afficher
Scaffold (
    topBar = {
        ...
    },
    // composant responsable de l'affichage du snackbar
    snackbarHost = {
         SnackbarHost(hostState = snackbarHostState)
    },
    content = {
        MainContent(
            innerPadding = it,
            scope = scope,
            snackbarHostState = snackbarHostState
        )
    }
)
@Composable
fun MainContent(
    innerPadding: PaddingValues,
    scope: CoroutineScope,
    snackbarHostState: SnackbarHostState
) {
    Column(
        modifier = Modifier
            .padding(innerPadding)
    ) {
        Button(
            onClick = {
                // affiche le snackbar
                 scope.launch {
                     snackbarHostState.showSnackbar("Le bouton a été cliqué!")
                 }
            }
        ) {
            Text(text = "Cliquez-moi pour un snackbar!")
        }
    }
}
Illustration

Snackbar refermable¶
Il est possible d'ajouter un texte cliquable qui permet à l'usager de refermer le snackbar dès qu'il le désire plutôt que de le forcer à attendre que le snackbar s'efface de lui-même.

Il est même possible de configurer le snackbar pour qu'il ne s'efface jamais de lui-même.

Jetpack Compose (Kotlin)

val scope = rememberCoroutineScope()
val snackbarHostState = remember { SnackbarHostState() }   // contrôle la file de snackbars à afficher
Scaffold (
    topBar = {
        ...
    },
    // composant responsable de l'affichage du snackbar
    snackbarHost = {
        SnackbarHost(hostState = snackbarHostState)
    },
    content = {
        MainContent(
            innerPadding = it,
            scope = scope,
            snackbarHostState = snackbarHostState
        )
    }
)
@Composable
fun MainContent(
    innerPadding: PaddingValues,
    scope: CoroutineScope,
    snackbarHostState: SnackbarHostState
) {
    Column(
        modifier = Modifier
            .padding(innerPadding)
    ) {
        Button(
            onClick = {
                // affiche le snackbar
                 scope.launch {
                      val result = snackbarHostState
                          .showSnackbar(
                              message = "Le bouton a été cliqué!",
                              actionLabel = "OK",
                              duration = SnackbarDuration.Indefinite // ne s'effacera pas tant que le bouton OK n'est pas
pressé
                             //duration = SnackbarDuration.Short // s'effacera après un court laps de temps
                          )
                 }
            }
        ) {
            Text(text = "Cliquez-moi pour un snackbar!")
        }
    }
}
Illustration

Snackbar avec action¶
Si cela répond à votre besoin, le snackbar permet de réagir lorsqu'il est refermé par un clic ou après un laps de temps.

Jetpack Compose (Kotlin)

Button(
    onClick = {
        // affiche le snackbar
        scope.launch {
             val result = snackbarHostState
                 .showSnackbar(
                     message = "Le bouton a été cliqué!",
                     actionLabel = "OK",
                     duration = SnackbarDuration.Short
                 )
              when (result) {
                  SnackbarResult.ActionPerformed -> {
                    Log.d("*****", "Le snackbar a été effacé par un clic sur son bouton!")
                  }
                  SnackbarResult.Dismissed -> {
                    Log.d("*****", "Le snackbar s'est auto-effacé!")
                  }
              }
        }
    }
) {
    Text(text = "Cliquez-moi pour un snackbar!")
}
Pour plus d'information¶
« Snackbar » - Android Developers

« How to show Snackbar in Jetpack Compose? » - Medium

« Snackbars » - Material Design

« Advanced work with the Snackbar in the Jetpack Compose » - Medium 9bb7b7a30d60

* « How to Show Snackbars Across Multiple Screens in Jetpack Compose » - Medium¶
screen-in-jetpack-compose-dd4b40c6829a 39.4 Toast : notification de courte durée

Tout comme le snackbar, un toast est une petite fenêtre popup qui apparaît au bas de l'écran pour informer l'usager du résultat d'une opération.

Le toast se referme de lui-même après un laps de temps.

Selon la documentation officielle d'Android : 1

Si votre application est exécutée au premier plan, envisagez d'utiliser un snackbar au lieu d'un toast.¶
Si vous êtes en train de développer une nouvelle application, suivez plutôt les exemples présentés sur cette fiche : « snackbar »

Jetpack Compose (Kotlin)

val context = LocalContext.current
...
Button(
    onClick = {
        Toast.makeText(context, "Le bouton a été cliqué!", Toast.LENGTH_SHORT).show()
    }
) {
    Text(text = "Cliquez-moi!")
}
Illustration

Source :

1. * « Présentation des notifications toast - Alternatives à l'utilisation des toasts » - Android Developers¶
hl=fr#alternatives_to_using_toasts

Pour plus d'information¶
* « Présentation des notifications toast » - Android Developers¶
Exercice 5

Affichage de listes dynamiques (LazyColumn / LazyRow)¶
55.1 LazyColumn¶
Le composable LazyColumn() permet d'afficher une liste en composant seulement les éléments actuellement visibles à l'écran.

Ceci est efficace particulièrement dans le cas de listes qui peuvent contenir de nombreux éléments, par exemple une liste d'items tirés de la base de données.

Jetpack Compose (Kotlin)

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
...
val listeCategories = categorieUiState.listeCategories
...
LazyColumn {
    // item permet d'ajouter des composables avant la liste
    item {
        Text(text = "Liste des catégories")
    }
    // items permet de boucler dans les données
    items(items = listeCategories) {
        Text(text=it.titre, modifier = Modifier.padding(15.dp))
        HorizontalDivider()
    }
}
Gestion de l'espacement¶
Pour gérer les espaces dans la liste :

contentPadding : espace alentour du contenu, même si pas visible. Contrairement à un padding appliqué sur le¶
parent du LazyColumn, le contentPadding assure que si un item n'est visible qu'à moitié dans le bas de l'écran, il n'y aura pas de barre blanche entre ce qu'on voit et le bas de l'écran.

verticalArrangement = Arrangement.spacedBy : espace entre chaque élément¶
Jetpack Compose (Kotlin)

LazyColumn(
    contentPadding = PaddingValues(20.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
) {
    ...
}
Illustration

Erreur No value passed for parameter 'count'¶
Si vous ajoutez un LazyColumn et que vous obtenez l'erreur « No value passed for parameter 'count' », c'est probablement dû à une erreur de import.

Illustration

Pour corriger le problème, vous devez ajouter cette instruction import.

Il est possible qu'Android Studio ne l'ait pas fait même si vous avez configuré l'ajout automatique des import.

Jetpack Compose (Kotlin)

import androidx.compose.foundation.lazy.items
Pour plus d'information¶
* « Mises en page de base dans Compose - Grille de collections préférées : grilles différées » - Android Developers¶
compose-layouts?hl=fr#7 56. Exercice 9

Gestion de l'état dans Jetpack Compose¶
21.1 Les variables d'état¶
Dans un projet Android avec Jetpack Compose, la vue est rafraîchie à chaque fois qu'une variable d'état change de valeur. Ce concept s'appelle la programmation réactive.

Jetpack Compose est donc un cadre d'application réactif au même titre que React ou encore SwiftUI.

Pour déclarer une variable d'état dans Jetpack Compose :

Kotlin

var maVariable by remember { mutableStateOf("valeurOriginale") }
Il est possible de spécifier le type si désiré :

Kotlin

var maVariable: String by remember { mutableStateOf("valeurOriginale") }
Important : avec cette syntaxe qui utilise les mots by remember, vous devez ajouter deux instructions import.

Kotlin

import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
Ceci est nécessaire puisque la syntaxe by remember vous permettra d'accéder directement à la variable par son nom.

Dans l'expression by remember, le mot-clé by s'appelle délégué de propriété (en anglais, delegated property).

Il aurait également été possible d'omettre le mot-clé by.

À ce moment, plus besoin des deux import. Cependant, la variable créé serait alors de type MutableState<...> et pour accéder à sa valeur, il faudrait faire suivre son nom par .value.

Si vous utilisez la syntaxe by remember et que vous oubliez les deux import, vous obtiendrez l'erreur Type 'TypeVariable(T) has no method 'getValue(Nothing?, KProperty<*>)' and thus it cannot serve as a delegate.

Illustration

!!! warning "Attention : si vous " Attention : si vous désirez utiliser une liste d'objets comme variable d'état, vous devez apporter quelques ajustements à votre code comme démontré sur cette fiche : « mutablelistof_comme_variable_d_etat ».

Pour plus d'information¶
« What does 'by' keyword do in Kotlin? » - StackOverflow
21.2 Où déclarer les variables d'état?¶
Avec Jetpack Compose, si l'application n'utilise pas les ViewModels, les variables d'état doivent être déclarées dans une fonction modulable.

La plupart du temps, elles seront déclarées dans la toute première fonction modulable. Cette fonction peut porter n'importe quel nom. Cependant, on lui donnera souvent le nom MainScreen.

Kotlin

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MonApplicationTheme {
                Scaffold(
                    modifier = Modifier
                        .fillMaxSize(),
                    content = { innerPadding ->
                        MainScreen (innerPadding)
                    }
                )
            }
        }
    }
}
@Composable
fun MainScreen (innerPadding: PaddingValues) {
     var maVariableDEtat: String by remember { mutableStateOf("") }
    ...
}
Dans le cas où une autre fonction modulable doit utiliser la même variable d'état, il faudra utiliser une technique nommée hissage d'état.¶
21.3 Où peut-on modifier la valeur d'une variable d'état

Il faut faire attention à l'endroit où la modification d'une variable d'état est effectuée. Ceci ne doit jamais être fait directement dans un composable.

Une variable d'état doit être modifiée en réponse à un événement, par exemple un clic sur un bouton.¶
Si vous effectuez la modification à un endroit inapproprié, l'application aura un fonctionnement erratique.

Selon la documentation officielle de Android Developers:


La couche de l'UI ne doit jamais changer d'état en dehors d'un gestionnaire d'événements, car cela peut entraîner des incohérences et des bugs dans votre application.
Par exemple, dans l'application mal codée présentée plus bas, dès qu'un caractère est entré dans la boîte de saisie, l'heure est réinitialisée puis réaffichée dans une boucle infinie. Ceci n'est pas acceptable :-o

Ce comportement s'explique comme suit :

L'entrée d'un caractère modifie la valeur de la variable d'état valeur, ce qui cause la recomposition du composable qui lit cette variable d'état, soit MainScreen().
Ceci cause une nouvelle initialisation de l'heure.
Puisque l'heure est une variable d'état, ceci cause une recomposition du composable qui lit l'heure, soit MainScreen(). Et voilà, la boucle est partie!
Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
    var valeur by remember { mutableStateOf("") }
    var heure by remember { mutableStateOf( "" ) }
    heure = LocalDateTime.now().toString()
    Column {
        TextField(
            value = valeur,
            onValueChange = { newText ->
                valeur = newText
            }
        )
        Text(text = heure)
    }
}
Source :

1. * « Structurer votre interface utilisateur Compose - Les événements dans Compose » - Android Developers¶
43.1 Survivre à la recréation de l'activité (ex. suite au changement d'orientation)¶
Avez-vous déjà essayé de changer l'orientation du téléphone alors qu'une petite application qui utilise une variable d'état est en cours d'exécution?

Prenons cet exemple :

Jetpack Compose (Kotlin)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MonApplicationTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MainScreen(
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}
@Composable
fun MainScreen(modifier: Modifier = Modifier) {
    var nombre by remember { mutableStateOf(0) }
    Column(
        modifier = modifier
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            Button(
                onClick = { nombre = nombre + 1 }
            ) {
                Text("Incrémenter")
            }
            Text(
                text = "$nombre",
                fontSize = 40.sp,
            )
        }
    }
}
Quand on change l'orientation du téléphone pour le mettre en position horizontale, la variable d'état revient à sa valeur originale.

0:00 / 0:09

C'est parce que remember permet de survivre seulement aux recompositions.

Quand on change l'orientation du téléphone, c'est tout l'objet MainActivity qui est détruit puis recréé. Lors de la recréation, les variables d'état déclarées avec remember sont réinitialisées.

Survivre à la recréation de l'activité¶
Il existe différentes techniques pour survivre à la recréation d'une activité.

rememberSaveable¶
Pour régler ce problème dans une petite application, il suffit de déclarer avec rememberSaveable les variables d'état qui doivent conserver leur valeur lors de la recréation de l'activité.

Jetpack Compose (Kotlin)

var nombre by rememberSaveable { mutableStateOf(0) }
Lorsque vous voyez du code dans des notes de cours, sur le Web ou suggéré par une IA, il arrive fréquemment que les extraits de code soient donnés avec remember plutôt que rememberSaveable.

La raison première est pédagogique : remember est un concept plus simple. Donc, rememberSaveable est généralement introduit plus tard pour aider à comprendre ce que chacun fait.

Contexte où l'utilisation de remember est correcte¶
Dans certains contextes, il est préférable d'utiliser remember, notamment parce qu'il est moins exigeant au niveau des ressources.

Voici des contextes où il est correct d'utiliser remember :

variable d'état qui retient si une initialisation est en cours ou non : l'initialisation devra être refaite lors du changement¶
d'orientation alors il est correct que la variable d'état reprenne sa valeur de départ.

snackbarHostState : on s'attend à ce qu'un Snackbar ne survive pas à un changement d'orientation.¶
objet non sérialisable : rememberSaveable requiert que la variable soit sérialisable afin de permettre sa conservation¶
lors de la destruction de l'activité. Certaines classes, par exemple ExoPlayer, ne sont pas sérialisables.

Il est de votre responsabilité de choisir correctement entre remember et rememberSaveable selon le contexte.¶
ViewModel¶
Dès qu'une application prend un peu d'envergure, il est préférable de travailler avec un ViewModel.¶
Le ViewModel
Variables d'état avancées et State Hoisting¶
28.1 Hisser l'état (state hoisting)¶
Lorsqu'une fonction modulable déclare une variable d'état et qu'elle appelle une autre fonction (modulable ou non) qui doit modifier cette variable d'état, il faut utiliser un mécanisme qui s'appelle hissage d'état (en anglais : state hoisting) pour y parvenir.

Il s'agit de passer en paramètre une expression lambda qui permet de modifier la variable d'état.

Cette technique est nécessaire puisqu'en Kotlin, les paramètres sont immuables. Il n'est donc pas possible de passer une variable d'état en paramètre à une fonction qui doit modifier cet état.

Pour éviter d'avoir à hisser l'état trop de fois, le propriétaire d'état (la fonction modulable dans laquelle la variable d'état est déclarée) devra être le plus petit ancêtre commun des fonctions modulables qui doivent lire ou écrire dans cette variable.

Le nom du paramètre de l'expression lamba sera habituellement du genre onXXXChange où XXX représente le nom de la variable d'état.

Dans le traitement de l'expression lambda, on assignera le mot-clé it à la variable d'état.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
    var maVariableDEtat : String by remember { mutableStateOf("") }
    ...
    Button(
        onClick = {
            faireQuelqueChose( onMaVariableDEtatChange = { maVariableDEtat = it })
        }
    ) {
        Text(text = "Appliquer")
    }
}
Dans la déclaration de la fonction, il faut préciser les types de l'expression lambda :

Après le nom du paramètre suivi de deux points (:), on précisera entre parenthèses le type du paramètre que¶
l'expression lambda reçoit. Il s'agit du type de la variable d'état.

À la suite de la flèche, on précisera le type de la valeur de retour de l'expression lambda, soit Unit.¶
À l'intérieur de la fonction, on appellera l'expression lambda au moment approprié, en lui passant en paramètre la valeur qui doit être assignée à la variable d'état.

Jetpack Compose (Kotlin)

fun faireQuelqueChose( onMaVariableDEtatChange : ( String ) -> Unit) {
    ...
    val nouvelleValeur = ...
    onMaVariableDEtatChange ( nouvelleValeur )   // assigne la nouvelle valeur à la variable d'état
}
Case de saisie simple¶
Un scénario souvent rencontré pour le hissage d'état consiste à assigner à une variable d'état la valeur d'une case de saisie.

Dans le cas le plus simple, on n'a pas à déclarer la fonction qui reçoit l'expression lambda. C'est la fonction modulable TextField qui le fait pour nous. Il suffit d'appeler la fonction en lui passant l'expression lambda appropriée.

Jetpack Compose (Kotlin)

TextField(
    value = titre,
    onValueChange = { titre = it } ,
    label = { Text("Titre") }
)
Fonction qui affiche une case de saisie¶
Dans ce second exemple, on travaille avec une fonction modulable qui affiche un texte suivi d'une case de saisie.

Il est ici nécessaire de passer en paramètre la variable d'état (pour afficher sa valeur dans la case) en plus de l'expression lambda (pour modifier la valeur selon ce qui est saisi).

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
    var nom by remember { mutableStateOf("") }
    SaisieNom(nom = nom, onNomChange = { nom = it } )
}
@Composable
fun SaisieNom(nom: String, onNomChange: (String) -> Unit ) {
    Column {
        Text(
            text = "Valeur de la variable d'état: $nom",
        )
        OutlinedTextField(
            value = nom,
            onValueChange = onNomChange ,
            label = { Text("Saisir une valeur :") }
        )
    }
}
Hisser l'état deux fois¶
Parfois, l'état doit être hissé vers une fonction qui, elle aussi, doit hisser l'état vers une autre fonction.

À ce moment, l'expression lambda qui a été fournie lors du premier hissage n'aura pas à être redéfinie lors du second hissage.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
    // La varialbe d'état doit être déclarée ici car elle est utilisée dans la barre de titre.
    var points: Int by remember { mutableStateOf(0) }
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Text(text = "Mon application à $points points")
                }
            )
        },
        content = { innerPadding ->
            // Il faut hisser l'état pour que les points puissent être modifiés dans le contenu.
            MainContent(
                modifier = Modifier.padding(innerPadding),
                points,
                onPointsChange = { points = it }
            )
        }
    )
}
@Composable
fun MainContent(
    modifier: Modifier = Modifier,
    points: Int,
    onPointsChange: (Int) -> Unit
) {
    Column(
        modifier = modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        ...
        Button(
            onClick = {
                // On hisse l'état une seconde fois.
                // Cette fois, pas besoin de fournir l'expression lambda puisqu'elle a déjà été passée
                // en paramètre à cette fonction.
                Jouer(points, onPointsChange )
            }
        ) {
            Text(text = "Jouer")
        }
    }
}
fun Jouer(points: Int, onPointsChange: (Int) -> Unit ) {
    ...
    onPointsChange(points + 1)
}
Pour plus d'information¶
« État et Jetpack Compose - Hisser un état » - Android Developers

« Unlock the Power of State Hoisting in Jetpack Compose » - Medium 574f742c4721

* « Où hisser l'état? » - Android Developers¶
Exercice 3
79.1 derivedStateOf()¶
Afin d'améliorer les performances de votre application Android, il est possible d'utiliser derivedStateOf() afiin d'éviter les recompositions superflues.

Prenons l'exemple d'une application qui se termine après 10 itérations. Il n'est pas souhaitable qu'à chaque fois que l'itération est incrémentée, l'application soit recomposée.

Pour que la recomposition n'ait lieu qu'après les 10 itérations, la variable pourra être déclarée avec derivedStateOf() comme suit :

Kotlin

val afficherFinPartie by remember {
    derivedStateOf { iterations > 10 }
}
if (afficherFinPartie) {
    ...
}
Pour plus d'information¶
« Effets secondaires dans Compose - derivedStateOf : convertir un ou plusieurs objets d'état en un autre état » - Android Developers

« Jetpack Compose: remember, mutableStateOf, derivedStateOf and rememberSaveable explained » - Medium remember-mutablestateof-derivedstateof-and-remembersaveable-explained-270dbaa61b8

79.2 mutableListOf comme variable d'état¶
Selon la documentation officielle de Android :

Attention : Si vous utilisez des objets modifiables tels que ArrayList ou mutableListOf() en tant qu'état dans Compose, les utilisateurs verront des données incorrectes ou obsolètes dans votre¶
application.

Le problème, c'est qu'un objet créé avec mutableListOf() n'est pas observable alors il ne forcera pas le rafraîchissement de l'écran quand il est modifié.

Par exemple, avec ce code, rien n'apparaîtra à l'écran quand le bouton est cliqué.

Kotlin

@Composable
fun MainScreen() {
    val  heures : MutableState<MutableList<String>> = remember {
        mutableStateOf( mutableListOf() )
    }
    Column {
        Button(
            onClick = {
                heures .value.add(LocalDateTime.now().toString())   // la modification de la liste ne rafraîchit pas l'écran
            }
        ) {
            Text(text = "Ajouter")
        }
        AfficherItems(heures.value)
    }
}
@Composable
private fun AfficherItems(items: List<String>) {
    Column {
        for (item in items) {
            Text(text = item)
        }
    }
}
Il faut donc utiliser une astuce pour forcer le rafraîchissement de l'écran si une variable d'état a été créée avec mutableListOf().

Cette astuce consiste à copier les valeurs de la liste dans une liste temporaire, à effectuer les modifications désirées dans cette liste temporaire puis à réassigner la liste originale.

Cette réassignation crée une nouvelle copie de la liste et cette fois, Compose détectera le changement et rafraîchira l'écran.

Kotlin

Button(
    onClick = {
        val tempo = heures.value.toMutableList()
        tempo.add(LocalDateTime.now().toString())
        heures.value = tempo    // la réaffectation de la liste cause le rafraîchissement
    }
) {
    Text(text = "Ajouter")
}
Autre syntaxe équivalente que vous rencontrerez souvent en Kotlin :

Kotlin

val tempo = heures.value.toMutableList().apply { add(LocalDateTime.now().toString()) }
heures.value = tempo   // la réaffectation de la liste cause le rafraîchissement
ou mieux :

Kotlin

heures = heures.value.toMutableList().apply { add(LocalDateTime.now().toString()) }
Version avec la syntaxe « by remember »¶
Dans l'exemple précédent, la variable d'état n'a pas été créée à l'aide du mot-clé by, ce qui exige l'utilisation de .value pour accéder à sa valeur.

Le code aurait également pu être écrit comme suit.

Remarquez :

l'ajout du by¶
l'ajout des deux import¶
le retrait du MutableState<> lors de la déclaration de la variable d'état¶
le retrait du .value lors de son utilisation¶
cette fois, il faut déclarer la variable avec var puisqu'elle sera réassignée (la syntaxe sans le by réassignait¶
heures.value).

Kotlin

import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
...
@Composable
fun MainScreen() {
    var heures: MutableList<String> by remember {
        mutableStateOf(mutableListOf())
    }

    Column {
        Button(
            onClick = {
                val tempo = heures.toMutableList().apply { add(LocalDateTime.now().toString()) }
                heures = tempo   // la réaffectation de la liste cause le rafraîchissement
            }
        ) {
            Text(text = "Ajouter")
        }
        AfficherItems(heures)
    }
}
@Composable
private fun AfficherItems(items: List<String>) {
    Column {
        for (item in items) {
            Text(text = item)
        }
    }
}
Version avec la syntaxe « var (heures, setHeures) »¶
Pour compléter l'étude de ce concept, je vous présente une autre version qui utilise une syntaxe différente.

En effet, selon la documentation officielle de Android :

Il existe trois façons de déclarer un objet MutableState dans un composable :¶
val mutableState = remember¶
var value by remember¶
val (value, setValue) = remember { mutableStateOf(default) }

Cette fois, le code déclare directement un modificateur (setter) et s'en sert pour effectuer une réaffectation de la liste, ce qui force le rafraîchissement de l'écran.

Kotlin

@Composable
fun MainScreen() {
    val (heures, setHeures) = remember {
        mutableStateOf(mutableListOf<String>())
    }
    Column {
        Button(
            onClick = {
                setHeures(heures.toMutableList().apply { add(LocalDateTime.now().toString()) })
            }
        ) {
            Text(text = "Ajouter")
        }
        AfficherItems(heures)
    }
}
@Composable
private fun AfficherItems(items: List<String>) {
    Column {
        for (item in items) {
            Text(text = item)
        }
    }
}
Source :

1. * « État et Jetpack Compose » - Android Developers¶
2. * « État et Jetpack Compose » - Android Developers¶
Pour plus d'information¶
« Can I use State or State for observed by Compose to trigger recomposition when they change? » - Stack Overflow
* « There are three ways to declare a MutableState object in a composable » - Reddit¶
Optimiser l'application

Architecture avec ViewModel¶
44.1 Ajouter un fichier dans le dossier ui¶
Dans la vue Project, Android Studio montre les dossiers ui et theme fusionnés puisqu'il n'y a rien d'autre que le dossier theme sous ui .

Illustration

Pour ajouter un fichier dans le dossier ui, vous pouvez passer à la vue Project Files.

Faites un clic droit sur le dossier ui et choisissez New / Kotlin Class/File .

44.2 class vs data class¶
Avec Kotlin, il est possible d’utiliser le mot-clé data pour déclarer une classe dont le but premier est de stocker des données.

Kotlin

data class MaClasse(
    var unChamp: Int,
    var unAutreChamp: String
)
L'avantage, c'est que certaines méthodes sont automatiquement créées pour vous aider à manipuler ces données, par exemple hashcode(), equals(), copy() et toString().

Pour instancier un objet de cette classe :

Kotlin

val monObjet = MaClasse(1, "Une donnée")
Pour plus d'information¶
« Data classes » - Kotlin
* « Kotlin data class — Behind the mask » - Medium¶
44.3 Le ViewModel comme conteneur d'état¶
Selon la documentation Android :

La classe ViewModel est une logique métier ou un conteneur d'état au niveau de l'écran. Elle expose l'état au niveau de l'UI et encapsule la logique métier associée. Son principal avantage est qu'elle assure la mise en cache et la persistance de l'état en cas de modification de la configuration.

On dira que le ViewModel est la source unique de vérité ou source unique de référence ou, en anglais, Single Source Of Truth (SSOT).

L'utilisation d'un ViewModel dans une application Android facilitera notamment la gestion de données en provenance d'une base de données.

Mais avant de se lancer dans la gestion d'une base de données, regardons comment utiliser le ViewModel dans une application sans BD.

Dans cette fiche :

Création du ViewModel
Propriétés
Propriétés de support
Création de la classe UiState
Logique métier
Accéder à une variable d'état dans le ViewModel
Mise à jour de l'état
Accéder au ViewModel dans MainActivity
Instancier le ViewModel dans un composable plutôt que dans la classe MainActivity
Ajustements pour le Preview
Création du ViewModel¶
Lorsqu'on travaille avec un ViewModel, on n'aura plus de variables d'état déclarées directement dans les composables.

Chacun des ViewModels de l'application sera placé dans un dossier nommé ui et portera un nom qui se termine par ViewModel.

Le dossier ui est au même niveau que le fichier MainActiviy.kt , par exemple app/src/main/java/com/monnom/monprojet/ui/HomeViewModel.kt .

Un ViewModel est simplement une classe qui hérite de la classe ViewModel.

Fichier ui/HomeViewModel.kt

import androidx.lifecycle.ViewModel
class HomeViewModel : ViewModel() {
    ...
    // constructeur (à utiliser au besoin)
    init {
        ...
    }
}
Propriétés¶
La classe comprendra une propriété pour chacune des informations qu'elle doit conserver.

Pour que la modification d'une propriété cause le rafraîchissement de la vue, il faut la déclarer en tant que variable d'état.

Ici, pas besoin du mot-clé remember puisque la classe ne sera pas réinstanciée à chaque recomposition ni lors de la recréation de l'activité.

Notez que lorsqu'il n'y a aucun spécificateur d'accès, une propriété est considérée publique.

Ne pas prendre le Le code ci-dessous comme exemple, je vous présente une technique plus intéressante plus bas.

Fichier ui/HomeViewModel.kt

// Exemple à ne pas utiliser dans le cadre de ce cours. Voir plus bas pour la technique recommandée.
class HomeViewModel : ViewModel() {
    val points: MutableState<Int> = mutableStateOf(0)
    val partieTerminee: MutableState<Boolean> = mutableStateOf(false)
    ...
}
Propriétés de support¶
Il est conseillé de créer des propriétés privées. Chaque propriété utilisera une propriété de support (backing property) pour fournir une valeur au monde extérieur.

Par convention, le nom d'une propriété privée débute par une barre en bas (_). Son vis-à-vis public porte le même nom mais sans la barre en bas.

Ici encore, on préférera utiliser la technique présentée plus bas.

Fichier ui/HomeViewModel.kt

// Exemple à ne pas utiliser dans le cadre de ce cours. Voir plus bas pour la technique recommandée.
class HomeViewModel : ViewModel() {
    private val _points: MutableState<Int> = mutableStateOf(0)
    val points: Int
        get() {
            if (_points.value >= 0) {
                return _points.value
            }
            else {
                return 0
            }
        }
    ...
} 
Création de la classe UiState¶
La technique recommandée pour déclarer les variables d'état du ViewModel consiste à utiliser une classe spécialisée pour gérer ces valeurs.

Puisque ces valeurs sont rattachées à l'état de l'interface utilisateur (UiState), la classe portera un nom qui se termine par UiState.

Le ViewModel utilisera une instance de cette classe comme variable d'état.

Dans le cadre de ce cours, un ViewModel qui n'utilise pas le UiState de façon appropriée ne sera pas accepté.

Cette classe, qui est en fait une classe de données peut être déclarée dans le même fichier que le ViewModel.

Les propriétés de la classe UiState doivent être déclarées avec val (lecture seulement) et non avec var.

Fichier ui/HomeViewModel.kt

class HomeViewModel : ViewModel() {
    ...
}

data class HomeUiState (
    val points: Int = 0,
    val message: String = ""
) {
    val partieTerminee: Boolean
        get() = points >= 5
}
Ici, points et message sont déclarées avec val donc elles ne peuvent pas être modifiées. Le ViewModel change l'état de l'application en utilisant une nouvelle instance de la classe HomeUiState, via la méthode copy().

partieTerminee est une propriété calculée qui retourne true si le nombre de points est supérieur ou égal à 5. Elle n'est pas stockée dans la classe mais calculée à la demande.

On peut désormais ajouter au ViewModel une propriété, nommée ici _uiState, qui fait référence à une instance de cette classe plutôt qu'une liste de propriétés distinctes.

Cette propriété est de type MutableStateFlow, c'est-à-dire un flux observable dont la valeur peut être modifiée.

La propriété privée _uiState pourra être modifiée à l'intérieur de la classe HomeViewModel à l'aide de _uiState.update().

Le ViewModel comprend une seconde propriété, nommée ici uiState. Cette fois, il s'agit d'une propriété publique.

La propriété uiState est immuable grâce à l'utilisation de .asStateFlow(). Il s'agit donc d'un flux en lecture seule. Sa valeur est toujours basée sur celle de _uiState.

Important : sans le .asStateFlow(), l'objet sous-jacent serait toujours un MutableStateFlow donc il pourrait être modifié ailleurs que dans le ViewModel.

Fichier ui/HomeViewModel.kt

class HomeViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()
    ...
}
Remarque : il n'est pas toujours requis de travailler avec un flux. J'ai utilisé cette approche ici puisque prochainement, nous aurons besoin d'un flux lorsque nous créerons un ViewModel qui interagit avec une base de données.

Dans un projet qui n'a pas besoin de flux pour les variables d'état, le ViewModel pourrait faire référence au uiState comme suit :

Fichier ui/HomeViewModel.kt

// Incorrecte : ne pas utiliser dans le cadre de ce cours
var uiState by mutableStateOf(HomeUiState())
    private set
Étant donné qu'on utilisera prochainement le ViewModel avec Room pour accéder à une base de données et qu'on désire être réactif quand les données de la BD changent, il est plus simple d'utiliser la syntaxe avec flux tout de suite.

Le travail avec uiState sans flux n'est pas accepté dans le cadre de ce cours à moins d'avis contraire.

Logique métier¶
Grâce aux ViewModels, il est possible de coder au même endroit toute la logique métier, séparément du code qui gère l'interface utilisateur.

On ajoutera au ViewModel (et non au UiState) une méthode pour chaque opération sur les données.

Ces méthodes sont le seul endroit où les variables d'état peuvent être modifiées.

Évidemment, il ne doit pas y avoir de composables dans le ViewModel. Le ViewModel gère des données mais ne fait pas d'affichage.

Accéder à une variable d'état dans le ViewModel¶
Si le ViewModel a besoin de connaître la valeur d'une propriété du UiState, il doit utiliser uiState.value.nomPropriete.

Le mot-clé value est requis puisque la variable uiState est un flux. C'est un flux et non la valeur qu'il contient. uiState.value permet d'obtenir la valeur courante de ce flux.

Fichier ui/HomeViewModel.kt

class HomeViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    fun jouer() {
        if (! uiState.value.partieTerminee ) {
            ...
        }
    }
}
Mise à jour de l'état¶
Ce sont les méthodes du ViewModel qui doivent se charger de modifier la variable d'état _uiState.

Pour mettre à jour l'état de façon sécuritaire dans un environnement avec plusieurs fils d'exécution, il faut utiliser _uiState.update.

À l'intérieur de cette méthode, il faudra effectuer une copie du UiState pour que Jetpack Compose soit informé de la modification de l'état.

La copie utilisera un paramètre implicite nommé it, qui représente l'objet _uiState.

On peut d'ailleurs voir ce paramètre dans l'IDE :

Illustration

.copy() est une méthode qui est automatiquement créée par Kotlin lorsqu'on déclare une classe de données. Elle permet de créer une copie d'un objet en modifiant seulement certaines propriétés.

On précise les propriétés à modifier dans la copie en utilisant le nom de la propriété suivi du signe = et de la nouvelle valeur. Ce sont des arguments nommés, donc l'ordre n'a pas d'importance. Les propriétés qui ne sont pas mentionnées dans la copie conserveront leur valeur initiale.

Voici un exemple de logique métier qui met à jour l'état :

Fichier ui/HomeViewModel.kt

class HomeViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

     fun jouer() {
        // technique thread-safe pour mettre à jour l'état
        // Attention : le update ne suspend pas l'exécution du thread.
        // Il n'est pas garanti qu'il soit terminé avant l'exécution des lignes de code qui viennent après.
        if (...) {
             _uiState.update {
                it.copy (
                    _points = it.points + 1
                )
            }
        }
    }
}
Modifier un tableau¶
Dans le cas particulier d'un tableau déclaré avec List<...> dans le UiState, il faudra prendre une précaution supplémentaire car à la base, il est immuable.

On le transformera en tableau modifiable auquel on applique une instruction.

Fichier ui/HomeViewModel.kt

class HomeViewModel : ViewModel() {
    ...
    _uiState.update {
        it.copy (
             _monTableau = it.monTableau.toMutableList().apply { this[indice] = ... }
        )
    }
}
data class HomeUiState(
    private val _monTableau: List<String> = listOf(...),
    ...
}
Pour ajouter un élément au tableau, on peut faire ceci :

Fichier ui/HomeViewModel.kt

_uiState.update {
    it.copy (
        _monTableau = it.monTableau + nouvelElement
    )
}
Modifier plusieurs variables¶
Pour modifier plusieurs variables, il faut faire le traitement dans un seul it.copy() avec toutes les variables à modifier. Il est déconseillé de faire plusieurs it.copy() à la suite car cela pourrait causer des problèmes de performance et de cohérence de l'état.

Fichier ui/HomeViewModel.kt

_uiState.update {
    it.copy (
        _points = it.points + 1 ,
        _autreChose = autreValeur
    )
}
Accéder au ViewModel dans MainActivity¶
L'application peut désormais travailler avec le conteneur d'état.

Une variable, nommée ici viewModel, sera instanciée dans la classe MainActivity et elle sera passée en paramètre à ses descendants.

Notez qu'il est déconseillé de passer un ViewModel en paramètre à des fonctions modulables . Cependant, dans le cadre de ce cours, cette pratique est autorisée afin de faciliter votre travail.

Une variable uiState sera initialisée dans chacun des composables où elle est requise, en utilisant le ViewModel reçu en paramètre. Avant de pouvoir l'utiliser, il faut lui appliquer la méthode collectAsState() qui se charge recueillir les valeurs d'un flux (Flow ) et de représenter la dernière valeur émise en tant que variable d'état.

Fichier MainActivity.kt

class MainActivity : ComponentActivity() {
    // instanciation du ViewModel
    private val _viewModel: HomeViewModel by viewModels()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MonProjetTheme {
                MainScreen( _viewModel )
            }
        }
    }
}
@Composable
fun MainScreen( viewModel: HomeViewModel ) {
    // création d'un observateur de l'état
    val uiState by viewModel.uiState.collectAsState()
    ...
    Button(
        onClick = {
            viewModel.jouer()
        }
    ) {
        Text(text = "Jouer")
    }
    Text(text = "points: " + uiState.points )
    ...
}
Grâce à collectAsState(), l'interface utilisateur (UI) sera rafraîchie quand une variable du ViewModel est mise à jour.

Le code qui suit est réservé aux fonctions non composables, par exemple dans une méthode du cycle de vie (onStop, onPause, ...). Il permet de connaître les valeurs du uiState au moment actuel mais ne demeure pas à l'écoute pour les actualiser lorsqu'elles sont modifiées.

Si on avait utilisé ce code dans un composable, on n'aurait vu aucun changement à l'écran. De plus, on aurait reçu l'avertissement « StateFlow.value should not be called within composition ».

Fichier MainActivity.kt

@Composable
fun MonComposable(viewModel: HomeViewModel) {
    val uiState = viewModel.uiState.value
    ...
}
Instancier le ViewModel dans un composable plutôt que dans la classe MainActivity¶
Pour éviter de passer le ViewModel en paramètre à une foule de fonctions, il est possible de l'instancier dans le plus petit ancêtre commun, c'est-à-dire dans la fonction composable qui est le plus proche parent des composables qui en ont besoin.

Pour instancier le ViewModel dans un composable, il faudra apporter quelques ajustements au projet.

Attention : dans le cadre du cours il ne doit y avoir qu'une seule instance du ViewModel dans l'application. Dans les extraits de code qui suivent, le ViewModel est instancié dans une fonction composable mais pas dans MainActivity.

D'abord, il faut ajouter une dépendance.

Cette ligne doit être ajoutée dans le fichier build.gradle.kts qui se trouve dans le dossier app .

Fichier app/build.gradle.kts

...
dependencies {
    ...
    // Pour instancier le ViewModel dans un composable
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.5")
}
Une fois la dépendance ajoutée, il faut resynchroniser le projet pour qu'il tienne compte de l'ajout.

Pour instancier le ViewModel dans une fonction composable, procédez comme suit.

Jetpack Compose (Kotlin)

@Composable
fun MonComposable() {
    val viewModel: HomeViewModel = viewModel()
    ...
}
Grâce à la dépendance ajoutée plus tôt, Android Studio sera capable de suggérer le import requis pour permettre l'utilisation de la fonction composable viewModel().

Jetpack Compose (Kotlin)

import androidx.lifecycle.viewmodel.compose.viewModel
Remarquez l'absence du mot-clé by (délégué de propriété ) lorsque le ViewModel est instancié dans un composable alors qu'il était obligatoire quand il était instancié dans la classe.

Ajustements pour le Preview¶
Dans le cas où la fonction composable principale (souvent nommée MainScreen) reçoit le ViewModel en paramètre, il faut faire un petit ajustement si vous désirez utiliser la fonctionnalité de prévisualisation dans votre IDE.

Fichier MainActivity.kt

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    MonProjetTheme {
        val previewViewModel = viewModel<HomeViewModel>()    // cette ligne nécessite l'ajout de dépendance dans build.gradle.kts (voir plus haut)
        MainScreen( viewModel = previewViewModel )
    }
}
Source :

1. * « Présentation de ViewModel » - Android Developers¶
Pour plus d'information¶
« ViewModel et l'état dans Compose » - Android Developers hl=fr#0

« ViewModel Jetpack Compose Android Simple Example » - Bigknol

« Make sure to update your StateFlow safely in Kotlin! » - Droidcon

« View Model Creation in Jetpack Compose » - dev.to

* « Getting started with Jetpack Compose - StateFlow » - Sentry¶
44.4 Plus petit ancêtre commun des fonctions qui ont besoin du ViewModel

Je vous illustre ici comment déterminer quel est le plus petit ancêtre commun des composables qui ont besoin du ViewModel.

Jetpack Compose (Kotlin)

class MainActivity : ComponentActivity() {
    // instanciation du ViewModel
    private val _viewModel: HomeViewModel by viewModels()
    // *** 1 : Le ViewModel n'est pas utilisé ici, il est seulement instancié
    // puis passé en paramètre à un composable.
    // Sommes-nous dans le plus petit ancêtre commun?
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TestPlusPetitAncetreCommunTheme {
                MainScreen(_viewModel)
            }
        }
    }
}
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(viewModel: HomeViewModel) {
    // *** 2 : Le ViewModel n'est pas utilisé ici, il est seulement reçu en paramètre
    // puis repassé à un composable.
    // Sommes-nous dans le plus petit ancêtre commun?
    Scaffold(
        modifier = Modifier
            .fillMaxSize(),
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Text(text = "Test plus petit ancêtre commun")
                },
            )
        }
    ) { innerPadding ->
        MainContent(innerPadding, viewModel)
    }
}
@Composable
fun MainContent(innerPadding: PaddingValues, viewModel: HomeViewModel) {
    // *** 3 : Le ViewModel est utilisé ici pour initialiser le uiState
    // afin de passer le uiState en paramètre.
    // Ceci est le plus petit ancêtre commun des composables qui ont besoin du ViewModel (ou du UiState).
    // Le ViewModel aurait dû être instancié ici.
    // création d'un observateur de l'état 
    val uiState by viewModel.uiState.collectAsState()
    Column(
        modifier = Modifier
            .padding(innerPadding)
            .fillMaxWidth().fillMaxHeight(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top,
    ) {
        MonBouton(viewModel, uiState)
        MaListe(uiState)
    }
}
@Composable
fun MonBouton(viewModel: HomeViewModel, uiState: HomeUiState) {
    Button(
        onClick = {
            viewModel .ajouterHeure()
        },
        enabled = ! uiState .partieTerminee
    ) {
        Text(text = "Enregistrer")
    }
}
@Composable
fun MaListe(uiState: HomeUiState) {
    val dateTimeFormatter = DateTimeFormatter.ofPattern("H:mm:ss.SSS")
    Column(
        modifier = Modifier
            .padding(all = 25.dp)
            .verticalScroll(rememberScrollState())
    ) {
        uiState .heures.forEach { heure ->
            Text(heure.format(dateTimeFormatter))
        }
    }
    if ( uiState .partieTerminee) {
        Text("Bravo!")
    }
}
69.1 ViewModelFactory¶
L'instantiation d'un ViewModel peut être réalisée de différentes façons selon les besoins de l'application.

Application sans base de données¶
Quand on instancie un ViewModel dans une application sans base de données, le ViewModel n'a pas besoin de recevoir de paramètre.

On peut procéder comme suit :

Jetpack Compose (Kotlin)

class MainActivity : ComponentActivity() {
    private val _viewModel: HomeViewModel by viewModels()
    ...
}
ou, pour instancier le ViewModel dans un composable :

Jetpack Compose (Kotlin)

@Composable
fun MonComposable() {
    val viewModel: HomeViewModel = viewModel()   // requiert l'ajout d'une **dépendance au projet**
    ...
}
L'utilisation de viewModels() ou de viewModel() assure que le ViewModel ne sera pas recréé lors de la prochaine recomposition.

Application avec base de données¶
Dans le modèle proposé jusqu'ici pour un ViewModel qui interagit avec la base de données, le constructeur a besoin de recevoir l'application en paramètre. Pas de problème, les fonctions viewModels() et viewModel() se chargeront d'injecter l'objet de type Application dans le constructeur.

Mais si le ViewModel avait besoin d'un autre paramètre?

Il faut savoir que viewModels() et viewModel() ne permettent pas de passer des paramètres personnalisés. Il faut donc trouver une technique pour y arriver.

L'approche suivante fonctionne mais elle a un défaut de taille : le ViewModel sera recréé à chaque fois que l'activité est recréée. Ce sera le cas notamment quand le téléphone passe du mode portrait au mode paysage et vice-versa.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
    val categorieViewModel = CategorieViewModel(monParametre)
    ...
}
Pour régler ce problème, il faudra travailler avec un ViewModelFactory, qui permet de passer des paramètres personnalisés au ViewModel.

Cette classe peut être codée dans le même fichier que le ViewModel correspondant.

Fichier ui/CategorieViewModel.kt

class CategorieViewModelFactory(
    private val _monParametre: MonType
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T { // T représente le type du ViewModel (ex :
CategorieViewModel)
        // Vérifie si la classe reçue en paramètre est de type CategorieViewModel ou un de ses ancêtres
        if (modelClass.isAssignableFrom(CategorieViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST") // pour ne pas avoir le message "Warning: Unchecked cast: CategorieViewModel to T"
            return CategorieViewModel( _monParametre ) as T // crée le CategorieViewModel avec le paramètre requis et retourne
cette instance
        }
        throw IllegalArgumentException("La classe n'est pas du bon type.")
    }
}
Il est désormais possible de créer le ViewModel avec viewModel() avec des paramètres personnalisés.

Jetpack Compose (Kotlin)

val categorieViewModel: CategorieViewModel = viewModel( factory = CategorieViewModelFactory(monParametre) )
Exemples d'application¶
Il est possible de coder une application mobile sans utiliser de ViewModelFactory.

Par contre, cette technique pourrait être intéressante des différentes situations :

Le ViewModel travaille avec un contexte quelconque plutôt qu'avec celui de l'application
Le ViewModel reçoit un id en paramètre afin d'aller chercher les données d'un enregistrement dès son instanciation
Le ViewModel a besoin de connaître l'identifiant de l'usager actif dans une application multi-usagers
Pour plus d'information¶
« Créer des ViewModels avec des dépendances » - Android Developers hl=fr
* « Why Use ViewModel Factory? Understanding Parameterized ViewModels » - Medium
Effets secondaires (Side Effects)¶
67.1 Qu'est-ce qu'un effet secondaire?¶
Selon la documentation Android :

Un effet secondaire est un changement d'état de l'application qui se produit en dehors du champ d'application d'une fonction modulable.¶
Par exemple, on pourrait utiliser l'effet secondaire LaunchedEffect() qui permet d'appeler une fonction asynchrone lorsqu'une condition survient, par exemple lors du chargement initial d'un composable ou encore lorsqu'une variable d'état change de valeur.

Autre exemple : l'effet secondaire DisposableEffect permet d'effectuer des tâches de nettoyage à certaines étapes du cycle de vie.

Source :

1. * « Effets secondaires dans Compose » - Android Developer¶
67.2 LaunchedEffect¶
L'effet secondaire LauchedEffect() permet d'effectuer un appel asynchrone lors du premier chargement d'un composable ou encore à chaque fois que la valeur de sa clé est modifiée.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen() {
    var nom by rememberSaveable { mutableStateOf("nom par défaut") }
    // ceci sera effectué seulement lors du premier chargement de MainScreen
    LaunchedEffect( true ) {
        delay(100) // pour illustrer que LauchedEffect peut appeler des fonctions asynchrones
        Log.d("MainActivity", "Ceci est fait seulement la première fois. Votre nom : $nom")
    }
    // ceci sera effectué lors du premier chargement de même qu'à chaque fois que nom change de valeur
    LaunchedEffect( key1 = nom ) {
        delay(100)
        Log.d("MainActivity", "Ceci est fait à chaque changement de la clé. Votre nom : $nom")
    }
    Column {
        TextField(
            value = nom,
            onValueChange = { nom = it },
            label = { Text("Votre nom") }
        )
    }
}
Pour plus d'information¶
« Jetpack Compose Side Effects — LaunchedEffect With Example » - Medium example-99c2f51ff463

« How to Use Render Effects in Jetpack Compose for Stunning Visuals » - Canopas stunning-visuals-01287d7f00db

68. Formulaire de modification de données

Programmation asynchrone et Coroutines¶
81.1 Les coroutines¶
Selon la documentation officielle d'Android :

Les coroutines sont la solution recommandée pour la programmation asynchrone sur Android.¶
Source :

1, * « Coroutines Kotlin sur Android » - Android Developers

Pour plus d'information¶
« Asynchronous programming with coroutines » - Kotlin

« Jetpack Compose — Suspend functions inside composables » - Medium composables-c0ac4568eed4

« Launching Coroutines, Collecting Flow with Lifecycle scope in a correct way » - Medium with-lifecycle-scope-in-a-correct-way-973a7e1bfe63

« Flux Kotlin sur Android » - Android Developers

81.2 Appeler des fonctions asynchrones¶
...

Pour plus d'information¶
« Composing suspending functions » - Kotlin
82. Les notifications¶

Préférences utilisateur¶
Preferences DataStore¶
Une préférence utilisateur est une configuration qui est choisie par l'utilisateur et sauvegardée sur le disque de l'appareil mobile.

Elle est enregistrée dans l'espace disque privé réservé à l'application. Elle est toujours active lors du prochain démarrage de l'application.

Il s'agit d'une information simple représentée par une paire clé-valeur.

Dans cette fiche :

Dépendance
Classe pour gérer la lecture et l'enregistrement
Supprimer une paire clé-valeur
Consulter les données du Preferences DataStore
Ajustements pour le Preview
Dépendance¶
Avant de vous lancer dans l'enregistrement de préférences utilisateur, il faut ajouter une dépendance à votre projet.

Cette ligne doit être ajoutée dans le fichier app/build.gradle.kts.

Fichier app/build.gradle.kts

...
dependencies {
    ...
    // pour enregistrer des paires clé-valeur (préférences utilisateur)
    implementation(libs.datastore.preferences)
}
Notez que la version de la dépendance pourrait être différente. Android Studio vous le fera savoir si une version plus récente est disponible.

Une fois la dépendance ajoutée, il faut resynchroniser le projet pour qu'il tienne compte de l'ajout.

Classe pour gérer la lecture et l'enregistrement¶
Les instructions pour gérer les préférences utilisateur seront codées dans leur propre classe.

Cette classe devra être dans son propre fichier et le fichier portera le même nom que la classe.

Toutes les classes qui servent à gérer des données seront placées dans un dossier nommé data .

Ce dossier sera au même niveau que le fichier MainActiviy.kt .

Le chemin complet de la classe sera donc au format : app/src/main/java/com/mondomaine/monprojet/data/PreferencesUtilisateur.kt .

Pour créer un dossier dans Android Studio :

Assurez-vous que l'affichage soit en mode Projet (cliquez sur la liste déroulante dans le haut de la zone qui affiche les fichiers du projet puis sélectionnez Project ).
Effectuez un clic droit sur le dossier parent / New / Package .
Voici le contenu de cette classe pour gérer deux préférences utilisateur : une de type String ainsi qu'une autre de type Int.

À vous de l'adapter à vos besoins.


Vous ne devez surtout pas conserver les noms uneCle et autreCle ;-)
Fichier data/PreferencesUtilisateur.kt (Kotlin)

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
/**
 * Gestion des préférences utilisateur.
 *
 * @author Christiane Lagacé, inspiré de https://medium.com/@rowaido.game/persistent-data-storage-using-datastore-preferences-
in-jetpack-compose-90c481bfed12
 *
 * @property dataStore DataStore qui stocke les préférences utilisateur.
 */
class PreferencesUtilisateur(private val dataStore: DataStore<Preferences>) {
    private companion object {
        val UNE_CLE = stringPreferencesKey("une_cle")
        val AUTRE_CLE = intPreferencesKey("autre_cle")
    }
    val uneCleFlow: Flow<String> =
        dataStore.data.map { preferences ->
        preferences[UNE_CLE] ?: "Inconnu"
    }
    suspend fun saveUneCle(valeur: String) {
        dataStore.edit { preferences ->
            preferences[UNE_CLE] = valeur
        }
    }
    val autreCleFlow: Flow<Int> =
        dataStore.data.map { preferences ->
        preferences[AUTRE_CLE] ?: -1
    }
    suspend fun saveAutreCle(valeur: Int) {
        dataStore.edit { preferences ->
            preferences[AUTRE_CLE] = valeur
        }
    }
}
Quelques explications :

Le companion object en Kotlin est semblable aux propriétés statiques dans d'autres langages. On pourra accéder à ces propriétés directement à l'aide du nom de la classe.
La lecture et l'écriture sont réalisées de façon asynchrone. C'est pourquoi la lecture retourne un Flow plutôt que directement un String.
Lors de la lecture et de l'écriture, on utilise une constante (ex : UNE_CLE) pour référer au nom physique de la clé (ex :une_cle). Ceci assure qu'on utilise le bon nom de clé pour lire et pour écrire la valeur d'une préférence utilisateur.
Pour utiliser cette classe, ajoutez ceci à votre code.

Fichier MainActivity.kt

// propriété d'extension de la classe Context
private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(
    name = "settings"
)
class MainActivity : ComponentActivity() {
     lateinit
 var preferencesUtilisateur: PreferencesUtilisateur
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        preferencesUtilisateur = PreferencesUtilisateur(dataStore)
        ...
        setContent {
            ...
            MainScreen(
                 preferencesUtilisateur = preferencesUtilisateur,
                ...
            )
        }
    }
}
@Composable
fun MainScreen( preferencesUtilisateur: PreferencesUtilisateur , ...) {
    val scope = rememberCoroutineScope()
    val uneCle by preferencesUtilisateur.uneCleFlow.collectAsState(initial = "")
    ...

     Text(text = uneCle)
    Button(
        onClick = {
            scope.launch {
                preferencesUtilisateur.saveUneCle("Nouvelle valeur");
            }
        }
    ) {
        Text(text = "Test")
    }
}
Quelques explications :

Pour accéder aux préférences utilisateur stockées dans un conteneur que l'on a choisi de nommer settings, on ajoute une propriété d'extension (extension property) à la classe Context.
Le by preferencesDataStore fait beaucoup de travail. C'est lui qui crée le DataStore, gère le fichier, etc.
Puisque la lecture et l'écriture des préférences utilisateur sont asynchrones, il n'est pas possible d'appeler directement les méthodes codées dans la classe PreferencesUtilisateur.
Pour la lecture, on créera une variable d'état qui écoute en tout temps pour connaître la valeur de la préférence utilisateur. On utilisera collectAsState qui se charge de collecter un flux (Flow) et de le transformer en état (State).
Cette variable est ici simplement affichée dans un Text().
Dans cette application, j'ai choisi de modifier la valeur de la préférence utilisateur sur le clic d'un bouton.
Pour enregistrer la valeur, il faut utiliser scope.launch() afin de ne pas bloquer le fil d'exécution lors de l'appel asynchrone.
Supprimer une paire clé-valeur¶
Il est possible d'ajouter des méthodes dans la classe PreferencesUtilisateur pour effectuer différentes tâches, par exemple supprimer une paire clé-valeur.

Fichier data/PreferencesUtilisateur.kt (Kotlin)

class PreferencesUtilisateur(private val dataStore: DataStore<Preferences>) {
    ...
    suspend fun supprimerUneCle() {
        dataStore.edit { preferences ->
            preferences.remove(UNE_CLE)
        }
    }
}
Pour tout réinitialiser :

Fichier data/PreferencesUtilisateur.kt (Kotlin)

class PreferencesUtilisateur(private val dataStore: DataStore<Preferences>) {
    ...
    suspend fun supprimerTout() {
        dataStore.edit { preferences ->
           preferences.clear()
        }
    }
}
Consulter les données du Preferences DataStore¶
Il est possible de consulter le contenu du Preferences DataStore à l'aide d'Android Studio.

Lancez votre projet dans l'émulateur.
Dans Android Studio, faites afficher le Device Explorer : View / Tool Windows / Device Explorer .
Dans le Device Explorer, naviguez vers le dossier data/data .
Dans le dossier data/data, retrouvez le nom de domaine inversé de votre projet (ex : com.mondomaine.monprojet).
Dans le dossier files/datastore , le fichier settings.preferences_pb contient les paires clé-valeur enregistrées. Le fichier n'est pas un fichier texte mais on peut tout de même y voir certaines valeurs.
Illustration


Dans tous les cas, il est toujours possible de vérifier la si une clé existe et quelle est sa valeur à l'aide du **Logcat**, en autant qu'on ait une variable d'état qui écoute pour connaître la valeur
Jetpack Compose (Kotlin)

Log.d("MainActivity", uneCle ?: "Il n'y a aucune clé nommée uneCle")
Ajustements pour le Preview¶
Si vous désirez utiliser la fonctionnalité de prévisualisation dans votre IDE, vous devrez instancier un dataStore factice.

Ici, la propriété d'extension Context.dataStore créée plus haut n'est pas disponible puisque la prévisualisation n'utilise pas un contexte complet.

De plus, il n'est pas possible de créer une nouvelle propriété d'extension puisque nous sommes dans une fonction.

Nous allons donc créer un DataStore factice à la main.

*** NOTE : je n'ai pas pris le temps d'optimiser ce code puisqu'il n'est utilisé que pour la prévisualisation. ***

Fichier MainActivity.kt

@Preview(showBackground = true)
@Composable
fun MainsScreenPreview() {
    val context = LocalContext.current
    // source : https://developer.android.com/kotlin/multiplatform/datastore?hl=fr
    fun createDataStore(producePath: () -> String): DataStore<Preferences> =
        PreferenceDataStoreFactory.createWithPath(
            produceFile = { producePath().toPath() }
        )
    val dataStore: DataStore<Preferences> = createDataStore(
        producePath = {
context.filesDir.resolve("settings.preferences_pb").absolutePath }
    )
    val preferencesUtilisateur = PreferencesUtilisateur(dataStore)
    MonProjetTheme {
        MainScreen(
            preferencesUtilisateur = preferencesUtilisateur,
            ...
        )
    }
}
Pour plus d'information¶
« DataStore » - Android Developer

« Utiliser Preferences DataStore - 4. DataStore : principes de base » - Android Developers hl=fr#3

« Persistent Data Storage Using DataStore (Preferences) in Jetpack Compose » - Medium datastore-preferences-in-jetpack-compose-90c481bfed12

« Demystifying DataStore: A Comprehensive Guide to Using DataStore with Jetpack Compose » - Medium comprehensive-guide-to-using-datastore-with-jetpack-compose-d89c813232d7

« If use Jetpack compose don't use Shared Preference » - dev.to

« Preference DataStore (The Generic Way) » - Medium

* « Consuming flows safely in Jetpack Compose » - Manuel.vivo.dev¶
32.2 Travailler avec le Preferences DataStore dans une fonction non composable

La façon dont vous structurez votre application a un impact important sur la technique à utiliser pour travailler avec le Preferences DataStore.

Par exemple, si vous choisissez de placer tout le code d'un gestionnaire d'événement dans une fonction, les instructions qui requièrent d'être appelées dans une fonction modulable ne pourront pas être placées dans cette fonction.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen(..., preferencesUtilisateur : PreferencesUtilisateur) {
    Column(...) {
        ...
        Button(
            onClick = {
                traiter()
            }
        ) {
            Text(text = "Soumettre")
        }
    }
}
fun traiter() {
    val scope = rememberCoroutineScope()    // erreur : @Composable invocations can only happen from the context of a
@Composable function
    ...
}
Premier réflexe (mais pas le bon) : rendre la fonction composable. Mais ceci empêchera d'appeler scope.launch.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen(..., preferencesUtilisateur : PreferencesUtilisateur) {
    Column(...) {
        ...
        Button(
            onClick = {
                traiter(preferenceUtilisateur)
            }
        ) {
            Text(text = "Soumettre")
        }
    }
}
@Composable
fun traiter(preferencesUtilisateur : PreferencesUtilisateur) {
    val scope = rememberCoroutineScope()
    ...
    scope.launch {   // erreur : Calls to launch should happen inside a LaunchedEffect and not composition
        preferencesUtilisateur.saveUneCle("Nouvelle valeur");
    }
}
Il y aura donc un jeu de passage de paramètres à réaliser.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen(..., preferencesUtilisateur : PreferencesUtilisateur) {
    val scope = rememberCoroutineScope()
    ...
    Column(...) {
        ...
        Button(
            onClick = {
                traiter( preferencesUtilisateur, scope )
            }
        ) {
            Text(text = "Soumettre")
        }
    }
}
fun traiter(
    preferencesUtilisateur : PreferencesUtilisateur,
    scope: CoroutineScope
){   
    ...
     scope.launch {
        preferencesUtilisateur.saveUneCle("Nouvelle valeur");
    }
}
32.3 SharedPreferences¶
Selon la documentation officielle de Android Developers :

Si vous utilisez actuellement SharedPreferences pour stocker des données, nous vous recommandons d'effectuer une migration vers DataStore.¶
Source :

1. * « DataStore » - Android Developers¶
Pour plus d'information¶
* « Enregistrer des données simples avec SharedPreferences » - Android Developers¶
Publier une application

Système de fichiers de l'émulateur¶
54.1 Database Inspector pour voir la base de données dans l'émulateur¶
Dans Android Studio, l'outil Inspection de bases de données (Database Inspector) vous permet de voir le contenu de la base de données SQLite présente sur l'émulateur.

Pour voir votre base de données :

Lancez l'application dans l'émulateur. Le périphérique sélectionné doit tourner sur l'API 26 (Oreo) ou plus récent.¶
Si vous travaillez avec une application avec plusieurs écrans, assurez-vous que l'écran affiché dans l'émulateur utilise¶
la base de données.

Rendez-vous dans le menu View / Tool Windows / App Inspection / onglet Database Inspector .¶
!!! warning "Note : si vous voyez" Note : si vous voyez le message « No devices detected », rendez-vous dans le menu File / Invalidate Caches .

Au besoin, cliquez sur le nom de l'émulateur et sélectionnez votre application parmi les processus disponibles.¶
Cliquez sur le nom d'une table pour voir sa structure.¶
Illustration

Double-cliquez sur le nom d'une table pour voir ses données.¶
Illustration

Cliquez sur l'icône Open New Query Tab pour pouvoir entrer une requête SQL. Vous pouvez ensuite faire des requête¶
SELECT, INSERT, UPDATE ou DELETE afin d'affecter les données de la base de données.¶
Illustration

Illustration

Database closed¶
Si vous voyez la mention (closed) à côté de la base de données, c'est que l'application qui roule dans l'émulateur n'a pas encore fait appel à la base de données.

Effectuez une opération qui requiert une requête à la base de données, par exemple afficher la liste des enregistrements d'une table, puis vous aurez accès à la base de données dans l'outil Inspection de bases de données.

Illustration

[DETACHED]¶
Dans le cas où vous voyez [DETACHED] à côté du nom de votre application dans l'inspecteur d'applications, les requêtes SQL que vous tenterez d'exécuter dans l'inspecteur demeureront sans effet sur la base de données.

Un redémarrage de l'émulateur pourrait régler le problème :

Rendez-vous dans le menu View / Tool Windows / Device Manager .¶
Cliquez sur l'icône Stop vis-à-vis l'émulateur que vous utilisez.¶
Cliquez ensuite sur l'icône Start pour le redémarrer.¶
Si cette technique ne fonctionne pas, un redémarrage de Android Studio pourrait faire l'affaire.

Illustration

No debuggable processes detected¶
Dans le cas où l'inspecteur d'application ne vous donne pas du tout accès à votre projet (message No debuggable processes detected), un redémarrage de l'émulateur pourrait également régler le problème (procédure ci-haut).

Illustration

Pour plus d'information¶
« Déboguer votre base de données avec l'outil d'inspection de bases de données » - Android Developers hl=fr
* « Afficher le contenu de la base de données à l'aide de l'outil d'inspection » - Android Developers¶
compose-persisting-data-room?hl=fr#9 54.2 Voir les fichiers stockés sur un émulateur Android

Pour voir les fichiers stockés sur l'émulateur dans Android Studio :

Rendez-vous dans View / Tool Windows / Device Explorer .¶
Sélectionnez l'émulateur qui a été utilisé pour exécuter l'application.¶
Retrouvez votre application sous le dossier data/data .¶
Vous y retrouverez les fichiers utilisés par l'application, notamment la base de données.¶
Un clic droit vous permettra de télécharger le fichier de votre choix sur votre ordinateur, de le supprimer de¶
l'émulateur, etc.

Illustration

Pour plus d'information¶
* « Afficher les fichiers stockés sur l'appareil à l'aide de l'Explorateur de l'appareil » - Android Developers¶
explorer?hl=fr 55. Lister des données

Base de données locale avec Room¶
53.1 Installation de Room¶
Room est une bibliothèque de persistance de données pour Android Jetpack Compose. Elle fournit une couche d'abstraction entre votre application et une base de données SQLite.

Pour utiliser Room, vous devez d'abord ajouter des dépendances au projet.

Ajouts dans le fichier build.gradle.kts principal¶
La ligne à ajouter dépend de la version de Kotlin utilisée dans le projet.

Retrouver la version de Kotlin du projet¶
Si votre projet utilise des catalogues de versions (présence d'un fichier gradle/libs.versions.toml ), la version de Kotlin est disponible à cette ligne :

Fichier libs.versions.toml

[versions]
...
kotlin = " 2.0.21 "
Sinon, la version de Kotlin est disponible à cette ligne dans le build.gradle.kts principal :

Fichier build.gradle.kts principal

id ("org.jetbrains.kotlin.android") version " 2.0.21 " apply false
Retrouver la version de kps correspondante¶
Vous trouverez la liste des versions de kps (Kotlin Symbol Processing) sur le site https://github.com/google/ksp/releases .

Choisissez celle dont le numéro débute par votre numéro de version de Kotlin.¶
Par exemple, pour Kotlin 2.0.21, il faut utiliser KPS 2.0.21-1.0.28.

Ajout au fichier¶
Dans le fichier build.gradle.kts principal (aussi appelé top-level build.gradle file), soit celui présent directement à la racine du projet, ajoutez ceci en prenant soin d'utiliser la version de l'API KPS qui correspond à votre version de Kotlin.

Fichier build.gradle.kts principal

plugins {
    ...
    // pour Room
    id ("com.google.devtools.ksp") version "2.0.21-1.0.28" apply false // utiliser la version qui correspond à la version de
Kotlin : https://github.com/google/ksp/releases
}
Avant de poursuivre, il faut resynchroniser le projet.

Ajouts dans le fichier build.gradle.kts du module¶
Dans le fichier build.gradle.kts qui se trouve dans le dossier app , ajoutez ceci :

Fichier app/build.gradle.kts

plugins {
    ...
    // pour Room avec KSP -> requiert une entrée dans le build.gradle.kts principal
    id ("com.google.devtools.ksp")
}
...
dependencies {
    ...
     // pour Room
    val room_version = "2.8.0"
    implementation("androidx.room:room-runtime: $room_version ")
     implementation("androidx.room:room-ktx: $room_version ")
    annotationProcessor("androidx.room:room-compiler: $room_version ")
    ksp("androidx.room:room-compiler: $room_version ")
    // fin pour Room
}
Si le ksp() dans la dernière configuration apparaît en rouge, vérifiez si :

Vous avez ajouté l'instruction requise dans le bloc plugin (voir au début de l'extrait pour le fichier¶
app/build.gradle.kts).

Dans le fichier build.gradle.kts principal, vous avez utilisé la version qui correspond à votre version de Kotlin.¶
Vous avez lancé la synchronisation (même si vous l'avez fait, il faut parfois synchroniser le projet à nouveau).¶
Pour plus d'information¶
* « Enregistrer des données dans une base de données locale à l'aide de Room » - Android Developers¶
hl=fr 53.2 Modèle pour représenter les données (classe d'entité)

Il est possible de générer vos tables dans une BD SQLite sans même avoir à utiliser du code SQL ni même un outil de gestion de base de données.

Chaque table sera définie dans une classe Kotlin précédée de l'annotation @Entity. On dira de cette classe que c'est une entité de données ou encore un modèle de données, parfois également appelée classe d'entité.

Toutes les entités de données seront placées dans un dossier nommé data .

Ce dossier sera au même niveau que le fichier MainActiviy.kt , par exemple app/src/main/java/com/monnom/monprojet/data/Categorie.kt .

Pour créer ce dossier dans Android Studio : Clic droit sur son dossier parent / New / Package .

Par défaut, la table portera le même nom que la classe et chaque colonne de la table portera le même nom que le champ de la classe.

Puisque la classe d'entité sert à définir des données, on lui ajoutera le mot-clé data.

Les normes dictent que le nom de la classe doit être au singulier et utilise la casse Pascal.

Mais attention : le nom de la table doit être au pluriel et entièrement en lettres minuscules.

Fichier data/Categorie.kt

@Entity(tableName = " categories ")
data class Categorie (
    @PrimaryKey(autoGenerate = true)
    val id : Int = 0,
    val titre: String = "",
    val description: String = "",
)
Table avec clé étrangère¶
Pour une table qui comprend une clé étrangère :

Fichier data/Item.kt

@Entity(
    tableName = "items",
    foreignKeys = [ForeignKey(
        entity = Categorie ::class,
        parentColumns = arrayOf(" id "),
        childColumns = arrayOf(" categorie_id "),
        onDelete = ForeignKey.CASCADE
    )]
)
data class Item(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val code: String = "",
    val titre: String = "",
    val description: String = "",
    val prix: Double = 0.0,
    val categorie_id : Int,
)
Pour plus d'information¶
« Définir des données à l'aide d'entités Room » - Android Developers
* « Entity » - Android Developers¶
53.3 Le DAO : couche intermédiaire entre l'application et la BD

Plusieurs cadres d'application offrent une couche d'abstraction entre l'application et la base de données, généralement sous forme de classes qui représentent les tables de la BD. Cette couche d'abstraction est connue sous l'acronyme ORM (Object Relational Mapper).

Avec Jetpack Compose et Room, la couche d'abstraction utilise une interface DAO (Data Access Object ou objet d'accès aux données).

Grâce à la classe d'entité, Room est capable de générer lui-même les requêtes INSERT, UPDATE et DELETE pour gérer les données. Il suffit d'utiliser l'annotation appropriée (@Insert, @Update ou @Delete) et de passer une instance du modèle en paramètre à la fonction.

Ces fonctions doivent être exécutées sur leur propre fil d'exécution (thread) pour ne pas bloquer l'application. C'est pourquoi les fonctions doivent utiliser le mot-clé suspend.

Vous aurez besoin de requêtes SQL lorsque Room ne peut pas deviner vos besoins précis, par exemple pour les requêtes SELECT. À ce moment, la fonction utilisera l'annotation @Query. La fonction retournera l'information sous le type Flow ., soit un flux de données asynchrone observable.

Le nom de l'interface du DAO – et du fichier – se terminera par Dao. Lorsque le DAO interagit avec une seule table, le nom sera sous la forme EntiteDao, par exemple CategorieDao.

Tous les DAO seront placés dans un dossier nommé data .

Fichier data/CategorieDao.kt

@Dao
interface CategorieDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insererCategorie(categorie: Categorie)
    @Update
    suspend fun mettreAJourCategorie(categorie: Categorie)
    @Delete
    suspend fun supprimerCategorie(categorie: Categorie)
    @Query("SELECT * FROM categories ...")
    fun listerCategories(): Flow<List<Categorie>>
    ...
}
Ordre des enregistrements¶
Lorsqu'une requête peut retourner plus d'un enregistrement, il est important de spécifier dans quel ordre les enregistrements doivent être placés.

Rappel : il n'est pas acceptable de faire ORDER BY id puisque l'identifiant est une information interne que l'on ne devrait pas présenter à l'usager.

Pour plus d'information¶
« Accéder aux données à l'aide des DAO Room » - Android Developers

« Écrire des requêtes DAO asynchrones » - Android Developers

« Créer le DAO » - Android Developers

53.4 Le dépôt de données (repository)¶
Une autre étape est nécessaire pour gérer les données locales à partir de l'application Android : définir le dépôt de données (en anglais : repository).

Dans une application qui utilise un DAO, l'application passera toujours par le dépôt de données pour accéder aux données. Le dépôt de données est une sorte d'isolant entre la source de données et le reste de l'application. Il est le seul à savoir d'où proviennent les données qu'il fournit à l'application, par exemple si elles proviennent directement de la base de données ou de la mémoire cache.

C'est le dépôt qui fera appel aux méthodes définies dans l'interface du DAO.

Fichier data/CategorieRepository.kt

class CategorieRepository(
    private val _categorieDao: CategorieDao
) {
    suspend fun insererCategorie(categorie: Categorie) = _categorieDao.insererCategorie(categorie)
    suspend fun mettreAJourCategorie(categorie: Categorie) = _categorieDao.mettreAJourCategorie(categorie)
    suspend fun supprimerCategorie(categorie: Categorie) = _categorieDao.supprimerCategorie(categorie)
    fun listerCategories(): Flow<List<Categorie>> = _categorieDao.listerCategories()
    ...
}
Pour plus d'information¶
* « Implémenter le dépôt » - Android Developers¶
53.5 La classe qui hérite de RoomDatabase

Tous les DAO seront réunis dans une classe qui représente la base de données en tant que telle.

Le code utilise le patron de conception du singleton, c'est-à-dire qu'il y aura un et un seul objet instancié.

La base de données peut porter n'importe quel nom. Une bonne pratique consiste à lui donner le même nom que l'application.

La classe qui définit la base de données de même que le fichier dans lequel elle est codée porteront un nom qui débute par le nom de la base de données et qui se termine par Database. Ex : MonprojetDatabase.

Le fichier sera placé dans le dossier data .

Fichier data/MonprojetDatabase.kt

@Database(
    entities = [
        Categorie::class,
        Item::class,
    ],
    version = 1,
    exportSchema = false   // Room ne générera pas de fichier json de cette version de la BD
)
abstract class MonprojetDatabase : RoomDatabase() {
    abstract fun categorieDao(): CategorieDao
    abstract fun itemDao(): ItemDao
    companion object {
        @Volatile
        private var Instance: MonprojetDatabase? = null
        // obtient une instance de la BD ou la crée si elle n'existait pas
        fun getDatabase(context: Context): MonprojetDatabase {
            return Instance ?: synchronized(this) {
                Room.databaseBuilder(context, MonprojetDatabase::class.java, "monprojet_database")
                    .build()
                    .also { Instance = it }
            }
        }
    }
}
Pour plus d'information¶
« Créer une instance de base de données » - Android Developers hl=fr#6

« Create ROOM Schema Export Directory » - Medium

53.6 Utiliser le dépôt de données via le ViewModel¶
C'est le ViewModel qui créera la base de données si elle n'existe pas puis qui interagira avec le dépôt de données.

Ce fichier sera placé dans le dossier ui .

Ici, le fait de déclarer le uiState avec MutableStateFlow assure que les informations seront automatiquement mises à jour lorsqu'il y a des changements dans les données de la BD.

Remarquez que viewModelScope.launch(Dispatchers.IO) retournera une tâche (objet de type Job ), c'est-à-dire une référence (handle) vers une coroutine.

Fichier ui/CategorieViewModel.kt

class CategorieViewModel(application: Application) : AndroidViewModel(application) {
    private val _repository: CategorieRepository
    private val _uiState = MutableStateFlow(CategorieUiState())
    val uiState: StateFlow<CategorieUiState> = _uiState.asStateFlow()

    init {
        val context = application.applicationContext   // on utilise le contexte de l'application et non le contexte d'un
composable (LocalContext.current dans un Composable) sinon, le ViewModel serait recréé à chaque rotation du téléphone.
        // instancie la base de données et la crée physiquement au besoin
        val db = MonprojetDatabase.getDatabase(context)
        val dao = db.categorieDao()
        _repository = CategorieRepository(dao)

        observerCategories()
    }
    fun observerCategories() {
        viewModelScope.launch {
            // .collect permet de récupérer la valeur du flux observable
            _repository.listerCategories()
                .collect { categories ->
                    _uiState.update {
                        it.copy (
                            _listeCategories = categories
                        )
                    }
                }
        }
    }
    fun insererCategorie(categorie: Categorie) = viewModelScope.launch(Dispatchers.IO){
        _repository.insererCategorie(categorie)
    }
    fun mettreAJourCategorie(categorie: Categorie) = viewModelScope.launch(Dispatchers.IO){
        _repository.mettreAJourCategorie(categorie)
    }
    fun supprimerCategorie(categorie: Categorie) = viewModelScope.launch(Dispatchers.IO){
        _repository.supprimerCategorie(categorie)
    }
    ...
}
data class CategorieUiState(
    private var _listeCategories:List<Categorie> = emptyList(),   // Sera initialisé dans le init() du ViewModel puis ajusté
automatiquement si la BD change.
    ...
) {
    val listeCategories: List<Categorie>
        get() {
            return _listeCategories
        }
    ...
}
!!! warning "Note : il est généra" Note : il est généralement préférable de créer un ViewModel qui hérite de ViewModel plutôt que de AndroidViewModel. Ceci facilite notamment les tests unitaires. Cependant, AndroidViewModel donne accès au contexte de l'application, ce qui permet d'accéder à la base de données sans devoir créer un ViewModeFactory.

Comme toujours, chaque ViewModel ne doit exister qu'en un seul exemplaire.

Une variable viewModel sera instanciée dans le plus proche parent des composables qui en ont besoin et elle sera passée en paramètre à ses descendants.

Dans cet exemple, elle est instanciée directement dans l'écran principal.

!!! warning "Attention : il faut " Attention : il faut ajouter une dépendance pour que ce code fonctionne puisque le ViewModel est instancié dans un composable.

Fichier MainsActivity.kt

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen() {
    val categorieViewModel: CategorieViewModel = viewModel()    // la fonction viewModel() se chargera d'injecter
l'application dans le constructeur de CategorieViewModel.
    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Text(text = "Test Room")
                },
            )
        }
    ) {
         MainContent(it, categorieViewModel)
    }
}
Notez qu'une approche différente pourra être utilisée pour les applications avec plusieurs écrans.

Les composables qui ont accès au ViewModel peuvent désormais interagir avec la base de données.

Fichier MainsActivity.kt

@Composable
fun MainContent(paddingValues: PaddingValues, categorieViewModel: CategorieViewModel) {
    val categorieUiState by categorieViewModel.uiState.collectAsState()
    // ici, on a accès aux données en provenance de la base de données
    val nombreCategories = categorieUiState.listeCategories.size
    ...
}
Pour plus d'information¶
* « viewModelScope.launch(Dispatchers.IO) purpose » - Stack Overflow¶
purpose 54. Le système de fichiers de l'émulateur

Room avancé et requêtes réactives¶
58.1 Ajouter des données initiales¶
Il est rare qu'une application soit installée avec une base de données vide. Généralement, il y aura des données initiales, par exemple des pays, des devises, des couleurs, des catégories.

Pour insérer des données initiales dans une application qui utilise Room, ajoutez ceci dans la classe qui hérite de RoomDatabase :

Fichier data/MonprojetDatabase.kt

fun getDatabase(context: Context): MonprojetDatabase {
    return Instance ?: synchronized(this) {
        Room.databaseBuilder(context, MonprojetDatabase::class.java, "monprojet_database")
            .addCallback( DatabaseCallback() )
            .build()
            .also { Instance = it }
    }
}
Au bas de cette classe, définissez la classe DatabaseCallback, qui contiendra les requêtes INSERT désirées.

Notez que si une donnée doit contenir un apostrophe, il faudra doubler l'apostrophe dans la requête.

Cette fonction sera exécutée lors de la création de la base de données (voir conditions au bas de l'extrait de code).

Fichier data/MonprojetDatabase.kt

abstract class MonprojetDatabase : RoomDatabase() {
    ...
}
class DatabaseCallback : RoomDatabase.Callback() {
    override fun onCreate(db: SupportSQLiteDatabase) = db.run {
        beginTransaction()
        try {
            execSQL("INSERT INTO categories(titre, description) VALUES('catégorie 1', 'la catégorie no 1')")
            ...
            setTransactionSuccessful()
        } finally {
            endTransaction()
        }
    }
}
!!! warning "Attention : la métho" Attention : la méthode onCreate() n'est exécutée que lors de la CRÉATION DE LA BASE DE DONNÉES (et non des tables), c'est-à-dire :

la première fois que l'application est lancée sur un périphérique¶
OU

en forçant la recréation de la base de données à l'aide d'une de ces méthodes :¶
en effectuant une suppression manuelle de la BD dans le système de fichiers de l'émulateur¶
en désinstallant l'application et en la réinstallant (sur l'émulateur : cercle (Home) / faire glisser l'écran vers¶
le haut / Settings / Apps )

en supprimant toutes les données de l'émulateur ( Device Manager / points verticaux / Wipe Data )¶
en lançant l'application dans un nouvel émulateur¶
En preuve de ce que j'avance, la documentation de la classe Callback spécifie :

onCreate: Called when the database is created for the first time. This is called after all the tables are created.¶
Illustration

58.2 Modifier la structure de la base de données en phase de développement¶
Pendant le développement d'une application, il arrive que la structure de la base de données soit changée. Il peut s'agir de l'ajout d'une table, de l'ajout d'un champ ou même de la modification d'un champ existant.

Si vous ne prenez pas les précautions nécessaires, vous obtiendrez ce message quand vous lancez l'application avec la nouvelle structure de BD alors que la BD a déjà été créée avec l'ancienne structure « Looks like you've changed schema but forgot to update the version number. You can simply fix this by increasing the version number. Expected identity hash: fc52a3aea54e62ca9d025b65d3f27132, found: c9a7d3438fa6436ca51c76b3571e7cd7 ».

Ajustement des classes d'entité¶
Dans une application Jetpack Compose avec Room, les modifications à la structure de la base de données seront réalisées dans les classes d'entité.

Ces classes doivent refléter la base de données avec la nouvelle structure.

Il est ensuite possible de spécifier si on désire que la base de données soit recrée à partir de zéro ou si on désire effectuer une migration afin de conserver les données existantes.

Recréation complète de la base de données¶
Pendant la phase de développement, il y a une technique simple pour que l'application prenne en compte la nouvelle structure de la base de données. il suffit de supprimer manuellement la base de données dans le Device Explorer.

Avant Room 2.7, sorti en 2025, il était possible d'utiliser l'instruction .fallbackToDestructiveMigration() . Cette instruction est désormais obsolète.

Fichier data/MonprojetDatabase.kt

fun getDatabase(context: Context): MonprojetDatabase {
    return Instance ?: synchronized(this) {
        Room.databaseBuilder(context, MonprojetDatabase::class.java, "monprojet_database")
        .fallbackToDestructiveMigration()
        .build()
        .also { Instance = it }
    }
}
Migration vers la nouvelle structure¶
Une fois l'application en production, la suppression de la base de données n'est plus une option,. Il faut donc effectuer une migration en bonne et due forme des données.

La procédure de migration est présentée sur la fiche « gerer_les_versions_de_la_base_de_donnees ».¶
58.3 Gérer les versions de la base de données

Illustration

Il est très rare que pendant la vie utile d'une application, sa base de données ne subisse aucun changement.

Une fois que l'application a été déployée, il n'est pas possible de simplement supprimer l'ancienne base de données pour que l'application tienne compte de la nouvelle structure puisque la base de données est présente physiquement sur chaque téléphone qui utilise l'application.

Il faut donc procéder à une migration de la base de données.

Avant de modifier une classe d'entité¶
Les étapes suivantes doivent être réalisées avant de modifier une classe d'entité.

Demander la génération du fichier json¶
Si, dans votre fichier MonprojetDatabase.kt , vous avez demandé à ne pas générer le fichier json de la BD, vous devez corriger la situation.

Room aura besoin de ce fichier pour effectuer une migration automatique.

Fichier data/MonprojetDatabase.kt

@Database(
    entities = [
        Categorie::class,
        Item::class,
    ],
    version = 1,
    exportSchema = true
)
Ajouter une dépendance pour la sérialisation¶
Pour que Room sache comment travailler avec les fichiers JSON, vous devez ajouter une dépendance pour la sérialistion JSON.

Notez qu'au moment d'écrire ces lignes, la version 1.7.3 de cette dépendance est compatible avec Room 2.6.1. Si vous utilisez une version de Room plus récente, vous devrez modifier la version de Room.

Fichier app/build.gradle.kts

...
dependencies {
    ...
     val room_version = " 2.6.1 "
    ...
    // pour la sérialisation JSON (nécessaire pour migrations)
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.3")
}
N'oubliez pas de resynchroniser le projet.

Définir comment migrer la base de données¶
Pour que l'application puisse travailler avec une nouvelle structure de données, il faut indiquer à Room comment modifier la base de données pour qu'elle corresponde à la nouvelle version.

Pour plusieurs modifications à la base de données, par exemple l'ajout d'une colonne, Room est capable de déterminer lui-même comment ajuster la BD selon les informations présentes dans les fichiers JSON.

Il faut indiquer à Room à quel endroit il pourra trouver les schémas des différentes versions de votre base de données.

Nous verrons sous peu comment générer ces schémas. Mais d'abord, il faut ajouter une configuration pour indiquer l'emplacement de ces schémas.

Une bonne pratique consiste à les placer dans le dossier app/schemas . Vous devrez créer le dossier schemas manuellement.

Cette configuration sera effectuée dans le fichier build.gradle.kts qui se trouve dans le dossier app .

Fichier app/build.gradle.kts

...
dependencies {
    ...
}
// pour migrations
ksp {
    arg("room.schemaLocation", "$projectDir/schemas")
}
Génération du schéma¶
La génération du schéma sera réalisée au prochain lancement de l'application. Vous verrez la présence d'un fichier nommé 1.json dans le dossier app/schemas de votre projet.

Nouvelle structure de la base de données¶
Quand vous avez en main le fichier JSON de l'ancienne version de la BD, vous pouvez modifier les classes d'entité pour répondre à vos besoins.

Modification des classes d'entité¶
Notez que lors de l'ajout d'un champ, il faut donner une valeur par défaut à l'aide d'une instruction @ColumnInfo .

Il faut savoir que la valeur données par défaut lors de la déclaration de la colonne est utilisée par le constructeur de Kotlin alors que @ColumnInfo est utilisé par SQLite dans l'instruction CREATE TABLE ou ALTER TABLE.

Fichier data/Categorie.kt

@Entity(tableName = "categories")
data class Categorie(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val titre: String = "",
    val description: String = "",
    @ColumnInfo(defaultValue = "1")
    val actif: Boolean = true,
)
Demander la migration automatisée¶
Il est maintenant temps de changer le numéro de version puis de demander la migration automatisée.

Fichier data/MonprojetDatabase.kt

@Database(
    entities = [
        Categorie::class,
        Item::class,
    ],
    version = 2 ,
    exportSchema = true,
     autoMigrations = [
        AutoMigration (from = 1, to = 2)
    ]
)
Lors du prochain lancement de l'application :

Room générera le schéma JSON de la dernière version de la base de données.¶
Les modifications seront apportées à la base de données pour répondre aux changements.¶
!!! warning "Attention : si vous " Attention : si vous obtenez un message du genre « AutoMigration Failure: Please declare an interface extending 'AutoMigrationSpec' », c'est parce que les modifications aux classes d'entité ne permettent pas à Room d'effectuer une migration automatique.

Ce sera le cas, par exemple, si vous renommez ou supprimez une colonne ou une table.

Vous devrez à ce moment définir des spécifications de migration automatiques .

Pour plus d'information¶
* « Migrer votre base de données Room » - Android Developer¶
Internationalisation

Formulaires de données (Ajout, Modification, Suppression)¶
66.1 TextField() et OutlinedTextField()¶
Une case de saisie peut être ajoutée à l'aide du composble TextField() ou de OutlinedTextField() .

Pour que le texte entré dans une boîte de saisie soit affiché dans la boîte, il faut que sa valeur provienne d'une variable d'état.

Dans cette fiche :

TextField¶
OutlinedTextField¶
supportingText¶
Type de clavier¶
TextField ou OulinedTextField avec ViewModel¶
TextField¶
Le TextField, dans sa plus simple expression, va comme suit :

Jetpack Compose (Kotlin)

var titre by rememberSaveable { mutableStateOf("") }   // la variable d'état pourrait aussi faire partie du ViewModel

TextField(
    value = titre ,
    onValueChange = { titre = it },
    label = { Text("Titre") }
)
Remarquez l'utilisation de rememberSaveable. Si vous débutez avec Jetpack Compose, vous aurez sans doute appris à déclarer les variables d'état avec remember. Dès que vous avancerez dans vos apprentissages, vous comprendrez pourquoi il est préférable d'utiliser rememberSaveable pour la valeur d'une case de saisie.

Voici le TextField vide puis avec focus ou rempli.

Illustration

Illustration

OutlinedTextField¶
Voici le même exemple mais avec un OutlinedTextField.

Jetpack Compose (Kotlin)

var titre by rememberSaveable { mutableStateOf("") }

OutlinedTextField(
    value = titre,
    onValueChange = { titre = it },
    label = { Text("Titre") }
)
La différence entre TextField et OutlinedTextField est au niveau de l'apparence.

Voici le OutlinedTextField vide puis avec focus ou rempli.

Illustration

Illustration

supportingText¶
Depuis Jetpack Compose 1.3, il est possible d'ajouter un texte d'accompagnement sous la boîte de saisie.

Dans la forme la plus simple, un texte statique sera affiché. Mais puisque le code est entre accolades, ceci ouvre la porte à une panoplie de possibilités afin d'afficher un texte contextualisé.

Jetpack Compose (Kotlin)

var titre by rememberSaveable { mutableStateOf("") }

OutlinedTextField(
    value = titre,
    onValueChange = { titre = it },
    label = { Text("Titre") },
    supportingText = { Text("Max. 10 caractères") }
)
Illustration

Type de clavier¶
Afin d'améliorer l'expérience utilisateur, il est important de spécifier le type de clavier virtuel selon le rôle de la case de saisie.

Les principaux types de clavier sont :

Text (par défaut)¶
Number¶
Decimal (dans derniers tests effectués, était identique à Number)¶
Email (semblable à Text mais la virgule est remplacée par un @)¶
Password (lettres et chiffres dans un même écran)¶
Phone (chiffres avec lettres imprimées sur les touches correspondantes - ex : 2 ABC)¶
Uri (semblable à Text mais la virgule est remplacée par un /)¶
Illustration

Illustration

Illustration

Illustration

Illustration

KeyboardType.Text KeyboardType.Number KeyboardType.Email KeyboardType.Password KeyboardType.Phone

Pour spécifier le type clavier désiré :

Jetpack Compose (Kotlin)

TextField(
    ...,
    keyboardOptions = KeyboardOptions
(keyboardType
 = KeyboardType.Number)
)
TextField ou OulinedTextField avec ViewModel¶
Dans une application qui utilise un ViewModel comme conteneur d'état, la syntaxe d'une case de saisie sera légèrement différente.

Notez que j'ai utilisé ici un ViewModel de type HomeViewModel mais la classe du ViewModel pourrait porter un autre nom dans votre application.

Fonction composable (Kotlin)

@Composable
fun monComposable() {
    val viewModel: HomeViewModel = viewModel()
    val uiState by viewModel.uiState.collectAsState()
    ...
    TextField(
        value = uiState.nom ,
        onValueChange = {
             viewModel.ajusterNom(it)
        },
        ...
    )
    ...
}
Et dans le ViewModel (dans cet exemple, le uiState est un flux observable, d'où la nécessité d'utiliser _uiState.update) :

ViewModel (Kotlin)

class HomeViewModel: ViewModel() {
    ...
    fun ajusterNom(valeur: String) {
        _uiState.update {
            it.copy (
                _nom = valeur
            )
        }
    }
}
Pour plus d'information¶
« Handle user input » - Android Developers

« Jetpack Compose Basics - How to use text field composables to meet the Material design specification » - Good Request

« Textfields » - Material Design 3

« androidx.compose.material3 - TextField » - Android Developers summary#textfield

* « androidx.compose.material3 - OutlinedTextField » - Android Developers¶
summary 66.2 Validation

C'est dans un ViewModel que la logique de validation sera codée.

Les bonnes pratiques de programmations demandent d'utiliser un ViewModel propre à la page du formulaire.

Ceci permet de mieux séparer les responsabilités (Single Responsibility Principle) :

Un ViewModel gère la liste et les opérations CRUD avec la base de données.¶
L'autre gère l'état du formulaire et sa validation (il n'accèdera pas à la base de données donc pas de référence au¶
Repository)

Je vous suggère d'ajouter la validation à la méthode qui met à jour la valeur saisie. En effet, si vous travaillez avec deux méthodes séparées, vous n'aurez pas de garantie que le _uiState.update qui met à jour la valeur saisie soit terminé avant qu'une autre méthode, telle la validation, tente d'utiliser cette valeur.

Voici un exemple simple :

ViewModel

class FormulaireCategorieViewModel : ViewModel() {
    ...
    fun ajusterEtValiderTitre(titre: String) {
        var messageErreur= ""
        if (titre.length > 100) {
            messageErreur = "Le titre doit comporter 100 caractères ou moins."
        }
        _uiState.update {
            it.copy (
                _titre = titre,
                _messageErreurTitre = messageErreur
            )
        }
    }
}
Jetpack Compose (Kotin)

OutlinedTextField(
    value = ...,
    onValueChange = {
        formulaireCategorieViewModel.ajusterEtValiderTitre(it)
    },
    label = { Text("Titre") },
    ...,   // autres configurations, par exemple choix du clavier
    isError = formulaireCategorieUiState.messageErreurTitre != "",
)
Pour afficher le message, vous pouvez utiliser l'attribut supportingText si votre projet est bâti sous Compose 1.3 ou plus récent.

Sinon, un simple Text() fera l'affaire.

Jetpack Compose (Kotin)

OutlinedTextField(
    value = ...,
    onValueChange = {
       formulaireCategorieViewModel.validerEtAjusterTitre(it)
    },
    label = { Text("Titre") },
    ...,   // autres configurations, par exemple choix du clavier
    isError = formulaireCategorieUiState.messageErreurTitre != "",
    supportingText = {
        if (formulaireCategorieUiState.messageErreurTitre != "") {
            Text(formulaireCategorieUiState.messageErreurTitre)
        }
    }
)
!!! warning "Attention : ceci fai" Attention : ceci fait en sorte que la validation n'aura lieu que lorsque le texte est modifié.

À vous de vous assurer que la validation ait lieu même si rien n'est entré dans la case de saisie alors que cette information est obligatoire.

Internationaliser les messages d'erreur¶
Je vous propose une technique pour internationaliser les message d'erreur de validation dans le ViewModel.

On sait que pour retrouver une chaîne internationalisée, il est possible d'utiliser stringResource.

Composable (Kotlin)

val message = stringResource(R.string.le_titre_est_requis)
Ceci ne fonctionne cependant que dans un composable, ce qui n'est pas le cas des méthodes du ViewModel.

On peut alors utiliser un contexte avec getString().

Dans le cas où le ViewModel hérite de AndroidViewModel et reçoit une référence à l'application en paramètre, on pourra faire ceci :

ViewModel (Kotlin)

val message = application.applicationContext.getString(R.string.le_titre_est_requis)
Mais, lorsque possible, il est préférable de créer un ViewModel qui hérite de ViewModel plutôt que de AndroidViewModel afin de faciliter les tests unitaires. Le contexte de l'application n'est alors plus disponible.

Pour internationaliser les messages d'erreur, une solution intéressante consiste à initialiser dans le ViewModel seulement l'identifiant de la chaîne.

On changera le UIState comme suit.

L'annotation @StringRes agit comme un garde-fou pour assurer qu'on n'entre pas une valeur qui ne correspond pas à une chaîne internationalisée.

UIState (Kotlin)

@StringRes private var _erreurTitreId: Int? = null,
Et on initialisera cette variable dans le ViewModel :

ViewModel (Kotlin)

var messageErreurId: Int? = null
if (titre.isBlank()) {
    messageErreurId = R.string.le_titre_est_requis
}
...
_uiState.update {
    it.copy (
        ...,
        _erreurTitreId = messageErreurId
    )
}
C'est le composable qui se chargera de charger la chaîne à l'aide du contexte.

Composable (Kotlin)

Text(stringResource(formulaireCategorieUiState.erreurTitreId!!))
66.3 Enregistrement¶
Dans un formulaire pour ajouter ou éditer des données, un bouton permettra de traiter les données saisies.

Dans cet exemple, les données sont insérées dans la base de données à l'aide d'une méthode du ViewModel.

Jetpack Compose (Kotlin)

@Composable
fun FormulaireCategorie(viewModel: CategorieViewModel) {
    val coroutineScope = rememberCoroutineScope()
    ...
    Button(
        onClick = {
            enregistrer(...)
        },
    ) {
        Text(text = "Enregistrer")
    }
    ...
}
fun enregistrer(...) {
    coroutineScope.launch {
        viewModel.insererCategorie(...)
    }
    ...
}
Une fois l'enregistrement terminé, il est intéressant de retourner à la page qui liste les données.

Jetpack Compose (Kotlin)

coroutineScope.launch {
    categorieViewModel.insererCategorie(...)
        .join()
 // attend la fin de l'insertion
       ...    // on pourrait par exemple réinitialiser les données du formulaire
        navController.navigate("...")
}
67. Effets secondaires (side effects)¶
68.1 Retrouver les données de l'enregistrement à modifier¶
Avant 2025, la documentation officielle d'Android énonçait clairement qu'il faut passer un id en paramètre à une route plutôt qu'un objet.

Le texte a depuis été mis à jour mais cette affirmation demeure pertinente :

La transmission de structures de données complexes sur des arguments est considérée comme un anti-modèle. Chaque destination doit être responsable de charger les données de l'interface¶
utilisateur en fonction des informations minimales nécessaires, telles que les ID des éléments. Cela simplifie la recréation des processus et évite d'éventuelles incohérences dans les données.

En effet, si on voulait passer un objet complet :

On serait confrontés à une limite de taille puisque l'objet sera **passé en paramètre¶
à la route**.

Les données pourraient être obsolètes si modifiées ailleurs.¶
Pour ces raisons, on ne passera pas une instance du modèle en paramètre à la route. On travaillera plutôt avec un identifiant.

Les données seront retrouvées dans la base de données à l'aide du ViewModel.

Vous devrez :

Dans le DAO :¶
ajouter une annotation @Query pour spécifier la requête à effectuer pour retrouver les données à partir d'un identifiant. La requête travaillera avec un paramètre id, identifié par :id. L'annotation @Query sera suivie par une fonction qui retourne un Flow.

Remarquez que cette fonction n'a pas besoin d'être suspendue car le mécanisme de flux gère l'exécution asynchrone.

Dans le dépôt de données : définir une fonction qui¶
fait appel à la fonction du Dao pour retrouver les données.

Dans le ViewModel :¶
définir une fonction qui fait appel au dépôt de données.

Remarquez que cette fonction utilise firstOrNull() pour retrouver le premier élément émis par le flux puis arrêter le flux. Si elle utilisait collect(), la fonction demeurerait suspendue tant que le flux n'aurait pas terminé d'émettre des éléments. À moins d'être initialisées dans un LaunchedEffect, les informations recherchées pourraient donc ne pas encore être disponibles au moment où elles doivent être utilisées.

Cette fois, la fonction doit être suspendue car elle utilise la fonction suspendue firstOrNull().

Fichier ui/CategorieViewModel.kt

suspend fun retrouverCategorie(id: Int) : Categorie? {
    return _repository.retrouverCategorie(id).firstOrNull()
}
La fonction modulable qui affiche le formulaire recevra l'identifiant en paramètre et retrouvera les données dans la¶
base de données comme suit :

Fichier ui/FormulaireCategorie.kt

@Composable
fun FormulaireCategorie( categorieId: Int , ...) {
    // initialiser les variables d'état du ViewModel dès que categorieId change
    **LaunchedEffect**(categorieId) {
        val categorie = categorieViewModel.retrouverCategorie(categorieId)
        ...
    } 
    ...
}
69. Amélioration du ViewModel¶

Données distantes et consommation d'API REST¶
72.1 Application qui se sert d'informations distantes¶
Dans un monde idéal, une application mobile travaillera avec des données locales afin de pouvoir fonctionner même si elle n'a pas accès à Internet.

De plus, elle synchronisera ces données avec une base de données distante dès qu'elle aura accès à Internet afin d'assurer de ne rien perdre en cas de bris.

Vous pouvez cependant développer une application qui n'utilise qu'une base de données distante si votre application répond à l'une de ces conditions :

l'application que vous désirez développer n'a pas besoin d'être fonctionnelle en tout temps (donc c'est OK qu'elle ne¶
fonctionne pas lorsqu'on est dans le fond du bois ou lorsqu'il y a une panne Internet mondiale)

ou

vous savez que vos utilisateurs s'en serviront seulement lorsqu'ils ont accès à Internet¶
ou

les données distantes ne sont pas centrales dans l'application. L'application pourra donc fonctionner partiellement¶
sans ces données.

Vous désirez coder une telle application? Suivez ces étapes!

Dans cette fiche :

Ajout de dépendances¶
Permission d'accéder au réseau¶
Classe pour représenter les données reçues de l'API¶
Interface pour accéder à l'API¶
Instance Retrofit¶
Effectuer un appel à l'API¶
Utiliser les données de l'API dans un composable¶
Cas des API qui peuvent retourner différents types de données selon la réussite ou l'erreur¶
Erreur « Unable to resolve host "....com": No address associated with hostname »¶
Ajout de dépendances¶
Pour permettre l'utilisation d'un API qui permettra d'accéder aux données distantes, il faut ajouter des dépendances à votre projet.

Ces lignes doivent être ajoutées dans le fichier build.gradle.kts qui se trouve dans le dossier app .

Fichier app/build.gradle.kts

...
dependencies {
    ...
  // Pour appel API
  implementation("com.squareup.retrofit2:retrofit:3.0.0")
  implementation("com.squareup.retrofit2:converter-gson:3.0.0")
}
Une fois les dépendances ajoutées, il faut resynchroniser le projet pour qu'il tienne compte de l'ajout.

!!! warning "Note : si vous obten" Note : si vous obtenez un message du genre « Unresolved reference retrofit2 », rendez-vous dans le menu File / Invalidate Caches .

Permission d'accéder au réseau¶
Pour qu'une application Android puisse utiliser une ressource en ligne, il faut ajouter une balise uses-permission dans le fichier AndroidManifest.xml que l'on retrouve dans le dossier app/src/main .

Sans cette permission, le programme plantera avec le message « Permission denied (missing INTERNET permission?) ».

Remarquez que l'usager n'aura pas à donner son accord avant d'accéder à Internet. La permission est une simple déclaration dans le manifeste.

Fichier AndroidManifest.xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools">
     <uses-permission android:name="android.permission.INTERNET" />
    <application
        ...
    </application>
</manifest>
De plus, si vous travaillez avec un URL non sécurisé (http://) pendant le développement, vous devrez le préciser comme suit.

Important : il faut remettre cette configuration à false lorsque l'application sera en production.¶
Fichier AndroidManifest.xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools">
    ...
    <application
         android:usesCleartextTraffic="true"
        ...
    </application>
</manifest>
Classe pour représenter les données reçues de l'API¶
Lorsque l'application fera un appel à l'API, elle stockera les données reçues dans une instance d'une classe spécialisée.

Cette classe, qui est une classe de données, sera placée dans un dossier nommé data qui est au même niveau que le fichier MainActiviy.kt , par exemple app/src/main/java/com/monnom/monprojet/data/Item.kt .

Pour créer ce dossier dans Android Studio : Clic droit sur son dossier parent / New / Package .

La classe doit avoir une propriété pour chacune des informations reçues. Le nom d'une propriété doit correspondre à une clé JSON reçue.

Par exemple, si l'API retourne un item dont les données sont au format : {" id ": 3, " titre ": "abc"}, vous devez déclarer une classe avec les propriétés suivantes :

Fichier data/Item.kt

data class Item(
  var id : Int?,   // optionnel car on ne le spécifiera pas lors de l'ajout d'un item
  var titre : String,
)
La conversion des données JSON retournées par l'API en objets Kotlin utilisés par l'application sera automatisée grâce à l'instruction addConverterFactory(GsonConverterFactory.create()) dans l'instance Retrofit que nous créerons plus bas.

Notez que si l'API retourne des informations dont la clé n'a pas de propriété correspondante, ces informations ne seront simplement pas traitées par l'application.

Inversement, si la classe contient des propriétés qui ne sont pas retournées par l'API, ces propriétés auront toujours la valeur null.

Mais attention : si vous devez envoyer des données de ce type dans le corps de la requête, par exemple pour ajouter une donnée, une erreur dans le nom des champs des données attendues par l'API générera une erreur 404 (ou 500 selon la façon dont l'API a été programmée).

Interface pour accéder à l'API¶
Il faut créer une interface qui fera le lien entre l'application et l'API.

Cette interface sera codée dans un fichier dont le nom se termine par Api, placé dans le dossier service qui est au même niveau que le fichier MainActiviy.kt , par exemple app/src/main/java/com/monnom/monprojet/service/ItemApi.kt .

L'interface doit définir, pour chaque type de requête à réaliser :

le verbe HTTP (@GET, @POST, @PUT, @PATCH, @DELETE)¶
le point d'accès (endpoint), c'est-à-dire la partie qui suit l'URL de base de la requête à exécuter.¶
Par exemple, si on appelle l'API https://monapi.com/v1/items , le point d'accès est items. Avec l'API https://monapi.com/v1/ajouter.php , le point d'accès est ajouter.php.

Pour un URL qui contient des paramètres dans son chemin , par exemple https://monapi.com/v1/items/12 , le point d'accès est items/ {id} . Les paramètres du chemin seront identifiés à l'aide de l'annotation @Path (voir exemple plus bas).

Dans le cas où l'URL utilise des paramètres de requête , par exemple https://monapi.com/v1/items? id =12 , le point d'accès est items. Les paramètres de requête seront identifiés à l'aide de l'annotation @Query (voir exemple plus bas).

Le nom de la fonction que l'application utilisera pour effectuer l'appel de l'API, avec ses paramètres et son type de¶
retour. Cette fonction ne contient aucun code. Lorsqu'elle est appelée, elle effectue automatiquement l'appel API à l'aide du point d'accès spécifié dans l'interface.

Notez que si le type de retour est Response<...> , il sera possible de retrouver le code d'état HTTP retourné par l'API.

S'il y a lieu, les données à envoyer dans le corps du message, identifiées avec @Body.¶
Voici un exemple d'interface qui définit quelques appels. Le premier permet de retrouver tous les items et le second, un seul item retrouvé par son identifiant, passé comme paramètre de requête (ex : ?id=12).

Le nom du paramètre n'a pas d'importance. Je l'ai appelé identifiant pour illustrer que ça n'a pas besoin d'être le même nom que dans l'API. Sa valeur sera spécifiée lors de l'appel à cette fonction (voir correspondance de couleur plus bas).

Un troisième appel permet d'ajouter un item dans la base de données distante.

!!! warning "Attention : si vous " Attention : si vous effectuez le mauvais import pour la classe Retrofit, vous obtiendrez une erreur du genre « No type arguments expected for class Response : Closeable. ».

Fichier service/ItemApi.kt

import retrofit2.Response
import retrofit2.http.GET
...
interface ItemApi {
    @GET(" liste ")
    suspend fun retrouverItems (): Response<List<Item>>
    @GET(" liste ")
    suspend fun retrouverUnItem ( @Query("id") identifiant : Int): Response<Item>
    @POST(" ajout ")
    suspend fun ajouterItem (@Body item: Item): Response<Void>
}
Si on avait utilisé un API qui utilise des paramètres de chemin, la seconde requête aurait pris cette forme :

Fichier service/ItemApi.kt

@GET("liste/ {id} ")
suspend fun retrouverUnItem( @Path("id") identifiant : Int): Response<Item>
!!! warning "Note : si vous effec" Note : si vous effectuez des recherches sur le Web ou dans des anciens projets, vous rencontrerez parfois des instructions du genre :

fun retrouverUnItem(@Path("id") identifiant: Int): Call.

Ce type de code était utilisé avant l'arrivée des coroutine de Kotlin. Bien qu'il fonctionne encore, il est préférable d'utiliser l'approche avec coroutines (avec le mot- clé suspend, tel qu'illustré plus haut) puisque le code sera plus facile à écrire, à lire et à maintenir.

Dans le cadre de ce cours, la forme avec Call est interdite.¶
Instance Retrofit¶
L'application travaillera avec une seule instance de Retrofit.

L'instanciation sera codée dans le fichier service/RetrofitInstance.kt .

On utilisera le mot-clé object et non class. En Kotlin, le mot-clé object permet de déclarer une classe et d'instancier un singleton de cette classe, tout ça en une seule étape.

Il s'agit de spécifier l'URL de base, d'effectuer l'instanciation en tant que telle et de faire le lien avec l'interface (fichier créé plus tôt, dont le nom se termine par Api).

Fichier service/RetrofitInstance.kt

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
...
object RetrofitInstance {
    private const val BASE_URL = " https://monapi.com/v1/ "
    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    val itemApi: ItemApi by lazy {
        retrofit.create( ItemApi ::class.java)
    }
}
Dans cet extrait de code, l'instruction addConverterFactory(GsonConverterFactory.create()) permet d'automatiser la conversion de données JSON en objets Kotlin et vice versa.

Remarquez l'utilisation de by lazy qui fait en sorte que le code de l'initialisation ne sera exécuté que lors du premier accès à la variable.

Effectuer un appel à l'API¶
Il est maintenant temps de coder les fonctions qui permettent d'appeler l'API. Ces fonctions, qui constituent la logique métier, seront codées dans le ViewModel.

Je leur ai volontairement donné des noms différents de ceux spécifiés dans l'interface afin de mieux illustrer qu'est-ce qui fait quoi.

Chacune de ces fonctions fera appel à la fonction dont le nom a été spécifié dans l'interface. Une fois l'appel réalisé, elle stockera dans une variable d'état les informations retournées par l'API .

Remarquez que dans cet extrait, il n'est pas utile de déclarer le uiState comme un flux puisque l'application n'écoute pas pour recevoir les modifications aux données distantes.

J'ai mis en caractères gras le code qui diffère lorsque le uiState n'est pas un flux.

Remarquez l'utilisation de private set qui rend la propriété immuable.

Fichier ui/HomeViewModel.kt

class HomeViewModel : ViewModel() {
    var uiState = mutableStateOf(HomeUiState())
        private set
    init {
       rechercherItems()
    }
    fun rechercherItems() {
        viewModelScope.launch {
            try {
                val reponse = RetrofitInstance.itemApi. retrouverItems ()
                if (reponse.isSuccessful) {
                    uiState.value = uiState.value.copy(
                         _listeItems = reponse.body() ,
                        ...    // on a accès à reponse.code() pour retrouver le code
d'état HTTP retourné par l'API
                    )
                }
                else {
                    ...
                }
            } catch (e: Exception) {
                ...
            }
        }
    }
    fun rechercherUnItem (id: Int) {
        ...
        val reponse = RetrofitInstance.itemApi. retrouverUnItem ( id )
        ...
    }
    fun insererItem(item: Item) {
        ...
        val reponse = RetrofitInstance.itemApi. ajouterItem (item)
        ...
    }
}
data class HomeUiState(
    private val _listeItems: List<Item>? = listOf(),
    private val _unItem: Item? = null,
    ...
) {
    ...
}
Un composable pourra alors appeler une méthode du ViewModel pour réaliser l'appel.

Jetpack Compose (Kotlin)

@Composable
fun AfficherItem(viewModel: HomeViewModel, id: Int) {
    Button(
        onClick = {
            viewModel. rechercherUnItem (id)
        }
    ) {
        Text(text = "Rechercher")
    }
    ...
}
Utiliser les données de l'API dans un composable¶
Une fois l'appel à l'API complété (et les informations stockées dans le ViewModel), un composable pourra afficher les données du ViewModel.

Remarquez la syntaxe pour initialiser le uiState lorsqu'on ne travaille pas avec un flux.

Ici aussi, j'ai mis en caractères gras le code qui diffère quand le uiState n'est pas un flux.

Jetpack Compose (Kotlin)

@Composable
fun UnItem(viewModel: HomeViewModel) {
    val uiState by viewModel.uiState
    ...
    Text(text = uiState.unItem?.id?.toString() ?: "---")
    ...
}
Cas des API qui peuvent retourner différents types de données selon la réussite ou l'erreur¶
Prenons le cas d'un API qui retourne un tableau d'items quand la requête fonctionne ou un message d'erreur si un problème survient.

Ce message d'erreur, initialisé par l'API, est plus précis qu'un simple Not Found ou Internal Server Error.

Pour avoir accès à ce message, il faut d'abord créer une classe dont les propriétés correspondent aux clés JSON reçues.

Fichier data/ReponseAvecMessage.kt

data class ReponseAvecMessage (
    var message: String? = null,
)
Dans le ViewModel, il sera possible de retrouver le message d'erreur retourné par l'API à l'aide manipulations JSON.

Fichier ui/HomeViewModel.kt

fun retrouverItems() {
    viewModelScope.launch {
        try {
            val reponse = RetrofitInstance.itemApi.retrouverItems()
            if (reponse.isSuccessful) {
                ...
            }
            else {
                val gson = Gson()
                val reponseAvecMessage: ReponseAvecMessage ? = gson?.fromJson(reponse?.errorBody()?.charStream()?.readText(),
ReponseAvecMessage ::class.java)
                val message = reponseAvecMessage?.message ?: "Aucun message"
                ...
            }
        } catch (e: Exception) {
            ...
        }
    }
}
Erreur « Unable to resolve host "....com": No address associated with hostname »¶
L'erreur «Erreur « Unable to resolve host "....com": No address associated with hostname » indique qu'il y a un problème avec le serveur DNS qui doit traduire un URL en adresse IP.

Cette erreur est généralement silencieuse. Vous la verrez seulement si vous avez pris soin de réagir à un problème lors de l'appel de l'API.

ViewModel (Kotlin)

try {
    val reponse = RetrofitInstance.itemApi.retrouverItems()
    ...
} catch (e: Exception) {
    Log.d("****** ViewModel", "Erreur lors de l'appel de retrouverItems() : ${e.message}")
    ...
}
Si vous voyez cette erreur, commencez par vérifier si l'URL est exact à l'aide d'un navigateur Web ou d'un testeur de requêtes REST comme Postman, Bruno ou curl . Vous devez concaténer la valeur de la constante BASE_URL avec le point d'accès précisé à la suite du @GET ou du @POST (ex : https://monapi.com/v1/ liste ).

Si l'URL est exact, l'erreur pourrait être due à un problème avec l'émulateur. Ceci arrive parfois si on utilise l'émulateur dans différents réseaux, par exemple à l'école et à la maison.

Pour régler ce problème :

Rendez-vous dans le menu View / Tool Windows / Device Manager .¶
Parfois, un simple redémarrage de l'émulateur fonctionne. Cliquez sur Stop vis-à-vis l'émulateur que vous utilisez.¶
Cliquez ensuite sur Start puis relancez votre application.¶
Il peut arriver qu'une action plus costaude soit nécessaire. Toujours dans Device Manager, cliquez sur les trois points¶
verticaux vis-à-vis l'émulateur que vous utilisez puis choisissez Wipe Data . Relancez ensuite votre application. 72.2 Appeler deux API dans la même application

Si votre application Jetpack Compose a besoin de faire appel à deux API :

Chaque API aura sa propre **classe pour¶
représenter les données reçues de l'API**.

Chaque API aura sa propre **Interface pour¶
accéder à l'API**.

Les deux pourront se partager l'**Instance¶
Retrofit**.

On voit ici que dans la même instance Retrofit, on définit ce qu'il faut pour chaque API.

Fichier service/RetrofitInstance.kt

object RetrofitInstance {
    private const val BASE_URL _ABC = "https://.../"
    private const val BASE_URL_DEF = "https://.../"
    private val retrofit Abc : Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL_ABC)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    private val retrofitDef: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL_DEF)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }   
    val abc Api: AbcApi by lazy {
        retrofit.create(AbcApi::class.java)
    }
    val defApi: DefApi by lazy {
        retrofit.create(DefApi::class.java)
    }
}
On pourra faire appel à l'un ou l'autre de ces API en utilisant la propriété correspondante :

Jetpack Compose (Kotlin)

val reponse = RetrofitInstance. abc Api.retrouverDonnees()
72.3 Synchroniser les données locales avec les données distantes¶
Une application mobile qui travaille avec des données locales a tout avantage à synchroniser ses données avec une base de données distante afin de s'assurer de ne rien perdre en cas de bris du téléphone.

En temps normal, l'application effectuera chacune des opérations avec la base de données locales ET avec la base de données distante.

Mais dans le cas où l'application roule alors qu'elle n'a pas accès à Internet, seules les données locales pourront être modifiées. Il faut donc mettre en place un mécanisme qui se chargera d'effectuer ces modifications sur la base de données distante dès que l'accès à Internet sera retrouvé.

Il est possible de programmer une application Android avec Jetpack Compose pour qu'elle réagisse lorsqu'elle détecte un changement de la connectivité : https://blog.devgenius.io/monitoring-internet-connection-on-android-jetpack-writing-e007b3d61915

72.4 Service Web pour synchroniser les données¶
Je vous démontre ici comment écrire un service Web en PHP qui interagit avec une base de données MySQL afin de recopier des données locales dans une base de données distante.

Ce service peut être utilisé avec une application mobile pour iOS ou pour Android de même qu'avec tout autre type d'application qui utilise des données locales.

Dans cette fiche :

Synchronisation vs enregistrement au fur et à mesure dans la base de données distante¶
Serveurs de développement¶
Structure des informations envoyées au service Web puis retournées par le service Web¶
Sécurité et autorisations¶
Branchement à la base de données¶
Comparer les enregistrements des BD locale et distante¶
UUID ou ULID¶
Une bonne base pour votre service Web¶
Tester le service Web manuellement¶
Consommer le service Web¶
Synchronisation vs enregistrement au fur et à mesure dans la base de données distante¶
Quand on travaille avec une base de données locale et une base de données distante, il faut distinguer deux figures de cas :

les modifications sont effectuées sur la base de données locale et sur la base de données distante au fur et à mesure¶
les modifications sont effectuées seulement sur la base de données locales puis, à un moment précis, les données¶
locales sont synchronisées avec les données distantes.

Ces deux figures de cas sont complémentaires.

En temps normal, l'application utilisera la première approche : chacune des opérations sera effectuée avec la base de données locales ET avec la base de données distante.

Mais dans le cas où l'application roule alors qu'elle n'a pas accès à Internet, seules les données locales pourront être modifiées.

C'est là qu'entre en jeu la synchronisation. Elle permet de comparer les données locales et les données distantes afin d'effectuer les opérations d'ajout, de modification et de suppression qui n'ont pas encore été effectuées sur les données distantes.

Dans cette fiche, je vous montre comment développer un service Web qui permettra d'effectuer cette synchronisation.

Serveurs de développement¶
Pour effectuer la copie des données locales, il faut que l'application mobile ait accès à un service Web qui interagira avec la base de données distante.

Pendant la phase de développement de votre application, le service Web peut tourner localement. Vous aurez besoin d'un serveur HTTP et d'un serveur de bases de données.

Ces serveurs peuvent être installés sur votre ordinateur à l'aide d'un environnement de développement Web tel que Devilbox , un outil qui préconfigure des conteneurs Docker qui font rouler Apache ou Ngnix, MySQL, etc.

Quand vous aurez terminé le développement et la phase de tests de votre service Web, vous pourrez le mettre en ligne chez un hébergeur, comme vous le feriez pour un site Web.

Structure des informations envoyées au service Web puis retournées par le service Web¶
Le format JSON est très utilisé pour échanger des données entre applications.

L'application mobile doit fournir au service Web une représentation JSON des données à synchroniser.

De son côté, le service Web recevra ces données et il s'en servira dans son traitement.

Il remplira un tableau associatif avec les informations qu'il souhaite fournir en retour à l'application mobile.

À la fin du traitement, le service convertira ce tableau au format JSON puis il fera un echo de cette valeur. C'est ce echo qui sera la valeur de retour du service Web.

L'application mobile pourra lire l'information retournée et réagir en conséquence.

Fichier monservice/synchro-clients.php

...
$tableauRetour = [...];
// Retrouve les données envoyées par l'application mobile.
$jsonBrut = file_get_contents('php://input');    // $_POST ne fonctionne que pour les Content-Type application/x-www-form-
urlencoded ou multipart/form-data
if ($jsonBrut == null) {
    $tableauRetour ['erreurs'][] = ['code' => 5, 'message' => "Aucune donnée locale à synchroniser n'a été reçue."];
}
else {
    $donnees = json_decode ($jsonBrut);
    ...
    $tableauRetour  ...;
}
// Retourne les informations à l'application mobile.
// Remarquez que les paramètres JSON_PRETTY_PRINT, JSON_UNESCAPED_UNICODE et JSON_UNESCAPED_SLASHES assurent les caractères
spéciaux seront correctement encodés.
echo json_encode ($tableauRetour, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
Sécurité et autorisations¶
Tout service Web qui manipule des données doit se soucier des problèmes de sécurité.

Entre autres, il faut mettre en place un mécanisme d'authentification qui assurera que seules les applications autorisées peuvent faire appel au service Web.

Les concepts de l'authentifications auprès d'un service Web sont expliqués dans la fiche « l_authentification_aupres_du_service_web ».

Branchement à la base de données¶
Le service Web doit réussir à se brancher à la base de données.

En cas d'erreur, il se chargera d'initialiser un élément du tableau associatif afin de laisser savoir qu'il y a eu un problème.

Fichier monservice/synchro-clients.php (PHP 8.x)

$serveurBD='127.0.0.1';
$usagerBD = 'root';
$motDePasseBD = '';
$nomBD = 'mabd';
// Branchement à la base de données.
$continuer = false;
try {
    $mysqli = new mysqli($serveurBD, $usagerBD, $motDePasseBD, $nomBD);
    $mysqli->set_charset("utf8mb4");
    $continuer = true;
    ...
} catch (Exception $e) {
    $tableauRetour['erreurs'][] = ['code' => 2, 'message' => "Échec lors de la
connexion à la base de données."];
}
if ($continuer) {
    ...
}
Comparer les enregistrements des BD locale et distante¶
Il faut distinguer trois figures de cas :

ajout : l'enregistrement n'est pas encore dans la BD distante. Il est seulement dans la BD locale.¶
modification : l'enregistrement est dans la BD distante mais ses données sont différentes de celles de la BD locale.¶
suppression : l'enregistrement est encore dans la BD distante alors qu'il a été supprimé de la BD locale.¶
À première vue, on pourrait utiliser l'identifiant d'un enregistrement pour comparer sa présence dans la BD locale et dans la BD distante.

Le problème, c'est qu'en cas d'ajout, il faudrait forcer l'identifiant afin d'assurer que les deux bases de données puissent demeurer synchronisées. Ceci empêcherait la synchronisation à partir de plusieurs applications différentes puisque chacune pourrait faire un ajout local avec le même identifiant.

UUID ou ULID¶
Pour permettre la synchronisation à partir de plusieurs sources, il est possible d'utiliser un identifiant unique universel (Universally unique identifier, UUID) comme valeur de base pour la synchronisation.

L'utilisation d'un ULID (Universally Unique Lexicographically sortable IDentifier) est également possible.

Ici, le UUID a été utilisé.

Le UUID est une chaîne hexadécimale au format aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.

Il faut donc ajouter un champ à chacune des tables et s'assurer de le remplir adéquatement.

Plusieurs langages et SGBD permettent de générer un UUID par programmation :

Swift : UUID().uuidString¶
Kotlin : UUID.randomUUID()¶
MySQL : UUID()¶
Pour remplir manuellement ce champ dans une base de données existante, je vous propose trois techniques simples.

Terminal¶
Il est très simple de générer un UUID dans le Terminal macOS à l'aide de la commande uuidgen .

Terminal

uuidgen
Site Web générateur de UUID¶
Vous pouvez également travailler à partir d'un site générateur de UUID, par exemple https://www.uuidgenerator.net .

Avec MySQL¶
Ouvrez un éditeur MySQL, par exemple phpMyAdmin, puis exécutez la requête :

MySQL

SELECT UUID();
Une bonne base pour votre service Web¶
Je vous propose ici une première version du service Web que vous pouvez adapter pour vos besoins.

Cette version est perfectible et se veut un simple départ pour éviter de tout construire à partir de zéro.

Fichier monservice/synchro-clients.php (PHP 8.x)

<?php
/**
 * Synchronisation à sens unique des données locales vers MySQL.
 *
 * L'application qui consomme ce service Web doit fournir des données par POST au
format :
 * [
 *     {"uuid": "...", "prenom": "...", "nomfamille": "..."},
 *     {"uuid": "...", "prenom": "...", "nomfamille": "..."}
 * ]
 *
 * @author Christiane Lagacé <christianelagace.com>
 *
 * @return String chaîne JSON au format :
 * {
 *     "erreurs" : [
 *         {"code" : 99, "message" : "..."},
 *         {"code" : 99, "uuid" : "...", "message" : "..."}
 *     ],
 *     "ajouts" : ["UUID1", "UUID2", ...],
 *     "modifications" : ["UUID3", "UUID4", ...],
 *     "suppressions" : ["UUID5", "UUID6", ...],
 *     "jwt" : "..."
 * }
 *
 * Codes d'erreurs :  1 : Accès refusé.
 *                    2 : Échec lors de la connexion à la base de données.
 *                    3 : Un problème empêche de vérifier les informations
d'authentification.
 *                    4 : Les informations d'authentification ne sont pas valides ou
le jeton est expiré.
 *                    5 : Aucune donnée locale à synchroniser n'a été reçue.
 *                    6 : Il n'est pas possible de synchroniser les ajouts et les
modifications.
 *                    7 : Il n'est pas possible de vérifier s'il y a des
enregistrements à supprimer dans la base de données distante.
 *                    8 : L'ajout d'un enregistrement a échoué.
 *                    9 : La mise à jour d'un enregistrement a échoué.
 *                   10 : La suppression d'un enregistrement a échoué.
 */
// Configurations
// *****************************************************************
$serveurBD='127.0.0.1';
$usagerBD = 'root';
$motDePasseBD = '';
$nomBD = 'mabd';
// *** Fin configurations ******************************************
// Le dossier du fichier journal (log) doit exister au même niveau que le dossier du
service Web.
$dossierRacineServeur = dirname(__FILE__, 2);
define('LOG_FILE', $dossierRacineServeur . DIRECTORY_SEPARATOR . 'log' .
DIRECTORY_SEPARATOR . 'apifactures.log');
$messageAccesRefuse = "Accès refusé.";
$codeAccesRefuse = 1;
$messageErreurConnexion = "Échec lors de la connexion à la base de données.";
$codeErreurConnexion = 2;
$messageErreurVerifierAuthentification = "Un problème empêche de vérifier les informations d'authentification.";
$codeErreurVerifierAuthentification = 3;
$messageErreurInformationsAuthentification = "Les informations d'authentification ne sont pas valides ou le jeton est
expiré.";
$codeErreurInformationsAuthentification = 4;
$messageErreurPost = "Aucune donnée locale à synchroniser n'a été reçue.";
$codeErreurPost = 5;
$messageErreurSynchroAjout = "Il n'est pas possible de synchroniser les ajouts et les modifications.";
$codeErreurSynchroAjout = 6;
$messageErreurSynchroSuppression = "Il n'est pas possible de vérifier s'il y a des enregistrements à supprimer dans la base de
données distante.";
$codeErreurSynchroSuppression = 7;
$messageErreurAjout = "L'ajout d'un enregistrement a échoué.";
$codeErreurAjout = 8;
$messageErreurMiseAJour = "La mise à jour d'un enregistrement a échoué.";
$codeErreurMiseAJour = 9;
$messageErreurSuppression = "La suppression d'un enregistrement a échoué.";
$codeErreurSuppression = 10;
$tableauRetour = [
    'erreurs' => [],
    'ajouts' => [],
    'modifications' => [],
    'suppressions' => [],
    'jwt' => ''
];
// Branchement à la base de données
// *****************************************************************
try {
    $mysqli = new mysqli($serveurBD, $usagerBD, $motDePasseBD, $nomBD);
    $mysqli->set_charset("utf8mb4");
    $continuer = true;
} catch (Exception $e) {
    $continuer = false;
    log_error($messageErreurConnexion);
    $tableauRetour['erreurs'][] = ['code' => $codeErreurConnexion,'message' => $messageErreurConnexion];
}
if ($continuer) {
    // Récupération des données envoyées par l'application mobile
    // *****************************************************************
    $jsonBrut = file_get_contents('php://input'); // $_POST ne fonctionne que pour les Content-Type application/x-www-form-
urlencoded ou multipart/form-data
    if ($jsonBrut == null) {
         log_error($messageErreurPost);
         $tableauRetour['erreurs'][] = ['code' => $codeErreurPost, 'message' => $messageErreurPost];
    }
    else {
        $clientsSqlite = json_decode($jsonBrut);   // liste des clients dans la BD SQLite
        //log_info("Données reçues :");
        //log_info($clientsSqlite);
        // Vérification des droits
        // *****************************************************************
        // ...
        $tableauRetour['jwt'] = "...";
        // Recherche des enregistrements à supprimer
        // *****************************************************************
        $requete = "SELECT uuid, nomfamille, prenom FROM clients";
        try {
            $resultat = $mysqli->query($requete);
            if ($mysqli->affected_rows > 0) {
                while ($enreg = $resultat->fetch_row()) {
                    // L'enregistrement n'est pas dans SQLite : on le supprime.
                    // *****************************************************************
                    if (!presentDansTableauDObjets($enreg[0], $clientsSqlite, 'uuid')) {
                        if (suppressionClient($enreg[0], $enreg[1], $enreg[2])) {
                            $tableauRetour['suppressions'][] = $enreg[0];
                        }
                    }
                }
            }
            $resultat->free();
        } catch (Exception $e) {
            log_error("$messageErreurSynchroSuppression - $mysqli->error");
            $tableauRetour['erreurs'][] = ['code' => $codeErreurSynchroSuppression, 'message' =>
$messageErreurSynchroSuppression];
        }
        // Recherche des enregistrements à ajouter ou à modifier
        // *****************************************************************
        $requete = "SELECT prenom, nomfamille FROM clients WHERE uuid = ?";
        try {
            $stmt = $mysqli->prepare($requete);
            foreach($clientsSqlite as $clientSqlite) {
                 $stmt->bind_param('s', $clientSqlite->uuid);
                 $stmt->execute();
                 $stmt->store_result();
                if ($stmt->errno != 0) {
                     log_error("$messageErreurSynchroAjout - uuid: $clientSqlite->uuid - nom: $clientSqlite->nomfamille -
prenom: $clientSqlite->prenom - stmt->error");
                     $tableauRetour['erreurs'][] = ['code' => $codeErreurSynchroAjout, 'uuid' => $clientSqlite->uuid,
'message' => $messageErreurSynchroAjout];
                 }
                 else {
                     // L'enregistrement existait dans la BD distante.
                     // *****************************************************************
                     if ($stmt->num_rows > 0) {
                         $stmt->bind_result($prenom, $nomfamille);
                         $stmt->fetch();
                         // L'enregistrement est différent : on fait la mise à jour.
                         // *****************************************************************
                         if ($prenom != $clientSqlite->prenom || $nomfamille != $clientSqlite->nomfamille) {
                             if (miseAJourClient($clientSqlite->uuid, $clientSqlite->prenom, $clientSqlite->nomfamille)) {
                                 $tableauRetour['modifications'][] = $clientSqlite->uuid;
                             }
                         }
                     }
                     else {
                         // L'enregistrement n'existait pas : on l'ajoute.
                         // *****************************************************************
                         if (ajoutClient($clientSqlite->uuid, $clientSqlite->prenom, $clientSqlite->nomfamille)) {
                             $tableauRetour['ajouts'][] = $clientSqlite->uuid;
                         }
                     }
                 }
            }
            $stmt->close();
        } catch (Exception $e) {
             log_error("$messageErreurSynchroAjout - $mysqli->error");
             $tableauRetour['erreurs'][] = ['code' => $codeErreurSynchroAjout, 'message' => $messageErreurSynchroAjout];
        }
    }
}
//log_info("Informations retournées :");
//log_info($tableauRetour);
// Retour des informations à l'application mobile
// *****************************************************************
// Remarquez que les paramètres JSON_PRETTY_PRINT, JSON_UNESCAPED_UNICODE et JSON_UNESCAPED_SLASHES assurent les caractères
spéciaux seront correctement encodés.
echo json_encode($tableauRetour, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
/**
 * Met à jour le client dans la BD distante selon son UUID.
 *
 * @param String $uuid       Identifiant unique universel du client.
 * @param String $prenom     Prénom à enregistrer.
 * @param String $nomfamille Nom de famille à enregistrer.
 *
 * @author Christiane Lagacé <christianelagace.com>
 *
 * @return bool True si l'opération a réussi.
 *
 */
function miseAJourClient($uuid, $prenom, $nomfamille) {
    global $mysqli;
    global $messageErreurMiseAJour;
    global $codeErreurMiseAJour;
    global $tableauRetour;
    $retour = false;
    $requete = "UPDATE clients SET prenom = ?, nomfamille = ? WHERE uuid = ?";
    try {
        $stmt = $mysqli->prepare($requete);
        $stmt->bind_param('sss', $prenom, $nomfamille, $uuid);
        $stmt->execute();
        if (0 == $stmt->errno) {
            $retour = true;
        }
        else {
            log_error("$messageErreurMiseAJour - uuid: $uuid - nom: $nomfamille - prenom: $prenom - $stmt->error");
            $tableauRetour['erreurs'][] = ['code' => $codeErreurMiseAJour, 'uuid' => $uuid, 'message' =>
$messageErreurMiseAJour];
        }
        $stmt->close();
    } catch (Exception $e) {
        log_error("$messageErreurMiseAJour - uuid: $uuid - nom: $nomfamille - prenom: $prenom - $mysqli->error");
        $tableauRetour['erreurs'][] = ['code' => $codeErreurMiseAJour, 'uuid' => $uuid, 'message' => $messageErreurMiseAJour];
    } catch (Error $e) {
        log_error("$messageErreurMiseAJour - uuid: $uuid - nom: $nomfamille - prenom: $prenom - " . $e->getMessage());
        $tableauRetour['erreurs'][] = ['code' => $codeErreurMiseAJour, 'uuid' => $uuid, 'message' => $messageErreurMiseAJour];
    }
    return $retour;
}
/**
 * Ajoute un client dans la BD distante.
 *
 * @param String $uuid       Identifiant unique universel à enregistrer.
 * @param String $prenom     Prénom à enregistrer.
 * @param String $nomfamille Nom de famille à enregistrer.
 *
 * @author Christiane Lagacé <christianelagace.com>
 *
 * @return bool True si l'opération a réussi.
 *
 */
function ajoutClient($uuid, $prenom, $nomfamille) {
    global $mysqli;
    global $messageErreurAjout;
    global $codeErreurAjout;
    global $tableauRetour;
    $retour = false;
    $requete = "INSERT INTO clients (uuid, prenom, nomfamille) VALUES (?, ?, ?)";
    try {
        $stmt = $mysqli->prepare($requete);
        $stmt->bind_param('sss', $uuid, $prenom, $nomfamille);
        $stmt->execute();
        if (0 == $stmt->errno) {
            $retour = true;
        }
        else {
            log_error("$messageErreurAjout - uuid: $uuid - nom: $nomfamille - prenom: $prenom - $stmt->error");
            $tableauRetour['erreurs'][] = ['code' => $codeErreurAjout, 'uuid' => $uuid, 'message' => $messageErreurAjout];
        }
        $stmt->close();
    } catch (Exception $e) {
        log_error("$messageErreurAjout - uuid: $uuid - nom: $nomfamille - prenom: $prenom - $mysqli->error");
        $tableauRetour['erreurs'][] = ['code' => $codeErreurAjout, 'uuid' => $uuid, 'message' => $messageErreurAjout];
    } catch (Error $e) {
        log_error("$messageErreurAjout - uuid: $uuid - nom: $nomfamille - prenom: $prenom - " . $e->getMessage());
        $tableauRetour['erreurs'][] = ['code' => $codeErreurAjout, 'uuid' => $uuid, 'message' => $messageErreurAjout];
    }
    return $retour;
}
/**
 * Supprime un client de la BD distante selon son UUID.
 *
 * @param String $uuid       Identifiant unique universel du client.
 * @param String $nomfamille Nom de famille du client.
 * @param String $prenom     Prénom du client.
 *
 * @author Christiane Lagacé <christianelagace.com>
 *
 * @return bool True si l'opération a réussi.
 *
 */
function suppressionClient($uuid, $nomfamille, $prenom) {
    global $mysqli;
    global $messageErreurSuppression;
    global $codeErreurSuppression;
    global $tableauRetour;
    $retour = false;
    $requete = "DELETE FROM clients WHERE uuid = ?";
    try {
        $stmt = $mysqli->prepare($requete);
        $stmt->bind_param('s', $uuid);
        $stmt->execute();
        if (0 == $stmt->errno) {
            $retour = true;
        }
        else {
            log_error("$messageErreurSuppression - uuid: $uuid - nom: $nomfamille - prenom: $prenom - $stmt->error");
            $tableauRetour['erreurs'][] = ['code' => $codeErreurSuppression, 'uuid' => $uuid, 'message' =>
$messageErreurSuppression];
        }
        $stmt->close();
    } catch (Exception $e) {
        log_error("$messageErreurSuppression - uuid: $uuid - nom: $nomfamille - prenom: $prenom - $mysqli->error");
        $tableauRetour['erreurs'][] = ['code' => $codeErreurSuppression, 'uuid' => $uuid, 'message' =>
$messageErreurSuppression];
    } catch (Error $e) {
        log_error("$messageErreurSuppression - uuid: $uuid - nom: $nomfamille - prenom: $prenom - " . $e->getMessage());
        $tableauRetour['erreurs'][] = ['code' => $codeErreurSuppression, 'uuid' => $uuid, 'message' =>
$messageErreurSuppression];
    }
    return $retour;
}
/**
 * Recherche une valeur dans un tableau d'objets.
 *
 * @param mixed $valeur Valeur recherchée.
 * @param array $tableau Tableau d'objets dans lequel on effectue la recherche.
 * @param string $champ Nom du champ dans lequel on recherche la valeur.
 *
 * @author Christiane Lagacé <christianelagace.com>
 *
 * @return bool True si la valeur a été trouvée.
 *
 */
function presentDansTableauDObjets($valeur, $tableau, $champ) {
    $retour = false;
    foreach($tableau as $objet) {
        if ($objet->$champ == $valeur) {
            $retour = true;
            break;
        }
    }
    return $retour;
}
/**
 * Enregistre la date suivie d'un message d'information dans le fichier journal.
 *
 * Suppositions critiques : Le chemin complet du fichier dont le nom et le chemin sont dans la constante LOG_FILE doit exister
(le fichier sera créé s'il n'existe pas).
 * Les droits sur ce fichier et/ou son dossier doivent permettre au serveur Web de lire et d'écrire dans ce fichier.
 *
 * @param String $message Message à inscrire dans le journal.
 *
 * @author Christiane Lagacé <christianelagace.com>
 *
 */
function log_info($message) {
    if (is_array($message) || is_object($message)) {
        $message = print_r($message, true);
    }
    if (defined('LOG_FILE')) {
        error_log(date("F j, Y, g:i a") . " - Information: $message" . PHP_EOL, 3, LOG_FILE);
    }
    else {
        error_log(date("F j, Y, g:i a") . " - Information: $message". PHP_EOL);
    }
}
/**
 * Enregistre la date suivie d'un message d'erreur dans le fichier journal.
 *
 * Suppositions critiques : Le chemin complet du fichier dont le nom et le chemin sont dans la constante LOG_FILE doit exister
(le fichier sera créé s'il n'existe pas).
 * Les droits sur ce fichier et/ou son dossier doivent permettre au serveur Web de lire et d'écrire dans ce fichier.
 *
 * @param String $message Message à inscrire dans le journal.
 *
 * @author Christiane Lagacé <christianelagace.com>
 *
 */
function log_error($message) {
    if (is_array($message) || is_object($message)) {
        $message = print_r($message, true);
    }
    if (defined('LOG_FILE')) {
        error_log(date("F j, Y, g:i a") . " - Erreur: $message" . PHP_EOL, 3, LOG_FILE);
    }
    else {
        error_log(date("F j, Y, g:i a") . " - Erreur: $message". PHP_EOL);
    }
}
Tester le service Web manuellement¶
Avant de tenter de consommer le service Web dans une application mobile, il est bon de tester son fonctionnement de façon manuelle.

La technique pour effectuer un tel test est expliquée dans la fiche « tester_un_service_web_manuellement ».

Consommer le service Web¶
Une fois le service Web écrit et testé, vous êtes prêts à le consommer dans votre application.

avec SwiftUI¶
avec Jetpack Compose¶
Pour plus d'information¶
« How to Test and Play with Web APIs the Easy Way with Postman » - Free Code Camp the-easy-way-with-postman
* « Debug a PHP HTTP request » - phpStorm¶
Exercice 13

Lecture audio et sons MP3¶
47.1 Media3 ExoPlayer¶
Je vous démontre ici comment ajouter du son à une application Android avec Jetpack Compose.

Je vais créer une petite application qui joue une note de musique quand on appuie sur une touche.

J'utilise Media3 ExoPlayer tel que recommandé par Android . Il s'agit d'une bibliothèque plus intéressante que le traditionnel MediaPlayer.

Dépendances¶
D'abord, il faut ajouter des dépendances dans le fichier build.gradle.kts qui se trouve dans le dossier app .

Fichier app/build.gradle.kts

...
dependencies {
    ...
    // pour ExoPlayer
    implementation("androidx.media3:media3-exoplayer:1.8.0")
    implementation("androidx.media3:media3-common:1.8.0")
    implementation("androidx.media3:media3-ui:1.8.0")   // requis seulement si on a besoin de créer les contrôles de lecture
habituels (Play/Pause/Stop)
}
Une fois la dépendance ajoutée, il faut resynchroniser le projet pour qu'il tienne compte de l'ajout.

Ajouter les fichiers de son au projet¶
Les fichiers MP3 qui seront utilisés doivent être placés dans le dossier monProjet/app/src/main/res/raw .

D'abord, donne un nom significatif à chacun des fichiers MP3. Le nom du fichier sera utilisé dans le code en tant¶
qu'ID de ressource.

Ce nom doit être en entièrement en minuscules.¶
Il doit commencer par une lettre et ne doit pas contenir d'espaces ni de caractères spéciaux.¶
Les barres de soulignement sont autorisées (ex : message_recu.mp3)¶
Ce ne doit pas non plus être un mot réservé. Par exemple. do.mp3 n'est pas un nom acceptable.¶
Dans Android Studio, faites un clic droit sur le dossier res et choisissez New / Android Resource Directory .¶
Nommez le dossier raw et associez-le au type de ressource raw .¶
Faites glisser les fichiers dans ce dossier à partir de votre système de fichiers.¶
ExoPlayer¶
Dans le code, il faut instancier au moins un ExoPlayer.

Puisque chaque son à jouer doit avoir son propre ExoPlayer, il est intéressant de placer le code dans sa propre fonction.

Jetpack Compose (Kotlin)

/**
 * Initialise un ExoPlayer avec un son.
 *
 * @param context Le contexte.
 * @param media Le nom du fichier MP3 sans l'extension. Le fichier doit être dans le dossier res/raw.
 */
fun initialiserExoPlayer(context: Context, media: String): ExoPlayer {
    val mediaUri = "android.resource://${context.packageName}/raw/$media"
    val mediaItem = MediaItem.fromUri(mediaUri)
    return ExoPlayer.Builder(context).build().apply {
        setMediaItem(mediaItem)
        prepare()
    }
}
Sons en ligne¶
Il est également possible de travailler avec des sons disponibles directement en ligne.

Il faudra d'abord demander la permission d'utiliser une ressource en ligne en ajoutant cette balise uses-permission dans le fichier AndroidManifest.xml que l'on retrouve dans le dossier app/src/main .

Sans cette permission, le son ne sera jamais joué et on obtiendra ce message dans le logcat : « Unexpected exception loading stream ».

Remarquez que l'usager n'aura pas à donner son accord avant d'accéder à Internet. La permission est une simple déclaration dans le manifeste.

Fichier AndroidManifest.xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools">
     <uses-permission android:name="android.permission.INTERNET" />
    <application
            ...
    </application>
</manifest>
Jetpack Compose (Kotlin)

/**
 * Initialise un ExoPlayer avec un son en ligne.
 *
 * @param context Le contexte.
 * @param url L'URL du fichier mp3 en ligne.
 */
fun initialiserExoPlayerEnLigne(context: Context, url: String): ExoPlayer {
    val mediaUri = Uri.parse(url)
    val mediaItem = MediaItem.fromUri(mediaUri)
    return ExoPlayer.Builder(context).build().apply {
        setMediaItem(mediaItem)
        prepare()
    }
}
Instancier et libérer les objets ExoPlayer¶
Pour instancier l'ExoPlayer qui sera rattaché à un son, qu'il soit en ligne ou non, on aura besoin du contexte de l'application.

On prendra soin de libérer les ressources lorsqu'elles ne sont plus utilisées.

Remarquez qu'ici, l'utilisation de remember est tout à fait correcte puisqu'un si on avait utilisé rememberSaveable, l'objet ExoPlayer n'aurait pas pu être conservé lors de la destruction de l'activité étant donné qu'il n'est pas sérialisable.

Jetpack Compose (Kotlin)

@Composable
fun MainScreen(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val playerDo = remember { initialiserExoPlayer(context, "son_do") }
    val playerRe = remember { initialiserExoPlayer(context, "son_re") }
    val playerMi = remember { initialiserExoPlayer(context, "son_mi") }
    val playerEnLigne = remember { initialiserExoPlayerEnLigne(context, "https://...") }
    DisposableEffect(Unit) {
        onDispose {
            playerDo.release()
            playerRe.release()
            playerMi.release()
            playerEnLigne.release()
        }
    }
    ...
}
Faire jouer le son¶
Faire jouer le son peut prendre différentes formes.

Par exemple, si le son est très court, il suffit d'appeler la méthode play. Par contre, il faudra prendre soin de remettre le pointeur de lectuer au début du son pour permettre de le jouer à nouveau.

Jetpack Compose (Kotlin)

/**
 * Fait jouer le son.
 *
 * @param player Objet ExoPlayer rattaché au son à jouer.
 */
fun jouer(player: ExoPlayer) {
    player.seekTo(0)   // remet le son au début pour permettre de le jouer à nouveau
    player.play()
}
Dans le cas d'un fichier de son plus long, on pourra avoir quelque chose comme suit :

Jetpack Compose (Kotlin)

/**
 * Fait jouer le son.
 *
 * @param player Objet ExoPlayer rattaché au son à jouer.
 */
fun jouer(player: ExoPlayer) {
    if (player.isPlaying) {
        player.stop()   // si on clique pendant que le son joue, on l'arrête
        player.prepare()   // sans ceci, le son ne serait pas prêt à être joué lors du prochain appel à play()
    } else {
        player.play()
    }
}
On peut maintenant appeler cette fonction.

Jetpack Compose (Kotlin)

Button(
    onClick = {
        jouer(playerMi)
    }
) {
    Text(
        text = "Mi",
    )
}
48. Exercice 7¶

Navigation multi-écrans¶
63.1 La navigation¶
Beaucoup d'applications mobiles nécessitent un système de navigation pour gérer comment l'application passe d'un écran à l'autre.

Je vous propose ici une technique à appliquer dans une application mobile Android avec JetPack Compose qui utilise l'API NavController .

Dans cette fiche :

Ajout de dépendances¶
NavController¶
NavHost¶
Affichage de la page actuelle¶
Naviguer vers une page¶
Passer des paramètres à une route¶
Route avec paramètres de types différents¶
Route avec paramètres optionnels¶
Ajout de dépendances¶
Pour ajouter une fonctionnalité de navigation dans votre application, vous devez d'abord ajouter une dépendance au projet.

Dans le fichier build.gradle.kts qui se trouve dans le dossier app , ajoutez ceci :

Fichier app/build.gradle.kts

dependencies {
    ...
     // pour la navigation
    implementation("androidx.navigation:navigation-compose:2.9.5")
}
Une fois la dépendance ajoutée, il faut resynchroniser le projet pour qu'il tienne compte de l'ajout.

NavController¶
Votre application doit avoir accès à une instance de NavController.

L'instanciation doit avoir lieu dans un composable. Il faut choisir l'endroit le plus près de où on en aura besoin.

Dans cet exemple, le Scaffold est le premier composable qui a besoin du NavController.

Jetpack Compose (Kotlin)

import androidx.navigation.compose.rememberNavController
...
val navController = rememberNavController()
Scaffold(
    ...
)
NavHost¶
La liste des composables qui peuvent être rejoints par navigation sera définie dans un NavHost . Cette liste est en fait une liste des routes possibles dans l'application. Ces routes sont parfois appelées itinéraires ou destinations.

Le NavHost sera placé dans une fonction modulable que l'on codera dans son propre fichier, placé au même niveau que MainActivity.kt .

Pour chaque route, on spécifiera le nom qui sera utilisé pour la rejoindre puis le nom de la fonction modulable à appeler.

Lorsque l'application contient une barre de navigation, la route passera le navController en paramètre seulement si la fonction modulable a besoin de travailler avec cette variable.

Fichier NavigationHost.kt

import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
...
@Composable
fun NavigationHost (navController: NavHostController) {
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen (...)
        }
        composable(" pageUn ") {
              PageUn (...)
        }
        composable("pageDeux") {
              PageDeux (...)
        }
    }
}
Il est d'usage de placer chaque fonction modulable de cette liste dans son propre fichier, sous le dossier ui .¶
Le nom du fichier sera le même que le nom de la fonction.

Fichier ui/ HomeScreen .kt

@Composable
fun HomeScreen(...) {
    ...
}
Fichier ui/ PageUn .kt

@Composable
fun PageUn(...) {
    ...
}
Fichier ui/ PageDeux .kt

@Composable
fun PageDeux(...) {
    ...
}
Affichage de la page actuelle¶
Dans le Scaffold, c'est le NavigationHost qui indiquera quelle page doit être affichée.

Remarquez l'utilisation du Column qui permet de spécifier une fois pour toutes les espacements à utiliser.

D'autres configurations peuvent y être apportées au besoin.

Jetpack Compose (Kotlin)

val navController = rememberNavController()
Scaffold(
    ...
) {
    Column(
        modifier = Modifier
            .padding(it)
    ) {
         NavigationHost (navController = navController)
    }
}
Naviguer vers une page¶
La méthode navController.navigate permet d'atteindre la page souhaitée et de l'ajouter à la pile des pages affichées.

Jetpack Compose (Kotlin)

Button(
    onClick = {
        navController.navigate(" pageUn ")
    }
) {
    Text(text = "Page un")
}
Pour revenir à la page d'avant et ainsi la sortir de la pile, on utilisera .popBackStack() .

Jetpack Compose (Kotlin)

navController.popBackStack()
Passer des paramètres à une route¶
Pour définir une route qui peut recevoir un paramètre :

Fichier NavigationHost.kt

NavHost(navController = navController, startDestination = "home") {
    ...
    composable("rechercherItem/{texte}") { navBackStackEntry ->
        // extraire le paramètre à partir de la route
        val texte: String? = navBackStackEntry.arguments?.getString("texte")
        // passer le paramètre à la fonction modulable
        RechercherItem(navController, texte)
    }
}
Le composable qui recevra un paramètre devra le déclarer comme pouvant être nul. Sachez cependant que si vous ne passez pas de paramètre lorsque vous naviguez vers cette route, le programme plantera.

Jetpack Compose (Kotlin)

@Composable
fun RechercherItem(navController: NavController, texte: String?) {
    ...
}
Pour naviguer vers une route avec paramètre :

Jetpack Compose (Kotlin)

navController.navigate("rechercherItem/$variable")
Route avec paramètres de types différents¶
Par défaut, les paramètres sont des chaînes de caractères.

Si vous avez besoin d'un paramètre d'un autre type, par exemple un entier, vous devez le spécifier comme suit :

Fichier NavigationHost.kt

NavHost(navController = navController, startDestination = "home") {
    ...
    composable(
        route = "editerItem/{itemId}",
        arguments = listOf(
             navArgument("itemId") { type = NavType.IntType }
        )
    ) { navBackStackEntry ->
        // extraire le paramètre à partir de la route
        val itemId: Int = navBackStackEntry.arguments?. getInt ("itemId") ?: -1
        // passer le paramètre à la fonction modulable
        EditerItem(navController, itemId)
    }
}
Pour naviguer vers cette route :

Jetpack Compose (Kotlin)

navController.navigate("editerItem/${item.id}")
Route avec paramètres optionnels¶
Si le paramètre est optionnel :

Fichier NavigationHost.kt

NavHost(navController = navController, startDestination = "home") {
    ...
    composable("detailsItem ? {itemId}") { navBackStackEntry ->
        // extraire le paramètre à partir de la route
        val itemId: String? = navBackStackEntry.arguments?.getString("itemId") ?: ""
        // passer le paramètre à la fonction modulable
        DetailsItem(navController, itemId)
    }
}
Cette fois, il sera possible de ne pas passer de paramètre au besoin.

Jetpack Compose (Kotlin)

navController.navigate("detailsItem")
Pour plus d'information¶
« Naviguer avec Compose » - Android Developers
« Navigation et pile "Retour* « » - Android Developers¶
63.2 Le ViewModel et la navigation

On sait que dans une application, le ViewModel ne doit exister qu'en un seul exemplaire. Il doit donc être instancié à l'endroit approprié puis passé en paramètre aux fonctions modulables qui en ont besoin.

Dans le cas où une application qui travaille avec un ViewModel a besoin de navigation, une solution consiste à déclarer le ViewModel dans le NavigationHost puis à le passer en paramètre aux composables dans les routes où c'est nécessaire.

Fichier NavigationHost.kt

@Composable
fun NavigationHost(navController: NavHostController) {
     val categorieViewModel: CategorieViewModel = viewModel()
    NavHost(navController = navController, startDestination = "home") {
        ...
        composable("listeCategories") {
            ListeCategories( categorieViewModel , ...)
        }
    }
}
Une autre technique consiste à déclarer le ViewModel au même endroit que le navController et à le passer en paramètre au NavigationHost.

Jetpack Compose(Kotlin)

@Composable
fun MainScreen() {
    val navController = rememberNavController()
     val categorieViewModel: CategorieViewModel = viewModel()
    Scaffold(
        ...,
        content = {
            ...
            NavigationHost(navController, categorieViewModel )
        }
    )
}
Fichier NavigationHost.kt

@Composable
fun NavigationHost(navController: NavHostController, categorieViewModel: CategorieViewModel ) {
    NavHost(navController = navController, startDestination = "home") {
        ...
        composable("listeCategories") {
            ListeCategories( categorieViewModel , ...)
        }
    }
}
63.3 BottomAppBar¶
La classe BottomAppBar permet de définir ce qui apparaîtra dans le bas de l'écran.

La barre de navigation ainsi obtenue est très versatile.

Typiquement, on y ajoutera des icônes ou du texte pour effectuer des tâches ou pour atteindre différents écrans de l'application.

Jetpack Compose (Kotlin)

val navController = rememberNavController()
Scaffold(
    ...
    bottomBar = {
        BottomAppBar() {
            IconButton(onClick = {
                navController.navigate("home")
            }) {
                Icon(Icons.Filled.Home, contentDescription = "Accueil")
            }
            ...
        }
    }
) {
    ...
}
Et voici le résultat.

Notez que l'espacement entre les icônes doit être effectué manuellement.

Illustration

Voici un exemple de barre de navigation qui utilise des Button plutôt que des icônes.

Illustration

Pour plus d'information¶
« Barres d'application » - Android Developer
* « Composants et mises en page Material - Barres d'application » - Android Developpers¶
bars 63.4 NavigationBar

Lorsqu'une application Android avec Jetpack Compose comprend de 3 à 5 icônes de navigation, il est possible d'utiliser un NavigationBar plutôt que de styliser manuellement les liens de navigation.

Cette limite du nombre d'icônes provient de la documentation du NavigationBar :

NavigationBar should contain three to five NavigationBarItems, each representing a singular destination.¶
Si votre application ne répond pas à cette exigence, vous devrez configurer la barre de navigation avec BottomAppBar.

Voici un exemple d'application qui utilise un NavigationBar pour afficher trois icônes dans sa barre de navigation.

Jetpack Compose (Kotlin)

val navController = rememberNavController()
val currentBackStackEntry = navController.currentBackStackEntryAsState().value?.destination?.route
Scaffold(
    ...
    bottomBar = {
        NavigationBar() {
            NavigationBarItem(
                icon = {
                    Icon(
                         imageVector = Icons.Default.Home,
                         contentDescription = "Accueil"
                    )
                 },
                 label = {
                    Text("Accueil")
                 },
                 selected = currentBackStackEntry == "home",
                 onClick = {
                    navController.navigate("home")
                }
            )
            NavigationBarItem(
                icon = {
                    Icon(
                         imageVector = Icons.Default.Info,
                         contentDescription = "Information"
                    )
                 },
                 label = {
                    Text("Information")
                 },
                 selected = currentBackStackEntry == "information",
                 onClick = {
                    navController.navigate("information")
                }
            )
            NavigationBarItem(
                icon = {
                    Icon(
                         imageVector = Icons.Default.Person,
                         contentDescription = "Mon compte"
                    )
                 },
                 label = {
                    Text("Mon compte")
                 },
                 selected = currentBackStackEntry == "compte",
                 onClick = {
                    navController.navigate("compte")
                }
            )
        }
    }
) {
    ...
}
Voici la barre de navigation obtenue.

Remarquez que les icônes sont automatiquement espacés pour prendre toute la largeur de l'écran.

De plus, un indicatif visuel marque l'icône qui correpond à la page active.

Internationalisation et localisation¶
59.1 Internationalisation et localisation d'une application Android¶
L'internationalisation est constituée des techniques à mettre en place pour assurer que le texte, les images, les symboles monétaires, voire même les couleurs et les images puissent être adaptés à différentes langues et régions.

La localisation, quant-à-elle, est l'adaptation qui a été faite pour une langue et une région précise.

Illustrons ceci avec des chaînes de caractères :

Internationaliser une chaîne consiste à créer une ressource pour cette chaîne et à utiliser cette ressource dans le¶
code.

Localiser une chaîne consiste à inscrire dans un fichier de ressources la traduction de cette chaîne dans une langue¶
et région donnée.

Principe de base : il ne faut jamais écrire une chaîne en dur dans le code si elle est destinée à être affichée¶
directement ou indirectement.

Dans une application correctement internationalisée, au lieu d'écrire ceci :

Jetpack Compose (Kotlin)

Text(text = "Bonjour!" )
On écrira ceci :

Jetpack Compose (Kotlin)

Text(text = stringResource(R.string.salutation_accueil))
Mais pour que ça fonctionne, il faut que la chaîne ait été internationalisée puis localisée.

Choisir les localisations supportées par l'application¶
Une application peut supporter une ou plusieurs langues et régions, par exemple fr_CA, fr_FR, en_US, etc.

Pour ajouter une langue et région dans un projet dans Android Studio :

Faites un clic droit sur le fichier MonProjet/app/src/main/res/values/strings.xml puis choisissez Open Translations Editor .¶
Cliquez sur l'icône de planète ( Add Locale ) dans le haut de l'écran.¶
Sélectionnez la langue et région désirée. Ceci a pour effet :¶
d'ajouter une colonne dans le tableau des chaînes à localiser pour y entrer la traduction;¶
d'ajouter un dossier dont le nom débute par values et se termine par le code de localisation avec un r¶
devant le code de région (ex : values-fr-rCA ). C'est dans ce dossier que le fichier de ressources pour cette langue et région sera enregistré.

Extraire les chaînes à internationaliser (internationaliser l'application)¶
Il est intéressant de se préoccuper de l'internationalisation dès le début d'un projet car, avec Android Studio ou IntelliJ, il faut créer manuellement une ressource pour chacune des chaînes à localiser.

Heureusement, un petit raccourci permet de nous sauver du travail :

Dans le code, repérez une chaîne codée en dur.¶
Sélectionnez la chaîne. Vous pouvez sélectionner les guillemets ou pas. Si la chaîne est un modèle de chaîne et donc qu'elle¶
contient une variable, Android saura gérer.

Appuyez sur Alt + Entrée (Windows) ou ⌥ Option + Entrée (Mac).¶
Cliquez sur Extract string resource .¶
Illustration

Donnez un nom à la ressource. Les normes de programmation demandent d'utiliser la casse serpent pour nommer les ressources.¶
La ressource doit être ajoutée au fichier strings.xml pour chacune des localisations supportées par l'application.¶
Cochez donc chacun des dossiers de ressource présentés au bas de la fenêtre.

Illustration

Lorsque vous cliquez sur OK, il se passe deux choses :¶
la chaîne est ajoutée aux fichiers strings.xml cochés;¶
le code est automatiquement modifié pour utiliser cette ressource.¶
Jetpack Compose (Kotlin)

Text(text = stringResource(R.string.salutation_accueil))
Pour voir la nouvelle ressource dans Translations Editor, vous devrez peut-être cliquer sur l'icône de rafraîchissement.¶
Localiser les chaînes¶
Pour entrer les textes qui seront effectivement utilisés par l'application selon la langue configurée sur l'appareil mobile :

Faites un clic droit sur le fichier MonProjet/app/src/main/res/values/strings.xml puis choisissez Open Translations Editor .¶
Pour chacune des ressources, la valeur par défaut est celle qui avait été sélectionnée lors de l'extraction de la chaîne.¶
Vous pouvez la changer au besoin. C'est cette valeur qui sera utilisée si aucune des langues configurées sur l'appareil n'est pas supportée par l'application.

Entrez la chaîne à utiliser pour chacune des localisations supportées par l'application.¶
Illustration

Cette traduction sera automatiquement transposée dans le fichier strings.xml de la localisation correspondante. Pas¶
besoin d'éditer manuellement les fichiers de ressources!

Fichier MonProjet/app/main/res/values-fr-rCA/strings.xml

<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Mon projet</string>
    <string name="salutation_accueil">Bienvenue!</string>
</resources>
Pour plus d'information¶
« Localiser votre application » - Android Developers

« Localiser l'interface utilisateur avec l'éditeur de traductions » - Android Developers

* « A Deep Dive into Internationalizing Jetpack Compose Android Apps » - Phrase¶
59.2 Retrouver la configuration de localisation par programmation

Si votre application Jetpack Compose a besoin de réagir différemment selon la langue configurée sur l'appareil mobile, ou simplement d'afficher cette configuration, vous pouvez faire ceci :

Jetpack Compose (Kotlin)

val configuration = LocalConfiguration.current
val codeLocalisation = configuration.locales.get(0)   // chaîne du genre fr_CA ou en_US
Text("Langue: $codeLocalisation")   
60. Liens hypertexte¶

Liens hypertexte¶
60.1 Lien hypertexte avec buildAnnotatedString()¶
Dans une application Android avec Jetpack Compose, il est possible de créer un lien hypertexte qui permettra d'ouvrir l'URL dans un navigateur.

Jetpack Compose (Kotlin)

Text(
    buildAnnotatedString {
        withLink(
            LinkAnnotation.Url(
                "https://apical.xyz",
            )
        ) {
            append("Apical")
        }
    }
)
Et pour styler le texte du lien :

Jetpack Compose (Kotlin)

Text(
    buildAnnotatedString {
        withLink(
            LinkAnnotation.Url(
                "https://apical.xyz",
                styles = TextLinkStyles(
                    style = SpanStyle(
                        fontSize = 25.sp,
                    )
                ),
            )
        ) {
            append("Apical")
        }
    }
)
Notez qu'auparavant, on utilisait un texte enrichi avec un addStringAnnotation et le composable ClickableText. Ce composable est obsolète depuis la sortie de Compose Foundation 1.7.0 en 2024.

Jetpack Compose (Kotlin)

val texteAvecHyperlien = buildAnnotatedString {
    append("Source : Android Developers")
    addStringAnnotation(
        tag = "URL",
        annotation = "https://developer.android.com/jetpack/compose",
        start = 9, // le caractère à l'indice 9 sera le premier cliquable
        end = 27 // le caractère à l'indice 27 ne sera plus cliquable (la fin de la chaîne est à la position 26)
    )
}
ClickableText(
    text = texteAvecHyperlien,
    onClick = { offset ->
        texteAvecHyperlien.getStringAnnotations(tag = "URL", start = offset, end = offset)
            .firstOrNull()?.let { annotation ->
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(annotation.item))
                    context.startActivity(intent)    // Ouvre le lien dans un navigateur
            }
    }
)
60.2 Card()¶
La fonction modulable Card permet de regrouper des composables en les plaçant par exemple dans un rectangle stylisé.

Voici un exemple de base du Card.

Jetpack Compose (Kotlin)

Card {
    Text("Première ligne")
    Text("Deuxième ligne")
}
Illustration

Si on fait Ctrl +Clic sur le mot Card dans Android Studio, on voit que le Card est simplement un composable Surface qui contient un Column.

Dans les faits, on ajoutera souvent un Column ou un Row à l'intérieur du Card pour ajouter de l'espacement intérieur (padding).

Jetpack Compose (Kotlin)

Card {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Il est possible de modifier l'apparence du Card à l'aide de ses propriétés, par exemple sa couleur, le rayon de ses coins et sa bordure.

Jetpack Compose (Kotlin)

Card (
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.background,
    ),
    shape = RoundedCornerShape(25),
    border = BorderStroke(1.dp, Color.Black)
) {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

On peut aussi ajouter de l'élévation pour modifier légèrement le visuel.

Jetpack Compose (Kotlin)

Card (
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.background,
    ),
    shape = RoundedCornerShape(25),
    border = BorderStroke(1.dp, Color.Black),
    elevation = CardDefaults.cardElevation(10.dp)
) {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Il existe également le composable ElevatedCard qui contient une élévation par défaut.

Cette fois, pas possible de lui ajouter de bordure.

Vous remarquerez également que la couleur par défaut n'est pas la même qu'avec Card.

Jetpack Compose (Kotlin)

ElevatedCard  {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Je vous présente ici quelques exemples intéressants de configurations avec Card ou ElevatedCard.

Jetpack Compose (Kotlin)

Card(
    shape = CutCornerShape(topStart = 16.dp, bottomEnd = 8.dp) ,
) {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Jetpack Compose (Kotlin)

ElevatedCard(
    shape = RoundedCornerShape(
        topStart = 24.dp,
        topEnd = 0.dp,
        bottomStart = 0.dp,
        bottomEnd = 24.dp
    ),
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.inverseSurface
    ),
) {
    Column(
        modifier = Modifier.padding(24.dp)
    ) {
        Text("Première ligne")
        Text("Deuxième ligne")
    }
}
Illustration

Jetpack Compose (Kotlin)

Card(
    onClick = { faireQuelqueChose() } ,
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer
    )
) {
    Row(
        modifier = Modifier.padding(20.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Info, contentDescription = "info")
        Spacer(Modifier.width(16.dp))
        Text("Cliquez ici pour plus de détails.")
    }
}
Illustration

Jetpack Compose (Kotlin)

ElevatedCard(
    shape = RoundedCornerShape(20.dp),
    elevation = CardDefaults.elevatedCardElevation(defaultElevation = 8.dp),
    colors = CardDefaults.elevatedCardColors(
        containerColor = Color.Red
    ),
    modifier = Modifier.size(width = 200.dp, height = 150.dp)
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            Icons.Default.Warning,
            contentDescription = "Alerte",
            tint = Color.White,
            modifier = Modifier.size(32.dp)
        )
        Spacer(Modifier.height(8.dp))
        Text(
            text = "Attention!",
            color = Color.White
        )
    }
}
Illustration

Jetpack Compose (Kotlin)

ElevatedCard(
    elevation = CardDefaults.elevatedCardElevation(5.dp),
    modifier = Modifier.size(250.dp, 100.dp)
) {
    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        Image(
            painter = painterResource(R.drawable.versailles),
            contentDescription = "fond",
            contentScale = ContentScale.Crop,
        )
        Box(
            modifier = Modifier
                 .fillMaxSize()
                 .background(
                      Brush.verticalGradient(
                          colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.6f)),
                      )
                 )
         )
         Text(
            "Notre vision",
            color = Color.White,
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.align(Alignment.BottomStart).padding(12.dp)
         )
    }
}
Illustration

Pour plus d'information¶
* « Card » - Android Developers¶
Exercice 10

Utilisation des capteurs (Sensors)¶
75.1 Les capteurs d'un téléphone Android¶
Un téléphone Android peut être muni de capteur physiques et de capteur logiques. Les capteur logiques sont ceux dont les valeurs sont calculées à partir des valeurs d'un ou de plusieurs autres capteurs.

Parmi les capteurs qui peuvent être disponibles sur un téléphone Android, notons :

Accéléromètre¶
Gyroscope¶
Thermomètre¶
Magnétomètre¶
Capteur de proximité¶
Capteur de luminosité¶
Capteur de pression¶
Capteur d'humidité¶
Fait intéressant, depuis l'API 14, l'émulateur dans Android Studio permet de simuler les capteurs d'un téléphone.

Pour y arriver, cliquez sur les trois points verticaux dans le coin supérieur droit de la fenêtre de l'émulateur, là où on retrouve le bouton Power , afin d'ouvrir la fenêtre Extended Controls .

Illustration

L'onglet Virtual Sensors est celui qui nous intéresse ici.

Remarquez qu'il y a deux onglets dans le haut de la page : Device Pose et Additional sensors .

Illustration

Illustration

Pour plus d'information¶
* « Sensors overview » - Android Developers¶
75.2 Déclarer l'utilisation des capteurs

Lorsqu'une application utilise un capteur, elle doit en faire la déclaration dans le fichier AndroidManifest.xml que l'on retrouve dans le dossier app/src/main .

Et si ce capteur utilise des données sensibles, elle doit en plus demander une permission dans ce même fichier.

uses-feature¶
La balise uses-feature permet de préciser à Google Play que l'application utilise un capteur.

L'attribut required, s'il est à true, fera en sorte que l'application ne sera proposée que si l'appareil est équipé de ce capteur.

Si l'utilisation du capteur n'est pas requise pour que l'application fonctionne, on pourra laisser l'attribut required à false.

Fichier AndroidManifest.xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools">
    <uses-feature android:name="android.hardware.sensor.accelerometer" android:required="false" />
    <application
            ...
    </application>
</manifest>
uses-permission¶
La balise uses-permission permet de demander la permission à l'usager afin d'avoir accès à une fonctionnalité.

Si l'application utilise un capteur qui fournit des données sensibles, par exemple des données de localisation, il est requis de demander une permission d'exécution.

Fichier AndroidManifest.xml

<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
Pour plus d'information¶
« Demander l'autorisation d'accéder à la position » - Android Developers

« Understanding Sensor Rate Limitations in Android 13 » - Geeks for Geeks

75.3 Utiliser un capteur sur un téléphone Android¶
Voici les grandes lignes qui vous permettront de réagir aux changements de valeur d'un capteur.

N'oubliez pas de déclarer l'utilisation des capteurs.

Dans cette fiche :

Instancier le SensorManager¶
Enregistrer le listener lorsque l'application prend le focus¶
Initialiser une variable d'état à partir de la valeur du capteur¶
Désenregistrer le SensorManager¶
Économiser la batterie¶
Instancier le SensorManager¶
Un objet de type SensorManager doit être instancié pour accéder aux valeurs d'un capteur.

Ce travail sera effectué dans un ViewModel qui doit implémenter l'interface SensorEventListener .

Le ViewModel devra également implémenter l'interface DefaultLifecycleObserver afin de permettre de gérer les méthodes onPause et onResume (voir plus bas).

Le SensorManager sera déclaré directement dans le ViewModel et non dans le uiState puisqu'il ne s'agit pas d'une variable en lien direct avec l'interface utilisateur.

L'instanciation sera réalisée dans le constructeur (init). Ceci permet notamment de réagir si le capteur n'est pas disponible.

Notez qu'il existe d'autres techniques pour travailler avec un SensorManager. Sachez cependant que si le travail était réalisé sans prendre les précautions appropriées, on obtiendrait tôt ou tard le message d'erreur « the sensor listeners size has exceeded the maximum limit 128 », dû au fait que les variables seraient recréées à chaque fois que la vue est recomposée.

Dans le cadre de ce cours, la déclaration du SensorManager doit être réalisée dans un ViewModel.¶
Dans cet exemple, le code travaille avec le capteur de luminosité.

ViewModel (Kotlin)

class SensorViewModel(application: Application) : AndroidViewModel(application), SensorEventListener ,
DefaultLifecycleObserver {
    ...
     private val _sensorManager: SensorManager
    private val _lightSensor: Sensor?

    init {
        val context = application.applicationContext
        _sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        _lightSensor = _sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)
        if (_lightSensor == null) {
            Log.w("SensorViewModel", "Capteur de lumière non disponible sur cet appareil.")
        }
        ...
    }
    ...
}
data class SensorUiState(
    ...   // on conservera ici la ou les valeurs fournies par le capteur
) {
    ...
}
Enregistrer le listener lorsque l'application prend le focus¶
Puisque le ViewModel implémente l'interface SensorEventListener, il est possible d'enregistrer un listener qui permettra à l'application de recevoir les notifications du SensorManager lorsque les valeur du capteur changent.

De plus, puisqu'il implémente l'interface DefaultLifecycleObserver, on pourra le faire seulement lorsque l'application prend le focus et ainsi économiser la batterie de l'appareil mobile. Sans gestion du cycle de vie, ceci aurait pu être réalisé dans le init.

!!! warning "Attention : il pourr" Attention : il pourrait arriver que le capteur ne soit pas disponible sur l'appareil. C'est pourquoi le code utilise un bloc let précédé d'un opérateur d'appel sécurisé (?.). À l'intérieur de ce bloc, Kotlin est certain que l'exécution n'a eu lieu que si _lightSensor n'est pas null.

ViewModel (Kotlin)

override fun onResume(owner: LifecycleOwner) {
    _lightSensor?.let {
        _sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
    }
}
!!! warning "Attention : pour que" Attention : pour que la méthode onResume soit exécutée, un composable devra être enregistré comme observateur du cycle de vie (voir plus bas).

Initialiser une variable d'état à partir de la valeur du capteur¶
L'interface SensorEventListener exige que la fonction onSensorChanged soit définie.

C'est dans cette fonction que la ou les valeurs du capteur seront lues puis utilisées pour initialiser des propriétés du uiState.

Quant à la fonction onAccuracyChanged, elle aussi requise, on la laissera généralement à blanc.

ViewModel (Kotlin)

// Attention : si vous laissez Android Studio générer ces fonctions pour vous,
// vous aurez un paramètre de type SensorEvent ?  mais ce paramètre ne doit pas être nullable.
override fun onSensorChanged(event: SensorEvent) {
    val luminosite: Float
    if (event.sensor.type == Sensor.TYPE_LIGHT) {
        luminosite = event.values[0]
        ...
    }
}
override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
    // si on voulait réagir à un changement de précision du capteur, on mettrait le code ici.
}
Désenregistrer le SensorManager¶
Il est important de désenregistrer le SensorManager lorsque le ViewModel est détruit afin d'éviter les fuites de mémoire.

ViewModel (Kotlin)

override fun onCleared() {
  super.onCleared()
  _sensorManager.unregisterListener(this)
}
Économiser la batterie¶
Afin d'économiser la batterie de l'appareil mobile, on s'assurera que le capteur cesse ses activités quand l'application n'est pas en avant-plan.

En effet, selon la documentation officielle d'Android :

Si un écouteur de capteur est enregistré et que son activité est suspendue, le capteur continuera d'acquérir des données et d'utiliser les ressources de la batterie, sauf si vous le désenregistrez.¶
Puisque le ViewModel implémente l'interface DefaultLifecycleObserver, il est possible d'arrêter d'écouter quand l'application passe en arrière-plan puis de recommencer quand elle redevient active (le onResume a déjà été présenté plus haut).

ViewModel (Kotlin)

override fun onPause(owner: LifecycleOwner) {
    _sensorManager.unregisterListener(this)
}
Mais pour que les méthodes onPause et onResume soient exécutées, un composable devra être enregistré comme observateur du cycle de vie.

Remarquez l'utilisation de l'effet secondaire DisposableEffect qui permet d'effectuer du nettoyage lorsque le composable quitte l'écran.

Il se charge de passer des informations du cycle de vie vers l'objet qui a été passé en paramètre à lifecycleOwner.lifecycle.addObserver (ici : sensorViewModel).

Jetpack Compose (Kotlin)

import androidx.lifecycle.compose.LocalLifecycleOwner
...
@Composable
fun MonComposable() {
    val sensorViewModel: SensorViewModel = viewModel()
    val sensorUiState ...
    // ce bloc permet d'exécuter les méthodes onPause et onResume du ViewModel
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        lifecycleOwner.lifecycle.addObserver(sensorViewModel)
        onDispose {
            lifecycleOwner.lifecycle.removeObserver(sensorViewModel)
        }
    }
    // fin du bloc
    ...
}
Source :

1. * « Présentation des capteurs » - Android Developer¶
sensor-listeners

Pour plus d'information¶
« How to Implement Motion Sensor in a Kotlin App » - JetRuby Agency JetRuby Agency app-b70db1b5b8e5
* « How to Use Device Sensors the Right Way in Android - Android Studio Tutorial » - YouTube¶
Exercice 14

Optimisation des performances Compose¶
80.1 Quelques principes d'optimisation¶
...

Pour plus d'information¶
« Suivez les bonnes pratiques - Reporter les lectures le plus longtemps possible » - Android Developers
80.2 Afficher le nombre de recompostion de chaque fonction modulable¶
Avec IntelliJ, il est possible d'afficher le nombre de fois qu'une fonction modulable est recomposée. Ceci est utile pour cibler les endroits où il y a perte de performance.

Pour afficher le nombre de recompositions de chaque fonction modulable :

Ouvrez l'inspecteur de mise en page (Layout Inspector) : View / Tool Windows / Layout Inspector .¶
Dans la fenêtre Layout Inspector, cliquez sur l'icône View Options for Component Tree (en forme d'oeil) puis choisissez¶
Show Recomposition Counts .¶
Illustration

Lancez votre application dans un émulateur.¶
Naviguez dans votre application et voyez au fur et à mesure :¶
en rouge dans l'aperçu : les zones recomposées¶
à droite du nom de chaque module composable : le nombre de recompositona effectives en gris : le nombre de recompositions ignorées¶
Illustration

81. La programmation asynchrone¶

Créer une notification



Les notifications fournissent des informations courtes et opportunes sur les événements de votre application lorsqu'elle n'est pas utilisée. Ce document vous explique comment créer une notification avec différentes fonctionnalités. Pour découvrir comment les notifications s'affichent sur Android, consultez la présentation des notifications. Pour obtenir un exemple de code utilisant les notifications, consultez l'exemple SociaLite sur GitHub.

Le code de cette page utilise les API NotificationCompat de la bibliothèque AndroidX. Ces API vous permettent d'ajouter des fonctionnalités disponibles uniquement sur les versions plus récentes d'Android, tout en assurant la compatibilité avec Android 9 (niveau d'API 28). Toutefois, certaines fonctionnalités, comme l'action de réponse intégrée, n'ont aucun effet sur les versions antérieures.

Créer une notification de base
Dans sa forme la plus basique et la plus compacte, également appelée forme réduite, une notification affiche une icône, un titre et une petite quantité de contenu textuel. Cette section explique comment créer une notification sur laquelle l'utilisateur peut appuyer pour lancer une activité dans votre application.



Figure 1. Notification avec une icône, un titre et du texte.

Pour en savoir plus sur chaque partie d'une notification, consultez Anatomie d'une notification.

Déclarer l'autorisation d'exécution
Android 13 (niveau d'API 33) et versions ultérieures acceptent une autorisation d'exécution pour la publication de notifications non exemptées (y compris les services de premier plan) à partir d'une application.

L'autorisation que vous devez déclarer dans le fichier manifeste de votre application apparaît dans l'extrait de code suivant :


<manifest ...>
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
    <application ...>
        ...
    </application>
</manifest>
Pour en savoir plus sur les autorisations d'exécution, consultez Autorisation d'exécution des notifications.

Définir le contenu de la notification
Pour commencer, définissez le contenu et le canal de la notification à l'aide d'un objet NotificationCompat.Builder. L'exemple suivant montre comment créer une notification avec les éléments suivants :

Petite icône, définie par setSmallIcon(). Il s'agit du seul contenu visible par l'utilisateur qui est obligatoire.

Titre défini par setContentTitle().

Corps du texte, défini par setContentText().

Priorité de la notification, définie par setPriority(). La priorité détermine le degré d'intrusion de la notification sur Android 7.1 et versions antérieures. Pour Android 8.0 et versions ultérieures, définissez plutôt l'importance du canal comme indiqué dans la section suivante.



val textTitle = "Title"
val textContent = "Content"
val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle(textTitle)
    .setContentText(textContent)
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
Le constructeur NotificationCompat.Builder nécessite que vous fournissiez un ID de canal. Cette valeur est requise pour la compatibilité avec Android 8.0 (niveau d'API 26) et les versions ultérieures, mais elle est ignorée par les versions antérieures.

Par défaut, le contenu textuel de la notification est tronqué pour tenir sur une seule ligne. Vous pouvez afficher des informations supplémentaires en créant une notification extensible.



Figure 2. Notification à développer sous forme réduite et développée.

Si vous souhaitez que votre notification soit plus longue, vous pouvez activer une notification extensible en ajoutant un modèle de style avec setStyle(). Par exemple, le code suivant crée une zone de texte plus grande :



val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle("My notification")
    .setContentText("Much longer text that cannot fit one line...")
    .setStyle(NotificationCompat.BigTextStyle()
        .bigText("Much longer text that cannot fit one line..."))
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
Pour en savoir plus sur les autres styles de grandes notifications, y compris sur l'ajout d'une image et de commandes de lecture multimédia, consultez Créer une notification à développer.

Créer un canal et définir l'importance
Avant de pouvoir envoyer la notification sur Android 8.0 ou version ultérieure, enregistrez le canal de notification de votre application auprès du système en transmettant une instance de NotificationChannel à createNotificationChannel(). Le code suivant est bloqué par une condition sur la version SDK_INT :



fun createNotificationChannel(context: Context) {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is not in the Support Library.
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val name = context.getString(R.string.channel_name)
        val descriptionText = context.getString(R.string.channel_description)
        val importance = NotificationManager.IMPORTANCE_DEFAULT
        val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
            description = descriptionText
        }
        // Register the channel with the system.
        val notificationManager: NotificationManager =
            context.getSystemService(NotificationManager::class.java) as NotificationManager
        notificationManager.createNotificationChannel(channel)
    }
}
Étant donné que vous devez créer le canal de notification avant de publier des notifications sur Android 8.0 et versions ultérieures, exécutez ce code au démarrage de votre application. Vous pouvez l'appeler plusieurs fois sans risque, car la création d'un canal existant n'a aucun effet.

Le constructeur NotificationChannel nécessite un niveau d'importance à l'aide d'une constante NotificationManager. Cela détermine comment interrompre l'utilisateur. Pour prendre en charge Android 7.1 et les versions antérieures, définissez également la priorité avec setPriority(), comme indiqué dans l'exemple précédent.

Bien que vous deviez définir l'importance ou la priorité, le système ne garantit pas le comportement de l'alerte. Le système peut l'ajuster en fonction d'autres facteurs, et l'utilisateur peut toujours personnaliser le niveau d'importance du canal.

Pour en savoir plus sur la signification des différents niveaux, consultez Niveaux d'importance des notifications.

Définir l'action à effectuer lorsque l'utilisateur appuie sur la notification
Chaque notification doit répondre à un appui, généralement pour ouvrir une activité dans votre application qui correspond à la notification. Pour ce faire, spécifiez un intent de contenu défini avec un objet PendingIntent et transmettez-le à setContentIntent().

L'extrait suivant montre comment créer un intent de base pour ouvrir une activité lorsque l'utilisateur appuie sur la notification :



// Create an explicit intent for an Activity in your app.
val intent = Intent(context, AlertDetails::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
}
val pendingIntent: PendingIntent =
    PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE)

val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle("My notification")
    .setContentText("Hello World!")
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
    // Set the intent that fires when the user taps the notification.
    .setContentIntent(pendingIntent)
    .setAutoCancel(true)
Ce code appelle setAutoCancel(), qui supprime automatiquement la notification lorsque l'utilisateur appuie dessus.

Les indicateurs d'intention de l'exemple précédent préservent l'expérience de navigation attendue par l'utilisateur après qu'il a ouvert votre application à l'aide de la notification. Vous pouvez l'utiliser en fonction du type d'activité que vous démarrez, qui peut être l'un des suivants :

Activité qui existe exclusivement pour les réponses à la notification. Il n'y a aucune raison pour que l'utilisateur accède à cette activité lors de l'utilisation normale de l'application. L'activité démarre donc une nouvelle tâche au lieu d'être ajoutée à la pile "Retour" et à la tâche existantes de votre application. Il s'agit du type d'intent créé dans l'exemple précédent.

Une activité qui existe dans le flux d'application habituel de votre application. Dans ce cas, le démarrage de l'activité crée une pile "Retour" afin de préserver les attentes de l'utilisateur concernant les boutons "Retour" et "Haut".

Afficher la notification
Pour que la notification s'affiche, appelez NotificationManagerCompat.notify() en lui transmettant un ID unique pour la notification et le résultat de NotificationCompat.Builder.build(). Ce processus est illustré dans l'exemple suivant :



with(NotificationManagerCompat.from(context)) {
    if (ActivityCompat.checkSelfPermission(
            context,
            Manifest.permission.POST_NOTIFICATIONS
        ) != PackageManager.PERMISSION_GRANTED
    ) {
        // TODO: Consider calling ActivityCompat#requestPermissions here
        // to request the missing permissions, and then overriding
        // public fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>,
        //                                        grantResults: IntArray)
        // to handle the case where the user grants the permission. See the documentation
        // for ActivityCompat#requestPermissions for more details.

        return@with
    }
    // notificationId is a unique int for each notification that you must define.
    notify(notificationId, builder.build())
Enregistrez l'ID de la notification que vous transmettez à NotificationManagerCompat.notify(), car vous en aurez besoin lorsque vous voudrez mettre à jour ou supprimer la notification.

De plus, pour tester les notifications de base sur les appareils équipés d'Android 13 ou version ultérieure, activez les notifications manuellement ou créez une boîte de dialogue pour demander les notifications.

Remarque : Depuis Android 8.1 (niveau d'API 27), les applications ne peuvent pas émettre une notification sonore plus d'une fois par seconde. Si votre application publie plusieurs notifications en une seconde, elles s'affichent toutes comme prévu, mais seule la première notification par seconde est annoncée au moyen d'un son.
Ajouter des boutons d'action
Une notification peut proposer jusqu'à trois boutons d'action qui permettent à l'utilisateur de répondre rapidement, par exemple pour mettre en veille un rappel ou répondre à un message. Toutefois, ces boutons d'action ne doivent pas dupliquer l'action effectuée lorsque l'utilisateur appuie sur la notification.



Figure 3. Notification avec un bouton d'action.

Pour ajouter un bouton d'action, transmettez un PendingIntent à la méthode addAction(). Cela revient à configurer l'action par défaut de la notification lorsque l'utilisateur appuie dessus, sauf qu'au lieu de lancer une activité, vous pouvez effectuer d'autres actions, comme démarrer un BroadcastReceiver qui effectue une tâche en arrière-plan afin que l'action n'interrompe pas l'application déjà ouverte.

Par exemple, le code suivant montre comment envoyer une diffusion à un récepteur spécifique :



val ACTION_SNOOZE = "snooze"
val snoozeIntent = Intent(context, MyBroadcastReceiver::class.java).apply {
    action = ACTION_SNOOZE
    putExtra(EXTRA_NOTIFICATION_ID, 0)
}
val snoozePendingIntent: PendingIntent =
    PendingIntent.getBroadcast(context, 0, snoozeIntent, PendingIntent.FLAG_IMMUTABLE)
val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle("My notification")
    .setContentText("Hello World!")
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
    .setContentIntent(pendingIntent)
    .addAction(R.drawable.snooze, context.getString(R.string.snooze),
        snoozePendingIntent)
Pour en savoir plus sur la création d'un BroadcastReceiver permettant d'exécuter des tâches en arrière-plan, consultez la présentation des diffusions.

Si vous essayez plutôt de créer une notification avec des boutons de lecture multimédia, par exemple pour mettre en pause et passer des pistes, découvrez comment créer une notification avec des commandes multimédias.

Remarque : Sous Android 10 (niveau d'API 29) et versions ultérieures, la plate-forme génère automatiquement des boutons d'action de notification si une application n'en fournit pas. Si vous ne souhaitez pas que les notifications de votre application affichent des réponses ou des actions suggérées, vous pouvez désactiver les réponses et actions générées par le système à l'aide de setAllowGeneratedReplies() et setAllowSystemGeneratedContextualActions().
Ajouter une action de réponse directe
L'action de réponse directe, introduite dans Android 7.0 (niveau d'API 24), permet aux utilisateurs de saisir du texte directement dans la notification. Le texte est ensuite transmis à votre application sans ouvrir d'activité. Par exemple, vous pouvez utiliser une action de réponse directe pour permettre aux utilisateurs de répondre à des messages ou de mettre à jour des listes de tâches depuis la notification.



Figure 4. Appuyer sur le bouton "Répondre" ouvre la saisie de texte.

L'action de réponse directe s'affiche sous forme de bouton supplémentaire dans la notification qui ouvre un champ de saisie de texte. Lorsque l'utilisateur a fini de saisir du texte, le système joint la réponse textuelle à l'intent que vous spécifiez pour l'action de notification et envoie l'intent à votre application.

Ajouter le bouton de réponse
Pour créer une action de notification compatible avec la réponse directe, procédez comme suit :

Créez une instance de RemoteInput.Builder que vous pouvez ajouter à l'action de votre notification. Le constructeur de cette classe accepte une chaîne que le système utilise comme clé pour l'entrée de texte. Votre application utilise ensuite cette clé pour récupérer le texte de l'entrée.



// Key for the string that's delivered in the action's intent.
val replyLabel: String = context.resources.getString(R.string.reply_label)
val remoteInput: RemoteInput = RemoteInput.Builder(KEY_TEXT_REPLY).run {
    setLabel(replyLabel)
    build()
}
Créez un PendingIntent pour l'action de réponse.



// Build a PendingIntent for the reply action to trigger.
val replyPendingIntent: PendingIntent =
    PendingIntent.getBroadcast(context,
        conversationId,
        getMessageReplyIntent(conversationId),
        PendingIntent.FLAG_MUTABLE)
Attention : Si vous réutilisez un PendingIntent, un utilisateur peut répondre à une conversation différente de celle à laquelle il souhaitait répondre. Vous devez fournir un code de requête différent pour chaque conversation ou fournir un intent qui ne renvoie pas true lorsque vous appelez equals() sur l'intent de réponse de toute autre conversation. L'ID de conversation est souvent transmis dans le bundle d'extras de l'intention, mais il est ignoré lorsque vous appelez equals().
Associez l'objet RemoteInput à une action à l'aide de addRemoteInput().



// Create the reply action and add the remote input.
val action: NotificationCompat.Action =
    NotificationCompat.Action.Builder(R.drawable.reply,
        context.getString(R.string.reply_label), replyPendingIntent)
        .addRemoteInput(remoteInput)
        .build()
Appliquez l'action à une notification et envoyez la notification.


// Build the notification and add the action.
val newMessageNotification = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_message)
    .setContentTitle(context.getString(R.string.title))
    .setContentText(context.getString(R.string.content))
    .addAction(action)
    .build()

// Issue the notification.
NotificationManagerCompat.from(context).notify(notificationId, newMessageNotification)
Le système invite l'utilisateur à saisir une réponse lorsqu'il déclenche l'action de notification, comme illustré à la figure 4.

Récupérer l'entrée utilisateur à partir de la réponse
Pour recevoir l'entrée utilisateur à partir de l'UI de réponse de la notification, appelez RemoteInput.getResultsFromIntent() en lui transmettant le Intent reçu par votre BroadcastReceiver :



private fun getMessageText(intent: Intent): CharSequence? {
    return RemoteInput.getResultsFromIntent(intent)?.getCharSequence(KEY_TEXT_REPLY)
}
Une fois le texte traité, mettez à jour la notification en appelant NotificationManagerCompat.notify() avec le même ID et le même tag, le cas échéant. Cela est nécessaire pour masquer l'UI de réponse directe et confirmer à l'utilisateur que sa réponse a été reçue et traitée correctement.



// Build a new notification, which informs the user that the system
// handled their interaction with the previous notification.
val repliedNotification = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.message)
    .setContentText(context.getString(R.string.replied))
    .build()

// Issue the new notification.
NotificationManagerCompat.from(context).notify(notificationId, repliedNotification)
Récupérer d'autres données
Le traitement des autres types de données fonctionne de la même manière avec RemoteInput. L'exemple suivant utilise une image comme entrée.



val replyLabel: String = context.resources.getString(R.string.reply_label)
val remoteInput: RemoteInput = RemoteInput.Builder(KEY_REPLY).run {
    setLabel(replyLabel)
    // Allow for image data types in the input.
    // This method can be used again to allow for other data types.
    setAllowDataType("image/*", true)
    build()
}
Appelez RemoteInput#getDataResultsFromIntent et extrayez les données correspondantes.



class ReplyReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val dataResults = RemoteInput.getDataResultsFromIntent(intent, KEY_REPLY)
        val imageUri: Uri? = dataResults?.get("image/*") as? Uri

        if (imageUri != null) {
            // Extract the image
            context.contentResolver.openInputStream(imageUri)?.use { inputStream ->
                val bitmap = BitmapFactory.decodeStream(inputStream)
                // Display the image
                // ...
            }
        }
    }

    companion object {
        const val KEY_REPLY = "key_reply"
        const val KEY_TEXT_REPLY = "key_text_reply"
    }
}
Lorsque vous utilisez cette nouvelle notification, utilisez le contexte transmis à la méthode onReceive() du récepteur.

Ajoutez la réponse en bas de la notification en appelant setRemoteInputHistory(). Toutefois, si vous créez une application de chat, créez une notification de style message et ajoutez le nouveau message à la conversation.

Pour obtenir d'autres conseils sur les notifications des applications de messagerie, consultez la section sur les bonnes pratiques pour les applications de messagerie.

Afficher un message urgent
Votre application peut avoir besoin d'afficher un message urgent et sensible au facteur temps, comme un appel téléphonique entrant ou une alarme qui sonne. Dans ces situations, vous pouvez associer une intention plein écran à votre notification.

Attention : Les notifications contenant des intents plein écran sont très intrusives. Il est donc important de n'utiliser ce type de notification que pour les messages les plus urgents et les plus sensibles au facteur temps.
Lorsque la notification est déclenchée, les utilisateurs voient l'un des éléments suivants, en fonction de l'état de verrouillage de l'appareil :

Si l'appareil de l'utilisateur est verrouillé, une activité en plein écran s'affiche et recouvre l'écran de verrouillage.
Si l'appareil de l'utilisateur est déverrouillé, la notification s'affiche sous forme développée et inclut des options permettant de la gérer ou de l'ignorer.
Remarque : Si votre application cible Android 10 (niveau d'API 29) ou version ultérieure, vous devez demander l'autorisation USE_FULL_SCREEN_INTENT dans le fichier manifeste de votre application pour que le système puisse lancer l'activité plein écran associée à la notification urgente.
L'extrait de code suivant montre comment associer votre notification à un intent en plein écran :



val fullScreenIntent = Intent(context, ImportantActivity::class.java)
val fullScreenPendingIntent = PendingIntent.getActivity(context, 0,
    fullScreenIntent, PendingIntent.FLAG_IMMUTABLE)

val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle("My notification")
    .setContentText("Hello World!")
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
    .setFullScreenIntent(fullScreenPendingIntent, true)
Définir la visibilité de l'écran de verrouillage
Pour contrôler le niveau de détail visible dans la notification depuis l'écran de verrouillage, appelez setVisibility() et spécifiez l'une des valeurs suivantes :

VISIBILITY_PUBLIC : le contenu complet de la notification s'affiche sur l'écran de verrouillage.

VISIBILITY_SECRET : aucune partie de la notification ne s'affiche sur l'écran de verrouillage.

VISIBILITY_PRIVATE : seules les informations de base, telles que l'icône de la notification et le titre du contenu, s'affichent sur l'écran de verrouillage. Le contenu complet de la notification ne s'affiche pas.

Lorsque vous définissez VISIBILITY_PRIVATE, vous pouvez également fournir une version alternative du contenu de la notification qui masque certains détails. Par exemple, une application de SMS peut afficher une notification indiquant "Vous avez reçu trois nouveaux messages", mais en masquant le contenu des messages et les expéditeurs. Pour fournir cette autre notification, commencez par créer la notification alternative avec NotificationCompat.Builder comme d'habitude. Ensuite, associez la notification alternative à la notification normale avec setPublicVersion().

N'oubliez pas que l'utilisateur a toujours le contrôle ultime sur la visibilité de ses notifications sur l'écran de verrouillage et qu'il peut les contrôler en fonction des canaux de notification de votre application.

Modifier une notification
Pour mettre à jour une notification après l'avoir envoyée, appelez de nouveau NotificationManagerCompat.notify() en lui transmettant le même ID que celui utilisé précédemment. Si la notification précédente est ignorée, une nouvelle notification est créée à la place.

Vous pouvez éventuellement appeler setOnlyAlertOnce() pour que votre notification interrompe l'utilisateur (avec un son, une vibration ou des indices visuels) uniquement la première fois qu'elle s'affiche, et non pour les mises à jour ultérieures.

Attention : Android applique une limite de fréquence lors de la mise à jour d'une notification. Si vous publiez trop rapidement des mises à jour dans une notification (plusieurs en moins d'une seconde), le système peut abandonner certaines mises à jour.
Supprimer une notification
Les notifications restent visibles jusqu'à ce que l'un des événements suivants se produise :

L'utilisateur ignore la notification.
L'utilisateur appuie sur la notification si vous appelez setAutoCancel() lorsque vous créez la notification.
Vous appelez cancel() pour un ID de notification spécifique. Cette méthode supprime également les notifications en cours.
Vous appelez cancelAll(), ce qui supprime toutes les notifications que vous avez émises précédemment.
La durée spécifiée s'écoule si vous définissez un délai avant expiration lors de la création de la notification à l'aide de setTimeoutAfter(). Si nécessaire, vous pouvez annuler une notification avant l'expiration du délai spécifié.
Bonnes pratiques pour les applications de messagerie
Tenez compte des bonnes pratiques listées ici lorsque vous créez des notifications pour vos applications de messagerie et de chat.

Utiliser MessagingStyle
À partir d'Android 7.0 (niveau d'API 24), Android fournit un modèle de style de notification spécifiquement pour le contenu de messagerie. La classe NotificationCompat.MessagingStyle vous permet de modifier plusieurs libellés affichés dans la notification, y compris le titre de la conversation, les messages supplémentaires et la vue du contenu de la notification.

L'extrait de code suivant montre comment personnaliser le style d'une notification à l'aide de la classe MessagingStyle.



val message1 = NotificationCompat.MessagingStyle.Message(
    messages[0].text,
    messages[0].time,
    messages[0].sender
)
val message2 = NotificationCompat.MessagingStyle.Message(
    messages[1].text,
    messages[1].time,
    messages[1].sender
)
notification = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setStyle(
        NotificationCompat.MessagingStyle(Person.Builder().setName("Me").build())
            .addMessage(message1)
            .addMessage(message2)
    )
    .build()
À partir d'Android 9.0 (niveau d'API 28), il est également nécessaire d'utiliser la classe Person pour obtenir un rendu optimal de la notification et de ses avatars.

Lorsque vous utilisez NotificationCompat.MessagingStyle, procédez comme suit :

Appelez MessagingStyle.setConversationTitle() pour définir un titre pour les discussions de groupe avec plus de deux personnes. Un bon titre de conversation peut être le nom du chat de groupe ou, s'il n'en a pas, la liste des participants à la conversation. Sans cela, le message pourrait être confondu avec une conversation privée avec l'expéditeur du message le plus récent de la conversation.
Utilisez la méthode MessagingStyle.setData() pour inclure des messages multimédias tels que des images. Les types MIME de l'image de motif/* sont acceptés.
Utiliser la réponse directe
La réponse directe permet à un utilisateur de répondre directement à un message.

Une fois qu'un utilisateur a répondu à l'aide de l'action de réponse intégrée, utilisez MessagingStyle.addMessage() pour mettre à jour la notification MessagingStyle. Ne retirez ni n'annulez la notification. Si vous n'annulez pas la notification, l'utilisateur peut envoyer plusieurs réponses à partir de la notification.
Pour rendre l'action de réponse intégrée compatible avec Wear OS, appelez Action.WearableExtender.setHintDisplayInlineAction(true).
Utilisez la méthode addHistoricMessage() pour fournir du contexte à une conversation de réponse directe en ajoutant des messages historiques à la notification.
Activer les réponses suggérées
Pour activer la réponse suggérée, appelez setAllowGeneratedResponses(true) sur l'action de réponse. Cela permet aux utilisateurs de disposer des réponses suggérées lorsque la notification est transférée vers un appareil Wear OS. Les réponses suggérées sont générées par un modèle de machine learning entièrement intégré à la montre, qui utilise le contexte fourni par la notification NotificationCompat.MessagingStyle. Aucune donnée n'est importée sur Internet pour générer les réponses.
Ajouter des métadonnées de notification
Attribuez des métadonnées de notification pour indiquer au système comment gérer les notifications de votre application lorsque l'appareil est en mode Ne pas déranger. Par exemple, utilisez la méthode addPerson() ou setCategory(Notification.CATEGORY_MESSAGE) pour remplacer le mode Ne pas déranger.
