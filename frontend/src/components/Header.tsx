import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { signOutApi } from "../features/user/userApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full px-3 md:px-28 lg:px-48 my-7 bg-opacity-10">
      <div className="flex items-center justify-center w-full h-full py-5 bg-white rounded-md bg-opacity-10">
        <div className="flex items-center gap-5 text-xl">
          {children}
          <button
            className="flex items-center gap-2 text-white hover:text-orange-500"
            onClick={() => {
              dispatch(signOutApi()).then(() => navigate("/auth"));
            }}
          >
            <FiLogOut className="mt-1" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
