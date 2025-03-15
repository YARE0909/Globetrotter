import { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface ChallengeFriendProps {
  username: string;
  score: number;
}

const ChallengeFriend = ({ username, score }: ChallengeFriendProps) => {
  const handleShare = () => {
    const inviteLink = `${process.env.NEXT_PUBLIC_URL}`;
    const message = `🌍 Globetrotter Challenge! \n${username} scored ${score} points! Can you beat them? \nPlay now: ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 p-6 border-4 rounded-md">
      <div>
        <h1 className="text-3xl text-center font-extrabold text-black">
          Challenge a Friend!
        </h1>
      </div>
      <div>
        <h1 className="text-xl font-extrabold text-gray-600">
          You scored {score} points!
        </h1>
      </div>
      <div>
        <h1 className="text-xl font-extrabold text-gray-600">
          Can your friend beat you?
        </h1>
      </div>
      <div className="w-full">
        <Button
          onClick={handleShare}
          text="📲 Share on WhatsApp"
          color="green"
        />
      </div>
    </div>
  );
};

export default ChallengeFriend;
