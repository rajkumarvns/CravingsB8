import React from "react";
import { useAuth } from "../../context/AuthContext";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const mainTabs = [
    { name: "Overview", value: "overview", icon: <MdDashboard /> },
    { name: "Orders", value: "orders", icon: <FaShoppingCart /> },
  ];

  const settingsTab = {
    name: "Settings",
    value: "settings",
    icon: <IoMdSettings />,
  };

  const renderTab = (tab) => (
    <li
      key={tab.value}
      className={`cursor-pointer p-2 rounded text-(--color-neutral) flex items-center gap-3 ${
        activeTab === tab.value
          ? "bg-(--color-primary) text-(--color-primary-content) font-semibold"
          : "hover:bg-(--color-secondary) hover:text-(--color-secondary-content) transition-colors duration-200"
      }`}
      onClick={() => setActiveTab(tab.value)}
    >
      {tab.icon} {tab.name}
    </li>
  );

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3 p-3">
          <img
            src={user?.photo?.url || user?.photo || "https://via.placeholder.com/48"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <div className="font-semibold text-sm">{user?.fullName || "Guest"}</div>
            <div className="text-xs text-(--color-neutral)">{user?.email || ""}</div>
          </div>
        </div>
        <ul className="space-y-4 flex-1">
          {mainTabs.map((tab) => renderTab(tab))}
        </ul>
        <ul className="space-y-4 border-t border-(--color-secondary) py-2">
          {renderTab(settingsTab)}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
