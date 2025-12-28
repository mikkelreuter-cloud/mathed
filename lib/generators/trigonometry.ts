import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomChoice } from '../utils/math';

export class TrigonometryGenerator extends BaseGenerator {
  constructor() {
    super('trigonometry');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'basic-sin-cos-tan',
        difficulty: 'easy',
        generate: () => {
          const angles = [0, 30, 45, 60, 90];
          const angle = randomChoice(angles);
          const func = randomChoice(['sin', 'cos', 'tan']);

          const values: Record<string, Record<number, string>> = {
            sin: { 0: '0', 30: '0.5', 45: '0.71', 60: '0.87', 90: '1' },
            cos: { 0: '1', 30: '0.87', 45: '0.71', 60: '0.5', 90: '0' },
            tan: { 0: '0', 30: '0.58', 45: '1', 60: '1.73', 90: 'undefined' },
          };

          const answer = values[func][angle];

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Calculate ${func}(${angle}°) (round to 2 decimal places)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: answer,
            tolerance: 0.02,
            hints: [
              `Use the unit circle or special angles`,
              `${func}(${angle}°) is a standard angle value`,
            ],
            workedSolution: [
              `${func}(${angle}°) = ${answer}`,
            ],
            metadata: {
              templateId: 'basic-sin-cos-tan',
              generatedAt: new Date().toISOString(),
              variables: { angle, func },
            },
          };
        },
      },
      {
        id: 'right-triangle-side',
        difficulty: 'medium',
        generate: () => {
          const adjacent = randomInt(3, 12);
          const opposite = randomInt(3, 12);
          const hypotenuse = Math.sqrt(adjacent ** 2 + opposite ** 2);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `In a right triangle, if the adjacent side is ${adjacent} and the opposite side is ${opposite}, find the hypotenuse (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: hypotenuse.toFixed(2),
            tolerance: 0.01,
            hints: [
              'Use the Pythagorean theorem: a² + b² = c²',
              `${adjacent}² + ${opposite}² = c²`,
              'Take the square root of both sides',
            ],
            workedSolution: [
              `c² = ${adjacent}² + ${opposite}²`,
              `c² = ${adjacent ** 2} + ${opposite ** 2}`,
              `c² = ${adjacent ** 2 + opposite ** 2}`,
              `c = √${adjacent ** 2 + opposite ** 2}`,
              `c = ${hypotenuse.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'right-triangle-side',
              generatedAt: new Date().toISOString(),
              variables: { adjacent, opposite, hypotenuse },
            },
          };
        },
      },
      {
        id: 'find-angle',
        difficulty: 'medium',
        generate: () => {
          const opposite = randomInt(3, 10);
          const adjacent = randomInt(3, 10);
          const angleRad = Math.atan(opposite / adjacent);
          const angleDeg = (angleRad * 180) / Math.PI;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find angle θ (in degrees) if tan(θ) = ${opposite}/${adjacent} (round to 1 decimal)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: angleDeg.toFixed(1),
            tolerance: 0.1,
            hints: [
              'Use the inverse tangent function',
              `θ = arctan(${opposite}/${adjacent})`,
              'Convert to degrees if needed',
            ],
            workedSolution: [
              `θ = arctan(${opposite}/${adjacent})`,
              `θ = arctan(${(opposite / adjacent).toFixed(2)})`,
              `θ = ${angleDeg.toFixed(1)}°`,
            ],
            metadata: {
              templateId: 'find-angle',
              generatedAt: new Date().toISOString(),
              variables: { opposite, adjacent, angleDeg },
            },
          };
        },
      },
      {
        id: 'solve-triangle-side',
        difficulty: 'hard',
        generate: () => {
          const angle = randomChoice([30, 45, 60]);
          const adjacent = randomInt(5, 15);
          const opposite = adjacent * Math.tan((angle * Math.PI) / 180);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `In a right triangle, if one angle is ${angle}° and the adjacent side is ${adjacent}, find the opposite side (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: opposite.toFixed(2),
            tolerance: 0.01,
            hints: [
              'Use tan(θ) = opposite/adjacent',
              `tan(${angle}°) = opposite/${adjacent}`,
              'Solve for opposite',
            ],
            workedSolution: [
              `tan(${angle}°) = opposite/${adjacent}`,
              `opposite = ${adjacent} × tan(${angle}°)`,
              `opposite = ${adjacent} × ${Math.tan((angle * Math.PI) / 180).toFixed(2)}`,
              `opposite = ${opposite.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'solve-triangle-side',
              generatedAt: new Date().toISOString(),
              variables: { angle, adjacent, opposite },
            },
          };
        },
      },
      {
        id: 'sin-cos-relationship',
        difficulty: 'easy',
        generate: () => {
          const angle = randomChoice([30, 45, 60]);
          const complementAngle = 90 - angle;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `If sin(${angle}°) = x, what is cos(${complementAngle}°)?`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: 'x',
            hints: [
              'Remember: sin(θ) = cos(90° - θ)',
              `${angle}° and ${complementAngle}° are complementary angles`,
              'Complementary angles have this special relationship',
            ],
            workedSolution: [
              `sin(${angle}°) = cos(90° - ${angle}°)`,
              `sin(${angle}°) = cos(${complementAngle}°)`,
              `If sin(${angle}°) = x, then cos(${complementAngle}°) = x`,
            ],
            metadata: {
              templateId: 'sin-cos-relationship',
              generatedAt: new Date().toISOString(),
              variables: { angle, complementAngle },
            },
          };
        },
      },
    ];
  }
}
