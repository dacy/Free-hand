// 25 brush definitions. Each brush exposes:
//   id, name, icon (emoji), draw(ctx, points, color, size, opacity)
// "points" is the full stroke so far (array of {x,y,t,p?}).
// We redraw the active stroke each frame onto a stroke-buffer for smoothness.

const Brushes = (() => {

  // ---- helpers ----
  function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  function lerpPoints(p1, p2, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const t = i / n;
      out.push({ x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t });
    }
    return out;
  }

  function withAlpha(hex, a) {
    // hex like #rrggbb -> rgba
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function strokeLine(ctx, pts, color, size, opacity, opts = {}) {
    if (pts.length < 2) {
      ctx.fillStyle = withAlpha(color, opacity);
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, size / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.strokeStyle = withAlpha(color, opacity);
    ctx.lineWidth = size;
    ctx.lineCap = opts.cap || 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
  }

  // ---- brush definitions ----
  const list = [];
  function add(b) { list.push(b); return b; }

  add({
    id: 'pencil', name: 'Pencil', icon: '✏️',
    draw(ctx, pts, color, size, op) {
      strokeLine(ctx, pts, color, size * 0.5, op * 0.85);
    }
  });

  add({
    id: 'pen', name: 'Pen', icon: '🖊️',
    draw(ctx, pts, color, size, op) {
      strokeLine(ctx, pts, color, size, op);
    }
  });

  add({
    id: 'marker', name: 'Marker', icon: '🖍️',
    draw(ctx, pts, color, size, op) {
      ctx.globalCompositeOperation = 'multiply';
      strokeLine(ctx, pts, color, size * 1.4, op * 0.6);
      ctx.globalCompositeOperation = 'source-over';
    }
  });

  add({
    id: 'highlighter', name: 'Highlighter', icon: '🟡',
    draw(ctx, pts, color, size, op) {
      ctx.globalCompositeOperation = 'multiply';
      strokeLine(ctx, pts, color, size * 2.2, op * 0.35, { cap: 'butt' });
      ctx.globalCompositeOperation = 'source-over';
    }
  });

  add({
    id: 'crayon', name: 'Crayon', icon: '🖍',
    draw(ctx, pts, color, size, op) {
      // Multiple jittered strokes for waxy texture
      for (let i = 0; i < 3; i++) {
        const j = (i - 1) * size * 0.15;
        const jit = pts.map(p => ({ x: p.x + j, y: p.y + j * 0.5 }));
        strokeLine(ctx, jit, color, size * 0.8, op * 0.4);
      }
    }
  });

  add({
    id: 'spray', name: 'Spray', icon: '🌫',
    draw(ctx, pts, color, size, op) {
      ctx.fillStyle = withAlpha(color, op * 0.3);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const density = Math.max(8, size * 2);
        for (let d = 0; d < density; d++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * size * 1.5;
          const x = p.x + Math.cos(angle) * r;
          const y = p.y + Math.sin(angle) * r;
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
    },
    incremental: true
  });

  add({
    id: 'calligraphy', name: 'Calligraphy', icon: '🪶',
    draw(ctx, pts, color, size, op) {
      ctx.strokeStyle = withAlpha(color, op);
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        // thicker when stroke is along 45deg, thin when perpendicular
        const t = Math.abs(Math.cos(angle - Math.PI / 4));
        ctx.lineWidth = size * (0.3 + t * 1.2);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  });

  add({
    id: 'brush', name: 'Brush', icon: '🖌',
    draw(ctx, pts, color, size, op) {
      ctx.strokeStyle = withAlpha(color, op * 0.9);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // Tapered ends + speed-based width
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const speed = distance(a, b);
        const taper = Math.min(1, i / 6) * Math.min(1, (pts.length - i) / 6);
        const w = size * (0.4 + 0.6 * taper) * (1 - Math.min(0.5, speed / 60));
        ctx.lineWidth = Math.max(0.5, w);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  });

  add({
    id: 'watercolor', name: 'Watercolor', icon: '💧',
    draw(ctx, pts, color, size, op) {
      // Soft, wide, transparent overlapping circles
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        grad.addColorStop(0, withAlpha(color, op * 0.18));
        grad.addColorStop(1, withAlpha(color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    incremental: true
  });

  add({
    id: 'chalk', name: 'Chalk', icon: '🧊',
    draw(ctx, pts, color, size, op) {
      ctx.fillStyle = withAlpha(color, op * 0.45);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        for (let d = 0; d < size * 1.2; d++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * size * 0.7;
          ctx.fillRect(p.x + Math.cos(angle) * r, p.y + Math.sin(angle) * r, 1, 1);
        }
      }
    },
    incremental: true
  });

  add({
    id: 'charcoal', name: 'Charcoal', icon: '⬛',
    draw(ctx, pts, color, size, op) {
      ctx.fillStyle = withAlpha(color, op * 0.55);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        for (let d = 0; d < size * 2; d++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * size;
          const sz = 1 + Math.random() * 2;
          ctx.fillRect(p.x + Math.cos(angle) * r, p.y + Math.sin(angle) * r, sz, sz);
        }
      }
    },
    incremental: true
  });

  add({
    id: 'glitter', name: 'Glitter', icon: '✨',
    draw(ctx, pts, color, size, op) {
      const palette = ['#fff7a0', '#ffd1ec', '#a0fff3', '#ffb27a', '#d6b6ff', color];
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        for (let d = 0; d < size; d++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * size * 1.3;
          const x = p.x + Math.cos(angle) * r;
          const y = p.y + Math.sin(angle) * r;
          ctx.fillStyle = withAlpha(
            palette[Math.floor(Math.random() * palette.length)].length === 7
              ? palette[Math.floor(Math.random() * palette.length)]
              : color, op);
          ctx.fillRect(x, y, 2, 2);
        }
      }
    },
    incremental: true
  });

  add({
    id: 'rainbow', name: 'Rainbow', icon: '🌈',
    draw(ctx, pts, color, size, op) {
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < pts.length; i++) {
        const hue = (i * 8) % 360;
        ctx.strokeStyle = `hsla(${hue}, 90%, 55%, ${op})`;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
    }
  });

  add({
    id: 'neon', name: 'Neon', icon: '💡',
    draw(ctx, pts, color, size, op) {
      ctx.shadowBlur = size * 1.6;
      ctx.shadowColor = color;
      strokeLine(ctx, pts, color, size * 0.5, op);
      ctx.shadowBlur = 0;
      // bright core
      strokeLine(ctx, pts, '#ffffff', size * 0.25, op);
    }
  });

  add({
    id: 'pixel', name: 'Pixel', icon: '👾',
    draw(ctx, pts, color, size, op) {
      ctx.fillStyle = withAlpha(color, op);
      const step = Math.max(2, Math.round(size));
      const seen = new Set();
      const all = [];
      for (let i = 1; i < pts.length; i++) {
        const fills = lerpPoints(pts[i - 1], pts[i], 6);
        all.push(...fills);
      }
      all.push(pts[pts.length - 1]);
      for (const p of all) {
        const x = Math.floor(p.x / step) * step;
        const y = Math.floor(p.y / step) * step;
        const k = `${x},${y}`;
        if (seen.has(k)) continue;
        seen.add(k);
        ctx.fillRect(x, y, step, step);
      }
    }
  });

  add({
    id: 'dots', name: 'Dots', icon: '⚫',
    draw(ctx, pts, color, size, op) {
      ctx.fillStyle = withAlpha(color, op);
      const step = size * 1.6;
      let acc = 0;
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, size / 2, 0, Math.PI * 2);
      ctx.fill();
      for (let i = 1; i < pts.length; i++) {
        acc += distance(pts[i - 1], pts[i]);
        if (acc >= step) {
          acc = 0;
          ctx.beginPath();
          ctx.arc(pts[i].x, pts[i].y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  });

  add({
    id: 'dashed', name: 'Dashed', icon: '➖',
    draw(ctx, pts, color, size, op) {
      ctx.strokeStyle = withAlpha(color, op);
      ctx.lineWidth = size;
      ctx.lineCap = 'butt';
      ctx.setLineDash([size * 2, size * 1.5]);
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  });

  add({
    id: 'double', name: 'Double Line', icon: '🟰',
    draw(ctx, pts, color, size, op) {
      // Compute perpendicular offset between segments
      ctx.strokeStyle = withAlpha(color, op);
      ctx.lineWidth = Math.max(1, size * 0.35);
      ctx.lineCap = 'round';
      const offs = size * 0.7;
      const offset = (sign) => {
        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const a = pts[Math.max(0, i - 1)];
          const b = pts[Math.min(pts.length - 1, i + 1)];
          const angle = Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2;
          const x = pts[i].x + Math.cos(angle) * offs * sign;
          const y = pts[i].y + Math.sin(angle) * offs * sign;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      offset(1); offset(-1);
    }
  });

  add({
    id: 'sketch', name: 'Sketch', icon: '✍️',
    draw(ctx, pts, color, size, op) {
      ctx.strokeStyle = withAlpha(color, op * 0.4);
      ctx.lineWidth = size * 0.4;
      ctx.lineCap = 'round';
      // connect each point to several other recent points faintly
      for (let i = 0; i < pts.length; i++) {
        for (let j = Math.max(0, i - 8); j < i; j++) {
          if (distance(pts[i], pts[j]) < size * 4 && Math.random() < 0.25) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
    },
    incremental: true
  });

  add({
    id: 'fur', name: 'Fur', icon: '🐾',
    draw(ctx, pts, color, size, op) {
      ctx.strokeStyle = withAlpha(color, op * 0.6);
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        for (let h = 0; h < size * 1.5; h++) {
          const angle = Math.random() * Math.PI * 2;
          const len = size * (0.4 + Math.random() * 0.8);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + Math.cos(angle) * len, p.y + Math.sin(angle) * len);
          ctx.stroke();
        }
      }
    },
    incremental: true
  });

  add({
    id: 'stars', name: 'Star Trail', icon: '⭐',
    draw(ctx, pts, color, size, op) {
      ctx.fillStyle = withAlpha(color, op);
      const step = size * 2;
      let acc = step;
      function star(cx, cy, r) {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
          const rr = i % 2 === 0 ? r : r * 0.45;
          const x = cx + Math.cos(a) * rr;
          const y = cy + Math.sin(a) * rr;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        if (i > 0) acc += distance(pts[i - 1], pts[i]);
        if (acc >= step) {
          acc = 0;
          star(pts[i].x, pts[i].y, size);
        }
      }
    }
  });

  add({
    id: 'hearts', name: 'Heart Trail', icon: '❤️',
    draw(ctx, pts, color, size, op) {
      ctx.fillStyle = withAlpha(color, op);
      const step = size * 2.2;
      let acc = step;
      function heart(cx, cy, s) {
        ctx.beginPath();
        ctx.moveTo(cx, cy + s * 0.3);
        ctx.bezierCurveTo(cx + s, cy - s * 0.5, cx + s * 0.5, cy - s, cx, cy - s * 0.3);
        ctx.bezierCurveTo(cx - s * 0.5, cy - s, cx - s, cy - s * 0.5, cx, cy + s * 0.3);
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        if (i > 0) acc += distance(pts[i - 1], pts[i]);
        if (acc >= step) {
          acc = 0;
          heart(pts[i].x, pts[i].y, size);
        }
      }
    }
  });

  add({
    id: 'bubble', name: 'Bubble', icon: '⭕',
    draw(ctx, pts, color, size, op) {
      ctx.strokeStyle = withAlpha(color, op);
      ctx.lineWidth = 1.5;
      const step = size * 1.3;
      let acc = step;
      for (let i = 0; i < pts.length; i++) {
        if (i > 0) acc += distance(pts[i - 1], pts[i]);
        if (acc >= step) {
          acc = 0;
          const r = size * (0.5 + Math.random() * 0.6);
          ctx.beginPath();
          ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  });

  add({
    id: 'ribbon', name: 'Ribbon', icon: '🎀',
    draw(ctx, pts, color, size, op) {
      // Two parallel offset strokes that swap thickness — looks like a flowing ribbon
      ctx.lineCap = 'round';
      const off = size * 0.5;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const ang = Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2;
        const dx = Math.cos(ang) * off, dy = Math.sin(ang) * off;
        ctx.strokeStyle = withAlpha(color, op);
        ctx.lineWidth = size * 0.8;
        ctx.beginPath();
        ctx.moveTo(a.x + dx, a.y + dy);
        ctx.lineTo(b.x + dx, b.y + dy);
        ctx.stroke();
        ctx.strokeStyle = withAlpha(color, op * 0.55);
        ctx.lineWidth = size * 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x - dx, a.y - dy);
        ctx.lineTo(b.x - dx, b.y - dy);
        ctx.stroke();
      }
    }
  });

  add({
    id: 'eraser', name: 'Eraser', icon: '🧽',
    draw(ctx, pts, color, size, op) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = size * 1.6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.restore();
    },
    isEraser: true
  });

  // Render a small icon for the brush palette
  function renderIcon(brush) {
    const c = document.createElement('canvas');
    c.width = 60; c.height = 28;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    const pts = [];
    for (let i = 0; i < 16; i++) {
      const x = 4 + (i / 15) * (c.width - 8);
      const y = 14 + Math.sin(i * 0.6) * 5;
      pts.push({ x, y });
    }
    try {
      brush.draw(ctx, pts, '#222244', 6, 1);
    } catch (e) { /* ignore */ }
    return c.toDataURL();
  }

  return { list, renderIcon };
})();
