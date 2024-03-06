'use client';
import { useState } from 'react';

const Page = () => {
   
        const [formData, setFormData] = useState({
          Username: '',
          Email: '',
          Password: '',
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          // Add your registration logic here
          console.log('Form submitted:', formData);
          const response = await fetch('https://localhost:5074/api/Auth/Register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specify content type as JSON
            },
            body: JSON.stringify(formData), // Convert formData to JSON string
          });
        };
    
    return(
        <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-md w-full p-6 bg-white rounded-md shadow-md">
          <h2 className="text-3xl text-blue-700 font-extrabold mb-6">Register</h2>
          <form className='flex flex-col w-full items-center justify-center' onSubmit={handleSubmit}>
            <input
              label="Username"
              type="text"
              name="Username"
              placeholder='Username'
              value={formData.Username}
              onChange={handleChange}
              className="input w-full border-blue-700 text-black mb-4"
            />
            <input
              label="Email"
              type="email"
              name="Email"
              placeholder='Email'
              value={formData.Email}
              onChange={handleChange}
              className="input w-full border-blue-700 text-black mb-4"
            />
            <input
              label="Password"
              type="password"
              name="Password"
              placeholder='Password'
              value={formData.Password}
              onChange={handleChange}
              className="input w-full border-blue-700 text-black mb-4"
            />
            <input
              label="Repeat Password"
              type="password"
              name="RepeatPassword"
              placeholder='Repeat Password'
              className="input w-full border-blue-700 text-black mb-4"
            />
            <br/>
            <button className='btn w-full bg-blue-700 text-gray-100' type="submit">Register</button>
          </form>
        </div>
      </div>
    );
    }
    
export default Page;