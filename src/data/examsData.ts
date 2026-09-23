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
    officialPYQUrl: 'https://upsc.gov.in/sites/default/files/2024_GS_Paper_1.pdf',
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
        url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf',
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
        resourceUrl: 'https://legislative.gov.in/sites/default/files/COI_English.pdf',
        isFreeOpenSource: true
      },
      {
        topicName: 'Modern Indian History',
        description: 'From the advent of Europeans to Indian Independence and post-independence consolidation.',
        platformName: 'NCERT Class 12 / National Archives',
        platformType: 'Open Textbooks',
        resourceTitle: 'NCERT Themes in Indian History (Direct PDF)',
        resourceUrl: 'https://ncert.nic.in/textbook/pdf/lehs1.pdf',
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
      { title: 'Constitution of India Bare Act (Direct PDF)', author: 'Ministry of Law & Justice', platform: 'Official Legislative Portal', url: 'https://legislative.gov.in/sites/default/files/COI_English.pdf' },
      { title: 'NCERT Physical Geography Class 11 (Direct PDF)', author: 'NCERT Curriculum Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/kegy1.pdf' },
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
      { title: 'Constitution of India Bare Act (Direct PDF)', author: 'Ministry of Law & Justice', platform: 'Official Legislative Portal', url: 'https://legislative.gov.in/sites/default/files/COI_English.pdf' }
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
    officialPYQUrl: 'https://www.ets.org/s/gre/pdf/practice_book_gre.pdf',
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
        resourceUrl: 'https://www.ets.org/s/gre/pdf/gre_math_review.pdf',
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
      { title: 'ETS Official GRE Math Review (Direct PDF)', author: 'ETS Assessment Board', platform: 'ETS Official', url: 'https://www.ets.org/s/gre/pdf/gre_math_review.pdf' },
      { title: 'OpenStax College Algebra 2e (Direct PDF)', author: 'Jay Abramson et al.', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/CollegeAlgebra2e.pdf' }
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
      { title: 'OpenStax Introductory Statistics (Direct PDF)', author: 'Alexander Holmes et al.', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/IntroductoryStatistics.pdf' },
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
      { title: 'Official IELTS Writing Band Descriptors (Direct PDF)', author: 'Cambridge Assessment English', platform: 'IELTS Official', url: 'https://www.ielts.org/-/media/pdfs/writing-band-descriptors.pdf' },
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
      { title: 'TOEFL iBT Official Bulletin & Guide (Direct PDF)', author: 'ETS Assessment Division', platform: 'ETS Official', url: 'https://www.ets.org/s/toefl/pdf/toefl_bulletin.pdf' }
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
      { title: 'Digital SAT Official Math Review (Direct PDF)', author: 'The College Board', platform: 'College Board Official', url: 'https://satsuite.collegeboard.org/media/pdf/digital-sat-math-review.pdf' },
      { title: 'OpenStax College Algebra 2e (Direct PDF)', author: 'Jay Abramson et al.', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/CollegeAlgebra2e.pdf' }
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
        resourceTitle: 'NCERT Class 10 Mathematics (Direct PDF)',
        resourceUrl: 'https://ncert.nic.in/textbook/pdf/jesc2.pdf',
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
      { title: 'NCERT Class 9 Mathematics (Direct PDF)', author: 'NCERT Curriculum Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/jesc1.pdf' },
      { title: 'NCERT Class 10 Science (Direct PDF)', author: 'NCERT Curriculum Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/jesc2.pdf' }
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
        resourceTitle: 'RBI Banking Structure & Policy Guide (Direct PDF)',
        resourceUrl: 'https://rbi.org.in/financialeducation/pdf/Banking_Structure.pdf',
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
      { title: 'RBI Banking Structure & Policy Guide (Direct PDF)', author: 'Reserve Bank of India', platform: 'RBI Financial Education', url: 'https://rbi.org.in/financialeducation/pdf/Banking_Structure.pdf' },
      { title: 'NCERT Class 12 Macroeconomics (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/lesc2.pdf' }
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
      { title: 'Constitution of India Bare Act (Direct PDF)', author: 'Ministry of Law & Justice', platform: 'Official Legislative Portal', url: 'https://legislative.gov.in/sites/default/files/COI_English.pdf' },
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
        resourceTitle: 'OpenStax Precalculus 2e (Direct PDF)',
        resourceUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Precalculus2e.pdf',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'Mathematics for Computer Science (Discrete Math & Logic)', author: 'Eric Lehman et al.', platform: 'MIT OCW', url: 'https://ocw.mit.edu' },
      { title: 'OpenStax Precalculus 2e (Direct PDF)', author: 'Jay Abramson et al.', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/Precalculus2e.pdf' }
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
        url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf',
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
        resourceTitle: 'NCERT Class 12 Domain Mathematics (Direct PDF)',
        resourceUrl: 'https://ncert.nic.in/textbook/pdf/lema1.pdf',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Class 12 Mathematics (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/lema1.pdf' }
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
        url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf',
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
        resourceTitle: 'NCERT Class 9 Science (Direct PDF)',
        resourceUrl: 'https://ncert.nic.in/textbook/pdf/jesc1.pdf',
        isFreeOpenSource: true
      }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Class 10 Science (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/jesc2.pdf' }
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
      { title: 'NCERT Class 12 Mathematics (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/lema1.pdf' }
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
      { title: 'NCERT Indian Constitution at Work (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf' },
      { title: 'e-PG Pathshala Education Modules', author: 'INFLIBNET / UGC', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in' }
    ]
  },
  {
    id: 'wb-police',
    name: 'West Bengal Police (Constable & Sub-Inspector)',
    shortCode: 'WB Police',
    category: 'Government',
    description: 'Recruitment examination for WB Police Constable, Lady Constable, and Sub-Inspector cadres, conducted by the West Bengal Police Recruitment Board.',
    tag: 'State Police Recruitment',
    officialPortalUrl: 'https://wbpolice.gov.in',
    officialPortalName: 'West Bengal Police',
    officialPYQUrl: 'https://wbpolice.gov.in',
    syllabusHighlights: [
      'Written Test: General Awareness, Arithmetic, Reasoning, English & Bengali',
      'Physical Measurement Test (PMT) & Physical Efficiency Test (PET)',
      'SI Cadre: Additional descriptive paper and interview'
    ],
    popularTopics: ['Current Affairs', 'Bengali & English Grammar', 'General Science', 'Mental Ability & Reasoning'],
    openSourcePlatforms: [
      { id: 'ncert-police', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'Class 6-10 foundational textbooks for GK, Science, and Mathematics sections.', badge: 'Core Foundation' },
      { id: 'khan-police', name: 'Khan Academy', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Free practice for arithmetic, mental ability, and reasoning fundamentals.', badge: 'Free Practice' },
      { id: 'ndli-police', name: 'NDLI (National Digital Library)', provider: 'IIT Kharagpur / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ndl.iitkgp.ac.in', description: 'All-discipline reference material for general studies and GK preparation.', badge: 'National Portal' }
    ],
    topicResources: [
      { topicName: 'Bengali & English Grammar', description: 'Comprehension, synonyms, antonyms, idioms, and common error spotting for the language paper.', platformName: 'Banglar Shiksha Portal', platformType: 'Official Textbook', resourceTitle: 'WB Board Language Textbooks (Class 8-10)', resourceUrl: 'https://banglarshiksha.gov.in', isFreeOpenSource: true },
      { topicName: 'Arithmetic & Reasoning', description: 'Percentages, ratios, time-work, puzzles, and non-verbal reasoning for the written test.', platformName: 'Khan Academy', platformType: 'Practice Engine', resourceTitle: 'Arithmetic & Logical Reasoning Modules', resourceUrl: 'https://www.khanacademy.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Class 10 Science (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/jesc2.pdf' },
      { title: 'WB Board Language Textbooks', author: 'WBBSE', platform: 'Banglar Shiksha', url: 'https://banglarshiksha.gov.in' }
    ]
  },
  {
    id: 'wbpsc-clerkship',
    name: 'WBPSC Clerkship & Miscellaneous (Group C/D)',
    shortCode: 'WBPSC Misc',
    category: 'Government',
    description: 'State clerical and miscellaneous recruitment for Group C and D posts across West Bengal government departments, conducted by WBPSC.',
    tag: 'State Group C/D',
    officialPortalUrl: 'https://psc.wb.gov.in',
    officialPortalName: 'WBPSC Official Portal',
    officialPYQUrl: 'https://psc.wb.gov.in',
    syllabusHighlights: [
      'Compulsory: Bengali, English, Arithmetic, General Studies',
      'Optional: Constitution, Geography of WB, General Science, History',
      'Screening (for some posts) and personality interview'
    ],
    popularTopics: ['Bengali Language', 'English Comprehension', 'Mental Ability', 'Current Affairs'],
    openSourcePlatforms: [
      { id: 'ncert-clerk', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'Foundational school textbooks covering the General Studies paper.', badge: 'Core Foundation' },
      { id: 'khan-clerk', name: 'Khan Academy', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Arithmetic and data-interpretation practice modules.', badge: 'Free Practice' },
      { id: 'egyankosh-clerk', name: 'e-GyanKosh (IGNOU)', provider: 'IGNOU', type: 'Textbooks & Notes', url: 'https://egyankosh.ac.in', description: 'Undergraduate modules for geography of West Bengal and Indian history.', badge: 'IGNOU Open Library' }
    ],
    topicResources: [
      { topicName: 'Geography of West Bengal', description: 'Physical features, climate, rivers, agriculture, and districts of West Bengal for the optional paper.', platformName: 'e-GyanKosh / Banglar Shiksha', platformType: 'Open Repository', resourceTitle: 'Geography of West Bengal Open Modules', resourceUrl: 'https://egyankosh.ac.in', isFreeOpenSource: true },
      { topicName: 'English & Bengali Composition', description: 'Essay, precis, and comprehension required for both language papers.', platformName: 'Banglar Shiksha', platformType: 'Official Textbook', resourceTitle: 'WBBSE & WBCHSE Language Textbooks', resourceUrl: 'https://banglarshiksha.gov.in', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Physical Geography Class 11 (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/kegy1.pdf' },
      { title: 'WBBSE Bengali & English Textbooks', author: 'WBBSE', platform: 'Banglar Shiksha', url: 'https://banglarshiksha.gov.in' }
    ]
  },
  {
    id: 'wbhrb',
    name: 'West Bengal Staff Recruitment Commission (Group C & D)',
    shortCode: 'WBHRB',
    category: 'Government',
    description: 'Clerk, LDC, cashier, and office-staff recruitment for various West Bengal departments under the WB Staff Recruitment Commission.',
    tag: 'State Clerical Cadre',
    officialPortalUrl: 'https://wbhrb.in',
    officialPortalName: 'WBHRB Official',
    officialPYQUrl: 'https://wbhrb.in',
    syllabusHighlights: [
      'Prelims: Arithmetic, English, Bengali, Reasoning, General Awareness',
      'Post-specific skill tests (typing, shorthand) where applicable',
      'Document verification and final merit list'
    ],
    popularTopics: ['Reasoning', 'Arithmetic', 'Bengali & English Grammar', 'General Knowledge'],
    openSourcePlatforms: [
      { id: 'ncert-wbhrb', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'School-level textbooks for the written examination syllabus.', badge: 'Core Foundation' },
      { id: 'khan-wbhrb', name: 'Khan Academy', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Interactive arithmetic and reasoning practice.', badge: 'Free Practice' },
      { id: 'ndli-wbhrb', name: 'NDLI (National Digital Library)', provider: 'IIT Kharagpur / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ndl.iitkgp.ac.in', description: 'General studies references across multiple disciplines.', badge: 'National Portal' }
    ],
    topicResources: [
      { topicName: 'Logical Reasoning', description: 'Number series, coding-decoding, syllogisms, and seating arrangements for the reasoning paper.', platformName: 'Khan Academy', platformType: 'Practice Engine', resourceTitle: 'Logical Reasoning Practice Sets', resourceUrl: 'https://www.khanacademy.org', isFreeOpenSource: true },
      { topicName: 'General Awareness', description: 'Static GK, current affairs, Indian polity, and West Bengal-specific facts.', platformName: 'e-GyanKosh', platformType: 'Open Repository', resourceTitle: 'IGNOU General Studies Modules', resourceUrl: 'https://egyankosh.ac.in', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'NCERT Class 10 Science (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/jesc2.pdf' },
      { title: 'WBBSE Bengali & English Textbooks', author: 'WBBSE', platform: 'Banglar Shiksha', url: 'https://banglarshiksha.gov.in' }
    ]
  },
  {
    id: 'ssc-je',
    name: 'SSC JE (Junior Engineer)',
    shortCode: 'SSC JE',
    category: 'Government',
    description: 'Junior Engineer recruitment for Civil, Electrical, and Mechanical disciplines under central government departments, conducted by SSC.',
    tag: 'Central Engineering Recruitment',
    officialPortalUrl: 'https://ssc.gov.in',
    officialPortalName: 'SSC Official Portal',
    officialPYQUrl: 'https://ssc.gov.in',
    syllabusHighlights: [
      'Paper I: General Intelligence & Reasoning, General Awareness, General Engineering',
      'Paper II: Subject-specific Civil / Electrical / Mechanical engineering',
      'Document verification and medical examination'
    ],
    popularTopics: ['Engineering Mechanics', 'Electrical Circuits', 'Strength of Materials', 'Reasoning & GK'],
    openSourcePlatforms: [
      { id: 'nptel-je', name: 'NPTEL Engineering Courses', provider: 'IITs & IISc', type: 'Video Lectures', url: 'https://nptel.ac.in', description: 'University-level lectures for core Civil, Electrical, and Mechanical subjects.', badge: 'NPTEL Courseware' },
      { id: 'mitocw-je', name: 'MIT OpenCourseWare', provider: 'MIT', type: 'Video Lectures', url: 'https://ocw.mit.edu', description: 'Graduate engineering course materials and problem sets.', badge: 'CC Licensed' },
      { id: 'openstax-je', name: 'OpenStax Physics & Math', provider: 'Rice University', type: 'Textbooks & Notes', url: 'https://openstax.org', description: 'Peer-reviewed physics and mathematics textbooks for the technical paper.', badge: 'CC BY 4.0' },
      { id: 'ncert-je', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'Physics, Chemistry, and Mathematics fundamentals from Class 11-12.', badge: 'Core Foundation' }
    ],
    topicResources: [
      { topicName: 'Electrical Circuits & Machines', description: 'DC/AC circuits, transformers, induction motors, and measuring instruments for the electrical paper.', platformName: 'NPTEL', platformType: 'Video Lectures', resourceTitle: 'NPTEL Electrical Engineering Course Series', resourceUrl: 'https://nptel.ac.in', isFreeOpenSource: true },
      { topicName: 'Strength of Materials', description: 'Stress-strain relations, beams, bending moments, and shear forces for civil candidates.', platformName: 'NPTEL', platformType: 'Video Lectures', resourceTitle: 'NPTEL Mechanics of Solids', resourceUrl: 'https://nptel.ac.in', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'OpenStax University Physics Vol 1 (Direct PDF)', author: 'OpenStax', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/UniversityPhysicsVol1.pdf' },
      { title: 'Engineering Mechanics Modules', author: 'NPTEL / IIT', platform: 'NPTEL', url: 'https://nptel.ac.in' }
    ]
  },
  {
    id: 'epfo-ssa',
    name: 'EPFO SSA & Enforcement Officer',
    shortCode: 'EPFO',
    category: 'Government',
    description: 'Recruitment for Social Security Assistant (SSA) and Enforcement Officer posts under the Employees Provident Fund Organisation.',
    tag: 'Central Govt Departmental',
    officialPortalUrl: 'https://www.epfindia.gov.in',
    officialPortalName: 'EPFO Official',
    officialPYQUrl: 'https://www.epfindia.gov.in',
    syllabusHighlights: [
      'SSA: Reasoning, English, Quantitative Aptitude, GK, Computer Awareness',
      'EO: General (Reasoning, English, GK) + Economics/Social Science/Industrial Relations',
      'Typing skill test for SSA posts'
    ],
    popularTopics: ['Computer Awareness', 'Quantitative Aptitude', 'Industrial Relations', 'Labour Laws'],
    openSourcePlatforms: [
      { id: 'ncert-epfo', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'Economics and polity textbooks covering the general awareness syllabus.', badge: 'Core Foundation' },
      { id: 'khan-epfo', name: 'Khan Academy', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Quantitative aptitude and computer logic practice modules.', badge: 'Free Practice' },
      { id: 'openstax-epfo', name: 'OpenStax Economics', provider: 'Rice University', type: 'Textbooks & Notes', url: 'https://openstax.org', description: 'Peer-reviewed introductory economics text for the EO paper.', badge: 'CC BY 4.0' },
      { id: 'egyankosh-epfo', name: 'e-GyanKosh (IGNOU)', provider: 'IGNOU', type: 'Textbooks & Notes', url: 'https://egyankosh.ac.in', description: 'Labour law and industrial relations open modules.', badge: 'IGNOU Open Library' }
    ],
    topicResources: [
      { topicName: 'Industrial Relations & Labour Laws', description: 'Factories Act, industrial disputes, and employee provident fund legislation for the EO paper.', platformName: 'e-GyanKosh (IGNOU)', platformType: 'Open Repository', resourceTitle: 'IGNOU Labour & Industrial Law Modules', resourceUrl: 'https://egyankosh.ac.in', isFreeOpenSource: true },
      { topicName: 'Economics & Social Security', description: 'National income, social security schemes, and Indian economy basics.', platformName: 'OpenStax / PRS India', platformType: 'Open Textbooks', resourceTitle: 'OpenStax Principles of Economics', resourceUrl: 'https://openstax.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'OpenStax Principles of Economics 2e (Direct PDF)', author: 'OpenStax', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/PrinciplesEconomics2e.pdf' },
      { title: 'Labour Law Open Modules', author: 'IGNOU', platform: 'e-GyanKosh', url: 'https://egyankosh.ac.in' }
    ]
  },
  {
    id: 'lic-aao',
    name: 'LIC AAO & Insurance (LIC, NICL, UIIC, OICL)',
    shortCode: 'LIC / Insurance',
    category: 'Government',
    description: 'Recruitment for Assistant Administrative Officer (AAO), ADO, and Generalist posts across Life and General Insurance corporations.',
    tag: 'PSU Financial Services',
    officialPortalUrl: 'https://licindia.in',
    officialPortalName: 'LIC Careers',
    officialPYQUrl: 'https://licindia.in',
    syllabusHighlights: [
      'Prelims: English, Reasoning, Quantitative Aptitude',
      'Mains: Reasoning, Data Analysis, English, General/Financial Awareness',
      'Descriptive paper and interview for selected streams'
    ],
    popularTopics: ['Financial Awareness', 'Data Interpretation', 'Reasoning', 'English Language'],
    openSourcePlatforms: [
      { id: 'rbi-fin', name: 'RBI Financial Education', provider: 'Reserve Bank of India', type: 'Textbooks & Notes', url: 'https://rbi.org.in/financialeducation/', description: 'Official RBI material on banking, monetary policy, and financial markets.', badge: 'RBI Official' },
      { id: 'ncert-lic', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'Economics and commerce fundamentals for financial awareness.', badge: 'Core Foundation' },
      { id: 'openstax-lic', name: 'OpenStax Business & Finance', provider: 'Rice University', type: 'Textbooks & Notes', url: 'https://openstax.org', description: 'Introductory finance, accounting, and business textbooks.', badge: 'CC BY 4.0' },
      { id: 'nptel-lic', name: 'NPTEL Management Courses', provider: 'IITs & IISc', type: 'Video Lectures', url: 'https://nptel.ac.in', description: 'University lectures on financial management and corporate finance.', badge: 'NPTEL Courseware' }
    ],
    topicResources: [
      { topicName: 'Financial & Banking Awareness', description: 'Monetary policy, inflation, insurance regulations, and Indian financial institutions.', platformName: 'RBI Financial Education', platformType: 'Official Repository', resourceTitle: 'RBI Financial Education Series', resourceUrl: 'https://rbi.org.in/financialeducation/', isFreeOpenSource: true },
      { topicName: 'Data Analysis & Interpretation', description: 'Tables, charts, and caselet-based data interpretation for the mains paper.', platformName: 'Khan Academy', platformType: 'Practice Engine', resourceTitle: 'Data & Statistics Modules', resourceUrl: 'https://www.khanacademy.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'OpenStax Principles of Accounting Vol 1 (Direct PDF)', author: 'OpenStax', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/Principles_of_Accounting_Volume_1-WEB.pdf' },
      { title: 'RBI Banking Structure & Policy Guide (Direct PDF)', author: 'Reserve Bank of India', platform: 'RBI Financial Education', url: 'https://rbi.org.in/financialeducation/pdf/Banking_Structure.pdf' }
    ]
  },
  {
    id: 'ailet',
    name: 'AILET (NLU Delhi)',
    shortCode: 'AILET',
    category: 'Law & Entrance',
    description: 'All India Law Entrance Test conducted by the National Law University, Delhi for BA LLB (Hons), LLM, and PhD programmes.',
    tag: 'National Law University Entrance',
    officialPortalUrl: 'https://nationallawuniversitydelhi.in',
    officialPortalName: 'NLU Delhi',
    officialPYQUrl: 'https://nationallawuniversitydelhi.in',
    syllabusHighlights: [
      'Logical Reasoning (35 questions)',
      'Legal Reasoning & Legal Knowledge (35 questions)',
      'Current Affairs & General Knowledge (20 questions)',
      'English Language & Comprehension (20 questions)'
    ],
    popularTopics: ['Legal Reasoning', 'Logical Reasoning', 'Constitutional Law', 'Current Affairs'],
    openSourcePlatforms: [
      { id: 'constitution-ailet', name: 'Constitution of India Official Text', provider: 'Ministry of Law & Justice', type: 'Textbooks & Notes', url: 'https://legislative.gov.in/sites/default/files/COI_English.pdf', description: 'The authoritative text of the Constitution for legal knowledge preparation.', badge: 'Official Source' },
      { id: 'indiankanoon-ailet', name: 'Indian Kanoon', provider: 'Indian Kanoon', type: 'Textbooks & Notes', url: 'https://indiankanoon.org', description: 'Free searchable database of Supreme Court and High Court judgments.', badge: 'Case Law Open Access' },
      { id: 'swayam-ailet', name: 'SWAYAM Law Courses', provider: 'Ministry of Education', type: 'Video Lectures', url: 'https://swayam.gov.in', description: 'Open online courses on constitutional law, jurisprudence, and legal methods.', badge: 'Govt MOOCs' },
      { id: 'egpg-ailet', name: 'e-PG Pathshala Law', provider: 'UGC INFLIBNET', type: 'Textbooks & Notes', url: 'https://epgp.inflibnet.ac.in', description: 'Post-graduate law modules covering contracts, torts, and constitutional law.', badge: 'UGC INFLIBNET' }
    ],
    topicResources: [
      { topicName: 'Legal Reasoning & Legal Knowledge', description: 'Legal propositions, principles, and application to fact situations for the core paper.', platformName: 'SWAYAM / e-PG Pathshala', platformType: 'Open Courseware', resourceTitle: 'Legal Methods & Jurisprudence Modules', resourceUrl: 'https://epgp.inflibnet.ac.in', isFreeOpenSource: true },
      { topicName: 'Constitutional Law', description: 'Fundamental rights, directive principles, and landmark Supreme Court rulings.', platformName: 'Legislative Gov / Indian Kanoon', platformType: 'Official Repository', resourceTitle: 'Official Constitution Text & Landmark Judgments', resourceUrl: 'https://indiankanoon.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'Constitution of India Bare Act (Direct PDF)', author: 'Ministry of Law & Justice', platform: 'Official Legislative Portal', url: 'https://legislative.gov.in/sites/default/files/COI_English.pdf' },
      { title: 'Introduction to the Constitution of India', author: 'e-PG Pathshala', platform: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in' }
    ]
  },
  {
    id: 'slat',
    name: 'SLAT (Symbiosis Law Admission Test)',
    shortCode: 'SLAT',
    category: 'Law & Entrance',
    description: 'Computer-based law entrance for Symbiosis Law Schools (Pune, Noida, Hyderabad, Nagpur) covering analytical, logical, legal, and reading comprehension ability.',
    tag: 'Private Law University Entrance',
    officialPortalUrl: 'https://www.set-test.org',
    officialPortalName: 'SET / SLAT Official',
    officialPYQUrl: 'https://www.set-test.org',
    syllabusHighlights: [
      'Analytical Reasoning (12 questions)',
      'Logical Reasoning (12 questions)',
      'Legal Reasoning (12 questions)',
      'Reading Comprehension (12 questions)',
      'General Knowledge (12 questions)'
    ],
    popularTopics: ['Legal Reasoning', 'Logical & Analytical Reasoning', 'Reading Comprehension', 'Current Affairs'],
    openSourcePlatforms: [
      { id: 'constitution-slat', name: 'Constitution of India Official Text', provider: 'Ministry of Law & Justice', type: 'Textbooks & Notes', url: 'https://legislative.gov.in/sites/default/files/COI_English.pdf', description: 'Authoritative constitutional text for the legal reasoning paper.', badge: 'Official Source' },
      { id: 'indiankanoon-slat', name: 'Indian Kanoon', provider: 'Indian Kanoon', type: 'Textbooks & Notes', url: 'https://indiankanoon.org', description: 'Searchable case law database for landmark legal principles.', badge: 'Case Law Open Access' },
      { id: 'swayam-slat', name: 'SWAYAM Law Courses', provider: 'Ministry of Education', type: 'Video Lectures', url: 'https://swayam.gov.in', description: 'Open courses on legal reasoning and constitutional essentials.', badge: 'Govt MOOCs' },
      { id: 'gutenberg-slat', name: 'Project Gutenberg English Classics', provider: 'Project Gutenberg', type: 'Textbooks & Notes', url: 'https://www.gutenberg.org', description: 'Public-domain literature for reading comprehension practice.', badge: 'Public Domain' }
    ],
    topicResources: [
      { topicName: 'Legal Reasoning', description: 'Application of legal principles to hypothetical facts across contract, tort, and criminal law.', platformName: 'e-PG Pathshala', platformType: 'Open Courseware', resourceTitle: 'Legal Reasoning & Law Modules', resourceUrl: 'https://epgp.inflibnet.ac.in', isFreeOpenSource: true },
      { topicName: 'Reading Comprehension', description: 'Passage-based inference, tone, and main-idea questions from diverse sources.', platformName: 'Project Gutenberg', platformType: 'Open Repository', resourceTitle: 'Classic English Texts for RC Practice', resourceUrl: 'https://www.gutenberg.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'Constitution of India Bare Act (Direct PDF)', author: 'Ministry of Law & Justice', platform: 'Official Legislative Portal', url: 'https://legislative.gov.in/sites/default/files/COI_English.pdf' },
      { title: 'English Classics (Public Domain)', author: 'Various Authors', platform: 'Project Gutenberg', url: 'https://www.gutenberg.org' }
    ]
  },
  {
    id: 'xat',
    name: 'XAT (Xavier Aptitude Test)',
    shortCode: 'XAT',
    category: 'Law & Entrance',
    description: 'National management aptitude test conducted by XLRI for admission to over 160 B-schools across India, including the XAT Decision Making section.',
    tag: 'Management Entrance',
    officialPortalUrl: 'https://xatonline.in',
    officialPortalName: 'XAT Official',
    officialPYQUrl: 'https://xatonline.in',
    syllabusHighlights: [
      'Verbal & Logical Ability',
      'Decision Making (unique XAT section)',
      'Quantitative Aptitude & Data Interpretation',
      'General Knowledge & Essay'
    ],
    popularTopics: ['Decision Making', 'Verbal Ability', 'Quantitative Aptitude', 'Data Interpretation'],
    openSourcePlatforms: [
      { id: 'openstax-xat', name: 'OpenStax Business & Math', provider: 'Rice University', type: 'Textbooks & Notes', url: 'https://openstax.org', description: 'Peer-reviewed quantitative reasoning and business textbooks.', badge: 'CC BY 4.0' },
      { id: 'nptel-xat', name: 'NPTEL Management Courses', provider: 'IITs & IISc', type: 'Video Lectures', url: 'https://nptel.ac.in', description: 'University lectures on decision science and managerial economics.', badge: 'NPTEL Courseware' },
      { id: 'khan-xat', name: 'Khan Academy', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Quantitative and logical reasoning practice modules.', badge: 'Free Practice' },
      { id: 'mitocw-xat', name: 'MIT OpenCourseWare Economics', provider: 'MIT', type: 'Video Lectures', url: 'https://ocw.mit.edu', description: 'Foundational microeconomics and statistics courseware.', badge: 'CC Licensed' }
    ],
    topicResources: [
      { topicName: 'Decision Making', description: 'Ethical and situational decision questions unique to XAT based on business scenarios.', platformName: 'NPTEL', platformType: 'Video Lectures', resourceTitle: 'Decision Science & Ethics Courses', resourceUrl: 'https://nptel.ac.in', isFreeOpenSource: true },
      { topicName: 'Quantitative Aptitude & DI', description: 'Algebra, arithmetic, geometry, and data interpretation for the quantitative sections.', platformName: 'OpenStax / Khan Academy', platformType: 'Open Textbooks', resourceTitle: 'OpenStax Algebra & Statistics Texts', resourceUrl: 'https://openstax.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'OpenStax College Algebra 2e (Direct PDF)', author: 'OpenStax', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/CollegeAlgebra2e.pdf' },
      { title: 'OpenStax Introductory Statistics (Direct PDF)', author: 'OpenStax', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/IntroductoryStatistics.pdf' }
    ]
  },
  {
    id: 'snap',
    name: 'SNAP (Symbiosis National Aptitude Test)',
    shortCode: 'SNAP',
    category: 'Law & Entrance',
    description: 'National-level aptitude test for admission to all Symbiosis International University (SIU) institutes offering MBA and related programmes.',
    tag: 'Management Entrance',
    officialPortalUrl: 'https://snaptest.org',
    officialPortalName: 'SNAP Official',
    officialPYQUrl: 'https://snaptest.org',
    syllabusHighlights: [
      'General English (15 questions)',
      'Quantitative, Data Interpretation & Data Sufficiency (40 questions)',
      'Analytical & Logical Reasoning (35 questions)',
      'Current Affairs (10 questions)'
    ],
    popularTopics: ['Logical Reasoning', 'Quantitative Aptitude', 'Data Sufficiency', 'Current Affairs'],
    openSourcePlatforms: [
      { id: 'openstax-snap', name: 'OpenStax Math', provider: 'Rice University', type: 'Textbooks & Notes', url: 'https://openstax.org', description: 'Peer-reviewed algebra and statistics textbooks for the quantitative paper.', badge: 'CC BY 4.0' },
      { id: 'khan-snap', name: 'Khan Academy', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Reasoning and quantitative practice modules.', badge: 'Free Practice' },
      { id: 'ncert-snap', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'Mathematics fundamentals for quantitative aptitude.', badge: 'Core Foundation' },
      { id: 'nptel-snap', name: 'NPTEL Analytics Courses', provider: 'IITs & IISc', type: 'Video Lectures', url: 'https://nptel.ac.in', description: 'University lectures on data interpretation and analytics.', badge: 'NPTEL Courseware' }
    ],
    topicResources: [
      { topicName: 'Data Sufficiency', description: 'Determining whether given data is sufficient to answer quantitative questions.', platformName: 'Khan Academy', platformType: 'Practice Engine', resourceTitle: 'Data & Statistics Modules', resourceUrl: 'https://www.khanacademy.org', isFreeOpenSource: true },
      { topicName: 'Analytical & Logical Reasoning', description: 'Puzzles, arrangement, syllogisms, and critical reasoning for the reasoning paper.', platformName: 'OpenStax', platformType: 'Open Textbooks', resourceTitle: 'Contemporary Mathematics Text', resourceUrl: 'https://openstax.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'OpenStax Introductory Statistics (Direct PDF)', author: 'OpenStax', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/IntroductoryStatistics.pdf' },
      { title: 'NCERT Class 12 Mathematics (Direct PDF)', author: 'NCERT Board', platform: 'NCERT Official', url: 'https://ncert.nic.in/textbook/pdf/lema1.pdf' }
    ]
  },
  {
    id: 'nmat',
    name: 'NMAT by GMAC',
    shortCode: 'NMAT',
    category: 'Law & Entrance',
    description: 'GMAC-conducted computer-adaptive management aptitude test for admission to NMIMS and 30+ leading B-schools across India.',
    tag: 'Management Entrance',
    officialPortalUrl: 'https://www.nmat.org.in',
    officialPortalName: 'NMAT Official',
    officialPYQUrl: 'https://www.nmat.org.in',
    syllabusHighlights: [
      'Language Skills (36 questions)',
      'Quantitative Skills (36 questions)',
      'Logical Reasoning (36 questions)',
      'Computer-adaptive, sectional time limits'
    ],
    popularTopics: ['Language Skills', 'Quantitative Skills', 'Logical Reasoning', 'Reading Comprehension'],
    openSourcePlatforms: [
      { id: 'openstax-nmat', name: 'OpenStax Math & Writing', provider: 'Rice University', type: 'Textbooks & Notes', url: 'https://openstax.org', description: 'Peer-reviewed algebra, statistics, and writing textbooks.', badge: 'CC BY 4.0' },
      { id: 'khan-nmat', name: 'Khan Academy', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Quantitative and logical reasoning practice modules.', badge: 'Free Practice' },
      { id: 'owl-nmat', name: 'Purdue OWL', provider: 'Purdue University', type: 'Textbooks & Notes', url: 'https://owl.purdue.edu', description: 'Grammar, vocabulary, and academic writing reference for language skills.', badge: 'University Open Access' },
      { id: 'ncert-nmat', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'Mathematics fundamentals for quantitative skills.', badge: 'Core Foundation' }
    ],
    topicResources: [
      { topicName: 'Language Skills', description: 'Grammar, vocabulary, reading comprehension, and sentence correction for the verbal paper.', platformName: 'Purdue OWL', platformType: 'Open Repository', resourceTitle: 'Grammar & Style Guide', resourceUrl: 'https://owl.purdue.edu', isFreeOpenSource: true },
      { topicName: 'Quantitative Skills', description: 'Arithmetic, algebra, and geometry in a computer-adaptive format.', platformName: 'OpenStax', platformType: 'Open Textbooks', resourceTitle: 'OpenStax College Algebra', resourceUrl: 'https://openstax.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'OpenStax College Algebra 2e (Direct PDF)', author: 'OpenStax', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/CollegeAlgebra2e.pdf' },
      { title: 'Grammar & Writing Reference', author: 'Purdue OWL', platform: 'Purdue OWL', url: 'https://owl.purdue.edu' }
    ]
  },
  {
    id: 'nift',
    name: 'NIFT Entrance (Design, Technology & Management)',
    shortCode: 'NIFT',
    category: 'Law & Entrance',
    description: 'National Institute of Fashion Technology entrance examination for B.Des, B.FTech, M.Des, and M.FTech programmes across fashion design, technology, and management.',
    tag: 'Design & Fashion Entrance',
    officialPortalUrl: 'https://www.nift.ac.in',
    officialPortalName: 'NIFT Official',
    officialPYQUrl: 'https://www.nift.ac.in',
    syllabusHighlights: [
      'CAT: Creative Ability Test (for B.Des)',
      'GAT: General Ability Test (Quantitative, Communication, Analytical, GK)',
      'Situation Test / Group Discussion & Interview',
      'Case Study (for Management programmes)'
    ],
    popularTopics: ['Creative Ability Test', 'Quantitative Ability', 'Communication Ability', 'Analytical Ability'],
    openSourcePlatforms: [
      { id: 'ncert-nift', name: 'NCERT e-Pathshala', provider: 'NCERT / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ncert.nic.in/textbook/pdf/keps2.pdf', description: 'General studies and English foundation for the GAT paper.', badge: 'Core Foundation' },
      { id: 'ndli-nift', name: 'NDLI Design & Art Collection', provider: 'IIT Kharagpur / Ministry of Education', type: 'Textbooks & Notes', url: 'https://ndl.iitkgp.ac.in', description: 'Open collections on design fundamentals, art history, and fashion studies.', badge: 'National Portal' },
      { id: 'openlib-nift', name: 'Internet Archive / Open Library', provider: 'Internet Archive', type: 'Textbooks & Notes', url: 'https://openlibrary.org', description: 'Public-domain books on drawing, design, and art appreciation.', badge: 'Universal Open Access' },
      { id: 'khan-nift', name: 'Khan Academy Art History', provider: 'Khan Academy (Non-Profit)', type: 'Video Lectures', url: 'https://www.khanacademy.org', description: 'Free art history and visual analysis courseware for the CAT.', badge: 'Free Practice' }
    ],
    topicResources: [
      { topicName: 'Creative Ability & Design Aptitude', description: 'Drawing, innovation, observation, and design sensibility for the Creative Ability Test.', platformName: 'Khan Academy', platformType: 'Video Lectures', resourceTitle: 'Art History & Visual Analysis', resourceUrl: 'https://www.khanacademy.org', isFreeOpenSource: true },
      { topicName: 'General Ability Test', description: 'Quantitative, communication, analytical ability, and current affairs for the GAT paper.', platformName: 'NCERT e-Pathshala', platformType: 'Open Textbooks', resourceTitle: 'NCERT English & Mathematics Textbooks', resourceUrl: 'https://ncert.nic.in', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'Art Appreciation Collection', author: 'Khan Academy', platform: 'Khan Academy', url: 'https://www.khanacademy.org' },
      { title: 'Design Fundamentals (Open Library)', author: 'Public Domain', platform: 'Open Library', url: 'https://openlibrary.org' }
    ]
  },
  {
    id: 'pte',
    name: 'PTE Academic',
    shortCode: 'PTE',
    category: 'Study Abroad',
    description: 'Pearson Test of English (Academic) — a computer-based English proficiency test for study abroad accepted by universities in Australia, UK, USA, Canada, and New Zealand.',
    tag: 'English Proficiency (Computer-Based)',
    officialPortalUrl: 'https://www.pearsonpte.com',
    officialPortalName: 'Pearson PTE Official',
    officialPYQUrl: 'https://www.pearsonpte.com/preparation',
    syllabusHighlights: [
      'Speaking & Writing (77-93 minutes)',
      'Reading (32-41 minutes)',
      'Listening (45-57 minutes)',
      'AI-scored, single 2-hour session'
    ],
    popularTopics: ['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Essay Writing'],
    openSourcePlatforms: [
      { id: 'bbc-pte', name: 'BBC Learning English', provider: 'BBC', type: 'Textbooks & Notes', url: 'https://www.bbc.co.uk/learningenglish', description: 'Pronunciation, grammar, and listening resources for the integrated skills test.', badge: 'Free Public Service' },
      { id: 'brcouncil-pte', name: 'British Council LearnEnglish', provider: 'British Council', type: 'Video Lectures', url: 'https://learnenglish.britishcouncil.org', description: 'Speaking, writing, and vocabulary modules aligned to proficiency descriptors.', badge: 'Free Public Service' },
      { id: 'owl-pte', name: 'Purdue OWL', provider: 'Purdue University', type: 'Textbooks & Notes', url: 'https://owl.purdue.edu', description: 'Academic writing and grammar reference for the writing section.', badge: 'University Open Access' },
      { id: 'khan-pte', name: 'Khan Academy English Grammar', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Grammar and usage practice exercises.', badge: 'Free Practice' }
    ],
    topicResources: [
      { topicName: 'Integrated Speaking (Read Aloud & Describe Image)', description: 'Oral fluency, pronunciation, and structured image description tasks.', platformName: 'BBC Learning English', platformType: 'Open Repository', resourceTitle: 'Pronunciation & Speaking Courses', resourceUrl: 'https://www.bbc.co.uk/learningenglish', isFreeOpenSource: true },
      { topicName: 'Academic Writing & Essay', description: 'Summarising written text and writing an argumentative academic essay.', platformName: 'Purdue OWL', platformType: 'Open Repository', resourceTitle: 'Academic Writing Resources', resourceUrl: 'https://owl.purdue.edu', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'Academic Writing Guide', author: 'Purdue OWL', platform: 'Purdue OWL', url: 'https://owl.purdue.edu' },
      { title: 'Learning English Courses', author: 'British Council', platform: 'British Council LearnEnglish', url: 'https://learnenglish.britishcouncil.org' }
    ]
  },
  {
    id: 'duolingo',
    name: 'Duolingo English Test',
    shortCode: 'DET',
    category: 'Study Abroad',
    description: 'AI-powered, on-demand English proficiency test accepted by 5000+ universities worldwide. Taken online at home in under one hour with results in two days.',
    tag: 'English Proficiency (On-Demand)',
    officialPortalUrl: 'https://englishtest.duolingo.com',
    officialPortalName: 'Duolingo English Test',
    officialPYQUrl: 'https://englishtest.duolingo.com/practice',
    syllabusHighlights: [
      'Adaptive test: Reading, Writing, Listening, Speaking',
      'Integrated question types (e.g. read and complete, read aloud, write about the photo)',
      'Interview & writing sample sent with certified score',
      'Computer-adaptive, scored 10-160'
    ],
    popularTopics: ['Read & Complete', 'Interactive Reading', 'Write About the Photo', 'Speaking Sample'],
    openSourcePlatforms: [
      { id: 'bbc-det', name: 'BBC Learning English', provider: 'BBC', type: 'Textbooks & Notes', url: 'https://www.bbc.co.uk/learningenglish', description: 'Integrated English skills practice for the adaptive format.', badge: 'Free Public Service' },
      { id: 'brcouncil-det', name: 'British Council LearnEnglish', provider: 'British Council', type: 'Video Lectures', url: 'https://learnenglish.britishcouncil.org', description: 'Reading, writing, and speaking modules for fast-paced preparation.', badge: 'Free Public Service' },
      { id: 'owl-det', name: 'Purdue OWL', provider: 'Purdue University', type: 'Textbooks & Notes', url: 'https://owl.purdue.edu', description: 'Academic writing reference for the writing sample tasks.', badge: 'University Open Access' }
    ],
    topicResources: [
      { topicName: 'Integrated Reading & Writing', description: 'Fill-in-the-blank, sentence completion, and short writing tasks across the adaptive test.', platformName: 'British Council', platformType: 'Open Repository', resourceTitle: 'Integrated Skills Courses', resourceUrl: 'https://learnenglish.britishcouncil.org', isFreeOpenSource: true },
      { topicName: 'Speaking Sample', description: 'Structured spontaneous speaking on a given prompt, recorded and assessed.', platformName: 'BBC Learning English', platformType: 'Open Repository', resourceTitle: 'Speaking & Fluency Courses', resourceUrl: 'https://www.bbc.co.uk/learningenglish', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'Integrated Skills Courses', author: 'British Council', platform: 'LearnEnglish', url: 'https://learnenglish.britishcouncil.org' },
      { title: 'Speaking & Fluency Resources', author: 'BBC', platform: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish' }
    ]
  },
  {
    id: 'act',
    name: 'ACT (American College Testing)',
    shortCode: 'ACT',
    category: 'Study Abroad',
    description: 'US college admissions test measuring English, Mathematics, Reading, and Science reasoning, with an optional writing section.',
    tag: 'US Undergraduate Admission',
    officialPortalUrl: 'https://www.act.org',
    officialPortalName: 'ACT Official',
    officialPYQUrl: 'https://www.act.org/content/dam/act/unsecured/documents/Preparing-for-the-ACT.pdf',
    syllabusHighlights: [
      'English (75 questions, 45 minutes)',
      'Mathematics (60 questions, 60 minutes)',
      'Reading (40 questions, 35 minutes)',
      'Science (40 questions, 35 minutes)',
      'Optional Writing (40 minutes)'
    ],
    popularTopics: ['Reading Comprehension', 'Math Problem Solving', 'Science Data Interpretation', 'English Usage'],
    openSourcePlatforms: [
      { id: 'khan-act', name: 'Khan Academy', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Official ACT-prep-aligned practice for math, reading, and science sections.', badge: 'Free Practice' },
      { id: 'openstax-act', name: 'OpenStax Math & Science', provider: 'Rice University', type: 'Textbooks & Notes', url: 'https://openstax.org', description: 'Algebra, geometry, and science reasoning textbooks for the core sections.', badge: 'CC BY 4.0' },
      { id: 'gutenberg-act', name: 'Project Gutenberg Reading Passages', provider: 'Project Gutenberg', type: 'Textbooks & Notes', url: 'https://www.gutenberg.org', description: 'Public-domain literature for reading practice.', badge: 'Public Domain' },
      { id: 'owl-act', name: 'Purdue OWL', provider: 'Purdue University', type: 'Textbooks & Notes', url: 'https://owl.purdue.edu', description: 'Grammar and usage reference for the English section.', badge: 'University Open Access' }
    ],
    topicResources: [
      { topicName: 'Science Reasoning', description: 'Data representation, research summaries, and conflicting viewpoints passages.', platformName: 'Khan Academy', platformType: 'Practice Engine', resourceTitle: 'Science & Data Interpretation Modules', resourceUrl: 'https://www.khanacademy.org', isFreeOpenSource: true },
      { topicName: 'Math Problem Solving', description: 'Pre-algebra, algebra, geometry, and trigonometry problem sets.', platformName: 'OpenStax', platformType: 'Open Textbooks', resourceTitle: 'OpenStax College Algebra & Geometry', resourceUrl: 'https://openstax.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'OpenStax College Algebra 2e (Direct PDF)', author: 'OpenStax', platform: 'OpenStax Rice University', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/CollegeAlgebra2e.pdf' },
      { title: 'Official Preparing for the ACT Guide (Direct PDF)', author: 'ACT Assessment Board', platform: 'ACT Official', url: 'https://www.act.org/content/dam/act/unsecured/documents/Preparing-for-the-ACT.pdf' }
    ]
  },
  {
    id: 'lsat',
    name: 'LSAT (US/Canada Law School Admission Test)',
    shortCode: 'LSAT',
    category: 'Study Abroad',
    description: 'Standardised test for law school admission in the US and Canada, assessing reading comprehension, analytical reasoning (logic games), and logical reasoning.',
    tag: 'Global Law School Admission',
    officialPortalUrl: 'https://www.lsac.org',
    officialPortalName: 'LSAC Official',
    officialPYQUrl: 'https://www.lsac.org/lsat/free-official-lsat-prep',
    syllabusHighlights: [
      'Logical Reasoning (two scored sections)',
      'Reading Comprehension (one scored section)',
      'Unscored Variable Section',
      'LSAT Writing (online essay)'
    ],
    popularTopics: ['Logical Reasoning', 'Analytical Reasoning', 'Reading Comprehension', 'Law School Admissions'],
    openSourcePlatforms: [
      { id: 'khan-lsat', name: 'Khan Academy Official LSAT Prep', provider: 'Khan Academy (Non-Profit)', type: 'Practice Engine', url: 'https://www.khanacademy.org', description: 'Free official LSAT preparation built with LSAC, including full practice tests.', badge: 'Official Prep Partner' },
      { id: 'gutenberg-lsat', name: 'Project Gutenberg', provider: 'Project Gutenberg', type: 'Textbooks & Notes', url: 'https://www.gutenberg.org', description: 'Dense classic texts for reading comprehension practice.', badge: 'Public Domain' },
      { id: 'owl-lsat', name: 'Purdue OWL', provider: 'Purdue University', type: 'Textbooks & Notes', url: 'https://owl.purdue.edu', description: 'Critical thinking and argument analysis resources.', badge: 'University Open Access' }
    ],
    topicResources: [
      { topicName: 'Logical Reasoning', description: 'Arguments, assumptions, flaws, and inference questions — the largest scored section.', platformName: 'Khan Academy', platformType: 'Practice Engine', resourceTitle: 'Official LSAT Logical Reasoning Practice', resourceUrl: 'https://www.khanacademy.org', isFreeOpenSource: true },
      { topicName: 'Analytical Reasoning (Logic Games)', description: 'Ordering, grouping, and assignment games with constraint-based deductions.', platformName: 'Khan Academy', platformType: 'Practice Engine', resourceTitle: 'Official LSAT Logic Games Practice', resourceUrl: 'https://www.khanacademy.org', isFreeOpenSource: true }
    ],
    recommendedTextbooks: [
      { title: 'Official LSAT Prep', author: 'LSAC / Khan Academy', platform: 'Khan Academy', url: 'https://www.khanacademy.org' },
      { title: 'Classic English Texts', author: 'Public Domain', platform: 'Project Gutenberg', url: 'https://www.gutenberg.org' }
    ]
  }
];

export const examCategories = ['All', 'Study Abroad', 'Government', 'Law & Entrance'];

