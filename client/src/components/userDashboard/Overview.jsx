import React from "react";

const Overview = ({ userData }) => {
  return (
    <div className="flex justify-center">

      <div className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden border">

        <div className="h-28 bg-linear-to-r from-orange-500 to-red-500 relative">

          <div className="absolute left-1/2 -translate-x-1/2 top-14">

            {userData.photo ? (
              <img
                src={userData.photo}
                alt={userData.fullName}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-orange-200 border-4 border-white flex justify-center items-center text-4xl font-bold text-orange-600">
                {userData.fullName.charAt(0).toUpperCase()}
              </div>
            )}

          </div>

        </div>

        <div className="pt-16 px-6 pb-6">

          <h2 className="text-2xl font-bold text-center">
            {userData.fullName}
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Welcome to Cravings 🍔
          </p>

          <div className="space-y-4">

            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="font-semibold">
                {userData.email}
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Phone
              </p>

              <p className="font-semibold">
                {userData.phone}
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Account Type
              </p>

              <p className="font-semibold">
                Customer
              </p>
            </div>

          </div>

          <div className="flex gap-3 mt-6">

            <button className="flex-1 bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-600">
              Edit Profile
            </button>

            <button className="flex-1 border border-orange-500 text-orange-500 rounded-lg py-2 hover:bg-orange-500 hover:text-white">
              My Orders
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Overview;