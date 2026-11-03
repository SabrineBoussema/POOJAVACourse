import type { Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   Pont chapitre 2 → chapitre 3 : particularité de `protected`
   Sans enseigner la syntaxe de l'héritage (reportée au ch. 3).
   Code vérifié avec javac.
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch2'
const S = 'Vers le chapitre 3'

export const PROTECTED: Slide[] = [
  {
    kind: 'content', chapter: C, section: S, title: 'Pourquoi avons-nous besoin de **`protected`** ?',
    blocks: [
      {
        k: 'progressive', button: 'Découvrir', cols: 3,
        items: [
          [{
            k: 'box', tone: 'info', title: '`private`',
            text: 'Accès limité à la **classe**.',
          }],
          [{
            k: 'box', tone: 'info', title: '`public`',
            text: 'Accès depuis **toutes les classes** autorisées à voir la classe.',
          }],
          [{
            k: 'box', tone: 'attention', title: '`protected`',
            text: 'Accès dans le **même paquetage**, et accès **particulier** pour les sous-classes.',
          }],
          [{ k: 'ask', text: 'Quelle est la **particularité** de `protected` ?' }],
        ],
      },
    ],
    notes: {
      objectif: 'Rappeler private et public, puis poser la question de protected sans enseigner extends.',
      question: 'Quelle est la particularité de protected ?',
      reponse: 'Même paquetage, comme le défaut ; plus un accès lié aux sous-classes, vu au chapitre 3.',
      conseil: '« Découvrir » un modificateur à la fois. Ne pas détailler extends. Enchaîner sur le test dans un paquetage.',
      duree: 3,
    },
  },
  {
    kind: 'content', chapter: C, section: S, title: '`protected` et les **paquetages**',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Deux paquetages', blocks: [
            {
              k: 'cols', ratio: 0.7,
              left: [{
                k: 'tree', title: 'Projet',
                nodes: [
                  { name: 'banque/', depth: 0 },
                  { name: 'Compte.java', depth: 1 },
                  { name: 'Gestionnaire.java', depth: 1 },
                  { name: 'application/', depth: 0 },
                  { name: 'Main.java', depth: 1 },
                ],
              }],
              right: [{
                k: 'code', small: true, file: 'banque/Compte.java', highlight: [4], code: `
package banque;

public class Compte {
    protected double solde = 1000;
}`,
              }],
            },
            { k: 'p', text: '`solde` est **`protected`**. Qui peut le lire **directement** ?' },
          ],
        },
        {
          label: 'Tester l\'accès', blocks: [
            {
              k: 'pkgs', interactive: true,
              packages: [
                {
                  name: 'banque', classes: [
                    { name: 'Compte', lines: ['protected double solde = 1000;'] },
                    {
                      name: 'Gestionnaire',
                      lines: ['Compte c = new Compte();', 'System.out.println(c.solde);'],
                      verdict: { ok: true, text: '✓ même paquetage' },
                    },
                  ],
                },
                {
                  name: 'application', classes: [
                    {
                      name: 'Main',
                      lines: ['import banque.Compte;', 'System.out.println(c.solde);'],
                      verdict: { ok: false, text: '✗ autre paquetage' },
                    },
                  ],
                },
              ],
            },
            {
              k: 'box', tone: 'retenir',
              text: 'Dans le **même paquetage**, `protected` est accessible. Depuis un **autre paquetage**, une classe **ordinaire** ne peut pas y accéder **directement**.',
            },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Montrer que protected inclut le même paquetage, comme le défaut, et refuse une classe d’un autre paquetage.',
      question: 'Gestionnaire peut-il lire c.solde ? Main ?',
      reponse: 'Oui dans banque ; non dans application (error: solde has protected access in Compte).',
      conseil: 'Faire voter avant « Tester l’accès ». Réinitialiser pour rejouer. Ne pas parler d’héritage ici.',
      duree: 4,
    },
  },
  {
    kind: 'content', chapter: C, section: S, title: 'Et si une classe **héritait** d\'une autre ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'L\'idée', blocks: [
            {
              k: 'uml', width: 720, height: 300,
              caption: 'Flèche à triangle vide : **héritage** (idée, pas encore la syntaxe).',
              classes: [
                { id: 'a', name: 'Animal', x: 180, y: 0, w: 360, attrs: ['# age : int'] },
                { id: 'c', name: 'Chien', x: 180, y: 200, w: 360 },
              ],
              links: [{ from: 'c', to: 'a' }],
            },
            { k: 'p', text: 'Une **sous-classe** peut **réutiliser** certaines caractéristiques de sa **classe mère**.' },
            { k: 'p', text: 'Dans un **autre paquetage**, `protected` autorise **certains** accès aux **membres hérités**.' },
          ],
        },
        {
          label: 'Aperçu', blocks: [
            {
              k: 'cols', ratio: 1,
              left: [{
                k: 'code', small: true, file: 'animaux/Animal.java', highlight: [4], code: `
package animaux;

public class Animal {
    protected int age = 3;
}`,
              }],
              right: [{
                k: 'code', small: true, file: 'application/Chien.java', highlight: [3, 6], code: `
package application;
import animaux.Animal;

public class Chien extends Animal {
    public void afficher() {
        System.out.println(age); // OK
    }
}`,
              }],
            },
            { k: 'box', tone: 'info', text: 'Syntaxe **`extends`** : **chapitre 3**. Ici, `age` est le **membre hérité** (`this`) — **pas** un accès libre à tout `Animal`.' },
          ],
        },
      ],
    }],
    notes: {
      objectif: 'Introduire l’idée de sous-classe et le cas protected hors paquetage, sans leçon d’héritage.',
      question: 'Chien peut-il lire age ? N’importe quel code d’application peut-il lire animal.age ?',
      reponse: 'Chien : oui, sur le membre hérité. Une classe ordinaire d’application : non. a.age sur un Animal quelconque : non plus (précisé au ch. 3).',
      conseil: 'Insister sur « certains accès » et « membre hérité ». Ne pas ouvrir a.age ici.',
      duree: 4,
    },
  },
  {
    kind: 'content', chapter: C, section: S, title: 'Mini-défi : qui peut accéder à **`protected`** ?',
    blocks: [{
      k: 'steps', items: [
        {
          label: '1 · Même paquetage', blocks: [{
            k: 'quiz', verify: true,
            question: '`Compte` et `Gestionnaire` sont dans **`banque`**. `Gestionnaire` fait `c.solde` (`protected`).',
            codeFile: 'banque/Gestionnaire.java',
            code: 'Compte c = new Compte();\nSystem.out.println(c.solde);',
            options: ['Accès autorisé', 'Accès interdit'],
            correct: 0,
            explication: '`protected` inclut le **même paquetage** : `Gestionnaire` n\'a pas besoin d\'être une sous-classe.',
            detailTitle: 'Règle',
            detail: 'Même paquetage : `protected` se comporte comme le *défaut*.',
          }],
        },
        {
          label: '2 · Autre paquetage', blocks: [{
            k: 'quiz', verify: true,
            question: '`Main` est dans **`application`**, **sans** lien avec `Compte`. Il fait `c.solde`.',
            codeFile: 'application/Main.java',
            code: 'import banque.Compte;\nCompte c = new Compte();\nSystem.out.println(c.solde);',
            options: ['Accès autorisé', 'Accès interdit'],
            correct: 1,
            explication: '`Main` n\'est **ni** dans `banque`, **ni** une sous-classe : accès **interdit**.',
            error: 'error: solde has protected access in Compte',
            detailTitle: 'Règle',
            detail: 'Une classe **ordinaire** d\'un **autre paquetage** ne lit pas un membre `protected`.',
          }],
        },
        {
          label: '3 · Sous-classe', blocks: [{
            k: 'quiz', verify: true,
            question: '`Chien` **étend** `Animal` depuis **`application`**. Dans `afficher()`, il lit **`age`**.',
            codeFile: 'application/Chien.java',
            code: 'public class Chien extends Animal {\n    public void afficher() {\n        System.out.println(age);\n    }\n}',
            options: ['Accès autorisé', 'Accès interdit'],
            correct: 0,
            explication: 'C\'est le **membre hérité** (`this.age`). L\'accès passe par l\'**héritage**, pas par une référence `Animal` quelconque.',
            detailTitle: 'Limite',
            detail: '`Animal a = new Animal(); a.age` reste **interdit** hors paquetage. Précision au chapitre 3.',
          }],
        },
      ],
    }],
    notes: {
      objectif: 'Vérifier les trois cas : même paquetage, classe ordinaire hors paquetage, membre hérité.',
      question: 'Les trois votes : autorisé / interdit / autorisé.',
      reponse: '1 autorisé (même paquetage) ; 2 interdit ; 3 autorisé (membre hérité seulement).',
      conseil: 'Vote à main levée avant Vérifier. Ne pas dévoiler a.age avant le chapitre 3, seulement la limite.',
      duree: 5,
    },
  },
  {
    kind: 'content', chapter: C, section: S, title: 'Nous avons appris à **protéger** les données',
    blocks: [{
      k: 'steps', items: [
        {
          label: 'Ce que nous savons', blocks: [
            { k: 'ask', text: 'Nous avons appris à **protéger** les données d\'une classe.' },
            { k: 'p', text: '`private`, *défaut*, `protected`, `public` : choisir le niveau **le plus restrictif** qui suffit.' },
          ],
        },
        {
          label: 'La question', blocks: [
            { k: 'ask', text: 'Mais comment une classe peut-elle **réutiliser** le code d\'une **autre** ?' },
            { k: 'p', text: 'Un `Chien` **est un** `Animal`. Une `Voiture` **est un** `Véhicule`.' },
          ],
        },
        {
          label: 'Hiérarchie', blocks: [
            {
              k: 'uml', width: 1100, height: 300,
              caption: 'Une classe mère, **plusieurs** spécialisations.',
              classes: [
                { id: 'v', name: 'Véhicule', x: 370, y: 0, w: 360 },
                { id: 'vo', name: 'Voiture', x: 40, y: 200, w: 320 },
                { id: 'm', name: 'Moto', x: 740, y: 200, w: 320 },
              ],
              links: [{ from: 'vo', to: 'v' }, { from: 'm', to: 'v' }],
            },
          ],
        },
        {
          label: 'Chapitre 3', blocks: [{
            k: 'goto',
            chapter: 'ch3',
            kicker: 'Chapitre 3',
            heading: 'L\'**héritage** en Java',
            sub: 'Réutiliser, spécialiser et organiser les classes.',
            label: 'Découvrir l\'héritage',
          }],
        },
      ],
    }],
    notes: {
      objectif: 'Ouvrir le chapitre 3 : réutiliser le code d’une autre classe (is-a).',
      question: 'Comment une classe réutilise-t-elle le code d’une autre ?',
      reponse: 'Par l’héritage : une classe fille étend une classe mère.',
      conseil: 'Le bouton saute à la diapo d’ouverture du chapitre 3. → fait de même depuis la dernière étape.',
      transition: 'Chapitre 3 : héritage, extends, puis précision sur protected (this vs référence).',
      duree: 2,
    },
  },
]
