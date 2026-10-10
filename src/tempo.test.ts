import assert from "node:assert/strict";
import test from "node:test";
import {
  addTap,
  EMPTY_TEMPO,
  MAX_TAPS,
  MIN_INTERVAL_MS,
  PAUSE_RESET_MS,
} from "./tempo";

test("measures BPM across tap intervals", () => {
  const first = addTap(EMPTY_TEMPO, 0);
  assert.equal(first.bpm, null);
  const second = addTap(first, 500);
  assert.equal(second.bpm, 120);
  assert.equal(addTap(second, 1_000).bpm, 120);
});

test("uses recent taps to follow a changing tempo", () => {
  let tempo = EMPTY_TEMPO;
  for (let i = 0; i < MAX_TAPS + 2; i++) tempo = addTap(tempo, i * 500);
  assert.equal(tempo.taps.length, MAX_TAPS);
  assert.equal(tempo.bpm, 120);
});

test("starts a new count after a pause", () => {
  const tempo = addTap(addTap(EMPTY_TEMPO, 0), 500);
  const restarted = addTap(tempo, 500 + PAUSE_RESET_MS + 1);
  assert.deepEqual(restarted.taps, [500 + PAUSE_RESET_MS + 1]);
  assert.equal(restarted.bpm, null);
});

test("ignores key repeats too close to the last tap", () => {
  const first = addTap(EMPTY_TEMPO, 0);
  assert.equal(addTap(first, MIN_INTERVAL_MS - 1), first);
  assert.equal(addTap(first, MIN_INTERVAL_MS).taps.length, 2);
});
