const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll(".reveal, .reveal-up").forEach((el, index) => {
  if (el.classList.contains("reveal-up")) {
    el.style.transitionDelay = `${Math.min(index * 70, 220)}ms`;
  }
  observer.observe(el);
});

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

const progress = document.querySelector(".scroll-progress");
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

document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = -((y / rect.height) - 0.5) * 10;
    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
