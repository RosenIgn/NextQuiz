using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.API.Data.Entities
{
    public class Quiz
    {
        public Quiz()
        {

        }

        [Key]
        [Required]
        public string Id { get; init; } = Guid.NewGuid().ToString();

        [Required]
        public string Name { get; set; } 

        [Required]
        public List<Question> Questions { get; set; } = new List<Question>();
    }
}