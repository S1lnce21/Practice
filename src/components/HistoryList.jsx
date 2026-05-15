import React from 'react'
import '../assets/styles/components/HistoryList.css'

export default function HistoryList({ feedings, walks, onDeleteFeeding, onDeleteWalk }) {
  const allEntries = [
    ...feedings.map(f => ({ ...f, type: 'feeding' })),
    ...walks.map(w => ({ ...w, type: 'walk' }))
  ].sort((a, b) => (b.id || 0) - (a.id || 0))

  return (
    <div className="card">
      <h2>📋 История</h2>
      {allEntries.length === 0 && <p>Пока нет записей</p>}
      {allEntries.map(entry => (
        <div key={entry.id} className="history-item">
          <div>
            {entry.type === 'feeding' ? (
              <span className="badge">🍖 Кормление</span>
            ) : (
              <span className="badge">🚶 Прогулка</span>
            )}
            {' '}
            {entry.type === 'feeding' ? (
              <>Время: {entry.time}, {entry.type} корм, {entry.amount}г</>
            ) : (
              <>Начало: {entry.startTime}, длит: {entry.duration} мин, стул: {entry.stool}</>
            )}
          </div>
          <button
            className="delete-btn"
            onClick={() => entry.type === 'feeding' ? onDeleteFeeding(entry.id) : onDeleteWalk(entry.id)}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  )
}