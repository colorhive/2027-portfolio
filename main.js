const nav = document.querySelector("[data-nav]");
const links = [...document.querySelectorAll(".site-nav nav a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function onScroll() {
  nav.classList.toggle("scrolled", window.scrollY > 12);
  const mark = window.scrollY + window.innerHeight * 0.35;
  let current = null;
  for (const section of sections) {
    if (section.offsetTop <= mark) current = section;
  }
  for (const link of links) {
    const active = current && link.getAttribute("href") === `#${current.id}`;
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
