import { AITutorSession, AIMessage, AISource } from '../types/aiFeatures';

export const aiTutorSessions: AITutorSession[] = [
  {
    id: 'session-1',
    examId: 'upsc',
    topic: 'Indian Polity - Fundamental Rights',
    createdAt: new Date('2026-09-15'),
    updatedAt: new Date('2026-09-18'),
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Can you explain Article 21 of the Indian Constitution in simple terms?',
        timestamp: new Date('2026-09-18T10:30:00'),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'Article 21 is the heart of fundamental rights in India. It states: "No person shall be deprived of his life or personal liberty except according to procedure established by law."\n\nIn simple terms:\n• **Right to Life**: Not just survival, but life with dignity\n• **Personal Liberty**: Freedom from arbitrary arrest/detention\n• **Procedure Established by Law**: The government must follow fair, just, and reasonable procedures\n\nKey expansions by Supreme Court:\n- Right to privacy (2017)\n- Right to clean environment\n- Right to health & medical care\n- Right to education (until 14 years)\n- Right to speedy trial\n- Rights of prisoners',
        timestamp: new Date('2026-09-18T10:30:05'),
        confidence: 0.95,
        sources: [
          {
            title: 'Constitution of India - Article 21',
            url: 'https://legislative.gov.in/constitution-of-india/',
            platform: 'Ministry of Law & Justice',
            type: 'official',
          },
          {
            title: 'Maneka Gandhi v. Union of India (1978)',
            url: 'https://indiankanoon.org/search/?formInput=maneka%20gandhi',
            platform: 'Indian Kanoon',
            type: 'paper',
          },
        ],
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'What is the difference between "procedure established by law" and "due process of law"?',
        timestamp: new Date('2026-09-18T10:32:00'),
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: 'Great question! This is a crucial distinction in constitutional law:\n\n**Procedure Established by Law (Article 21 - India)**:\n- Only checks if a law exists and was properly enacted\n- Does NOT examine if the law is fair, just, or reasonable\n- Parliament\'s supremacy - if procedure followed, law is valid\n- Original interpretation in AK Gopalan case (1950)\n\n**Due Process of Law (US 5th/14th Amendment)**:\n- Examines BOTH procedure AND substance of the law\n- Courts can strike down laws that are unfair/unreasonable\n- Judicial review of legislative wisdom\n- "Substantive due process" protects fundamental rights\n\n**Evolution in India**:\n- **1950 (AK Gopalan)**: Strict "procedure established by law"\n- **1978 (Maneka Gandhi)**: Introduced "reasonableness" test\n- **Present**: "Procedure must be fair, just, and reasonable" - effectively reading "due process" into Article 21',
        timestamp: new Date('2026-09-18T10:32:10'),
        confidence: 0.92,
        sources: [
          {
            title: 'AK Gopalan v. State of Madras (1950)',
            url: 'https://indiankanoon.org/search/?formInput=ak%20gopalan',
            platform: 'Indian Kanoon',
            type: 'paper',
          },
          {
            title: 'Maneka Gandhi v. Union of India (1978)',
            url: 'https://indiankanoon.org/search/?formInput=maneka%20gandhi',
            platform: 'Indian Kanoon',
            type: 'paper',
          },
        ],
      },
    ],
  },
  {
    id: 'session-2',
    examId: 'jee',
    topic: 'Physics - Electromagnetic Induction',
    createdAt: new Date('2026-09-10'),
    updatedAt: new Date('2026-09-17'),
    messages: [
      {
        id: 'msg-5',
        role: 'user',
        content: 'I\'m struggling with Faraday\'s laws of electromagnetic induction. Can you break it down?',
        timestamp: new Date('2026-09-17T14:00:00'),
      },
      {
        id: 'msg-6',
        role: 'assistant',
        content: 'Absolutely! Let me break down Faraday\'s Laws simply:\n\n**First Law**: Whenever magnetic flux through a circuit changes, an EMF is induced in the circuit.\n\n**Second Law**: The magnitude of induced EMF equals the rate of change of magnetic flux linkage.\n\n**Formula**: ε = -dΦ/dt\n- ε = induced EMF (volts)\n- Φ = magnetic flux (weber) = B·A·cosθ\n- Negative sign = Lenz\'s Law (direction opposes change)\n\n**Key Concepts**:\n1. **Magnetic Flux (Φ)**: Number of field lines passing through area\n2. **Flux Change**: Can happen by changing B, A, or θ\n3. **Lenz\'s Law**: Nature opposes the change (conservation of energy)\n4. **Induced Current**: I = ε/R (if circuit closed)\n\n**JEE-Focused Applications**:\n- Motional EMF: ε = Bℓv (rod moving in field)\n- Rotating coil: ε = NBAω sin(ωt) (AC generator)\n- Mutual/self inductance\n- Eddy currents\n- Transformer principle',
        timestamp: new Date('2026-09-17T14:00:08'),
        confidence: 0.94,
        sources: [
          {
            title: 'NCERT Physics Class 12 - Chapter 6',
            url: 'https://ncert.nic.in/textbook.php',
            platform: 'NCERT',
            type: 'textbook',
          },
          {
            title: 'HC Verma - Concepts of Physics Vol 2',
            url: 'https://hcverma.in/',
            platform: 'HC Verma',
            type: 'textbook',
          },
        ],
      },
    ],
  },
];

export const aiKnowledgeBase = {
  upsc: [
    'Indian Polity & Constitution',
    'Modern Indian History',
    'Geography of India & World',
    'Indian Economy',
    'Environment & Ecology',
    'Science & Technology',
    'Current Affairs',
  ],
  jee: [
    'Physics - Mechanics',
    'Physics - Electrodynamics',
    'Physics - Modern Physics',
    'Chemistry - Physical',
    'Chemistry - Organic',
    'Chemistry - Inorganic',
    'Mathematics - Algebra',
    'Mathematics - Calculus',
    'Mathematics - Coordinate Geometry',
  ],
  neet: [
    'Biology - Botany',
    'Biology - Zoology',
    'Chemistry - Physical',
    'Chemistry - Organic',
    'Chemistry - Inorganic',
    'Physics - Mechanics',
    'Physics - Thermodynamics',
  ],
};

export const samplePrompts = [
  'Explain this concept in simple terms',
  'Give me a mnemonic for this topic',
  'What are the common exam questions on this?',
  'Compare and contrast X vs Y',
  'What are the key formulas I need to remember?',
  'Walk me through a solved example',
  'What are the exceptions to this rule?',
  'How does this connect to other topics?',
];