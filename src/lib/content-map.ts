// Editorial furniture that lives in the InDesign layout rather than the body markdown:
// cover teasers, feature decks, opener images, inline figures, captions, credits.
// Mirrors production/indesign/School-of-Thought-2026-rebuild.indd (16-page edition).

export type Figure = {
  src: string;           // file name under src/assets/images
  alt: string;
  caption?: string;
  credit?: string;
  align?: 'left' | 'right' | 'wide';
  format?: 'portrait' | 'landscape';
};

export type InlineFigure = Figure & {
  after: string;         // first words of the paragraph the figure follows
};

export const meta = {
  masthead: 'Executive Leadership',
  edition: 'Annual Review 2026',
  program: 'Executive Ed.D. in Higher Education',
  institution: 'Boston College',
  school: 'Lynch School of Education and Human Development',
  programUrl: 'https://www.bc.edu/bc-web/schools/lynch-school/academics/departments/elhe/edd-higher-ed.html',
  coverage: 'September 1, 2025 through August 31, 2026',
  description:
    'Executive Leadership is the annual magazine of the Executive Ed.D. in Higher Education at Boston College. The 2026 issue: The Long Work of Leading Well.',
};

export const cover = {
  image: 'bc-campus-gasson-boston.jpg',
  alt: 'Gasson Hall at Boston College with the Boston skyline behind it',
  theme: ['The Long Work', 'of Leading Well'],
  lede: 'Higher education needs leaders who are strategic, future-focused, in the service of others.',
  teasers: [
    { title: 'Scholarship in Public', blurb: 'From faculty burnout to AI, scholar-leaders turn urgent questions into arguments others can use.', href: '#scholarship-in-public' },
    { title: 'Towards the Greater', blurb: 'Provost, dean, and vice president appointments give judgment a wider field of consequence.', href: '#towards-the-greater' },
    { title: 'After the Defense', blurb: 'Defenses, residencies, coaching, and retreat carry formation past graduation.', href: '#after-the-defense' },
  ],
};

export const letter = {
  kicker: 'From the Program Director',
  title: 'The Long Work of Leading Well',
  deck: 'State of the Program',
  pullQuote: { text: '“Do the right thing. Always.”', source: 'Jim Ryan, University of Virginia valediction' },
  signature: { src: 'chris-glass-signature.png', alt: 'Chris' },
  interlude: {
    src: 'santiago-residency-shane-dunn-linkedin.jpg',
    alt: 'The Executive Ed.D. community gathered on a staircase in Santiago, holding a Chilean flag',
    caption: 'The community in Santiago, June 2026.',
    credit: 'Courtesy of Shane Dunn',
  },
};

export const invitation = {
  title: 'Who should join us next?',
};

export type Feature = {
  number: string;
  label: string;
  deck: string;
  opener: Figure;
  inline: InlineFigure[];
  closer?: Figure;
};

export const features: Record<string, Feature> = {
  'Scholarship in Public': {
    number: '01',
    label: 'Scholarship',
    deck: 'Scholar-leaders turn urgent questions about technology, policy, and mobility into arguments the public can use.',
    opener: { src: 'luis-kauachi.png', alt: 'Luis Kauachi speaking during a public conversation on internationalization', format: 'portrait' },
    inline: [
      { after: 'Peter Rojas (C5), Director of the Intercultural Center', src: 'peter-rojas.jpg', alt: 'Peter Rojas', caption: 'Peter Rojas (C5), Director of the Intercultural Center at Brandeis University.', credit: 'Courtesy of Peter Rojas', align: 'right', format: 'portrait' },
    ],
    closer: { src: 'dana-brandt-skills-summit-linkedin.jpg', alt: 'A panel on stage at the Navigating the Skills Frontier summit, flanked by American flags', caption: 'Dana Brandt (C6) at the U.S. Department of Labor’s Navigating the Skills Frontier summit.', credit: 'Courtesy of Dana Brandt', align: 'wide', format: 'landscape' },
  },
  'Leading Change': {
    number: '02',
    label: 'Institutional change',
    deck: 'Leaders make values durable through regulation, educational pathways, public memory, and institutional practice.',
    opener: { src: 'leading-change-collage.jpg', alt: 'Arevik Ohanyan, Jen Pollard, and Laura S. Abreu Malla', format: 'collage' },
    inline: [
      { after: 'Olga Nazaykinskaya (C2) published research', src: 'olga-nazaykinskaya-rectors-school.jpg', alt: 'Olga Nazaykinskaya speaking at the Rectors’ School', caption: 'Olga Nazaykinskaya (C2) at the Rectors’ School.', align: 'left', format: 'landscape' },
      { after: 'Florida State University Libraries chose', src: 'katie-mccormick-emmett-till-records-fsu.jpg', alt: 'A handwritten document from the Emmett Till trial records', caption: 'A record from the Emmett Till trial, acquired by FSU Libraries in 2026.', credit: 'Courtesy of Florida State University Libraries', align: 'right', format: 'landscape' },
      { after: 'Mary Immaculate College’s International Office won', src: 'holly-cowman-education-awards-press-release.jpg', alt: 'Mary Immaculate College International Office team at the Education Awards', caption: 'Mary Immaculate College’s International Office at the 2026 Education Awards.', credit: 'Courtesy of Mary Immaculate College', align: 'left', format: 'landscape' },
    ],
  },
  'Towards the Greater': {
    number: '03',
    label: 'Leadership',
    deck: 'Appointments in academic, mission, enrollment, and operational leadership give judgment a wider field of consequence.',
    opener: { src: 'keith-maczkiewicz-holy-cross.jpg', alt: 'Keith Maczkiewicz, SJ, celebrating Mass at the College of the Holy Cross', credit: 'Courtesy of the College of the Holy Cross', format: 'landscape' },
    inline: [],
    closer: { src: 'mauricio-pope-leo.jpg', alt: 'Mauricio López Oropeza shaking hands with Pope Leo XIV, with cardinals standing behind them', caption: 'Mauricio López Oropeza (C4) greets Pope Leo XIV.', credit: 'Courtesy of Mauricio López Oropeza', align: 'wide', format: 'landscape' },
  },
  'After the Defense': {
    number: '04',
    label: 'Formation',
    deck: 'Defenses, residencies, alumni returns, coaching, and retreat carry formation beyond graduation.',
    opener: { src: 'cohort-3-graduation.jpeg', alt: 'Cohort 3 in maroon regalia at Boston College commencement', caption: 'Cohort 3 at Boston College commencement on May 18, 2026.', credit: 'Courtesy of Cohort 3', format: 'landscape' },
    inline: [
      { after: 'Cohort 3: Carly Anderson', src: 'cohort-3-public-defenses-collage.jpg', alt: 'A collage of Cohort 3 members at their public defenses', caption: 'Cohort 3’s spring 2026 public defenses.', align: 'right', format: 'landscape' },
    ],
    closer: { src: 'alumni-engagement-programs-2026-27.png', alt: 'Annual Alumni Engagement Programs of the Executive Ed.D.: fall roundtable and two coaching sessions, spring coaching and roundtable, and an annual retreat. Roundtables are open, alumni-led sessions on consequential leadership challenges. Retreats are annual in-person gatherings to reflect on leadership, connect across cohorts, and renew the community. Coaching is a year-long, sign-up-based small-group experience for alumni.', caption: 'Annual alumni engagement programs, 2026–27.', align: 'wide', format: 'portrait' },
  },
};

export const featureOrder = Object.keys(features);

// Short welcome piece that closes the issue (H1 "Welcome, Jess Belue Buckley" in articles.md).
export const welcome = {
  title: 'Welcome, Jess Belue Buckley',
  kicker: 'New to the department',
  portrait: { src: 'jessica-belue-buckley-bc.webp', alt: 'Jessica Belue Buckley', caption: 'Jessica Belue Buckley, Associate Professor of Higher Education.', credit: 'Courtesy of Boston College', align: 'right' as const, format: 'portrait' as const },
};
