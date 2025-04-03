import Navbar from "@/components/ui/Navbar";
import { parseCookies } from "nookies";
import { GetStaticProps } from "next";

type Player = {
  userName: string;
  displayName: string;
  score: number;
  inCorrectAnswers: number;
  questionCount: number;
};

export default function Index({ leaderboard }: { leaderboard: Player[] }) {
  return (
    <div className="w-full h-full flex flex-col mt-[6rem] p-2">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center space-y-4">
        <div>
          <h1 className="font-extrabold text-4xl md:text-5xl text-center">
            Leaderboard
          </h1>
        </div>

        {/* Mobile View: Cards */}
        <div className="w-full flex flex-wrap justify-center gap-4 mt-4 md:hidden">
          {leaderboard ? (
            leaderboard.map((player, index) => (
              <div
                key={index}
                className="w-full max-w-sm border-4 border-black bg-gray-100 shadow-lg rounded-lg"
              >
                <div className="w-full bg-amber-500 border-b-4 border-black p-4">
                  <h1 className="text-xl font-extrabold">
                    #{index + 1} {player.displayName}
                  </h1>
                </div>
                <div className="w-full p-4">
                  <h1 className="text-lg font-bold">
                    Username: {player.userName}
                  </h1>
                  <h1 className="text-lg font-bold">Score: {player.score}</h1>
                  <h1 className="text-lg font-bold">
                    Incorrect Answers: {player.inCorrectAnswers}
                  </h1>
                  <h1 className="text-lg font-bold">
                    Total Questions: {player.questionCount}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center">
              <h1 className="font-extrabold text-2xl">Loading...</h1>
            </div>
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block w-full max-w-7xl mt-4">
          {leaderboard ? (
            <table className="w-full border-collapse border-4 border-black bg-gray-100 shadow-lg">
              <thead className="bg-yellow-400">
                <tr className="border-b-4 border-black">
                  <th className="p-4 text-left text-black font-extrabold text-xl border-r-4 border-black">
                    Position
                  </th>
                  <th className="p-4 text-left text-black font-extrabold text-xl border-r-4 border-black">
                    Username
                  </th>
                  <th className="p-4 text-left text-black font-extrabold text-xl border-r-4 border-black">
                    Display Name
                  </th>
                  <th className="p-4 text-left text-black font-extrabold text-xl border-r-4 border-black">
                    Score
                  </th>
                  <th className="p-4 text-left text-black font-extrabold text-xl border-r-4 border-black">
                    Incorrect Answers
                  </th>
                  <th className="p-4 text-left text-black font-extrabold text-xl">
                    Total Questions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr key={index} className="border-b-4 border-black">
                    <td className="p-4 text-lg font-bold border-r-4 border-black bg-white">
                      {index + 1}.
                    </td>
                    <td className="p-4 text-lg font-bold border-r-4 border-black bg-white">
                      {player.userName}
                    </td>
                    <td className="p-4 text-lg font-bold border-r-4 border-black bg-white">
                      {player.displayName}
                    </td>
                    <td className="p-4 text-lg font-bold border-r-4 border-black bg-white">
                      {player.score}
                    </td>
                    <td className="p-4 text-lg font-bold border-r-4 border-black bg-white">
                      {player.inCorrectAnswers}
                    </td>
                    <td className="p-4 text-lg font-bold bg-white">
                      {player.questionCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex items-center justify-center">
              <h1 className="font-extrabold text-2xl">Loading...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/leaderboard");
    const data = await response.json();

    return {
      props: { leaderboard: data.leaderboard },
      revalidate: 10,
    };
  } catch (error) {
    console.error({ error });
    return {
      props: { leaderboard: [] },
      revalidate: 10,
    };
  }
};
