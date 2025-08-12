(function () {
  // Skip animation for reduced motion users
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el) {
    const target = parseFloat(el.dataset.target || '0');
    const duration = parseInt(el.dataset.duration || '1200', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const format = el.dataset.format || 'none';
    const decimals = parseInt(el.dataset.decimals || '0', 10);

    let startTime;

    function formatNumber(val) {
      if (format === 'space') {
        return val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      }
      if (format === 'comma') {
        return val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      }
      return decimals > 0 ? val.toFixed(decimals) : Math.round(val);
    }

    function frame(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      const value = target * eased;
      el.textContent = prefix + formatNumber(value) + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = prefix + formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
})();
