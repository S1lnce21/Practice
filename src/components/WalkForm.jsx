import React, { useState } from 'react'

export default function WalkForm({ onAdd }) {
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState('')
  const [stool, setStool] = useState('normal')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!startTime || !duration || duration <= 0) {
      setError('Заполните время и длительность')
      return
    }
    setError('')
    onAdd({ startTime, duration: parseFloat(duration), stool })
    setStartTime('')
    setDuration('')
    alert('Прогулка добавлена!')
  }

  return (
    <div className="card">
      <h2>🚶 Запись прогулки</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Время начала</label>
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Длительность (мин)</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Стул</label>
          <select value={stool} onChange={(e) => setStool(e.target.value)}>
            <option value="normal">Нормальный</option>
            <option value="loose">Жидкий</option>
            <option value="constipation">Запор</option>
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Добавить</button>
      </form>
    </div>
  )
}