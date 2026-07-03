import React, { useEffect, useState } from "react";
import Sidebar from "../../components/userDashboard/Sidebar";
import Overview from "../../components/userDashboard/Overview";
import Orders from "../../components/userDashboard/Orders";
import WishList from "../../components/userDashboard/WishList";
import Settings from "../../components/userDashboard/Settings";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [active, setActive] = useState("Overview");

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
    <div className="min-h-screen bg-black/40 p-8 ">
      <div className="max-w-7xl mx-auto flex gap-6 h-[88vh] shadow-xl rounded-2xl mt-2">
        {/* Sidebar */}
        <div className="w-1/5 bg-transparent rounded-2xl shadow-2xl overflow-hidden">
          <Sidebar active={active} setActive={setActive} />
        </div>

        {/* Content */}
        <div className="w-4/5 bg-transparent rounded-2xl shadow-2xl p-6 overflow-y-auto">
          {active === "Overview" && <Overview userData={userData} />}

          {active === "Orders" && <Orders />}

          {active === "WishList" && <WishList />}

          {active === "Settings" && <Settings userData={userData} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
