import { Topic, TopicId } from './types';

export const TOPICS: Topic[] = [
  // C-level topics
  {
    id: 'numbers-arithmetic',
    name: 'Numbers and Arithmetic',
    level: 'C',
    description: 'Order of operations, fractions, percentages, and basic number properties',
    order: 1,
  },
  {
    id: 'equations',
    name: 'Equations',
    level: 'C',
    description: 'Solving basic equations and word problems',
    order: 2,
  },
  {
    id: 'linear-equations',
    name: 'Linear Equations',
    level: 'C',
    description: 'Solving and graphing linear equations',
    order: 3,
  },
  {
    id: 'quadratic-equations',
    name: 'Quadratic Equations',
    level: 'C',
    description: 'Discriminant, factoring, and quadratic formula',
    order: 4,
  },
  {
    id: 'functions',
    name: 'Functions',
    level: 'C',
    description: 'Evaluating functions, slope, and intercepts',
    order: 5,
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    level: 'C',
    description: 'Sin, cos, tan, right triangles, and unit circle basics',
    order: 6,
  },
  {
    id: 'geometry',
    name: 'Geometry',
    level: 'C',
    description: 'Area, volume, similarity, and Pythagorean theorem',
    order: 7,
  },
  {
    id: 'probability',
    name: 'Probability',
    level: 'C',
    description: 'Simple and conditional probability',
    order: 8,
  },
  // B-level topics
  {
    id: 'quadratic-polynomials',
    name: 'Quadratic Polynomials',
    level: 'B',
    description: 'Vertex form, roots, and transformations',
    order: 9,
  },
  {
    id: 'combinatorics',
    name: 'Combinatorics',
    level: 'B',
    description: 'Permutations and combinations',
    order: 10,
  },
  {
    id: 'statistics',
    name: 'Statistics',
    level: 'B',
    description: 'Mean, median, variance, and standard deviation',
    order: 11,
  },
  {
    id: 'vectors-2d',
    name: 'Vectors in 2D',
    level: 'B',
    description: 'Addition, dot product, and vector length',
    order: 12,
  },
  {
    id: 'analytic-geometry',
    name: 'Analytic Geometry',
    level: 'B',
    description: 'Lines, distance, midpoint, and circles',
    order: 13,
  },
  {
    id: 'differential-calculus',
    name: 'Differential Calculus',
    level: 'B',
    description: 'Derivatives, tangents, and optimization',
    order: 14,
  },
];

export const getTopicById = (id: TopicId): Topic | undefined => {
  return TOPICS.find((topic) => topic.id === id);
};

export const getTopicsByLevel = (level: 'C' | 'B'): Topic[] => {
  return TOPICS.filter((topic) => topic.level === level);
};
