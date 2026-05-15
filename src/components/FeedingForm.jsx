import React, { useState } from 'react'

export default function FeedingForm({ onAdd }) {
  const [time, setTime] = useState('')
  const [type, setType] = useState('сухой')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!time || !amount || amount <= 0) {
      setError('Заполните все поля корректно')
      return
    }
    setError('')
    onAdd({ time, type, amount: parseFloat(amount) })
    setTime('')
    setAmount('')
    alert('Кормление добавлено!')
  }

  return (
    <div className="card">
      <h2>🍖 Запись кормления</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Время</label>
          <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Тип корма</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>сухой</option>
            <option>влажный</option>
            <option>натуральный</option>
          </select>
        </div>
        <div className="form-group">
          <label>Объём (г/порции)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Добавить</button>
      </form>
    </div>
  )
}