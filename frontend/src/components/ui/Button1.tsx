const Button1 = ({
  text,
  disabled = false,
  clickHandler,
}: {
  text: string;
  disabled?: boolean;
  clickHandler: () => void;
}) => {
  return (
    <button
      className="p-2 text-lg text-white bg-black rounded-md bg-opacity-40 hover:bg-opacity-100 disabled:bg-zinc-600 disabled:hover:cursor-not-allowed"
      disabled={disabled}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button1;
