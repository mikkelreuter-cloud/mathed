'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TOPICS } from '@/lib/topics';
import { getAllProgress } from '@/lib/utils/progress';
import { TopicProgress } from '@/lib/types';

export default function ProgressPage() {
  const [progress, setProgress] = useState<Record<string, TopicProgress>>({});

  useEffect(() => {
    setProgress(getAllProgress());
  }, []);

  const totalAttempts = Object.values(progress).reduce((sum, p) => sum + p.attempts, 0);
  const totalCorrect = Object.values(progress).reduce((sum, p) => sum + p.correct, 0);
  const overallAccuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;
  const bestStreak = Math.max(...Object.values(progress).map(p => p.bestStreak), 0);

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Progress</h1>
      <p className="text-lg text-gray-600 mb-8">Track your performance across all topics</p>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <div className="text-3xl font-bold text-blue-700">{totalAttempts}</div>
          <div className="text-sm text-blue-600">Total Attempts</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <div className="text-3xl font-bold text-green-700">{totalCorrect}</div>
          <div className="text-sm text-green-600">Correct Answers</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <div className="text-3xl font-bold text-purple-700">{overallAccuracy.toFixed(1)}%</div>
          <div className="text-sm text-purple-600">Overall Accuracy</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <div className="text-3xl font-bold text-orange-700">{bestStreak}</div>
          <div className="text-sm text-orange-600">Best Streak</div>
        </div>
      </div>

      {/* Topic Progress */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Progress by Topic</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {TOPICS.map(topic => {
            const topicProgress = progress[topic.id];
            const hasProgress = topicProgress && topicProgress.attempts > 0;

            return (
              <div key={topic.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Link
                        href={`/topic/${topic.id}`}
                        className="text-lg font-medium text-gray-900 hover:text-blue-600"
                      >
                        {topic.name}
                      </Link>
                      <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                        {topic.level}
                      </span>
                    </div>
                    {hasProgress ? (
                      <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Attempts:</span> {topicProgress.attempts}
                        </div>
                        <div>
                          <span className="font-medium">Accuracy:</span>{' '}
                          <span className={topicProgress.averageAccuracy >= 70 ? 'text-green-600' : 'text-orange-600'}>
                            {topicProgress.averageAccuracy.toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Streak:</span> {topicProgress.streak}
                        </div>
                        <div>
                          <span className="font-medium">Best:</span> {topicProgress.bestStreak}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No practice yet</p>
                    )}
                  </div>
                  <Link
                    href={`/topic/${topic.id}/practice`}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Practice
                  </Link>
                </div>

                {/* Progress Bar */}
                {hasProgress && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          topicProgress.averageAccuracy >= 70 ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${topicProgress.averageAccuracy}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
