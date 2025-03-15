import Button from "@/components/ui/Button";
import ChallengeFriend from "@/components/ui/Challenge";
import Modal from "@/components/ui/Modal";
import Navbar from "@/components/ui/Navbar";
import { User } from "@/lib/types";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [challengeModal, setChallengeModal] = useState<boolean>(false);

  const router = useRouter();

  const handleOpenChallengeModal = () => {
    setChallengeModal(true);
  };

  const handleCloseChallengeModal = () => {
    setChallengeModal(false);
  };

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

  const handleLogout = async () => {
    destroyCookie(null, "token");
    router.push("/");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const cookies = parseCookies();
    const { token } = cookies;

    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col mt-[5.4rem] p-4">
      <Navbar />
      <Image
        className="absolute w-full h-full"
        src="/assets/map.webp"
        alt=""
        width={10000}
        height={10000}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-10 mt-10 rounded-md">
        <div className="w-fit h-fit flex flex-col justify-center items-center bg-white border-5 border-black rounded-md relative bg-[radial-gradient(circle,_#302f3330_2px,_transparent_2px)] bg-[size:10px_10px]">
          <div className="w-fit h-fit absolute -top-18 left-1/2 -translate-x-1/2  bg-white rounded-full">
            <UserCircle className="w-32 h-32" />
          </div>
          <div className="w-full h-full flex flex-col space-y-2 items-center justify-center mt-10">
            <div className="w-full flex flex-col items-center justify-center border-b-4 p-4">
              <h1 className="text-4xl font-extrabold">{user?.displayName}</h1>
              <h1 className="text-2xl text-gray-600 font-extrabold">
                @{user?.userName}
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
              <a href="/game">
                <Button text="Start Playing!" color="emerald" />
              </a>
              <Button
                text="Challenge a Friend!"
                color="purple"
                onClick={handleOpenChallengeModal}
              />
              <Button text="Logout" color="red" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={challengeModal} onClose={handleCloseChallengeModal}>
        <ChallengeFriend username={user?.userName!} score={user?.score!} />
      </Modal>
    </div>
  );
}
