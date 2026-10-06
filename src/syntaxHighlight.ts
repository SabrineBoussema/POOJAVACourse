/**
 * Coloration syntaxique Java (statique, sans animation).
 * Commentaires et chaînes sont mis de côté AVANT les mots-clés
 * pour ne pas colorer ce qu'ils contiennent.
 */
const KEYWORDS =
  'public|private|protected|static|void|class|new|return|this|super|import|package|final|extends|implements|interface|abstract|default|if|else|for|while|do|switch|case|break|continue|try|catch|throw|throws|instanceof|true|false|null|boolean|byte|short|int|long|float|double|char|var'

export function hi(code: string): string {
  const bags: string[] = []
  const park = (html: string) => {
    bags.push(html)
    return `\u0000p${bags.length - 1}\u0000`
  }

  let s = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\/\*[\s\S]*?\*\//g, (m) => park(`<span class="cmt">${m}</span>`))
    .replace(/\/\/.*$/gm, (m) => park(`<span class="cmt">${m}</span>`))
    .replace(/"([^"\n]*)"/g, (m) => park(`<span class="str">${m}</span>`))
    .replace(/'(\\?.)'/g, (m) => park(`<span class="str">${m}</span>`))
    .replace(/@[A-Za-z]+/g, (m) => park(`<span class="ann">${m}</span>`))
    .replace(new RegExp(`\\b(${KEYWORDS})\\b`, 'g'), (m) => park(`<span class="kw">${m}</span>`))
    .replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, '<span class="cls">$1</span>')
    .replace(/\b(\d+\.?\d*[fldFL]?)\b/g, '<span class="num">$1</span>')

  for (let i = bags.length - 1; i >= 0; i--) {
    s = s.split(`\u0000p${i}\u0000`).join(bags[i])
  }
  return s
}
