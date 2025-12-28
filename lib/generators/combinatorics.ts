import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt } from '../utils/math';

const factorial = (n: number): number => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

const permutation = (n: number, r: number): number => {
  return factorial(n) / factorial(n - r);
};

const combination = (n: number, r: number): number => {
  return factorial(n) / (factorial(r) * factorial(n - r));
};

export class CombinatoricsGenerator extends BaseGenerator {
  constructor() {
    super('combinatorics');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'simple-permutation',
        difficulty: 'easy',
        generate: () => {
          const n = randomInt(4, 8);
          const r = randomInt(2, Math.min(n - 1, 4));
          const answer = permutation(n, r);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `How many ways can you arrange ${r} objects from ${n} distinct objects (order matters)?`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: answer.toString(),
            hints: [
              'Use permutation formula: P(n,r) = n!/(n-r)!',
              `P(${n},${r}) = ${n}!/(${n}-${r})!`,
              `Calculate ${n}!/${n - r}!`,
            ],
            workedSolution: [
              `P(n,r) = n!/(n-r)!`,
              `P(${n},${r}) = ${n}!/${n - r}!`,
              `P(${n},${r}) = ${factorial(n)}/${factorial(n - r)}`,
              `P(${n},${r}) = ${answer}`,
            ],
            metadata: {
              templateId: 'simple-permutation',
              generatedAt: new Date().toISOString(),
              variables: { n, r, answer },
            },
          };
        },
      },
      {
        id: 'simple-combination',
        difficulty: 'easy',
        generate: () => {
          const n = randomInt(5, 10);
          const r = randomInt(2, Math.min(n - 1, 5));
          const answer = combination(n, r);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `How many ways can you choose ${r} objects from ${n} distinct objects (order doesn't matter)?`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: answer.toString(),
            hints: [
              'Use combination formula: C(n,r) = n!/(r!(n-r)!)',
              `C(${n},${r}) = ${n}!/(${r}!×${n - r}!)`,
              'Calculate the factorials',
            ],
            workedSolution: [
              `C(n,r) = n!/(r!(n-r)!)`,
              `C(${n},${r}) = ${n}!/(${r}!×${n - r}!)`,
              `C(${n},${r}) = ${factorial(n)}/(${factorial(r)}×${factorial(n - r)})`,
              `C(${n},${r}) = ${answer}`,
            ],
            metadata: {
              templateId: 'simple-combination',
              generatedAt: new Date().toISOString(),
              variables: { n, r, answer },
            },
          };
        },
      },
      {
        id: 'factorial-calculation',
        difficulty: 'easy',
        generate: () => {
          const n = randomInt(4, 7);
          const answer = factorial(n);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Calculate ${n}!`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: answer.toString(),
            hints: [
              `${n}! = ${n} × ${n - 1} × ... × 2 × 1`,
              `Multiply all integers from 1 to ${n}`,
            ],
            workedSolution: [
              `${n}! = ${n} × ${n - 1} × ${n - 2} × ... × 2 × 1`,
              `${n}! = ${answer}`,
            ],
            metadata: {
              templateId: 'factorial-calculation',
              generatedAt: new Date().toISOString(),
              variables: { n, answer },
            },
          };
        },
      },
      {
        id: 'permutation-with-repetition',
        difficulty: 'medium',
        generate: () => {
          const n = randomInt(4, 6);
          const answer = Math.pow(n, n);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `How many ${n}-digit codes can be made using digits 0-${n - 1} if repetition is allowed?`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: answer.toString(),
            hints: [
              'Each position can be any of the digits',
              `${n} choices for each of ${n} positions`,
              `Answer is ${n}^${n}`,
            ],
            workedSolution: [
              `Each position has ${n} choices`,
              `Total codes = ${n}^${n}`,
              `= ${answer}`,
            ],
            metadata: {
              templateId: 'permutation-with-repetition',
              generatedAt: new Date().toISOString(),
              variables: { n, answer },
            },
          };
        },
      },
      {
        id: 'committee-selection',
        difficulty: 'hard',
        generate: () => {
          const total = randomInt(8, 12);
          const select = randomInt(3, 5);
          const answer = combination(total, select);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `A committee of ${select} people is to be formed from a group of ${total} people. How many different committees are possible?`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: answer.toString(),
            hints: [
              'Order does not matter (combination)',
              `Use C(${total}, ${select})`,
              `C(n,r) = n!/(r!(n-r)!)`,
            ],
            workedSolution: [
              `C(${total},${select}) = ${total}!/(${select}!×${total - select}!)`,
              `= ${factorial(total)}/(${factorial(select)}×${factorial(total - select)})`,
              `= ${answer}`,
            ],
            metadata: {
              templateId: 'committee-selection',
              generatedAt: new Date().toISOString(),
              variables: { total, select, answer },
            },
          };
        },
      },
    ];
  }
}
