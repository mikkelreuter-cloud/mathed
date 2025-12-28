import { Tutorial } from '../types';

export const geometryTutorial: Tutorial = {
  topicId: 'geometry',
  learningGoals: [
    'You will be able to calculate area and perimeter of common shapes',
    'You will be able to calculate volume of 3D shapes',
    'You will be able to apply the Pythagorean theorem',
    'You will be able to work with similar figures and scale factors',
  ],
  coreRules: [
    'Rectangle: Area = length × width, Perimeter = 2(length + width)',
    'Triangle: Area = ½ × base × height',
    'Circle: Area = πr², Circumference = 2πr',
    'Pythagorean theorem: a² + b² = c²',
    'Volume of rectangular prism = length × width × height',
    'Volume of cylinder = πr²h',
  ],
  workedExamples: [
    {
      title: 'Finding Area of Composite Shape',
      problem: 'Find the area of a shape made of a rectangle (5×3) and a semicircle (radius 2.5) on top',
      solution: [
        'Step 1: Area of rectangle',
        'A_rect = 5 × 3 = 15',
        'Step 2: Area of semicircle',
        'A_semi = ½πr² = ½π(2.5)² ≈ 9.82',
        'Step 3: Total area',
        'Total = 15 + 9.82 = 24.82',
      ],
    },
  ],
  commonMistakes: [
    'Confusing area and perimeter formulas',
    'Forgetting to square the radius in circle area',
    'Using diameter instead of radius (or vice versa)',
  ],
  miniQuiz: [
    {
      question: 'What is the area of a rectangle with length 8 and width 5?',
      options: ['40', '26', '13', '45'],
      correctIndex: 0,
      explanation: 'Area = length × width = 8 × 5 = 40',
    },
    {
      question: 'What is the area of a circle with radius 3? (use π ≈ 3.14)',
      options: ['18.84', '28.26', '9.42', '6.28'],
      correctIndex: 1,
      explanation: 'Area = πr² = 3.14 × 3² = 3.14 × 9 = 28.26',
    },
    {
      question: 'In a right triangle with legs 6 and 8, what is the hypotenuse?',
      options: ['10', '14', '12', '100'],
      correctIndex: 0,
      explanation: 'c² = 6² + 8² = 36 + 64 = 100, so c = 10',
    },
  ],
};
