  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.do-pob-pobierz_accordion');

    elements.forEach(el => {
      // 1. Ustaw transition tylko raz
      el.style.transition = 'color 0.3s ease-in-out';

      // 2. Obsługa "symulowanego hovera" przez data-state
      el.addEventListener('mouseenter', () => {
        el.setAttribute('data-state', 'hover');
        el.style.color = 'var(--text--dark-st)';
      });

      el.addEventListener('mouseleave', () => {
        el.setAttribute('data-state', 'normal');
        el.style.color = 'var(--text--dark-rd)';
      });

      // 3. MutationObserver – obserwuj zmiany Webflow (np. przy otwarciu FAQ)
      const observer = new MutationObserver(() => {
        // Jeśli jesteśmy w stanie "hover", przywróć kolor
        if (el.getAttribute('data-state') === 'hover') {
          el.style.color = 'var(--text--dark-st)';
        } else {
          el.style.color = 'var(--text--dark-rd)';
        }
        // Przywróć transition po zmianach
        el.style.transition = 'color 0.3s ease-in-out';
      });

      observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
    });
  });
