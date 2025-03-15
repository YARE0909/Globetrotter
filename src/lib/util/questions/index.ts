import Data from "../../../../dataset.json";

export function GetRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * Data.length);
  return Data[randomIndex];
}

//   Function to get 4 random options fom the dataset
export function GetRandomOptions() {
  let randomOptions: string[] = [];
  while (randomOptions.length < 4) {
    const randomIndex = Math.floor(Math.random() * Data.length);
    const randomOption = Data[randomIndex].city;
    if (!randomOptions.includes(randomOption)) {
      randomOptions.push(randomOption);
    }
  }
  return randomOptions;
}
