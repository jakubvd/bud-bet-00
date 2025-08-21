document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".do-pob-pobierz_accordion");

  accordions.forEach((el) => {
    // Ustawienie początkowego stylu
    el.style.transition = "color 0.3s ease-in-out";
    el.style.color = "var(--text--dark-rd)";

    let isHovered = false;

    // Hover ON
    el.addEventListener("mouseenter", () => {
      isHovered = true;
      el.style.color = "var(--text--dark-st)";
    });

    // Hover OFF
    el.addEventListener("mouseleave", () => {
      isHovered = false;
      el.style.color = "var(--text--dark-rd)";
    });

    // Smart watchdog: co 100ms sprawdza czy Webflow wyczyścił style
    setInterval(() => {
      const currentColor = getComputedStyle(el).color;
      const correctColor = getComputedStyle(document.documentElement)
        .getPropertyValue(isHovered ? '--text--dark-st' : '--text--dark-rd')
        .trim();

      // Jeśli kolory się różnią – Webflow coś nadpisał
      if (!currentColor.includes(correctColor)) {
        el.style.color = `var(${isHovered ? '--text--dark-st' : '--text--dark-rd'})`;
      }
    }, 100); // co 100ms — lekko, ale skutecznie
  });
});