export default function Header({
  searchQuery,
  onSearch,
  onAddClick,
  onExport,
  onImport,
  darkMode,
  onToggleDarkMode,
  activeTag,
  onClearTag,
}) {
  function handleImportClick() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = e => onImport(e.target.files[0])
    input.click()
  }

  return (
    <header className="header">
      <div className="header-search-row">
        <div className="search-wrapper">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search bookmarks, tags, URLs…"
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => onSearch('')}>✕</button>
          )}
        </div>

        <div className="header-actions">
          <button
            className="btn btn--ghost"
            onClick={onToggleDarkMode}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀' : '☾'}
          </button>
          <button className="btn btn--ghost" onClick={handleImportClick} title="Import JSON">
            ↑ Import
          </button>
          <button className="btn btn--ghost" onClick={onExport} title="Export JSON">
            ↓ Export
          </button>
          <button className="btn btn--primary" onClick={onAddClick}>
            + Add
          </button>
        </div>
      </div>

      {activeTag && (
        <div className="active-tag-banner">
          <span>Filtering by tag:</span>
          <span className="active-tag-chip">#{activeTag}</span>
          <button className="active-tag-clear" onClick={onClearTag}>✕ Clear</button>
        </div>
      )}
    </header>
  )
}
