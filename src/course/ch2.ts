import type { Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   CHAPITRE 2 — Classes et objets en Java
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch2'

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
    blocks: [
      {
        k: 'list', items: [
          'Un paquetage **regroupe des classes** (comme un dossier / une bibliothèque).',
          'Intérêt : **organiser** par fonctionnalité et **protéger** attributs et méthodes.',
          'Convention : nom **toujours en minuscules**.',
        ],
      },
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
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Les paquetages', title: 'Ranger une classe dans un paquetage',
    blocks: [
      { k: 'p', text: 'On écrit **`package nom;`** en **première ligne** du fichier source.' },
      {
        k: 'cols',
        left: [{
          k: 'code', small: true, file: 'Voiture.java', code: `
package vehicule;

public class Voiture { ... }
class Moto { ... }`,
        }],
        right: [{
          k: 'code', small: true, file: 'VoitureEssence.java', code: `
package vehicule.voiture;

public class VoitureEssence { ... }
class VoitureDiesel { ... }`,
        }],
      },
      {
        k: 'table', small: true, head: ['Classe', 'Emplacement du `.class`'],
        rows: [
          ['`Voiture`, `Moto`', '`vehicule/Voiture.class`, `vehicule/Moto.class`'],
          ['`VoitureEssence`, `VoitureDiesel`', '`vehicule/voiture/VoitureEssence.class`, …'],
        ],
      },
      { k: 'code', code: 'javac -d rep_racine Voiture.java   // range le .class dans rep_racine/vehicule/', small: true },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'L\'**encapsulation** : cacher les données',
    blocks: [
      {
        k: 'list', items: [
          'But : **séparer** la façon dont les données sont **stockées** de la façon dont elles sont **utilisées**.',
          'On **cache l\'implémentation** ; les autres classes passent par des **méthodes**.',
        ],
      },
      {
        k: 'table',
        head: ['Modificateur', 'Qui a accès ?'],
        rows: [
          ['**`private`**', 'Seulement la **classe** où le membre est déclaré'],
          ['*(rien)* **par défaut**', 'Les classes du **même paquetage**'],
          ['**`protected`**', 'Voir chapitre 3 (héritage)'],
          ['**`public`**', '**Toutes** les classes'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Quiz : attribut **private**',
    blocks: [{
      k: 'quiz', question: 'Que se passe-t-il à la compilation de `Test` ?',
      code: `
class Point {
    private int x;
}

class Test {
    public static void main(String[] args) {
        Point p = new Point();
        p.x = 5;
    }
}`,
      options: [
        'Ça compile : `x` vaut `5`',
        '**Erreur de compilation** : `x` est `private`',
        "Erreur à l'exécution",
        'Ça compile, mais `x` reste à `0`',
      ],
      correct: 1,
      explication: 'Un attribut **`private`** n\'est accessible que **dans sa classe**. Depuis `Test`, il faut passer par un **setter**.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Getters et setters',
    blocks: [
      {
        k: 'list', items: [
          'Autant que possible, les **attributs** sont **`private`**.',
          '**Lire** un attribut → un **accesseur** : `getXxx()`',
          '**Modifier** un attribut → un **modificateur** : `setXxx(...)`, qui peut **vérifier** la valeur.',
        ],
      },
      {
        k: 'code', code: `
class Compte {
    private double solde;

    public double getSolde() { return solde; }

    public void setSolde(double s) {
        if (s < 0) throw new IllegalArgumentException("solde négatif");
        solde = s;
    }
}`,
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Les **niveaux de visibilité**',
    blocks: [
      {
        k: 'table',
        head: ['Modificateur', 'Même classe', 'Même paquetage', 'Classe fille (autre paquetage)', 'Partout'],
        rows: [
          ['`public`', '✓', '✓', '✓', '✓'],
          ['`protected`', '✓', '✓', '✓', '✗'],
          ['*aucun* (par défaut)', '✓', '✓', '✗', '✗'],
          ['`private`', '✓', '✗', '✗', '✗'],
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Plus on **restreint** l\'accès, plus la classe est **protégée**. Règle de base : attributs **`private`**, méthodes utiles **`public`**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'La visibilité d\'une **classe**',
    blocks: [
      {
        k: 'table',
        head: ['Déclaration', 'Effet'],
        rows: [
          ['`public class A`', 'accessible **partout** ; le fichier s\'appelle **`A.java`**'],
          ['`class A` (sans modificateur)', 'accessible **seulement** dans son **paquetage**'],
          ['`final class A`', '**aucune** classe fille possible'],
          ['`abstract class A`', '**non instanciable** (voir chapitre 3)'],
        ],
      },
      { k: 'box', tone: 'attention', text: '**Une seule** classe `public` par fichier `.java`. Une classe de premier niveau ne peut **pas** être `private`.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Exemple : protéger un point polaire',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'box', tone: 'attention', title: 'Sans encapsulation', text: 'N\'importe qui peut écrire `p.rho = -1;` → donnée **aberrante** (un rayon est ≥ 0).' },
          { k: 'code', small: true, code: `
class Point {
    double rho;
    double theta;
}

// ailleurs :
p.rho = -1;     // accepté !` },
        ],
        right: [
          { k: 'box', tone: 'retenir', title: 'Avec encapsulation', text: 'Les attributs sont **`private`** ; le **setter refuse** les valeurs invalides.' },
          { k: 'code', small: true, code: `
class Point {
    private double rho;
    private double theta;

    void setRho(double r) {
        if (r < 0)
            throw new IllegalArgumentException();
        rho = r;
    }
}
// p.rho = -1;  → ne compile pas
p.setRho(5.0);  // OK` },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Encapsulation', title: 'Exemple : changer l\'implémentation sans rien casser',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'p', text: '**Version 1** : deux attributs' },
          { k: 'code', small: true, code: `
class Segment {
    private Point p1, p2;

    Segment(Point p1, Point p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    public void setFstPoint(int x, int y) {
        p1.x = x;
        p1.y = y;
    }
}` },
        ],
        right: [
          { k: 'p', text: '**Version 2** : un tableau' },
          { k: 'code', small: true, code: `
class Segment {
    private Point[] tab;

    Segment(Point p1, Point p2) {
        tab = new Point[2];
        tab[0] = p1;
        tab[1] = p2;
    }

    public void setFstPoint(int x, int y) {
        tab[0].x = x;
        tab[0].y = y;
    }
}` },
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Les classes qui utilisent `Segment` appellent `setFstPoint(...)` : **elles ne changent pas**.' },
    ],
  },
  {
    kind: 'content', chapter: C, title: 'Chapitre 2 — À retenir',
    blocks: [
      {
        k: 'list', items: [
          '**Classe** = modèle ; **objet** = instance créée avec **`new`**.',
          'Une variable objet contient une **référence** : `p2 = p1` ne copie **pas** l\'objet.',
          '**Constructeur** : même nom que la classe, **sans type de retour** ; `this(...)` en 1ʳᵉ ligne.',
          '`String` est **immuable** ; on compare avec **`equals`**, jamais `==`.',
          '**Surcharge** : même nom, **paramètres différents**.',
          '**`static`** = partagé par la classe, **sans `this`**.',
          'Passage **par valeur** : on peut modifier l\'**objet**, pas la **variable** de l\'appelant.',
          'Attributs **`private`** + **getters / setters**.',
          '**Tableaux** : taille fixe ; `ArrayList` : **redimensionnable**. Un tableau passé en paramètre est **modifiable** par la méthode.',
          '**Visibilité** : `public`, `protected`, par défaut, `private`.',
        ],
      },
    ],
  },
]
