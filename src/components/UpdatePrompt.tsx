import { useRegisterSW } from 'virtual:pwa-register/react';

export default function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <div className="dark-surface-raised bg-slate-800 border border-slate-700/50 dark-border rounded-2xl shadow-2xl p-4 flex items-center gap-3">
        <div className="flex-1 text-sm font-semibold text-slate-200 dark-text">
          New content available!
        </div>
        <button
          onClick={() => updateServiceWorker(true)}
          className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-indigo-500/25"
        >
          Update
        </button>
      </div>
    </div>
  );
}
