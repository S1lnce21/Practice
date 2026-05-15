import React, { useState } from 'react'
import '../assets/styles/components/DogProfile.css'

export default function DogProfile({ dog, setDog }) {
  const [formData, setFormData] = useState(dog)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError('Введите кличку')
      return
    }
    setError('')
    setDog(formData)
    alert('Профиль обновлён!')
  }

  return (
    <div className="card">
      <h2>Профиль собаки</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Кличка</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Порода</label>
          <input
            type="text"
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Вес (кг)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Сохранить</button>
      </form>
    </div>
  )
}