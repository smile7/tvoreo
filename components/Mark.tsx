/* Знакът „Код-ромб“ с геометрията от бранд пакета.
   Скобите са отделни групи, за да могат да следват курсора и да се „отварят“ при скрол. */

const L = "M-36.12 -49.88 L-86 0 L-36.12 49.88";
const R = "M36.12 -49.88 L86 0 L36.12 49.88";

export function Mark({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const ink = tone === "light" ? "#13294B" : "#FFFFFF";
  const code = tone === "light" ? "#2E6BFF" : "#6E97FF";
  return (
    <svg className={`mark ${className}`} viewBox="-124.2 -135.2 248.4 270.4" aria-hidden="true" focusable="false">
      <g className="mark-l">
        <path d={L} fill="none" stroke={code} strokeWidth="9" strokeLinecap="square" />
      </g>
      <g className="mark-r">
        <path d={R} fill="none" stroke={code} strokeWidth="9" strokeLinecap="square" />
      </g>
      <g className="mark-ticks" stroke={ink} strokeWidth="5.4">
        <path d="M0 -90 v-13.76" />
        <path d="M0 90 v13.76" />
      </g>
      <g className="mark-t" fill={ink}>
        <rect x="-33.54" y="-30.96" width="67.08" height="14.62" />
        <rect x="-8.17" y="-30.96" width="16.34" height="65.36" />
      </g>
    </svg>
  );
}

/* Същият знак като чертеж: контури, възли и размери. Живее в слоя „Код“. */
export function MarkBlueprint() {
  const nodes: [number, number][] = [
    [-36.12, -49.88], [-86, 0], [-36.12, 49.88],
    [36.12, -49.88], [86, 0], [36.12, 49.88],
    [-33.54, -30.96], [33.54, -30.96], [-8.17, 34.4], [8.17, 34.4],
  ];
  return (
    <svg className="mark mark-bp" viewBox="-124.2 -135.2 248.4 270.4" aria-hidden="true" focusable="false">
      <g className="bp-guides">
        <rect x="-86" y="-103.76" width="172" height="207.52" />
        <path d="M-124 0 H124 M0 -135 V135" />
        <circle cx="0" cy="0" r="70.5" />
      </g>
      <g className="mark-l"><path className="bp-line" d={L} /></g>
      <g className="mark-r"><path className="bp-line" d={R} /></g>
      <g className="bp-line"><path d="M0 -90 v-13.76" /><path d="M0 90 v13.76" /></g>
      <g className="bp-line">
        <rect x="-33.54" y="-30.96" width="67.08" height="14.62" />
        <rect x="-8.17" y="-30.96" width="16.34" height="65.36" />
      </g>
      <g className="bp-nodes">
        {nodes.map(([x, y], i) => (
          <rect key={i} x={x - 2.2} y={y - 2.2} width="4.4" height="4.4" />
        ))}
      </g>
      <g className="bp-dim">
        <path d="M-86 -118 H86 M-86 -121 V-115 M86 -121 V-115" />
        <path d="M104 -103.76 V103.76 M101 -103.76 H107 M101 103.76 H107" />
      </g>
      <g className="bp-text">
        <text x="0" y="-122" textAnchor="middle">172.0</text>
        <text x="110" y="3" textAnchor="start">207.5</text>
        <text x="-84" y="122">stroke 9 · #2E6BFF</text>
        <text x="-84" y="131">fill #13294B</text>
        <text x="-36" y="-56" textAnchor="middle">‹</text>
        <text x="36" y="-56" textAnchor="middle">›</text>
      </g>
    </svg>
  );
}
