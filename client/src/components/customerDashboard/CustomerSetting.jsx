import React, { useState, useEffect } from "react";
import { MdEdit, MdOutlineAddAPhoto } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";

const CustomerSetting = () => {
  const { user, setUser } = useAuth();

  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  // Handle Input Change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  // Save Profile
  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();

      payload.append("fullName", formData.fullName.trim());
      payload.append("email", formData.email.toLowerCase().trim());
      payload.append("phone", formData.phone.trim());

      if (profilePic) {
        payload.append("displayPic", profilePic);
      }

      const response = await api.put("/user/edit-profile", payload);

      setUser(response.data.data);

      sessionStorage.setItem(
        "UserData",
        JSON.stringify(response.data.data)
      );

      setEditingProfile(false);
      setProfilePic(null);
      setProfilePicPreview(null);

      toast.success(response.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel Edit
  const handleCancelProfile = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });

    setProfilePic(null);
    setProfilePicPreview(null);
    setEditingProfile(false);
  };

  return (
    <div className="overflow-y-auto h-full p-6 space-y-6">
      <div className="bg-(--color-base-200) rounded-lg p-6">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Profile Information
          </h3>

          {!editingProfile ? (
            <button
              onClick={() => setEditingProfile(true)}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
            >
              <MdEdit />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={handleCancelProfile}
                disabled={isLoading}
                className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">

          {/* Profile Image */}
          <div className="relative">

            <div className="w-36 h-36">
              <img
                src={
                  profilePicPreview ||
                  user?.photo?.url ||
                  "/defaultProfile.png"
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-(--color-primary)"
              />
            </div>

            {editingProfile && (
              <div
                className="absolute bottom-1 right-1 border p-2 rounded-full bg-(--color-base-200)"
                title="Change Photo"
              >
                <label
                  htmlFor="profilePic"
                  className="cursor-pointer"
                >
                  <MdOutlineAddAPhoto className="text-xl" />
                </label>

                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </div>
            )}

          </div>

          {/* User Details */}

          <div className="space-y-4 w-full">

            <div className="grid grid-cols-5 gap-2 items-center">

              <label className="font-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleProfileChange}
                disabled={!editingProfile}
                className={`col-span-4 px-3 py-2 border rounded ${
                  editingProfile
                    ? "border-(--color-secondary)"
                    : "border-transparent"
                }`}
              />

              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="col-span-4 px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />

              <label className="font-semibold">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleProfileChange}
                disabled={!editingProfile}
                className={`col-span-4 px-3 py-2 border rounded ${
                  editingProfile
                    ? "border-(--color-secondary)"
                    : "border-transparent"
                }`}
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CustomerSetting;