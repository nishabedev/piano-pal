import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { books, levelColors } from '../data/catalog';

export default function SearchView() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return books
      .map(book => ({
        book,
        matches: book.songs.filter(s => s.title.toLowerCase().includes(q)),
      }))
      .filter(r => r.matches.length > 0);
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search songs..."
          className="dark-input w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-medium"
          autoFocus
        />
      </div>

      {query && results.length === 0 && (
        <div className="text-center text-slate-500 py-16">
          <svg className="w-10 h-10 mx-auto mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="font-semibold">No songs found for "{query}"</p>
        </div>
      )}

      {results.map(({ book, matches }) => {
        const colors = levelColors[book.level];
        return (
          <div key={book.id} className="mb-5">
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className={`w-1.5 h-1.5 rounded-full ${colors.accent}`} />
              <h3 className={`text-xs font-bold uppercase tracking-wider ${colors.text} ${colors.textClass}`}>
                {book.level} - {book.title}
              </h3>
            </div>
            <div className="dark-surface bg-slate-900/50 rounded-2xl border border-slate-800/50 dark-border">
              {matches.map((song, i) => (
                <Link
                  key={song.id}
                  to={`/book/${book.id}/song/${song.id}`}
                  className={`block px-4 py-3 hover:bg-white/5 dark-hover transition-colors ${
                    i > 0 ? 'border-t border-slate-800/50 dark-border' : ''
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-200 dark-text">{song.title}</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {!query && (
        <div className="text-center text-slate-600 py-16">
          <svg className="w-10 h-10 mx-auto mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          </svg>
          <p className="font-semibold">Search across all books</p>
          <p className="text-sm text-slate-700 mt-1">Find any song by name</p>
        </div>
      )}
    </div>
  );
}
