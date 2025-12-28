'use client';

import { useState } from 'react';
import { Tutorial } from '@/lib/types';

interface TutorialTabProps {
  tutorial: Tutorial;
}

export default function TutorialTab({ tutorial }: TutorialTabProps) {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const checkQuizAnswers = () => {
    setShowQuizResults(true);
  };

  const quizScore = tutorial.miniQuiz.reduce((score, question, index) => {
    return score + (quizAnswers[index] === question.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Learning Goals */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Learning Goals</h2>
        <ul className="space-y-2">
          {tutorial.learningGoals.map((goal, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span className="text-gray-700">{goal}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Core Rules */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Core Rules & Formulas</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          {tutorial.coreRules.map((rule, index) => (
            <div key={index} className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">{index + 1}.</span>
              <span className="text-gray-800">{rule}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Worked Examples */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Worked Examples</h2>
        {tutorial.workedExamples.map((example, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.title}</h3>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Problem:</span>
              <p className="text-gray-800 mt-1">{example.problem}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Solution:</span>
              <div className="mt-2 space-y-1 font-mono text-sm bg-white p-3 rounded border">
                {example.solution.map((step, stepIndex) => (
                  <div key={stepIndex} className="text-gray-800">{step}</div>
                ))}
              </div>
            </div>
            {example.explanation && (
              <div className="mt-3 text-sm text-gray-600 italic">{example.explanation}</div>
            )}
          </div>
        ))}
      </section>

      {/* Common Mistakes */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Common Mistakes to Avoid</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
          {tutorial.commonMistakes.map((mistake, index) => (
            <div key={index} className="flex items-start">
              <span className="text-yellow-600 mr-2">⚠</span>
              <span className="text-gray-800">{mistake}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mini Quiz */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Mini Quiz</h2>
        <p className="text-sm text-gray-600 mb-4">Test your understanding before practicing!</p>
        <div className="space-y-4">
          {tutorial.miniQuiz.map((question, qIndex) => (
            <div key={qIndex} className="bg-white border border-gray-300 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-3">
                {qIndex + 1}. {question.question}
              </p>
              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleQuizAnswer(qIndex, oIndex)}
                    disabled={showQuizResults}
                    className={`w-full text-left px-4 py-2 rounded border transition-colors ${
                      showQuizResults
                        ? oIndex === question.correctIndex
                          ? 'bg-green-100 border-green-500 text-green-900'
                          : quizAnswers[qIndex] === oIndex
                          ? 'bg-red-100 border-red-500 text-red-900'
                          : 'bg-gray-50 border-gray-300 text-gray-600'
                        : quizAnswers[qIndex] === oIndex
                        ? 'bg-blue-100 border-blue-500 text-blue-900'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {showQuizResults && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
        {!showQuizResults && (
          <button
            onClick={checkQuizAnswers}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Answers
          </button>
        )}
        {showQuizResults && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <p className="text-lg font-semibold text-blue-900">
              Score: {quizScore}/{tutorial.miniQuiz.length} ({Math.round((quizScore / tutorial.miniQuiz.length) * 100)}%)
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
