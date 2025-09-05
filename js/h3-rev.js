document.addEventListener("DOMContentLoaded", function () {

  // Wait until all fonts are fully loaded
  document.fonts.ready.then(function () {
    // Find the element using a data attribute
    const heading = document.querySelector('[data-split-h3]');

    // Ensure SplitText is available and the heading element exists
    if (typeof SplitText !== 'undefined' && heading) {
      // Split text into lines (can also use 'words' or 'chars')
      const split = new SplitText(heading, { type: "lines" });
      
      // Hide all lines initially
      gsap.set(split.lines, { opacity: 0, y: 40 });

      // Create the GSAP animation
      gsap.to(split.lines, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    } else {
      console.warn("SplitText or target element not found.");
    }
  });
});
