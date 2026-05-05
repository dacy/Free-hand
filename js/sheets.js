// Coloring sheets — SVG outlines you can color in.
// Each sheet returns SVG markup sized to fit a 1000x750 canvas (4:3).

const Sheets = (() => {

  const sheets = [];
  function add(s) { sheets.push(s); return s; }

  // Outline style applied to every shape
  const STROKE = 'stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"';

  add({
    id: 'flower', name: 'Flower',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <circle cx="200" cy="150" r="30" />
          <ellipse cx="200" cy="90" rx="35" ry="55" />
          <ellipse cx="200" cy="210" rx="35" ry="55" />
          <ellipse cx="140" cy="150" rx="55" ry="35" />
          <ellipse cx="260" cy="150" rx="55" ry="35" />
          <ellipse cx="155" cy="105" rx="35" ry="45" transform="rotate(-45 155 105)" />
          <ellipse cx="245" cy="105" rx="35" ry="45" transform="rotate(45 245 105)" />
          <ellipse cx="155" cy="195" rx="35" ry="45" transform="rotate(45 155 195)" />
          <ellipse cx="245" cy="195" rx="35" ry="45" transform="rotate(-45 245 195)" />
          <path d="M200 180 Q210 240 200 285" />
          <path d="M200 250 Q170 240 160 260" />
          <path d="M200 260 Q230 250 240 270" />
        </g>
      </svg>
    `
  });

  add({
    id: 'butterfly', name: 'Butterfly',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M200 90 Q200 230 200 240" />
          <ellipse cx="200" cy="100" rx="8" ry="12" />
          <path d="M200 95 q-12 -10 -18 -3" />
          <path d="M200 95 q12 -10 18 -3" />
          <path d="M200 130 Q120 70 90 130 Q70 180 130 200 Q180 200 200 170 Z" />
          <path d="M200 130 Q280 70 310 130 Q330 180 270 200 Q220 200 200 170 Z" />
          <path d="M200 175 Q140 200 110 240 Q140 270 200 240 Z" />
          <path d="M200 175 Q260 200 290 240 Q260 270 200 240 Z" />
          <circle cx="140" cy="140" r="10" />
          <circle cx="260" cy="140" r="10" />
          <circle cx="155" cy="225" r="6" />
          <circle cx="245" cy="225" r="6" />
        </g>
      </svg>
    `
  });

  add({
    id: 'cat', name: 'Kitty',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M130 100 L150 60 L170 105 Z" />
          <path d="M270 100 L250 60 L230 105 Z" />
          <ellipse cx="200" cy="150" rx="80" ry="65" />
          <circle cx="170" cy="140" r="6" fill="#1a1a1a" />
          <circle cx="230" cy="140" r="6" fill="#1a1a1a" />
          <path d="M195 165 Q200 175 205 165" />
          <path d="M200 170 L200 180" />
          <path d="M160 175 Q120 175 100 165" />
          <path d="M160 180 Q120 185 100 180" />
          <path d="M240 175 Q280 175 300 165" />
          <path d="M240 180 Q280 185 300 180" />
          <path d="M150 215 Q170 280 230 280 Q260 270 270 230" />
          <path d="M150 240 Q170 260 200 260 Q230 260 250 240" />
        </g>
      </svg>
    `
  });

  add({
    id: 'house', name: 'House',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M80 160 L200 70 L320 160 L320 260 L80 260 Z" />
          <path d="M80 160 L200 70 L320 160" />
          <rect x="170" y="180" width="60" height="80" />
          <circle cx="220" cy="220" r="3" fill="#1a1a1a" />
          <rect x="100" y="180" width="50" height="40" />
          <line x1="125" y1="180" x2="125" y2="220" />
          <line x1="100" y1="200" x2="150" y2="200" />
          <rect x="250" y="180" width="50" height="40" />
          <line x1="275" y1="180" x2="275" y2="220" />
          <line x1="250" y1="200" x2="300" y2="200" />
          <rect x="240" y="90" width="30" height="40" />
          <path d="M0 260 L400 260" />
          <circle cx="60" cy="80" r="20" />
          <path d="M50 80 Q60 70 70 80 Q80 80 80 90 Q70 100 60 95 Q50 100 40 90 Q40 80 50 80 Z" />
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
          <circle cx="340" cy="80" r="10" />
          <circle cx="350" cy="220" r="14" />
          <circle cx="50" cy="240" r="10" />
          <path d="M30 130 L50 130 M40 120 L40 140" />
          <path d="M370 160 L385 160 M377 152 L377 168" />
          <path d="M180 270 L220 270" />
        </g>
      </svg>
    `
  });

  add({
    id: 'mandala', name: 'Mandala',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <circle cx="200" cy="150" r="20" />
          <circle cx="200" cy="150" r="40" />
          <circle cx="200" cy="150" r="70" />
          <circle cx="200" cy="150" r="100" />
          ${Array.from({length: 12}).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = 200 + Math.cos(a) * 40;
            const y1 = 150 + Math.sin(a) * 40;
            const x2 = 200 + Math.cos(a) * 100;
            const y2 = 150 + Math.sin(a) * 100;
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
          }).join('')}
          ${Array.from({length: 8}).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
            const cx = 200 + Math.cos(a) * 70;
            const cy = 150 + Math.sin(a) * 70;
            return `<circle cx="${cx}" cy="${cy}" r="12" />`;
          }).join('')}
          ${Array.from({length: 16}).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const cx = 200 + Math.cos(a) * 120;
            const cy = 150 + Math.sin(a) * 120;
            return `<circle cx="${cx}" cy="${cy}" r="6" />`;
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
          <path d="M120 200 Q120 130 180 120 Q230 110 270 130 Q300 100 290 70 L320 90 Q330 130 300 150 Q310 200 280 230 L260 230 L260 260 L240 260 L240 235 L180 235 L180 260 L160 260 L160 230 Q120 220 120 200 Z" />
          <path d="M250 95 L260 50 L270 95" />
          <circle cx="270" cy="135" r="3" fill="#1a1a1a" />
          <path d="M295 145 Q305 145 305 155" />
          <path d="M150 130 Q160 100 175 105 Q170 115 165 130" />
          <path d="M160 130 Q175 105 190 115" />
          <path d="M120 200 Q90 220 80 250 Q100 245 115 230" />
        </g>
      </svg>
    `
  });

  add({
    id: 'fish', name: 'Fish',
    svg: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <g ${STROKE}>
          <path d="M80 150 Q150 80 250 100 Q310 130 310 150 Q310 170 250 200 Q150 220 80 150 Z" />
          <path d="M80 150 L40 110 L50 150 L40 190 Z" />
          <circle cx="240" cy="135" r="8" />
          <circle cx="240" cy="135" r="3" fill="#1a1a1a" />
          <path d="M180 110 Q200 150 180 190" />
          <path d="M210 105 Q230 150 210 195" />
          <path d="M150 130 Q160 150 150 170" />
          <circle cx="100" cy="60" r="8" />
          <circle cx="350" cy="80" r="6" />
          <circle cx="320" cy="240" r="10" />
          <circle cx="60" cy="240" r="8" />
          <path d="M0 270 Q100 250 200 270 Q300 290 400 270" />
        </g>
      </svg>
    `
  });

  function listSheets() { return sheets; }
  function getSheet(id) { return sheets.find(s => s.id === id); }

  // Render a sheet into an svg element sized to fit the canvas
  function renderToSvg(sheetId) {
    const s = getSheet(sheetId);
    if (!s) return null;
    return s.svg;
  }

  return { list: sheets, getSheet, renderToSvg };
})();
