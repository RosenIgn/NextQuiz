using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.API.Data.Entities
{
    public class Answer
    {
        public Answer(string text, bool right,string QuestionId)
        {
            Text=text;

        }

        public Answer()
        {
            
        }

        [Key]
        [Required]
        public string Id { get; init; } = Guid.NewGuid().ToString();

        
        public string Text { get; set; }

        [Required]
        public bool Right { get; set; } 

        [Required]
        public string QuestionId { get; set; } 


    }
}