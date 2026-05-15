const API_URL = 'http://localhost:5000/api'

export const getDogs = async (userId) => {
  const response = await fetch(`${API_URL}/dogs/${userId}`)
  return response.json()
}

export const addDog = async (dog) => {
  const response = await fetch(`${API_URL}/dogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog)
  })
  return response.json()
}

export const getFeedings = async (dogId) => {
  const response = await fetch(`${API_URL}/feedings/${dogId}`)
  return response.json()
}

export const addFeeding = async (feeding) => {
  const response = await fetch(`${API_URL}/feedings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feeding)
  })
  return response.json()
}

export const deleteFeeding = async (id) => {
  const response = await fetch(`${API_URL}/feedings/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}

export const getWalks = async (dogId) => {
  const response = await fetch(`${API_URL}/walks/${dogId}`)
  return response.json()
}

export const addWalk = async (walk) => {
  const response = await fetch(`${API_URL}/walks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(walk)
  })
  return response.json()
}

export const deleteWalk = async (id) => {
  const response = await fetch(`${API_URL}/walks/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}

export const getStats = async (dogId) => {
  const response = await fetch(`${API_URL}/stats/${dogId}`)
  return response.json()
}