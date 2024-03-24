"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [quizCode, setQuizCode] = useState("");
  const [validation, setValidation] = useState(false);
  const [validationMessage, setValidationMessages] = useState();

  const router = useRouter();

  const handleQuizCodeChange = (event) => {
    setQuizCode(event.target.value);
  };

  useEffect(() => {
    let timer;
    if (validation) {
      timer = setTimeout(() => {
        setValidation(false);
        setValidationMessages("");
      }, 7500);
    }
    return () => clearTimeout(timer);
  }, [validation]);

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
      setValidation(false);
    } else {
      setValidation(true);
      setValidationMessages(responseData);
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
      <div className="fixed bottom-4 right-4 z-50">
        {validation && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{validationMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
