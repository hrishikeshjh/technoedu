export interface AITutorSession {
  id: string;
  examId: string;
  topic: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: AISource[];
  confidence?: number;
}

export interface AISource {
  title: string;
  url: string;
  platform: string;
  type: 'textbook' | 'video' | 'paper' | 'notes' | 'official';
}

export interface SmartRevisionNote {
  id: string;
  examId: string;
  subject: string;
  topic: string;
  summary: string;
  keyPoints: string[];
  formulas?: string[];
  diagrams?: string[];
  estimatedReadTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: Date;
  tags: string[];
}

export interface RevisionSummary {
  examId: string;
  examName: string;
  totalTopics: number;
  completedTopics: number;
  notes: SmartRevisionNote[];
  weakAreas: string[];
  strongAreas: string[];
}

export interface QuestionIntelligence {
  id: string;
  examId: string;
  subject: string;
  topic: string;
  year: number;
  question: string;
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  frequency: number;
  concepts: string[];
  similarQuestions: string[];
  source: string;
  sourceUrl: string;
}

export interface TopicAnalysis {
  topic: string;
  subject?: string;
  totalQuestions: number;
  avgDifficulty: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  importantSubtopics: { name: string; frequency: number }[];
  recommendedFocus: 'high' | 'medium' | 'low';
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'true-false' | 'fill-blank' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  subject: string;
  examId: string;
  timeLimit?: number;
  points: number;
}

export interface AdaptiveQuiz {
  id: string;
  examId: string;
  subject: string;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  timeSpent: number;
  adaptations: QuizAdaptation[];
  status: 'in-progress' | 'completed' | 'paused';
  startedAt: Date;
  completedAt?: Date;
}

export interface QuizAdaptation {
  questionId: string;
  previousDifficulty: 'easy' | 'medium' | 'hard';
  newDifficulty: 'easy' | 'medium' | 'hard';
  reason: string;
  timestamp: Date;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: { questionId: string; answer: string; isCorrect: boolean; timeSpent: number }[];
  totalScore: number;
  maxScore: number;
  percentage: number;
  timeSpent: number;
  completedAt: Date;
  weakTopics: string[];
  strongTopics: string[];
}

export interface StudyRecommendation {
  id: string;
  type: 'topic' | 'resource' | 'practice' | 'revision';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  estimatedTime: number;
  examId: string;
  subject: string;
  topic: string;
  resourceUrl?: string;
  reason: string;
}

export interface PersonalisedPlan {
  id: string;
  userId: string;
  examId: string;
  examName: string;
  targetDate: Date;
  dailyHours: number;
  startDate: Date;
  phases: StudyPhase[];
  recommendations: StudyRecommendation[];
  progress: PlanProgress;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyPhase {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  topics: string[];
  milestones: PhaseMilestone[];
  status: 'upcoming' | 'active' | 'completed';
}

export interface PhaseMilestone {
  id: string;
  title: string;
  description?: string;
  targetDate: Date;
  completed: boolean;
  completedAt?: Date;
}

export interface PlanProgress {
  overallProgress: number;
  completedHours: number;
  totalPlannedHours: number;
  currentPhase: string;
  nextMilestone: PhaseMilestone | null;
  streakDays: number;
  lastStudyDate: Date | null;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isSupported: boolean;
  translationQuality: 'high' | 'medium' | 'basic';
}

export interface MultilingualContent {
  originalText: string;
  translations: Record<string, string>;
  language: string;
  topic: string;
  examId: string;
}

export interface FacultyResource {
  id: string;
  title: string;
  description: string;
  author: string;
  authorTitle: string;
  institution: string;
  examId: string;
  subject: string;
  topic: string;
  type: 'notes' | 'video' | 'pdf' | 'link' | 'assignment';
  url: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: Date;
  rating: number;
  downloadCount: number;
  tags: string[];
  uploadedAt: Date;
}

export interface CurationStatus {
  totalResources: number;
  verifiedResources: number;
  pendingResources: number;
  rejectedResources: number;
  verifiedPercentage: number;
  topContributors: { name: string; institution: string; resources: number }[];
}

export interface StudentProgress {
  userId: string;
  examId: string;
  examName: string;
  overallScore: number;
  subjectScores: { subject: string; score: number; trend: 'up' | 'down' | 'stable' }[];
  topicMastery: { topic: string; mastery: number; lastPracticed: Date }[];
  studyTime: { date: Date; hours: number }[];
  quizHistory: QuizAttempt[];
  weakAreas: string[];
  strongAreas: string[];
  predictedScore: number;
  readinessLevel: 'not-ready' | 'needs-work' | 'ready' | 'well-prepared';
}

export interface AnalyticsDashboard {
  userId: string;
  overview: AnalyticsOverview;
  subjectBreakdown: SubjectAnalytics[];
  topicHeatmap: TopicHeatmap[];
  studyPattern: StudyPattern[];
  comparativeAnalytics: ComparativeAnalytics;
  predictions: PredictiveAnalytics;
}

export interface AnalyticsOverview {
  totalStudyHours: number;
  totalQuizzesTaken: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  topicsMastered: number;
  topicsRemaining: number;
  readinessTrend: 'improving' | 'stable' | 'declining';
}

export interface SubjectAnalytics {
  subject: string;
  totalHours: number;
  quizzesTaken: number;
  averageScore: number;
  masteryLevel: number;
  trend: 'up' | 'down' | 'stable';
  weakTopics: string[];
  strongTopics: string[];
}

export interface TopicHeatmap {
  topic: string;
  subject: string;
  mastery: number;
  questionsAttempted: number;
  accuracy: number;
  lastReviewed: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface StudyPattern {
  dayOfWeek: number;
  hourOfDay: number;
  averageHours: number;
  consistencyScore: number;
}

export interface ComparativeAnalytics {
  percentile: number;
  cohortSize: number;
  averagePeerScore: number;
  topPerformerScore: number;
  improvementRate: number;
}

export interface PredictiveAnalytics {
  projectedScore: number;
  projectedDate: Date;
  confidenceInterval: [number, number];
  recommendedFocus: string[];
  riskFactors: string[];
}

export interface AcademicHierarchyNode {
  id: string;
  name: string;
  type: 'university' | 'school' | 'programme' | 'semester' | 'subject' | 'topic' | 'resource';
  parentId?: string;
  children?: AcademicHierarchyNode[];
  metadata?: {
    code?: string;
    description?: string;
    examIds?: string[];
    resourceCount?: number;
    duration?: string;
    credits?: number;
  };
}

export interface AcademicHierarchy {
  id: string;
  name: string;
  rootNodes: AcademicHierarchyNode[];
  totalNodes: number;
  maxDepth: number;
}