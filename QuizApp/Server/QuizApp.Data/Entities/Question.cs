using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Data.Entities
{
    public class Question
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Label { get; set; } = null!;
        [Required]
        public string CorrectAnswer { get; set; } = null!;
        [Required]
        public int Point { get; set; }
        [Required]
        public required Quiz Quiz { get; set; }
        [Required]
        public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}
