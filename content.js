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
  host.style.cssText = "position: fixed; top: 20px; right: 190px; z-index: 2147483647; display: block;";
  document.documentElement.appendChild(host);

  const root = host.attachShadow({ mode: "closed" });

  const CSS = `
    * { box-sizing: border-box; }
    .card {
      width: 240px;
      padding: 12px;
      background: #fff;
      color: #111;
      font: 14px/1.4 system-ui, sans-serif;
      border: 2px solid #111;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .title { margin: 0; font-size: 14px; font-weight: 700; }
    .form { margin: 0; display: flex; flex-direction: column; gap: 8px; }
    .label { display: block; font-weight: 700; font-size: 14px; }
    .row { display: flex; flex-direction: column; gap: 8px; }
    .input {
      display: block; width: 100%; padding: 6px;
      background: #fff; color: #111;
      border: 1px solid #111; border-radius: 0;
      font: 14px/1.2 system-ui, sans-serif; outline: none;
    }
    .input:focus { box-shadow: 0 0 0 1px #111; }
    .button {
      display: block; width: 100%; padding: 6px;
      background: #111; color: #fff;
      border: 1px solid #111; border-radius: 0;
      font: 700 14px/1.2 system-ui, sans-serif;
      text-align: center; cursor: pointer;
    }
    .button:active { background: #fff; color: #111; }
    .result {
      padding: 8px; background: #fff; color: #111;
      border: 1px solid #111; border-style: dashed;
    }
    .result-text { font: 14px/1.5 system-ui, sans-serif; color: #111; word-break: break-word; }
    .result-text.error { color: #666; }
    .result-text .values { font-weight: 700; color: #111; }
  `;

  const sheet = document.createElement("style");
  sheet.textContent = CSS;
  root.appendChild(sheet);

  const main = document.createElement("main");
  main.className = "card";
  
  main.innerHTML = \`
    <h1 class="title">Fibonacci Approximator</h1>
    <form id="calc-form" class="form" novalidate>
      <label class="label" for="story-input">Enter Number</label>
      <div class="row">
        <input id="story-input" class="input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="19" placeholder="e.g. 34" autocomplete="off" />
        <button id="submit-btn" class="button" type="submit">Calculate</button>
      </div>
    </form>
    <section class="result" aria-live="polite">
      <div id="result" class="result-text">Enter a number to see its adjacent Fibonacci values.</div>
    </section>
  \`;
  
  root.appendChild(main);

  // -- Logic --
  const fib = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

  function adjacentFibonacci(input) {
    if (!Number.isInteger(input) || input < 0) return { error: "Please enter a whole number that is zero or greater." };
    const index = fib.indexOf(input);
    if (index !== -1) {
      if (index === 0) return { exact: true, lower: 0, upper: 1 };
      if (index === fib.length - 1) return { error: \`\${input} is the largest supported value; no succeeding boundary available.\` };
      return { exact: true, lower: fib[index - 1], upper: fib[index + 1] };
    }
    if (input > fib[fib.length - 1]) return { error: \`\${input} exceeds the maximum supported value (\${fib[fib.length - 1]}).\` };
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
    values.textContent = \`\${result.lower} and \${result.upper}\`;

    const lead = result.exact ? "This is a Fibonacci value. Adjacent are: " : "Nearest Fibonacci values: ";
    el.appendChild(document.createTextNode(lead));
    el.appendChild(values);
  }

  const input = root.getElementById("story-input");
  input.addEventListener("input", () => {
    const cleaned = input.value.replace(/\\D+/g, "");
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
})();
