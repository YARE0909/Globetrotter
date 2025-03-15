import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-200">
      <h1 className="text-9xl font-extrabold animate-bounce">404</h1>
      <h2 className="text-3xl font-bold mt-4">Oops! Lost in Cyberspace</h2>
      <p className="mt-2 text-gray-600 text-lg font-bold">
        Looks like this page took a wrong turn! 🚀
      </p>
      <div className="flex flex-col items-center space-y-4">
        <img
          src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif"
          alt="Confused astronaut"
          className="w-full mt-6 rounded-lg shadow-lg border-4 border-black"
        />
        <a href="/dashboard" className="w-full">
          <Button text="🏃 Get Me Out Of Here" color="blue" />
        </a>
      </div>
    </div>
  );
}
