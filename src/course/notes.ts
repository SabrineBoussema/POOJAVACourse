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
    "objectif": "Organisation en espaces de noms ; import.",
    "question": "À quoi sert package ?",
    "reponse": "Structurer et éviter les collisions de noms.",
    "transition": "Projet pro / structure.",
    "conseil": "Convention reverse-domain.",
    "duree": 2
  },
  "ch2|Ranger une classe dans un paquetage": {
    "objectif": "Montrer une organisation réaliste de dossiers/sources.",
    "question": "Où placer les sources Java typiquement ?",
    "reponse": "src/main/java (Maven) ou src selon le projet pédagogique.",
    "transition": "private / encapsulation (hero).",
    "conseil": "Relier à ce que l’IDE attend.",
    "duree": 2
  },
  "ch2|L'encapsulation : cacher les données": {
    "objectif": "Cacher l’état + exposer un comportement sûr.",
    "question": "Encapsulation = seulement private ?",
    "reponse": "Non : private + méthodes publiques bien conçues.",
    "conseil": "Relier aux getters/setters avec validation.",
    "duree": 3
  },
  "ch2|Getters et setters": {
    "objectif": "Accès contrôlé ; validation dans setX.",
    "question": "Un setter doit-il toujours accepter toute valeur ?",
    "reponse": "Non : il peut refuser / corriger selon les règles métier.",
    "conseil": "Éviter les setters vides « pour la forme ».",
    "duree": 2
  },
  "ch2|Exemple : protéger un point polaire": {
    "objectif": "Protéger l’état ; contrôler les modifications.",
    "question": "Que risque un attribut public balance ?",
    "reponse": "Modification invalide (négatif, incohérent).",
    "conseil": "Reprendre BankAccount : balance public = danger.",
    "duree": 2
  },
  "ch2|Exemple : changer l'implémentation sans rien casser": {
    "objectif": "Maintenabilité, invariants, évolution sans casser les clients.",
    "question": "Si je change la représentation interne, que se passe-t-il pour le client ?",
    "reponse": "Rien si l’API publique reste stable.",
    "conseil": "Exemple avant/après.",
    "duree": 2
  },
  "ch2|Chapitre 2 — À retenir": {
    "objectif": "Checklist mentale : classe, objet, new, this, String, static, encapsulation.",
    "question": "Différence clé classe / objet ?",
    "reponse": "Modèle vs instance.",
    "conseil": "Quiz oral 5 questions rapides.",
    "duree": 3
  }
}
