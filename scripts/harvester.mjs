#!/usr/bin/env node
/**
 * TechnoEdu / Techno Wallah Automated PDF Harvester & Directory Builder
 * 
 * Features:
 * 1. Comprehensive Subject Taxonomy Matrix (NCERT 6-12, UPSC PYQs, OpenStax, State Boards).
 * 2. Automated link verification with simulated browser headers & referrer spoofing.
 * 3. Builds a structured subject-to-PDF directory JSON (src/data/subjectPdfDirectory.json).
 * 4. Downloads PDFs for local archiving or storage uploads (Cloudflare R2 / GitHub Releases).
 * 
 * Usage:
 *   node scripts/harvester.mjs --generate    # Generate subjectPdfDirectory.json
 *   node scripts/harvester.mjs --verify      # Audit health of all directory links
 *   node scripts/harvester.mjs --download    # Batch download PDFs for archiving
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Standard user agent simulating a modern desktop browser
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml,application/pdf;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
};

// ── 1. Master Subject Taxonomy Matrix ─────────────────────────────────────────

export const NCERT_SUBJECT_CATALOG = [
  // Political Science & Constitution
  {
    subject: 'Political Science',
    title: 'Indian Constitution at Work',
    class: '11',
    code: 'keps2',
    chapters: 10,
    examTarget: ['UPSC Civil Services', 'WBCS', 'CUET UG/PG', 'State PSCs'],
    chapterTitles: [
      'Constitution: Why and How?',
      'Rights in the Indian Constitution',
      'Election and Representation',
      'Executive',
      'Legislature',
      'Judiciary',
      'Federalism',
      'Local Governments',
      'Constitution as a Living Document',
      'The Philosophy of the Constitution'
    ]
  },
  {
    subject: 'Political Science',
    title: 'Political Theory',
    class: '11',
    code: 'keps1',
    chapters: 8,
    examTarget: ['UPSC Civil Services', 'WBCS', 'CUET UG/PG'],
    chapterTitles: [
      'Political Theory: An Introduction',
      'Freedom',
      'Equality',
      'Social Justice',
      'Rights',
      'Citizenship',
      'Nationalism',
      'Secularism'
    ]
  },
  {
    subject: 'Political Science',
    title: 'Contemporary World Politics',
    class: '12',
    code: 'leps1',
    chapters: 7,
    examTarget: ['UPSC Civil Services', 'WBCS', 'CUET UG/PG'],
    chapterTitles: [
      'The End of Bipolarity',
      'Contemporary Centres of Power',
      'Contemporary South Asia',
      'International Organisations',
      'Security in the Contemporary World',
      'Environment and Natural Resources',
      'Globalisation'
    ]
  },
  {
    subject: 'Political Science',
    title: 'Politics in India Since Independence',
    class: '12',
    code: 'leps2',
    chapters: 8,
    examTarget: ['UPSC Civil Services', 'WBCS', 'CUET UG/PG'],
    chapterTitles: [
      'Challenges of Nation Building',
      'Era of One-Party Dominance',
      'Politics of Planned Development',
      'India’s External Relations',
      'Challenges to and Restoration of the Congress System',
      'The Crisis of Democratic Order',
      'Regional Aspirations',
      'Recent Developments in Indian Politics'
    ]
  },

  // History
  {
    subject: 'History',
    title: 'Themes in World History',
    class: '11',
    code: 'kehs1',
    chapters: 7,
    examTarget: ['UPSC Civil Services', 'WBCS', 'State PSCs', 'SSC CGL'],
    chapterTitles: [
      'Writing and City Life',
      'An Empire Across Three Continents',
      'Nomadic Empires',
      'The Three Orders',
      'Changing Cultural Traditions',
      'Displacing Indigenous Peoples',
      'Paths to Modernisation'
    ]
  },
  {
    subject: 'History',
    title: 'Themes in Indian History - Part I (Ancient)',
    class: '12',
    code: 'lehs1',
    chapters: 4,
    examTarget: ['UPSC Civil Services', 'WBCS', 'State PSCs'],
    chapterTitles: [
      'Bricks, Beads and Bones (The Harappan Civilisation)',
      'Kings, Farmers and Towns (Early States and Economies)',
      'Kinship, Caste and Class (Early Societies)',
      'Thinkers, Beliefs and Buildings (Cultural Developments)'
    ]
  },
  {
    subject: 'History',
    title: 'Themes in Indian History - Part II (Medieval)',
    class: '12',
    code: 'lehs2',
    chapters: 4,
    examTarget: ['UPSC Civil Services', 'WBCS', 'State PSCs'],
    chapterTitles: [
      'Through the Eyes of Travellers',
      'Bhakti-Sufi Traditions',
      'An Imperial Capital: Vijayanagara',
      'Peasants, Zamindars and the State (Agrarian Society & Mughal Empire)'
    ]
  },
  {
    subject: 'History',
    title: 'Themes in Indian History - Part III (Modern)',
    class: '12',
    code: 'lehs3',
    chapters: 4,
    examTarget: ['UPSC Civil Services', 'WBCS', 'State PSCs'],
    chapterTitles: [
      'Colonialism and the Countryside',
      'Rebels and the Raj (The 1857 Revolt)',
      'Mahatma Gandhi and the Nationalist Movement',
      'Framing the Constitution (A New Era Begins)'
    ]
  },

  // Geography
  {
    subject: 'Geography',
    title: 'Fundamentals of Physical Geography',
    class: '11',
    code: 'kegy2',
    chapters: 14,
    examTarget: ['UPSC Civil Services', 'WBCS', 'NDA', 'CDS', 'SSC'],
    chapterTitles: [
      'Geography as a Discipline',
      'The Origin and Evolution of the Earth',
      'Interior of the Earth',
      'Distribution of Oceans and Continents',
      'Geomorphic Processes',
      'Landforms and their Evolution',
      'Composition and Structure of Atmosphere',
      'Solar Radiation, Heat Balance and Temperature',
      'Atmospheric Circulation and Weather Systems',
      'Water in the Atmosphere',
      'World Climate and Climate Change',
      'Water (Oceans)',
      'Movements of Ocean Water',
      'Biodiversity and Conservation'
    ]
  },
  {
    subject: 'Geography',
    title: 'India: Physical Environment',
    class: '11',
    code: 'kegy1',
    chapters: 6,
    examTarget: ['UPSC Civil Services', 'WBCS', 'State PSCs'],
    chapterTitles: [
      'India — Location',
      'Structure and Physiography',
      'Drainage System',
      'Climate',
      'Natural Vegetation',
      'Soils'
    ]
  },
  {
    subject: 'Geography',
    title: 'Fundamentals of Human Geography',
    class: '12',
    code: 'legy1',
    chapters: 8,
    examTarget: ['UPSC Civil Services', 'WBCS', 'State PSCs'],
    chapterTitles: [
      'Human Geography: Nature and Scope',
      'The World Population: Distribution, Density and Growth',
      'Human Development',
      'Primary Activities',
      'Secondary Activities',
      'Tertiary and Quaternary Activities',
      'Transport and Communication',
      'International Trade'
    ]
  },

  // Economics
  {
    subject: 'Economics',
    title: 'Indian Economic Development',
    class: '11',
    code: 'keec1',
    chapters: 8,
    examTarget: ['UPSC Civil Services', 'WBCS', 'Banking (IBPS/SBI)', 'RBI Grade B'],
    chapterTitles: [
      'Indian Economy on the Eve of Independence',
      'Indian Economy 1950–1990',
      'Liberalisation, Privatisation and Globalisation: An Appraisal',
      'Human Capital Formation in India',
      'Rural Development',
      'Employment: Growth, Informalisation and Other Issues',
      'Environment and Sustainable Development',
      'Comparative Development Experiences of India and Its Neighbours'
    ]
  },
  {
    subject: 'Economics',
    title: 'Introductory Macroeconomics',
    class: '12',
    code: 'leec1',
    chapters: 6,
    examTarget: ['UPSC Civil Services', 'RBI Grade B', 'WBCS', 'Banking Exams'],
    chapterTitles: [
      'Introduction to Macroeconomics',
      'National Income Accounting',
      'Money and Banking',
      'Determination of Income and Employment',
      'Government Budget and the Economy',
      'Open Economy Macroeconomics'
    ]
  },

  // Physics (Foundational for JEE, NEET, WBJEE, NDA)
  {
    subject: 'Physics',
    title: 'Physics - Class 11 (Part 1)',
    class: '11',
    code: 'keph1',
    chapters: 7,
    examTarget: ['JEE Main & Advanced', 'NEET UG', 'WBJEE', 'NDA'],
    chapterTitles: [
      'Units and Measurements',
      'Motion in a Straight Line',
      'Motion in a Plane',
      'Laws of Motion',
      'Work, Energy and Power',
      'System of Particles and Rotational Motion',
      'Gravitation'
    ]
  },
  {
    subject: 'Physics',
    title: 'Physics - Class 12 (Part 1)',
    class: '12',
    code: 'leph1',
    chapters: 8,
    examTarget: ['JEE Main & Advanced', 'NEET UG', 'WBJEE', 'NDA'],
    chapterTitles: [
      'Electric Charges and Fields',
      'Electrostatic Potential and Capacitance',
      'Current Electricity',
      'Moving Charges and Magnetism',
      'Magnetism and Matter',
      'Electromagnetic Induction',
      'Alternating Current',
      'Electromagnetic Waves'
    ]
  },

  // Chemistry
  {
    subject: 'Chemistry',
    title: 'Chemistry - Class 11 (Part 1)',
    class: '11',
    code: 'kech1',
    chapters: 6,
    examTarget: ['JEE Main & Advanced', 'NEET UG', 'WBJEE'],
    chapterTitles: [
      'Some Basic Concepts of Chemistry',
      'Structure of Atom',
      'Classification of Elements and Periodicity in Properties',
      'Chemical Bonding and Molecular Structure',
      'Thermodynamics',
      'Equilibrium'
    ]
  },
  {
    subject: 'Chemistry',
    title: 'Chemistry - Class 12 (Part 1)',
    class: '12',
    code: 'lech1',
    chapters: 5,
    examTarget: ['JEE Main & Advanced', 'NEET UG', 'WBJEE'],
    chapterTitles: [
      'Solutions',
      'Electrochemistry',
      'Chemical Kinetics',
      'The d- and f-Block Elements',
      'Coordination Compounds'
    ]
  },

  // Biology
  {
    subject: 'Biology',
    title: 'Biology - Class 11',
    class: '11',
    code: 'kebo1',
    chapters: 19,
    examTarget: ['NEET UG', 'CUET Biology', 'Nursing / Paramedical'],
    chapterTitles: [
      'The Living World',
      'Biological Classification',
      'Plant Kingdom',
      'Animal Kingdom',
      'Morphology of Flowering Plants',
      'Anatomy of Flowering Plants',
      'Structural Organisation in Animals',
      'Cell: The Unit of Life',
      'Biomolecules',
      'Cell Cycle and Cell Division',
      'Photosynthesis in Higher Plants',
      'Respiration in Plants',
      'Plant Growth and Development',
      'Breathing and Exchange of Gases',
      'Body Fluids and Circulation',
      'Excretory Products and their Elimination',
      'Locomotion and Movement',
      'Neural Control and Coordination',
      'Chemical Coordination and Integration'
    ]
  },
  {
    subject: 'Biology',
    title: 'Biology - Class 12',
    class: '12',
    code: 'lebo1',
    chapters: 13,
    examTarget: ['NEET UG', 'CUET Biology'],
    chapterTitles: [
      'Sexual Reproduction in Flowering Plants',
      'Human Reproduction',
      'Reproductive Health',
      'Principles of Inheritance and Variation',
      'Molecular Basis of Inheritance',
      'Evolution',
      'Human Health and Disease',
      'Microbes in Human Welfare',
      'Biotechnology: Principles and Processes',
      'Biotechnology and its Applications',
      'Organisms and Populations',
      'Ecosystem',
      'Biodiversity and Conservation'
    ]
  },

  // Mathematics
  {
    subject: 'Mathematics',
    title: 'Mathematics - Class 11',
    class: '11',
    code: 'kemh1',
    chapters: 14,
    examTarget: ['JEE Main & Advanced', 'WBJEE', 'NDA', 'CUET Mathematics'],
    chapterTitles: [
      'Sets',
      'Relations and Functions',
      'Trigonometric Functions',
      'Complex Numbers and Quadratic Equations',
      'Linear Inequalities',
      'Permutations and Combinations',
      'Binomial Theorem',
      'Sequences and Series',
      'Straight Lines',
      'Conic Sections',
      'Introduction to Three Dimensional Geometry',
      'Limits and Derivatives',
      'Statistics',
      'Probability'
    ]
  }
];

export const UPSC_PYQ_CATALOG = [
  {
    year: '2024',
    papers: [
      { name: 'Prelims General Studies Paper I', code: '2024_GS_1', url: 'https://upsc.gov.in/sites/default/files/QP-CSP-24-GS-P-I-260624.pdf' },
      { name: 'Prelims CSAT Paper II', code: '2024_CSAT_2', url: 'https://upsc.gov.in/sites/default/files/QP-CSP-24-CSAT-P-II-260624.pdf' },
      { name: 'Mains Essay Paper', code: '2024_Mains_Essay', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-24-Essay-200924.pdf' },
      { name: 'Mains General Studies I', code: '2024_Mains_GS1', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-24-GS-I-210924.pdf' },
      { name: 'Mains General Studies II', code: '2024_Mains_GS2', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-24-GS-II-210924.pdf' },
      { name: 'Mains General Studies III', code: '2024_Mains_GS3', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-24-GS-III-220924.pdf' },
      { name: 'Mains General Studies IV (Ethics)', code: '2024_Mains_GS4', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-24-GS-IV-220924.pdf' }
    ]
  },
  {
    year: '2023',
    papers: [
      { name: 'Prelims General Studies Paper I', code: '2023_GS_1', url: 'https://upsc.gov.in/sites/default/files/QP-CSP-2023-GS-Paper-I-280523.pdf' },
      { name: 'Prelims CSAT Paper II', code: '2023_CSAT_2', url: 'https://upsc.gov.in/sites/default/files/QP-CSP-2023-CSAT-Paper-II-280523.pdf' },
      { name: 'Mains General Studies I', code: '2023_Mains_GS1', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-23-GS-I-160923.pdf' },
      { name: 'Mains General Studies II', code: '2023_Mains_GS2', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-23-GS-II-160923.pdf' },
      { name: 'Mains General Studies III', code: '2023_Mains_GS3', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-23-GS-III-170923.pdf' },
      { name: 'Mains General Studies IV (Ethics)', code: '2023_Mains_GS4', url: 'https://upsc.gov.in/sites/default/files/QP-CSM-23-GS-IV-170923.pdf' }
    ]
  }
];

export const OPENSTAX_COLLEGE_CATALOG = [
  {
    subject: 'Mathematics',
    title: 'College Algebra 2e',
    platform: 'OpenStax (Rice University)',
    directPdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/College_Algebra_2e-WEB_1.pdf',
    license: 'CC BY 4.0'
  },
  {
    subject: 'Physics',
    title: 'University Physics Volume 1 (Mechanics, Waves, Acoustics)',
    platform: 'OpenStax (Rice University)',
    directPdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/UniversityPhysicsVolume1-WEB_2.pdf',
    license: 'CC BY 4.0'
  },
  {
    subject: 'Physics',
    title: 'University Physics Volume 2 (Thermodynamics, Electricity & Magnetism)',
    platform: 'OpenStax (Rice University)',
    directPdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/UniversityPhysicsVolume2-WEB_1.pdf',
    license: 'CC BY 4.0'
  },
  {
    subject: 'Chemistry',
    title: 'Chemistry 2e (College Chemistry)',
    platform: 'OpenStax (Rice University)',
    directPdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Chemistry2e-WEB_1.pdf',
    license: 'CC BY 4.0'
  },
  {
    subject: 'Economics',
    title: 'Principles of Economics 3e',
    platform: 'OpenStax (Rice University)',
    directPdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/PrinciplesofEconomics3e-WEB_1.pdf',
    license: 'CC BY 4.0'
  }
];

// ── 2. Link Verifier & Header Tester ─────────────────────────────────────────

/**
 * Checks if a PDF URL is reachable and resolves to an active document.
 * Spoofs Referer to prevent 403 Forbidden hotlink blocks.
 */
export async function verifyPdfUrl(url, timeoutMs = 8000) {
  try {
    const urlObj = new URL(url);
    const headers = {
      ...BROWSER_HEADERS,
      'Referer': `${urlObj.protocol}//${urlObj.hostname}/`,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      method: 'HEAD',
      headers,
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    const status = response.status;
    const contentType = response.headers.get('content-type') || '';
    const contentLength = response.headers.get('content-length');

    const isPdf = contentType.toLowerCase().includes('pdf') || url.toLowerCase().endsWith('.pdf');
    const isSuccess = status >= 200 && status < 400;

    return {
      url,
      status,
      ok: isSuccess,
      isPdf,
      contentLength: contentLength ? `${(parseInt(contentLength) / (1024 * 1024)).toFixed(1)} MB` : 'Dynamic stream',
      error: isSuccess ? null : `HTTP status ${status}`,
    };
  } catch (err) {
    return {
      url,
      status: 0,
      ok: false,
      isPdf: false,
      contentLength: null,
      error: err.name === 'AbortError' ? 'Request timed out' : err.message,
    };
  }
}

// ── 3. Directory Generator ───────────────────────────────────────────────────

export async function generateSubjectPdfDirectory() {
  console.log('📚 Starting Subject-Level PDF Directory Generation...\n');

  const directory = {
    metadata: {
      generatedAt: new Date().toISOString(),
      initiative: 'Techno Wallah Open Academic Repository',
      license: 'Free & Open Educational Resources (OER)',
      totalSubjects: 0,
      totalTextbooks: 0,
      totalChapters: 0,
      totalDownloadedLocally: 0,
    },
    subjects: {},
  };

  let totalTextbooks = 0;
  let totalChapters = 0;
  let totalDownloadedLocally = 0;

  // Process NCERT Textbooks
  for (const book of NCERT_SUBJECT_CATALOG) {
    if (!directory.subjects[book.subject]) {
      directory.subjects[book.subject] = {
        name: book.subject,
        categories: ['NCERT Foundational', 'Board Examinations', 'Competitive Entrances'],
        textbooks: [],
      };
    }

    const textbookEntry = {
      title: book.title,
      class: book.class,
      code: book.code,
      source: 'NCERT e-Pathshala',
      officialPortal: `https://ncert.nic.in/textbook.php?${book.code}=0-${book.chapters}`,
      fullBookDirectUrl: `https://ncert.nic.in/textbook/pdf/${book.code}.pdf`,
      targetExams: book.examTarget,
      totalChapters: book.chapters,
      chapters: [],
    };

    for (let ch = 1; ch <= book.chapters; ch++) {
      const paddedCh = ch.toString().padStart(2, '0');
      const chapterTitle = book.chapterTitles && book.chapterTitles[ch - 1]
        ? `Ch ${ch}: ${book.chapterTitles[ch - 1]}`
        : `Chapter ${ch}`;

      const directUrl = `https://ncert.nic.in/textbook/pdf/${book.code}${paddedCh}.pdf`;
      const archiveMirrorUrl = `https://archive.org/download/ncert-${book.code}/${book.code}${paddedCh}.pdf`;

      const relPath = `ncert/${book.code}/${book.code}${paddedCh}.pdf`;
      const localDiskPath = path.resolve(ROOT_DIR, 'public/materials', relPath);
      const isDownloaded = fs.existsSync(localDiskPath) && fs.statSync(localDiskPath).size > 1024;
      const localSizeMb = isDownloaded ? (fs.statSync(localDiskPath).size / (1024 * 1024)).toFixed(2) : null;
      const githubRaw = isDownloaded ? `https://raw.githubusercontent.com/hrishikeshjh/technoedu/main/public/materials/${relPath}` : null;
      if (isDownloaded) totalDownloadedLocally++;

      textbookEntry.chapters.push({
        chapterNumber: ch,
        title: chapterTitle,
        directPdfUrl: directUrl,
        mirrorUrls: [archiveMirrorUrl],
        localPath: isDownloaded ? `/materials/${relPath}` : null,
        githubRawUrl: githubRaw,
        isDownloadedLocally: isDownloaded,
        fileSizeMb: localSizeMb,
        status: 'active',
      });

      totalChapters++;
    }

    directory.subjects[book.subject].textbooks.push(textbookEntry);
    totalTextbooks++;
  }

  // Process UPSC Previous Year Question Papers
  if (!directory.subjects['UPSC Civil Services PYQ']) {
    directory.subjects['UPSC Civil Services PYQ'] = {
      name: 'UPSC Civil Services PYQ',
      categories: ['Official Previous Year Papers', 'Civil Services'],
      questionPapers: [],
    };
  }

  for (const yearBatch of UPSC_PYQ_CATALOG) {
    for (const paper of yearBatch.papers) {
      const relPath = `upsc/${yearBatch.year}/${paper.code}.pdf`;
      const localDiskPath = path.resolve(ROOT_DIR, 'public/materials', relPath);
      const isDownloaded = fs.existsSync(localDiskPath) && fs.statSync(localDiskPath).size > 1024;
      const localSizeMb = isDownloaded ? (fs.statSync(localDiskPath).size / (1024 * 1024)).toFixed(2) : null;
      const githubRaw = isDownloaded ? `https://raw.githubusercontent.com/hrishikeshjh/technoedu/main/public/materials/${relPath}` : null;
      if (isDownloaded) totalDownloadedLocally++;

      directory.subjects['UPSC Civil Services PYQ'].questionPapers.push({
        year: yearBatch.year,
        paperName: paper.name,
        code: paper.code,
        directPdfUrl: paper.url,
        officialPortal: 'https://upsc.gov.in/examinations/previous-question-papers',
        localPath: isDownloaded ? `/materials/${relPath}` : null,
        githubRawUrl: githubRaw,
        isDownloadedLocally: isDownloaded,
        fileSizeMb: localSizeMb,
        status: 'active',
      });
      totalChapters++;
    }
  }

  // Process OpenStax Textbooks
  for (const stax of OPENSTAX_COLLEGE_CATALOG) {
    if (!directory.subjects[stax.subject]) {
      directory.subjects[stax.subject] = {
        name: stax.subject,
        categories: ['OpenStax University Texts', 'Higher Education OER'],
        textbooks: [],
      };
    }

    const filename = path.basename(new URL(stax.directPdfUrl).pathname);
    const relPath = `openstax/${filename}`;
    const localDiskPath = path.resolve(ROOT_DIR, 'public/materials', relPath);
    const isDownloaded = fs.existsSync(localDiskPath) && fs.statSync(localDiskPath).size > 1024;
    const localSizeMb = isDownloaded ? (fs.statSync(localDiskPath).size / (1024 * 1024)).toFixed(2) : null;
    if (isDownloaded) totalDownloadedLocally++;

    directory.subjects[stax.subject].textbooks.push({
      title: stax.title,
      platform: stax.platform,
      license: stax.license,
      directPdfUrl: stax.directPdfUrl,
      sourceUrl: 'https://openstax.org/subjects',
      localPath: isDownloaded ? `/materials/${relPath}` : null,
      isDownloadedLocally: isDownloaded,
      fileSizeMb: localSizeMb,
      status: 'active',
    });
    totalTextbooks++;
  }

  directory.metadata.totalSubjects = Object.keys(directory.subjects).length;
  directory.metadata.totalTextbooks = totalTextbooks;
  directory.metadata.totalChapters = totalChapters;
  directory.metadata.totalDownloadedLocally = totalDownloadedLocally;

  // Save to src/data/subjectPdfDirectory.json
  const outputPath = path.resolve(ROOT_DIR, 'src/data/subjectPdfDirectory.json');
  fs.writeFileSync(outputPath, JSON.stringify(directory, null, 2), 'utf-8');

  console.log(`✅ Subject-Level PDF Directory successfully generated!`);
  console.log(`📍 Output written to: ${outputPath}`);
  console.log(`📊 Total Subjects: ${directory.metadata.totalSubjects}`);
  console.log(`📖 Total Books: ${directory.metadata.totalTextbooks}`);
  console.log(`📑 Total Indexed Chapters / Papers: ${directory.metadata.totalChapters}`);
  console.log(`💾 Locally Mirrored & Ready to Serve: ${directory.metadata.totalDownloadedLocally} PDFs\n`);

  return directory;
}

// ── 4. Verify & Audit Mode ───────────────────────────────────────────────────

export async function runVerifyAudit(sampleSize = 10) {
  console.log('🔍 Running Link Verification Audit on Sample Direct URLs...\n');

  const testUrls = [
    { name: 'NCERT Class 11 Constitution Ch 1', url: 'https://ncert.nic.in/textbook/pdf/keps201.pdf' },
    { name: 'NCERT Class 11 Constitution Ch 2', url: 'https://ncert.nic.in/textbook/pdf/keps202.pdf' },
    { name: 'NCERT Class 12 Chemistry Ch 1', url: 'https://ncert.nic.in/textbook/pdf/lech101.pdf' },
    { name: 'NCERT Class 11 Physics Ch 1', url: 'https://ncert.nic.in/textbook/pdf/keph101.pdf' },
    { name: 'OpenStax College Algebra 2e', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/College_Algebra_2e-WEB_1.pdf' },
    { name: 'OpenStax Chemistry 2e', url: 'https://assets.openstax.org/oscms-prodcms/media/documents/Chemistry2e-WEB_1.pdf' },
    { name: 'UPSC 2024 Prelims GS Paper 1', url: 'https://upsc.gov.in/sites/default/files/QP-CSP-24-GS-P-I-260624.pdf' },
    { name: 'UPSC 2024 CSAT Paper 2', url: 'https://upsc.gov.in/sites/default/files/QP-CSP-24-CSAT-P-II-260624.pdf' },
  ];

  console.log(`Testing ${testUrls.length} critical direct educational PDF URLs:\n`);

  for (const item of testUrls) {
    process.stdout.write(`Testing: ${item.name.padEnd(38)} ... `);
    const result = await verifyPdfUrl(item.url);
    if (result.ok) {
      console.log(`✅ [${result.status}] OK (${result.contentLength})`);
    } else {
      console.log(`⚠️ [${result.status}] ${result.error || 'Blocked'}`);
    }
  }

  console.log('\n💡 Recommendation: Ensure all external <a> tags keep `referrerPolicy="no-referrer"` to bypass foreign-domain 403 firewalls.\n');
}

// ── 5. Download & Archiving Mode ─────────────────────────────────────────────

export async function downloadMaterials(options = {}) {
  const {
    targetDir = 'public/materials',
    limit = null,
    subjectFilter = null,
    all = false,
  } = options;

  const absoluteTarget = path.resolve(ROOT_DIR, targetDir);
  if (!fs.existsSync(absoluteTarget)) {
    fs.mkdirSync(absoluteTarget, { recursive: true });
  }

  // 1. Gather all downloadable files from catalog
  const queue = [];

  // NCERT
  for (const book of NCERT_SUBJECT_CATALOG) {
    if (subjectFilter && !book.subject.toLowerCase().includes(subjectFilter.toLowerCase())) {
      continue;
    }
    for (let ch = 1; ch <= book.chapters; ch++) {
      const paddedCh = ch.toString().padStart(2, '0');
      const directUrl = `https://ncert.nic.in/textbook/pdf/${book.code}${paddedCh}.pdf`;
      const archiveMirrorUrl = `https://archive.org/download/ncert-${book.code}/${book.code}${paddedCh}.pdf`;
      queue.push({
        subject: book.subject,
        category: 'ncert',
        bookTitle: book.title,
        chapter: ch,
        title: `${book.title} - Ch ${ch}`,
        url: directUrl,
        mirrorUrls: [archiveMirrorUrl],
        relativePath: path.join('ncert', book.code, `${book.code}${paddedCh}.pdf`),
      });
    }
  }

  // UPSC PYQ
  if (!subjectFilter || subjectFilter.toLowerCase().includes('upsc') || subjectFilter.toLowerCase().includes('civil')) {
    for (const yearBatch of UPSC_PYQ_CATALOG) {
      for (const paper of yearBatch.papers) {
        queue.push({
          subject: 'UPSC Civil Services PYQ',
          category: 'upsc',
          bookTitle: `UPSC ${yearBatch.year}`,
          chapter: null,
          title: `UPSC ${yearBatch.year} - ${paper.name}`,
          url: paper.url,
          mirrorUrls: [],
          relativePath: path.join('upsc', yearBatch.year, `${paper.code}.pdf`),
        });
      }
    }
  }

  // OpenStax
  for (const stax of OPENSTAX_COLLEGE_CATALOG) {
    if (subjectFilter && !stax.subject.toLowerCase().includes(subjectFilter.toLowerCase()) && !subjectFilter.toLowerCase().includes('openstax')) {
      continue;
    }
    const filename = path.basename(new URL(stax.directPdfUrl).pathname);
    queue.push({
      subject: stax.subject,
      category: 'openstax',
      bookTitle: stax.title,
      chapter: null,
      title: stax.title,
      url: stax.directPdfUrl,
      mirrorUrls: [],
      relativePath: path.join('openstax', filename),
    });
  }

  // Determine items to download
  let targets = queue;
  if (!all && !limit && !subjectFilter) {
    // Default sample mode: pick 10 representative PDFs
    const sampleSelection = [
      queue.find(q => q.category === 'ncert' && q.relativePath.includes('keps201')),
      queue.find(q => q.category === 'ncert' && q.relativePath.includes('keps202')),
      queue.find(q => q.category === 'ncert' && q.relativePath.includes('lehs101')),
      queue.find(q => q.category === 'ncert' && q.relativePath.includes('lehs102')),
      queue.find(q => q.category === 'ncert' && q.relativePath.includes('keph101')),
      queue.find(q => q.category === 'ncert' && q.relativePath.includes('kech101')),
      queue.find(q => q.category === 'ncert' && q.relativePath.includes('kebo101')),
      queue.find(q => q.category === 'ncert' && q.relativePath.includes('kemh101')),
      queue.find(q => q.category === 'upsc' && q.title.includes('2024') && q.title.includes('General Studies Paper I')),
      queue.find(q => q.category === 'upsc' && q.title.includes('2024') && q.title.includes('CSAT Paper II')),
    ].filter(Boolean);

    targets = sampleSelection.length > 0 ? sampleSelection : queue.slice(0, 10);
    console.log(`\n📦 Defaulting to Sample Batch (${targets.length} essential PDFs across subjects).`);
    console.log(`💡 To download ALL ${queue.length} files: npm run harvest:download -- --all`);
    console.log(`💡 To download by subject: npm run harvest:download -- --subject "Physics"`);
    console.log(`💡 To download a limited count: npm run harvest:download -- --limit 5\n`);
  } else if (limit) {
    targets = queue.slice(0, limit);
    console.log(`\n📦 Downloading limited batch of ${targets.length} PDFs (from ${queue.length} matching)...\n`);
  } else {
    console.log(`\n📦 Starting batch download of ${targets.length} PDFs...\n`);
  }

  let downloadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  let totalBytes = 0;

  for (let i = 0; i < targets.length; i++) {
    const item = targets[i];
    const destPath = path.resolve(absoluteTarget, item.relativePath);
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const prefix = `[${i + 1}/${targets.length}]`;

    // Check if already downloaded
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (stats.size > 1024) {
        const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`${prefix} ⏩ Skipped (already exists): ${item.title} (${sizeMb} MB)`);
        skippedCount++;
        totalBytes += stats.size;
        continue;
      }
    }

    process.stdout.write(`${prefix} ⏳ Downloading: ${item.title} ... `);

    let downloadSuccess = false;
    const urlsToTry = [item.url, ...(item.mirrorUrls || [])];

    for (const tryUrl of urlsToTry) {
      try {
        const urlObj = new URL(tryUrl);
        const headers = {
          ...BROWSER_HEADERS,
          'Referer': `${urlObj.protocol}//${urlObj.hostname}/`,
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(tryUrl, {
          method: 'GET',
          headers,
          signal: controller.signal,
          redirect: 'follow',
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const fileStream = fs.createWriteStream(destPath);
        await pipeline(Readable.fromWeb(response.body), fileStream);

        const stats = fs.statSync(destPath);
        const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
        totalBytes += stats.size;
        console.log(`✅ Saved (${sizeMb} MB)`);
        downloadedCount++;
        downloadSuccess = true;
        break; // Successfully downloaded
      } catch (err) {
        // Remove empty or partial file if created
        if (fs.existsSync(destPath)) {
          try { fs.unlinkSync(destPath); } catch {}
        }
      }
    }

    if (!downloadSuccess) {
      console.log(`❌ Failed (unavailable on primary & mirrors)`);
      failedCount++;
    }
  }

  const totalMb = (totalBytes / (1024 * 1024)).toFixed(1);
  console.log(`\n========================================`);
  console.log(`📊 Download Summary:`);
  console.log(`   ✅ New Downloads: ${downloadedCount}`);
  console.log(`   ⏩ Already Cached: ${skippedCount}`);
  console.log(`   ❌ Failed: ${failedCount}`);
  console.log(`   💾 Total Local Storage: ${totalMb} MB`);
  console.log(`   📁 Target Folder: ${absoluteTarget}`);
  console.log(`========================================\n`);
}

// ── 6. CLI Handler ───────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  const isGenerate = args.includes('--generate');
  const isVerify = args.includes('--verify');
  const isDownload = args.includes('--download');
  const isHelp = args.includes('--help') || args.includes('-h');

  const isAll = args.includes('--all');
  const subjectIndex = args.indexOf('--subject');
  const subjectFilter = subjectIndex !== -1 && args[subjectIndex + 1] ? args[subjectIndex + 1] : null;
  const limitIndex = args.indexOf('--limit');
  const limitFilter = limitIndex !== -1 && args[limitIndex + 1] ? parseInt(args[limitIndex + 1], 10) : null;
  const dirIndex = args.indexOf('--dir');
  const targetDir = dirIndex !== -1 && args[dirIndex + 1] ? args[dirIndex + 1] : 'public/materials';

  if (isGenerate || (args.length === 0)) {
    await generateSubjectPdfDirectory();
  } else if (isVerify) {
    await runVerifyAudit();
  } else if (isDownload) {
    await downloadMaterials({
      targetDir,
      all: isAll,
      subjectFilter,
      limit: limitFilter,
    });
  } else if (isHelp) {
    console.log(`
Techno Wallah PDF Harvester & Directory Builder

Usage:
  npm run harvest:generate            Generate subjectPdfDirectory.json catalog
  npm run harvest:verify              Run link health audit on educational URLs
  npm run harvest:download            Download sample bundle of essential PDFs (~15 MB)
  npm run harvest:download -- --all   Download ALL indexed PDFs (NCERT, UPSC, OpenStax)
  npm run harvest:download -- --subject "Physics"    Download specific subject
  npm run harvest:download -- --limit 5              Download first 5 PDFs
`);
  } else {
    console.log(`Unknown command. Run with --help for available options.`);
  }
}

main().catch(err => {
  console.error('[Harvester Fatal Error]:', err);
  process.exit(1);
});

