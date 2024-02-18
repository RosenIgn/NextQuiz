"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch('http://localhost:5074/api/Home/GetInfo');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getInfo();
  }, []);

  return (
    <>
      <main className="flex items-center justify-center h-full">
        <h1 className="text-4xl">Welcome to the Quiz App</h1>
      </main>
      <div>
        {info ? (
          <p>{info.message}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
