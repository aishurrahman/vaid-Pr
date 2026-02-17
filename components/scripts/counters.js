const statsSection = document.querySelector("#stats");
const counters = document.querySelectorAll(".counter");
let hasCounted = false;

function animateCounter(el) {
  const target = Number(el.dataset.target || 0);
  const suffix = el.dataset.suffix || "";
  const duration = 1350;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        counters.forEach(animateCounter);
        statsObserver.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  statsObserver.observe(statsSection);
}
