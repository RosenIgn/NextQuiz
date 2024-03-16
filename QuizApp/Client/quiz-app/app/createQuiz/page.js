"use client";

import { useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState([{ question: "", options: [""] }]);

  const submitHandler = () => {
    // Handle submit logic here
  }

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: [""] }]);
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
    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex flex-col container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="relative mb-4">
          <div className="flex flex-row justify-center bg-base-300 space-y-4 rounded-md w-full">
            <div className="flex flex-col mr-5">
              <div
                className="badge mr-10 mt-10 w-1/2 self-center"
                label={`Question ${questionIndex + 1}`}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, e.target.value)
                }
              >
                {`Question ${questionIndex + 1}`}
              </div>

              <textarea className="textarea flex-row text-md w-1/2 max-h-44 mt-10 m-20"></textarea>
            </div>

            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`radio-${questionIndex + 1}`}
                    className="radio mb-5"
                  />
                  <input
                    className="input border-light-blue mb-5 shadow-md"
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                  />
                  <button
                    className="btn mb-5 text-xl text-wrong-red"
                    onClick={() => removeOption(questionIndex, optionIndex)}
                  >
                    {" "}
                    X{" "}
                  </button>
                </div>
              ))}
              {question.options.length <= 3 && (
                <button className="btn" onClick={() => addOption(questionIndex)}>
                  Add Option
                </button>
              )}
            </div>
          </div>
          <button
            className="btn absolute bg-transparent border-none shadow-none text-lg top-0 right-0 mt-2 mr-2"
            onClick={() => removeQuestion(questionIndex)}
          >
            X
          </button>
        </div>
      ))}

      <button className="btn" onClick={addQuestion}>
        Add Question
      </button>
      <button className="btn mt-5 text-base-100 bg-success" onClick={submitHandler}>
        Complete
      </button>
    </div>
  );
};

export default Page;
