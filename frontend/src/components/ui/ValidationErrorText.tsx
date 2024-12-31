import { MdReportGmailerrorred } from "react-icons/md";

const ValidationErrorText = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center gap-2 text-red-500">
      <MdReportGmailerrorred />
      {error}
    </div>
  );
};

export default ValidationErrorText;
