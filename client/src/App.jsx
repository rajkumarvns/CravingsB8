import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:userType" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
          {/* Dashboard route */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/user/dashboard" element={<CustomerDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
