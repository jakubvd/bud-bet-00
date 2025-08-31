document.addEventListener('DOMContentLoaded', () => {
  // Only run on devices with hover capability (typically devices with a mouse)
  if (window.matchMedia('(hover: hover)').matches) {
    const folders = document.querySelectorAll('.hover-tooltip-folder');

    // Use sessionStorage to track if tooltip has been shown this visit
    let tooltipShown = sessionStorage.getItem('tooltipShownGlobal') === 'true';

    folders.forEach((folder) => {
      const tooltip = folder.querySelector('.tooltip-tag-wrap');

      // Show tooltip on first hover only
      folder.addEventListener('mouseenter', () => {
        // Re-check sessionStorage in case another element triggered it
        tooltipShown = sessionStorage.getItem('tooltipShownGlobal') === 'true';
        if (!tooltipShown && tooltip) {
          tooltip.style.display = 'block';
        }
      });

      folder.addEventListener('mouseleave', () => {
        tooltipShown = sessionStorage.getItem('tooltipShownGlobal') === 'true';
        if (!tooltipShown && tooltip) {
          tooltip.style.display = 'none';
        }
      });

      folder.addEventListener('click', () => {
        if (!tooltipShown) {
          // Hide tooltip on click and disable future tooltips
          folders.forEach((f) => {
            const t = f.querySelector('.tooltip-tag-wrap');
            if (t) t.style.display = 'none';
          });

          tooltipShown = true;
          sessionStorage.setItem('tooltipShownGlobal', 'true');
        }
      });
    });
  }
});
