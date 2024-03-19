'use client';

import { getURL } from 'next/dist/shared/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PopUp = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md">
        <p className="text-lg">{message}</p>
        <button className="btn bg-blue-500 text-white py-2 px-4 rounded-md mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
  
  const Page = () => {
    const [quiz, setQuiz] = useState([
      {
        id: 1,
        question: 'Question 1?',
        options: ['Option 1', 'Option 2', 'Option 3'],
        selectedOption: '',
        correctOption: 'Option 2',
        points: 1,
      },
      {
        id: 2,
        question: 'Question 2?',
        options: ['Option 1', 'Option 2', 'Option 3'],
        selectedOption: '',
        correctOption: 'Option 3',
        points: 1,
      },
    ]);
  
    const [results, setResults] = useState(null);
    const [submitPressed, setSubmitPressed] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
  
    const handleOptionChange = (questionId, selectedOption) => {
      setQuiz((prevQuiz) =>
        prevQuiz.map((question) =>
          question.id === questionId ? { ...question, selectedOption } : question
        )
      );
    };
  
    const handleSubmit = () => {
      const isAllAnswered = quiz.every((question) => question.selectedOption !== '');
  
      if (!isAllAnswered) {
        setPopUpMessage('Please answer all questions.');
        return;
      }
  
      const totalPoints = quiz.reduce((acc, question) => {
        const isCorrect = question.selectedOption === question.correctOption;
        return isCorrect ? acc + question.points : acc;
      }, 0);
  
      setResults({
        totalPoints,
        correctAnswers: totalPoints,
        incorrectAnswers: quiz.length - totalPoints,
      });
  
      setSubmitPressed(true);
    };
  
    const handleTryAgain = () => {
      window.location.reload();
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Current Quiz</h1>
          {quiz.map((part) => (
            <div
              key={part.id}
              className={`bg-white rounded-lg shadow-md p-6 mb-4 ${
                submitPressed &&
                (part.selectedOption === part.correctOption ? 'bg-green-100' : 'bg-red-100')
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">{part.question}</h2>
              <div className="space-y-2">
                {part.options.map((option, index) => (
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
                    <label htmlFor={`option-${index}`} className="text-lg text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            className="btn bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            onClick={handleSubmit}
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
              <p>Total Questions: {quiz.length}</p>
              <p>Correct Answers: {results.correctAnswers}</p>
              <p>Incorrect Answers: {results.incorrectAnswers}</p>
            </div>
          )}
        </div>
        {popUpMessage && <PopUp message={popUpMessage} onClose={() => setPopUpMessage('')} />}
      </div>
    );
  };
  
  export default Page;