# Story Point Fibonacci Adjacency Calculator

A minimal, privacy-first **Manifest V3** browser extension for Google Chrome and
Microsoft Edge. Enter an Agile user-story number and get its adjacent (or
bounding) Fibonacci story-point values.

## What it does

Given an integer input, the extension returns two Fibonacci values:

- **Exact match** in the sequence → the preceding and succeeding values
  (e.g. `34` → `21 and 55`).
- **Intermediate value** → the bounding interval
  (e.g. `60` → `55 and 89`).
- **Zero** → the seed bounds `0 and 1`.
- **Out of range / invalid** → a graceful message, no crash.

The sequence used is a deduplicated Fibonacci subset:
`[0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]`

## Privacy

100% local. **No data collection.** The extension declares no permissions,
makes no network requests, and stores nothing. The number you type is used
in-memory and discarded when the popup closes.

## Files

| File | Role |
|------|------|
| `manifest.json` | Manifest V3 config, popup action, strict CSP |
| `popup.html` | Input field + result area |
| `popup.js` | Adjacency logic (XSS-safe DOM via `textContent`) |
| `styles.css` | Minimalist dark UI |

## Install (unpacked, for local testing)

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this folder.
