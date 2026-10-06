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
   *  `highlight` : numéros de lignes à surligner (1 = première ligne du code affiché). */
  | { k: 'code'; code: string; file?: string; output?: string; small?: boolean; plain?: boolean; highlight?: number[] }
  /** Tableau */
  | { k: 'table'; head: string[]; rows: string[][]; small?: boolean }
  /** Encadré : à retenir / attention / info */
  | { k: 'box'; tone: 'retenir' | 'attention' | 'info'; title?: string; text: string }
  /** Deux colonnes (ratio = largeur relative de la colonne de gauche, 1 = moitié) */
  | { k: 'cols'; left: Block[]; right: Block[]; ratio?: number }
  /** Chaîne d'étapes : A → B → C */
  | { k: 'flow'; steps: { label: string; sub?: string }[] }
  /** Schéma mémoire statique : pile (gauche), tas (droite), flèches de référence.
   *  Les objets du tas sont réordonnés selon la première variable qui les référence. */
  | { k: 'memory'; stack: MemVar[]; heap: MemObj[]; title?: string; caption?: string; compact?: boolean }
  /** Quiz : options cliquables ; la bonne réponse et l'explication s'affichent au clic ou avec la touche S. */
  | { k: 'quiz'; question: string; code?: string; options: string[]; correct: number; explication: string }
  /** Exercice : la solution s'affiche au clic (ou touche S) */
  | { k: 'exercise'; prompt: string; code?: string; solution: Block[]; side?: boolean }

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
