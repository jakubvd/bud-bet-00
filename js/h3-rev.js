document.addEventListener("DOMContentLoaded", function () {

  // Wait until all fonts are fully loaded
  document.fonts.ready.then(function () {
    // Find the element using a data attribute
    const heading = document.querySelector('[data-split-h3]');

    // Ensure SplitText is available and the heading element exists
    if (typeof SplitText !== 'undefined' && heading) {
      // Split text into words (can also use 'lines' or 'chars')
      const split = new SplitText(heading, { type: "words" });
      
      // Hide all words initially
      gsap.set(split.words, { opacity: 0, y: 120 });

      // Create the GSAP animation
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: heading,
          start: window.innerWidth <= 480 ? "top 95%" : "top 80%",
          toggleActions: "play none none none"
        }
      });
    } else {
      console.warn("SplitText or target element not found.");
    }
  });
});
