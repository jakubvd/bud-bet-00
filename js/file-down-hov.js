document.addEventListener("DOMContentLoaded", () => {
  // Select all accordion wrappers on the page
  const accordionWrappers = document.querySelectorAll(".do-pob-pobierz_accordion");

  accordionWrappers.forEach((wrapper) => {
    // Find the .do-pob-pobierz_question element inside each accordion
    const question = wrapper.querySelector(".do-pob-pobierz_question");
    if (!question) return;

    // Set initial transition and color style
    question.style.transition = "color 0.3s ease-in-out";
    question.style.color = "var(--text--dark-rd)";

    let isHovered = false;

    // On mouse enter: change color to highlight
    wrapper.addEventListener("mouseenter", () => {
      isHovered = true;
      question.style.color = "var(--text--dark-st)";
      question.style.borderBottom = "1px solid var(--icons--yellow-dark)";
    });

    // On mouse leave: reset color to default
    wrapper.addEventListener("mouseleave", () => {
      isHovered = false;
      question.style.color = "var(--text--dark-rd)";
      question.style.borderBottom = "none";
    });

    // Safety check: reapply the correct color every 100ms
    // This fixes Webflow interactions that override inline styles
    setInterval(() => {
      const currentColor = getComputedStyle(question).color;
      const expectedVar = isHovered ? '--text--dark-st' : '--text--dark-rd';
      const expectedColor = getComputedStyle(document.documentElement)
        .getPropertyValue(expectedVar)
        .trim();

      // If Webflow overwrote the color, reapply the correct one
      if (!currentColor.includes(expectedColor)) {
        question.style.color = `var(${expectedVar})`;
      }
    }, 100);
  });
});