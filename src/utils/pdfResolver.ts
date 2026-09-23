import subjectPdfDirectory from '../data/subjectPdfDirectory.json';

export const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/hrishikeshjh/technoedu/main/public/materials';

// Build a fast lookup map: original official URL -> verified GitHub raw PDF URL
const resolvedUrlMap = new Map<string, string>();

try {
  const subjects = (subjectPdfDirectory as any).subjects || {};
  for (const sKey of Object.keys(subjects)) {
    const s = subjects[sKey];
    if (s.textbooks) {
      for (const b of s.textbooks) {
        if (b.fullBookDirectUrl && b.chapters && b.chapters[0]?.githubRawUrl) {
          resolvedUrlMap.set(b.fullBookDirectUrl, b.chapters[0].githubRawUrl);
        }
        if (b.chapters) {
          for (const ch of b.chapters) {
            if (ch.directPdfUrl && (ch.githubRawUrl || ch.localPath)) {
              resolvedUrlMap.set(
                ch.directPdfUrl,
                ch.githubRawUrl || `${GITHUB_RAW_BASE}/${ch.localPath.replace(/^\/materials\//, '')}`
              );
            }
          }
        }
      }
    }
    if (s.questionPapers) {
      for (const qp of s.questionPapers) {
        if (qp.directPdfUrl && (qp.githubRawUrl || qp.localPath)) {
          resolvedUrlMap.set(
            qp.directPdfUrl,
            qp.githubRawUrl || `${GITHUB_RAW_BASE}/${qp.localPath.replace(/^\/materials\//, '')}`
          );
        }
      }
    }
  }
} catch {
  // Graceful fallback if directory metadata is missing
}

/**
 * Resolves any direct PDF link to a reliable, verified GitHub raw CDN URL
 * if available, bypassing 403 blocks and dead official links.
 */
export function resolvePdfUrl(url?: string): string {
  if (!url) return '#';
  if (url.includes('raw.githubusercontent.com')) return url;
  if (resolvedUrlMap.has(url)) return resolvedUrlMap.get(url)!;

  // NCERT chapter URL pattern: /keps201.pdf
  const ncertMatch = url.match(/\/([a-z]{4}\d)(\d{2})\.pdf$/i);
  if (ncertMatch) {
    let book = ncertMatch[1].toLowerCase();
    if (book === 'lesc1' || book === 'lesc2') book = 'leec1';
    if (book === 'kesc1') book = 'keec1';
    return `${GITHUB_RAW_BASE}/ncert/${book}/${book}${ncertMatch[2]}.pdf`;
  }

  // NCERT full book URL pattern: /keps2.pdf -> Chapter 1 on GitHub
  const ncertBookMatch = url.match(/\/([a-z]{4}\d)\.pdf$/i);
  if (ncertBookMatch) {
    let book = ncertBookMatch[1].toLowerCase();
    if (book === 'lesc1' || book === 'lesc2') book = 'leec1';
    if (book === 'kesc1') book = 'keec1';
    return `${GITHUB_RAW_BASE}/ncert/${book}/${book}01.pdf`;
  }

  // UPSC PYQ pattern fallback
  if (url.includes('upsc.gov.in') || url.includes('_GS_') || url.includes('upsc_')) {
    if (url.includes('2024')) {
      if (url.includes('CSAT')) return `${GITHUB_RAW_BASE}/upsc/2024/2024_CSAT_2.pdf`;
      return `${GITHUB_RAW_BASE}/upsc/2024/2024_GS_1.pdf`;
    }
    if (url.includes('2023')) {
      if (url.includes('CSAT')) return `${GITHUB_RAW_BASE}/upsc/2023/2023_CSAT_2.pdf`;
      return `${GITHUB_RAW_BASE}/upsc/2023/2023_GS_1.pdf`;
    }
  }

  return url;
}
