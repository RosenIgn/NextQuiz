using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Common.Requests.Quiz
{
    public class GetQuizRequest
    {
        public int Id { get; set; }
        public string Question { get; set; } = null!;
        public List<string> Options { get; set; } = null!;
        public string CorrectOption { get; set; } = null!;
        public int Points { get; set; }
    }
}