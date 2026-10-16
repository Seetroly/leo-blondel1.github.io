(function () {
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Léger décalage des photos au défilement (page À propos)
  var speedEls = [].slice.call(document.querySelectorAll("[data-speed]"));
  var clipEls = [].slice.call(document.querySelectorAll("[data-clip]"));
  var ticking = false;
  function update() {
    var vh = window.innerHeight, y = window.scrollY;
    speedEls.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
      el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
    });
    clipEls.forEach(function (el) {
      el.style.backgroundPosition = "center " + (70 + Math.min(y / vh, 1) * 25).toFixed(1) + "%";
    });
    ticking = false;
  }
  if (!still && (speedEls.length || clipEls.length)) {
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Filtres de la page Réalisations
  var buttons = document.querySelectorAll(".filters button");
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.dataset.filter;
      buttons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      document.querySelectorAll(".grid .card").forEach(function (c) {
        c.hidden = !(f === "tout" || c.dataset.type === f);
      });
    });
  });
})();
