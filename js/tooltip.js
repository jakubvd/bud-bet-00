document.addEventListener('DOMContentLoaded', () => {
  const folders = document.querySelectorAll('.hover-tooltip-folder');

  // Sprawdzamy, czy użytkownik już widział tooltip w tej wizycie
  const tooltipSeen = sessionStorage.getItem('tooltipShown') === 'true';

  folders.forEach((folder) => {
    const tooltip = folder.querySelector('.tooltip-tag-wrap');

    folder.addEventListener('mouseenter', () => {
      if (!sessionStorage.getItem('tooltipShown')) {
        tooltip.style.display = 'block';
      }
    });

    folder.addEventListener('mouseleave', () => {
      if (!sessionStorage.getItem('tooltipShown')) {
        tooltip.style.display = 'none';
      }
    });

    folder.addEventListener('click', () => {
      tooltip.style.display = 'none';
      sessionStorage.setItem('tooltipShown', 'true');
    });
  });
});
