using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizApp.Domain.services;

namespace QuizApp.API.Controllers
{
    public class CreateQuizController
    {
        private readonly AppDbContext _context;
        CreateQuizServace servace;

        public CreateQuizController(AppDbContext context)
        {
            _context = context;
            servace==new CreateQuizServace(_context);
        }

        [HttpPost("Create")]
        public IActionResponse CreateAnswer(CreateAnswerRequest request)
        {
            CreateAnswerResponse response = servace.CreateAnswer(request);

            return Ok(response.Id)
        }

        public IActionResponse CreateQuestion(CreateQuestonRequest request)
        {
            CreateQuestionResponse response=servace.CreateQuestion(request);
            return Ok(response.Id)
        }
    }
}