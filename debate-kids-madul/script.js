
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".menu-button");
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  const closeBtn = document.querySelector(".drawer-close");

  function openDrawer(){
    drawer?.classList.add("open");
    backdrop?.classList.add("open");
    document.body.style.overflow = "hidden";
    openBtn?.setAttribute("aria-expanded","true");
  }
  function closeDrawer(){
    drawer?.classList.remove("open");
    backdrop?.classList.remove("open");
    document.body.style.overflow = "";
    openBtn?.setAttribute("aria-expanded","false");
  }
  openBtn?.addEventListener("click",openDrawer);
  closeBtn?.addEventListener("click",closeDrawer);
  backdrop?.addEventListener("click",closeDrawer);
  document.querySelectorAll(".mobile-drawer a").forEach(a=>a.addEventListener("click",closeDrawer));

  document.querySelectorAll("[data-year]").forEach(el=>el.textContent = new Date().getFullYear());

  if("IntersectionObserver" in window){
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12});
    document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el=>el.classList.add("show"));
  }
});
