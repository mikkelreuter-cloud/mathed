'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { TopicId } from '@/lib/types';
import { getTopicById } from '@/lib/topics';
import { getTutorial } from '@/lib/tutorials';
import TutorialTab from '@/components/tutorial/TutorialTab';
import PracticeTab from '@/components/practice/PracticeTab';

export default function TopicPage() {
  const params = useParams();
  const topicId = params.topicId as TopicId;
  const topic = getTopicById(topicId);
  const [activeTab, setActiveTab] = useState<'tutorial' | 'practice'>('tutorial');

  if (!topic) {
    return <div className="text-center text-red-600">Topic not found</div>;
  }

  const tutorial = getTutorial(topicId);

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{topic.name}</h1>
        <p className="text-lg text-gray-600">{topic.description}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'tutorial'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tutorial
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'practice'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Practice
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'tutorial' && <TutorialTab tutorial={tutorial} />}
        {activeTab === 'practice' && <PracticeTab topicId={topicId} />}
      </div>
    </div>
  );
}
