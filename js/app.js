// FreeHand main app
(function () {
  const drawCanvas = document.getElementById('drawCanvas');
  const sheetCanvas = document.getElementById('sheetCanvas');
  const bgCanvas = document.getElementById('bgCanvas');
  const wrap = document.getElementById('canvasWrap');
  const stickerLayer = document.getElementById('stickerLayer');
  const dctx = drawCanvas.getContext('2d');
  const sctx = sheetCanvas.getContext('2d');
  const bctx = bgCanvas.getContext('2d');

  const W = 1200, H = 900;
  function sizeCanvases() {
    [drawCanvas, sheetCanvas, bgCanvas].forEach(c => { c.width = W; c.height = H; });
    redrawBackground();
    redrawSheet();
  }

  // ---- State ----
  const state = {
    brushId: 'pen',
    color: '#ff3366',
    size: 8,
    opacity: 1,
    bg: '#ffffff',
    sheetId: null,
    activeStickerEntry: null,
    drawing: false,
    points: [],
    history: [],
    redoStack: [],
    selectedSticker: null,
  };

  // ---- BACKGROUND ----
  const BG_PRESETS = [
    '#ffffff', '#fff8e7', '#ffe4f0', '#e7f5ff', '#e8ffe7', '#fef3c7',
    '#ddd6fe', '#fde2e4', '#cde7f0', '#1a1a2e', '#0a0a0a',
    'linear-gradient(135deg,#ffd1ec,#a0fff3)',
    'linear-gradient(135deg,#fef3c7,#ffd1ec)',
    'linear-gradient(135deg,#1a1b26,#7afcff)',
    'dots', 'grid', 'lines'
  ];

  function redrawBackground() {
    bctx.clearRect(0, 0, W, H);
    const bg = state.bg;
    if (bg === 'dots') {
      bctx.fillStyle = '#ffffff'; bctx.fillRect(0, 0, W, H);
      bctx.fillStyle = '#dde1ec';
      for (let x = 0; x < W; x += 30) for (let y = 0; y < H; y += 30) bctx.fillRect(x, y, 3, 3);
    } else if (bg === 'grid') {
      bctx.fillStyle = '#ffffff'; bctx.fillRect(0, 0, W, H);
      bctx.strokeStyle = '#dde1ec'; bctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { bctx.beginPath(); bctx.moveTo(x, 0); bctx.lineTo(x, H); bctx.stroke(); }
      for (let y = 0; y < H; y += 40) { bctx.beginPath(); bctx.moveTo(0, y); bctx.lineTo(W, y); bctx.stroke(); }
    } else if (bg === 'lines') {
      bctx.fillStyle = '#fff8e7'; bctx.fillRect(0, 0, W, H);
      bctx.strokeStyle = '#c9b67a'; bctx.lineWidth = 1;
      for (let y = 60; y < H; y += 50) { bctx.beginPath(); bctx.moveTo(0, y); bctx.lineTo(W, y); bctx.stroke(); }
    } else if (bg.startsWith('linear-gradient')) {
      const m = bg.match(/linear-gradient\((-?\d+)deg,([^,]+),([^)]+)\)/);
      if (m) {
        const angle = parseInt(m[1]) * Math.PI / 180;
        const x = Math.cos(angle), y = Math.sin(angle);
        const g = bctx.createLinearGradient(W/2 - x*W/2, H/2 - y*H/2, W/2 + x*W/2, H/2 + y*H/2);
        g.addColorStop(0, m[2].trim()); g.addColorStop(1, m[3].trim());
        bctx.fillStyle = g; bctx.fillRect(0, 0, W, H);
      }
    } else {
      bctx.fillStyle = bg; bctx.fillRect(0, 0, W, H);
    }
  }

  function buildBgGrid() {
    const grid = document.getElementById('bgGrid');
    grid.innerHTML = '';
    BG_PRESETS.forEach(bg => {
      const tile = document.createElement('div');
      tile.className = 'bg-tile';
      if (bg === 'dots') tile.style.background = 'radial-gradient(#bbb 15%, white 16%) 0 0/8px 8px';
      else if (bg === 'grid') tile.style.background = 'linear-gradient(white 95%, #bbb 95%) 0 0/100% 8px, linear-gradient(90deg, white 95%, #bbb 95%) 0 0/8px 100% white';
      else if (bg === 'lines') tile.style.background = 'linear-gradient(#fff8e7 80%, #c9b67a 80%) 0 0/100% 12px';
      else tile.style.background = bg;
      tile.addEventListener('click', () => {
        state.bg = bg;
        redrawBackground();
        document.querySelectorAll('.bg-tile').forEach(t => t.classList.remove('active'));
        tile.classList.add('active');
      });
      grid.appendChild(tile);
    });
  }

  // ---- COLORING SHEETS ----
  function redrawSheet() {
    sctx.clearRect(0, 0, W, H);
    const removeFloat = document.getElementById('removeSheetFloat');
    if (!state.sheetId) {
      if (removeFloat) removeFloat.hidden = true;
      return;
    }
    if (removeFloat) removeFloat.hidden = false;
    const sheet = Sheets.getSheet(state.sheetId);
    if (!sheet) return;
    const blob = new Blob([sheet.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      sctx.clearRect(0, 0, W, H);
      const pad = 40;
      const cw = W - pad * 2, ch = H - pad * 2;
      const ratio = Math.min(cw / img.width, ch / img.height);
      const dw = img.width * ratio, dh = img.height * ratio;
      sctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  function clearSheet() {
    state.sheetId = null;
    document.querySelectorAll('.sheet-tile').forEach(t => t.classList.remove('active'));
    sctx.clearRect(0, 0, W, H);
    const float = document.getElementById('removeSheetFloat');
    if (float) float.hidden = true;
  }

  function buildSheetGrid() {
    const grid = document.getElementById('sheetGrid');
    grid.innerHTML = '';
    Sheets.list.forEach(sheet => {
      const tile = document.createElement('div');
      tile.className = 'sheet-tile';
      tile.innerHTML = sheet.svg + `<div class="sheet-name">${sheet.name}</div>`;
      tile.addEventListener('click', () => {
        state.sheetId = sheet.id;
        document.querySelectorAll('.sheet-tile').forEach(t => t.classList.remove('active'));
        tile.classList.add('active');
        redrawSheet();
      });
      grid.appendChild(tile);
    });
    document.getElementById('clearSheetBtn').addEventListener('click', clearSheet);
    document.getElementById('removeSheetFloat').addEventListener('click', clearSheet);
  }

  // ---- BRUSHES ----
  function buildBrushList() {
    const list = document.getElementById('brushList');
    list.innerHTML = '';
    Brushes.list.forEach(b => {
      const item = document.createElement('div');
      item.className = 'brush-item';
      if (b.id === state.brushId) item.classList.add('active');
      const img = document.createElement('img');
      img.className = 'brush-icon';
      img.src = Brushes.renderIcon(b);
      item.appendChild(img);
      const name = document.createElement('div');
      name.textContent = b.name;
      item.appendChild(name);
      item.addEventListener('click', () => {
        state.brushId = b.id;
        document.querySelectorAll('.brush-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
      list.appendChild(item);
    });
  }
  function getBrush() { return Brushes.list.find(b => b.id === state.brushId); }

  // ---- DRAWING ENGINE ----
  let strokeBuffer = document.createElement('canvas');
  strokeBuffer.width = W; strokeBuffer.height = H;
  const sbCtx = strokeBuffer.getContext('2d');
  let lastSnapshot = null;

  function snapshot() { return dctx.getImageData(0, 0, W, H); }
  function pushHistory() {
    state.history.push(snapshot());
    if (state.history.length > 30) state.history.shift();
    state.redoStack = [];
  }
  function eventToCanvas(e) {
    const rect = drawCanvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top) * (H / rect.height)
    };
  }

  function startStroke(e) {
    if (state.activeStickerEntry) return;
    if (e.target !== drawCanvas) return;
    e.preventDefault();
    state.drawing = true;
    state.points = [eventToCanvas(e)];
    pushHistory();
    lastSnapshot = snapshot();
    sbCtx.clearRect(0, 0, W, H);
    drawStroke();
  }
  function moveStroke(e) {
    if (!state.drawing) return;
    e.preventDefault();
    const p = eventToCanvas(e);
    const last = state.points[state.points.length - 1];
    if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 1) {
      state.points.push(p);
      drawStroke();
    }
  }
  function endStroke() {
    if (!state.drawing) return;
    state.drawing = false;
    state.points = [];
  }
  function drawStroke() {
    const brush = getBrush();
    if (!brush) return;
    if (brush.isEraser) { brush.draw(dctx, state.points, state.color, state.size, state.opacity); return; }
    if (brush.incremental) {
      if (state.points.length >= 2) {
        brush.draw(dctx, state.points.slice(-2), state.color, state.size, state.opacity);
      } else {
        brush.draw(dctx, state.points, state.color, state.size, state.opacity);
      }
      return;
    }
    dctx.putImageData(lastSnapshot, 0, 0);
    sbCtx.clearRect(0, 0, W, H);
    brush.draw(sbCtx, state.points, state.color, state.size, state.opacity);
    dctx.drawImage(strokeBuffer, 0, 0);
  }
  drawCanvas.addEventListener('pointerdown', startStroke);
  drawCanvas.addEventListener('pointermove', moveStroke);
  window.addEventListener('pointerup', endStroke);
  drawCanvas.addEventListener('pointercancel', endStroke);

  // ---- COLOR WHEEL ----
  const wheelCanvas = document.getElementById('colorWheel');
  const wheelCtx = wheelCanvas.getContext('2d');
  const wheelCursor = document.getElementById('wheelCursor');
  const WHEEL_R = 120;
  let brightness = 50;
  let pickedHue = 340, pickedSat = 100;

  function drawColorWheel() {
    const cx = WHEEL_R, cy = WHEEL_R;
    const img = wheelCtx.createImageData(WHEEL_R * 2, WHEEL_R * 2);
    for (let y = 0; y < WHEEL_R * 2; y++) {
      for (let x = 0; x < WHEEL_R * 2; x++) {
        const dx = x - cx, dy = y - cy;
        const d = Math.hypot(dx, dy);
        if (d > WHEEL_R) continue;
        const hue = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
        const sat = Math.min(1, d / WHEEL_R);
        const [r, g, b] = hslToRgb(hue / 360, sat, brightness / 100);
        const i = (y * WHEEL_R * 2 + x) * 4;
        img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255;
      }
    }
    wheelCtx.putImageData(img, 0, 0);
  }

  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  }
  function setColorFromHueSat(h, s) {
    pickedHue = h; pickedSat = s;
    const [r, g, b] = hslToRgb(h / 360, s / 100, brightness / 100);
    state.color = rgbToHex(r, g, b);
    document.getElementById('currentSwatch').style.background = state.color;
    document.getElementById('hexInput').value = state.color;
    const a = h * Math.PI / 180;
    const dist = (s / 100) * WHEEL_R;
    wheelCursor.style.left = (WHEEL_R + Math.cos(a) * dist) + 'px';
    wheelCursor.style.top = (WHEEL_R + Math.sin(a) * dist) + 'px';
  }
  function pickWheel(e) {
    const rect = wheelCanvas.getBoundingClientRect();
    const sx = WHEEL_R * 2 / rect.width;
    const x = (e.clientX - rect.left) * sx - WHEEL_R;
    const y = (e.clientY - rect.top) * sx - WHEEL_R;
    const d = Math.hypot(x, y);
    if (d > WHEEL_R) return;
    const h = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    const s = Math.min(100, (d / WHEEL_R) * 100);
    setColorFromHueSat(h, s);
  }
  let wheelDown = false;
  wheelCanvas.addEventListener('pointerdown', (e) => { wheelDown = true; wheelCanvas.setPointerCapture(e.pointerId); pickWheel(e); });
  wheelCanvas.addEventListener('pointermove', (e) => { if (wheelDown) pickWheel(e); });
  wheelCanvas.addEventListener('pointerup', () => wheelDown = false);

  const SWATCHES = [
    '#ff3366', '#ff77c6', '#ff9a3c', '#ffd23f', '#a0e548', '#34d399',
    '#22d3ee', '#7afcff', '#6366f1', '#a855f7', '#ec4899', '#f43f5e',
    '#000000', '#444444', '#888888', '#ffffff'
  ];
  function buildSwatches() {
    const row = document.getElementById('swatchRow');
    row.innerHTML = '';
    SWATCHES.forEach(c => {
      const sw = document.createElement('div');
      sw.className = 'swatch';
      sw.style.background = c;
      sw.addEventListener('click', () => {
        state.color = c;
        document.getElementById('currentSwatch').style.background = c;
        document.getElementById('hexInput').value = c;
      });
      row.appendChild(sw);
    });
  }

  // ---- STICKERS ----
  function buildStickerGrid(filter = '') {
    const grid = document.getElementById('stickerGrid');
    grid.innerHTML = '';
    Stickers.search(filter).forEach(s => {
      const tile = document.createElement('div');
      tile.className = 'sticker-tile';
      if (s.type === 'emoji') tile.textContent = s.value;
      else tile.innerHTML = s.value;
      tile.title = s.k.join(', ');
      tile.addEventListener('click', () => {
        document.querySelectorAll('.sticker-tile').forEach(t => t.classList.remove('active'));
        tile.classList.add('active');
        state.activeStickerEntry = s;
        // close right panel on mobile to let the user place it
        if (window.matchMedia('(max-width: 900px)').matches) closePanels();
      });
      grid.appendChild(tile);
    });
  }

  // Place a sticker at canvas position (in px relative to wrap)
  function placeStickerAt(entry, xPct, yPct) {
    const el = document.createElement('div');
    el.className = 'sticker ' + entry.type;
    const initialPx = Math.max(64, state.size * 8);
    el.style.left = xPct + '%';
    el.style.top = yPct + '%';
    el.style.width = initialPx + 'px';
    el.style.height = initialPx + 'px';
    el.style.setProperty('--sz', initialPx + 'px');
    el.style.setProperty('--rot', '0deg');
    el._rot = 0;

    const content = document.createElement('div');
    content.className = 'sticker-content';
    if (entry.type === 'emoji') content.textContent = entry.value;
    else content.innerHTML = entry.value;
    el.appendChild(content);

    // Handles + delete
    ['tl', 'tr', 'bl', 'br'].forEach(corner => {
      const h = document.createElement('div');
      h.className = `sticker-handle handle-${corner}`;
      h.dataset.corner = corner;
      el.appendChild(h);
    });
    const rot = document.createElement('div');
    rot.className = 'sticker-handle handle-rotate';
    el.appendChild(rot);
    const del = document.createElement('div');
    del.className = 'sticker-delete';
    del.textContent = '×';
    el.appendChild(del);

    stickerLayer.appendChild(el);
    attachStickerInteractions(el);
    selectSticker(el);
    return el;
  }

  function selectSticker(el) {
    document.querySelectorAll('.sticker.selected').forEach(s => s.classList.remove('selected'));
    if (el) el.classList.add('selected');
    state.selectedSticker = el;
  }

  function attachStickerInteractions(el) {
    let mode = null; // 'move' | 'resize' | 'rotate'
    let startX, startY;
    let startLeft, startTop, startW, startRot;
    let pivotX, pivotY;
    let resizeCorner;

    el.addEventListener('pointerdown', (ev) => {
      ev.stopPropagation();
      const target = ev.target;

      if (target.classList.contains('sticker-delete')) {
        el.remove();
        if (state.selectedSticker === el) state.selectedSticker = null;
        return;
      }

      // Always select when touched
      selectSticker(el);

      if (target.classList.contains('handle-rotate')) {
        mode = 'rotate';
      } else if (target.classList.contains('sticker-handle')) {
        mode = 'resize';
        resizeCorner = target.dataset.corner;
      } else {
        mode = 'move';
      }

      el.setPointerCapture(ev.pointerId);
      el.classList.add('dragging');
      startX = ev.clientX; startY = ev.clientY;

      const wrapRect = wrap.getBoundingClientRect();
      el._wrapRect = wrapRect;
      startLeft = parseFloat(el.style.left);
      startTop = parseFloat(el.style.top);
      startW = parseFloat(el.style.width);
      startRot = el._rot || 0;

      const elRect = el.getBoundingClientRect();
      pivotX = elRect.left + elRect.width / 2;
      pivotY = elRect.top + elRect.height / 2;
    });

    el.addEventListener('pointermove', (ev) => {
      if (!mode) return;
      const wrapRect = el._wrapRect;
      if (mode === 'move') {
        const dx = (ev.clientX - startX) / wrapRect.width * 100;
        const dy = (ev.clientY - startY) / wrapRect.height * 100;
        el.style.left = (startLeft + dx) + '%';
        el.style.top = (startTop + dy) + '%';
      } else if (mode === 'resize') {
        // Distance from sticker center to pointer (in px), scale uniformly
        const dxFromCenter = ev.clientX - pivotX;
        const dyFromCenter = ev.clientY - pivotY;
        const dist = Math.hypot(dxFromCenter, dyFromCenter);
        const newSize = Math.max(24, dist * Math.SQRT2);
        el.style.width = newSize + 'px';
        el.style.height = newSize + 'px';
        el.style.setProperty('--sz', newSize + 'px');
      } else if (mode === 'rotate') {
        const angle = Math.atan2(ev.clientY - pivotY, ev.clientX - pivotX) * 180 / Math.PI;
        // rotate handle is at top (-90deg from center), so subtract -90 to get rotation
        const rot = angle + 90;
        el._rot = rot;
        el.style.setProperty('--rot', rot + 'deg');
      }
    });

    function endDrag() {
      mode = null;
      el.classList.remove('dragging');
    }
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
  }

  // Click on canvas while a sticker tile is active -> place
  drawCanvas.addEventListener('click', (e) => {
    if (!state.activeStickerEntry) return;
    if (state.drawing) return;
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    placeStickerAt(state.activeStickerEntry, x / rect.width * 100, y / rect.height * 100);
  });

  // Click outside any sticker -> deselect
  wrap.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.sticker')) {
      selectSticker(null);
    }
  });

  document.getElementById('stickerSearch').addEventListener('input', (e) => {
    buildStickerGrid(e.target.value);
  });

  // ---- TABS ----
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.tab-panel[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    });
  });

  // ---- TOP BAR ACTIONS ----
  document.getElementById('clearBtn').addEventListener('click', () => {
    if (!confirm('Clear the whole drawing?')) return;
    pushHistory();
    dctx.clearRect(0, 0, W, H);
    stickerLayer.innerHTML = '';
  });
  document.getElementById('undoBtn').addEventListener('click', () => {
    if (state.history.length === 0) return;
    state.redoStack.push(snapshot());
    dctx.putImageData(state.history.pop(), 0, 0);
  });
  document.getElementById('redoBtn').addEventListener('click', () => {
    if (state.redoStack.length === 0) return;
    state.history.push(snapshot());
    dctx.putImageData(state.redoStack.pop(), 0, 0);
  });

  document.getElementById('saveBtn').addEventListener('click', async () => {
    selectSticker(null); // hide handles before export
    await new Promise(r => requestAnimationFrame(r));
    const out = document.createElement('canvas');
    out.width = W; out.height = H;
    const o = out.getContext('2d');
    o.drawImage(bgCanvas, 0, 0);
    o.drawImage(sheetCanvas, 0, 0);
    o.drawImage(drawCanvas, 0, 0);

    const wrapRect = wrap.getBoundingClientRect();
    const stickers = Array.from(document.querySelectorAll('.sticker'));
    for (const s of stickers) {
      const rect = s.getBoundingClientRect();
      const cx = (rect.left + rect.width / 2 - wrapRect.left) / wrapRect.width * W;
      const cy = (rect.top + rect.height / 2 - wrapRect.top) / wrapRect.height * H;
      const w = rect.width / wrapRect.width * W;
      const h = rect.height / wrapRect.height * H;
      const rot = (s._rot || 0) * Math.PI / 180;

      o.save();
      o.translate(cx, cy);
      o.rotate(rot);

      if (s.classList.contains('emoji')) {
        const emoji = s.querySelector('.sticker-content').textContent;
        const fontSize = w * 0.85;
        o.font = `${fontSize}px sans-serif`;
        o.textAlign = 'center';
        o.textBaseline = 'middle';
        o.fillText(emoji, 0, 0);
      } else {
        // Rasterize the SVG content
        const svgEl = s.querySelector('.sticker-content svg');
        if (svgEl) {
          const svgStr = new XMLSerializer().serializeToString(svgEl);
          const img = await loadSvgImage(svgStr);
          o.drawImage(img, -w / 2, -h / 2, w, h);
        }
      }
      o.restore();
    }

    const link = document.createElement('a');
    link.download = `freehand-${Date.now()}.png`;
    link.href = out.toDataURL('image/png');
    link.click();
  });

  function loadSvgImage(svgStr) {
    return new Promise((resolve, reject) => {
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = reject;
      img.src = url;
    });
  }

  // ---- SLIDERS ----
  const sizeSlider = document.getElementById('sizeSlider');
  const sizeVal = document.getElementById('sizeValue');
  sizeSlider.addEventListener('input', () => {
    state.size = parseInt(sizeSlider.value);
    sizeVal.textContent = state.size;
  });
  const opSlider = document.getElementById('opacitySlider');
  const opVal = document.getElementById('opacityValue');
  opSlider.addEventListener('input', () => {
    state.opacity = parseInt(opSlider.value) / 100;
    opVal.textContent = opSlider.value;
  });
  const briSlider = document.getElementById('brightnessSlider');
  const briVal = document.getElementById('brightnessValue');
  briSlider.addEventListener('input', () => {
    brightness = parseInt(briSlider.value);
    briVal.textContent = brightness;
    drawColorWheel();
    setColorFromHueSat(pickedHue, pickedSat);
  });

  document.getElementById('hexInput').addEventListener('change', (e) => {
    let v = e.target.value.trim();
    if (!v.startsWith('#')) v = '#' + v;
    if (/^#[0-9a-f]{6}$/i.test(v)) {
      state.color = v;
      document.getElementById('currentSwatch').style.background = v;
    } else {
      e.target.value = state.color;
    }
  });

  document.getElementById('customBg').addEventListener('input', (e) => {
    state.bg = e.target.value;
    redrawBackground();
    document.querySelectorAll('.bg-tile').forEach(t => t.classList.remove('active'));
  });

  // ---- MOBILE PANEL TOGGLES ----
  const leftPanel = document.querySelector('.brushes-panel');
  const rightPanel = document.querySelector('.right-panel');
  const backdrop = document.getElementById('panelBackdrop');

  function openPanel(panel) {
    closePanels();
    panel.classList.add('open');
    backdrop.classList.add('show');
  }
  function closePanels() {
    leftPanel.classList.remove('open');
    rightPanel.classList.remove('open');
    backdrop.classList.remove('show');
  }
  document.getElementById('leftToggle').addEventListener('click', () => {
    leftPanel.classList.contains('open') ? closePanels() : openPanel(leftPanel);
  });
  document.getElementById('rightToggle').addEventListener('click', () => {
    rightPanel.classList.contains('open') ? closePanels() : openPanel(rightPanel);
  });
  backdrop.addEventListener('click', closePanels);

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); document.getElementById('undoBtn').click(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
      e.preventDefault(); document.getElementById('redoBtn').click();
    }
    if (e.key === '[') { sizeSlider.value = Math.max(1, parseInt(sizeSlider.value) - 2); sizeSlider.dispatchEvent(new Event('input')); }
    if (e.key === ']') { sizeSlider.value = Math.min(80, parseInt(sizeSlider.value) + 2); sizeSlider.dispatchEvent(new Event('input')); }
    if (e.key === 'Escape') {
      state.activeStickerEntry = null;
      document.querySelectorAll('.sticker-tile').forEach(t => t.classList.remove('active'));
      selectSticker(null);
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedSticker) {
      state.selectedSticker.remove();
      state.selectedSticker = null;
    }
  });

  // ---- INIT ----
  sizeCanvases();
  buildBrushList();
  buildBgGrid();
  buildSheetGrid();
  buildSwatches();
  buildStickerGrid();
  drawColorWheel();
  setColorFromHueSat(pickedHue, pickedSat);

  setTimeout(() => {
    const first = document.querySelector('.bg-tile');
    if (first) first.classList.add('active');
  }, 0);
})();
