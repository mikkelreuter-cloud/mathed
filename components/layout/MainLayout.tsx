'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOPICS } from '@/lib/topics';
import { TopicId } from '@/lib/types';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isTopicActive = (topicId: TopicId) => pathname.startsWith(`/topic/${topicId}`);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">MathEd</h1>
          <p className="text-sm text-gray-600">High School Mathematics</p>
        </div>

        {/* Main Navigation */}
        <nav className="px-4 pb-4">
          <Link
            href="/"
            className={`block px-4 py-2 rounded-lg mb-2 ${
              isActive('/') ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/progress"
            className={`block px-4 py-2 rounded-lg mb-2 ${
              isActive('/progress') ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Progress
          </Link>
          <Link
            href="/settings"
            className={`block px-4 py-2 rounded-lg mb-4 ${
              isActive('/settings') ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Settings
          </Link>

          {/* Topics */}
          <div className="mt-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              C-Level Topics
            </h3>
            {TOPICS.filter(t => t.level === 'C').map(topic => (
              <Link
                key={topic.id}
                href={`/topic/${topic.id}`}
                className={`block px-4 py-2 rounded-lg mb-1 text-sm ${
                  isTopicActive(topic.id)
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {topic.name}
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              B-Level Topics
            </h3>
            {TOPICS.filter(t => t.level === 'B').map(topic => (
              <Link
                key={topic.id}
                href={`/topic/${topic.id}`}
                className={`block px-4 py-2 rounded-lg mb-1 text-sm ${
                  isTopicActive(topic.id)
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
