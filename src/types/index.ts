export interface VideoLink {
  youtubeId: string;
  title: string;
  channel: string;
  isPrimary: boolean;
}

export interface Song {
  id: string;
  bookId: string;
  title: string;
  videos: VideoLink[];
}

export interface Book {
  id: string;
  title: string;
  level: string;
  type: 'lesson' | 'performance' | 'theory' | 'technique';
  songs: Song[];
}

export interface RecentItem {
  songId: string;
  bookId: string;
  timestamp: number;
}

export interface FavoriteItem {
  songId: string;
  bookId: string;
  addedAt: number;
}

export interface UserPreferences {
  id: string;
  theme: 'dark' | 'light';
  lastUpdated: number;
}
