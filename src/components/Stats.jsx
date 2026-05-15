import React from 'react'
import '../assets/styles/components/Stats.css'

export default function Stats({ feedings, walks }) {
  const today = new Date().toISOString().slice(0, 10)
  const todayFeedings = feedings.filter(f => f.time?.startsWith(today)).length
  const todayWalks = walks.filter(w => w.startTime?.startsWith(today)).length

  return (
    <div className="card">
      <h2>📊 Статистика за сегодня</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{todayFeedings}</div>
          <div>Кормлений</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{todayWalks}</div>
          <div>Прогулок</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{feedings.length}</div>
          <div>Всего кормлений</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{walks.length}</div>
          <div>Всего прогулок</div>
        </div>
      </div>
    </div>
  )
}