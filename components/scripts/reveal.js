const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("animate-fadeUp");
      entry.target.classList.remove("opacity-0", "translate-y-5");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal, .reveal-up").forEach((el, index) => {
  el.classList.add("opacity-0", "translate-y-5");
  if (el.classList.contains("reveal-up")) {
    el.style.transitionDelay = `${Math.min(index * 70, 220)}ms`;
  }
  observer.observe(el);
});
