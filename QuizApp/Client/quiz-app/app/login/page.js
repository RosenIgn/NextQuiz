"use client";

import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (formData.username == "" || formData.password == "") {
      console.log("You have not entered a username or password.");
    } else {
      const response = await fetch("https://localhost:5074/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        const expirationTime = new Date().getTime() + 30 * 60000; // 30 minutes from now
        localStorage.setItem("jwt", responseData.jwt);
        localStorage.setItem("jwtExpiration", expirationTime);
      } else {
        console.log(responseData.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-light-blue flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-md w-full p-6 bg-base-100 rounded-lg shadow-md">
        <h2 className="text-3xl text-main-blue font-extrabold mb-6">Login</h2>
        <form
          className="flex flex-col w-full items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            label="Username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input w-full border-light-blue text-black mb-4"
          />
          <input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input w-full border-light-blue text-black mb-6"
          />
          <br />
          <button
            className="btn w-full hover:text-base-content bg-main-blue text-base-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
