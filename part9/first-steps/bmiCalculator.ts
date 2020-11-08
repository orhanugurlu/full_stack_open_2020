export interface BmiParameters {
  height: number;
  weight: number;
}

export const parseBmiArguments = (args: Array<string>, startIndex = 0): BmiParameters => {
  if (args.length < startIndex + 2) throw new Error('Not enough arguments');
  if (args.length > startIndex + 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[startIndex])) && !isNaN(Number(args[startIndex + 1]))) {
    return {
      height: Number(args[startIndex]),
      weight: Number(args[startIndex + 1])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100.0;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi <= 15) {
    return "Very severely underweight";
  } else if (bmi <= 16) {
    return "Severely underweight";
  } else if (bmi <= 18.5) {
    return "Underweight";
  } else if (bmi <= 25) {
    return "Normal (healthy weight)";
  } else if (bmi <= 30) {
    return "Overweight";
  } else if (bmi <= 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi <= 40) {
    return "Obese Class II (Severely obese)";
  } else {
    return "Obese Class III (Very severely obese)";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv, 2);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error: ', e.message);
  }
}