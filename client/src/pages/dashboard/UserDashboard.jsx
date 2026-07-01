import React, { useEffect, useState } from "react";
import bgImg from "../../assets/commonBG.avif";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("UserData"));
    setUserData(data);
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {/* Background Overlay */}
      <div className="min-h-screen bg-black/40 flex justify-center items-center p-6">
        <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white/95 backdrop-blur-md">
          {/* Header */}
          <div className="h-40 bg-linear-to-r from-orange-500 to-red-500 relative">
            {/* Profile Image */}
            <div className="absolute left-1/2 -translate-x-1/2 top-20">
              {userData.photo ? (
                <img
                  src={userData.photo}
                  alt={userData.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-orange-200 flex justify-center items-center text-5xl font-bold text-orange-700">
                  {userData.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="pt-20 px-8 pb-8">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              {userData.fullName}
            </h2>

            <p className="text-center text-gray-500 mt-2">
              Welcome to{" "}
              <span className="font-semibold text-orange-500">Cravings 🍔</span>
            </p>

            <div className="mt-8 space-y-5">
              {/* Email */}
              <div className="bg-orange-50 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-lg font-semibold break-all">
                  {userData.email}
                </p>
              </div>

              {/* Phone */}
              <div className="bg-orange-50 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-lg font-semibold">{userData.phone}</p>
              </div>

              {/* Account Type */}
              <div className="bg-orange-50 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="text-lg font-semibold">Customer</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                Edit Profile
              </button>

              <button className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300">
                My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
