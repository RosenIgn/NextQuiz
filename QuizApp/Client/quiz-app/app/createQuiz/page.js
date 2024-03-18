"use client";
import { useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState([
    { question: "", options: [""], selectedOption: "" },
  ]);

  const submitHandler = () => {
    const quizCodeGenerator = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    console.log(questions);
    console.log("Quiz Code is:" + quizCodeGenerator);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: [""], selectedOption: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    updatedQuestions[questionIndex].selectedOption = value; // Update the selected option for the question
    setQuestions(updatedQuestions);
  };


  return (
    <div className="flex flex-col container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Create Quiz
      </h1>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="relative mb-4">
          <div className="flex flex-row justify-center bg-gray-100 space-y-4 rounded-md w-full p-4">
            <div className="flex flex-col mr-5">
              <div className="badge mb-4 w-1/2 self-center text-center text-lg text-gray-700">
                {`Question ${questionIndex + 1}`}
              </div>

              <textarea 
              className="textarea flex-row text-md w-full max-h-44 mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              onChange={(e) => handleQuestionChange(
                questionIndex,
                e.target.value
              )}
              >
              </textarea>
            </div>

            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`radio-${optionIndex + 1}`}
                    className="radio mb-2"
                    value={option}
                    checked={question.selectedOption === option} // Set the checked state based on selectedOption
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                  />
                  <input
                    className="input border-light-blue mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                  />
                  <button
                    className="btn mb-2 text-lg text-red-600 font-semibold"
                    onClick={() => removeOption(questionIndex, optionIndex)}
                  >
                    X
                  </button>
                </div>
              ))}
              {question.options.length <= 3 && (
                <button
                  className="btn bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={() => addOption(questionIndex)}
                >
                  Add Option
                </button>
              )}
            </div>
          </div>
          <button
            className="btn absolute bg-red-500 text-white py-2 px-4 rounded-full shadow-md text-lg top-0 right-0 mt-2 mr-2"
            onClick={() => removeQuestion(questionIndex)}
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
    </div>
  );
};

export default Page;
