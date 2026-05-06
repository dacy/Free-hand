// Coloring sheets — clean non-overlapping outlines you can color in.
// Each sheet's SVG is rendered into the sheetCanvas so users can paint over it.

const Sheets = (() => {

  const sheets = [];
  function add(s) { sheets.push(s); return s; }

  const STROKE = 'stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"';

  // Helper to build N petals around a center without overlap
  function petals(cx, cy, count, innerR, outerR, petalW) {
    const out = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 - Math.PI / 2;
      const ax = cx + Math.cos(a) * innerR;
      const ay = cy + Math.sin(a) * innerR;
      const bx = cx + Math.cos(a) * outerR;
      const by = cy + Math.sin(a) * outerR;
      const px = -Math.sin(a) * petalW;
      const py = Math.cos(a) * petalW;
      out.push(`<path d="M${ax + px} ${ay + py} Q${bx} ${by} ${ax - px} ${ay - py}" />`);
    }
    return out.join('');
  }

  add({
    id: 'flower', name: 'Flower',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <circle cx="200" cy="120" r="22" />
          ${petals(200, 120, 8, 26, 70, 18)}
          <path d="M200 142 L200 250" />
          <path d="M200 180 Q160 175 145 200" />
          <path d="M200 210 Q235 205 250 230" />
        </g>
      </svg>
    `
  });

  add({
    id: 'butterfly', name: 'Butterfly',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <ellipse cx="200" cy="150" rx="6" ry="40" />
          <circle cx="200" cy="105" r="8" />
          <path d="M195 100 q-10 -14 -16 -8" />
          <path d="M205 100 q10 -14 16 -8" />
          <path d="M196 130 Q140 90 100 120 Q80 160 130 175 Q170 175 196 155 Z" />
          <path d="M204 130 Q260 90 300 120 Q320 160 270 175 Q230 175 204 155 Z" />
          <path d="M196 165 Q150 180 130 220 Q160 240 196 215 Z" />
          <path d="M204 165 Q250 180 270 220 Q240 240 204 215 Z" />
          <circle cx="135" cy="135" r="8" />
          <circle cx="265" cy="135" r="8" />
          <circle cx="155" cy="200" r="5" />
          <circle cx="245" cy="200" r="5" />
        </g>
      </svg>
    `
  });

  add({
    id: 'cat', name: 'Kitty',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M140 95 L160 50 L175 100" />
          <path d="M260 95 L240 50 L225 100" />
          <ellipse cx="200" cy="150" rx="75" ry="60" />
          <circle cx="175" cy="140" r="5" fill="#1a1a1a" />
          <circle cx="225" cy="140" r="5" fill="#1a1a1a" />
          <path d="M196 162 L200 170 L204 162 Z" fill="#1a1a1a" />
          <path d="M200 170 Q195 180 188 178" />
          <path d="M200 170 Q205 180 212 178" />
          <line x1="155" y1="160" x2="120" y2="155" />
          <line x1="155" y1="168" x2="115" y2="170" />
          <line x1="245" y1="160" x2="280" y2="155" />
          <line x1="245" y1="168" x2="285" y2="170" />
          <path d="M150 215 Q200 260 250 215" />
        </g>
      </svg>
    `
  });

  add({
    id: 'house', name: 'House',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M80 160 L200 70 L320 160" />
          <path d="M80 160 L80 260 L320 260 L320 160" />
          <rect x="175" y="190" width="50" height="70" />
          <circle cx="215" cy="225" r="3" fill="#1a1a1a" />
          <rect x="100" y="180" width="50" height="40" />
          <line x1="125" y1="180" x2="125" y2="220" />
          <line x1="100" y1="200" x2="150" y2="200" />
          <rect x="250" y="180" width="50" height="40" />
          <line x1="275" y1="180" x2="275" y2="220" />
          <line x1="250" y1="200" x2="300" y2="200" />
          <rect x="245" y="95" width="25" height="35" />
          <line x1="40" y1="270" x2="360" y2="270" />
          <circle cx="60" cy="80" r="20" />
          <path d="M340 60 Q355 70 350 85 Q365 80 365 95 Q375 95 370 110 Q360 115 350 105 Q345 115 335 105 Q325 110 325 95 Q315 90 325 80 Q325 70 340 60 Z" />
        </g>
      </svg>
    `
  });

  add({
    id: 'star', name: 'Big Star',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M200 50 L228 130 L312 130 L244 178 L270 260 L200 212 L130 260 L156 178 L88 130 L172 130 Z" />
          <circle cx="60" cy="60" r="12" />
          <circle cx="345" cy="80" r="10" />
          <circle cx="350" cy="225" r="14" />
          <circle cx="55" cy="240" r="10" />
          <line x1="30" y1="130" x2="50" y2="130" />
          <line x1="40" y1="120" x2="40" y2="140" />
          <line x1="370" y1="160" x2="385" y2="160" />
          <line x1="377" y1="152" x2="377" y2="168" />
          <line x1="180" y1="280" x2="220" y2="280" />
        </g>
      </svg>
    `
  });

  add({
    id: 'mandala', name: 'Mandala',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <circle cx="200" cy="150" r="18" />
          <circle cx="200" cy="150" r="42" />
          <circle cx="200" cy="150" r="78" />
          <circle cx="200" cy="150" r="115" />
          ${Array.from({length: 12}).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = 200 + Math.cos(a) * 42;
            const y1 = 150 + Math.sin(a) * 42;
            const x2 = 200 + Math.cos(a) * 78;
            const y2 = 150 + Math.sin(a) * 78;
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
          }).join('')}
          ${Array.from({length: 8}).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
            const cx = 200 + Math.cos(a) * 96;
            const cy = 150 + Math.sin(a) * 96;
            return `<circle cx="${cx}" cy="${cy}" r="10" />`;
          }).join('')}
          ${Array.from({length: 16}).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const cx = 200 + Math.cos(a) * 130;
            const cy = 150 + Math.sin(a) * 130;
            return `<circle cx="${cx}" cy="${cy}" r="5" />`;
          }).join('')}
        </g>
      </svg>
    `
  });

  add({
    id: 'unicorn', name: 'Unicorn',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M120 215 Q120 145 175 130 Q220 122 260 138 Q295 110 285 75 L315 95 Q325 130 295 155 Q310 200 285 230" />
          <path d="M285 230 L260 230 L260 265 L240 265 L240 235 L185 235 L185 265 L165 265 L165 230 Q120 220 120 215 Z" />
          <path d="M250 100 L262 50 L275 100" />
          <circle cx="270" cy="140" r="3" fill="#1a1a1a" />
          <path d="M295 150 Q305 152 304 162" />
          <path d="M150 130 Q165 100 180 110" />
          <path d="M155 140 Q175 115 195 125" />
          <path d="M120 215 Q90 235 78 265" />
        </g>
      </svg>
    `
  });

  add({
    id: 'fish', name: 'Fish',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M85 150 Q150 85 250 105 Q310 130 310 150 Q310 170 250 195 Q150 215 85 150 Z" />
          <path d="M85 150 L40 110 L52 150 L40 190 Z" />
          <circle cx="245" cy="135" r="7" />
          <circle cx="245" cy="135" r="2" fill="#1a1a1a" />
          <path d="M180 120 Q200 150 180 180" />
          <path d="M210 115 Q230 150 210 185" />
          <path d="M150 135 Q160 150 150 165" />
          <circle cx="100" cy="55" r="6" />
          <circle cx="350" cy="75" r="5" />
          <circle cx="320" cy="245" r="8" />
          <circle cx="60" cy="245" r="6" />
          <path d="M0 270 Q100 255 200 270 Q300 285 400 270" />
        </g>
      </svg>
    `
  });

  add({
    id: 'rainbow', name: 'Rainbow',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M40 230 Q200 50 360 230" />
          <path d="M60 230 Q200 75 340 230" />
          <path d="M80 230 Q200 100 320 230" />
          <path d="M100 230 Q200 125 300 230" />
          <path d="M120 230 Q200 150 280 230" />
          <path d="M140 230 Q200 175 260 230" />
          <ellipse cx="80" cy="240" rx="40" ry="14" />
          <ellipse cx="320" cy="240" rx="40" ry="14" />
          <path d="M55 255 Q60 270 75 270" />
          <path d="M345 255 Q340 270 325 270" />
        </g>
      </svg>
    `
  });

  add({
    id: 'dino', name: 'Dino',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M85 230 Q70 200 100 175 Q90 130 130 110 Q160 95 200 110 L240 100 Q280 100 295 130 L320 140 Q335 150 325 170 L290 175 Q285 200 270 215" />
          <path d="M270 215 L275 245 L255 245 L250 220" />
          <path d="M180 215 L185 245 L165 245 L160 220" />
          <path d="M85 230 Q90 240 105 240" />
          <circle cx="280" cy="135" r="2.5" fill="#1a1a1a" />
          <path d="M125 130 L120 115 L135 125 L130 110 L145 122" />
          <path d="M150 110 L145 95 L160 105 L155 90 L170 102" />
        </g>
      </svg>
    `
  });

  function getSheet(id) { return sheets.find(s => s.id === id); }

  return { list: sheets, getSheet };
})();
