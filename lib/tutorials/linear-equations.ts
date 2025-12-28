import { Tutorial } from '../types';

export const linearEquationsTutorial: Tutorial = {
  topicId: 'linear-equations',
  learningGoals: [
    'You will be able to find the slope of a line from two points',
    'You will be able to write equations in slope-intercept form (y = mx + b)',
    'You will be able to find x and y intercepts',
    'You will be able to work with parallel and perpendicular lines',
  ],
  coreRules: [
    'Slope formula: m = (y₂ - y₁)/(x₂ - x₁)',
    'Slope-intercept form: y = mx + b, where m is slope and b is y-intercept',
    'Point-slope form: y - y₁ = m(x - x₁)',
    'Parallel lines have equal slopes',
    'Perpendicular lines have slopes that are negative reciprocals (m₁ × m₂ = -1)',
  ],
  workedExamples: [
    {
      title: 'Finding Equation from Two Points',
      problem: 'Find the equation of a line through (2, 3) and (4, 7)',
      solution: [
        'Step 1: Find slope',
        'm = (7 - 3)/(4 - 2) = 4/2 = 2',
        'Step 2: Use point-slope form with (2, 3)',
        'y - 3 = 2(x - 2)',
        'Step 3: Simplify to slope-intercept form',
        'y - 3 = 2x - 4',
        'y = 2x - 1',
      ],
    },
  ],
  commonMistakes: [
    'Mixing up x and y coordinates when calculating slope',
    'Forgetting the negative sign when finding perpendicular slope',
    'Confusing slope (m) with y-intercept (b)',
  ],
  miniQuiz: [
    {
      question: 'What is the slope of the line through (1, 2) and (3, 6)?',
      options: ['2', '1/2', '4', '3'],
      correctIndex: 0,
      explanation: 'm = (6-2)/(3-1) = 4/2 = 2',
    },
    {
      question: 'What is the y-intercept of y = 3x + 5?',
      options: ['3', '5', '8', '15'],
      correctIndex: 1,
      explanation: 'In y = mx + b form, b is the y-intercept, which is 5',
    },
    {
      question: 'What is the slope perpendicular to a line with slope 2?',
      options: ['-2', '1/2', '-1/2', '2'],
      correctIndex: 2,
      explanation: 'Perpendicular slope is negative reciprocal: -1/2',
    },
  ],
};
