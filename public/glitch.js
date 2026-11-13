// What .secrets does. Pixelates `target` in growing blocks, lets something
// surface in the mosaic, goes black, and hands back to `done`.
// Used by the home screen (whole .screen) and by /play standing alone.
(function () {
  // The thing in the mosaic: a skull and shoulders, painted as shapes on a small
  // canvas, sampled down to a coarse grid, posterized to a few greys, then
  // glitched with dropped cells and slipped rows. Built fresh each run.
  var COLS = 30, ROWS = 36;
  var GREYS = [null, "#0d0d0d", "#3a3a3a", "#6f6f6f", "#a6a6a6", "#d8d8d8"];
  var grid = null;

  function paintSkull() {
    var W = 300, H = 360;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var x = cv.getContext("2d");
    function ell(cx, cy, rx, ry, g) { x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); x.fill(); }
    function rect(a, b, w, h, g) { x.fillStyle = g; x.fillRect(a, b, w, h); }
    // cranium
    ell(150, 110, 78, 88, "#a4a4a4");
    ell(150, 92, 66, 60, "#c6c6c6");
    ell(150, 70, 40, 26, "#e2e2e2");
    // temples and cheeks darker
    ell(84, 130, 18, 40, "#4a4a4a"); ell(216, 130, 18, 40, "#4a4a4a");
    ell(104, 168, 22, 16, "#555"); ell(196, 168, 22, 16, "#555");
    // eye sockets, one bigger
    ell(118, 122, 24, 26, "#0a0a0a"); ell(184, 120, 27, 29, "#0a0a0a");
    ell(126, 116, 6, 5, "#5a5a5a"); // a glint, not where an eye would put it
    // nose
    x.fillStyle = "#0a0a0a"; x.beginPath(); x.moveTo(150, 138); x.lineTo(136, 170); x.lineTo(164, 170); x.closePath(); x.fill();
    // upper jaw and teeth
    ell(150, 188, 50, 30, "#b4b4b4");
    for (var i = 0; i < 7; i++) rect(112 + i * 11, 178, 8, 22, i % 2 ? "#d8d8d8" : "#bdbdbd");
    rect(104, 200, 92, 6, "#0a0a0a");
    // lower jaw, slightly off centre like it has slipped
    ell(156, 214, 44, 20, "#6a6a6a");
    for (var j = 0; j < 6; j++) rect(122 + j * 11, 206, 8, 14, j % 2 ? "#c4c4c4" : "#9a9a9a");
    // neck, vertebrae
    rect(134, 228, 32, 44, "#2e2e2e");
    for (var k = 0; k < 4; k++) rect(140, 232 + k * 11, 20, 6, "#777");
    // shoulders and clavicles
    ell(150, 290, 130, 30, "#3c3c3c");
    rect(40, 276, 220, 8, "#8d8d8d");
    ell(60, 284, 22, 14, "#9d9d9d"); ell(240, 284, 22, 14, "#9d9d9d");
    // ribcage: bars with a dark sternum
    for (var r = 0; r < 5; r++) {
      rect(68, 296 + r * 13, 70 - r * 6, 6, r % 2 ? "#a0a0a0" : "#7a7a7a");
      rect(162 + r * 6, 296 + r * 13, 70 - r * 6, 6, r % 2 ? "#a0a0a0" : "#7a7a7a");
    }
    rect(144, 284, 12, 70, "#1c1c1c");
    return x.getImageData(0, 0, W, H);
  }

  function buildGrid() {
    var img = paintSkull(), W = img.width, H = img.height, d = img.data;
    var g = [];
    for (var r = 0; r < ROWS; r++) {
      var row = [];
      for (var c = 0; c < COLS; c++) {
        var x0 = Math.floor(c * W / COLS), x1 = Math.floor((c + 1) * W / COLS);
        var y0 = Math.floor(r * H / ROWS), y1 = Math.floor((r + 1) * H / ROWS);
        var sum = 0, n = 0, cov = 0;
        for (var y = y0; y < y1; y++) for (var xx = x0; xx < x1; xx++) {
          var i = (y * W + xx) * 4; n++;
          if (d[i + 3] > 40) { cov++; sum += d[i]; }
        }
        if (!n || cov / n < 0.45) { row.push(0); continue; }
        var lum = sum / cov; // 0..255
        row.push(lum < 40 ? 1 : lum < 90 ? 2 : lum < 140 ? 3 : lum < 195 ? 4 : 5);
      }
      g.push(row);
    }
    // glitch it: drop cells, slip a few rows sideways, smear a couple of cells down
    for (var rr = 0; rr < ROWS; rr++) {
      if (Math.random() < 0.14) { var sh = Math.random() < 0.5 ? -1 : 1; g[rr] = sh > 0 ? [0].concat(g[rr].slice(0, COLS - 1)) : g[rr].slice(1).concat([0]); }
      for (var cc = 0; cc < COLS; cc++) {
        if (g[rr][cc] && Math.random() < 0.09) g[rr][cc] = 0;
        if (g[rr][cc] && Math.random() < 0.05) g[rr][cc] = Math.max(1, g[rr][cc] - 2);
      }
    }
    return g;
  }

  function drawFace(canvas, b, alpha, jitter) {
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    if (alpha <= 0) return;
    if (!grid) grid = buildGrid();
    var cell = Math.floor(Math.min(W / (COLS * 1.5), H / (ROWS * 1.08)));
    var x0 = Math.floor((W - COLS * cell) / 2) + jitter[0], y0 = Math.floor((H - ROWS * cell) / 2) + jitter[1] + Math.floor(cell * 1.5);
    ctx.globalAlpha = alpha;
    for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) {
      var k = grid[r][c];
      if (!k) continue;
      ctx.fillStyle = GREYS[k];
      ctx.fillRect(x0 + c * cell, y0 + r * cell, cell, cell);
    }
    ctx.globalAlpha = 1;
  }

  window.lbFace = drawFace;
  window.lbGlitch = function (target, done) {
    grid = null;
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0"); svg.style.position = "absolute";
    svg.innerHTML = '<filter id="lbpix" x="0" y="0"><feFlood id="lbf" x="1" y="1" width="1" height="1"/><feComposite id="lbc" width="2" height="2"/><feTile result="a"/><feComposite in="SourceGraphic" in2="a" operator="in"/><feMorphology id="lbm" operator="dilate" radius="1"/></filter>';
    document.body.appendChild(svg);
    var f = svg.querySelector("#lbf"), c = svg.querySelector("#lbc"), m = svg.querySelector("#lbm");

    var rect = target.getBoundingClientRect();
    var canvas = document.createElement("canvas");
    canvas.width = Math.round(rect.width); canvas.height = Math.round(rect.height);
    canvas.style.cssText = "position:fixed;left:" + rect.left + "px;top:" + rect.top + "px;width:" + rect.width + "px;height:" + rect.height + "px;z-index:2000000;pointer-events:none;image-rendering:pixelated";
    document.body.appendChild(canvas);

    var steps = [2, 3, 4, 6, 8, 10, 14, 18, 24, 32, 44, 60];
    var total = steps.length + 6, i = 0;
    target.style.filter = "url(#lbpix)";
    (function tick() {
      var b = steps[Math.min(i, steps.length - 1)];
      f.setAttribute("x", b / 2); f.setAttribute("y", b / 2);
      c.setAttribute("width", b); c.setAttribute("height", b);
      m.setAttribute("radius", b / 2);
      var jx = i % 2 ? Math.random() * 8 - 4 : 0, jy = i % 2 ? Math.random() * 6 - 3 : 0;
      target.style.transform = i % 2 ? "translate(" + jx + "px," + jy + "px)" : "none";
      // the face comes up through the blocks once they are coarse enough
      var alpha = Math.max(0, Math.min(1, (i - 5) / 8));
      drawFace(canvas, b, alpha, [Math.round(jx * 0.5), Math.round(jy * 0.5)]);
      i++;
      if (i < total) { setTimeout(tick, 160 + Math.random() * 120); return; }
      // black. the face stays a moment longer than it should.
      target.style.filter = "none"; target.style.transform = "none"; target.style.visibility = "hidden";
      document.documentElement.style.background = "#000";
      drawFace(canvas, 60, 1, [0, 0]);
      setTimeout(function () {
        drawFace(canvas, 60, 0.35, [6, 2]);
        setTimeout(function () { canvas.remove(); setTimeout(done, 3000); }, 180);
      }, 1200);
    })();
  };
})();
