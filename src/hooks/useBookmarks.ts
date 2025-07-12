import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "bookmarkedProfiles";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    setBookmarks(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (profileId: string) => bookmarks.includes(profileId);

  const toggleBookmark = (profileId: string) => {
    setBookmarks((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  return { bookmarks, isBookmarked, toggleBookmark };
}
