/**
 * Coloration syntaxique Java pour l’éditeur pédagogique.
 * Protège commentaires puis chaînes AVANT les mots-clés
 * (évite que \bclass\b casse les attributs HTML class="…").
 */
export function hi(code: string): string {
  const bags: string[] = []
  const park = (html: string) => {
    const i = bags.length
    bags.push(html)
    return `\u0000B${i}\u0000`
  }

  let s = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Commentaires d’abord (quotes à l’intérieur restent du commentaire)
    .replace(/\/\/.*$/gm, (m) => park(`<span class="cmt">${m}</span>`))
    .replace(/"([^"]*)"/g, (_, inner: string) => park(`<span class="str">"${inner}"</span>`))
    .replace(
      /\b(public|private|protected|static|void|class|new|return|this|import|package|final|extends|if|else|for|while|true|false|null|abstract|interface|implements)\b/g,
      '<span class="kw">$1</span>',
    )
    .replace(
      /\b(String|int|long|short|byte|char|float|double|boolean|Object|StringBuilder|Arrays|System|Point|Etudiant|Main|Voiture)\b/g,
      '<span class="cls">$1</span>',
    )
    .replace(/\b(\d+\.?\d*[fldFL]?)\b/g, '<span class="num">$1</span>')

  for (let i = bags.length - 1; i >= 0; i--) {
    s = s.split(`\u0000B${i}\u0000`).join(bags[i])
  }
  return s
}
