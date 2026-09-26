const asset = (name) => new URL(`../thumb-porto/${name}`, import.meta.url).href;

export const writingCollections = {
  gitbook: {
    title: "Gitbook",
    description: "Notes from working through algorithm problems and their solutions.",
    entries: [
      {
        title: "Leetcode 100",
        tags: ["Algorithms", "Problem solving"],
        caption:
          "Solutions and notes following the NeetCode roadmap, including arrays, hash tables, strings, and more.",
        image: asset("leetcode-100.png"),
        imageAlt: "Leetcode 100 GitBook introduction preview",
        href: "https://kamus-ku.gitbook.io/leetcode-100/",
        destination: "Read on GitBook",
      },
    ],
  },
  medium: {
    title: "Medium",
    description: "Personal writing published on Medium.",
    entries: [
      {
        title: "Why I Felt Distant from Allah?",
        tags: ["Life", "Personal essay"],
        caption:
          "A reflection on prayer, a difficult TOEFL result, and continuing to work through disappointment.",
        image: asset("medium-why-i-felt-distant.jpg"),
        imageAlt: "A person praying inside a mosque",
        imageCredit: "Photo by Imad Alassiry on Unsplash",
        href: "https://medium.com/@fajardios01/did-i-distance-myself-from-allah-4456f3814038",
        destination: "Read on Medium",
      },
    ],
  },
};
