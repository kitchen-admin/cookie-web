import { siteImages } from "@/config/site-images";

export type ProblemCard = {
  title: string;
  description: string;
  imageUrl: string;
};

/** Problem section cards (Figma Section 2). */
export const PROBLEM_CARDS: ProblemCard[] = [
  {
    title: "Same lunchbox again?",
    description: "Parents need quick ideas kids won't get bored of.",
    imageUrl: siteImages.problemLunchbox,
  },
  {
    title: "Full pantry. No idea.",
    description: "You have veggies, but no one wants to decide what to cook.",
    imageUrl: siteImages.problemPantry,
  },
  {
    title: "Eating healthy is boring.",
    description: "Better food should taste good not like a punishment.",
    imageUrl: siteImages.problemHealthy,
  },
];
