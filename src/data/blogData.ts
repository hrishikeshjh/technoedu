import { useState, useEffect } from 'react';
import { BlogPost, BlogAuthor, BlogSegmentMeta, SubjectItem, ContributorRoleItem } from '../types/blog';

export const R2_BLOG_CDN_URL = (import.meta.env.VITE_R2_BLOGS_BASE_URL || 'https://pub-3f62a1750c20425f95e67ab76e9d98ea.r2.dev').replace(/\/+$/, '');

/**
 * Returns CDN URL for blog assets uploaded to Cloudflare R2
 */
export const getR2BlogAssetUrl = (assetPath: string): string => {
  if (!assetPath) return '';
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return assetPath;
  }
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `${R2_BLOG_CDN_URL}/${cleanPath}`;
};

export const blogSegments: BlogSegmentMeta[] = [
  {
    id: 'students',
    label: 'For Students',
    shortDescription: 'Guides, strategies, project workflows, and career insights crafted specifically for students.',
    longDescription: 'Content written specifically to help students learn, build, explore careers, prepare for exams, work on real-world projects, and navigate college life.',
    categories: [
      'Study Strategies',
      'Exam Preparation',
      'Projects',
      'Programming',
      'AI & ML',
      'Robotics',
      'Web Development',
      'Research',
      'Hackathons',
      'Career & Internships',
      'College Life',
      'Productivity',
      'Scholarships',
      'Higher Studies',
      'Open Source',
    ],
    iconName: 'GraduationCap',
  },
  {
    id: 'subjects',
    label: 'Subjects & Core Interests',
    shortDescription: 'Deep dives and structured knowledge organized around what you want to learn.',
    longDescription: 'Structured knowledge base organized around core disciplines — from computer systems to mathematics, artificial intelligence, and physical sciences.',
    categories: [
      'Computer Science',
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Mathematics',
      'Physics',
      'Electronics',
      'Robotics',
      'Cybersecurity',
      'Web Development',
      'Software Engineering',
      'Networks',
      'Databases',
      'Operating Systems',
      'Entrepreneurship',
      'Design',
      'Sustainability',
      'Emerging Technology',
    ],
    iconName: 'BookOpen',
  },
  {
    id: 'mentors',
    label: 'Lifelong Mentors',
    shortDescription: 'Timeless principles from educators and researchers with decades of experience.',
    longDescription: 'Accumulated wisdom from years of university teaching, laboratory research, and leadership that remains useful beyond any single semester or exam.',
    categories: [
      'Teaching',
      'Research',
      'Career Lessons',
      'Leadership',
      'Life & Learning',
      'Professional Experience',
      'Mentorship',
      'Lessons From Failure',
      'Building Things',
      'Academia',
      'Industry Experience',
    ],
    iconName: 'Compass',
  },
  {
    id: 'professionals',
    label: 'Educationists & Professionals',
    shortDescription: 'Insights from engineers, founders, and scientists who bridge industry and education.',
    longDescription: 'Knowledge from people who operate at intersections — engineers who teach, founders who mentor, and practitioners bringing modern industry reality to academic curricula.',
    categories: [
      'Industry → Education',
      'Education → Industry',
      'Cross-disciplinary Work',
      'Professional Skills',
      'Technology',
      'Entrepreneurship',
      'Research',
      'Innovation',
      'Career Experience',
      'Building in Public',
      'Teaching From Experience',
    ],
    iconName: 'Briefcase',
  },
];

export const blogSubjects: SubjectItem[] = [
  { id: 'ai-ml', name: 'AI & Machine Learning', description: 'Deep learning, neural networks, transformers, and model evaluation.' },
  { id: 'cs', name: 'Computer Science', description: 'Core data structures, algorithms, computability, and discrete systems.' },
  { id: 'robotics', name: 'Robotics & Control', description: 'Kinematics, embedded microcontrollers, ROS, and sensor fusion.' },
  { id: 'math', name: 'Mathematics', description: 'Linear algebra, calculus, discrete math, and numerical analysis.' },
  { id: 'electronics', name: 'Electronics & Circuits', description: 'Semiconductors, VLSI design, signal processing, and IoT.' },
  { id: 'web-dev', name: 'Web Development', description: 'Modern web architecture, frontend engines, and distributed APIs.' },
  { id: 'software-eng', name: 'Software Engineering', description: 'Design patterns, CI/CD pipelines, refactoring, and test suites.' },
  { id: 'cybersecurity', name: 'Cybersecurity', description: 'Cryptography, network defense, threat modeling, and protocol auditing.' },
  { id: 'data-science', name: 'Data Science', description: 'Exploratory data analysis, statistical modeling, and visualization.' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', description: 'Product discovery, technology commercialization, and incubation.' },
  { id: 'sustainability', name: 'Sustainability', description: 'Clean energy systems, resource optimization, and green computing.' },
  { id: 'research', name: 'Research Methodologies', description: 'Literature reviews, empirical validation, and academic publishing.' },
];

export const contributorRoles: ContributorRoleItem[] = [
  { id: 'student', name: 'Students', description: 'Undergraduate and graduate students sharing active projects, exam prep, and college journeys.' },
  { id: 'mentor', name: 'Mentors', description: 'Senior advisors providing long-term career direction, craft wisdom, and strategic guidance.' },
  { id: 'teacher', name: 'Teachers & Professors', description: 'Faculty and instructors dissecting pedagogy, curriculum development, and deep concepts.' },
  { id: 'researcher', name: 'Researchers', description: 'Scientists and scholars translating complex peer-reviewed papers into accessible guides.' },
  { id: 'engineer', name: 'Engineers', description: 'Practicing hardware and software engineers sharing production-grade architectures and code.' },
  { id: 'developer', name: 'Developers', description: 'Open-source contributors and tool builders documenting libraries and practical workflows.' },
  { id: 'founder', name: 'Founders', description: 'Technology entrepreneurs building high-impact startups from laboratory research.' },
  { id: 'scientist', name: 'Scientists', description: 'Domain specialists investigating physics, biology, and applied mathematics.' },
  { id: 'designer', name: 'Designers', description: 'UI/UX and product designers focusing on human-computer interaction and cognitive ergonomics.' },
  { id: 'educationist', name: 'Educationists', description: 'Policy advocates and academic leaders reforming technical and higher education.' },
  { id: 'professional', name: 'Industry Professionals', description: 'Senior executives and specialists connecting university labs to industrial realities.' },
];

export const blogAuthors: Record<string, BlogAuthor> = {
  'hrishikesh-jha': {
    id: 'hrishikesh-jha',
    name: 'Hrishikesh Jha',
    role: 'Student Researcher & Autonomous Systems Builder',
    contributorType: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    bio: 'Undergraduate builder exploring autonomous robotics, edge perception, and open-access educational tooling. GDG Campus Lead.',
    affiliation: 'Techno India University & Open Robotics Working Group',
    expertise: ['Robotics', 'Edge AI', 'Computer Vision', 'Open Educational Resources'],
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      website: 'https://technowallah.edu',
    },
  },
  'dr-subhash-mukherjee': {
    id: 'dr-subhash-mukherjee',
    name: 'Prof. Subhash Mukherjee',
    role: 'Emeritus Professor of Computer Science',
    contributorType: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    bio: 'Over 28 years teaching operating systems, concurrent algorithms, and distributed computing. Advisor to state educational boards.',
    affiliation: 'School of Advanced Computing Sciences',
    expertise: ['Operating Systems', 'Pedagogy', 'Concurrency', 'Academic Mentorship'],
    socials: {
      linkedin: 'https://linkedin.com',
      website: 'https://scholar.google.com',
    },
  },
  'priya-ramanathan': {
    id: 'priya-ramanathan',
    name: 'Priya Ramanathan',
    role: 'Staff Machine Learning Engineer & Visiting Lecturer',
    contributorType: 'professional',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    bio: 'Staff ML Engineer working on foundation models. Teaches elective courses on large-scale transformer deployment for universities.',
    affiliation: 'HyperScale AI Labs & Visiting Faculty',
    expertise: ['Large Language Models', 'Distributed Training', 'Industry Mentorship', 'MLOps'],
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  'ananya-sen': {
    id: 'ananya-sen',
    name: 'Ananya Sen',
    role: 'Open Source Fellow & Incoming Software Intern',
    contributorType: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    bio: 'Senior computer science student passionate about compiler design and Linux kernel internals. 3x hackathon winner.',
    affiliation: 'Department of Computer Science & Engineering',
    expertise: ['Rust', 'Compilers', 'Hackathons', 'Student Leadership'],
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  'vikramaditya-patel': {
    id: 'vikramaditya-patel',
    name: 'Dr. Vikramaditya Patel',
    role: 'Research Scientist & Mentor',
    contributorType: 'researcher',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    bio: 'Theoretical physicist turned quantum algorithms researcher. Has mentored over 60 postgraduate research scholars across 12 countries.',
    affiliation: 'Institute of Fundamental Physics',
    expertise: ['Quantum Computing', 'Research Methodologies', 'Applied Mathematics', 'Mentorship'],
    socials: {
      linkedin: 'https://linkedin.com',
      website: 'https://scholar.google.com',
    },
  },
  'arjun-nair': {
    id: 'arjun-nair',
    name: 'Arjun Nair',
    role: 'Tech Founder & Former Principal Architect',
    contributorType: 'founder',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    bio: 'Founded two deep-tech startups after 15 years in Silicon Valley enterprise architecture. Regular speaker at campus incubators.',
    affiliation: 'Vanguard DeepTech Foundry',
    expertise: ['Cloud Architecture', 'Product Engineering', 'Venture Creation', 'Career Strategy'],
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  'dr-meera-chatterjee': {
    id: 'dr-meera-chatterjee',
    name: 'Dr. Meera Chatterjee',
    role: 'Dean of Academic Development & Educationist',
    contributorType: 'educationist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    bio: 'Pioneer in interdisciplinary engineering curricula reform. Researches cognitive load in technical learning and accessibility in education.',
    affiliation: 'Council for Higher Technical Education',
    expertise: ['Curriculum Design', 'Cognitive Ergonomics', 'STEM Education', 'Interdisciplinary Studies'],
    socials: {
      linkedin: 'https://linkedin.com',
      website: 'https://technowallah.edu',
    },
  },
};

const STORAGE_KEY = 'technoedu_blog_posts';
const DELETED_KEY = 'technoedu_deleted_blog_ids';
const SYNC_CHANNEL_NAME = 'technoedu_blogs_sync_channel';

// Singleton BroadcastChannel for instant cross-tab & cross-window updates
let syncChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    syncChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
    syncChannel.onmessage = (event) => {
      if (event.data?.type === 'technoedu_blogs_updated' && Array.isArray(event.data?.posts)) {
        blogPosts = event.data.posts;
        window.dispatchEvent(new CustomEvent('technoedu_blogs_updated', { detail: event.data.posts }));
      }
    };
  } catch (e) {
    console.warn('BroadcastChannel initialization error:', e);
  }
}

/**
 * Retrieves the set of locally deleted post IDs so deleted articles never reappear.
 */
const getDeletedBlogIds = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (e) {
    return new Set();
  }
};

const recordDeletedBlogId = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const set = getDeletedBlogIds();
    set.add(id);
    localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {}
};

const clearDeletedBlogId = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const set = getDeletedBlogIds();
    if (set.has(id)) {
      set.delete(id);
      localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(set)));
    }
  } catch (e) {}
};

/**
 * Retrieves all stored articles from localStorage (zero hardcoded articles).
 * Filters out any deleted articles and normalizes status.
 */
export const getStoredBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const deletedIds = getDeletedBlogIds();
    return parsed
      .filter((p) => p && p.id && !deletedIds.has(p.id))
      .map((p) => ({
        ...p,
        status: p.status === 'queued_for_checking' ? 'approved' : (p.status || 'approved'),
      }));
  } catch (err) {
    console.error('Failed to parse stored blog posts:', err);
    return [];
  }
};

/**
 * Synchronizes articles from Cloudflare R2 and backend endpoints in real time.
 * Uses cache-busting, validates content-type, filters deleted items, and merges.
 */
export const syncBlogPostsWithRemote = async (): Promise<BlogPost[]> => {
  if (typeof window === 'undefined') return [];

  let remotePosts: BlogPost[] | null = null;
  const deletedIds = getDeletedBlogIds();
  const cacheBuster = Date.now();

  // 1. Try local /api/blogs endpoint (Cloudflare Pages Function / Vercel Edge / Vite Middleware)
  try {
    const res = await fetch(`/api/blogs?_t=${cacheBuster}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
    const cType = res.headers.get('content-type') || '';
    if (res.ok && cType.includes('application/json')) {
      const data = await res.json();
      if (Array.isArray(data)) {
        remotePosts = data;
      }
    }
  } catch (err) {
    // Non-blocking
  }

  // 2. Fallback to Cloudflare R2 Public CDN directly
  if ((!remotePosts || remotePosts.length === 0) && R2_BLOG_CDN_URL) {
    try {
      const res = await fetch(`${R2_BLOG_CDN_URL}/blogs/posts.json?_t=${cacheBuster}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      const cType = res.headers.get('content-type') || '';
      if (res.ok && (cType.includes('application/json') || cType.includes('text/plain'))) {
        const data = await res.json();
        if (Array.isArray(data)) {
          remotePosts = data;
        }
      }
    } catch (err) {
      // Non-blocking
    }
  }

  // 3. Fallback to static /blogs/posts.json
  if (!remotePosts || remotePosts.length === 0) {
    try {
      const res = await fetch(`/blogs/posts.json?_t=${cacheBuster}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      const cType = res.headers.get('content-type') || '';
      if (res.ok && cType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data)) {
          remotePosts = data;
        }
      }
    } catch (err) {
      // Non-blocking
    }
  }

  if (remotePosts) {
    // Filter out any locally deleted post IDs
    const sanitizedRemote = remotePosts.filter((p) => p && p.id && !deletedIds.has(p.id));
    const local = getStoredBlogPosts().filter((p) => !deletedIds.has(p.id));

    const mergedMap = new Map<string, BlogPost>();
    // Put remote posts first (authoritative server truth)
    sanitizedRemote.forEach((p) => mergedMap.set(p.id, p));

    // Also preserve any locally pending posts that haven't synced yet
    local.forEach((p) => {
      if (!mergedMap.has(p.id)) {
        mergedMap.set(p.id, p);
        // Upload locally pending post to remote in background
        fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(p),
        }).catch(() => {});
      }
    });

    const merged = Array.from(mergedMap.values());
    const currentLocalStr = localStorage.getItem(STORAGE_KEY) || '[]';
    const newLocalStr = JSON.stringify(merged);

    // Only update and dispatch if there is a real difference
    if (currentLocalStr !== newLocalStr) {
      try {
        localStorage.setItem(STORAGE_KEY, newLocalStr);
      } catch (e) {}
      blogPosts = merged;
      window.dispatchEvent(new CustomEvent('technoedu_blogs_updated', { detail: merged }));
      try {
        syncChannel?.postMessage({ type: 'technoedu_blogs_updated', posts: merged });
      } catch (e) {}
    }
    return merged;
  }

  return getStoredBlogPosts();
};

/**
 * Saves a new contributed blog post into persistent storage with immediate publication.
 * Updates local state instantly (0ms UI latency) and syncs to Cloudflare R2 backend.
 */
export const addStoredBlogPost = async (newPost: BlogPost): Promise<BlogPost> => {
  if (typeof window === 'undefined') return newPost;
  try {
    const postWithStatus: BlogPost = {
      ...newPost,
      status: 'approved',
      submittedAt: newPost.submittedAt || new Date().toISOString(),
    };

    // Remove from deleted set if re-adding
    clearDeletedBlogId(postWithStatus.id);

    const current = getStoredBlogPosts();
    const updated = [postWithStatus, ...current.filter((p) => p.id !== postWithStatus.id)];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
    blogPosts = updated;

    // Instant local UI notification
    window.dispatchEvent(new CustomEvent('technoedu_blogs_updated', { detail: updated }));
    try {
      syncChannel?.postMessage({ type: 'technoedu_blogs_updated', posts: updated });
    } catch (e) {}

    // Sync to Cloudflare R2 via API
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postWithStatus),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.posts)) {
          const freshPosts = data.posts;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(freshPosts));
          blogPosts = freshPosts;
          window.dispatchEvent(new CustomEvent('technoedu_blogs_updated', { detail: freshPosts }));
          syncChannel?.postMessage({ type: 'technoedu_blogs_updated', posts: freshPosts });
        }
      }
    } catch (err) {
      console.warn('Background sync to Cloudflare R2 failed (will retry on next sync):', err);
    }

    return postWithStatus;
  } catch (err) {
    console.error('Failed to save blog post:', err);
    return newPost;
  }
};

/**
 * Deletes a stored blog post by ID from both localStorage and Cloudflare R2.
 * Updates UI immediately and prevents resurrection from stale caches.
 */
export const deleteStoredBlogPost = async (id: string): Promise<void> => {
  if (typeof window === 'undefined') return;
  try {
    // Record deletion so stale remote caches cannot restore it
    recordDeletedBlogId(id);

    const current = getStoredBlogPosts();
    const updated = current.filter((p) => p.id !== id);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    blogPosts = updated;

    // Instant local UI notification
    window.dispatchEvent(new CustomEvent('technoedu_blogs_updated', { detail: updated }));
    try {
      syncChannel?.postMessage({ type: 'technoedu_blogs_updated', posts: updated });
    } catch (e) {}

    // Delete on Cloudflare R2 via API
    try {
      const res = await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.posts)) {
          const freshPosts = data.posts.filter((p: BlogPost) => p.id !== id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(freshPosts));
          blogPosts = freshPosts;
          window.dispatchEvent(new CustomEvent('technoedu_blogs_updated', { detail: freshPosts }));
          syncChannel?.postMessage({ type: 'technoedu_blogs_updated', posts: freshPosts });
        }
      }
    } catch (err) {
      console.warn('Background delete on Cloudflare R2 failed:', err);
    }
  } catch (err) {
    console.error('Failed to delete blog post:', err);
  }
};

/**
 * Retrieves a single blog post by its URL slug.
 */
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getStoredBlogPosts();
  return posts.find((p) => p.slug === slug);
};

/**
 * Custom React Hook to subscribe to blog changes across any component.
 * Features:
 * 1. Instant local render from storage
 * 2. Immediate remote sync from Cloudflare R2 on mount
 * 3. 0ms instant cross-tab sync via BroadcastChannel
 * 4. Active real-time background polling (every 5 seconds while active)
 * 5. Window focus, visibilitychange, and online auto-revalidation
 */
export const useBlogPosts = (): BlogPost[] => {
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());

  useEffect(() => {
    let isMounted = true;

    const handleUpdate = () => {
      if (isMounted) {
        setPosts(getStoredBlogPosts());
      }
    };

    window.addEventListener('technoedu_blogs_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Initial remote fetch from Cloudflare R2
    syncBlogPostsWithRemote().then((synced) => {
      if (isMounted && synced && synced.length > 0) {
        setPosts(synced);
      }
    });

    // Real-time revalidation triggers:
    const handleFocus = () => {
      syncBlogPostsWithRemote();
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncBlogPostsWithRemote();
      }
    };

    const handleOnline = () => {
      syncBlogPostsWithRemote();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('online', handleOnline);

    // Periodic real-time background sync (every 5s while tab is active)
    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        syncBlogPostsWithRemote();
      }
    }, 5000);

    return () => {
      isMounted = false;
      window.removeEventListener('technoedu_blogs_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', handleOnline);
      clearInterval(intervalId);
    };
  }, []);

  return posts;
};

// Dynamic exported reference initialized from storage (zero hardcoded articles)
export let blogPosts: BlogPost[] = getStoredBlogPosts();

