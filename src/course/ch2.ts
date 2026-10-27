import type { Block, Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   CHAPITRE 2 — Classes et objets en Java
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch2'

/* Diapo « protéger un point polaire » : le code apparaît étape par étape. */
const POINT = `
public class Point {
    private double rho;    // distance à l'origine : toujours ≥ 0
    private double theta;  // angle en radians

    public Point(double rho, double theta) {
        setRho(rho);
        this.theta = theta;
    }

    public double getRho()   { return rho; }
    public double getTheta() { return theta; }

    public void setRho(double rho) {
        if (rho < 0)
            throw new IllegalArgumentException("rho < 0");
        this.rho = rho;
    }
}`

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)

const POINT_STEPS: { label: string; hidden: number[]; highlight: number[]; box: Block }[] = [
  {
    label: 'Attributs privés', hidden: range(4, 17), highlight: [2, 3],
    box: { k: 'box', tone: 'attention', title: 'Sans encapsulation', text: 'Si `rho` était accessible :\n`p.rho = -1;` → donnée **aberrante**.' },
  },
  {
    label: 'Constructeur', hidden: range(9, 17), highlight: [5, 6, 7, 8],
    box: { k: 'box', tone: 'info', text: 'Le constructeur **réutilise** `setRho` : la règle `rho ≥ 0` est écrite **une seule fois**.' },
  },
  {
    label: 'Consultation', hidden: range(12, 17), highlight: [10, 11],
    box: { k: 'box', tone: 'info', text: 'Les **getters** **lisent** `rho` et `theta`, **sans** les modifier.' },
  },
  {
    label: 'Modification contrôlée', hidden: [], highlight: [13, 14, 15, 16, 17],
    box: { k: 'box', tone: 'info', text: '`setRho` **refuse** une valeur négative. Pas de `setTheta` : pas prévu.' },
  },
  {
    label: 'Invariant', hidden: [], highlight: [2, 14, 15],
    box: { k: 'box', tone: 'retenir', title: 'Invariant : rho ≥ 0, toujours', text: '`p.rho = -1;` → **ne compile pas**\n`p.setRho(-1);` → **refusé**' },
  },
]

export const CH2: Slide[] = [
  {
    kind: 'chapter', chapter: C, number: '2', title: 'Classes et objets en Java',
    goals: [
      'Les **4 principes** de la POO',
      '**Classe**, **objet**, **référence**',
      '**Constructeurs** et mot-clé `this`',
      '**Tableaux**, `ArrayList` et **chaînes** de caractères',
      '**Surcharge** et membres **`static`**',
      '**Passage de paramètres**',
      '**Paquetages** (`package`, `import`)',
      '**Encapsulation** : `private`, getters, setters',
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Programmation orientée objet', title: 'Pourquoi la POO ?',
    blocks: [
      {
        k: 'p', text: 'La POO exprime la solution **avec les éléments du problème** à résoudre (un étudiant, un compte, un point…). Résultat : des programmes complexes **plus simples à écrire et à maintenir**.',
      },
      {
        k: 'table',
        head: ['Principe', 'En une phrase'],
        rows: [
          ['**Abstraction**', 'Représenter un objet du **monde réel** dans le programme.'],
          ['**Encapsulation**', '**Cacher** les données ; on y accède par des **méthodes**.'],
          ['**Héritage**', 'Créer une classe **à partir d\'une autre** (chapitre 3).'],
          ['**Polymorphisme**', 'Un même appel, **des comportements différents** (chapitre 3).'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Classes et objets', title: 'Un objet = **état** + **comportement**',
    blocks: [
      {
        k: 'table',
        head: ['', 'Rôle', 'Exemple : un vélo'],
        rows: [
          ['**Attributs** (variables d\'instance)', 'Partie **statique** : l\'**état** de l\'objet', 'vitesse, couleur, cadence de pédalage'],
          ['**Méthodes**', 'Partie **dynamique** : le **comportement**', 'accélérer, freiner, changer de vitesse'],
        ],
      },
      {
        k: 'box', tone: 'retenir',
        text: 'Une **classe** est le **modèle** (le type) ; un **objet** est une **instance** concrète de ce modèle. Une classe décrit les **attributs** et les **méthodes** de ses objets.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2.2 Déclaration', title: 'Structure d\'une classe',
    blocks: [
      {
        k: 'cols', ratio: 1.3,
        left: [
          {
            k: 'code', small: true, code: `
[public] [final] [abstract] class NomClasse {

    // 1. les attributs
    [private] [static] [final] Type attribut;

    // 2. le(s) constructeur(s)
    [public] NomClasse(paramètres) {
        ...
    }

    // 3. les méthodes
    [public] [static] TypeRetour methode(paramètres) {
        ...
    }
}`,
          },
        ],
        right: [
          {
            k: 'list', items: [
              'Les éléments entre `[ ]` sont **facultatifs**.',
              '**Attributs** : l\'état.',
              '**Constructeur** : **même nom** que la classe, **pas de type de retour**.',
              '**Méthodes** : le comportement.',
            ],
          },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2.2 Déclaration', title: 'Exemple : la classe `Point`',
    blocks: [
      {
        k: 'cols', ratio: 1.6,
        left: [
          {
            k: 'code', file: 'Point.java', code: `
class Point {
    int x;                       // attribut
    int y;                       // attribut

    Point(int dx, int dy) {      // constructeur
        x = dx;
        y = dy;
    }

    void translate(int dx, int dy) {   // méthode
        x += dx;
        y += dy;
    }
}`,
          },
        ],
        right: [
          {
            k: 'list', items: [
              '**2 attributs** : `x` et `y`.',
              '**1 constructeur** : initialise `x` et `y`.',
              '**1 méthode** : `translate` déplace le point.',
            ],
          },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2.2 Déclaration', title: 'Attributs et paramètres : la **portée**',
    blocks: [
      {
        k: 'cols', ratio: 1.2,
        left: [{
          k: 'code', code: `
class Point {
    int x;                 // attributs
    int y;

    void deplacer(int dx, int dy) {   // paramètres
        x = x + dx;
        y = y + dy;
    }
}`,
        }],
        right: [{
          k: 'list', items: [
            'Les **attributs** `x` et `y` sont visibles dans **toutes** les méthodes de la classe. Ils **gardent** leur valeur tant que l\'objet existe.',
            'Les **paramètres** `dx` et `dy` ne sont visibles que **dans la méthode**. Ils **disparaissent** à la fin de l\'appel.',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Les objets', title: 'Variable = **valeur** ou **référence**',
    blocks: [
      {
        k: 'list', items: [
          'Une variable de **type primitif** (`int`, `double`…) contient **directement la valeur**.',
          'Une variable de **type objet** contient une **référence** : l\'**adresse** de l\'objet en mémoire.',
          'Les objets sont créés **dynamiquement** avec `new`.',
        ],
      },
      {
        k: 'cols', ratio: 0.8,
        left: [{ k: 'code', code: `
int n = 5;
Point p = new Point(2, 3);` }],
        right: [{
          k: 'memory', compact: true,
          stack: [{ name: 'n', value: '5' }, { name: 'p', ref: 'a' }],
          heap: [{ id: 'a', type: 'Point', addr: '@A01', fields: [['x', '2'], ['y', '3']] }],
          caption: '`n` contient la **valeur** ; `p` contient une **adresse**.',
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.2 Création des objets', title: '**Déclarer** puis **créer**',
    blocks: [
      {
        k: 'cols', ratio: 1.1,
        left: [
          { k: 'p', text: '**1. Déclaration** : un nom + un type. **Aucun objet** n\'existe encore.' },
          { k: 'code', code: 'Point p1, p2;' },
          { k: 'p', text: '**2. Création** : avec `new` + le **constructeur**.' },
          { k: 'code', code: `
p1 = new Point(2, 3);   // un objet est créé
p2 = p1;                // PAS de nouvel objet !`, highlight: [2] },
        ],
        right: [
          {
            k: 'box', tone: 'attention', title: 'p2 = p1',
            text: '`p2` reçoit la **même adresse** que `p1`. Il y a **un seul objet**, désigné par **deux références**. Si on modifie `p2.x`, alors `p1.x` change aussi.',
          },
          {
            k: 'memory', compact: true,
            stack: [{ name: 'p1', ref: 'a' }, { name: 'p2', ref: 'a' }],
            heap: [{ id: 'a', type: 'Point', addr: '@A01', fields: [['x', '2'], ['y', '3']] }],
          },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.2 Création des objets', title: 'Quiz : **références**',
    blocks: [{
      k: 'quiz', question: 'Que s\'affiche ?',
      code: `
Point p1 = new Point(2, 3);
Point p2 = p1;

p2.x = 10;

System.out.println(p1.x);`,
      options: [
        '`2`',
        '`3`',
        '`10`',
        'Erreur de compilation',
      ],
      correct: 2,
      explication: '`p2 = p1` copie la **référence**, pas l\'objet. Les deux variables pointent vers le **même** objet : modifier `p2.x` modifie aussi `p1.x`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '3.3 Accès aux membres', title: 'La notation **pointée** : `objet.membre`',
    blocks: [
      {
        k: 'code', file: 'TestPoint.java', code: `
class TestPoint {
    public static void main(String[] args) {
        Point p = new Point(0, 0);
        p.x = 2;                 // accès à un attribut
        p.y = 3;
        p.translate(1, 1);       // appel d'une méthode
        System.out.println("abscisse : " + p.x + ", ordonnée : " + p.y);
    }
}`, output: 'abscisse : 3, ordonnée : 4',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Le constructeur', title: 'Le constructeur',
    blocks: [
      { k: 'p', text: 'Méthode **spéciale**, appelée **automatiquement** à la création de l\'objet (`new`).' },
      {
        k: 'list', items: [
          'Il a **le même nom que la classe**.',
          'Il n\'a **aucun type de retour** (même pas `void`).',
          'Son rôle : **initialiser les attributs**.',
        ],
      },
      {
        k: 'cols',
        left: [{ k: 'code', code: `
class Point {
    int x;
    int y;
    // aucun constructeur écrit
}` }],
        right: [{ k: 'code', code: `
Point p = new Point();   // OK
p.x = 2;
p.y = 3;` }],
      },
      {
        k: 'box', tone: 'info',
        text: 'Si **aucun** constructeur n\'est écrit, le compilateur ajoute un **constructeur par défaut** : public, **sans paramètre**.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Le constructeur', title: 'Plusieurs constructeurs : `this(...)`',
    blocks: [
      {
        k: 'cols', ratio: 1.15,
        left: [{
          k: 'code', code: `
class Point {
    int x;
    int y;

    Point(int dx, int dy) {
        x = dx;
        y = dy;
    }

    Point() {
        this(5, 5);   // appelle Point(5, 5)
    }
}`,
        }],
        right: [
          { k: 'code', code: `
Point p1 = new Point();      // (5, 5)
Point p2 = new Point(1, 3);  // (1, 3)` },
          {
            k: 'list', items: [
              'Une classe peut avoir **plusieurs constructeurs** (paramètres différents).',
              'Un constructeur peut **appeler un autre** avec `this(...)`.',
            ],
          },
          { k: 'box', tone: 'attention', text: '`this(...)` doit être la **première instruction**.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Le constructeur', title: 'Quiz : le constructeur **par défaut**',
    blocks: [{
      k: 'quiz', question: 'Que donne la dernière ligne ?',
      code: `
class Point {
    int x, y;
    Point(int dx, int dy) {
        x = dx;
        y = dy;
    }
}

Point p = new Point();`,
      options: [
        'Elle compile : `p` vaut `(0, 0)`',
        '**Erreur de compilation**',
        "Erreur à l'exécution",
        'Elle compile : `p` vaut `null`',
      ],
      correct: 1,
      explication: 'Dès qu\'on écrit **un** constructeur, le compilateur n\'ajoute **plus** le constructeur par défaut : `new Point()` n\'existe plus.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Le constructeur', title: 'Le constructeur de **copie**',
    blocks: [
      {
        k: 'cols', ratio: 1.1,
        left: [{
          k: 'code', small: true, code: `
class Point {
    int x, y;

    Point(int xx, int yy) {
        x = xx;
        y = yy;
    }

    Point(Point p) {      // constructeur de copie
        x = p.x;
        y = p.y;
    }
}

Point p1 = new Point(8, 4);
Point p2 = new Point(p1);`,
        }],
        right: [
          {
            k: 'memory', compact: true,
            stack: [{ name: 'p1', ref: 'a' }, { name: 'p2', ref: 'b' }],
            heap: [
              { id: 'a', type: 'Point', addr: '@A01', fields: [['x', '8'], ['y', '4']] },
              { id: 'b', type: 'Point', addr: '@B7F', fields: [['x', '8'], ['y', '4']] },
            ],
          },
          { k: 'box', tone: 'retenir', text: '`new Point(p1)` crée un **nouvel objet**, avec les **mêmes valeurs**. `p2 = p1` ne crée **rien**.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3.4 Le constructeur', title: 'Le mot-clé `this`',
    blocks: [
      { k: 'p', text: '`this` désigne **l\'objet courant** : celui sur lequel la méthode a été appelée.' },
      {
        k: 'cols',
        left: [{
          k: 'code', code: `
class Point {
    int x;
    int y;

    Point(int x, int y) {
        this.x = x;   // attribut = paramètre
        this.y = y;
    }
}`,
        }],
        right: [
          {
            k: 'list', items: [
              '`this.x` = l\'**attribut** de l\'objet.',
              '`x` seul = le **paramètre**.',
              'Sans ambiguïté, `this` est **facultatif**.',
            ],
          },
          { k: 'box', tone: 'attention', text: 'Sans `this`, `x = x;` affecte le paramètre **à lui-même** : l\'attribut reste à 0.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Les tableaux', title: 'Les tableaux sont des **objets**',
    blocks: [
      {
        k: 'table', small: true,
        head: ['Étape', 'Code', 'Remarque'],
        rows: [
          ['**Déclaration**', '`int[] tab;`', 'La taille **n\'est pas** donnée'],
          ['**Création**', '`tab = new int[3];`', 'Chaque case vaut **0** par défaut'],
          ['**Tout en un**', '`int[] tab = {8, 2 * 3, 1};`', 'Déclaration + création + initialisation'],
          ['**Utilisation**', '`tab[1] = 4;`   `x = tab[1];`', 'Indices de **0** à `tab.length - 1`'],
        ],
      },
      { k: 'code', code: `
Point[] tabPoints = { new Point(2, 3), new Point(4, 4) };
System.out.println(tabPoints.length);   // 2` },
      { k: 'box', tone: 'info', text: '`int tab[];` est accepté mais **déconseillé** : préférez `int[] tab;`' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Les tableaux', title: '**Parcourir** un tableau',
    blocks: [
      {
        k: 'code', code: `
int[] tab = {10, 20, 30, 40};

for (int i = 0; i < tab.length; i++) {        // avec l'indice
    System.out.println("tab[" + i + "] = " + tab[i]);
}

for (int valeur : tab) {                      // for-each
    System.out.println(valeur);
}`,
      },
      {
        k: 'list', items: [
          '**`for`** classique : on dispose de l\'**indice** `i`.',
          '**for-each** : plus court pour **lire** chaque élément ; `valeur` est une **copie**, modifier `valeur` ne change pas le tableau.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Les tableaux', title: 'Un tableau passé en **paramètre**',
    blocks: [
      {
        k: 'cols', ratio: 1.1,
        left: [{
          k: 'code', small: true, code: `
static void doubler(int[] t) {
    for (int i = 0; i < t.length; i++) {
        t[i] = t[i] * 2;
    }
}

public static void main(String[] args) {
    int[] tab = {1, 2, 3};
    doubler(tab);
    System.out.println(Arrays.toString(tab));
}`, output: '[2, 4, 6]',
        }],
        right: [{
          k: 'memory', compact: true, title: 'À la fin de doubler(...)',
          stack: [
            { name: 't', ref: 'a', frame: 'doubler(...)' },
            { name: 'tab', ref: 'a', frame: 'main' },
          ],
          heap: [{ id: 'a', type: 'int[]', fields: [['[0]', '2'], ['[1]', '4'], ['[2]', '6']], changed: ['[0]', '[1]', '[2]'] }],
        }],
      },
      { k: 'box', tone: 'retenir', text: 'On copie la **référence**, pas le tableau : la méthode modifie le **même** tableau que `main`.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Les tableaux', title: 'Les tableaux à **deux dimensions**',
    blocks: [
      {
        k: 'cols', ratio: 1.3,
        left: [{
          k: 'code', small: true, code: `
int[][] mat = new int[2][3];     // 2 lignes, 3 colonnes

for (int i = 0; i < mat.length; i++) {
    for (int j = 0; j < mat[i].length; j++) {
        mat[i][j] = i + j;
    }
}

int[][] x = { {0, 1}, {2, 3} };  // initialisation directe`,
        }],
        right: [{
          k: 'list', items: [
            'Un tableau 2D est un **tableau de tableaux**.',
            '`mat.length` = nombre de **lignes**.',
            '`mat[i].length` = nombre de **colonnes** de la ligne `i`.',
            'On le parcourt avec **deux boucles imbriquées**.',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Les tableaux', title: 'Méthodes utiles : `Arrays` et `System`',
    blocks: [
      {
        k: 'table',
        head: ['Besoin', 'Méthode'],
        rows: [
          ['**Copier** des éléments d\'un tableau à un autre', '`System.arraycopy(src, 0, dest, 0, n)`'],
          ['**Comparer** 2 tableaux (1 dimension)', '`Arrays.equals(t1, t2)`'],
          ['**Comparer** 2 tableaux (2 dimensions ou +)', '`Arrays.deepEquals(t1, t2)`'],
          ['**Trier**', '`Arrays.sort(t)`'],
          ['**Rechercher** (dichotomie, tableau trié)', '`Arrays.binarySearch(t, valeur)`'],
          ['**Remplir** avec une valeur', '`Arrays.fill(t, valeur)`'],
        ],
      },
      { k: 'code', code: `
int[] t = {5, 2, 8};
Arrays.sort(t);                          // t = {2, 5, 8}
System.out.println(Arrays.toString(t));  // [2, 5, 8]`, small: true },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4.2 Les listes', title: '`ArrayList` : un tableau **redimensionnable**',
    blocks: [
      {
        k: 'list', items: [
          'Un tableau a une taille **fixe**, décidée à la création.',
          '**`ArrayList`** (paquetage `java.util`) **grandit** et **rétrécit** selon les besoins.',
          '`<String>` indique le **type** des éléments.',
        ],
      },
      {
        k: 'code', code: `
import java.util.ArrayList;

ArrayList<String> noms = new ArrayList<>();
noms.add("Sarra");
noms.add("Ahmed");
System.out.println(noms.size());   // 2`,
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4.2 Les listes', title: 'Les méthodes de `ArrayList`',
    blocks: [
      {
        k: 'table', small: true,
        head: ['Méthode', 'Effet'],
        rows: [
          ['`add(e)`  /  `add(i, e)`', 'ajoute à la **fin**  /  à la **position** `i`'],
          ['`get(i)`', 'renvoie l\'élément de **position** `i`'],
          ['`set(i, e)`', '**remplace** l\'élément de position `i`'],
          ['`remove(i)`  /  `remove(o)`', 'supprime par **position**  /  par **valeur**'],
          ['`size()`  /  `isEmpty()`', '**nombre** d\'éléments  /  liste **vide** ?'],
          ['`contains(o)`  /  `indexOf(o)`', 'présent ?  /  **position** (ou `-1`)'],
          ['`clear()`', 'supprime **tous** les éléments'],
        ],
      },
      { k: 'box', tone: 'attention', text: 'Une position **hors limite** lève une **`IndexOutOfBoundsException`**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4.2 Les listes', title: '**Parcourir** une `ArrayList`',
    blocks: [
      {
        k: 'code', small: true, code: `
for (int i = 0; i < noms.size(); i++) {        // avec l'indice
    System.out.println(noms.get(i));
}

for (String nom : noms) {                      // for-each
    System.out.println(nom);
}

Iterator<String> it = noms.iterator();         // avec un itérateur
while (it.hasNext()) {
    System.out.println(it.next());
}`,
      },
      { k: 'p', text: 'Un **itérateur** est un **curseur** qui parcourt la liste, élément par élément.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Les chaînes', title: 'La classe `String`',
    blocks: [
      {
        k: 'table',
        head: ['Classe', 'Usage'],
        rows: [
          ['`String`', 'Chaînes **constantes** (non modifiables)'],
          ['`StringBuilder` / `StringBuffer`', 'Chaînes **modifiables**'],
        ],
      },
      { k: 'code', code: `
String chaine  = "Bonjour";
String chaine1 = "Bonjour";              // MÊME objet que chaine
String chaine2 = new String("Bonjour");  // new force un NOUVEL objet` },
      {
        k: 'box', tone: 'retenir', title: 'String est immuable',
        text: 'Un objet `String` **ne change jamais**. Une nouvelle affectation crée une **nouvelle chaîne**.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Les chaînes', title: '`String` est **immuable** : en mémoire',
    blocks: [
      {
        k: 'code', code: `
String s = "Java";
s = s + "!";` },
      {
        k: 'cols',
        left: [{
          k: 'memory', compact: true, title: 'Après la ligne 1',
          stack: [{ name: 's', ref: 'a' }],
          heap: [{ id: 'a', type: 'String', fields: [['valeur', '"Java"']] }],
        }],
        right: [{
          k: 'memory', compact: true, title: 'Après la ligne 2',
          stack: [{ name: 's', ref: 'b' }],
          heap: [
            { id: 'a', type: 'String', fields: [['valeur', '"Java"']], dead: true, note: 'inchangé, plus référencé' },
            { id: 'b', type: 'String', fields: [['valeur', '"Java!"']] },
          ],
        }],
      },
      { k: 'box', tone: 'retenir', text: 'L\'objet `"Java"` n\'est **jamais modifié** : on crée un **nouvel** objet, et `s` **change de référence**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Les chaînes', title: 'La concaténation avec `+`',
    blocks: [
      { k: 'p', text: 'Si **un des opérandes** est un `String`, l\'autre est **converti** en `String` :' },
      {
        k: 'list', items: [
          'types primitifs : conversion **automatique** ;',
          'objets : appel de la méthode **`toString()`**.',
          'plusieurs `+` : calcul **de gauche à droite**.',
        ],
      },
      {
        k: 'exercise', side: true, prompt: 'Qu\'affichent ces deux lignes ?',
        code: `
int x = 5;
System.out.println("x + 1 = " + x + 1);
System.out.println(x + 1 + " = x + 1");`,
        solution: [
          { k: 'code', plain: true, small: true, code: 'x + 1 = 51\n6 = x + 1' },
          { k: 'p', text: '1ʳᵉ ligne : `"..." + 5` donne déjà un **`String`**, puis `+ 1` **colle** le 1. 2ᵉ ligne : `5 + 1` = **6** d\'abord (deux `int`).' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Les chaînes', title: 'Comparer deux chaînes : `equals` et pas `==`',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'box', tone: 'retenir', title: 'equals', text: 'Compare le **contenu** (les caractères).' },
          { k: 'box', tone: 'attention', title: '==', text: 'Compare les **adresses** en mémoire. **Ne pas utiliser** pour comparer des chaînes.' },
        ],
        right: [
          { k: 'code', code: `
String s1 = "Bonjour";
String s2 = " les amis";
String s3 = s1 + s2;

s3.equals("Bonjour les amis")  // true
s3 == "Bonjour les amis"       // false !` },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Les chaînes', title: 'Quiz : `==` ou `equals` ?',
    blocks: [{
      k: 'quiz', question: 'Que valent `a == b` et `a.equals(b)` ?',
      code: `
String a = new String("Java");
String b = new String("Java");`,
      options: [
        '`true` / `true`',
        '`false` / `false`',
        '`false` / `true`',
        '`true` / `false`',
      ],
      correct: 2,
      explication: '`a == b` compare les **références** : deux `new` donnent **deux objets**, donc `false`. `a.equals(b)` compare le **contenu** : `true`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '5. Les chaînes', title: 'Méthodes de `String` : un exemple',
    blocks: [
      { k: 'p', text: 'Découper l\'adresse `http://truc.unice.fr/rep1/rep2/fichier.html`' },
      {
        k: 'code', small: true, code: `
String adresse = "http://truc.unice.fr/rep1/rep2/fichier.html";
int n = adresse.indexOf(":");                   // 4
String protocole = adresse.substring(0, n);     // "http"
String reste = adresse.substring(n + 3);        // "truc.unice.fr/rep1/rep2/fichier.html"
n = reste.indexOf("/");                         // 13
String machine = reste.substring(0, n);         // "truc.unice.fr"
String chemin = reste.substring(n + 1);         // "rep1/rep2/fichier.html"
int m = chemin.lastIndexOf("/");                // 9
String repertoire = chemin.substring(0, m);     // "rep1/rep2"
String fichier = chemin.substring(m + 1);       // "fichier.html"`,
      },
      {
        k: 'list', items: [
          '`indexOf(s)` / `lastIndexOf(s)` : **position** de la 1ʳᵉ / dernière occurrence.',
          '`substring(début, fin)` : du caractère `début` **inclus** à `fin` **exclu**.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Les chaînes', title: 'Principales méthodes de `String` (1/2)',
    blocks: [
      {
        k: 'table', small: true,
        head: ['Méthode', 'Effet'],
        rows: [
          ['`length()`', '**nombre** de caractères'],
          ['`charAt(i)`', 'caractère à la **position** `i`'],
          ['`substring(d)`  /  `substring(d, f)`', 'extrait une **partie** de la chaîne'],
          ['`replace(a, b)`', '**remplace** `a` par `b`'],
          ['`split(séparateur)`', '**découpe** en un tableau de `String`'],
          ['`toCharArray()`', 'convertit en tableau de `char`'],
        ],
      },
      {
        k: 'code', small: true, code: `
String s = "Java c'est plutôt sympa";
System.out.println(s.length());                       // 23
String[] mots = s.split(" ");                         // 4 mots
System.out.println(s.replace("Java", "JavaScript"));  // JavaScript c'est plutôt sympa
System.out.println(s.substring(18));                  // sympa`,
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Les chaînes', title: 'Principales méthodes de `String` (2/2)',
    blocks: [
      {
        k: 'table', small: true,
        head: ['Méthode', 'Effet'],
        rows: [
          ['`equals(s)`  /  `equalsIgnoreCase(s)`', 'égalité du **contenu**  /  en ignorant la **casse**'],
          ['`compareTo(s)`', '`0` si égales ; **négatif** si **avant** `s`, **positif** si **après** (ordre alphabétique)'],
          ['`toLowerCase()`  /  `toUpperCase()`', 'tout en **minuscules**  /  **majuscules**'],
          ['`contains(s)`', '`true` si la chaîne **contient** `s`'],
          ['`startsWith(s)`  /  `endsWith(s)`', 'commence / se termine par `s`'],
        ],
      },
      { k: 'box', tone: 'attention', text: 'Ces méthodes **renvoient** une nouvelle chaîne : `s.toUpperCase();` seul ne **modifie pas** `s` (`String` est **immuable**).' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5.2 Chaînes modifiables', title: '`StringBuilder` : modifier sans recréer',
    blocks: [
      { k: 'p', text: '`StringBuilder` (ou `StringBuffer`) **modifie l\'objet lui-même** : pas de nouvelle instance à chaque changement.' },
      {
        k: 'cols',
        left: [{
          k: 'table', head: ['Méthode', 'Effet'],
          rows: [
            ['`append(x)`', 'ajoute **à la fin**'],
            ['`insert(i, x)`', 'insère à la **position i**'],
            ['`replace(d, f, s)`', '**remplace** une partie'],
            ['`delete(d, f)`', '**supprime** une partie'],
          ],
        }],
        right: [{
          k: 'code', code: `
StringBuilder sb = new StringBuilder("Java");
sb.append(" POO");     // "Java POO"
sb.insert(0, "Cours ");// "Cours Java POO"
sb.delete(0, 6);       // "Java POO"
String s = sb.toString();`, small: true,
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5.2 Chaînes modifiables', title: '`String` et **performance**',
    blocks: [
      {
        k: 'code', small: true, code: `
String[] mots = {"Java", "c'est", "plutôt", "sympa"};

String phrase = "";
for (String mot : mots) {
    phrase += " " + mot;           // crée un NOUVEL objet à chaque tour
}

StringBuilder sb = new StringBuilder();
for (String mot : mots) {
    sb.append(" ").append(mot);    // modifie UN SEUL objet
}
String phrase2 = sb.toString();`,
      },
      { k: 'box', tone: 'retenir', text: 'Pour **concaténer dans une boucle**, utilisez **`StringBuilder`** : `+` crée **beaucoup d\'objets** inutiles.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5.2 Chaînes modifiables', title: '`StringBuilder` ou `StringBuffer` ?',
    blocks: [
      {
        k: 'table',
        head: ['Classe', 'Modifiable ?', 'Sûre avec plusieurs *threads* ?', 'Vitesse'],
        rows: [
          ['`String`', '**non** (immuable)', '**oui**', '—'],
          ['`StringBuilder`', '**oui**', '**non**', '**plus rapide**'],
          ['`StringBuffer`', '**oui**', '**oui** (synchronisée)', 'plus lente'],
        ],
      },
      { k: 'box', tone: 'info', text: 'Un *thread* est un **fil d\'exécution**. Dans un programme **simple** (un seul thread), choisissez **`StringBuilder`**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5.2 Chaînes modifiables', title: 'Exercice : **inverser** une chaîne',
    blocks: [
      {
        k: 'exercise', prompt: 'Écrire le code qui **inverse** une chaîne : `"Java"` devient `"avaJ"`.',
        solution: [
          {
            k: 'cols',
            left: [{
              k: 'code', small: true, code: `
String s = "Java";
String inverse = "";
for (int i = s.length() - 1; i >= 0; i--) {
    inverse += s.charAt(i);
}`,
            }],
            right: [{
              k: 'code', small: true, code: `
String s = "Java";
String inverse =
    new StringBuilder(s).reverse().toString();`,
            }],
          },
          { k: 'p', text: 'À gauche : **boucle** à l\'envers. À droite : `reverse()` de **`StringBuilder`**.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Surcharge', title: 'La **surcharge** des méthodes',
    blocks: [
      { k: 'p', text: '**Surcharger** = écrire une méthode avec le **même nom** mais une **signature différente** (nombre ou types des paramètres).' },
      {
        k: 'code', code: `
class Point {
    int x, y;

    void translate(int dx, int dy) {   // version 1 : deux entiers
        x += dx;
        y += dy;
    }

    void translate(Point p) {          // version 2 : un Point
        x += p.x;
        y += p.y;
    }
}`,
      },
      { k: 'box', tone: 'attention', text: 'Interdit : surcharger en changeant **seulement le type de retour**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Membres static', title: 'Les variables de classe : `static`',
    blocks: [
      {
        k: 'list', items: [
          'Une variable **`static`** est **partagée** par **tous** les objets de la classe (une seule copie).',
          'On y accède **par la classe** (recommandé) ou par un objet.',
        ],
      },
      {
        k: 'cols',
        left: [{
          k: 'code', code: `
class Point {
    int x, y;
    static int nbPoints = 0;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
        nbPoints++;
    }
}`,
        }],
        right: [{
          k: 'code', code: `
new Point(1, 2);
new Point(3, 4);
System.out.println(Point.nbPoints);`, output: '2',
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Membres static', title: '`static` : **une seule copie** en mémoire',
    blocks: [
      {
        k: 'cols', ratio: 0.8,
        left: [{
          k: 'code', code: `
Point a = new Point(1, 2);
Point b = new Point(3, 4);
System.out.println(Point.nbPoints);`, output: '2',
        }],
        right: [{
          k: 'memory', compact: true,
          stack: [{ name: 'a', ref: 'a' }, { name: 'b', ref: 'b' }],
          heap: [
            { id: 'c', type: 'Point', cls: true, fields: [['nbPoints', '2']], note: 'une seule copie, partagée' },
            { id: 'a', type: 'Point', fields: [['x', '1'], ['y', '2']] },
            { id: 'b', type: 'Point', fields: [['x', '3'], ['y', '4']] },
          ],
        }],
      },
      { k: 'box', tone: 'retenir', text: '`x` et `y` existent **dans chaque objet** ; `nbPoints` existe **une fois**, dans la **classe**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Membres static', title: 'Quiz : variable **static**',
    blocks: [{
      k: 'quiz', question: 'Avec la classe `Point` vue précédemment, que s\'affiche ?',
      code: `
new Point(1, 2);
new Point(3, 4);
new Point(5, 6);
System.out.println(Point.nbPoints);`,
      options: [
        '`0`',
        '`1`',
        '`3`',
        'Erreur de compilation',
      ],
      correct: 2,
      explication: '`nbPoints` est **partagé** par tous les objets : le constructeur l\'incrémente **à chaque** `new`, donc `3`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '7. Membres static', title: 'Le bloc d\'initialisation `static`',
    blocks: [
      { k: 'p', text: 'Une variable `static` est initialisée **une seule fois** : à sa déclaration ou dans un **bloc `static`**, exécuté **au chargement de la classe**.' },
      {
        k: 'code', code: `
class A {
    static int[] tab = new int[20];

    static {                                  // exécuté UNE fois
        for (int i = 0; i < tab.length; i++)
            tab[i] = -1;
    }
}`,
      },
      {
        k: 'exercise', prompt: 'Que fait le même bloc **sans** le mot `static` (et avec `int[] tab` non static) ?',
        solution: [
          { k: 'p', text: 'C\'est un **bloc d\'initialisation d\'instance** : il est exécuté **à chaque création d\'objet** (`new A()`), **avant** le corps du constructeur.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Membres static', title: 'Les méthodes de classe : `static`',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'p', text: 'Une méthode `static` réalise une action **indépendante** de tout objet.' },
          { k: 'code', code: `
static int getNbPoints() {
    return nbPoints;
}

// appel :
Point.getNbPoints();   // recommandé
p.getNbPoints();       // possible, à éviter` },
        ],
        right: [
          {
            k: 'box', tone: 'attention', title: 'Une méthode static ne peut pas…',
            text: '• utiliser **`this`** ;\n• utiliser les **variables d\'instance** (`x`, `y`) ;\n• avoir la **même signature** qu\'une méthode d\'instance.',
          },
          { k: 'p', text: 'Exemples connus : `Math.sqrt(...)`, `Arrays.sort(...)`, et **`main`** !' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Membres static', title: 'Les constantes de classe : `static final`',
    blocks: [
      {
        k: 'code', code: `
public class Voiture {
    public static final int VITESSE_MAX = 280;
}

System.out.println(Voiture.VITESSE_MAX);   // 280`,
      },
      {
        k: 'list', items: [
          '**`static`** : **une seule** valeur, liée à la **classe**.',
          '**`final`** : la valeur **ne change plus**.',
          'On y accède par le **nom de la classe** ; nom **EN_MAJUSCULES**.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7.3 Paramètres', title: 'Le passage de paramètres : **par valeur**',
    blocks: [
      {
        k: 'list', items: [
          'Java recopie **toujours la valeur** de l\'argument dans le paramètre.',
          {
            text: 'Pour un **objet**, la valeur copiée est la **référence** :',
            sub: [
              'si la méthode **modifie l\'objet** (`e.salaire = 80`) → visible **à l\'extérieur** ;',
              'si la méthode **change le paramètre** lui-même (`e = new ...`) → **aucun effet** à l\'extérieur.',
            ],
          },
          'Pour un **type primitif** : aucune modification visible à l\'extérieur.',
        ],
      },
      { k: 'box', tone: 'retenir', text: 'On peut modifier **l\'objet pointé**, jamais **la variable de l\'appelant**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7.3 Paramètres', title: 'Exercice : passage de paramètres',
    blocks: [
      {
        k: 'exercise', side: true, prompt: 'Qu\'affiche ce programme ? (`Employe` a deux attributs : `nom` et `salaire`)',
        code: `
static void m(int ip, Employe e1p, Employe e2p) {
    ip = 100;
    e1p.salaire = 80;
    e2p = new Employe("Emp1", 90);
}

public static void main(String[] args) {
    Employe e1 = new Employe("Emp2", 100);
    Employe e2 = new Employe("Emp3", 120);
    int i = 10;
    m(i, e1, e2);
    System.out.println(i + "\\n" + e1.salaire + "\\n" + e2.nom);
}`,
        solution: [
          { k: 'code', plain: true, small: true, code: '10\n80\nEmp3' },
          {
            k: 'list', items: [
              '`i` : copie → **inchangé**.',
              '`e1` : l\'**objet** est modifié.',
              '`e2` : seul le **paramètre** change.',
            ],
          },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7.3 Paramètres', title: 'Exercice : ce qui se passe **en mémoire**',
    blocks: [
      {
        k: 'cols',
        left: [{
          k: 'memory', compact: true, title: 'Entrée dans m(...) : valeurs copiées',
          stack: [
            { name: 'ip', value: '10', frame: 'm(...)' },
            { name: 'e1p', ref: 'a', frame: 'm(...)' },
            { name: 'e2p', ref: 'b', frame: 'm(...)' },
            { name: 'i', value: '10', frame: 'main' },
            { name: 'e1', ref: 'a', frame: 'main' },
            { name: 'e2', ref: 'b', frame: 'main' },
          ],
          heap: [
            { id: 'a', type: 'Employe', fields: [['nom', '"Emp2"'], ['salaire', '100']] },
            { id: 'b', type: 'Employe', fields: [['nom', '"Emp3"'], ['salaire', '120']] },
          ],
        }],
        right: [{
          k: 'memory', compact: true, title: 'À la fin de m(...)',
          stack: [
            { name: 'ip', value: '100', frame: 'm(...)' },
            { name: 'e1p', ref: 'a', frame: 'm(...)' },
            { name: 'e2p', ref: 'c', frame: 'm(...)' },
            { name: 'i', value: '10', frame: 'main' },
            { name: 'e1', ref: 'a', frame: 'main' },
            { name: 'e2', ref: 'b', frame: 'main' },
          ],
          heap: [
            { id: 'a', type: 'Employe', fields: [['nom', '"Emp2"'], ['salaire', '80']], changed: ['salaire'] },
            { id: 'b', type: 'Employe', fields: [['nom', '"Emp3"'], ['salaire', '120']] },
            { id: 'c', type: 'Employe', fields: [['nom', '"Emp1"'], ['salaire', '90']], note: 'visible seulement dans m' },
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Les paquetages', title: 'Les paquetages (`package`)',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Pourquoi ?', blocks: [
            { k: 'p', text: 'Un **package** (paquetage) **regroupe logiquement** des types Java (classes, interfaces…) et définit un **espace de noms**.' },
            {
              k: 'cards', items: [
                { title: 'Organiser', text: 'ranger les classes **par thème**' },
                { title: 'Éviter les conflits', text: 'deux classes `Client` peuvent **coexister**' },
                { title: 'Réutiliser', text: 'importer des packages **existants** (`java.util`)' },
                { title: 'Contrôler l\'accès', text: 'visibilité *par défaut* = **même package**' },
              ],
            },
            { k: 'box', tone: 'question', text: 'Que se passe-t-il si **deux développeurs** créent chacun une classe appelée `Client` ?' },
          ],
        },
        {
          label: 'Sans / avec packages', blocks: [{
            k: 'cols', ratio: 0.85,
            left: [
              {
                k: 'tree', tone: 'ko', title: 'Sans packages : un seul dossier',
                nodes: [
                  { name: 'src/', depth: 0 },
                  { name: 'Client.java', depth: 1, note: 'développeur A' },
                  { name: 'Client.java', depth: 1, bad: true, note: 'développeur B' },
                  { name: 'Compte.java', depth: 1 },
                  { name: 'Produit.java', depth: 1 },
                  { name: 'Commande.java', depth: 1 },
                  { name: 'Main.java', depth: 1 },
                ],
              },
              { k: 'box', tone: 'retenir', text: 'Avec des packages, les deux `Client` ont des **noms complets** différents :\n`tn.banque.model.Client`\n`tn.boutique.model.Client`' },
            ],
            right: [{
              k: 'tree', tone: 'ok', title: 'Avec packages : un dossier par package',
              nodes: [
                { name: 'src/', depth: 0 },
                { name: 'tn/', depth: 1 },
                { name: 'banque/', depth: 2 },
                { name: 'model/', depth: 3, note: '`tn.banque.model`' },
                { name: 'Client.java', depth: 4 },
                { name: 'Compte.java', depth: 4 },
                { name: 'app/', depth: 3, note: '`tn.banque.app`' },
                { name: 'Main.java', depth: 4 },
                { name: 'boutique/', depth: 2 },
                { name: 'model/', depth: 3, note: '`tn.boutique.model`' },
                { name: 'Client.java', depth: 4 },
                { name: 'Produit.java', depth: 4 },
                { name: 'Commande.java', depth: 4 },
              ],
            }],
          }],
        },
        {
          label: 'Package ≠ dossier', blocks: [{
            k: 'cols', ratio: 1.1,
            left: [
              {
                k: 'list', items: [
                  '**Package** : une notion du **langage**, un **nom** → `tn.banque.model`',
                  '**Dossier** : un rangement **sur le disque** → `tn/banque/model/`',
                  'Par **convention**, l\'arborescence **reflète** le nom : chaque `.` devient un `/`.',
                  'Noms **en minuscules**, souvent le **domaine inversé** de l\'organisation : `fsm.tn` → `tn.fsm`',
                ],
              },
            ],
            right: [
              { k: 'code', file: 'Terminal', small: true, code: 'javac -d bin src/tn/banque/model/Compte.java' },
              {
                k: 'tree', title: 'Sur le disque',
                nodes: [
                  { name: 'src/tn/banque/model/', depth: 0 },
                  { name: 'Compte.java', depth: 1, note: 'source' },
                  { name: 'bin/tn/banque/model/', depth: 0 },
                  { name: 'Compte.class', depth: 1, note: 'créé par `javac -d`' },
                ],
              },
            ],
          }],
        },
      ],
    }],
  },
  {
    kind: 'content', chapter: C, section: '8. Les paquetages', title: 'Ranger une classe dans un paquetage',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Deux fichiers, deux packages', blocks: [{
            k: 'cols', ratio: 0.8,
            left: [
              {
                k: 'code', small: true, file: 'src/tn/banque/model/Compte.java',
                notes: { 1: 'déclaration du package', 3: 'déclaration de la classe' },
                code: `
package tn.banque.model;

public class Compte {
    public String titulaire = "Amira";
}`,
              },
              { k: 'box', tone: 'info', text: '`package` : **première instruction** du fichier. Le chemin du fichier **reflète** le nom du package.' },
            ],
            right: [{
              k: 'code', small: true, file: 'src/tn/banque/app/Main.java', output: 'Amira',
              notes: { 1: 'déclaration du package', 3: 'instruction import', 7: 'objet d\'un autre package' },
              code: `
package tn.banque.app;

import tn.banque.model.Compte;

public class Main {
    public static void main(String[] args) {
        Compte c = new Compte();
        System.out.println(c.titulaire);
    }
}`,
            }],
          }],
        },
        {
          label: 'Nom complet et `import`', blocks: [
            {
              k: 'table', small: true, head: ['', '`package`', '`import`'],
              rows: [
                ['**Rôle**', 'dit **où** est rangée **ma** classe', 'permet d\'utiliser le **nom court** d\'une classe d\'un **autre** package'],
                ['**Combien ?**', '**au plus un**, en **1ʳᵉ** instruction', 'autant que nécessaire, **après** `package`'],
                ['**Effet**', 'range la classe dans le package', '**ne crée aucun objet**, **ne copie aucune** classe'],
              ],
            },
            {
              k: 'list', items: [
                'Nom **complètement qualifié** : `tn.banque.model.Compte`. Avec l\'`import`, on écrit simplement `Compte`.',
                '`java.lang` est importé **implicitement** : `String`, `System`, `Math`…',
              ],
            },
            { k: 'box', tone: 'attention', text: 'Un **sous-package** est un package **différent** : `tn.banque.model.util` n\'a **pas** accès aux membres *par défaut* de `tn.banque.model`.' },
          ],
        },
        {
          label: 'Mini-quiz', blocks: [{
            k: 'quiz', verify: true,
            question: 'Peut-on utiliser `Compte` dans `Main` en **supprimant** l\'`import` ?',
            codeFile: 'Main.java (sans import)', errorLine: 5,
            code: `
package tn.banque.app;

public class Main {
    public static void main(String[] args) {
        Compte c = new Compte();
        System.out.println(c.titulaire);
    }
}`,
            options: [
              'Oui, sans rien changer',
              'Oui, car `Compte` est `public`',
              'Pas avec `Compte` seul : il faut le **nom complet**',
              'Non, c\'est impossible sans `import`',
            ],
            correct: 2,
            explication: 'Sans `import`, `javac` ne trouve pas `Compte` (*cannot find symbol*). Deux solutions : **rétablir l\'`import`**, ou écrire le **nom complètement qualifié** :\n`tn.banque.model.Compte c = new tn.banque.model.Compte();`',
          }],
        },
        {
          label: 'Variantes d\'`import`', blocks: [
            {
              k: 'table', small: true,
              head: ['Importer…', 'Syntaxe'],
              rows: [
                ['**une classe**', '`import java.util.ArrayList;`'],
                ['**toutes** les classes d\'un paquetage', '`import java.util.*;`'],
                ['un membre **static** (JDK 5+)', '`import static java.lang.Math.PI;`  → on écrit `PI * 2.3`'],
                ['tous les membres **static**', '`import static java.lang.Math.*;`  → on écrit `cos(PI)`'],
              ],
            },
            { k: 'box', tone: 'info', text: '`import java.util.*;` importe les classes de `java.util`, **pas** celles de ses sous-packages (`java.util.function`…).' },
          ],
        },
      ],
    }],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'L\'**encapsulation** : cacher les données',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Le compte', blocks: [
            { k: 'ask', text: 'Pourquoi ne devons-nous **pas** autoriser **toutes** les classes à accéder à **toutes** les données ?' },
            { k: 'scene', state: 'compte' },
          ],
        },
        {
          label: 'Autre classe', blocks: [
            { k: 'ask', text: 'Pourquoi ne devons-nous **pas** autoriser **toutes** les classes à accéder à **toutes** les données ?' },
            { k: 'scene', state: 'app' },
          ],
        },
        {
          label: 'Accès direct', blocks: [
            { k: 'scene', state: 'direct' },
            {
              k: 'quiz', verify: true,
              question: 'Java doit-il **autoriser** cette instruction ?',
              codeFile: 'Application.java (extrait)',
              code: `
CompteBancaire compte = new CompteBancaire();
compte.solde = -5000;`,
              options: [
                'Oui, car l\'attribut est `public`',
                'Non, car un solde négatif est toujours interdit en Java',
                'Non, car une autre classe ne peut jamais modifier un attribut',
              ],
              correct: 0,
              explication: 'Java **autorise** cet accès si `solde` est **`public`** (et la classe `CompteBancaire` accessible). Java ne connaît **pas** les règles métier de notre application.',
              detailTitle: 'Pourquoi pas B ni C ?',
              detail: '**B** : Java n\'a **aucune** règle sur les soldes : `-5000` est un `double` valide.\n**C** : une autre classe **peut** modifier un attribut… s\'il est **accessible**.',
            },
          ],
        },
        {
          label: 'Le risque', blocks: [
            { k: 'p', text: '**Sans contrôle d\'accès** : `Application` modifie **directement** `CompteBancaire.solde`.' },
            { k: 'scene', state: 'risque' },
            {
              k: 'box', tone: 'info',
              text: 'Un solde négatif n\'est pas **intrinsèquement** interdit : **dans cet exemple**, notre **règle métier** interdit le découvert.',
            },
          ],
        },
        {
          label: '`private`', blocks: [
            {
              k: 'cols',
              left: [{
                k: 'code', small: true, file: 'Avant', bad: [2], code: `
public class CompteBancaire {
    public double solde = 1000;
}`,
              }],
              right: [{
                k: 'code', small: true, file: 'Après', highlight: [2], code: `
public class CompteBancaire {
    private double solde = 1000;
}`,
              }],
            },
            { k: 'scene', state: 'private' },
            {
              k: 'code', small: true, file: 'Application.java (extrait)', status: 'ko', bad: [2], code: `
CompteBancaire compte = new CompteBancaire();
compte.solde = -5000;   // error: solde has private access in CompteBancaire`,
            },
          ],
        },
        {
          label: 'Retirer ?', blocks: [
            { k: 'ask', text: 'Maintenant que `solde` est **privé**, comment effectuer un **retrait autorisé** ?' },
            {
              k: 'reveal', tag: 'Question', prompt: 'Proposez une solution, puis révélez la réponse.',
              answer: [{
                k: 'cols', ratio: 1.15,
                left: [{
                  k: 'code', small: true, file: 'CompteBancaire.java', highlight: [5, 6],
                  notes: { 4: 'méthode publique', 5: 'règle métier' },
                  code: `
public class CompteBancaire {
    private double solde = 1000;

    public boolean retirer(double montant) {
        if (montant > 0 && montant <= solde) {
            solde -= montant;
            return true;
        }
        return false;
    }
}`,
                }],
                right: [
                  {
                    k: 'code', small: true, code: `
compte.retirer(100);    // true  : 900 DT
compte.retirer(5000);   // false : refusé`,
                  },
                  { k: 'p', text: 'Les règles métier sont **respectées** : toute modification de `solde` passe par une méthode **prévue** par la classe, qui **vérifie** avant de modifier.' },
                ],
              }],
            },
          ],
        },
        {
          label: 'Interface', blocks: [
            {
              k: 'encap', object: 'compte : CompteBancaire', inner: 'private double solde',
              methods: ['getSolde()', 'deposer(double montant)', 'retirer(double montant)'],
              paths: [
                {
                  from: 'Application', label: 'compte.solde = -5000', ok: false,
                  text: 'Accès **direct** à `solde` : refusé **à la compilation** (`solde has private access in CompteBancaire`).',
                },
                {
                  from: 'Client', label: 'retirer(100)', ok: true, port: 'retirer(double montant)',
                  text: 'Méthode **publique** : `retirer` vérifie `montant > 0` et `montant <= solde`, **puis** modifie `solde` (1000 → 900 DT).',
                },
                {
                  from: 'Gestionnaire', label: 'getSolde()', ok: true, port: 'getSolde()',
                  text: '**Consultation** : `getSolde()` renvoie la valeur **sans** permettre de la modifier.',
                },
              ],
            },
            { k: 'box', tone: 'retenir', text: '`private` ne bloque pas l\'**utilisation** de l\'objet : il oblige les autres classes à passer par son **interface publique**.' },
          ],
        },
        {
          label: 'Idées clés', blocks: [
            {
              k: 'flow', steps: [
                { label: 'État interne', sub: 'attributs `private`' },
                { label: 'Interface publique', sub: 'méthodes `public`' },
                { label: 'Invariant préservé', sub: '`solde ≥ 0`, toujours' },
              ],
            },
            {
              k: 'list', items: [
                'But : **séparer** la façon dont les données sont **stockées** de la façon dont elles sont **utilisées**.',
                '**Invariant** : règle **toujours vraie** pour un objet valide. Chaque modification passe par un **contrôle**.',
              ],
            },
            { k: 'box', tone: 'attention', text: 'Encapsuler, ce n\'est **pas** seulement « tout mettre en `private` » : c\'est **protéger les règles métier** de l\'objet.' },
          ],
        },
      ],
    }],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Quiz : attribut **private**',
    blocks: [{
      k: 'quiz', verify: true,
      question: 'On compile puis on exécute `Test`. Que se passe-t-il ?',
      codeFile: 'Test.java', errorLine: 8,
      code: `
class Etudiant {
    private int note = 15;
}

public class Test {
    public static void main(String[] args) {
        Etudiant e = new Etudiant();
        System.out.println(e.note);
    }
}`,
      options: ['Affiche `15`', 'Affiche `0`', 'Erreur de compilation', 'Erreur à l\'exécution'],
      correct: 2,
      explication: '`note` est **`private`** : seul le code de `Etudiant` y accède. `javac` **refuse** `Test` : le programme ne **démarre jamais**.',
      error: 'Test.java:8: error: note has private access in Etudiant',
      detail: '**Compilation** : `javac` vérifie le code **avant** l\'exécution. En cas d\'erreur, on ne peut pas lancer le programme.\n**Exécution** : le code compile, démarre, **puis** échoue (ex. division par zéro).',
    }],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Getters et setters',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Getter, setter et `this`', blocks: [{
            k: 'cols', ratio: 1.05,
            left: [{
              k: 'code', small: true, file: 'Personne.java', highlight: [9],
              notes: { 4: 'getter : consulter', 8: 'setter : demander', 10: 'attribut ← paramètre' },
              code: `
public class Personne {
    private int age;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
}`,
            }],
            right: [
              {
                k: 'list', items: [
                  '**Getter** (accesseur) : **consulter** un état.',
                  '**Setter** (modificateur) : **demander** une modification. Il peut **refuser** une valeur invalide.',
                ],
              },
              { k: 'box', tone: 'info', title: 'Le mot-clé this', text: '`this` = l\'**objet courant**.\nDans `setAge`, `this.age` est l\'**attribut**, `age` est le **paramètre**.' },
            ],
          }],
        },
        {
          label: 'Lecture seule ou modifiable ?', blocks: [{
            k: 'cols', ratio: 1.05,
            left: [{
              k: 'code', small: true, file: 'Etudiant.java', notes: { 8: 'getter seul' },
              code: `
public class Etudiant {
    private String matricule;

    public Etudiant(String matricule) {
        this.matricule = matricule;
    }

    public String getMatricule() {
        return matricule;
    }
}`,
            }],
            right: [
              {
                k: 'list', items: [
                  '**Lecture seule** : un getter, **pas de setter**. Le matricule est fixé à la **construction**.',
                  '**Librement modifiable** : un setter **sans contrôle** par attribut ≈ attributs `public` déguisés.',
                ],
              },
              { k: 'box', tone: 'retenir', text: 'Une classe encapsulée **n\'a pas nécessairement** besoin d\'un setter **pour chaque attribut**.' },
            ],
          }],
        },
        {
          label: '`setSolde` ou `deposer` ?', blocks: [
            {
              k: 'cols',
              left: [
                { k: 'box', tone: 'attention', title: 'Contourne les règles', text: '`setSolde(double valeur)` : n\'importe quelle valeur est **acceptée**.' },
                {
                  k: 'code', bad: [2], code: `
public void setSolde(double valeur) {
    solde = valeur;   // -5000 ? accepté
}`,
                },
              ],
              right: [
                { k: 'box', tone: 'retenir', title: 'Opération métier contrôlée', text: '`deposer(double montant)` : le montant est **vérifié**.' },
                {
                  k: 'code', highlight: [2], code: `
public boolean deposer(double montant) {
    if (montant > 0) {
        solde += montant;
        return true;
    }
    return false;
}`,
                },
              ],
            },
            { k: 'p', text: 'Préférer des **méthodes métier** (`deposer`, `retirer`) qui **appliquent les règles**.' },
          ],
        },
      ],
    }],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Les **niveaux de visibilité**',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Tout `private` ?', blocks: [
            { k: 'ask', text: 'Faut-il alors déclarer **tous** les éléments `private` ?' },
            {
              k: 'progressive', button: 'Niveau suivant', cols: 4,
              items: [
                [
                  { k: 'p', text: '`private` : les **détails internes**.' },
                  { k: 'code', small: true, highlight: [2], bad: [3], code: 'private double solde;\n// ✓ dans la classe\n// ✗ partout ailleurs' },
                ],
                [
                  { k: 'p', text: '*Aucun modificateur* : le **même package**.' },
                  { k: 'code', small: true, highlight: [2], bad: [3], code: 'double taux;\n// ✓ même package\n// ✗ autre package' },
                ],
                [
                  { k: 'p', text: '`protected` : package **+** accès liés à l\'**héritage**.' },
                  { k: 'code', small: true, highlight: [2, 3], code: 'protected void log()\n// ✓ même package\n// ✓* sous-classes' },
                ],
                [
                  { k: 'p', text: '`public` : l\'**extérieur**, si la **classe** est accessible.' },
                  { k: 'code', small: true, highlight: [2], code: 'public double getSolde()\n// ✓ partout' },
                ],
                [{ k: 'box', tone: 'retenir', text: '**Non** : on choisit le niveau **le plus restrictif** qui permet l\'usage prévu. Base : attributs `private`, méthodes de l\'interface `public`.' }],
              ],
            },
          ],
        },
        {
          label: 'Le package', blocks: [
            {
              k: 'pkgs', packages: [
                {
                  name: 'universite', classes: [
                    { name: 'Etudiant', lines: ['public class Etudiant {', '  String nom = "Amira";', '}'] },
                    { name: 'Enseignant', lines: ['Etudiant e = new Etudiant();', 'System.out.println(e.nom);'], verdict: { ok: true, text: '✓ même package' } },
                  ],
                },
                {
                  name: 'application', classes: [
                    { name: 'Main', lines: ['import universite.Etudiant;', 'System.out.println(e.nom);'], verdict: { ok: false, text: '✗ autre package : refusé' } },
                  ],
                },
              ],
            },
            {
              k: 'reveal', tag: 'Question', prompt: 'Pourquoi `Main` ne peut-il pas accéder à `nom`, **même avec un `import`** ?',
              answer: [
                { k: 'p', text: 'Parce qu\'un **`import` ne modifie pas la visibilité** : il donne seulement un **nom court**. Sans modificateur, l\'accès est limité au **package**.' },
                { k: 'code', plain: true, small: true, code: 'error: nom is not public in Etudiant; cannot be accessed from outside package' },
              ],
            },
            { k: 'box', tone: 'attention', text: '« *default* » (ou *package-private*) est un **terme pédagogique** : ce n\'est **pas** un modificateur à écrire. On n\'écrit **rien**.' },
          ],
        },
        {
          label: 'Matrice', blocks: [{
            k: 'vismatrix',
            mods: [
              {
                label: '`public`',
                code: `
public class CompteBancaire {
    private double solde;
    public double getSolde() { return solde; }
}`,
                note: 'Accessible **partout**… à condition que la **classe** soit elle-même accessible (`public class`).',
              },
              {
                label: '`protected`',
                code: `
// banque/CompteBancaire.java
package banque;
public class CompteBancaire {
    protected void journaliser() { }
}
// epargne/CompteEpargne.java
package epargne;
import banque.CompteBancaire;
class CompteEpargne extends CompteBancaire {
    void m() { journaliser(); }   // ✓ hérité
}`,
                note: '**✓\\*** : depuis une sous-classe d\'un **autre package**, accès au membre **hérité** (via `this` ou le type de la sous-classe), **pas** via une référence `CompteBancaire` quelconque.',
              },
              {
                label: '*package-private*',
                code: `
package banque;
public class CompteBancaire {
    double taux = 0.02;   // aucun mot-clé
}`,
                note: '**Même package** seulement : une **sous-classe** d\'un autre package n\'y accède **pas**. On n\'écrit **aucun** mot-clé.',
              },
              {
                label: '`private`',
                code: `
public class CompteBancaire {
    private double solde;
    void afficher() {
        System.out.println(solde);   // ✓
    }
}`,
                note: '**Seulement** dans la classe. Même package ou sous-classe : **refusé**.',
              },
            ],
            rows: [
              { label: 'Même **classe**', cells: ['✓', '✓', '✓', '✓'] },
              { label: 'Même **package**', cells: ['✓', '✓', '✓', '✗'] },
              { label: '**Sous-classe**, autre package', cells: ['✓', '✓*', '✗', '✗'] },
              { label: '**Autre classe**, autre package', cells: ['✓', '✗', '✗', '✗'] },
            ],
          }],
        },
        {
          label: 'Tester : compile ou pas ?', blocks: [{
            k: 'access',
            declFile: 'tn/banque/model/Compte.java',
            decl: `
package tn.banque.model;

public class Compte {
    {MOD}double solde = 100;
}`,
            mods: [
              { label: '`public`', kw: 'public ' },
              { label: '`protected`', kw: 'protected ' },
              { label: '*défaut*', kw: '' },
              { label: '`private`', kw: 'private ' },
            ],
            contexts: [
              {
                label: 'Même classe', file: 'tn/banque/model/Compte.java', line: 7, same: true, code: `
package tn.banque.model;

public class Compte {
    {MOD}double solde = 100;

    void afficher() {
        System.out.println(solde);
    }
}`,
              },
              {
                label: 'Même package', file: 'tn/banque/model/Banque.java', line: 5, code: `
package tn.banque.model;

class Banque {
    void afficher(Compte c) {
        System.out.println(c.solde);
    }
}`,
              },
              {
                label: 'Sous-classe (`this`)', file: 'tn/banque/epargne/CompteEpargne.java', line: 7, code: `
package tn.banque.epargne;

import tn.banque.model.Compte;

public class CompteEpargne extends Compte {
    void afficher() {
        System.out.println(this.solde);
    }
}`,
              },
              {
                label: 'Sous-classe (réf. `Compte`)', file: 'tn/banque/epargne/CompteEpargne.java', line: 7, code: `
package tn.banque.epargne;

import tn.banque.model.Compte;

public class CompteEpargne extends Compte {
    void afficher(Compte autre) {
        System.out.println(autre.solde);
    }
}`,
              },
              {
                label: 'Autre package', file: 'tn/banque/app/Main.java', line: 7, code: `
package tn.banque.app;

import tn.banque.model.Compte;

public class Main {
    void afficher(Compte c) {
        System.out.println(c.solde);
    }
}`,
              },
            ],
            results: [
              [
                { ok: true, text: 'Dans **sa propre classe**, un membre est **toujours** accessible.' },
                { ok: true, text: 'Dans **sa propre classe**, un membre est **toujours** accessible.' },
                { ok: true, text: 'Dans **sa propre classe**, un membre est **toujours** accessible.' },
                { ok: true, text: 'Même `private` : on est **dans** la classe `Compte`.' },
              ],
              [
                { ok: true, text: '`public` : accessible **partout**.' },
                { ok: true, text: '`protected` inclut le **même package**.' },
                { ok: true, text: '*Défaut* = **même package** : `Banque` et `Compte` sont dans `tn.banque.model`.' },
                { ok: false, text: '`private` : **seulement dans `Compte`**, même pour une classe du même package.', error: 'solde has private access in Compte' },
              ],
              [
                { ok: true, text: '`public` : accessible **partout**.' },
                { ok: true, text: 'La sous-classe accède au `solde` **hérité**, via `this`.' },
                { ok: false, text: '*Défaut* : la sous-classe est dans un **autre package**. L\'héritage n\'y change rien.', error: 'solde is not public in Compte; cannot be accessed from outside package' },
                { ok: false, text: '`private` : même une **sous-classe** n\'y a pas accès.', error: 'solde has private access in Compte' },
              ],
              [
                { ok: true, text: '`public` : accessible **partout**.' },
                { ok: false, text: 'Hors du package, `protected` passe **par l\'héritage** (`this`), pas par une référence `Compte` quelconque.', error: 'solde has protected access in Compte' },
                { ok: false, text: '*Défaut* : **autre package** → refusé.', error: 'solde is not public in Compte; cannot be accessed from outside package' },
                { ok: false, text: '`private` : **seulement dans `Compte`**.', error: 'solde has private access in Compte' },
              ],
              [
                { ok: true, text: '`public` : accessible **partout** (ici grâce à l\'`import`).' },
                { ok: false, text: '`Main` n\'est **ni** dans le package, **ni** une sous-classe.', error: 'solde has protected access in Compte' },
                { ok: false, text: '*Défaut* : **autre package** → refusé.', error: 'solde is not public in Compte; cannot be accessed from outside package' },
                { ok: false, text: '`private` : **seulement dans `Compte`**.', error: 'solde has private access in Compte' },
              ],
            ],
          }],
        },
        {
          label: 'Visibilité ≠ encapsulation', blocks: [
            { k: 'ask', text: 'Quelle différence entre **visibilité** et **encapsulation** ?' },
            {
              k: 'progressive', button: 'Révéler la suite',
              items: [
                [{ k: 'box', tone: 'info', title: 'Visibilité', text: 'Définit **depuis quelles parties** du programme un élément Java est **accessible**.' }],
                [{ k: 'box', tone: 'info', title: 'Encapsulation', text: 'Principe de **conception** : **maîtriser** l\'exposition et les modifications de l\'**état** et de l\'**implémentation** d\'un objet.' }],
                [{ k: 'box', tone: 'retenir', text: 'La visibilité est un **mécanisme Java** au service de l\'**encapsulation**.' }],
              ],
            },
          ],
        },
        {
          label: 'Mini-quiz', blocks: [{
            k: 'quiz', verify: true,
            question: 'Un attribut `private` avec un **setter public** qui accepte **n\'importe quelle valeur** garantit-il **toujours** une bonne encapsulation ?',
            codeFile: 'CompteBancaire.java', errorLine: 5,
            code: `
public class CompteBancaire {
    private double solde;

    public void setSolde(double valeur) {
        solde = valeur;
    }
}`,
            options: [
              'Oui : l\'attribut est `private`',
              'Non : il faut aussi **contrôler** les modifications',
              'Oui, à condition d\'ajouter un getter',
            ],
            correct: 1,
            explication: '`setSolde(-5000)` est **accepté** : l\'invariant `solde ≥ 0` n\'est pas protégé. Il faut **contrôler** les modifications et **préserver les invariants**.',
            detailTitle: 'Visibilité et encapsulation',
            detail: '`private` = la **visibilité** (mécanisme).\nLe **contrôle** dans les méthodes = l\'**encapsulation** (conception).',
          }],
        },
      ],
    }],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'La visibilité d\'une **classe**',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Classe ou membre ?', blocks: [
            { k: 'p', text: 'Deux niveaux d\'accès : la **classe** (le type), puis ses **membres** (attributs, méthodes).' },
            {
              k: 'cols', ratio: 0.62,
              left: [{
                k: 'code', small: true, file: 'Client.java',
                notes: { 1: 'visible partout', 4: 'son package' },
                code: `
public class Client {
}

class ClientInterne {
}`,
              }],
              right: [{
                k: 'table', small: true,
                head: ['Classe de premier niveau', 'Effet'],
                rows: [
                  ['`public class A`', '**partout** ; une seule par fichier : **`A.java`**'],
                  ['`class A` *(rien)*', '**dans son package** seulement'],
                  ['`private` ou `protected`', '**interdit** (erreur de compilation)'],
                  ['`final class A`', '**aucune** classe fille'],
                  ['`abstract class A`', '**non instanciable** (chapitre 3)'],
                ],
              }],
            },
            { k: 'box', tone: 'info', text: 'Une classe **imbriquée** (déclarée **dans** une autre classe) peut, elle, être `private` ou `protected`.' },
          ],
        },
        {
          label: 'Exemple : deux packages', blocks: [
            {
              k: 'cols', ratio: 0.85,
              left: [{
                k: 'code', small: true, file: 'tn/banque/model/Client.java', highlight: [8], code: `
package tn.banque.model;

public class Client {
    public String nom = "Amira";
}

class ClientInterne {
    public String code = "X42";
}`,
              }],
              right: [{
                k: 'code', small: true, file: 'tn/banque/app/Main.java', status: 'ko', bad: [4], highlight: [8, 9], code: `
package tn.banque.app;

import tn.banque.model.Client;
import tn.banque.model.ClientInterne; // ✗

public class Main {
    public static void main(String[] args) {
        Client c = new Client();       // ✓
        System.out.println(c.nom);     // ✓
    }
}`,
              }],
            },
            { k: 'box', tone: 'retenir', text: '`code` est `public`… mais `ClientInterne` ne l\'est pas : un membre `public` **reste inaccessible** si sa **classe** ne l\'est pas.' },
          ],
        },
      ],
    }],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Exemple : protéger un point polaire',
    blocks: [{
      k: 'steps', items: POINT_STEPS.map(s => ({
        label: s.label,
        blocks: [{
          k: 'cols' as const, ratio: 0.68,
          left: [{ k: 'polar' as const }, s.box],
          right: [{ k: 'code' as const, small: true, file: 'Point.java', code: POINT, hidden: s.hidden, highlight: s.highlight }],
        }],
      })),
    }],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Exemple : changer l\'implémentation sans rien casser',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Deux implémentations', blocks: [
            {
              k: 'cols', ratio: 0.88,
              left: [{
                k: 'code', small: true, file: 'A · Point.java (extrait)', highlight: [2, 3, 6, 7, 10, 11], code: `
public class Point {
    private double rho;
    private double theta;

    public Point(double rho, double theta) {
        setRho(rho);
        this.theta = theta;
    }

    public double getRho()   { return rho; }
    public double getTheta() { return theta; }

    // setRho(...) : refuse rho < 0
}`,
              }],
              right: [{
                k: 'code', small: true, file: 'B · Point.java (extrait)', highlight: [2, 3, 6, 7, 8, 11, 12], code: `
public class Point {
    private double x;
    private double y;

    public Point(double rho, double theta) {
        x = Math.cos(theta);
        y = Math.sin(theta);
        setRho(rho);
    }

    public double getRho()   { return Math.hypot(x, y); }
    public double getTheta() { return Math.atan2(y, x); }

    // setRho(...) : refuse rho < 0, garde l'angle
}`,
              }],
            },
            { k: 'p', text: '**A** stocke `rho`, `theta` ; **B** stocke `x`, `y` et **calcule** distance et angle. **Même interface publique.**' },
          ],
        },
        {
          label: 'Le client ne change pas', blocks: [{
            k: 'cols', ratio: 0.55,
            left: [
              { k: 'polar', cartesian: true },
              { k: 'box', tone: 'retenir', text: 'Avec **A** comme avec **B** : même sortie. L\'**API** est stable → le code client **reste inchangé**.' },
            ],
            right: [
              {
                k: 'code', small: true, file: 'Main.java', output: '5.0\n0.7853981633974483', code: `
public class Main {
    public static void main(String[] args) {
        Point p = new Point(2, Math.PI / 4);
        p.setRho(5);
        System.out.println(p.getRho());
        System.out.println(p.getTheta());
    }
}`,
              },
            ],
          }],
        },
        {
          label: 'Attention aux détails', blocks: [
            {
              k: 'table', small: true,
              head: ['Appel', '**A** (`rho`, `theta`)', '**B** (`x`, `y`)'],
              rows: [
                ['`new Point(3, 1.0).getTheta()`', '`1.0`', '`0.9999999999999999`'],
                ['`new Point(1, 3 * Math.PI).getTheta()`', '`9.42477796076938`', '`3.1415926535897927`'],
                ['`new Point(0, 1.0)`, puis `setRho(4)`, puis `getTheta()`', '`1.0`', '`0.0`'],
              ],
            },
            { k: 'box', tone: 'attention', title: 'Pas d\'équivalence parfaite garantie', text: '**Arrondis**, angle **ramené** dans ]−π, π], angle **perdu** quand `rho = 0` : le comportement observable **change**.' },
            { k: 'box', tone: 'retenir', text: 'L\'encapsulation rend le changement **possible** ; respecter le **contrat** des méthodes le rend **sans risque**.' },
          ],
        },
      ],
    }],
  },
  {
    kind: 'content', chapter: C, title: 'Chapitre 2 — À retenir',
    blocks: [
      {
        k: 'cards', items: [
          { title: 'Packages', text: 'regrouper les classes ; un **espace de noms** : `tn.banque.model`' },
          { title: '`package` / `import`', text: '`package` : **où** est ma classe ; `import` : **nom court** d\'une autre' },
          { title: 'Encapsulation', text: 'état **`private`** + méthodes qui **protègent les invariants**' },
          { title: 'Getters, setters, métier', text: '**consulter** / **demander** ; pas de setter **par réflexe**' },
          { title: 'Visibilité', text: '`public`, `protected`, *défaut*, `private`' },
        ],
      },
      {
        k: 'qa', items: [
          { q: 'Différence entre `package` et `import` ?', a: '`package` **déclare** le package de la classe du fichier ; `import` permet d\'utiliser le **nom court** d\'une classe d\'un **autre** package.' },
          { q: 'Pourquoi utiliser `private` ?', a: 'Pour que **seule la classe** modifie son état et **garantisse ses invariants** (ex. `solde ≥ 0`).' },
          { q: 'Un setter est-il toujours nécessaire ?', a: '**Non** : seulement si la modification a un **sens métier**. Sinon : lecture seule ou méthode métier (`deposer`).' },
          { q: 'Différence entre `protected` et *défaut* ?', a: 'Les deux : **même package**. `protected` ajoute les **sous-classes** des autres packages, via l\'**héritage**.' },
        ],
      },
      { k: 'p', text: '**Chapitre 3** : l\'**héritage** — réutiliser une classe avec `extends`… et voir `protected` en action.' },
    ],
  },
]
