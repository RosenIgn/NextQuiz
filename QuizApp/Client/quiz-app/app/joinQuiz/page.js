"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [quizCode, setQuizCode] = useState("");
  const allQuizesObg = {}; // enter the back end logic and return all the quizes
  const router = useRouter();
  const handleQuizCodeChange = (event) => {
    setQuizCode(event.target.value);
  };

  const handleJoinQuiz = async () => {
    // Handle logic to join the quiz using the quiz code
    const response = await fetch(
      `https://localhost:5074/api/Quiz/${quizCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.text();
    if (responseData == "Success") {
      console.log(`Joining quiz with code: ${quizCode}`);
      router.push(`joinQuiz/${quizCode}`);
    } else {
      console.log(responseData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Join Quiz
        </h1>
        <div className="mb-6">
          <label
            htmlFor="quizCode"
            className="block text-gray-700 font-semibold mb-2"
          >
            Quiz Code
          </label>
          <input
            type="text"
            id="quizCode"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            placeholder="Enter quiz code"
            value={quizCode}
            onChange={handleQuizCodeChange}
          />
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={handleJoinQuiz}
          disabled={!quizCode}
        >
          Join Quiz
        </button>
      </div>
    </div>
  );
};

export default Page;
