const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const contactButton = document.querySelector("[data-contact-toggle]");
const contactPopover = document.querySelector("[data-contact-popover]");
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyState = document.querySelector("[data-copy-state]");
const transcriptTabs = document.querySelectorAll("[data-transcript-tab]");
const transcriptPanels = document.querySelectorAll("[data-transcript-panel]");
const transcriptPreviewLabel = document.querySelector("[data-preview-label]");
const screenGallery = document.querySelector("[data-screen-gallery]");
const galleryPrevious = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");
const contactEmail = "brick@pixelbricktek.com";

const closeMenu = () => {
  navigation?.classList.remove("is-open");
  menuButton?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open menu");
};

menuButton?.addEventListener("click", () => {
  const isOpen = navigation?.classList.toggle("is-open") ?? false;
  menuButton.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", closeMenu);

transcriptTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedMode = tab.dataset.transcriptTab;

    transcriptTabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
    });

    transcriptPanels.forEach((panel) => {
      const isSelected = panel.dataset.transcriptPanel === selectedMode;
      panel.hidden = !isSelected;
      panel.classList.toggle("is-active", isSelected);
    });

    if (transcriptPreviewLabel) {
      transcriptPreviewLabel.textContent = selectedMode === "text" ? "Text view" : "Speakers view";
    }
  });
});

const scrollGallery = (direction) => {
  if (!screenGallery) return;
  const card = screenGallery.querySelector("article");
  const distance = card ? card.getBoundingClientRect().width + 16 : screenGallery.clientWidth * 0.8;
  screenGallery.scrollBy({ left: distance * direction, behavior: "smooth" });
};

galleryPrevious?.addEventListener("click", () => scrollGallery(-1));
galleryNext?.addEventListener("click", () => scrollGallery(1));

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

document.addEventListener("click", (event) => {
  if (!contactPopover?.classList.contains("is-visible")) return;
  if (contactPopover.contains(event.target) || contactButton?.contains(event.target)) return;
  contactPopover.classList.remove("is-visible");
});
