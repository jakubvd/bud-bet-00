(function () {
  /**
   * Try to force a real file download.
   * - fetch → blob → ObjectURL → <a download>
   * - decodes %20 etc.
   * - removes Webflow prefix before first "_" in the filename
   * - falls back to opening in a new tab if CORS blocks blob
   */
  async function forceDownload(url, filename) {
    const res = await fetch(url, { mode: "cors", credentials: "omit" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const blob = await res.blob();

    const blobUrl = URL.createObjectURL(blob);
    const cleanName = deriveFileName(url, filename);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = cleanName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  }

  function deriveFileName(url, explicitName) {
    if (explicitName) return explicitName;
    try {
      const u = new URL(url, window.location.href);
      const raw = u.pathname.split("/").pop() || "download";
      const decoded = decodeURIComponent(raw);
      const idx = decoded.indexOf("_");
      return idx > -1 ? decoded.slice(idx + 1) : decoded; // strip first prefix only
    } catch (_) {
      const raw = (url.split("?")[0].split("#")[0].split("/").pop()) || "download";
      const decoded = decodeURIComponent(raw);
      const idx = decoded.indexOf("_");
      return idx > -1 ? decoded.slice(idx + 1) : decoded;
    }
  }

  // Delegated click: works for any current/future element with data-file="download"
  document.addEventListener(
    "click",
    function (e) {
      const btn = e.target.closest('[data-file="download"]');
      if (!btn) return;

      const url = btn.getAttribute("data-file-url") || btn.getAttribute("href");
      const filename = btn.getAttribute("data-file-name");
      if (!url) return;

      e.preventDefault();

      btn.setAttribute("aria-busy", "true");
      forceDownload(url, filename)
        .catch(() => {
          // CORS blocked blob → open in new tab instead
          window.open(url, "_blank", "noopener,noreferrer");
        })
        .finally(() => {
          btn.removeAttribute("aria-busy");
        });
    },
    false
  );
})();