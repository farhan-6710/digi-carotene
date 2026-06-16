export function getHashId(hash: string) {
  return hash.split("#")[1];
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    return true;
  }
  return false;
}

const SCROLL_RETRY_MS = 50;
const SCROLL_MAX_ATTEMPTS = 20;

/** Retries until the target section exists (e.g. after route change to home). */
export function scrollToSectionWhenReady(id: string) {
  let attempts = 0;

  const tryScroll = () => {
    if (scrollToSection(id)) return;
    if (attempts >= SCROLL_MAX_ATTEMPTS) return;

    attempts += 1;
    window.setTimeout(tryScroll, SCROLL_RETRY_MS);
  };

  tryScroll();
}

export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: 0, behavior });
}
