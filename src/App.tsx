import { BrowserRouter, Routes, Route } from 'react-router';
import Header from './components/Header';
import BottomTabBar from './components/BottomTabBar';
import BookGrid from './components/BookGrid';
import BookView from './components/BookView';
import VideoView from './components/VideoView';
import SearchView from './components/SearchView';
import FavoritesView from './components/FavoritesView';
import RecentsView from './components/RecentsView';
import UpdatePrompt from './components/UpdatePrompt';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 dark-bg">
        <Header />
        <main className="pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<BookGrid />} />
            <Route path="/book/:bookId" element={<BookView />} />
            <Route path="/book/:bookId/song/:songId" element={<VideoView />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/favorites" element={<FavoritesView />} />
            <Route path="/recents" element={<RecentsView />} />
          </Routes>
        </main>
        <BottomTabBar />
        <UpdatePrompt />
      </div>
    </BrowserRouter>
  );
}
