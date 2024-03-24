using System.ComponentModel.DataAnnotations;

namespace QuizApp.Common.Requests.Auth
{
    public class ChangePasswordRequest
    {
        public string CurrentUsername { get; set; } = null!;
        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
        [MaxLength(30, ErrorMessage = "Password cannot be longer than 30 characters.")]
        public string Password { get; set; } = null!;
        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
    }
}