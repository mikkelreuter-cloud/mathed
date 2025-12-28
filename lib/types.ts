export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type InputType = 'short' | 'multipleChoice' | 'stepWorksheet';

export type AnswerFormat =
  | 'decimal'
  | 'fraction'
  | 'expression'
  | 'vector2d'
  | 'coordinate'
  | 'interval'
  | 'integer';

export type TopicId =
  // C-level
  | 'numbers-arithmetic'
  | 'equations'
  | 'linear-equations'
  | 'quadratic-equations'
  | 'functions'
  | 'trigonometry'
  | 'geometry'
  | 'probability'
  // B-level
  | 'quadratic-polynomials'
  | 'combinatorics'
  | 'statistics'
  | 'vectors-2d'
  | 'analytic-geometry'
  | 'differential-calculus';

export type TopicLevel = 'C' | 'B';

export interface Topic {
  id: TopicId;
  name: string;
  level: TopicLevel;
  description: string;
  order: number;
}

export interface Question {
  id: string;
  topic: TopicId;
  difficulty: DifficultyLevel;
  prompt: string;
  inputType: InputType;
  expectedAnswerFormat: AnswerFormat;
  correctAnswer: string | string[];
  tolerance?: number;
  hints: string[];
  workedSolution: string[];
  stepRules?: StepRule[];
  metadata: QuestionMetadata;
  multipleChoiceOptions?: string[];
}

export interface StepRule {
  description: string;
  validationMode: 'symbolic' | 'numeric';
}

export interface QuestionMetadata {
  templateId: string;
  generatedAt: string;
  variables: Record<string, any>;
}

export interface Tutorial {
  topicId: TopicId;
  learningGoals: string[];
  coreRules: string[];
  workedExamples: WorkedExample[];
  commonMistakes: string[];
  miniQuiz: MiniQuizQuestion[];
}

export interface WorkedExample {
  title: string;
  problem: string;
  solution: string[];
  explanation?: string;
}

export interface MiniQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicProgress {
  topicId: TopicId;
  attempts: number;
  correct: number;
  incorrect: number;
  streak: number;
  bestStreak: number;
  lastPracticed: string | null;
  averageAccuracy: number;
}

export interface UserSettings {
  angleUnit: 'degrees' | 'radians';
  answerPreference: 'decimal' | 'fraction';
  tolerance: number;
  darkMode: boolean;
}

export interface PracticeSession {
  questionId: string;
  startedAt: string;
  completedAt?: string;
  userAnswer?: string;
  userSteps?: string[];
  hintsUsed: number;
  solutionRevealed: boolean;
  correct?: boolean;
}

export interface StepValidationResult {
  valid: boolean;
  mode: 'symbolic' | 'numeric' | 'exact';
  message: string;
  details?: string;
}
