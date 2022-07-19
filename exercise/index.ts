import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi = calculateBmi(height, weight);
    res.json({
      weight, height, bmi
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message});
    }
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      res.status(400).send({
        error: "parameters missing"
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (daily_exercises.filter((h: any) => isNaN(Number(h)) || typeof(h) !== 'number').length > 0 || isNaN(Number(target)) || typeof(target) !== 'number') {
      res.status(400).send({
        error: "malformatted parameters"
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(
      daily_exercises,
      target
    );
    res.send(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message});
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});