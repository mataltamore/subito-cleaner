(() => {
  // Hide (not delete) so React/Next.js doesn't break when it re-renders.
  const HIDE_ATTR = "data-sc-hidden";

  const BLOCKED_TAGS = new Set(["Vetrina", "Urgente"]);

  function hideVetrina(root = document) {
    root.querySelectorAll('span[class*="index-module_tag"]').forEach((tag) => {
      if (!BLOCKED_TAGS.has(tag.textContent.trim())) return;
      const article = tag.closest("article");
      if (article && !article.hasAttribute(HIDE_ATTR)) {
        article.setAttribute(HIDE_ATTR, "");
      }
    });
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      hideVetrina();
    });
  }

  function start() {
    hideVetrina();
    new MutationObserver(schedule).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (document.documentElement) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
