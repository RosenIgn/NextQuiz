'use client';
import { useState } from 'react';

const Page = () => {
   
        const [formData, setFormData] = useState({
          username: '',
          email: '',
          password: '',
          ImgUrl: '',
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Add your registration logic here
          console.log('Form submitted:', formData);
        };
    
    return(
        <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-md w-full p-6 bg-white rounded-md shadow-md">
          <h2 className="text-3xl text-blue-700 font-extrabold mb-6">Register</h2>
          <form className='flex flex-col w-full items-center justify-center' onSubmit={handleSubmit}>
            <input
              label="Username"
              type="text"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              className="input w-full border-blue-700 text-black mb-4"
            />
            <input
              label="Email"
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className="input w-full border-blue-700 text-black mb-4"
            />
            <input
              label="ImgUrl"
              type="text"
              name="ImgUrl"
              placeholder='Image URL'
              value={formData.ImgUrl}
              onChange={handleChange}
              className="input w-full border-blue-700 text-gray-400 text-black mb-4"
            />
            <input
              label="Password"
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              className="input w-full border-blue-700 text-black mb-6"
            />
             <input
              label="repear-password"
              type="repear-password"
              name="repear-password"
              placeholder='Repeat password'
              value={formData.password}
              onChange={handleChange}
              className="input w-full border-blue-700 text-black mb-6"
            />
            <br/>
            <button className='btn w-full bg-blue-700 text-gray-100' type="submit">Register</button>
          </form>
        </div>
      </div>
    );
    }
    
    export default Page;