import { TopicProgress, TopicId, PracticeSession } from '../types';

const PROGRESS_KEY = 'mathed_progress';
const SESSIONS_KEY = 'mathed_sessions';

export const getTopicProgress = (topicId: TopicId): TopicProgress => {
  const allProgress = getAllProgress();
  return (
    allProgress[topicId] || {
      topicId,
      attempts: 0,
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0,
      lastPracticed: null,
      averageAccuracy: 0,
    }
  );
};

export const getAllProgress = (): Record<TopicId, TopicProgress> => {
  if (typeof window === 'undefined') {
    return {} as Record<TopicId, TopicProgress>;
  }

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }

  return {} as Record<TopicId, TopicProgress>;
};

export const updateProgress = (
  topicId: TopicId,
  correct: boolean
): TopicProgress => {
  const current = getTopicProgress(topicId);

  const newAttempts = current.attempts + 1;
  const newCorrect = correct ? current.correct + 1 : current.correct;
  const newIncorrect = correct ? current.incorrect : current.incorrect + 1;
  const newStreak = correct ? current.streak + 1 : 0;
  const newBestStreak = Math.max(current.bestStreak, newStreak);
  const averageAccuracy =
    newAttempts > 0 ? (newCorrect / newAttempts) * 100 : 0;

  const updated: TopicProgress = {
    topicId,
    attempts: newAttempts,
    correct: newCorrect,
    incorrect: newIncorrect,
    streak: newStreak,
    bestStreak: newBestStreak,
    lastPracticed: new Date().toISOString(),
    averageAccuracy,
  };

  const allProgress = getAllProgress();
  allProgress[topicId] = updated;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  return updated;
};

export const savePracticeSession = (session: PracticeSession): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const stored = localStorage.getItem(SESSIONS_KEY);
    const sessions: PracticeSession[] = stored ? JSON.parse(stored) : [];
    sessions.push(session);

    // Keep only last 1000 sessions
    if (sessions.length > 1000) {
      sessions.shift();
    }

    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
};

export const getRecentSessions = (limit: number = 10): PracticeSession[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(SESSIONS_KEY);
    if (stored) {
      const sessions: PracticeSession[] = JSON.parse(stored);
      return sessions.slice(-limit).reverse();
    }
  } catch (error) {
    console.error('Failed to load sessions:', error);
  }

  return [];
};

export const resetProgress = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(SESSIONS_KEY);
  } catch (error) {
    console.error('Failed to reset progress:', error);
  }
};
