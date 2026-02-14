import { Link } from 'react-router';
import { useRecents } from '../hooks/useRecents';
import { getSongById, levelColors } from '../data/catalog';
import DropdownMenu from './DropdownMenu';

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default function RecentsView() {
  const { recents, isLoading, remove } = useRecents();

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      <h1 className="text-xl font-extrabold text-white dark-text mb-4">Recently Played</h1>

      {recents.length === 0 ? (
        <div className="text-center text-slate-500 py-16">
          <svg className="w-12 h-12 mx-auto mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold">No recently played songs</p>
          <p className="text-sm text-slate-600 mt-1">Songs you watch will appear here</p>
        </div>
      ) : (
        <div className="dark-surface bg-slate-900/50 rounded-2xl border border-slate-800/50 dark-border">
          {recents.map((recent, i) => {
            const result = getSongById(recent.songId);
            if (!result) return null;
            const { song, book } = result;
            const colors = levelColors[book.level];
            const isFirst = i === 0;
            const isLast = i === recents.length - 1;

            return (
              <Link
                key={recent.songId}
                to={`/book/${book.id}/song/${song.id}`}
                className={`flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 dark-hover transition-colors ${
                  i > 0 ? 'border-t border-slate-800/50 dark-border' : ''
                } ${isFirst ? 'rounded-t-2xl' : ''} ${isLast ? 'rounded-b-2xl' : ''}`}
              >
                <div className={`w-1 h-8 rounded-full ${colors.accent} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-200 dark-text truncate">
                    {song.title}
                  </div>
                  <div className={`text-xs font-medium ${colors.text} ${colors.textClass}`}>
                    {book.level} - {book.title}
                  </div>
                </div>
                <span className="text-[11px] text-slate-600 dark-text-muted font-semibold shrink-0">
                  {timeAgo(recent.timestamp)}
                </span>
                <DropdownMenu
                  items={[
                    { label: 'Remove from recents', onClick: () => remove(recent.songId), danger: true },
                  ]}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
