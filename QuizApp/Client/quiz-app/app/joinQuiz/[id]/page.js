"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PopUp = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-md">
      <p className="text-lg">{message}</p>
      <button
        className="btn bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

const Page = () => {
  const params = useParams();

  const [quiz, setQuiz] = useState([]);
  const [time, setTime] = useState(120 - 1);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [results, setResults] = useState(null);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const response = await fetch(
          `https://localhost:5074/api/Quiz/GetQuizData/${String(params.id)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        const quizData = data.map((question) => ({
          ...question,
          selectedOption: "",
        }));

        setQuiz(quizData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getQuizData();
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      const timer = setTimeout(() => {
        setTime((prevValue) => (prevValue <= 0 ? 0 : prevValue - 1));
      }, 1000);

      if (time === 0) {
        finishQuiz(true);
      }

      return () => clearTimeout(timer);
    }
  }, [isTimerRunning, time]);

  const handleOptionChange = (questionId, selectedOption) => {
    setQuiz((prevQuiz) =>
      prevQuiz?.map((question) =>
        question.id === questionId ? { ...question, selectedOption } : question
      )
    );
  };

  const finishQuiz = (isTimeExpired) => {
    if (!isTimeExpired) {
      const isAllAnswered = quiz.every(
        (question) => question.selectedOption !== ""
      );

      if (!isAllAnswered) {
        setPopUpMessage("Please answer to all of the questions.");
        return;
      }
    }

    const totalCorrectAnswers = quiz.reduce((acc, question) => {
      const isCorrect = question.selectedOption === question.correctAnswer;
      return isCorrect ? acc + 1 : acc;
    }, 0);

    const totalQuizPoints = quiz.reduce((acc, question) => {
      const isCorrect = question.selectedOption === question.correctAnswer;
      return isCorrect ? acc + question.point : acc;
    }, 0);

    setResults({
      correctAnswers: totalCorrectAnswers,
      totalQuizPoints: totalQuizPoints,
      incorrectAnswers: quiz.length - totalCorrectAnswers,
    });

    setSubmitPressed(true);
    setIsTimerRunning(false);
  };

  const handleTryAgain = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-light-blue">
      <div className="container mx-auto p-4 text-gray-900">
        <h1 className="text-3xl"></h1>
        <h1 className="text-3xl mb-2">
          Quiz Code: {String(params.id)}
          <br></br>Time Left: {Math.floor((time % 3600) / 60)}:
          {String(time % 60).padStart(2, "0")}
        </h1>
        {quiz?.map((part, index) => (
          <div
            key={index + 1}
            className={`rounded-lg shadow-md p-6 mb-4 ${
              submitPressed
                ? part.selectedOption === part.correctAnswer
                  ? "bg-green-100"
                  : "bg-red-100"
                : "bg-white"
            }`}
          >
            <div className="flex flex-row items-start justify-between space-y-2">
              <h2 className="text-xl font-semibold">
                {index + 1}. {part.label}
              </h2>
              <h2 className="text-lg font-semibold">{part.point}p.</h2>
            </div>
            <div className="space-y-2">
              {part.answers.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${part.id}`}
                    value={option}
                    className="radio-md mr-2"
                    checked={part.selectedOption === option}
                    onChange={() => handleOptionChange(part.id, option)}
                    disabled={submitPressed}
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="text-lg text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          className="btn bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          onClick={() => finishQuiz(false)}
          disabled={submitPressed}
        >
          Submit
        </button>
        {submitPressed && (
          <button
            className="btn bg-blue-500 text-white py-2 px-4 rounded-md mt-4 ml-2"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
        )}
        {results && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Results</h2>
            <p>Correct Answers: {results.correctAnswers}</p>
            <p>Incorrect Answers: {results.incorrectAnswers}</p>
            <p>Points: {results.totalQuizPoints}</p>
          </div>
        )}
      </div>
      {popUpMessage && (
        <PopUp message={popUpMessage} onClose={() => setPopUpMessage("")} />
      )}
    </div>
  );
};

export default Page;
