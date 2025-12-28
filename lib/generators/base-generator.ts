import { Question, DifficultyLevel, TopicId } from '../types';
import { randomInt } from '../utils/math';

export interface QuestionTemplate {
  id: string;
  difficulty: DifficultyLevel;
  generate: () => Question;
  validate?: (question: Question) => boolean;
}

export abstract class BaseGenerator {
  protected topicId: TopicId;
  protected templates: QuestionTemplate[];

  constructor(topicId: TopicId) {
    this.topicId = topicId;
    this.templates = this.defineTemplates();
  }

  protected abstract defineTemplates(): QuestionTemplate[];

  public generateQuestion(difficulty?: DifficultyLevel): Question {
    const availableTemplates = difficulty
      ? this.templates.filter((t) => t.difficulty === difficulty)
      : this.templates;

    if (availableTemplates.length === 0) {
      throw new Error(
        `No templates available for difficulty: ${difficulty || 'any'}`
      );
    }

    const template =
      availableTemplates[randomInt(0, availableTemplates.length - 1)];

    let question: Question;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      question = template.generate();
      attempts++;

      if (attempts > maxAttempts) {
        throw new Error(
          'Failed to generate valid question after maximum attempts'
        );
      }
    } while (template.validate && !template.validate(question));

    return question;
  }

  public getTemplateCount(): number {
    return this.templates.length;
  }

  public getTemplatesByDifficulty(difficulty: DifficultyLevel): number {
    return this.templates.filter((t) => t.difficulty === difficulty).length;
  }

  protected createQuestionId(): string {
    return `${this.topicId}_${Date.now()}_${randomInt(1000, 9999)}`;
  }
}
