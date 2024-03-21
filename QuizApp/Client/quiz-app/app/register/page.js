"use client";
import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (
      formData.Username == "" ||
      formData.Password == "" ||
      formData.Email == "" ||
      formData.ConfirmPassword == ""
    ) {
      console.log("You have not entered a username, passwords or email.");
    } else {
      const response = await fetch("https://localhost:5074/api/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <div className="min-h-screen bg-light-blue flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-md w-full p-6 bg-base-100 rounded-lg shadow-md">
        <h2 className="text-3xl text-main-blue font-extrabold mb-6">
          Register
        </h2>
        <form
          className="flex flex-col w-full items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            label="Username"
            type="text"
            name="Username"
            placeholder="Username"
            value={formData.Username}
            onChange={handleChange}
            className="input w-full border-light-blue text-black mb-4"
          />
          <input
            label="Email"
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className="input w-full border-light-blue text-black mb-4"
          />
          <input
            label="Password"
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            className="input w-full border-light-blue text-black mb-4"
          />
          <input
            label="Confirm Password"
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm Password"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            className="input w-full border-light-blue text-black mb-4"
          />
          <br />
          <button
            className="btn w-full hover:text-base-content bg-main-blue text-base-200"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
