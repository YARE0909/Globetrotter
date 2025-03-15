import Button from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";
import { User } from "@/lib/types";
import { UserCircle } from "lucide-react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col mt-[5.4rem] p-4 bg-bg">
      <Navbar />
      <div className="w-full flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-extrabold">Welcome to GLOBTROTTER</h1>
          <h1 className="text-2xl">Guess. Learn. Explore. </h1>
        </div>
        <div>
          <a href="/game">
            <Button text="Start Playing" color="emerald" />
          </a>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-10 mt-10 rounded-md">
        <div className="w-fit h-fit flex flex-col justify-center items-center bg-white border-5 border-black rounded-md relative bg-[radial-gradient(circle,_#302f3330_2px,_transparent_2px)] bg-[size:10px_10px]">
          <div className="w-fit h-fit absolute -top-18 left-1/2 -translate-x-1/2  bg-white rounded-full">
            <UserCircle className="w-32 h-32" />
          </div>
          <div className="w-full h-full flex flex-col space-y-2 items-center justify-center mt-10">
            <div className="w-full flex flex-col items-center justify-center border-b-4 p-4">
              <h1 className="text-4xl font-extrabold">{user?.displayName}</h1>
              <h1 className="text-2xl text-gray-600 font-extrabold">
                {user?.userName}
              </h1>
            </div>
            <div className="flex space-x-6 p-4 border-b-4">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-xl font-extrabold">Score</h1>
                <h1 className="text-2xl text-gray-600 font-extrabold">
                  {user?.score}
                </h1>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-xl font-extrabold text-center">
                  Questions
                </h1>
                <h1 className="text-2xl text-gray-600 font-extrabold">
                  {user?.totalQuestions}
                </h1>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-xl font-extrabold">Incorrect</h1>
                <h1 className="text-2xl text-gray-600 font-extrabold">
                  {user?.inCorrectAnswers}
                </h1>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-4 p-4">
              <Button text="Challenge a Friend !" color="purple" />
              <Button text="Logout" color="red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
