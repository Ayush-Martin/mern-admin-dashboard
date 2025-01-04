import { FC } from "react";
import { MdReportGmailerrorred } from "react-icons/md";

interface ValidationErrorTextProps {
  error: string;
}

const ValidationErrorText: FC<ValidationErrorTextProps> = ({ error }) => {
  return (
    <div className="flex items-center gap-2 text-red-500">
      <MdReportGmailerrorred />
      {error}
    </div>
  );
};

export default ValidationErrorText;
