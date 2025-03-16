import Button from "@/components/ui/Button";
import { showEmojiRain } from "@/components/ui/EmojiRain";
import Navbar from "@/components/ui/Navbar";
import { QuestionStatus } from "@/lib/enums/questionStatus";
import { Question, User } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [clue, setClue] = useState<string>("");
  const [question, setQuestion] = useState<Question | null>(null);
  const [attempt, setAttempt] = useState<number>(1);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [disableNext, setDisableNext] = useState<boolean>(true);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const [disableOptions, setDisableOptions] = useState<boolean>(false);
  const [funFact, setFunFact] = useState<string>("");
  const [showFunFact, setShowFunFact] = useState<boolean>(false);

  const router = useRouter();

  const fetchUser = async () => {
    try {
      const cookies = parseCookies();
      const { token } = cookies;

      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data.user);
      console.log({ data });
    } catch (error) {
      console.error({ error });
    }
  };

  const fetchQuestions = async () => {
    try {
      const cookies = parseCookies();
      const { token } = cookies;

      const response = await fetch("/api/question", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setQuestion(data.question);
      setClue(
        data.question.clues[
          Math.floor(Math.random() * data.question.clues.length)
        ]
      );
      setAttemptsLeft(data.question.clues.length);
      setDisableNext(true);
      setDisableSubmit(true);
      setFunFact("");
      setDisableOptions(false);
      console.log({ data });
    } catch (error) {
      toast.error("Something went wrong");
      console.error({ error });
    }
  };

  const submitAnswer = async (answer: string) => {
    try {
      const cookies = parseCookies();
      const { token } = cookies;

      const response = await fetch("/api/verifyQuestion", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId: question?.id, answer }),
      });
      const data = await response.json();
      console.log({ data });
      if (data.status === QuestionStatus.CorrectAnswer) {
        setAttempt(1);
        setAttemptsLeft(data.attemptsLeft);
        setDisableNext(false);
        setDisableSubmit(true);
        setDisableOptions(true);
        setFunFact(
          data.fun_fact[Math.floor(Math.random() * data.fun_fact.length)]
        );
        fetchUser();
        showEmojiRain(["✅", "🎉", "🥳", "👏", "🌟", "🏆", "🔥", "🎊", "🎶"]);
      } else if (data.status === QuestionStatus.NoAttempts) {
        setAttemptsLeft(data.attemptsLeft);
        setDisableNext(false);
        setDisableSubmit(true);
        setDisableOptions(true);
        setFunFact(
          data.fun_fact[Math.floor(Math.random() * data.fun_fact.length)]
        );
        setAttempt(1);
        fetchUser();
        showEmojiRain(["⏳", "🔄", "💀", "😵", "🚷", "⛔", "🔚", "❌", "😭"]);
      } else if (data.status === QuestionStatus.WrongAnswer) {
        setAttempt(attempt + 1);
        setAttemptsLeft(data.attemptsLeft);
        setFunFact(
          data.fun_fact[Math.floor(Math.random() * data.fun_fact.length)]
        );
        fetchUser();
        showEmojiRain(["❌", "😢", "🙈", "🤦", "🚫", "💔", "👎", "😞"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error({ error });
    }
  };

  useEffect(() => {
    if (funFact !== "") {
      setShowFunFact(true);
    } else {
      setShowFunFact(false);
    }
  }, [funFact]);

  useEffect(() => {
    fetchUser();
    fetchQuestions();
  }, []);

  useEffect(() => {
    const cookies = parseCookies();
    const { token } = cookies;

    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col mt-[6rem] p-2 md:p-4">
      <Navbar />
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-2 md:space-x-4 items-center">
          <div className="h-full border-r-3 border-black pr-1 md:pr-2">
            <a href="/dashboard" className="">
              <ArrowLeft className="w-7 h-7 md:w-10 md:h-10 rounded-full p-1 hover:bg-black hover:text-white duration-300" />
            </a>
          </div>
          <div>
            <h1 className="font-bold text-xs md:text-2xl">
              Attempt: {attempt}
            </h1>
            <h1 className="font-bold text-xs md:text-2xl">
              Attempts Left: {attemptsLeft}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-end justify-end">
          <h1 className="font-bold text-xs md:text-2xl">
            <span className="hidden lg:block">
              Correct Answers (Score): {user?.score}
            </span>
            <span className="lg:hidden block">Score: {user?.score}</span>
          </h1>
          <h1 className="font-bold text-xs md:text-2xl">
            <span className="hidden lg:block">Incorrect Answers: {user?.inCorrectAnswers}</span>
            <span className="lg:hidden block">Incorrect: {user?.inCorrectAnswers}</span>
          </h1>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-2 md:mt-10">
        <div className="w-fit h-fit flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col space-y-2 items-center">
            <h1 className="text-2xl md:text-4xl font-extrabold">Guess the City</h1>
            <h1 className="text-center md:text-2xl text-gray-600 font-extrabold">{clue}</h1>
          </div>
          <div className="w-full max-w-5xl h-fit flex flex-col space-y-3">
            <div className="flex flex-col space-y-4 rounded-md">
              {question?.options.map((option, index) => (
                <button
                  disabled={disableOptions}
                  key={index}
                  onClick={() => {
                    setDisableSubmit(false);
                    setSelectedOption(option);
                  }}
                  className={`w-full py-2 md:py-4 rounded-md md:text-2xl font-bold border-4 hover:bg-black hover:text-white duration-300 border-black cursor-pointer ${
                    selectedOption === option
                      ? "bg-pink-500 hover:bg-pink-500"
                      : "bg-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="w-full flex space-x-2 justify-center items-center">
              <button
                disabled={disableSubmit}
                className={`w-full py-2 md:py-4 rounded-md  md:text-2xl font-bold border-4 bg-indigo-500 hover:bg-black hover:text-white duration-300 border-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-black disabled:hover:bg-indigo-500`}
                onClick={() => submitAnswer(selectedOption)}
              >
                Submit
              </button>
              <button
                disabled={disableNext}
                className={`w-full py-2 md:py-4 rounded-md  md:text-2xl font-bold border-4 bg-indigo-500 hover:bg-black hover:text-white duration-300 border-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-black disabled:hover:bg-indigo-500`}
                onClick={fetchQuestions}
              >
                Next
              </button>
            </div>
            <div
              className={`w-full flex flex-col space-y-1 items-center justify-center mt-4 transition-opacity duration-700 ease-in-out ${
                showFunFact ? "opacity-100" : "opacity-0"
              }`}
            >
              <h1 className="font-bold md:text-3xl">Fun Fact</h1>
              <h1 className="font-bold text-xs md:text-xl text-center text-gray-600">
                {funFact}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
