import { PracticeQuestion } from '../types';

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'q-upsc-1',
    examShortCode: 'UPSC CSE',
    subject: 'Indian Polity & Governance',
    topic: 'Fundamental Rights & Basic Structure',
    questionText: 'With reference to the Constitution of India, consider the following statements regarding the "Doctrine of Basic Structure":\n\n1. It was propounded by the Supreme Court in the Kesavananda Bharati case (1973).\n2. Article 368 explicitly defines what constitutes the "Basic Structure".\n3. The power of judicial review is an integral part of the basic structure.\n\nWhich of the statements given above is/are correct?',
    options: [
      { id: 'opt-a', text: '1 and 2 only' },
      { id: 'opt-b', text: '1 and 3 only' },
      { id: 'opt-c', text: '2 and 3 only' },
      { id: 'opt-d', text: '1, 2 and 3' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'Statement 1 is correct: The Supreme Court outlined the Basic Structure doctrine in Kesavananda Bharati v. State of Kerala (1973). Statement 2 is incorrect: Article 368 does NOT define or mention "Basic Structure"; it was evolved judicially. Statement 3 is correct: Judicial review under Articles 32, 136, 226, and 227 has been repeatedly affirmed as basic structure.',
    sourceReference: 'UPSC Civil Services Prelims GS Paper I',
    sourceUrl: 'https://upsc.gov.in/examinations/previous-question-papers'
  },
  {
    id: 'q-upsc-2',
    examShortCode: 'UPSC CSE',
    subject: 'Modern Indian History',
    topic: 'Freedom Struggle & Civil Disobedience',
    questionText: 'Which of the following was the primary trigger for Mahatma Gandhi to launch the Civil Disobedience Movement in 1930?',
    options: [
      { id: 'opt-a', text: 'The rejection of his 11-point ultimatum submitted to Viceroy Lord Irwin' },
      { id: 'opt-b', text: 'The announcement of the Communal Award by Ramsay MacDonald' },
      { id: 'opt-c', text: 'The passage of the Rowlatt Act and subsequent Jallianwala Bagh incident' },
      { id: 'opt-d', text: 'The arrival of the Simon Commission in Bombay' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'In January 1930, Mahatma Gandhi placed 11 specific demands before Viceroy Irwin (including 50% reduction in land revenue and abolition of the salt tax). Irwin ignored the ultimatum, leading to the Dandi Salt March on March 12, 1930.',
    sourceReference: 'UPSC Civil Services Prelims GS-1 / NCERT Class 12 History',
    sourceUrl: 'https://ncert.nic.in/textbook.php'
  },
  {
    id: 'q-gre-1',
    examShortCode: 'GRE General',
    subject: 'Quantitative Reasoning',
    topic: 'Number Properties & Remainders',
    questionText: 'If n is an integer such that n = 14k + 9 for some integer k, what is the remainder when (3n + 5) is divided by 7?',
    options: [
      { id: 'opt-a', text: '2' },
      { id: 'opt-b', text: '3' },
      { id: 'opt-c', text: '4' },
      { id: 'opt-d', text: '5' }
    ],
    correctOptionId: 'opt-c',
    explanation: 'Substitute n: 3n + 5 = 3(14k + 9) + 5 = 42k + 27 + 5 = 42k + 32. Since 42k is divisible by 7 (42 = 7 * 6), we only divide 32 by 7. 32 = 7 * 4 + 4. Thus the remainder is 4.',
    sourceReference: 'OpenStax College Algebra / ETS Official Math Review',
    sourceUrl: 'https://openstax.org/details/books/college-algebra-2e'
  },
  {
    id: 'q-gmat-1',
    examShortCode: 'GMAT Focus',
    subject: 'Data Insights & Quant',
    topic: 'Ratios, Rates & Work',
    questionText: 'Machine A working alone produces 800 widgets in 4 hours. Machine B working alone produces 800 widgets in 6 hours. If both machines work simultaneously at their constant rates, how many hours will it take to produce 2,000 widgets?',
    options: [
      { id: 'opt-a', text: '5 hours' },
      { id: 'opt-b', text: '6 hours' },
      { id: 'opt-c', text: '6.5 hours' },
      { id: 'opt-d', text: '7.5 hours' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'Rate of Machine A = 800 / 4 = 200 widgets/hour. Rate of Machine B = 800 / 6 = 133.33 (or 400/3) widgets/hour. Combined rate = 200 + 400/3 = 1000/3 widgets/hour. Time to produce 2000 widgets = 2000 / (1000/3) = 2000 * 3 / 1000 = 6 hours.',
    sourceReference: 'Khan Academy Algebra & OpenStax Business Math',
    sourceUrl: 'https://www.khanacademy.org'
  },
  {
    id: 'q-clat-1',
    examShortCode: 'CLAT UG',
    subject: 'Legal Reasoning',
    topic: 'Law of Torts & Volenti Non Fit Injuria',
    questionText: 'Principle: A person who voluntarily consents to risk harm or damage cannot claim compensation for injuries suffered as a consequence (Volenti Non Fit Injuria).\n\nFact: Rohan attends a professional cricket match in a stadium. A batsman hits a six into the stands, and the ball strikes Rohan on the shoulder causing a fracture. Rohan sues the stadium management for negligence.\n\nDecision:',
    options: [
      { id: 'opt-a', text: 'Rohan will succeed because the stadium authority has an absolute duty of care to protect spectators.' },
      { id: 'opt-b', text: 'Rohan will not succeed because by purchasing a ticket and attending the match, he implicitly consented to the inherent risks of flying cricket balls.' },
      { id: 'opt-c', text: 'Rohan will succeed only if he can prove the batsman struck the ball with malicious intent.' },
      { id: 'opt-d', text: 'The stadium management is strictly liable under the doctrine of Rylands v. Fletcher.' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'Under the doctrine of Volenti Non Fit Injuria, a spectator at a sporting event impliedly agrees to take upon themselves the ordinary and foreseeable risks incidental to that sport, provided the management took customary and reasonable precautions.',
    sourceReference: 'Consortium of NLUs Official PYQ / Indian Kanoon Open Law Archive',
    sourceUrl: 'https://indiankanoon.org'
  },
  {
    id: 'q-sat-1',
    examShortCode: 'Digital SAT',
    subject: 'Reading and Writing',
    topic: 'Craft and Structure / Vocabulary in Context',
    questionText: 'In evolutionary biology, symbiotic mutualisms are rarely static agreements; instead, they represent dynamic equilibria where each partner species continuously adapts to optimize its fitness while checking the other’s potential exploitation.\n\nAs used in the text, what does the word "dynamic" most nearly mean?',
    options: [
      { id: 'opt-a', text: 'Energetic and boisterous' },
      { id: 'opt-b', text: 'Subject to continuous change and adjustment' },
      { id: 'opt-c', text: 'Strictly hierarchical' },
      { id: 'opt-d', text: 'Violent and predatory' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'The sentence contrasts "static agreements" (fixed, unchanging) with "dynamic equilibria where each partner continuously adapts". Hence, dynamic means constantly changing, shifting, and adjusting.',
    sourceReference: 'College Board Official SAT Standards & Khan Academy Reading Prep',
    sourceUrl: 'https://www.khanacademy.org/sat'
  }
];

export const sampleExamQuestions = practiceQuestions;
