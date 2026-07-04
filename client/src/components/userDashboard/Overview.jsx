import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";

const Overview = ({ userData, setActive }) => {
  const { user, setUser } = useAuth();
  const displayUser = user || userData;
  const [isEditable, setIsEditable] = useState(false);
  const [tempUser, setTempUser] = useState(displayUser || {});

  useEffect(() => {
    setTempUser(displayUser || {});
  }, [displayUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditable(false);

    const payLoad = {
      email: tempUser.email?.toLowerCase(),
      fullName: tempUser.fullName,
      phone: tempUser.phone,
    };

    try {
      const res = await api.put("/user/edit-profile", payLoad);
      setUser(res.data.data);
      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        (error.response?.status ? `${error.response.status} | ` : "") +
          (error.response?.data?.message || error.message),
      );
    }
  };

  if (!displayUser) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden border">
        <div className="h-28 bg-linear-to-r from-orange-500 to-red-500 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-14">
            {displayUser.photo ? (
              <img
                src={displayUser.photo}
                alt={displayUser.fullName}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-orange-200 border-4 border-white flex justify-center items-center text-4xl font-bold text-orange-600">
                {displayUser.fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="pt-16 px-6 pb-6">
          <h2 className="text-2xl font-bold text-center">
            {isEditable ? (
              <input
                type="text"
                name="fullName"
                value={tempUser.fullName}
                onChange={handleChange}
                className="border p-2 w-full text-center rounded"
              />
            ) : (
              displayUser.fullName
            )}
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Welcome to Cravings 🍔
          </p>

          <div className="space-y-4">
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Email</p>
              {isEditable ? (
                <input
                  type="email"
                  name="email"
                  value={tempUser.email}
                  disabled
                  className="border p-2 w-full rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                />
              ) : (
                <p className="font-semibold">{displayUser.email}</p>
              )}
            </div>

            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Phone</p>
              {isEditable ? (
                <input
                  type="number"
                  name="phone"
                  value={tempUser.phone}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              ) : (
                <p className="font-semibold">{displayUser.phone}</p>
              )}
            </div>

            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Account Type</p>
              <p className="font-semibold">Customer</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6 sm:flex-row">
            {isEditable ? (
              <>
                <button
                  onClick={() => setIsEditable(false)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Save Profile
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditable(true)}
                  className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setActive?.("Orders")}
                  className="w-full rounded-lg border border-orange-500 bg-white px-4 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  My Orders
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
