(() => {
  const canvas = document.getElementById("nebula");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let seed = 72491;
  function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }
  function draw() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    const step = 4, cols = Math.ceil(w / step), rows = Math.ceil(h / step);
    function upper(x) { return .19 + .055 * Math.sin(x * 7 + .4) + .022 * Math.sin(x * 19); }
    function lower(x) { return .78 + .045 * Math.sin(x * 6 + 1.8) + .025 * Math.sin(x * 17 + 2); }
    function gaussian(v, width) { return Math.exp(-(v * v) / (2 * width * width)); }
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const nx = x / cols, ny = y / rows, du = ny - upper(nx), dl = ny - lower(nx);
      let density = .05 + .43 * gaussian(du, .045) + .38 * gaussian(dl, .05)
        + .14 * gaussian(du + .035 * Math.sin(nx * 28), .018)
        + .12 * gaussian(dl - .025 * Math.sin(nx * 23), .022);
      density *= 1 - .72 * gaussian(ny - .48, .12);
      density *= .55 + .45 * Math.pow(Math.sin(nx * 31 + ny * 13) * .5 + .5, 1.4);
      density = Math.min(density + .10 * random(), .94);
      if (random() > density) continue;
      const brightness = random(), alpha = .12 + Math.pow(brightness, 2.2) * .78;
      const size = random() > .91 ? step * 1.5 : step * .7;
      const gray = Math.floor(90 + brightness * 165);
      ctx.fillStyle = `rgba(${gray},${gray},${gray},${alpha})`;
      ctx.fillRect(x * step + random() * 1.5, y * step + random() * 1.5, size, size);
    }
    const starCount = Math.floor(w * h / 1000);
    for (let i = 0; i < starCount; i++) {
      const x = random() * w, y = random() * h, size = random() > .93 ? 3 : 2;
      ctx.fillStyle = `rgba(255,255,255,${.35 + random() * .65})`;
      ctx.fillRect(Math.floor(x / step) * step, Math.floor(y / step) * step, size, size);
    }
  }
  draw();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(draw, 150);
  });

  document.querySelectorAll("a.locked").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      link.classList.remove("vibrate");
      void link.offsetWidth;
      link.classList.add("vibrate");
      setTimeout(() => link.classList.remove("vibrate"), 250);
    });
  });
})();
