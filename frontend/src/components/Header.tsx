import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { signOutApi } from "../features/user/userApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="absolute z-40 w-full px-48 top-5 bg-opacity-10">
      <div className="flex items-center justify-center w-full h-full py-5 bg-white rounded-md bg-opacity-10">
        <div className="flex items-center gap-5 text-xl">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-white hover:text-orange-500"
          >
            <FaHome />
            Home
          </Link>
          <Link
            to={"/"}
            className="flex items-center gap-2 text-white hover:text-orange-500"
          >
            <FaUser />
            Profile
          </Link>
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
