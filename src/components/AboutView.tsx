export default function AboutView() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-extrabold text-white dark-text mb-6">About Piano Pal</h1>

      <div className="dark-surface bg-slate-900/50 rounded-2xl border border-slate-800/50 dark-border p-5 mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-3">What is Piano Pal?</h2>
        <p className="text-sm text-slate-300 dark-text-secondary leading-relaxed">
          Piano Pal is a companion app for students learning piano with the
          <span className="font-semibold text-white dark-text"> Faber Piano Adventures </span>
          book series. It helps you quickly find and watch YouTube tutorial videos
          for every song in your book — so you can hear how a piece should sound
          before you practice it.
        </p>
      </div>

      <div className="dark-surface bg-slate-900/50 rounded-2xl border border-slate-800/50 dark-border p-5 mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-3">Books Covered</h2>
        <p className="text-sm text-slate-300 dark-text-secondary leading-relaxed mb-3">
          Covers Primer through Level 2B, including:
        </p>
        <ul className="text-sm text-slate-300 dark-text-secondary space-y-1.5">
          <li className="flex items-center gap-2">
            <span>📖</span> <span>Lesson Books</span>
          </li>
          <li className="flex items-center gap-2">
            <span>🎵</span> <span>Performance Books</span>
          </li>
          <li className="flex items-center gap-2">
            <span>🎹</span> <span>Technique &amp; Artistry Books</span>
          </li>
        </ul>
        <p className="text-sm text-slate-400 dark-text-muted mt-3">
          All videos are from the
          <span className="font-semibold text-slate-300 dark-text-secondary"> Karen Rock Music </span>
          YouTube channel.
        </p>
      </div>

      <div className="dark-surface bg-slate-900/50 rounded-2xl border border-slate-800/50 dark-border p-5 mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-3">Features</h2>
        <ul className="text-sm text-slate-300 dark-text-secondary space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-slate-500 mt-0.5">&#x2022;</span>
            <span>Browse songs by book and level</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-500 mt-0.5">&#x2022;</span>
            <span>Search across all books instantly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-500 mt-0.5">&#x2022;</span>
            <span>Save your favorite songs for quick access</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-500 mt-0.5">&#x2022;</span>
            <span>Track recently played songs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-500 mt-0.5">&#x2022;</span>
            <span>Install as an app on your device (PWA)</span>
          </li>
        </ul>
      </div>

      <div className="dark-surface bg-slate-900/50 rounded-2xl border border-slate-800/50 dark-border p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-3">Contact</h2>
        <p className="text-sm text-slate-300 dark-text-secondary leading-relaxed">
          Have feedback, suggestions, or found a broken video?
        </p>
        <a
          href="mailto:nishabedev@gmail.com?subject=Piano%20Pal%20Feedback"
          className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 text-sm font-semibold rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          Send Feedback
        </a>
      </div>
    </div>
  );
}
