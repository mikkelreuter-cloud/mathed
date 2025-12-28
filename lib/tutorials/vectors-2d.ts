import { Tutorial } from '../types';

export const vectors2DTutorial: Tutorial = {
  topicId: 'vectors-2d',
  learningGoals: [
    'You will be able to add and subtract vectors',
    'You will be able to multiply vectors by scalars',
    'You will be able to calculate dot product',
    'You will be able to find vector magnitude (length)',
  ],
  coreRules: [
    'Vector notation: v = (x, y)',
    'Addition: (a, b) + (c, d) = (a+c, b+d)',
    'Scalar multiplication: k(a, b) = (ka, kb)',
    'Magnitude: |v| = √(x² + y²)',
    'Dot product: v·w = x₁x₂ + y₁y₂',
    'Unit vector: v/|v|',
  ],
  workedExamples: [
    {
      title: 'Finding Magnitude and Unit Vector',
      problem: 'Find the magnitude and unit vector of v = (3, 4)',
      solution: [
        'Step 1: Find magnitude',
        '|v| = √(3² + 4²) = √(9 + 16) = √25 = 5',
        'Step 2: Find unit vector',
        'û = v/|v| = (3, 4)/5',
        'û = (3/5, 4/5) = (0.6, 0.8)',
      ],
    },
  ],
  commonMistakes: [
    'Adding vectors incorrectly (not component-wise)',
    'Forgetting to square components in magnitude formula',
    'Confusing dot product with scalar multiplication',
  ],
  miniQuiz: [
    {
      question: 'What is (2, 3) + (4, 1)?',
      options: ['(6, 4)', '(8, 3)', '(2, 4)', '(6, 3)'],
      correctIndex: 0,
      explanation: 'Add components: (2+4, 3+1) = (6, 4)',
    },
    {
      question: 'What is 3 × (2, 5)?',
      options: ['(6, 15)', '(5, 8)', '(6, 8)', '(3, 15)'],
      correctIndex: 0,
      explanation: 'Multiply each component: (3×2, 3×5) = (6, 15)',
    },
    {
      question: 'What is the dot product of (2, 3) and (4, 1)?',
      options: ['11', '8', '6', '7'],
      correctIndex: 0,
      explanation: '2×4 + 3×1 = 8 + 3 = 11',
    },
  ],
};
