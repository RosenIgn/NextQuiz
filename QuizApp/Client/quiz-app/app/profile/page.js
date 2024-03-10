'use client';
import { useState, useEffect } from 'react';

const Page = () => {
  const [editing, setEditing] = useState(false); // State to track whether the profile is being edited
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const jwtToken = localStorage.getItem('jwt');

        const response = await fetch('https://localhost:5074/api/Auth/GetUser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        });

        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your update profile logic here
    console.log('Profile updated:', formData);
    setEditing(false); // Close the editing mode after submitting the form
  };

  return (
    <div className="block h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-4/5 w-1/2 p-6 bg-white rounded-md shadow-md">
        <section className="flex justify-center place-self-start">
          <img
            className="max-w-44 max-h-44 left-full mb-16 ml-10 rounded-full"
            alt="Profile pic"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          />
          <button className="btn justify-center ml-16 mt-16 text-gray-100 bg-blue-700">
            Change Image
          </button>
        </section>
        {editing ? (
          <form className="flex flex-col w-full justify-center" onSubmit={handleSubmit}>
            <div >
            <h2 className="text-black">Username:</h2>
            <input
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
              className="input w-full border-blue-700 text-black mb-4"
              value={formData.username}
              onChange={handleChange}
            />
            <h2 className="text-black">Email:</h2>
            <input
              label="Email"
              type="text"
              name="email"
              placeholder="Email"
              className="input w-full border-blue-700 text-black mb-4"
              value={formData.email}
              onChange={handleChange}
            />
            <h2 className="text-black">Password:</h2>
            <input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              className="input w-1/3 border-blue-700 text-black mb-6"
            />
            <a className='btn ml-10'>Change password</a>
            </div>
            <button type="submit" className="btn place-self-end text-gray-100 bg-blue-700">
              Save Changes
            </button>

          </form>
        ) : (
            <div className='flex flex-col w-full'>
          <button
            onClick={() => setEditing(true)}
            className="btn place-self-end text-gray-100 bg-blue-700"
          >
            Edit Profile
          </button>

          <form className='flex flex-col w-full justify-center'>
            <h2 className='text-black'>Username:</h2>
            <input
              label="Username"
              type="text"
              name="username"
              placeholder={userData && userData.userName}
              className="input w-full border-blue-700 text-black mb-4"
              readOnly
            />
            <h2 className='text-black'>Email:</h2>
             <input
              label="Email"
              type="text"
              name="Email"
              placeholder={userData && userData.email}
              className="input w-full border-blue-700 text-black mb-4"
              readOnly
            />
            <h2 className='text-black'>Password:</h2>
            <input
              label="Password"
              type="password"
              name="password"
              placeholder='Password'
              className="input w-full border-blue-700 text-black mb-6"
              readOnly
            />
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default Page;
