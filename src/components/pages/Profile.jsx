import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/AuthSlice";

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Please login to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">

      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photo || "https://i.pravatar.cc/150"}
          className="w-28 h-28 rounded-full object-cover border"
          alt="profile"
        />

        <h2 className="text-2xl font-bold text-[#002f34]">
          {user.name || "User"}
        </h2>

        <p className="text-gray-600">{user.email}</p>

        <button
          onClick={() => dispatch(logoutUser())}
          className="bg-red-500 text-white px-6 py-2 rounded mt-4"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Profile;
