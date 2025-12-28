import { create, all } from 'mathjs';

const math = create(all);

export const gcd = (a: number, b: number): number => {
  a = Math.abs(Math.floor(a));
  b = Math.abs(Math.floor(b));
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

export const simplifyFraction = (
  numerator: number,
  denominator: number
): { num: number; den: number } => {
  if (denominator === 0) {
    throw new Error('Denominator cannot be zero');
  }

  const divisor = gcd(numerator, denominator);
  let num = numerator / divisor;
  let den = denominator / divisor;

  // Keep denominator positive
  if (den < 0) {
    num = -num;
    den = -den;
  }

  return { num, den };
};

export const parseFraction = (
  str: string
): { num: number; den: number } | null => {
  const match = str.trim().match(/^(-?\d+)\/(-?\d+)$/);
  if (!match) {
    return null;
  }

  const num = parseInt(match[1], 10);
  const den = parseInt(match[2], 10);

  if (den === 0) {
    return null;
  }

  return simplifyFraction(num, den);
};

export const fractionToDecimal = (num: number, den: number): number => {
  return num / den;
};

export const decimalToFraction = (
  decimal: number,
  tolerance: number = 0.0001
): { num: number; den: number } => {
  let bestNum = Math.round(decimal);
  let bestDen = 1;
  let bestError = Math.abs(decimal - bestNum);

  for (let den = 2; den <= 100; den++) {
    const num = Math.round(decimal * den);
    const error = Math.abs(decimal - num / den);

    if (error < bestError) {
      bestNum = num;
      bestDen = den;
      bestError = error;

      if (error < tolerance) {
        break;
      }
    }
  }

  return simplifyFraction(bestNum, bestDen);
};

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomChoice = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randomIntExcluding = (
  min: number,
  max: number,
  exclude: number[]
): number => {
  let value: number;
  let attempts = 0;
  do {
    value = randomInt(min, max);
    attempts++;
    if (attempts > 100) {
      throw new Error('Could not find non-excluded value');
    }
  } while (exclude.includes(value));
  return value;
};

export const degToRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const radToDeg = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

export const formatNumber = (
  value: number,
  decimals: number = 2
): string => {
  if (Number.isInteger(value)) {
    return value.toString();
  }
  return value.toFixed(decimals);
};

export const evaluateExpression = (
  expr: string,
  variables?: Record<string, number>
): number => {
  try {
    const scope = variables || {};
    return math.evaluate(expr, scope);
  } catch (error) {
    throw new Error(`Failed to evaluate expression: ${expr}`);
  }
};

export const simplifyExpression = (expr: string): string => {
  try {
    return math.simplify(expr).toString();
  } catch (error) {
    return expr;
  }
};

export { math };
