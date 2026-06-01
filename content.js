// Site content. Edit the values below and refresh to update the page.

window.siteContent = {

  // Email is split into two parts and joined at runtime so it isn't
  // exposed as plain text in the markup. Edit both parts to change it.
  profile: {
    name: "Laxmi Subedi",
    emailUser: "hello",
    emailDomain: "gmail.com"
  },

  // Leave empty until you have real quotes; the section stays hidden.
  // Format: { quote, name, role }
  testimonials: [],

  // Each article also gets its own page at article.html?id=<slug>.
  // slug: unique, lowercase-with-dashes · cover: "blue" or "teal"
  // icon: any Bootstrap Icons name · body: one paragraph per line
  articles: [
    {
      slug: "choose-a-course",
      tag: "Study tips",
      cover: "teal",
      icon: "bi-compass",
      title: "How to choose a course you won’t regret",
      excerpt: "A simple way to match your interests, strengths, and realistic options.",
      readMins: 4,
      body: [
        "Choosing a course is one of the biggest decisions a student makes - and often one of the most rushed. Here is the simple way I think it through with students.",
        "Start by separating what you enjoy from what you are good at. They overlap, but they are not the same. The steadiest path usually sits where genuine interest meets real ability.",
        "Next, be honest about your constraints - budget, location, and entry requirements. A realistic plan you can actually act on is worth more than a perfect plan you cannot.",
        "Finally, talk to someone already on the path you are considering. A short, honest conversation can save you a lot of time. That is exactly the kind of conversation I am happy to have."
      ]
    },
    {
      slug: "prepare-study-abroad",
      tag: "Study abroad",
      cover: "blue",
      icon: "bi-globe2",
      title: "Things to prepare before applying overseas",
      excerpt: "A short, practical checklist before you start an overseas application.",
      readMins: 5,
      body: [
        "Studying abroad is exciting, but the preparation can feel overwhelming. Sorting a few things out early makes the rest far smoother.",
        "Know your goal first. Be clear on why you want to go and what you want to study before choosing a country or university.",
        "Plan the full budget, not just tuition. Living costs, travel, and insurance all add up and deserve a realistic estimate.",
        "Get your documents ready early. Passports, transcripts, and language tests usually take longer than people expect.",
        "Work backwards from the deadlines and build in buffer time. If you would like help mapping out your timeline, reach out and I will walk through it with you."
      ]
    },
    {
      slug: "career-in-medicine",
      tag: "Medicine",
      cover: "blue",
      icon: "bi-heart-pulse",
      title: "Thinking about a career in medicine?",
      excerpt: "An honest reflection on the journey, from a student currently on it.",
      readMins: 4,
      body: [
        "Medicine is a meaningful path, but it is also a long one. As someone currently studying it, here is my honest take.",
        "It is demanding - academically and emotionally. The hours are long and the responsibility is real. But few things are as rewarding as learning to care for people well.",
        "You do not need to be the most brilliant person in the room. Consistency, empathy, and a willingness to keep learning matter more than raw talent.",
        "If you are considering medicine, talk to people already on the path before you commit. I am always glad to share what the journey honestly looks like."
      ]
    }
  ]

};
