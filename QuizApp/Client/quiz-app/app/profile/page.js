"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [modalData, setModalData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const jwtToken = localStorage.getItem("jwt");

        const response = await fetch(
          "https://localhost:5074/api/Auth/GetUser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetFormData = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    setUserData((prevUserData) => ({
      ...prevUserData,
      userName: formData.username,
      email: formData.email,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.username == "" ||
      formData.email == "" ||
      formData.password == ""
    ) {
      console.log("You have not entered a username, email or password.");
    } else {
      const response = await fetch(
        "https://localhost:5074/api/Auth/ChangeUserData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUsername: userData.userName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            currentPassword: userData.passwordHash,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        console.log("Profile updated:", formData);
        resetFormData();
        setEditing(false);
      } else {
        console.log(responseData.message);
      }
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    if (modalData.currentPassword == "" || modalData.newPassword == "") {
      console.log("You have not entered a password.");
    } else {
      const response = await fetch(
        "https://localhost:5074/api/Auth/ChangeUserPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUsername: userData.userName,
            password: modalData.currentPassword,
            currentPassword: userData.passwordHash,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        console.log("Let's goo");
      } else {
        console.log(responseData.message);
      }
      setEditing(false);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();

    formData.email = userData.email;
    formData.username = userData.userName;
    setEditing(true);
  };

  const handleCancel = () => {
    formData.email = "";
    formData.username = "";
    setEditing(false);
  };

  return (
    <div className="block h-screen bg-light-blue flex items-center justify-center">
      <div className="flex flex-col items-center bg-base-100 h-3/7 w-3/12 max-w-3/12 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl text-main-blue font-extrabold my-2">
          Account Settings
        </h1>
        <form className="space-y-4 w-full">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-4">
              <img
                className="h-16 w-16 object-cover rounded-full"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Current profile photo"
              />
              <label className="block">
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-main-blue hover:file:bg-blue-100"
                />
              </label>
            </div>
            <div className="space-y-2 w-full">
              <h1 className="text-base">Email</h1>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  name="email"
                  placeholder={
                    userData && userData.email ? userData.email : "Email"
                  }
                  className="grow"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!editing}
                />
              </label>
              <h1 className="text-base">Username</h1>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  name="username"
                  placeholder={
                    userData && userData.userName
                      ? userData.userName
                      : "Username"
                  }
                  className="grow"
                  value={formData.username}
                  onChange={handleChange}
                  readOnly={!editing}
                />
              </label>
              <h1 className="text-base">Password</h1>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="grow"
                  value={formData.password}
                  onChange={handleChange}
                  readOnly={!editing}
                />
              </label>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {editing ? (
              <>
                <button
                  type="button"
                  className="rounded-md bg-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={() =>
                    document.getElementById("changePasswordModal").showModal()
                  }
                >
                  Change Password
                </button>

                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-md bg-main-blue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="rounded-md bg-main-blue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </form>
        <dialog id="changePasswordModal" className="modal sm:modal-middle">
          <div className="modal-box">
            <div className="space-y-2 w-full">
              <h1 className="text-base">Current Password</h1>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Password"
                  className="grow"
                  value={modalData.currentPassword}
                  onChange={handleModalChange}
                  readOnly={!editing}
                />
              </label>
              <h1 className="text-base">New Password</h1>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="grow"
                  onChange={handleModalChange}
                  readOnly={!editing}
                />
              </label>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <div className="flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-main-blue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={handleModalSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Page;
