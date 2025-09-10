(function () {
  // Respect reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseFloat(el.dataset.target || '0');
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const formatted = formatPaddedNumber(target, decimals, String(target).length);
      el.textContent = formatted;
    });
    return;
  }

  // Stronger ease-out that noticeably slows near the end
  function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

  /**
   * Format a number without separators and left‑pad with zeros to a fixed width
   * to prevent layout shift while counting (keeps width of "00", "0000", etc.).
   */
  function formatPaddedNumber(value, decimals, padLength) {
    if (decimals > 0) {
      // For this project we expect integers; keep support just in case
      const fixed = value.toFixed(decimals);
      const [intPart, decPart] = fixed.split('.');
      const padded = intPart.padStart(padLength, '0');
      return decPart ? `${padded}.${decPart}` : padded;
    }
    const intVal = Math.round(value);
    return String(intVal).padStart(padLength, '0');
  }

  function animateCount(el) {
    const target = parseFloat(el.dataset.target || '0');
    const duration = parseInt(el.dataset.duration || '4000', 10); // default: 4s
    const decimals = parseInt(el.dataset.decimals || '0', 10);

    const row = el.dataset.row || '';
    let speedMultiplier = 1;

    switch (row) {
      case '2':
        speedMultiplier = 0.4; // Slow down 2nd row (100 000)
        break;
      case '3':
        speedMultiplier = 0.8;
        break;
      case '4':
        speedMultiplier = 1.2;
        break;
      default:
        speedMultiplier = 1; // row 1 and others stay at normal speed
    }

    const adjustedDuration = duration / speedMultiplier;

    // Determine pad length from current text (e.g., "00", "0000") or fallback to target length
    const initialDigits = (el.textContent.match(/\d/g) || []).length;
    const padLength = initialDigits || String(Math.floor(target)).length || 1;

    let startTime;

    function frame(now) {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / adjustedDuration);
      const eased = easeOutQuint(t);
      const current = target * eased;
      el.textContent = formatPaddedNumber(current, decimals, padLength);
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        // Snap exactly
        el.textContent = formatPaddedNumber(target, decimals, padLength);
      }
    }

    requestAnimationFrame(frame);
  }

  // Observe and run once when visible
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.done === 'true') { io.unobserve(el); return; }
      animateCount(el);
      el.dataset.done = 'true';
      io.unobserve(el);
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });

  counters.forEach((el) => io.observe(el));
})();
