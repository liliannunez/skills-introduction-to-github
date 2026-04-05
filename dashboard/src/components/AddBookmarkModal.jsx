import { useState } from 'react'

const EMPTY_FORM = {
  title: '',
  url: '',
  description: '',
  category: 'software-engineering',
  tags: '',
}

export default function AddBookmarkModal({ categories, onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.url.trim()) {
      newErrors.url = 'URL is required'
    } else {
      try {
        new URL(form.url)
      } catch {
        newErrors.url = 'Enter a valid URL (include https://)'
      }
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onAdd(form)
  }

  // Close modal when clicking the backdrop
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add Bookmark</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Title *</label>
            <input
              className={`field-input ${errors.title ? 'field-input--error' : ''}`}
              type="text"
              placeholder="e.g. React Documentation"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          <div className="field">
            <label className="field-label">URL *</label>
            <input
              className={`field-input ${errors.url ? 'field-input--error' : ''}`}
              type="text"
              placeholder="https://..."
              value={form.url}
              onChange={e => handleChange('url', e.target.value)}
            />
            {errors.url && <p className="field-error">{errors.url}</p>}
          </div>

          <div className="field">
            <label className="field-label">Description</label>
            <textarea
              className="field-input field-textarea"
              placeholder="What is this link about?"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="field">
            <label className="field-label">Category</label>
            <select
              className="field-input field-select"
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Tags</label>
            <input
              className="field-input"
              type="text"
              placeholder="python, sql, tutorial (comma-separated)"
              value={form.tags}
              onChange={e => handleChange('tags', e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Save Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
