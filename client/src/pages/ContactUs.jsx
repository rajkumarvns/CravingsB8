import React, { useState } from "react";
import foodBgImg from "../assets/contactPage.jpg";
import api from "../config/api.config";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [contactUsData, setContactUsData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [validateError, setValidateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactUsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !contactUsData.fullname ||
      !contactUsData.email ||
      !contactUsData.phone ||
      !contactUsData.subject ||
      !contactUsData.message
    ) {
      setValidateError("All fields are required.");
      return;
    }

    setValidateError("");

    const payload = {
      fullName: contactUsData.fullname.trim(),
      email: contactUsData.email.trim().toLowerCase(),
      phone: contactUsData.phone.trim(),
      subject: contactUsData.subject.trim(),
      message: contactUsData.message.trim(),
    };

    try {
      const res = await api.post("/public/contact-us", payload);

      toast.success(res.data.message);

      setContactUsData({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send message.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${foodBgImg})` }}
    >
      <div className="flex justify-center items-center py-10 px-5">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-orange-600">
            Contact Us
          </h1>

          <p className="text-center text-gray-600 mt-2">
            Have a question? We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="text"
              name="fullname"
              value={contactUsData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-orange-400 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="email"
              name="email"
              value={contactUsData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-orange-400 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="tel"
              name="phone"
              value={contactUsData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-orange-400 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="text"
              name="subject"
              value={contactUsData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="w-full border border-orange-400 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <textarea
              name="message"
              rows="5"
              value={contactUsData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full border border-orange-400 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />

            {validateError && (
              <p className="text-red-500 text-sm mb-4">{validateError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
