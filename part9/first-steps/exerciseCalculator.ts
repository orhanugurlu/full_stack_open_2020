export type Rating = 1 | 2 | 3;

export interface ExercisesSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculatorParameters {
  exerciseHours: number[];
  target: number;
}

const parseArguments = (args: Array<string>): CalculatorParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let target = 0;
  let exerciseHours: number[] = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    } else {
      if (i == 2) {
        target = Number(args[i]);
      } else {
        exerciseHours = exerciseHours.concat(Number(args[i]));
      }
    }
  }
  return { exerciseHours, target };
};

export const calculateExercises = (exerciseHours: number[], target: number): ExercisesSummary => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(h => h > 0).length;
  const average = exerciseHours.reduce((sum, cur) => sum + cur) / (1.0 * periodLength);
  const success = average > target;
  let rating: Rating;
  let ratingDescription;
  if (average < (target - 1)) {
    rating = 1;
    ratingDescription = "Not good";
  } else if (average > (target + 1)) {
    rating = 3;
    ratingDescription = "Very good";
  } else {
    rating = 2;
    ratingDescription = "Good";
  }
  return { periodLength, trainingDays, average, target, rating, ratingDescription, success };
};

if (require.main === module) {
  try {
    const { exerciseHours, target } = parseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error: ', e.message);
  }
}