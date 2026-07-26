/* Atlas — shared behaviour. Loaded by every page. */
(function(){

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll('.rise');
  if(!('IntersectionObserver' in window)){
    reveals.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -10% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  }

  /* ---- filter an index list by type, hiding years that empty out ---- */
  var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  if(!filters.length) return;

  var items   = Array.prototype.slice.call(document.querySelectorAll('.item'));
  var years   = Array.prototype.slice.call(document.querySelectorAll('.year'));
  var countEl = document.querySelector('.count');

  function apply(type){
    items.forEach(function(it){
      it.hidden = !(type === 'all' || it.getAttribute('data-type') === type);
    });
    years.forEach(function(y){
      y.hidden = y.querySelectorAll('.item:not([hidden])').length === 0;
    });
    if(countEl){
      var n = items.filter(function(it){ return !it.hidden; }).length;
      countEl.textContent = n + (n === 1 ? ' entry' : ' entries');
    }
  }

  filters.forEach(function(f){
    f.addEventListener('click', function(){
      filters.forEach(function(o){ o.setAttribute('aria-pressed', o === f ? 'true' : 'false'); });
      apply(f.getAttribute('data-filter'));
    });
  });

  apply('all');
})();

/* -------------------------------------------------------------------------
   Light / dark switch.
   The theme itself is applied by a small script in <head> so the page never
   flashes. This part only handles clicking the button.
   ------------------------------------------------------------------------- */
(function () {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", function () {
    var now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", now);
    try { localStorage.setItem("theme", now); } catch (e) {}
  });
})();
