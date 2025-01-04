import { ChangeEvent, FC, useState } from "react";

interface InputProps {
  type: string;
  placeHolder: string;
  value: string;
  inputChangeHandler: (arg: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  type,
  placeHolder,
  value,
  inputChangeHandler,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className="relative w-full text-lg rounded-sm bg-slate-300">
      <p
        className={`absolute  ${
          isFocus || value
            ? " -top-1 left-1 text-[14px]"
            : "top-3 left-2 text-lg"
        }`}
      >
        {placeHolder}
      </p>
      <input
        type={type}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={inputChangeHandler}
        className="w-full h-full p-2 pt-5 bg-transparent rounded-sm"
      />
    </div>
  );
};

export default Input;
