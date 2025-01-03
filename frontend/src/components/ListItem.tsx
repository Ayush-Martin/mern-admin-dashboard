import { useState } from "react";
import { MdBlock, MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgUnblock } from "react-icons/cg";
import { errorNotification, successNotification } from "../utils/notifications";
import axios from "../config/axiosConfig";
import { getUsersApi } from "../features/admin/adminApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const ListItem = ({
  username,
  email,
  id,
  isBlocked,
}: {
  username: string;
  email: string;
  id: string;
  isBlocked: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [blocked, setBlocked] = useState(isBlocked);
  const blockUnblockHandler = async () => {
    try {
      await axios.patch(`/admin/${id}`);
      successNotification(blocked ? "unblocked" : "blocked");
      setBlocked((prev) => !prev);
    } catch (err) {
      const resError = err as any;
      errorNotification(resError.response.data.message);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`/admin/${id}`);
      successNotification(res.data.message);
      dispatch(getUsersApi(""));
    } catch (err) {
      const resError = err as any;
      errorNotification(resError.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-2 py-2 text-[16px] center text-white bg-black rounded-md text- md:px-4 bg-opacity-35 text-center">
      <p className="w-3/12 text-blue-500">{username}</p>
      <p className="w-5/12 text-orange-400">{email}</p>

      <div className="flex justify-center w-3/12 gap-3">
        {blocked ? (
          <button className="text-green-500 " onClick={blockUnblockHandler}>
            <CgUnblock />
          </button>
        ) : (
          <button className="text-red-500 " onClick={blockUnblockHandler}>
            <MdBlock />
          </button>
        )}

        <button
          className="text-yellow-400 "
          onClick={() => navigate(`/admin/${id}`)}
        >
          <MdEdit />
        </button>
        <button className="text-yellow-400 " onClick={deleteHandler}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
