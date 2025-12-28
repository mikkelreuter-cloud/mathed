import { AnswerFormat, StepValidationResult } from '../types';
import {
  parseFraction,
  simplifyFraction,
  math,
  evaluateExpression,
  simplifyExpression,
} from '../utils/math';

export interface AnswerCheckResult {
  correct: boolean;
  mode: 'exact' | 'tolerance' | 'symbolic' | 'numeric';
  message: string;
  details?: string;
}

export const checkAnswer = (
  userAnswer: string,
  correctAnswer: string | string[],
  format: AnswerFormat,
  tolerance: number = 0.01
): AnswerCheckResult => {
  const trimmedUser = userAnswer.trim();
  const correctAnswers = Array.isArray(correctAnswer)
    ? correctAnswer
    : [correctAnswer];

  // Try each correct answer variant
  for (const correct of correctAnswers) {
    const result = checkSingleAnswer(trimmedUser, correct, format, tolerance);
    if (result.correct) {
      return result;
    }
  }

  return {
    correct: false,
    mode: 'exact',
    message: 'Incorrect answer',
    details: `Expected: ${correctAnswers.join(' or ')}`,
  };
};

const checkSingleAnswer = (
  userAnswer: string,
  correctAnswer: string,
  format: AnswerFormat,
  tolerance: number
): AnswerCheckResult => {
  switch (format) {
    case 'integer':
      return checkInteger(userAnswer, correctAnswer);

    case 'decimal':
      return checkDecimal(userAnswer, correctAnswer, tolerance);

    case 'fraction':
      return checkFraction(userAnswer, correctAnswer);

    case 'expression':
      return checkExpression(userAnswer, correctAnswer, tolerance);

    case 'vector2d':
      return checkVector2D(userAnswer, correctAnswer, tolerance);

    case 'coordinate':
      return checkCoordinate(userAnswer, correctAnswer, tolerance);

    case 'interval':
      return checkInterval(userAnswer, correctAnswer, tolerance);

    default:
      return checkExact(userAnswer, correctAnswer);
  }
};

const checkInteger = (
  userAnswer: string,
  correctAnswer: string
): AnswerCheckResult => {
  const userInt = parseInt(userAnswer, 10);
  const correctInt = parseInt(correctAnswer, 10);

  if (isNaN(userInt)) {
    return {
      correct: false,
      mode: 'exact',
      message: 'Not a valid integer',
    };
  }

  if (userInt === correctInt) {
    return {
      correct: true,
      mode: 'exact',
      message: 'Correct!',
    };
  }

  return {
    correct: false,
    mode: 'exact',
    message: 'Incorrect',
    details: `Expected: ${correctInt}`,
  };
};

const checkDecimal = (
  userAnswer: string,
  correctAnswer: string,
  tolerance: number
): AnswerCheckResult => {
  const userNum = parseFloat(userAnswer);
  const correctNum = parseFloat(correctAnswer);

  if (isNaN(userNum)) {
    return {
      correct: false,
      mode: 'tolerance',
      message: 'Not a valid number',
    };
  }

  const diff = Math.abs(userNum - correctNum);
  const correct = diff <= tolerance;

  return {
    correct,
    mode: 'tolerance',
    message: correct ? 'Correct!' : 'Incorrect',
    details: correct ? undefined : `Expected: ${correctNum} (±${tolerance})`,
  };
};

const checkFraction = (
  userAnswer: string,
  correctAnswer: string
): AnswerCheckResult => {
  const userFrac = parseFraction(userAnswer);
  const correctFrac = parseFraction(correctAnswer);

  if (!userFrac) {
    return {
      correct: false,
      mode: 'exact',
      message: 'Not a valid fraction (use format: a/b)',
    };
  }

  if (!correctFrac) {
    return {
      correct: false,
      mode: 'exact',
      message: 'Invalid correct answer format',
    };
  }

  const correct =
    userFrac.num === correctFrac.num && userFrac.den === correctFrac.den;

  return {
    correct,
    mode: 'exact',
    message: correct ? 'Correct!' : 'Incorrect',
    details: correct
      ? undefined
      : `Expected: ${correctFrac.num}/${correctFrac.den}`,
  };
};

const checkExpression = (
  userAnswer: string,
  correctAnswer: string,
  tolerance: number
): AnswerCheckResult => {
  // First try symbolic simplification
  try {
    const userSimplified = simplifyExpression(userAnswer);
    const correctSimplified = simplifyExpression(correctAnswer);

    if (userSimplified === correctSimplified) {
      return {
        correct: true,
        mode: 'symbolic',
        message: 'Correct!',
      };
    }
  } catch (error) {
    // Symbolic simplification failed, try numeric
  }

  // Fallback to numeric evaluation at multiple points
  return checkExpressionNumeric(userAnswer, correctAnswer, tolerance);
};

const checkExpressionNumeric = (
  userExpr: string,
  correctExpr: string,
  tolerance: number
): AnswerCheckResult => {
  const testPoints = [
    { x: 0 },
    { x: 1 },
    { x: -1 },
    { x: 2 },
    { x: -2 },
    { x: 0.5 },
    { x: 3 },
  ];

  try {
    for (const point of testPoints) {
      const userVal = evaluateExpression(userExpr, point);
      const correctVal = evaluateExpression(correctExpr, point);

      if (!isFinite(userVal) || !isFinite(correctVal)) {
        continue;
      }

      const diff = Math.abs(userVal - correctVal);
      if (diff > tolerance) {
        return {
          correct: false,
          mode: 'numeric',
          message: 'Expression does not match',
          details: `Checked at x=${point.x}: got ${userVal}, expected ${correctVal}`,
        };
      }
    }

    return {
      correct: true,
      mode: 'numeric',
      message: 'Correct (numerically verified)!',
    };
  } catch (error) {
    return {
      correct: false,
      mode: 'numeric',
      message: 'Could not evaluate expression',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

const checkVector2D = (
  userAnswer: string,
  correctAnswer: string,
  tolerance: number
): AnswerCheckResult => {
  const userMatch = userAnswer.match(/\((-?\d+\.?\d*),\s*(-?\d+\.?\d*)\)/);
  const correctMatch = correctAnswer.match(
    /\((-?\d+\.?\d*),\s*(-?\d+\.?\d*)\)/
  );

  if (!userMatch) {
    return {
      correct: false,
      mode: 'exact',
      message: 'Not a valid vector format (use: (x, y))',
    };
  }

  if (!correctMatch) {
    return {
      correct: false,
      mode: 'exact',
      message: 'Invalid correct answer format',
    };
  }

  const userX = parseFloat(userMatch[1]);
  const userY = parseFloat(userMatch[2]);
  const correctX = parseFloat(correctMatch[1]);
  const correctY = parseFloat(correctMatch[2]);

  const diffX = Math.abs(userX - correctX);
  const diffY = Math.abs(userY - correctY);
  const correct = diffX <= tolerance && diffY <= tolerance;

  return {
    correct,
    mode: 'tolerance',
    message: correct ? 'Correct!' : 'Incorrect',
    details: correct ? undefined : `Expected: (${correctX}, ${correctY})`,
  };
};

const checkCoordinate = (
  userAnswer: string,
  correctAnswer: string,
  tolerance: number
): AnswerCheckResult => {
  return checkVector2D(userAnswer, correctAnswer, tolerance);
};

const checkInterval = (
  userAnswer: string,
  correctAnswer: string,
  tolerance: number
): AnswerCheckResult => {
  // Support formats: [a, b], (a, b), [a, b), (a, b]
  const parseInterval = (str: string) => {
    const match = str.match(/([\[\(])(-?\d+\.?\d*),\s*(-?\d+\.?\d*)([\]\)])/);
    if (!match) return null;

    return {
      leftClosed: match[1] === '[',
      left: parseFloat(match[2]),
      right: parseFloat(match[3]),
      rightClosed: match[4] === ']',
    };
  };

  const userInterval = parseInterval(userAnswer);
  const correctInterval = parseInterval(correctAnswer);

  if (!userInterval) {
    return {
      correct: false,
      mode: 'exact',
      message: 'Not a valid interval format (use: [a, b] or (a, b))',
    };
  }

  if (!correctInterval) {
    return {
      correct: false,
      mode: 'exact',
      message: 'Invalid correct answer format',
    };
  }

  const leftMatch =
    userInterval.leftClosed === correctInterval.leftClosed &&
    Math.abs(userInterval.left - correctInterval.left) <= tolerance;

  const rightMatch =
    userInterval.rightClosed === correctInterval.rightClosed &&
    Math.abs(userInterval.right - correctInterval.right) <= tolerance;

  const correct = leftMatch && rightMatch;

  return {
    correct,
    mode: 'tolerance',
    message: correct ? 'Correct!' : 'Incorrect',
    details: correct ? undefined : `Expected: ${correctAnswer}`,
  };
};

const checkExact = (
  userAnswer: string,
  correctAnswer: string
): AnswerCheckResult => {
  const correct =
    userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();

  return {
    correct,
    mode: 'exact',
    message: correct ? 'Correct!' : 'Incorrect',
    details: correct ? undefined : `Expected: ${correctAnswer}`,
  };
};

export const checkStep = (
  currentStep: string,
  previousStep: string,
  tolerance: number = 0.01
): StepValidationResult => {
  // Try symbolic validation first
  try {
    const currentSimplified = simplifyExpression(currentStep);
    const previousSimplified = simplifyExpression(previousStep);

    if (currentSimplified === previousSimplified) {
      return {
        valid: true,
        mode: 'symbolic',
        message: 'Step is correct',
      };
    }
  } catch (error) {
    // Symbolic failed, continue to numeric
  }

  // Fallback to numeric validation
  const testPoints = [
    { x: 0 },
    { x: 1 },
    { x: -1 },
    { x: 2 },
    { x: 0.5 },
  ];

  try {
    let validPoints = 0;

    for (const point of testPoints) {
      try {
        const currentVal = evaluateExpression(currentStep, point);
        const previousVal = evaluateExpression(previousStep, point);

        if (!isFinite(currentVal) || !isFinite(previousVal)) {
          continue;
        }

        const diff = Math.abs(currentVal - previousVal);
        if (diff <= tolerance) {
          validPoints++;
        } else {
          return {
            valid: false,
            mode: 'numeric',
            message: 'Step does not preserve equality',
            details: `At x=${point.x}: current=${currentVal}, previous=${previousVal}`,
          };
        }
      } catch {
        continue;
      }
    }

    if (validPoints >= 3) {
      return {
        valid: true,
        mode: 'numeric',
        message: 'Step appears correct (numerically verified)',
      };
    }
  } catch (error) {
    // Could not validate numerically
  }

  return {
    valid: false,
    mode: 'exact',
    message: 'Could not verify step',
    details: 'Please check your work',
  };
};
