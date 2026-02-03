import { Suspense } from "react";
import { SPAInput } from "./spa-input";

export default function SPAPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 px-8 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            SPA Input Demo
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            This input only renders on the client (no SSR). The shell is cached
            and the input loads via client-side JS. Simulates 2-second load delay.
          </p>
        </div>

        {/* Hydration status */}
        <div
          id="hydration-status"
          className="flex items-center justify-center gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <span className="font-medium text-amber-600">Loading input component...</span>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            How it works
          </h2>
          <ul className="list-inside list-disc space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>The page shell is server-rendered and cached</li>
            <li>The input component is loaded only on the client</li>
            <li>A loading skeleton is shown while the component loads</li>
            <li>Once loaded, value is restored from localStorage</li>
            <li>No hydration mismatch issues since input is client-only</li>
          </ul>
        </div>

        <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/30">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
              SPA Pattern: Client-only input
            </span>
          </div>
          <Suspense
            fallback={
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  SPA Input
                </div>
                <div className="h-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Loading component...
                </p>
              </div>
            }
          >
            <SPAInput />
          </Suspense>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Trade-offs
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              <strong className="text-green-600 dark:text-green-400">
                Pros:
              </strong>{" "}
              No hydration mismatch, no flash of wrong content, simpler mental model.
            </p>
            <p>
              <strong className="text-red-600 dark:text-red-400">
                Cons:
              </strong>{" "}
              Input not visible until JS loads, worse for SEO (if that matters),
              users see loading skeleton.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href="/"
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            ← Back to Hydration Demo
          </a>
          <button
            id="clear-button"
            type="button"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Clear Storage & Reload
          </button>
        </div>
      </main>

      {/* Script to handle clear button before React loads */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.getElementById('clear-button').addEventListener('click', function() {
              localStorage.removeItem('spa-input');
              window.location.reload();
            });
          `,
        }}
      />
    </div>
  );
}
