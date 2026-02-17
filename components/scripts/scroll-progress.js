const progress = document.querySelector("#scrollProgress");

window.addEventListener(
  "scroll",
  () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${pct}%`;
  },
  { passive: true }
);
