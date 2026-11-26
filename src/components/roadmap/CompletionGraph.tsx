import React from 'react';
import { BarChart3, CheckCircle2, Flame, Lock, Trophy } from 'lucide-react';
import { RoadmapLevel } from '../../data/roadmapData';

export interface TopicMetric {
  topic: string;
  totalLevels: number;
  completedLevels: number;
  totalVideos: number;
  watchedVideos: number;
  percent: number;
  isUnlocked: boolean;
}

interface CompletionGraphProps {
  levels: RoadmapLevel[];
  topics: string[];
  completedLevelIds: Set<string>;
  watchedVideoIds: Set<string>;
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export const CompletionGraph: React.FC<CompletionGraphProps> = ({
  levels,
  topics,
  completedLevelIds,
  watchedVideoIds,
  selectedTopic,
  onSelectTopic,
}) => {
  const totalLevels = levels.length;
  const completedCount = levels.filter((l) => completedLevelIds.has(l.id)).length;
  const overallPercent = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;

  const totalVideos = levels.reduce((acc, l) => acc + l.videos.length, 0);
  const watchedVideosCount = levels.reduce(
    (acc, l) => acc + l.videos.filter((v) => watchedVideoIds.has(v.id)).length,
    0
  );

  const earnedXp = levels.reduce(
    (acc, l) => (completedLevelIds.has(l.id) ? acc + l.xpReward : acc),
    0
  );
  const totalXp = levels.reduce((acc, l) => acc + l.xpReward, 0);

  // Segregated metrics per topic
  const topicMetrics: TopicMetric[] = topics.map((topic) => {
    const topicLevels = levels.filter((l) => l.topic === topic);
    const topicCompleted = topicLevels.filter((l) => completedLevelIds.has(l.id)).length;
    const tTotalVideos = topicLevels.reduce((acc, l) => acc + l.videos.length, 0);
    const tWatchedVideos = topicLevels.reduce(
      (acc, l) => acc + l.videos.filter((v) => watchedVideoIds.has(v.id)).length,
      0
    );

    // Total progress combines videos watched (50%) + level checkpoint completed (50%)
    const videoRatio = tTotalVideos > 0 ? tWatchedVideos / tTotalVideos : 0;
    const levelRatio = topicLevels.length > 0 ? topicCompleted / topicLevels.length : 0;
    const percent = Math.round((videoRatio * 0.5 + levelRatio * 0.5) * 100);

    // Check if at least one level in this topic is unlocked
    const isUnlocked = topicLevels.some((lvl) => {
      const idx = levels.findIndex((l) => l.id === lvl.id);
      return idx === 0 || completedLevelIds.has(levels[idx - 1].id);
    });

    return {
      topic,
      totalLevels: topicLevels.length,
      completedLevels: topicCompleted,
      totalVideos: tTotalVideos,
      watchedVideos: tWatchedVideos,
      percent,
      isUnlocked,
    };
  });

  // SVG Ring math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (overallPercent / 100) * circumference;

  return (
    <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Left: Overall Coursera-style Progress Ring & Stats */}
        <div className="flex items-center gap-5 lg:pr-6 lg:border-r border-slate-100 dark:border-[#252932] shrink-0">
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 92 92" aria-hidden="true">
              <circle
                cx="46"
                cy="46"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-100 dark:text-[#1E222B]"
              />
              <circle
                cx="46"
                cy="46"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="text-brand-red transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                {overallPercent}%
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-[#7F8795]">
                Ladder
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
              <BarChart3 className="w-4 h-4 text-brand-red" />
              <span>Topic Completion Graph</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-[#A7AFBD]">
              <strong>{completedCount}</strong> / {totalLevels} levels climbed
            </div>
            <div className="text-xs text-slate-600 dark:text-[#A7AFBD]">
              <strong>{watchedVideosCount}</strong> / {totalVideos} short lectures watched
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 pt-0.5">
              {overallPercent === 100 ? (
                <Trophy className="w-3.5 h-3.5" />
              ) : (
                <Flame className="w-3.5 h-3.5" />
              )}
              <span>
                {earnedXp} / {totalXp} Mastery XP
              </span>
            </div>
          </div>
        </div>

        {/* Right: Segregated Per-Topic Completion Bars (Clickable to filter) */}
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#7F8795]">
              Segregated by Topic (Click to Filter Ladder)
            </span>
            {selectedTopic !== 'All' && (
              <button
                type="button"
                onClick={() => onSelectTopic('All')}
                className="text-[11px] font-bold text-brand-red hover:underline"
              >
                Show All Topics
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {topicMetrics.map((m) => {
              const isSelected = selectedTopic === m.topic;
              const isDone = m.completedLevels === m.totalLevels && m.totalLevels > 0;
              return (
                <button
                  key={m.topic}
                  type="button"
                  onClick={() => onSelectTopic(isSelected ? 'All' : m.topic)}
                  className={`text-left p-3 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-red bg-red-50/60 dark:bg-brand-red/10 shadow-xs'
                      : 'border-slate-200/80 dark:border-[#252932] bg-slate-50/60 dark:bg-[#15171C] hover:border-brand-red/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] truncate">
                      {m.topic}
                    </span>
                    <span className="shrink-0 flex items-center gap-1 text-[11px] font-extrabold">
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : !m.isUnlocked ? (
                        <Lock className="w-3 h-3 text-slate-400" />
                      ) : null}
                      <span
                        className={
                          isDone
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-700 dark:text-slate-300'
                        }
                      >
                        {m.percent}%
                      </span>
                    </span>
                  </div>

                  {/* Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-[#252932] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        isDone ? 'bg-emerald-500' : 'bg-brand-red'
                      }`}
                      style={{ width: `${m.percent}%` }}
                    />
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-[#7F8795]">
                    <span>
                      {m.watchedVideos}/{m.totalVideos} lectures
                    </span>
                    <span>
                      {m.completedLevels}/{m.totalLevels} level
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
