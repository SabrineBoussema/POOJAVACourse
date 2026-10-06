import type { Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   CHAPITRE 3 — Héritage, classes abstraites et interfaces
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch3'

export const CH3: Slide[] = [
  {
    kind: 'chapter', chapter: C, number: '3', title: 'Héritage, classes abstraites et interfaces',
    goals: [
      '**Héritage** : `extends`, `super`',
      '**Redéfinition** vs **surcharge**',
      '`equals`, `toString`, `@Override`',
      '**Upcast**, **downcast**, `instanceof`',
      '**Polymorphisme**',
      '`protected` et `final`',
      '**Classes abstraites**',
      '**Interfaces** : `implements`, `Comparable`',
    ],
  },

  /* ── 1. Héritage ────────────────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '1. Héritage', title: 'Le problème : adapter une classe existante',
    blocks: [
      { k: 'p', text: 'Une classe `A` nous convient **presque** : on veut changer **quelques détails** ou **ajouter** une fonctionnalité.' },
      {
        k: 'cols',
        left: [
          { k: 'box', tone: 'attention', title: 'Solution 1 : copier-coller A', text: '• Le code de `A` n\'est **pas toujours disponible**.\n• **Difficile à maintenir** : chaque amélioration de `A` doit être recopiée.' },
        ],
        right: [
          { k: 'box', tone: 'retenir', title: 'Solution 2 : hériter de A', text: '• On écrit une classe `B` qui se comporte **comme `A`**, avec quelques **différences**.\n• Il suffit du **code compilé** de `A`.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Héritage', title: 'Classe **mère**, classe **fille**',
    blocks: [
      { k: 'p', text: 'L\'**héritage** permet de **spécialiser** une classe existante. La classe **fille** (sous-classe) hérite de la classe **mère** (super-classe).' },
      {
        k: 'p', text: 'Dans la classe fille, on trouve :',
      },
      {
        k: 'list', items: [
          'les **attributs** et **méthodes** de la classe mère ;',
          'de **nouveaux** attributs et de **nouvelles** méthodes ;',
          'des méthodes **redéfinies** (*overriding*) : **même signature**, code différent.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Héritage', title: 'L\'héritage en Java : `extends`',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'code', code: `
class B extends A { ... }
class C extends A { ... }
class D extends B { ... }

A a = new B();   // OK : un B "est-un" A` },
        ],
        right: [
          {
            k: 'list', items: [
              'Chaque classe a **une seule** classe mère.',
              '`B` est un **sous-type** de `A` : partout où on attend un `A`, on peut mettre un `B`.',
              'Relation **« est-un »** : un `B` **est un** `A`.',
            ],
          },
        ],
      },
      { k: 'box', tone: 'retenir', text: 'La classe **`Object`** est la **mère de toutes les classes** Java.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Héritage', title: 'La classe **`Object`** : mère de toutes les classes',
    blocks: [
      {
        k: 'table',
        head: ['Méthode', 'Version par défaut', 'À redéfinir pour…'],
        rows: [
          ['`toString()`', 'nom de la classe + `@` + un **code** (ex. `Point@1b6d3586`)', 'une **description lisible**'],
          ['`equals(o)`', 'compare les **références** (comme `==`)', 'comparer l\'**état** des objets'],
          ['`hashCode()`', 'un **entier** calculé à partir de l\'objet', 'rester **cohérent** avec `equals`'],
        ],
      },
      {
        k: 'code', small: true, code: `
Point p = new Point(1, 2);
System.out.println(p);      // Point@1b6d3586  (le nombre change d'une exécution à l'autre)`,
      },
      { k: 'box', tone: 'retenir', text: 'Une classe **sans** `extends` hérite **automatiquement** de **`Object`**.' },
    ],
  },

  /* ── 2. Constructeurs ───────────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '2. Constructeur de sous-classe', title: 'Appeler le constructeur de la mère : `super(...)`',
    blocks: [
      {
        k: 'cols', ratio: 0.9,
        left: [{
          k: 'code', small: true, code: `
class Point {
    private int x, y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public void dessineToi() {
        System.out.println("Point");
    }
}`,
        }],
        right: [{
          k: 'code', small: true, code: `
class PointColore extends Point {
    private Color couleur;

    PointColore(int xx, int yy, Color c) {
        super(xx, yy);      // constructeur de Point
        couleur = c;
    }

    PointColore(int x, int y) {
        this(x, y, Color.BLACK); // autre constructeur
    }
}`,
        }],
      },
      {
        k: 'box', tone: 'attention',
        text: '**Première instruction** d\'un constructeur : `this(...)` (même classe) **ou** `super(...)` (classe mère).',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Constructeur de sous-classe', title: 'Le `super()` **implicite**',
    blocks: [
      { k: 'p', text: 'Si la 1ʳᵉ instruction n\'est **ni `super(...)` ni `this(...)`**, le compilateur ajoute **`super();`**' },
      {
        k: 'cols',
        left: [{ k: 'code', code: `
// ce que vous écrivez :
Salarie(int s) { salaire = s; }

// ce que le compilateur comprend :
Salarie(int s) { super(); salaire = s; }` }],
        right: [
          { k: 'code', code: `
class A {
    private int i;
    A(int i) { this.i = i; }
}

class B extends A {
    B() { }   // ERREUR de compilation
}` },
        ],
      },
      {
        k: 'box', tone: 'attention',
        text: 'Pourquoi l\'erreur ? `B()` appelle `super()`, mais `A` **n\'a pas** de constructeur **sans paramètre**.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Constructeur de sous-classe', title: 'Quiz : ordre des **constructeurs**',
    blocks: [{
      k: 'quiz', question: 'Que s\'affiche quand on exécute `new B();` ?',
      code: `
class A {
    A() { System.out.println("A"); }
}

class B extends A {
    B() { System.out.println("B"); }
}`,
      options: [
        '`B`',
        '`A` puis `B`',
        '`B` puis `A`',
        'Erreur de compilation',
      ],
      correct: 1,
      explication: 'Le constructeur de `B` commence par un **`super();` implicite** : celui de la **mère** s\'exécute **d\'abord**.',
    }],
  },

  /* ── 3. Redéfinition ────────────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '3. Redéfinition', title: '**Redéfinition** ≠ **surcharge**',
    blocks: [
      {
        k: 'table',
        head: ['', '**Redéfinition** (overriding)', '**Surcharge** (overloading)'],
        rows: [
          ['Où ?', 'Dans une **classe fille**', 'Dans la même classe (ou une fille)'],
          ['Nom', 'Même nom', 'Même nom'],
          ['Paramètres', '**Identiques** (même signature)', '**Différents**'],
          ['But', '**Remplacer** le code hérité', '**Ajouter** une variante'],
        ],
      },
      {
        k: 'code', code: `
class PointColore extends Point {
    @Override
    public void dessineToi() {
        super.dessineToi();   // réutilise le code de Point
        changerCouleur();     // puis ajoute un comportement
    }
}`,
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Redéfinition', title: 'Redéfinition et **visibilité**',
    blocks: [
      {
        k: 'cols', ratio: 1.5,
        left: [{
          k: 'code', code: `
class A {
    public void f() { }
}

class B extends A {
    void f() { }    // ERREUR : accès réduit
}`,
        }],
        right: [{
          k: 'table', small: true,
          head: ['Dans la mère', 'Redéfinition possible en'],
          rows: [
            ['`public`', '`public`'],
            ['`protected`', '`protected` ou `public`'],
            ['*par défaut*', 'par défaut, `protected` ou `public`'],
            ['`private`', '**impossible** (non héritée)'],
          ],
        }],
      },
      { k: 'box', tone: 'retenir', text: 'La méthode redéfinie doit être **aussi visible**, ou **plus visible**, que celle de la mère.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Redéfinition', title: 'Quelle méthode est **appelée** ?',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'p', text: '**Cas 1** : la fille **ne redéfinit pas** `avancer()`.' },
          {
            k: 'code', small: true, code: `
class Vehicule {
    void avancer() {
        System.out.println("j'avance !");
    }
}
class Voiture extends Vehicule { }

new Voiture().avancer();`, output: "j'avance !",
          },
        ],
        right: [
          { k: 'p', text: '**Cas 2** : la fille **redéfinit** `avancer()`.' },
          {
            k: 'code', small: true, code: `
class Voiture extends Vehicule {
    void avancer() {
        System.out.println("j'avance vite");
    }
}

new Voiture().avancer();`, output: "j'avance vite",
          },
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Java cherche d\'abord la méthode dans la **classe de l\'objet**, puis **remonte** vers la classe **mère**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Redéfinition', title: 'Exemple : la méthode `equals`',
    blocks: [
      {
        k: 'p', text: 'Par défaut, `equals` (héritée de `Object`) compare les **adresses** :',
      },
      { k: 'code', code: `
Object o1 = new Point(1, 2);
Object o2 = new Point(1, 2);
o1.equals(o2);   // false : deux objets différents en mémoire`, small: true },
      {
        k: 'cols',
        left: [
          { k: 'p', text: '**Redéfinition** ✔ (même signature)' },
          { k: 'code', small: true, code: `
@Override
public boolean equals(Object o) {
    if (o == null || o.getClass() != this.getClass())
        return false;
    Point p = (Point) o;
    return x == p.x && y == p.y;
}` },
        ],
        right: [
          { k: 'p', text: '**Surcharge** (paramètre différent)' },
          { k: 'code', small: true, code: `
public boolean equals(Point p) {
    if (p == null) return false;
    return x == p.x && y == p.y;
}` },
          { k: 'box', tone: 'attention', text: 'La surcharge **n\'est pas utilisée** quand l\'objet est vu comme un `Object` (ex. dans les listes).' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Redéfinition', title: 'Redéfinir `toString()` et utiliser `@Override`',
    blocks: [
      {
        k: 'cols', ratio: 0.75,
        left: [
          {
            k: 'list', items: [
              '`toString()` renvoie une **description courte** de l\'objet.',
              'Conseillé de la **redéfinir dans toutes vos classes**.',
              '`println(p)` appelle **automatiquement** `p.toString()`.',
            ],
          },
          {
            k: 'box', tone: 'retenir', title: '@Override',
            text: 'Annotation à mettre sur une méthode redéfinie : **plus lisible**, et le compilateur **détecte les fautes** (si rien n\'est redéfini → erreur).',
          },
        ],
        right: [{
          k: 'code', code: `
class Point {
    private int x, y;
    ...
    @Override
    public String toString() {
        return "Point : x = " + x + ", y = " + y;
    }
}

Point p = new Point(2, 3);
System.out.println(p);`, output: 'Point : x = 2, y = 3',
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. Redéfinition', title: 'Le mot-clé `super`',
    blocks: [
      { k: 'p', text: '`super.membre` désigne un membre (méthode ou attribut) de la **classe mère**.' },
      {
        k: 'cols',
        left: [{ k: 'code', code: `
class A {
    int m(int i) {
        return i * 2;
    }
}` }],
        right: [{ k: 'code', code: `
class B extends A {
    @Override
    int m(int i) {
        return 500 + super.m(i);
    }
}` }],
      },
      {
        k: 'list', items: [
          '`super.super.m()` est **interdit** : on ne remonte que d\'**un seul niveau**.',
          'Redéfinir un **attribut** est possible mais **déconseillé** (deux attributs de même nom).',
          'Une méthode **`static`** ne se redéfinit pas : elle est **cachée**.',
        ],
      },
    ],
  },

  /* ── 4. Casts d'objets ──────────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '4. Transtypage', title: '**Upcast** et **downcast**',
    blocks: [
      { k: 'p', text: 'Pour les objets, seuls les casts entre **classe mère** et **classe fille** sont autorisés. Notation : `(C) o`' },
      {
        k: 'cols',
        left: [
          { k: 'box', tone: 'retenir', title: 'Upcast : fille → mère (implicite)', text: 'Toujours possible grâce à la relation **« est-un »**. Sert au **polymorphisme**.' },
          { k: 'code', code: `
Velo v = new Velo();
Vehicule v2 = v;   // automatique` },
        ],
        right: [
          { k: 'box', tone: 'attention', title: 'Downcast : mère → fille (explicite)', text: 'Accepté à la compilation, mais **erreur à l\'exécution** si l\'objet n\'est pas vraiment de ce type.' },
          { k: 'code', code: `
Figure f1 = new Cercle(p, 10);
Point c = ((Cercle) f1).getCentre();` },
        ],
      },
      { k: 'p', text: 'Le downcast sert à appeler une méthode qui **n\'existe que dans la classe fille**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Transtypage', title: 'L\'opérateur `instanceof`',
    blocks: [
      { k: 'p', text: '`o instanceof C` renvoie **`true`** si `o` est une instance de `C` **ou d\'une de ses sous-classes** (ou interfaces).' },
      {
        k: 'code', code: `
Personne john = new Employe();

if (john instanceof Employe) {
    // discuter affaires
} else {
    // proposer un stage
}`,
      },
      {
        k: 'box', tone: 'attention',
        text: 'Pour tester **exactement la même classe**, utilisez `o != null && o.getClass() == this.getClass()` et non `instanceof`.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Transtypage', title: 'Downcast : appeler une méthode de la **fille**',
    blocks: [
      {
        k: 'code', code: `
Figure f = new Cercle();
f.getRayon();                // ERREUR de compilation : cannot find symbol
((Cercle) f).getRayon();     // OK : downcast explicite`,
      },
      {
        k: 'list', items: [
          'Le compilateur ne regarde que le **type de la variable** : `f` est une `Figure`.',
          '`getRayon()` n\'existe **pas** dans `Figure` : il faut **convertir** `f` en `Cercle`.',
        ],
      },
      { k: 'box', tone: 'attention', text: 'Vérifiez **avant** avec `f instanceof Cercle`, sinon **`ClassCastException`**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Transtypage', title: 'Quiz : **downcast**',
    blocks: [{
      k: 'quiz', question: 'Que se passe-t-il ?',
      code: `
Figure f = new Figure();
Cercle c = (Cercle) f;`,
      options: [
        "Ça compile et ça s'exécute",
        '**Erreur de compilation**',
        "**`ClassCastException`** à l'exécution",
        '`c` vaut `null`',
      ],
      correct: 2,
      explication: 'Le **downcast** est **accepté** à la compilation, mais `f` est un `Figure` et **pas** un `Cercle` : erreur **à l\'exécution**. On vérifie avec `instanceof`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '4. Transtypage', title: 'Exercice : qu\'affiche ce programme ?',
    blocks: [
      {
        k: 'exercise', side: true, prompt: 'Lisez le code puis donnez les deux lignes affichées.',
        code: `
class Fruit {
    public void quiEstTu() { System.out.println("Je suis un fruit"); }
}
class Pomme extends Fruit {
    public void quiEstTu() { System.out.println("Je suis une pomme"); }
}
class Poire extends Fruit {
    public void quiEstTu() { System.out.println("Je suis une poire"); }
}
// dans main :
Fruit f;
f = new Pomme();  f.quiEstTu();
f = new Poire();  f.quiEstTu();`,
        solution: [
          { k: 'code', plain: true, small: true, code: 'Je suis une pomme\nJe suis une poire' },
          { k: 'p', text: 'La méthode exécutée dépend du **type réel de l\'objet**, pas du type de la variable : c\'est le **polymorphisme**.' },
        ],
      },
    ],
  },

  /* ── 5. Polymorphisme ───────────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '5. Polymorphisme', title: 'Le **polymorphisme**',
    blocks: [
      {
        k: 'table',
        head: ['Type', 'Signification'],
        rows: [
          ['Polymorphisme **de classe**', 'Un objet a **plusieurs types** : sa classe **et** ses classes ancêtres.'],
          ['Polymorphisme **de méthode**', 'Un **même appel** exécute des méthodes différentes ; le choix se fait **à l\'exécution** (*liaison tardive*), selon la **classe réelle** de l\'objet.'],
        ],
      },
      {
        k: 'cols',
        left: [{ k: 'code', small: true, code: `
class Figure {
    public void dessineToi() { }
}
class Rectangle extends Figure {
    public void dessineToi() { ... }
}
class Cercle extends Figure {
    public void dessineToi() { ... }
}` }],
        right: [{ k: 'code', small: true, code: `
Figure[] figures = new Figure[10];
figures[0] = new Cercle(p1, 15);
figures[1] = new Rectangle(p2, p3);
...
for (int i = 0; i < nbFigures; i++)
    figures[i].dessineToi();  // la bonne
                              // version !` }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Polymorphisme', title: 'Type **statique** et type **dynamique**',
    blocks: [
      { k: 'code', code: 'Figure f = new Cercle();' },
      {
        k: 'table',
        head: ['', 'Type statique : `Figure`', 'Type dynamique : `Cercle`'],
        rows: [
          ['**C\'est**', 'le type **déclaré** de la variable', 'la classe **réelle** de l\'objet'],
          ['**Connu**', 'à la **compilation**', 'à l\'**exécution**'],
          ['**Sert à**', 'vérifier que la méthode **existe**', 'choisir **quelle version** exécuter'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Polymorphisme', title: 'Polymorphisme **statique** ou **dynamique** ?',
    blocks: [
      {
        k: 'table',
        head: ['', 'Surcharge', 'Redéfinition'],
        rows: [
          ['**Polymorphisme**', '**statique** (à la compilation)', '**dynamique** (à l\'exécution)'],
          ['**Principe**', 'même nom, **paramètres différents**', 'même signature, dans la classe **fille**'],
          ['**Le choix dépend**', 'des **arguments** de l\'appel', 'du **type réel** de l\'objet'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Polymorphisme', title: 'Polymorphisme et **extensibilité**',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'p', text: '**Sans** polymorphisme : un test par type' },
          { k: 'code', small: true, code: `
for (int i = 0; i < figures.length; i++) {
    if (figures[i] instanceof Rectangle) {
        // dessin d'un rectangle
    } else if (figures[i] instanceof Cercle) {
        // dessin d'un cercle
    }
    // + Losange ? il faut MODIFIER ce code
}` },
        ],
        right: [
          { k: 'p', text: '**Avec** polymorphisme : une seule ligne' },
          { k: 'code', small: true, code: `
for (int i = 0; i < figures.length; i++)
    figures[i].dessineToi();` },
          { k: 'p', text: 'On ajoute `class Losange extends Figure` : **rien à modifier** dans la boucle.' },
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Application **extensible** = on ajoute des fonctionnalités **sans toucher au code déjà écrit**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Polymorphisme', title: 'L\'**argument polymorphique**',
    blocks: [
      {
        k: 'code', code: `
class Dessinateur {
    void dessiner(Figure f) {
        f.dessineToi();
    }
}

Dessinateur d = new Dessinateur();
d.dessiner(new Cercle(p1, 15));
d.dessiner(new Rectangle(p2, p3));`,
      },
      {
        k: 'list', items: [
          'Une méthode qui attend une **`Figure`** accepte **n\'importe quelle fille** de `Figure`.',
          'Chaque objet exécute **sa propre** version de `dessineToi()`.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Polymorphisme', title: 'Quiz : **polymorphisme**',
    blocks: [{
      k: 'quiz', question: 'Que s\'affiche ?',
      code: `
class Figure {
    void dessineToi() { System.out.println("Figure"); }
}

class Cercle extends Figure {
    void dessineToi() { System.out.println("Cercle"); }
}

Figure f = new Cercle();
f.dessineToi();`,
      options: [
        '`Figure`',
        '`Cercle`',
        'Erreur de compilation',
        "Erreur à l'exécution",
      ],
      correct: 1,
      explication: 'La méthode exécutée dépend de la **classe réelle** de l\'objet (`Cercle`), pas du **type de la variable** (`Figure`) : c\'est la **liaison tardive**.',
    }],
  },

  /* ── 6. protected et final ──────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '6. Visibilité', title: 'Le modificateur `protected`',
    blocks: [
      {
        k: 'list', items: [
          'Un membre `protected` de `A` est accessible par les **classes filles** de `A`…',
          '… et par les classes du **même paquetage**.',
        ],
      },
      {
        k: 'cols',
        left: [{ k: 'code', small: true, code: `
class Animal {
    protected String nom;
}

class Poisson extends Animal {
    private int profondeur;

    Poisson(String nom, int p) {
        this.nom = nom;   // OK : hérité
        profondeur = p;
    }
}` }],
        right: [{
          k: 'table', small: true,
          head: ['Du plus ouvert…', '… au plus fermé'],
          rows: [
            ['1. **`public`**', 'tout le monde'],
            ['2. **`protected`**', 'filles + paquetage'],
            ['3. *par défaut*', 'paquetage'],
            ['4. **`private`**', 'la classe seule'],
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Visibilité', title: 'Précision sur `protected`',
    blocks: [
      { k: 'p', text: '`m` est `protected` dans `A`, et `B extends A`. Dans le code de `B` (paquetage **différent**) :' },
      {
        k: 'cols',
        left: [{ k: 'code', code: `
class B extends A {
    public int m2() {
        int i = m();     // OK : m hérité
        A a = new A();
        i += a.m();      // REFUSÉ
        return i;
    }
}` }],
        right: [
          { k: 'box', tone: 'retenir', text: '`B` accède à `m` **en tant que fille** (sur `this` ou un autre `B`)…' },
          { k: 'box', tone: 'attention', text: '… mais **pas en tant que cliente** de `A` : `a.m()` est refusé (sauf si `A` et `B` sont dans le **même paquetage**).' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Visibilité', title: 'Exercice : accès `protected`',
    blocks: [
      {
        k: 'exercise', prompt: '`m()` est `protected` dans `A`. `B extends A`, `C extends B`, `D extends A` (paquetages différents). Dans le code de `B`, quels appels sont autorisés ?',
        code: `
A a = new A();   B b = new B();   C c = new C();   D d = new D();
a.m();   b.m();   c.m();   d.m();`,
        solution: [
          {
            k: 'table', small: true, head: ['Appel', 'Autorisé ?', 'Raison'],
            rows: [
              ['`a.m()`', '**Non**', '`a` est un `A`, pas un `B`'],
              ['`b.m()`', '**Oui**', '`b` est un `B`'],
              ['`c.m()`', '**Oui**', '`C` est une sous-classe de `B`'],
              ['`d.m()`', '**Non**', '`D` n\'est pas un `B`'],
            ],
          },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Visibilité', title: 'Le mot-clé `final`',
    blocks: [
      {
        k: 'table',
        head: ['`final` sur…', 'Effet', 'Exemple'],
        rows: [
          ['une **classe**', '**Aucune classe fille** possible', '`String`, `Math`'],
          ['une **méthode**', 'Ne peut **pas être redéfinie**', 'vérification d\'un mot de passe'],
          ['une **variable**', 'Valeur **constante**', '`final double PI = 3.14;`'],
        ],
      },
      {
        k: 'list', items: [
          '**Standardiser** un traitement.',
          '**Sécurité** : personne ne peut modifier un code sensible.',
          'Classe ne contenant que des méthodes `static` → `final` pour un **message clair**.',
          '**Efficacité** : optimisations possibles par la JVM.',
        ],
      },
    ],
  },

  /* ── 7. Classes abstraites ──────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '7. Classes abstraites', title: 'Les classes **abstraites**',
    blocks: [
      {
        k: 'cols',
        left: [
          {
            k: 'list', items: [
              'Classe **partiellement** écrite → **on ne peut pas l\'instancier** (`new` interdit).',
              'Contient en général des méthodes **abstraites** : **sans corps**.',
              'Les **classes filles** doivent écrire ces méthodes.',
              'Une méthode `static` ne peut **pas** être abstraite.',
            ],
          },
        ],
        right: [{
          k: 'code', code: `
abstract class GraphicObject {
    int x, y;

    void moveTo(int newX, int newY) {
        x = newX;          // code commun
        y = newY;
    }

    abstract void draw();     // pas de corps
    abstract void resize();
}`,
        }],
      },
      {
        k: 'box', tone: 'retenir', title: 'Intérêt',
        text: '**Partager le code commun** aux sous-classes, et fixer la **structure globale** en laissant les **détails** aux filles.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Classes abstraites', title: 'Classes abstraites : **permis** et **interdit**',
    blocks: [
      {
        k: 'table',
        head: ['Interdit', 'Permis'],
        rows: [
          ['`new Employe()` si `Employe` est abstraite', '`Employe e = new Permanent();` (une **variable** de type abstrait)'],
          ['`abstract` **et** `final` ensemble', 'des méthodes **non abstraites** dans une classe abstraite'],
          ['une méthode abstraite **`private`** ou **`static`**', 'une méthode abstraite **`public`** ou **`protected`**'],
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Une classe qui déclare **une** méthode abstraite doit elle-même être **`abstract`**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Classes abstraites', title: 'Quiz : classe **abstraite**',
    blocks: [{
      k: 'quiz', question: 'Que se passe-t-il à la compilation ?',
      code: `
abstract class Figure {
    abstract void dessineToi();
}

Figure f = new Figure();`,
      options: [
        'Ça compile',
        '**Erreur de compilation** : `Figure` est abstraite',
        "Erreur à l'exécution",
        '`f` vaut `null`',
      ],
      correct: 1,
      explication: 'Une classe **abstraite** ne peut **pas** être instanciée : `new Figure()` est **interdit**. On instancie une **classe fille**.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '7. Classes abstraites', title: 'Exercice : la classe `Figure`',
    blocks: [
      {
        k: 'exercise', prompt: 'Peut-on écrire le code de `dessineToi()` dans `Figure` ? Proposez une solution qui garde le polymorphisme.',
        solution: [
          { k: 'p', text: '**Non** : on ne sait pas dessiner une figure « en général ». On rend la méthode et la classe **abstraites** :' },
          {
            k: 'cols',
            left: [{ k: 'code', small: true, code: `
abstract class Figure {
    abstract void dessineToi();
}

class Cercle extends Figure {
    @Override
    void dessineToi() { /* dessin du cercle */ }
}` }],
            right: [{ k: 'code', small: true, code: `
Figure[] figures = {
    new Cercle(), new Rectangle()
};
for (Figure f : figures)
    f.dessineToi();   // polymorphisme

// new Figure();  → ERREUR` }],
          },
        ],
      },
    ],
  },

  /* ── 8. Interfaces ──────────────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Les **interfaces**',
    blocks: [
      { k: 'p', text: 'Une interface est une sorte de classe dont **toutes les méthodes sont abstraites et publiques** : c\'est un **contrat**.' },
      {
        k: 'cols',
        left: [{ k: 'code', code: `
public interface MonInterface {
    int MAX = 100;           // constante

    void methode1();         // abstraite
    int methode2(String s);  // abstraite
}` }],
        right: [
          {
            k: 'list', items: [
              '`public`, `static`, `final` sont **implicites** pour les constantes.',
              '`public abstract` est **implicite** pour les méthodes.',
              'Visibilité de l\'interface : `public` ou **par défaut**.',
            ],
          },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Implémenter une interface : `implements`',
    blocks: [
      {
        k: 'code', code: `
public class C extends Mere implements I1, I2 {
    ...
}`,
      },
      {
        k: 'list', items: [
          'Une classe **hérite d\'une seule** classe, mais peut **implémenter plusieurs** interfaces.',
          {
            text: 'Deux cas possibles **seulement** :',
            sub: [
              '`C` écrit **toutes** les méthodes de l\'interface ;',
              'sinon `C` doit être déclarée **`abstract`** (ses filles finiront le travail).',
            ],
          },
        ],
      },
      {
        k: 'box', tone: 'retenir', title: 'Une interface est un type',
        text: 'Si `C` implémente `I`, alors `C` est un **sous-type** de `I` (et ses filles aussi) : `I x = new C();` est valide et `x instanceof I` vaut `true`.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Quiz : **implements**',
    blocks: [{
      k: 'quiz', question: 'Que se passe-t-il à la compilation ?',
      code: `
interface Inflammable {
    void enflammer();
}

class Papier implements Inflammable {
}`,
      options: [
        'Ça compile',
        '**Erreur** : écrire `enflammer()` ou déclarer `Papier` **`abstract`**',
        "Erreur : une classe ne peut pas implémenter d'interface",
        "Ça compile, mais erreur à l'exécution",
      ],
      correct: 1,
      explication: 'Une classe qui **implémente** une interface doit écrire **toutes** ses méthodes, **sinon** elle doit être **`abstract`**.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Exemple : l\'interface `Inflammable`',
    blocks: [
      {
        k: 'cols', ratio: 1.25,
        left: [{
          k: 'code', small: true, code: `
interface Inflammable {
    void enflammer();
}

class Bois implements Inflammable {
    public void enflammer() {
        System.out.println("Je brûle et fais des braises");
    }
}

class Dancefloor implements Inflammable {
    public void enflammer() {
        System.out.println("Youhouhou !");
    }
}`,
        }],
        right: [
          {
            k: 'code', small: true, code: `
Inflammable[] tab = {
    new Bois(), new Dancefloor()
};
for (Inflammable i : tab)
    i.enflammer();`, output: 'Je brûle et fais des braises\nYouhouhou !',
          },
          { k: 'box', tone: 'retenir', text: '`Bois` et `Dancefloor` n\'ont **aucun lien d\'héritage**, mais on les traite **de la même façon**.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Pourquoi des interfaces ?',
    blocks: [
      {
        k: 'list', items: [
          '**Garantir** aux utilisateurs d\'une classe qu\'elle offre **certains services** (le contrat).',
          'Faire du **polymorphisme** entre classes qui **ne sont pas** dans la même hiérarchie d\'héritage.',
          'Faciliter la **maintenance** et la **réutilisation**.',
        ],
      },
      {
        k: 'table',
        head: ['', 'Classe abstraite', 'Interface'],
        rows: [
          ['Mot-clé', '`extends`', '`implements`'],
          ['Combien ?', '**Une seule** mère', '**Plusieurs** interfaces'],
          ['Contient', 'Attributs + méthodes concrètes et abstraites', '**Constantes** + méthodes **abstraites**'],
          ['Idée', 'Une famille **« est-un »**', 'Une **capacité** (« sait faire »)'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Exemple : trouver le maximum de deux objets',
    blocks: [
      {
        k: 'cols', ratio: 1.15,
        left: [{
          k: 'code', small: true, code: `
interface Comparable {
    boolean greaterThan(Object o);
}

class Maximize {
    static Comparable max(Comparable a, Comparable b) {
        if (a.greaterThan(b)) return a;
        return b;
    }
}

class Person implements Comparable {
    private int size;
    Person(int size) { this.size = size; }

    public boolean greaterThan(Object o) {
        return this.size > ((Person) o).size;
    }
    @Override
    public String toString() { return "size: " + size; }
}`,
        }],
        right: [
          {
            k: 'code', small: true, code: `
Person p1 = new Person(157);
Person p2 = new Person(173);
System.out.println(Maximize.max(p1, p2));`, output: 'size: 173',
          },
          { k: 'p', text: '`max` fonctionne pour **toute classe** qui implémente `Comparable`, sans la connaître.' },
          { k: 'box', tone: 'info', text: 'Ici, `Comparable` est **notre** interface. Java possède aussi la sienne : voir diapo suivante.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'L\'interface `Comparable` du JDK',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'code', code: `
public interface Comparable {
    int compareTo(Object o);
}` },
          {
            k: 'table', small: true, head: ['`a.compareTo(b)` renvoie', 'si…'],
            rows: [['un nombre **< 0**', '`a` avant `b`'], ['**0**', '`a` égal à `b`'], ['un nombre **> 0**', '`a` après `b`']],
          },
        ],
        right: [
          { k: 'p', text: '`Collections.sort(liste)` trie une liste d\'objets **`Comparable`**. `String`, `Integer`… l\'implémentent déjà :' },
          { k: 'code', small: true, code: `
List<Integer> ls = new ArrayList<>();
ls.add(5);
ls.add(2);
ls.add(3);
Collections.sort(ls);
System.out.println(ls);`, output: '[2, 3, 5]' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Exercice : trier des `Point`',
    blocks: [
      {
        k: 'exercise', prompt: 'Modifiez `Point` pour pouvoir trier une liste de points : d\'abord selon **x**, puis, en cas d\'égalité, selon **y**.',
        solution: [
          {
            k: 'cols', ratio: 1.2,
            left: [{ k: 'code', small: true, code: `
class Point implements Comparable<Point> {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public int compareTo(Point p) {
        if (x != p.x) return Integer.compare(x, p.x);
        return Integer.compare(y, p.y);
    }
}` }],
            right: [
              { k: 'code', small: true, code: `
List<Point> l = new ArrayList<>();
l.add(new Point(2, 5));
l.add(new Point(1, 9));
l.add(new Point(2, 1));
Collections.sort(l);
// (1,9) (2,1) (2,5)` },
              { k: 'box', tone: 'info', text: '`Comparable<Point>` : le paramètre est directement un `Point`, **pas de cast**.' },
            ],
          },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Plusieurs règles de tri : `Comparator`',
    blocks: [
      { k: 'p', text: '`Comparable` donne **un seul** ordre « naturel ». Pour **d\'autres ordres**, on écrit des classes qui implémentent **`Comparator`**.' },
      {
        k: 'cols', ratio: 1.3,
        left: [{ k: 'code', small: true, code: `
class PointComparator implements Comparator<Point> {
    @Override
    public int compare(Point p1, Point p2) {
        if (p1.x < p2.x) return -1;
        if (p1.x > p2.x) return 1;
        if (p1.y < p2.y) return -1;
        if (p1.y > p2.y) return 1;
        return 0;
    }
}` }],
        right: [
          { k: 'code', small: true, code: `
Collections.sort(liste,
        new PointComparator());` },
          { k: 'box', tone: 'retenir', text: '`sort(liste)` → ordre de `compareTo`.\n`sort(liste, comparateur)` → ordre du **comparateur**.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Faire évoluer une interface',
    blocks: [
      { k: 'p', text: 'Ajouter une méthode à une interface oblige **toutes** les classes qui l\'implémentent à être modifiées. **Solution** : une nouvelle interface qui **hérite** de l\'ancienne.' },
      {
        k: 'cols',
        left: [{ k: 'code', small: true, code: `
public interface DoIt {
    void doSomething(int i, double x);
    int doSomethingElse(String s);
}` }],
        right: [{ k: 'code', small: true, code: `
public interface DoItPlus extends DoIt {
    boolean didItWork(int i, double x,
                      String s);
}` }],
      },
      { k: 'box', tone: 'retenir', text: 'Une interface peut **hériter** d\'une autre avec `extends`. Chacun choisit `DoIt` ou `DoItPlus`.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Java 8 : les méthodes `default`',
    blocks: [
      { k: 'p', text: 'Depuis Java 8, une interface peut fournir un **code par défaut** pour une méthode : les classes en héritent **sans rien écrire**.' },
      {
        k: 'code', small: true, code: `
public interface Orderable<T> extends Comparable<T> {
    // compareTo() vient de Comparable

    default boolean isAfter(T other)  { return compareTo(other) > 0; }
    default boolean isBefore(T other) { return compareTo(other) < 0; }
    default boolean isSameAs(T other) { return compareTo(other) == 0; }
}`,
      },
      { k: 'p', text: 'On **étend** `Comparable` (qu\'on ne peut pas modifier) avec des méthodes **plus parlantes** qui renvoient un `boolean`.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Interfaces', title: 'Le problème du **diamant**',
    blocks: [
      { k: 'p', text: 'Une classe implémente **deux interfaces** qui ont **la même méthode `default`** : laquelle choisir ?' },
      {
        k: 'cols',
        left: [{ k: 'code', small: true, code: `
interface InterfaceA {
    default void foo() {
        System.out.println("A -> foo()");
    }
}
interface InterfaceB {
    default void foo() {
        System.out.println("B -> foo()");
    }
}` }],
        right: [{ k: 'code', small: true, code: `
class Test implements InterfaceA, InterfaceB {
    // sans cette méthode : ERREUR
    // "inherits unrelated defaults"
    @Override
    public void foo() {
        System.out.println("Test -> foo()");
    }
}` }],
      },
      { k: 'box', tone: 'retenir', text: 'Solution : **redéfinir** la méthode dans la classe. (On peut appeler une version précise avec `InterfaceA.super.foo();`)' },
    ],
  },

  /* ── 9. Règles ──────────────────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: '9. Bonnes pratiques', title: '**Héritage** ou **délégation** ?',
    blocks: [
      { k: 'p', text: 'Pour écrire `C2` en réutilisant une classe `C1` existante, deux moyens :' },
      {
        k: 'cols',
        left: [
          { k: 'p', text: '**Délégation** (« a-un ») : `C2` **utilise** un objet `C1`' },
          { k: 'code', small: true, code: `
class C2 {
    private C1 c1 = new C1();

    public int m2() {
        return c1.m1();   // on délègue
    }
}` },
        ],
        right: [
          { k: 'p', text: '**Héritage** (« est-un ») : `C2` **est** un `C1`' },
          { k: 'code', small: true, code: `
class C2 extends C1 {
    public int m2() {
        return m1();      // hérité
    }
}` },
        ],
      },
      {
        k: 'box', tone: 'attention', title: 'Contre-exemple : Stack hérite de Vector',
        text: 'On peut faire `pile.insertElementAt("Perdu", 0)` : la pile **n\'est plus une vraie pile (LIFO)**. Ici il fallait la **délégation**.',
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Bonnes pratiques', title: 'Le bon réflexe',
    blocks: [
      {
        k: 'box', tone: 'retenir', title: 'Conseil',
        text: 'Utilisez l\'héritage **uniquement** pour une vraie relation **« est-un »** :\n• un `CercleColore` **est un** `Cercle` ;\n• une `Voiture` **est un** `Vehicule`.\nSinon, préférez la **délégation**.',
      },
      {
        k: 'box', tone: 'info', title: 'Complément : equals et hashCode',
        text: 'Quand on redéfinit **`equals`**, il faut **aussi redéfinir `hashCode`**. Sinon, les collections basées sur le hachage (`HashSet`, `HashMap`) fonctionnent mal.',
      },
      { k: 'code', small: true, code: `
@Override public boolean equals(Object obj) {
    if (!(obj instanceof User)) return false;
    User other = (User) obj;
    return Objects.equals(name, other.name);
}
@Override public int hashCode() { return Objects.hashCode(name); }` },
    ],
  },
  {
    kind: 'content', chapter: C, title: 'Chapitre 3 — À retenir',
    blocks: [
      {
        k: 'list', items: [
          '`class B extends A` : **une seule** mère ; `Object` est la mère de tout.',
          'Constructeur fille : **`super(...)`** en 1ʳᵉ ligne (sinon `super()` implicite).',
          '**Redéfinition** = même signature (+ `@Override`) ; **surcharge** = paramètres différents.',
          '**Upcast** implicite, **downcast** explicite ; vérifier avec `instanceof`.',
          '**Polymorphisme** : la méthode exécutée dépend du **type réel** de l\'objet.',
          '**Type statique** (déclaré, connu à la compilation) ≠ **type dynamique** (réel, connu à l\'exécution).',
          '**Classe abstraite** : non instanciable, méthodes sans corps à écrire dans les filles.',
          '**Interface** = contrat ; une classe peut en **implémenter plusieurs**.',
        ],
      },
    ],
  },
]
