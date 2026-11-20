// Homepage behaviour: header edge, mobile menu, directions switcher/accordion, mobile action bar.
// Everything works as plain content without this script.

const desktop = window.matchMedia("(min-width: 1024px)");
const mobile = window.matchMedia("(max-width: 767px)");

// Header: thin bottom line after scrolling.
const header = document.querySelector<HTMLElement>("[data-header]");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu (<details>): closes after choosing an anchor, on Escape and on desktop widths.
const menu = document.querySelector<HTMLDetailsElement>("[data-menu]");
if (menu) {
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { menu.open = false; }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }
  });
  menu.addEventListener("toggle", () => document.documentElement.classList.toggle("menu-open", menu.open));
}

// Directions: one open panel on desktop (switcher), free accordion below 1024 px.
const dirs = document.querySelector<HTMLElement>("[data-dirs]");
if (dirs) {
  const buttons = Array.from(dirs.querySelectorAll<HTMLButtonElement>(".dir__btn"));
  const panelOf = (b: HTMLButtonElement) => document.getElementById(b.getAttribute("aria-controls") ?? "");
  const set = (b: HTMLButtonElement, open: boolean) => {
    b.setAttribute("aria-expanded", String(open));
    panelOf(b)?.classList.toggle("is-open", open);
  };
  const openOnly = (target: HTMLButtonElement) => buttons.forEach((b) => set(b, b === target));
  buttons.forEach((b, i) => {
    b.addEventListener("click", () => {
      const isOpen = b.getAttribute("aria-expanded") === "true";
      if (desktop.matches) { if (!isOpen) openOnly(b); }
      else set(b, !isOpen);
    });
    b.addEventListener("keydown", (e) => {
      if (!desktop.matches) return;
      const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
      if (!step && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      const next = e.key === "Home" ? 0 : e.key === "End" ? buttons.length - 1 : (i + step + buttons.length) % buttons.length;
      buttons[next].focus();
      openOnly(buttons[next]);
    });
  });
  // Switching to desktop: keep exactly one panel open.
  const normalise = () => {
    if (!desktop.matches) return;
    const open = buttons.filter((b) => b.getAttribute("aria-expanded") === "true");
    openOnly(open[0] ?? buttons[0]);
  };
  desktop.addEventListener("change", normalise);
  normalise();
}

// Mobile action bar: shows once the hero actions have scrolled away.
const bar = document.querySelector<HTMLElement>("[data-action-bar]");
const heroCta = document.querySelector<HTMLElement>("[data-hero-cta]");
if (bar && heroCta && "IntersectionObserver" in window) {
  bar.classList.add("is-managed");
  const io = new IntersectionObserver(([e]) => {
    const past = !e.isIntersecting && e.boundingClientRect.top < 0;
    bar.classList.toggle("is-shown", past);
    bar.toggleAttribute("inert", !past && mobile.matches);
  });
  io.observe(heroCta);
}
