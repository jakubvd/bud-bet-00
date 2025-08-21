  document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll('.do-pob-pobierz_accordion');

    accordions.forEach(el => {
      // reset style to allow JS to override any inline Webflow style
      el.style.transition = 'color 0.3s ease-in-out';

      el.addEventListener('mouseenter', () => {
        el.style.color = 'var(--text--dark-st)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.color = 'var(--text--dark-rd)';
      });

      // Observer to detect DOM changes caused by Webflow interactions
      const observer = new MutationObserver(() => {
        // Reset style again in case Webflow animation changes it
        el.style.transition = 'color 0.3s ease-in-out';
      });

      observer.observe(el, { attributes: true, attributeFilter: ['style'] });
    });
  });