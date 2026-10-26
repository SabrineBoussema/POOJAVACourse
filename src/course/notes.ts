import type { SlideNotes } from './types'

/**
 * Notes enseignant (touche N). Clé : `chapitre|titre sans mise en forme`.
 * Reprises à la main de public/notes/slides/*.md (ancienne présentation) ; les diapos absentes n'ont pas de notes.
 */
export const NOTES: Record<string, SlideNotes> = {
  "intro|POO en Java": {
    "objectif": "Accrocher le public et présenter le cadre du cours POO Java (Licence GLSI 2).",
    "question": "Que savez-vous déjà de la POO ou de Java ?",
    "reponse": "Réponses variées : certains ont vu du C, Python, notions de classe.",
    "duree": 2
  },
  "intro|Regardez autour de vous": {
    "objectif": "Ancrer : entité = état + comportement ; tout attend d’être modélisé.",
    "question": "Pour une Voiture : donnez 2 états et 2 comportements.",
    "reponse": "Ex. couleur/vitesse ; démarrer/freiner.",
    "duree": 3
  },
  "intro|Quiz 1 : abstraction": {
    "objectif": "Garder l’utile, jeter le reste ; une entité ≠ un seul modèle.",
    "question": "Avons-nous besoin de la couleur des yeux pour les notes ?",
    "reponse": "Non.",
    "duree": 4
  },
  "intro|Quiz 2 : classe ou objet ?": {
    "objectif": "Une classe → plusieurs objets ; plan vs instance.",
    "question": "Faut-il trois classes pour Sarra, Ahmed, Lina ?",
    "reponse": "Non.",
    "conseil": "Vote « trois classes ? » puis NON. Phrase : CLASSE = PLAN · OBJET = INSTANCE.",
    "duree": 3
  },
  "intro|Outils et IA : les règles du cours": {
    "objectif": "Clarifier les règles sans punition : expliquer = obligation.",
    "question": "Que devez-vous pouvoir faire avec chaque ligne utilisée ?",
    "reponse": "L’expliquer.",
    "conseil": "Présenter comme contrat moral du semestre. Ton positif.",
    "duree": 2
  },
  "ch1|Introduction au langage Java": {
    "objectif": "Ouvrir le chapitre technique : du source à l’exécution.",
    "question": "Qu’espérez-vous apprendre dans ce chapitre ?",
    "reponse": "Écrire / exécuter un programme, comprendre JDK/JVM…",
    "conseil": "Annoncer le plan : pourquoi Java, JVM, outils, premier programme, types.",
    "duree": 1
  },
  "ch1|Un peu d'histoire": {
    "objectif": "Situer Oak → Java, Sun → Oracle, évolution des versions.",
    "question": "Pourquoi Java a-t-il été créé ?",
    "reponse": "Portabilité, réseau, simplicité relative vs C++…",
    "transition": "L’ADN / principes du langage.",
    "conseil": "Rester léger : dates clés et intention du langage.",
    "duree": 2
  },
  "ch1|Caractéristiques de Java": {
    "objectif": "Ancrer les principes fondateurs (simplicité, robustesse, portabilité…).",
    "question": "Quel principe justifie le typage fort ?",
    "reponse": "Robustesse / détection précoce d’erreurs.",
    "conseil": "Relier chaque principe à une conséquence concrète pour l’étudiant.",
    "duree": 2
  },
  "ch1|Les trois éditions de Java": {
    "objectif": "Clarifier SE (ce cours), EE (entreprise), ME (embarqué/historique).",
    "question": "Quelle édition pour ce cours GLSI ?",
    "reponse": "Java SE.",
    "conseil": "Insister : on travaille en Java SE.",
    "duree": 2
  },
  "ch1|Que contient « Java » ?": {
    "objectif": "Distinguer JDK (développement), JRE (exécution), JVM (moteur).",
    "question": "Avez-vous besoin du JDK pour seulement exécuter ?",
    "reponse": "Historiquement JRE suffisait ; en pratique on installe le JDK.",
    "conseil": "Schéma : JDK ⊃ JRE ⊃ JVM. Aujourd’hui on installe surtout le JDK.",
    "duree": 3
  },
  "ch1|Le fichier Salem.java": {
    "objectif": "Lire public class, main, System.out — sans magie.",
    "question": "Pourquoi main est-il static ?",
    "reponse": "Appelé sans créer d’instance de la classe de démarrage.",
    "conseil": "Faire annoter oralement chaque mot-clé important.",
    "duree": 4
  },
  "ch1|Compiler puis exécuter": {
    "objectif": "Visualiser : .java → javac → .class → java (JVM).",
    "question": "Quel outil produit le fichier .class ?",
    "reponse": "Le compilateur javac.",
    "conseil": "Faire répéter le pipeline à voix haute.",
    "duree": 3
  },
  "ch1|Les identificateurs": {
    "objectif": "Règles de nommage : lettres, chiffres, _, $ ; pas de mot-clé ; camelCase.",
    "question": "1etudiant est-il un identifiant valide ?",
    "reponse": "Non : ne peut pas commencer par un chiffre.",
    "transition": "Commentaires.",
    "conseil": "Montrer des contre-exemples invalides.",
    "duree": 2
  },
  "ch1|Les commentaires": {
    "objectif": "//, /* */, /** */ — rôles (doc vs explication).",
    "question": "À quoi sert /** */ ?",
    "reponse": "Javadoc / documentation d’API.",
    "transition": "Types primitifs.",
    "conseil": "Rappeler : un bon code se commente avec parcimonie.",
    "duree": 2
  },
  "ch1|Les types primitifs": {
    "objectif": "byte short int long float double char boolean — familles.",
    "question": "Quelle différence entre int et Integer ?",
    "reponse": "int = primitif ; Integer = objet wrapper (plus tard).",
    "transition": "Casting.",
    "conseil": "Insister sur int/double/boolean pour débuter ; taille de int.",
    "duree": 3
  },
  "ch1|Le transtypage (cast)": {
    "objectif": "Conversion implicite (élargissement) vs explicite (rétrécissement).",
    "question": "Faut-il un cast pour int → long ?",
    "reponse": "Non (élargissement sûr). Oui pour long → int.",
    "conseil": "Montrer perte d’information possible (double → int).",
    "duree": 3
  },
  "ch1|Quiz : cast et conversion": {
    "objectif": "Faire prédire le résultat avant d’exécuter mentalement.",
    "question": "Que vaut (int) 3.9 ?",
    "reponse": "3 (troncature, pas arrondi).",
    "transition": "Récap chapitre 01.",
    "conseil": "Laisser voter, puis expliquer.",
    "duree": 2
  },
  "ch1|Chapitre 1 — À retenir": {
    "objectif": "Synthétiser pipeline, outils, premier programme, types.",
    "question": "Citez les 3 étapes source → exécution.",
    "reponse": ".java → javac → .class → JVM.",
    "transition": "Transition vers classes & objets.",
    "conseil": "Quiz oral rapide 3 questions.",
    "duree": 2
  },
  "ch2|Classes et objets en Java": {
    "objectif": "Ouvrir le cœur de la POO en Java.",
    "question": "Quelle différence intuitive entre classe et objet ?",
    "reponse": "Classe = modèle / plan ; objet = instance concrète.",
    "transition": "Piliers de la POO (aperçu).",
    "conseil": "Annoncer piliers, classe vs objet, constructeurs, this, String, static, encapsulation.",
    "duree": 1
  },
  "ch2|Pourquoi la POO ?": {
    "objectif": "Présenter encapsulation, héritage, polymorphisme, abstraction — sans tout détailler.",
    "question": "Quel pilier cache les détails internes ?",
    "reponse": "Encapsulation (et abstraction).",
    "conseil": "Dire clairement : ce chapitre approfondit surtout classe/objet/encapsulation.",
    "duree": 3
  },
  "ch2|Un objet = état + comportement": {
    "objectif": "Formaliser en Java : class Etudiant vs new Etudiant().",
    "question": "Combien d’objets une classe peut-elle créer ?",
    "reponse": "Autant que nécessaire (mémoire permettant).",
    "transition": "Anatomie d’une classe.",
    "conseil": "Utiliser analogie plan / maison ou moule / gâteau.",
    "duree": 3
  },
  "ch2|Structure d'une classe": {
    "objectif": "Champs, constructeurs, méthodes — repères visuels.",
    "question": "Où déclarer l’état d’un objet ?",
    "reponse": "Dans les attributs / champs de la classe.",
    "conseil": "Faire annoter un squelette au tableau.",
    "duree": 3
  },
  "ch2|Variable = valeur ou référence": {
    "objectif": "Variable référence vs objet en mémoire (heap).",
    "question": "Deux variables peuvent-elles pointer le même objet ?",
    "reponse": "Oui.",
    "transition": "Deux références.",
    "conseil": "Dessiner deux flèches possibles.",
    "duree": 3
  },
  "ch2|Déclarer puis créer": {
    "objectif": "Montrer aliasing : modifier via r1 visible via r2.",
    "question": "Si e2 = e1, combien d’objets ?",
    "reponse": "Un seul objet, deux références.",
    "conseil": "Préparer le piège du défi suivant.",
    "duree": 2
  },
  "ch2|Le constructeur": {
    "objectif": "Même nom que la classe, pas de type de retour.",
    "question": "Un constructeur a-t-il un type de retour void ?",
    "reponse": "Non : aucun type de retour, pas même void.",
    "transition": "Surcharge de constructeurs.",
    "conseil": "Montrer constructeur par défaut vs explicite.",
    "duree": 3
  },
  "ch2|Plusieurs constructeurs : this(...)": {
    "objectif": "Surcharge : signatures différentes pour différents cas.",
    "question": "Comment Java choisit le constructeur ?",
    "reponse": "Par le nombre et les types des arguments.",
    "transition": "this (hero).",
    "conseil": "Relier aux besoins métier (étudiant avec/sans moyenne initiale).",
    "duree": 2
  },
  "ch2|Le mot-clé this": {
    "objectif": "this = référence à l’objet courant.",
    "question": "Pourquoi écrire this.nom = nom ?",
    "reponse": "Pour distinguer le champ du paramètre homonyme.",
    "conseil": "Motiver le cas paramètre qui masque le champ (this.nom = nom).",
    "duree": 2
  },
  "ch2|Les tableaux sont des objets": {
    "objectif": "Tableau d’objets = tableau de références.",
    "question": "new Etudiant[3] crée-t-il 3 étudiants ?",
    "reponse": "Non : 3 cases null jusqu’à new Etudiant() dans chaque case.",
    "conseil": "Montrer new Etudiant[n] puis boucle d’initialisation.",
    "duree": 3
  },
  "ch2|La classe String": {
    "objectif": "String est une classe ; littéraux ; méthodes utiles.",
    "question": "String est-il un type primitif ?",
    "reponse": "Non : c’est une classe (référence).",
    "transition": "Immutabilité.",
    "conseil": "Préparer immutabilité et equals.",
    "duree": 3
  },
  "ch2|String est immuable : en mémoire": {
    "objectif": "Toute « modification » crée une nouvelle String.",
    "question": "s.toUpperCase() modifie-t-il s ?",
    "reponse": "Non : retourne une nouvelle chaîne ; s inchangé si non réaffecté.",
    "conseil": "Relier à la sécurité et au partage en mémoire.",
    "duree": 2
  },
  "ch2|Comparer deux chaînes : equals et pas ==": {
    "objectif": "== compare les références ; equals le contenu (pour String).",
    "question": "Quand utiliser == avec des String ?",
    "reponse": "Presque jamais pour le contenu ; préférer equals.",
    "conseil": "Montrer le piège classique des littéraux / new String.",
    "duree": 3
  },
  "ch2|StringBuilder : modifier sans recréer": {
    "objectif": "Construction efficace de chaînes mutables.",
    "question": "Pourquoi StringBuilder plutôt que + en boucle ?",
    "reponse": "Évite de créer plein d’objets String temporaires.",
    "transition": "Surcharge de méthodes.",
    "conseil": "Cas d’usage : boucles de concaténation.",
    "duree": 3
  },
  "ch2|La surcharge des méthodes": {
    "objectif": "Même nom, signatures différentes — résolution à la compilation.",
    "question": "Peut-on surcharger seulement en changeant le type de retour ?",
    "reponse": "Non.",
    "transition": "static (hero).",
    "conseil": "Ne pas confondre avec overriding (héritage, plus tard).",
    "duree": 2
  },
  "ch2|Les variables de classe : static": {
    "objectif": "Ancrer via visualisation / compteur partagé.",
    "question": "Un champ static est-il partagé entre objets ?",
    "reponse": "Oui.",
    "conseil": "Attention : trop de static = code procédural déguisé.",
    "duree": 3
  },
  "ch2|Les méthodes de classe : static": {
    "objectif": "Membre de classe vs membre d’instance.",
    "question": "Faut-il un objet pour appeler une méthode static ?",
    "reponse": "Non.",
    "conseil": "Exemple : compteur d’objets, Math.sqrt.",
    "duree": 2
  },
  "ch2|Le passage de paramètres : par valeur": {
    "objectif": "Passage par valeur des références (copie de la référence).",
    "question": "Modifier p.x dans une méthode affecte-t-il l’appelant ?",
    "reponse": "Oui si on mute l’objet ; non si on fait p = new ... dans la méthode.",
    "conseil": "Clarifier le mythe « Java passe les objets par référence ».",
    "duree": 3
  },
  "ch2|Les paquetages (package)": {
    "objectif": "Comprendre pourquoi les packages existent (organisation, conflits de noms, réutilisation, visibilité) avant la syntaxe.",
    "question": "Que se passe-t-il si deux développeurs créent chacun une classe Client ?",
    "reponse": "Sans package : conflit (même nom, même dossier). Avec packages : tn.banque.model.Client ≠ tn.boutique.model.Client, les deux coexistent.",
    "conseil": "Poser la question à l’étape 1, laisser répondre, puis → pour l’étape 2 (arborescences). Étape 3 : insister sur package = nom du langage, dossier = rangement physique.",
    "transition": "Comment déclarer concrètement le package d’une classe ?",
    "duree": 4
  },
  "ch2|Ranger une classe dans un paquetage": {
    "objectif": "Lire package, import et nom complètement qualifié sur un exemple à deux fichiers.",
    "question": "Mini-quiz (étape 3) : peut-on utiliser Compte dans Main sans import ?",
    "reponse": "C : pas sous son nom simple. Rétablir l’import ou écrire tn.banque.model.Compte c = new tn.banque.model.Compte();",
    "conseil": "Étape 1 : lire les étiquettes dans l’ordre (package, classe, import, objet). Étape 2 : import ne crée rien, ne copie rien ; java.lang implicite ; sous-package = autre package. Étape 4 : variantes d’import (diapo d’origine).",
    "transition": "Les packages servent aussi à contrôler l’accès : place à l’encapsulation.",
    "duree": 5
  },
  "ch2|L'encapsulation : cacher les données": {
    "objectif": "Encapsuler = protéger les invariants métier, pas seulement « mettre private ».",
    "question": "Pourquoi est-ce problématique de laisser toutes les classes modifier directement le solde ?",
    "reponse": "N’importe quel code peut mettre le compte dans un état invalide (solde = -5000) ; aucune règle n’est vérifiée et l’erreur est difficile à localiser.",
    "conseil": "Étape 1 : faire remarquer que le code COMPILE. Étape 2 : suivre retirer(5000) → false. Étape 3 : définir « invariant ».",
    "transition": "Vérifions : que dit le compilateur face à un attribut private ?",
    "duree": 4
  },
  "ch2|Quiz : attribut private": {
    "objectif": "Distinguer erreur de compilation et erreur à l’exécution.",
    "question": "On compile puis on exécute Test : que se passe-t-il ?",
    "reponse": "C — Erreur de compilation : note has private access in Etudiant (ligne 8). Le programme ne démarre jamais.",
    "conseil": "Vote à main levée A/B/C/D, puis cliquer la réponse majoritaire et « Vérifier » (ou touche S). « Réinitialiser » pour un autre groupe.",
    "duree": 3
  },
  "ch2|Getters et setters": {
    "objectif": "Getter = consulter, setter = demander une modification (qui peut être refusée) ; rôle de this.",
    "question": "Faut-il un setter pour chaque attribut ?",
    "reponse": "Non. Lecture seule si l’état ne doit pas changer ; méthode métier (deposer, retirer) plutôt que setSolde.",
    "conseil": "Étape 1 : this.age (attribut) vs age (paramètre). Étape 3 : comparer setSolde(-5000) accepté et deposer(-10) refusé.",
    "transition": "Qui a le droit d’appeler ces méthodes ? Les niveaux de visibilité.",
    "duree": 4
  },
  "ch2|Les niveaux de visibilité": {
    "objectif": "Maîtriser public / protected / défaut / private, et la nuance de protected hors package.",
    "question": "Une sous-classe d’un autre package peut-elle lire autre.solde (protected) via une référence Compte ?",
    "reponse": "Non : solde has protected access in Compte. Elle n’y accède que via l’héritage (this.solde).",
    "conseil": "Étape 2 : faire prédire « compile / ne compile pas » avant chaque clic. Combinaisons utiles : private + même package, défaut + sous-classe, protected + sous-classe (this puis réf. Compte).",
    "duree": 5
  },
  "ch2|La visibilité d'une classe": {
    "objectif": "Séparer visibilité de la classe et visibilité des membres.",
    "question": "ClientInterne a un attribut public code : Main (autre package) peut-il le lire ?",
    "reponse": "Non : la classe ClientInterne n’est pas public, donc rien de ce qu’elle contient n’est accessible hors de tn.banque.model.",
    "conseil": "Erreur javac réelle : ClientInterne is not public in tn.banque.model; cannot be accessed from outside package.",
    "duree": 3
  },
  "ch2|Exemple : protéger un point polaire": {
    "objectif": "Construire pas à pas une classe qui garantit son invariant (rho ≥ 0).",
    "question": "Que risque-t-on si rho est accessible directement ?",
    "reponse": "Un rayon négatif : donnée aberrante. Avec private + setRho, impossible.",
    "conseil": "Une flèche → par élément du code : attributs, constructeur, getters, setRho, invariant.",
    "transition": "Puisque personne ne voit rho et theta… peut-on changer la représentation ?",
    "duree": 4
  },
  "ch2|Exemple : changer l'implémentation sans rien casser": {
    "objectif": "Montrer qu’une API stable permet de changer la représentation interne, en respectant le contrat.",
    "question": "Si je stocke x et y au lieu de rho et theta, le code client change-t-il ?",
    "reponse": "Non, le client reste identique (même sortie ici). Mais attention : arrondis, angle normalisé, angle perdu si rho = 0.",
    "conseil": "Autre exemple possible (ancienne version de la diapo) : Segment stocké avec deux attributs Point p1, p2 puis avec un tableau Point[2], setFstPoint inchangé.",
    "duree": 4
  },
  "ch2|Chapitre 2 — À retenir": {
    "objectif": "Réviser packages, import, encapsulation, getters/setters et visibilité.",
    "question": "Les 4 questions de la diapo (Q1 à Q4).",
    "reponse": "Corrections au clic sur chaque question ou toutes avec S.",
    "conseil": "Poser chaque question à l’oral avant d’afficher la correction. Rappel du reste du chapitre : classe/objet, références, constructeurs, String, static, passage par valeur.",
    "transition": "Chapitre 3 : l’héritage (extends), où protected prend tout son sens.",
    "duree": 4
  },
  "ch3|Le problème : adapter une classe existante": {
    "objectif": "Motiver l’héritage par un besoin concret (Point → point coloré) avant toute syntaxe.",
    "question": "Copier-coller : on corrige un bug dans Point. Et la copie dans PointColore ?",
    "reponse": "Elle garde le bug : il faut corriger deux fois (et on oublie souvent). Avec l’héritage, la correction profite à la fille.",
    "transition": "Vocabulaire : classe mère, classe fille.",
    "duree": 2
  },
  "ch3|Classe mère, classe fille": {
    "objectif": "Ce que contient une fille ; nuance private / constructeurs ; un objet fille = partie mère + partie fille.",
    "question": "La fille peut-elle lire directement un attribut private de la mère ?",
    "reponse": "Non : l’attribut existe dans l’objet, mais seul le code de la mère y accède (méthodes, super(...)).",
    "conseil": "Étape 2 : lire le diagramme UML (flèche vers la mère), puis le schéma mémoire : UN seul objet.",
    "transition": "La syntaxe Java : extends.",
    "duree": 3
  },
  "ch3|L'héritage en Java : extends": {
    "objectif": "extends, héritage simple, relation est-un, Object racine.",
    "question": "D hérite-t-il de A ?",
    "reponse": "Oui, indirectement (D → B → A → Object) : un D est un A.",
    "duree": 2
  },
  "ch3|Appeler le constructeur de la mère : super(...)": {
    "objectif": "Comprendre POURQUOI super(...) : la fille ne peut pas initialiser les attributs private de la mère.",
    "question": "Étape 3 : compléter les deux constructeurs de Cercle.",
    "reponse": "super(\"cercle\") puis this(1.0).",
    "conseil": "Étape 2 : le code fautif a aussi une 2e erreur (super() implicite, Point n’a pas de constructeur sans paramètre) : c’est la diapo suivante. Nuance hors programme : Java 25 autorise des instructions avant super(...) si elles n’utilisent pas this ; garder la règle « 1re ligne ».",
    "transition": "Et si on n’écrit pas super(...) ?",
    "duree": 4
  },
  "ch3|Le super() implicite": {
    "objectif": "super() implicite et l’erreur classique quand la mère n’a pas de constructeur sans paramètre.",
    "question": "Comment corriger B ?",
    "reponse": "B() { super(0); } ou ajouter A() dans A.",
    "duree": 3
  },
  "ch3|Exemple : la méthode equals": {
    "objectif": "Redéfinition vs surcharge sur un cas réel ; le choix de surcharge se fait sur le type statique.",
    "question": "Étape 2 : p.equals(o) avec o de type Object, dans chaque version ?",
    "reponse": "Version 1 (surcharge) : false. Version 2 (redéfinition) : true.",
    "conseil": "Faire voter avant d’afficher. Relier à la diapo « Polymorphisme statique ou dynamique ? ».",
    "duree": 4
  },
  "ch3|Redéfinir toString() et utiliser @Override": {
    "objectif": "toString et l’intérêt concret de @Override.",
    "question": "Étape 2 : le code avec tostring compile-t-il ?",
    "reponse": "Non, grâce à @Override. Sans l’annotation : il compile, et le bug est silencieux.",
    "duree": 3
  },
  "ch3|Le mot-clé super": {
    "objectif": "super.m() appelle la version de la mère, un seul niveau.",
    "question": "Étape 2 : que vaut new C().m(3) ?",
    "reponse": "507 = 1 + (500 + 3 × 2).",
    "duree": 3
  },
  "ch3|L'opérateur instanceof": {
    "objectif": "instanceof teste l’objet réel et ses ancêtres ; null → false.",
    "question": "Étape 2 : les 4 affirmations Vrai / Faux.",
    "reponse": "Vrai, Vrai, Faux, Faux.",
    "duree": 3
  },
  "ch3|Type statique et type dynamique": {
    "objectif": "Distinguer type de la variable et classe de l’objet ; un appel est vérifié puis exécuté.",
    "question": "Pourquoi f.getRayon() est refusé alors que l’objet est un Cercle ?",
    "reponse": "Le compilateur ne connaît que le type statique Figure, qui ne déclare pas getRayon().",
    "conseil": "Étape 2 : montrer la flèche du schéma, puis lire le flux compilation → exécution.",
    "duree": 4
  },
  "ch3|Polymorphisme statique ou dynamique ?": {
    "objectif": "Surcharge = choix à la compilation (type statique des arguments) ; redéfinition = choix à l’exécution.",
    "question": "Étape 2 : qu’affiche le programme ?",
    "reponse": "« surcharge Figure » puis « Cercle ».",
    "conseil": "Piège classique : beaucoup répondent « surcharge Cercle ».",
    "duree": 4
  },
  "ch3|Le mot-clé final": {
    "objectif": "final sur classe, méthode, variable ; pour un objet, final fige la référence.",
    "question": "Étape 2 : quelles lignes compilent ?",
    "reponse": "p.x = 5 compile ; p = new Point(0, 0) est refusé.",
    "duree": 3
  },
  "ch3|Les classes abstraites": {
    "objectif": "Classe non instanciable, méthodes sans corps imposées aux filles ; lecture UML.",
    "conseil": "Étape 2 : montrer l’italique et {abstract} dans le diagramme.",
    "transition": "Ce qui est permis et interdit.",
    "duree": 3
  },
  "ch3|Implémenter une interface : implements": {
    "objectif": "implements, plusieurs interfaces, interface = type.",
    "question": "Étape 2 : compléter la classe Bois.",
    "reponse": "implements, puis public (obligatoire : on ne réduit pas la visibilité).",
    "duree": 3
  },
  "ch3|Chapitre 3 — À retenir": {
    "objectif": "Réviser : notions, couples à ne pas confondre, erreurs fréquentes, exemple récapitulatif, questions.",
    "question": "Les 4 questions de l’étape 5.",
    "reponse": "Corrections au clic ou avec S.",
    "conseil": "Étape 4 : faire repérer interface, classe abstraite, super(...), @Override et polymorphisme dans l’exemple.",
    "transition": "Chapitre 4 : les exceptions (ClassCastException en est une).",
    "duree": 6
  }
}
