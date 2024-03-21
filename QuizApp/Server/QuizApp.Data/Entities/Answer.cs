using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Data.Entities
{
    public class Answer
    {
        public int Id { get; set; }

        [Required]
        public string Label { get; set; } = null!;
        public int QuestionId { get; set; }
        public required Question Question { get; set; }
    }
}
