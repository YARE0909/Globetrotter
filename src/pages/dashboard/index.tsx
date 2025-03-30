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
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center p-2">
      <Navbar />
      {/* Background Image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets/map.webp"
        alt="Map background"
        layout="fill"
      />
      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center md:p-10 mt-14">
        <div className="relative bg-white border-4 border-black rounded-md p-2 md:p-10 md:max-w-lg w-full bg-[radial-gradient(circle,_#302f3330_2px,_transparent_2px)] bg-[length:10px_10px]">
          {/* Profile Icon */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-full">
            <UserCircle className="w-20 h-20 md:w-32 md:h-32" />
          </div>
          {/* User Information */}
          <div className="mt-4 md:mt-12 flex flex-col items-center">
            <div className="w-full text-center border-b-4 pb-4">
              <h1 className="text-2xl md:text-4xl font-extrabold">
                {user?.displayName}
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 font-extrabold">
                @{user?.userName}
              </p>
            </div>
            {/* Stats */}
            <div className="flex flex-col md:flex md:flex-row justify-around w-full py-4 border-b-4">
              <div className="flex flex-col items-center">
                <span className="text-sm md:text-xl font-extrabold">Score</span>
                <span className="text-sm md:text-2xl text-gray-600 font-extrabold">
                  {user?.score}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm md:text-xl font-extrabold">Questions</span>
                <span className="text-sm md:text-2xl text-gray-600 font-extrabold">
                  {user?.totalQuestions}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm md:text-xl font-extrabold">Incorrect</span>
                <span className="text-sm md:text-2xl text-gray-600 font-extrabold">
                  {user?.inCorrectAnswers}
                </span>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-col space-y-4 py-4 w-full">
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
      {/* Challenge Modal */}
      <Modal isOpen={challengeModal} onClose={handleCloseChallengeModal}>
        <ChallengeFriend username={user?.userName!} score={user?.score!} />
      </Modal>
    </div>
  );
}
