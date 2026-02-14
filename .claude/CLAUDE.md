# Piano Pal

Companion SPA for the "Piano Adventures" book series. Users browse books by level, select songs, and watch YouTube tutorial videos.

## Tech Stack
- React 19 + TypeScript (strict) + Vite 7
- Tailwind CSS 3 (class-based light/dark theme)
- React Router 7 — imports from `react-router` (NOT `react-router-dom`)
- IndexedDB via `idb` for favorites, recents, theme preferences
- PWA via `vite-plugin-pwa` with workbox

## Project Structure
```
src/
├── components/    # BookGrid, BookView, SongList, VideoView, SearchView,
│                  # FavoritesView, RecentsView, Header, BottomTabBar, DropdownMenu
├── data/catalog.ts  # All books/songs/YouTube IDs (static data)
├── hooks/         # useFavorites, useRecents, useTheme
├── utils/storage.ts # IndexedDB setup (piano-pal-db)
├── types/index.ts   # Book, Song, VideoLink, RecentItem, FavoriteItem, UserPreferences
├── App.tsx, main.tsx, index.css
```

## Key Patterns
- All YouTube videos are from **Karen Rock Music** channel
- Book types: `'lesson' | 'performance' | 'theory' | 'technique'`
- Levels: Primer, Level 1, Level 2A, Level 2B
- Currently 12 books: 3 per level (Lesson, Performance, Technique & Artistry)
- Theory books have NO Karen Rock Music videos — intentionally excluded
- Level colors: Primer=rose, Level 1=sky, Level 2A=violet, Level 2B=teal (soft /80 opacity)

## Routes
```
/                              → BookGrid (home)
/book/:bookId                  → BookView (desktop split) / SongList (mobile)
/book/:bookId/song/:songId     → VideoView (mobile full-page)
/search                        → SearchView
/favorites                     → FavoritesView
/recents                       → RecentsView
```

## Important Notes
- Run commands from root `~nishabe` with full paths or `--prefix`, do NOT `cd` into project
- react-router-dom v7 moved BrowserRouter/Routes/Route/Link/useParams/useNavigate/useLocation to `react-router` package
- Light theme uses `html.light-theme` class with CSS overrides using `!important`
- BookGrid uses 3-column grid (one tile per book type)
- Desktop BookView: split layout (song list left, video right); Mobile: full-page navigation
