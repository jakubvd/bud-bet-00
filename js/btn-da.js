document.querySelectorAll('[data-padding-left]').forEach(el => {
  const paddingValue = el.getAttribute('data-padding-left'); // np. "2rem"
  if (paddingValue) {
    el.style.paddingLeft = paddingValue;
  }
});

document.querySelectorAll('[data-padding-right]').forEach(el => {
  const paddingValue = el.getAttribute('data-padding-right'); // np. "1.5rem"
  if (paddingValue) {
    el.style.paddingRight = paddingValue;
  }
});

