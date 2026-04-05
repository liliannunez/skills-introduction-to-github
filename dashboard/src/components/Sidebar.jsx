export default function Sidebar({ categories, selectedCategory, onSelectCategory, counts }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">⬡</span>
        <span className="sidebar-logo-text">Bookmarks</span>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section-label">Categories</p>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`sidebar-item ${selectedCategory === cat.id ? 'sidebar-item--active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <span className="sidebar-item-icon">{cat.icon}</span>
            <span className="sidebar-item-label">{cat.label}</span>
            <span className="sidebar-item-count">{counts[cat.id] ?? 0}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">
          {counts.all} bookmark{counts.all !== 1 ? 's' : ''} total
        </p>
      </div>
    </aside>
  )
}
