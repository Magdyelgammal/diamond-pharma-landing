export const motionTokens = {
  duration: { instant: .08, fast: .18, normal: .35, slow: .6, crawl: 1 },
  easing: { smooth: [.22, 1, .36, 1], sharp: [.4, 0, .2, 1], linear: [0, 0, 1, 1] },
  distance: { xs: 4, sm: 8, md: 16, lg: 24, xl: 48 },
  scale: { subtle: .98, press: .95, pop: 1.04 },
  stagger: .08,
};
export const springs = {
  snappy: { type: 'spring', stiffness: 300, damping: 30 },
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  bouncy: { type: 'spring', stiffness: 400, damping: 10 },
  instant: { type: 'spring', stiffness: 600, damping: 35 },
  release: { type: 'spring', stiffness: 200, damping: 20, restDelta: .001 },
};
export function shouldAnimate({ reduced = false, essential = false } = {}) {
  if (reduced) return false;
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4 && !essential) return false;
  return true;
}
