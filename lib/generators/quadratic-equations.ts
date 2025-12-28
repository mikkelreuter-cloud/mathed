import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomIntExcluding } from '../utils/math';

export class QuadraticEquationsGenerator extends BaseGenerator {
  constructor() {
    super('quadratic-equations');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      // Template 1: Simple factoring (x² + bx + c = 0)
      {
        id: 'simple-factoring',
        difficulty: 'easy',
        generate: () => {
          const r1 = randomInt(1, 8);
          const r2 = randomInt(1, 8);
          const b = -(r1 + r2);
          const c = r1 * r2;

          const roots = [r1, r2].sort((a, b) => a - b);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Solve by factoring: x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c} = 0`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: [`x = ${roots[0]}, x = ${roots[1]}`, `x = ${roots[0]} or x = ${roots[1]}`],
            hints: [
              `Find two numbers that multiply to ${c} and add to ${b}`,
              `The numbers are ${-r1} and ${-r2}`,
              `Factor as (x - ${r1})(x - ${r2}) = 0`,
            ],
            workedSolution: [
              `x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c} = 0`,
              `(x - ${r1})(x - ${r2}) = 0`,
              `x - ${r1} = 0 or x - ${r2} = 0`,
              `x = ${r1} or x = ${r2}`,
            ],
            metadata: {
              templateId: 'simple-factoring',
              generatedAt: new Date().toISOString(),
              variables: { r1, r2, b, c },
            },
          };
        },
      },

      // Template 2: Discriminant calculation
      {
        id: 'discriminant',
        difficulty: 'easy',
        generate: () => {
          const a = randomIntExcluding(1, 5, [0]);
          const b = randomInt(-10, 10);
          const c = randomInt(-10, 10);
          const discriminant = b * b - 4 * a * c;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Calculate the discriminant of ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c} = 0`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: discriminant.toString(),
            hints: [
              'The discriminant is b² - 4ac',
              `a = ${a}, b = ${b}, c = ${c}`,
              `Calculate ${b}² - 4(${a})(${c})`,
            ],
            workedSolution: [
              `Discriminant = b² - 4ac`,
              `= ${b}² - 4(${a})(${c})`,
              `= ${b * b} - ${4 * a * c}`,
              `= ${discriminant}`,
            ],
            metadata: {
              templateId: 'discriminant',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c, discriminant },
            },
          };
        },
      },

      // Template 3: Quadratic formula
      {
        id: 'quadratic-formula',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(1, 3, [0]);
          const r1 = randomInt(1, 6);
          const r2 = randomInt(1, 6);
          const b = -a * (r1 + r2);
          const c = a * r1 * r2;

          const roots = [r1, r2].sort((a, b) => a - b);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Solve using the quadratic formula: ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c} = 0`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: [`x = ${roots[0]}, x = ${roots[1]}`, `x = ${roots[0]} or x = ${roots[1]}`],
            hints: [
              'Use x = (-b ± √(b² - 4ac))/(2a)',
              `a = ${a}, b = ${b}, c = ${c}`,
              'Calculate the discriminant first',
            ],
            workedSolution: [
              `x = (-b ± √(b² - 4ac))/(2a)`,
              `x = (${-b} ± √(${b}² - 4(${a})(${c})))/(2(${a}))`,
              `x = (${-b} ± √${b * b - 4 * a * c})/(${2 * a})`,
              `x = ${roots[0]} or x = ${roots[1]}`,
            ],
            metadata: {
              templateId: 'quadratic-formula',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c, r1, r2 },
            },
          };
        },
      },

      // Template 4: Completing the square
      {
        id: 'completing-square',
        difficulty: 'hard',
        generate: () => {
          const h = randomInt(1, 8);
          const k = randomInt(1, 10);
          const b = -2 * h;
          const c = h * h + k;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Complete the square: x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}. Write in the form (x - h)² + k`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `(x - ${h})^2 + ${k}`,
            hints: [
              'Take half of the coefficient of x and square it',
              `Half of ${b} is ${b / 2}, squared is ${(b / 2) ** 2}`,
              'Rewrite in vertex form',
            ],
            workedSolution: [
              `x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`,
              `x² ${b >= 0 ? '+' : ''} ${b}x + ${(b / 2) ** 2} - ${(b / 2) ** 2} ${c >= 0 ? '+' : ''} ${c}`,
              `(x ${b / 2 >= 0 ? '+' : ''} ${b / 2})² + ${c - (b / 2) ** 2}`,
              `(x - ${h})² + ${k}`,
            ],
            metadata: {
              templateId: 'completing-square',
              generatedAt: new Date().toISOString(),
              variables: { h, k, b, c },
            },
          };
        },
      },

      // Template 5: Finding vertex
      {
        id: 'find-vertex',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(1, 4, [0]);
          const h = randomInt(1, 8);
          const k = randomInt(1, 10);
          const b = -2 * a * h;
          const c = a * h * h + k;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the vertex of y = ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`,
            inputType: 'short',
            expectedAnswerFormat: 'coordinate',
            correctAnswer: `(${h}, ${k})`,
            hints: [
              'The x-coordinate of the vertex is -b/(2a)',
              `h = -${b}/(2×${a}) = ${h}`,
              'Substitute x = h into the equation to find k',
            ],
            workedSolution: [
              `h = -b/(2a) = -${b}/(2×${a}) = ${h}`,
              `k = ${a}(${h})² ${b >= 0 ? '+' : ''} ${b}(${h}) ${c >= 0 ? '+' : ''} ${c}`,
              `k = ${a * h * h} ${b * h >= 0 ? '+' : ''} ${b * h} ${c >= 0 ? '+' : ''} ${c} = ${k}`,
              `Vertex: (${h}, ${k})`,
            ],
            metadata: {
              templateId: 'find-vertex',
              generatedAt: new Date().toISOString(),
              variables: { a, h, k, b, c },
            },
          };
        },
      },
    ];
  }
}
