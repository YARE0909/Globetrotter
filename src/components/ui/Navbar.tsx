import { User } from "@/lib/types";
import { Globe2, UserCircle } from "lucide-react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Navbar() {
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
    <div className="w-full absolute top-0 left-0 flex justify-between items-center p-4 bg-white border-b-3 border-black shadow-md shadow-blue-500">
      <div className="flex items-center space-x-2 border-4 border-black p-1 rounded-md bg-[radial-gradient(circle,_#302f3330_2px,_transparent_2px)] bg-[size:10px_10px]">
        <Globe2 className="w-9 h-9" />
        <h1 className="text-lg font-extrabold">GLOBTROTTER</h1>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <UserCircle className="w-7 h-7" />
          <h1 className="font-extrabold">{user?.displayName}</h1>
        </div>
      </div>
    </div>
  );
}
