export function getRandomNumber(min: number, max: number): number {
  /* Return a int random number from min to max (included) */
  return Math.floor(Math.random() * (max + 1 - min) + min)
}
