import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomIntExcluding } from '../utils/math';

export class EquationsGenerator extends BaseGenerator {
  constructor() {
    super('equations');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      // Template 1: Simple one-step equation (x + a = b)
      {
        id: 'one-step-add',
        difficulty: 'easy',
        generate: () => {
          const a = randomInt(1, 20);
          const x = randomInt(1, 30);
          const b = x + a;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Solve for x: x + ${a} = ${b}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: x.toString(),
            hints: [
              'Isolate x by subtracting the same number from both sides',
              `Subtract ${a} from both sides`,
              `x = ${b} - ${a}`,
            ],
            workedSolution: [
              `x + ${a} = ${b}`,
              `x = ${b} - ${a}`,
              `x = ${x}`,
            ],
            metadata: {
              templateId: 'one-step-add',
              generatedAt: new Date().toISOString(),
              variables: { a, x, b },
            },
          };
        },
      },

      // Template 2: One-step multiplication (ax = b)
      {
        id: 'one-step-mult',
        difficulty: 'easy',
        generate: () => {
          const a = randomIntExcluding(2, 10, [0, 1]);
          const x = randomInt(1, 15);
          const b = a * x;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Solve for x: ${a}x = ${b}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: x.toString(),
            hints: [
              'Divide both sides by the coefficient of x',
              `Divide both sides by ${a}`,
              `x = ${b}/${a}`,
            ],
            workedSolution: [`${a}x = ${b}`, `x = ${b}/${a}`, `x = ${x}`],
            metadata: {
              templateId: 'one-step-mult',
              generatedAt: new Date().toISOString(),
              variables: { a, x, b },
            },
          };
        },
      },

      // Template 3: Two-step equation (ax + b = c)
      {
        id: 'two-step',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(2, 8, [0, 1]);
          const b = randomInt(1, 20);
          const x = randomInt(1, 15);
          const c = a * x + b;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Solve for x: ${a}x + ${b} = ${c}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: x.toString(),
            hints: [
              `First subtract ${b} from both sides`,
              `Then divide by ${a}`,
              'Simplify to find x',
            ],
            workedSolution: [
              `${a}x + ${b} = ${c}`,
              `${a}x = ${c - b}`,
              `x = ${(c - b) / a}`,
              `x = ${x}`,
            ],
            metadata: {
              templateId: 'two-step',
              generatedAt: new Date().toISOString(),
              variables: { a, b, x, c },
            },
          };
        },
      },

      // Template 4: Equation with variables on both sides
      {
        id: 'both-sides',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(2, 8, [0, 1]);
          const b = randomInt(1, 15);
          const c = randomIntExcluding(2, 6, [0, 1, a]);
          const x = randomInt(1, 10);
          const d = a * x + b - c * x;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Solve for x: ${a}x + ${b} = ${c}x + ${d}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: x.toString(),
            hints: [
              'Move all terms with x to one side',
              `Subtract ${c}x from both sides`,
              `Then subtract ${b} from both sides and solve`,
            ],
            workedSolution: [
              `${a}x + ${b} = ${c}x + ${d}`,
              `${a}x - ${c}x = ${d} - ${b}`,
              `${a - c}x = ${d - b}`,
              `x = ${x}`,
            ],
            metadata: {
              templateId: 'both-sides',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c, d, x },
            },
          };
        },
      },

      // Template 5: Equation with parentheses
      {
        id: 'with-parentheses',
        difficulty: 'hard',
        generate: () => {
          const a = randomIntExcluding(2, 6, [0, 1]);
          const b = randomInt(1, 10);
          const c = randomInt(1, 15);
          const x = randomInt(1, 8);
          const d = a * (x + b) + c;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Solve for x: ${a}(x + ${b}) = ${d - c}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: x.toString(),
            hints: [
              'Distribute the multiplication over the parentheses',
              `${a}(x + ${b}) = ${a}x + ${a * b}`,
              'Then solve the resulting equation',
            ],
            workedSolution: [
              `${a}(x + ${b}) = ${d - c}`,
              `${a}x + ${a * b} = ${d - c}`,
              `${a}x = ${d - c - a * b}`,
              `x = ${x}`,
            ],
            metadata: {
              templateId: 'with-parentheses',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c, d, x },
            },
          };
        },
      },
    ];
  }
}
