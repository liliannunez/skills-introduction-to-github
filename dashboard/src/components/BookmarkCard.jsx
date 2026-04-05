function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch {
    return null
  }
}

export default function BookmarkCard({ bookmark, activeTag, onTagClick, onDelete }) {
  const favicon = getFaviconUrl(bookmark.url)

  function handleVisit(e) {
    e.preventDefault()
    window.open(bookmark.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="card">
      <div className="card-header">
        <div className="card-title-row">
          {favicon && (
            <img
              className="card-favicon"
              src={favicon}
              alt=""
              width={16}
              height={16}
              onError={e => { e.target.style.display = 'none' }}
            />
          )}
          <a
            className="card-title"
            href={bookmark.url}
            onClick={handleVisit}
            rel="noopener noreferrer"
          >
            {bookmark.title}
          </a>
        </div>
        <button
          className="card-delete"
          onClick={() => onDelete(bookmark.id)}
          title="Delete bookmark"
        >
          ✕
        </button>
      </div>

      <p className="card-description">{bookmark.description}</p>

      <p className="card-url">{bookmark.url.replace(/^https?:\/\//, '')}</p>

      <div className="card-tags">
        {bookmark.tags.map(tag => (
          <button
            key={tag}
            className={`tag ${activeTag === tag ? 'tag--active' : ''}`}
            onClick={() => onTagClick(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      <p className="card-date">{bookmark.createdAt}</p>
    </article>
  )
}
