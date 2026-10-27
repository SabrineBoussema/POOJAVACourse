/**
 * Format des diapositives.
 *
 * Dans tous les textes :
 *   **mot**   → affiché en gras (couleur d'accent)
 *   `code`    → affiché en police code
 */

export type Bullet = string | { text: string; sub: string[] }

export type Block =
  /** Paragraphe simple */
  | { k: 'p'; text: string }
  /** Liste à puces (une puce peut avoir des sous-puces) */
  | { k: 'list'; items: Bullet[]; numbered?: boolean }
  /** Bloc de code Java (+ sortie console facultative).
   *  `highlight` : numéros de lignes à surligner (1 = première ligne du code affiché).
   *  `bad` : lignes en erreur (rouge) ; `status` : badge « Compile » / « Ne compile pas » ;
   *  `notes` : étiquette en bout de ligne ; `hidden` : lignes masquées (place conservée). */
  | {
      k: 'code'; code: string; file?: string; output?: string; small?: boolean; plain?: boolean; highlight?: number[]
      bad?: number[]; status?: 'ok' | 'ko'; notes?: Record<number, string>; hidden?: number[]
    }
  /** Tableau (`marks` : colore les cellules Oui / Non) */
  | { k: 'table'; head: string[]; rows: string[][]; small?: boolean; marks?: boolean }
  /** Encadré : à retenir / attention / info / question */
  | { k: 'box'; tone: 'retenir' | 'attention' | 'info' | 'question'; title?: string; text: string }
  /** Panneaux progressifs : un seul visible ; la touche → passe au suivant avant de changer de diapo. Un seul par diapo. */
  | { k: 'steps'; items: { label: string; blocks: Block[] }[] }
  /** Arborescence de fichiers. Un nom terminé par `/` est un dossier ; `bad` = conflit (rouge). */
  | { k: 'tree'; title?: string; tone?: 'ok' | 'ko'; nodes: { name: string; depth: number; note?: string; bad?: boolean }[] }
  /** Schéma d'un point en coordonnées polaires (`cartesian` : ajoute les projections x, y). */
  | { k: 'polar'; cartesian?: boolean }
  /** Cartes de synthèse numérotées */
  | { k: 'cards'; items: { title: string; text: string }[] }
  /** Questions de vérification : la correction s'affiche au clic ou avec la touche S. */
  | { k: 'qa'; items: { q: string; a: string }[] }
  /** Question orale : contenu visible, réponse révélée par bouton ou touche S (prédiction, compile ?, comparaison). */
  | { k: 'reveal'; tag: string; prompt: string; blocks?: Block[]; answer: Block[] }
  /** Compléter le code : chaque `[[mot]]` est masqué jusqu'à la correction. */
  | { k: 'fill'; prompt: string; code: string; file?: string; small?: boolean; explication: string }
  /** Diagramme de classes UML (coordonnées en px). Flèche de l'enfant vers le parent. */
  | {
      k: 'uml'; width: number; height: number; caption?: string
      classes: UmlClass[]
      links: { from: string; to: string; kind?: 'extends' | 'implements' }[]
    }
  /** Grande question posée à l'amphi */
  | { k: 'ask'; text: string }
  /** Scène « compte bancaire » : un état par étape (pas d'animation, l'enseignante avance). */
  | { k: 'scene'; state: 'compte' | 'app' | 'direct' | 'risque' | 'private' }
  /** Objet encapsulé : zone privée, interface publique, chemins cliquables depuis des classes extérieures. */
  | {
      k: 'encap'; object: string; inner: string; methods: string[]
      paths: { from: string; label: string; ok: boolean; text: string; port?: string }[]
    }
  /** Révélation un par un (bouton ou S = tout). `cols` : éléments côte à côte. */
  | { k: 'progressive'; button: string; cols?: number; items: Block[][] }
  /** Packages comme frontières : cadres de packages contenant des classes, avec verdict d'accès. */
  | {
      k: 'pkgs'
      packages: { name: string; classes: { name: string; lines?: string[]; verdict?: { ok: boolean; text: string } }[] }[]
    }
  /** Matrice de visibilité : clic sur un modificateur → colonne surlignée, exemple, restriction. */
  | {
      k: 'vismatrix'
      mods: { label: string; code: string; note: string }[]
      rows: { label: string; cells: string[] }[]
    }
  /** Explorateur de visibilité : modificateur × contexte → code + verdict du compilateur.
   *  `{MOD}` dans le code est remplacé par le mot-clé choisi ; `results[contexte][modificateur]`. */
  | {
      k: 'access'; declFile: string; decl: string
      mods: { label: string; kw: string }[]
      contexts: { label: string; file: string; code: string; line: number; same?: boolean }[]
      results: { ok: boolean; text: string; error?: string }[][]
    }
  /** Deux colonnes (ratio = largeur relative de la colonne de gauche, 1 = moitié) */
  | { k: 'cols'; left: Block[]; right: Block[]; ratio?: number }
  /** Chaîne d'étapes : A → B → C */
  | { k: 'flow'; steps: { label: string; sub?: string }[] }
  /** Schéma mémoire statique : pile (gauche), tas (droite), flèches de référence.
   *  Les objets du tas sont réordonnés selon la première variable qui les référence. */
  | { k: 'memory'; stack: MemVar[]; heap: MemObj[]; title?: string; caption?: string; compact?: boolean }
  /** Quiz : options cliquables ; la bonne réponse et l'explication s'affichent au clic ou avec la touche S. */
  | { k: 'quiz'; question: string; code?: string; options: string[]; correct: number; explication: string
      /** Mode « prédiction » : on choisit, puis « Vérifier » ; boutons Correction / Réinitialiser. */
      verify?: boolean; detail?: string; detailTitle?: string; codeFile?: string; error?: string; errorLine?: number }
  /** Exercice : la solution s'affiche au clic (ou touche S) */
  | { k: 'exercise'; prompt: string; code?: string; solution: Block[]; side?: boolean }

/** Classe UML : `kind` abstract → nom en italique ; interface → « interface ». `w` = largeur (défaut 300). */
export type UmlClass = {
  id: string; name: string; x: number; y: number; w?: number
  kind?: 'abstract' | 'interface'; attrs?: string[]; ops?: string[]
}

/** Variable de la pile. `ref` = id d'un objet du tas (flèche) ; `value` = valeur primitive ; `frame` = cadre d'appel (ex. 'm(...)'). */
export type MemVar = { name: string; ref?: string; value?: string; frame?: string }
/** Objet du tas. `fields` = [nom, valeur] ; `changed` = champs modifiés (orange) ; `dead` = plus référencé ; `cls` = classe (variables static). */
export type MemObj = {
  id: string; type: string; addr?: string; fields: [string, string][]
  changed?: string[]; dead?: boolean; cls?: boolean; note?: string
}

/** Notes enseignant : visibles seulement dans le panneau N. */
export type SlideNotes = {
  objectif: string; question?: string; reponse?: string; transition?: string; conseil?: string; duree?: number
}

export type Slide = SlideBody & { notes?: SlideNotes }

type SlideBody =
  | { kind: 'cover'; chapter: string; title: string }
  | { kind: 'chapter'; chapter: string; number: string; title: string; goals: string[] }
  | { kind: 'content'; chapter: string; title: string; section?: string; blocks: Block[] }

export type Chapter = { id: string; label: string; short: string }
