import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomChoice, simplifyFraction } from '../utils/math';

export class NumbersArithmeticGenerator extends BaseGenerator {
  constructor() {
    super('numbers-arithmetic');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      // Template 1: Order of operations
      {
        id: 'order-ops-1',
        difficulty: 'easy',
        generate: () => {
          const a = randomInt(2, 10);
          const b = randomInt(2, 10);
          const c = randomInt(1, 5);
          const prompt = `${a} + ${b} × ${c}`;
          const answer = a + b * c;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Calculate: ${prompt}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: answer.toString(),
            hints: [
              'Remember the order of operations: multiplication before addition',
              `First calculate ${b} × ${c}`,
              `Then add ${a} to the result`,
            ],
            workedSolution: [
              `${prompt}`,
              `= ${a} + ${b * c}`,
              `= ${answer}`,
            ],
            metadata: {
              templateId: 'order-ops-1',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c },
            },
          };
        },
      },

      // Template 2: Order of operations with parentheses
      {
        id: 'order-ops-2',
        difficulty: 'medium',
        generate: () => {
          const a = randomInt(2, 10);
          const b = randomInt(2, 10);
          const c = randomInt(2, 5);
          const d = randomInt(1, 5);
          const prompt = `(${a} + ${b}) × ${c} - ${d}`;
          const answer = (a + b) * c - d;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Calculate: ${prompt}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: answer.toString(),
            hints: [
              'Start with operations inside parentheses',
              `Calculate (${a} + ${b}) first`,
              `Then multiply by ${c} and subtract ${d}`,
            ],
            workedSolution: [
              `${prompt}`,
              `= ${a + b} × ${c} - ${d}`,
              `= ${(a + b) * c} - ${d}`,
              `= ${answer}`,
            ],
            metadata: {
              templateId: 'order-ops-2',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c, d },
            },
          };
        },
      },

      // Template 3: Fraction addition
      {
        id: 'fraction-add-1',
        difficulty: 'easy',
        generate: () => {
          const num1 = randomInt(1, 5);
          const num2 = randomInt(1, 5);
          const den = randomChoice([2, 3, 4, 5, 6]);

          const resultNum = num1 + num2;
          const simplified = simplifyFraction(resultNum, den);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Add the fractions: ${num1}/${den} + ${num2}/${den}`,
            inputType: 'short',
            expectedAnswerFormat: 'fraction',
            correctAnswer: `${simplified.num}/${simplified.den}`,
            hints: [
              'The denominators are already the same',
              'Add the numerators',
              'Simplify if possible',
            ],
            workedSolution: [
              `${num1}/${den} + ${num2}/${den}`,
              `= ${resultNum}/${den}`,
              `= ${simplified.num}/${simplified.den}`,
            ],
            metadata: {
              templateId: 'fraction-add-1',
              generatedAt: new Date().toISOString(),
              variables: { num1, num2, den },
            },
          };
        },
      },

      // Template 4: Percentage calculation
      {
        id: 'percentage-1',
        difficulty: 'easy',
        generate: () => {
          const percentage = randomChoice([10, 20, 25, 50, 75]);
          const value = randomInt(20, 200);
          const answer = (percentage / 100) * value;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `What is ${percentage}% of ${value}?`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: answer.toString(),
            tolerance: 0.01,
            hints: [
              `Convert ${percentage}% to a decimal by dividing by 100`,
              `${percentage}% = ${percentage / 100}`,
              `Multiply ${percentage / 100} × ${value}`,
            ],
            workedSolution: [
              `${percentage}% of ${value}`,
              `= ${percentage / 100} × ${value}`,
              `= ${answer}`,
            ],
            metadata: {
              templateId: 'percentage-1',
              generatedAt: new Date().toISOString(),
              variables: { percentage, value },
            },
          };
        },
      },

      // Template 5: Complex order of operations
      {
        id: 'order-ops-3',
        difficulty: 'hard',
        generate: () => {
          const a = randomInt(2, 8);
          const b = randomInt(2, 6);
          const c = randomInt(2, 5);
          const d = randomInt(1, 4);
          const e = randomInt(1, 3);

          const prompt = `${a} × ${b} + ${c} × (${d} + ${e})`;
          const answer = a * b + c * (d + e);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Calculate: ${prompt}`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: answer.toString(),
            hints: [
              'Start with parentheses, then multiplication, then addition',
              `Calculate (${d} + ${e}) first`,
              `Then do the multiplications: ${a} × ${b} and ${c} × result`,
              `Finally add the two products`,
            ],
            workedSolution: [
              `${prompt}`,
              `= ${a} × ${b} + ${c} × ${d + e}`,
              `= ${a * b} + ${c * (d + e)}`,
              `= ${answer}`,
            ],
            metadata: {
              templateId: 'order-ops-3',
              generatedAt: new Date().toISOString(),
              variables: { a, b, c, d, e },
            },
          };
        },
      },
    ];
  }
}
