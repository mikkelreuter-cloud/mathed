'use client';

import { useState } from 'react';
import { TopicId, Question, DifficultyLevel } from '@/lib/types';
import { generateQuestion } from '@/lib/generators';
import { checkAnswer } from '@/lib/validators/answer-checker';
import { updateProgress } from '@/lib/utils/progress';

interface PracticeTabProps {
  topicId: TopicId;
}

export default function PracticeTab({ topicId }: PracticeTabProps) {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [checkResult, setCheckResult] = useState<{ correct: boolean; message: string; details?: string } | null>(null);

  const startNewQuestion = () => {
    const question = generateQuestion(topicId, difficulty);
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowHints(false);
    setHintsRevealed(0);
    setShowSolution(false);
    setCheckResult(null);
  };

  const handleCheckAnswer = () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const result = checkAnswer(
      userAnswer,
      currentQuestion.correctAnswer,
      currentQuestion.expectedAnswerFormat,
      currentQuestion.tolerance
    );

    setCheckResult(result);

    // Update progress
    updateProgress(topicId, result.correct);
  };

  const revealHint = () => {
    if (currentQuestion && hintsRevealed < currentQuestion.hints.length) {
      setHintsRevealed(prev => prev + 1);
      setShowHints(true);
    }
  };

  const revealSolution = () => {
    setShowSolution(true);
  };

  return (
    <div className="space-y-6">
      {/* Difficulty Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
        <div className="flex space-x-2">
          {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map(level => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              disabled={!!currentQuestion}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                difficulty === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${currentQuestion ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      {!currentQuestion && (
        <button
          onClick={startNewQuestion}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Generate Question
        </button>
      )}

      {/* Question Display */}
      {currentQuestion && (
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Question</h3>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                {currentQuestion.difficulty}
              </span>
            </div>
            <p className="text-gray-800 text-lg mb-4">{currentQuestion.prompt}</p>
            <div className="text-sm text-gray-600">
              <strong>Expected format:</strong> {currentQuestion.expectedAnswerFormat}
            </div>
          </div>

          {/* Answer Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              disabled={showSolution || checkResult?.correct}
              placeholder="Enter your answer..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleCheckAnswer}
              disabled={!userAnswer.trim() || showSolution || checkResult?.correct}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
            <button
              onClick={revealHint}
              disabled={showSolution || hintsRevealed >= currentQuestion.hints.length}
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Show Hint ({hintsRevealed}/{currentQuestion.hints.length})
            </button>
            <button
              onClick={revealSolution}
              disabled={showSolution}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Reveal Solution
            </button>
          </div>

          {/* Check Result */}
          {checkResult && (
            <div
              className={`p-4 rounded-lg ${
                checkResult.correct
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-red-100 border border-red-300'
              }`}
            >
              <p
                className={`font-semibold ${
                  checkResult.correct ? 'text-green-900' : 'text-red-900'
                }`}
              >
                {checkResult.message}
              </p>
              {checkResult.details && (
                <p className={checkResult.correct ? 'text-green-700' : 'text-red-700'}>
                  {checkResult.details}
                </p>
              )}
            </div>
          )}

          {/* Hints */}
          {showHints && hintsRevealed > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Hints:</h4>
              <ol className="list-decimal list-inside space-y-1">
                {currentQuestion.hints.slice(0, hintsRevealed).map((hint, index) => (
                  <li key={index} className="text-yellow-800">
                    {hint}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Solution */}
          {showSolution && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Worked Solution:</h4>
              <div className="space-y-1 font-mono text-sm bg-white p-3 rounded border">
                {currentQuestion.workedSolution.map((step, index) => (
                  <div key={index} className="text-gray-800">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Question */}
          {(checkResult || showSolution) && (
            <button
              onClick={startNewQuestion}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
}
