interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (args: Array<number>, targetHour: number): Result => {
  const periodLength = args.length
  const target = targetHour
  const trainingDays = args.filter(h => h > 0).length

  const average = args.reduce((sum, h) => sum += h) / periodLength
  const success = average  >= target

  const metric = (average - target) / target
  let rating
  let ratingDescription
  switch (true) {
    case (metric < -0.5):
      rating = 1
      ratingDescription = 'try harder'
      break
    case (metric < 0):
      rating = 2
      ratingDescription = 'not too bad but could be better'
      break
    case (metric >= 0):
      rating = 3
      ratingDescription = 'well done'
      break
    default:
      throw new Error('Provided values were not numbers')
  }
  return {periodLength, trainingDays, success, rating, ratingDescription, target, average}
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}
