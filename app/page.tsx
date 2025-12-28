'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TOPICS } from '@/lib/topics';
import { getAllProgress } from '@/lib/utils/progress';
import { TopicProgress } from '@/lib/types';

export default function Dashboard() {
  const [progress, setProgress] = useState<Record<string, TopicProgress>>({});

  useEffect(() => {
    setProgress(getAllProgress());
  }, []);

  const getRecommendedTopics = () => {
    const practiced = Object.values(progress).filter(p => p.attempts > 0);
    const notPracticed = TOPICS.filter(
      topic => !practiced.find(p => p.topicId === topic.id)
    );

    if (notPracticed.length > 0) {
      return notPracticed.slice(0, 3);
    }

    const sortedByAccuracy = practiced.sort((a, b) => a.averageAccuracy - b.averageAccuracy);
    return TOPICS.filter(t => sortedByAccuracy.slice(0, 3).find(p => p.topicId === t.id));
  };

  const recommendedTopics = getRecommendedTopics();
  const recentlyPracticed = Object.values(progress)
    .filter(p => p.lastPracticed)
    .sort((a, b) => new Date(b.lastPracticed!).getTime() - new Date(a.lastPracticed!).getTime())
    .slice(0, 3);

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to MathEd</h1>
      <p className="text-lg text-gray-600 mb-8">
        Practice high school mathematics with interactive tutorials and personalized questions
      </p>

      {/* Recommended Topics */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedTopics.map(topic => {
            const topicProgress = progress[topic.id];
            return (
              <Link
                key={topic.id}
                href={`/topic/${topic.id}`}
                className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                    {topic.level}-Level
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                {topicProgress && topicProgress.attempts > 0 ? (
                  <div className="text-xs text-gray-500">
                    Accuracy: {topicProgress.averageAccuracy.toFixed(0)}% | Streak: {topicProgress.streak}
                  </div>
                ) : (
                  <div className="text-xs text-blue-600 font-medium">Start practicing →</div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recently Practiced */}
      {recentlyPracticed.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Continue Practicing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentlyPracticed.map(topicProgress => {
              const topic = TOPICS.find(t => t.id === topicProgress.topicId);
              if (!topic) return null;

              return (
                <Link
                  key={topic.id}
                  href={`/topic/${topic.id}/practice`}
                  className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-green-400 hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Accuracy: {topicProgress.averageAccuracy.toFixed(0)}%</div>
                    <div>Current streak: {topicProgress.streak}</div>
                    <div>Total attempts: {topicProgress.attempts}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Quick Stats */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="text-3xl font-bold text-blue-700 mb-1">
            {Object.values(progress).reduce((sum, p) => sum + p.attempts, 0)}
          </div>
          <div className="text-sm text-blue-600">Total Attempts</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="text-3xl font-bold text-green-700 mb-1">
            {Object.values(progress).reduce((sum, p) => sum + p.correct, 0)}
          </div>
          <div className="text-sm text-green-600">Correct Answers</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
          <div className="text-3xl font-bold text-purple-700 mb-1">
            {Math.max(...Object.values(progress).map(p => p.bestStreak), 0)}
          </div>
          <div className="text-sm text-purple-600">Best Streak</div>
        </div>
      </section>
    </div>
  );
}
