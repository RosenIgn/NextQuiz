using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Common.Requests.Quiz;
using QuizApp.Data;
using QuizApp.Data.Entities;

namespace QuizApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreateQuizController : Controller
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        public CreateQuizController(AppDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpPost("CreateQuiz")]
        public IActionResult CreateQuiz([FromBody] List<CreateQuizRequest> quizData)
        {
            Random random = new();
            int randomNumber = random.Next(100000, 1000000);
            string quizCode = randomNumber.ToString();

            Quiz quiz = new()
            {
                Code = quizCode
            };

            _dbContext.Quizzes.Add(quiz);

            foreach (var questionData in quizData)
            {

                Question question = new()
                {
                    Label = questionData.Question,
                    CorrectAnswer = questionData.SelectedOption,
                    Quiz = quiz
                };

                _dbContext.Questions.Add(question);

                foreach (var answerData in questionData.Options)
                {
                    Answer answer = new()
                    {
                        Label = answerData,
                        Question = question
                    };

                    _dbContext.Answers.Add(answer);
                }
            }
            try
            {
                _dbContext.SaveChanges();
                return Ok(quiz.Code);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while saving the quiz.");
            }
        }
    }
}