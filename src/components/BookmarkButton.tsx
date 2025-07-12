import { Bookmark, BookmarkCheck } from "lucide-react";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onClick: () => void;
}

export function BookmarkButton({ isBookmarked, onClick }: BookmarkButtonProps) {
  return (
    <button
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        h-8 w-8 rounded-full flex items-center justify-center
        transition bg-muted hover:bg-yellow-100
        ${isBookmarked ? "text-yellow-500" : "text-muted-foreground"}
      `}
      title={isBookmarked ? "Bookmarked" : "Bookmark"}
      type="button"
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-5 w-5 fill-yellow-400" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
    </button>
  );
}
