import type { Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   ACCUEIL — présentation du cours + règles (IA réduite à une diapo)
   ════════════════════════════════════════════════════════════════════ */
const I = 'intro'

export const INTRO: Slide[] = [
  { kind: 'cover', chapter: I, title: 'POO en Java' },
  {
    kind: 'content', chapter: I, section: 'Rappel de la séance précédente', title: '**Regardez autour de vous**',
    blocks: [
      {
        k: 'flow', steps: [
          { label: 'Monde réel', sub: 'étudiants, salle…' },
          { label: '**Abstraction**', sub: 'garder l\'utile' },
          { label: '**Modèle**', sub: 'état + comportement' },
          { label: '**Classe** Java', sub: 'le coder' },
        ],
      },
      {
        k: 'cols', ratio: 1.1,
        left: [
          {
            k: 'list', items: [
              'On a regardé **autour de nous** : étudiants, enseignant, **salle**, ordinateur, cours.',
              'Chaque chose a un **état** et un **comportement**.',
              'On ne garde que ce qui est **utile** à notre problème.',
              'Un **modèle** n\'est pas une personne : **modèle ≠ Sarra ≠ Ahmed**.',
            ],
          },
        ],
        right: [{
          k: 'code', small: true, file: 'Etudiant.java', code: `
class Etudiant {
    String nom;
    String matricule;
    double moyenne;
    int niveau;
    // méthodes : sInscrire(),
    // calculerMoyenne(), afficherProfil()
}`,
        }],
      },
      { k: 'box', tone: 'retenir', title: 'Notre objectif', text: '**Comprendre** un problème, le **modéliser**, puis le **coder** en Java.' },
    ],
  },
  {
    kind: 'content', chapter: I, section: 'Rappel de la séance précédente', title: 'Quiz 1 : **abstraction**',
    blocks: [{
      k: 'quiz', question: 'Pour modéliser un étudiant dans notre application, que garde l\'**abstraction** ?',
      options: [
        'Toutes les caractéristiques de l\'étudiant réel',
        'Seulement ce qui est **utile** à notre problème',
        'Seulement ses méthodes',
        'Seulement ses attributs `private`',
      ],
      correct: 1,
      explication: 'On **filtre** : pour gérer les notes, la **couleur des yeux** ne sert à rien. Le **modèle** garde l\'utile et jette le reste.',
    }],
  },
  {
    kind: 'content', chapter: I, section: 'Rappel de la séance précédente', title: 'Quiz 2 : **classe** ou **objet** ?',
    blocks: [{
      k: 'quiz', question: 'Pour représenter **Sarra**, **Ahmed** et **Lina**, combien de **classes** écrit-on ?',
      options: [
        '3 classes : une par étudiant',
        '**1 classe** `Etudiant`, et 3 objets',
        '1 classe et 1 seul objet',
        '3 classes et 1 objet',
      ],
      correct: 1,
      explication: 'La **classe** est le **plan** ; chaque étudiant est une **instance** (un **objet**) créée avec `new`.',
    }],
  },
  {
    kind: 'content', chapter: I, title: 'Organisation du cours',
    blocks: [
      {
        k: 'table',
        head: ['Chapitre', 'Contenu', 'Objectif'],
        rows: [
          ['**1. Introduction**', 'JVM, compilation, types, casts', 'Écrire et exécuter un **premier programme**'],
          ['**2. Classes et objets**', 'Classe, objet, constructeur, `this`, `static`, encapsulation', 'Modéliser un problème avec des **objets**'],
          ['**3. Héritage**', '`extends`, polymorphisme, classes abstraites, interfaces', '**Réutiliser** et **étendre** du code'],
        ],
      },
      {
        k: 'list', items: [
          'Chaque diapo = **une seule idée**.',
          'Les exercices ont une **solution cachée** : on cherche d\'abord, on vérifie ensuite.',
          'Le code présenté **compile** : recopiez-le et testez-le dans votre IDE.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: I, title: 'Outils et IA : les règles du cours',
    blocks: [
      {
        k: 'cols', ratio: 1,
        left: [
          { k: 'p', text: '**Pour apprendre Java, on écrit le code soi-même.**' },
          {
            k: 'list', items: [
              'IDE conseillé : **IntelliJ IDEA** ou **VS Code** + **JDK 21**.',
              'Les assistants IA sont autorisés **pour comprendre** une erreur ou une notion.',
              'Ils ne remplacent **pas** votre travail en TP ni à l\'examen.',
            ],
          },
        ],
        right: [
          {
            k: 'box', tone: 'retenir', title: 'Une seule règle',
            text: 'Toute ligne de code que vous rendez, vous devez pouvoir **l\'expliquer**.',
          },
          {
            k: 'box', tone: 'attention',
            text: 'À l\'examen : **pas d\'IA, pas d\'Internet**. Entraînez-vous donc **sans** assistant.',
          },
        ],
      },
    ],
  },
]

/* ════════════════════════════════════════════════════════════════════
   CHAPITRE 1 — Introduction au langage Java
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch1'

export const CH1: Slide[] = [
  {
    kind: 'chapter', chapter: C, number: '1', title: 'Introduction au langage Java',
    goals: [
      'Historique et **caractéristiques** de Java',
      'Les **éditions** : SE, EE, ME',
      '**JDK**, **JVM** et **bytecode**',
      'Compiler avec `javac`, exécuter avec `java`',
      '**IDE**, **JDK** et **JRE** : les outils',
      'Identificateurs, commentaires',
      '**Types primitifs** et **casts**',
      '**Variables**, constantes, **opérateurs**',
      '**Lecture** et écriture à la console',
      '`if`, `switch` et **boucles**',
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.1 Présentation', title: 'Un peu d\'histoire',
    blocks: [
      {
        k: 'table',
        head: ['Année', 'Événement'],
        rows: [
          ['**1991**', 'Naissance de Java : **James Gosling**, chez **Sun Microsystems**.'],
          ['But initial', 'Étudier la convergence entre **systèmes embarqués** et **ordinateurs**.'],
          ['**1993**', 'Essor d\'**Internet** : Java permet d\'exécuter des programmes dans des pages HTML, **quelle que soit la machine**.'],
          ['Aujourd\'hui', 'Java appartient à **Oracle** ; son évolution est gérée par le **JCP** (Java Community Process).'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.2 Présentation', title: 'Caractéristiques de Java',
    blocks: [
      {
        k: 'list', items: [
          'Langage **orienté objet** : tout programme contient **au moins une classe**.',
          'Syntaxe **très proche du C** : `if`, `for`, `while`, `{ }`, `;`',
          '**Portable / multiplateforme** : le code est exécuté par une machine virtuelle, la **JVM**.',
          '**Programmation concurrente** : plusieurs tâches en parallèle (multi-thread).',
          '**Sûr** : **fortement typé**, avec des vérifications au chargement et à l\'exécution des classes.',
        ],
      },
      {
        k: 'box', tone: 'retenir', title: 'Le slogan de Java',
        text: '**« Write once, run everywhere »** : on compile une fois, le programme tourne sur toute machine qui possède une JVM.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.3 Présentation', title: 'Les trois éditions de Java',
    blocks: [
      {
        k: 'table',
        head: ['Édition', 'Pour quoi ?', 'Exemples'],
        rows: [
          ['**Java SE** (Standard Edition)', 'Applications **desktop**, base du langage', 'Ce cours'],
          ['**Java EE** (Enterprise Edition)', 'Applications **serveur**', 'Servlet, JSP, JSF, EJB, JMS, JavaMail'],
          ['**Java ME** (Micro Edition)', '**Mobiles** et objets embarqués', 'Java SE moins certains paquetages'],
        ],
      },
      {
        k: 'cols',
        left: [{ k: 'box', tone: 'info', title: 'Dans ce cours', text: 'On travaille uniquement avec **Java SE** : le **langage**, la **JVM** et les **API** de base.' }],
        right: [{ k: 'box', tone: 'retenir', title: 'Bon à savoir', text: '**Java EE** et **Java SE** partagent le même langage. Java EE s\'appelle aujourd\'hui **Jakarta EE**.' }],
      },
      { k: 'p', text: 'Java **n\'est pas normalisé** : il évolue via le **JCP** (Java Community Process), où Oracle a un rôle important.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.4 Présentation', title: 'Que contient « Java » ?',
    blocks: [
      {
        k: 'flow', steps: [
          { label: 'Le langage', sub: 'la syntaxe que l\'on écrit' },
          { label: 'La JVM', sub: 'la machine virtuelle qui **exécute** le code' },
          { label: 'Les API', sub: 'les bibliothèques, regroupées en **paquetages**' },
        ],
      },
      {
        k: 'table', small: true,
        head: ['Sigle', 'Contient', 'Sert à'],
        rows: [
          ['**JVM** (Java Virtual Machine)', 'le moteur d\'exécution', '**exécuter** le **bytecode** (fichiers `.class`)'],
          ['**JRE** (Java Runtime Environment)', '**JVM** + bibliothèques de classes (**API**)', '**exécuter** un programme Java'],
          ['**JDK** (Java Development Kit)', '**JRE** + outils : `javac`, `java`, `javadoc`, `jar`…', '**développer** et exécuter'],
        ],
      },
      { k: 'box', tone: 'retenir', title: 'JDK ⊃ JRE ⊃ JVM', text: 'Pour ce cours, on installe le **JDK** : il contient tout le reste.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.4 Présentation', title: 'La **JVM** : que fait-elle ?',
    blocks: [
      { k: 'p', text: 'La **JVM** est le programme qui **exécute** le bytecode. Quand on tape `java Salem`, c\'est elle qui travaille.' },
      {
        k: 'table',
        head: ['Étape', 'Rôle'],
        rows: [
          ['**1. Chargeur de classes**', '**charge** les fichiers `.class` en mémoire, quand on en a besoin'],
          ['**2. Vérificateur de bytecode**', '**contrôle** le bytecode avant de l\'exécuter : c\'est ce qui rend Java **sûr**'],
          ['**3. Exécution**', 'l\'**interpréteur** exécute le bytecode ; le compilateur **JIT** transforme en code machine les parties les plus utilisées'],
          ['**4. Ramasse-miettes** (*garbage collector*)', '**libère la mémoire** des objets que plus aucune variable ne référence'],
        ],
      },
      { k: 'box', tone: 'info', text: 'En Java, on **ne libère pas** soi-même la mémoire : le **ramasse-miettes** s\'en charge.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.4 Présentation', title: 'Quiz : **JDK**, **JRE** ou **JVM** ?',
    blocks: [{
      k: 'quiz', question: 'Pour **compiler et exécuter** vos programmes, que faut-il installer ?',
      options: [
        'La **JVM** seule',
        'Le **JRE** seul',
        'Le **JDK**',
        'Les **API** seules',
      ],
      correct: 2,
      explication: 'Le **JDK** contient le **JRE**, qui contient la **JVM** : il apporte en plus `javac` pour **compiler**.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '1.4 Présentation', title: '`javac` : le **compilateur**',
    blocks: [
      {
        k: 'list', items: [
          '`javac` **lit** le fichier `.java` et **vérifie** la syntaxe et les **types**.',
          'Tout va bien : il **crée** le fichier `.class` (le **bytecode**).',
          'Une erreur : il **affiche** le message et ne crée **pas** le `.class`.',
        ],
      },
      {
        k: 'code', small: true, file: 'Terminal', code: 'javac Test.java',
        output: 'Test.java:3: error: incompatible types: String cannot be converted to int\n        int x = "abc";\n                ^\n1 error',
      },
      { k: 'box', tone: 'retenir', text: '**Erreur de compilation** : détectée **avant** de lancer le programme, grâce au **typage fort**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.4 Présentation', title: 'Le **bytecode** : un code portable',
    blocks: [
      {
        k: 'flow', steps: [
          { label: 'Salem.java', sub: 'écrit **une fois**' },
          { label: '`javac`', sub: 'compile **une fois**' },
          { label: 'Salem.class', sub: 'le **même** bytecode' },
          { label: 'JVM', sub: 'Windows, Linux, macOS…' },
        ],
      },
      {
        k: 'list', items: [
          'Le **bytecode** n\'est **pas** du code machine : il est exécuté par une **JVM**.',
          'Chaque système a **sa** JVM ; le fichier `.class` est le **même** partout.',
          'D\'où le slogan : **« write once, run anywhere »**.',
        ],
      },
      { k: 'box', tone: 'info', text: 'Tout fichier `.class` commence par le nombre `CAFEBABE` (en hexadécimal) : c\'est ce que la **JVM** vérifie en premier.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.4 Présentation', title: 'Quiz : **compilation** ou **exécution** ?',
    blocks: [{
      k: 'quiz', question: 'Où cette erreur est-elle **détectée** ?',
      code: `
public class Test {
    public static void main(String[] args) {
        int x = "abc";
    }
}`,
      options: [
        'À la **compilation**, par `javac`',
        "À l'**exécution**, par la JVM",
        'Nulle part : `x` vaut 0',
        'Au chargement de la classe',
      ],
      correct: 0,
      explication: 'Java est **fortement typé** : `javac` refuse d\'affecter un `String` à un `int`, et ne crée **aucun** `.class`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '1.5 Outils de développement', title: 'De quoi a-t-on besoin pour **développer** ?',
    blocks: [
      {
        k: 'flow', steps: [
          { label: '**Éditeur** ou **IDE**', sub: 'on **écrit** le code' },
          { label: '**JDK**', sub: '`javac` **compile**' },
          { label: '**JVM**', sub: '`java` **exécute**' },
        ],
      },
      {
        k: 'list', items: [
          'Un **JDK** : pour **compiler** et **exécuter** (c\'est lui qui contient `javac`).',
          'Un **éditeur** de code, ou mieux un **IDE**, pour **écrire** le programme.',
          'Un **terminal** : pour lancer `javac` et `java` à la main, et comprendre ce que fait l\'IDE.',
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Sans **JDK**, pas de compilation : un IDE **seul** ne suffit pas.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.5 Outils de développement', title: '**JDK** ou **JRE** : lequel installer ?',
    blocks: [
      {
        k: 'table',
        head: ['', '**JRE**', '**JDK**'],
        rows: [
          ['**Exécuter** un programme Java', '✓', '✓'],
          ['**Compiler** (`javac`)', '✗', '✓'],
          ['Outils (`javadoc`, `jar`, `jdb`…)', '✗', '✓'],
          ['Pour qui ?', 'l\'**utilisateur** d\'un programme', 'le **développeur**'],
        ],
      },
      {
        k: 'cols',
        left: [{ k: 'box', tone: 'retenir', title: 'Dans ce cours', text: 'On installe le **JDK** (version **21**) : il contient aussi de quoi **exécuter**.' }],
        right: [{ k: 'box', tone: 'info', title: 'Aujourd\'hui', text: 'Depuis **Java 11**, on installe en pratique le **JDK** : un **JRE** séparé n\'est plus fourni par défaut.' }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.5 Outils de développement', title: 'Que contient le **JDK** ?',
    blocks: [
      {
        k: 'table',
        head: ['Outil', 'Rôle'],
        rows: [
          ['`javac`', 'le **compilateur** : `.java` → `.class`'],
          ['`java`', 'lance la **JVM** : **exécute** le bytecode'],
          ['`javadoc`', 'génère la **documentation** à partir des commentaires `/** … */`'],
          ['`jar`', 'regroupe des `.class` dans une **archive** `.jar`'],
          ['`jdb`', 'le **débogueur** en ligne de commande'],
        ],
      },
      { k: 'box', tone: 'info', text: 'Un **IDE** appelle ces outils **pour vous**. Les connaître permet de **comprendre** ce qu\'il fait.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.5 Outils de développement', title: 'Les **IDE**',
    blocks: [
      { k: 'p', text: 'Un **IDE** (*Integrated Development Environment*) regroupe, dans **un seul** logiciel, les outils du développeur.' },
      {
        k: 'cols',
        left: [{
          k: 'list', items: [
            '**éditeur** avec coloration et **autocomplétion** ;',
            '**erreurs** signalées pendant la frappe ;',
            '**compiler** et **exécuter** en un clic ;',
            '**débogueur** pas à pas ;',
            'gestion du **projet** (fichiers, paquetages).',
          ],
        }],
        right: [{
          k: 'table', small: true,
          head: ['IDE', 'Remarque'],
          rows: [
            ['**IntelliJ IDEA**', 'conseillé dans ce cours'],
            ['**Eclipse**', 'très répandu, gratuit'],
            ['**NetBeans**', 'gratuit, maintenu par Apache'],
            ['**VS Code**', 'éditeur + extensions Java'],
          ],
        }],
      },
      { k: 'box', tone: 'attention', text: 'Un IDE **s\'appuie sur un JDK** : il ne le **remplace pas**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.5 Outils de développement', title: '**Vérifier** l\'installation',
    blocks: [
      {
        k: 'code', small: true, file: 'Terminal', code: 'java -version\njavac -version',
        output: 'openjdk version "21.0.2" …\njavac 21.0.2',
      },
      {
        k: 'list', items: [
          'Les **deux** commandes doivent répondre. Le **numéro** dépend de votre version.',
          '`javac` introuvable : le **JDK** n\'est pas installé, ou son dossier `bin` n\'est pas dans le **`PATH`**.',
          '`java` répond mais pas `javac` : vous avez un **JRE**, pas un JDK.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1.5 Outils de développement', title: 'Quiz : **IDE** et **JDK**',
    blocks: [{
      k: 'quiz', question: 'Vous installez **IntelliJ IDEA** mais **aucun JDK**. Que se passe-t-il ?',
      options: [
        'Tout fonctionne : l\'IDE **contient** le compilateur',
        'Vous ne pouvez **pas compiler** : il faut un **JDK**',
        'Vous pouvez compiler, mais **pas exécuter**',
        'Java ne fonctionne que **dans le terminal**',
      ],
      correct: 1,
      explication: 'Un **IDE** n\'est qu\'un **outil de confort** : la compilation est faite par **`javac`**, qui est dans le **JDK**.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '2. Premier programme', title: 'Le fichier `Salem.java`',
    blocks: [
      {
        k: 'cols', ratio: 1.15,
        left: [
          {
            k: 'code', file: 'Salem.java', code: `
public class Salem {
    public static void main(String[] args) {
        System.out.println("Salem");
    }
}`, output: 'Salem',
          },
        ],
        right: [
          {
            k: 'list', items: [
              'Java est **purement objet** : tout est dans une **classe**.',
              'Le programme démarre par la méthode **`main`**.',
              '`System.out.println` affiche une ligne.',
            ],
          },
          {
            k: 'box', tone: 'attention',
            text: 'Classe **`public`** ⇒ le fichier porte **exactement le même nom** : `Salem.java` (majuscules comprises).',
          },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Premier programme', title: 'Quiz : le **nom du fichier**',
    blocks: [{
      k: 'quiz', question: 'On enregistre ce code dans `salem.java`, puis on tape `javac salem.java`. Que se passe-t-il ?',
      code: `
public class Salem {
    public static void main(String[] args) {
        System.out.println("Salem");
    }
}`,
      options: [
        'Il compile **normalement**',
        '**Erreur** : la classe `public Salem` doit être dans `Salem.java`',
        "Il compile, mais **erreur à l'exécution**",
        'Il crée le fichier `salem.class`',
      ],
      correct: 1,
      explication: 'Une classe **`public`** doit être dans un fichier **du même nom**, **majuscules comprises** : `Salem.java`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '2. Premier programme', title: 'Compiler puis exécuter',
    blocks: [
      {
        k: 'flow', steps: [
          { label: '`Salem.java`', sub: 'code source' },
          { label: '`javac`', sub: '**compilateur** (fourni dans le JDK)' },
          { label: '`Salem.class`', sub: '**bytecode**' },
          { label: '`java`', sub: 'lance la **JVM**' },
          { label: '`Salem`', sub: 'affiché à l\'écran' },
        ],
      },
      {
        k: 'code', file: 'Terminal', code: `
javac Salem.java     // crée Salem.class dans le même dossier
java Salem           // nom de la CLASSE, sans .class`,
      },
      {
        k: 'box', tone: 'attention',
        text: 'On écrit `java Salem` et **non** `java Salem.class`.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Premier programme', title: 'Quiz : **lancer** le programme',
    blocks: [{
      k: 'quiz', question: 'Le programme est déjà compilé. Quelle commande le **lance** ?',
      options: [
        '`java Salem`',
        '`java Salem.class`',
        '`javac Salem.java`',
        '`javac Salem`',
      ],
      correct: 0,
      explication: '`java` + le **nom de la classe**, **sans** suffixe. `javac` sert à **compiler**, pas à exécuter.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '2. Premier programme', title: 'Architecture d\'une application Java',
    blocks: [
      {
        k: 'list', items: [
          'Une application = **un ensemble de fichiers** `.java`.',
          'Chaque fichier `.java` contient **une ou plusieurs classes**.',
          '**Au plus une classe `public`** par fichier, et le fichier porte **son nom**.',
          'À la compilation, **chaque classe** produit **son propre** fichier `.class`.',
        ],
      },
      {
        k: 'box', tone: 'retenir',
        text: '1 fichier `.java` → **autant de `.class` que de classes**.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Premier programme', title: 'Exemple : la classe `Point`',
    blocks: [
      {
        k: 'cols', ratio: 1.5,
        left: [
          {
            k: 'code', small: true, file: 'Point.java', code: `
/** Modélise un point de coordonnées x, y */
public class Point {
    private int x, y;
    public Point(int x1, int y1) { x = x1; y = y1; }

    public double distance(Point p) {
        int dx = x - p.x, dy = y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

/** Teste la classe Point */
class TestPoint {
    public static void main(String[] args) {
        Point p1 = new Point(1, 2);
        Point p2 = new Point(5, 1);
        System.out.println("Distance : " + p1.distance(p2));
    }
}`,
          },
        ],
        right: [
          {
            k: 'list', items: [
              '`javac Point.java` produit **2 fichiers** : `Point.class` et `TestPoint.class`.',
              'On exécute la classe qui contient **`main`** :',
            ],
          },
          { k: 'code', code: 'java TestPoint', output: 'Distance : 4.123105625617661', small: true },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Éléments de base', title: 'Les identificateurs',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'p', text: '**Règles** (sinon : erreur de compilation)' },
          {
            k: 'list', items: [
              'Longueur **quelconque**.',
              'Commence par une **lettre** (ou `_`).',
              'Puis lettres, **chiffres** ou `_`.',
              'Ne doit **pas** être un **mot-clé**, ni `true`, `false`, `null`.',
            ],
          },
        ],
        right: [
          { k: 'p', text: '**Conventions** (bonnes pratiques)' },
          {
            k: 'table', small: true,
            head: ['Élément', 'Style', 'Exemple'],
            rows: [
              ['Classe', '**Majuscule** au début', '`Cercle`, `UneClasse`'],
              ['Méthode, variable', 'minuscule, puis **Majuscule** à chaque mot', '`uneMethode`, `nbPoints`'],
              ['Constante', '**TOUT_EN_MAJUSCULES**', '`UNE_CONSTANTE`'],
            ],
          },
          { k: 'p', text: 'Des **noms** pour les classes, des **verbes** pour les méthodes.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Éléments de base', title: 'Les commentaires',
    blocks: [
      {
        k: 'table',
        head: ['Type', 'Syntaxe'],
        rows: [
          ['Sur **une seule ligne**', '`// voici un commentaire`'],
          ['Sur **plusieurs lignes**', '`/* ... */`'],
          ['**Documentation** (outil `javadoc`)', '`/** ... */`'],
        ],
      },
      {
        k: 'code', code: `
/**
 * Calcule la distance entre ce point et le point p.
 */
public double distance(Point p) {
    /* formule de Pythagore */
    return Math.sqrt(dx * dx + dy * dy);   // résultat en double
}`,
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Éléments de base', title: 'Les types primitifs',
    blocks: [
      {
        k: 'table', small: true,
        head: ['Type', 'Nature', 'Taille', 'Valeur par défaut'],
        rows: [
          ['`boolean`', 'Booléen : `true` ou `false`', '—', '`false`'],
          ['`byte`', 'Entier signé', '**8** bits', '`0`'],
          ['`short`', 'Entier signé', '**16** bits', '`0`'],
          ['`int`', 'Entier signé', '**32** bits', '`0`'],
          ['`long`', 'Entier signé', '**64** bits', '`0`'],
          ['`float`', 'Réel (IEEE 754)', '**32** bits', '`0.0`'],
          ['`double`', 'Réel (IEEE 754)', '**64** bits', '`0.0`'],
          ['`char`', 'Caractère **Unicode**', '**16** bits', '`\'\\u0000\'`'],
        ],
      },
      {
        k: 'box', tone: 'attention',
        text: 'Suffixes obligatoires : `float f = 12.3f;` et `long l = 5000000000L;`',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Éléments de base', title: 'Quiz : **valeurs par défaut**',
    blocks: [{
      k: 'quiz', question: 'Les attributs ne sont pas initialisés. Qu\'affiche ce programme ?',
      code: `
class T {
    int n;
    boolean b;
    double d;
}

T t = new T();
System.out.println(t.n + " " + t.b + " " + t.d);`,
      options: [
        '`0 false 0`',
        '`0 false 0.0`',
        '`null null null`',
        'Erreur de compilation',
      ],
      correct: 1,
      explication: 'Un attribut **non initialisé** prend la valeur par défaut de son type : `0` pour `int`, `0.0` pour `double`, `false` pour `boolean`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Casts', title: 'Le transtypage (cast)',
    blocks: [
      { k: 'p', text: 'Un **cast** force Java à considérer une expression comme étant d\'un **autre type**.' },
      { k: 'p', text: '**3 cas** sont autorisés en Java :' },
      {
        k: 'list', numbered: true, items: [
          'entre **types primitifs** (ce chapitre)',
          'entre **classe mère** et **classe fille** (chapitre 3)',
          'entre **types primitifs** et **objets** (plus tard)',
        ],
      },
      { k: 'code', code: 'nombreTypeForcé = (TypeForcé) expression;' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Casts', title: 'Cast **implicite** ou **explicite** ?',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'box', tone: 'retenir', title: 'Implicite (automatique)', text: 'Du **petit** vers le **grand** type : aucune perte.' },
          { k: 'code', code: `
int i = 60;
long l = i;      // OK
double d = i;    // OK : 60.0` },
        ],
        right: [
          { k: 'box', tone: 'attention', title: 'Explicite (obligatoire)', text: 'Du **grand** vers le **petit** type : **perte possible**, le programmeur doit l\'écrire.' },
          { k: 'code', code: `
int i = 60;
short b = (short) (i + 5);  // OK
int j = (int) 1.99;         // j = 1 (et pas 2)` },
        ],
      },
      { k: 'code', code: 'short s = 1000000000;   // ERREUR : valeur trop grande pour un short' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Casts', title: 'Piège : l\'addition de deux `byte`',
    blocks: [
      {
        k: 'exercise', prompt: 'Ce code compile-t-il ? Pourquoi ?',
        code: `
byte b1 = (byte) 20;
byte b2 = (byte) 15;
byte b3 = b1 + b2;`,
        solution: [
          { k: 'p', text: '**Non.** En Java, `b1 + b2` est calculé en **`int`**. Mettre un `int` dans un `byte` exige un **cast explicite** :' },
          { k: 'code', code: 'byte b3 = (byte) (b1 + b2);   // OK' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Casts', title: 'Cast entre entiers et `char`',
    blocks: [
      { k: 'p', text: 'Un `char` correspond à l\'**entier** de son **code Unicode** (`\'A\'` ↔ `65`).' },
      {
        k: 'table',
        head: ['Conversion', 'Type de cast', 'Pourquoi ?'],
        rows: [
          ['`char` → `int`, `long`', '**Implicite**', 'Toutes les valeurs de `char` tiennent dedans'],
          ['`char` → `short`, `byte`', '**Explicite**', '`char` va de 0 à 65 535, `short` seulement jusqu\'à 32 767'],
          ['`long`, `int`, `short`, `byte` → `char`', '**Explicite**', 'Les entiers sont **signés**, le `char` ne l\'est pas'],
        ],
      },
      { k: 'code', code: `
char c = 'A';
int code = c;            // 65   (implicite)
char d = (char) 66;      // 'B'  (explicite)` },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Casts', title: 'Quiz : **cast** et conversion',
    blocks: [{
      k: 'quiz', question: 'Qu\'affiche ce programme ?',
      code: `
int i = 60;
double d = i;
int j = (int) 1.99;
System.out.println(d + " " + j);`,
      options: ['`60 2`', '`60.0 1`', '`60.0 2`', 'Erreur de compilation'],
      correct: 1,
      explication: '`int` → `double` : cast **implicite**, d\'où `60.0`. `(int) 1.99` **tronque** : `1`, **pas d\'arrondi**.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '4. Variables et opérateurs', title: '**Déclarer**, **affecter**, **initialiser**',
    blocks: [
      {
        k: 'cols',
        left: [{
          k: 'code', code: `
int age;               // déclaration
age = 20;              // affectation
float prix = 12.5f;    // initialisation
int a = 1, b = 2;      // plusieurs variables` }],
        right: [{
          k: 'list', items: [
            '**Déclaration** : un **type** et un **nom** ; Java réserve un emplacement en mémoire.',
            '**Affectation** : l\'opérateur `=` range une **valeur** dans la variable.',
            '**Initialisation** : déclaration **et** première valeur, en une ligne.',
          ],
        }],
      },
      { k: 'box', tone: 'attention', text: 'Une variable **locale** doit être **initialisée avant** d\'être lue : sinon, **erreur de compilation**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Variables et opérateurs', title: 'Les constantes : `final`',
    blocks: [
      { k: 'p', text: 'Le mot-clé **`final`** interdit de **modifier** une variable après son initialisation.' },
      {
        k: 'code', code: `
final int NB_JOURS = 7;
NB_JOURS = 8;            // ERREUR de compilation` },
      { k: 'box', tone: 'retenir', text: 'Par **convention**, le nom d\'une constante s\'écrit **EN_MAJUSCULES**, avec `_` entre les mots.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Variables et opérateurs', title: 'Les opérateurs **arithmétiques**',
    blocks: [
      {
        k: 'table',
        head: ['Opérateur', 'Rôle', 'Exemple (`int x = 7;`)', 'Résultat'],
        rows: [
          ['`+`  `-`  `*`', 'addition, soustraction, multiplication', '`x + 3`', '`10`'],
          ['`/`', 'division', '`x / 3`', '`2` (division **entière**)'],
          ['`%`', 'reste de la division (**modulo**)', '`x % 2`', '`1`'],
          ['`++`', 'ajoute **1**', '`x++`', '`x` vaut `8`'],
          ['`--`', 'retire **1**', '`x--`', '`x` vaut `6`'],
        ],
      },
      { k: 'box', tone: 'attention', text: 'Entre deux `int`, `/` donne un **`int`** : `7 / 3` vaut **2**. Pour `2.33…`, écrivez `7.0 / 3`.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Variables et opérateurs', title: 'Opérateurs de **comparaison** et **logiques**',
    blocks: [
      {
        k: 'cols',
        left: [{
          k: 'table', head: ['Comparaison', 'Sens'],
          rows: [['`==`', '**égal** à'], ['`!=`', '**différent** de'], ['`<`  `<=`', 'inférieur (ou égal)'], ['`>`  `>=`', 'supérieur (ou égal)']],
        }],
        right: [{
          k: 'table', head: ['Logique', 'Sens'],
          rows: [['`&&`', '**et**'], ['`||`', '**ou**'], ['`!`', '**non**']],
        }],
      },
      {
        k: 'code', small: true, code: `
int x = 7;
boolean r = x > 3 && x < 10;   // true
boolean q = !(x == 7);         // false` },
      { k: 'box', tone: 'attention', text: '`=` **affecte** une valeur ; `==` **compare**. Ne les confondez pas.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Variables et opérateurs', title: 'Quiz : **division** entière et **modulo**',
    blocks: [{
      k: 'quiz', question: 'Qu\'affiche ce programme ?',
      code: `
int a = 7;
int b = 2;
System.out.println(a / b + " " + a % b);`,
      options: ['`3.5 1`', '`3 1`', '`3 3`', '`3.5 0.5`'],
      correct: 1,
      explication: 'Entre deux `int`, `/` est une division **entière** : `7 / 2 = 3`. `%` donne le **reste** : `7 % 2 = 1`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '5. Lecture et écriture', title: 'Écrire et **lire** à la console',
    blocks: [
      {
        k: 'cols', ratio: 1.15,
        left: [{
          k: 'code', small: true, file: 'Lecture.java', code: `
import java.util.Scanner;

public class Lecture {
    public static void main(String[] args) {
        Scanner clavier = new Scanner(System.in);
        System.out.print("Votre âge : ");
        int age = clavier.nextInt();
        System.out.println("Vous avez " + age + " ans");
    }
}`,
        }],
        right: [{
          k: 'list', items: [
            '`System.out.println(x)` : affiche, puis **va à la ligne**.',
            '`System.out.print(x)` : affiche, **sans** retour à la ligne.',
            '`Scanner` (paquetage `java.util`) : lit le **clavier**.',
            '`nextInt()`, `nextDouble()`, `next()` (un mot), `nextLine()` (une ligne).',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Structures de contrôle', title: 'Le choix : `if` / `else`',
    blocks: [
      {
        k: 'cols',
        left: [{
          k: 'code', code: `
int note = 12;
if (note >= 16) {
    System.out.println("Très bien");
} else if (note >= 10) {
    System.out.println("Admis");
} else {
    System.out.println("Ajourné");
}`, output: 'Admis',
        }],
        right: [{
          k: 'list', items: [
            'Le **test** est une expression **booléenne** (`true` ou `false`).',
            '`else` est **facultatif**.',
            '`else if` enchaîne **plusieurs** tests : le **premier vrai** gagne.',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Structures de contrôle', title: 'Le choix multiple : `switch`',
    blocks: [
      {
        k: 'cols', ratio: 1.1,
        left: [{
          k: 'code', small: true, code: `
int choix = 2;
switch (choix) {
    case 1:
        System.out.println("Bonjour");
        break;
    case 2:
        System.out.println("Hello");
        break;
    case 3:
        System.out.println("Buenos dias");
        break;
    default:
        System.out.println("Choix incorrect");
}`, output: 'Hello',
        }],
        right: [
          {
            k: 'list', items: [
              'On compare la valeur à chaque **`case`**.',
              '`default` : si **aucun** cas ne correspond.',
            ],
          },
          { k: 'box', tone: 'attention', text: 'Sans **`break`**, l\'exécution **continue** dans le `case` suivant.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Structures de contrôle', title: 'Les boucles : `for`, `while`, `do … while`',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'p', text: '**`for`** : on connaît le **nombre** de tours.' },
          {
            k: 'code', small: true, code: `
for (int i = 0; i < 3; i++) {
    System.out.println("bonjour");
}` },
          { k: 'p', text: '**`while`** : on **teste d\'abord**.' },
          {
            k: 'code', small: true, code: `
int i = 0;
while (i < 3) {
    System.out.println("bonjour");
    i = i + 1;
}` },
        ],
        right: [
          { k: 'p', text: '**`do … while`** : s\'exécute **au moins une fois**.' },
          {
            k: 'code', small: true, code: `
int i = 0;
do {
    System.out.println("bonjour");
    i = i + 1;
} while (i < 3);` },
          { k: 'box', tone: 'retenir', text: 'Les trois boucles affichent `bonjour` **3 fois**. Elles diffèrent par **le moment du test**.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Structures de contrôle', title: '`break` et `continue`',
    blocks: [
      {
        k: 'cols', ratio: 1.5,
        left: [{
          k: 'code', code: `
for (int i = 1; i <= 5; i++) {
    if (i == 2) continue;   // saute ce tour
    if (i == 4) break;      // sort de la boucle
    System.out.println(i);
}`, output: '1\n3',
        }],
        right: [{
          k: 'list', items: [
            '**`break`** : sort **immédiatement** de la boucle.',
            '**`continue`** : saute le **reste du tour**, puis passe au **tour suivant**.',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, title: 'Chapitre 1 — À retenir',
    blocks: [
      {
        k: 'list', items: [
          'Java est **orienté objet**, **portable** grâce à la **JVM**, et **fortement typé**.',
          '`javac Fichier.java` → **bytecode** `.class` ; `java NomClasse` → **exécution**.',
          'Classe **`public`** ⇒ fichier du **même nom**.',
          '**8 types primitifs** : `boolean`, `byte`, `short`, `int`, `long`, `float`, `double`, `char`.',
          'Cast **implicite** : petit → grand. Cast **explicite** : grand → petit, avec `(type)`.',
          '`final` : **constante** ; `/` entre deux `int` : division **entière** ; `Scanner` : lecture au clavier.',
          '**Choix** : `if` / `else`, `switch` (avec `break`). **Boucles** : `for`, `while`, `do … while`.',
        ],
      },
    ],
  },
]
