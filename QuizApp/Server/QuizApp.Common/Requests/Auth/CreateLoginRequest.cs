using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Common.Requests
{
    public class CreateLoginRequest
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        // [DataType(DataType.Password)]
        public string Password { get; set; } = null!;
    }
}