import { Random } from "random-js";

// Create a random generator
const random = new Random();

// p = probability of success
export const bernoulli = (p: number): boolean => {
  return random.real(0, 1) < p;
};

export const addJitter = (jitter: number): number => {
  return (Math.random() - 0.5) * jitter * 2; // random number position with jitter
};
