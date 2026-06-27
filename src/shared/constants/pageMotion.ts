/** Page transition on <main> — exit slides down, enter slides up. */
export const PAGE_MAIN_MOTION = {
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: 20, filter: "blur(4px)" },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};

const PAGE_STAGGER_EASE = [0.22, 1, 0.36, 1] as const;

/** Staggered fade + slide for page sections and cards. */
export const PAGE_STAGGER_CONTAINER = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const PAGE_STAGGER_ITEM = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: PAGE_STAGGER_EASE },
  },
};
