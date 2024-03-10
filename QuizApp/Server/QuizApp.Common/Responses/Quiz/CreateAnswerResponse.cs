using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Common.Responses.Quiz
{
    public class CreateAnswerResponse
    {
        [Required]
        public string Id{ get; set; }
        
        public string Text { get; set; }

        [Required]
        public bool Correct { get; set; } 

        [Required]
        public string QuestionId { get; set; } 
    }
}