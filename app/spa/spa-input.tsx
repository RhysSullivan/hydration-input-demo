"use client";

import { useState, useEffect } from "react";

export function SPAInput() {
  const [value, setValue] = useState("");

  useEffect(() => {
    // Restore from localStorage immediately
    const saved = localStorage.getItem("spa-input") || "";
    setValue(saved);

    // Update the status indicator
    const status = document.getElementById("hydration-status");
    if (status) {
      status.innerHTML = `
        <div class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="font-medium text-green-600 dark:text-green-400">Component loaded!</span>
      `;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    localStorage.setItem("spa-input", newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="spa-input"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        SPA Input
      </label>
      <input
        id="spa-input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type something..."
        className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
      />
      <p className="text-xs text-green-600 dark:text-green-400">
        Loaded - value restored from localStorage
      </p>
    </div>
  );
}
