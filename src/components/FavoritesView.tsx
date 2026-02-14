import { Link } from 'react-router';
import { useFavorites } from '../hooks/useFavorites';
import { getSongById, levelColors } from '../data/catalog';
import DropdownMenu from './DropdownMenu';

export default function FavoritesView() {
  const { favorites, isLoading, remove } = useFavorites();

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      <h1 className="text-xl font-extrabold text-white dark-text mb-4">Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center text-slate-500 py-16">
          <svg className="w-12 h-12 mx-auto mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="font-semibold">No favorites yet</p>
          <p className="text-sm text-slate-600 mt-1">Tap the heart on any song to save it here</p>
        </div>
      ) : (
        <div className="dark-surface bg-slate-900/50 rounded-2xl border border-slate-800/50 dark-border">
          {favorites.map((fav, i) => {
            const result = getSongById(fav.songId);
            if (!result) return null;
            const { song, book } = result;
            const colors = levelColors[book.level];
            const isFirst = i === 0;
            const isLast = i === favorites.length - 1;

            return (
              <Link
                key={fav.songId}
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
                <DropdownMenu
                  items={[
                    { label: 'Remove from favorites', onClick: () => remove(fav.songId), danger: true },
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
