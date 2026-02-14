import { useParams, Link } from 'react-router';
import { useEffect } from 'react';
import { getBookById, levelColors } from '../data/catalog';
import { useFavorites } from '../hooks/useFavorites';
import { useRecents } from '../hooks/useRecents';

export default function VideoView() {
  const { bookId, songId } = useParams<{ bookId: string; songId: string }>();
  const { toggle, isFav } = useFavorites();
  const { track } = useRecents();

  const book = bookId ? getBookById(bookId) : undefined;
  const song = book?.songs.find(s => s.id === songId);

  useEffect(() => {
    if (song && book) {
      track(song.id, book.id);
    }
  }, [song, book, track]);

  if (!book || !song) {
    return (
      <div className="p-8 text-center text-slate-500">
        Song not found. <Link to="/" className="text-indigo-400 underline">Go home</Link>
      </div>
    );
  }

  const colors = levelColors[book.level];
  const primaryVideo = song.videos.find(v => v.isPrimary) || song.videos[0];
  const altVideos = song.videos.filter(v => v !== primaryVideo);

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link
          to={`/book/${book.id}`}
          className="p-1.5 rounded-full hover:bg-white/10 dark-hover transition-colors"
        >
          <svg className="w-5 h-5 text-slate-400 dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-extrabold text-white dark-text truncate">
            {song.title}
          </h1>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${colors.accent}`} />
            <p className={`text-xs font-semibold ${colors.text} ${colors.textClass}`}>{book.level} - {book.title}</p>
          </div>
        </div>
        <button
          onClick={() => toggle(song.id, book.id)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          title={isFav(song.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFav(song.id) ? (
            <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Primary video */}
      {primaryVideo && (
        <div className="mb-4">
          <div className="aspect-video rounded-2xl overflow-hidden bg-black/50 ring-1 ring-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${primaryVideo.youtubeId}?rel=0`}
              title={primaryVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-slate-500 dark-text-muted font-medium mt-2">{primaryVideo.channel}</p>
        </div>
      )}

      {/* Alt videos */}
      {altVideos.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark-text-muted mb-3">Other versions</h3>
          {altVideos.map(v => (
            <div key={v.youtubeId} className="mb-4">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black/50 ring-1 ring-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0`}
                  title={v.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-slate-500 dark-text-muted mt-1">{v.channel}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
