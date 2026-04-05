import BookmarkCard from './BookmarkCard'

export default function BookmarkGrid({ bookmarks, activeTag, onTagClick, onDelete }) {
  if (bookmarks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-icon">◈</p>
        <p className="empty-state-text">No bookmarks found</p>
        <p className="empty-state-sub">Try a different search or category</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {bookmarks.map(bookmark => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          activeTag={activeTag}
          onTagClick={onTagClick}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
