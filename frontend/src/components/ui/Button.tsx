import { FC } from "react";

interface ButtonProps {
  text: string;
  disabled: boolean;
  clickHandler: () => void;
}

const Button: FC<ButtonProps> = ({ text, disabled = false, clickHandler }) => {
  return (
    <button
      className="p-2 px-4 text-lg text-white bg-black rounded-md bg-opacity-40 hover:bg-opacity-100 disabled:bg-zinc-600 disabled:hover:cursor-not-allowed"
      disabled={disabled}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
