  document.addEventListener('DOMContentLoaded', () => {
    const folders = document.querySelectorAll('.hover-tooltip-folder');

    folders.forEach((folder) => {
      // Domyślnie tooltip pokazuje się tylko 1 raz
      let tooltipShown = false;
      let tooltipDisabled = false;

      const tooltip = folder.querySelector('.tooltip-tag-wrap');

      folder.addEventListener('mouseenter', () => {
        if (!tooltipDisabled && !tooltipShown) {
          tooltip.style.display = 'block';
          tooltipShown = true;
        }
      });

      folder.addEventListener('mouseleave', () => {
        if (!tooltipDisabled) {
          tooltip.style.display = 'none';
        }
      });

      folder.addEventListener('click', () => {
        tooltip.style.display = 'none';
        tooltipDisabled = true;
      });
    });
  });
