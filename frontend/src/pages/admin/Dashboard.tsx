import { Link, useNavigate } from "react-router-dom";
import { Button, Header, ListItem } from "../../components";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUsersApi } from "../../features/admin/adminApi";
import { FC, useEffect, useState } from "react";

const Dashboard: FC = () => {
  const { users } = useSelector((state: RootState) => state.admin);
  const dispatch: AppDispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersApi(""));
  }, []);

  const handleSearch = () => {
    dispatch(getUsersApi(search));
  };

  return (
    <div>
      <Header>
        <Link
          to={"/admin"}
          className="flex items-center gap-2 text-white hover:text-orange-500"
        >
          <FaHome />
          Home
        </Link>
      </Header>
      <div className="items-center justify-center">
        <div className="flex flex-col h-[520px] xl:h-[600px] gap-10 px-2 m-auto mx-3 overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-stone-600 bg-white rounded-md md:px-10 md:mx-40 lg:mx-80 p-7 bg-opacity-10 ">
          <h1 className="text-xl text-center text-white">Dashboard</h1>
          <div className="flex flex-col items-center justify-center w-full gap-5 sm:flex-row">
            <div className="relative bg-gray-300 rounded-md w-80">
              <button
                className="absolute text-2xl right-2 top-2"
                onClick={() => handleSearch()}
              >
                <IoSearch />
              </button>
              <input
                type="text"
                className="w-full h-full px-4 py-2 bg-transparent rounded-md placeholder:text-stone-600"
                placeholder="email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              text="Add User"
              disabled={false}
              clickHandler={() => navigate("/admin/add")}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center justify-between w-full px-2 py-2 text-lg text-center text-white md:px-4">
              <p className="w-3/12">Username</p>
              <p className="w-5/12 ">Email</p>
              <p className="w-3/12">Actions</p>
            </div>
            {users.map((user) => (
              <ListItem
                username={user.username}
                email={user.email}
                key={user._id}
                id={user._id}
                isBlocked={user.isBlocked}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
