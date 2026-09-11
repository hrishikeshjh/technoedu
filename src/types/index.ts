export type ExamCategoryType = 'Study Abroad' | 'Government' | 'Law & Entrance' | 'Engineering & Tech' | 'Medical' | 'Management';

export interface OpenSourcePlatform {
  id: string;
  name: string;
  provider: string;
  type: 'Video Lectures' | 'Textbooks & Notes' | 'Official PYQs' | 'Practice Engine' | 'Courseware';
  url: string;
  description: string;
  badge: string;
  isOfficialOrGovt?: boolean;
}

export interface ExamTopicResource {
  topicName: string;
  description: string;
  platformName: string;
  platformType: string;
  resourceTitle: string;
  resourceUrl: string;
  isFreeOpenSource: boolean;
}

export interface RecommendedBook {
  title: string;
  author: string;
  platform: string;
  url: string;
}

export interface ExamInfo {
  id: string;
  name: string;
  shortCode: string;
  category: ExamCategoryType;
  description: string;
  syllabusHighlights: string[];
  popularTopics: string[];
  tag: string;
  officialPortalUrl: string;
  officialPortalName: string;
  officialPYQUrl?: string;
  openSourcePlatforms: OpenSourcePlatform[];
  topicResources: ExamTopicResource[];
  recommendedTextbooks: RecommendedBook[];
}

export type MaterialCategory = 
  | 'All'
  | 'NCERT & Open Textbooks' 
  | 'Official Previous Year Papers' 
  | 'NPTEL & University Courseware' 
  | 'Formula Sheets & Handbooks' 
  | 'Syllabus & Blueprints' 
  | 'Open Question Banks' 
  | 'Vocabulary & Language Repositories';

export interface StudyMaterialItem {
  id: string;
  title: string;
  category: MaterialCategory;
  examName: string;
  fileSize: string;
  pageCount: number;
  sourcePlatform: string;
  sourceUrl: string;
  isExternalLink: boolean;
  previewSummary: string;
  keyTopics: string[];
  licenseType: string;
}

export interface LearningPlatformInfo {
  id: string;
  name: string;
  organization: string;
  category: string;
  description: string;
  url: string;
  featuredSubjects: string[];
  accessType: string;
  logoText: string;
}

export interface PracticeQuestion {
  id: string;
  examShortCode: string;
  subject: string;
  topic: string;
  questionText: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  sourceReference: string;
  sourceUrl?: string;
}
