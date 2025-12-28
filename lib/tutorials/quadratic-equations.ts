import { Tutorial } from '../types';

export const quadraticEquationsTutorial: Tutorial = {
  topicId: 'quadratic-equations',
  learningGoals: [
    'You will be able to solve quadratic equations by factoring',
    'You will be able to use the quadratic formula',
    'You will be able to calculate and interpret the discriminant',
    'You will be able to complete the square',
  ],
  coreRules: [
    'Standard form: ax² + bx + c = 0',
    'Quadratic formula: x = (-b ± √(b² - 4ac))/(2a)',
    'Discriminant: Δ = b² - 4ac tells us about the roots',
    'If Δ > 0: two real solutions; Δ = 0: one solution; Δ < 0: no real solutions',
    'Vertex form: a(x - h)² + k, where (h, k) is the vertex',
  ],
  workedExamples: [
    {
      title: 'Solving by Quadratic Formula',
      problem: 'Solve: x² + 5x + 6 = 0',
      solution: [
        'Step 1: Identify a = 1, b = 5, c = 6',
        'Step 2: Apply quadratic formula',
        'x = (-5 ± √(5² - 4(1)(6)))/(2(1))',
        'x = (-5 ± √(25 - 24))/2',
        'x = (-5 ± 1)/2',
        'x = -2 or x = -3',
      ],
    },
  ],
  commonMistakes: [
    'Forgetting the ± symbol in the quadratic formula',
    'Errors in calculating the discriminant',
    'Not checking both possible solutions',
  ],
  miniQuiz: [
    {
      question: 'What is the discriminant of x² + 6x + 9 = 0?',
      options: ['0', '36', '9', '45'],
      correctIndex: 0,
      explanation: 'Δ = 6² - 4(1)(9) = 36 - 36 = 0',
    },
    {
      question: 'How many real solutions does x² + 2x + 5 = 0 have?',
      options: ['0', '1', '2', '3'],
      correctIndex: 0,
      explanation: 'Δ = 4 - 20 = -16 < 0, so no real solutions',
    },
    {
      question: 'Solve by factoring: x² - 5x + 6 = 0',
      options: ['x = 2 or 3', 'x = -2 or -3', 'x = 1 or 6', 'x = -1 or -6'],
      correctIndex: 0,
      explanation: '(x-2)(x-3) = 0, so x = 2 or x = 3',
    },
  ],
};
