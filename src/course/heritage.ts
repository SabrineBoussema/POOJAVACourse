import type { Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   Chapitre 3 — séquences pédagogiques (motivation, mémoire, est-un).
   Pas d'animation CSS : étapes, révélations, quiz (règle du cours).
   Code vérifié avec javac. Personne / Etudiant / Enseignant : fil
   distinct de Point / PointColore (spécialiser une classe déjà écrite).
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch3'

/** Avant les diapos techniques : POURQUOI l'héritage. */
export const H3_WHY: Slide[] = [
  {
    kind: 'content', chapter: C, section: '1. Héritage', title: 'Pourquoi Java propose-t-il l\'**héritage** ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Deux classes', blocks: [
            {
              k: 'cols',
              left: [{
                k: 'code', small: true, file: 'Etudiant.java', highlight: [2, 3], code: `
class Etudiant {
    String nom;
    int age;
    void afficher() { /* … */ }
}`,
              }],
              right: [{
                k: 'code', small: true, file: 'Enseignant.java', highlight: [2, 3], code: `
class Enseignant {
    String nom;
    int age;
    void afficher() { /* … */ }
}`,
              }],
            },
            { k: 'box', tone: 'attention', text: '`nom`, `age`, `afficher()` : le **même** code, **deux** fois.' },
          ],
        },
        {
          label: 'Questions', blocks: [{
            k: 'progressive', button: 'Question suivante',
            items: [
              [{ k: 'ask', text: 'Pourquoi avons-nous **répété** ces attributs ?' }],
              [{ k: 'ask', text: 'Que se passe-t-il avec **20** classes ?' }],
              [{ k: 'ask', text: 'Si nous modifions une **règle commune**, combien de classes devons-nous modifier ?' }],
            ],
          }],
        },
        {
          label: 'La piste', blocks: [
            { k: 'ask', text: 'Peut-on définir les caractéristiques **communes** une **seule** fois ?' },
            { k: 'box', tone: 'info', text: 'Ce n\'est **pas** encore l\'héritage : d\'abord le **besoin** (éviter la duplication **métier**).' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Faire sentir le coût de la duplication avant toute syntaxe.',
      question: 'Pourquoi répéter nom, age, afficher ? Avec 20 classes ? Une règle commune ?',
      reponse: 'Même concept (une personne). 20 copies. 20 modifications. Besoin de factoriser.',
      conseil: 'Faire voter avant chaque question. Ne pas dire « extends » ici. La duplication seule ne justifie pas l’héritage : il faudra un vrai « est-un ».',
      duree: 4,
    },
  },
  {
    kind: 'content', chapter: C, section: '1. Héritage', title: 'L\'héritage comme **solution**',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Duplication', blocks: [
            {
              k: 'uml', width: 1100, height: 280,
              caption: 'Les membres **communs** sont recopiés dans chaque classe.',
              classes: [
                { id: 'e', name: 'Etudiant', x: 40, y: 20, w: 460, attrs: ['nom : String', 'age : int', 'matricule : String'], ops: ['afficher()', 'etudier()'] },
                { id: 'n', name: 'Enseignant', x: 600, y: 20, w: 460, attrs: ['nom : String', 'age : int', 'specialite : String'], ops: ['afficher()', 'enseigner()'] },
              ],
              links: [],
            },
          ],
        },
        {
          label: 'Factorisation', blocks: [
            {
              k: 'uml', width: 1100, height: 430,
              caption: 'Triangle **vide** vers la mère : généralisation UML (« **est-un** »).',
              classes: [
                { id: 'p', name: 'Personne', x: 330, y: 0, w: 440, attrs: ['nom : String', 'age : int'], ops: ['afficher()'] },
                { id: 'e', name: 'Etudiant', x: 40, y: 250, w: 400, attrs: ['matricule : String'], ops: ['etudier()'] },
                { id: 'n', name: 'Enseignant', x: 660, y: 250, w: 400, attrs: ['specialite : String'], ops: ['enseigner()'] },
              ],
              links: [{ from: 'e', to: 'p' }, { from: 'n', to: 'p' }],
            },
          ],
        },
        {
          label: 'Idée', blocks: [
            { k: 'box', tone: 'retenir', text: 'L\'héritage permet de définir des caractéristiques **communes** dans une **classe mère** et de **spécialiser** les **classes filles**.' },
            { k: 'box', tone: 'attention', text: 'Des attributs **partagés** ne suffisent **pas** : il faut un vrai **« est-un »** (`Etudiant` **est une** `Personne`).' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Montrer la factorisation UML : membres communs dans Personne.',
      question: 'Que met-on dans Personne ? Que reste-t-il dans Etudiant / Enseignant ?',
      reponse: 'Personne : nom, age, afficher. Etudiant : matricule, etudier. Enseignant : specialite, enseigner.',
      conseil: 'Étape 1 puis 2 : faire nommer les membres à remonter. Rappeler has-a (ch. 2, Adresse) vs is-a.',
      duree: 4,
    },
  },
  {
    kind: 'content', chapter: C, section: '1. Héritage', title: 'Faut-il **toujours** utiliser l\'héritage ?',
    blocks: [
      {
        k: 'cols',
        left: [
          { k: 'p', text: '**EST UN** → héritage' },
          {
            k: 'uml', width: 700, height: 260,
            classes: [
              { id: 'p', name: 'Personne', x: 170, y: 0, w: 360 },
              { id: 'e', name: 'Etudiant', x: 170, y: 160, w: 360 },
            ],
            links: [{ from: 'e', to: 'p' }],
          },
        ],
        right: [
          { k: 'p', text: '**A UN** → composition' },
          {
            k: 'uml', width: 700, height: 260,
            classes: [
              { id: 'v', name: 'Voiture', x: 0, y: 40, w: 300 },
              { id: 'm', name: 'Moteur', x: 400, y: 40, w: 300 },
            ],
            links: [{ from: 'v', to: 'm', kind: 'assoc', label: '- moteur', mult: '1' }],
          },
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Héritage : la fille **peut remplacer** la mère. Une `Voiture` **n\'est pas** un `Moteur`.' },
    ],
    notes: {
      objectif: 'Poser est-un vs a-un avant la syntaxe, sans leçon de délégation.',
      question: 'Etudiant / Personne ? Voiture / Moteur ?',
      reponse: 'Est-un (héritage) ; a-un (composition). Repris en fin de chapitre.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: '1. Héritage', title: 'Qu\'avons-nous compris **avant** d\'étudier `extends` ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Notions', blocks: [{
            k: 'progressive', button: 'Notion suivante', cols: 3,
            items: [
              [{ k: 'box', tone: 'info', title: 'Duplication', text: 'le même code **recopié**' }],
              [{ k: 'box', tone: 'info', title: 'Factorisation', text: 'une seule **définition** commune' }],
              [{ k: 'box', tone: 'info', title: 'Héritage', text: 'mère / filles, relation **est-un**' }],
              [{ k: 'box', tone: 'info', title: 'Classe mère', text: 'caractéristiques **partagées**' }],
              [{ k: 'box', tone: 'info', title: 'Classe fille', text: '**spécialisation**' }],
              [{ k: 'box', tone: 'info', title: 'Réutilisation', text: 'la **définition**, pas les **valeurs**' }],
              [{ k: 'box', tone: 'info', title: 'Objets', text: 'chaque instance a **ses** champs' }],
              [{ k: 'box', tone: 'info', title: '`protected`', text: 'membre **hérité**, pas tout objet mère' }],
              [{ k: 'box', tone: 'info', title: 'Composition', text: '**a-un**, pas est-un' }],
            ],
          }],
        },
        {
          label: 'Suite', blocks: [{
            k: 'goto',
            title: 'Le problème : adapter une classe existante',
            heading: 'Nous savons **pourquoi** l\'héritage existe.',
            sub: 'Découvrons **comment** l\'utiliser en Java.',
            label: 'Continuer le chapitre 3',
          }],
        },
      ],
    }],
    notes: {
      objectif: 'Ancrer le vocabulaire avant extends et Point / PointColore.',
      conseil: '« Notion suivante » une par une. Le bouton saute à « adapter une classe existante » (Point). → depuis la dernière étape y va aussi.',
      transition: 'Cas 2 : spécialiser une classe déjà écrite (Point → PointColore), puis extends.',
      duree: 3,
    },
  },
]

/** Après super(...) : UML ↔ Java, sans tout redétailler. */
export const H3_UMLCODE: Slide[] = [
  {
    kind: 'content', chapter: C, section: '2. Constructeur de sous-classe', title: 'Du **diagramme** au code Java',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'UML', blocks: [
            {
              k: 'uml', width: 900, height: 340,
              caption: '`Etudiant` **est une** `Personne`.',
              classes: [
                { id: 'p', name: 'Personne', x: 250, y: 0, w: 400, attrs: ['- nom : String', '- age : int'], ops: ['+ Personne(nom, age)', '+ getNom() : String'] },
                { id: 'e', name: 'Etudiant', x: 250, y: 210, w: 400, attrs: ['- matricule : String'], ops: ['+ Etudiant(nom, age, matricule)'] },
              ],
              links: [{ from: 'e', to: 'p' }],
            },
          ],
        },
        {
          label: '`Personne`', blocks: [
            {
              k: 'code', small: true, file: 'Personne.java', highlight: [1, 2, 3], code: `
class Personne {
    private String nom;
    private int age;

    public Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }

    public String getNom() { return nom; }
}`,
            },
            { k: 'p', text: 'Attributs **`private`** : la fille **n\'y accède pas** directement (on a vu `super`).' },
          ],
        },
        {
          label: '`extends`', blocks: [
            {
              k: 'code', small: true, file: 'Etudiant.java', highlight: [1], code: `
class Etudiant extends Personne {
    private String matricule;
    // …
}`,
            },
            { k: 'box', tone: 'info', text: '`extends` : **une** mère. C\'est le lien UML du triangle vide.' },
          ],
        },
        {
          label: '`super`', blocks: [
            {
              k: 'code', small: true, file: 'Etudiant.java', highlight: [5], code: `
class Etudiant extends Personne {
    private String matricule;

    public Etudiant(String nom, int age, String matricule) {
        super(nom, age);
        this.matricule = matricule;
    }
}`,
            },
            { k: 'box', tone: 'retenir', text: '`super(nom, age)` : **d\'abord** la partie `Personne`, **ensuite** `matricule`.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Relier le diagramme Personne / Etudiant au code déjà vu avec Point / super.',
      question: 'Où est le triangle UML dans le code ? Qui initialise nom et age ?',
      reponse: 'extends. super(nom, age) dans le constructeur de Etudiant.',
      duree: 4,
    },
  },
]

/** Après la construction d'objets : valeurs, mémoire, GC. */
export const H3_MEM: Slide[] = [
  {
    kind: 'content', chapter: C, section: '2. Constructeur de sous-classe', title: 'Réutiliser le code : **partager** les données ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Deux objets', blocks: [{
            k: 'code', small: true, file: 'Main.java', code: `
Etudiant e1 = new Etudiant("Ali", 20, "E001");
Etudiant e2 = new Etudiant("Sara", 22, "E002");`,
          }],
        },
        {
          label: 'En mémoire', blocks: [{
            k: 'memory', compact: true, title: 'Deux instances **distinctes**',
            stack: [{ name: 'e1', ref: 'A' }, { name: 'e2', ref: 'B' }],
            heap: [
              { id: 'A', type: 'Etudiant', fields: [['nom', '"Ali"'], ['age', '20'], ['matricule', '"E001"']] },
              { id: 'B', type: 'Etudiant', fields: [['nom', '"Sara"'], ['age', '22'], ['matricule', '"E002"']] },
            ],
            caption: 'Les champs **hérités** (`nom`, `age`) sont **dans chaque** objet.',
          }],
        },
        {
          label: 'Modifier `e1`', blocks: [
            {
              k: 'code', small: true, file: 'Main.java (suite)', output: '21\n22', code: `
e1.feterAnniversaire();
System.out.println(e1.getAge());
System.out.println(e2.getAge());`,
            },
            { k: 'box', tone: 'retenir', text: 'On réutilise la **définition** des membres, **pas** les **valeurs** des objets. `e2` reste à **22**.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Casser l’idée que « hériter = une seule copie des données ».',
      question: 'Après e1.feterAnniversaire(), quel est l’âge de Sara ?',
      reponse: '22 : e2 n’est pas modifié.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: '2. Constructeur de sous-classe', title: 'Que se passe-t-il lors de **`new Etudiant(...)`** ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: '`new`', blocks: [
            { k: 'code', small: true, highlight: [1], code: 'Etudiant e1 = new Etudiant("Ali", 20, "E001");' },
            { k: 'p', text: '`new` crée **un** objet sur le **tas**. `e1` est une **référence** (modèle pédagogique pile / tas).' },
          ],
        },
        {
          label: 'Un seul objet', blocks: [
            {
              k: 'memory', compact: true,
              stack: [{ name: 'e1', ref: 'E' }],
              heap: [{
                id: 'E', type: 'Etudiant',
                fields: [['nom', '"Ali"'], ['age', '20'], ['matricule', '"E001"']],
                note: 'partie Personne + partie Etudiant — un seul objet',
              }],
              caption: '**Pas** deux objets tas (`Personne` + `Etudiant`).',
            },
            { k: 'box', tone: 'retenir', text: 'Un objet `Etudiant` contient les champs d\'instance **hérités** de `Personne` **et** ses champs **propres**.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Un new = un objet ; les champs hérités sont dans cet objet.',
      question: 'new Etudiant crée-t-il un objet Personne séparé ?',
      reponse: 'Non. Un seul objet Etudiant, avec nom, age et matricule.',
      conseil: 'Dire que pile/tas est un modèle, pas la disposition physique de chaque JVM.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: '2. Constructeur de sous-classe', title: 'Héritage = **moins** de mémoire ?',
    blocks: [
      {
        k: 'quiz', verify: true,
        question: 'Si **1 000** étudiants héritent de `Personne`, `nom` et `age` sont-ils stockés **une seule fois** ?',
        options: ['Oui', 'Non'],
        correct: 1,
        explication: '**1 000** objets, **1 000** `nom` et **1 000** `age`. L\'héritage centralise la **définition** de la classe, pas les **valeurs**.',
        detailTitle: 'À retenir',
        detail: 'Bénéfices : **maintenance**, **spécialisation**, **polymorphisme** — pas une optimisation mémoire de la JVM.',
      },
    ],
    notes: {
      objectif: 'Quiz vrai/faux : héritage ≠ partage des champs d’instance.',
      reponse: 'Non.',
      duree: 2,
    },
  },
  {
    kind: 'content', chapter: C, section: '2. Constructeur de sous-classe', title: 'Que devient un objet **qui n\'est plus utilisé** ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Référence', blocks: [
            { k: 'code', small: true, highlight: [1], code: 'Etudiant e1 = new Etudiant("Ali", 20, "E001");' },
            {
              k: 'memory', compact: true,
              stack: [{ name: 'e1', ref: 'E' }],
              heap: [{ id: 'E', type: 'Etudiant', fields: [['nom', '"Ali"'], ['age', '20'], ['matricule', '"E001"']] }],
            },
          ],
        },
        {
          label: '`e1 = null`', blocks: [
            { k: 'code', small: true, highlight: [2], code: 'Etudiant e1 = new Etudiant("Ali", 20, "E001");\ne1 = null;' },
            {
              k: 'memory', compact: true,
              stack: [{ name: 'e1', value: 'null' }],
              heap: [{ id: 'E', type: 'Etudiant', fields: [['nom', '"Ali"'], ['age', '20'], ['matricule', '"E001"']], dead: true, note: 'injoignable → éligible au GC' }],
            },
            { k: 'p', text: 'La **référence** est coupée. L\'objet **existe encore** tant que le GC ne l\'a pas collecté.' },
          ],
        },
        {
          label: 'GC', blocks: [
            {
              k: 'flow', steps: [
                { label: '1. `null`', sub: 'plus de référence' },
                { label: '2. Injoignable', sub: 'aucune racine n\'y mène' },
                { label: '3. Éligible', sub: 'le GC **pourra** le reprendre' },
                { label: '4. Collecte', sub: 'plus tard, **pas** immédiat' },
              ],
            },
            { k: 'box', tone: 'retenir', text: 'Le **Garbage Collector** reprend les objets **inaccessibles**. Cela **ne dépend pas** de l\'héritage.' },
            { k: 'box', tone: 'attention', text: '`e1 = null` **ne détruit pas** l\'objet et **n\'appelle pas** le GC tout de suite.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Distinguer perte de référence, éligibilité au GC, et collecte réelle.',
      question: 'Après e1 = null, l’objet est-il détruit ?',
      reponse: 'Non : injoignable, donc éligible. La collecte est ultérieure et indépendante de l’héritage.',
      duree: 3,
    },
  },
]

/** Fin du chapitre : classification est-un / a-un. */
export const H3_ISA: Slide[] = [
  {
    kind: 'content', chapter: C, section: '9. Bonnes pratiques', title: '**EST UN** ou **A UN** ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Chien / Animal', blocks: [{
            k: 'quiz', verify: true,
            question: '`Chien` par rapport à `Animal` :',
            options: ['EST UN (héritage)', 'A UN (composition)'],
            correct: 0,
            explication: 'Un chien **est un** animal : on peut utiliser un `Chien` **là où** on attend un `Animal`.',
          }],
        },
        {
          label: 'Voiture / Moteur', blocks: [{
            k: 'quiz', verify: true,
            question: '`Voiture` par rapport à `Moteur` :',
            options: ['EST UN (héritage)', 'A UN (composition)'],
            correct: 1,
            explication: 'Une voiture **a un** moteur. `class Voiture extends Moteur` casserait la **substituabilité**.',
          }],
        },
        {
          label: 'Enseignant / Personne', blocks: [{
            k: 'quiz', verify: true,
            question: '`Enseignant` par rapport à `Personne` :',
            options: ['EST UN (héritage)', 'A UN (composition)'],
            correct: 0,
            explication: 'Même relation que `Etudiant` / `Personne` au début du chapitre.',
          }],
        },
        {
          label: 'Bibliothèque / Livre', blocks: [{
            k: 'quiz', verify: true,
            question: '`Bibliotheque` par rapport à `Livre` :',
            options: ['EST UN (héritage)', 'A UN (composition)'],
            correct: 1,
            explication: 'Une bibliothèque **contient** des livres (`has-a`), comme `Stock` **contient** des `Element`.',
          }],
        },
      ],
    }],
    notes: {
      objectif: 'Réinvestir est-un / a-un après polymorphisme et délégation.',
      reponse: '1 héritage, 2 composition, 3 héritage, 4 composition.',
      conseil: 'Vote à main levée. Rappeler Stack / Vector : héritage sans vrai est-un.',
      duree: 4,
    },
  },
]
