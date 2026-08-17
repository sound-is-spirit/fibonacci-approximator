"use strict";

// Deduplicated, strictly increasing Fibonacci subset used for Agile story points.
const fib = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

/**
 * Determine the adjacent / bounding Fibonacci values for a given input.
 * @param {number} input - a non-negative integer
 * @returns {{ lower: number, upper: number } | { error: string }}
 */
function adjacentFibonacci(input) {
  if (!Number.isInteger(input) || input < 0) {
    return { error: "Please enter a whole number that is zero or greater." };
  }

  const index = fib.indexOf(input);

  // Condition A: exact match in the sequence.
  if (index !== -1) {
    if (index === 0) {
      return { exact: true, lower: 0, upper: 1 };
    }
    if (index === fib.length - 1) {
      // Upper boundary: no succeeding value stored in the array.
      return { error: `${input} is the largest supported value; no succeeding boundary available.` };
    }
    return { exact: true, lower: fib[index - 1], upper: fib[index + 1] };
  }

  // Upper boundary overflow: input exceeds the maximum stored value.
  if (input > fib[fib.length - 1]) {
    return { error: `${input} exceeds the maximum supported value (${fib[fib.length - 1]}).` };
  }

  // Condition B: intermediate value — find i such that fib[i] < input < fib[i + 1].
  for (let i = 0; i < fib.length - 1; i++) {
    if (input > fib[i] && input < fib[i + 1]) {
      return { exact: false, lower: fib[i], upper: fib[i + 1] };
    }
  }

  // Defensive fallback (should be unreachable given the checks above).
  return { error: "Unable to determine adjacent Fibonacci values." };
}

function render(result) {
  const el = document.getElementById("result");
  el.classList.remove("error");
  el.textContent = "";

  if ("error" in result) {
    el.classList.add("error");
    el.textContent = result.error;
    return;
  }

  // Safe DOM construction — no innerHTML, all values via textContent.
  const values = document.createElement("span");
  values.className = "values";
  values.textContent = `${result.lower} and ${result.upper}`;

  const lead = result.exact
    ? "This is a Fibonacci value. Adjacent are: "
    : "Nearest Fibonacci values: ";

  el.appendChild(document.createTextNode(lead));
  el.appendChild(values);
}

function handleSubmit(event) {
  event.preventDefault();
  const raw = document.getElementById("story-input").value.trim();

  if (raw === "") {
    render({ error: "Please enter a user story number." });
    return;
  }

  render(adjacentFibonacci(Number(raw)));
}

document.getElementById("calc-form").addEventListener("submit", handleSubmit);
