using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Data.Entities
{
    public class Question
    {
        public Question()
        {
            
        }

        [Key]
        [Required]
        public string Id { get; init; } = Guid.NewGuid().ToString();

        
        public string Text { get; set; } 

        
        public List<Answer> Answers { get; set; } = new List<Answer>();

        [Required]
        public string QuizId { get; set; }
    }
}