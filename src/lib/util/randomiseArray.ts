function shuffleArray<T>(array: T[]): T[] {
  // Make a copy of the array to avoid modifying the original array
  const newArray = [...array];
  let currentIndex = newArray.length,
    randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the current element with the randomly selected element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}

export default shuffleArray;