import React, { useState } from "react";

const Settings = ({ userData }) => {

  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Profile Updated Successfully");
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Account Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
};

export default Settings;