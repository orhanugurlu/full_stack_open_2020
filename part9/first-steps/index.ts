/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { parseBmiArguments, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let args: string[] = [];
  if (req.query.height && typeof req.query.height === 'string') {
    args = args.concat(req.query.height);
  }
  if (req.query.weight && typeof req.query.weight === 'string') {
    args = args.concat(req.query.weight);
  }
  try {
    const { height, weight } = parseBmiArguments(args);
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.send({ error: e.message });
  }
});

app.post('/calculator', (req, res) => {
  if (req.body && req.body.daily_exercises && req.body.target) {
    if (Array.isArray(req.body.daily_exercises)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      && req.body.daily_exercises.every((item: unknown) => typeof item === "number")
      && typeof req.body.target == 'number') {
      res.json(calculateExercises(req.body.daily_exercises, req.body.target));
    } else {
      res.json({ error: 'malformatted parameters' });
    }
  } else {
    res.json({ error: 'parameters missing' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});