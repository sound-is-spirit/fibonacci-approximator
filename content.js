(function () {
  "use strict";

  const PANEL_ID = "fibonacci-approximator-panel";
  const existing = document.getElementById(PANEL_ID);

  if (existing) {
    existing.style.display = existing.style.display === "none" ? "block" : "none";
    return;
  }

  const host = document.createElement("div");
  host.id = PANEL_ID;
  host.style.cssText = "position: fixed; top: 20px; right: 20px; z-index: 2147483647; display: block;";
  document.documentElement.appendChild(host);

  const root = host.attachShadow({ mode: "closed" });

  // Visual language mirrors WWWire's floating toolbar: monochrome, #f0f0f0
  // ground inside a 2px dashed frame, 1.5px hairline controls at 4px radius,
  // #555 for secondary text and #ccc for section rules.
  const CSS = `
    * { box-sizing: border-box; }
    .panel {
      width: 220px; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      background: #f0f0f0; border: 2px dashed #111; border-radius: 8px; color: #111;
      font: 14px/1.4 system-ui, sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      user-select: none; -webkit-user-select: none;
      /* Belt and braces: a host page cannot reach in here, but the shadow root
         inherits a few properties from the host element regardless. */
      -webkit-text-fill-color: #111;
    }
    h2, .heading {
      font-size: 15px; font-weight: 700; margin: 0 0 8px;
      display: flex; align-items: center; gap: 4px;
    }
    .version { font-size: 11px; font-weight: 400; margin-left: 4px; color: #555; -webkit-text-fill-color: #555; }
    .hint { font-weight: 400; font-size: 0.85em; color: #555; -webkit-text-fill-color: #555; }
    section + section { border-top: 1px solid #ccc; padding-top: 12px; }
    .close {
      display: inline-flex; align-items: center; justify-content: center;
      margin-left: auto; width: 18px; height: 18px; padding: 0;
      background: none; border: 0; cursor: pointer; opacity: 0.7;
    }
    .close:hover { opacity: 1; }
    .close svg {
      width: 14px; height: 14px; fill: none;
      stroke: #111; stroke-width: 1.5; stroke-linecap: round;
    }
    .form { margin: 0; display: flex; flex-direction: column; gap: 8px; }
    .input {
      display: block; width: 100%; padding: 8px 12px;
      background: #fff; color: #111; -webkit-text-fill-color: #111;
      border: 1.5px solid #111; border-radius: 4px;
      font: 13px/1.2 system-ui, sans-serif; outline: none;
      user-select: text; -webkit-user-select: text;
    }
    .input::placeholder { color: #555; -webkit-text-fill-color: #555; }
    .input:focus { box-shadow: 0 0 0 1.5px #111; }
    .button {
      display: flex; align-items: center; justify-content: flex-start; gap: 10px;
      width: 100%; padding: 8px 12px;
      background: #f0f0f0; color: #111; -webkit-text-fill-color: #111;
      border: 1.5px solid #111; border-radius: 4px;
      font: 600 13px/1.2 system-ui, sans-serif; cursor: pointer;
    }
    .button:hover { background: #e4e4e4; }
    .button:active { background: #d8d8d8; }
    .button svg {
      width: 16px; height: 16px; flex-shrink: 0; fill: none;
      stroke: #111; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round;
    }
    .result {
      padding: 8px; background: #fff;
      border: 1.5px dashed #111; border-radius: 4px;
    }
    .result-text { font: 13px/1.5 system-ui, sans-serif; color: #111; word-break: break-word; }
    .result-text.error { color: #555; -webkit-text-fill-color: #555; }
    .result-text .values {
      display: block; margin-top: 4px;
      font-weight: 700; font-size: 15px; color: #111;
    }
  `;

  const sheet = document.createElement("style");
  sheet.textContent = CSS;
  root.appendChild(sheet);

  const version = chrome.runtime.getManifest().version;
  const closeIcon = `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
  const calcIcon = `<svg viewBox="0 0 24 24"><path d="M5 9h14M5 15h14"/></svg>`;

  const main = document.createElement("main");
  main.className = "panel";

  main.innerHTML = `
    <h2>
      <span>Fibonacci Approx<span class="version">v${version}</span></span>
      <button id="close-btn" class="close" type="button" aria-label="Close">${closeIcon}</button>
    </h2>
    <section>
      <form id="calc-form" class="form" novalidate>
        <label class="heading" for="number-input">Number<span class="hint">(0 - 6765)</span></label>
        <input id="number-input" class="input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="19" placeholder="e.g. 34" autocomplete="off" />
        <button id="submit-btn" class="button" type="submit">${calcIcon}<span>Calculate</span></button>
      </form>
    </section>
    <section>
      <h2>Result</h2>
      <div class="result" aria-live="polite">
        <div id="result" class="result-text">Enter a number to see its adjacent Fibonacci values.</div>
      </div>
    </section>
  `;

  root.appendChild(main);

  // -- Logic --
  const fib = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

  function adjacentFibonacci(input) {
    if (!Number.isInteger(input) || input < 0) return { error: "Please enter a whole number that is zero or greater." };
    const index = fib.indexOf(input);
    if (index !== -1) {
      if (index === 0) return { exact: true, lower: 0, upper: 1 };
      if (index === fib.length - 1) return { error: `${input} is the largest supported value; no succeeding boundary available.` };
      return { exact: true, lower: fib[index - 1], upper: fib[index + 1] };
    }
    if (input > fib[fib.length - 1]) return { error: `${input} exceeds the maximum supported value (${fib[fib.length - 1]}).` };
    for (let i = 0; i < fib.length - 1; i++) {
      if (input > fib[i] && input < fib[i + 1]) return { exact: false, lower: fib[i], upper: fib[i + 1] };
    }
    return { error: "Unable to determine adjacent Fibonacci values." };
  }

  function render(result) {
    const el = root.getElementById("result");
    el.classList.remove("error");
    el.textContent = "";

    if ("error" in result) {
      el.classList.add("error");
      el.textContent = result.error;
      return;
    }

    const values = document.createElement("span");
    values.className = "values";
    values.textContent = `${result.lower} and ${result.upper}`;

    const lead = result.exact ? "This is a Fibonacci value. Adjacent are:" : "Nearest Fibonacci values:";
    el.appendChild(document.createTextNode(lead));
    el.appendChild(values);
  }

  const input = root.getElementById("number-input");
  input.addEventListener("input", () => {
    const cleaned = input.value.replace(/\D+/g, "");
    if (cleaned !== input.value) input.value = cleaned;
  });

  root.getElementById("calc-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    if (raw === "") {
      render({ error: "Please enter a number." });
      return;
    }
    render(adjacentFibonacci(Number(raw)));
  });

  root.getElementById("close-btn").addEventListener("click", () => {
    host.style.display = "none";
  });
})();
