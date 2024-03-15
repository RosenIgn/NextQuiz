using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Common.Requests.Auth
{
    public class CreateInfoRequest
    {
        public string CurrentUsername { get; set; } = null!;
        [Required(ErrorMessage = "Username is required.")]
        [MinLength(5, ErrorMessage = "Username must be at least 5 characters.")]
        [MaxLength(20, ErrorMessage = "Username cannot be longer than 20 characters.")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [MinLength(6, ErrorMessage = "Email must be at least 6 characters.")]
        [MaxLength(100, ErrorMessage = "Email cannot be longer than 100 characters.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
        [MaxLength(30, ErrorMessage = "Password cannot be longer than 30 characters.")]
        public string Password { get; set; } = null!;
    }
}