/* Малък статичен оцветител за кода в hero. Работи на сървъра и връща готов HTML низ,
   за да не натоварва React дървото (и RSC payload-а) с хиляди span-ове. */
const RE =
  /(\/\/.*$|\/\*.*?\*\/)|("[^"]*"|`[^`]*`|'[^']*')|(<\/?[A-Za-z][\w.]*|\/?>)|\b(import|export|from|function|return|const|let|await|async|new|default|if)\b|(@media|@supports|@keyframes|--[\w-]+|#[0-9A-Fa-f]{3,8}\b)|\b(\d+(?:\.\d+)?(?:ms|rem|em|px|s|%|vw)?)\b|([A-Za-z-]+(?==|:\s))/g;

const CLS = ["c-com", "c-str", "c-tag", "c-key", "c-at", "c-num", "c-prop"];
const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function line(l: string) {
  let out = "", last = 0;
  let m: RegExpExecArray | null;
  RE.lastIndex = 0;
  while ((m = RE.exec(l))) {
    if (m[0].length === 0) { RE.lastIndex++; continue; }
    out += esc(l.slice(last, m.index));
    const g = m.slice(1).findIndex((x) => x !== undefined);
    out += `<span class="${CLS[g]}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(l.slice(last));
}

export function CodeLines({ code, start = 1, className = "" }: { code: string; start?: number; className?: string }) {
  const html = code
    .replace(/^\n/, "")
    .replace(/\s+$/, "")
    .split("\n")
    .map((l, i) => `<span class="ln"><span class="ln-n">${start + i}</span>${l ? line(l) : " "}\n</span>`)
    .join("");
  return (
    <pre className={`code ${className}`}>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}
