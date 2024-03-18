"use client";

import { useState, useEffect } from "react";

const handleLogout = () => {
  fetch("https://localhost:5074/api/Auth/Logout", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((data) => {
      if (data == "success") {
        localStorage.clear();
        window.location.href = "/login";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log("Logging out...");
};

const SkeletonEffect = () => (
  <div className="skeleton h-10 bg-gray-200 animate-pulse"></div>
);

export const CustomNavbar = () => {
  const handleLogoutClick = (e) => {
    e.preventDefault();
    handleLogout();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    setIsLoggedIn(!!jwtToken);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="navbar h-10 bg-gray-50">
        <SkeletonEffect />
      </div>
    );
  }

  return (
    <div className="navbar h-10 bg-gray-50">
      <div className="flex-1">
        <a
          role="button"
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-transparent text-xl text-main-blue border-none"
          href="http://localhost:3000"
        >
          NextQuiz
        </a>
        {isLoggedIn && (
          <ul
            tabIndex={0}
            className="flex flex-row justify-start justify-center"
          >
            <li>
              <a
                className="btn text-xl text-slate-500 bg-transparent border-none"
                href="/joinQuiz"
              >
                Quizzes
              </a>
            </li>

            <li>
              <a
                className="btn text-xl text-slate-500 bg-transparent border-none"
                href="/createQuiz"
              >
                Create Quiz
              </a>
            </li>
          </ul>
        )}
      </div>
      {!isLoggedIn && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-3">
            <a
              role="button"
              className="btn text-lg text-slate-500 border-none bg-base-200"
              href="/login"
            >
              Log In
            </a>
            <a
              role="button"
              className="btn text-lg d-none d-md-flex ms-2 text-base-200 hover:text-base-content border-none bg-main-blue"
              href="/register"
            >
              Sign Up
            </a>
          </ul>
        </div>
      )}
      {isLoggedIn && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            ></div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-50 rounded-box w-52"
            >
              <li>
                <a className="text-slate-500" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a
                  className="text-slate-500"
                  href="/"
                  onClick={handleLogoutClick}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
