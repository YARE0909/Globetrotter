interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  color?: string;
  onClick?: () => void;
}

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
      className={`w-full py-4 px-6 bg-${color}-500 hover:bg-black hover:text-white duration-300 text-black text-lg rounded-md font-extrabold border-4 border-black cursor-pointer`}
    >
      {text}
    </button>
  );
}
