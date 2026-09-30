/**
 * UGC-NET / JRF Comprehensive Data Model
 * Primary Source of Truth: planfornet.md
 * University Grants Commission (UGC) National Eligibility Test & Junior Research Fellowship
 */

export interface UgcPaper1Unit {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  questionsCount: number;
  marksCount: number;
  officialSyllabus: string[];
  highYieldFocus: string[];
  freeStudyMaterials: {
    title: string;
    type: string;
    platform: string;
    url: string;
  }[];
  pyqPracticeAction: string;
}

export interface UgcPaper2Subject {
  id: string;
  subjectCode: string;
  name: string;
  category: string;
  coreDomains: string[];
  recommendedOer: {
    title: string;
    platform: string;
    url: string;
    type: string;
  }[];
  studyMaterialNote: string;
  roadmapAvailable: boolean;
}

export interface UgcCsUnit {
  id: number;
  name: string;
  topics: string[];
  studyResources: {
    title: string;
    platform: string;
    url: string;
  }[];
  recommendedSequence: number;
  notes: string;
  pyqFocus: string;
}

export interface RoadmapWeek {
  week: number;
  phaseId: number;
  phaseName: string;
  paper1Focus: string;
  paper2Focus: string;
  activity: string;
  deliverable: string;
}

export interface RoadmapPhase {
  id: number;
  title: string;
  subtitle: string;
  weeksRange: string;
  startWeek: number;
  endWeek: number;
  goal: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
}

export interface Roadmap90DayWeek {
  week: string;
  focusArea: string;
  paper1Priority: string;
  paper2Priority: string;
  deliverable: string;
}

export interface DailyScheduleSlot {
  timeSlot: string;
  duration: string;
  component: string;
  activity: string;
  type: 'study-p1' | 'study-p2' | 'practice' | 'revision' | 'break';
}

export interface PyqTypology {
  id: string;
  title: string;
  subtitle: string;
  nature: string;
  strategy: string[];
  highFrequencyIn?: string;
  tactic?: string;
  practiceAction: string;
}

export interface OerResourceItem {
  id: string;
  name: string;
  provider: string;
  category: string;
  url: string;
  highlights: string;
  badge: string;
  types: ('PDF' | 'Video' | 'Course' | 'Textbook' | 'Repository' | 'Mock Test' | 'Official Portal')[];
  topics: string[];
}

export interface StudyMaterialEntry {
  id: string;
  title: string;
  provider: string;
  category: 'OFFICIAL SOURCES' | 'Core Textbooks & Modules' | 'Video Lectures' | 'MOOCs' | 'Research Resources' | 'PYQs & Official Exam Resources' | 'Mock Tests' | 'Reference Material';
  bestUsedFor: string;
  relevantUnits: string[];
  paper: 'Paper 1' | 'Paper 2' | 'Both';
  stage: 'FOUNDATION' | 'CONCEPT BUILDING' | 'PRACTICE' | 'REVISION' | 'MOCK';
  isOpenFree: boolean;
  url: string;
}

// ============================================================================
// 1. UGC-NET EXAM BLUEPRINT & OVERVIEW
// ============================================================================

export const ugcNetOverview = {
  examName: 'UGC-NET & JRF (University Grants Commission)',
  shortCode: 'UGC-NET',
  conductingBody: 'National Testing Agency (NTA)',
  frequency: 'Twice a year (June & December cycles)',
  mode: 'Computer Based Test (CBT)',
  durationMinutes: 180,
  totalQuestions: 150,
  totalMarks: 300,
  markingScheme: '+2 Marks for correct response. No Negative Marking.',
  medium: 'Bilingual (English & Hindi)',
  breakBetweenPapers: 'No break between Paper 1 and Paper 2 (Continuous 3 Hours)',
  targets: {
    paper1Target: '70+ / 100 (35+ correct questions out of 50)',
    paper2Target: '130+ / 200 (65+ correct questions out of 100)',
    aggregateJrfSafeTarget: '200–210+ / 300 (67–70%+ depending on subject cutoff)',
    assistantProfessorSafeTarget: '170–185+ / 300 (57–62%+ depending on subject cutoff)',
  },
  papers: [
    {
      id: 'paper-1',
      name: 'Paper 1: General Aptitude',
      fullTitle: 'General Paper on Teaching & Research Aptitude',
      questions: 50,
      marks: 100,
      percentageMarks: 33.33,
      durationShareMins: 60,
      description: 'Tests general teaching ability, research inclination, cognitive skills, comprehension, logical thinking, general awareness of higher education, and environmental consciousness.',
      unitsCount: 10,
      questionsPerUnit: 'Typically 5 questions (10 marks) per unit',
    },
    {
      id: 'paper-2',
      name: 'Paper 2: Subject Domain',
      fullTitle: 'Post-Graduate Domain-Specific Paper',
      questions: 100,
      marks: 200,
      percentageMarks: 66.67,
      durationShareMins: 120,
      description: 'Subject-specific post-graduate level comprehensive evaluation across the candidate’s chosen discipline (83 approved subjects).',
      unitsCount: '8 to 10 domain units (subject-dependent)',
      questionsPerUnit: '100 MCQs covering foundational, intermediate, and advanced critical domain theory',
    }
  ],
  eligibilityCategories: [
    {
      categoryNumber: 'Category 1',
      title: 'JRF + Assistant Professor + Ph.D. Admission',
      description: 'Award of Junior Research Fellowship (JRF) & appointment as Assistant Professor, plus direct admission to Ph.D. programmes across Indian universities.',
      badge: 'Highest Honor & Fellowship',
      validity: 'JRF valid per UGC norms; Assistant Professor eligibility is lifetime',
    },
    {
      categoryNumber: 'Category 2',
      title: 'Assistant Professor + Ph.D. Admission',
      description: 'Appointment as Assistant Professor in universities/colleges & admission to Ph.D. programmes without fellowship.',
      badge: 'Faculty Eligibility',
      validity: 'Lifetime eligibility for Assistant Professorship',
    },
    {
      categoryNumber: 'Category 3',
      title: 'Ph.D. Admission Only',
      description: 'Admission to Ph.D. only (per recent UGC Gazette guidelines). Valid for 1 year. 70% weightage given to NET score + 30% weightage given to viva-voce/interview.',
      badge: 'Research Entrance',
      validity: 'Score valid for 1 year for Ph.D. admissions',
    }
  ]
};

// ============================================================================
// 2. PAPER 1: 10 UNITS DETAILED SYLLABUS & VERIFIED OER
// ============================================================================

export const paper1Units: UgcPaper1Unit[] = [
  {
    id: 'unit-1',
    number: '01',
    name: 'Teaching Aptitude',
    shortDesc: 'Teaching levels, learner characteristics, instructional facilities, CBCS & evaluation innovations',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'Teaching: Concept, Objectives, Levels of teaching (Memory, Understanding and Reflective), Characteristics and basic requirements.',
      'Learner’s characteristics: Characteristics of adolescent and adult learners (Academic, Social, Emotional and Cognitive), Individual differences.',
      'Factors affecting teaching: Teacher, Learner, Support material, Instructional facilities, Learning environment and Institution.',
      'Methods of teaching in Institutions of higher learning: Teacher-centred vs. Learner-centred methods; Offline vs. Online methods (Swayam, Swayamprabha, MOOCs etc.).',
      'Teaching Support System: Traditional, Modern and ICT based.',
      'Evaluation Systems: Elements and Characteristics of evaluation, Evaluation in Choice Based Credit System (CBCS) in higher education, Computer-based testing, Innovations in evaluation systems.'
    ],
    highYieldFocus: [
      'Bloom’s Taxonomy of Educational Objectives (Cognitive, Affective, Psychomotor domains).',
      'Morris L. Bigge levels of teaching: Memory Level (Herbart), Understanding Level (Morrison), Reflective Level (Hunt).',
      'Formative vs. Summative vs. Diagnostic vs. Norm-Referenced vs. Criterion-Referenced evaluation.',
      'Four Quadrants of MOOCs (e-Tutorial, e-Content, Discussion Forum, Assessment).'
    ],
    freeStudyMaterials: [
      {
        title: 'UGC e-PG Pathshala (Education - Higher Education & Pedagogy)',
        type: 'Text Modules & E-Tutorials',
        platform: 'e-PG Pathshala',
        url: 'https://epgp.inflibnet.ac.in'
      },
      {
        title: 'IGNOU B.Ed / M.A. Education Pedagogy Modules',
        type: 'Self-Learning Material (PDF)',
        platform: 'e-GyanKosh',
        url: 'https://egyankosh.ac.in/handle/123456789/46210'
      },
      {
        title: 'CEC UGC Video Lectures on Teaching Aptitude',
        type: 'High-Definition Video Series',
        platform: 'CEC UGC',
        url: 'https://cec.nic.in'
      },
      {
        title: 'SWAYAM MOOCs Portal & Regulations',
        type: 'Official Courseware Portal',
        platform: 'SWAYAM',
        url: 'https://swayam.gov.in'
      }
    ],
    pyqPracticeAction: 'Solve 50 PYQs focusing on Formative vs. Summative evaluation and Levels of Teaching.'
  },
  {
    id: 'unit-2',
    number: '02',
    name: 'Research Aptitude',
    shortDesc: 'Positivism, research types & steps, sampling, thesis formatting, plagiarism & ethics',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'Research: Meaning, Types, and Characteristics; Positivism and Post-positivistic approach to research.',
      'Methods of Research: Experimental, Descriptive, Historical, Qualitative and Quantitative methods.',
      'Steps of Research: Problem formulation, Hypothesis formulation, Research design, Data collection, Data analysis, Generalization.',
      'Thesis and Article writing: Format and styles of referencing (APA, MLA, Chicago, etc.).',
      'Application of ICT in research: Data collection tools, statistical software, reference managers.',
      'Research ethics: Plagiarism, intellectual property rights, data fabrication, falsification.'
    ],
    highYieldFocus: [
      'Positivism (Quantitative, Empirical, Objective) vs. Post-Positivism (Interpretive, Qualitative, Subjective).',
      'Sampling Techniques: Probability (Simple Random, Stratified, Cluster, Systematic) vs. Non-Probability (Purposive, Quota, Snowball, Convenience).',
      'Type I Error (False Positive / rejecting true null hypothesis) vs. Type II Error (False Negative / failing to reject false null hypothesis).',
      'UGC Regulations on Academic Integrity & Plagiarism (Level 0: up to 10%, Level 1: 10–40%, Level 2: 40–60%, Level 3: above 60%).'
    ],
    freeStudyMaterials: [
      {
        title: 'IGNOU Research Methodology Courseware (MES-016 & MCO-03)',
        type: 'Self-Learning Material (PDF)',
        platform: 'e-GyanKosh',
        url: 'https://egyankosh.ac.in/handle/123456789/24584'
      },
      {
        title: 'Shodhganga (Indian Theses Repository & Referencing Styles)',
        type: 'Theses & Synopses Archive',
        platform: 'Shodhganga',
        url: 'https://shodhganga.inflibnet.ac.in'
      },
      {
        title: 'UGC e-PG Pathshala Research Methodology',
        type: 'Comprehensive Text Modules',
        platform: 'e-PG Pathshala',
        url: 'https://epgp.inflibnet.ac.in'
      },
      {
        title: 'OpenStax Research Methods & Statistics Handbook',
        type: 'Peer-Reviewed Open Textbook',
        platform: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics'
      }
    ],
    pyqPracticeAction: 'Tabulate research methods and practice 60 PYQs on Sampling and Hypothesis testing.'
  },
  {
    id: 'unit-3',
    number: '03',
    name: 'Reading Comprehension',
    shortDesc: 'Unseen academic passage with 5 direct and inferential comprehension questions',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'A passage of text is given. Questions are asked based on the passage to be answered.'
    ],
    highYieldFocus: [
      '5 questions directly based on an academic, socio-economic, or philosophical passage.',
      'Identifying the primary theme and central argument of the passage.',
      'Inferring the tone and perspective of the author.',
      'Contextual vocabulary deduction and direct fact location.'
    ],
    freeStudyMaterials: [
      {
        title: 'UGC-NET Official PYQ Archive (Comprehension Passages)',
        type: 'Official Question Papers',
        platform: 'NTA UGC-NET Portal',
        url: 'https://ugcnet.nta.ac.in'
      },
      {
        title: 'NDLI Reading and Comprehension Repository',
        type: 'Academic Reading Repository',
        platform: 'NDLI',
        url: 'https://ndl.iitkgp.ac.in'
      }
    ],
    pyqPracticeAction: 'Practice reverse skimming on 10 past exam comprehension sets under 8-minute timed condition.'
  },
  {
    id: 'unit-4',
    number: '04',
    name: 'Communication',
    shortDesc: 'Communication models, verbal & non-verbal, barriers, classroom dynamics, mass media',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'Communication: Meaning, types and characteristics of communication.',
      'Effective communication: Verbal and Non-verbal, Inter-Cultural and group communications, Classroom communication.',
      'Barriers to effective communication: Physical, Psychological, Semantic, Cultural, Organizational.',
      'Mass-Media and Society: Radio, Television, Press, Social Media, New media technologies.'
    ],
    highYieldFocus: [
      'Communication Models: Shannon-Weaver Linear Model, Berlo’s SMCR Model, Schramm’s Interactive Model, Westley & MacLean Model.',
      'Non-verbal dimensions: Kinesics (body language), Proxemics (space), Chronemics (time), Haptics (touch), Paralanguage (vocal pitch, pauses).',
      'Classroom Communication dynamics: Feedback loops, active listening, teacher immediacy, entropy, and noise.'
    ],
    freeStudyMaterials: [
      {
        title: 'IGNOU Communication Skills Modules (BEGA-001)',
        type: 'Direct PDF Modules',
        platform: 'e-GyanKosh',
        url: 'https://egyankosh.ac.in/handle/123456789/36881'
      },
      {
        title: 'UGC e-PG Pathshala Media & Communication Studies',
        type: 'Curriculum Courseware',
        platform: 'e-PG Pathshala',
        url: 'https://epgp.inflibnet.ac.in'
      },
      {
        title: 'CEC UGC Lectures on Mass Communication',
        type: 'Collegiate Video Lectures',
        platform: 'CEC UGC',
        url: 'https://cec.nic.in'
      }
    ],
    pyqPracticeAction: 'Create flowchart of communication models and solve 40 PYQs on Barriers and Non-verbal codes.'
  },
  {
    id: 'unit-5',
    number: '05',
    name: 'Mathematical Reasoning & Aptitude',
    shortDesc: 'Number & letter series, coding-decoding, blood relations, fractions, percentages, speed-distance',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'Types of reasoning: Inductive, Deductive, Analogical.',
      'Number series, Letter series, Codes and Relationships.',
      'Mathematical Aptitude: Fraction, Time & Distance, Ratio, Proportion and Percentage, Profit and Loss, Interest and Discounting, Averages, etc.'
    ],
    highYieldFocus: [
      'Percentage-Fraction conversion table (1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%).',
      'Speed, Distance & Time: Relative speed of trains, upstream/downstream boats.',
      'Coding-Decoding: Alphabet forward & backward rank values (A=1...Z=26, EJOTY=5, 10, 15, 20, 25).',
      'Blood Relations family tree diagrams and generational layering.'
    ],
    freeStudyMaterials: [
      {
        title: 'NCERT Mathematics Class 8–10 (Foundation Direct PDFs)',
        type: 'Official School Textbooks (PDF)',
        platform: 'NCERT Official',
        url: 'https://ncert.nic.in/textbook.php'
      },
      {
        title: 'Khan Academy Math Foundations & Arithmetic',
        type: 'Interactive Problem Sets',
        platform: 'Khan Academy',
        url: 'https://www.khanacademy.org/math'
      },
      {
        title: 'NPTEL Quantitative Reasoning & Problem Solving',
        type: 'Video Lecture Course',
        platform: 'NPTEL',
        url: 'https://nptel.ac.in'
      }
    ],
    pyqPracticeAction: 'Memorize fractional equivalents and solve 50 series, coding, and speed-math PYQs.'
  },
  {
    id: 'unit-6',
    number: '06',
    name: 'Logical Reasoning',
    shortDesc: 'Classical square of opposition, categorical syllogisms, Indian Logic (Pramanas & Hetvabhasa)',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'Understanding the structure of arguments: Argument forms, structure of categorical propositions, Mood and Figure, Formal and Informal fallacies, Uses of language, Connotations and denotations of terms, Classical square of opposition.',
      'Evaluating and distinguishing deductive and inductive reasoning.',
      'Analogies: Venn diagram (Simple and multiple use for establishing validity of arguments).',
      'Indian Logic: Means of knowledge (Pramanas): Pratyaksha (Perception), Anumana (Inference), Upamana (Comparison), Shabda (Verbal testimony), Arthapatti (Implication), Anupalabdhi (Non-apprehension).',
      'Structure and kinds of Anumana: Vyapti (invariable relation), Hetvabhasa (fallacies of inference).'
    ],
    highYieldFocus: [
      'Classical Square of Opposition: Contradictories (A-O, E-I), Contraries (A-E), Sub-contraries (I-O), Subalternation (A->I, E->O).',
      'Hetvabhasa (Fallacies of Inference): Savyabhichara (irregular middle), Viruddha (contradictory middle), Satpratipaksha (inferentially contradicted), Asiddha (unproved middle), Badhita (non-inferentially contradicted/sublated).',
      'Pancha Avayava (5 members of Indian Syllogism): Pratijna (Proposition), Hetu (Reason), Udaharana (Example with Vyapti), Upanaya (Application), Nigamana (Conclusion).'
    ],
    freeStudyMaterials: [
      {
        title: 'UGC e-PG Pathshala Philosophy: Indian Logic & Epistemology',
        type: 'Specialized High-Level Modules',
        platform: 'e-PG Pathshala',
        url: 'https://epgp.inflibnet.ac.in'
      },
      {
        title: 'IGNOU Philosophy Modules (BPY-004 / BPY-008 Indian Epistemology)',
        type: 'Direct PDF SLM',
        platform: 'e-GyanKosh',
        url: 'https://egyankosh.ac.in/handle/123456789/27170'
      },
      {
        title: 'Stanford Encyclopedia of Philosophy (Indian Logic & Nyaya)',
        type: 'Authoritative Open Encyclopedia',
        platform: 'Stanford Encyclopedia',
        url: 'https://plato.stanford.edu/entries/logic-indic/'
      }
    ],
    pyqPracticeAction: 'Master the Square of Opposition diagram and solve 40 truth-value deduction & Hetvabhasa questions.'
  },
  {
    id: 'unit-7',
    number: '07',
    name: 'Data Interpretation',
    shortDesc: 'Table charts, pie charts, missing data problems, percentage & ratio calculation techniques',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'Sources, acquisition and classification of Data.',
      'Quantitative and Qualitative Data.',
      'Graphical representation (Bar-chart, Histograms, Pie-chart, Table-chart and Line-chart) and Mapping of Data.',
      'Data Interpretation.',
      'Data and Governance.'
    ],
    highYieldFocus: [
      'Predominantly Table Charts involving percentages, ratios, averages, and multi-year comparisons.',
      'Missing Data Table problems (calculating missing values before answering questions).',
      'Fast approximation techniques to eliminate unreasonable options without exact long division.'
    ],
    freeStudyMaterials: [
      {
        title: 'NCERT Statistics for Economics (Class 11 Direct PDF)',
        type: 'Official Textbook Chapter (PDF)',
        platform: 'NCERT Official',
        url: 'https://ncert.nic.in/textbook/pdf/kest1.pdf'
      },
      {
        title: 'NTA Mock Practice DI Engine',
        type: 'Official CBT Interface Simulator',
        platform: 'NTA Official Portal',
        url: 'https://nta.ac.in/quiz'
      },
      {
        title: 'Khan Academy Data & Statistics Practice',
        type: 'Interactive Exercises',
        platform: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability'
      }
    ],
    pyqPracticeAction: 'Solve 2 complex table DI sets daily from 2021–2024 exam papers under timed conditions.'
  },
  {
    id: 'unit-8',
    number: '08',
    name: 'Information & Communication Technology',
    shortDesc: 'Memory hierarchy, number conversions, cybersecurity, networking, government digital education initiatives',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'ICT: General abbreviations and terminology.',
      'Basics of Internet, Intranet, E-mail, Audio and Video-conferencing.',
      'Digital initiatives in higher education: SWAYAM, SWAYAM PRABHA, NDL, e-ShodhSindhu, Shodhganga, ShodhGangotri, DigiLocker, NAD, e-Yantra, Virtual Labs, SAMARTH.',
      'ICT and Governance.'
    ],
    highYieldFocus: [
      'Computer Memory hierarchy: Registers > Cache > RAM/ROM > SSD > HDD > Optical Discs.',
      'Unit conversions: Bit, Nibble, Byte, KB, MB, GB, TB, PB, EB, ZB, YB (powers of 2: 2^10, 2^20, 2^30).',
      'Number System Conversions: Binary, Octal, Decimal, Hexadecimal.',
      'Cybersecurity threats: Phishing, Ransomware, Trojan Horse, Spyware, Spoofing, Denial of Service (DoS).',
      'Networking: IP Addresses (IPv4 vs. IPv6), MAC Address, Router, Switch, Gateway, HTTP vs. HTTPS, SMTP, POP3, IMAP.'
    ],
    freeStudyMaterials: [
      {
        title: 'NCERT Class 11 Informatics Practices & Computer Science',
        type: 'Official School Textbooks (PDF)',
        platform: 'NCERT Official',
        url: 'https://ncert.nic.in/textbook.php'
      },
      {
        title: 'Ministry of Education Digital Initiatives Portal',
        type: 'Government Portal Directory',
        platform: 'MoE Portal',
        url: 'https://www.education.gov.in/digital-education'
      },
      {
        title: 'INFLIBNET Digital Initiatives Overview',
        type: 'Digital Infrastructure Guide',
        platform: 'INFLIBNET',
        url: 'https://www.inflibnet.ac.in'
      },
      {
        title: 'OpenStax Computer Science / Information Systems',
        type: 'Peer-Reviewed Open Textbook',
        platform: 'OpenStax',
        url: 'https://openstax.org'
      }
    ],
    pyqPracticeAction: 'Tabulate all national digital education portals and practice 50 PYQs on memory & number systems.'
  },
  {
    id: 'unit-9',
    number: '09',
    name: 'People, Development & Environment',
    shortDesc: 'SDGs & MDGs, pollutants, NAPCC 8 missions, international protocols (Montreal, Kyoto, Paris), AQI, renewable energy',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'Development and environment: Millennium development goals (MDGs) and Sustainable development goals (SDGs).',
      'Human and environment interaction: Anthropogenic activities and their impacts on environment.',
      'Environmental issues: Local, Regional and Global; Air pollution, Water pollution, Soil pollution, Noise pollution, Waste (solid, liquid, biomedical, hazardous, electronic), Climate change and its Socio-Economic and Political dimensions.',
      'Impacts of pollutants on human health.',
      'Natural and energy resources: Solar, Wind, Soil, Hydro, Geothermal, Biomass, Nuclear and Forests.',
      'Natural hazards and disasters: Mitigation strategies.',
      'Environmental Protection Act (1986), National Action Plan on Climate Change (NAPCC - 8 Missions), International agreements/efforts: Montreal Protocol, Rio Summit, Convention on Biodiversity (CBD), Kyoto Protocol, Paris Agreement, International Solar Alliance (ISA).'
    ],
    highYieldFocus: [
      'SDGs (2015–2030): 17 Goals, 169 Targets (Goal 1: No Poverty, Goal 4: Quality Education, Goal 7: Clean Energy, Goal 13: Climate Action).',
      'MDGs (2000–2015): 8 Goals, 21 Targets.',
      'NAPCC 8 Missions: Solar, Enhanced Energy Efficiency, Sustainable Habitat, Water, Sustaining Himalayan Ecosystem, Green India, Sustainable Agriculture, Strategic Knowledge for Climate Change.',
      'International Protocols: Montreal (ODS/CFCs - Kigali amendment), Kyoto (GHG reduction), Paris Agreement (limit warming below 2°C / target 1.5°C).',
      'Air Quality Index (AQI): 8 pollutants (PM10, PM2.5, NO2, SO2, CO, O3, NH3, Pb).',
      'India’s Renewable Energy targets: 500 GW non-fossil capacity by 2030, Net-Zero by 2070.'
    ],
    freeStudyMaterials: [
      {
        title: 'NCERT Class 12 Biology - Ecology & Environment (Direct PDFs)',
        type: 'Foundational Textbook Chapter (PDF)',
        platform: 'NCERT Official',
        url: 'https://ncert.nic.in/textbook/pdf/lebo1.pdf'
      },
      {
        title: 'UN Sustainable Development Knowledge Platform (SDGs)',
        type: 'Official Global Portal',
        platform: 'United Nations SDGs',
        url: 'https://sdgs.un.org/goals'
      },
      {
        title: 'MoEFCC (Ministry of Environment, Forest and Climate Change)',
        type: 'Government Environmental Portal',
        platform: 'MoEFCC',
        url: 'https://moef.gov.in'
      },
      {
        title: 'IGNOU Environment Studies Courseware (AECC / BEVAE-181)',
        type: 'Direct PDF SLM',
        platform: 'e-GyanKosh',
        url: 'https://egyankosh.ac.in/handle/123456789/53123'
      }
    ],
    pyqPracticeAction: 'Build a chronological timeline of global environmental conventions and solve 50 PYQs on SDGs & NAPCC.'
  },
  {
    id: 'unit-10',
    number: '10',
    name: 'Higher Education System',
    shortDesc: 'Ancient universities, pre/post-independence commissions, NEP 2020 structure, statutory bodies (UGC, AICTE, NAAC, NIRF)',
    questionsCount: 5,
    marksCount: 10,
    officialSyllabus: [
      'Institutions of higher learning and education in ancient India.',
      'Evolution of higher learning and research in Post-Independence India.',
      'Oriental, Conventional and Non-conventional learning programmes in India.',
      'Professional, Technical and Skill Based education.',
      'Value education and environmental education.',
      'Policies, Governance, and Administration.'
    ],
    highYieldFocus: [
      'Ancient Universities: Takshashila, Nalanda, Vikramashila, Vallabhi, Odantapuri, Jagaddala; Scholars: Panini, Chanakya, Jivaka, Xuanzang.',
      'Pre-Independence Commissions: Charter Act (1813), Macaulay’s Minute (1835), Wood’s Despatch (1854 - Magna Carta), Hunter (1882), Curzon (1902), Sadler (1917), Hartog (1929), Wardha Scheme (1937), Sargent (1944).',
      'Post-Independence Commissions: Radhakrishnan (1948–49), Mudaliar (1952–53), Kothari (1964–66 - 10+2+3 pattern & 6% of GDP), NPE (1968, 1986, 1992 POA).',
      'NEP 2020: 5+3+3+4 curricular structure, HECI with 4 verticals (NHERC, NAC, HEGC, GEC), ABC (Academic Bank of Credits), MERUs, NRF.',
      'Regulatory & Accreditation Bodies: UGC, AICTE, NAAC, NIRF parameters & latest rankings.'
    ],
    freeStudyMaterials: [
      {
        title: 'NEP 2020 Official Policy Document (Ministry of Education)',
        type: 'Official National Policy (PDF)',
        platform: 'Ministry of Education',
        url: 'https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf'
      },
      {
        title: 'UGC Official Website & Regulations',
        type: 'Statutory Body Portal',
        platform: 'UGC Official',
        url: 'https://www.ugc.gov.in'
      },
      {
        title: 'IGNOU Higher Education System Modules (MES-101 / MES-102)',
        type: 'Direct PDF SLM',
        platform: 'e-GyanKosh',
        url: 'https://egyankosh.ac.in/handle/123456789/46215'
      },
      {
        title: 'NIRF Ranking Framework & Metrics',
        type: 'Official Ranking Framework',
        platform: 'NIRF India',
        url: 'https://www.nirfindia.org'
      }
    ],
    pyqPracticeAction: 'Chart the chronology of education commissions from 1813 to 2020 and solve 50 PYQs on ancient universities & NEP 2020.'
  }
];

// ============================================================================
// 3. PAPER 2: SUBJECTS & COMPLETE REPOSITORY
// ============================================================================

export const paper2Subjects: UgcPaper2Subject[] = [
  {
    id: 'subject-87',
    subjectCode: '87',
    name: 'Computer Science & Applications',
    category: 'Engineering & Technology',
    coreDomains: [
      'Discrete Structures & Optimization',
      'Computer System Architecture',
      'Programming Languages & Computer Graphics',
      'Database Management Systems',
      'System Software & Operating Systems',
      'Software Engineering',
      'Data Structures & Algorithms',
      'Theory of Computation & Compilers',
      'Data Communication & Computer Networks',
      'Artificial Intelligence'
    ],
    recommendedOer: [
      { title: 'NPTEL Computer Science Disciplines', platform: 'NPTEL', url: 'https://nptel.ac.in', type: 'Video Lectures' },
      { title: 'MIT OpenCourseWare EECS Modules', platform: 'MIT OCW', url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/', type: 'Courseware' },
      { title: 'UGC e-PG Pathshala Computer Science Modules (All 10 Papers)', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', type: 'Textbook Modules' },
      { title: 'IGNOU Master of Computer Applications (MCA) SLM', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in/handle/123456789/101', type: 'Self-Learning Material' }
    ],
    studyMaterialNote: 'Comprehensive 10-unit coverage available in dedicated interactive section below.',
    roadmapAvailable: true
  },
  {
    id: 'subject-08',
    subjectCode: '08 & 17',
    name: 'Commerce & Management',
    category: 'Commerce & Management',
    coreDomains: [
      'Business Environment & International Business (FDI, BoP, WTO)',
      'Accounting & Auditing (Corporate accounting, Cost accounting, IND-AS, IFRS)',
      'Business Finance & Financial Management (Capital structure, Cost of capital, Capital budgeting)',
      'Business Statistics & Research Methods (Hypothesis testing z, t, F, Chi-square)',
      'Business Management & HRM (Leadership, Motivation, Performance appraisal)',
      'Banking & Financial Institutions (RBI policy, NPAs, Basel Norms, NBFCs)',
      'Marketing Management (4Ps & 7Ps, Segmentation, Positioning, Consumer behavior)',
      'Legal Aspects of Business (Contract Act 1872, Companies Act 2013, Consumer Protection 2019)',
      'Income-tax & Corporate Tax Planning (Residential status, Heads of income, Deductions)'
    ],
    recommendedOer: [
      { title: 'OpenStax Principles of Accounting Vol 1 & 2', platform: 'OpenStax', url: 'https://openstax.org/details/books/principles-accounting-volume-1-financial-accounting', type: 'Open Textbook' },
      { title: 'OpenStax Principles of Finance & Management', platform: 'OpenStax', url: 'https://openstax.org/details/books/principles-finance', type: 'Open Textbook' },
      { title: 'UGC e-PG Pathshala Commerce & Management Courses', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', type: 'Textbook Modules' },
      { title: 'IGNOU M.Com & MBA Master’s SLM', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in/handle/123456789/34', type: 'Self-Learning Material' }
    ],
    studyMaterialNote: 'Mapped to OpenStax accounting & finance, e-PG Pathshala commerce modules, and IGNOU MBA courseware.',
    roadmapAvailable: true
  },
  {
    id: 'subject-01',
    subjectCode: '01',
    name: 'Economics',
    category: 'Social Sciences',
    coreDomains: [
      'Microeconomics (Consumer choice, Production theory, Market structures, General equilibrium)',
      'Macroeconomics (Classical, Keynesian, Monetarist, IS-LM, Philips curve)',
      'Statistics & Econometrics (Regression models, Heteroscedasticity, Multicollinearity, Time series)',
      'Mathematical Economics (Differential calculus, Matrix algebra, Optimization)',
      'International Economics (Comparative advantage, Heckscher-Ohlin, Tariffs, Exchange rates)',
      'Public Economics (Market failure, Public goods, Externalities, Taxation, Fiscal policy)',
      'Money & Banking (Money supply components, Central banking, Inflation targeting)',
      'Growth & Development (Harrod-Domar, Solow, Endogenous growth, Human development indices)',
      'Indian Economy (Agricultural reforms, Industrial policy, Trade reforms, Poverty & Unemployment)'
    ],
    recommendedOer: [
      { title: 'OpenStax Principles of Economics 3e (Full Book PDF)', platform: 'OpenStax', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/PrinciplesEconomics2e.pdf', type: 'Open Textbook' },
      { title: 'MIT OCW Principles of Microeconomics & Macroeconomics', platform: 'MIT OCW', url: 'https://ocw.mit.edu/courses/economics/', type: 'Courseware' },
      { title: 'UGC e-PG Pathshala Economics', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', type: 'Textbook Modules' },
      { title: 'IGNOU M.A. Economics (MEC Courseware)', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in/handle/123456789/1085', type: 'Self-Learning Material' }
    ],
    studyMaterialNote: 'Complete theoretical and econometric models supported by OpenStax Economics and MIT OpenCourseWare.',
    roadmapAvailable: true
  },
  {
    id: 'subject-30',
    subjectCode: '30',
    name: 'English Literature',
    category: 'Humanities & Languages',
    coreDomains: [
      'Drama, Poetry, Fiction & Short Story across British, American, Post-Colonial & Indian Writing',
      'Non-Fictional Prose & Literary Essays',
      'Language: Basic concepts, theories & pedagogy; English in Use',
      'English in India: History, evolution and futures',
      'Cultural Studies',
      'Literary Criticism (Classical to New Criticism)',
      'Literary Theory post-WWII (Structuralism, Post-structuralism, Deconstruction, Feminism, Postcolonialism, Ecocriticism)'
    ],
    recommendedOer: [
      { title: 'UGC e-PG Pathshala English Literature (Modules on Literary Theory & Texts)', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', type: 'Textbook Modules' },
      { title: 'IGNOU M.A. English (MEG Programme SLM)', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in/handle/123456789/1179', type: 'Self-Learning Material' },
      { title: 'Stanford Encyclopedia of Philosophy (Literary Theory & Aesthetics)', platform: 'Stanford Encyclopedia', url: 'https://plato.stanford.edu', type: 'Open Encyclopedia' },
      { title: 'Project Gutenberg (Public Domain World Literature)', platform: 'Project Gutenberg', url: 'https://www.gutenberg.org', type: 'Digital Library' }
    ],
    studyMaterialNote: 'Critical theory, primary literary canon, and cultural studies modules through e-PG Pathshala and Project Gutenberg.',
    roadmapAvailable: true
  },
  {
    id: 'subject-09',
    subjectCode: '09',
    name: 'Education',
    category: 'Social Sciences & Education',
    coreDomains: [
      'Philosophical & Sociological Foundations of Education (Sankhya, Vedanta, Idealism, Realism, Pragmatism)',
      'History, Politics and Economics of Education',
      'Learner & Learning Process (Theories of intelligence, Personality, Motivation, Guidance)',
      'Teacher Education (Pre-service & in-service models; NCERT, NCTE, SCERT)',
      'Curriculum Studies (Models of curriculum design, Implementation, Evaluation)',
      'Research in Education (Scientific inquiry, Types of research, Parametric & non-parametric tools)',
      'Pedagogy, Andragogy & Assessment',
      'Technology in/for Education (ICT, E-learning platforms, Systems approach)',
      'Educational Management, Administration & Leadership',
      'Inclusive Education (Disabilities, RPwD Act 2016, Inclusive classroom strategies)'
    ],
    recommendedOer: [
      { title: 'UGC e-PG Pathshala Education (16 Specialized Papers)', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', type: 'Textbook Modules' },
      { title: 'IGNOU M.A. Education / M.Ed Courseware', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in/handle/123456789/46210', type: 'Self-Learning Material' },
      { title: 'NCERT National Curriculum Frameworks & Position Papers', platform: 'NCERT Official', url: 'https://ncert.nic.in', type: 'Curriculum Frameworks' }
    ],
    studyMaterialNote: '16 specialized e-PG Pathshala papers covering pedagogy, philosophical foundations, and inclusive education.',
    roadmapAvailable: true
  },
  {
    id: 'subject-02',
    subjectCode: '02 & 20',
    name: 'Political Science & History',
    category: 'Social Sciences',
    coreDomains: [
      'Political Theory & Thought (Western & Indian: Plato to Rawls, Kautilya to Ambedkar)',
      'Comparative Political Analysis & International Relations (Theories, Cold War, Multipolarity)',
      'India’s Foreign Policy & Political Institutions/Processes in India',
      'Public Administration, Governance & Public Policy in India',
      'History: Ancient India (Sources, Harappan, Vedic, Mauryan, Guptas)',
      'History: Medieval India (Delhi Sultanate, Vijayanagara, Mughals, Marathas)',
      'History: Modern India (Colonial expansion, 1857, Freedom struggle, Partition, Post-independence)',
      'Historical Method, Research & Historiography'
    ],
    recommendedOer: [
      { title: 'UGC e-PG Pathshala Political Science & History', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', type: 'Textbook Modules' },
      { title: 'IGNOU M.A. Political Science (MPS) & History (MAH) Modules', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in', type: 'Self-Learning Material' },
      { title: 'NCERT Class 11–12 History & Political Science Textbooks', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook.php', type: 'Textbooks (PDF)' },
      { title: 'OpenStax US & World History (Open Textbook PDFs)', platform: 'OpenStax', url: 'https://openstax.org/details/books/world-history-volume-2', type: 'Open Textbook' }
    ],
    studyMaterialNote: 'Comprehensive historiography, political thought, and constitutional processes via IGNOU SLM and NCERT.',
    roadmapAvailable: true
  },
  {
    id: 'subject-05',
    subjectCode: '05',
    name: 'Sociology',
    category: 'Social Sciences',
    coreDomains: [
      'Sociological Concepts & Structures',
      'Sociological Theory (Classical: Marx, Weber, Durkheim; Modern: Parsons, Merton; Post-Modern: Foucault, Bourdieu)',
      'Methodology & Methods (Quantitative, Qualitative, Positivist, Interpretive)',
      'Basic Institutions, Rural & Urban Transformations',
      'State, Politics & Development; Economy & Society',
      'Environment & Society; Family, Marriage & Kinship',
      'Science, Technology & Society; Culture & Symbolic Transformations'
    ],
    recommendedOer: [
      { title: 'OpenStax Introduction to Sociology 3e', platform: 'OpenStax', url: 'https://openstax.org/details/books/introduction-sociology-3e', type: 'Open Textbook' },
      { title: 'UGC e-PG Pathshala Sociology', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', type: 'Textbook Modules' },
      { title: 'IGNOU M.A. Sociology (MSO SLM Modules)', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in/handle/123456789/1086', type: 'Self-Learning Material' }
    ],
    studyMaterialNote: 'Sociological thinkers from classical to contemporary post-modernists with OpenStax and IGNOU modules.',
    roadmapAvailable: true
  },
  {
    id: 'subject-58',
    subjectCode: '58',
    name: 'Law',
    category: 'Law & Legal Studies',
    coreDomains: [
      'Jurisprudence (Analytical, Historical, Sociological, Realist schools; Rights & Duties)',
      'Constitutional & Administrative Law (Fundamental Rights, Judicial Review, Federalism)',
      'Public International Law & International Humanitarian Law (Treaties, UN, ICJ, Extradition)',
      'Law of Crimes (IPC general principles, Inchoate crimes, Offences against body & property)',
      'Law of Torts & Consumer Protection (Negligence, Strict liability, CPA 2019)',
      'Commercial Law (Indian Contract Act 1872, Companies Act 2013, Partnership)',
      'Family Law (Marriage, Divorce, Succession, Maintenance across personal laws)',
      'Environment & Human Rights Law (EPA 1986, NGT, Human Rights Act 1993)',
      'Intellectual Property Rights & IT Law (Copyright, Patents, Trademarks, Cybercrimes)'
    ],
    recommendedOer: [
      { title: 'UGC e-PG Pathshala Law (NLUs Collaboration)', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', type: 'Textbook Modules' },
      { title: 'IGNOU LL.M. Courseware & Human Rights Modules', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in', type: 'Self-Learning Material' },
      { title: 'Indian Kanoon Judicial Precedents', platform: 'Indian Kanoon', url: 'https://indiankanoon.org', type: 'Judicial Precedents' }
    ],
    studyMaterialNote: 'Curated in collaboration with Indian NLUs via e-PG Pathshala and Indian Kanoon judicial archives.',
    roadmapAvailable: true
  }
];

export const all83SubjectsRepository = {
  title: 'Complete 83 Subjects Syllabus Repository',
  description: 'Official subject-wise updated syllabi for all 83 disciplines are maintained directly by the University Grants Commission (UGC) and National Testing Agency (NTA).',
  officialLinks: [
    {
      title: 'UGC NET Official Subject Syllabi Archive',
      url: 'https://ugcnetonline.in/syllabus-new.php',
      provider: 'University Grants Commission (UGC)'
    },
    {
      title: 'NTA UGC-NET Information Portal',
      url: 'https://ugcnet.nta.ac.in',
      provider: 'National Testing Agency (NTA)'
    }
  ]
};

// ============================================================================
// 4. COMPUTER SCIENCE & APPLICATIONS (SUBJECT 87) - 10 CORE UNITS
// ============================================================================

export const cs10Units: UgcCsUnit[] = [
  {
    id: 1,
    name: 'Discrete Structures & Optimization',
    topics: ['Set theory, Relations, Functions', 'Propositional and Predicate Logic', 'Group theory, Rings, Fields', 'Combinatorics, Permutations & Combinations', 'Graph theory: Euler & Hamiltonian graphs, Trees, Matching', 'Linear Programming Problem (LPP), Simplex method, Duality'],
    studyResources: [
      { title: 'NPTEL Discrete Mathematics by IIT Ropar', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'e-PG Pathshala CS Paper 01: Discrete Mathematics', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in' }
    ],
    recommendedSequence: 1,
    notes: 'Mathematical foundation for Algorithms and TOC. Focus on Graph theory theorems and Propositional logic equivalence.',
    pyqFocus: 'Duality in LPP, Graph isomorphism, Planar graphs Euler formula (V - E + F = 2), Equivalence relations.'
  },
  {
    id: 2,
    name: 'Computer System Architecture',
    topics: ['Digital logic, Boolean algebra, Minimization (K-Maps)', 'Combinational & Sequential circuits, Flip-flops, Counters', 'CPU organization, Register transfer language, Microoperations', 'Microprogramming (Hardwired vs Microprogrammed control)', 'Memory hierarchy: Cache mapping (Direct, Associative, Set-associative), Virtual memory', 'Pipelining, Instruction hazard, Speedup ratio'],
    studyResources: [
      { title: 'NPTEL Computer Organization and Architecture by IIT Kharagpur', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'IGNOU MCA: Computer Organization (MCS-012)', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in/handle/123456789/101' }
    ],
    recommendedSequence: 2,
    notes: 'High numerical frequency in Cache memory hit/miss calculations and Pipelining throughput/speedup.',
    pyqFocus: 'Cache hit ratio & effective memory access time, Pipelining speedup formula, K-map simplification, Booth’s algorithm.'
  },
  {
    id: 3,
    name: 'Programming Languages & Computer Graphics',
    topics: ['C/C++ core syntax, pointers, memory allocation', 'Object-Oriented Programming (Polymorphism, Inheritance, Encapsulation)', 'Display devices, Raster scan, Random scan', 'Line drawing algorithms (DDA, Bresenham)', '2D & 3D Geometric Transformations (Translation, Rotation, Scaling, Shearing)', 'Clipping algorithms: Cohen-Sutherland line clipping, Sutherland-Hodgman polygon clipping'],
    studyResources: [
      { title: 'NPTEL Computer Graphics by IIT Guwahati', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'MIT OCW Introduction to C and C++', platform: 'MIT OCW', url: 'https://ocw.mit.edu' }
    ],
    recommendedSequence: 4,
    notes: '2D matrix transformation multiplication and clipping out-code evaluations are guaranteed exam questions.',
    pyqFocus: 'Cohen-Sutherland 4-bit region outcodes, Matrix representation for composite transformations, Virtual functions in C++.'
  },
  {
    id: 4,
    name: 'Database Management Systems',
    topics: ['ER model, Extended ER features', 'Relational algebra & Relational calculus', 'SQL: DDL, DML, Nested queries, Joins, Triggers', 'Normalization: Functional dependencies, 1NF, 2NF, 3NF, BCNF, 4NF, 5NF, Lossless join decomposition', 'Transactions & Concurrency control: ACID properties, Serializability, 2PL, Timestamp ordering', 'NoSQL databases and Big Data concepts'],
    studyResources: [
      { title: 'NPTEL Database Management Systems by IIT Kharagpur', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'e-PG Pathshala CS Paper 04: Database Systems', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in' }
    ],
    recommendedSequence: 3,
    notes: 'Normalization testing (BCNF vs 3NF dependency preservation) and Conflict Serializability precedence graphs.',
    pyqFocus: 'Finding Candidate Keys from FDs, Testing highest normal form, Conflict & View serializability, SQL nested subqueries.'
  },
  {
    id: 5,
    name: 'System Software & Operating Systems',
    topics: ['Assemblers, Linkers, Loaders, Compilers basics', 'Process management: Process states, PCB, Threads', 'CPU scheduling algorithms (FCFS, SJF, SRTF, Round Robin, Priority)', 'Process Synchronization: Critical Section problem, Peterson’s solution, Semaphores, Monitors', 'Deadlocks: Necessary conditions, Banker’s algorithm, Deadlock prevention, detection & recovery', 'Virtual memory: Paging, Segmentation, Page replacement algorithms (FIFO, LRU, Optimal)', 'Storage & Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN)'],
    studyResources: [
      { title: 'NPTEL Operating Systems by IIT Madras', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'MIT OCW Operating System Engineering', platform: 'MIT OCW', url: 'https://ocw.mit.edu' }
    ],
    recommendedSequence: 5,
    notes: 'High scoring unit. Master Gantt charts for CPU scheduling, Banker’s safe state matrices, and page fault counters.',
    pyqFocus: 'Banker’s algorithm resource request algorithm, Page faults calculation for LRU vs FIFO (Belady’s anomaly), Semaphore wait/signal.'
  },
  {
    id: 6,
    name: 'Software Engineering',
    topics: ['Software Process Models (Waterfall, Prototyping, Spiral, RAD, Agile, Scrum)', 'Requirements Engineering: SRS, Use cases', 'Software Architecture & Design: Coupling and Cohesion', 'Software Testing: Black-box vs White-box, Cyclomatic complexity, Boundary Value Analysis', 'Software Metrics: Lines of Code (LOC), Function Points (FP), COCOMO model (Basic, Intermediate, Detailed)', 'Software Quality & Reliability, Maintenance'],
    studyResources: [
      { title: 'NPTEL Software Engineering by IIT Kharagpur', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'IGNOU MCA: Software Engineering (MCS-034)', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in' }
    ],
    recommendedSequence: 7,
    notes: 'McCabe’s Cyclomatic complexity calculation V(G) = E - N + 2P and COCOMO effort estimations.',
    pyqFocus: 'Cyclomatic complexity calculation from control flow graph, Types of Cohesion (Coincidental to Functional) & Coupling, COCOMO formulas.'
  },
  {
    id: 7,
    name: 'Data Structures & Algorithms',
    topics: ['Asymptotic notations: Big O, Big Omega, Theta properties', 'Linear and non-linear data structures (Arrays, Stacks, Queues, Linked Lists, Trees, Graphs)', 'Divide and Conquer: Merge sort, Quick sort, Master Theorem', 'Greedy Algorithms: Huffman coding, Fractional Knapsack, Prim’s & Kruskal’s MST', 'Dynamic Programming: 0/1 Knapsack, LCS, Matrix Chain Multiplication, Floyd-Warshall', 'Graph algorithms: BFS, DFS, Dijkstra, Bellman-Ford, Topological Sort', 'Complexity theory: P, NP, NP-Complete, NP-Hard problems'],
    studyResources: [
      { title: 'NPTEL Design and Analysis of Algorithms by IIT Madras', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'MIT OCW Introduction to Algorithms (6.006 / 6.046)', platform: 'MIT OCW', url: 'https://ocw.mit.edu' }
    ],
    recommendedSequence: 6,
    notes: 'Master Theorem cases for recurrences and dynamic programming recurrence relations.',
    pyqFocus: 'Recurrence solving using Master Theorem, Huffman code length, Dijkstra time complexity, Identifying NP-Complete problems.'
  },
  {
    id: 8,
    name: 'Theory of Computation & Compilers',
    topics: ['Chomsky Hierarchy of Languages (Type 0, 1, 2, 3)', 'Finite Automata: DFA, NFA, Minimization of DFA, Regular Expressions, Pumping Lemma for Regular Languages', 'Context-Free Grammars (CFG), Ambiguity, Chomsky Normal Form (CNF), Greibach Normal Form (GNF)', 'Pushdown Automata (PDA), Deterministic vs Non-Deterministic PDA', 'Turing Machines (TM), Variations of TM, Church-Turing thesis', 'Decidability & Undecidability: Halting problem, Post Correspondence Problem (PCP)', 'Compiler Design: Lexical analysis, Parsing (LL(1), LR(0), SLR(1), LALR(1), CLR(1)), Intermediate code generation, Code optimization'],
    studyResources: [
      { title: 'NPTEL Theory of Computation by IIT Kanpur', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'NPTEL Compiler Design by IIT Kharagpur', platform: 'NPTEL', url: 'https://nptel.ac.in' }
    ],
    recommendedSequence: 8,
    notes: 'Closure properties table of Formal Languages and Parser power hierarchy (LR(0) < SLR(1) < LALR(1) < CLR(1)).',
    pyqFocus: 'Closure properties of Regular/CFL/CSL/Recursive/RE languages, Decidability properties, FIRST and FOLLOW sets, LR parsing tables.'
  },
  {
    id: 9,
    name: 'Data Communication & Computer Networks',
    topics: ['OSI & TCP/IP Reference Models, Layer functions', 'Physical Layer: Transmission media, Modulation, Switching', 'Data Link Layer: Framing, Error detection (CRC, Checksum), Flow control (Stop-and-Wait, Go-Back-N, Selective Repeat)', 'MAC Sublayer: Pure & Slotted ALOHA, CSMA/CD, CSMA/CA, Ethernet', 'Network Layer: IPv4 & IPv6 addressing, Subnetting, CIDR, Routing algorithms (Distance Vector, Link State / OSPF, BGP)', 'Transport Layer: TCP, UDP, Flow control, Congestion control algorithms (Leaky Bucket, Token Bucket)', 'Application Layer: DNS, SMTP, FTP, HTTP, HTTPS', 'Network Security & Cryptography: RSA, DES, AES, Digital Signatures, Firewalls'],
    studyResources: [
      { title: 'NPTEL Computer Networks by IIT Kharagpur', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'e-PG Pathshala CS Paper 09: Computer Networks', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in' }
    ],
    recommendedSequence: 9,
    notes: 'Subnetting calculations (CIDR prefix, number of valid hosts, network/broadcast IP) and CRC division.',
    pyqFocus: 'IPv4 Subnet mask and number of subnets, Sliding window protocol efficiency, Leaky/Token bucket rate, RSA encryption keys.'
  },
  {
    id: 10,
    name: 'Artificial Intelligence',
    topics: ['AI foundations, State-space representation, Production systems', 'Uninformed search: BFS, DFS, Uniform Cost Search', 'Informed search: Best-First Search, A* algorithm, AO* algorithm, Heuristic admissibility', 'Game playing: Minimax algorithm, Alpha-Beta pruning', 'Knowledge Representation: Propositional & First-Order Predicate Logic, Resolution, Semantic networks, Frames', 'Uncertainty reasoning: Probabilistic reasoning, Bayes theorem, Fuzzy Sets and Fuzzy Logic operations', 'Genetic Algorithms: Crossover, Mutation, Fitness function', 'Artificial Neural Networks: Perceptron, Multilayer Perceptron, Backpropagation algorithm'],
    studyResources: [
      { title: 'NPTEL Artificial Intelligence by IIT Madras', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'MIT OCW Artificial Intelligence (6.034)', platform: 'MIT OCW', url: 'https://ocw.mit.edu' }
    ],
    recommendedSequence: 10,
    notes: 'Alpha-Beta pruning branch elimination conditions and Fuzzy set operations (Union, Intersection, Complement).',
    pyqFocus: 'Alpha-beta pruning cut-offs, Admissibility of A* heuristics (h(n) <= h*(n)), Fuzzy set membership calculations, Bayes theorem probabilities.'
  }
];

// ============================================================================
// 5. 6-MONTH MASTER ROADMAP (24 WEEKS) - 5 PHASES & DETAILED WEEKS
// ============================================================================

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    title: 'Phase 1: Foundation & Paper 1 Bedrock',
    subtitle: 'Build unbreakable theoretical foundation in Paper 1 while covering 30% of Paper 2',
    weeksRange: 'Weeks 1–6',
    startWeek: 1,
    endWeek: 6,
    goal: 'Build an unbreakable foundation in theoretical Paper 1 units while initiating the first 30% of Paper 2.',
    color: 'emerald',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/20',
    borderLight: 'border-emerald-200',
    borderDark: 'dark:border-emerald-800/40'
  },
  {
    id: 2,
    title: 'Phase 2: Core Domain & Quant Mastery',
    subtitle: 'Conquer numerical, analytical, and logical units in Paper 1 while covering 70% of Paper 2',
    weeksRange: 'Weeks 7–14',
    startWeek: 7,
    endWeek: 14,
    goal: 'Conquer numerical, analytical, and logical units in Paper 1 while covering 70% of Paper 2.',
    color: 'blue',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950/20',
    borderLight: 'border-blue-200',
    borderDark: 'dark:border-blue-800/40'
  },
  {
    id: 3,
    title: 'Phase 3: Deep Synthesis & Revision',
    subtitle: 'Cover remaining Paper 1 & Paper 2 units and complete first full syllabus revision cycle',
    weeksRange: 'Weeks 15–18',
    startWeek: 15,
    endWeek: 18,
    goal: 'Cover the remaining Paper 1 & Paper 2 units and complete the first full syllabus revision cycle.',
    color: 'amber',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/20',
    borderLight: 'border-amber-200',
    borderDark: 'dark:border-amber-800/40'
  },
  {
    id: 4,
    title: 'Phase 4: PYQ Reverse Engineering',
    subtitle: 'Analyze 10 exam cycles (5 years of bi-annual papers) to internalize the examiner’s mental model',
    weeksRange: 'Weeks 19–22',
    startWeek: 19,
    endWeek: 22,
    goal: 'Analyze the last 10 exam cycles (5 years of bi-annual papers) to internalize the examiner’s mental model.',
    color: 'purple',
    bgLight: 'bg-purple-50',
    bgDark: 'dark:bg-purple-950/20',
    borderLight: 'border-purple-200',
    borderDark: 'dark:border-purple-800/40'
  },
  {
    id: 5,
    title: 'Phase 5: CBT Mock Marathon & Polish',
    subtitle: 'Peak mental conditioning, strict 3-hour time simulation, and zero-defect accuracy',
    weeksRange: 'Weeks 23–24',
    startWeek: 23,
    endWeek: 24,
    goal: 'Peak mental conditioning, strict 3-hour time simulation, and zero-defect accuracy.',
    color: 'rose',
    bgLight: 'bg-rose-50',
    bgDark: 'dark:bg-rose-950/20',
    borderLight: 'border-rose-200',
    borderDark: 'dark:border-rose-800/40'
  }
];

export const roadmap24Weeks: RoadmapWeek[] = [
  // Phase 1 (Weeks 1 to 6)
  {
    week: 1,
    phaseId: 1,
    phaseName: 'Phase 1: Foundation & Paper 1 Bedrock',
    paper1Focus: 'Unit I (Teaching Aptitude) — Levels of teaching, Learner characteristics, Bloom’s Taxonomy',
    paper2Focus: 'Unit 1 (Fundamentals / Foundational Concepts)',
    activity: 'Read e-PG Pathshala Modules, solve 50 PYQs on Teaching Aptitude.',
    deliverable: '50 solved PYQs + Teaching levels summary table'
  },
  {
    week: 2,
    phaseId: 1,
    phaseName: 'Phase 1: Foundation & Paper 1 Bedrock',
    paper1Focus: 'Unit I (Teaching Aptitude) — Methods of teaching, CBCS, MOOCs/SWAYAM, Evaluation systems',
    paper2Focus: 'Unit 1 completion & Unit 2 start',
    activity: 'Prepare concise 2-page summary sheets for Evaluation methods.',
    deliverable: 'Evaluation methods cheat-sheet + CBCS notes'
  },
  {
    week: 3,
    phaseId: 1,
    phaseName: 'Phase 1: Foundation & Paper 1 Bedrock',
    paper1Focus: 'Unit II (Research Aptitude) — Positivism vs. Post-positivism, Types of research, Steps of research',
    paper2Focus: 'Unit 2 deep dive',
    activity: 'Tabulate all research types with real-world research problem examples.',
    deliverable: 'Research types matrix with empirical vs qualitative contrasts'
  },
  {
    week: 4,
    phaseId: 1,
    phaseName: 'Phase 1: Foundation & Paper 1 Bedrock',
    paper1Focus: 'Unit II (Research Aptitude) — Sampling methods, Hypotheses testing (z, t, F tests, Type I/II errors), Thesis formatting, Research ethics & Plagiarism norms',
    paper2Focus: 'Unit 2 completion & Unit 3 start',
    activity: 'Solve 60 PYQs on Research Aptitude.',
    deliverable: '60 solved PYQs + Plagiarism levels (0–3) reference sheet'
  },
  {
    week: 5,
    phaseId: 1,
    phaseName: 'Phase 1: Foundation & Paper 1 Bedrock',
    paper1Focus: 'Unit IV (Communication) — Types, models, non-verbal (kinesics, proxemics), classroom dynamics & barriers',
    paper2Focus: 'Unit 3 completion',
    activity: 'Make a flow chart of communication models (Shannon-Weaver, Berlo, Schramm).',
    deliverable: 'Flowchart of 4 communication models + Non-verbal dimensions'
  },
  {
    week: 6,
    phaseId: 1,
    phaseName: 'Phase 1: Foundation & Paper 1 Bedrock',
    paper1Focus: 'Unit III (Reading Comprehension) + Phase 1 Integrated Revision',
    paper2Focus: 'Consolidate Units 1, 2, and 3',
    activity: '5 Reading Comprehension speed drills + 100-question Paper 1 combined test.',
    deliverable: 'Phase 1 Assessment: 100-question combined test score & error analysis'
  },

  // Phase 2 (Weeks 7 to 14)
  {
    week: 7,
    phaseId: 2,
    phaseName: 'Phase 2: Core Domain & Quant Mastery',
    paper1Focus: 'Unit V (Mathematical Aptitude) — Number series, Letter series, Coding-Decoding, Blood relations',
    paper2Focus: 'Unit 4 (Domain Core)',
    activity: 'Practice alphabet numerical rank charts and family tree diagrams.',
    deliverable: 'Speed-coding shortcuts + 40 series & family relation drills'
  },
  {
    week: 8,
    phaseId: 2,
    phaseName: 'Phase 2: Core Domain & Quant Mastery',
    paper1Focus: 'Unit V (Mathematical Aptitude) — Percentages, Ratios, Profit & Loss, Simple and Compound Interest, Speed & Distance',
    paper2Focus: 'Unit 4 completion & Unit 5 start',
    activity: 'Memorize fractional equivalents and speed-math shortcuts.',
    deliverable: 'Percentage-Fraction conversion table memorized + 50 math drills'
  },
  {
    week: 9,
    phaseId: 2,
    phaseName: 'Phase 2: Core Domain & Quant Mastery',
    paper1Focus: 'Unit VII (Data Interpretation) — Table charts, Pie charts, Bar graphs',
    paper2Focus: 'Unit 5 completion',
    activity: 'Practice 2 complex table DI sets daily from 2021–2024 papers.',
    deliverable: '14 completed Table DI sets with calculation time under 7 mins/set'
  },
  {
    week: 10,
    phaseId: 2,
    phaseName: 'Phase 2: Core Domain & Quant Mastery',
    paper1Focus: 'Unit VI (Logical Reasoning - Western) — Square of Opposition, Categorical Propositions, Syllogisms, Mood & Figure',
    paper2Focus: 'Unit 6 (Domain Core)',
    activity: 'Draw the Square of Opposition chart; practice 40 truth-value deduction questions.',
    deliverable: 'Square of Opposition master diagram + 40 deduction problems'
  },
  {
    week: 11,
    phaseId: 2,
    phaseName: 'Phase 2: Core Domain & Quant Mastery',
    paper1Focus: 'Unit VI (Logical Reasoning - Indian Logic) — 6 Pramanas, Vyapti, Hetvabhasa (Fallacies of Inference)',
    paper2Focus: 'Unit 6 completion & Unit 7 start',
    activity: 'Build flashcards for all 5 Hetvabhasa types with classical Sanskrit examples.',
    deliverable: '5 Hetvabhasa flashcards (Savyabhichara, Viruddha, etc.) + 30 PYQs'
  },
  {
    week: 12,
    phaseId: 2,
    phaseName: 'Phase 2: Core Domain & Quant Mastery',
    paper1Focus: 'Unit VIII (ICT) — Hardware, Memory hierarchy, Binary/Hexadecimal conversions, Internet, Protocols',
    paper2Focus: 'Unit 7 completion',
    activity: 'Tabulate all government digital education portals (SWAYAM, NDL, e-Yantra, Shodhganga).',
    deliverable: 'Government ICT portals catalog + Binary/Hex conversion sheets'
  },
  {
    week: 13,
    phaseId: 2,
    phaseName: 'Phase 2: Core Domain & Quant Mastery',
    paper1Focus: 'Unit IX (People, Development & Environment) — SDGs vs. MDGs, Air/Water pollutants, AQI parameters',
    paper2Focus: 'Unit 8 start',
    activity: 'Tabulate all 17 SDGs with targets and 8 AQI pollutants with health effects.',
    deliverable: '17 SDGs & 169 targets reference matrix + AQI pollutant chart'
  },
  {
    week: 14,
    phaseId: 2,
    phaseName: 'Phase 2: Core Domain & Quant Mastery',
    paper1Focus: 'Unit IX (People, Development & Environment) — NAPCC 8 Missions, Montreal, Kyoto, Paris Agreements, ISA, Energy targets',
    paper2Focus: 'Unit 8 completion',
    activity: 'Make a timeline chart of global environmental conventions from Stockholm 1972 to Paris 2015.',
    deliverable: 'Conventions timeline + NAPCC 8 missions summary'
  },

  // Phase 3 (Weeks 15 to 18)
  {
    week: 15,
    phaseId: 3,
    phaseName: 'Phase 3: Deep Synthesis & Revision',
    paper1Focus: 'Unit X (Higher Education System) — Ancient universities, British education committees (Macaulay to Sargent)',
    paper2Focus: 'Unit 9 start',
    activity: 'Chronologically map ancient universities and pre-independence commissions.',
    deliverable: 'Pre-independence education commissions chronological table'
  },
  {
    week: 16,
    phaseId: 3,
    phaseName: 'Phase 3: Deep Synthesis & Revision',
    paper1Focus: 'Unit X (Higher Education System) — Post-independence commissions, NEP 2020 structure, Statutory bodies (UGC, AICTE, NAAC, NIRF)',
    paper2Focus: 'Unit 9 completion & Unit 10 start',
    activity: 'Deconstruct NEP 2020 5+3+3+4 architecture and HECI 4 verticals.',
    deliverable: 'NEP 2020 structure sheet + NIRF ranking parameters summary'
  },
  {
    week: 17,
    phaseId: 3,
    phaseName: 'Phase 3: Deep Synthesis & Revision',
    paper1Focus: 'Rapid revision of Units 1 to 5; Formula drills',
    paper2Focus: 'Unit 10 completion (Syllabus 100% completed)',
    activity: 'Conduct comprehensive formula drills and Paper 1 Units 1–5 self-test.',
    deliverable: 'Paper 2 full syllabus completion milestone + Units 1–5 revision notes'
  },
  {
    week: 18,
    phaseId: 3,
    phaseName: 'Phase 3: Deep Synthesis & Revision',
    paper1Focus: 'Rapid revision of Units 6 to 10; Government scheme updates',
    paper2Focus: 'First holistic revision of Units 1 to 5',
    activity: 'Take a full-length baseline 180-minute CBT Mock test.',
    deliverable: 'Full-length 180-minute Baseline CBT Mock score & diagnostics'
  },

  // Phase 4 (Weeks 19 to 22)
  {
    week: 19,
    phaseId: 4,
    phaseName: 'Phase 4: PYQ Reverse Engineering',
    paper1Focus: 'Solve UGC-NET 2024 (June & Dec Cycles) — Paper 1',
    paper2Focus: 'Solve UGC-NET 2024 (June & Dec Cycles) — Paper 2',
    activity: 'Document unknown terms, formulas, and distractor options in an Error Log Notebook.',
    deliverable: '2024 exam papers solved + Initial Error Log entries'
  },
  {
    week: 20,
    phaseId: 4,
    phaseName: 'Phase 4: PYQ Reverse Engineering',
    paper1Focus: 'Solve UGC-NET 2023 (June & Dec Cycles) — Paper 1',
    paper2Focus: 'Solve UGC-NET 2023 (June & Dec Cycles) — Paper 2',
    activity: 'Deep dive into Assertion-Reason (3-step BECAUSE rule) and matching question typologies.',
    deliverable: '2023 exam papers solved + Assertion-Reason master practice'
  },
  {
    week: 21,
    phaseId: 4,
    phaseName: 'Phase 4: PYQ Reverse Engineering',
    paper1Focus: 'Solve UGC-NET 2022 (Merged Cycles) — Focus on Indian Logic & NEP 2020',
    paper2Focus: 'Solve UGC-NET 2022 (Merged Cycles) — Domain depth',
    activity: 'Map repeated question themes across 2022–2024.',
    deliverable: '2022 exam papers solved + High-yield recurring concepts map'
  },
  {
    week: 22,
    phaseId: 4,
    phaseName: 'Phase 4: PYQ Reverse Engineering',
    paper1Focus: 'Solve UGC-NET 2021 & 2020 cycles — Timed section-wise practice',
    paper2Focus: 'Solve UGC-NET 2021 & 2020 cycles — Domain problem sets',
    activity: 'Timed section-wise sprints against a 60-minute Paper 1 timer.',
    deliverable: '2021 & 2020 papers completed + Timed section speed report'
  },

  // Phase 5 (Weeks 23 to 24)
  {
    week: 23,
    phaseId: 5,
    phaseName: 'Phase 5: CBT Mock Marathon & Polish',
    paper1Focus: 'Revise high-frequency tables (Square of Opposition, SDGs, NEP 2020, Referencing)',
    paper2Focus: 'Post-mock autopsy of weak domain areas',
    activity: 'Take 3 Full-Length 180-Minute Mocks on NTA CBT Interface. Conduct 2-hour post-mock autopsy categorizing errors into Conceptual, Misreading, or Calculation.',
    deliverable: '3 Full CBT simulations + Error categorization autopsy for each'
  },
  {
    week: 24,
    phaseId: 5,
    phaseName: 'Phase 5: CBT Mock Marathon & Polish',
    paper1Focus: 'Read only handwritten micro-notes, formula sheets, and Error Log Notebook',
    paper2Focus: 'Key theorems, core definitions, and micro-notes only',
    activity: 'Take 2 Full-Length Mocks. Cease heavy problem-solving 24 hours prior to the test; mental calibration and rest.',
    deliverable: '2 Final CBT Mocks completed + Final review of Error Log + Exam Readiness'
  }
];

// ============================================================================
// 6. 90-DAY EXPRESS FAST-TRACK ROADMAP (12 WEEKS)
// ============================================================================

export const roadmap90Days: Roadmap90DayWeek[] = [
  {
    week: 'W1',
    focusArea: 'Foundation',
    paper1Priority: 'Unit 1 (Teaching Aptitude)',
    paper2Priority: 'High-Weightage Units 1 & 2',
    deliverable: '40 PYQs + Notes'
  },
  {
    week: 'W2',
    focusArea: 'Research Rigor',
    paper1Priority: 'Unit 2 (Research Aptitude)',
    paper2Priority: 'Unit 3',
    deliverable: 'Sampling & Ethics Matrix'
  },
  {
    week: 'W3',
    focusArea: 'Reasoning Core',
    paper1Priority: 'Unit 5 (Math) & Unit 3 (Comprehension)',
    paper2Priority: 'Unit 4',
    deliverable: 'Speed-math table + 5 RC sets'
  },
  {
    week: 'W4',
    focusArea: 'Logic & Fallacies',
    paper1Priority: 'Unit 6 (Western & Indian Logic)',
    paper2Priority: 'Unit 5',
    deliverable: 'Square of Opposition + Hetvabhasa'
  },
  {
    week: 'W5',
    focusArea: 'DI & Data Skills',
    paper1Priority: 'Unit 7 (Data Interpretation)',
    paper2Priority: 'Unit 6',
    deliverable: '15 Table DI Problem Sets'
  },
  {
    week: 'W6',
    focusArea: 'Digital & ICT',
    paper1Priority: 'Unit 8 (ICT Concepts & Initiatives)',
    paper2Priority: 'Unit 7',
    deliverable: 'Memory hierarchy + Portals list'
  },
  {
    week: 'W7',
    focusArea: 'Ecology & Goals',
    paper1Priority: 'Unit 9 (People, Dev & Environment)',
    paper2Priority: 'Unit 8',
    deliverable: 'SDGs + Protocols cheat sheet'
  },
  {
    week: 'W8',
    focusArea: 'Higher Education',
    paper1Priority: 'Unit 10 (Ancient Ed & NEP 2020)',
    paper2Priority: 'Unit 9',
    deliverable: 'Commissions timeline + NEP 2020'
  },
  {
    week: 'W9',
    focusArea: 'Domain Finish',
    paper1Priority: 'Rapid Revision (Units 1 to 5)',
    paper2Priority: 'Unit 10 completion',
    deliverable: 'Full Syllabus Covered'
  },
  {
    week: 'W10',
    focusArea: 'PYQ Sprint 1',
    paper1Priority: '2023–2024 Exam Papers',
    paper2Priority: 'Domain PYQs 2023–2024',
    deliverable: 'Error Log Analysis'
  },
  {
    week: 'W11',
    focusArea: 'PYQ Sprint 2',
    paper1Priority: '2021–2022 Exam Papers',
    paper2Priority: 'Domain PYQs 2021–2022',
    deliverable: 'Weak-area reinforcement'
  },
  {
    week: 'W12',
    focusArea: 'Mock Finale',
    paper1Priority: '4 Full-Length CBT Simulations',
    paper2Priority: 'High-Yield Micro-Revision',
    deliverable: 'Time & Exam Readiness'
  }
];

export const roadmapComparison = [
  {
    parameter: 'Duration',
    sixMonthPlan: '24 Weeks (approx. 180 days)',
    ninetyDayPlan: '12 Weeks (approx. 90 days)'
  },
  {
    parameter: 'Target Aspirant Profile',
    sixMonthPlan: 'Full-time aspirants seeking comprehensive conceptual mastery and top JRF cutoffs',
    ninetyDayPlan: 'Working professionals, PG final-year students, or repeat candidates under time constraints'
  },
  {
    parameter: 'Daily Study Intensity',
    sixMonthPlan: '6–9 Hours / day (Calibrated pace)',
    ninetyDayPlan: '4–8 Hours / day (High-intensity sprint)'
  },
  {
    parameter: 'Coverage Strategy',
    sixMonthPlan: 'Deep textbook reading via e-PG Pathshala, extensive note-making across all 10 units of Paper 1 and full Paper 2',
    ninetyDayPlan: 'High-weightage topic prioritization, condensed syllabus matrices, and rapid summary modules'
  },
  {
    parameter: 'PYQ Phase',
    sixMonthPlan: 'Dedicated 4-week reverse engineering (2020–2024 complete papers across 10 exam cycles)',
    ninetyDayPlan: '2-week rapid sprint focusing on 2021–2024 high-frequency question patterns'
  },
  {
    parameter: 'Mock-Test Phase',
    sixMonthPlan: '5 Full-length 180-minute CBT simulations with 2-hour autopsy per test in Weeks 23–24',
    ninetyDayPlan: '4 Full-length simulations concentrated in Week 12'
  }
];

// ============================================================================
// 7. DAILY STUDY TIMETABLES (FULL-TIME VS WORKING PROFESSIONAL)
// ============================================================================

export const fullTimeSchedule: DailyScheduleSlot[] = [
  {
    timeSlot: '07:00 – 09:00',
    duration: '2.0 hrs',
    component: 'Paper 1 Concept Study',
    activity: 'Theory reading (Higher Ed / People & Env / Teaching / Research)',
    type: 'study-p1'
  },
  {
    timeSlot: '09:00 – 10:00',
    duration: '1.0 hr',
    component: 'Breakfast & Mind Refresh',
    activity: 'Healthy physical break, brisk walk',
    type: 'break'
  },
  {
    timeSlot: '10:00 – 12:30',
    duration: '2.5 hrs',
    component: 'Paper 2 Core Subject Part 1',
    activity: 'Primary subject theory, e-PG Pathshala text reading & note making',
    type: 'study-p2'
  },
  {
    timeSlot: '12:30 – 14:00',
    duration: '1.5 hrs',
    component: 'Lunch & Rest',
    activity: 'Re-energize and rest',
    type: 'break'
  },
  {
    timeSlot: '14:00 – 15:30',
    duration: '1.5 hrs',
    component: 'Paper 1 Analytical Skills',
    activity: 'Math reasoning, DI sets, Indian logic questions, Syllogisms',
    type: 'study-p1'
  },
  {
    timeSlot: '15:30 – 16:00',
    duration: '0.5 hr',
    component: 'Tea Break',
    activity: 'Offline break',
    type: 'break'
  },
  {
    timeSlot: '16:00 – 18:30',
    duration: '2.5 hrs',
    component: 'Paper 2 Core Subject Part 2',
    activity: 'Advanced domain problems, theorems, case studies, or critical theory',
    type: 'study-p2'
  },
  {
    timeSlot: '18:30 – 19:30',
    duration: '1.0 hr',
    component: 'Exercise / Outdoor Leisure',
    activity: 'Mental decompaction & physical exercise',
    type: 'break'
  },
  {
    timeSlot: '19:30 – 21:00',
    duration: '1.5 hrs',
    component: 'PYQ Drill & Active Recall',
    activity: 'Solving 30–50 mixed MCQs against a timer; logging errors',
    type: 'practice'
  },
  {
    timeSlot: '21:00 – 22:00',
    duration: '1.0 hr',
    component: 'Dinner & Wind Down',
    activity: 'Dinner and relaxation',
    type: 'break'
  },
  {
    timeSlot: '22:00 – 22:30',
    duration: '0.5 hr',
    component: 'Daily Wrap-up & Flashcards',
    activity: 'Rapid revision of daily formulas and factual dates',
    type: 'revision'
  }
];

export const workingProfessionalSchedule = {
  morningSlot: {
    time: '06:00 – 07:30',
    duration: '1.5 Hours',
    title: 'Pure Paper 1 High-Yield Theory',
    description: 'Research Aptitude, Teaching Aptitude, Higher Education, or ICT. Early morning focus avoids workplace exhaustion.'
  },
  transitMicroBreaks: {
    time: 'During Commute & Lunch',
    duration: '30–45 Minutes Total',
    title: 'Flashcards & Current Awareness',
    description: 'Revise flashcards on mobile (Anki/Notion), review current affairs for Higher Education/Environment, listen to CEC UGC audio lectures.'
  },
  eveningSlot: {
    time: '20:30 – 22:45',
    duration: '2.25 Hours',
    title: 'Paper 2 Deep-Dive + Analytical Practice',
    description: 'Paper 2 Subject deep-dive (1.5 hours) + 1 DI set and 10 PYQs (45 minutes).'
  },
  weekendSprint: {
    time: 'Saturdays & Sundays',
    duration: '8 Hours / Day',
    title: 'Weekend Marathon',
    description: 'Saturday: Dedicated to Paper 2 heavy modules + 1 full-length Paper 1 sectional mock. Sunday: 3-hour full-length CBT simulation + 2-hour autopsy + consolidating the Error Log.'
  }
};

// ============================================================================
// 8. PYQ REVERSE-ENGINEERING & 3-PASS CBT STRATEGY
// ============================================================================

export const pyqTypologies: PyqTypology[] = [
  {
    id: 'statement-1-2',
    title: 'Statement I & Statement II',
    subtitle: 'Truth-Value Evaluation',
    nature: 'Evaluates fine conceptual distinctions. Both statements may be independent or related assertions from the syllabus.',
    strategy: [
      'Read each statement independently as an isolated True/False statement first.',
      'Do not assume Statement II is automatically true if Statement I is true.',
      'Check for absolute quantifiers like "always", "never", "only", which frequently indicate falsity in social science contexts.'
    ],
    practiceAction: 'Practice evaluating 30 Statement I & II pairs in Higher Education & Teaching Aptitude.'
  },
  {
    id: 'assertion-reason',
    title: 'Assertion (A) & Reason (R)',
    subtitle: 'Cause-and-Effect Relationship',
    nature: 'Tests deep causal comprehension and relational reasoning rather than isolated rote memorization.',
    strategy: [
      'Step 1: Determine if Assertion (A) is factually True or False.',
      'Step 2: Determine if Reason (R) is factually True or False.',
      'Step 3: If both are True, insert the word "BECAUSE" between (A) and (R). If the sentence reads logically and provides the genuine causal explanation for (A), select "Both (A) and (R) are correct and (R) is the correct explanation of (A)". Otherwise, select "Not the correct explanation".'
    ],
    practiceAction: 'Apply the 3-step BECAUSE test on 25 Assertion-Reason questions from Research Aptitude & Environment.'
  },
  {
    id: 'match-columns',
    title: 'Match the Columns',
    subtitle: 'Thinker, Theory, Commission, Year',
    nature: 'Pairs scholars with theories, education commissions with years/recommendations, or protocols with target gases.',
    strategy: [
      'Identify the single pair you are 100% sure about.',
      'Look at the 4 options: often matching just 1 or 2 correct pairs completely eliminates 3 incorrect options.',
      'Verify the second pair to confirm before locking the answer.'
    ],
    practiceAction: 'Practice column matching on ancient universities/scholars and environmental agreements.'
  },
  {
    id: 'chronological-ordering',
    title: 'Chronological Ordering',
    subtitle: 'Historical Events, Commissions, Research Steps',
    nature: 'Tests sequential understanding of pre/post-independence education commissions, environmental summits, or steps of scientific research.',
    strategy: [
      'Anchor technique: Identify the earliest known event and the latest known event in the given list.',
      'Check the options: filtering by the first or last element usually eliminates 2 to 3 answer choices immediately.',
      'Confirm intermediate milestone steps (e.g., Kothari Commission 1964 comes after Mudaliar 1952).'
    ],
    highFrequencyIn: 'Higher Education commissions, environmental summits, communication models, steps of research, historical movements.',
    tactic: 'Anchor technique — identify the earliest and the latest known events in the given list to immediately eliminate 2 to 3 choices.',
    practiceAction: 'Order the 10 pre-independence committees and 8 steps of research chronologically.'
  },
  {
    id: 'multiple-correct',
    title: 'Multiple Correct Options',
    subtitle: 'Choose (A), (B), and (C) only',
    nature: 'Presents 5 statements (A, B, C, D, E) and asks candidate to identify the combination of correct or incorrect items.',
    strategy: [
      'Elimination of False Items: Focus on finding the one statement that is unambiguously FALSE.',
      'Once a false statement (e.g. statement C) is identified, eliminate all answer choices containing (C).',
      'This typically narrows the choice down to the single correct option without needing to evaluate all 5 statements.'
    ],
    practiceAction: 'Solve 20 Multiple Correct items in ICT digital portals and Learner characteristics.'
  }
];

export const pyqPreparationTimeline = [
  {
    year: '2024',
    cycle: 'June & Dec Cycles',
    phaseWeek: 'Week 19',
    focus: 'Paper 1 & Paper 2',
    action: 'Document unknown terms and options in Error Log Notebook.'
  },
  {
    year: '2023',
    cycle: 'June & Dec Cycles',
    phaseWeek: 'Week 20',
    focus: 'Paper 1 & Paper 2',
    action: 'Deep dive into Assertion-Reason and matching patterns.'
  },
  {
    year: '2022',
    cycle: 'Merged Cycles',
    phaseWeek: 'Week 21',
    focus: 'Paper 1 & Paper 2',
    action: 'Focus on Indian Logic, NEP 2020 questions, and domain depth.'
  },
  {
    year: '2021 & 2020',
    cycle: 'Past Cycles',
    phaseWeek: 'Week 22',
    focus: 'Paper 1 & Paper 2',
    action: 'Timed section-wise practice against the clock.'
  }
];

export const cbt3PassStrategy = [
  {
    pass: 'Pass 1',
    time: '0 – 60 mins',
    objective: 'Rapid High-Confidence Clearance',
    questionTypes: 'Immediate, low-calculation, factual, and direct theory questions',
    targetQuestions: '60–70 questions answered',
    action: 'Solve all immediate questions with >90% certainty. Mark doubtful questions as Review. Never get bogged down in long calculations during Pass 1.'
  },
  {
    pass: 'Pass 2',
    time: '60 – 140 mins',
    objective: 'Analytical & Numerical Problem Solving',
    questionTypes: 'Data Interpretation (DI) tables, Mathematical reasoning, Syllogisms, Indian Logic deductions, and Reading Comprehension',
    targetQuestions: 'Solve remaining 60–70 complex questions',
    action: 'Work methodically through table DI, arithmetic calculations, and complex passages. Keep track of intermediate results clearly on rough scratch paper.'
  },
  {
    pass: 'Pass 3',
    time: '140 – 180 mins',
    objective: 'Review & 100% Attempt Guarantee',
    questionTypes: 'Marked for Review questions and unattempted items',
    targetQuestions: 'Final 150/150 questions completed',
    action: 'Revisit all Marked for Review items. Since there is NO negative marking in UGC-NET, ensure 100% of questions (all 150) are marked before the 180-minute countdown ends.'
  }
];

// ============================================================================
// 9. OPEN EDUCATIONAL RESOURCES (OER) DIGITAL LIBRARY DIRECTORY
// ============================================================================

export const oerResources: OerResourceItem[] = [
  {
    id: 'epg-pathshala',
    name: 'UGC e-PG Pathshala',
    provider: 'INFLIBNET / UGC',
    category: 'Textbooks, Modules & E-Tutorials',
    url: 'https://epgp.inflibnet.ac.in',
    highlights: '70+ Post-Graduate subjects, 20,000+ text modules & e-tutorials covering Paper 1 and specialized domain subjects.',
    badge: 'Official UGC Portal',
    types: ['Textbook', 'PDF', 'Video'],
    topics: ['Paper 1', 'Paper 2', 'Teaching', 'Research', 'Higher Education', 'Computer Science']
  },
  {
    id: 'swayam-portal',
    name: 'SWAYAM Portal',
    provider: 'Ministry of Education, Govt. of India',
    category: 'Online MOOCs & Courseware',
    url: 'https://swayam.gov.in',
    highlights: 'Undergraduate & Master’s credit courses across all disciplines taught by premier faculty from IITs, IIMs, and Central Universities.',
    badge: 'National MOOCs Platform',
    types: ['Course', 'Video'],
    topics: ['Paper 1', 'Paper 2', 'Teaching', 'Higher Education']
  },
  {
    id: 'swayam-prabha',
    name: 'SWAYAM PRABHA',
    provider: 'Ministry of Education / INFLIBNET',
    category: 'DTH Educational Channels & Playlists',
    url: 'https://swayamprabha.gov.in',
    highlights: '40 DTH channels broadcasting high-quality collegiate education 24/7 with archived YouTube playlists.',
    badge: '24/7 DTH Channels',
    types: ['Video'],
    topics: ['Paper 1', 'Paper 2', 'Teaching', 'Research', 'Environment']
  },
  {
    id: 'egyankosh',
    name: 'e-GyanKosh',
    provider: 'Indira Gandhi National Open University (IGNOU)',
    category: 'Master’s SLM (Self-Learning Material)',
    url: 'https://egyankosh.ac.in',
    highlights: 'Full downloadable PDFs for MA, M.Com, M.Ed, M.Sc, and MCA programmes with chapter-by-chapter exercises.',
    badge: 'Open University SLM',
    types: ['Textbook', 'PDF'],
    topics: ['Paper 1', 'Paper 2', 'Research', 'Communication', 'Environment', 'Computer Science']
  },
  {
    id: 'ndli',
    name: 'National Digital Library of India (NDLI)',
    provider: 'IIT Kharagpur / Ministry of Education',
    category: 'National Digital Repository',
    url: 'https://ndl.iitkgp.ac.in',
    highlights: 'Millions of academic books, peer-reviewed articles, theses, simulation tools, and video lecture series across all domains.',
    badge: 'National Repository',
    types: ['Repository', 'Textbook', 'PDF'],
    topics: ['Paper 1', 'Paper 2', 'Research', 'ICT']
  },
  {
    id: 'shodhganga',
    name: 'Shodhganga & ShodhGangotri',
    provider: 'INFLIBNET Centre',
    category: 'Indian Research Theses & Synopses',
    url: 'https://shodhganga.inflibnet.ac.in',
    highlights: 'Open access to 500,000+ Ph.D. theses and research synopses for understanding research methodology, referencing, and citations.',
    badge: 'Research Theses Hub',
    types: ['Repository', 'PDF'],
    topics: ['Paper 1', 'Research', 'Higher Education']
  },
  {
    id: 'cec-ugc',
    name: 'Consortium for Educational Communication (CEC)',
    provider: 'UGC Inter-University Centre',
    category: 'Video Lectures & Syllabus Repositories',
    url: 'https://cec.nic.in',
    highlights: 'High-definition collegiate video lectures for Paper 1 units and undergraduate/post-graduate disciplines.',
    badge: 'UGC Inter-University Centre',
    types: ['Video'],
    topics: ['Paper 1', 'Paper 2', 'Teaching', 'Communication']
  },
  {
    id: 'openstax',
    name: 'OpenStax',
    provider: 'Rice University',
    category: 'Peer-Reviewed Open Textbooks',
    url: 'https://openstax.org',
    highlights: 'Free, peer-reviewed college textbooks in Economics, Statistics, Sociology, Psychology, Computer Science, and Biology.',
    badge: 'Global Open Textbooks',
    types: ['Textbook', 'PDF'],
    topics: ['Paper 2', 'Research', 'Mathematics', 'Environment', 'Computer Science']
  },
  {
    id: 'ncert-textbooks',
    name: 'NCERT Official Textbooks',
    provider: 'NCERT, New Delhi',
    category: 'Foundational Textbooks (Class 6–12)',
    url: 'https://ncert.nic.in/textbook.php',
    highlights: 'Direct PDFs for foundational Polity, Environment & Ecology, Statistics, Informatics Practices, and Sociology.',
    badge: 'Core Foundation',
    types: ['Textbook', 'PDF'],
    topics: ['Paper 1', 'Mathematics', 'ICT', 'Environment', 'Higher Education']
  },
  {
    id: 'nta-mock-engine',
    name: 'NTA Official Mock Test Engine',
    provider: 'National Testing Agency',
    category: 'Official CBT Practice Interface',
    url: 'https://nta.ac.in/quiz',
    highlights: 'Authentic Computer Based Test (CBT) practice engine simulating the actual UGC-NET exam screen, timer, and question palette.',
    badge: 'Official NTA CBT Engine',
    types: ['Mock Test'],
    topics: ['Paper 1', 'Paper 2', 'Mocks']
  },
  {
    id: 'ugc-net-portal',
    name: 'UGC NET Official Portal',
    provider: 'NTA / UGC',
    category: 'Official Notifications, Syllabus & PYQ',
    url: 'https://ugcnet.nta.ac.in',
    highlights: 'Authentic information bulletins, official question papers, provisional/final answer keys, and cutoff archives.',
    badge: 'Primary Authority',
    types: ['Official Portal', 'PDF'],
    topics: ['Paper 1', 'Paper 2', 'PYQs']
  },
  {
    id: 'mit-ocw',
    name: 'MIT OpenCourseWare',
    provider: 'Massachusetts Institute of Technology',
    category: 'University Open Courseware',
    url: 'https://ocw.mit.edu',
    highlights: 'Free and open publication of material from thousands of MIT courses covering Computer Science, Economics, and Mathematics.',
    badge: 'Global Courseware',
    types: ['Course', 'Video'],
    topics: ['Paper 2', 'Mathematics', 'Computer Science']
  }
];

// ============================================================================
// 10. STUDY MATERIAL GUIDE BY PURPOSE, PAPER & STAGE
// ============================================================================

export const studyMaterialsList: StudyMaterialEntry[] = [
  // OFFICIAL SOURCES
  {
    id: 'sm-ugc-portal',
    title: 'NTA UGC-NET Official Portal & Question Archive',
    provider: 'National Testing Agency (NTA)',
    category: 'OFFICIAL SOURCES',
    bestUsedFor: 'Authentic exam notifications, final syllabus PDFs, answer keys, and past papers',
    relevantUnits: ['All Units'],
    paper: 'Both',
    stage: 'FOUNDATION',
    isOpenFree: true,
    url: 'https://ugcnet.nta.ac.in'
  },
  {
    id: 'sm-nep-2020',
    title: 'National Education Policy (NEP) 2020 Official Document',
    provider: 'Ministry of Education, Govt. of India',
    category: 'OFFICIAL SOURCES',
    bestUsedFor: 'Direct questions on 5+3+3+4, HECI verticals (NHERC, NAC, HEGC, GEC), ABC, and MERUs',
    relevantUnits: ['Unit X: Higher Education System'],
    paper: 'Paper 1',
    stage: 'CONCEPT BUILDING',
    isOpenFree: true,
    url: 'https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf'
  },

  // Core Textbooks & Modules
  {
    id: 'sm-epg-paper1',
    title: 'UGC e-PG Pathshala Paper 1 Foundation Modules',
    provider: 'INFLIBNET / UGC',
    category: 'Core Textbooks & Modules',
    bestUsedFor: 'Curriculum-based reading on Teaching Aptitude, Research Methodology, and Higher Education',
    relevantUnits: ['Unit I: Teaching', 'Unit II: Research', 'Unit X: Higher Education'],
    paper: 'Paper 1',
    stage: 'CONCEPT BUILDING',
    isOpenFree: true,
    url: 'https://epgp.inflibnet.ac.in'
  },
  {
    id: 'sm-ncert-ecology',
    title: 'NCERT Class 12 Biology: Ecology & Environment (Direct PDFs)',
    provider: 'NCERT Board',
    category: 'Core Textbooks & Modules',
    bestUsedFor: 'Ecosystems, biodiversity conservation, air/water pollutants, and global climate issues',
    relevantUnits: ['Unit IX: People, Development & Environment'],
    paper: 'Paper 1',
    stage: 'FOUNDATION',
    isOpenFree: true,
    url: 'https://ncert.nic.in/textbook/pdf/lebo1.pdf'
  },
  {
    id: 'sm-ncert-statistics',
    title: 'NCERT Statistics for Economics Class 11 (Direct PDF)',
    provider: 'NCERT Board',
    category: 'Core Textbooks & Modules',
    bestUsedFor: 'Data presentation, table charts, percentage calculations, and central tendencies',
    relevantUnits: ['Unit VII: Data Interpretation', 'Unit V: Mathematical Aptitude'],
    paper: 'Paper 1',
    stage: 'FOUNDATION',
    isOpenFree: true,
    url: 'https://ncert.nic.in/textbook/pdf/kest1.pdf'
  },
  {
    id: 'sm-openstax-stats',
    title: 'OpenStax Introductory Statistics Handbook',
    provider: 'Rice University',
    category: 'Core Textbooks & Modules',
    bestUsedFor: 'Sampling methods, normal distribution, hypothesis testing (z, t, F, Chi-square tests), Type I/II errors',
    relevantUnits: ['Unit II: Research Aptitude'],
    paper: 'Paper 1',
    stage: 'CONCEPT BUILDING',
    isOpenFree: true,
    url: 'https://openstax.org/details/books/introductory-statistics'
  },

  // Video Lectures & MOOCs
  {
    id: 'sm-cec-lectures',
    title: 'CEC UGC Video Lecture Series on Higher Education & Communication',
    provider: 'Consortium for Educational Communication (CEC)',
    category: 'Video Lectures',
    bestUsedFor: 'Visual explanations of communication models, non-verbal kinesics, and teaching aptitude',
    relevantUnits: ['Unit I: Teaching', 'Unit IV: Communication'],
    paper: 'Paper 1',
    stage: 'CONCEPT BUILDING',
    isOpenFree: true,
    url: 'https://cec.nic.in'
  },
  {
    id: 'sm-swayam-prabha',
    title: 'SWAYAM PRABHA Higher Education DTH Channel Playlists',
    provider: 'Ministry of Education',
    category: 'Video Lectures',
    bestUsedFor: 'In-depth university-grade video lectures for specialized Paper 2 topics and Paper 1 logic',
    relevantUnits: ['Unit VI: Logical Reasoning', 'Paper 2 Subjects'],
    paper: 'Both',
    stage: 'CONCEPT BUILDING',
    isOpenFree: true,
    url: 'https://swayamprabha.gov.in'
  },
  {
    id: 'sm-swayam-courses',
    title: 'SWAYAM MOOCs Credit Courses Portal',
    provider: 'Ministry of Education',
    category: 'MOOCs',
    bestUsedFor: 'Structured 8–12 week self-paced courses on research methodology and domain subjects',
    relevantUnits: ['Unit II: Research Aptitude', 'Paper 2 Domains'],
    paper: 'Both',
    stage: 'CONCEPT BUILDING',
    isOpenFree: true,
    url: 'https://swayam.gov.in'
  },

  // Research Resources
  {
    id: 'sm-shodhganga',
    title: 'Shodhganga National Theses Repository',
    provider: 'INFLIBNET Centre',
    category: 'Research Resources',
    bestUsedFor: 'Practical thesis structuring, APA/MLA citation styles, literature review framing, and plagiarism norms',
    relevantUnits: ['Unit II: Research Aptitude'],
    paper: 'Paper 1',
    stage: 'PRACTICE',
    isOpenFree: true,
    url: 'https://shodhganga.inflibnet.ac.in'
  },
  {
    id: 'sm-stanford-logic',
    title: 'Stanford Encyclopedia of Philosophy (Indian Logic & Nyaya)',
    provider: 'Stanford University',
    category: 'Research Resources',
    bestUsedFor: 'Authentic understanding of Pramanas, Anumana structure, Vyapti, and Hetvabhasa fallacies',
    relevantUnits: ['Unit VI: Logical Reasoning'],
    paper: 'Paper 1',
    stage: 'CONCEPT BUILDING',
    isOpenFree: true,
    url: 'https://plato.stanford.edu/entries/logic-indic/'
  },

  // PYQs & Official Exam Resources
  {
    id: 'sm-pyq-archive',
    title: 'Official UGC-NET Previous Years Papers Archive (2020–2024)',
    provider: 'National Testing Agency (NTA)',
    category: 'PYQs & Official Exam Resources',
    bestUsedFor: 'Reverse engineering question typologies (Assertion-Reason, Statements, Chronological)',
    relevantUnits: ['All Units'],
    paper: 'Both',
    stage: 'PRACTICE',
    isOpenFree: true,
    url: 'https://ugcnet.nta.ac.in'
  },
  {
    id: 'sm-nta-quiz',
    title: 'NTA Real-Time CBT Mock Practice Engine',
    provider: 'National Testing Agency (NTA)',
    category: 'Mock Tests',
    bestUsedFor: 'Practicing exact 180-minute uninterrupted CBT simulation with full question palette',
    relevantUnits: ['All Units'],
    paper: 'Both',
    stage: 'MOCK',
    isOpenFree: true,
    url: 'https://nta.ac.in/quiz'
  },

  // Reference Material
  {
    id: 'sm-egyankosh-mes',
    title: 'IGNOU Higher Education & Philosophy Modules (MES-101 / BPY-004)',
    provider: 'IGNOU eGyanKosh',
    category: 'Reference Material',
    bestUsedFor: 'Deep reference reading on Indian epistemology, ancient education, and committee reports',
    relevantUnits: ['Unit VI: Logical Reasoning', 'Unit X: Higher Education'],
    paper: 'Paper 1',
    stage: 'REVISION',
    isOpenFree: true,
    url: 'https://egyankosh.ac.in'
  }
];

// ============================================================================
// 11. CBT MOCK MARATHON TEST CALENDAR
// ============================================================================

export interface MockTestCalendarItem {
  id: string;
  testNumber: number;
  week: number;
  title: string;
  durationMins: number;
  totalQuestions: number;
  totalMarks: number;
  targetScore: string;
  autopsyChecklist: string[];
}

export const mockMarathonSchedule: MockTestCalendarItem[] = [
  {
    id: 'mock-1',
    testNumber: 1,
    week: 23,
    title: 'Full CBT Simulation Test 01',
    durationMins: 180,
    totalQuestions: 150,
    totalMarks: 300,
    targetScore: '180+ Marks',
    autopsyChecklist: [
      'Log time spent on Paper 1 (Target: <= 60 mins)',
      'Categorize all wrong answers into Conceptual, Misreading, or Calculation',
      'Verify unattempted questions (Target: 0 unattempted due to no negative marking)'
    ]
  },
  {
    id: 'mock-2',
    testNumber: 2,
    week: 23,
    title: 'Full CBT Simulation Test 02',
    durationMins: 180,
    totalQuestions: 150,
    totalMarks: 300,
    targetScore: '190+ Marks',
    autopsyChecklist: [
      'Evaluate Pass 1 vs Pass 2 completion tempo',
      'Check DI table calculation speed (Target: <= 8 mins for 5 questions)',
      'Log high-frequency Indian Logic or NEP 2020 mistakes in Error Log'
    ]
  },
  {
    id: 'mock-3',
    testNumber: 3,
    week: 23,
    title: 'Full CBT Simulation Test 03',
    durationMins: 180,
    totalQuestions: 150,
    totalMarks: 300,
    targetScore: '200+ Marks (JRF Benchmark)',
    autopsyChecklist: [
      'Assess Assertion-Reason 3-step BECAUSE accuracy',
      'Examine Paper 2 advanced domain question accuracy',
      'Revise top 3 weakest syllabus units identified during test'
    ]
  },
  {
    id: 'mock-4',
    testNumber: 4,
    week: 24,
    title: 'Full CBT Simulation Test 04',
    durationMins: 180,
    totalQuestions: 150,
    totalMarks: 300,
    targetScore: '205+ Marks',
    autopsyChecklist: [
      'Simulate exact exam timing (e.g. 09:00–12:00 or 15:00–18:00)',
      'Refine Pass 3 review strategy for ambiguous choices',
      'Record final error count in Conceptual vs Misreading'
    ]
  },
  {
    id: 'mock-5',
    testNumber: 5,
    week: 24,
    title: 'Full CBT Final Dress Rehearsal Test 05',
    durationMins: 180,
    totalQuestions: 150,
    totalMarks: 300,
    targetScore: 'Peak Performance Calibration',
    autopsyChecklist: [
      'Final mental conditioning and zero-defect pacing verification',
      'Review Error Log Notebook entries only',
      'Cease intense calculations 24 hours prior to actual exam day'
    ]
  }
];
