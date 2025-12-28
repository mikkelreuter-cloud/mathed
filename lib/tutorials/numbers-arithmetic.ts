import { Tutorial } from '../types';

export const numbersArithmeticTutorial: Tutorial = {
  topicId: 'numbers-arithmetic',
  learningGoals: [
    'You will be able to apply the correct order of operations',
    'You will be able to add, subtract, multiply, and divide fractions',
    'You will be able to calculate percentages',
    'You will be able to simplify arithmetic expressions',
  ],
  coreRules: [
    'Order of operations (PEMDAS/BODMAS): Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right)',
    'To add/subtract fractions with the same denominator: add/subtract numerators, keep denominator',
    'To add/subtract fractions with different denominators: find common denominator first',
    'To multiply fractions: multiply numerators and multiply denominators',
    'Percentage: To find x% of y, calculate (x/100) × y',
  ],
  workedExamples: [
    {
      title: 'Order of Operations with Parentheses',
      problem: 'Calculate: (8 + 2) × 5 - 3',
      solution: [
        'Step 1: Solve inside parentheses first',
        '(8 + 2) × 5 - 3',
        '= 10 × 5 - 3',
        'Step 2: Multiply',
        '= 50 - 3',
        'Step 3: Subtract',
        '= 47',
      ],
      explanation: 'Always work inside parentheses first, then multiplication, then subtraction.',
    },
  ],
  commonMistakes: [
    'Forgetting order of operations and calculating left to right: 2 + 3 × 4 ≠ 20, it equals 14',
    'Not finding common denominators when adding fractions: 1/2 + 1/3 ≠ 2/5',
    'Forgetting to simplify fractions in final answers',
  ],
  miniQuiz: [
    {
      question: 'What is 5 + 3 × 2?',
      options: ['16', '11', '13', '10'],
      correctIndex: 1,
      explanation: 'Multiply first (3 × 2 = 6), then add (5 + 6 = 11)',
    },
    {
      question: 'What is 1/2 + 1/4?',
      options: ['2/6', '3/4', '1/6', '2/4'],
      correctIndex: 1,
      explanation: '1/2 = 2/4, so 2/4 + 1/4 = 3/4',
    },
    {
      question: 'What is 25% of 80?',
      options: ['15', '20', '25', '30'],
      correctIndex: 1,
      explanation: '25% = 0.25, so 0.25 × 80 = 20',
    },
  ],
};
