using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using QuizApp.Common.Requests;

namespace QuizApp.Common.Requests
{
    public class CreateAnswerRequest
    {
        public string Text { get; set; }

        [Required]
        public bool Correct { get; set; } 

        [Required]
        public string QuestionId { get; set; } 
    }
}