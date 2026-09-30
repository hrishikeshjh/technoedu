export type BlogAudience = 'students' | 'subjects' | 'mentors' | 'professionals';

export type BlogContributorType =
  | 'student'
  | 'teacher'
  | 'mentor'
  | 'researcher'
  | 'engineer'
  | 'developer'
  | 'founder'
  | 'scientist'
  | 'designer'
  | 'educationist'
  | 'professional';

export type BlogDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  contributorType: BlogContributorType;
  avatar: string;
  bio: string;
  affiliation?: string;
  expertise: string[];
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface ContentSection {
  id: string;
  heading?: string;
  body: string[];
  quote?: {
    text: string;
    citation: string;
  };
  keyTakeaway?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  bulletPoints?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  subject: string;
  audience: BlogAudience;
  author: BlogAuthor;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
  difficulty?: BlogDifficulty;
  tableOfContents?: { id: string; text: string; level: number }[];
  contentSections: ContentSection[];
}

export interface BlogSegmentMeta {
  id: BlogAudience;
  label: string;
  shortDescription: string;
  longDescription: string;
  categories: string[];
  accentColor?: string;
  iconName: string;
}

export interface SubjectItem {
  id: string;
  name: string;
  description: string;
  articleCount?: number;
  iconName?: string;
}

export interface ContributorRoleItem {
  id: BlogContributorType;
  name: string;
  description: string;
  iconName?: string;
}
