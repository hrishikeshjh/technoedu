export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  age?: number;
  educationLevel?: string;
  currentClassOrSemester?: string;
  institution?: string;
  country?: string;
  preferredLanguage?: string;
  isVerified?: boolean;
}

export interface UserLearningProfile {
  id: string;
  userId: string;
  primaryCourseId: string;
  activeCourseId: string;
  preparationLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Revision';
  targetYear: string;
  dailyStudyAvailability: string;
  learningPreferences: string[];
  selectedSubjects: string[];
  preferredLanguage: string;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  courseSlug: string;
  courseCategory: string;
  courseIcon?: string;
  enrollmentType: 'primary' | 'secondary';
  isPrimary: boolean;
  selectedSubjects: string[];
  status: 'active' | 'paused' | 'archived';
  enrolledAt: string;
}

export interface LearningResource {
  id: string;
  course_id: string;
  course_name?: string;
  course_slug?: string;
  subject_id?: string | null;
  subject_name?: string | null;
  topic_id?: string | null;
  topic_name?: string | null;
  title: string;
  description?: string;
  resource_type: 'pdf' | 'notes' | 'pyq' | 'mock' | 'roadmap' | 'video' | 'article';
  content?: string;
  file_url?: string | null;
  video_url?: string | null;
  difficulty: string;
  visibility: 'course_only' | 'all_courses';
  userProgress?: {
    status: 'not_started' | 'in_progress' | 'completed';
    progress: number;
    lastAccessedAt?: string;
  };
}

export interface DashboardData {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
  activeCourse: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    icon: string;
    difficulty_level: string;
  };
  learningProfile: UserLearningProfile;
  enrollments: CourseEnrollment[];
  subjects: {
    id: string;
    course_id: string;
    name: string;
    slug: string;
    description: string;
    display_order: number;
  }[];
  continueLearning: any | null;
  recommendations: LearningResource[];
  planner: {
    today: string;
    tasks: {
      id: string;
      title: string;
      scheduled_date: string;
      duration_minutes: number;
      is_completed: number;
    }[];
  };
  progressOverview: {
    totalTopics: number;
    topicsCompleted: number;
    topicsInProgress: number;
    studySessions: number;
    mockTestsAttempted: number;
    averageAccuracy: string | null;
    hasRealAttemptData: boolean;
  };
}

// ── API CLIENT HELPERS ────────────────────────────────────────────────────────
const API_BASE = '/api';

export function getAuthHeaders(token?: string | null): Record<string, string> {
  const authToken = token || localStorage.getItem('technoedu_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
}

export async function fetchDashboard(token?: string | null): Promise<DashboardData | { needsOnboarding: true }> {
  const res = await fetch(`${API_BASE}/dashboard`, {
    headers: getAuthHeaders(token),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch dashboard');
  }
  return res.json();
}

export async function switchActiveCourseApi(courseId: string, token?: string | null) {
  const res = await fetch(`${API_BASE}/learning-profile/switch-course`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ courseId }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to switch course');
  }
  return res.json();
}

export async function changePrimaryCourseApi(newPrimaryCourseId: string, token?: string | null) {
  const res = await fetch(`${API_BASE}/learning-profile/change-primary`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ newPrimaryCourseId }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to change primary course');
  }
  return res.json();
}

export async function enrollCourseApi(courseId: string, selectedSubjects: string[] = [], token?: string | null) {
  const res = await fetch(`${API_BASE}/learning-profile/enroll`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ courseId, selectedSubjects }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to enroll course');
  }
  return res.json();
}

export async function unenrollCourseApi(courseId: string, token?: string | null) {
  const res = await fetch(`${API_BASE}/learning-profile/unenroll`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ courseId }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to unenroll course');
  }
  return res.json();
}

export async function updateLearningPreferencesApi(data: Partial<UserLearningProfile>, token?: string | null) {
  const res = await fetch(`${API_BASE}/learning-profile`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update preferences');
  }
  return res.json();
}

export async function recordProgressApi(courseId: string, resourceId: string, status: string, progress: number, token?: string | null) {
  const res = await fetch(`${API_BASE}/progress`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ courseId, resourceId, status, progress }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to record progress');
  }
  return res.json();
}

export async function togglePlannerTaskApi(taskId: string, isCompleted: boolean, token?: string | null) {
  const res = await fetch(`${API_BASE}/planner/task`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ taskId, isCompleted }),
  });
  return res.json();
}
