const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const contactButton = document.querySelector("[data-contact-toggle]");
const contactPopover = document.querySelector("[data-contact-popover]");
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyState = document.querySelector("[data-copy-state]");
const contactEmail = "brick@pixelbricktek.com";

menuButton?.addEventListener("click", () => {
  const isOpen = navigation?.classList.toggle("is-open") ?? false;
  menuButton.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open menu");
  });
});

window.addEventListener("resize", () => {
  navigation?.classList.remove("is-open");
  menuButton?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
});

contactButton?.addEventListener("click", () => {
  contactPopover?.classList.toggle("is-visible");
  if (copyState) copyState.textContent = "Tap to copy";
});

copyEmailButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(contactEmail);
    if (copyState) copyState.textContent = "Copied";
  } catch {
    if (copyState) copyState.textContent = "Select and copy";
  }
});
