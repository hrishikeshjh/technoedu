export interface RoadmapVideo {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  duration: string;
  keyTakeaway: string;
}

export interface RoadmapQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RoadmapLevel {
  id: string;
  levelNumber: number;
  title: string;
  topic: string;
  difficulty: 'Foundation' | 'Core' | 'Applied' | 'Advanced' | 'Mastery';
  description: string;
  estimatedMinutes: number;
  xpReward: number;
  videos: RoadmapVideo[];
  basicNotes: {
    summary: string;
    keyPoints: string[];
  };
  advancedNotes: {
    title: string;
    strategy: string;
    highYieldInsights: string[];
    pyqTip: string;
  };
  quiz: RoadmapQuizQuestion[];
}

export interface ExamRoadmap {
  courseId: string;
  courseName: string;
  shortCode: string;
  tagline: string;
  topics: string[];
  levels: RoadmapLevel[];
}

export const EXAM_ROADMAPS: Record<string, ExamRoadmap> = {
  'ugc-net': {
    courseId: 'ugc-net',
    courseName: 'UGC-NET & JRF',
    shortCode: 'UGC-NET',
    tagline: 'Step-by-step mastery ladder from Paper 1 fundamentals to Paper 2 core concepts',
    topics: [
      'Teaching & Research Aptitude',
      'Communication & Indian Logic',
      'Data Interpretation',
      'ICT & Higher Education',
      'Paper 2: Core CS & Commerce',
    ],
    levels: [
      {
        id: 'ugc-lvl-1',
        levelNumber: 1,
        title: 'Teaching & Research Foundations',
        topic: 'Teaching & Research Aptitude',
        difficulty: 'Foundation',
        description: 'Master Paper 1 Unit 1 & Unit 2 fundamentals: levels of teaching, learner characteristics, and hypothesis testing.',
        estimatedMinutes: 33,
        xpReward: 100,
        videos: [
          {
            id: 'ugc-v1',
            youtubeId: 'iz6jdPJQB9c',
            title: 'UGC NET Paper 1 | Unit 1: Teaching Aptitude | Most Important Topics',
            channel: 'Arpita Karwa',
            duration: '12:32',
            keyTakeaway: 'Memory, Understanding, and Reflective levels of teaching alongside Bloom’s taxonomy.',
          },
          {
            id: 'ugc-v2',
            youtubeId: 'hYojpq8TlHM',
            title: 'Hypothesis Testing in Research | UGC NET Paper 1 Research Aptitude',
            channel: 'PW UGC NET',
            duration: '09:19',
            keyTakeaway: 'Null vs Alternative hypothesis, Type I (alpha) & Type II (beta) errors.',
          },
          {
            id: 'ugc-v3',
            youtubeId: 'eXubZqVQNhw',
            title: 'Research Aptitude | All about Hypothesis (10 Min Concept)',
            channel: 'PW UGC NET',
            duration: '10:51',
            keyTakeaway: 'Parametric vs Non-parametric tests and sampling error reduction.',
          },
        ],
        basicNotes: {
          summary: 'Paper 1 Units 1 & 2 carry 10–12 guaranteed MCQs. Focus on distinguishing levels of teaching and matching research designs to hypothesis testing errors.',
          keyPoints: [
            'Memory Level (Herbart) -> Recall & Rote; Understanding Level (Morrison) -> Mastery of concepts; Reflective Level (Hunt) -> Problem-centric critical thinking.',
            'Type I Error (Alpha): Rejecting a true Null Hypothesis (H0). Type II Error (Beta): Failing to reject a false Null Hypothesis.',
            'Probability sampling (Random, Stratified, Cluster) eliminates selection bias compared to non-probability sampling (Snowball, Quota).',
          ],
        },
        advancedNotes: {
          title: 'Advanced Research Design & Assertion-Reason Matrix',
          strategy: 'NTA shifts 60% of Teaching & Research questions to Match-the-Following and Statement I / Statement II format.',
          highYieldInsights: [
            'Experimental research is the ONLY design establishing strict cause-and-effect via random assignment and manipulation of independent variables.',
            'Ex-post facto research investigates cause AFTER the effect has occurred (no manipulation possible).',
            'Formative evaluation happens DURING instruction to improve learning; Summative happens AT THE END for grading/certification.',
            'Triangulation combines multiple methods/sources in qualitative research to boost credibility and validity.',
          ],
          pyqTip: 'When a question mentions "minimizing Type I error", lower the significance level (alpha) from 0.05 to 0.01 — note this increases Type II error.',
        },
        quiz: [
          {
            id: 'ugc-q1',
            question: 'Which level of teaching focuses on problem-solving and independent critical thinking?',
            options: ['Memory Level', 'Understanding Level', 'Reflective Level', 'Autonomous Development'],
            correctIndex: 2,
            explanation: 'Reflective Level (Morris L. Bigge / Hunt) is the highest classroom level centered on original problem-solving.',
          },
          {
            id: 'ugc-q2',
            question: 'Rejecting a true Null Hypothesis (H0) is classified as:',
            options: ['Type I Error', 'Type II Error', 'Sampling Bias', 'Standard Error'],
            correctIndex: 0,
            explanation: 'A Type I error (false positive, probability alpha) occurs when a true H0 is wrongly rejected.',
          },
        ],
      },
      {
        id: 'ugc-lvl-2',
        levelNumber: 2,
        title: 'Communication Models & Indian Logic',
        topic: 'Communication & Indian Logic',
        difficulty: 'Core',
        description: 'Decode Shannon-Weaver, Berlo SMCR, classroom barriers, and Nyaya Anumana (Indian Logic) syllogisms.',
        estimatedMinutes: 39,
        xpReward: 150,
        videos: [
          {
            id: 'ugc-v4',
            youtubeId: 'dGLvhcBSemk',
            title: 'UGC NET Paper 1 | Communication Models & Barriers',
            channel: 'Adda247 UGC NET',
            duration: '10:20',
            keyTakeaway: 'Linear vs Transactional vs Interactive communication models and semantic noise.',
          },
          {
            id: 'ugc-v5',
            youtubeId: 'k_dLiW5Em4E',
            title: 'Anumana and its Structure | Indian Logic | Logical Reasoning',
            channel: 'JRF Guru',
            duration: '13:36',
            keyTakeaway: 'Paksha, Sadhya, Hetu, and Vyapti in Nyaya inference.',
          },
          {
            id: 'ugc-v6',
            youtubeId: 'siklZbIHaS0',
            title: 'Types of Anumana + Real-Life Examples & Tricks',
            channel: 'Arpita Karwa',
            duration: '15:52',
            keyTakeaway: 'Purvavat, Sesavat, Samanyatodrsta, and Hetvabhasa (fallacies).',
          },
        ],
        basicNotes: {
          summary: 'Indian Logic (Pramanas & Anumana) plus Communication Models consistently yield 6–8 rapid-fire questions in Paper 1.',
          keyPoints: [
            '6 Pramanas (Classical Indian Schools): Pratyaksha (Perception), Anumana (Inference), Upamana (Comparison), Shabda (Verbal Testimony), Arthapatti (Postulation), Anupalabdhi (Non-cognition).',
            'Anumana components: Paksha (minor term / hill), Sadhya (major term / fire), Hetu (middle term / smoke).',
            'Semantic barriers arise from jargon, faulty translations, and ambiguous symbols in classroom communication.',
          ],
        },
        advancedNotes: {
          title: 'Advanced Hetvabhasa (Fallacies) & Mass Media Theory',
          strategy: 'Memorize the 5 Nyaya fallacies of Hetu (Hetvabhasa) and match them cleanly against Western Square of Opposition rules.',
          highYieldInsights: [
            'Savyabhichara (Irregular middle): Hetu is not uniformly concomitant with Sadhya (e.g., "All knowable things are fiery").',
            'Viruddha (Contradictory middle): Hetu proves the exact opposite of Sadhya ("Sound is eternal because it is produced").',
            'Asiddha (Unproved middle): Ashrayasiddha ("Sky-lotus is fragrant"), Svarupasiddha, Vyapyatvasiddha.',
            'Kinesics = body language; Proxemics = spatial distance; Chronemics = use of time in non-verbal communication.',
          ],
          pyqTip: 'In NTA Square of Opposition questions, remember Contradictories (A-O, E-I) can NEVER both be true and NEVER both be false.',
        },
        quiz: [
          {
            id: 'ugc-q3',
            question: 'In "The hill has fire because it has smoke", what is "smoke"?',
            options: ['Paksha (Minor term)', 'Sadhya (Major term)', 'Hetu (Middle term)', 'Vyapti'],
            correctIndex: 2,
            explanation: 'Smoke is the reason/middle term (Hetu) that establishes the presence of fire (Sadhya) on the hill (Paksha).',
          },
          {
            id: 'ugc-q4',
            question: 'Which communication barrier occurs when a word has multiple interpretations?',
            options: ['Physical barrier', 'Semantic barrier', 'Organizational barrier', 'Mechanical barrier'],
            correctIndex: 1,
            explanation: 'Semantic barriers stem from linguistic ambiguity, jargon, or denotative/connotative mismatches.',
          },
        ],
      },
      {
        id: 'ugc-lvl-3',
        levelNumber: 3,
        title: 'Data Interpretation Speed Drills',
        topic: 'Data Interpretation',
        difficulty: 'Applied',
        description: 'Build high-speed calculation shortcuts for tables, percentage growth, ratios, and missing DI sets.',
        estimatedMinutes: 47,
        xpReward: 200,
        videos: [
          {
            id: 'ugc-v7',
            youtubeId: '_HaeGd93xD4',
            title: 'Data Interpretation UGC NET Paper 1 Tricks',
            channel: 'Testbook NET JRF',
            duration: '14:59',
            keyTakeaway: 'Fraction-to-percentage table & approximation tricks to solve 5 DI questions in under 4 minutes.',
          },
          {
            id: 'ugc-v8',
            youtubeId: 'LvPvAivXLVY',
            title: 'Missing Data Interpretation For UGC NET Paper 1',
            channel: 'Testbook NET JRF',
            duration: '31:55',
            keyTakeaway: 'Step-by-step reconstruction of missing table cells using row/column totals and ratio constraints.',
          },
        ],
        basicNotes: {
          summary: 'Data Interpretation gives 5 linked questions (10 marks) in every single UGC-NET shift. Mastering percentage change and ratios guarantees near-100% accuracy.',
          keyPoints: [
            'Memorize key fractions: 1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%, 1/12 = 8.33%.',
            'Percentage growth = ((New - Old) / Old) × 100. Always keep the baseline ("than" / "of") in the denominator.',
            'For missing DI tables, solve the row/column with only one unknown first before propagating ratios.',
          ],
        },
        advancedNotes: {
          title: 'Advanced DI Approximation & Weighted Average Shortcuts',
          strategy: 'Never multiply 4-digit numbers directly in CBT mode. Use 10% / 1% base splitting and option-spread elimination.',
          highYieldInsights: [
            'Base-10% splitting: To find 23% of 4,620, compute 20% (924) + 3% (138.6) = 1,062.6 in 5 seconds.',
            'Successive percentage change: a + b + (ab / 100). Useful for multi-year revenue/enrollment CAGR estimates.',
            'When comparing ratios a/b vs c/d, cross-multiply a×d vs b×c instead of dividing decimals.',
          ],
          pyqTip: 'NTA options in DI are rarely closer than 1.5%. Round denominators to 2 significant digits first, then adjust directionally.',
        },
        quiz: [
          {
            id: 'ugc-q5',
            question: 'If university enrollment grows from 800 to 1,000, what is the percentage increase?',
            options: ['20%', '25%', '12.5%', '30%'],
            correctIndex: 1,
            explanation: '((1000 - 800) / 800) × 100 = (200 / 800) × 100 = 25%.',
          },
          {
            id: 'ugc-q6',
            question: 'Which fraction equals 14.28%?',
            options: ['1/6', '1/7', '1/8', '1/9'],
            correctIndex: 1,
            explanation: '1/7 ≈ 0.14285, or 14.28%.',
          },
        ],
      },
      {
        id: 'ugc-lvl-4',
        levelNumber: 4,
        title: 'ICT, Higher Education & Regulatory Bodies',
        topic: 'ICT & Higher Education',
        difficulty: 'Advanced',
        description: 'Master digital initiatives (SWAYAM, MOOCs, e-PG Pathshala), protocols, and Indian Higher Education statutory bodies.',
        estimatedMinutes: 24,
        xpReward: 250,
        videos: [
          {
            id: 'ugc-v9',
            youtubeId: 'u56EzXAvKQk',
            title: 'Information & Communication Technology (ICT) | NTA UGC NET Paper 1',
            channel: 'Arpita Karwa',
            duration: '13:32',
            keyTakeaway: 'Memory hierarchy, number systems (binary/hex), malware types, and digital initiatives.',
          },
          {
            id: 'ugc-v10',
            youtubeId: 'Ed1EeqcYt_8',
            title: 'Higher Education | Regulatory Bodies & Established Years',
            channel: 'UGC NET Testbook',
            duration: '10:14',
            keyTakeaway: 'UGC, AICTE, NCTE, NAAC, NIRF, NEP 2020 4-stage structure & GER targets.',
          },
        ],
        basicNotes: {
          summary: 'ICT and Higher Education combine factual acronyms with NEP 2020 policy shifts.',
          keyPoints: [
            'Memory speed (fastest -> slowest): Registers -> L1/L2 Cache -> RAM -> SSD/HDD -> Optical/Magnetic Tape.',
            'SWAYAM 4 Quadrants: (1) Video Lecture, (2) Specially prepared reading material, (3) Self-assessment tests, (4) Online discussion forum.',
            'NEP 2020 targets 50% Gross Enrolment Ratio (GER) in higher education by 2035 and introduces HECI with 4 verticals (NHERC, NAC, HEGC, GEC).',
          ],
        },
        advancedNotes: {
          title: 'Advanced NEP 2020, Commissions & Digital Governance Notes',
          strategy: 'Expect chronological ordering questions of pre- and post-independence Education Commissions alongside SWAYAM national coordinators.',
          highYieldInsights: [
            'Chronology: Radhakrishnan Commission (1948-49) -> Mudaliar (1952-53) -> Kothari (1964-66) -> NPE (1986) -> NEP (2020).',
            'SWAYAM Coordinators: NPTEL (Engineering), UGC (Non-Tech PG), CEC (Undergrad), IGNOU (Out-of-school), NCERT/NIOS (School), IIMB (Management).',
            'Phishing vs Vishing vs Smishing vs Ransomware — NTA asks exact cyber-security threat distinctions every cycle.',
          ],
          pyqTip: 'Memorize the 1024-step storage hierarchy: KB -> MB -> GB -> TB -> PB -> EB -> ZB -> YB (each step = 2^10).',
        },
        quiz: [
          {
            id: 'ugc-q7',
            question: 'How many quadrants does a SWAYAM MOOC course consist of?',
            options: ['2 quadrants', '3 quadrants', '4 quadrants', '5 quadrants'],
            correctIndex: 2,
            explanation: 'SWAYAM uses a 4-quadrant approach: Video, Reading Material, Self-Assessment Tests, and Discussion Forum.',
          },
          {
            id: 'ugc-q8',
            question: 'What is the NEP 2020 target for Gross Enrolment Ratio (GER) in Higher Education by 2035?',
            options: ['35%', '40%', '50%', '65%'],
            correctIndex: 2,
            explanation: 'NEP 2020 aims to raise Higher Education GER from ~26.3% to 50% by 2035.',
          },
        ],
      },
      {
        id: 'ugc-lvl-5',
        levelNumber: 5,
        title: 'Paper 2 Core Mastery (TOC & International Business)',
        topic: 'Paper 2: Core CS & Commerce',
        difficulty: 'Mastery',
        description: 'Capstone level connecting Paper 2 deep concepts (Finite Automata / International Business) to JRF-level scoring.',
        estimatedMinutes: 49,
        xpReward: 350,
        videos: [
          {
            id: 'ugc-v11',
            youtubeId: 'Qa6csfkK7_I',
            title: 'Finite State Machine (Finite Automata)',
            channel: 'Neso Academy',
            duration: '11:05',
            keyTakeaway: 'DFA vs NFA formal 5-tuple definitions and state transition graphs.',
          },
          {
            id: 'ugc-v12',
            youtubeId: 'jsg3t0Aq0Vg',
            title: 'Automata and its Types (Chomsky Hierarchy)',
            channel: 'Neso Academy',
            duration: '11:53',
            keyTakeaway: 'Regular, Context-Free, Context-Sensitive, and Recursively Enumerable languages.',
          },
          {
            id: 'ugc-v13',
            youtubeId: 'wFd8EgVNIJE',
            title: 'Introduction to International Business & Trade Theories',
            channel: 'IIT Roorkee',
            duration: '26:10',
            keyTakeaway: 'Absolute vs Comparative Advantage, Factor Proportions, and EPRG framework.',
          },
        ],
        basicNotes: {
          summary: 'Paper 2 accounts for 200 out of 300 marks (100 MCQs). Mastering core foundational theorems gives you the edge for JRF cutoff.',
          keyPoints: [
            'Chomsky Hierarchy: Type 3 (Regular -> Finite Automata), Type 2 (Context-Free -> PDA), Type 1 (Context-Sensitive -> LBA), Type 0 (Unrestricted -> Turing Machine).',
            'Every DFA is an NFA, and every NFA can be converted to an equivalent DFA (subset construction).',
            'International Business: Ricardo’s Comparative Advantage explains trade even when one nation holds absolute advantage in all goods.',
          ],
        },
        advancedNotes: {
          title: 'JRF Capstone Master Sheet: Decidability & Strategic Frameworks',
          strategy: 'Use closure-property tables and trade-theory matrices to eliminate 2 wrong options immediately in Paper 2.',
          highYieldInsights: [
            'Regular languages are closed under Union, Intersection, Complement, Concatenation, Kleene Star, and Reversal.',
            'Context-Free Languages (CFL) are NOT closed under Intersection or Complement (only Intersection with a Regular language!).',
            'Halting Problem of Turing Machines is Recursively Enumerable (RE) but NOT Recursive (undecidable).',
            'Heckscher-Ohlin theory predicts nations export goods intensive in their abundant factors (Leontief Paradox challenged this for the US).',
          ],
          pyqTip: 'For Paper 2 CS, always check Pumping Lemma non-regularity examples (a^n b^n, palindromes, prime lengths).',
        },
        quiz: [
          {
            id: 'ugc-q9',
            question: 'Which automaton recognizes Context-Free Languages (Type 2)?',
            options: ['Finite Automaton', 'Pushdown Automaton (PDA)', 'Linear Bounded Automaton', 'Mealy Machine'],
            correctIndex: 1,
            explanation: 'Pushdown Automata (with a stack) recognize Type 2 Context-Free Languages.',
          },
          {
            id: 'ugc-q10',
            question: 'Regular languages are closed under which of the following?',
            options: ['Union only', 'Complement only', 'Intersection and Complement', 'Neither'],
            correctIndex: 2,
            explanation: 'Regular languages are closed under union, intersection, complement, concatenation, and Kleene closure.',
          },
        ],
      },
    ],
  },

  'upsc-cse': {
    courseId: 'upsc-cse',
    courseName: 'UPSC Civil Services (CSE)',
    shortCode: 'UPSC CSE',
    tagline: 'Structured Prelims + Mains ladder from NCERT Polity to Economy & Environment',
    topics: [
      'Indian Polity & Constitution',
      'Parliament & Governance',
      'Modern Indian History',
      'Geography & Monsoon',
      'Economy & Environment',
    ],
    levels: [
      {
        id: 'upsc-lvl-1',
        levelNumber: 1,
        title: 'Constitution, Preamble & Fundamental Rights',
        topic: 'Indian Polity & Constitution',
        difficulty: 'Foundation',
        description: 'Build rock-solid constitutional basics: Preamble keywords, Basic Structure doctrine, and Part III Fundamental Rights.',
        estimatedMinutes: 25,
        xpReward: 100,
        videos: [
          {
            id: 'upsc-v1',
            youtubeId: 'LYHAy68pQWA',
            title: 'Preamble of Indian Constitution | Importance of Preamble | Indian Polity',
            channel: 'Priya Jain',
            duration: '09:27',
            keyTakeaway: 'Sovereign, Socialist, Secular, Democratic, Republic & 42nd Amendment changes.',
          },
          {
            id: 'upsc-v2',
            youtubeId: 'pvbcJ7SkG8w',
            title: 'Fundamental Rights Indian Constitution | Quick Revision',
            channel: 'Priya Jain',
            duration: '15:22',
            keyTakeaway: 'Articles 12–35, Writ Jurisdiction (Art 32 vs 226), and Rights available only to citizens.',
          },
        ],
        basicNotes: {
          summary: 'Indian Polity consistently contributes 15–20 Prelims questions. Constitutional philosophy and Part III Rights form the core foundation.',
          keyPoints: [
            '42nd Amendment (1976) added Socialist, Secular, and Integrity to the Preamble.',
            'Kesavananda Bharati (1973) established that the Preamble is part of the Constitution and Parliament cannot alter the Basic Structure.',
            'Fundamental Rights available ONLY to Indian Citizens: Articles 15, 16, 19, 29, and 30.',
          ],
        },
        advancedNotes: {
          title: 'Advanced Constitutional Benchmarks & Supreme Court Doctrines',
          strategy: 'Distinguish carefully between Art 32 (Supreme Court, only for Fundamental Rights) and Art 226 (High Court, wider writ jurisdiction including legal rights).',
          highYieldInsights: [
            'Doctrine of Eclipse (Art 13(1)): Pre-constitutional laws inconsistent with FRs become dormant, not dead.',
            'Doctrine of Severability: Only the unconstitutional portion of an Act is struck down if separable.',
            'Right to Privacy (Art 21) was affirmed as a Fundamental Right in K.S. Puttaswamy v. Union of India (2017).',
            'During National Emergency (Art 352), Art 20 & Art 21 can NEVER be suspended (44th Amendment).',
          ],
          pyqTip: 'UPSC loves testing whether "Right to Property" is a Fundamental Right (No — it moved to Art 300A as a Constitutional/Legal Right via 44th Amendment).',
        },
        quiz: [
          {
            id: 'upsc-q1',
            question: 'Which pair of Fundamental Rights can NEVER be suspended even during a National Emergency?',
            options: ['Articles 14 & 19', 'Articles 20 & 21', 'Articles 25 & 26', 'Articles 19 & 32'],
            correctIndex: 1,
            explanation: 'Per the 44th Constitutional Amendment, Articles 20 and 21 cannot be suspended under Article 359.',
          },
          {
            id: 'upsc-q2',
            question: 'Which Articles are available exclusively to Indian citizens and not to foreigners?',
            options: ['14, 20, 21', '15, 16, 19, 29, 30', '21A, 23, 24', '25, 27, 28'],
            correctIndex: 1,
            explanation: 'Articles 15, 16, 19, 29, and 30 apply exclusively to citizens of India.',
          },
        ],
      },
      {
        id: 'upsc-lvl-2',
        levelNumber: 2,
        title: 'Parliamentary Procedures & Executive',
        topic: 'Parliament & Governance',
        difficulty: 'Core',
        description: 'Understand legislative sessions, prorogation, dissolution, Money Bills vs Financial Bills, and parliamentary motions.',
        estimatedMinutes: 35,
        xpReward: 150,
        videos: [
          {
            id: 'upsc-v3',
            youtubeId: 'UTnorkVEUCo',
            title: 'Sessions of Parliament | Polity Simplified | Drishti IAS English',
            channel: 'Drishti IAS : English',
            duration: '17:29',
            keyTakeaway: 'Summoning, Adjournment, Adjournment Sine Die, Quorum, and Lame-duck sessions.',
          },
          {
            id: 'upsc-v4',
            youtubeId: 'VQKKMxjQnV8',
            title: 'Prorogation of Parliament | Article 85 Explained',
            channel: 'Drishti IAS : English',
            duration: '17:57',
            keyTakeaway: 'Difference between Adjournment (Presiding Officer) and Prorogation/Dissolution (President) & effect on pending bills.',
          },
        ],
        basicNotes: {
          summary: 'Parliamentary procedure questions test exact constitutional powers of the President vs Speaker/Chairman.',
          keyPoints: [
            'Maximum gap between two sessions of Parliament cannot exceed 6 months (Article 85).',
            'Adjournment suspends a sitting; Prorogation terminates a session (by President); Dissolution ends the life of Lok Sabha.',
            'Money Bill (Art 110) can ONLY be introduced in Lok Sabha with prior President recommendation; Speaker’s certification is final.',
          ],
        },
        advancedNotes: {
          title: 'Advanced Lapsing of Bills & Parliamentary Committees Matrix',
          strategy: 'Memorize the 5-rule Lapsing of Bills matrix upon Lok Sabha dissolution — this appears nearly every alternate Prelims.',
          highYieldInsights: [
            'A bill pending in Rajya Sabha and NOT passed by Lok Sabha does NOT lapse upon Lok Sabha dissolution.',
            'A bill pending in Lok Sabha (whether originated in LS or transmitted by RS) LAPSES on dissolution.',
            'A bill passed by both Houses and awaiting President’s assent (or returned for reconsideration) does NOT lapse.',
            'Public Accounts Committee (PAC): 22 members (15 LS + 7 RS); no Minister can be a member; Chairman is traditionally from Opposition.',
          ],
          pyqTip: 'Joint Sitting (Art 108) is allowed ONLY for Ordinary Bills and Financial Bills (not Money Bills or Constitutional Amendment Bills).',
        },
        quiz: [
          {
            id: 'upsc-q3',
            question: 'Who has the constitutional authority to prorogue a session of Parliament?',
            options: ['Speaker of Lok Sabha', 'Prime Minister', 'President of India', 'Parliamentary Affairs Minister'],
            correctIndex: 2,
            explanation: 'Under Article 85(2), the President summons and prorogues Houses of Parliament.',
          },
          {
            id: 'upsc-q4',
            question: 'Which bill does NOT lapse on dissolution of the Lok Sabha?',
            options: [
              'A bill originating and pending in Lok Sabha',
              'A bill passed by Lok Sabha but pending in Rajya Sabha',
              'A bill pending in Rajya Sabha and not passed by Lok Sabha',
              'A bill transmitted by Rajya Sabha and pending in Lok Sabha',
            ],
            correctIndex: 2,
            explanation: 'A bill pending in the Rajya Sabha that has not been passed by the Lok Sabha survives dissolution.',
          },
        ],
      },
      {
        id: 'upsc-lvl-3',
        levelNumber: 3,
        title: 'Modern Indian Freedom Struggle (1857–1947)',
        topic: 'Modern Indian History',
        difficulty: 'Applied',
        description: 'Trace the chronological arc from 1857 Revolt and INC Moderates to Gandhian Mass Movements and Constitutional Acts.',
        estimatedMinutes: 48,
        xpReward: 200,
        videos: [
          {
            id: 'upsc-v5',
            youtubeId: 'osQpCMdUTpU',
            title: 'Revision of Modern Indian History for UPSC in 30 Minutes',
            channel: 'UPSC Wallah',
            duration: '30:49',
            keyTakeaway: 'Chronology of Socio-Religious Reforms, Swadeshi, Non-Cooperation, Civil Disobedience & Quit India.',
          },
          {
            id: 'upsc-v6',
            youtubeId: 'b_6QogPFufs',
            title: 'The Making of the National Movement: 1870s–1947',
            channel: 'PW Class 8',
            duration: '17:28',
            keyTakeaway: 'NCERT foundation connecting Partition of Bengal (1905) to Cabinet Mission (1946).',
          },
        ],
        basicNotes: {
          summary: 'Modern History is the highest-ROI history segment for UPSC Prelims & GS Paper I.',
          keyPoints: [
            '1905: Partition of Bengal & Swadeshi Movement; 1907: Surat Split (Moderates vs Extremists); 1916: Lucknow Pact.',
            '1917 Champaran (first Civil Disobedience), 1918 Ahmedabad Mill Strike (first Hunger Strike), 1918 Kheda (first Non-Cooperation).',
            'Government of India Act 1919 introduced Dyarchy in provinces; GOI Act 1935 introduced Provincial Autonomy and Federal Court.',
          ],
        },
        advancedNotes: {
          title: 'Advanced Constitutional Acts & Governor-General Chronology',
          strategy: 'UPSC asks exact provisions distinguishing Charter Acts (1813, 1833, 1853) and Council Acts (1861, 1892, 1909).',
          highYieldInsights: [
            'Charter Act 1833 made Governor-General of Bengal the Governor-General of India (Lord William Bentinck) and ended East India Company commercial monopoly.',
            'Indian Councils Act 1909 (Morley-Minto) introduced separate electorates; GOI Act 1919 extended it to Sikhs, Indian Christians, Anglo-Indians.',
            'August Offer (1940) first explicitly recognized Indians’ right to frame their own Constitution; Cripps Mission (1942) offered Dominion Status post-WWII.',
          ],
          pyqTip: 'Always verify which INC Session presided over key resolutions: 1929 Lahore (Purna Swaraj, JL Nehru), 1931 Karachi (Fundamental Rights, Patel).',
        },
        quiz: [
          {
            id: 'upsc-q5',
            question: 'Which Act introduced "Dyarchy" at the Provincial level in British India?',
            options: ['Indian Councils Act 1909', 'Government of India Act 1919', 'Government of India Act 1935', 'Charter Act 1853'],
            correctIndex: 1,
            explanation: 'The Montagu-Chelmsford Reforms (GOI Act 1919) introduced provincial dyarchy (Reserved vs Transferred subjects).',
          },
          {
            id: 'upsc-q6',
            question: 'Which Gandhian satyagraha was his first Hunger Strike in India?',
            options: ['Champaran (1917)', 'Kheda (1918)', 'Ahmedabad Mill Strike (1918)', 'Rowlatt Satyagraha (1919)'],
            correctIndex: 2,
            explanation: 'Gandhi undertook his first fast unto death / hunger strike during the 1918 Ahmedabad Mill Workers strike.',
          },
        ],
      },
      {
        id: 'upsc-lvl-4',
        levelNumber: 4,
        title: 'Indian Monsoon & Climatology',
        topic: 'Geography & Monsoon',
        difficulty: 'Advanced',
        description: 'Decode ITCZ shifts, Somali Jet, Mascarene High, El Niño / La Niña, and Indian Ocean Dipole mechanisms.',
        estimatedMinutes: 15,
        xpReward: 250,
        videos: [
          {
            id: 'upsc-v7',
            youtubeId: 'DuX133AeeyY',
            title: 'Indian Monsoon Explained Through Animation | UPSC English',
            channel: 'PW OnlyIAS English',
            duration: '07:12',
            keyTakeaway: 'Differential heating, Tibetan Plateau heating, Subtropical Westerly Jet withdrawal & Tropical Easterly Jet.',
          },
          {
            id: 'upsc-v8',
            youtubeId: 'sEieZp66syE',
            title: 'Indian Monsoon Insights & Jet Streams Revision',
            channel: 'OnlyIAS Extended',
            duration: '07:37',
            keyTakeaway: 'Break in monsoon, Western Disturbances, and Retreating Monsoon (Tamil Nadu rainfall).',
          },
        ],
        basicNotes: {
          summary: 'Understanding physical drivers of the Indian Monsoon unlocks both Indian Geography and Agriculture questions.',
          keyPoints: [
            'Summer shift of ITCZ northwards to the Gangetic Plain creates a low-pressure monsoon trough.',
            'South-West Monsoon splits into Arabian Sea branch (hits Western Ghats) and Bay of Bengal branch (funneled by Arakan/Garo-Khasi-Jaintia hills).',
            'North-East (Retreating) Monsoon picks up moisture from Bay of Bengal to bring winter rain to Coromandel Coast (Tamil Nadu).',
          ],
        },
        advancedNotes: {
          title: 'Advanced ENSO, IOD & Madden-Julian Oscillation Dynamics',
          strategy: 'Connect global ocean-atmosphere oscillations to regional rainfall anomalies in UPSC Prelims.',
          highYieldInsights: [
            'Positive Indian Ocean Dipole (warmer Western Indian Ocean near Africa vs cooler Eastern IO near Sumatra) enhances Indian monsoon and can offset weak El Niño.',
            'La Niña strengthens Walker Circulation and generally brings above-normal monsoon rains to India.',
            'Madden-Julian Oscillation (MJO) is an eastward-moving tropical rainfall pulse (30–60 day cycle) triggering active/break monsoon phases.',
          ],
          pyqTip: 'Western Disturbances originate over the Mediterranean Sea and are steered into NW India by the Subtropical Westerly Jet Stream — vital for Rabi wheat.',
        },
        quiz: [
          {
            id: 'upsc-q7',
            question: 'Which phenomenon generally strengthens the Indian South-West Monsoon?',
            options: ['Strong El Niño', 'Negative Indian Ocean Dipole', 'Positive Indian Ocean Dipole', 'Weak Mascarene High'],
            correctIndex: 2,
            explanation: 'A Positive IOD creates warmer waters in the western Indian Ocean, boosting moisture transport toward India.',
          },
          {
            id: 'upsc-q8',
            question: 'Tamil Nadu receives the bulk of its annual rainfall from:',
            options: ['Arabian Sea SW Monsoon', 'North-East / Retreating Monsoon', 'Western Disturbances', 'Mango Showers'],
            correctIndex: 1,
            explanation: 'During Oct–Dec, NE trade winds pick up moisture over the Bay of Bengal and precipitate over coastal Tamil Nadu.',
          },
        ],
      },
      {
        id: 'upsc-lvl-5',
        levelNumber: 5,
        title: 'RBI Monetary Policy & Climate Governance',
        topic: 'Economy & Environment',
        difficulty: 'Mastery',
        description: 'Master RBI Repo/MPC instruments, inflation targeting, Biodiversity conventions, and UPSC Mains integration.',
        estimatedMinutes: 34,
        xpReward: 350,
        videos: [
          {
            id: 'upsc-v9',
            youtubeId: 'bj70Z2tpIgc',
            title: 'RBI Monetary Policy & Repo Rate Mechanics | Unacademy IAS English',
            channel: 'Unacademy IAS: English',
            duration: '11:59',
            keyTakeaway: 'Repo, Reverse Repo, SDF, MSF, CRR, SLR and Monetary Policy Committee (MPC) mandate.',
          },
          {
            id: 'upsc-v10',
            youtubeId: '7o3EFSFAEFM',
            title: 'Climate Change – Mind Map Environment | Drishti IAS English',
            channel: 'Drishti IAS : English',
            duration: '07:58',
            keyTakeaway: 'UNFCCC, Paris Agreement NDCs, Loss & Damage Fund, and Carbon Markets.',
          },
          {
            id: 'upsc-v11',
            youtubeId: 'FP4gcl4XP4s',
            title: 'Biodiversity | Environment & Ecology | UPSC English',
            channel: 'GetintoIAS',
            duration: '24:29',
            keyTakeaway: 'In-situ vs Ex-situ conservation, IUCN Red List, Ramsar Wetlands, and Biodiversity Hotspots.',
          },
        ],
        basicNotes: {
          summary: 'Economy and Environment together form nearly 35–40% of UPSC Prelims. Focus on mechanism clarity over rote figures.',
          keyPoints: [
            'MPC (6 members: 3 RBI + 3 Govt; RBI Governor has casting vote) targets CPI Combined inflation at 4% ± 2%.',
            'Raising Repo Rate tightens liquidity (Dear Money policy) to curb demand-pull inflation.',
            'India has 4 Biodiversity Hotspots: Himalayas, Indo-Burma, Western Ghats & Sri Lanka, and Sundaland (Nicobar).',
          ],
        },
        advancedNotes: {
          title: 'UPSC Capstone: Fiscal-Monetary Coordination & Environmental Treaties',
          strategy: 'Map every international convention (CBD, CITES, Ramsar, CMS, Stockholm, Basel, Rotterdam) to its Indian statutory Act.',
          highYieldInsights: [
            'Standing Deposit Facility (SDF) replaced Fixed Reverse Repo as the floor of the LAF corridor without requiring RBI collateral.',
            'Wildlife (Protection) Act 1972 (amended 2022) rationalized schedules from 6 down to 4, aligning directly with CITES Appendices.',
            'Biological Diversity Act 2002 establishes 3-tier governance: NBA (National), SBB (State), and BMC (Local Biodiversity Management Committees).',
          ],
          pyqTip: 'CRAR/Basel norms and Statutory Liquidity Ratio (SLR) apply to commercial banks; NBFCs do not maintain CRR with RBI.',
        },
        quiz: [
          {
            id: 'upsc-q9',
            question: 'What is India’s official CPI inflation target band under the Monetary Policy Framework?',
            options: ['2% ± 1%', '4% ± 2%', '5% ± 2%', '6% ± 1%'],
            correctIndex: 1,
            explanation: 'The RBI MPC targets 4% CPI inflation with a tolerance band of +/- 2% (2% to 6%).',
          },
          {
            id: 'upsc-q10',
            question: 'Which of the following is an EX-SITU biodiversity conservation method?',
            options: ['National Park', 'Biosphere Reserve', 'Seed Bank & Botanical Garden', 'Sacred Grove'],
            correctIndex: 2,
            explanation: 'Seed banks, zoos, and botanical gardens conserve species outside their natural habitat (ex-situ).',
          },
        ],
      },
    ],
  },

  'neet-ug': {
    courseId: 'neet-ug',
    courseName: 'NEET UG (Medical Entrance)',
    shortCode: 'NEET UG',
    tagline: 'High-yield NCERT + conceptual mastery ladder across Biology, Physics & Chemistry',
    topics: [
      'Cell Biology & Division',
      'Genetics & Inheritance',
      'Physics: Kinematics & Thermodynamics',
      'Chemistry: Bonding & Hybridization',
      'Organic Chemistry Foundations',
    ],
    levels: [
      {
        id: 'neet-lvl-1',
        levelNumber: 1,
        title: 'Cell Cycle, Mitosis & Meiosis',
        topic: 'Cell Biology & Division',
        difficulty: 'Foundation',
        description: 'Master G1, S, G2 checkpoints, DNA content (2C vs 4C) calculations, and Meiosis I Prophase stages.',
        estimatedMinutes: 24,
        xpReward: 100,
        videos: [
          {
            id: 'neet-v1',
            youtubeId: 'U5vAO_f2LDQ',
            title: 'Cell Cycle Phases | Khan Academy',
            channel: 'khanacademymedicine',
            duration: '05:43',
            keyTakeaway: 'Interphase (G1, S, G2), G0 quiescent phase, and M-phase progression.',
          },
          {
            id: 'neet-v2',
            youtubeId: 'kaSIjIzAtYA',
            title: 'Mitosis, Meiosis and Sexual Reproduction',
            channel: 'Khan Academy',
            duration: '18:24',
            keyTakeaway: 'Synapsis, crossing over in Pachytene, and homologous chromosome separation in Anaphase I.',
          },
        ],
        basicNotes: {
          summary: 'Cell Cycle & Division is an annual 3–4 MCQ certainty in NEET Biology directly from NCERT Class 11 Chapter 10.',
          keyPoints: [
            'S phase doubles DNA content (2C -> 4C) while chromosome number (2n) remains UNCHANGED.',
            'Prophase I (L-Z-P-D-D): Leptotene (condensation) -> Zygotene (synapsis) -> Pachytene (crossing over via Recombinase) -> Diplotene (chiasmata) -> Diakinesis (terminalisation).',
            'Metaphase is the best stage to study chromosome morphology.',
          ],
        },
        advancedNotes: {
          title: 'Advanced Ploidy & DNA-Content Numerical Matrix',
          strategy: 'Never confuse chromosome number (N) with DNA amount (C) across Meiosis I and Meiosis II.',
          highYieldInsights: [
            'G1: 2n, 2C -> S & G2: 2n, 4C -> After Meiosis I (Telophase I): n, 2C -> After Meiosis II: n, 1C.',
            'Centromeres split ONLY during Mitotic Anaphase and Meiotic Anaphase II (NOT Anaphase I!).',
            'Quiescent stage (G0): Cells like adult heart cells remain metabolically active but do not proliferate unless signaled.',
          ],
          pyqTip: 'Remember: Recombinase enzyme acts in Pachytene; Synaptonemal complex dissolves in Diplotene.',
        },
        quiz: [
          {
            id: 'neet-q1',
            question: 'During which stage of Prophase I does crossing over occur?',
            options: ['Leptotene', 'Zygotene', 'Pachytene', 'Diplotene'],
            correctIndex: 2,
            explanation: 'Crossing over between non-sister chromatids of homologous chromosomes occurs in Pachytene.',
          },
          {
            id: 'neet-q2',
            question: 'If a diploid cell has 2n = 16 chromosomes and 2C DNA in G1, what are the values after S phase?',
            options: ['2n = 32, 4C', '2n = 16, 4C', 'n = 8, 2C', '2n = 32, 2C'],
            correctIndex: 1,
            explanation: 'S phase duplicates DNA (2C -> 4C) without changing chromosome count (still 2n = 16).',
          },
        ],
      },
      {
        id: 'neet-lvl-2',
        levelNumber: 2,
        title: 'Mendelian Genetics & Inheritance',
        topic: 'Genetics & Inheritance',
        difficulty: 'Core',
        description: 'Solve dihybrid crosses, Punnett squares, incomplete dominance, and pedigree charts quickly.',
        estimatedMinutes: 15,
        xpReward: 150,
        videos: [
          {
            id: 'neet-v3',
            youtubeId: 'NR3779ef9yQ',
            title: 'An Introduction to Mendelian Genetics | Khan Academy',
            channel: 'khanacademymedicine',
            duration: '05:10',
            keyTakeaway: 'Law of Dominance, Law of Segregation, and Independent Assortment.',
          },
          {
            id: 'neet-v4',
            youtubeId: 'UeyYGeg-jDI',
            title: 'Mendelian Genetics and Punnett Squares',
            channel: 'Osmosis from Elsevier',
            duration: '09:31',
            keyTakeaway: 'Monohybrid (3:1, 1:2:1), Test Cross (1:1), and Autosomal vs X-linked inheritance.',
          },
        ],
        basicNotes: {
          summary: 'Genetics & Biotechnology carry ~25% of NEET Biology marks. Master ratios and exceptions first.',
          keyPoints: [
            'Incomplete dominance (Snapdragon / Antirrhinum): Phenotypic and genotypic ratios are BOTH 1:2:1.',
            'Codominance (ABO Blood Group IA, IB): Both alleles express equally in heterozygote IAIB.',
            'Number of gametes = 2^n, where n = number of heterozygous gene pairs.',
          ],
        },
        advancedNotes: {
          title: 'Advanced Linkage, Recombination & Pedigree Shortcuts',
          strategy: 'Use the 2-step Pedigree Elimination shortcut: check for skipping of generations (recessive) and father-to-daughter / mother-to-son transmission.',
          highYieldInsights: [
            '1 map unit (centiMorgan) = 1% recombination frequency (Sturtevant). Distance between genes is proportional to crossing over.',
            'Pleiotropy: Single gene affecting multiple traits (e.g., Phenylketonuria, Starch synthesis in pea).',
            'Polygenic inheritance (Human skin color, height): Additive effect of multiple genes giving bell-curve distribution.',
          ],
          pyqTip: 'In X-linked recessive traits (e.g. Haemophilia, Colour blindness), criss-cross inheritance occurs: affected father passes allele to carrier daughter, who passes to grandson.',
        },
        quiz: [
          {
            id: 'neet-q3',
            question: 'How many distinct gametes are produced by an organism with genotype AaBbCc?',
            options: ['4', '6', '8', '16'],
            correctIndex: 2,
            explanation: 'Number of heterozygous pairs n = 3, so gametes = 2^3 = 8.',
          },
          {
            id: 'neet-q4',
            question: 'Which condition shows a 1:2:1 phenotypic ratio in F2 generation?',
            options: ['Complete Dominance', 'Incomplete Dominance', 'Epistasis', 'Polygenic Inheritance'],
            correctIndex: 1,
            explanation: 'In incomplete dominance (e.g. Snapdragon flower color), heterozygotes show an intermediate phenotype giving 1:2:1.',
          },
        ],
      },
      {
        id: 'neet-lvl-3',
        levelNumber: 3,
        title: 'Kinematics & Thermodynamics (Physics)',
        topic: 'Physics: Kinematics & Thermodynamics',
        difficulty: 'Applied',
        description: 'Build rapid numerical accuracy in 1D motion equations, graphs, and First & Second Laws of Thermodynamics.',
        estimatedMinutes: 32,
        xpReward: 200,
        videos: [
          {
            id: 'neet-v5',
            youtubeId: 'ulXdXTkIkAM',
            title: 'Kinematics Physics Formulas & Graphs',
            channel: 'The Organic Chemistry Tutor',
            duration: '16:50',
            keyTakeaway: 'SUVAT equations, free-fall symmetry, and slope/area interpretation of v-t graphs.',
          },
          {
            id: 'neet-v6',
            youtubeId: 'NyOYW07-L5g',
            title: 'First Law of Thermodynamics - Internal Energy, Heat and Work',
            channel: 'The Organic Chemistry Tutor',
            duration: '11:27',
            keyTakeaway: 'Sign conventions for Q = ΔU + W and isothermal/adiabatic/isochoric processes.',
          },
          {
            id: 'neet-v7',
            youtubeId: 'DWiCaDPM7Hk',
            title: 'Second Law of Thermodynamics - Entropy & Spontaneous Processes',
            channel: 'The Organic Chemistry Tutor',
            duration: '04:11',
            keyTakeaway: 'Carnot efficiency η = 1 - T2/T1 and entropy constraints.',
          },
        ],
        basicNotes: {
          summary: 'Kinematics and Thermodynamics are high-scoring, formula-driven chapters in NEET Physics.',
          keyPoints: [
            'Slope of x-t = velocity; Slope of v-t = acceleration; Area under v-t = displacement.',
            'Physics First Law sign convention: ΔQ = ΔU + ΔW (W > 0 when gas expands).',
            'Isothermal: ΔT = 0 -> ΔU = 0; Adiabatic: ΔQ = 0 -> ΔU = -ΔW.',
          ],
        },
        advancedNotes: {
          title: 'Advanced NEET Physics Numerical Traps & Carnot Shortcuts',
          strategy: 'Always convert temperatures to Kelvin (K = °C + 273) before applying Carnot or ideal gas formulas.',
          highYieldInsights: [
            'Distance traveled in nth second: Sn = u + a/2 (2n - 1). For drop from rest, ratio in consecutive seconds is 1 : 3 : 5 : 7.',
            'Adiabatic slope is γ times steeper than Isothermal slope on a P-V diagram.',
            'Carnot Refrigerator COP: β = T2 / (T1 - T2) = (1 - η) / η.',
          ],
          pyqTip: 'In NEET Physics, watch the sign difference between Physics (W = PΔV) and Chemistry (W = -PΔV)!',
        },
        quiz: [
          {
            id: 'neet-q5',
            question: 'A body is dropped from rest (g = 10 m/s²). What is the ratio of distances fallen in the 1st, 2nd, and 3rd seconds?',
            options: ['1:2:3', '1:4:9', '1:3:5', '1:1:1'],
            correctIndex: 2,
            explanation: 'Galileo’s law of odd numbers: distances in successive equal intervals from rest follow 1:3:5.',
          },
          {
            id: 'neet-q6',
            question: 'For an isothermal expansion of an ideal gas, which quantity is zero?',
            options: ['Work done (W)', 'Heat absorbed (Q)', 'Change in internal energy (ΔU)', 'Entropy change (ΔS)'],
            correctIndex: 2,
            explanation: 'Internal energy U of an ideal gas depends only on temperature; since ΔT = 0, ΔU = 0.',
          },
        ],
      },
      {
        id: 'neet-lvl-4',
        levelNumber: 4,
        title: 'Chemical Bonding & Hybridization',
        topic: 'Chemistry: Bonding & Hybridization',
        difficulty: 'Advanced',
        description: 'Predict molecular geometry, bond angles, sigma/pi bonds, and hybridization in under 15 seconds.',
        estimatedMinutes: 22,
        xpReward: 250,
        videos: [
          {
            id: 'neet-v8',
            youtubeId: 'Vqx9a2aU99c',
            title: 'Valence Bond Theory & Hybrid Atomic Orbitals',
            channel: 'The Organic Chemistry Tutor',
            duration: '10:39',
            keyTakeaway: 'Orbital overlap, sp, sp2, sp3, sp3d, sp3d2 geometry and lone pair repulsion.',
          },
          {
            id: 'neet-v9',
            youtubeId: 'pdJeQUd2g_4',
            title: 'Hybridization, Sigma & Pi Bonds - sp, sp2, sp3',
            channel: 'The Organic Chemistry Tutor',
            duration: '10:55',
            keyTakeaway: 'Steric number shortcut and counting sigma/pi bonds in organic structures.',
          },
        ],
        basicNotes: {
          summary: 'Chemical Bonding contributes 3–4 direct questions every year and underpins all of Organic & Inorganic Chemistry.',
          keyPoints: [
            'Steric Number H = ½ (V + M - C + A), where V = valence e- of central atom, M = monovalent atoms, C = +charge, A = -charge.',
            'Single bond = 1σ; Double bond = 1σ + 1π; Triple bond = 1σ + 2π.',
            'Repulsion order (VSEPR): lp-lp > lp-bp > bp-bp.',
          ],
        },
        advancedNotes: {
          title: 'Advanced MOT Bond Order & Isoelectronic Shortcuts',
          strategy: 'Use the 14-electron N2 benchmark rule for Molecular Orbital Theory (MOT) bond orders and paramagnetism.',
          highYieldInsights: [
            'Total e- = 14 (N2, CO, CN-, NO+): Bond order = 3.0. Every ±1 electron drops bond order by 0.5.',
            'Paramagnetic exceptions: O2 (16 e-, 2 unpaired e- in π*2p) and B2 (10 e-).',
            'Bent’s Rule: More electronegative substituents prefer orbitals with less s-character (axial in PCl5).',
          ],
          pyqTip: 'Memorize SF4 (see-saw, sp3d), ClF3 (T-shaped, sp3d), XeF4 (square planar, sp3d2), and XeF2 (linear, sp3d).',
        },
        quiz: [
          {
            id: 'neet-q7',
            question: 'What is the hybridization and geometry of XeF4?',
            options: ['sp3, Tetrahedral', 'sp3d, See-saw', 'sp3d2, Square Planar', 'sp3d2, Octahedral'],
            correctIndex: 2,
            explanation: 'XeF4 has 4 bond pairs + 2 lone pairs (steric number 6 -> sp3d2), giving square planar geometry.',
          },
          {
            id: 'neet-q8',
            question: 'What is the bond order of O2+ (15 electrons)?',
            options: ['1.5', '2.0', '2.5', '3.0'],
            correctIndex: 2,
            explanation: 'At 14 electrons BO = 3.0; at 15 electrons (one antibonding e-) BO = 2.5.',
          },
        ],
      },
      {
        id: 'neet-lvl-5',
        levelNumber: 5,
        title: 'Organic IUPAC & Functional Group Mastery',
        topic: 'Organic Chemistry Foundations',
        difficulty: 'Mastery',
        description: 'Master IUPAC numbering priority, functional groups, isomerism, and reaction mechanism readiness.',
        estimatedMinutes: 32,
        xpReward: 350,
        videos: [
          {
            id: 'neet-v10',
            youtubeId: 'TYU_JluleME',
            title: 'IUPAC Nomenclature of Alkanes & Substituents',
            channel: 'The Organic Chemistry Tutor',
            duration: '11:18',
            keyTakeaway: 'Longest chain selection, lowest locant rule, and alphabetical prefix ordering.',
          },
          {
            id: 'neet-v11',
            youtubeId: 'm9jM8lWxrAE',
            title: 'Functional Groups & Priority Naming',
            channel: 'The Organic Chemistry Tutor',
            duration: '20:20',
            keyTakeaway: 'Carboxylic acid > Sulfonic > Ester > Acid halide > Amide > Nitrile > Aldehyde > Ketone > Alcohol.',
          },
        ],
        basicNotes: {
          summary: 'Error-free IUPAC naming and GOC stability rules prevent silly mistakes across all Class 12 Organic chapters.',
          keyPoints: [
            'Highest priority principal functional group gets the suffix (-oic acid, -al, -one, -ol); lower priority groups become prefixes (oxo-, hydroxy-, amino-).',
            'Carbocation stability: 3° > 2° > 1° > CH3+ (due to +I and hyperconjugation).',
            'Aromaticity (Hückel Rule): Cyclic, planar, fully conjugated, (4n + 2) π electrons.',
          ],
        },
        advancedNotes: {
          title: 'NEET Organic Capstone: GOC & Named Reactions Playbook',
          strategy: 'Classify every reaction by Electrophile vs Nucleophile attack and check for carbocation rearrangement.',
          highYieldInsights: [
            'Acidity order: Sulfonic acid > Carboxylic acid > Phenol > Water > Alcohol > Terminal Alkyne.',
            'Basicity of amines in aqueous medium: (C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3 (2° > 3° > 1° for ethyl).',
            'SN1 favors polar protic solvents + 3° substrates (racemization); SN2 favors polar aprotic solvents + 1° substrates (inversion).',
          ],
          pyqTip: 'In NCERT Organic Chemistry, 80%+ questions come directly from named reactions (Aldol, Cannizzaro, Reimer-Tiemann, Hoffmann Bromamide) and GOC stability.',
        },
        quiz: [
          {
            id: 'neet-q9',
            question: 'Which functional group receives the highest IUPAC suffix priority?',
            options: ['Ketone (-C=O)', 'Aldehyde (-CHO)', 'Alcohol (-OH)', 'Carboxylic Acid (-COOH)'],
            correctIndex: 3,
            explanation: 'Carboxylic acids (-COOH) top the standard IUPAC principal functional group priority table.',
          },
          {
            id: 'neet-q10',
            question: 'Which carbocation is the MOST stable?',
            options: ['Primary (1°)', 'Secondary (2°)', 'Tertiary (3°)', 'Methyl (CH3+)'],
            correctIndex: 2,
            explanation: 'Tertiary (3°) carbocations are stabilized by 9 hyperconjugable α-hydrogens and three +I alkyl groups.',
          },
        ],
      },
    ],
  },

  'jee-main': {
    courseId: 'jee-main',
    courseName: 'JEE Main & Advanced',
    shortCode: 'JEE Main',
    tagline: 'Visual intuition + multi-concept problem solving across Calculus, Physics & Chemistry',
    topics: [
      'Calculus: Limits & Derivatives',
      'Calculus: Integration & FTC',
      'Physics: Electrostatics & Gauss Law',
      'Physics: Rotational Dynamics',
      'Chemistry: Equilibrium & Coordination',
    ],
    levels: [
      {
        id: 'jee-lvl-1',
        levelNumber: 1,
        title: 'Limits, Derivatives & L’Hôpital’s Intuition',
        topic: 'Calculus: Limits & Derivatives',
        difficulty: 'Foundation',
        description: 'Build deep geometric intuition of limits, epsilon-delta rigor, L’Hôpital’s rule, and differentiation.',
        estimatedMinutes: 35,
        xpReward: 100,
        videos: [
          {
            id: 'jee-v1',
            youtubeId: 'WUvTyaaNkzM',
            title: 'The Essence of Calculus',
            channel: '3Blue1Brown',
            duration: '17:05',
            keyTakeaway: 'Why derivatives measure local linear sensitivity and integrals sum infinitesimal slices.',
          },
          {
            id: 'jee-v2',
            youtubeId: 'kfF40MiS7zA',
            title: "Limits, L'Hôpital's Rule, and Epsilon-Delta Definitions",
            channel: '3Blue1Brown',
            duration: '18:27',
            keyTakeaway: 'Visualizing 0/0 indeterminate forms as ratios of tiny nudges dx.',
          },
        ],
        basicNotes: {
          summary: 'Differential Calculus forms the backbone of JEE Mathematics and kinematics/electrodynamics in Physics.',
          keyPoints: [
            '7 Indeterminate forms: 0/0, ∞/∞, 0×∞, ∞-∞, 1^∞, 0^0, ∞^0.',
            'Standard limit: lim(x->0) (sin x)/x = 1; lim(x->0) (1 + x)^(1/x) = e.',
            'For 1^∞ form: lim f(x)^g(x) = exp(lim (f(x) - 1) × g(x)).',
          ],
        },
        advancedNotes: {
          title: 'Advanced Taylor Expansions & Differentiability Traps',
          strategy: 'For tricky JEE Main/Advanced 0/0 limits, Maclaurin series expansions are 3x faster and safer than repeated L’Hôpital.',
          highYieldInsights: [
            'sin x = x - x³/6 + x⁵/120; cos x = 1 - x²/2 + x⁴/24; e^x = 1 + x + x²/2 + x³/6.',
            'Differentiability implies continuity, but continuity does NOT imply differentiability (check sharp corners like |x|).',
            'If f(x) is differentiable and f(a)=0, check |f(x)| at x=a: differentiable ONLY if f\'(a) = 0!',
          ],
          pyqTip: 'Always check whether the form is genuinely 0/0 or ∞/∞ before applying L’Hôpital’s rule!',
        },
        quiz: [
          {
            id: 'jee-q1',
            question: 'What is lim(x->0) (1 + 3x)^(2/x)?',
            options: ['e^2', 'e^3', 'e^6', '1'],
            correctIndex: 2,
            explanation: '1^∞ form: exp(lim 3x · (2/x)) = e^6.',
          },
          {
            id: 'jee-q2',
            question: 'At x = 0, the function f(x) = |x| is:',
            options: ['Both continuous and differentiable', 'Continuous but not differentiable', 'Differentiable but not continuous', 'Neither'],
            correctIndex: 1,
            explanation: 'LHD = -1 and RHD = +1 at x = 0, so |x| is continuous but has a sharp corner (non-differentiable).',
          },
        ],
      },
      {
        id: 'jee-lvl-2',
        levelNumber: 2,
        title: 'Integration & Fundamental Theorem of Calculus',
        topic: 'Calculus: Integration & FTC',
        difficulty: 'Core',
        description: 'Connect antiderivatives to definite areas, King’s property, and Newton-Leibniz differentiation under integral sign.',
        estimatedMinutes: 29,
        xpReward: 150,
        videos: [
          {
            id: 'jee-v3',
            youtubeId: 'rfG8ce4nNh0',
            title: 'Integration and the Fundamental Theorem of Calculus',
            channel: '3Blue1Brown',
            duration: '20:46',
            keyTakeaway: 'Why d/dx ∫ f(t) dt = f(x) and how areas accumulate.',
          },
          {
            id: 'jee-v4',
            youtubeId: 'C7ducZoLKgw',
            title: 'Fundamental Theorem of Calculus (Part 1)',
            channel: 'Khan Academy',
            duration: '08:03',
            keyTakeaway: 'Applying Leibniz rule when integration limits are functions of x.',
          },
        ],
        basicNotes: {
          summary: 'Definite Integration and Area Under Curves carry 3–4 high-weightage questions in every JEE Main paper.',
          keyPoints: [
            'King’s Property: ∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx.',
            'For symmetric limits [-a to a]: odd functions integrate to 0; even functions equal 2 ∫[0 to a] f(x) dx.',
            'Leibniz Rule: d/dx ∫[g(x) to h(x)] f(t) dt = f(h(x))h\'(x) - f(g(x))g\'(x).',
          ],
        },
        advancedNotes: {
          title: 'Advanced Queen’s Property, Walli’s Formula & Limit of Sum',
          strategy: 'Whenever you see trigonometric powers in [0, π/2] or [0, π], apply King’s + Queen’s property before substituting.',
          highYieldInsights: [
            'Queen’s Property: ∫[0 to 2a] f(x) dx = ∫[0 to a] [f(x) + f(2a - x)] dx.',
            'Limit of a Sum: lim(n->∞) (1/n) Σ f(r/n) = ∫[0 to 1] f(x) dx.',
            '∫[0 to π/2] sin^n(x) dx = ∫[0 to π/2] cos^n(x) dx (Walli’s Reduction Formula).',
          ],
          pyqTip: 'Look for hidden Newton-Leibniz setups inside limit questions like lim(x->0) [∫(0 to x^2) sin√t dt] / x^3 — use L’Hôpital + Leibniz!',
        },
        quiz: [
          {
            id: 'jee-q3',
            question: 'What is ∫[-π/2 to π/2] (x³ cos x + sin⁵ x) dx?',
            options: ['π', '2', '0', '1'],
            correctIndex: 2,
            explanation: 'Both x³ cos x and sin⁵ x are odd functions over symmetric limits [-π/2, π/2], so the integral is 0.',
          },
          {
            id: 'jee-q4',
            question: 'By King’s property, ∫[0 to π/2] (sin x) / (sin x + cos x) dx equals:',
            options: ['π/2', 'π/4', '1', '0'],
            correctIndex: 1,
            explanation: 'Adding I and I(π/2 - x) gives 2I = ∫[0 to π/2] 1 dx = π/2, so I = π/4.',
          },
        ],
      },
      {
        id: 'jee-lvl-3',
        levelNumber: 3,
        title: 'Electrostatics & Gauss’s Law',
        topic: 'Physics: Electrostatics & Gauss Law',
        difficulty: 'Applied',
        description: 'Master electric flux, symmetry Gaussian surfaces, and field/potential profiles for spheres and shells.',
        estimatedMinutes: 21,
        xpReward: 200,
        videos: [
          {
            id: 'jee-v5',
            youtubeId: 'q1eor6oIuUo',
            title: "Electric Flux, Gauss's Law & Electric Fields",
            channel: 'The Organic Chemistry Tutor',
            duration: '12:52',
            keyTakeaway: 'Applying Φ = q_enclosed / ε0 across cubes, spheres, and infinite sheets.',
          },
          {
            id: 'jee-v6',
            youtubeId: '3RnFjMhgvrY',
            title: "Visual Explanation of Electric Flux and Gauss's Law",
            channel: 'Brain Station Advanced',
            duration: '08:11',
            keyTakeaway: 'Choosing spherical, cylindrical, or pillbox Gaussian surfaces cleanly.',
          },
        ],
        basicNotes: {
          summary: 'Electrostatics & Capacitors together account for 2–3 guaranteed questions in JEE Main Physics.',
          keyPoints: [
            'Gauss’s Law: ∮ E · dA = q_enclosed / ε0 (depends ONLY on charge inside the closed surface).',
            'Uniformly charged hollow shell: E_inside = 0; E_outside = kQ/r²; V_inside = V_surface = kQ/R.',
            'Uniformly charged solid non-conducting sphere: E_inside = kQr/R³ (linear in r!).',
          ],
        },
        advancedNotes: {
          title: 'Advanced Cavity Problems & Electrostatic Self-Energy',
          strategy: 'Solve every off-center spherical cavity problem using Superposition (+ρ full sphere minus -ρ cavity sphere).',
          highYieldInsights: [
            'Electric field inside an off-center spherical cavity in a uniform +ρ sphere is UNIFORM: E = (ρ / 3ε0) * a (vector from sphere center to cavity center).',
            'Charge placed at the corner of a cube contributes q / (8ε0) flux through the cube (and 0 through the 3 faces touching that corner!).',
            'Electrostatic potential energy of a uniformly charged solid sphere = (3/5) kQ²/R (vs (1/2) kQ²/R for a hollow shell).',
          ],
          pyqTip: 'Always verify E = -∇V: if potential V is constant throughout a region, electric field E MUST be zero there.',
        },
        quiz: [
          {
            id: 'jee-q5',
            question: 'A point charge q is placed at one corner of a cube. What is the electric flux through the entire cube?',
            options: ['q / ε0', 'q / 6ε0', 'q / 8ε0', 'q / 24ε0'],
            correctIndex: 2,
            explanation: '8 symmetric cubes surround the corner charge, so each cube receives 1/8th of total flux: q / (8ε0).',
          },
          {
            id: 'jee-q6',
            question: 'Inside a uniformly charged non-conducting solid sphere, electric field E varies with distance r as:',
            options: ['0', '1/r²', 'r', '1/r'],
            correctIndex: 2,
            explanation: 'Enclosed charge scales as r³, while surface area scales as r², leaving E ∝ r.',
          },
        ],
      },
      {
        id: 'jee-lvl-4',
        levelNumber: 4,
        title: 'Rotational Motion, Torque & Moment of Inertia',
        topic: 'Physics: Rotational Dynamics',
        difficulty: 'Advanced',
        description: 'Conquer torque balance, Parallel/Perpendicular Axis theorems, rolling without slipping, and angular momentum conservation.',
        estimatedMinutes: 24,
        xpReward: 250,
        videos: [
          {
            id: 'jee-v7',
            youtubeId: 'Ic_wFYu8xVs',
            title: "Moment of Inertia, Torque & Newton's Second Law of Rotation",
            channel: 'The Organic Chemistry Tutor',
            duration: '11:58',
            keyTakeaway: 'τ = Iα, rotational kinetic energy ½Iω², and standard MOI values.',
          },
          {
            id: 'jee-v8',
            youtubeId: 'KbYejyiRsFw',
            title: 'Rotational Power, Work, Energy & Torque Problems',
            channel: 'The Organic Chemistry Tutor',
            duration: '12:17',
            keyTakeaway: 'Combined translation + rolling energy conservation down an incline.',
          },
        ],
        basicNotes: {
          summary: 'Rotational Mechanics is considered the toughest JEE Physics unit — mastering rolling energy & angular momentum makes it predictable.',
          keyPoints: [
            'Parallel Axis Theorem: I = I_cm + Md²; Perpendicular Axis Theorem (planar bodies ONLY): Iz = Ix + Iy.',
            'Pure rolling condition: v_cm = ωR and a_cm = αR.',
            'Acceleration down an incline of angle θ: a = (g sin θ) / (1 + I / MR²).',
          ],
        },
        advancedNotes: {
          title: 'Advanced Instantaneous Axis of Rotation (IAOR) & Angular Impulse',
          strategy: 'For pure rolling, the point of contact with the ground is instantaneously at rest — compute KE directly as ½ I_contact ω²!',
          highYieldInsights: [
            'Race down an incline (highest to lowest acceleration): Solid Sphere (I=2/5 MR²) > Disc (1/2) > Hollow Sphere (2/3) > Ring (1).',
            'Angular momentum L = r × mv + I_cm ω stays conserved about ANY axis where net external torque is zero (even if linear momentum changes!).',
            'Toppling vs Sliding: Compare μ_s against b/(2h) for a block pulled horizontally.',
          ],
          pyqTip: 'When a bullet hits a hinged rod, linear momentum is NOT conserved (hinge impulse!), so conserve angular momentum about the hinge point.',
        },
        quiz: [
          {
            id: 'jee-q7',
            question: 'If a Ring, Solid Disc, and Solid Sphere roll without slipping down the same incline, which reaches the bottom FIRST?',
            options: ['Ring', 'Solid Disc', 'Solid Sphere', 'All reach together'],
            correctIndex: 2,
            explanation: 'Solid Sphere has the smallest I/(MR²) = 2/5, giving the largest acceleration a = g sinθ / (1 + 2/5).',
          },
          {
            id: 'jee-q8',
            question: 'Perpendicular Axis Theorem (Iz = Ix + Iy) is valid ONLY for:',
            options: ['Spherical bodies', 'Planar (2D lamina) bodies', 'Cylindrical bodies', 'Any 3D rigid body'],
            correctIndex: 1,
            explanation: 'Perpendicular Axis Theorem applies strictly to flat/planar laminas lying in the x-y plane.',
          },
        ],
      },
      {
        id: 'jee-lvl-5',
        levelNumber: 5,
        title: 'Chemical Equilibrium & Crystal Field Theory',
        topic: 'Chemistry: Equilibrium & Coordination',
        difficulty: 'Mastery',
        description: 'Master Le Chatelier shifts, Kp/Kc relations, and Coordination Compound CFT splitting (Δo vs Δt).',
        estimatedMinutes: 31,
        xpReward: 350,
        videos: [
          {
            id: 'jee-v9',
            youtubeId: 'SMtbS5idkU4',
            title: "Haber Process and Le Chatelier's Principle",
            channel: 'The Organic Chemistry Tutor',
            duration: '09:11',
            keyTakeaway: 'Pressure, temperature, and inert-gas addition effects at constant V vs constant P.',
          },
          {
            id: 'jee-v10',
            youtubeId: 'V1WSesBeURw',
            title: 'Crystal Field Theory (Octahedral & Tetrahedral Splitting)',
            channel: 'The Organic Chemistry Tutor',
            duration: '21:56',
            keyTakeaway: 't2g vs eg orbitals, Spectrochemical series, CFSE, and magnetic moment √n(n+2).',
          },
        ],
        basicNotes: {
          summary: 'Equilibrium and Coordination Compounds are reliable score-boosters in JEE Main Chemistry.',
          keyPoints: [
            'Kp = Kc (RT)^Δng, where Δng = moles of gaseous products - moles of gaseous reactants.',
            'Adding inert gas at CONSTANT VOLUME causes ZERO shift in equilibrium; at CONSTANT PRESSURE it shifts toward more gas moles.',
            'Octahedral splitting: t2g (lower, -0.4 Δo) and eg (higher, +0.6 Δo). Tetrahedral Δt ≈ (4/9) Δo.',
          ],
        },
        advancedNotes: {
          title: 'JEE Chemistry Capstone: Spectrochemical Series & Jahn-Teller',
          strategy: 'Memorize the strong-field boundary (NH3 / en / NO2- / CN- / CO) to immediately classify high-spin vs low-spin complexes.',
          highYieldInsights: [
            'Weak field (high spin): I- < Br- < SCN- < Cl- < S2- < F- < OH- < C2O4^2- < H2O. Strong field (low spin): NCS- < EDTA < NH3 < en < CN- < CO.',
            'Wait for d4-d7 3d metals: 4d/5d metals ALWAYS form low-spin octahedral complexes regardless of ligand!',
            'Co3+ (d6) with H2O or C2O4^2- is STILL low spin (diamagnetic) due to high +3 charge; CoF6^3- is the rare high-spin exception.',
          ],
          pyqTip: 'Only temperature changes the equilibrium constant K (ΔG° = -RT ln K). Catalysts only speed up attainment of equilibrium.',
        },
        quiz: [
          {
            id: 'jee-q9',
            question: 'Adding an inert gas at CONSTANT VOLUME to an equilibrium system:',
            options: [
              'Shifts equilibrium toward more moles',
              'Shifts equilibrium toward fewer moles',
              'Has no effect on equilibrium position',
              'Increases Kp',
            ],
            correctIndex: 2,
            explanation: 'At constant volume, molar concentrations (and partial pressures) of reacting gases remain unchanged.',
          },
          {
            id: 'jee-q10',
            question: 'What is the approximate relation between tetrahedral (Δt) and octahedral (Δo) crystal field splitting?',
            options: ['Δt = Δo', 'Δt = (4/9) Δo', 'Δt = (9/4) Δo', 'Δt = 2 Δo'],
            correctIndex: 1,
            explanation: 'Because there are 4 ligands instead of 6 and none point directly at orbitals, Δt ≈ (4/9) Δo.',
          },
        ],
      },
    ],
  },

  'gate': {
    courseId: 'gate',
    courseName: 'GATE (Engineering)',
    shortCode: 'GATE',
    tagline: 'IIT-level CS & Engineering Mathematics ladder from Asymptotics to DP, OS & DBMS',
    topics: [
      'Algorithms: Asymptotics & Complexity',
      'Operating Systems: CPU Scheduling',
      'Operating Systems: Virtual Memory',
      'DBMS: Normalization',
      'Dynamic Programming & Linear Algebra',
    ],
    levels: [
      {
        id: 'gate-lvl-1',
        levelNumber: 1,
        title: 'Asymptotic Notations & Recurrence Analysis',
        topic: 'Algorithms: Asymptotics & Complexity',
        difficulty: 'Foundation',
        description: 'Master Big-O, Omega, Theta, Master Theorem, and tight asymptotic ordering for GATE CS.',
        estimatedMinutes: 30,
        xpReward: 100,
        videos: [
          {
            id: 'gate-v1',
            youtubeId: 'A03oI0znAoc',
            title: 'Asymptotic Notations: Big Oh - Omega - Theta',
            channel: 'Abdul Bari',
            duration: '15:46',
            keyTakeaway: 'Upper (O), lower (Ω), and tight (Θ) bounds with mathematical c and n0 proofs.',
          },
          {
            id: 'gate-v2',
            youtubeId: '7dz8Iaf_weM',
            title: 'Asymptotic Notations & Complexity Hierarchy',
            channel: 'Gate Smashers',
            duration: '14:25',
            keyTakeaway: 'Comparing log n, √n, n log n, n^2, 2^n, and n! growth rates cleanly.',
          },
        ],
        basicNotes: {
          summary: 'Asymptotic complexity & recurrences appear in 2–4 GATE CS questions every single year.',
          keyPoints: [
            '1 < log(log n) < log n < √n < n < n log n < n² < n³ < 2^n < n! < n^n.',
            'Master Theorem for T(n) = aT(n/b) + f(n): compare f(n) against n^(log_b a).',
            'Little-o (o) and Little-omega (ω) denote STRICT asymptotic bounds (non-tight).',
          ],
        },
        advancedNotes: {
          title: 'Advanced Extended Master Theorem & Akra-Bazzi Shortcuts',
          strategy: 'When f(n) = Θ(n^(log_b a) · log^k n), remember T(n) = Θ(n^(log_b a) · log^(k+1) n) for k >= 0!',
          highYieldInsights: [
            'If f(n) = n / log n and a=2, b=2 (Case 2 with k = -1): T(n) = Θ(n log(log n)).',
            'T(n) = T(n-1) + 1/n solves to Θ(log n) via harmonic series!',
            'T(n) = 2T(√n) + log n -> Substitute n = 2^m -> S(m) = 2S(m/2) + m -> Θ(m log m) = Θ(log n · log log n).',
          ],
          pyqTip: 'Take log on both sides whenever comparing tricky functions like n^(log n) vs 2^(√n).',
        },
        quiz: [
          {
            id: 'gate-q1',
            question: 'What is the solution to T(n) = 2T(n/2) + n log n?',
            options: ['Θ(n log n)', 'Θ(n log² n)', 'Θ(n²)', 'Θ(log² n)'],
            correctIndex: 1,
            explanation: 'Extended Master Theorem Case 2 (k = 1): T(n) = Θ(n log^(1+1) n) = Θ(n log² n).',
          },
          {
            id: 'gate-q2',
            question: 'Which notation guarantees a TIGHT bound (both upper and lower)?',
            options: ['Big-O (O)', 'Big-Omega (Ω)', 'Theta (Θ)', 'Little-o (o)'],
            correctIndex: 2,
            explanation: 'f(n) = Θ(g(n)) iff f(n) = O(g(n)) AND f(n) = Ω(g(n)).',
          },
        ],
      },
      {
        id: 'gate-lvl-2',
        levelNumber: 2,
        title: 'CPU Scheduling & Process Synchronization',
        topic: 'Operating Systems: CPU Scheduling',
        difficulty: 'Core',
        description: 'Solve Gantt charts for FCFS, SJF, SRTF, Round Robin, and calculate Turnaround & Waiting Times accurately.',
        estimatedMinutes: 29,
        xpReward: 150,
        videos: [
          {
            id: 'gate-v3',
            youtubeId: 'EWkQl0n0w5M',
            title: 'Introduction to CPU Scheduling',
            channel: 'Neso Academy',
            duration: '10:14',
            keyTakeaway: 'Preemptive vs non-preemptive scheduling, CPU burst vs I/O burst, and dispatcher latency.',
          },
          {
            id: 'gate-v4',
            youtubeId: 'VSMAjMfJ6KQ',
            title: 'FCFS & Scheduling Solved Problem (Turnaround & Waiting Time)',
            channel: 'Neso Academy',
            duration: '18:50',
            keyTakeaway: 'TAT = CT - AT, WT = TAT - BT, and Convoy Effect analysis.',
          },
        ],
        basicNotes: {
          summary: 'CPU Scheduling numericals are pure marks in GATE OS if you draw the Gantt chart carefully.',
          keyPoints: [
            'Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT).',
            'Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT).',
            'SRTF (Shortest Remaining Time First) gives the mathematically minimum average waiting time among all scheduling algorithms.',
          ],
        },
        advancedNotes: {
          title: 'Advanced Starvation, Aging & Context-Switch Overhead Notes',
          strategy: 'In Round Robin GATE problems, track the ready queue state carefully at the exact millisecond a newly arriving process enters vs an old process expires!',
          highYieldInsights: [
            'Convention when arrival coincides with quantum expiry: newly arrived process enters Ready Queue BEFORE the preempted running process.',
            'Convoy Effect occurs in FCFS; Starvation occurs in SJF/SRTF and Priority Scheduling (solved by Aging).',
            'With context switch time = δ, total overhead = (number of context switches) × δ (first dispatch / final exit usually excluded unless stated).',
          ],
          pyqTip: 'Always double-check Response Time (= First CPU allocation - Arrival Time) vs Waiting Time — they differ in preemptive algorithms!',
        },
        quiz: [
          {
            id: 'gate-q3',
            question: 'Which CPU scheduling algorithm minimizes average waiting time?',
            options: ['FCFS', 'Round Robin', 'SRTF (Preemptive SJF)', 'Priority Non-Preemptive'],
            correctIndex: 2,
            explanation: 'SRTF is provably optimal for minimizing average waiting time across any arrival pattern.',
          },
          {
            id: 'gate-q4',
            question: 'If Completion Time = 14, Arrival Time = 2, and Burst Time = 5, what is Waiting Time?',
            options: ['12', '7', '9', '5'],
            correctIndex: 1,
            explanation: 'TAT = 14 - 2 = 12; WT = TAT - BT = 12 - 5 = 7.',
          },
        ],
      },
      {
        id: 'gate-lvl-3',
        levelNumber: 3,
        title: 'Paging, TLB & Virtual Memory',
        topic: 'Operating Systems: Virtual Memory',
        difficulty: 'Applied',
        description: 'Compute Effective Memory Access Time (EMAT), multi-level page table sizes, and page fault rates.',
        estimatedMinutes: 46,
        xpReward: 200,
        videos: [
          {
            id: 'gate-v5',
            youtubeId: '6c-mOFZwP_8',
            title: 'What is Paging | Memory Management | Operating System',
            channel: 'Gate Smashers',
            duration: '25:54',
            keyTakeaway: 'Logical vs Physical address splitting (p + d -> f + d) and Page Table size calculations.',
          },
          {
            id: 'gate-v6',
            youtubeId: 'o2_iCzS9-ZQ',
            title: 'Virtual Memory & Page Fault Handling',
            channel: 'Gate Smashers',
            duration: '20:18',
            keyTakeaway: 'Demand paging, Thrashing, Belady’s Anomaly in FIFO, and Optimal/LRU replacement.',
          },
        ],
        basicNotes: {
          summary: 'Memory Management & Paging account for the highest frequency of GATE OS numericals.',
          keyPoints: [
            'Page offset bits (d) = log2(Page Size). Number of pages = Virtual Address Space / Page Size.',
            'Page Table Size = (Number of pages) × (Page Table Entry size).',
            'Belady’s Anomaly (more frames -> more page faults) occurs in FIFO, NEVER in stack algorithms like LRU or Optimal.',
          ],
        },
        advancedNotes: {
          title: 'Advanced EMAT, Multi-Level Paging & Inverted Page Tables',
          strategy: 'Watch whether TLB miss still requires k memory accesses for a k-level page table + 1 data access.',
          highYieldInsights: [
            'EMAT = h × (t_TLB + t_mem) + (1 - h) × (t_TLB + (k + 1) × t_mem) for k-level paging.',
            'If Page Table > Frame Size, split Page Table into multi-level pages (outer page table must fit in one frame!).',
            'Effective Access Time with Page Fault rate p: EAT = (1 - p) × t_mem + p × t_page_fault.',
          ],
          pyqTip: 'Always convert Page Table Entry size from bits to bytes (round up to byte boundary if specified) before multiplying by number of pages!',
        },
        quiz: [
          {
            id: 'gate-q5',
            question: 'A 32-bit virtual address space has a 4 KB page size. How many bits represent the page offset?',
            options: ['10 bits', '12 bits', '20 bits', '22 bits'],
            correctIndex: 1,
            explanation: '4 KB = 2^12 bytes, so page offset d = 12 bits (leaving 20 bits for page number).',
          },
          {
            id: 'gate-q6',
            question: 'Which page replacement algorithm can suffer from Belady’s Anomaly?',
            options: ['LRU', 'Optimal', 'FIFO', 'LFU'],
            correctIndex: 2,
            explanation: 'FIFO is not a stack algorithm and can produce more page faults when given more frames.',
          },
        ],
      },
      {
        id: 'gate-lvl-4',
        levelNumber: 4,
        title: 'DBMS Normalization (1NF to BCNF)',
        topic: 'DBMS: Normalization',
        difficulty: 'Advanced',
        description: 'Master Functional Dependencies, Candidate Keys, Lossless Join, Dependency Preservation, and Normal Forms.',
        estimatedMinutes: 40,
        xpReward: 250,
        videos: [
          {
            id: 'gate-v7',
            youtubeId: 'EGEwkad_llA',
            title: 'All Normal Forms with Real Life Examples | 1NF 2NF 3NF BCNF',
            channel: 'Gate Smashers',
            duration: '11:15',
            keyTakeaway: 'Rapid identification of highest normal form from candidate keys and FD patterns.',
          },
          {
            id: 'gate-v8',
            youtubeId: 'GFQaEYEc8_8',
            title: 'Database Normalization - 1NF, 2NF, 3NF, 4NF, 5NF',
            channel: 'Decomplexify',
            duration: '28:34',
            keyTakeaway: 'Partial dependency, transitive dependency, and multi-valued dependency elimination.',
          },
        ],
        basicNotes: {
          summary: 'Every GATE CS paper includes 2–3 questions on Functional Dependencies, Candidate Keys, and Normal Forms.',
          keyPoints: [
            '2NF: No partial dependency (non-prime attribute depending on a proper subset of a candidate key).',
            '3NF: For every X -> Y, either X is a superkey OR Y is a prime attribute.',
            'BCNF: For every non-trivial X -> Y, X MUST be a superkey.',
          ],
        },
        advancedNotes: {
          title: 'Advanced Lossless Join & Dependency-Preserving Decomposition',
          strategy: 'Find ALL candidate keys FIRST (attributes never on RHS of any FD MUST belong to every candidate key!).',
          highYieldInsights: [
            '3NF decomposition is ALWAYS both Lossless Join AND Dependency Preserving.',
            'BCNF decomposition is ALWAYS Lossless Join, but NOT guaranteed to be Dependency Preserving!',
            'A relation with only 2 attributes (R(A, B)) is ALWAYS in BCNF!',
            'Chase test / Binary decomposition check: R1 ∩ R2 -> R1 OR R1 ∩ R2 -> R2 guarantees lossless join.',
          ],
          pyqTip: 'If a relation has NO non-prime attributes (all attributes are prime), it is automatically in 3NF (though not necessarily BCNF!).',
        },
        quiz: [
          {
            id: 'gate-q7',
            question: 'Which normal form decomposition guarantees BOTH lossless join and dependency preservation?',
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            correctIndex: 2,
            explanation: 'Every relation can always be decomposed into 3NF in a lossless and dependency-preserving manner.',
          },
          {
            id: 'gate-q8',
            question: 'For X -> Y to satisfy BCNF (non-trivial), what must hold?',
            options: ['Y must be prime', 'X must be a superkey', 'X must be a prime attribute', 'Y must be non-prime'],
            correctIndex: 1,
            explanation: 'BCNF strictly requires the LHS (X) of every non-trivial functional dependency to be a superkey.',
          },
        ],
      },
      {
        id: 'gate-lvl-5',
        levelNumber: 5,
        title: 'Dynamic Programming & Linear Algebra Mastery',
        topic: 'Dynamic Programming & Linear Algebra',
        difficulty: 'Mastery',
        description: 'Capstone level combining 0/1 Knapsack DP state transitions with Eigenvalues & Eigenvectors.',
        estimatedMinutes: 46,
        xpReward: 350,
        videos: [
          {
            id: 'gate-v9',
            youtubeId: 'nLmhmB6NzcM',
            title: '0/1 Knapsack - Dynamic Programming',
            channel: 'Abdul Bari',
            duration: '28:24',
            keyTakeaway: 'Optimal substructure, overlapping subproblems, and O(nW) tabular DP formulation.',
          },
          {
            id: 'gate-v10',
            youtubeId: 'PFDu9oVAE-g',
            title: 'Eigenvectors and Eigenvalues | Essence of Linear Algebra',
            channel: '3Blue1Brown',
            duration: '17:16',
            keyTakeaway: 'Geometric meaning of Av = λv, characteristic polynomial det(A - λI) = 0, and trace/determinant rules.',
          },
        ],
        basicNotes: {
          summary: 'Dynamic Programming + Linear Algebra consistently separate top 1% GATE AIRs from average scores.',
          keyPoints: [
            '0/1 Knapsack recurrence: K[i, w] = max(K[i-1, w], vi + K[i-1, w - wi]).',
            'Sum of eigenvalues = Trace(A); Product of eigenvalues = Determinant(A).',
            'Matrix A is invertible iff 0 is NOT an eigenvalue of A.',
          ],
        },
        advancedNotes: {
          title: 'GATE Capstone: Pseudo-Polynomial DP & Cayley-Hamilton Shortcuts',
          strategy: 'Never compute full characteristic equations for 3×3 matrices if Trace + Determinant + row-sum shortcuts reveal the eigenvalues directly!',
          highYieldInsights: [
            '0/1 Knapsack runs in O(nW), which is pseudo-polynomial (exponential in bit-length of W) — NP-Complete in general.',
            'If every row of A sums to c, then c is guaranteed to be an eigenvalue of A with eigenvector [1, 1, ..., 1]^T!',
            'Eigenvalues of A^k are λ^k; eigenvalues of A^-1 are 1/λ; eigenvalues of Symmetric matrices are always REAL.',
          ],
          pyqTip: 'In Matrix Chain Multiplication DP, number of parenthesizations of n matrices is the (n-1)th Catalan number!',
        },
        quiz: [
          {
            id: 'gate-q9',
            question: 'For a 3×3 matrix A with eigenvalues 2, 3, and 5, what is Determinant(A)?',
            options: ['10', '15', '30', '25'],
            correctIndex: 2,
            explanation: 'Product of eigenvalues = Determinant(A) = 2 × 3 × 5 = 30.',
          },
          {
            id: 'gate-q10',
            question: 'What is the time complexity of the standard tabular 0/1 Knapsack DP algorithm?',
            options: ['O(n log n)', 'O(nW) pseudo-polynomial', 'O(n^2)', 'O(W log n)'],
            correctIndex: 1,
            explanation: 'Filling the n × W DP table takes O(nW) time, which is pseudo-polynomial in input size.',
          },
        ],
      },
    ],
  },
};

export function getExamRoadmap(courseId: string): ExamRoadmap {
  return EXAM_ROADMAPS[courseId] || EXAM_ROADMAPS['ugc-net'];
}
