using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Common.Responses.Quiz
{
    public class CreateQuizResponse
    {
         [Required]
        public string Id{ get; set; }
         [Required]
        public string Name { get; set; } 

        [Required]
        public List<Question> Questions { get; set; } = new List<Question>();
    }
}