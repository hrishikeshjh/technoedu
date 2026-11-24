import { COURSE_CONFIGS, CourseConfig } from './courseConfig';

export interface NavLinkItem {
  name: string;
  path: string;
  isExternal?: boolean;
  badge?: string;
  isAction?: boolean;
}

export function getCourseNavigation(activeCourseId?: string | null): NavLinkItem[] {
  if (!activeCourseId) {
    // Unauthenticated or default navigation
    return [
      { name: 'Home', path: '/' },
      { name: 'Exams', path: '/exams' },
      { name: 'Directory', path: '/directory' },
      { name: 'Library', path: '/library' },
      { name: 'Platforms', path: '/platforms' },
      { name: 'Blogs', path: '/blogs' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ];
  }

  const courseConfig = COURSE_CONFIGS[activeCourseId];
  if (courseConfig) {
    return courseConfig.navLinks;
  }

  // Fallback for any newly added custom course
  return [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Learning', path: '/my-learning' },
    { name: 'Syllabus', path: `/courses/${activeCourseId}/subjects` },
    { name: 'Study Materials', path: `/courses/${activeCourseId}/resources` },
    { name: 'PYQs', path: `/courses/${activeCourseId}/pyq` },
    { name: 'Mock Tests', path: `/courses/${activeCourseId}/mock-tests` },
    { name: 'Library', path: '/library' },
  ];
}
