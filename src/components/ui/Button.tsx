interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  color?:
    | "indigo"
    | "emerald"
    | "purple"
    | "red"
    | "black"
    | "white"
    | "pink"
    | "gray"
    | "yellow"
    | "green"
    | "blue"
    | "teal"
    | "orange"
    | "cyan"
    | "lime"
    | "amber"
    | "lightBlue"
    | "violet"
    | "rose"
    | "fuchsia"
    | "sky"
    | "mint";
  onClick?: () => void;
}

const colors: any = {
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  black: "bg-black",
  white: "bg-white",
  pink: "bg-pink-500",
  gray: "bg-gray-600",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  teal: "bg-teal-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
  lime: "bg-lime-500",
  amber: "bg-amber-500",
  lightBlue: "bg-lightBlue-500",
  violet: "bg-violet-500",
  rose: "bg-rose-500",
  fuchsia: "bg-fuchsia-500",
  sky: "bg-sky-500",
  mint: "bg-mint-500",
};

export default function Button({
  text,
  type = "button",
  color = "indigo",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-4 px-6 ${colors[color]} hover:bg-black hover:text-white duration-300 text-black text-sm md:text-lg rounded-md font-extrabold border-4 border-black cursor-pointer`}
    >
      {text}
    </button>
  );
}
