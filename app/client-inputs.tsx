"use client";

import { useEffect, useState } from "react";

export function ClientInputs() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Simulate slow hydration with 2 second delay
    const timer = setTimeout(() => {
      // Take over the regular input - this overwrites any user typing!
      const regularInput = document.getElementById(
        "regular-input"
      ) as HTMLInputElement;
      if (regularInput) {
        const savedValue = localStorage.getItem("regular-input") || "";
        regularInput.value = savedValue; // OVERWRITES user typing!

        // Set up controlled behavior
        regularInput.addEventListener("input", (e) => {
          const target = e.target as HTMLInputElement;
          localStorage.setItem("regular-input", target.value);
        });
      }

      // Take over the pre-hydrated input - reads current DOM value (preserves user input)
      const preHydratedInput = document.getElementById(
        "pre-hydrated-input"
      ) as HTMLInputElement;
      if (preHydratedInput) {
        // Don't overwrite - just read the current value and sync to localStorage
        const currentValue = preHydratedInput.value;
        localStorage.setItem("pre-hydrated-input", currentValue);

        // Set up controlled behavior
        preHydratedInput.addEventListener("input", (e) => {
          const target = e.target as HTMLInputElement;
          localStorage.setItem("pre-hydrated-input", target.value);
        });
      }

      // Update status indicators
      const hydrationStatus = document.getElementById("hydration-status");
      if (hydrationStatus) {
        hydrationStatus.innerHTML = `
          <div class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="font-medium text-green-600 dark:text-green-400">Hydration complete!</span>
        `;
      }

      const regularStatus = document.getElementById("regular-input-status");
      if (regularStatus) {
        regularStatus.className = "text-xs text-green-600 dark:text-green-400";
        regularStatus.textContent = "Hydrated - restored from localStorage";
      }

      const preHydratedStatus = document.getElementById(
        "pre-hydrated-input-status"
      );
      if (preHydratedStatus) {
        preHydratedStatus.className =
          "text-xs text-green-600 dark:text-green-400";
        preHydratedStatus.textContent =
          "Hydrated - value was visible immediately!";
      }

      // Set up clear button
      const clearButton = document.getElementById("clear-button");
      if (clearButton) {
        clearButton.addEventListener("click", () => {
          localStorage.removeItem("regular-input");
          localStorage.removeItem("pre-hydrated-input");
          window.location.reload();
        });
      }

      setHydrated(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything visible
  // It just takes over the server-rendered inputs after the delay
  return null;
}
