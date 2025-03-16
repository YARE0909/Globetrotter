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
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full md:max-w-xl flex flex-col space-y-5 p-2">
        <div className="w-full flex bg-white items-center justify-center space-x-2 border-4 border-black p-4 rounded-md bg-[radial-gradient(circle,_#302f3330_2px,_transparent_2px)] bg-[size:10px_10px]">
          <Globe2 className="w-20 h-20 md:w-24 md:h-24" />
          <div>
            <div className="flex flex-col h-full justify-center">
              <h1 className="text-2xl md:text-4xl font-extrabold">
                GLOBTROTTER
              </h1>
              <h1 className="font-bold pl-1">Guess. Learn. Explore.</h1>
            </div>
          </div>
        </div>
        <AuthTabs />
      </div>
    </div>
  );
}
