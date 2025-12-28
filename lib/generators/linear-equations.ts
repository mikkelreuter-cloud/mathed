import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomIntExcluding, simplifyFraction } from '../utils/math';

export class LinearEquationsGenerator extends BaseGenerator {
  constructor() {
    super('linear-equations');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      // Template 1: Find slope from two points
      {
        id: 'slope-two-points',
        difficulty: 'easy',
        generate: () => {
          const x1 = randomInt(0, 8);
          const y1 = randomInt(0, 10);
          const x2 = randomInt(x1 + 1, x1 + 8);
          const y2 = randomInt(y1 + 1, y1 + 10);

          const slope = (y2 - y1) / (x2 - x1);
          const simplified = simplifyFraction(y2 - y1, x2 - x1);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the slope of the line passing through (${x1}, ${y1}) and (${x2}, ${y2})`,
            inputType: 'short',
            expectedAnswerFormat: 'fraction',
            correctAnswer: `${simplified.num}/${simplified.den}`,
            hints: [
              'Use the slope formula: m = (y₂ - y₁)/(x₂ - x₁)',
              `m = (${y2} - ${y1})/(${x2} - ${x1})`,
              'Simplify the fraction',
            ],
            workedSolution: [
              `m = (y₂ - y₁)/(x₂ - x₁)`,
              `m = (${y2} - ${y1})/(${x2} - ${x1})`,
              `m = ${y2 - y1}/${x2 - x1}`,
              `m = ${simplified.num}/${simplified.den}`,
            ],
            metadata: {
              templateId: 'slope-two-points',
              generatedAt: new Date().toISOString(),
              variables: { x1, y1, x2, y2 },
            },
          };
        },
      },

      // Template 2: Find y-intercept from equation
      {
        id: 'find-y-intercept',
        difficulty: 'easy',
        generate: () => {
          const m = randomIntExcluding(-5, 5, [0]);
          const b = randomInt(-10, 10);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `What is the y-intercept of the line y = ${m}x ${b >= 0 ? '+' : ''} ${b}?`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: b.toString(),
            hints: [
              'The y-intercept is the constant term in y = mx + b',
              'It is the value of y when x = 0',
              `In this equation, b = ${b}`,
            ],
            workedSolution: [
              `y = ${m}x ${b >= 0 ? '+' : ''} ${b}`,
              `The equation is in the form y = mx + b`,
              `The y-intercept is b = ${b}`,
            ],
            metadata: {
              templateId: 'find-y-intercept',
              generatedAt: new Date().toISOString(),
              variables: { m, b },
            },
          };
        },
      },

      // Template 3: Write equation from slope and point
      {
        id: 'equation-from-slope-point',
        difficulty: 'medium',
        generate: () => {
          const m = randomIntExcluding(-5, 5, [0]);
          const x1 = randomInt(0, 8);
          const y1 = randomInt(0, 10);
          const b = y1 - m * x1;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the equation of the line with slope ${m} passing through (${x1}, ${y1}). Write in form y = mx + b`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `${m}x ${b >= 0 ? '+' : ''} ${b}`,
            hints: [
              'Use point-slope form: y - y₁ = m(x - x₁)',
              `Substitute m = ${m}, x₁ = ${x1}, y₁ = ${y1}`,
              'Solve for y to get slope-intercept form',
            ],
            workedSolution: [
              `y - y₁ = m(x - x₁)`,
              `y - ${y1} = ${m}(x - ${x1})`,
              `y - ${y1} = ${m}x - ${m * x1}`,
              `y = ${m}x ${b >= 0 ? '+' : ''} ${b}`,
            ],
            metadata: {
              templateId: 'equation-from-slope-point',
              generatedAt: new Date().toISOString(),
              variables: { m, x1, y1, b },
            },
          };
        },
      },

      // Template 4: Find x-intercept
      {
        id: 'find-x-intercept',
        difficulty: 'medium',
        generate: () => {
          const m = randomIntExcluding(-5, 5, [0]);
          const b = randomIntExcluding(-10, 10, [0]);
          const xIntercept = -b / m;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the x-intercept of y = ${m}x ${b >= 0 ? '+' : ''} ${b}`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: xIntercept.toFixed(2),
            tolerance: 0.01,
            hints: [
              'The x-intercept occurs when y = 0',
              `Set 0 = ${m}x ${b >= 0 ? '+' : ''} ${b}`,
              `Solve for x`,
            ],
            workedSolution: [
              `Set y = 0:`,
              `0 = ${m}x ${b >= 0 ? '+' : ''} ${b}`,
              `${-b} = ${m}x`,
              `x = ${-b}/${m}`,
              `x = ${xIntercept.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'find-x-intercept',
              generatedAt: new Date().toISOString(),
              variables: { m, b, xIntercept },
            },
          };
        },
      },

      // Template 5: Parallel lines
      {
        id: 'parallel-lines',
        difficulty: 'hard',
        generate: () => {
          const m = randomIntExcluding(-5, 5, [0]);
          const b1 = randomInt(-10, 10);
          const x = randomInt(1, 8);
          const y = randomInt(1, 10);
          const b2 = y - m * x;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Find the equation of a line parallel to y = ${m}x ${b1 >= 0 ? '+' : ''} ${b1} that passes through (${x}, ${y})`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `${m}x ${b2 >= 0 ? '+' : ''} ${b2}`,
            hints: [
              'Parallel lines have the same slope',
              `The slope is ${m}`,
              'Use point-slope form with the given point',
            ],
            workedSolution: [
              `Parallel lines have the same slope: m = ${m}`,
              `Use point-slope form with (${x}, ${y}):`,
              `y - ${y} = ${m}(x - ${x})`,
              `y = ${m}x ${b2 >= 0 ? '+' : ''} ${b2}`,
            ],
            metadata: {
              templateId: 'parallel-lines',
              generatedAt: new Date().toISOString(),
              variables: { m, b1, x, y, b2 },
            },
          };
        },
      },
    ];
  }
}
