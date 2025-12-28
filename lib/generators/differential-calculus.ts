import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomIntExcluding, randomChoice } from '../utils/math';

export class DifferentialCalculusGenerator extends BaseGenerator {
  constructor() {
    super('differential-calculus');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'power-rule',
        difficulty: 'easy',
        generate: () => {
          const n = randomInt(2, 6);
          const deriv = n;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the derivative of f(x) = x^${n}`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `${n}x^${n - 1}`,
            hints: [
              'Use the power rule: d/dx(x^n) = nx^(n-1)',
              `Bring down the exponent: ${n}`,
              `Reduce the exponent by 1: ${n - 1}`,
            ],
            workedSolution: [
              `f(x) = x^${n}`,
              `f'(x) = ${n}x^${n - 1}`,
            ],
            metadata: {
              templateId: 'power-rule',
              generatedAt: new Date().toISOString(),
              variables: { n, deriv },
            },
          };
        },
      },
      {
        id: 'linear-derivative',
        difficulty: 'easy',
        generate: () => {
          const a = randomIntExcluding(-8, 8, [0]);
          const b = randomInt(-10, 10);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the derivative of f(x) = ${a}x ${b >= 0 ? '+' : ''} ${b}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: a.toString(),
            hints: [
              'The derivative of ax + b is a',
              'Constants disappear when differentiated',
              `d/dx(${a}x ${b >= 0 ? '+' : ''} ${b}) = ${a}`,
            ],
            workedSolution: [
              `f(x) = ${a}x ${b >= 0 ? '+' : ''} ${b}`,
              `f'(x) = ${a}`,
            ],
            metadata: {
              templateId: 'linear-derivative',
              generatedAt: new Date().toISOString(),
              variables: { a, b },
            },
          };
        },
      },
      {
        id: 'polynomial-derivative',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(1, 5, [0]);
          const b = randomIntExcluding(-8, 8, [0]);
          const c = randomInt(-10, 10);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the derivative of f(x) = ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `${2 * a}x ${b >= 0 ? '+' : ''} ${b}`,
            hints: [
              'Apply power rule to each term',
              `d/dx(${a}x²) = ${2 * a}x`,
              `d/dx(${b}x) = ${b}`,
            ],
            workedSolution: [
              `f(x) = ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`,
              `f'(x) = ${2 * a}x ${b >= 0 ? '+' : ''} ${b}`,
            ],
            metadata: {
              templateId: 'polynomial-derivative',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c },
            },
          };
        },
      },
      {
        id: 'tangent-line-slope',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(1, 4, [0]);
          const x0 = randomInt(1, 5);
          const slope = 2 * a * x0;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the slope of the tangent line to f(x) = ${a}x² at x = ${x0}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: slope.toString(),
            hints: [
              'Find f\'(x) first',
              `f'(x) = ${2 * a}x`,
              `Evaluate at x = ${x0}`,
            ],
            workedSolution: [
              `f(x) = ${a}x²`,
              `f'(x) = ${2 * a}x`,
              `f'(${x0}) = ${2 * a}(${x0}) = ${slope}`,
            ],
            metadata: {
              templateId: 'tangent-line-slope',
              generatedAt: new Date().toISOString(),
              variables: { a, x0, slope },
            },
          };
        },
      },
      {
        id: 'critical-points',
        difficulty: 'hard',
        generate: () => {
          const a = randomIntExcluding(1, 4, [0]);
          const b = randomIntExcluding(-10, 10, [0]);
          const criticalPoint = -b / (2 * a);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Find the critical point of f(x) = ${a}x² ${b >= 0 ? '+' : ''} ${b}x (where f'(x) = 0)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: criticalPoint.toFixed(2),
            tolerance: 0.01,
            hints: [
              'Find f\'(x) and set it equal to 0',
              `f'(x) = ${2 * a}x ${b >= 0 ? '+' : ''} ${b}`,
              `Solve ${2 * a}x ${b >= 0 ? '+' : ''} ${b} = 0`,
            ],
            workedSolution: [
              `f(x) = ${a}x² ${b >= 0 ? '+' : ''} ${b}x`,
              `f'(x) = ${2 * a}x ${b >= 0 ? '+' : ''} ${b}`,
              `Set f'(x) = 0:`,
              `${2 * a}x ${b >= 0 ? '+' : ''} ${b} = 0`,
              `x = ${criticalPoint.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'critical-points',
              generatedAt: new Date().toISOString(),
              variables: { a, b, criticalPoint },
            },
          };
        },
      },
    ];
  }
}
