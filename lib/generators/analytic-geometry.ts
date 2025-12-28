import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt, randomIntExcluding } from '../utils/math';

export class AnalyticGeometryGenerator extends BaseGenerator {
  constructor() {
    super('analytic-geometry');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'distance-formula',
        difficulty: 'easy',
        generate: () => {
          const x1 = randomInt(0, 10);
          const y1 = randomInt(0, 10);
          const x2 = randomInt(0, 10);
          const y2 = randomInt(0, 10);
          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the distance between points (${x1}, ${y1}) and (${x2}, ${y2}) (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: distance.toFixed(2),
            tolerance: 0.01,
            hints: [
              'Use distance formula: d = √((x₂-x₁)² + (y₂-y₁)²)',
              `d = √((${x2}-${x1})² + (${y2}-${y1})²)`,
              `d = √(${(x2 - x1) ** 2} + ${(y2 - y1) ** 2})`,
            ],
            workedSolution: [
              `d = √((x₂-x₁)² + (y₂-y₁)²)`,
              `d = √((${x2}-${x1})² + (${y2}-${y1})²)`,
              `d = √(${(x2 - x1) ** 2} + ${(y2 - y1) ** 2})`,
              `d = ${distance.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'distance-formula',
              generatedAt: new Date().toISOString(),
              variables: { x1, y1, x2, y2, distance },
            },
          };
        },
      },
      {
        id: 'midpoint-formula',
        difficulty: 'easy',
        generate: () => {
          const x1 = randomInt(0, 10);
          const y1 = randomInt(0, 10);
          const x2 = randomInt(0, 10);
          const y2 = randomInt(0, 10);
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Find the midpoint between (${x1}, ${y1}) and (${x2}, ${y2})`,
            inputType: 'short',
            expectedAnswerFormat: 'coordinate',
            correctAnswer: `(${midX}, ${midY})`,
            tolerance: 0.01,
            hints: [
              'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)',
              `M = ((${x1}+${x2})/2, (${y1}+${y2})/2)`,
            ],
            workedSolution: [
              `M = ((x₁+x₂)/2, (y₁+y₂)/2)`,
              `M = ((${x1}+${x2})/2, (${y1}+${y2})/2)`,
              `M = (${midX}, ${midY})`,
            ],
            metadata: {
              templateId: 'midpoint-formula',
              generatedAt: new Date().toISOString(),
              variables: { x1, y1, x2, y2, midX, midY },
            },
          };
        },
      },
      {
        id: 'line-equation-from-points',
        difficulty: 'medium',
        generate: () => {
          const x1 = randomInt(0, 8);
          const y1 = randomInt(0, 10);
          const x2 = randomInt(x1 + 1, x1 + 8);
          const y2 = randomInt(y1 + 1, y1 + 10);
          const m = (y2 - y1) / (x2 - x1);
          const b = y1 - m * x1;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the equation of the line through (${x1}, ${y1}) and (${x2}, ${y2}). Write as y = mx + b (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `${m.toFixed(2)}x + ${b.toFixed(2)}`,
            hints: [
              `First find slope: m = (${y2}-${y1})/(${x2}-${x1})`,
              `m = ${m.toFixed(2)}`,
              `Use point-slope form to find b`,
            ],
            workedSolution: [
              `m = (y₂-y₁)/(x₂-x₁) = (${y2}-${y1})/(${x2}-${x1}) = ${m.toFixed(2)}`,
              `y = mx + b`,
              `${y1} = ${m.toFixed(2)}(${x1}) + b`,
              `b = ${b.toFixed(2)}`,
              `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'line-equation-from-points',
              generatedAt: new Date().toISOString(),
              variables: { x1, y1, x2, y2, m, b },
            },
          };
        },
      },
      {
        id: 'circle-equation',
        difficulty: 'medium',
        generate: () => {
          const h = randomInt(-5, 5);
          const k = randomInt(-5, 5);
          const r = randomInt(3, 8);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Write the equation of a circle with center (${h}, ${k}) and radius ${r}`,
            inputType: 'short',
            expectedAnswerFormat: 'expression',
            correctAnswer: `(x - ${h})^2 + (y - ${k})^2 = ${r ** 2}`,
            hints: [
              'Circle equation: (x-h)² + (y-k)² = r²',
              `Center: (${h}, ${k}), radius: ${r}`,
              `Substitute into the formula`,
            ],
            workedSolution: [
              `(x-h)² + (y-k)² = r²`,
              `(x-(${h}))² + (y-(${k}))² = ${r}²`,
              `(x-${h})² + (y-${k})² = ${r ** 2}`,
            ],
            metadata: {
              templateId: 'circle-equation',
              generatedAt: new Date().toISOString(),
              variables: { h, k, r },
            },
          };
        },
      },
      {
        id: 'perpendicular-slope',
        difficulty: 'hard',
        generate: () => {
          const m = randomIntExcluding(-5, 5, [0]);
          const perpM = -1 / m;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Find the slope of a line perpendicular to a line with slope ${m} (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: perpM.toFixed(2),
            tolerance: 0.01,
            hints: [
              'Perpendicular slopes are negative reciprocals',
              `m₁ × m₂ = -1`,
              `m₂ = -1/${m}`,
            ],
            workedSolution: [
              `For perpendicular lines: m₁ × m₂ = -1`,
              `${m} × m₂ = -1`,
              `m₂ = -1/${m}`,
              `m₂ = ${perpM.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'perpendicular-slope',
              generatedAt: new Date().toISOString(),
              variables: { m, perpM },
            },
          };
        },
      },
    ];
  }
}
