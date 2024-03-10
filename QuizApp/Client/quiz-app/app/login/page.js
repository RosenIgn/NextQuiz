"use client";

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('/components/login.js'), { ssr: false });

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    console.log('Form submitted:', formData);
    if (formData.username == "" || formData.password == "") {
      console.log("You have not entered a username or password.");
    }
    else {
      const response = await fetch('https://localhost:5074/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        localStorage.setItem('jwt', responseData.jwt);
  
        router.push("/");
      } else {
        console.log(responseData.errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl text-main-blue font-extrabold mb-6">Login</h2>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;