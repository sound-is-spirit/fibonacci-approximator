# Fibonacci Approximator

A minimal, privacy-first **Manifest V3** browser extension for Google Chrome and Microsoft Edge. Enter a number and get its adjacent (or nearest bounding) Fibonacci values.

## What it does

Given an integer input, the extension returns two Fibonacci values:

- **Exact match** in the sequence → the preceding and succeeding values (e.g. `34` → `21 and 55`).
- **Intermediate value** → the bounding interval (e.g. `60` → `55 and 89`).
- **Zero** → the seed bounds `0 and 1`.
- **Out of range / invalid** → a graceful message, no crash.

The sequence used is a deduplicated Fibonacci subset:
`[0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]`

## Privacy

100% local. **No data collection.** The extension only requests temporary access to the active tab (`activeTab`) when you click the icon to inject the user interface securely via a content script (`scripting`). The number you type is evaluated entirely locally, in-memory, and discarded when the overlay closes.

## Files

| File | Role |
|------|------|
| `manifest.json` | Manifest V3 config, permissions declaration (`activeTab`, `scripting`). |
| `background.js` | Service worker that manages state and injects the UI on user clicks. |
| `content.js` | Injects the minimalist UI overlay into the active webpage securely via Shadow DOM. |

## Install (unpacked, for local testing)

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this folder.
