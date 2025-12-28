import { Tutorial, TopicId } from '../types';
import { numbersArithmeticTutorial } from './numbers-arithmetic';
import { equationsTutorial } from './equations';
import { linearEquationsTutorial } from './linear-equations';
import { quadraticEquationsTutorial } from './quadratic-equations';
import { functionsTutorial } from './functions';
import { trigonometryTutorial } from './trigonometry';
import { geometryTutorial } from './geometry';
import { probabilityTutorial } from './probability';
import { quadraticPolynomialsTutorial } from './quadratic-polynomials';
import { combinatoricsTutorial } from './combinatorics';
import { statisticsTutorial } from './statistics';
import { vectors2DTutorial } from './vectors-2d';
import { analyticGeometryTutorial } from './analytic-geometry';
import { differentialCalculusTutorial } from './differential-calculus';

const tutorials: Record<TopicId, Tutorial> = {
  'numbers-arithmetic': numbersArithmeticTutorial,
  'equations': equationsTutorial,
  'linear-equations': linearEquationsTutorial,
  'quadratic-equations': quadraticEquationsTutorial,
  'functions': functionsTutorial,
  'trigonometry': trigonometryTutorial,
  'geometry': geometryTutorial,
  'probability': probabilityTutorial,
  'quadratic-polynomials': quadraticPolynomialsTutorial,
  'combinatorics': combinatoricsTutorial,
  'statistics': statisticsTutorial,
  'vectors-2d': vectors2DTutorial,
  'analytic-geometry': analyticGeometryTutorial,
  'differential-calculus': differentialCalculusTutorial,
};

export const getTutorial = (topicId: TopicId): Tutorial => {
  const tutorial = tutorials[topicId];
  if (!tutorial) {
    throw new Error(`No tutorial found for topic: ${topicId}`);
  }
  return tutorial;
};

export const getAllTutorials = (): Tutorial[] => {
  return Object.values(tutorials);
};
