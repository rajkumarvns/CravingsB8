import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const highlights = [
    {
      title: "Lightning-fast delivery",
      description:
        "Track your food live and get it at your doorstep in minutes.",
    },
    {
      title: "Fresh local favorites",
      description: "Discover popular restaurants and comfort food near you.",
    },
    {
      title: "Easy for partners",
      description:
        "Restaurants and riders can grow with Cravings in one place.",
    },
  ];

  const stats = [
    { value: "20K+", label: "orders daily" },
    { value: "300+", label: "restaurants" },
    { value: "4.9/5", label: "customer love" },
  ];

  const restaurants = [
    {
      name: "Under The Mango Tree",
      rating: "3.6⭐",
      description: "Grill & barbecue at Jehan Numa Palace, Bhopal.",
    },
    {
      name: "Raj Darbar",
      rating: "4.8⭐",
      description: "Dhaba-style Indian dining experience.",
    },
    {
      name: "Countryside Culture",
      rating: "4.1⭐",
      description: "Lush meadows and peaceful paths.",
    },
  ];

  const testimonials = [
    {
      quote: "The food arrived hot and fresh. Highly impressed!",
      author: "Arun J.",
    },
    {
      quote: "Easy to use interface, wide variety of restaurants.",
      author: "Sneha P.",
    },
    {
      quote: "Love the variety of restaurants available.",
      author: "Raj Kumar",
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/foodTable.webp')] bg-cover bg-center">
      <div className="min-h-screen bg-linear-to-br from-black/75 via-black/55 to-orange-500/25">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-4xl border border-white/20 bg-white/10 p-10 text-white shadow-2xl backdrop-blur-xl">
            <div className="mb-4 inline-flex rounded-full border border-orange-400/40 bg-orange-500/20 px-3 py-1 text-sm font-semibold text-orange-200">
              Cravings • Food delivery made simple
            </div>
            <h1 className="text-5xl font-black leading-tight lg:text-6xl">
              Delicious meals delivered{" "}
              <span className="text-orange-400">to your door</span> in minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-orange-50/90">
              From your favorite local spots to indulgent comfort food, Cravings
              brings the best flavors to your city with fast delivery and
              effortless ordering.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
              >
                Order Now
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Become a Partner
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/10 p-3 text-center"
                >
                  <p className="text-xl font-black text-orange-300">
                    {item.value}
                  </p>
                  <p className="text-sm text-orange-50/80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="rounded-4xl border border-orange-100 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                  Why Cravings
                </p>
                <h2 className="text-3xl font-black text-gray-900">
                  A better way to order food
                </h2>
              </div>
              <p className="max-w-xl text-sm text-gray-600">
                A smooth experience for customers, restaurants, and riders — all
                in one app.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.3rem] border border-gray-100 bg-[#fffaf3] p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <h2 className="text-3xl font-black text-white mb-8">
            Featured Restaurants
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {restaurants.map((r) => (
              <div
                key={r.name}
                className="rounded-3xl bg-white/90 p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {r.name} ({r.rating})
                </h3>
                <p className="mt-2 text-sm text-gray-700">{r.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <h2 className="text-3xl font-black text-white mb-8">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.author}
                className="rounded-3xl bg-white/90 p-6 shadow-lg"
              >
                <p className="text-gray-700">“{t.quote}”</p>
                <footer className="mt-2 text-sm font-semibold text-orange-600">
                  – {t.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/70 text-white text-center py-6">
          <p>© 2026 Cravings. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
