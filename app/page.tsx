import { Suspense } from "react";
import { ClientInputs } from "./client-inputs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">


      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 px-8 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Hydration Input Demo
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Demonstrates the difference between restoring input state before vs
            after React hydration. Hydration is artificially delayed by 2 seconds.
          </p>
        </div>

        {/* Hydration status - updated by inline script, then by React */}
        <div
          id="hydration-status"
          className="flex items-center justify-center gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <span className="font-medium text-amber-600">Hydrating (2 seconds)...</span>
        </div>


        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/30">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700 dark:text-red-400">
                Problem: useState restoration
              </span>
            </div>
            {/* Server-rendered input that user can type in before hydration */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="regular-input"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Regular Input
              </label>
              <input
                id="regular-input"
                type="text"
                defaultValue=""
                placeholder="Type something..."
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
              <p id="regular-input-status" className="text-xs text-amber-600 dark:text-amber-400">
                Waiting for hydration...
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-green-300 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                Solution: Inline script pre-fill
              </span>
            </div>
            {/* Server-rendered input - inline script fills this before hydration */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="pre-hydrated-input"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Pre-Hydrated Input
              </label>
              <input
                id="pre-hydrated-input"
                type="text"
                defaultValue=""
                placeholder="Type something..."
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
              {/* Inline script placed RIGHT AFTER the input - runs synchronously */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    (function() {
                      try {
                        var saved = localStorage.getItem('pre-hydrated-input');
                        if (saved) {
                          var input = document.getElementById('pre-hydrated-input');
                          if (input) input.value = saved;
                        }
                      } catch (e) {}
                    })();
                  `,
                }}
              />
              <p id="pre-hydrated-input-status" className="text-xs text-amber-600 dark:text-amber-400">
                Waiting for hydration...
              </p>
            </div>
          </div>
        </div>

        {/* Client component that hydrates after delay and takes over the inputs */}
        <Suspense fallback={null}>
          <ClientInputs />
        </Suspense>

        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            What&apos;s happening?
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              <strong className="text-red-600 dark:text-red-400">
                Left (Problem):
              </strong>{" "}
              The input is empty in the server HTML. When React hydrates, it
              reads from localStorage and sets the value. Any typing before
              hydration gets overwritten.
            </p>
            <p>
              <strong className="text-green-600 dark:text-green-400">
                Right (Solution):
              </strong>{" "}
              An inline script fills the input before React loads. When React
              hydrates, it reads the current DOM value, preserving what the user
              sees.
            </p>
          </div>
        </div>

        <button
          id="clear-button"
          type="button"
          className="self-start rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Clear Storage & Reload
        </button>
      </main>
    </div>
  );
}
