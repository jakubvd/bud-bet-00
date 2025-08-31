document.addEventListener('DOMContentLoaded', () => {
  const folders = document.querySelectorAll('.hover-tooltip-folder');

  // Use sessionStorage to track if tooltip has been shown this visit
  let tooltipShown = sessionStorage.getItem('tooltipShownGlobal') === 'true';

  folders.forEach((folder) => {
    const tooltip = folder.querySelector('.tooltip-tag-wrap');

    // Show tooltip on first hover only
    folder.addEventListener('mouseenter', () => {
      if (!tooltipShown && tooltip) {
        tooltip.style.display = 'block';
      }
    });

    folder.addEventListener('mouseleave', () => {
      if (!tooltipShown && tooltip) {
        tooltip.style.display = 'none';
      }
    });

    folder.addEventListener('click', () => {
      if (!tooltipShown && tooltip) {
        tooltip.style.display = 'none';
        tooltipShown = true;
        sessionStorage.setItem('tooltipShownGlobal', 'true');
      }
    });
  });
});
