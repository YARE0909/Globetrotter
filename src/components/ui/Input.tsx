interface InputProps {
  label: string;
  type?: "text" | "password" | "email";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
}

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name
}: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-extrabold text-sm" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="py-4 px-3 border-4 rounded-md border-black focus:outline-none bg-bg"
      />
    </div>
  );
}
