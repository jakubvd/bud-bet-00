document.addEventListener('DOMContentLoaded', () => {
  // Only run on devices with hover capability (typically devices with a mouse)
  if (window.matchMedia('(hover: hover)').matches) {
    const folders = document.querySelectorAll('.hover-tooltip-folder');

    // Use sessionStorage to track if tooltip has been shown this visit
    let tooltipShown = sessionStorage.getItem('tooltipShownGlobal') === 'true';

    folders.forEach((folder) => {
      const tooltip = folder.querySelector('.tooltip-tag-wrap');

      // Show tooltip on first hover only if not hidden
      folder.addEventListener('mouseenter', () => {
        tooltipShown = sessionStorage.getItem('tooltipShownGlobal') === 'true';

        if (!tooltipShown && tooltip && !folder.classList.contains('tooltip-hidden')) {
          tooltip.style.opacity = '1';
          tooltip.style.visibility = 'visible';
          tooltip.style.pointerEvents = 'auto';
        }
      });

      folder.addEventListener('mouseleave', () => {
        tooltipShown = sessionStorage.getItem('tooltipShownGlobal') === 'true';

        if (!tooltipShown && tooltip && !folder.classList.contains('tooltip-hidden')) {
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

          // Prevent tooltips from showing again by marking all folders
          document.querySelectorAll('.hover-tooltip-folder').forEach((f) => {
            f.classList.add('tooltip-hidden');
          });

          // Update sessionStorage to block tooltips for rest of visit
          tooltipShown = true;
          sessionStorage.setItem('tooltipShownGlobal', 'true');
        }
      });
    });
  }
});
