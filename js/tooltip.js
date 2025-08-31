
// Global flag to track if tooltip was dismissed in this session
let tooltipDismissed = sessionStorage.getItem('tooltipShown') === 'true';

document.addEventListener('DOMContentLoaded', () => {
  const folders = document.querySelectorAll('.hover-tooltip-folder');

  folders.forEach((folder) => {
    const tooltip = folder.querySelector('.tooltip-tag-wrap');

    folder.addEventListener('mouseenter', () => {
      if (!tooltipDismissed) {
        tooltip.style.display = 'block';
      }
    });

    folder.addEventListener('mouseleave', () => {
      if (!tooltipDismissed) {
        tooltip.style.display = 'none';
      }
    });

    folder.addEventListener('click', () => {
      tooltip.style.display = 'none';
      tooltipDismissed = true;
      sessionStorage.setItem('tooltipShown', 'true');
    });
  });
});
