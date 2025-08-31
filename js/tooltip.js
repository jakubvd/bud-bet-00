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
          tooltip.style.opacity = '1';
          tooltip.style.visibility = 'visible';
          tooltip.style.pointerEvents = 'auto';
        }
      });

      folder.addEventListener('mouseleave', () => {
        tooltipShown = sessionStorage.getItem('tooltipShownGlobal') === 'true';
        if (!tooltipShown && tooltip) {
          tooltip.style.opacity = '0';
          tooltip.style.visibility = 'hidden';
          tooltip.style.pointerEvents = 'none';
        }
      });

      folder.addEventListener('click', () => {
        if (!tooltipShown) {
          // Hide all tooltips globally
          document.querySelectorAll('.tooltip-tag-wrap').forEach((t) => {
            t.style.opacity = '0';
            t.style.visibility = 'hidden';
            t.style.pointerEvents = 'none';
          });

          // Update state and prevent future tooltips on hover
          tooltipShown = true;
          sessionStorage.setItem('tooltipShownGlobal', 'true');
        }
      });
    });
  }
});
