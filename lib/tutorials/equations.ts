import { Tutorial } from '../types';

export const equationsTutorial: Tutorial = {
  topicId: 'equations',
  learningGoals: [
    'You will be able to solve one-step and two-step equations',
    'You will be able to solve equations with variables on both sides',
    'You will be able to solve equations with parentheses',
    'You will be able to check your solutions',
  ],
  coreRules: [
    'Whatever you do to one side of an equation, do to the other side',
    'To isolate a variable, use inverse operations',
    'Addition and subtraction are inverse operations',
    'Multiplication and division are inverse operations',
    'Always check your answer by substituting back into the original equation',
  ],
  workedExamples: [
    {
      title: 'Two-Step Equation',
      problem: 'Solve: 3x + 7 = 22',
      solution: [
        'Step 1: Subtract 7 from both sides',
        '3x + 7 - 7 = 22 - 7',
        '3x = 15',
        'Step 2: Divide both sides by 3',
        '3x/3 = 15/3',
        'x = 5',
        'Check: 3(5) + 7 = 15 + 7 = 22 ✓',
      ],
    },
  ],
  commonMistakes: [
    'Forgetting to apply operations to both sides',
    'Subtracting when you should add (or vice versa)',
    'Not simplifying before solving',
  ],
  miniQuiz: [
    {
      question: 'Solve: x + 5 = 12',
      options: ['x = 7', 'x = 17', 'x = 8', 'x = 6'],
      correctIndex: 0,
      explanation: 'Subtract 5 from both sides: x = 12 - 5 = 7',
    },
    {
      question: 'Solve: 4x = 20',
      options: ['x = 5', 'x = 16', 'x = 24', 'x = 80'],
      correctIndex: 0,
      explanation: 'Divide both sides by 4: x = 20/4 = 5',
    },
    {
      question: 'Solve: 2x + 3 = 11',
      options: ['x = 4', 'x = 7', 'x = 5', 'x = 6'],
      correctIndex: 0,
      explanation: 'Subtract 3: 2x = 8, then divide by 2: x = 4',
    },
  ],
};
