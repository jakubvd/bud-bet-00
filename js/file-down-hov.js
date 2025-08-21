document.addEventListener("DOMContentLoaded", () => {
  const accordionWrappers = document.querySelectorAll(".do-pob-pobierz_accordion");

  accordionWrappers.forEach((wrapper) => {
    const question = wrapper.querySelector(".do-pob-pobierz_question");
    if (!question) return;

    // Ustawienie początkowego stylu
    question.style.transition = "color 0.3s ease-in-out";
    question.style.color = "var(--text--dark-rd)";

    let isHovered = false;

    // Hover ON
    wrapper.addEventListener("mouseenter", () => {
      isHovered = true;
      question.style.color = "var(--text--dark-st)";
    });

    // Hover OFF
    wrapper.addEventListener("mouseleave", () => {
      isHovered = false;
      question.style.color = "var(--text--dark-rd)";
    });

    // Watcher: sprawdza co 100ms, czy Webflow nadpisał kolor
    setInterval(() => {
      const currentColor = getComputedStyle(question).color;
      const expectedVar = isHovered ? '--text--dark-st' : '--text--dark-rd';
      const expectedColor = getComputedStyle(document.documentElement)
        .getPropertyValue(expectedVar)
        .trim();

      // Jeśli obecny kolor nie zawiera oczekiwanego — przywróć
      if (!currentColor.includes(expectedColor)) {
        question.style.color = `var(${expectedVar})`;
      }
    }, 100);
  });
});