import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt } from '../utils/math';

export class StatisticsGenerator extends BaseGenerator {
  constructor() {
    super('statistics');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'mean-calculation',
        difficulty: 'easy',
        generate: () => {
          const count = randomInt(4, 6);
          const data = Array.from({ length: count }, () => randomInt(10, 50));
          const sum = data.reduce((a, b) => a + b, 0);
          const mean = sum / count;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the mean of: ${data.join(', ')}`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: mean.toFixed(2),
            tolerance: 0.01,
            hints: [
              'Mean = sum of all values / number of values',
              `Sum = ${data.join(' + ')} = ${sum}`,
              `Mean = ${sum}/${count}`,
            ],
            workedSolution: [
              `Sum = ${data.join(' + ')} = ${sum}`,
              `Count = ${count}`,
              `Mean = ${sum}/${count} = ${mean.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'mean-calculation',
              generatedAt: new Date().toISOString(),
              variables: { data, sum, mean },
            },
          };
        },
      },
      {
        id: 'median-odd',
        difficulty: 'easy',
        generate: () => {
          const count = randomInt(2, 4) * 2 + 1; // Odd number
          const data = Array.from({ length: count }, () => randomInt(10, 50)).sort((a, b) => a - b);
          const median = data[Math.floor(count / 2)];

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the median of: ${data.join(', ')}`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: median.toString(),
            hints: [
              'Arrange data in order (already done)',
              `The middle value is at position ${Math.floor(count / 2) + 1}`,
            ],
            workedSolution: [
              `Ordered data: ${data.join(', ')}`,
              `Count = ${count} (odd)`,
              `Median is the middle value: ${median}`,
            ],
            metadata: {
              templateId: 'median-odd',
              generatedAt: new Date().toISOString(),
              variables: { data, median },
            },
          };
        },
      },
      {
        id: 'median-even',
        difficulty: 'medium',
        generate: () => {
          const count = randomInt(2, 4) * 2; // Even number
          const data = Array.from({ length: count }, () => randomInt(10, 50)).sort((a, b) => a - b);
          const mid1 = data[count / 2 - 1];
          const mid2 = data[count / 2];
          const median = (mid1 + mid2) / 2;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the median of: ${data.join(', ')}`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: median.toFixed(1),
            tolerance: 0.1,
            hints: [
              'With even count, median is average of two middle values',
              `Middle values are ${mid1} and ${mid2}`,
              `Median = (${mid1} + ${mid2})/2`,
            ],
            workedSolution: [
              `Ordered data: ${data.join(', ')}`,
              `Count = ${count} (even)`,
              `Middle values: ${mid1}, ${mid2}`,
              `Median = (${mid1} + ${mid2})/2 = ${median.toFixed(1)}`,
            ],
            metadata: {
              templateId: 'median-even',
              generatedAt: new Date().toISOString(),
              variables: { data, median },
            },
          };
        },
      },
      {
        id: 'variance',
        difficulty: 'hard',
        generate: () => {
          const data = [randomInt(10, 20), randomInt(20, 30), randomInt(30, 40), randomInt(40, 50)];
          const mean = data.reduce((a, b) => a + b, 0) / data.length;
          const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / data.length;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Find the variance of: ${data.join(', ')} (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: variance.toFixed(2),
            tolerance: 0.1,
            hints: [
              `First find the mean: ${mean.toFixed(2)}`,
              'Variance = average of squared deviations',
              'Σ(x - mean)² / n',
            ],
            workedSolution: [
              `Mean = ${mean.toFixed(2)}`,
              `Deviations²: ${data.map(x => `(${x}-${mean.toFixed(2)})²`).join(', ')}`,
              `Sum of squares = ${data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0).toFixed(2)}`,
              `Variance = ${variance.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'variance',
              generatedAt: new Date().toISOString(),
              variables: { data, mean, variance },
            },
          };
        },
      },
      {
        id: 'standard-deviation',
        difficulty: 'hard',
        generate: () => {
          const data = [randomInt(10, 20), randomInt(20, 30), randomInt(30, 40), randomInt(40, 50)];
          const mean = data.reduce((a, b) => a + b, 0) / data.length;
          const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / data.length;
          const stdDev = Math.sqrt(variance);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Find the standard deviation of: ${data.join(', ')} (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: stdDev.toFixed(2),
            tolerance: 0.1,
            hints: [
              `First find variance: ${variance.toFixed(2)}`,
              'Standard deviation = √variance',
              `σ = √${variance.toFixed(2)}`,
            ],
            workedSolution: [
              `Mean = ${mean.toFixed(2)}`,
              `Variance = ${variance.toFixed(2)}`,
              `Standard deviation = √${variance.toFixed(2)}`,
              `σ = ${stdDev.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'standard-deviation',
              generatedAt: new Date().toISOString(),
              variables: { data, stdDev },
            },
          };
        },
      },
    ];
  }
}
