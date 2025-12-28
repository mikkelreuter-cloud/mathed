import { Question } from '../types';
import { BaseGenerator, QuestionTemplate } from './base-generator';
import { randomInt } from '../utils/math';

export class Vectors2DGenerator extends BaseGenerator {
  constructor() {
    super('vectors-2d');
  }

  protected defineTemplates(): QuestionTemplate[] {
    return [
      {
        id: 'vector-addition',
        difficulty: 'easy',
        generate: () => {
          const v1x = randomInt(-8, 8);
          const v1y = randomInt(-8, 8);
          const v2x = randomInt(-8, 8);
          const v2y = randomInt(-8, 8);
          const sumX = v1x + v2x;
          const sumY = v1y + v2y;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Add the vectors: (${v1x}, ${v1y}) + (${v2x}, ${v2y})`,
            inputType: 'short',
            expectedAnswerFormat: 'vector2d',
            correctAnswer: `(${sumX}, ${sumY})`,
            hints: [
              'Add corresponding components',
              `x: ${v1x} + ${v2x} = ${sumX}`,
              `y: ${v1y} + ${v2y} = ${sumY}`,
            ],
            workedSolution: [
              `(${v1x}, ${v1y}) + (${v2x}, ${v2y})`,
              `= (${v1x} + ${v2x}, ${v1y} + ${v2y})`,
              `= (${sumX}, ${sumY})`,
            ],
            metadata: {
              templateId: 'vector-addition',
              generatedAt: new Date().toISOString(),
              variables: { v1x, v1y, v2x, v2y, sumX, sumY },
            },
          };
        },
      },
      {
        id: 'vector-scalar-mult',
        difficulty: 'easy',
        generate: () => {
          const k = randomInt(2, 6);
          const vx = randomInt(-6, 6);
          const vy = randomInt(-6, 6);
          const resX = k * vx;
          const resY = k * vy;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'easy',
            prompt: `Multiply the vector by ${k}: ${k} × (${vx}, ${vy})`,
            inputType: 'short',
            expectedAnswerFormat: 'vector2d',
            correctAnswer: `(${resX}, ${resY})`,
            hints: [
              'Multiply each component by the scalar',
              `x: ${k} × ${vx} = ${resX}`,
              `y: ${k} × ${vy} = ${resY}`,
            ],
            workedSolution: [
              `${k} × (${vx}, ${vy})`,
              `= (${k} × ${vx}, ${k} × ${vy})`,
              `= (${resX}, ${resY})`,
            ],
            metadata: {
              templateId: 'vector-scalar-mult',
              generatedAt: new Date().toISOString(),
              variables: { k, vx, vy, resX, resY },
            },
          };
        },
      },
      {
        id: 'vector-magnitude',
        difficulty: 'medium',
        generate: () => {
          const vx = randomInt(3, 12);
          const vy = randomInt(3, 12);
          const magnitude = Math.sqrt(vx ** 2 + vy ** 2);

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the length (magnitude) of vector (${vx}, ${vy}) (round to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'decimal',
            correctAnswer: magnitude.toFixed(2),
            tolerance: 0.01,
            hints: [
              'Magnitude = √(x² + y²)',
              `|v| = √(${vx}² + ${vy}²)`,
              `|v| = √${vx ** 2 + vy ** 2}`,
            ],
            workedSolution: [
              `|v| = √(x² + y²)`,
              `|v| = √(${vx}² + ${vy}²)`,
              `|v| = √${vx ** 2 + vy ** 2}`,
              `|v| = ${magnitude.toFixed(2)}`,
            ],
            metadata: {
              templateId: 'vector-magnitude',
              generatedAt: new Date().toISOString(),
              variables: { vx, vy, magnitude },
            },
          };
        },
      },
      {
        id: 'dot-product',
        difficulty: 'medium',
        generate: () => {
          const v1x = randomInt(-6, 6);
          const v1y = randomInt(-6, 6);
          const v2x = randomInt(-6, 6);
          const v2y = randomInt(-6, 6);
          const dotProduct = v1x * v2x + v1y * v2y;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'medium',
            prompt: `Find the dot product: (${v1x}, ${v1y}) · (${v2x}, ${v2y})`,
            inputType: 'short',
            expectedAnswerFormat: 'integer',
            correctAnswer: dotProduct.toString(),
            hints: [
              'Dot product = x₁×x₂ + y₁×y₂',
              `= ${v1x}×${v2x} + ${v1y}×${v2y}`,
              `= ${v1x * v2x} + ${v1y * v2y}`,
            ],
            workedSolution: [
              `(${v1x}, ${v1y}) · (${v2x}, ${v2y})`,
              `= ${v1x}×${v2x} + ${v1y}×${v2y}`,
              `= ${v1x * v2x} + ${v1y * v2y}`,
              `= ${dotProduct}`,
            ],
            metadata: {
              templateId: 'dot-product',
              generatedAt: new Date().toISOString(),
              variables: { v1x, v1y, v2x, v2y, dotProduct },
            },
          };
        },
      },
      {
        id: 'unit-vector',
        difficulty: 'hard',
        generate: () => {
          const vx = randomInt(3, 8);
          const vy = randomInt(3, 8);
          const magnitude = Math.sqrt(vx ** 2 + vy ** 2);
          const ux = vx / magnitude;
          const uy = vy / magnitude;

          return {
            id: this.createQuestionId(),
            topic: this.topicId,
            difficulty: 'hard',
            prompt: `Find the unit vector in the direction of (${vx}, ${vy}) (round components to 2 decimals)`,
            inputType: 'short',
            expectedAnswerFormat: 'vector2d',
            correctAnswer: `(${ux.toFixed(2)}, ${uy.toFixed(2)})`,
            tolerance: 0.01,
            hints: [
              'Unit vector = v / |v|',
              `First find |v| = ${magnitude.toFixed(2)}`,
              `Divide each component by |v|`,
            ],
            workedSolution: [
              `|v| = √(${vx}² + ${vy}²) = ${magnitude.toFixed(2)}`,
              `Unit vector = (${vx}/${magnitude.toFixed(2)}, ${vy}/${magnitude.toFixed(2)})`,
              `= (${ux.toFixed(2)}, ${uy.toFixed(2)})`,
            ],
            metadata: {
              templateId: 'unit-vector',
              generatedAt: new Date().toISOString(),
              variables: { vx, vy, ux, uy, magnitude },
            },
          };
        },
      },
    ];
  }
}
