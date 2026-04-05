import { useState, useEffect, useMemo } from 'react'
import seedData from './data/bookmarks.json'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import BookmarkGrid from './components/BookmarkGrid'
import AddBookmarkModal from './components/AddBookmarkModal'

const CATEGORIES = [
  { id: 'all', label: 'All Bookmarks', icon: '◈' },
  { id: 'data-engineering', label: 'Data Engineering', icon: '⬡' },
  { id: 'software-engineering', label: 'Software Engineering', icon: '◻' },
  { id: 'work', label: 'Work', icon: '◇' },
  { id: 'research', label: 'Research', icon: '◉' },
  { id: 'yoga', label: 'Yoga', icon: '◌' },
]

function loadBookmarks() {
  try {
    const saved = localStorage.getItem('bookmarks')
    return saved ? JSON.parse(saved) : seedData
  } catch {
    return seedData
  }
}

function saveBookmarks(bookmarks) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function App() {
  const [bookmarks, setBookmarks] = useState(loadBookmarks)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  // Persist to localStorage whenever bookmarks change
  useEffect(() => {
    saveBookmarks(bookmarks)
  }, [bookmarks])

  // Apply dark/light class to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Derived: filter bookmarks by category + search + tag
  // useMemo prevents recalculating unless these three values change
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(bookmark => {
      const matchesCategory =
        selectedCategory === 'all' || bookmark.category === selectedCategory

      const query = searchQuery.toLowerCase()
      const matchesSearch =
        !query ||
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.description.toLowerCase().includes(query) ||
        bookmark.url.toLowerCase().includes(query) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(query))

      const matchesTag = !activeTag || bookmark.tags.includes(activeTag)

      return matchesCategory && matchesSearch && matchesTag
    })
  }, [bookmarks, selectedCategory, searchQuery, activeTag])

  // Count bookmarks per category for the sidebar badges
  const categoryCounts = useMemo(() => {
    const counts = { all: bookmarks.length }
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat.id] = bookmarks.filter(b => b.category === cat.id).length
    })
    return counts
  }, [bookmarks])

  function handleAddBookmark(formData) {
    const newBookmark = {
      id: generateId(),
      title: formData.title,
      url: formData.url,
      description: formData.description,
      category: formData.category,
      tags: formData.tags
        .split(',')
        .map(t => t.trim().toLowerCase())
        .filter(Boolean),
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setBookmarks(prev => [newBookmark, ...prev])
    setShowModal(false)
  }

  function handleDeleteBookmark(id) {
    setBookmarks(prev => prev.filter(b => b.id !== id))
  }

  function handleTagClick(tag) {
    setActiveTag(prev => (prev === tag ? null : tag))
  }

  function handleExport() {
    const json = JSON.stringify(bookmarks, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bookmarks.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(file) {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const imported = JSON.parse(e.target.result)
        if (Array.isArray(imported)) {
          setBookmarks(imported)
        }
      } catch {
        alert('Invalid JSON file.')
      }
    }
    reader.readAsText(file)
  }

  function handleCategoryChange(categoryId) {
    setSelectedCategory(categoryId)
    setActiveTag(null) // clear tag filter when switching category
  }

  return (
    <div className="app">
      <Sidebar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        counts={categoryCounts}
      />
      <div className="main">
        <Header
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onAddClick={() => setShowModal(true)}
          onExport={handleExport}
          onImport={handleImport}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(d => !d)}
          activeTag={activeTag}
          onClearTag={() => setActiveTag(null)}
        />
        <BookmarkGrid
          bookmarks={filteredBookmarks}
          activeTag={activeTag}
          onTagClick={handleTagClick}
          onDelete={handleDeleteBookmark}
        />
      </div>
      {showModal && (
        <AddBookmarkModal
          categories={CATEGORIES.slice(1)}
          onAdd={handleAddBookmark}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
