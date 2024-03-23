"use client";
import { useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      question: "",
      options: ["", "", "", ""],
      selectedOption: "",
      point: 1,
    },
  ]);
  const [popUp, setPopUp] = useState(false);
  const [quizCode, setQuizCode] = useState("");
  const [validation, setValidation] = useState(false);

  const handlePointsChange = (id, value) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, point: Number(value) } : question
    );
    setQuestions(updatedQuestions);
  };

  const submitHandler = async () => {
    console.log(questions);
    const isEmpty = questions.some(
      (question) =>
        question.question === "" ||
        question.options.some((option) => option === "") ||
        question.selectedOption?.length === 0
    );
    if (isEmpty) {
      setValidation(true);
      return;
    }
    const requestBody = questions.map((question) => ({
      options: question.options,
      question: question.question,
      selectedOption: question.selectedOption,
      point: question.point,
    }));

    const response = await fetch("https://localhost:5074/api/Quiz/CreateQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Send the formatted request body
    });
    const responseData = await response.text();

    setQuizCode(responseData);
    setPopUp(true);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        question: "",
        options: ["", "", "", ""],
        selectedOption: "",
        point: 1,
      },
    ]);
  };

  const removeQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (id, value) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, question: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const addOption = (id) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id
        ? { ...question, options: [...question.options, ""] }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionId, optionIndex) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const options = [...question.options];
        options.splice(optionIndex, 1);
        return { ...question, options };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const options = [...question.options];
        options[optionIndex] = value;
        return { ...question, options, selectedOption: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-blue">
      {questions.map((question, index) => (
        <div key={question.id} className="relative w-1/3 mb-4">
          <div className="flex flex-col items-start justify-start bg-gray-100 space-y-2 p-3">
            <div className="">
              <input
                type="number"
                placeholder="1"
                className="p-0 text-center border-transparent bg-gray-100 w-8 max-w-8 focus:border-main-blue"
                min={1}
                max={10}
                value={question.point}
                onChange={(e) =>
                  handlePointsChange(question.id, e.target.value)
                }
              />
              <span>p.</span>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex flex-col">
                <div className="border-b border-gray-700 pb-2 w-96">
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    className="input input-bordered w-96 max-96 focus:outline-none focus:border-main-blue"
                    onChange={(e) =>
                      handleQuestionChange(question.id, e.target.value)
                    }
                    value={question.question}
                  />
                </div>
              </div>

              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center justify-between w-96 space-x-2"
                >
                  <div className="flex flex-row items-center space-x-2 w-full space-y-2">
                    <input
                      type="radio"
                      name={`radio-${question.id}`}
                      className="radio"
                      value={option}
                      // checked={question.selectedOption === option}
                      onChange={(e) =>
                        handleOptionChange(
                          question.id,
                          optionIndex,
                          e.target.value
                        )
                      }
                    />
                    <input
                      className="input border-light-blue mb-2 p-2 border w-full rounded-md focus:outline-none focus:border-main-blue"
                      placeholder={`Answer ${optionIndex + 1}`}
                      onChange={(e) =>
                        handleOptionChange(
                          question.id,
                          optionIndex,
                          e.target.value
                        )
                      }
                      value={option}
                    />
                  </div>
                  <button
                    className="btn text-lg text-red-600 font-semibold"
                    onClick={() => removeOption(question.id, optionIndex)}
                  >
                    X
                  </button>
                </div>
              ))}
              {question.options.length <= 3 && (
                <button
                  className="btn bg-main-blue text-white py-2 px-4 rounded-md"
                  onClick={() => addOption(question.id)}
                >
                  Add Option
                </button>
              )}
            </div>
          </div>
          <button
            className="btn absolute bg-red-500 text-white py-2 px-4 rounded-full shadow-md text-lg top-0 right-0 mt-8 mr-2"
            onClick={() => removeQuestion(question.id)}
          >
            X
          </button>
        </div>
      ))}

      <button
        className="btn bg-main-blue text-white py-2 px-4 rounded-md mt-4"
        onClick={addQuestion}
      >
        Add Question
      </button>
      <button
        className="btn bg-green-500 text-white py-2 px-4 rounded-md mt-2"
        onClick={submitHandler}
      >
        Complete
      </button>
      {validation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="flex flex-col w-1/5 justify-center items-center bg-white p-8 rounded-md">
            <h2 className="text-lg font-semibold mb-4">
              All fields must be filled!
            </h2>
            <button
              className="btn bg-main-blue text-white py-2 px-4 rounded-md"
              onClick={() => setValidation(false)}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      {popUp && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="flex flex-col w-1/5 justify-center items-center bg-white p-8 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Quiz Code</h2>
            <h1 className="text-lg font-bold">{quizCode}</h1>
            <div className="flex justify-between w-full mt-4">
              <button
                className="btn bg-main-blue text-white py-2 px-4 rounded-md"
                onClick={() => setPopUp(false)}
              >
                Edit
              </button>
              <a
                className="btn bg-main-blue text-white py-2 px-4 rounded-md"
                href="/joinQuiz"
              >
                ok
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
