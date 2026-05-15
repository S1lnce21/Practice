import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import DogProfile from './components/DogProfile'
import FeedingForm from './components/FeedingForm'
import WalkForm from './components/WalkForm'
import HistoryList from './components/HistoryList'
import Stats from './components/Stats'
import { getFeedings, getWalks, addFeeding, addWalk, deleteFeeding, deleteWalk, getStats } from './api/dogApi'
import './assets/styles/App.css'

function App() {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedDogId, setSelectedDogId] = useState(1)
  const [dog, setDog] = useState({ id: 1, name: 'Рекс', breed: 'Дворняга', weight: 15 })
  const [feedings, setFeedings] = useState([])
  const [walks, setWalks] = useState([])
  const [stats, setStats] = useState({ feedings_today: 0, walks_today: 0, total_feedings: 0, total_walks: 0 })

  useEffect(() => {
    loadData()
  }, [selectedDogId])

  const loadData = async () => {
    const feedingsData = await getFeedings(selectedDogId)
    const walksData = await getWalks(selectedDogId)
    const statsData = await getStats(selectedDogId)
    setFeedings(feedingsData)
    setWalks(walksData)
    setStats(statsData)
  }

  const handleAddFeeding = async (feeding) => {
    const newFeeding = await addFeeding({ ...feeding, dog_id: selectedDogId })
    setFeedings([newFeeding, ...feedings])
    await loadData()
  }

  const handleAddWalk = async (walk) => {
    const newWalk = await addWalk({ ...walk, dog_id: selectedDogId })
    setWalks([newWalk, ...walks])
    await loadData()
  }

  const handleDeleteFeeding = async (id) => {
    await deleteFeeding(id)
    setFeedings(feedings.filter(f => f.id !== id))
    await loadData()
  }

  const handleDeleteWalk = async (id) => {
    await deleteWalk(id)
    setWalks(walks.filter(w => w.id !== id))
    await loadData()
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container">
        {activeTab === 'profile' && <DogProfile dog={dog} setDog={setDog} />}
        {activeTab === 'feeding' && <FeedingForm onAdd={handleAddFeeding} />}
        {activeTab === 'walk' && <WalkForm onAdd={handleAddWalk} />}
        {activeTab === 'history' && (
          <HistoryList 
            feedings={feedings} 
            walks={walks} 
            onDeleteFeeding={handleDeleteFeeding} 
            onDeleteWalk={handleDeleteWalk} 
          />
        )}
        {activeTab === 'stats' && <Stats feedings={feedings} walks={walks} stats={stats} />}
      </div>
    </div>
  )
}

export default App