export const PAUSE_RESET_MS = 3_000;
export const MIN_INTERVAL_MS = 120;
export const MAX_TAPS = 8;

export type Tempo = {
  taps: number[];
  bpm: number | null;
};

export const EMPTY_TEMPO: Tempo = { taps: [], bpm: null };

/** Keep a short rolling history so the display responds when the tempo changes. */
export function addTap(previous: Tempo, timestamp: number): Tempo {
  const last = previous.taps.at(-1);
  if (last !== undefined && timestamp - last < MIN_INTERVAL_MS) {
    return previous;
  }
  const taps =
    last === undefined || timestamp - last > PAUSE_RESET_MS
      ? [timestamp]
      : [...previous.taps, timestamp].slice(-MAX_TAPS);

  const elapsed = taps.at(-1)! - taps[0];
  const bpm =
    taps.length > 1 && elapsed > 0
      ? Math.round(((taps.length - 1) * 60_000) / elapsed)
      : null;

  return { taps, bpm };
}
