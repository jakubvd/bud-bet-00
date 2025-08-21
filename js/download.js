(function () {
  async function forceDownload(url, filename) {
    try {
      const res = await fetch(url, { credentials: 'omit', mode: 'cors' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename || url.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch (e) {
      // fallback -> otworzy się w nowym oknie jeśli CORS blokuje
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  document.querySelectorAll('[data-file="download"]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const url = el.getAttribute('data-file-url');
      const filename = el.getAttribute('data-file-name');
      if (url) forceDownload(url, filename);
    });
  });
})();
