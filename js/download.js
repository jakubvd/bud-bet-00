(function () {
  // delegacja zdarzeń – działa dla wszystkich przyszłych przycisków
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-file="download"]');
    if (!btn) return;

    // bierzemy URL z data-file-url ALBO z href
    const url = btn.getAttribute('data-file-url') || btn.getAttribute('href');
    const filename = btn.getAttribute('data-file-name') || (url ? url.split('/').pop() : '');

    if (!url) return; // brak URL – pozwól nic nie robić

    e.preventDefault(); // przejmujemy klik

    // spróbuj wymusić pobranie przez blob
    forceDownload(url, filename).catch(() => {
      // awaryjnie otwórz w nowej karcie (CORS, etc.)
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }, false);

  async function forceDownload(url, filename) {
    const res = await fetch(url, { mode: 'cors', credentials: 'omit' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const blob = await res.blob();

    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || 'download';
    // Safari/iOS lubi, gdy element jest w DOM
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  }
})();