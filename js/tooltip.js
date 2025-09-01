document.addEventListener('DOMContentLoaded', () => {
  // Only run on devices with hover capability (typically devices with a mouse)
  if (window.matchMedia('(hover: hover)').matches) {
    const folders = document.querySelectorAll('.hover-tooltip-folder');

    // Session-only control: resets on every page load
    let tooltipShownGlobal = false;

    folders.forEach((folder) => {
      const tooltip = folder.querySelector('.tooltip-tag-wrap');

      // Show tooltip on hover only if not already shown globally and this folder is not hidden
      folder.addEventListener('mouseenter', () => {
        if (!tooltipShownGlobal && !folder.classList.contains('tooltip-hidden')) {
          tooltip.style.opacity = '1';
          tooltip.style.visibility = 'visible';
          tooltip.style.pointerEvents = 'auto';
        }
      });

      folder.addEventListener('mouseleave', () => {
        if (!tooltipShownGlobal && !folder.classList.contains('tooltip-hidden')) {
          tooltip.style.opacity = '0';
          tooltip.style.visibility = 'hidden';
          tooltip.style.pointerEvents = 'none';
        }
      });

      folder.addEventListener('click', () => {
        if (!tooltipShownGlobal) {
          // Hide all tooltips globally
          document.querySelectorAll('.tooltip-tag-wrap').forEach((tooltipEl) => {
            tooltipEl.style.opacity = '0';
            tooltipEl.style.visibility = 'hidden';
            tooltipEl.style.pointerEvents = 'none';
          });

          // Prevent further tooltip display on any element
          document.querySelectorAll('.hover-tooltip-folder').forEach((el) => {
            el.classList.add('tooltip-hidden');
          });

          // Update session-only flag
          tooltipShownGlobal = true;
        }
      });
    });
  }
});
