import { Tutorial } from '../types';

export const probabilityTutorial: Tutorial = {
  topicId: 'probability',
  learningGoals: [
    'You will be able to calculate simple probabilities',
    'You will be able to work with independent and dependent events',
    'You will be able to use conditional probability',
    'You will be able to find complementary probabilities',
  ],
  coreRules: [
    'Probability = (favorable outcomes)/(total outcomes)',
    'Probability is always between 0 and 1 (or 0% and 100%)',
    'For independent events: P(A and B) = P(A) × P(B)',
    'Complementary probability: P(not A) = 1 - P(A)',
    'Conditional probability: P(B|A) = P(A and B)/P(A)',
  ],
  workedExamples: [
    {
      title: 'Probability of Independent Events',
      problem: 'What is the probability of flipping heads twice in a row?',
      solution: [
        'Step 1: Probability of first heads',
        'P(H₁) = 1/2',
        'Step 2: Probability of second heads',
        'P(H₂) = 1/2',
        'Step 3: Since independent, multiply',
        'P(both) = 1/2 × 1/2 = 1/4',
      ],
    },
  ],
  commonMistakes: [
    'Adding probabilities when you should multiply (for "and")',
    'Forgetting that probabilities must sum to 1',
    'Confusing independent and dependent events',
  ],
  miniQuiz: [
    {
      question: 'What is the probability of rolling a 4 on a standard die?',
      options: ['1/6', '1/4', '1/2', '4/6'],
      correctIndex: 0,
      explanation: 'One favorable outcome out of six: 1/6',
    },
    {
      question: 'If P(A) = 0.3, what is P(not A)?',
      options: ['0.7', '0.3', '1.3', '0'],
      correctIndex: 0,
      explanation: 'P(not A) = 1 - P(A) = 1 - 0.3 = 0.7',
    },
    {
      question: 'If P(A) = 1/2 and P(B) = 1/3, and they are independent, what is P(A and B)?',
      options: ['1/6', '5/6', '2/5', '1/2'],
      correctIndex: 0,
      explanation: 'P(A and B) = 1/2 × 1/3 = 1/6',
    },
  ],
};
