import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPowerOff } from "react-icons/fa";
import logoLight from "../assets/transparentLogoLight.png";
import api from "../config/api.config";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, isLogin, role, setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleNavigate = () => {
    if (role === "restaurant") {
      navigate("/restaurant-dashboard");
    } else if (role === "rider") {
      navigate("/rider-dashboard");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");

      toast.success(res.data.message);

      sessionStorage.removeItem("cravingUser");
      setUser(null);
      setIsLogin(false);
      setRole(null);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during logout. Please try again.",
      );
    }
  };

  return (
    <div className="sticky top-0 z-99 flex items-center justify-between px-12 py-1 bg-(--color-primary) text-white w-full h-16 shadow-md">
      <div className="h-full">
        <Link to="/">
          <img src={logoLight} alt="Logo" className="w-fit h-full" />
        </Link>
      </div>

      {isLogin ? (
        <div className="flex items-center gap-2 border-0">
          <div className="flex items-center gap-2">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-2 py-1 rounded"
              title="Select Theme"
              style={{
                backgroundColor: "var(--color-base-200)",
                color: "var(--color-base-content)",
                border: "1px solid var(--color-base-300)",
                minWidth: 110,
              }}
            >
              <option value="light">Light</option>
              <option value="coffee">Coffee</option>
              <option value="mint">Mint</option>
              <option value="sunset">Sunset</option>
            </select>
          </div>

          <button
            className="flex gap-2 items-center text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
            title="Go to Dashboard"
            onClick={handleNavigate}
          >
            {user?.photo && (
              <img
                src={user.photo.url || user.photo}
                alt={user?.fullName || "User"}
                className="w-12 h-12 rounded-full object-cover object-top"
              />
            )}
            <div className="flex flex-col items-start">
              <span className="text-base">{user?.fullName}</span>
              <span className="text-xs text-(--color-primary-content)/80">
                Customer
              </span>
            </div>
          </button>
          <button
            onClick={handleLogout}
            className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) hover:bg-(--color-error) px-3 py-3 rounded"
            title="Logout"
          >
            <FaPowerOff />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-2 py-1 rounded"
              title="Select Theme"
              style={{
                backgroundColor: "var(--color-base-200)",
                color: "var(--color-base-content)",
                border: "1px solid var(--color-base-300)",
                minWidth: 110,
              }}
            >
              <option value="light">Light</option>
              <option value="coffee">Coffee</option>
              <option value="mint">Mint</option>
              <option value="sunset">Sunset</option>
            </select>
          </div>
          <Link
            to="/login"
            className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
          >
            Login
          </Link>
          <Link
            to="/register/customer"
            className="bg-(--color-primary-content) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-content) border px-3 py-1 rounded"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
