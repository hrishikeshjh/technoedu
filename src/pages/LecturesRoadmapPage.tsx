import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  ChevronRight,
  HelpCircle,
  ShieldAlert,
  Video,
  Layers,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getExamRoadmap, RoadmapLevel, RoadmapVideo } from '../data/roadmapData';
import { CompletionGraph } from '../components/roadmap/CompletionGraph';
import { Breadcrumb } from '../components/common/Breadcrumb';

type StudioTab = 'summary' | 'basic' | 'advanced' | 'quiz';

const VIDEO_PREFIX = 'roadmap:vid:';
const LEVEL_PREFIX = 'roadmap:lvl:';

export const LecturesRoadmapPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { user, token, activeCourseId, enrollments, isAuthenticated } = useAuth();

  const effectiveCourseId = slug || activeCourseId || 'ugc-net';
  const isEnrolled = enrollments.some((e) => e.courseId === effectiveCourseId);

  // Strict exam isolation: block access to unenrolled course roadmaps
  if (isAuthenticated && activeCourseId && slug && slug !== activeCourseId && !isEnrolled) {
    return <Navigate to={`/courses/${activeCourseId}/lectures`} replace />;
  }

  const roadmap = useMemo(() => getExamRoadmap(effectiveCourseId), [effectiveCourseId]);
  const storageKey = `technoedu_roadmap_${user?.id || 'guest'}_${roadmap.courseId}`;

  const [watchedVideoIds, setWatchedVideoIds] = useState<Set<string>>(new Set());
  const [completedLevelIds, setCompletedLevelIds] = useState<Set<string>>(new Set());
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [activeLevelId, setActiveLevelId] = useState<string>(roadmap.levels[0]?.id || '');
  const [activeVideoId, setActiveVideoId] = useState<string>(roadmap.levels[0]?.videos[0]?.id || '');
  const [activeTab, setActiveTab] = useState<StudioTab>('summary');
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  // Quiz state for the currently active level
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizFeedback, setQuizFeedback] = useState<{ passed: boolean; score: number; total: number } | null>(null);

  // Reset active level when switching course
  useEffect(() => {
    if (roadmap.levels[0]) {
      setActiveLevelId(roadmap.levels[0].id);
      setActiveVideoId(roadmap.levels[0].videos[0]?.id || '');
      setSelectedTopic('All');
      setActiveTab('summary');
      setQuizAnswers({});
      setQuizFeedback(null);
    }
  }, [roadmap]);

  // Load persisted progress from SQLite (/api/progress) + localStorage fallback
  useEffect(() => {
    let cancelled = false;
    const loadProgress = async () => {
      setIsLoadingProgress(true);
      const nextVideos = new Set<string>();
      const nextLevels = new Set<string>();

      try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          (parsed.videos || []).forEach((id: string) => nextVideos.add(id));
          (parsed.levels || []).forEach((id: string) => nextLevels.add(id));
        }
      } catch {
        // Ignore storage errors
      }

      if (token) {
        try {
          const res = await fetch(`/api/progress?courseId=${encodeURIComponent(roadmap.courseId)}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            for (const row of data.progress || []) {
              if (row.status === 'completed' && typeof row.resource_id === 'string') {
                if (row.resource_id.startsWith(VIDEO_PREFIX)) {
                  nextVideos.add(row.resource_id.slice(VIDEO_PREFIX.length));
                } else if (row.resource_id.startsWith(LEVEL_PREFIX)) {
                  nextLevels.add(row.resource_id.slice(LEVEL_PREFIX.length));
                }
              }
            }
          }
        } catch {
          // Offline fallback already loaded
        }
      }

      if (!cancelled) {
        setWatchedVideoIds(nextVideos);
        setCompletedLevelIds(nextLevels);

        // Jump to the highest unlocked incomplete level automatically
        const firstIncomplete = roadmap.levels.find((lvl) => !nextLevels.has(lvl.id));
        const targetLvl = firstIncomplete || roadmap.levels[roadmap.levels.length - 1];
        if (targetLvl) {
          setActiveLevelId(targetLvl.id);
          const nextUnwatched = targetLvl.videos.find((v) => !nextVideos.has(v.id)) || targetLvl.videos[0];
          if (nextUnwatched) setActiveVideoId(nextUnwatched.id);
        }
        setIsLoadingProgress(false);
      }
    };

    loadProgress();
    return () => {
      cancelled = true;
    };
  }, [roadmap, token, storageKey]);

  const persistProgress = async (videosSet: Set<string>, levelsSet: Set<string>, resourceId: string) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          videos: Array.from(videosSet),
          levels: Array.from(levelsSet),
        })
      );
    } catch {
      // Ignore
    }

    if (token) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: roadmap.courseId,
            resourceId,
            status: 'completed',
            progress: 100,
          }),
        });
      } catch {
        // Local cache still preserves state
      }
    }
  };

  const isLevelUnlocked = (levelIdx: number): boolean => {
    if (levelIdx === 0) return true;
    const prevLevel = roadmap.levels[levelIdx - 1];
    return prevLevel ? completedLevelIds.has(prevLevel.id) : false;
  };

  const visibleLevels = useMemo(() => {
    if (selectedTopic === 'All') return roadmap.levels;
    return roadmap.levels.filter((l) => l.topic === selectedTopic);
  }, [roadmap.levels, selectedTopic]);

  // Keep activeLevel synced if topic filter narrows visibleLevels
  useEffect(() => {
    if (visibleLevels.length > 0 && !visibleLevels.some((l) => l.id === activeLevelId)) {
      const firstUnlocked = visibleLevels.find((l) => {
        const globalIdx = roadmap.levels.findIndex((gl) => gl.id === l.id);
        return isLevelUnlocked(globalIdx);
      });
      const target = firstUnlocked || visibleLevels[0];
      setActiveLevelId(target.id);
      if (target.videos[0]) setActiveVideoId(target.videos[0].id);
      setActiveTab('summary');
    }
  }, [visibleLevels, activeLevelId, roadmap.levels]);

  const activeLevelIndex = roadmap.levels.findIndex((l) => l.id === activeLevelId);
  const activeLevel: RoadmapLevel = roadmap.levels[activeLevelIndex] || roadmap.levels[0];
  const activeLevelUnlocked = isLevelUnlocked(activeLevelIndex >= 0 ? activeLevelIndex : 0);
  const activeLevelCompleted = completedLevelIds.has(activeLevel.id);

  const activeVideo: RoadmapVideo =
    activeLevel.videos.find((v) => v.id === activeVideoId) || activeLevel.videos[0];

  const levelVideosWatchedCount = activeLevel.videos.filter((v) => watchedVideoIds.has(v.id)).length;
  const allLevelVideosWatched = levelVideosWatchedCount === activeLevel.videos.length;

  // Advanced Notes are strictly locked until the level itself is completed
  const areAdvancedNotesUnlocked = activeLevelCompleted;

  const handleSelectLevel = (lvl: RoadmapLevel) => {
    const idx = roadmap.levels.findIndex((l) => l.id === lvl.id);
    if (!isLevelUnlocked(idx)) {
      const prev = roadmap.levels[idx - 1];
      setLockedNotice(
        `Level ${lvl.levelNumber} ("${lvl.title}") is locked. Complete Level ${prev?.levelNumber} first to climb the ladder.`
      );
      setTimeout(() => setLockedNotice(null), 4000);
      return;
    }
    setLockedNotice(null);
    setActiveLevelId(lvl.id);
    const nextUnwatched = lvl.videos.find((v) => !watchedVideoIds.has(v.id)) || lvl.videos[0];
    if (nextUnwatched) setActiveVideoId(nextUnwatched.id);
    setActiveTab('summary');
    setQuizAnswers({});
    setQuizFeedback(null);
  };

  const handleMarkVideoWatched = async (videoId: string) => {
    if (!activeLevelUnlocked) return;
    const nextVideos = new Set(watchedVideoIds);
    nextVideos.add(videoId);
    setWatchedVideoIds(nextVideos);
    await persistProgress(nextVideos, completedLevelIds, `${VIDEO_PREFIX}${videoId}`);

    // Auto-advance to next unwatched video in level, or open checkpoint quiz
    const nextUnwatched = activeLevel.videos.find((v) => !nextVideos.has(v.id));
    if (nextUnwatched) {
      setActiveVideoId(nextUnwatched.id);
    } else if (!activeLevelCompleted) {
      setActiveTab('quiz');
    }
  };

  const allQuizQuestionsAnswered = activeLevel.quiz.every(
    (q) => quizAnswers[q.id] !== undefined
  );

  const handleSubmitCheckpoint = async () => {
    if (!allQuizQuestionsAnswered) return;
    const total = activeLevel.quiz.length;
    let score = 0;
    for (const q of activeLevel.quiz) {
      if (quizAnswers[q.id] === q.correctIndex) score++;
    }
    const passed = score === total;
    setQuizFeedback({ passed, score, total });

    if (passed) {
      if (!allLevelVideosWatched) {
        return;
      }
      const nextLevels = new Set(completedLevelIds);
      nextLevels.add(activeLevel.id);
      setCompletedLevelIds(nextLevels);
      await persistProgress(watchedVideoIds, nextLevels, `${LEVEL_PREFIX}${activeLevel.id}`);

      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#dc2626', '#10b981', '#fbbf24', '#ffffff'],
        });
      } catch {
        // Ignore
      }
    }
  };

  const handleClimbNextLevel = () => {
    const nextLvl = roadmap.levels[activeLevelIndex + 1];
    if (nextLvl && isLevelUnlocked(activeLevelIndex + 1)) {
      if (selectedTopic !== 'All' && nextLvl.topic !== selectedTopic) {
        setSelectedTopic('All');
      }
      handleSelectLevel(nextLvl);
    }
  };

  if (isLoadingProgress) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-white dark:bg-[#08090B]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
        <p className="text-xs font-medium text-slate-500 dark:text-[#A7AFBD]">
          Loading your interactive lecture ladder...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumb
          items={[
            { label: 'Dashboard', path: '/dashboard' },
            { label: `${roadmap.shortCode} Lecture Ladder` },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#252932] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-brand-red text-white">
                {roadmap.shortCode}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-[#A7AFBD] inline-flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-brand-red" />
                Curated Short English Lectures
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
              Interactive Learning Ladder &amp; Video Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1 max-w-2xl">
              {roadmap.tagline}. Complete each rung’s short lectures and checkpoint to unlock Advanced Notes and climb to the next level.
            </p>
          </div>
        </div>

        {/* Separate Segregated Topic Completion Graph */}
        <CompletionGraph
          levels={roadmap.levels}
          topics={roadmap.topics}
          completedLevelIds={completedLevelIds}
          watchedVideoIds={watchedVideoIds}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />

        {/* Lock warning banner */}
        {lockedNotice && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center gap-3 text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-300 animate-input-shake">
            <Lock className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{lockedNotice}</span>
          </div>
        )}

        {/* Main Coursera-Style Split Workspace: Left Ladder + Right Video Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Interactive Step-by-Step Ladder (4 cols) */}
          <aside className="lg:col-span-4 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-[#252932]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-red" />
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                  Step-by-Step Ladder
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-[#7F8795]">
                {visibleLevels.length} {visibleLevels.length === 1 ? 'Level' : 'Levels'}
              </span>
            </div>

            <div className="relative space-y-3">
              {visibleLevels.map((lvl, idx) => {
                const globalIdx = roadmap.levels.findIndex((g) => g.id === lvl.id);
                const unlocked = isLevelUnlocked(globalIdx);
                const completed = completedLevelIds.has(lvl.id);
                const isSelected = activeLevel.id === lvl.id;
                const watchedInLvl = lvl.videos.filter((v) => watchedVideoIds.has(v.id)).length;
                const isLastVisible = idx === visibleLevels.length - 1;

                return (
                  <div key={lvl.id} className="relative">
                    {/* Vertical Ladder Connector */}
                    {!isLastVisible && (
                      <div
                        className={`absolute left-[23px] top-12 -bottom-3 w-0.5 z-0 transition-colors ${
                          completed
                            ? 'bg-emerald-500'
                            : unlocked
                            ? 'bg-brand-red/40'
                            : 'bg-slate-200 dark:bg-[#252932]'
                        }`}
                        aria-hidden="true"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => handleSelectLevel(lvl)}
                      className={`relative z-10 w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 ${
                        !unlocked
                          ? 'border-slate-200/70 dark:border-[#1E222A] bg-slate-50/70 dark:bg-[#0D0F14] opacity-70 cursor-not-allowed'
                          : isSelected
                          ? 'border-brand-red bg-red-50/50 dark:bg-brand-red/10 shadow-xs'
                          : 'border-slate-200/80 dark:border-[#252932] bg-white dark:bg-[#15171C] hover:border-brand-red/40 hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Rung Node */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 transition-all ${
                          completed
                            ? 'bg-emerald-500 text-white'
                            : unlocked
                            ? isSelected
                              ? 'bg-brand-red text-white ring-4 ring-brand-red/20'
                              : 'bg-brand-red/15 text-brand-red'
                            : 'bg-slate-200 dark:bg-[#252932] text-slate-500 dark:text-[#7F8795]'
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : unlocked ? (
                          lvl.levelNumber
                        ) : (
                          <Lock className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red">
                            Level {lvl.levelNumber} · {lvl.difficulty}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 dark:text-[#7F8795]">
                            +{lvl.xpReward} XP
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mt-0.5 leading-snug">
                          {lvl.title}
                        </h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-[#A7AFBD]">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1E222B] text-[10px] font-semibold truncate max-w-[165px]">
                            {lvl.topic}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <PlayCircle className="w-3 h-3" />
                            {watchedInLvl}/{lvl.videos.length}
                          </span>
                        </div>

                        {!unlocked && (
                          <p className="mt-1.5 text-[10px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            Complete Level {lvl.levelNumber - 1} to unlock
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* RIGHT: Coursera-Style Lecture Studio (8 cols) */}
          <section className="lg:col-span-8 space-y-5">
            {/* Video Player + Level Playlist Card */}
            <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl overflow-hidden shadow-sm">
              {/* Top Video Player */}
              <div className="relative aspect-video w-full bg-slate-950">
                <iframe
                  key={activeVideo.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Active Video Metadata & Mark Watched Bar */}
              <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-[#252932] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-[#A7AFBD] mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-red-50 dark:bg-brand-red/15 text-brand-red font-bold">
                      Level {activeLevel.levelNumber}: {activeLevel.topic}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activeVideo.duration}
                    </span>
                    <span>• {activeVideo.channel}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-[#F8FAFC] leading-snug">
                    {activeVideo.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-[#A7AFBD] mt-1">
                    {activeVideo.keyTakeaway}
                  </p>
                </div>

                <div className="shrink-0">
                  {watchedVideoIds.has(activeVideo.id) ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Lecture Watched
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMarkVideoWatched(activeVideo.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold shadow-red-glow hover:-translate-y-0.5 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Lecture Watched</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Short Video Playlist for this Level */}
              <div className="p-4 sm:p-5 bg-slate-50/70 dark:bg-[#0E1015]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Level {activeLevel.levelNumber} Short Lectures ({levelVideosWatchedCount}/{activeLevel.videos.length} completed)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-[#7F8795]">
                    English · ~{activeLevel.estimatedMinutes} min total
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {activeLevel.videos.map((vid, vIdx) => {
                    const isCurrent = vid.id === activeVideo.id;
                    const isWatched = watchedVideoIds.has(vid.id);
                    return (
                      <button
                        key={vid.id}
                        type="button"
                        onClick={() => setActiveVideoId(vid.id)}
                        className={`text-left p-3 rounded-2xl border transition-all flex items-start gap-2.5 ${
                          isCurrent
                            ? 'border-brand-red bg-white dark:bg-[#15171C] shadow-xs'
                            : 'border-slate-200/80 dark:border-[#252932] bg-white/70 dark:bg-[#111318] hover:border-brand-red/40'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${
                            isWatched
                              ? 'bg-emerald-500 text-white'
                              : isCurrent
                              ? 'bg-brand-red text-white'
                              : 'bg-slate-100 dark:bg-[#1E222B] text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {isWatched ? <CheckCircle2 className="w-3.5 h-3.5" /> : vIdx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] line-clamp-2 leading-snug">
                            {vid.title}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500 dark:text-[#7F8795]">
                            <span>{vid.duration}</span>
                            <span>•</span>
                            <span className="truncate">{vid.channel}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tabbed Study Workspace: Summary | Basic Notes | Advanced Notes (Locked!) | Checkpoint Quiz */}
            <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl overflow-hidden shadow-sm">
              {/* Tabs */}
              <div className="flex flex-wrap border-b border-slate-200 dark:border-[#252932] px-4 sm:px-6 pt-3 gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('summary')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'summary'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-slate-500 dark:text-[#A7AFBD] hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('basic')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'basic'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-slate-500 dark:text-[#A7AFBD] hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Basic Notes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('advanced')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'advanced'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-slate-500 dark:text-[#A7AFBD] hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {areAdvancedNotesUnlocked ? (
                    <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  <span>Advanced Notes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('quiz')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'quiz'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-slate-500 dark:text-[#A7AFBD] hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Level Checkpoint ({activeLevel.quiz.length} Qs)</span>
                  {activeLevelCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-5 sm:p-7">
                {activeTab === 'summary' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                        Level {activeLevel.levelNumber}: {activeLevel.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] mt-1 leading-relaxed">
                        {activeLevel.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200/80 dark:border-[#252932]">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Step 1 · Watch Short Lectures
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mt-1">
                          {levelVideosWatchedCount} of {activeLevel.videos.length} watched
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200/80 dark:border-[#252932]">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Step 2 · Pass Checkpoint
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mt-1">
                          {activeLevelCompleted
                            ? 'Completed — Advanced Notes & Next Level Unlocked'
                            : 'Pass 2-question check to unlock Advanced Notes'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'basic' && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                      {activeLevel.basicNotes.summary}
                    </p>
                    <ul className="space-y-2.5">
                      {activeLevel.basicNotes.keyPoints.map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200/70 dark:border-[#252932] text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                        >
                          <span className="w-5 h-5 rounded-full bg-red-50 dark:bg-brand-red/15 text-brand-red text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'advanced' && (
                  <>
                    {!areAdvancedNotesUnlocked ? (
                      <div className="py-8 px-4 text-center max-w-md mx-auto space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                          <Lock className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                            Advanced Notes Locked
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1 leading-relaxed">
                            Complete Level {activeLevel.levelNumber} to unlock high-yield Advanced Notes, elimination matrices, and PYQ traps.
                          </p>
                        </div>

                        <div className="text-left p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            {allLevelVideosWatched ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                            )}
                            <span className={allLevelVideosWatched ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''}>
                              Watch all {activeLevel.videos.length} short lectures ({levelVideosWatchedCount}/{activeLevel.videos.length})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {activeLevelCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                            )}
                            <span>Pass Level {activeLevel.levelNumber} Checkpoint Quiz</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveTab('quiz')}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold shadow-red-glow transition-all"
                        >
                          <span>Go to Level Checkpoint</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                            {activeLevel.advancedNotes.title}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold">
                            <Unlock className="w-3 h-3" />
                            Unlocked
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 p-3.5 rounded-2xl bg-red-50/50 dark:bg-brand-red/10 border border-brand-red/20">
                          {activeLevel.advancedNotes.strategy}
                        </p>

                        <ul className="space-y-2.5">
                          {activeLevel.advancedNotes.highYieldInsights.map((insight, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200/80 dark:border-[#252932] text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                            >
                              <Award className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
                          <strong>PYQ Exam Tip:</strong> {activeLevel.advancedNotes.pyqTip}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'quiz' && (
                  <div className="space-y-5">
                    {!allLevelVideosWatched && (
                      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                        <Lock className="w-4 h-4 shrink-0" />
                        <span>
                          Mark all {activeLevel.videos.length} lectures watched in this level before completing the checkpoint ({levelVideosWatchedCount}/{activeLevel.videos.length} done).
                        </span>
                      </div>
                    )}

                    {activeLevel.quiz.map((q, qIdx) => (
                      <div
                        key={q.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200/80 dark:border-[#252932] space-y-3"
                      >
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                          Q{qIdx + 1}. {q.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oIdx) => {
                            const selected = quizAnswers[q.id] === oIdx;
                            const isCorrectOption = quizFeedback && oIdx === q.correctIndex;
                            const isWrongSelected = quizFeedback && selected && oIdx !== q.correctIndex;
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => {
                                  setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                                  if (quizFeedback) setQuizFeedback(null);
                                }}
                                className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                                  isCorrectOption
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-bold'
                                    : isWrongSelected
                                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-bold'
                                    : selected
                                    ? 'border-brand-red bg-red-50/80 dark:bg-brand-red/15 text-brand-red font-bold'
                                    : 'border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] text-slate-700 dark:text-slate-300 hover:border-brand-red/40'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {quizFeedback && (
                          <p
                            className={`text-xs pt-1 ${
                              quizAnswers[q.id] === q.correctIndex
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}

                    {quizFeedback && (
                      <div
                        className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          quizFeedback.passed && allLevelVideosWatched
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300'
                            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300'
                        }`}
                      >
                        <span>
                          {quizFeedback.passed
                            ? allLevelVideosWatched
                              ? `Level ${activeLevel.levelNumber} Completed (${quizFeedback.score}/${quizFeedback.total})! Advanced Notes & next level unlocked.`
                              : `You scored ${quizFeedback.score}/${quizFeedback.total}! Now mark all lectures in this level as watched to unlock the next level.`
                            : `Score: ${quizFeedback.score}/${quizFeedback.total}. Review the explanations and try again to unlock the next rung.`}
                        </span>

                        {activeLevelCompleted && activeLevelIndex + 1 < roadmap.levels.length && (
                          <button
                            type="button"
                            onClick={handleClimbNextLevel}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0"
                          >
                            <span>Climb to Level {activeLevel.levelNumber + 1}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleSubmitCheckpoint}
                        disabled={!allQuizQuestionsAnswered}
                        className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-red-glow transition-all"
                      >
                        {allQuizQuestionsAnswered
                          ? 'Verify & Unlock Next Level'
                          : `Answer All ${activeLevel.quiz.length} Questions to Verify`}
                      </button>

                      {activeLevelCompleted && (
                        <button
                          type="button"
                          onClick={() => setActiveTab('advanced')}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Open Unlocked Advanced Notes</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
