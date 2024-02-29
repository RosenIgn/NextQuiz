using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Common.Requests.Auth
{
    public class RegisterCredentialsRequest
    {
        public string Id { get; init; } = Guid.NewGuid().ToString();
        [Required]
        [MinLength(5)]
        [MaxLength(20)]
        public string Username { get; set; } = null!;
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        [MinLength(8)]
        [MaxLength(30)]
        public string Password { get; set; } = null!;
    }
}