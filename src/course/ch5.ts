import type { Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   CHAPITRE 5 — Collections et génériques
   (contenu ajouté : il ne vient pas des PDF de départ ; à relire)
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch5'

export const CH5: Slide[] = [
  {
    kind: 'chapter', chapter: C, number: '5', title: 'Collections et génériques',
    goals: [
      '**Pourquoi** des collections ?',
      'Les **génériques** : `<T>`',
      '**List** : `ArrayList`, `LinkedList`',
      '**Set** : pas de doublons',
      '**Map** : clé → valeur',
      '**Parcourir** et **trier**',
      'Écrire **sa propre** classe générique',
      'Les **énumérations** (`enum`)',
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Les collections', title: 'Pourquoi des **collections** ?',
    blocks: [
      {
        k: 'list', items: [
          'Un **tableau** a une taille **fixe** et peu d\'outils.',
          'Le paquetage **`java.util`** offre des **collections** : des structures **prêtes à l\'emploi**.',
          'Elles **grandissent** toutes seules, et savent **chercher**, **trier**, **supprimer**.',
        ],
      },
      {
        k: 'table',
        head: ['Besoin', 'Interface'],
        rows: [
          ['une suite **ordonnée**, avec doublons', '**`List`**'],
          ['des éléments **sans doublon**', '**`Set`**'],
          ['des **associations** clé → valeur', '**`Map`**'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Les collections', title: 'La **famille** des collections',
    blocks: [
      {
        k: 'table',
        head: ['Interface', 'Implémentations', 'Particularité'],
        rows: [
          ['**`List`**', '`ArrayList`, `LinkedList`', 'ordre **conservé**, doublons **permis**'],
          ['**`Set`**', '`HashSet`, `LinkedHashSet`, `TreeSet`', '**aucun** doublon'],
          ['**`Map`**', '`HashMap`, `LinkedHashMap`, `TreeMap`', 'clés **uniques**, une valeur par clé'],
        ],
      },
      { k: 'box', tone: 'info', text: '`List` et `Set` sont des **`Collection`**. `Map` **n\'en est pas une** : elle manipule des **paires**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Les génériques', title: 'Les **génériques** : `<T>`',
    blocks: [
      {
        k: 'code', code: `
List<String> noms = new ArrayList<>();
noms.add("Sarra");
noms.add(12);               // ERREUR de compilation
String n = noms.get(0);     // aucun cast nécessaire`,
      },
      {
        k: 'list', items: [
          '`<String>` fixe le **type des éléments** : le compilateur **refuse** un `int`.',
          'Pas de **cast** à la lecture : `get(0)` renvoie directement un `String`.',
          '`<>` (*diamant*) : Java **devine** le type à droite.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Les génériques', title: 'Types primitifs et **classes enveloppes**',
    blocks: [
      {
        k: 'table',
        head: ['Primitif', 'Classe enveloppe'],
        rows: [['`int`', '`Integer`'], ['`double`', '`Double`'], ['`boolean`', '`Boolean`'], ['`char`', '`Character`']],
      },
      {
        k: 'code', small: true, code: `
List<Integer> notes = new ArrayList<>();   // List<int> est INTERDIT
notes.add(15);                // 15 devient un Integer (boxing)
int x = notes.get(0);         // Integer redevient int (unboxing)`,
      },
      { k: 'box', tone: 'retenir', text: 'Les génériques n\'acceptent que des **objets** : pour un `int`, on utilise **`Integer`**. Java convertit **automatiquement**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Les génériques', title: 'Quiz : un type **primitif** en générique',
    blocks: [{
      k: 'quiz', question: 'Que se passe-t-il à la compilation ?',
      code: 'List<int> notes = new ArrayList<>();',
      options: ['Ça compile', '**Erreur de compilation** : un générique exige un **objet**', 'Ça compile, mais **erreur à l\'exécution**', 'Ça compile, mais la liste reste **vide**'],
      correct: 1,
      explication: '`int` est un **type primitif**, pas une classe. On écrit **`List<Integer>`**.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '3. List', title: '`List` : `ArrayList` ou `LinkedList` ?',
    blocks: [
      {
        k: 'table',
        head: ['', '`ArrayList`', '`LinkedList`'],
        rows: [
          ['**Structure**', 'un **tableau** redimensionnable', 'une **liste chaînée**'],
          ['**Accès** par position `get(i)`', '**très rapide**', 'lent (on parcourt)'],
          ['**Insertion / suppression** au début ou au milieu', 'plus lente', '**rapide**'],
        ],
      },
      {
        k: 'code', small: true, code: `
List<String> a = new ArrayList<>();   // on déclare le TYPE le plus général
List<String> b = new LinkedList<>();  // on peut changer d'implémentation`,
      },
      { k: 'box', tone: 'retenir', text: 'On déclare l\'**interface** (`List`) et on choisit l\'**implémentation** (`new …`) : c\'est le **polymorphisme** du chapitre 3.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. List', title: 'Quiz : `remove` sur une `List<Integer>`',
    blocks: [{
      k: 'quiz', question: 'Qu\'affiche ce programme ?',
      code: `
List<Integer> l = new ArrayList<>(List.of(10, 20, 30));
l.remove(1);
System.out.println(l);`,
      options: ['`[20, 30]`', '`[10, 30]`', '`[10, 20]`', 'Erreur de compilation'],
      correct: 1,
      explication: '`remove(1)` retire **l\'élément de position 1** (`20`), pas la valeur `1`. Pour retirer une **valeur** : `l.remove(Integer.valueOf(1))`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '4. Set', title: '`Set` : **aucun doublon**',
    blocks: [
      {
        k: 'cols', ratio: 1.2,
        left: [{
          k: 'code', code: `
Set<String> s = new HashSet<>();
s.add("Java");
s.add("POO");
s.add("Java");               // ignoré
System.out.println(s.size());`, output: '2',
        }],
        right: [{
          k: 'table', small: true,
          head: ['Classe', 'Ordre'],
          rows: [
            ['`HashSet`', '**aucun** ordre garanti'],
            ['`LinkedHashSet`', 'ordre d\'**insertion**'],
            ['`TreeSet`', '**trié**'],
          ],
        }],
      },
      { k: 'box', tone: 'info', text: '`add` renvoie **`false`** si l\'élément **existe déjà**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Set', title: '`Set` et objets : `equals` et `hashCode`',
    blocks: [
      {
        k: 'cols', ratio: 1.2,
        left: [{
          k: 'code', small: true, code: `
@Override
public boolean equals(Object o) {
    if (!(o instanceof Point)) return false;
    Point p = (Point) o;
    return x == p.x && y == p.y;
}

@Override
public int hashCode() {
    return Objects.hash(x, y);
}`,
        }],
        right: [{
          k: 'list', items: [
            'Pour savoir si deux objets sont **le même**, un `Set` utilise **`equals`** et **`hashCode`**.',
            '**Sans** redéfinition : deux `new Point(1, 2)` sont **deux** éléments.',
            'Règle : deux objets **égaux** ont le **même** `hashCode`.',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Set', title: 'Quiz : les **doublons**',
    blocks: [{
      k: 'quiz', question: 'Qu\'affiche ce programme ?',
      code: `
Set<Integer> s = new HashSet<>();
s.add(3);
s.add(5);
s.add(3);
System.out.println(s.size());`,
      options: ['`3`', '`2`', '`1`', 'Erreur de compilation'],
      correct: 1,
      explication: 'Un `Set` **ignore** le second `3` : il ne contient que `3` et `5`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '5. Map', title: '`Map` : **clé** → **valeur**',
    blocks: [
      {
        k: 'cols', ratio: 1.25,
        left: [{
          k: 'code', small: true, code: `
Map<String, Integer> notes = new HashMap<>();
notes.put("Sarra", 15);
notes.put("Ahmed", 12);
notes.put("Sarra", 17);      // remplace la valeur
System.out.println(notes.get("Sarra"));
System.out.println(notes.size());`, output: '17\n2',
        }],
        right: [{
          k: 'list', items: [
            '`Map<K, V>` : un type pour la **clé**, un pour la **valeur**.',
            'Une **clé** est **unique** : `put` avec une clé **existante** remplace la valeur.',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Map', title: 'Les méthodes de `Map`',
    blocks: [
      {
        k: 'table', small: true,
        head: ['Méthode', 'Effet'],
        rows: [
          ['`put(k, v)`', 'ajoute ou **remplace**'],
          ['`get(k)`', 'valeur de la clé, ou **`null`** si absente'],
          ['`getOrDefault(k, d)`', 'valeur de la clé, ou `d` si absente'],
          ['`containsKey(k)`  /  `containsValue(v)`', 'la clé / la valeur existe ?'],
          ['`remove(k)`', 'supprime la **paire**'],
          ['`size()`  /  `isEmpty()`', '**nombre** de paires  /  vide ?'],
          ['`keySet()`  /  `values()`  /  `entrySet()`', 'les **clés**  /  les **valeurs**  /  les **paires**'],
        ],
      },
      { k: 'box', tone: 'attention', text: '`int n = notes.get("Zoé");` avec une clé **absente** : `get` renvoie `null`, et le **déballage** lève une **`NullPointerException`**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Map', title: '**Parcourir** une `Map`',
    blocks: [
      {
        k: 'code', code: `
for (String nom : notes.keySet()) {                   // les clés
    System.out.println(nom + " : " + notes.get(nom));
}

for (Map.Entry<String, Integer> e : notes.entrySet()) {   // les paires
    System.out.println(e.getKey() + " : " + e.getValue());
}`,
      },
      { k: 'box', tone: 'info', text: 'Avec `HashMap`, l\'**ordre** des paires **n\'est pas garanti**. `LinkedHashMap` garde l\'ordre d\'**insertion**, `TreeMap` trie par **clé**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Map', title: 'Quiz : **remplacer** une clé',
    blocks: [{
      k: 'quiz', question: 'Qu\'affiche ce programme ?',
      code: `
Map<String, Integer> m = new HashMap<>();
m.put("a", 1);
m.put("a", 2);
System.out.println(m.size() + " " + m.get("a"));`,
      options: ['`2 1`', '`1 2`', '`2 2`', '`1 1`'],
      correct: 1,
      explication: 'La clé `"a"` est **unique** : le second `put` **remplace** la valeur. Il reste **1** paire, de valeur **2**.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '6. Parcourir et trier', title: '**Parcourir** une collection',
    blocks: [
      {
        k: 'code', small: true, code: `
for (String nom : noms) {                      // for-each
    System.out.println(nom);
}

Iterator<String> it = noms.iterator();         // itérateur : on peut SUPPRIMER
while (it.hasNext()) {
    if (it.next().equals("Ahmed")) {
        it.remove();
    }
}`,
      },
      { k: 'box', tone: 'attention', text: 'Ne **modifiez pas** une collection **dans** un for-each (`noms.remove(…)`) : risque de **`ConcurrentModificationException`**. Utilisez l\'**itérateur**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Parcourir et trier', title: '**Trier** une liste',
    blocks: [
      {
        k: 'code', small: true, code: `
List<String> noms = new ArrayList<>(List.of("Sarra", "Ahmed", "Lina"));
Collections.sort(noms);
System.out.println(noms);`, output: '[Ahmed, Lina, Sarra]',
      },
      {
        k: 'list', items: [
          '`Collections.sort(liste)` trie dans l\'**ordre naturel** : les éléments doivent être **`Comparable`** (chapitre 3).',
          'Un autre ordre : `Collections.sort(liste, unComparator)` (**`Comparator`**, chapitre 3).',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Parcourir et trier', title: 'La classe utilitaire `Collections`',
    blocks: [
      {
        k: 'table', small: true,
        head: ['Méthode', 'Effet'],
        rows: [
          ['`Collections.sort(l)`', '**trie** la liste'],
          ['`Collections.reverse(l)`', '**inverse** l\'ordre'],
          ['`Collections.max(c)`  /  `min(c)`', 'plus **grand**  /  plus **petit** élément'],
          ['`Collections.shuffle(l)`', '**mélange** la liste'],
          ['`Collections.frequency(c, o)`', '**nombre** d\'occurrences de `o`'],
        ],
      },
      { k: 'box', tone: 'attention', text: '`List.of(…)` crée une liste **immuable** : `add` ou `remove` lèvent une **`UnsupportedOperationException`**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Écrire ses génériques', title: 'Une classe **générique**',
    blocks: [
      {
        k: 'cols', ratio: 1.1,
        left: [{
          k: 'code', small: true, code: `
class Boite<T> {
    private T contenu;

    void set(T c) {
        contenu = c;
    }

    T get() {
        return contenu;
    }
}`,
        }],
        right: [{
          k: 'code', small: true, code: `
Boite<String> b = new Boite<>();
b.set("Java");
String s = b.get();

Boite<Integer> n = new Boite<>();
n.set(42);`,
        }],
      },
      { k: 'box', tone: 'retenir', text: '`T` est un **paramètre de type** : il prend la valeur choisie à l\'**utilisation** (`String`, `Integer`…).' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '7. Écrire ses génériques', title: 'Une méthode générique **bornée**',
    blocks: [
      {
        k: 'code', code: `
static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

max("abc", "xyz");     // "xyz"
max(3, 7);             // 7`,
      },
      {
        k: 'list', items: [
          '`<T extends Comparable<T>>` : `T` doit **savoir se comparer**.',
          'C\'est le « maximum de deux objets » du chapitre 3, **valable pour tous** les types comparables.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '8. Les énumérations', title: 'Les **énumérations** : `enum`',
    blocks: [
      {
        k: 'cols', ratio: 1.15,
        left: [{
          k: 'code', small: true, code: `
enum Niveau { L1, L2, L3 }

Niveau n = Niveau.L2;

switch (n) {
    case L1: System.out.println("première année"); break;
    case L2: System.out.println("deuxième année"); break;
    default: System.out.println("autre");
}

for (Niveau x : Niveau.values()) {
    System.out.println(x);
}`,
        }],
        right: [{
          k: 'list', items: [
            'Un **`enum`** est un type avec un **nombre fini** de valeurs.',
            'Plus sûr qu\'un `int` ou qu\'un `String` : **toute autre valeur est refusée**.',
            '`values()` : toutes les valeurs. `name()` : leur nom.',
            'Utilisable dans un **`switch`**.',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Pratique', title: 'Exercice : **compter** les mots',
    blocks: [
      {
        k: 'exercise', prompt: 'Compter combien de fois **chaque mot** apparaît dans `{"java", "poo", "java", "poo", "java"}`.',
        solution: [
          {
            k: 'code', small: true, code: `
String[] mots = {"java", "poo", "java", "poo", "java"};
Map<String, Integer> freq = new HashMap<>();
for (String m : mots) {
    freq.put(m, freq.getOrDefault(m, 0) + 1);
}
System.out.println(freq);`,
          },
          { k: 'p', text: '`getOrDefault(m, 0)` donne **0** pour un mot **jamais vu**. Résultat : `java` → **3**, `poo` → **2** (l\'**ordre** d\'affichage n\'est pas garanti).' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '9. Pratique', title: 'Quelle **collection** choisir ?',
    blocks: [
      {
        k: 'table',
        head: ['Besoin', 'Choix'],
        rows: [
          ['une suite avec **doublons**, accès par **position**', '**`ArrayList`**'],
          ['**supprimer** souvent au début ou au milieu', '`LinkedList`'],
          ['**éliminer** les doublons', '**`HashSet`** (ordre d\'insertion : `LinkedHashSet`)'],
          ['des éléments **toujours triés**', '`TreeSet`'],
          ['retrouver une valeur **par sa clé**', '**`HashMap`**'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, title: 'Chapitre 5 — À retenir',
    blocks: [
      {
        k: 'list', items: [
          '**`List`** : ordre et doublons ; **`Set`** : sans doublon ; **`Map`** : clé → valeur.',
          'On déclare l\'**interface** : `List<String> l = new ArrayList<>();`.',
          'Les **génériques** (`<T>`) interdisent les **mauvais types** ; pour un `int`, on écrit **`Integer`**.',
          '`Set` et `Map` s\'appuient sur **`equals`** et **`hashCode`**.',
          '`Collections.sort` exige des éléments **`Comparable`**.',
          '**`enum`** : un nombre **fini** de valeurs nommées.',
        ],
      },
    ],
  },
]
