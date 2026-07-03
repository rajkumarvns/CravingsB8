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
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactUsData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validateError) {
      setValidateError("");
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Full Name Validation
    if (!contactUsData.fullname.trim()) {
      return setValidateError("Full Name is required.");
    }

    // Email Validation
    if (!contactUsData.email.trim()) {
      return setValidateError("Email is required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(contactUsData.email)) {
      return setValidateError("Please enter a valid email address.");
    }

    // Phone Validation
    if (!contactUsData.phone.trim()) {
      return setValidateError("Phone Number is required.");
    }

    if (!/^[0-9]{10}$/.test(contactUsData.phone.trim())) {
      return setValidateError("Phone Number must contain exactly 10 digits.");
    }

    // Subject Validation
    if (!contactUsData.subject.trim()) {
      return setValidateError("Subject is required.");
    }

    // Message Validation
    if (!contactUsData.message.trim()) {
      return setValidateError("Message is required.");
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
      setLoading(true);

      const res = await api.post("/public/contact-us", payload);

      toast.success(res.data.message);

      setContactUsData({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setValidateError("");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to send message.",
      );
    } finally {
      setLoading(false);
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
              maxLength={500}
              value={contactUsData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full border border-orange-400 rounded p-3 mb-1 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />

            <div className="text-right text-sm text-gray-500 mb-4">
              {contactUsData.message.length}/500
            </div>

            {validateError && (
              <p className="text-red-500 text-sm mb-4">{validateError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
