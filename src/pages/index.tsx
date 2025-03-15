import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import AuthTabs from "@/components/ui/AuthTabs";
import { Globe2 } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-10 rounded-md">
        <div className="flex bg-white items-center space-x-2 border-4 border-black p-4 rounded-md bg-[radial-gradient(circle,_#302f3330_2px,_transparent_2px)] bg-[size:10px_10px]">
          <Globe2 className="w-24 h-24" />
          <h1 className="text-4xl font-extrabold">GLOBTROTTER</h1>
        </div>
        <AuthTabs />
      </div>
    </div>
  );
}
