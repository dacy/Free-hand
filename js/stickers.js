// Searchable sticker library — emoji + custom SVG illustrations.
// Each entry: { type: 'emoji'|'svg', value, keywords: [] }

const Stickers = (() => {

  // ---- SVG Sticker designs ----
  // Drawn at viewBox 100x100; rendered in HTML and rasterized for export.
  const SVG = {};

  SVG.cuteStar = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8 L62 38 L94 42 L70 64 L78 94 L50 78 L22 94 L30 64 L6 42 L38 38 Z"
            fill="#ffd23f" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="42" cy="50" r="3.5" fill="#1a1a1a"/>
      <circle cx="58" cy="50" r="3.5" fill="#1a1a1a"/>
      <circle cx="43" cy="48" r="1.2" fill="#fff"/>
      <circle cx="59" cy="48" r="1.2" fill="#fff"/>
      <path d="M42 60 Q50 67 58 60" stroke="#1a1a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="36" cy="58" rx="3" ry="2" fill="#ff9aa2" opacity="0.8"/>
      <ellipse cx="64" cy="58" rx="3" ry="2" fill="#ff9aa2" opacity="0.8"/>
    </svg>`;

  SVG.cuteSun = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round">
        <line x1="50" y1="6" x2="50" y2="18"/>
        <line x1="50" y1="82" x2="50" y2="94"/>
        <line x1="6" y1="50" x2="18" y2="50"/>
        <line x1="82" y1="50" x2="94" y2="50"/>
        <line x1="18" y1="18" x2="26" y2="26"/>
        <line x1="74" y1="74" x2="82" y2="82"/>
        <line x1="82" y1="18" x2="74" y2="26"/>
        <line x1="26" y1="74" x2="18" y2="82"/>
      </g>
      <circle cx="50" cy="50" r="28" fill="#ffd23f" stroke="#1a1a1a" stroke-width="3"/>
      <circle cx="42" cy="48" r="3" fill="#1a1a1a"/>
      <circle cx="58" cy="48" r="3" fill="#1a1a1a"/>
      <path d="M42 58 Q50 64 58 58" stroke="#1a1a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="36" cy="56" rx="3" ry="2" fill="#ff9aa2"/>
      <ellipse cx="64" cy="56" rx="3" ry="2" fill="#ff9aa2"/>
    </svg>`;

  SVG.cuteCloud = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 65 Q10 65 12 52 Q14 42 26 42 Q28 28 44 28 Q56 28 60 38 Q72 36 78 46 Q90 48 88 60 Q86 72 76 70 Z"
            fill="#ffffff" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="40" cy="52" r="2.5" fill="#1a1a1a"/>
      <circle cx="60" cy="52" r="2.5" fill="#1a1a1a"/>
      <path d="M44 60 Q50 64 56 60" stroke="#1a1a1a" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`;

  SVG.heartSparkle = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 86 C18 64 8 46 14 30 C18 18 34 14 42 22 L50 30 L58 22 C66 14 82 18 86 30 C92 46 82 64 50 86 Z"
            fill="#ff5b88" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M28 38 Q34 44 28 50 Q22 44 28 38 Z" fill="#fff" opacity="0.7"/>
      <path d="M82 18 L84 24 L90 26 L84 28 L82 34 L80 28 L74 26 L80 24 Z" fill="#ffd23f" stroke="#1a1a1a" stroke-width="1.5"/>
      <path d="M16 60 L17 64 L21 65 L17 66 L16 70 L15 66 L11 65 L15 64 Z" fill="#ffd23f" stroke="#1a1a1a" stroke-width="1"/>
    </svg>`;

  SVG.flower = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round">
        <ellipse cx="50" cy="22" rx="13" ry="18" fill="#ff9aa2"/>
        <ellipse cx="78" cy="50" rx="18" ry="13" fill="#ff9aa2"/>
        <ellipse cx="50" cy="78" rx="13" ry="18" fill="#ff9aa2"/>
        <ellipse cx="22" cy="50" rx="18" ry="13" fill="#ff9aa2"/>
        <circle cx="50" cy="50" r="13" fill="#ffd23f"/>
        <circle cx="46" cy="48" r="2" fill="#1a1a1a"/>
        <circle cx="54" cy="48" r="2" fill="#1a1a1a"/>
        <path d="M46 54 Q50 58 54 54" fill="none" stroke-linecap="round" stroke-width="2"/>
      </g>
    </svg>`;

  SVG.crown = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 70 L20 30 L36 52 L50 22 L64 52 L80 30 L86 70 Z"
            fill="#ffd23f" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <rect x="14" y="68" width="72" height="14" fill="#ffb700" stroke="#1a1a1a" stroke-width="3"/>
      <circle cx="50" cy="40" r="4" fill="#ff5b88" stroke="#1a1a1a" stroke-width="2"/>
      <circle cx="26" cy="76" r="3" fill="#7afcff" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="50" cy="76" r="3" fill="#a855f7" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="74" cy="76" r="3" fill="#7afcff" stroke="#1a1a1a" stroke-width="1.5"/>
    </svg>`;

  SVG.gem = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 30 L70 30 L88 50 L50 92 L12 50 Z"
            fill="#7afcff" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 30 L40 50 L12 50 Z" fill="#22d3ee" stroke="#1a1a1a" stroke-width="2"/>
      <path d="M70 30 L60 50 L88 50 Z" fill="#22d3ee" stroke="#1a1a1a" stroke-width="2"/>
      <path d="M40 50 L60 50 L50 92 Z" fill="#0ea5e9" stroke="#1a1a1a" stroke-width="2"/>
      <path d="M30 30 L40 50 L60 50 L70 30 Z" stroke="#1a1a1a" stroke-width="2" fill="none"/>
    </svg>`;

  SVG.donut = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="38" fill="#f4a460" stroke="#1a1a1a" stroke-width="3"/>
      <path d="M22 36 Q50 18 78 36 Q86 52 78 64 Q50 82 22 64 Q14 52 22 36 Z" fill="#ff9aa2" stroke="#1a1a1a" stroke-width="2"/>
      <circle cx="50" cy="50" r="14" fill="#fef3c7" stroke="#1a1a1a" stroke-width="3"/>
      <rect x="32" y="34" width="6" height="2" fill="#7afcff" transform="rotate(20 35 35)"/>
      <rect x="60" y="32" width="6" height="2" fill="#a855f7" transform="rotate(-30 63 33)"/>
      <rect x="68" y="56" width="6" height="2" fill="#34d399" transform="rotate(45 71 57)"/>
      <rect x="28" y="60" width="6" height="2" fill="#ffd23f" transform="rotate(-25 31 61)"/>
      <rect x="40" y="68" width="6" height="2" fill="#ec4899" transform="rotate(10 43 69)"/>
    </svg>`;

  SVG.cake = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="46" y="14" width="2" height="14" fill="#1a1a1a"/>
      <path d="M47 16 Q42 10 47 6 Q52 10 47 16" fill="#ff9aa2" stroke="#1a1a1a" stroke-width="1.5"/>
      <rect x="20" y="50" width="60" height="34" fill="#ff5b88" stroke="#1a1a1a" stroke-width="3"/>
      <path d="M20 50 Q25 45 30 50 Q35 45 40 50 Q45 45 50 50 Q55 45 60 50 Q65 45 70 50 Q75 45 80 50"
            fill="#fff" stroke="#1a1a1a" stroke-width="2.5"/>
      <rect x="44" y="28" width="6" height="22" fill="#fef3c7" stroke="#1a1a1a" stroke-width="2"/>
      <circle cx="34" cy="68" r="3" fill="#7afcff" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="50" cy="72" r="3" fill="#ffd23f" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="66" cy="68" r="3" fill="#a855f7" stroke="#1a1a1a" stroke-width="1.5"/>
    </svg>`;

  SVG.balloon = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 Q78 10 78 38 Q78 60 50 70 Q22 60 22 38 Q22 10 50 10 Z"
            fill="#ff5b88" stroke="#1a1a1a" stroke-width="3"/>
      <path d="M48 70 L52 70 L54 76 L46 76 Z" fill="#1a1a1a"/>
      <path d="M50 76 Q44 86 52 92 Q46 96 50 100" stroke="#1a1a1a" stroke-width="2" fill="none"/>
      <ellipse cx="40" cy="28" rx="6" ry="10" fill="#fff" opacity="0.5"/>
    </svg>`;

  SVG.musicNote = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 78 Q40 68 50 68 Q60 68 60 78 Q60 88 50 88 Q40 88 40 78 Z" fill="#a855f7" stroke="#1a1a1a" stroke-width="3"/>
      <rect x="56" y="22" width="6" height="58" fill="#a855f7" stroke="#1a1a1a" stroke-width="2.5"/>
      <path d="M56 22 Q72 24 80 18 Q82 30 62 36 Z" fill="#a855f7" stroke="#1a1a1a" stroke-width="2.5"/>
    </svg>`;

  SVG.lightning = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M52 6 L20 56 L42 56 L34 94 L78 38 L54 38 L66 6 Z"
            fill="#ffd23f" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
    </svg>`;

  SVG.speechBubble = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 20 Q14 12 22 12 L78 12 Q86 12 86 20 L86 56 Q86 64 78 64 L46 64 L30 80 L34 64 L22 64 Q14 64 14 56 Z"
            fill="#fff" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="36" cy="38" r="4" fill="#1a1a1a"/>
      <circle cx="50" cy="38" r="4" fill="#1a1a1a"/>
      <circle cx="64" cy="38" r="4" fill="#1a1a1a"/>
    </svg>`;

  SVG.banner = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 30 L86 30 L78 50 L86 70 L14 70 L22 50 Z"
            fill="#ff5b88" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <text x="50" y="55" font-family="Arial Black, sans-serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle" stroke="#1a1a1a" stroke-width="1">YAY!</text>
    </svg>`;

  SVG.rainbowArc = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke-linecap="round">
        <path d="M10 80 Q50 10 90 80" stroke="#ff5b88" stroke-width="6"/>
        <path d="M18 80 Q50 22 82 80" stroke="#ff9aa2" stroke-width="6"/>
        <path d="M26 80 Q50 34 74 80" stroke="#ffd23f" stroke-width="6"/>
        <path d="M34 80 Q50 46 66 80" stroke="#a0e548" stroke-width="6"/>
        <path d="M42 80 Q50 58 58 80" stroke="#7afcff" stroke-width="6"/>
        <path d="M10 80 Q50 10 90 80" stroke="#1a1a1a" stroke-width="2"/>
        <path d="M42 80 Q50 58 58 80" stroke="#1a1a1a" stroke-width="2"/>
      </g>
      <ellipse cx="14" cy="84" rx="10" ry="4" fill="#fff" stroke="#1a1a1a" stroke-width="2"/>
      <ellipse cx="86" cy="84" rx="10" ry="4" fill="#fff" stroke="#1a1a1a" stroke-width="2"/>
    </svg>`;

  SVG.diamondBadge = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 L78 26 L86 56 L66 84 L34 84 L14 56 L22 26 Z"
            fill="#7afcff" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M50 22 L70 32 L74 54 L60 72 L40 72 L26 54 L30 32 Z"
            fill="#fef3c7" stroke="#1a1a1a" stroke-width="2"/>
      <text x="50" y="58" font-family="Arial Black, sans-serif" font-size="20" font-weight="900" fill="#ff5b88" text-anchor="middle" stroke="#1a1a1a" stroke-width="1.5">★</text>
    </svg>`;

  SVG.candy = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="22" ry="22" fill="#ff5b88" stroke="#1a1a1a" stroke-width="3"/>
      <path d="M28 50 L8 38 L14 50 L8 62 Z" fill="#ff9aa2" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M72 50 L92 38 L86 50 L92 62 Z" fill="#ff9aa2" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M40 38 Q50 50 60 38" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <path d="M40 50 Q50 62 60 50" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    </svg>`;

  SVG.icecream = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 60 L50 96 L70 60 Z" fill="#f4a460" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <line x1="36" y1="64" x2="46" y2="84" stroke="#1a1a1a" stroke-width="1.5"/>
      <line x1="44" y1="64" x2="54" y2="84" stroke="#1a1a1a" stroke-width="1.5"/>
      <line x1="52" y1="64" x2="62" y2="84" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="50" cy="46" r="20" fill="#ff9aa2" stroke="#1a1a1a" stroke-width="3"/>
      <circle cx="38" cy="36" r="14" fill="#7afcff" stroke="#1a1a1a" stroke-width="3"/>
      <circle cx="62" cy="34" r="14" fill="#fef3c7" stroke="#1a1a1a" stroke-width="3"/>
      <circle cx="50" cy="22" r="12" fill="#a0e548" stroke="#1a1a1a" stroke-width="3"/>
    </svg>`;

  SVG.magicWand = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="70" width="48" height="8" rx="2" transform="rotate(-30 44 74)" fill="#a855f7" stroke="#1a1a1a" stroke-width="2.5"/>
      <path d="M70 18 L78 36 L96 30 L82 44 L92 60 L74 54 L66 72 L62 54 L46 60 L60 46 L52 30 L66 36 Z"
            fill="#ffd23f" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>`;

  SVG.bow = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 50 L20 32 Q12 38 12 50 Q12 62 20 68 Z" fill="#ff5b88" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M50 50 L80 32 Q88 38 88 50 Q88 62 80 68 Z" fill="#ff5b88" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="50" cy="50" rx="8" ry="10" fill="#ff9aa2" stroke="#1a1a1a" stroke-width="2.5"/>
      <path d="M50 60 L42 84" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
      <path d="M50 60 L58 84" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
    </svg>`;

  SVG.partyPopper = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 86 L34 30 L70 66 Z" fill="#ff5b88" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M34 30 L40 18 M40 22 L52 16 M44 32 L60 28 M48 40 L66 42" stroke="#1a1a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="48" cy="20" r="3" fill="#ffd23f" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="68" cy="30" r="3" fill="#7afcff" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="74" cy="50" r="3" fill="#a0e548" stroke="#1a1a1a" stroke-width="1.5"/>
      <rect x="60" y="14" width="3" height="3" fill="#a855f7" stroke="#1a1a1a" stroke-width="1"/>
      <rect x="80" y="40" width="3" height="3" fill="#ec4899" stroke="#1a1a1a" stroke-width="1"/>
      <rect x="36" y="14" width="3" height="3" fill="#22d3ee" stroke="#1a1a1a" stroke-width="1"/>
    </svg>`;

  SVG.unicornHead = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="58" rx="32" ry="28" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
      <path d="M30 38 L24 22 L36 32 Z" fill="#fff" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M70 38 L76 22 L64 32 Z" fill="#fff" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M44 30 L50 4 L56 30 Z" fill="#ffd23f" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M50 7 L48 14 M50 14 L52 21" stroke="#1a1a1a" stroke-width="1" fill="none"/>
      <circle cx="40" cy="58" r="3.5" fill="#1a1a1a"/>
      <circle cx="60" cy="58" r="3.5" fill="#1a1a1a"/>
      <ellipse cx="34" cy="68" rx="4" ry="3" fill="#ff9aa2" opacity="0.7"/>
      <ellipse cx="66" cy="68" rx="4" ry="3" fill="#ff9aa2" opacity="0.7"/>
      <path d="M44 72 Q50 78 56 72" stroke="#1a1a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M28 26 Q22 36 26 48" stroke="#ff9aa2" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M72 26 Q78 36 74 48" stroke="#a855f7" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`;

  // ---- Combined library ----
  const list = [
    // SVG illustrations (the "more toys" the user asked for)
    { type: 'svg', value: SVG.cuteStar, k: ['star', 'cute', 'kawaii', 'happy', 'face', 'yellow'] },
    { type: 'svg', value: SVG.cuteSun, k: ['sun', 'sunny', 'cute', 'kawaii', 'happy', 'face', 'weather'] },
    { type: 'svg', value: SVG.cuteCloud, k: ['cloud', 'cute', 'kawaii', 'sky', 'weather', 'face'] },
    { type: 'svg', value: SVG.heartSparkle, k: ['heart', 'love', 'sparkle', 'pink', 'cute'] },
    { type: 'svg', value: SVG.flower, k: ['flower', 'cute', 'pink', 'kawaii', 'face'] },
    { type: 'svg', value: SVG.crown, k: ['crown', 'royal', 'queen', 'king', 'gold'] },
    { type: 'svg', value: SVG.gem, k: ['gem', 'diamond', 'jewel', 'crystal', 'blue'] },
    { type: 'svg', value: SVG.donut, k: ['donut', 'doughnut', 'sweet', 'food', 'sprinkles'] },
    { type: 'svg', value: SVG.cake, k: ['cake', 'birthday', 'sweet', 'food', 'candle'] },
    { type: 'svg', value: SVG.balloon, k: ['balloon', 'party', 'birthday', 'pink'] },
    { type: 'svg', value: SVG.musicNote, k: ['music', 'note', 'song', 'sound'] },
    { type: 'svg', value: SVG.lightning, k: ['lightning', 'bolt', 'electric', 'thunder', 'yellow'] },
    { type: 'svg', value: SVG.speechBubble, k: ['speech', 'bubble', 'talk', 'chat', 'message'] },
    { type: 'svg', value: SVG.banner, k: ['banner', 'sign', 'yay', 'celebrate'] },
    { type: 'svg', value: SVG.rainbowArc, k: ['rainbow', 'arc', 'colorful', 'sky'] },
    { type: 'svg', value: SVG.diamondBadge, k: ['badge', 'diamond', 'star', 'award'] },
    { type: 'svg', value: SVG.candy, k: ['candy', 'sweet', 'pink', 'lollipop'] },
    { type: 'svg', value: SVG.icecream, k: ['icecream', 'ice cream', 'sweet', 'cone', 'food'] },
    { type: 'svg', value: SVG.magicWand, k: ['wand', 'magic', 'star', 'sparkle', 'fairy'] },
    { type: 'svg', value: SVG.bow, k: ['bow', 'ribbon', 'pink', 'cute'] },
    { type: 'svg', value: SVG.partyPopper, k: ['party', 'popper', 'celebrate', 'confetti'] },
    { type: 'svg', value: SVG.unicornHead, k: ['unicorn', 'cute', 'kawaii', 'magic', 'horse'] },

    // Emoji stickers
    { type: 'emoji', value: '⭐', k: ['star', 'yellow', 'twinkle'] },
    { type: 'emoji', value: '🌟', k: ['star', 'sparkle', 'glow'] },
    { type: 'emoji', value: '✨', k: ['sparkle', 'star', 'shiny', 'magic', 'glitter'] },
    { type: 'emoji', value: '💫', k: ['star', 'dizzy', 'sparkle'] },
    { type: 'emoji', value: '⚡', k: ['lightning', 'bolt', 'electric'] },
    { type: 'emoji', value: '❤️', k: ['heart', 'love', 'red'] },
    { type: 'emoji', value: '🧡', k: ['heart', 'orange', 'love'] },
    { type: 'emoji', value: '💛', k: ['heart', 'yellow', 'love'] },
    { type: 'emoji', value: '💚', k: ['heart', 'green', 'love'] },
    { type: 'emoji', value: '💙', k: ['heart', 'blue', 'love'] },
    { type: 'emoji', value: '💜', k: ['heart', 'purple', 'love'] },
    { type: 'emoji', value: '💖', k: ['heart', 'sparkle', 'love', 'pink'] },
    { type: 'emoji', value: '💕', k: ['hearts', 'love', 'two'] },
    { type: 'emoji', value: '💝', k: ['heart', 'gift', 'present'] },
    { type: 'emoji', value: '😀', k: ['face', 'smile', 'happy'] },
    { type: 'emoji', value: '😂', k: ['face', 'laugh', 'cry', 'lol'] },
    { type: 'emoji', value: '🥰', k: ['face', 'love', 'hearts'] },
    { type: 'emoji', value: '😍', k: ['face', 'love', 'heart eyes'] },
    { type: 'emoji', value: '😎', k: ['face', 'cool', 'sunglasses'] },
    { type: 'emoji', value: '🤩', k: ['face', 'star', 'starstruck'] },
    { type: 'emoji', value: '🥳', k: ['face', 'party', 'celebrate'] },
    { type: 'emoji', value: '🐱', k: ['cat', 'kitty', 'animal'] },
    { type: 'emoji', value: '🐶', k: ['dog', 'puppy', 'animal'] },
    { type: 'emoji', value: '🐰', k: ['rabbit', 'bunny', 'animal'] },
    { type: 'emoji', value: '🐻', k: ['bear', 'animal'] },
    { type: 'emoji', value: '🐼', k: ['panda', 'bear', 'animal'] },
    { type: 'emoji', value: '🦄', k: ['unicorn', 'horse', 'magic'] },
    { type: 'emoji', value: '🦋', k: ['butterfly', 'bug', 'insect'] },
    { type: 'emoji', value: '🐝', k: ['bee', 'bug', 'insect'] },
    { type: 'emoji', value: '🐞', k: ['ladybug', 'bug'] },
    { type: 'emoji', value: '🐠', k: ['fish', 'tropical', 'sea'] },
    { type: 'emoji', value: '🐢', k: ['turtle', 'animal'] },
    { type: 'emoji', value: '🦔', k: ['hedgehog', 'animal'] },
    { type: 'emoji', value: '🐸', k: ['frog', 'animal'] },
    { type: 'emoji', value: '🌸', k: ['flower', 'cherry', 'pink'] },
    { type: 'emoji', value: '🌺', k: ['flower', 'hibiscus', 'pink'] },
    { type: 'emoji', value: '🌻', k: ['flower', 'sunflower', 'yellow'] },
    { type: 'emoji', value: '🌷', k: ['flower', 'tulip', 'pink'] },
    { type: 'emoji', value: '🌹', k: ['flower', 'rose', 'red'] },
    { type: 'emoji', value: '🍀', k: ['clover', 'lucky', 'green'] },
    { type: 'emoji', value: '🌿', k: ['leaf', 'plant'] },
    { type: 'emoji', value: '☀️', k: ['sun', 'sunny', 'weather'] },
    { type: 'emoji', value: '🌙', k: ['moon', 'crescent', 'night'] },
    { type: 'emoji', value: '☁️', k: ['cloud', 'weather'] },
    { type: 'emoji', value: '🌈', k: ['rainbow', 'colorful'] },
    { type: 'emoji', value: '🪐', k: ['planet', 'saturn', 'space'] },
    { type: 'emoji', value: '🚀', k: ['rocket', 'space'] },
    { type: 'emoji', value: '🛸', k: ['ufo', 'alien', 'space'] },
    { type: 'emoji', value: '🍎', k: ['apple', 'fruit', 'red'] },
    { type: 'emoji', value: '🍓', k: ['strawberry', 'fruit', 'red'] },
    { type: 'emoji', value: '🍒', k: ['cherry', 'fruit', 'red'] },
    { type: 'emoji', value: '🍩', k: ['donut', 'sweet', 'food'] },
    { type: 'emoji', value: '🍪', k: ['cookie', 'sweet', 'food'] },
    { type: 'emoji', value: '🧁', k: ['cupcake', 'sweet'] },
    { type: 'emoji', value: '🍦', k: ['icecream', 'ice cream', 'sweet'] },
    { type: 'emoji', value: '🍭', k: ['lollipop', 'candy'] },
    { type: 'emoji', value: '🎈', k: ['balloon', 'party', 'birthday'] },
    { type: 'emoji', value: '🎉', k: ['party', 'celebrate', 'popper'] },
    { type: 'emoji', value: '🎊', k: ['confetti', 'party'] },
    { type: 'emoji', value: '🎂', k: ['birthday', 'cake', 'party'] },
    { type: 'emoji', value: '🎁', k: ['gift', 'present', 'box'] },
    { type: 'emoji', value: '🎀', k: ['ribbon', 'bow', 'pink'] },
    { type: 'emoji', value: '👑', k: ['crown', 'royal', 'queen'] },
    { type: 'emoji', value: '💎', k: ['diamond', 'gem', 'jewel'] },
    { type: 'emoji', value: '🔥', k: ['fire', 'flame', 'hot'] },
    { type: 'emoji', value: '💯', k: ['100', 'hundred', 'perfect'] },
    { type: 'emoji', value: '✅', k: ['check', 'yes', 'correct'] },
    { type: 'emoji', value: '❌', k: ['x', 'no', 'cross'] },
    { type: 'emoji', value: '❓', k: ['question', 'mark'] },
    { type: 'emoji', value: '❗', k: ['exclamation', 'mark'] },
    { type: 'emoji', value: '🎵', k: ['music', 'note', 'song'] },
    { type: 'emoji', value: '🎶', k: ['music', 'notes', 'song'] },
    { type: 'emoji', value: '👍', k: ['thumbs', 'up', 'good', 'like'] },
    { type: 'emoji', value: '✌️', k: ['peace', 'hand', 'victory'] },
    { type: 'emoji', value: '🙌', k: ['hands', 'celebrate'] },
    { type: 'emoji', value: '👏', k: ['clap', 'hands', 'applause'] },
    { type: 'emoji', value: '🎨', k: ['art', 'palette', 'paint'] },
  ];

  function search(query) {
    if (!query || !query.trim()) return list;
    const q = query.toLowerCase().trim();
    return list.filter(s =>
      s.k.some(kw => kw.includes(q) || q.includes(kw))
    );
  }

  return { list, search, SVG };
})();
