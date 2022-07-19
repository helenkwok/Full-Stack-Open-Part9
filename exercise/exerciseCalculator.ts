interface ExerciseInputs {
  numArr: Array<number>,
  tar: number
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArguments = (args: Array<string>): ExerciseInputs => {
  const entry = args.slice(2);
  const tar = Number(entry[0]);
  const inputArr =  entry.slice(1);

  if (inputArr.length < 1) throw new Error('Not enough arguments');
  const numArr = inputArr.map(arg => Number(arg));

  if (numArr.filter((arg: number) => isNaN(arg)).length === 0 && !isNaN(tar)) {
    return {numArr, tar};
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (args: Array<number>, targetHour: number): Result => {
  const periodLength = args.length;
  const target = targetHour;
  const trainingDays = args.filter(h => h > 0).length;

  const average = args.reduce((sum, h) => sum += h) / periodLength;
  const success = average  >= target;

  let rating;
  let ratingDescription;
  switch (true) {
    case (target - average <= 0):
      rating = 3;
      ratingDescription = 'well done';
      break;
    case (target - average <= 1):
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
    case (target - average > 1):
      rating = 1;
      ratingDescription = 'try harder';
      break;
    default:
      throw new Error('Provided values were not numbers');
  }

  return {periodLength, trainingDays, success, rating, ratingDescription, target, average};
};

try {
  const { numArr, tar } = parseArguments(process.argv);
  console.log(calculateExercises(numArr, tar));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
