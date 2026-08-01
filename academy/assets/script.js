
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-btn");
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  const close = document.querySelector(".close-btn");
  const closeDrawer = () => {
    drawer?.classList.remove("open");
    backdrop?.classList.remove("open");
    btn?.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
  };
  const openDrawer = () => {
    drawer?.classList.add("open");
    backdrop?.classList.add("open");
    btn?.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden";
  };
  btn?.addEventListener("click", openDrawer);
  close?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);
  document.querySelectorAll(".drawer-nav a").forEach(a => a.addEventListener("click", closeDrawer));
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if(e.isIntersecting){e.target.classList.add("show");obs.unobserve(e.target);}
    }), {threshold:.12});
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("show"));
  }
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});
