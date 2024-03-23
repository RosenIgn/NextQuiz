using System.ComponentModel.DataAnnotations;

namespace QuizApp.Common.Requests.Quiz
{
    public class CreateQuizRequest
    {
        [Required]
        public string[] Options { get; set; } = null!;
        [Required]
        public string Question { get; set; } = null!;
        [Required]
        public string SelectedOption { get; set; } = null!;
        [Required]
        public int Point { get; set; }
    }
}