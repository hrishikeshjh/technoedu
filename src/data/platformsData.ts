import { LearningPlatformInfo } from '../types';

export const platformsData: LearningPlatformInfo[] = [
  {
    id: 'nptel-swayam',
    name: 'NPTEL & SWAYAM',
    organization: 'Ministry of Education, Govt of India & IITs/IISc',
    category: 'University Video Lectures & Courses',
    description: 'Free college and competitive level courses produced by IIT Bombay, IIT Madras, IIT Kharagpur, IIT Delhi, and IISc. Complete video lecture archives, transcripts, and assignment question banks across Engineering, Sciences, Humanities, Management, and Law.',
    url: 'https://nptel.ac.in/courses',
    featuredSubjects: ['Engineering Sciences', 'Management & Quantitative Heuristics', 'Basic Sciences', 'Constitutional Law & Humanities'],
    accessType: '100% Free Open Access',
    logoText: 'NPTEL'
  },
  {
    id: 'mit-ocw',
    name: 'MIT OpenCourseWare',
    organization: 'Massachusetts Institute of Technology (MIT)',
    category: 'Global Open Courseware',
    description: 'Digital publication of virtually all MIT course content. Unrestricted access to full course lecture notes, syllabus plans, video lectures from world-renowned professors, exams with solution keys, and quantitative problem sets.',
    url: 'https://ocw.mit.edu',
    featuredSubjects: ['Linear Algebra & Calculus', 'Algorithms & Problem Solving', 'Probability & Statistics', 'Microeconomics & Game Theory'],
    accessType: 'Creative Commons Open Access',
    logoText: 'MIT OCW'
  },
  {
    id: 'ncert-epathshala',
    name: 'NCERT e-Pathshala & DIKSHA',
    organization: 'National Council of Educational Research and Training',
    category: 'Foundational Textbooks & Reference',
    description: 'The national standard foundational repository for UPSC, State PSCs, CUET, and Banking. Contains free digital textbooks from Class 6 to 12 across Indian History, Geography, Polity, Macroeconomics, Physics, Chemistry, and Biology.',
    url: 'https://ncert.nic.in/textbook.php',
    featuredSubjects: ['Indian National Movement & Ancient History', 'Physical & Human Geography', 'Democratic Politics & Constitution', 'General Science & Biology'],
    accessType: 'Official Government Open Repository',
    logoText: 'NCERT'
  },
  {
    id: 'openstax',
    name: 'OpenStax Rice University',
    organization: 'Rice University Open Education',
    category: 'Peer-Reviewed Open Textbooks',
    description: 'Free, peer-reviewed, openly licensed textbooks used by hundreds of global universities. Invaluable for GRE/GMAT quantitative reasoning, college algebra, statistics, economics, and American government / comparative politics.',
    url: 'https://openstax.org/subjects',
    featuredSubjects: ['College Algebra & Precalculus', 'Introductory Statistics', 'Principles of Micro & Macroeconomics', 'American & Comparative Government'],
    accessType: 'Creative Commons CC BY 4.0',
    logoText: 'OpenStax'
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    organization: 'Khan Academy Non-Profit',
    category: 'Mastery Learning & Test Foundations',
    description: 'World-class non-profit education platform with practice exercises, instructional videos, and a personalized learning dashboard. Renowned for Digital SAT official partner prep, GRE quant basics, grammar foundations, and microeconomics.',
    url: 'https://www.khanacademy.org',
    featuredSubjects: ['Digital SAT Math & Reading', 'Grammar & Syntax Rules', 'Arithmetic, Algebra & Geometry', 'Macroeconomics & Finance'],
    accessType: '100% Free Non-Profit',
    logoText: 'Khan Acad'
  },
  {
    id: 'egyankosh',
    name: 'e-GyanKosh (IGNOU)',
    organization: 'Indira Gandhi National Open University (IGNOU)',
    category: 'Higher Distance Education Repository',
    description: 'National digital repository to store, index, and share open digital learning resources developed by open and distance learning institutions in India. Top choice for UPSC and State PSC Optional subjects (Public Administration, History, Sociology, Political Science).',
    url: 'https://egyankosh.ac.in',
    featuredSubjects: ['Public Administration & Governance', 'Sociology & Social Issues', 'Indian Political Thought', 'Modern Indian History'],
    accessType: 'Open Distance Learning Repository',
    logoText: 'IGNOU'
  },
  {
    id: 'ndli',
    name: 'National Digital Library of India (NDLI)',
    organization: 'IIT Kharagpur & Ministry of Education',
    category: 'All-Discipline Digital Library',
    description: 'Virtual repository of learning resources with a single-window search facility. Contains millions of academic books, articles, theses, manuscripts, audio lectures, and question papers for school, college, and competitive exam preparation.',
    url: 'https://ndl.iitkgp.ac.in',
    featuredSubjects: ['Competitive Examination PYQs', 'Higher Technical & Law Theses', 'Language & Literature Compendiums', 'Historical Archives'],
    accessType: 'National Open Access Portal',
    logoText: 'NDLI'
  },
  {
    id: 'prs-india',
    name: 'PRS Legislative Research',
    organization: 'Institute for Policy Research Studies',
    category: 'Policy, Governance & Constitutional Acts',
    description: 'Independent research initiative providing unvarnished, high-quality analysis of legislative bills, Union Budgets, standing committee reports, and state policies. Indispensable for UPSC Civil Services Mains GS-2, WBCS, and CLAT Legal Reasoning.',
    url: 'https://prsindia.org',
    featuredSubjects: ['Parliamentary Bills & Acts', 'Union Budget Analysis', 'Constitutional Law Reports', 'Policy Summaries & Briefs'],
    accessType: 'Open Non-Profit Policy Research',
    logoText: 'PRS India'
  },
  {
    id: 'internet-archive-openlib',
    name: 'Internet Archive & Open Library',
    organization: 'Internet Archive Non-Profit',
    category: 'Public Domain Books & Archives',
    description: 'Non-profit digital library offering millions of free books, movies, audio tracks, and reference manuscripts. Exceptional resource for classic English literature for GRE/GMAT/IELTS reading, historical documents, and public domain dictionaries.',
    url: 'https://openlibrary.org',
    featuredSubjects: ['Classic Literature & Reading Comprehension', 'Etymology & Vocabulary Archives', 'Public Domain Legal Treatises', 'Historical Manuscripts'],
    accessType: 'Universal Open Access',
    logoText: 'OpenLib'
  }
];

export const openSourcePlatforms = platformsData;
