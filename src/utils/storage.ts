import { openDB, type IDBPDatabase } from 'idb';
import type { RecentItem, FavoriteItem, UserPreferences } from '../types';

const DB_NAME = 'piano-pal-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'songId' });
        }
        if (!db.objectStoreNames.contains('recents')) {
          db.createObjectStore('recents', { keyPath: 'songId' });
        }
        if (!db.objectStoreNames.contains('preferences')) {
          db.createObjectStore('preferences', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

// Favorites
export async function getFavorites(): Promise<FavoriteItem[]> {
  const db = await getDB();
  return db.getAll('favorites');
}

export async function addFavorite(item: FavoriteItem): Promise<void> {
  const db = await getDB();
  await db.put('favorites', item);
}

export async function removeFavorite(songId: string): Promise<void> {
  const db = await getDB();
  await db.delete('favorites', songId);
}

export async function isFavorite(songId: string): Promise<boolean> {
  const db = await getDB();
  const item = await db.get('favorites', songId);
  return !!item;
}

// Recents
const MAX_RECENTS = 30;

export async function getRecents(): Promise<RecentItem[]> {
  const db = await getDB();
  const all = await db.getAll('recents');
  return all.sort((a, b) => b.timestamp - a.timestamp);
}

export async function addRecent(item: RecentItem): Promise<void> {
  const db = await getDB();
  await db.put('recents', item);

  // Prune to max
  const all = await db.getAll('recents');
  if (all.length > MAX_RECENTS) {
    const sorted = all.sort((a, b) => b.timestamp - a.timestamp);
    const toRemove = sorted.slice(MAX_RECENTS);
    const tx = db.transaction('recents', 'readwrite');
    for (const r of toRemove) {
      await tx.store.delete(r.songId);
    }
    await tx.done;
  }
}

export async function removeRecent(songId: string): Promise<void> {
  const db = await getDB();
  await db.delete('recents', songId);
}

// Preferences
export function getDefaultPreferences(): UserPreferences {
  return {
    id: 'user-preferences',
    theme: 'dark',
    lastUpdated: Date.now(),
  };
}

export async function getPreferences(): Promise<UserPreferences> {
  const db = await getDB();
  const prefs = await db.get('preferences', 'user-preferences');
  return prefs || getDefaultPreferences();
}

export async function savePreferences(updates: Partial<UserPreferences>): Promise<void> {
  const db = await getDB();
  const existing = await db.get('preferences', 'user-preferences');
  const updated: UserPreferences = {
    ...getDefaultPreferences(),
    ...existing,
    ...updates,
    id: 'user-preferences',
    lastUpdated: Date.now(),
  };
  await db.put('preferences', updated);
}
