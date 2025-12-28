import { Tutorial } from '../types';

export const trigonometryTutorial: Tutorial = {
  topicId: 'trigonometry',
  learningGoals: [
    'You will be able to use sine, cosine, and tangent in right triangles',
    'You will be able to find missing sides and angles',
    'You will be able to use the Pythagorean theorem',
    'You will be able to work with special angles (30°, 45°, 60°)',
  ],
  coreRules: [
    'SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent',
    'Pythagorean theorem: a² + b² = c² (c is hypotenuse)',
    'To find an angle, use inverse trig functions (arcsin, arccos, arctan)',
    'Complementary angles: sin(θ) = cos(90° - θ)',
  ],
  workedExamples: [
    {
      title: 'Finding a Side Using Trigonometry',
      problem: 'In a right triangle, angle A = 30° and hypotenuse = 10. Find the opposite side.',
      solution: [
        'Step 1: Identify which ratio to use',
        'We have angle and hypotenuse, want opposite → use sin',
        'Step 2: Set up equation',
        'sin(30°) = opposite/10',
        'Step 3: Solve',
        '0.5 = opposite/10',
        'opposite = 5',
      ],
    },
  ],
  commonMistakes: [
    'Confusing opposite and adjacent sides',
    'Using wrong trig ratio for the given information',
    'Forgetting to convert between degrees and radians when necessary',
  ],
  miniQuiz: [
    {
      question: 'In a right triangle, if opposite = 3 and hypotenuse = 5, what is sin(θ)?',
      options: ['3/5', '4/5', '3/4', '5/3'],
      correctIndex: 0,
      explanation: 'sin(θ) = opposite/hypotenuse = 3/5',
    },
    {
      question: 'What is tan(45°)?',
      options: ['1', '0.5', '√2', '√3'],
      correctIndex: 0,
      explanation: 'tan(45°) = 1 (special angle)',
    },
    {
      question: 'If sin(θ) = 0.6, what is cos(90° - θ)?',
      options: ['0.6', '0.8', '0.4', '1'],
      correctIndex: 0,
      explanation: 'Complementary angle identity: sin(θ) = cos(90° - θ)',
    },
  ],
};
