using System.ComponentModel.DataAnnotations;


namespace QuizApp.Data.Entities
{
    public class Users
    {
        public Users()
        {

        }
        public Users(string id, string username, string email, string password)
        {
            Id = id;
            Username = username;
            Email = email;
            Password = password;
        }

        [Key]
        public string Id { get; init; } = Guid.NewGuid().ToString();
        [Required]
        public string Username { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        [Required]
        public string Password {get; set; } = null!;
    }
}