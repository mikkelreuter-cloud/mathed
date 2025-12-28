import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomIntExcluding } from '../utils/math';

export class FunctionsGenerator extends BaseGenerator {
  constructor() {
    super('functions');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'evaluate-function',
        difficulty: 'easy',
        generate: () => {
          const a = randomIntExcluding(-5, 5, [0]);
          const b = randomInt(-10, 10);
          const x = randomInt(-5, 5);
          const result = a * x + b;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `If f(x) = ${a}x ${b >= 0 ? '+' : ''} ${b}, find f(${x})`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: result.toString(),
            hints: [
              `Substitute x = ${x} into the function`,
              `f(${x}) = ${a}(${x}) ${b >= 0 ? '+' : ''} ${b}`,
              `Calculate ${a * x} ${b >= 0 ? '+' : ''} ${b}`,
            ],
            workedSolution: [
              `f(x) = ${a}x ${b >= 0 ? '+' : ''} ${b}`,
              `f(${x}) = ${a}(${x}) ${b >= 0 ? '+' : ''} ${b}`,
              `f(${x}) = ${a * x} ${b >= 0 ? '+' : ''} ${b}`,
              `f(${x}) = ${result}`,
            ],
            metadata: {
              templateId: 'evaluate-function',
              generatedAt: new Date().toISOString(),
              variables: { a, b, x, result },
            },
          };
        },
      },
      {
        id: 'find-slope',
        difficulty: 'easy',
        generate: () => {
          const m = randomIntExcluding(-8, 8, [0]);
          const b = randomInt(-10, 10);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `What is the slope of f(x) = ${m}x ${b >= 0 ? '+' : ''} ${b}?`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: m.toString(),
            hints: [
              'For a linear function f(x) = mx + b, the slope is m',
              `The coefficient of x is ${m}`,
            ],
            workedSolution: [
              `f(x) = ${m}x ${b >= 0 ? '+' : ''} ${b}`,
              `This is in the form f(x) = mx + b`,
              `The slope is m = ${m}`,
            ],
            metadata: {
              templateId: 'find-slope',
              generatedAt: new Date().toISOString(),
              variables: { m, b },
            },
          };
        },
      },
      {
        id: 'composition',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(2, 5, [0]);
          const b = randomInt(1, 8);
          const x = randomInt(1, 4);
          const gx = a * x;
          const result = gx + b;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `If f(x) = x + ${b} and g(x) = ${a}x, find f(g(${x}))`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: result.toString(),
            hints: [
              `First find g(${x})`,
              `g(${x}) = ${a}(${x}) = ${gx}`,
              `Then find f(${gx})`,
            ],
            workedSolution: [
              `First, g(${x}) = ${a}(${x}) = ${gx}`,
              `Then, f(g(${x})) = f(${gx})`,
              `f(${gx}) = ${gx} + ${b} = ${result}`,
            ],
            metadata: {
              templateId: 'composition',
              generatedAt: new Date().toISOString(),
              variables: { a, b, x, gx, result },
            },
          };
        },
      },
      {
        id: 'inverse-simple',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(2, 8, [0]);
          const b = randomInt(-10, 10);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the inverse of f(x) = ${a}x ${b >= 0 ? '+' : ''} ${b}`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `(x - ${b})/${a}`,
            hints: [
              'Replace f(x) with y',
              'Swap x and y',
              'Solve for y',
            ],
            workedSolution: [
              `y = ${a}x ${b >= 0 ? '+' : ''} ${b}`,
              `x = ${a}y ${b >= 0 ? '+' : ''} ${b}`,
              `${a}y = x - ${b}`,
              `y = (x - ${b})/${a}`,
              `f⁻¹(x) = (x - ${b})/${a}`,
            ],
            metadata: {
              templateId: 'inverse-simple',
              generatedAt: new Date().toISOString(),
              variables: { a, b },
            },
          };
        },
      },
      {
        id: 'domain-restriction',
        difficulty: 'hard',
        generate: () => {
          const a = randomInt(1, 10);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `For what value of x is f(x) = 1/(x - ${a}) undefined?`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: a.toString(),
            hints: [
              'A fraction is undefined when the denominator is 0',
              `Set x - ${a} = 0`,
              `Solve for x`,
            ],
            workedSolution: [
              `f(x) is undefined when x - ${a} = 0`,
              `x = ${a}`,
            ],
            metadata: {
              templateId: 'domain-restriction',
              generatedAt: new Date().toISOString(),
              variables: { a },
            },
          };
        },
      },
    ];
  }
}
