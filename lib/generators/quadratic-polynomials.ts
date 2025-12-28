import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomIntExcluding } from '../utils/math';

export class QuadraticPolynomialsGenerator extends BaseGenerator {
  constructor() {
    super('quadratic-polynomials');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'vertex-form-to-standard',
        difficulty: 'easy',
        generate: () => {
          const a = randomIntExcluding(-3, 3, [0]);
          const h = randomInt(1, 6);
          const k = randomInt(1, 10);
          const b = -2 * a * h;
          const c = a * h * h + k;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Convert to standard form: y = ${a}(x - ${h})² ${k >= 0 ? '+' : ''} ${k}`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `${a}x^2 ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`,
            hints: [
              `Expand (x - ${h})²`,
              `Multiply by ${a}`,
              `Add ${k}`,
            ],
            workedSolution: [
              `y = ${a}(x - ${h})² ${k >= 0 ? '+' : ''} ${k}`,
              `y = ${a}(x² - ${2 * h}x + ${h * h}) ${k >= 0 ? '+' : ''} ${k}`,
              `y = ${a}x² ${a * (-2 * h) >= 0 ? '+' : ''} ${a * (-2 * h)}x ${a * h * h >= 0 ? '+' : ''} ${a * h * h} ${k >= 0 ? '+' : ''} ${k}`,
              `y = ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`,
            ],
            metadata: {
              templateId: 'vertex-form-to-standard',
              generatedAt: new Date().toISOString(),
              variables: { a, h, k, b, c },
            },
          };
        },
      },
      {
        id: 'find-vertex-from-standard',
        difficulty: 'medium',
        generate: () => {
          const a = randomIntExcluding(1, 4, [0]);
          const h = randomInt(1, 8);
          const k = randomInt(1, 12);
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
              'Use h = -b/(2a) for x-coordinate',
              `h = -${b}/(2×${a})`,
              'Substitute to find k',
            ],
            workedSolution: [
              `h = -b/(2a) = -${b}/(2×${a}) = ${h}`,
              `k = ${a}(${h})² ${b >= 0 ? '+' : ''} ${b}(${h}) ${c >= 0 ? '+' : ''} ${c}`,
              `k = ${k}`,
              `Vertex: (${h}, ${k})`,
            ],
            metadata: {
              templateId: 'find-vertex-from-standard',
              generatedAt: new Date().toISOString(),
              variables: { a, h, k, b, c },
            },
          };
        },
      },
      {
        id: 'axis-of-symmetry',
        difficulty: 'easy',
        generate: () => {
          const a = randomIntExcluding(1, 5, [0]);
          const h = randomInt(1, 10);
          const b = -2 * a * h;
          const c = randomInt(1, 15);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the axis of symmetry of y = ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: h.toString(),
            hints: [
              'Axis of symmetry: x = -b/(2a)',
              `x = -${b}/(2×${a})`,
            ],
            workedSolution: [
              `x = -b/(2a)`,
              `x = -${b}/(2×${a})`,
              `x = ${h}`,
            ],
            metadata: {
              templateId: 'axis-of-symmetry',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c, h },
            },
          };
        },
      },
      {
        id: 'transformation-vertical-shift',
        difficulty: 'medium',
        generate: () => {
          const shift = randomInt(2, 10);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `If f(x) = x² is shifted up by ${shift} units, what is the new function?`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `x^2 + ${shift}`,
            hints: [
              'Vertical shift adds to the function',
              'Shift up means adding a constant',
            ],
            workedSolution: [
              `Vertical shift up by ${shift}`,
              `g(x) = f(x) + ${shift}`,
              `g(x) = x² + ${shift}`,
            ],
            metadata: {
              templateId: 'transformation-vertical-shift',
              generatedAt: new Date().toISOString(),
              variables: { shift },
            },
          };
        },
      },
      {
        id: 'find-max-min',
        difficulty: 'hard',
        generate: () => {
          const a = randomIntExcluding(-4, 4, [0]);
          const h = randomInt(1, 8);
          const k = randomInt(1, 12);
          const isMax = a < 0;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Find the ${isMax ? 'maximum' : 'minimum'} value of y = ${a}(x - ${h})² ${k >= 0 ? '+' : ''} ${k}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: k.toString(),
            hints: [
              'The vertex gives the max or min value',
              `Vertex form shows the vertex is (${h}, ${k})`,
              `The ${isMax ? 'maximum' : 'minimum'} value is the y-coordinate`,
            ],
            workedSolution: [
              `The function is in vertex form: a(x - h)² + k`,
              `Vertex: (${h}, ${k})`,
              `Since a = ${a} ${a < 0 ? '< 0' : '> 0'}, the parabola opens ${a < 0 ? 'down' : 'up'}`,
              `The ${isMax ? 'maximum' : 'minimum'} value is ${k}`,
            ],
            metadata: {
              templateId: 'find-max-min',
              generatedAt: new Date().toISOString(),
              variables: { a, h, k },
            },
          };
        },
      },
    ];
  }
}
