import { Link } from 'react-router';
import type { Book, Song } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import DropdownMenu from './DropdownMenu';

interface SongListProps {
  book: Book;
  selectedSongId?: string;
  onSelectSong?: (song: Song) => void;
}

export default function SongList({ book, selectedSongId, onSelectSong }: SongListProps) {
  const { toggle, isFav } = useFavorites();

  return (
    <div className="dark-divide divide-y divide-slate-800/50">
      {book.songs.map((song, index) => {
        const isSelected = song.id === selectedSongId;
        const content = (
          <div
            className={`flex items-center gap-3 px-4 py-3 transition-all duration-150 ${
              isSelected
                ? 'bg-indigo-500/10 border-l-2 border-indigo-500'
                : 'hover:bg-white/5 dark-hover border-l-2 border-transparent'
            }`}
          >
            {/* Song number */}
            <span className={`w-6 text-center text-xs font-bold shrink-0 ${
              isSelected ? 'text-indigo-400' : 'text-slate-600 dark-text-muted'
            }`}>
              {index + 1}
            </span>

            <div className="flex-1 min-w-0">
              <div className={`text-sm font-semibold truncate ${
                isSelected ? 'text-indigo-300 dark-text' : 'text-slate-200 dark-text'
              }`}>
                {song.title}
              </div>
            </div>

            <button
              onClick={e => { e.stopPropagation(); e.preventDefault(); toggle(song.id, book.id); }}
              className="shrink-0 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              title={isFav(song.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFav(song.id) ? (
                <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>

            <DropdownMenu
              items={[
                {
                  label: isFav(song.id) ? 'Remove from favorites' : 'Add to favorites',
                  onClick: () => toggle(song.id, book.id),
                },
              ]}
            />
          </div>
        );

        if (onSelectSong) {
          return (
            <button
              key={song.id}
              onClick={() => onSelectSong(song)}
              className="w-full text-left"
            >
              {content}
            </button>
          );
        }

        return (
          <Link key={song.id} to={`/book/${book.id}/song/${song.id}`} className="block">
            {content}
          </Link>
        );
      })}
    </div>
  );
}
