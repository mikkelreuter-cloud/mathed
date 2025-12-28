import { Tutorial } from '../types';

export const analyticGeometryTutorial: Tutorial = {
  topicId: 'analytic-geometry',
  learningGoals: [
    'You will be able to find distance between two points',
    'You will be able to find midpoint of a line segment',
    'You will be able to write equations of lines and circles',
    'You will be able to work with parallel and perpendicular lines',
  ],
  coreRules: [
    'Distance formula: d = √((x₂-x₁)² + (y₂-y₁)²)',
    'Midpoint formula: M = ((x₁+x₂)/2, (y₁+y₂)/2)',
    'Line equation: y = mx + b or y - y₁ = m(x - x₁)',
    'Circle equation: (x-h)² + (y-k)² = r²',
    'Parallel lines have equal slopes',
    'Perpendicular lines have negative reciprocal slopes',
  ],
  workedExamples: [
    {
      title: 'Finding Circle Equation',
      problem: 'Write the equation of a circle with center (3, -2) and radius 5',
      solution: [
        'Step 1: Identify h, k, r',
        'h = 3, k = -2, r = 5',
        'Step 2: Use circle equation formula',
        '(x - h)² + (y - k)² = r²',
        'Step 3: Substitute',
        '(x - 3)² + (y - (-2))² = 5²',
        '(x - 3)² + (y + 2)² = 25',
      ],
    },
  ],
  commonMistakes: [
    'Mixing up coordinates in distance and midpoint formulas',
    'Sign errors in circle equation',
    'Forgetting to square the radius in circle equation',
  ],
  miniQuiz: [
    {
      question: 'What is the distance between (0, 0) and (3, 4)?',
      options: ['5', '7', '12', '25'],
      correctIndex: 0,
      explanation: 'd = √(3² + 4²) = √25 = 5',
    },
    {
      question: 'What is the midpoint of (2, 6) and (8, 4)?',
      options: ['(5, 5)', '(4, 5)', '(6, 5)', '(5, 4)'],
      correctIndex: 0,
      explanation: 'M = ((2+8)/2, (6+4)/2) = (5, 5)',
    },
    {
      question: 'If a line has slope 2, what is the slope of a perpendicular line?',
      options: ['-1/2', '2', '-2', '1/2'],
      correctIndex: 0,
      explanation: 'Perpendicular slope is negative reciprocal: -1/2',
    },
  ],
};
