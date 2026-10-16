export const church = {
  name: "The Temple of Charis",
  tagline: "Home of Love and Perfection",
  conference: "Unto a Perfect Man Conference",
  shortName: "UPMC",
  email: "ttoc@gmail.com",
  phone: "+233 50 051 1393",
  address: "North Legon, 5th Pawpaw St.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=The+Temple+of+Charis+North+Legon+5th+Pawpaw+Street",
  pastor: "Pastor Roy King Grace",
};

/** UPMC 2026: Saturday 7 & Sunday 8 November, from 3:00 PM (Africa/Accra). */
export const conferenceSchedule = {
  year: 2026,
  timezone: "Africa/Accra",
  label: "7-8 November 2026",
  timeLabel: "3:00 PM each day",
  summary: "7-8 November 2026, 3:00 PM each day",
  location: "The Temple of Charis, North Legon, 5th Pawpaw St.",
  days: [
    {
      key: "saturday",
      label: "Saturday",
      dateLabel: "Saturday, 7 November 2026",
      start: "2026-11-07T15:00:00",
      end: "2026-11-07T20:00:00",
    },
    {
      key: "sunday",
      label: "Sunday",
      dateLabel: "Sunday, 8 November 2026",
      start: "2026-11-08T15:00:00",
      end: "2026-11-08T20:00:00",
    },
  ],
} as const;

export const conferenceIntro =
  "The Unto a Perfect Man Conference (UPMC) is one of the landmark programs God has graciously blessed this commission with. UPMC seeks to bring us into the full and exact knowledge of Jesus Christ revealing His many identities and helping us discover our unique place in Him, so that we may live and express that identity fully.";

export const churchAbout =
  "The Temple of Charis Worldwide is an assembly in the Body of Christ, commissioned by the Lord Jesus and led by our beloved man of God, Pastor Roy King Grace. As a grace-based ministry, we are ordained to connect the world to Christ and to raise people unto perfection, growing into the full expression of who we already are in Him. Jesus is our standard, and our aim is to reflect Him in every expression of our lives.";

export const vision = "Connecting the world to Christ and raising men unto perfection.";
export const mission = "Revealing the righteousness of God to man.";
export const purpose = "Preaching the gospel to everyone in our sphere of contact.";

export const testimonials = [
  {
    name: "Alex",
    quote:
      "Returning to UPMC 2025 after attending last year has been a wonderful experience. The primary takeaway I am carrying home from the conference is to live like Jesus",
  },
  {
    name: "Mark",
    quote:
      "Before UPMC 2025, my understanding of who Jesus is was somewhat confusing, even after reading passages like John 1. I often wrestled with the different titles applied to Him, such as Son of God, Word of God, and Child of God. Through the teaching at this conference, I gained clear understanding:",
    emphasis: "Jesus is God and Jesus is the Word",
  },
  {
    name: "Esther",
    quote: "I am thrilled to have been a part of UPMC 2025. The key lesson I am taking away is that",
    emphasis: "orthodoxy is not superior to Scripture",
    after:
      ". As a child of God, the Word of God must remain your final authority, above human consensus, tradition, or what people have agreed upon",
  },
];

export const titles = ["Mr", "Mrs", "Miss", "Ms", "Pastor", "Rev", "Minister"] as const;

export const hearAboutOptions = [
  "Church Service",
  "Friend/Colleague",
  "Social Media",
  "Evangelism",
] as const;

export const joiningOptions = ["Online", "In-Person"] as const;

export const daysAttending = ["Saturday", "Sunday", "Both"] as const;
