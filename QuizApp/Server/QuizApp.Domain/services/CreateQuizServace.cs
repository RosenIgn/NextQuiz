using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Linq;
using System.Threading.Tasks;
using QuizApp.Data.Entities;
using QuizApp.Common.Requests;
using QuizApp.Common.Responses;
{
    
}

namespace QuizApp.Domain.services
{
    public class CreateQuizServace
    {
        private readonly AppDbContext _context;
        public CreateQuizServace(AppDbContext context)
        {
            _context = context;
        }
        public CreateAnswerResponse CreateAnswer(CreateAnswerRequest answerRequest)
        {
            Answer answer =new Answer
            {
                answer.Text=answerRequest.Text;
                answer.Correct=answerRequest.Correct;
                answer.QuestionId=answerRequest.QuestionId;
            }
            _context.Answers.Add(answer);
            _context.SaveChanges();

            CreateAnswerResponse response=new CreateAnswerResponse
            {
                response.Id=answer.Id;
                response.Text=answer.Text;
                response.Correct=answer.Correct;
                response.QuestionId=answer.QuestionId;
            }
            return response;
        }

        public CreateQuestionResponse CreateQuestion(CreateQuestionRequest request)
        {
            Question question=new Question
            {
                question.Text=response.Text;
                question.Answers=response.Answers;
                question.QuizId=response.QuizId;
            }

            _context.Questions.Add(question);
            _context.SaveChanges();

            CreateQuestionResponse response=new CreateQuestionResponse
            {
                response.Id=question.Id;
                response.Text=question.Text;
                response.Answers=question.Answers;
                response.QuizId=question.QuizId
            }

            return response;
        }

        public CreateQuizResponse CreateQuiz(CreateQuizRequest request)
        {
            Quiz quiz = new Quiz
            {
                quiz.Name=request.Name;
                quiz.Questions=request.Questions;
            }
        }
    }
}