// Site content + types. Edit the values below and refresh to update the page.

export interface Profile {
  name: string;
  /** Email is split into two parts and joined at runtime so it isn't
   *  exposed as plain text in the markup. */
  emailUser: string;
  emailDomain: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Article {
  /** unique, lowercase-with-dashes - used in the URL: /insights/<slug> */
  slug: string;
  tag: string;
  /** "blue" or "teal" */
  cover: 'blue' | 'teal';
  /** any Bootstrap Icons name, e.g. "bi-compass" */
  icon: string;
  title: string;
  excerpt: string;
  readMins: number;
  /** one paragraph per entry */
  body: string[];
}

export interface SiteContent {
  profile: Profile;
  testimonials: Testimonial[];
  articles: Article[];
}

export const SITE_CONTENT: SiteContent = {
  // Email is split into two parts and joined at runtime so it isn't
  // exposed as plain text in the markup. Edit both parts to change it.
  profile: {
    name: 'Laxmi Subedi',
    emailUser: 'contact.laxmisubedi',
    emailDomain: 'gmail.com',
  },

  // Leave empty until you have real quotes; the section stays hidden.
  testimonials: [],

  // Each article also gets its own page at /insights/<slug>.
  articles: [
    {
      slug: 'choose-a-course',
      tag: 'Study tips',
      cover: 'teal',
      icon: 'bi-compass',
      title: 'How to choose a course you won’t regret',
      excerpt: 'A simple way to match your interests, strengths, and realistic options.',
      readMins: 4,
      body: [
        'Choosing a course is one of the biggest decisions a student makes - and often one of the most rushed. Here is the simple way I think it through with students.',
        'Start by separating what you enjoy from what you are good at. They overlap, but they are not the same. The steadiest path usually sits where genuine interest meets real ability.',
        'Next, be honest about your constraints - budget, location, and entry requirements. A realistic plan you can actually act on is worth more than a perfect plan you cannot.',
        'Finally, talk to someone already on the path you are considering. A short, honest conversation can save you a lot of time. That is exactly the kind of conversation I am happy to have.',
      ],
    },
    {
      slug: 'prepare-study-abroad',
      tag: 'Study abroad',
      cover: 'blue',
      icon: 'bi-globe2',
      title: 'Things to prepare before applying overseas',
      excerpt: 'A short, practical checklist before you start an overseas application.',
      readMins: 5,
      body: [
        'Studying abroad is exciting, but the preparation can feel overwhelming. Sorting a few things out early makes the rest far smoother.',
        'Know your goal first. Be clear on why you want to go and what you want to study before choosing a country or university.',
        'Plan the full budget, not just tuition. Living costs, travel, and insurance all add up and deserve a realistic estimate.',
        'Get your documents ready early. Passports, transcripts, and language tests usually take longer than people expect.',
        'Work backwards from the deadlines and build in buffer time. If you would like help mapping out your timeline, reach out and I will walk through it with you.',
      ],
    },
    {
      slug: 'career-in-business',
      tag: 'Business',
      cover: 'blue',
      icon: 'bi-briefcase',
      title: 'Thinking about a career in business?',
      excerpt: 'An honest reflection on the journey, from a student currently on it.',
      readMins: 4,
      body: [
        'Business is a versatile path, but it is also a competitive one. As someone currently studying it, here is my honest take.',
        'It is demanding in its own way - you have to keep up with markets, sharpen your numbers, and learn to work well with people. But few things are as rewarding as seeing an idea turn into something that works.',
        'You do not need to be the smartest person in the room. Curiosity, discipline, and a willingness to keep learning matter more than raw talent.',
        'If you are considering business or management studies, talk to people already on the path before you commit. I am always glad to share what the journey honestly looks like.',
      ],
    },
  ],
};
