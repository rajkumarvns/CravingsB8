import React, { useState } from "react";
import foodBgImg from "../assets/contactPage.jpg";
import api from "../config/api.config";

const ContactUs = () => {
  const [contactUsData, setContactUsData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContactUsData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: contactUsData.fullname.trim(),
      email: contactUsData.email.toLowerCase(),
      phone: contactUsData.phone,
      subject: contactUsData.subject,
      message: contactUsData.message,
    };

    try {
      const res = await api.post("/contact-us", payload);
      alert(res.data.message);
      setContactUsData({ fullname: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setValidateError(error?.response?.data?.message || "Unable to send message");
    }
  };

  return (
    <>
      <div
        className="h-full bg-cover bg-center "
        style={{ backgroundImage: `url(${foodBgImg})` }}
      >
        <div className="h-[92vh] grid grid-cols-1 md:grid-cols-2 p-10 items-start">
          <div className="w-full max-w-md bg-(--background) rounded-3xl shadow p-6 md:p-10 mt-5 md:mt-0 self-start">
            <div className="var(text-2xl) font-bold mb-1 text-(--accent) flex justify-center items-center text-3xl">
              Contact Us
            </div>
            <span className="block text-center">
              Have a question? We'd love to hear from you.
            </span>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex flex-col gap-2">
                <input
                  type="fullname"
                  id="fullname"
                  name="fullname"
                  value={contactUsData.fullname}
                  onChange={handleChange}
                  className="my-5 border-amber-600 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactUsData.email}
                  onChange={handleChange}
                  className="border-amber-600 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={contactUsData.phone}
                  onChange={handleChange}
                  className="border-amber-600 border my-5 p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactUsData.subject}
                  onChange={handleChange}
                  className="border-amber-600 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="What is this about?"
                />
              </div>
              <div className="flex flex-col border rounded-xl mt-4 border-orange-400 w-full h-25 p-2 ">
                <textarea
                  name="message"
                  id="message"
                  className="w-full h-40 rounded-xl border border-orange-400 p-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  value={contactUsData.message}
                  onChange={(e) =>
                    setContactUsData({
                      ...contactUsData,
                      message: e.target.value,
                    })
                  }
                  
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              {validateError && <p className="mt-3 text-sm text-red-500">{validateError}</p>}
              <button
                type="submit"
                className="w-full mt-6 bg-(--accent) text-(--primary-text) py-3 px-4 rounded hover:bg-(--accent) transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
