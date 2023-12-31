import { ButtonHTMLAttributes } from "react";

export default function Button({
  text,
  onClick,
  type,
}: {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
      onClick={onClick}
      type={type || "button"}
    >
      {text}
    </button>
  );
}
