import { Tutorial } from '../types';

export const combinatoricsTutorial: Tutorial = {
  topicId: 'combinatorics',
  learningGoals: [
    'You will be able to calculate permutations',
    'You will be able to calculate combinations',
    'You will be able to distinguish when order matters',
    'You will be able to work with factorials',
  ],
  coreRules: [
    'Factorial: n! = n × (n-1) × (n-2) × ... × 2 × 1',
    'Permutation (order matters): P(n,r) = n!/(n-r)!',
    'Combination (order does not matter): C(n,r) = n!/(r!(n-r)!)',
    'Fundamental counting principle: multiply the number of choices at each step',
  ],
  workedExamples: [
    {
      title: 'Combination Problem',
      problem: 'How many ways can you choose 3 people from a group of 7?',
      solution: [
        'Step 1: Order does not matter → use combination',
        'Step 2: Apply formula',
        'C(7,3) = 7!/(3!×4!)',
        'Step 3: Calculate',
        '= (7×6×5×4!)/(3!×4!)',
        '= (7×6×5)/(3×2×1)',
        '= 210/6 = 35',
      ],
    },
  ],
  commonMistakes: [
    'Using permutation when you should use combination (or vice versa)',
    'Forgetting to simplify factorials',
    'Not recognizing when to use fundamental counting principle',
  ],
  miniQuiz: [
    {
      question: 'What is 5!?',
      options: ['120', '25', '15', '60'],
      correctIndex: 0,
      explanation: '5! = 5×4×3×2×1 = 120',
    },
    {
      question: 'Does arranging 4 books on a shelf use permutation or combination?',
      options: ['Permutation', 'Combination', 'Neither', 'Both'],
      correctIndex: 0,
      explanation: 'Order matters (different arrangements), so use permutation',
    },
    {
      question: 'How many 2-digit codes can be made from digits 1-5 (with repetition)?',
      options: ['25', '20', '10', '15'],
      correctIndex: 0,
      explanation: '5 choices for first digit × 5 for second = 25',
    },
  ],
};
