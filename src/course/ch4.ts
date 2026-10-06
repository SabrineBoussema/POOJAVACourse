import type { Slide } from './types'

/* ════════════════════════════════════════════════════════════════════
   CHAPITRE 4 — Les exceptions
   (contenu ajouté : il ne vient pas des PDF de départ ; à relire)
   ════════════════════════════════════════════════════════════════════ */
const C = 'ch4'

export const CH4: Slide[] = [
  {
    kind: 'chapter', chapter: C, number: '4', title: 'Les exceptions',
    goals: [
      '**Pourquoi** des exceptions ?',
      'Lire un **message d\'erreur**',
      '`try`, `catch`, `finally`',
      'La **hiérarchie** des exceptions',
      'Exceptions **vérifiées** ou non',
      '`throw` et `throws`',
      'Créer **sa propre** exception',
      '**Bonnes pratiques**',
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Pourquoi les exceptions ?', title: 'Quand le programme **plante**',
    blocks: [
      {
        k: 'code', small: true, code: `
int a = 10;
int b = 0;
System.out.println(a / b);
System.out.println("suite");`, output: 'Exception in thread "main" java.lang.ArithmeticException: / by zero',
      },
      {
        k: 'list', items: [
          'Une **erreur à l\'exécution** arrête le programme : la ligne `"suite"` n\'est **jamais** atteinte.',
          'Java signale l\'erreur avec une **exception** : un **objet** qui décrit ce qui s\'est passé.',
          'On peut **intercepter** l\'exception et **continuer** : c\'est le sujet de ce chapitre.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Pourquoi les exceptions ?', title: 'Lire un **message d\'erreur**',
    blocks: [
      {
        k: 'cols', ratio: 1,
        left: [{
          k: 'code', small: true, file: 'Test.java', highlight: [4], code: `
public class Test {
    public static void main(String[] args) {
        int[] t = new int[3];
        t[5] = 1;
    }
}`,
        }],
        right: [{
          k: 'code', small: true, file: 'Terminal', code: 'java Test',
          output: 'Exception in thread "main"\njava.lang.ArrayIndexOutOfBoundsException:\nIndex 5 out of bounds for length 3\n    at Test.main(Test.java:4)',
        }],
      },
      {
        k: 'list', items: [
          '**Le type** de l\'exception : `ArrayIndexOutOfBoundsException`.',
          '**Le message** : l\'indice `5` est hors d\'un tableau de longueur `3`.',
          '**Où** : la méthode `main`, **ligne 4** de `Test.java`.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '1. Pourquoi les exceptions ?', title: 'Les exceptions **courantes**',
    blocks: [
      {
        k: 'table', small: true,
        head: ['Exception', 'Cause typique'],
        rows: [
          ['`ArithmeticException`', 'division **entière** par zéro'],
          ['`ArrayIndexOutOfBoundsException`', 'indice **hors** d\'un tableau'],
          ['`IndexOutOfBoundsException`', 'position **hors** d\'une `ArrayList`'],
          ['`NullPointerException`', 'appel d\'une méthode sur une référence **`null`**'],
          ['`ClassCastException`', '**downcast** invalide'],
          ['`NumberFormatException`', '`Integer.parseInt("abc")`'],
          ['`InputMismatchException`', '`Scanner.nextInt()` sur un texte'],
        ],
      },
      { k: 'box', tone: 'info', text: 'Pour des `double`, `10.0 / 0` ne lève **pas** d\'exception : le résultat est **`Infinity`**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Intercepter', title: '`try` et `catch`',
    blocks: [
      {
        k: 'cols', ratio: 1.3,
        left: [{
          k: 'code', code: `
try {
    int r = 10 / 0;
    System.out.println("jamais affiché");
} catch (ArithmeticException e) {
    System.out.println("Division par zéro !");
}
System.out.println("suite du programme");`, output: 'Division par zéro !\nsuite du programme',
        }],
        right: [{
          k: 'list', items: [
            '**`try`** : le code **à risque**.',
            '**`catch`** : le code exécuté **si** l\'exception correspond.',
            'Dès l\'exception, le reste du `try` est **abandonné**.',
            'Le programme **continue** après le `catch`.',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Intercepter', title: '**Plusieurs** `catch`',
    blocks: [
      {
        k: 'code', code: `
try {
    // ...
} catch (ArithmeticException e) {
    // division par zéro
} catch (ArrayIndexOutOfBoundsException | NullPointerException e) {
    // l'un ou l'autre
} catch (Exception e) {
    // toutes les autres
}`,
      },
      {
        k: 'list', items: [
          'Java choisit le **premier** `catch` qui convient.',
          '`A | B` : **un seul** bloc pour **deux** types.',
        ],
      },
      { k: 'box', tone: 'attention', text: 'Du plus **précis** au plus **général** : `catch (Exception e)` **en premier** est une **erreur de compilation**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Intercepter', title: 'Le bloc `finally`',
    blocks: [
      {
        k: 'cols', ratio: 1.2,
        left: [{
          k: 'code', code: `
try {
    System.out.println("essai");
} catch (Exception e) {
    System.out.println("erreur");
} finally {
    System.out.println("toujours exécuté");
}`, output: 'essai\ntoujours exécuté',
        }],
        right: [{
          k: 'list', items: [
            '`finally` s\'exécute **dans tous les cas** : avec ou sans exception, même avec un `return`.',
            'On y **libère** les ressources (fichier, connexion…).',
          ],
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '2. Intercepter', title: 'Quiz : l\'**ordre** d\'exécution',
    blocks: [{
      k: 'quiz', question: 'Que s\'affiche (une lettre par ligne) ?',
      code: `
try {
    System.out.println("A");
    int x = 5 / 0;
    System.out.println("B");
} catch (ArithmeticException e) {
    System.out.println("C");
} finally {
    System.out.println("D");
}
System.out.println("E");`,
      options: ['`A C D E`', '`A B C D E`', '`A C E`', '`A D`'],
      correct: 0,
      explication: '`A`, puis l\'exception **interrompt** le `try` (pas de `B`) ; `catch` affiche `C` ; `finally` affiche `D` ; le programme **continue** avec `E`.',
    }],
  },
  {
    kind: 'content', chapter: C, section: '3. La hiérarchie', title: 'La **hiérarchie** des exceptions',
    blocks: [
      {
        k: 'flow', steps: [
          { label: '`Throwable`', sub: 'la racine' },
          { label: '`Exception`', sub: 'les cas qu\'on **traite**' },
          { label: '`RuntimeException`', sub: 'les erreurs de **programmation**' },
        ],
      },
      {
        k: 'table', small: true,
        head: ['Classe', 'Exemples'],
        rows: [
          ['`Error` (fille de `Throwable`)', '`OutOfMemoryError`, `StackOverflowError` : **graves**, on ne les traite pas'],
          ['`RuntimeException`', '`ArithmeticException`, `NullPointerException`, `ClassCastException`…'],
          ['autres `Exception`', '`IOException`, `FileNotFoundException`…'],
        ],
      },
      { k: 'box', tone: 'retenir', text: '`catch (Exception e)` attrape **toutes** les `Exception`, mais **pas** les `Error`.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '3. La hiérarchie', title: 'Exceptions **vérifiées** ou **non** ?',
    blocks: [
      {
        k: 'table',
        head: ['', '**Vérifiées** (*checked*)', '**Non vérifiées** (*unchecked*)'],
        rows: [
          ['**Classes**', '`Exception` et ses filles, **sauf** `RuntimeException`', '`RuntimeException`, `Error` et leurs filles'],
          ['**Compilateur**', '**oblige** à `catch` **ou** à déclarer `throws`', 'n\'oblige **à rien**'],
          ['**Exemples**', '`IOException`', '`ArithmeticException`'],
        ],
      },
      { k: 'box', tone: 'retenir', text: 'Une exception **vérifiée** vient d\'un événement **extérieur** (fichier absent…) ; une **non vérifiée**, d\'une **faute du programmeur**.' },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Lancer', title: '`throw` : **lancer** une exception',
    blocks: [
      {
        k: 'code', code: `
void setRho(double rho) {
    if (rho < 0) {
        throw new IllegalArgumentException("rho négatif");
    }
    this.rho = rho;
}`,
      },
      {
        k: 'list', items: [
          '**`throw`** + un objet exception : on **signale** soi-même un problème.',
          'On retrouve le **setter** protégé du chapitre 2 : au lieu de **refuser en silence**, il **signale** l\'erreur.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Lancer', title: '`throws` : **déclarer** une exception',
    blocks: [
      {
        k: 'code', code: `
static void lire() throws IOException {
    throw new IOException("fichier illisible");
}

public static void main(String[] args) {
    lire();      // ERREUR : unreported exception IOException
}`,
      },
      {
        k: 'list', items: [
          '`throws` dans la **signature** : la méthode **peut** lancer cette exception.',
          'L\'appelant doit **l\'attraper** (`try` / `catch`) **ou** la **déclarer** à son tour.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Lancer', title: '`throw` ou `throws` ?',
    blocks: [
      {
        k: 'table',
        head: ['', '`throw`', '`throws`'],
        rows: [
          ['**Rôle**', '**lance** une exception', '**déclare** qu\'une méthode peut en lancer'],
          ['**Où ?**', 'dans le **corps** de la méthode', 'dans la **signature**'],
          ['**Suivi de**', 'un **objet** : `new IOException()`', 'un **type** : `IOException`'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '4. Lancer', title: 'Quiz : **déclarer** ou **attraper**',
    blocks: [{
      k: 'quiz', question: 'Que se passe-t-il à la compilation de `main` ?',
      code: `
static void lire() throws IOException { }

public static void main(String[] args) {
    lire();
}`,
      options: ['Ça compile', '**Erreur** : `IOException` n\'est ni attrapée ni déclarée', 'Ça compile, mais **erreur à l\'exécution**', '**Erreur** : `lire()` ne peut pas avoir de `throws`'],
      correct: 1,
      explication: '`IOException` est **vérifiée** : `main` doit l\'**attraper** (`try` / `catch`) ou la **déclarer** (`throws IOException`).',
    }],
  },
  {
    kind: 'content', chapter: C, section: '5. Ses propres exceptions', title: 'Créer **sa propre** exception',
    blocks: [
      {
        k: 'code', code: `
class SoldeInsuffisantException extends Exception {
    SoldeInsuffisantException(String message) {
        super(message);
    }
}`,
      },
      {
        k: 'list', items: [
          'On **hérite** de `Exception` (le chapitre 3 sert ici !).',
          '`extends Exception` : exception **vérifiée** ; `extends RuntimeException` : **non vérifiée**.',
          '`super(message)` : le message sera lisible avec `getMessage()`.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Ses propres exceptions', title: 'Exemple : un **compte** bancaire',
    blocks: [
      {
        k: 'cols', ratio: 1.15,
        left: [{
          k: 'code', small: true, code: `
class Compte {
    private double solde;

    Compte(double solde) {
        this.solde = solde;
    }

    void retirer(double m)
            throws SoldeInsuffisantException {
        if (m > solde) {
            throw new SoldeInsuffisantException(
                "solde insuffisant");
        }
        solde -= m;
    }
}`,
        }],
        right: [{
          k: 'code', small: true, code: `
Compte c = new Compte(100);
try {
    c.retirer(150);
    System.out.println("retrait OK");
} catch (SoldeInsuffisantException e) {
    System.out.println(e.getMessage());
}`, output: 'solde insuffisant',
        }],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Ses propres exceptions', title: 'Les méthodes de **`Exception`**',
    blocks: [
      {
        k: 'table',
        head: ['Méthode', 'Effet'],
        rows: [
          ['`getMessage()`', 'renvoie le **message** (texte) de l\'exception'],
          ['`printStackTrace()`', 'affiche le **chemin** de l\'erreur (comme le message de plantage)'],
          ['`toString()`', 'nom de la classe + message'],
        ],
      },
      {
        k: 'code', small: true, code: `
catch (SoldeInsuffisantException e) {
    System.out.println(e.getMessage());   // solde insuffisant
    System.out.println(e);                // SoldeInsuffisantException: solde insuffisant
}`,
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '5. Ses propres exceptions', title: '`try` avec **ressources**',
    blocks: [
      {
        k: 'code', code: `
try (Scanner sc = new Scanner(System.in)) {
    int n = sc.nextInt();
    System.out.println(n * 2);
}   // sc est fermé AUTOMATIQUEMENT, même en cas d'exception`,
      },
      {
        k: 'list', items: [
          'Une **ressource** (fichier, flux, `Scanner`) doit être **fermée** après usage.',
          'Avec `try (…)`, Java la **ferme pour vous** : plus besoin de `finally`.',
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Bonnes pratiques', title: 'Les **bonnes pratiques**',
    blocks: [
      {
        k: 'table',
        head: ['À faire', 'À éviter'],
        rows: [
          ['attraper l\'exception la **plus précise**', '`catch (Exception e)` **partout**'],
          ['un **message clair** : `"solde insuffisant"`', 'un message vide ou **inutile**'],
          ['**traiter** l\'erreur, ou la **relancer**', 'un `catch` **vide** qui cache l\'erreur'],
          ['**vérifier** avant (`if`) quand c\'est simple', 'utiliser les exceptions pour le **déroulement normal**'],
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, section: '6. Bonnes pratiques', title: 'Quiz : l\'**ordre** des `catch`',
    blocks: [{
      k: 'quiz', question: 'Que se passe-t-il à la compilation ?',
      code: `
try {
    int r = 10 / 0;
} catch (Exception e) {
    System.out.println("général");
} catch (ArithmeticException e) {
    System.out.println("division");
}`,
      options: ['Ça compile et affiche `général`', 'Ça compile et affiche `division`', '**Erreur de compilation**', 'Ça compile, mais **erreur à l\'exécution**'],
      correct: 2,
      explication: '`ArithmeticException` est une **fille** de `Exception` : le premier `catch` attrape **déjà tout**, le second est **inatteignable**. Du **plus précis** au **plus général** !',
    }],
  },
  {
    kind: 'content', chapter: C, section: '6. Bonnes pratiques', title: 'Exercice : **saisie** sécurisée',
    blocks: [
      {
        k: 'exercise', prompt: 'Lire un **entier positif** au clavier. Tant que l\'utilisateur tape autre chose, **redemander**.',
        solution: [
          {
            k: 'code', small: true, code: `
Scanner clavier = new Scanner(System.in);
int age = -1;
while (age < 0) {
    try {
        System.out.print("Âge : ");
        age = Integer.parseInt(clavier.nextLine());
    } catch (NumberFormatException e) {
        System.out.println("Entrez un nombre entier");
    }
}`,
          },
          { k: 'p', text: '`parseInt` lance **`NumberFormatException`** si le texte n\'est pas un entier ; la boucle **recommence**.' },
        ],
      },
    ],
  },
  {
    kind: 'content', chapter: C, title: 'Chapitre 4 — À retenir',
    blocks: [
      {
        k: 'list', items: [
          'Une **exception** est un **objet** qui signale une erreur **à l\'exécution**.',
          '`try { … } catch (Type e) { … }` : on **intercepte** ; `finally` s\'exécute **toujours**.',
          'Les `catch` : du **plus précis** au **plus général**.',
          '**Vérifiée** (`IOException`) : `catch` ou `throws` **obligatoire** ; **non vérifiée** (`RuntimeException`) : non.',
          '`throw new …` **lance** ; `throws …` **déclare**.',
          'Sa propre exception : `class MonErreur extends Exception`.',
        ],
      },
    ],
  },
]
