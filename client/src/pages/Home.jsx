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

  return (
    <div className="min-h-screen bg-[url('/foodTable.webp')] bg-cover bg-center">
      <div className="min-h-screen bg-linear-to-br from-black/75 via-black/55 to-orange-500/25">
        <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:px-8 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-4xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl md:p-10">
              <div className="mb-4 inline-flex rounded-full border border-orange-400/40 bg-orange-500/20 px-3 py-1 text-sm font-semibold text-orange-200">
                Cravings • Food delivery made simple
              </div>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Delicious meals delivered{" "}
                <span className="text-orange-400">to your door</span> in
                minutes.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-orange-50/90">
                From your favorite local spots to indulgent comfort food,
                Cravings brings the best flavors to your city with fast delivery
                and effortless ordering.
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

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#fff8ec] p-5 shadow-lg">
                  <p className="text-sm font-semibold text-orange-600">
                    Fresh & Hot
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Every meal is packed carefully and delivered with care.
                  </p>
                </div>
                <div className="rounded-3xl bg-[#fff1df] p-5 shadow-lg">
                  <p className="text-sm font-semibold text-orange-600">
                    Live tracking
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Know exactly when your cravings are arriving.
                  </p>
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default Home;
