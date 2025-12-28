import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomChoice, simplifyFraction } from '../utils/math';

export class ProbabilityGenerator extends BaseGenerator {
  constructor() {
    super('probability');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'simple-probability',
        difficulty: 'easy',
        generate: () => {
          const total = randomChoice([6, 10, 12, 20]);
          const favorable = randomInt(1, total - 1);
          const simplified = simplifyFraction(favorable, total);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `What is the probability of selecting 1 item from ${favorable} favorable outcomes out of ${total} total outcomes? Give answer as a fraction.`,
            inputType: 'short',
            expectedAnswerFormat: 'fraction',
            correctAnswer: `${simplified.num}/${simplified.den}`,
            hints: [
              'Probability = favorable outcomes / total outcomes',
              `P = ${favorable}/${total}`,
              'Simplify the fraction',
            ],
            workedSolution: [
              `P = favorable / total`,
              `P = ${favorable}/${total}`,
              `P = ${simplified.num}/${simplified.den}`,
            ],
            metadata: {
              templateId: 'simple-probability',
              generatedAt: new Date().toISOString(),
              variables: { total, favorable },
            },
          };
        },
      },
      {
        id: 'dice-probability',
        difficulty: 'easy',
        generate: () => {
          const target = randomInt(1, 6);
          const prob = simplifyFraction(1, 6);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `What is the probability of rolling a ${target} on a fair six-sided die? Give answer as a fraction.`,
            inputType: 'short',
            expectedAnswerFormat: 'fraction',
            correctAnswer: `${prob.num}/${prob.den}`,
            hints: [
              'A die has 6 equally likely outcomes',
              'There is 1 favorable outcome',
              'P = 1/6',
            ],
            workedSolution: [
              `Total outcomes = 6`,
              `Favorable outcomes = 1`,
              `P = 1/6`,
            ],
            metadata: {
              templateId: 'dice-probability',
              generatedAt: new Date().toISOString(),
              variables: { target },
            },
          };
        },
      },
      {
        id: 'two-events',
        difficulty: 'medium',
        generate: () => {
          const p1Num = randomInt(1, 4);
          const p1Den = randomChoice([5, 6, 8]);
          const p2Num = randomInt(1, 3);
          const p2Den = randomChoice([4, 5, 6]);

          const resultNum = p1Num * p2Num;
          const resultDen = p1Den * p2Den;
          const simplified = simplifyFraction(resultNum, resultDen);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Two independent events have probabilities ${p1Num}/${p1Den} and ${p2Num}/${p2Den}. What is the probability that both occur? Give answer as a fraction.`,
            inputType: 'short',
            expectedAnswerFormat: 'fraction',
            correctAnswer: `${simplified.num}/${simplified.den}`,
            hints: [
              'For independent events, multiply probabilities',
              `P(A and B) = P(A) × P(B)`,
              `P = ${p1Num}/${p1Den} × ${p2Num}/${p2Den}`,
            ],
            workedSolution: [
              `P(both) = P(A) × P(B)`,
              `P = ${p1Num}/${p1Den} × ${p2Num}/${p2Den}`,
              `P = ${resultNum}/${resultDen}`,
              `P = ${simplified.num}/${simplified.den}`,
            ],
            metadata: {
              templateId: 'two-events',
              generatedAt: new Date().toISOString(),
              variables: { p1Num, p1Den, p2Num, p2Den },
            },
          };
        },
      },
      {
        id: 'complement',
        difficulty: 'medium',
        generate: () => {
          const pNum = randomInt(1, 5);
          const pDen = randomChoice([6, 8, 10]);
          const compNum = pDen - pNum;
          const simplified = simplifyFraction(compNum, pDen);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `If the probability of an event is ${pNum}/${pDen}, what is the probability it does NOT occur? Give answer as a fraction.`,
            inputType: 'short',
            expectedAnswerFormat: 'fraction',
            correctAnswer: `${simplified.num}/${simplified.den}`,
            hints: [
              'P(not A) = 1 - P(A)',
              `P(not A) = 1 - ${pNum}/${pDen}`,
              `P(not A) = ${pDen}/${pDen} - ${pNum}/${pDen}`,
            ],
            workedSolution: [
              `P(not A) = 1 - P(A)`,
              `P(not A) = ${pDen}/${pDen} - ${pNum}/${pDen}`,
              `P(not A) = ${compNum}/${pDen}`,
              `P(not A) = ${simplified.num}/${simplified.den}`,
            ],
            metadata: {
              templateId: 'complement',
              generatedAt: new Date().toISOString(),
              variables: { pNum, pDen, compNum },
            },
          };
        },
      },
      {
        id: 'conditional-probability',
        difficulty: 'hard',
        generate: () => {
          const total = randomChoice([20, 30, 40, 50]);
          const a = randomInt(Math.floor(total * 0.3), Math.floor(total * 0.5));
          const both = randomInt(Math.floor(a * 0.3), Math.floor(a * 0.7));
          const simplified = simplifyFraction(both, a);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `In a group of ${total} people, ${a} like coffee and ${both} like both coffee and tea. What is the probability someone likes tea given they like coffee? Give answer as a fraction.`,
            inputType: 'short',
            expectedAnswerFormat: 'fraction',
            correctAnswer: `${simplified.num}/${simplified.den}`,
            hints: [
              'P(B|A) = P(A and B) / P(A)',
              `Out of ${a} who like coffee, ${both} also like tea`,
              `P(tea|coffee) = ${both}/${a}`,
            ],
            workedSolution: [
              `P(tea|coffee) = (like both) / (like coffee)`,
              `P(tea|coffee) = ${both}/${a}`,
              `P(tea|coffee) = ${simplified.num}/${simplified.den}`,
            ],
            metadata: {
              templateId: 'conditional-probability',
              generatedAt: new Date().toISOString(),
              variables: { total, a, both },
            },
          };
        },
      },
    ];
  }
}
