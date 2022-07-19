import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    const bmi = calculateBmi(height, weight)
    res.json({
      weight, height, bmi
    })
  } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
  }
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})