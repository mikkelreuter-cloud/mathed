import { Tutorial } from '../types';

export const quadraticPolynomialsTutorial: Tutorial = {
  topicId: 'quadratic-polynomials',
  learningGoals: [
    'You will be able to convert between standard and vertex form',
    'You will be able to identify key features (vertex, axis of symmetry)',
    'You will be able to describe transformations of parabolas',
    'You will be able to find maximum and minimum values',
  ],
  coreRules: [
    'Standard form: y = ax² + bx + c',
    'Vertex form: y = a(x - h)² + k, where (h, k) is the vertex',
    'Axis of symmetry: x = h (in vertex form) or x = -b/(2a) (in standard form)',
    'If a > 0, parabola opens up (minimum at vertex); if a < 0, opens down (maximum at vertex)',
    'To complete the square: take half of b, square it, add and subtract',
  ],
  workedExamples: [
    {
      title: 'Converting to Vertex Form',
      problem: 'Convert y = x² - 6x + 11 to vertex form',
      solution: [
        'Step 1: Group x terms',
        'y = (x² - 6x) + 11',
        'Step 2: Complete the square',
        'Half of -6 is -3, (-3)² = 9',
        'y = (x² - 6x + 9 - 9) + 11',
        'Step 3: Factor and simplify',
        'y = (x - 3)² + 2',
        'Vertex: (3, 2)',
      ],
    },
  ],
  commonMistakes: [
    'Forgetting to add AND subtract when completing the square',
    'Sign errors in vertex form (x - h) vs (x + h)',
    'Confusing maximum and minimum based on sign of a',
  ],
  miniQuiz: [
    {
      question: 'What is the vertex of y = (x - 2)² + 5?',
      options: ['(2, 5)', '(-2, 5)', '(2, -5)', '(-2, -5)'],
      correctIndex: 0,
      explanation: 'In y = (x - h)² + k, vertex is (h, k) = (2, 5)',
    },
    {
      question: 'Does y = -2x² + 4x - 1 have a maximum or minimum?',
      options: ['Maximum', 'Minimum', 'Neither', 'Both'],
      correctIndex: 0,
      explanation: 'a = -2 < 0, so parabola opens down and has a maximum',
    },
    {
      question: 'What is the axis of symmetry of y = x² - 8x + 3?',
      options: ['x = 4', 'x = -4', 'x = 8', 'x = 3'],
      correctIndex: 0,
      explanation: 'x = -b/(2a) = -(-8)/(2×1) = 4',
    },
  ],
};
