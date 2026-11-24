// One-Sentence Absurd Invention Pitch
// Writes a single-sentence pitch to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The gate: UTF-8 text, 1-220 chars, non-blank, one sentence.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pitch: a fridge that polices midnight snacking with a tiny bouncer.
const ENTRY =
  "A fridge that locks the cheese drawer until you have eaten a vegetable, enforced by a tiny bouncer who stamps your hand and judges your midnight snacking.";

function isSingleSentence(text) {
  const trimmed = text.trim();
  // Exactly one sentence terminator, at the very end.
  const terminators = (trimmed.match(/[.!?]/g) || []).length;
  return terminators === 1 && /[.!?]$/.test(trimmed);
}

function validate(text) {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.trim().length === 0) throw new Error("entry must not be blank");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.length < 1 || text.length > 220) {
    throw new Error(`entry must be 1-220 chars, got ${text.length}`);
  }
  if (!isSingleSentence(text)) {
    throw new Error("entry must be exactly one sentence");
  }
}

function main() {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
}

main();
