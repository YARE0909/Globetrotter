"use client";
import { useState, useEffect } from "react";

let triggerEmojiRain: ((emojis?: string[]) => void) | null = null;

export default function EmojiRain() {
  const [emojiList, setEmojiList] = useState<
    { id: number; emoji: string; left: string }[]
  >([]);

  const defaultEmojis = [
    "🎉",
    "💖",
    "✨",
    "🎶",
    "🔥",
    "💫",
    "🍀",
    "🌈",
    "🥳",
    "🚀",
  ];

  const startEmojiRain = (emojis: string[] = defaultEmojis) => {
    const newEmojis = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * -20}vh`,
    }));

    setEmojiList((prev) => [...prev, ...newEmojis]);

    setTimeout(() => {
      setEmojiList((prev) =>
        prev.filter((e) => !newEmojis.some((ne) => ne.id === e.id))
      );
    }, 5000);
  };

  useEffect(() => {
    triggerEmojiRain = startEmojiRain;
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {emojiList.map(({ id, emoji, left }) => (
        <span
          key={id}
          className="absolute text-7xl animate-fall"
          style={{
            left,
            top: "-10vh", // Start above the screen
            animationDuration: `${Math.random() * 4 + 2}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .animate-fall {
          position: absolute;
          animation-name: fall;
          animation-timing-function: ease-in;
        }
      `}</style>
    </div>
  );
}

// Export the trigger function
export const showEmojiRain = (emojis?: string[]) => {
  triggerEmojiRain?.(emojis);
};
