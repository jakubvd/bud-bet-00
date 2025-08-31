document.addEventListener('DOMContentLoaded', () => {
    const folders = document.querySelectorAll('.hover-tooltip-folder');

    let globalTooltipShown = false;
    let globalTooltipDisabled = false;

    folders.forEach((folder) => {
      const tooltip = folder.querySelector('.tooltip-tag-wrap');

      folder.addEventListener('mouseenter', () => {
        if (!globalTooltipDisabled && !globalTooltipShown) {
          tooltip.style.display = 'block';
          globalTooltipShown = true;
        }
      });

      folder.addEventListener('mouseleave', () => {
        if (!globalTooltipDisabled) {
          tooltip.style.display = 'none';
        }
      });

      folder.addEventListener('click', () => {
        tooltip.style.display = 'none';
        globalTooltipDisabled = true;
      });
    });
  });
