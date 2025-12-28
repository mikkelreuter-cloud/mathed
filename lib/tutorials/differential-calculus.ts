import { Tutorial } from '../types';

export const differentialCalculusTutorial: Tutorial = {
  topicId: 'differential-calculus',
  learningGoals: [
    'You will be able to find derivatives using basic rules',
    'You will be able to find slopes of tangent lines',
    'You will be able to find critical points',
    'You will be able to solve basic optimization problems',
  ],
  coreRules: [
    'Power rule: d/dx(x^n) = nx^(n-1)',
    'Constant rule: d/dx(c) = 0',
    'Sum rule: d/dx(f + g) = f\' + g\'',
    'Constant multiple: d/dx(cf) = c·f\'',
    'Derivative gives slope of tangent line',
    'Critical points occur where f\'(x) = 0 or f\' is undefined',
  ],
  workedExamples: [
    {
      title: 'Finding Maximum Value',
      problem: 'Find the maximum of f(x) = -x² + 4x + 1',
      solution: [
        'Step 1: Find derivative',
        'f\'(x) = -2x + 4',
        'Step 2: Set f\'(x) = 0',
        '-2x + 4 = 0',
        'x = 2',
        'Step 3: Find f(2)',
        'f(2) = -(2)² + 4(2) + 1 = -4 + 8 + 1 = 5',
        'Maximum value is 5 at x = 2',
      ],
    },
  ],
  commonMistakes: [
    'Forgetting to reduce exponent by 1 in power rule',
    'Not distinguishing between f(x) and f\'(x)',
    'Thinking derivative is always positive',
  ],
  miniQuiz: [
    {
      question: 'What is d/dx(x³)?',
      options: ['3x²', 'x²', '3x³', 'x⁴'],
      correctIndex: 0,
      explanation: 'Power rule: bring down 3, reduce exponent: 3x²',
    },
    {
      question: 'What is the derivative of 5x + 7?',
      options: ['5', '7', '5x', '12'],
      correctIndex: 0,
      explanation: 'd/dx(5x) = 5, d/dx(7) = 0, so derivative is 5',
    },
    {
      question: 'Where is the critical point of f(x) = x² - 6x?',
      options: ['x = 3', 'x = 0', 'x = -3', 'x = 6'],
      correctIndex: 0,
      explanation: 'f\'(x) = 2x - 6 = 0 when x = 3',
    },
  ],
};
