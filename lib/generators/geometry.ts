import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomChoice } from '../utils/math';

export class GeometryGenerator extends BaseGenerator {
  constructor() {
    super('geometry');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'rectangle-area',
        difficulty: 'easy',
        generate: () => {
          const length = randomInt(5, 20);
          const width = randomInt(3, 15);
          const area = length * width;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the area of a rectangle with length ${length} and width ${width}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: area.toString(),
            hints: [
              'Area of rectangle = length × width',
              `A = ${length} × ${width}`,
            ],
            workedSolution: [
              `A = length × width`,
              `A = ${length} × ${width}`,
              `A = ${area}`,
            ],
            metadata: {
              templateId: 'rectangle-area',
              generatedAt: new Date().toISOString(),
              variables: { length, width, area },
            },
          };
        },
      },
      {
        id: 'circle-area',
        difficulty: 'easy',
        generate: () => {
          const radius = randomInt(3, 12);
          const area = Math.PI * radius ** 2;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the area of a circle with radius ${radius} (use π ≈ 3.14, round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: area.toFixed(2),
            tolerance: 0.1,
            hints: [
              'Area of circle = πr²',
              `A = π × ${radius}²`,
              `A = π × ${radius ** 2}`,
            ],
            workedSolution: [
              `A = πr²`,
              `A = π × ${radius}²`,
              `A = π × ${radius ** 2}`,
              `A ≈ ${area.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'circle-area',
              generatedAt: new Date().toISOString(),
              variables: { radius, area },
            },
          };
        },
      },
      {
        id: 'triangle-area',
        difficulty: 'easy',
        generate: () => {
          const base = randomInt(6, 20);
          const height = randomInt(4, 16);
          const area = (base * height) / 2;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the area of a triangle with base ${base} and height ${height}`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: area.toFixed(1),
            tolerance: 0.1,
            hints: [
              'Area of triangle = ½ × base × height',
              `A = ½ × ${base} × ${height}`,
            ],
            workedSolution: [
              `A = ½ × base × height`,
              `A = ½ × ${base} × ${height}`,
              `A = ${area}`,
            ],
            metadata: {
              templateId: 'triangle-area',
              generatedAt: new Date().toISOString(),
              variables: { base, height, area },
            },
          };
        },
      },
      {
        id: 'pythagorean-theorem',
        difficulty: 'medium',
        generate: () => {
          const a = randomInt(3, 12);
          const b = randomInt(3, 12);
          const c = Math.sqrt(a ** 2 + b ** 2);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `In a right triangle with legs ${a} and ${b}, find the hypotenuse (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: c.toFixed(2),
            tolerance: 0.01,
            hints: [
              'Use Pythagorean theorem: a² + b² = c²',
              `${a}² + ${b}² = c²`,
              'Take the square root to find c',
            ],
            workedSolution: [
              `c² = a² + b²`,
              `c² = ${a}² + ${b}²`,
              `c² = ${a ** 2} + ${b ** 2}`,
              `c² = ${a ** 2 + b ** 2}`,
              `c = ${c.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'pythagorean-theorem',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c },
            },
          };
        },
      },
      {
        id: 'cylinder-volume',
        difficulty: 'hard',
        generate: () => {
          const radius = randomInt(3, 10);
          const height = randomInt(5, 15);
          const volume = Math.PI * radius ** 2 * height;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Find the volume of a cylinder with radius ${radius} and height ${height} (use π ≈ 3.14, round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: volume.toFixed(2),
            tolerance: 1,
            hints: [
              'Volume of cylinder = πr²h',
              `V = π × ${radius}² × ${height}`,
              `V = π × ${radius ** 2} × ${height}`,
            ],
            workedSolution: [
              `V = πr²h`,
              `V = π × ${radius}² × ${height}`,
              `V = π × ${radius ** 2} × ${height}`,
              `V ≈ ${volume.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'cylinder-volume',
              generatedAt: new Date().toISOString(),
              variables: { radius, height, volume },
            },
          };
        },
      },
    ];
  }
}
