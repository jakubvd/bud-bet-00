document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".do-pob-pobierz_accordion");

    accordions.forEach(el => {
      // Ustaw początkowy stan koloru + płynne przejście
      el.style.transition = "color 0.3s ease-in-out";
      el.style.color = "var(--text--dark-rd)";
      el.setAttribute("data-hovered", "false");

      // Hover ON
      el.addEventListener("mouseenter", () => {
        el.setAttribute("data-hovered", "true");
        el.style.color = "var(--text--dark-st)";
      });

      // Hover OFF
      el.addEventListener("mouseleave", () => {
        el.setAttribute("data-hovered", "false");
        el.style.color = "var(--text--dark-rd)";
      });

      // Obserwator reagujący na zmiany stylu (np. po animacji Webflow)
      const observer = new MutationObserver(() => {
        const isHovered = el.getAttribute("data-hovered") === "true";
        el.style.color = isHovered ? "var(--text--dark-st)" : "var(--text--dark-rd)";
      });

      observer.observe(el, {
        attributes: true,
        attributeFilter: ["style", "class", "data-w-id"],
      });
    });
  });