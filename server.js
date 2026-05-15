import express from 'express'
import cors from 'cors'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const { Pool } = pg

console.log('Environment variables:')
console.log('PORT:', process.env.PORT)
console.log('DB_HOST:', process.env.DB_HOST)
console.log('DB_PORT:', process.env.DB_PORT)
console.log('DB_NAME:', process.env.DB_NAME)

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
})

app.use(cors())
app.use(express.json())

// Тестовый маршрут
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' })
})

app.get('/api/dogs/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM dogs WHERE user_id = $1',
      [req.params.userId]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/dogs', async (req, res) => {
  const { user_id, name, breed, weight } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO dogs (user_id, name, breed, weight) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, name, breed, weight]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/feedings/:dogId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM feedings WHERE dog_id = $1 ORDER BY time DESC',
      [req.params.dogId]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/feedings', async (req, res) => {
  const { dog_id, time, type, amount } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO feedings (dog_id, time, type, amount) VALUES ($1, $2, $3, $4) RETURNING *',
      [dog_id, time, type, amount]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/feedings/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM feedings WHERE id = $1', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/walks/:dogId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM walks WHERE dog_id = $1 ORDER BY start_time DESC',
      [req.params.dogId]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/walks', async (req, res) => {
  const { dog_id, start_time, duration, stool_type } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO walks (dog_id, start_time, duration, stool_type) VALUES ($1, $2, $3, $4) RETURNING *',
      [dog_id, start_time, duration, stool_type]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/walks/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM walks WHERE id = $1', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/stats/:dogId', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10)
  try {
    const feedingsToday = await pool.query(
      'SELECT COUNT(*) FROM feedings WHERE dog_id = $1 AND DATE(time) = $2',
      [req.params.dogId, today]
    )
    const walksToday = await pool.query(
      'SELECT COUNT(*) FROM walks WHERE dog_id = $1 AND DATE(start_time) = $2',
      [req.params.dogId, today]
    )
    const totalFeedings = await pool.query(
      'SELECT COUNT(*) FROM feedings WHERE dog_id = $1',
      [req.params.dogId]
    )
    const totalWalks = await pool.query(
      'SELECT COUNT(*) FROM walks WHERE dog_id = $1',
      [req.params.dogId]
    )
    res.json({
      feedings_today: parseInt(feedingsToday.rows[0].count),
      walks_today: parseInt(walksToday.rows[0].count),
      total_feedings: parseInt(totalFeedings.rows[0].count),
      total_walks: parseInt(totalWalks.rows[0].count)
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = parseInt(process.env.PORT) || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`📡 Test API: http://localhost:${PORT}/api/test`)
})