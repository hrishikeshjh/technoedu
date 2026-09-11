import { ExamInfo } from '../types';

export const examsData: ExamInfo[] = [
  {
    id: 'upsc',
    name: 'UPSC Civil Services Examination (CSE)',
    shortCode: 'UPSC CSE',
    category: 'Government',
    description: 'Premier national civil service examination for IAS, IPS, IFS, and Central Group A services. Comprehensive open resources covering Prelims (GS + CSAT) and Mains (GS 1–4, Essay, Optionals).',
    tag: 'Civil Services Flagship',
    officialPortalUrl: 'https://upsc.gov.in',
    officialPortalName: 'UPSC Official Portal',
    officialPYQUrl: 'https://upsc.gov.in/examinations/previous-question-papers',
    syllabusHighlights: [
      'Prelims GS Paper I (History, Polity, Economy, Geography, Environment, Science)',
      'Prelims Paper II CSAT (Reading Comprehension, Logical Reasoning, Basic Numeracy)',
      'Mains GS I to IV (Heritage, Governance, Economy & Security, Ethics)',
      'Essay & Optional Subjects'
    ],
    popularTopics: ['Indian Polity & Constitution', 'Modern Indian History & Freedom Struggle', 'Physical & Human Geography', 'Macroeconomics & Budget', 'Environment & Ecology'],
    openSourcePlatforms: [
      {
        id: 'ncert',
        name: 'NCERT e-Pathshala',
        provider: 'NCERT / Ministry of Education',
        type: 'Textbooks & Notes',
        url: 'https://ncert.nic.in/textbook.php',
        description: 'Foundational Class 6-12 NCERT textbooks in History, Geography, Polity, Economics, and Science.',
        badge: 'Core Foundation'
      },
      {
        id: 'upsc-pyq',
        name: 'UPSC Official Previous Question Papers',
        provider: 'Union Public Service Commission',
        type: 'Official PYQs',
        url: 'https://upsc.gov.in/examinations/previous-question-papers',
        description: 'Authentic question papers and official answer keys for Prelims and Mains from 2013-2024.',
        badge: 'Official Archive'
      },
      {
        id: 'nptel-polity',
        name: 'NPTEL Humanities & Social Sciences',
        provider: 'IIT Madras & IIT Delhi',
        type: 'Video Lectures',
        url: 'https://nptel.ac.in',
        description: 'Free university lecture courses on Indian Constitutional Law, Contemporary Economy, and Environment.',
        badge: 'NPTEL Courseware'
      },
      {
        id: 'egyankosh-pubad',
        name: 'e-GyanKosh IGNOU Open Repository',
        provider: 'IGNOU',
        type: 'Textbooks & Notes',
        url: 'https://egyankosh.ac.in',
        description: 'Undergraduate and Master level modules for Public Administration, History, Sociology, and Political Science.',
        badge: 'IGNOU Open Library'
      },
      {
        id: 'prs-research',
        name: 'PRS Legislative Research',
        provider: 'PRS India',
        type: 'Textbooks & Notes',
        url: 'https://prsindia.org',
        description: 'Unbiased analysis of Indian Parliamentary Bills, Union Budgets, and Standing Committee reports.',
        badge: 'Policy Open Source'
      }
    ],
    topicResources: [
      {
        topicName: 'Indian Polity & Articles',
        description: 'The Constitution of India, fundamental rights, directive principles, judiciary, and federalism.',
        platformName: 'Ministry of Law & Justice / Indian Kanoon',
        platformType: 'Official Portal',
        resourceTitle: 'Official Constitution of India Full Text Repository',
        resourceUrl: 'https://legislative.gov.in/constitution-of-india/',
        isFreeOpenSource: true
      },
      {
        topicName: 'Modern Indian History',
        description: 'From the advent of Europeans to Indian Independence and post-independence consolidation.',
        platformName: 'NCERT Class 12 / National Archives',
        platformType: 'Open Textbooks',
        resourceTitle: 'NCERT Themes in Indian History (Vols 1, 2, 3)',
        resourceUrl: 'https://ncert.nic.in/textbook.php',
        isFreeOpenSource: true
      },
      {
        topicName: 'Indian Macroeconomics & Budget',
        description: 'Monetary policy, fiscal deficits, inflation, foreign trade, and economic survey fundamentals.',
        platformName: 'SWAYAM / RBI Open Learning',
        platformType: 'Courseware',
        resourceTitle: 'SWAYAM Principles of Macroeconomics by IIT Kharagpur',
        resourceUrl: 'https://swayam.gov.in',
        isFreeOpenSource: true
      },
      {
        topicName: 'Environment & Climate Change',
        description: 'IUCN red list, biodiversity hotspots, climate summits, and national environmental acts.',
        platformName: 'UNEP & ENVIS MoEFCC',
        platformType: 'Open Reports',
        resourceTitle: 'ENVIS Environmental Information System Open Archives',
        resourceUrl: 'http://envis.nic.in',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'Indian Polity (Constitutional Framework)', author: 'Constitution of India Open Repository', platform: 'Legislative Gov', url: 'https://legislative.gov.in' },
      { title: 'India: Physical Environment & Contemporary India', author: 'NCERT Class 11 & 12 Board', platform: 'NCERT e-Pathshala', url: 'https://ncert.nic.in' },
      { title: 'Public Administration & Governance Modules', author: 'IGNOU Faculty of Social Sciences', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in' }
    ]
  },
  {
    id: 'wbcs',
    name: 'West Bengal Civil Services (WBCS)',
    shortCode: 'WBCS',
    category: 'Government',
    description: 'State civil services examination conducted by WBPSC for Group A (Executive), B, C, and D administrative cadres.',
    tag: 'State PSC Flagship',
    officialPortalUrl: 'https://psc.wb.gov.in',
    officialPortalName: 'West Bengal PSC Official Portal',
    officialPYQUrl: 'https://psc.wb.gov.in',
    syllabusHighlights: [
      'Prelims (English, History of India, Bengal Geography, Indian Polity, Arithmetic & Reasoning)',
      'Mains Compulsory Bengali/Hindi & English Drafting',
      'Mains GS I to IV (History, Geography, Environment, Science, Constitution, Planning)'
    ],
    popularTopics: ['Geography of West Bengal (Rivers, Soils & Districts)', 'Indian National Movement (Bengal Centric)', 'Panchayati Raj & State Schemes', 'General Mental Ability'],
    openSourcePlatforms: [
      {
        id: 'wbpsc-portal',
        name: 'WBPSC Official Question Archive',
        provider: 'Public Service Commission, West Bengal',
        type: 'Official PYQs',
        url: 'https://psc.wb.gov.in',
        description: 'Previous year question papers and official answer keys for WBCS Prelims and Mains.',
        badge: 'Official Portal'
      },
      {
        id: 'banglar-siksha',
        name: 'Banglar Shiksha Open Textbooks',
        provider: 'School Education Dept, Govt of West Bengal',
        type: 'Textbooks & Notes',
        url: 'https://banglarsiksha.gov.in',
        description: 'Free open textbooks for West Bengal Geography, History, and Bengali literature from Class 8 to 12.',
        badge: 'State Open Repository'
      },
      {
        id: 'ncert-hist',
        name: 'NCERT Indian National Movement Repository',
        provider: 'NCERT',
        type: 'Textbooks & Notes',
        url: 'https://ncert.nic.in',
        description: 'Standard conceptual coverage of modern Indian history and constitutional evolution.',
        badge: 'Open Textbooks'
      }
    ],
    topicResources: [
      {
        topicName: 'Geography of West Bengal',
        description: 'Geomorphology, drainage system of Hooghly, Teesta, mineral belts, and socio-economic maps.',
        platformName: 'Banglar Shiksha Open Repository',
        platformType: 'Open Textbooks',
        resourceTitle: 'West Bengal Board Regional Geography Repository',
        resourceUrl: 'https://banglarsiksha.gov.in',
        isFreeOpenSource: true
      },
      {
        topicName: 'Indian National Movement & Freedom Struggle',
        description: 'Swadeshi movement, revolutionary nationalism in Bengal, Subhas Chandra Bose, and INA contributions.',
        platformName: 'National Archives of India / NCERT',
        platformType: 'Open Archives',
        resourceTitle: 'National Archives Freedom Struggle Historical Documents',
        resourceUrl: 'https://nationalarchives.nic.in',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'West Bengal Physical & Regional Geography', author: 'WBBSE Board', platform: 'Banglar Shiksha', url: 'https://banglarsiksha.gov.in' },
      { title: 'Indian Constitution & Financial Institutions', author: 'e-GyanKosh', platform: 'IGNOU Open Repository', url: 'https://egyankosh.ac.in' }
    ]
  },
  {
    id: 'gre',
    name: 'GRE General Test',
    shortCode: 'GRE',
    category: 'Study Abroad',
    description: 'Standardized global assessment for master’s and doctoral admissions evaluating Quantitative Reasoning, Verbal Reasoning, and Analytical Writing.',
    tag: 'ETS Standard',
    officialPortalUrl: 'https://www.ets.org/gre',
    officialPortalName: 'ETS Official GRE Portal',
    officialPYQUrl: 'https://www.ets.org/gre/test-takers/general-test/prepare.html',
    syllabusHighlights: [
      'Quantitative Reasoning (Arithmetic, Algebra, Geometry, Data Analysis)',
      'Verbal Reasoning (Reading Comprehension, Text Completion, Sentence Equivalence)',
      'Analytical Writing (Analyze an Issue Task)'
    ],
    popularTopics: ['Vocabulary & Etymological Roots', 'Advanced Coordinate Geometry', 'Data Interpretation & Probability', 'Permutations & Combinations'],
    openSourcePlatforms: [
      {
        id: 'ets-gre-free',
        name: 'ETS Official Free Test Preparation',
        provider: 'Educational Testing Service (ETS)',
        type: 'Official PYQs',
        url: 'https://www.ets.org/gre/test-takers/general-test/prepare.html',
        description: 'Official ETS diagnostic practice tests, scoring rubrics, sample issue topics, and math review handbook.',
        badge: 'Official ETS Materials'
      },
      {
        id: 'khan-gre-math',
        name: 'Khan Academy GRE Quant Foundation',
        provider: 'Khan Academy Non-Profit',
        type: 'Courseware',
        url: 'https://www.khanacademy.org/math',
        description: 'Free modules for Arithmetic, High School Algebra, Geometry, and Probability & Statistics.',
        badge: 'Free Video & Practice'
      },
      {
        id: 'mit-ocw-math',
        name: 'MIT OpenCourseWare Quantitative Principles',
        provider: 'MIT',
        type: 'Courseware',
        url: 'https://ocw.mit.edu',
        description: 'College level probability, statistics, and discrete mathematics for maximum quant score.',
        badge: 'MIT OpenCourseWare'
      },
      {
        id: 'openstax-algebra',
        name: 'OpenStax College Algebra & Statistics',
        provider: 'Rice University',
        type: 'Textbooks & Notes',
        url: 'https://openstax.org/subjects/math',
        description: 'Open-license peer-reviewed textbooks covering algebra, functions, and data interpretation.',
        badge: 'OpenStax Textbooks'
      }
    ],
    topicResources: [
      {
        topicName: 'GRE Math Review & Formulas',
        description: 'ETS official guide covering arithmetic rules, algebraic properties, geometry formulas, and standard deviation.',
        platformName: 'ETS Official Free Resources',
        platformType: 'Official PDF Handbook',
        resourceTitle: 'ETS Official GRE Math Review PDF Handbook',
        resourceUrl: 'https://www.ets.org/gre/test-takers/general-test/prepare.html',
        isFreeOpenSource: true
      },
      {
        topicName: 'Text Completion & Sentence Equivalence',
        description: 'Contextual vocabulary mastery, transitional word logic, and etymological word roots.',
        platformName: 'Project Gutenberg / Internet Archive',
        platformType: 'Open Vocabulary Library',
        resourceTitle: 'Open Etymology & Latin/Greek Root Vocabulary Compendium',
        resourceUrl: 'https://openlibrary.org',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'ETS GRE Math Review & Convention Guide', author: 'ETS Assessment Board', platform: 'ETS Official', url: 'https://www.ets.org' },
      { title: 'College Algebra & Elementary Statistics', author: 'OpenStax Rice University', platform: 'OpenStax Open License', url: 'https://openstax.org' }
    ]
  },
  {
    id: 'gmat',
    name: 'GMAT Focus Edition',
    shortCode: 'GMAT Focus',
    category: 'Study Abroad',
    description: 'International business school admission exam tailored for executive reasoning, data insights, quantitative problem solving, and verbal critical thinking.',
    tag: 'MBA Global',
    officialPortalUrl: 'https://www.mba.com/exams/gmat-focus-edition',
    officialPortalName: 'GMAC Official GMAT Portal',
    officialPYQUrl: 'https://www.mba.com/exam-prep/gmat-official-starter-kit',
    syllabusHighlights: [
      'Quantitative Reasoning (Problem Solving & Algebraic Formulation)',
      'Verbal Reasoning (Critical Reasoning & Reading Comprehension)',
      'Data Insights (Data Sufficiency, Multi-Source Reasoning, Table Analysis, Two-Part Analysis)'
    ],
    popularTopics: ['Data Insights & Sufficiency', 'Critical Reasoning Heuristics', 'Advanced Number Theory', 'Business Context Reading'],
    openSourcePlatforms: [
      {
        id: 'gmac-official-starter',
        name: 'GMAC Official Starter Kit & Practice Exams',
        provider: 'GMAC',
        type: 'Official PYQs',
        url: 'https://www.mba.com/exam-prep/gmat-official-starter-kit',
        description: 'Official free practice exams with authentic adaptive algorithm, 90 questions, and timing benchmarks.',
        badge: 'Official GMAC'
      },
      {
        id: 'mit-ocw-data',
        name: 'MIT OpenCourseWare Data & Decision Analysis',
        provider: 'MIT Sloan',
        type: 'Courseware',
        url: 'https://ocw.mit.edu',
        description: 'Decision modeling, probability trees, regression interpretation, and structured problem solving.',
        badge: 'MIT OCW'
      },
      {
        id: 'openstax-business',
        name: 'OpenStax Business Statistics & Microeconomics',
        provider: 'Rice University',
        type: 'Textbooks & Notes',
        url: 'https://openstax.org/subjects/business',
        description: 'Open textbooks covering business statistics, logic models, and analytical data charts.',
        badge: 'OpenStax Business'
      }
    ],
    topicResources: [
      {
        topicName: 'Critical Reasoning & Argument Analysis',
        description: 'Assumptions, strengthen/weaken arguments, inference deductions, and flaw detection in business scenarios.',
        platformName: 'Stanford Encyclopedia of Philosophy / Open Logic Project',
        platformType: 'Open Courseware',
        resourceTitle: 'Informal Logic & Argument Structure Open Handbook',
        resourceUrl: 'https://openlogicproject.net',
        isFreeOpenSource: true
      },
      {
        topicName: 'Data Sufficiency & Multi-Source Reasoning',
        description: 'Systematic approaches to determine statement sufficiency without tedious manual calculation.',
        platformName: 'Khan Academy / OpenStax',
        platformType: 'Courseware',
        resourceTitle: 'Quantitative Logic & Variable System Constraints',
        resourceUrl: 'https://www.khanacademy.org',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'Introductory Business Statistics', author: 'Alexander Holmes et al.', platform: 'OpenStax', url: 'https://openstax.org' },
      { title: 'Critical Reasoning & Logic Foundations', author: 'Open Logic Project', platform: 'Open Logic', url: 'https://openlogicproject.net' }
    ]
  },
  {
    id: 'ielts',
    name: 'IELTS Academic & General Training',
    shortCode: 'IELTS',
    category: 'Study Abroad',
    description: 'International English Language Testing System for international university admissions and migration. Assesses Listening, Reading, Writing, and Speaking.',
    tag: 'Band 8+ Target',
    officialPortalUrl: 'https://ielts.idp.com',
    officialPortalName: 'Official IELTS IDP Portal',
    officialPYQUrl: 'https://www.ielts.org/for-test-takers/sample-test-questions',
    syllabusHighlights: [
      'Listening (4 Sections: Everyday conversations, educational monologues, academic group discussions)',
      'Reading (3 Long Passages: Skimming, scanning, True/False/Not Given, Heading match)',
      'Writing Task 1 (Data/Process Description) & Task 2 (Discursive Essay)',
      'Speaking (3 Parts: Personal intro, cue card long turn, two-way abstract discussion)'
    ],
    popularTopics: ['Task 2 Argument Essay Structuring', 'Academic Reading Skimming Speed', 'Graph & Process Flow Descriptors', 'Speaking Cue Card Fluency'],
    openSourcePlatforms: [
      {
        id: 'ielts-org-samples',
        name: 'Official IELTS Sample Question Archive',
        provider: 'Cambridge Assessment English / IDP',
        type: 'Official PYQs',
        url: 'https://www.ielts.org/for-test-takers/sample-test-questions',
        description: 'Official free sample audio tracks, answer sheets, reading texts, and writing prompt rubrics.',
        badge: 'Official IELTS'
      },
      {
        id: 'british-council-free',
        name: 'British Council LearnEnglish Open Portal',
        provider: 'British Council',
        type: 'Textbooks & Notes',
        url: 'https://learnenglish.britishcouncil.org',
        description: 'Comprehensive free lessons in English grammar, pronunciation, academic vocabulary, and listening exercises.',
        badge: 'British Council Open'
      },
      {
        id: 'bbc-learning-english',
        name: 'BBC Learning English Archive',
        provider: 'BBC World Service',
        type: 'Video Lectures',
        url: 'https://www.bbc.co.uk/learningenglish',
        description: 'Audio podcasts, 6-minute English, linguistic nuance drills, and pronunciation guides.',
        badge: 'BBC Open Access'
      }
    ],
    topicResources: [
      {
        topicName: 'Writing Task 2 Academic Essay Architect',
        description: 'Structuring balanced opinions, problem-solution essays, and coherence/cohesion connectors.',
        platformName: 'Purdue Online Writing Lab (OWL)',
        platformType: 'Open Writing Repository',
        resourceTitle: 'Purdue OWL Academic Essay Architecture & Cohesion Guide',
        resourceUrl: 'https://owl.purdue.edu',
        isFreeOpenSource: true
      },
      {
        topicName: 'Academic Reading Passage Heuristics',
        description: 'Mastering True/False/Not Given, paragraph headings, and locating specific scientific facts under time pressure.',
        platformName: 'Open Library / Gutenberg',
        platformType: 'Open Reading Repository',
        resourceTitle: 'Open Academic Reading & Discourse Analysis Collection',
        resourceUrl: 'https://openlibrary.org',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'Official IELTS Assessment Criteria & Band Descriptors', author: 'Cambridge English Language Assessment', platform: 'IELTS Official', url: 'https://www.ielts.org' },
      { title: 'Purdue OWL Academic English Writing Manual', author: 'Purdue University', platform: 'Purdue OWL', url: 'https://owl.purdue.edu' }
    ]
  },
  {
    id: 'toefl',
    name: 'TOEFL iBT',
    shortCode: 'TOEFL iBT',
    category: 'Study Abroad',
    description: 'Measures academic English communication proficiency for North American and European universities. Evaluates Reading, Listening, Speaking, and Writing for an Academic Discussion.',
    tag: 'ETS Pattern',
    officialPortalUrl: 'https://www.ets.org/toefl',
    officialPortalName: 'ETS Official TOEFL Portal',
    officialPYQUrl: 'https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests.html',
    syllabusHighlights: [
      'Reading (2 Passages, 20 Questions: Factual, Negative Factual, Inference, Vocabulary)',
      'Listening (3 Lectures, 2 Conversations: Campus situations and academic subjects)',
      'Speaking (4 Tasks: 1 Independent + 3 Integrated with campus announcements and lectures)',
      'Writing (Integrated Writing + Writing for an Academic Discussion)'
    ],
    popularTopics: ['Integrated Speaking Synthesizing', 'Writing for Academic Discussion', 'Note-taking during Audio Lectures', 'Academic Vocabulary in Context'],
    openSourcePlatforms: [
      {
        id: 'ets-toefl-free',
        name: 'ETS TOEFL Free Practice Sets & Test Taker Guide',
        provider: 'Educational Testing Service (ETS)',
        type: 'Official PYQs',
        url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests.html',
        description: 'Official interactive practice tests featuring past test questions and sample responses with scoring criteria.',
        badge: 'Official ETS'
      },
      {
        id: 'voa-learning-english',
        name: 'Voice of America Academic English',
        provider: 'VOA News',
        type: 'Video Lectures',
        url: 'https://learningenglish.voanews.com',
        description: 'Spoken American English, science and technology news reports with read-along transcripts for TOEFL listening.',
        badge: 'Open Audio Archive'
      }
    ],
    topicResources: [
      {
        topicName: 'Writing for an Academic Discussion',
        description: 'Constructing succinct, persuasive contributions to online professor-moderated forum prompts.',
        platformName: 'ETS Official Test Preparation',
        platformType: 'Official Guide',
        resourceTitle: 'ETS Academic Discussion Writing Prompts and Exemplars',
        resourceUrl: 'https://www.ets.org/toefl/test-takers/ibt/prepare.html',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'TOEFL iBT Official Test Taker Handbook', author: 'ETS Assessment Division', platform: 'ETS Official', url: 'https://www.ets.org' }
    ]
  },
  {
    id: 'sat',
    name: 'Digital SAT',
    shortCode: 'Digital SAT',
    category: 'Study Abroad',
    description: 'Adaptive computer-based entrance exam for undergraduate admissions to colleges and universities globally.',
    tag: 'College Board',
    officialPortalUrl: 'https://satsuite.collegeboard.org/digital',
    officialPortalName: 'College Board Official SAT Suite',
    officialPYQUrl: 'https://satsuite.collegeboard.org/practice/bluebook-app',
    syllabusHighlights: [
      'Reading and Writing Module (Craft & Structure, Information & Ideas, Standard English Conventions, Expression of Ideas)',
      'Math Module (Algebra, Advanced Math, Problem-Solving and Data Analysis, Geometry and Trigonometry)',
      'Built-in Desmos Graphing Calculator Mastery'
    ],
    popularTopics: ['Desmos Calculator Shortcuts', 'Linear & Quadratic Systems', 'Punctuation & Boundary Rules', 'Data Visualizations in Science Passages'],
    openSourcePlatforms: [
      {
        id: 'khan-digital-sat',
        name: 'Khan Academy Official Digital SAT Course',
        provider: 'Khan Academy & College Board',
        type: 'Courseware',
        url: 'https://www.khanacademy.org/digital-sat',
        description: '100% free official prep built with College Board. Includes skill-level lessons, diagnostic tests, and thousands of practice items.',
        badge: 'Official Partner Free Course'
      },
      {
        id: 'collegeboard-bluebook',
        name: 'College Board Bluebook Official Free Mocks',
        provider: 'The College Board',
        type: 'Practice Engine',
        url: 'https://satsuite.collegeboard.org/practice/bluebook-app',
        description: 'Official test delivery platform providing 6+ full-length computer adaptive practice tests with real-time scoring.',
        badge: 'Official App'
      },
      {
        id: 'desmos-open',
        name: 'Desmos Official Graphing Calculator Learning Hub',
        provider: 'Desmos Non-Profit Education',
        type: 'Courseware',
        url: 'https://learn.desmos.com',
        description: 'Tutorials on regressions, table points, and graph intersections for SAT math speed.',
        badge: 'Free Interactive Tool'
      }
    ],
    topicResources: [
      {
        topicName: 'Algebra & Advanced Polynomials',
        description: 'Quadratic functions, exponential models, rational expressions, and systems of linear inequalities.',
        platformName: 'Khan Academy Official SAT Module',
        platformType: 'Open Courseware',
        resourceTitle: 'Khan Academy Advanced Math for Digital SAT',
        resourceUrl: 'https://www.khanacademy.org/digital-sat/sat-math',
        isFreeOpenSource: true
      },
      {
        topicName: 'Standard English Conventions & Rhetoric',
        description: 'Clauses, commas, semicolons, dashes, subject-verb agreement, and rhetorical synthesis bullet drills.',
        platformName: 'Khan Academy & OpenStax',
        platformType: 'Open Grammar Guide',
        resourceTitle: 'Standard English Conventions & Rhetorical Synthesis Drills',
        resourceUrl: 'https://www.khanacademy.org/digital-sat/sat-reading-and-writing',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'The Official Digital SAT Study Guide', author: 'The College Board', platform: 'College Board Open', url: 'https://satsuite.collegeboard.org' },
      { title: 'OpenStax Algebra and Trigonometry', author: 'Jay Abramson et al.', platform: 'OpenStax', url: 'https://openstax.org' }
    ]
  },
  {
    id: 'ssc',
    name: 'SSC CGL & CHSL Examinations',
    shortCode: 'SSC CGL',
    category: 'Government',
    description: 'Staff Selection Commission exams recruiting Group B and C officers across ministries and departments of the Government of India.',
    tag: 'Central Govt',
    officialPortalUrl: 'https://ssc.gov.in',
    officialPortalName: 'Staff Selection Commission Official Portal',
    officialPYQUrl: 'https://ssc.gov.in',
    syllabusHighlights: [
      'Tier 1 (General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, English Comprehension)',
      'Tier 2 Mathematical Abilities & Reasoning and General Intelligence',
      'Tier 2 English Language and Comprehension & General Awareness',
      'Computer Knowledge Module & Data Entry Speed Test'
    ],
    popularTopics: ['Advanced Trigonometry & Mensuration', 'Speed Arithmetic & Short Tricks', 'Syllogism & Non-Verbal Reasoning', 'General Science & Static GK'],
    openSourcePlatforms: [
      {
        id: 'ssc-official',
        name: 'SSC Official Portal & Notices',
        provider: 'Staff Selection Commission',
        type: 'Official PYQs',
        url: 'https://ssc.gov.in',
        description: 'Official notifications, examination calendars, answer keys, and previous question papers.',
        badge: 'Official Portal'
      },
      {
        id: 'ncert-math-sci',
        name: 'NCERT Class 9 & 10 Mathematics and Science',
        provider: 'NCERT',
        type: 'Textbooks & Notes',
        url: 'https://ncert.nic.in',
        description: 'Pure geometry theorems, mensuration 2D/3D formulas, algebra identities, and physics/chemistry fundamentals.',
        badge: 'NCERT Foundation'
      },
      {
        id: 'swayam-math',
        name: 'SWAYAM Basic Mathematics for Competitive Exams',
        provider: 'Ministry of Education',
        type: 'Courseware',
        url: 'https://swayam.gov.in',
        description: 'Comprehensive video lectures and question banks covering arithmetic and mental ability.',
        badge: 'Govt SWAYAM'
      }
    ],
    topicResources: [
      {
        topicName: 'Quantitative Aptitude (Algebra & Geometry)',
        description: 'Circles, chords, tangents, triangles similarity, height & distance, coordinate geometry, and polynomials.',
        platformName: 'NCERT & OpenStax',
        platformType: 'Open Textbooks',
        resourceTitle: 'NCERT Class 10 Geometry & Trigonometry Chapters',
        resourceUrl: 'https://ncert.nic.in/textbook.php',
        isFreeOpenSource: true
      },
      {
        topicName: 'Static General Knowledge & General Science',
        description: 'Indian monuments, classical dances, national parks, chemical compounds, human physiology, and constitutional articles.',
        platformName: 'National Portal of India',
        platformType: 'Govt Open Data',
        resourceTitle: 'Know India: National Portal of India Culture and Heritage',
        resourceUrl: 'https://knowindia.india.gov.in',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Mathematics Class 9 & 10 (Full Text)', author: 'NCERT Curriculum Board', platform: 'NCERT e-Pathshala', url: 'https://ncert.nic.in' },
      { title: 'Basic Science & Technology Handbook', author: 'NCERT e-Pathshala', platform: 'NCERT', url: 'https://ncert.nic.in' }
    ]
  },
  {
    id: 'banking',
    name: 'Banking PO & Clerk (IBPS / SBI / RBI)',
    shortCode: 'Banking Exams',
    category: 'Government',
    description: 'National competitive examinations conducted by IBPS, State Bank of India, and Reserve Bank of India for Probationary Officers and Clerks.',
    tag: 'Banking & Financial Sector',
    officialPortalUrl: 'https://www.ibps.in',
    officialPortalName: 'IBPS Official Portal',
    officialPYQUrl: 'https://www.ibps.in',
    syllabusHighlights: [
      'Quantitative Aptitude (Data Interpretation, Quadratic Equations, Number Series, Arithmetic)',
      'Reasoning Ability (Puzzles, Floor/Box arrangements, Syllogisms, Machine Input-Output)',
      'English Language (Reading Comprehension, Cloze Test, Error Detection, Para Jumbles)',
      'Banking Awareness & Financial Economics'
    ],
    popularTopics: ['High-Level Seating Arrangements & Puzzles', 'Pie Chart & Caselet Data Interpretation', 'RBI Monetary Policy & Banking Terms', 'Error Spotting & Grammar'],
    openSourcePlatforms: [
      {
        id: 'ibps-portal',
        name: 'IBPS Examination Portal',
        provider: 'Institute of Banking Personnel Selection',
        type: 'Official PYQs',
        url: 'https://www.ibps.in',
        description: 'Official mock tests, information handouts, sample question papers, and score distribution criteria.',
        badge: 'Official IBPS'
      },
      {
        id: 'rbi-open-learning',
        name: 'RBI Financial Education Portal',
        provider: 'Reserve Bank of India',
        type: 'Textbooks & Notes',
        url: 'https://rbi.org.in/financialeducation/',
        description: 'Official RBI handbooks on banking mechanisms, monetary policy tools (Repo, Reverse Repo, CRR, SLR), and financial regulations.',
        badge: 'Official RBI Repository'
      },
      {
        id: 'nptel-finance',
        name: 'NPTEL Banking and Financial Institutions Course',
        provider: 'IIT Kharagpur',
        type: 'Video Lectures',
        url: 'https://nptel.ac.in',
        description: 'University-level lectures on banking operations, commercial credit, treasury management, and risk frameworks.',
        badge: 'NPTEL Courseware'
      }
    ],
    topicResources: [
      {
        topicName: 'Banking & Financial Awareness',
        description: 'Structure of Indian banking system, Basel III norms, Priority Sector Lending (PSL), inflation indices, and RBI functions.',
        platformName: 'Reserve Bank of India Open Portal',
        platformType: 'Official Resource',
        resourceTitle: 'RBI Monetary Policy Framework & FAQs on Banking Terms',
        resourceUrl: 'https://rbi.org.in/financialeducation/',
        isFreeOpenSource: true
      },
      {
        topicName: 'Data Interpretation & Calculation Speed',
        description: 'Table charts, bar graphs, missing DIs, radar charts, and approximation strategies.',
        platformName: 'Khan Academy / OpenStax',
        platformType: 'Courseware',
        resourceTitle: 'Statistical Data Interpretation & Ratio Analysis Mastery',
        resourceUrl: 'https://www.khanacademy.org',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'Financial Education & Banking Operations Handbook', author: 'Reserve Bank of India', platform: 'RBI Financial Education', url: 'https://rbi.org.in' },
      { title: 'Introductory Macroeconomics: Money and Banking', author: 'NCERT Class 12', platform: 'NCERT e-Pathshala', url: 'https://ncert.nic.in' }
    ]
  },
  {
    id: 'clat',
    name: 'CLAT (UG & PG) & Law Entrances',
    shortCode: 'CLAT',
    category: 'Law & Entrance',
    description: 'Common Law Admission Test for admission to 24 National Law Universities (NLSIU Bengaluru, NALSAR Hyderabad, WBNUJS Kolkata, etc.).',
    tag: 'National Law Universities',
    officialPortalUrl: 'https://consortiumofnlus.ac.in',
    officialPortalName: 'Consortium of NLUs Official Portal',
    officialPYQUrl: 'https://consortiumofnlus.ac.in',
    syllabusHighlights: [
      'English Language (Comprehension Passages & Inference)',
      'Current Affairs Including General Knowledge',
      'Legal Reasoning (Passage-based Law of Torts, Contracts, Criminal Law, Constitutional Law)',
      'Logical Reasoning (Arguments, Analogies, Paradoxes, Deductive/Inductive logic)',
      'Quantitative Techniques (10th Standard Graphical & Caselet Math)'
    ],
    popularTopics: ['Constitutional Law Landmark Judgments', 'Law of Torts & Strict Liability', 'Contract Law (Offer, Acceptance, Breach)', 'Current Legal Affairs & Bills'],
    openSourcePlatforms: [
      {
        id: 'consortium-nlus',
        name: 'Consortium of NLUs Official Sample Tests & Archives',
        provider: 'Consortium of NLUs',
        type: 'Official PYQs',
        url: 'https://consortiumofnlus.ac.in',
        description: 'Official syllabus outlines, sample question sets with full answer keys, and exam pattern guidelines.',
        badge: 'Official Consortium'
      },
      {
        id: 'indian-kanoon',
        name: 'Indian Kanoon Open Legal Repository',
        provider: 'Indian Kanoon Open Project',
        type: 'Textbooks & Notes',
        url: 'https://indiankanoon.org',
        description: 'Free searchable database of Supreme Court of India and High Court landmark judgments and statutes.',
        badge: 'Open Legal Database'
      },
      {
        id: 'swayam-law',
        name: 'SWAYAM Law & Jurisprudence Courses',
        provider: 'NLU Delhi & UGC',
        type: 'Courseware',
        url: 'https://swayam.gov.in',
        description: 'Video courses on Constitutional Law, Law of Torts, Law of Crimes, and Human Rights Jurisprudence.',
        badge: 'Govt SWAYAM Law'
      }
    ],
    topicResources: [
      {
        topicName: 'Legal Reasoning Principles & Precedents',
        description: 'Application of legal principles to factual situations across civil wrongs, contracts, and fundamental rights.',
        platformName: 'Indian Kanoon / SWAYAM Law',
        platformType: 'Open Legal Courseware',
        resourceTitle: 'Fundamental Principles of Tort & Contract Law Handbook',
        resourceUrl: 'https://indiankanoon.org',
        isFreeOpenSource: true
      },
      {
        topicName: 'Landmark Supreme Court Verdicts',
        description: 'Basic structure doctrine, right to privacy, affirmative action, and environmental jurisprudence.',
        platformName: 'Supreme Court of India Official Records',
        platformType: 'Official Portal',
        resourceTitle: 'Supreme Court Judgments Information System (JUDIS)',
        resourceUrl: 'https://judgments.ecourts.gov.in/pdfsearch/',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'The Constitution of India: Text with Amendments', author: 'Ministry of Law and Justice', platform: 'Official Legislative Portal', url: 'https://legislative.gov.in' },
      { title: 'Introduction to Law & Legal Methods', author: 'e-PG Pathshala UGC Law Board', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in' }
    ]
  },
  {
    id: 'cat',
    name: 'CAT (Common Admission Test) & Management Entrances',
    shortCode: 'CAT',
    category: 'Law & Entrance',
    description: 'Premier national computer-based management entrance test conducted by the Indian Institutes of Management (IIMs) for MBA / PGDM admissions.',
    tag: 'IIMs & Top B-Schools',
    officialPortalUrl: 'https://iimcat.ac.in',
    officialPortalName: 'IIM CAT Official Portal',
    officialPYQUrl: 'https://iimcat.ac.in',
    syllabusHighlights: [
      'Verbal Ability and Reading Comprehension (VARC: 16 RC Questions, 8 VA Questions)',
      'Data Interpretation and Logical Reasoning (DILR: 4 Sets of 5 Questions each)',
      'Quantitative Ability (QA: Arithmetic, Algebra, Geometry, Modern Math, Number Systems)'
    ],
    popularTopics: ['DILR Grid Puzzles & Tournaments', 'Philosophy & Sociology Reading Passages', 'Algebra (Functions, Inequalities, Modulus)', 'Arithmetic (Time-Speed-Distance, PnC)'],
    openSourcePlatforms: [
      {
        id: 'iimcat-official',
        name: 'IIM CAT Official Portal & Mock Engine',
        provider: 'Indian Institutes of Management (IIMs)',
        type: 'Official PYQs',
        url: 'https://iimcat.ac.in',
        description: 'Official test navigation mock tutorials, question papers with final answer keys released post-exam.',
        badge: 'Official IIM Portal'
      },
      {
        id: 'nptel-mgmt',
        name: 'NPTEL Quantitative Methods for Management',
        provider: 'IIT Bombay & IIT Kharagpur',
        type: 'Courseware',
        url: 'https://nptel.ac.in',
        description: 'Rigorous modules on linear programming, optimization, combinatorics, and structured quantitative modeling.',
        badge: 'NPTEL Courseware'
      },
      {
        id: 'mit-ocw-algorithms',
        name: 'MIT OpenCourseWare Mathematics for Computer Science',
        provider: 'MIT',
        type: 'Courseware',
        url: 'https://ocw.mit.edu',
        description: 'Discrete mathematics, graph theory logic, pigeonhole principle, and advanced counting techniques for DILR.',
        badge: 'MIT OpenCourseWare'
      }
    ],
    topicResources: [
      {
        topicName: 'VARC Reading Comprehension from Global Journals',
        description: 'Analyzing complex, dense passages across philosophy, psychology, evolutionary biology, and art history.',
        platformName: 'Aeon Essays & Project Gutenberg',
        platformType: 'Open Essay Library',
        resourceTitle: 'Aeon Open Essays & Cultural Analysis Archive',
        resourceUrl: 'https://aeon.co/essays',
        isFreeOpenSource: true
      },
      {
        topicName: 'Quantitative Ability Algebra & Functions',
        description: 'Quadratic equations, polynomials, log properties, sequences and series, maxima-minima, and coordinate geometry.',
        platformName: 'OpenStax & Khan Academy',
        platformType: 'Open Textbooks',
        resourceTitle: 'OpenStax Precalculus & Functions Mastery',
        resourceUrl: 'https://openstax.org',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'Mathematics for Computer Science (Discrete Math & Logic)', author: 'Eric Lehman et al.', platform: 'MIT OCW', url: 'https://ocw.mit.edu' },
      { title: 'OpenStax Precalculus: Functions and Graphs', author: 'Jay Abramson et al.', platform: 'OpenStax', url: 'https://openstax.org' }
    ]
  },
  {
    id: 'cuet',
    name: 'CUET UG / PG (Central Universities Entrance)',
    shortCode: 'CUET',
    category: 'Law & Entrance',
    description: 'National Testing Agency (NTA) single-window entrance exam for admissions to all Central, State, and Participating Universities in India.',
    tag: 'NTA Standard',
    officialPortalUrl: 'https://cuet.nta.nic.in',
    officialPortalName: 'NTA CUET Official Portal',
    officialPYQUrl: 'https://nta.ac.in/Downloads',
    syllabusHighlights: [
      'Section IA & IB: Languages (Reading Comprehension, Literary Aptitude, Vocabulary)',
      'Section II: Domain Specific Subjects (strictly NCERT Class 12 syllabus)',
      'Section III: General Test (General Knowledge, Current Affairs, Mental Ability, Numerical Ability)'
    ],
    popularTopics: ['Class 12 NCERT Domain Mastery', 'General Mental Ability & Logical Reasoning', 'Reading Comprehension', 'General Awareness'],
    openSourcePlatforms: [
      {
        id: 'nta-official-archive',
        name: 'NTA Official Question Paper Archive',
        provider: 'National Testing Agency',
        type: 'Official PYQs',
        url: 'https://nta.ac.in/Downloads',
        description: 'Official NTA question papers for all domain subjects, general tests, and language modules with master keys.',
        badge: 'Official NTA'
      },
      {
        id: 'ncert-class12',
        name: 'NCERT Class 12 Official Textbooks',
        provider: 'NCERT',
        type: 'Textbooks & Notes',
        url: 'https://ncert.nic.in/textbook.php',
        description: 'The exact source syllabus textbooks for all 27 domain specific subjects tested in CUET UG.',
        badge: 'Official Syllabus Source'
      },
      {
        id: 'swayam-cuet',
        name: 'SWAYAM MOOCs for Higher Secondary Domain Subjects',
        provider: 'CIET-NCERT / SWAYAM',
        type: 'Courseware',
        url: 'https://swayam.gov.in',
        description: 'Free structured video courses aligned with NCERT curriculum across Science, Commerce, and Humanities.',
        badge: 'Govt SWAYAM'
      }
    ],
    topicResources: [
      {
        topicName: 'Domain Subjects (Sciences, Commerce, Humanities)',
        description: 'Physics, Chemistry, Biology, Mathematics, History, Political Science, Economics based on Class 12 NCERT.',
        platformName: 'NCERT e-Pathshala',
        platformType: 'Open Textbooks',
        resourceTitle: 'NCERT e-Pathshala Class 12 Digital Repository',
        resourceUrl: 'https://ncert.nic.in/textbook.php',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Class 12 Domain Subjects Collection', author: 'NCERT National Faculty', platform: 'NCERT e-Pathshala', url: 'https://ncert.nic.in' }
    ]
  },
  {
    id: 'railways',
    name: 'Railways RRB NTPC & Group D',
    shortCode: 'RRB NTPC',
    category: 'Government',
    description: 'Railway Recruitment Boards nationwide exams for Non-Technical Popular Categories and Level 1 posts.',
    tag: 'Indian Railways',
    officialPortalUrl: 'https://www.rrbapply.gov.in',
    officialPortalName: 'Railway Recruitment Boards Central Portal',
    officialPYQUrl: 'https://www.rrbapply.gov.in',
    syllabusHighlights: [
      'CBT Stage 1 & 2 General Awareness (Current events, Science, Indian History, Indian Polity)',
      'Mathematics (Number System, Fractions, Ratio, Time & Work, Mensuration)',
      'General Intelligence and Reasoning (Analogies, Venn Diagrams, Syllogism)'
    ],
    popularTopics: ['General Science (Class 10 Physics & Chemistry)', 'Indian Railways Static GK', 'Arithmetic Calculations', 'Syllogism & Direction Sense'],
    openSourcePlatforms: [
      {
        id: 'rrb-portal',
        name: 'RRB Official Central Recruitment Portal',
        provider: 'Ministry of Railways',
        type: 'Official PYQs',
        url: 'https://www.rrbapply.gov.in',
        description: 'Official CEN notices, mock test sample interfaces, and question answer keys.',
        badge: 'Official RRB'
      },
      {
        id: 'ncert-sci-10',
        name: 'NCERT Class 9 & 10 General Science Textbook',
        provider: 'NCERT',
        type: 'Textbooks & Notes',
        url: 'https://ncert.nic.in/textbook.php',
        description: 'Complete syllabus match for RRB General Science (Light, Electricity, Periodic Table, Human Body Systems).',
        badge: 'NCERT Core'
      }
    ],
    topicResources: [
      {
        topicName: 'General Science Fundamentals',
        description: 'Physics laws, electricity, chemical reactions, acids/bases, cell biology, and genetics.',
        platformName: 'NCERT e-Pathshala',
        platformType: 'Open Textbooks',
        resourceTitle: 'NCERT Class 9 & 10 Science Digital Edition',
        resourceUrl: 'https://ncert.nic.in/textbook.php',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Class 9 & 10 Science (Complete Book)', author: 'NCERT', platform: 'NCERT e-Pathshala', url: 'https://ncert.nic.in' }
    ]
  },
  {
    id: 'defence',
    name: 'Defence Examinations (CDS / NDA / AFCAT)',
    shortCode: 'Defence Exams',
    category: 'Government',
    description: 'Officer commissioning examinations for the Indian Armed Forces (Army, Navy, Air Force) conducted by UPSC and Indian Air Force.',
    tag: 'Armed Forces Officers',
    officialPortalUrl: 'https://upsc.gov.in',
    officialPortalName: 'UPSC Examination Notice Board',
    officialPYQUrl: 'https://upsc.gov.in/examinations/previous-question-papers',
    syllabusHighlights: [
      'NDA: Mathematics (Algebra, Trigonometry, Calculus) & General Ability Test (English + GK)',
      'CDS: English, General Knowledge, and Elementary Mathematics',
      'AFCAT: General Awareness, Verbal Ability, Numerical Ability, Reasoning'
    ],
    popularTopics: ['Trigonometry & Calculus for NDA', 'World Geography & Strategic Chokepoints', 'Physics & General Science', 'Grammar & Synonyms/Antonyms'],
    openSourcePlatforms: [
      {
        id: 'upsc-defence-pyq',
        name: 'UPSC Defence Previous Years Question Archive',
        provider: 'UPSC',
        type: 'Official PYQs',
        url: 'https://upsc.gov.in/examinations/previous-question-papers',
        description: 'Authentic 10-year question papers for NDA/NA and CDS with scoring answer keys.',
        badge: 'Official UPSC'
      },
      {
        id: 'ncert-math-11-12',
        name: 'NCERT Class 11 & 12 Mathematics (For NDA)',
        provider: 'NCERT',
        type: 'Textbooks & Notes',
        url: 'https://ncert.nic.in',
        description: 'Vector algebra, 3D geometry, probability, matrices, determinants, and calculus.',
        badge: 'Open Textbooks'
      }
    ],
    topicResources: [
      {
        topicName: 'NDA Higher Mathematics (Calculus & Trigonometry)',
        description: 'Comprehensive calculus, coordinate geometry in 2D & 3D, and trigonometric identities.',
        platformName: 'MIT OCW / NCERT',
        platformType: 'Open Courseware',
        resourceTitle: 'MIT OCW Single Variable Calculus & NCERT Class 12 Math',
        resourceUrl: 'https://ocw.mit.edu',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Class 11 & 12 Mathematics (Part 1 & 2)', author: 'NCERT', platform: 'NCERT e-Pathshala', url: 'https://ncert.nic.in' }
    ]
  },
  {
    id: 'teaching',
    name: 'Teaching Exams (CTET / WB TET / UGC-NET)',
    shortCode: 'Teaching Exams',
    category: 'Government',
    description: 'National and State eligibility tests determining eligibility for school teachers and University Assistant Professors.',
    tag: 'Teacher Eligibility & Research',
    officialPortalUrl: 'https://ctet.nic.in',
    officialPortalName: 'Central Teacher Eligibility Test Portal',
    officialPYQUrl: 'https://ctet.nic.in',
    syllabusHighlights: [
      'Child Development and Pedagogy (Piaget, Kohlberg, Vygotsky, Inclusive Education)',
      'Language I & II Pedagogy and Comprehension',
      'Mathematics / Science / Social Studies Pedagogy',
      'UGC-NET Paper 1: Teaching Aptitude, Research Aptitude, Higher Education System'
    ],
    popularTopics: ['Child Psychology & Theories of Learning', 'Inclusive Education & Special Needs', 'Constructivist Classroom Approaches', 'Research Methodology & Higher Education'],
    openSourcePlatforms: [
      {
        id: 'ctet-official',
        name: 'CTET Official Archive & Model Papers',
        provider: 'CBSE / CTET Unit',
        type: 'Official PYQs',
        url: 'https://ctet.nic.in',
        description: 'Official CTET question papers for Paper 1 and Paper 2 with final keys.',
        badge: 'Official CBSE'
      },
      {
        id: 'ugc-inflibnet',
        name: 'UGC e-PG Pathshala & INFLIBNET Education Modules',
        provider: 'UGC & Ministry of Education',
        type: 'Textbooks & Notes',
        url: 'https://epgp.inflibnet.ac.in',
        description: 'Curriculum-based interactive content across Education, Child Psychology, and Research Aptitude.',
        badge: 'UGC INFLIBNET'
      },
      {
        id: 'ncert-pedagogy',
        name: 'NCERT National Curriculum Framework Repository',
        provider: 'NCERT',
        type: 'Textbooks & Notes',
        url: 'https://ncert.nic.in',
        description: 'Foundational policy documents on pedagogy, holistic development, and pedagogical content knowledge.',
        badge: 'NCERT Official'
      }
    ],
    topicResources: [
      {
        topicName: 'Child Development & Cognitive Theories',
        description: 'Jean Piaget cognitive stages, Lev Vygotsky ZPD, and Lawrence Kohlberg moral reasoning.',
        platformName: 'e-PG Pathshala & IGNOU B.Ed Portal',
        platformType: 'Open Courseware',
        resourceTitle: 'IGNOU B.Ed Psychology of Learning and Development Module',
        resourceUrl: 'https://egyankosh.ac.in',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'National Curriculum Framework for Foundational Stage', author: 'NCERT', platform: 'NCERT e-Pathshala', url: 'https://ncert.nic.in' },
      { title: 'e-PG Pathshala Education Modules', author: 'INFLIBNET / UGC', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in' }
    ]
  }
];

export const examCategories = ['All', 'Study Abroad', 'Government', 'Law & Entrance'];

