import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import nookies, { setCookie } from "nookies";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    displayName: "",
    password: "",
  });
  const router = useRouter();

  const handleTabClick = (tab: "login" | "register") => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginFormData.username || !loginFormData.password) {
      toast.error("Missing fields for login");
      return;
    }

    try {
      const response = await axios.post("/api/authentication", {
        action: "login",
        userName: loginFormData.username,
        password: loginFormData.password,
      });
      const data = response.data;
      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registerFormData.username ||
      !registerFormData.displayName ||
      !registerFormData.password
    ) {
      toast.error("Missing fields for registration");
      return;
    }

    try {
      const response = await axios.post("/api/authentication", {
        action: "register",
        userName: registerFormData.username,
        displayName: registerFormData.displayName,
        password: registerFormData.password,
      });
      if (response.status === 201) {
        toast.success("Registered successfully");
        setActiveTab("login");
      } else if (response.status === 400) {
        toast.error("User already exists");
      }
    } catch (error: any) {
      if (error.response.data.error === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full flex flex-col space-y-5">
      <div className="w-full flex justify-around">
        <button
          className={`w-full px-4 py-2 font-bold rounded-l-md cursor-pointer border-l-3 border-t-3 border-b-3 border-black ${
            activeTab === "login"
              ? "bg-emerald-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleTabClick("login")}
        >
          Login
        </button>
        <button
          className={`w-full px-4 py-2 font-bold rounded-r-md cursor-pointer border-r-3 border-t-3 border-b-3 border-black ${
            activeTab === "register"
              ? "bg-purple-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleTabClick("register")}
        >
          Register
        </button>
      </div>
      <div className="w-full h-[450px] overflow-hidden">
        {activeTab === "login" && (
          <LoginForm
            onSubmit={handleLoginSubmit}
            loginFormData={loginFormData}
            setLoginFormData={setLoginFormData}
          />
        )}
        {activeTab === "register" && (
          <RegisterForm
            onSubmit={handleRegisterSubmit}
            registerFormData={registerFormData}
            setRegisterFormData={setRegisterFormData}
          />
        )}
      </div>
    </div>
  );
};

const LoginForm = ({
  onSubmit,
  loginFormData,
  setLoginFormData,
}: {
  onSubmit: (e: React.FormEvent) => void;
  loginFormData: { username: string; password: string };
  setLoginFormData: any;
}) => (
  <form
    className="w-full p-5 border-4 rounded-md border-black bg-white font-lexend"
    onSubmit={onSubmit}
  >
    <div className="mb-4">
      <Input
        label="Username"
        type="text"
        name="username"
        value={loginFormData.username}
        onChange={(e) =>
          setLoginFormData({
            ...loginFormData,
            username: e.target.value,
          })
        }
      />
    </div>
    <div className="mb-4">
      <Input
        label="Password"
        type="password"
        name="password"
        value={loginFormData.password}
        onChange={(e) =>
          setLoginFormData({
            ...loginFormData,
            password: e.target.value,
          })
        }
      />
    </div>
    <Button text="Login" type="submit" color="emerald" />
  </form>
);

const RegisterForm = ({
  onSubmit,
  registerFormData,
  setRegisterFormData,
}: {
  onSubmit: (e: React.FormEvent) => void;
  registerFormData: { username: string; displayName: string; password: string };
  setRegisterFormData: any;
}) => (
  <form
    className="w-full p-5 border-4 rounded-md border-black bg-white font-lexend"
    onSubmit={onSubmit}
  >
    <div className="mb-4">
      <Input
        label="Username"
        type="text"
        name="username"
        value={registerFormData.username}
        onChange={(e) =>
          setRegisterFormData({
            ...registerFormData,
            username: e.target.value,
          })
        }
      />
    </div>
    <div className="mb-4">
      <Input
        label="Display Name"
        type="text"
        name="displayName"
        value={registerFormData.displayName}
        onChange={(e) =>
          setRegisterFormData({
            ...registerFormData,
            displayName: e.target.value,
          })
        }
      />
    </div>
    <div className="mb-4">
      <Input
        label="Password"
        type="password"
        name="password"
        value={registerFormData.password}
        onChange={(e) =>
          setRegisterFormData({
            ...registerFormData,
            password: e.target.value,
          })
        }
      />
    </div>
    <Button text="Register" type="submit" color="purple" />
  </form>
);

export default AuthTabs;
