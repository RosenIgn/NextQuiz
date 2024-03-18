"use client";
import { useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState([
    { id: Date.now(), question: "", options: [""], selectedOption: "" },
  ]);
  const [popUp, setPopUp] = useState(false);
  const [quizCode, setQuizCode] = useState();

  const submitHandler = () => {
    const quizCodeGenerator = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    console.log(questions);
    setQuizCode(quizCodeGenerator);
    setPopUp(true);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), question: "", options: [""], selectedOption: "" },
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
      question.id === id ? { ...question, options: [...question.options, ""] } : question
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
      <div className="flex flex-col container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Create Quiz
        </h1>

        {questions.map((question, index) => (
          <div key={question.id} className="relative mb-4">
            <div className="flex flex-row justify-center bg-gray-100 space-y-4 rounded-md w-full p-4">
              <div className="flex flex-col mr-20">
                <div className="badge mb-4 w-4/5 self-center text-center text-lg text-gray-700">
                  {`Question ${index + 1}`}
                </div>
                <textarea
                  className="textarea flex-row text-md w-full max-h-44 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                  onChange={(e) =>
                    handleQuestionChange(question.id, e.target.value)
                  }
                  placeholder="Type your question here"
                  value={question.question}
                ></textarea>
              </div>

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`radio-${question.id}`}
                      className="radio mb-2"
                      value={option}
                      checked={question.selectedOption === option} // Set the checked state based on selectedOption
                      onChange={(e) =>
                        handleOptionChange(
                          question.id,
                          optionIndex,
                          e.target.value
                        )
                      }
                    />
                    <input
                      className="input border-light-blue mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                      placeholder="Type your answer here"
                      onChange={(e) =>
                        handleOptionChange(
                          question.id,
                          optionIndex,
                          e.target.value
                        )
                      }
                      value={option}
                    />
                    <button
                      className="btn mb-2 text-lg text-red-600 font-semibold"
                      onClick={() => removeOption(question.id, optionIndex)}
                    >
                      X
                    </button>
                  </div>
                ))}
                {question.options.length <= 3 && (
                  <button
                    className="btn bg-blue-500 text-white py-2 px-4 rounded-md"
                    onClick={() => addOption(question.id)}
                  >
                    Add Option
                  </button>
                )}
              </div>
            </div>
            <button
              className="btn absolute bg-red-500 text-white py-2 px-4 rounded-full shadow-md text-lg top-0 right-0 mt-2 mr-2"
              onClick={() => removeQuestion(question.id)}
            >
              X
            </button>
          </div>
        ))}

        <button
          className="btn bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
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
        {popUp && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="flex flex-col w-1/5 justify-center items-center bg-white p-8 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Quiz Code</h2>
            <h1 className="text-lg font-bold">{quizCode}</h1>
            <div className="flex justify-between w-full mt-4">
              <button
                className="btn bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => setPopUp(false)}
              >
                Edit
              </button>
              <a href='/joinQuiz' className="btn bg-blue-500 text-white py-2 px-4 rounded-md">
                Ok
              </a>
            </div>
          </div>
        </div>
        
        )}
      </div>

  );
};

export default Page;
