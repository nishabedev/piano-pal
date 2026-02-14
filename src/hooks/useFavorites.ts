import { useState, useEffect, useCallback } from 'react';
import type { FavoriteItem } from '../types';
import { getFavorites, addFavorite, removeFavorite } from '../utils/storage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    const items = await getFavorites();
    setFavorites(items);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = useCallback(async (songId: string, bookId: string) => {
    const exists = favorites.some(f => f.songId === songId);
    if (exists) {
      await removeFavorite(songId);
    } else {
      await addFavorite({ songId, bookId, addedAt: Date.now() });
    }
    await load();
  }, [favorites, load]);

  const remove = useCallback(async (songId: string) => {
    await removeFavorite(songId);
    await load();
  }, [load]);

  const isFav = useCallback((songId: string) => {
    return favorites.some(f => f.songId === songId);
  }, [favorites]);

  return { favorites, isLoading, toggle, remove, isFav };
}
