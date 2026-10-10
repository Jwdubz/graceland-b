/* Blue Pole motion. Kit owns Lenis, splits, and the Pause button.
   Chapel is held until the couple takes hands, then it stays. */
(function () {
  var PAYOFF_AT = 27.95;
  var KIT = window.KIT;
  if (!KIT) return;

  function bezier(x1, y1, x2, y2) {
    function A(a, b) { return 1 - 3 * b + 3 * a; }
    function B(a, b) { return 3 * b - 6 * a; }
    function C(a) { return 3 * a; }
    function calc(t, a, b) { return ((A(a, b) * t + B(a, b)) * t + C(a)) * t; }
    function slope(t, a, b) { return 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a); }
    return function (x) {
      var t = x, i, s;
      for (i = 0; i < 6; i++) {
        s = slope(t, x1, x2);
        if (Math.abs(s) < 1e-4) break;
        t = t - (calc(t, x1, x2) - x) / s;
      }
      return calc(Math.max(0, Math.min(1, t)), y1, y2);
    };
  }
  var backEase = bezier(0.7, 0, 0.3, 1);

  KIT.hooks.intro = function (g, ctx) {
    var payoff = document.querySelector("[data-payoff]");
    var lines = (ctx.heroLines || []).filter(function (el) { return el !== payoff; });
    var tl = g.timeline({ delay: 0.1 });
    if (ctx.loader) tl.to(ctx.loader, { clipPath: "inset(0 0 100% 0)", duration: 1.05, ease: "expo.inOut" }, 0.15);
    tl.add(function () { lines.forEach(function (el) { el._done = true; }); }, 0.72);
    var risen = lines.map(function (el) { return el._lines; }).flat().filter(Boolean);
    if (risen.length) tl.to(risen, { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.14 }, 0.72);
    tl.add(function () {
      if (ctx.hero) ctx.hero.querySelectorAll("[data-reveal]").forEach(ctx.reveal);
    }, 1.25);
    if (ctx.loader) tl.set(ctx.loader, { display: "none" });
    return tl;
  };

  function showPayoff() {
    var el = document.querySelector("[data-payoff]");
    if (!el || el._done || !window.KIT || !window.KIT.reveal) return;
    window.KIT.reveal(el);
  }

  function filmBox(v) {
    return v.closest(".hero__stage, .king__film") || v;
  }
  function filmOnScreen(v) {
    var box = filmBox(v);
    var cs = getComputedStyle(box);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    var r = box.getBoundingClientRect();
    return r.bottom > 80 && r.top < innerHeight - 40;
  }

  KIT.hooks.afterBoot.push(function () {
    KIT.playFilms = function () {
      if (KIT.paused) return;
      document.querySelectorAll("video.film").forEach(function (v) {
        if (v.classList.contains("nofilm")) return;
        if (filmOnScreen(v)) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else v.pause();
      });
    };

    var vid = document.getElementById("film-hero");
    if (vid) {
      vid.addEventListener("timeupdate", function () {
        if (vid.currentTime >= PAYOFF_AT) showPayoff();
      });
      vid.addEventListener("error", showPayoff);
    }
    setTimeout(showPayoff, 36000);

    var motion = document.querySelector(".motion");
    if (motion) motion.addEventListener("click", function () {
      if (document.documentElement.classList.contains("is-paused")) showPayoff();
    });

    function onScroll() {
      if (!KIT.paused) KIT.playFilms();
      var hero = document.querySelector(".hero");
      if (hero && hero.getBoundingClientRect().bottom < 0) showPayoff();
    }
    if (KIT.lenis) KIT.lenis.on("scroll", onScroll);
    addEventListener("scroll", onScroll, { passive: true });

    var top = document.querySelector("[data-top]");
    if (top && KIT.lenis) top.addEventListener("click", function () {
      KIT.lenis.scrollTo(0, { duration: 1.85, easing: backEase });
    });
  });
})();
