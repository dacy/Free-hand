// Searchable sticker library. Each entry: {emoji, keywords: []}.
// Keywords are matched against the search query.

const Stickers = (() => {
  const list = [
    // Stars / sparkle
    { e: '⭐', k: ['star', 'yellow', 'twinkle', 'shine'] },
    { e: '🌟', k: ['star', 'sparkle', 'glow', 'glowing'] },
    { e: '✨', k: ['sparkle', 'star', 'shiny', 'magic', 'glitter'] },
    { e: '💫', k: ['star', 'dizzy', 'sparkle', 'spin'] },
    { e: '⚡', k: ['lightning', 'bolt', 'electric', 'thunder'] },

    // Hearts / love
    { e: '❤️', k: ['heart', 'love', 'red'] },
    { e: '🧡', k: ['heart', 'orange', 'love'] },
    { e: '💛', k: ['heart', 'yellow', 'love'] },
    { e: '💚', k: ['heart', 'green', 'love'] },
    { e: '💙', k: ['heart', 'blue', 'love'] },
    { e: '💜', k: ['heart', 'purple', 'love'] },
    { e: '🖤', k: ['heart', 'black', 'love'] },
    { e: '🤍', k: ['heart', 'white', 'love'] },
    { e: '💖', k: ['heart', 'sparkle', 'love', 'pink'] },
    { e: '💕', k: ['hearts', 'love', 'two'] },
    { e: '💗', k: ['heart', 'growing', 'love'] },
    { e: '💝', k: ['heart', 'gift', 'present'] },
    { e: '💘', k: ['heart', 'arrow', 'cupid'] },

    // Faces / emotions
    { e: '😀', k: ['face', 'smile', 'happy', 'grin'] },
    { e: '😂', k: ['face', 'laugh', 'cry', 'lol'] },
    { e: '🥰', k: ['face', 'love', 'hearts', 'happy'] },
    { e: '😍', k: ['face', 'love', 'heart eyes'] },
    { e: '😊', k: ['face', 'smile', 'happy', 'blush'] },
    { e: '😎', k: ['face', 'cool', 'sunglasses'] },
    { e: '🤩', k: ['face', 'star', 'starstruck'] },
    { e: '🥳', k: ['face', 'party', 'celebrate'] },
    { e: '😴', k: ['face', 'sleep', 'tired'] },
    { e: '🤔', k: ['face', 'think', 'thinking'] },
    { e: '😢', k: ['face', 'cry', 'sad'] },
    { e: '🤗', k: ['face', 'hug', 'happy'] },

    // Animals
    { e: '🐱', k: ['cat', 'kitty', 'animal', 'pet'] },
    { e: '🐶', k: ['dog', 'puppy', 'animal', 'pet'] },
    { e: '🐰', k: ['rabbit', 'bunny', 'animal'] },
    { e: '🐻', k: ['bear', 'animal'] },
    { e: '🐼', k: ['panda', 'bear', 'animal'] },
    { e: '🦄', k: ['unicorn', 'horse', 'magic'] },
    { e: '🦋', k: ['butterfly', 'bug', 'insect'] },
    { e: '🐝', k: ['bee', 'bug', 'insect'] },
    { e: '🐞', k: ['ladybug', 'bug', 'insect'] },
    { e: '🐠', k: ['fish', 'tropical', 'sea'] },
    { e: '🐢', k: ['turtle', 'animal'] },
    { e: '🦔', k: ['hedgehog', 'animal'] },
    { e: '🐸', k: ['frog', 'animal'] },
    { e: '🦁', k: ['lion', 'animal'] },
    { e: '🐯', k: ['tiger', 'animal'] },

    // Nature
    { e: '🌸', k: ['flower', 'cherry', 'pink', 'blossom'] },
    { e: '🌺', k: ['flower', 'hibiscus', 'pink'] },
    { e: '🌻', k: ['flower', 'sunflower', 'yellow'] },
    { e: '🌷', k: ['flower', 'tulip', 'pink'] },
    { e: '🌹', k: ['flower', 'rose', 'red'] },
    { e: '🌼', k: ['flower', 'daisy', 'yellow'] },
    { e: '🍀', k: ['clover', 'lucky', 'plant', 'green'] },
    { e: '🌿', k: ['leaf', 'plant', 'herb'] },
    { e: '🌱', k: ['plant', 'sprout', 'seedling'] },
    { e: '🌳', k: ['tree', 'plant'] },

    // Sky / weather
    { e: '☀️', k: ['sun', 'sunny', 'weather'] },
    { e: '🌙', k: ['moon', 'crescent', 'night'] },
    { e: '☁️', k: ['cloud', 'weather'] },
    { e: '🌈', k: ['rainbow', 'colorful', 'pride'] },
    { e: '☂️', k: ['umbrella', 'rain'] },
    { e: '🌍', k: ['earth', 'globe', 'world'] },
    { e: '🪐', k: ['planet', 'saturn', 'space'] },
    { e: '🚀', k: ['rocket', 'space', 'fly'] },
    { e: '🛸', k: ['ufo', 'alien', 'space'] },

    // Food / sweet
    { e: '🍎', k: ['apple', 'fruit', 'red'] },
    { e: '🍓', k: ['strawberry', 'fruit', 'red'] },
    { e: '🍒', k: ['cherry', 'fruit', 'red'] },
    { e: '🍩', k: ['donut', 'sweet', 'food'] },
    { e: '🍪', k: ['cookie', 'sweet', 'food'] },
    { e: '🍰', k: ['cake', 'sweet', 'food'] },
    { e: '🧁', k: ['cupcake', 'sweet', 'food'] },
    { e: '🍦', k: ['icecream', 'ice cream', 'sweet'] },
    { e: '🍭', k: ['lollipop', 'candy', 'sweet'] },
    { e: '🍬', k: ['candy', 'sweet'] },

    // Symbols / fun
    { e: '🎈', k: ['balloon', 'party', 'birthday'] },
    { e: '🎉', k: ['party', 'celebrate', 'popper'] },
    { e: '🎊', k: ['confetti', 'party', 'celebrate'] },
    { e: '🎂', k: ['birthday', 'cake', 'party'] },
    { e: '🎁', k: ['gift', 'present', 'box'] },
    { e: '🎀', k: ['ribbon', 'bow', 'pink'] },
    { e: '👑', k: ['crown', 'royal', 'queen', 'king'] },
    { e: '💎', k: ['diamond', 'gem', 'jewel'] },
    { e: '🔥', k: ['fire', 'flame', 'hot'] },
    { e: '💯', k: ['100', 'hundred', 'perfect'] },
    { e: '✅', k: ['check', 'yes', 'correct', 'tick'] },
    { e: '❌', k: ['x', 'no', 'cross', 'wrong'] },
    { e: '❓', k: ['question', 'mark'] },
    { e: '❗', k: ['exclamation', 'mark', 'important'] },
    { e: '🔔', k: ['bell', 'ring', 'notify'] },
    { e: '🎵', k: ['music', 'note', 'song'] },
    { e: '🎶', k: ['music', 'notes', 'song'] },

    // Hands / people
    { e: '👍', k: ['thumbs', 'up', 'good', 'like'] },
    { e: '👎', k: ['thumbs', 'down', 'bad'] },
    { e: '👋', k: ['wave', 'hand', 'hi', 'bye'] },
    { e: '🤙', k: ['call', 'hand'] },
    { e: '✌️', k: ['peace', 'hand', 'victory'] },
    { e: '🙌', k: ['hands', 'celebrate', 'praise'] },
    { e: '👏', k: ['clap', 'hands', 'applause'] },

    // Misc
    { e: '🌮', k: ['taco', 'food'] },
    { e: '🍕', k: ['pizza', 'food'] },
    { e: '⚽', k: ['soccer', 'ball', 'sport'] },
    { e: '🏀', k: ['basketball', 'ball', 'sport'] },
    { e: '🎮', k: ['game', 'controller', 'video'] },
    { e: '🎨', k: ['art', 'palette', 'paint'] },
    { e: '✏️', k: ['pencil', 'write'] },
    { e: '📚', k: ['books', 'read', 'study'] },
  ];

  function search(query) {
    if (!query || !query.trim()) return list;
    const q = query.toLowerCase().trim();
    return list.filter(s =>
      s.k.some(kw => kw.includes(q) || q.includes(kw)) || s.e === q
    );
  }

  return { list, search };
})();
