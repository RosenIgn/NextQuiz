"use client";

import { useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState([{ question: "", options: [""] }]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>

      {questions.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="flex flex-row justify-center bg-base-300 space-y-4 rounded-md w-full mb-4"
        >
        <setion id="question field" className='flex flex-col mr-5'>

          <div
            className="badge mr-10 mt-10 w-1/2 self-center"
            label={`Question ${questionIndex + 1}`}
            onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
            }
            >
            {`Question ${questionIndex + 1}`}
          </div>

          <textarea className="textarea flex-row text-md w-1/2 max-h-44 mt-10 m-20">
          </textarea>

        </setion>

          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <input type="radio" name={`radio-${questionIndex + 1}`} className="radio mb-5" />
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
            {question.options.length <= 3 && (<button className="btn" onClick={() => addOption(questionIndex)}>
              Add Option
            </button>)}
          </div>

          <div
            className="btn ml-10 mb-5 self-end"
            onClick={() => removeQuestion(questionIndex)}
          >
            Remove Question
          </div>
        </div>
      ))}

      <button className="btn" onClick={addQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default Page;
