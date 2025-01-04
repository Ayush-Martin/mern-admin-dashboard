import { Link } from "react-router-dom";
import { Header } from "../../components";
import { FaHome, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home = () => {
  const { username } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <Header>
        <Link
          to={"/"}
          className="flex items-center gap-2 text-white hover:text-orange-500"
        >
          <FaHome />
          Home
        </Link>
        <Link
          to={"/profile"}
          className="flex items-center gap-2 text-white hover:text-orange-500"
        >
          <FaUser />
          Profile
        </Link>
      </Header>
      <div className="items-center justify-center">
        <div className="flex flex-col gap-16 m-auto bg-white rounded-md p-7 bg-opacity-10 w-96 ">
          <p className="text-3xl text-center text-white">welcome {username}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
