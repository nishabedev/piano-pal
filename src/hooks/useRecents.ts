import { useState, useEffect, useCallback } from 'react';
import type { RecentItem } from '../types';
import { getRecents, addRecent, removeRecent } from '../utils/storage';

export function useRecents() {
  const [recents, setRecents] = useState<RecentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    const items = await getRecents();
    setRecents(items);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const track = useCallback(async (songId: string, bookId: string) => {
    await addRecent({ songId, bookId, timestamp: Date.now() });
    await load();
  }, [load]);

  const remove = useCallback(async (songId: string) => {
    await removeRecent(songId);
    await load();
  }, [load]);

  return { recents, isLoading, track, remove };
}
