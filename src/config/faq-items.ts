export type FaqItem = {
  question: string;
  answer: string;
};

/** FAQ accordion items (Figma Section 5). */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do I need to be good at cooking to use Cookie?",
    answer:
      "No. Cookie is built for everyday home cooking, including beginners, busy parents, students, couples, and working professionals.",
  },
  {
    question: "Is Cookie only for healthy food?",
    answer:
      "No. Cookie helps you eat better, but it is not a boring diet app. It suggests meals that can be healthy, comforting, quick, fun, or special depending on your mood.",
  },
  {
    question: "Does Cookie work if I only have a few ingredients?",
    answer:
      "Yes. Cookie can suggest simple meals from limited ingredients, and it can also tell you what small missing item would make more recipes possible.",
  },
  {
    question: "Does Cookie consider my diet and allergies?",
    answer:
      "Yes. During setup, Cookie learns your diet preferences, allergies, health goals, and cuisine preferences so suggestions feel more personal.",
  },
  {
    question: "Is Cookie free?",
    answer:
      "Free for the early users, we'll be introducing pricing based models soon.",
  },
];

/** Index of the FAQ item expanded by default in Figma. */
export const FAQ_DEFAULT_OPEN_INDEX = 1;
