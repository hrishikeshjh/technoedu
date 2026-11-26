import { COURSE_CONFIGS } from './courseConfig';

export interface NavLinkItem {
  name: string;
  path: string;
  isExternal?: boolean;
  badge?: string;
  isAction?: boolean;
}

export function getCourseNavigation(activeCourseId?: string | null, isAuthenticated = false): NavLinkItem[] {
  if (!isAuthenticated) {
    // Minimal public navigation: no course categories, library, exams, or blogs
    return [
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ];
  }

  if (activeCourseId) {
    const courseConfig = COURSE_CONFIGS[activeCourseId];
    if (courseConfig) {
      // Ensure Blogs and Study Planner are accessible alongside course-specific links
      const links = [...courseConfig.navLinks];
      if (!links.some((l) => l.path === '/library')) {
        links.push({ name: 'Library', path: '/library' });
      }
      if (!links.some((l) => l.path === '/blogs')) {
        links.push({ name: 'Blogs', path: '/blogs' });
      }
      return links;
    }
  }

  // Authenticated fallback when no specific course config matches
  return [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Lectures & Ladder', path: '/lectures' },
    { name: 'My Learning', path: '/my-learning' },
    { name: 'Study Materials', path: activeCourseId ? `/courses/${activeCourseId}/resources` : '/courses' },
    { name: 'Library', path: '/library' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Profile', path: '/profile' },
  ];
}
