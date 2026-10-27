import type { Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   CONSOLIDATION TECHSTORE (fin du chapitre 2, avant l'héritage)
   Fil conducteur : fascicule de TP 1 à 3 (Article, Element, Stock,
   Personne, Adresse). Code vérifié avec javac (JDK 21).
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch2'
const V = 'Exercices · 1. Visibilité'
const P = 'Exercices · 2. Paquetages'
const H = 'Exercices · 3. Composition'
const S = 'Exercices · 4. Surcharge'
const D = 'Exercices · 5. Grand défi'

export const TECHSTORE: Slide[] = [
  {
    kind: 'content', chapter: C, section: 'Exercices du chapitre 2', title: 'Récapitulatif du chapitre 2 : **les exercices**',
    blocks: [
      { k: 'p', text: 'Fil conducteur : le projet **TechStore** des **TP 1 à 3** (`Article`, `Element`, `Stock`, `Personne`, `Adresse`).' },
      {
        k: 'cards', items: [
          { title: '1. Visibilité', text: '**Ce code compile-t-il ?** · lire les **erreurs** du compilateur' },
          { title: '2. Paquetages', text: '**Ranger** les classes · corriger **`package`** et **`import`**' },
          { title: '3. Composition', text: '`Personne` **possède** une `Adresse` · compléter `Stock` et `Element`' },
          { title: '4. Surcharge', text: 'quelle méthode **choisit** le compilateur ? · déclarations **invalides**' },
          { title: '5. Grand défi', text: '**6 erreurs** dans **4 fichiers** : trouver, corriger, comparer' },
        ],
      },
      { k: 'box', tone: 'info', text: 'Chaque exercice : **prédire**, **répondre**, puis **correction** pas à pas.' },
    ],
    notes: {
      objectif: 'Annoncer la série d’exercices qui récapitule le chapitre 2 sur le fil TechStore.',
      conseil: 'Rappeler que ces exercices réutilisent les classes des TP 2 et 3 : les étudiants les connaissent déjà.',
      duree: 1,
    },
  },

  /* ── Module 1 : visibilité ───────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: V, title: 'Pourquoi **protéger** les données d\'un `Article` ?',
    blocks: [
      {
        k: 'steps', items: [
          {
            label: 'Le problème', blocks: [
              { k: 'p', text: 'Variante : `nom` et `reference` sont **`public`**. Règle du TP 3 : modifier le **nom** implique de modifier la **référence**.' },
              {
                k: 'reveal', tag: 'Prédiction', prompt: 'Le code **compile**. Qu\'affiche la **2e** ligne `println` ?',
                blocks: [{
                  k: 'code', small: true, file: 'Main.java (extrait)', code: `
Article a = new Article("Smartphone INFINIX Hot 10", 439);   // id = 2
System.out.println(a.nom + " / " + a.reference);
a.nom = "Smartphone NOKIA C1";
System.out.println(a.nom + " / " + a.reference);`,
                }],
                answer: [
                  { k: 'code', plain: true, small: true, code: 'Smartphone INFINIX Hot 10 / SpNo2\nSmartphone NOKIA C1 / SpNo2' },
                  { k: 'p', text: 'Le nom a changé, la référence **non** : `SpNo2` au lieu de `SpA2`.' },
                ],
              },
            ],
          },
          {
            label: 'Objet incohérent', blocks: [
              {
                k: 'cols', ratio: 1.1,
                left: [{
                  k: 'memory', compact: true,
                  stack: [{ name: 'a', ref: 'o' }],
                  heap: [{
                    id: 'o', type: 'Article', changed: ['nom'], note: 'référence attendue : SpA2',
                    fields: [['id', '2'], ['nom', '"Smartphone NOKIA C1"'], ['reference', '"SpNo2"'], ['prix', '439.0']],
                  }],
                }],
                right: [
                  { k: 'box', tone: 'attention', text: '`Main` a **contourné** la règle du TP : l\'objet est dans un **état incohérent**.' },
                  { k: 'p', text: 'Toute classe peut écrire `a.nom = ...` : l\'erreur est **difficile à retrouver**.' },
                ],
              },
            ],
          },
          {
            label: 'La solution', blocks: [
              {
                k: 'cols', ratio: 1.05,
                left: [{
                  k: 'code', small: true, file: 'Article.java (extrait)', highlight: [2, 3, 6, 7, 8, 9], code: `
public class Article {
    private String nom;
    private String reference;
    // ...

    public void modifier(String nom) {
        this.nom = nom;
        reference = genererReference();
    }
}`,
                }],
                right: [{
                  k: 'code', small: true, file: 'Main.java (extrait)', output: 'Smartphone NOKIA C1 / SpA2', code: `
a.modifier("Smartphone NOKIA C1");
System.out.println(a.getNom() + " / "
                   + a.getReference());`,
                }],
              },
              { k: 'box', tone: 'retenir', text: '**`private`** + méthode **`public`** : l\'objet **garantit lui-même** sa cohérence.' },
            ],
          },
        ],
      },
      { k: 'tp', text: 'TP 3 · Activité 3.0 — `Article` : attributs privés, `modifier(String)`' },
    ],
    notes: {
      objectif: 'Motiver private par une règle réelle du TP 3 : le nom et la référence doivent rester cohérents.',
      question: 'Qu\'affiche la 2e ligne println ?',
      reponse: 'Smartphone NOKIA C1 / SpNo2 : la référence n’a pas été recalculée (attendu SpA2).',
      conseil: 'Faire calculer SpA2 à la main (lettres d’indices 0, 5, 10, 15 sans les espaces, puis l’id). « id = 2 » : 3e article créé, comme dans le TP 1.',
      transition: 'Quels sont les quatre niveaux possibles ?',
      duree: 4,
    },
  },
  {
    kind: 'content', chapter: C, section: V, title: 'Les **quatre niveaux** de visibilité dans TechStore',
    blocks: [
      { k: 'ask', text: 'Qui peut utiliser `prix`, `id`, `reference` et `getPrix()` ?' },
      {
        k: 'progressive', button: 'Niveau suivant', cols: 2,
        items: [
          [
            { k: 'p', text: '**`private`** : **seulement** dans `Article`.' },
            { k: 'code', small: true, highlight: [2], bad: [3], code: 'private double prix;\n// ✓ Article\n// ✗ Element, Stock, Main' },
          ],
          [
            { k: 'p', text: '***Défaut*** (aucun mot-clé) : le **même paquetage**.' },
            { k: 'code', small: true, highlight: [2], bad: [3], code: 'int id;\n// ✓ techstore.model (Article, Element…)\n// ✗ techstore.service, techstore.app' },
          ],
          [
            { k: 'p', text: '**`protected`** : le **même paquetage** aussi.' },
            { k: 'code', small: true, highlight: [2], code: 'protected String reference;\n// ✓ techstore.model\n// sous-classes : chapitre 3' },
          ],
          [
            { k: 'p', text: '**`public`** : **partout**.' },
            { k: 'code', small: true, highlight: [2], code: 'public double getPrix() { return prix; }\n// ✓ Article, Element, Stock, Main' },
          ],
          [{ k: 'box', tone: 'attention', text: '***Défaut* ≠ `public`** : sans mot-clé, l\'accès **s\'arrête au paquetage**.' }],
        ],
      },
    ],
    notes: {
      objectif: 'Associer chaque modificateur à un périmètre précis du projet TechStore. TP 2 et 3 (activités 2.0, 2.1, 3.0) : attributs privés, méthodes publiques.',
      question: 'Qui peut utiliser prix, id, reference et getPrix() ?',
      reponse: 'prix : Article seulement ; id et reference : tout techstore.model ; getPrix() : partout.',
      conseil: '« Niveau suivant » un par un, faire prédire avant chaque clic. Insister : défaut ≠ public. Le cas protected + sous-classe d’un autre paquetage est reporté au chapitre 3.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: V, title: 'Matrice d\'accessibilité TechStore',
    blocks: [
      {
        k: 'vismatrix',
        mods: [
          {
            label: '`private`',
            code: 'package techstore.model;\n\npublic class Article {\n    private double prix;\n}',
            note: 'Seulement **dans `Article`**. Même `Element`, du **même paquetage**, est refusé.',
          },
          {
            label: '*défaut*',
            code: 'package techstore.model;\n\npublic class Article {\n    int id;   // aucun mot-clé\n}',
            note: 'Tout **`techstore.model`** : `Article`, `Element`, `Adresse`, `Personne`. **Pas** `Stock` ni `Main`.',
          },
          {
            label: '`protected`',
            code: 'package techstore.model;\n\npublic class Article {\n    protected String reference;\n}',
            note: 'Dans le **même paquetage** : comme *défaut*. Depuis une **sous-classe** d\'un autre paquetage : **chapitre 3**.',
          },
          {
            label: '`public`',
            code: 'package techstore.model;\n\npublic class Article {\n    private double prix;\n    public double getPrix() { return prix; }\n}',
            note: '**Partout**, car la classe `Article` est elle-même `public`.',
          },
        ],
        rows: [
          { label: '`Article` (la classe elle-même)', cells: ['✓', '✓', '✓', '✓'] },
          { label: '`Element` · même paquetage `techstore.model`', cells: ['✗', '✓', '✓', '✓'] },
          { label: '`Stock` · paquetage `techstore.service`', cells: ['✗', '✗', '✗', '✓'] },
          { label: '`Main` · paquetage `techstore.app`', cells: ['✗', '✗', '✗', '✓'] },
          { label: 'Sous-classe dans un autre paquetage', cells: ['✗', '✗', '→ ch. 3', '✓'] },
        ],
      },
    ],
    notes: {
      objectif: 'Lire la visibilité comme « qui, depuis quel paquetage ».',
      conseil: 'Cliquer chaque en-tête de colonne, faire lire la ligne Element puis Stock. La dernière ligne est volontairement renvoyée au chapitre 3.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: V, title: 'Exercice : ce code **compile-t-il** ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Les classes', blocks: [
            {
              k: 'cols', ratio: 0.85,
              left: [{
                k: 'code', small: true, file: 'techstore/model/Article.java', code: `
package techstore.model;

public class Article {
    private double prix;
    int id;
    protected String reference;

    public double getPrix() { return prix; }
}`,
              }],
              right: [{
                k: 'code', small: true, file: 'techstore/app/Main.java (extrait)', code: `
Article a = new Article();
System.out.println(a.getPrix());   // (1)
System.out.println(a.prix);        // (2)
System.out.println(a.id);          // (3)
System.out.println(a.reference);   // (4)`,
              }],
            },
            { k: 'box', tone: 'info', text: '**Variante d\'exercice** : dans le TP, **tous** les attributs sont `private`.' },
          ],
        },
        {
          label: 'Votre réponse', blocks: [{
            k: 'quiz', verify: true,
            question: 'Dans `Main` (paquetage `techstore.app`), **quelles lignes** compilent ?',
            codeFile: 'techstore/app/Main.java (extrait)',
            code: `
Article a = new Article();
System.out.println(a.getPrix());   // (1)
System.out.println(a.prix);        // (2)
System.out.println(a.id);          // (3)
System.out.println(a.reference);   // (4)`,
            options: ['(1) seulement', '(1) et (3)', '(1), (3) et (4)', 'Les quatre'],
            correct: 0,
            explication: '`Main` est dans un **autre paquetage** que `Article` : seul le membre **`public`** est accessible.',
            detailTitle: 'Les pièges',
            detail: '**(3)** *défaut* ≠ `public` : `id` s\'arrête à `techstore.model`.\n**(4)** `protected` ne suffit pas : `Main` est **hors** du paquetage.',
          }],
        },
      ],
    }],
    notes: {
      objectif: 'Prédire la compilation à partir des modificateurs et des paquetages.',
      question: 'Quelles lignes compilent dans Main ?',
      reponse: 'A : (1) seulement.',
      conseil: 'Étape 1 : laisser 1 minute en binôme. Étape 2 : vote A/B/C/D, puis Vérifier ou S. La correction ligne par ligne est sur la diapo suivante.',
      duree: 4,
    },
  },
  {
    kind: 'content', chapter: C, section: V, title: 'Correction : **lire** les erreurs du compilateur',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Ligne par ligne', blocks: [{
            k: 'progressive', button: 'Ligne suivante',
            items: [
              [{ k: 'p', text: '**(1)** `a.getPrix()` : **`public`** → ✓ compile.' }],
              [
                { k: 'p', text: '**(2)** `a.prix` : **`private`** → réservé à `Article`.' },
                { k: 'code', plain: true, small: true, code: 'error: prix has private access in Article' },
              ],
              [
                { k: 'p', text: '**(3)** `a.id` : ***défaut*** → `Main` est dans un **autre paquetage**.' },
                { k: 'code', plain: true, small: true, code: 'error: id is not public in Article; cannot be accessed from outside package' },
              ],
              [
                { k: 'p', text: '**(4)** `a.reference` : **`protected`** → `Main` est **hors** de `techstore.model`.' },
                { k: 'code', plain: true, small: true, code: 'error: reference has protected access in Article' },
              ],
            ],
          }],
        },
        {
          label: 'Depuis `Element` ?', blocks: [{
            k: 'reveal', tag: 'Question', prompt: 'Mêmes lignes, mais dans **`Element`** (paquetage **`techstore.model`**) : lesquelles compilent ?',
            blocks: [{
              k: 'code', small: true, file: 'techstore/model/Element.java (extrait)', code: `
void tester(Article a) {
    System.out.println(a.getPrix());   // (1)
    System.out.println(a.prix);        // (2)
    System.out.println(a.id);          // (3)
    System.out.println(a.reference);   // (4)
}`,
            }],
            answer: [
              { k: 'p', text: '**(1)**, **(3)** et **(4)** ✓ : même paquetage. Seule **(2)** échoue : `prix` reste **privé**.' },
              { k: 'code', plain: true, small: true, code: 'error: prix has private access in Article' },
            ],
          }],
        },
        {
          label: 'À retenir', blocks: [
            {
              k: 'table', small: true, head: ['Message de `javac`', 'Modificateur en cause'],
              rows: [
                ['`... has private access in Article`', '`private`'],
                ['`... is not public in Article; cannot be accessed from outside package`', '*défaut*'],
                ['`... has protected access in Article`', '`protected`'],
              ],
            },
            { k: 'box', tone: 'retenir', text: '`protected` **inclut** le même paquetage. Dans le TP : attributs **`private`**, accès par les **méthodes publiques**.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Relier chaque message de javac au modificateur en cause.',
      question: 'Depuis Element, quelles lignes compilent ?',
      reponse: '(1), (3) et (4) ; seule (2) échoue.',
      conseil: 'Lire chaque message à voix haute. Faire remarquer que (3) et (4) changent de verdict quand on change de paquetage, pas (2).',
      duree: 4,
    },
  },

  /* ── Module 2 : paquetages ───────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: P, title: 'Pourquoi organiser TechStore en **paquetages** ?',
    blocks: [
      { k: 'ask', text: '`Article`, `Element`, `Adresse`, `Personne`, `Stock`, `Main` : comment **s\'y retrouver** ?' },
      {
        k: 'cards', items: [
          { title: 'Ranger', text: 'regrouper les classes par **rôle** : données, gestion, lancement' },
          { title: 'Nommer', text: 'un **espace de noms** : `techstore.model.Article`' },
          { title: 'Protéger', text: 'la visibilité *défaut* **s\'arrête** au paquetage' },
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Un paquetage = un **dossier** + un **espace de noms**.' },
    ],
    notes: {
      objectif: 'Justifier les paquetages avant d’en montrer la syntaxe.',
      question: 'Comment s’y retrouver quand le projet grandit ?',
      reponse: 'Regrouper par rôle ; chaque paquetage donne un nom complet et une frontière de visibilité.',
      duree: 2,
    },
  },
  {
    kind: 'content', chapter: C, section: P, title: 'Structure du projet **TechStore**',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Les dossiers', blocks: [{
            k: 'cols', ratio: 0.9,
            left: [{
              k: 'tree', title: 'Projet TechStore',
              nodes: [
                { name: 'src/', depth: 0 },
                { name: 'techstore/', depth: 1 },
                { name: 'model/', depth: 2, note: 'les **données**' },
                { name: 'Article.java', depth: 3 },
                { name: 'Element.java', depth: 3 },
                { name: 'Adresse.java', depth: 3 },
                { name: 'Personne.java', depth: 3 },
                { name: 'service/', depth: 2, note: 'la **gestion**' },
                { name: 'Stock.java', depth: 3 },
                { name: 'app/', depth: 2, note: 'le **lancement**' },
                { name: 'Main.java', depth: 3 },
              ],
            }],
            right: [
              { k: 'p', text: 'Chaque **dossier** correspond à un **paquetage**.' },
              { k: 'code', small: true, file: 'model/Article.java (ligne 1)', code: 'package techstore.model;' },
              { k: 'code', small: true, file: 'service/Stock.java (ligne 1)', code: 'package techstore.service;' },
              { k: 'code', small: true, file: 'app/Main.java (ligne 1)', code: 'package techstore.app;' },
            ],
          }],
        },
        {
          label: 'Qui utilise qui ?', blocks: [
            {
              k: 'flow', steps: [
                { label: '`techstore.app`', sub: '`Main`' },
                { label: '`techstore.service`', sub: '`Stock`' },
                { label: '`techstore.model`', sub: '`Article`, `Element`, `Adresse`, `Personne`' },
              ],
            },
            { k: 'p', text: 'Une flèche = des **`import`**. `Main` importe aussi `Article`.' },
            {
              k: 'code', small: true, file: 'techstore/service/Stock.java (début)', highlight: [4, 5], code: `
package techstore.service;

import java.util.ArrayList;
import techstore.model.Article;
import techstore.model.Element;`,
            },
          ],
        },
        {
          label: 'Noms complets', blocks: [
            {
              k: 'table', small: true, head: ['Classe', 'Paquetage', 'Nom complet'],
              rows: [
                ['`Article`', '`techstore.model`', '`techstore.model.Article`'],
                ['`Stock`', '`techstore.service`', '`techstore.service.Stock`'],
                ['`Main`', '`techstore.app`', '`techstore.app.Main`'],
              ],
            },
            { k: 'box', tone: 'retenir', text: '`import` donne un **nom court** ; il ne change **pas** la visibilité.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Visualiser la correspondance dossier ↔ paquetage et le sens des dépendances.',
      conseil: 'Étape 2 : faire remarquer que model n’importe rien de service ni de app.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: P, title: 'Exercice : **ranger** les classes',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'À vous', blocks: [
            { k: 'p', text: 'Placez chaque classe dans **`model`**, **`service`** ou **`app`**.' },
            {
              k: 'table', small: true, head: ['Classe', 'Rôle (fascicule de TP)', 'Paquetage ?'],
              rows: [
                ['`Article`', 'un produit : nom, référence, prix (3.0)', '?'],
                ['`Element`', 'un article **et** sa quantité (3.1)', '?'],
                ['`Adresse`', 'gouvernorat, code postal (2.0)', '?'],
                ['`Personne`', 'client ou gérant (2.1)', '?'],
                ['`Stock`', 'ajoute, trouve, supprime des éléments (3.2)', '?'],
                ['`Main`', 'le menu du gérant, `main()` (3.3)', '?'],
              ],
            },
          ],
        },
        {
          label: 'Le cas `Element`', blocks: [{
            k: 'quiz', verify: true,
            question: 'Où placer **`Element`** ?',
            options: ['`techstore.model`', '`techstore.service`', '`techstore.app`'],
            correct: 0,
            explication: '`Element` décrit une **donnée** (un article + sa quantité), comme `Article`. C\'est `Stock` qui la **gère**.',
          }],
        },
        {
          label: 'Correction', blocks: [
            {
              k: 'pkgs', packages: [
                { name: 'techstore.model', classes: [{ name: 'Article' }, { name: 'Element' }, { name: 'Adresse' }, { name: 'Personne' }] },
                { name: 'techstore.service', classes: [{ name: 'Stock' }] },
                { name: 'techstore.app', classes: [{ name: 'Main' }] },
              ],
            },
            { k: 'box', tone: 'retenir', text: '**Données** → `model` · **gestion** → `service` · **lancement** → `app`.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Classer les classes du TP selon leur rôle.',
      question: 'Où placer Element ?',
      reponse: 'techstore.model : c’est une donnée, Stock la gère.',
      conseil: 'Étape 1 : les étudiants répondent sur papier. Element est le seul cas discutable.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: P, title: 'Exercice : corriger **`package`** et **`import`**',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Le code', blocks: [
            {
              k: 'cols', ratio: 1.35,
              left: [{
                k: 'code', small: true, file: 'techstore/service/Stock.java', code: `
package techstore.service;

import java.util.ArrayList;
import techstore.Article;

public class Stock {
    private ArrayList<Element> articleList = new ArrayList<>();

    public void ajouterArticle(Article article, long quantite) {
        articleList.add(new Element(article, quantite));
    }
}`,
              }],
              right: [{
                k: 'code', small: true, file: 'techstore/model/Element.java', code: `
package techstore.model;

class Element {
    private Article article;
    private long quantite;
    // ...
}`,
              }],
            },
            { k: 'box', tone: 'question', text: 'Trouvez les **problèmes** avant de compiler. Indice : `import` **et** visibilité.' },
          ],
        },
        {
          label: '1re compilation', blocks: [{
            k: 'cols', ratio: 1.4,
            left: [{
              k: 'code', small: true, file: 'Stock.java', bad: [4, 7], code: `
package techstore.service;

import java.util.ArrayList;
import techstore.Article;

public class Stock {
    private ArrayList<Element> articleList = new ArrayList<>();
    // ...
}`,
            }],
            right: [
              { k: 'code', plain: true, small: true, code: 'Stock.java:4: error: cannot find symbol\nimport techstore.Article;\n  symbol:   class Article\n  location: package techstore\nStock.java:7: error: cannot find symbol\n  symbol:   class Element\n  location: class Stock' },
              { k: 'p', text: '`Article` et `Element` sont dans **`techstore.model`** : importer **le bon paquetage**.' },
            ],
          }],
        },
        {
          label: '2e compilation', blocks: [
            {
              k: 'code', small: true, file: 'Stock.java', highlight: [4, 5], bad: [5], code: `
package techstore.service;

import java.util.ArrayList;
import techstore.model.Article;
import techstore.model.Element;
// ...`,
            },
            { k: 'code', plain: true, small: true, code: 'error: Element is not public in techstore.model; cannot be accessed from outside package' },
            { k: 'p', text: 'L\'`import` est **juste**, mais la **classe** `Element` (sans `public`) reste **dans son paquetage** : accès **interdit**.' },
          ],
        },
        {
          label: 'Version correcte', blocks: [
            {
              k: 'cols', ratio: 1.35,
              left: [{
                k: 'code', small: true, file: 'techstore/service/Stock.java', status: 'ok', highlight: [4, 5], code: `
package techstore.service;

import java.util.ArrayList;
import techstore.model.Article;
import techstore.model.Element;

public class Stock {
    private ArrayList<Element> articleList = new ArrayList<>();
    // ...
}`,
              }],
              right: [{
                k: 'code', small: true, file: 'techstore/model/Element.java', highlight: [3], code: `
package techstore.model;

public class Element {
    // ...
}`,
              }],
            },
            { k: 'box', tone: 'retenir', text: '**`package`** = le dossier · **`import`** = le bon paquetage · classe **`public`** si elle sert ailleurs.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Corriger des erreurs réelles d’import et d’accès à une classe non publique.',
      reponse: 'import techstore.Article → techstore.model.Article ; import de Element manquant ; class Element → public class Element.',
      conseil: 'Les erreurs apparaissent dans l’ordre où javac les signale : d’abord les imports, puis l’accès interdit à Element.',
      duree: 5,
    },
  },

  /* ── Module 3 : composition ──────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: H, title: 'Problème : une personne **possède** une adresse',
    blocks: [
      { k: 'p', text: 'TP 2 : une personne a un **CIN**, un **nom**, un **prénom** et une **adresse**.' },
      {
        k: 'quiz', verify: true,
        question: 'Comment représenter l\'adresse dans `Personne` ?',
        options: [
          '`private String adresse;` : une seule chaîne',
          '`private String gouvernorat;` et `private int codePostal;` dans `Personne`',
          '`private Adresse adresse;` : un objet `Adresse`',
        ],
        correct: 2,
        explication: 'Le TP 2 définit une classe **`Adresse`** avec ses **attributs** et ses **méthodes** (`getGouvernorat()`, `toString()`). `Personne` **possède** une `Adresse`.',
        detailTitle: 'Pourquoi pas A ni B ?',
        detail: '**A** : impossible de lire le **code postal** seul.\n**B** : `Personne` gère des détails d\'adresse ; ils ne sont **réutilisables** nulle part ailleurs.',
      },
      { k: 'tp', text: 'TP 2 · Activités 2.0 et 2.1 — `Adresse`, `Personne`' },
    ],
    notes: {
      objectif: 'Faire émerger l’idée d’un attribut dont le type est une classe.',
      question: 'Comment représenter l’adresse dans Personne ?',
      reponse: 'C : private Adresse adresse.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: H, title: 'Les classes **`Adresse`** et **`Personne`**',
    blocks: [{
      k: 'steps', items: [
        {
          label: '`Adresse`', blocks: [{
            k: 'code', small: true, file: 'techstore/model/Adresse.java (extrait)', highlight: [2, 3], code: `
public class Adresse {
    private String gouvernorat;
    private int codePostal;

    public Adresse(String gouvernorat, int codePostal) {
        this.gouvernorat = gouvernorat;
        this.codePostal = codePostal;
    }

    public String getGouvernorat() { return gouvernorat; }
    public int getCodePostal() { return codePostal; }

    public String toString() {
        return "Adresse [gouvernorat=" + gouvernorat + ", codePostal=" + codePostal + "]";
    }
}`,
          }],
        },
        {
          label: '`Personne`', blocks: [{
            k: 'code', small: true, file: 'techstore/model/Personne.java (extrait)', highlight: [5, 14, 15], notes: { 5: 'type classe', 14: '2e constructeur' }, code: `
public class Personne {
    private String cin;
    private String nom;
    private String prenom;
    private Adresse adresse;

    public Personne(String cin, String nom, String prenom, Adresse adresse) {
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
    }

    public Personne(String cin, String nom, String prenom,
                    String gouvernorat, int codePostal) {
        this(cin, nom, prenom, new Adresse(gouvernorat, codePostal));
    }
}`,
          }],
        },
        {
          label: 'Deux façons de créer', blocks: [
            {
              k: 'code', small: true, file: 'Main.java (extrait)', output: 'cin=01111111, nom=Kbayer, prenom=Jasser, Adresse [gouvernorat=Monastir, codePostal=5000]\ncin=02222222, nom=Smida, prenom=Ghayth, Adresse [gouvernorat=Jendouba, codePostal=8160]', code: `
Adresse a1 = new Adresse("Monastir", 5000);
Personne p1 = new Personne("01111111", "Kbayer", "Jasser", a1);
Personne p2 = new Personne("02222222", "Smida", "Ghayth", "Jendouba", 8160);
System.out.println(p1);
System.out.println(p2);`,
            },
            { k: 'box', tone: 'info', text: '`p1` reçoit une adresse **existante** ; `p2` **crée** la sienne (2e constructeur).' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Lire les deux classes du TP 2 et repérer l’attribut de type classe.',
      conseil: 'Étape 3 : les deux constructeurs sont une surcharge (lien avec le module 4).',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: H, title: 'La relation « **has-a** » : du code au diagramme',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Diagramme UML', blocks: [
            {
              k: 'uml', width: 1280, height: 290,
              caption: 'Trait plein et flèche : `Personne` **connaît** une `Adresse` (attribut `adresse`).',
              classes: [
                { id: 'p', name: 'Personne', x: 0, y: 20, w: 420, attrs: ['- cin : String', '- nom : String', '- prenom : String'], ops: ['+ getAdresse() : Adresse'] },
                { id: 'a', name: 'Adresse', x: 820, y: 20, w: 460, attrs: ['- gouvernorat : String', '- codePostal : int'], ops: ['+ getCodePostal() : int'] },
              ],
              links: [{ from: 'p', to: 'a', kind: 'assoc', label: '- adresse', mult: '1' }],
            },
            { k: 'p', text: '`codePostal` (`int`) : une **valeur** rangée dans l\'objet. `adresse` : une **référence** vers un **autre objet**.' },
          ],
        },
        {
          label: 'En mémoire', blocks: [{
            k: 'cols', ratio: 0.8,
            left: [
              {
                k: 'code', small: true, file: 'Main.java (extrait)', code: `
Adresse a1 = new Adresse("Monastir", 5000);
Personne p1 = new Personne("01111111",
                   "Kbayer", "Jasser", a1);`,
              },
              { k: 'box', tone: 'retenir', text: 'Primitif : la **valeur** est **dans** l\'objet. Type classe : une **flèche** vers un autre objet.' },
            ],
            right: [{
              k: 'memory', compact: true,
              stack: [{ name: 'a1', ref: 'A' }, { name: 'p1', ref: 'P' }],
              heap: [
                { id: 'A', type: 'Adresse', fields: [['gouvernorat', '"Monastir"'], ['codePostal', '5000']] },
                { id: 'P', type: 'Personne', fields: [['cin', '"01111111"'], ['nom', '"Kbayer"'], ['adresse', 'ref:A']] },
              ],
            }],
          }],
        },
        {
          label: 'Partagée ?', blocks: [
            {
              k: 'reveal', tag: 'Prédiction', prompt: 'On modifie `a1` **après** avoir créé `p1`. Qu\'affiche `p1` ?',
              blocks: [{
                k: 'code', small: true, file: 'Main.java (suite)', code: 'a1.setCodePostal(5001);\nSystem.out.println(p1);',
              }],
              answer: [
                { k: 'code', plain: true, small: true, code: 'cin=01111111, nom=Kbayer, prenom=Jasser, Adresse [gouvernorat=Monastir, codePostal=5001]' },
                { k: 'p', text: '`a1` et `p1.adresse` désignent le **même objet** : l\'adresse est **partagée**.' },
              ],
            },
            { k: 'box', tone: 'attention', title: 'has-a ≠ composition forte', text: 'L\'adresse **existe hors** de la personne et peut être **partagée** : ce n\'est **pas** automatiquement une composition UML forte.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Relier attribut de type classe, association UML et référence en mémoire.',
      question: 'Qu\'affiche p1 après a1.setCodePostal(5001) ?',
      reponse: 'codePostal=5001 : a1 et p1.adresse désignent le même objet.',
      conseil: 'Dire « has-a » / « possède ». Composition forte (UML) : la partie n’existe qu’avec le tout ; ici, a1 vit indépendamment de p1. Le 2e constructeur crée sa propre adresse : plus proche d’une composition.',
      duree: 5,
    },
  },
  {
    kind: 'content', chapter: C, section: H, title: 'Exercice : `Stock`, `Element` et `Article`',
    blocks: [
      {
        k: 'steps', items: [
          {
            label: 'Compléter', blocks: [{
              k: 'fill', small: true, file: 'Element.java et Stock.java (extraits)',
              prompt: 'Complétez les **types** et les **liens** entre objets.',
              code: `
public class Element {
    private [[Article]] article;
    private [[long]] quantite;
    public Element([[Article]] article, long quantite) { this.article = article; this.quantite = quantite; }
}
public class Stock {
    private ArrayList<[[Element]]> articleList;
    public void ajouterArticle(Article article, long quantite) {
        articleList.add([[new Element(article, quantite)]]);
    }
}`,
              explication: '`Element` **possède** un `Article` ; `Stock` **contient** des `Element` ; `quantite` est une simple **valeur**.',
            }],
          },
          {
            label: 'Diagramme', blocks: [
              {
                k: 'uml', width: 1700, height: 300,
                classes: [
                  { id: 's', name: 'Stock', x: 0, y: 20, w: 470, ops: ['+ ajouterArticle(Article, long)', '+ trouverArticle(String)'] },
                  { id: 'e', name: 'Element', x: 640, y: 20, w: 400, attrs: ['- quantite : long'], ops: ['+ getNomArticle() : String'] },
                  { id: 'a', name: 'Article', x: 1220, y: 20, w: 480, attrs: ['- id : int', '- nom : String', '- reference : String', '- prix : double'] },
                ],
                links: [
                  { from: 's', to: 'e', kind: 'assoc', label: '- articleList', mult: '*' },
                  { from: 'e', to: 'a', kind: 'assoc', label: '- article', mult: '1' },
                ],
              },
              { k: 'p', text: '`*` : un stock contient **plusieurs** éléments · `1` : un élément a **un** article.' },
              { k: 'box', tone: 'retenir', text: '`long quantite`, `double prix` : des **valeurs**. `Article article` : une **relation** entre objets.' },
              { k: 'tp', text: 'TP 3 · Activités 3.1 et 3.2 — `Element`, `Stock`' },
            ],
          },
        ],
      },
    ],
    notes: {
      objectif: 'Réinvestir la relation has-a sur les classes du TP 3.',
      reponse: 'Article, long, Article, article.getNom(), Element, new Element(article, quantite).',
      conseil: 'Faire compléter sur papier avant S. Étape 2 : Stock → Element (*), Element → Article (1).',
      duree: 5,
    },
  },

  /* ── Module 4 : surcharge ────────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: S, title: 'Pourquoi plusieurs méthodes **`modifier`** ?',
    blocks: [
      { k: 'p', text: 'TP 1, activité 1.5 : le gérant a tapé **1269** TND au lieu de **1629** TND pour « Apple iPad 8e Génération ».' },
      {
        k: 'reveal', tag: 'Question',
        prompt: 'Changer **le nom seul**, ou **le nom et le prix** : faut-il deux **noms** de méthode différents ?',
        answer: [
          {
            k: 'code', small: true, file: 'Main.java (extrait)', code: `
a.modifier("Apple iPad 9e Génération");
a.modifier("Apple iPad 8e Génération", 1629);`,
          },
          { k: 'p', text: '**Non** : un seul nom, `modifier`, avec **deux listes de paramètres**. C\'est la **surcharge**.' },
          { k: 'box', tone: 'retenir', text: 'Le compilateur choisit la méthode d\'après les **arguments** de l\'appel.' },
        ],
      },
      { k: 'tp', text: 'TP 3 · Activité 3.0 — `modifier(String)` et sa surcharge `modifier(String, double)`' },
    ],
    notes: {
      objectif: 'Motiver la surcharge par un besoin du gérant (TP 1, activité 1.5).',
      question: 'Faut-il deux noms de méthode différents ?',
      reponse: 'Non : même nom, listes de paramètres différentes.',
      duree: 2,
    },
  },
  {
    kind: 'content', chapter: C, section: S, title: '`modifier(String)` et `modifier(String, double)`',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Le code', blocks: [
            {
              k: 'code', small: true, file: 'Article.java (extrait)', notes: { 1: '1 paramètre', 6: '2 paramètres' }, highlight: [1, 6], code: `
public void modifier(String nom) {
    this.nom = nom;
    reference = genererReference();
}

public void modifier(String nom, double prix) {
    modifier(nom);
    this.prix = prix;
}`,
            },
            { k: 'p', text: 'La 2e méthode **réutilise** la 1re : la référence est toujours **mise à jour**.' },
          ],
        },
        {
          label: 'La signature', blocks: [
            {
              k: 'table', head: ['Méthode', 'Signature'],
              rows: [
                ['`void modifier(String nom)`', '`modifier(String)`'],
                ['`void modifier(String nom, double prix)`', '`modifier(String, double)`'],
              ],
            },
            { k: 'p', text: 'Signature = **nom** + **liste des types** des paramètres (nombre, types, ordre).' },
            { k: 'box', tone: 'attention', text: 'Le **type de retour** et les **noms** des paramètres ne font **pas** partie de la signature.' },
          ],
        },
        {
          label: 'Déjà vu en TP', blocks: [{
            k: 'table', small: true, head: ['Fascicule', 'Surcharges'],
            rows: [
              ['2.1 · `Personne`', 'constructeurs `(cin, nom, prenom, adresse)` et `(cin, nom, prenom, gouvernorat, codePostal)`'],
              ['3.0 · `Article`', '`modifier(String)` et `modifier(String, double)`'],
              ['3.1 · `Element`', 'constructeurs `(Article, long)` et `(String, double, long)`'],
              ['3.2 · `Stock`', '`ajouterArticle(Article, long)` et `ajouterArticle(String, double, long)`'],
            ],
          }],
        },
      ],
    }],
    notes: {
      objectif: 'Définir la signature et relier la surcharge aux TP 2 et 3.',
      conseil: 'Étape 3 : les constructeurs se surchargent comme les méthodes.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: S, title: 'Exercice : quelle méthode **choisit** le compilateur ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Prédire', blocks: [{
            k: 'quiz', verify: true,
            question: 'Quelle méthode est appelée à la ligne 2 ?',
            codeFile: 'Main.java (extrait)',
            code: `
Article a = new Article("Apple iPad 8e Génération", 1269);
a.modifier("Apple iPad 8e Génération", 1629);
System.out.println(a.getPrix());`,
            options: ['`modifier(String)`', '`modifier(String, double)`', 'Aucune : erreur de compilation'],
            correct: 1,
            explication: '**2 arguments** → `modifier(String, double)`. L\'`int` `1629` est **converti** en `double` : la ligne 3 affiche `1629.0`.',
          }],
        },
        {
          label: 'Quatre appels', blocks: [{
            k: 'reveal', tag: 'Prédiction', prompt: 'Pour chaque appel : **quelle méthode**, ou **quelle erreur** ?',
            blocks: [{
              k: 'code', small: true, file: 'Main.java (extrait)', code: `
a.modifier("Apple iPad 9e Génération");         // (1)
a.modifier("Apple iPad 8e Génération", 1629);   // (2)
a.modifier("Apple iPad", "1629");               // (3)
a.modifier(1629, "Apple iPad");                 // (4)`,
            }],
            answer: [{
              k: 'table', small: true, head: ['Appel', 'Résultat'],
              rows: [
                ['(1)', '✓ `modifier(String)`'],
                ['(2)', '✓ `modifier(String, double)`'],
                ['(3)', '✗ `incompatible types: String cannot be converted to double`'],
                ['(4)', '✗ `incompatible types: int cannot be converted to String`'],
              ],
            }],
          }],
        },
        {
          label: 'À retenir', blocks: [
            { k: 'box', tone: 'retenir', text: 'Le compilateur compare le **nombre**, le **type** et l\'**ordre** des arguments avec chaque signature.' },
            { k: 'p', text: 'Un `int` peut être **converti** en `double` ; une `String` **jamais** en `double`.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Résoudre un appel surchargé à partir des arguments.',
      question: 'Quelle méthode est appelée ?',
      reponse: 'B : modifier(String, double), 1629 est converti en double.',
      conseil: 'Appel (3) : javac choisit la méthode à 2 paramètres puis signale le type du 2e argument.',
      duree: 4,
    },
  },
  {
    kind: 'content', chapter: C, section: S, title: 'Exercice : corriger des **déclarations** invalides',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Prédire', blocks: [{
            k: 'quiz', verify: true,
            question: 'Ajouts dans `Article` : lesquels sont **invalides** ?',
            codeFile: 'Article.java (a déjà modifier(String) et modifier(String, double))',
            code: `
public void modifier(String n) { nom = n; }               // (1)
public boolean modifier(String nom) { return true; }      // (2)
public void modifier(double prix, String nom) { }         // (3)
public void modifier(double prix) { this.prix = prix; }   // (4)`,
            options: ['(1) et (2)', '(2) seulement', '(1), (2) et (3)', 'Aucune'],
            correct: 0,
            explication: '(1) et (2) : **même signature** `modifier(String)` que l\'existante.',
            error: 'error: method modifier(String) is already defined in class Article',
          }],
        },
        {
          label: 'Corriger', blocks: [
            {
              k: 'reveal', tag: 'Question', prompt: 'Comment corriger **(1)** et **(2)** ?',
              answer: [
                { k: 'p', text: 'Les **supprimer** : `modifier(String)` existe déjà. Changer le **nom du paramètre** ou le **type de retour** ne suffit **pas**.' },
                { k: 'p', text: '**(3)** `(double, String)` ≠ `(String, double)` : l\'**ordre** change → valide. **(4)** un seul `double` → valide.' },
              ],
            },
            { k: 'box', tone: 'retenir', text: 'Surcharge = **même nom**, **liste de paramètres différente**. Le type de retour **seul** ne suffit **pas**.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Repérer les fausses surcharges (nom de paramètre, type de retour).',
      question: 'Quelles déclarations sont invalides ?',
      reponse: 'A : (1) et (2) — même signature modifier(String).',
      duree: 4,
    },
  },

  /* ── Module 5 : grand défi ───────────────────────────────────────── */
  {
    kind: 'content', chapter: C, section: D, title: 'Grand défi TechStore : la mission',
    blocks: [
      {
        k: 'cols', ratio: 0.8,
        left: [{
          k: 'tree', title: '4 fichiers à relire',
          nodes: [
            { name: 'techstore/', depth: 0 },
            { name: 'model/', depth: 1 },
            { name: 'Personne.java', depth: 2 },
            { name: 'Article.java', depth: 2 },
            { name: 'service/', depth: 1 },
            { name: 'Stock.java', depth: 2 },
            { name: 'app/', depth: 1 },
            { name: 'Main.java', depth: 2 },
          ],
        }],
        right: [
          { k: 'p', text: '**6 erreurs** sont cachées. Chacune touche une notion :' },
          {
            k: 'list', items: [
              '**visibilité** et **encapsulation**',
              '**paquetages** et `import`',
              '**composition** (has-a)',
              '**surcharge** et **constructeurs**',
            ],
          },
          { k: 'flow', steps: [{ label: 'Trouver', sub: 'fichier + ligne' }, { label: 'Corriger', sub: 'proposer' }, { label: 'Comparer', sub: 'solution' }] },
        ],
      },
      { k: 'box', tone: 'question', text: 'Par **binôme**, 5 minutes par diapositive. `Personne` est **simplifiée** (sans `prenom`).' },
    ],
    notes: {
      objectif: 'Lancer l’activité de synthèse.',
      conseil: 'Distribuer les rôles : un lit le code, l’autre note fichier + ligne + correction. Les corrections restent masquées jusqu’à → ou S.',
      duree: 2,
    },
  },
  {
    kind: 'content', chapter: C, section: D, title: 'Grand défi · `techstore.model`',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Trouvez 3 erreurs', blocks: [{
            k: 'cols', ratio: 1.45,
            left: [{
              k: 'code', small: true, file: 'Personne.java', code: `
package techstore.model;

public class Personne {
    private String cin;
    private String nom;
    public Adresse adresse;

    public Personne(String cin, String nom, Adresse adresse) {
        this.cin = cin;
        this.nom = nom;
        this.adresse = adresse;
    }

    public Personne(String cin, String nom,
                    String gouvernorat, int codePostal) {
        this(cin, nom, new Adresse(codePostal, gouvernorat));
    }
}`,
            }],
            right: [{
              k: 'code', small: true, file: 'Article.java (extrait)', code: `
package techstore.model;

public class Article {
    private String nom;
    private double prix;
    // ...

    public void modifier(String nom) {
        this.nom = nom;
        reference = genererReference();
    }

    public boolean modifier(String nom) {
        this.nom = nom;
        return true;
    }
}`,
            }],
          }],
        },
        {
          label: 'Les erreurs', blocks: [{
            k: 'progressive', button: 'Erreur suivante',
            items: [
              [{ k: 'box', tone: 'attention', title: '① Encapsulation · Personne, ligne 6', text: '`public` **compile**, mais n\'importe qui peut **remplacer** l\'adresse → `private`.' }],
              [
                { k: 'box', tone: 'attention', title: '② Constructeur · Personne, ligne 16', text: '**Ordre inversé** : le constructeur attend `(gouvernorat, codePostal)`.' },
                { k: 'code', plain: true, small: true, code: 'Personne.java:16: error: incompatible types: int cannot be converted to String' },
              ],
              [
                { k: 'box', tone: 'attention', title: '③ Surcharge · Article, ligne 13', text: 'Même signature `modifier(String)` : seul le **type de retour** change.' },
                { k: 'code', plain: true, small: true, code: 'error: method modifier(String) is already defined in class Article' },
              ],
            ],
          }],
        },
        {
          label: 'Solution', blocks: [{
            k: 'cols', ratio: 1.45,
            left: [{
              k: 'code', small: true, file: 'Personne.java', status: 'ok', highlight: [6, 16], code: `
package techstore.model;

public class Personne {
    private String cin;
    private String nom;
    private Adresse adresse;

    public Personne(String cin, String nom, Adresse adresse) {
        this.cin = cin;
        this.nom = nom;
        this.adresse = adresse;
    }

    public Personne(String cin, String nom,
                    String gouvernorat, int codePostal) {
        this(cin, nom, new Adresse(gouvernorat, codePostal));
    }
}`,
            }],
            right: [
              {
                k: 'code', small: true, file: 'Article.java (extrait)', status: 'ok', code: `
public class Article {
    private String nom;
    private double prix;
    // ...

    public void modifier(String nom) {
        this.nom = nom;
        reference = genererReference();
    }
}`,
              },
              { k: 'box', tone: 'retenir', text: 'La 2e méthode `modifier(String)` est **supprimée**.' },
            ],
          }],
        },
      ],
    }],
    notes: {
      objectif: 'Corriger les classes du paquetage model.',
      reponse: '① public Adresse adresse → private ; ② new Adresse(gouvernorat, codePostal) ; ③ supprimer boolean modifier(String).',
      conseil: '① n’est pas une erreur de compilation : c’est une erreur de conception, que javac ne voit pas.',
      duree: 6,
    },
  },
  {
    kind: 'content', chapter: C, section: D, title: 'Grand défi · `techstore.service` et `techstore.app`',
    blocks: [{
      k: 'steps', items: [
        {
          label: '`Stock.java`', blocks: [{
            k: 'cols', ratio: 2.6,
            left: [{
              k: 'code', small: true, file: 'techstore/service/Stock.java', code: `
package techstore.service;

import java.util.ArrayList;

public class Stock {
    private ArrayList<Article> articleList = new ArrayList<>();

    public void ajouterArticle(Article article, long quantite) {
        articleList.add(new Element(article, quantite));
    }

    public void ajouterArticle(String nom, double prix, long quantite) {
        ajouterArticle(new Article(nom, prix), quantite);
    }
}`,
            }],
            right: [{ k: 'box', tone: 'question', text: 'Trouvez **2 erreurs** dans `Stock`.' }],
          }],
        },
        {
          label: '`Main.java`', blocks: [
            {
              k: 'code', small: true, file: 'techstore/app/Main.java', code: `
package techstore.app;

import techstore.model.Article;
import techstore.service.Stock;

public class Main {
    public static void main(String[] args) {
        Stock stock = new Stock();
        Article ipad = new Article("Apple iPad 8e Génération", 1269);
        stock.ajouterArticle(ipad, 8);
        ipad.prix = 1629;
    }
}`,
            },
            { k: 'box', tone: 'question', text: 'Trouvez **1 erreur** dans `Main`.' },
          ],
        },
        {
          label: 'Erreurs `Stock`', blocks: [{
            k: 'progressive', button: 'Erreur suivante',
            items: [
              [
                { k: 'box', tone: 'attention', title: '④ Paquetages · Stock, ligne 3', text: '`Article` et `Element` sont dans `techstore.model` : **imports manquants**.' },
                { k: 'code', plain: true, small: true, code: 'Stock.java:6: error: cannot find symbol\n  symbol:   class Article\n  location: class Stock' },
              ],
              [
                { k: 'box', tone: 'attention', title: '⑤ Composition · Stock, ligne 6', text: 'Le stock contient des **`Element`** (article **+** quantité), pas des `Article`. Erreur visible **après** l\'ajout des imports :' },
                { k: 'code', plain: true, small: true, code: 'error: incompatible types: Element cannot be converted to Article' },
              ],
            ],
          }],
        },
        {
          label: 'Erreur `Main`', blocks: [
            {
              k: 'reveal', tag: 'Correction', prompt: 'Quelle est l\'erreur de `Main` ?',
              answer: [
                { k: 'box', tone: 'attention', title: '⑥ Visibilité · Main, ligne 11', text: '`prix` est `private` : passer par la méthode publique `modifier(String, double)`.' },
                { k: 'code', plain: true, small: true, code: 'Main.java:11: error: prix has private access in Article' },
              ],
            },
          ],
        },
        {
          label: 'Solution `Stock`', blocks: [{
            k: 'code', small: true, file: 'techstore/service/Stock.java', status: 'ok', highlight: [4, 5, 8], code: `
package techstore.service;

import java.util.ArrayList;
import techstore.model.Article;
import techstore.model.Element;

public class Stock {
    private ArrayList<Element> articleList = new ArrayList<>();

    public void ajouterArticle(Article article, long quantite) {
        articleList.add(new Element(article, quantite));
    }

    public void ajouterArticle(String nom, double prix, long quantite) {
        ajouterArticle(new Article(nom, prix), quantite);
    }
}`,
          }],
        },
        {
          label: 'Solution `Main`', blocks: [
            {
              k: 'code', small: true, file: 'techstore/app/Main.java', status: 'ok', highlight: [11, 12], output: '1629.0', code: `
package techstore.app;

import techstore.model.Article;
import techstore.service.Stock;

public class Main {
    public static void main(String[] args) {
        Stock stock = new Stock();
        Article ipad = new Article("Apple iPad 8e Génération", 1269);
        stock.ajouterArticle(ipad, 8);
        ipad.modifier("Apple iPad 8e Génération", 1629);
        System.out.println(ipad.getPrix());
    }
}`,
            },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Corriger les paquetages service et app.',
      reponse: '④ import techstore.model.Article et Element ; ⑤ ArrayList<Element> ; ⑥ ipad.modifier("Apple iPad 8e Génération", 1629).',
      conseil: '⑤ n’apparaît qu’après la correction de ④ : javac s’arrête d’abord sur les symboles introuvables.',
      duree: 6,
    },
  },

]

/* ── Transition vers l'héritage (après le récapitulatif du chapitre 2) ── */
export const TECHSTORE_TRANSITION: Slide[] = [
  {
    kind: 'content', chapter: C, section: 'Vers le chapitre 3', title: 'Ce qu\'un objet **possède**… et la suite',
    blocks: [
      {
        k: 'cards', items: [
          { title: '`Article` possède un **prix**', text: '`double prix` : une **valeur**' },
          { title: '`Stock` contient des **`Element`**', text: '`ArrayList<Element>` : **plusieurs** objets' },
          { title: '`Personne` possède une **`Adresse`**', text: '`Adresse adresse` : un **autre objet**' },
        ],
      },
      { k: 'ask', text: 'Nous savons maintenant représenter ce qu\'un objet **possède**. Mais comment représenter **plusieurs types** d\'objets partageant des **caractéristiques communes** ?' },
      {
        k: 'reveal', tag: 'Indice', prompt: 'TP 4 : un article peut être un **mobile**, un **ordinateur**, un **périphérique**…',
        answer: [
          { k: 'p', text: 'Un `Mobile` **est un** `Article` (« **is-a** ») : il a un `id`, un `nom`, une `reference`, un `prix`… **plus** ses propres attributs.' },
          { k: 'box', tone: 'retenir', text: '**has-a** : un objet en **possède** un autre · **is-a** : **chapitre 3, l\'héritage**.' },
        ],
      },
    ],
    notes: {
      objectif: 'Passer de « possède » (has-a) à « est un » (is-a).',
      question: 'Comment représenter plusieurs types d’objets partageant des caractéristiques communes ?',
      reponse: 'Par l’héritage : une classe mère (Article) et des classes filles (Mobile, Ordinateur…), comme dans le TP 4.',
      transition: 'Chapitre 3 : l’héritage.',
      duree: 3,
    },
  },
]
