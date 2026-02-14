import { useParams, Link, useNavigate } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import { getBookById, levelColors } from '../data/catalog';
import type { Song } from '../types';
import SongList from './SongList';
import { useFavorites } from '../hooks/useFavorites';
import { useRecents } from '../hooks/useRecents';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export default function BookView() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const book = bookId ? getBookById(bookId) : undefined;
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const { toggle, isFav } = useFavorites();
  const { track } = useRecents();

  useEffect(() => {
    if (!isMobile && book && book.songs.length > 0 && !selectedSong) {
      setSelectedSong(book.songs[0]);
    }
  }, [isMobile, book, selectedSong]);

  const handleSelectSong = useCallback((song: Song) => {
    if (isMobile) {
      navigate(`/book/${book?.id}/song/${song.id}`);
    } else {
      setSelectedSong(song);
      if (book) track(song.id, book.id);
    }
  }, [isMobile, book, navigate, track]);

  if (!book) {
    return (
      <div className="p-8 text-center text-slate-500">
        Book not found. <Link to="/" className="text-indigo-400 underline">Go home</Link>
      </div>
    );
  }

  const colors = levelColors[book.level];
  const primaryVideo = selectedSong?.videos.find(v => v.isPrimary) || selectedSong?.videos[0];
  const altVideos = selectedSong?.videos.filter(v => v !== primaryVideo) || [];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Book header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800/50 dark-border">
        <Link
          to="/"
          className="p-1.5 rounded-full hover:bg-white/10 dark-hover transition-colors"
        >
          <svg className="w-5 h-5 text-slate-400 dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-extrabold text-white dark-text truncate">
            {book.title}
          </h1>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${colors.accent}`} />
            <p className={`text-xs font-semibold ${colors.text} ${colors.textClass}`}>{book.level}</p>
          </div>
        </div>
      </div>

      {/* Desktop: split layout */}
      {!isMobile ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Song list */}
          <div className="w-80 border-r border-slate-800/50 dark-border overflow-y-auto bg-slate-900/30">
            <SongList
              book={book}
              selectedSongId={selectedSong?.id}
              onSelectSong={handleSelectSong}
            />
          </div>

          {/* Video panel */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedSong && primaryVideo ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-extrabold text-white dark-text flex-1">
                    {selectedSong.title}
                  </h2>
                  <button
                    onClick={() => toggle(selectedSong.id, book.id)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    {isFav(selectedSong.id) ? (
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

                <div className="aspect-video rounded-2xl overflow-hidden bg-black/50 ring-1 ring-white/10 mb-3">
                  <iframe
                    key={primaryVideo.youtubeId}
                    src={`https://www.youtube.com/embed/${primaryVideo.youtubeId}?rel=0`}
                    title={primaryVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-sm text-slate-500 dark-text-muted font-medium">{primaryVideo.channel}</p>

                {altVideos.length > 0 && (
                  <div className="mt-6">
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
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-600">
                <svg className="w-12 h-12 mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
                <p className="font-semibold">Select a song to watch</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <SongList book={book} onSelectSong={handleSelectSong} />
        </div>
      )}
    </div>
  );
}
