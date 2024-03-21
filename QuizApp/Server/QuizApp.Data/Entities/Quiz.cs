using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Data.Entities
{
    public class Quiz
    {
        [Key]
        [Required]
        public string Code { get; set; } = null!;

        public List<Question> Questions { get; set; } = [];
    }
}
