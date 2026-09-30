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

/**
 * Retrieves all stored articles from localStorage (zero hardcoded articles).
 */
export const getStoredBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse stored blog posts:', err);
    return [];
  }
};

/**
 * Saves a new contributed blog post into persistent storage with status 'queued_for_checking'.
 * Immediately dispatches an update event so all open views re-render in real time.
 */
export const addStoredBlogPost = (newPost: BlogPost): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredBlogPosts();
    const postWithStatus: BlogPost = {
      ...newPost,
      status: newPost.status || 'queued_for_checking',
      submittedAt: newPost.submittedAt || new Date().toISOString(),
    };
    const updated = [postWithStatus, ...current.filter((p) => p.id !== postWithStatus.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    blogPosts = updated;
    window.dispatchEvent(new CustomEvent('technoedu_blogs_updated', { detail: postWithStatus }));
  } catch (err) {
    console.error('Failed to save blog post to localStorage:', err);
  }
};

/**
 * Deletes a stored blog post by ID
 */
export const deleteStoredBlogPost = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredBlogPosts();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    blogPosts = updated;
    window.dispatchEvent(new CustomEvent('technoedu_blogs_updated', { detail: { id } }));
  } catch (err) {
    console.error('Failed to delete blog post from localStorage:', err);
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
 * Immediately updates whenever a new article is contributed.
 */
export const useBlogPosts = (): BlogPost[] => {
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts());
    };
    window.addEventListener('technoedu_blogs_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('technoedu_blogs_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return posts;
};

// Dynamic exported reference initialized from storage (zero hardcoded articles)
export let blogPosts: BlogPost[] = getStoredBlogPosts();
