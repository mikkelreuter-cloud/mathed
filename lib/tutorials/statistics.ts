import { Tutorial } from '../types';

export const statisticsTutorial: Tutorial = {
  topicId: 'statistics',
  learningGoals: [
    'You will be able to calculate mean, median, and mode',
    'You will be able to find variance and standard deviation',
    'You will be able to interpret measures of central tendency',
    'You will be able to understand data spread',
  ],
  coreRules: [
    'Mean (average): sum of all values / number of values',
    'Median: middle value when data is ordered (or average of two middle values if even count)',
    'Mode: most frequently occurring value',
    'Variance: average of squared deviations from mean',
    'Standard deviation: σ = √variance',
  ],
  workedExamples: [
    {
      title: 'Calculating Standard Deviation',
      problem: 'Find the standard deviation of: 2, 4, 6, 8',
      solution: [
        'Step 1: Find mean',
        'Mean = (2+4+6+8)/4 = 5',
        'Step 2: Find squared deviations',
        '(2-5)² = 9, (4-5)² = 1, (6-5)² = 1, (8-5)² = 9',
        'Step 3: Find variance',
        'Variance = (9+1+1+9)/4 = 5',
        'Step 4: Standard deviation',
        'σ = √5 ≈ 2.24',
      ],
    },
  ],
  commonMistakes: [
    'Forgetting to order data before finding median',
    'Not squaring the deviations when calculating variance',
    'Forgetting to take square root for standard deviation',
  ],
  miniQuiz: [
    {
      question: 'What is the mean of 3, 7, 11, 15?',
      options: ['9', '10', '8', '11'],
      correctIndex: 0,
      explanation: 'Mean = (3+7+11+15)/4 = 36/4 = 9',
    },
    {
      question: 'What is the median of 2, 5, 8, 9, 12?',
      options: ['8', '7', '9', '5'],
      correctIndex: 0,
      explanation: 'Middle value of ordered data is 8',
    },
    {
      question: 'If variance is 16, what is standard deviation?',
      options: ['4', '16', '8', '256'],
      correctIndex: 0,
      explanation: 'σ = √variance = √16 = 4',
    },
  ],
};
