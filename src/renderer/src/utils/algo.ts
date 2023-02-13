export const getRandomTable = (tables: number[]) => {
  const index = Math.round(Math.random() * (tables.length - 1));
  return tables[index];
};

export const getRandomFactor = (
  maxFactor: number,
  randomTable?: number,
  excludedCalculations?: Multiplix.Services.Calculation[]
) => {
  let randomFactor: number;
  if (!randomTable || !excludedCalculations) return Math.floor(Math.random() * maxFactor) + 1;
  do {
    randomFactor = Math.floor(Math.random() * maxFactor) + 1;
  } while (excludedCalculations.find(({ table, factor }) => table === randomTable && factor === randomFactor));
  return randomFactor;
};

export const getSuggestions = (quantity: number, tables: number[], correctAnswer: number) => {
  const suggestions = [correctAnswer];
  for (let i = 0; i < quantity - 1; i++) {
    let suggestion: number;
    do {
      suggestion = getRandomTable(tables) * getRandomFactor(10);
    } while (suggestions.includes(suggestion));
    suggestions.push(suggestion);
  }
  return suggestions.sort(() => Math.random() - 0.5);
};
