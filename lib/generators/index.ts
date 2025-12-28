import { TopicId, DifficultyLevel, Question } from '../types';
import { BaseGenerator } from './base-generator';

// Import all generators (will be created)
import { NumbersArithmeticGenerator } from './numbers-arithmetic';
import { EquationsGenerator } from './equations';
import { LinearEquationsGenerator } from './linear-equations';
import { QuadraticEquationsGenerator } from './quadratic-equations';
import { FunctionsGenerator } from './functions';
import { TrigonometryGenerator } from './trigonometry';
import { GeometryGenerator } from './geometry';
import { ProbabilityGenerator } from './probability';
import { QuadraticPolynomialsGenerator } from './quadratic-polynomials';
import { CombinatoricsGenerator } from './combinatorics';
import { StatisticsGenerator } from './statistics';
import { Vectors2DGenerator } from './vectors-2d';
import { AnalyticGeometryGenerator } from './analytic-geometry';
import { DifferentialCalculusGenerator } from './differential-calculus';

class GeneratorRegistry {
  private generators: Map<TopicId, BaseGenerator>;

  constructor() {
    this.generators = new Map();
    this.registerGenerators();
  }

  private registerGenerators(): void {
    this.generators.set(
      'numbers-arithmetic',
      new NumbersArithmeticGenerator()
    );
    this.generators.set('equations', new EquationsGenerator());
    this.generators.set('linear-equations', new LinearEquationsGenerator());
    this.generators.set(
      'quadratic-equations',
      new QuadraticEquationsGenerator()
    );
    this.generators.set('functions', new FunctionsGenerator());
    this.generators.set('trigonometry', new TrigonometryGenerator());
    this.generators.set('geometry', new GeometryGenerator());
    this.generators.set('probability', new ProbabilityGenerator());
    this.generators.set(
      'quadratic-polynomials',
      new QuadraticPolynomialsGenerator()
    );
    this.generators.set('combinatorics', new CombinatoricsGenerator());
    this.generators.set('statistics', new StatisticsGenerator());
    this.generators.set('vectors-2d', new Vectors2DGenerator());
    this.generators.set('analytic-geometry', new AnalyticGeometryGenerator());
    this.generators.set(
      'differential-calculus',
      new DifferentialCalculusGenerator()
    );
  }

  public getGenerator(topicId: TopicId): BaseGenerator {
    const generator = this.generators.get(topicId);
    if (!generator) {
      throw new Error(`No generator found for topic: ${topicId}`);
    }
    return generator;
  }

  public generateQuestion(
    topicId: TopicId,
    difficulty?: DifficultyLevel
  ): Question {
    const generator = this.getGenerator(topicId);
    return generator.generateQuestion(difficulty);
  }
}

export const generatorRegistry = new GeneratorRegistry();

export const generateQuestion = (
  topicId: TopicId,
  difficulty?: DifficultyLevel
): Question => {
  return generatorRegistry.generateQuestion(topicId, difficulty);
};
