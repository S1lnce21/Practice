import React from 'react'
import '../assets/styles/components/Navbar.css'

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'profile', label: '🐕 Профиль' },
    { id: 'feeding', label: '🍖 Кормление' },
    { id: 'walk', label: '🚶 Прогулка' },
    { id: 'history', label: '📋 История' },
    { id: 'stats', label: '📊 Статистика' }
  ]

  return (
    <div className="navbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}