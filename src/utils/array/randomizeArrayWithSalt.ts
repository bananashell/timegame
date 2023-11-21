import crypto from "crypto";

export function randomizeArrayWithSalt<T>(array: T[], salt: string): T[] {
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;
  let temporaryValue;
  let randomIndex;

  // Fisher-Yates shuffle algorithm
  while (currentIndex !== 0) {
    randomIndex =
      Math.floor(generateHash(salt + currentIndex.toString()) * currentIndex) %
      currentIndex;
    currentIndex -= 1;

    // Swap elements
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
}

function generateHash(input: string) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  const hex = hash.digest("hex");

  return parseInt(hex, 16);
}
