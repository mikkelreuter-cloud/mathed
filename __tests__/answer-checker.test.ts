import { checkAnswer } from '../lib/validators/answer-checker';

describe('Answer Checker', () => {
  describe('Integer format', () => {
    it('should accept correct integer answers', () => {
      const result = checkAnswer('42', '42', 'integer');
      expect(result.correct).toBe(true);
    });

    it('should reject incorrect integer answers', () => {
      const result = checkAnswer('42', '43', 'integer');
      expect(result.correct).toBe(false);
    });
  });

  describe('Decimal format', () => {
    it('should accept answers within tolerance', () => {
      const result = checkAnswer('3.14', '3.15', 'decimal', 0.02);
      expect(result.correct).toBe(true);
    });

    it('should reject answers outside tolerance', () => {
      const result = checkAnswer('3.14', '3.20', 'decimal', 0.02);
      expect(result.correct).toBe(false);
    });
  });

  describe('Fraction format', () => {
    it('should accept simplified fractions', () => {
      const result = checkAnswer('1/2', '1/2', 'fraction');
      expect(result.correct).toBe(true);
    });

    it('should accept equivalent fractions', () => {
      const result = checkAnswer('2/4', '1/2', 'fraction');
      expect(result.correct).toBe(true);
    });

    it('should reject incorrect fractions', () => {
      const result = checkAnswer('1/3', '1/2', 'fraction');
      expect(result.correct).toBe(false);
    });
  });

  describe('Expression format', () => {
    it('should accept symbolically equivalent expressions', () => {
      const result = checkAnswer('2x + 4', '2x + 4', 'expression');
      expect(result.correct).toBe(true);
    });

    it('should accept numerically equivalent expressions', () => {
      const result = checkAnswer('x + x', '2x', 'expression', 0.01);
      expect(result.correct).toBe(true);
    });
  });

  describe('Vector2D format', () => {
    it('should accept correct vector format', () => {
      const result = checkAnswer('(3, 4)', '(3, 4)', 'vector2d');
      expect(result.correct).toBe(true);
    });

    it('should accept vectors within tolerance', () => {
      const result = checkAnswer('(3.14, 4.15)', '(3.15, 4.16)', 'vector2d', 0.02);
      expect(result.correct).toBe(true);
    });

    it('should reject incorrect vectors', () => {
      const result = checkAnswer('(3, 4)', '(4, 3)', 'vector2d');
      expect(result.correct).toBe(false);
    });
  });

  describe('Multiple correct answers', () => {
    it('should accept any of the correct answers', () => {
      const result = checkAnswer('5', ['5', '10'], 'integer');
      expect(result.correct).toBe(true);
    });

    it('should accept the second correct answer', () => {
      const result = checkAnswer('10', ['5', '10'], 'integer');
      expect(result.correct).toBe(true);
    });
  });
});
