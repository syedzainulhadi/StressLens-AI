// frontend/src/utils/helpers.js

/** Generate a short unique ID for messages */
export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Compare last two stress levels and return trend direction.
 * @param {string[]} history - array of "LOW" | "MEDIUM" | "HIGH"
 * @returns {"up" | "down" | "stable" | null}
 */
export function getStressTrend(history) {
  if (history.length < 2) return null;
  const order = { LOW: 1, MEDIUM: 2, HIGH: 3 };
  const last = order[history[history.length - 1]];
  const prev = order[history[history.length - 2]];
  if (last < prev) return "down";
  if (last > prev) return "up";
  return "stable";
}
