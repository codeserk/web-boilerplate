/**
 * Returns a random number between min and max.
 * @param min
 * @param max
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min
}
