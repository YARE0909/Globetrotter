import AuthTabs from "@/components/ui/AuthTabs";
import { Globe2 } from "lucide-react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const { token } = cookies;

    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-10 rounded-md">
        <div className="flex bg-white items-center space-x-2 border-4 border-black p-4 rounded-md bg-[radial-gradient(circle,_#302f3330_2px,_transparent_2px)] bg-[size:10px_10px]">
          <Globe2 className="w-24 h-24" />
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold">GLOBTROTTER</h1>
            <h1 className="font-bold pl-1">Guess. Learn. Explore.</h1>
          </div>
        </div>
        <AuthTabs />
      </div>
    </div>
  );
}
