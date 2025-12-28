import { Tutorial } from '../types';

export const functionsTutorial: Tutorial = {
  topicId: 'functions',
  learningGoals: [
    'You will be able to evaluate functions at given values',
    'You will be able to find the domain and range of functions',
    'You will be able to work with function composition',
    'You will be able to find inverse functions',
  ],
  coreRules: [
    'Function notation: f(x) means "f of x"',
    'To evaluate f(a), substitute a for x in the function',
    'Domain: all possible input values (x)',
    'Range: all possible output values (f(x))',
    'Composition: (f ∘ g)(x) = f(g(x))',
  ],
  workedExamples: [
    {
      title: 'Evaluating and Composing Functions',
      problem: 'If f(x) = 2x + 1 and g(x) = x², find f(g(3))',
      solution: [
        'Step 1: Find g(3)',
        'g(3) = 3² = 9',
        'Step 2: Find f(9)',
        'f(9) = 2(9) + 1 = 18 + 1 = 19',
        'Therefore, f(g(3)) = 19',
      ],
    },
  ],
  commonMistakes: [
    'Confusing f(x) with f×x (multiplication)',
    'Evaluating composition in wrong order',
    'Forgetting to substitute correctly',
  ],
  miniQuiz: [
    {
      question: 'If f(x) = 3x - 2, what is f(4)?',
      options: ['10', '12', '14', '8'],
      correctIndex: 0,
      explanation: 'f(4) = 3(4) - 2 = 12 - 2 = 10',
    },
    {
      question: 'What is the slope of f(x) = 5x + 3?',
      options: ['3', '5', '8', '15'],
      correctIndex: 1,
      explanation: 'In f(x) = mx + b, the slope is m = 5',
    },
    {
      question: 'If f(x) = x + 2 and g(x) = 3x, what is f(g(2))?',
      options: ['8', '12', '6', '10'],
      correctIndex: 0,
      explanation: 'g(2) = 6, then f(6) = 6 + 2 = 8',
    },
  ],
};
