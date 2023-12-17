using System.ComponentModel.DataAnnotations;

namespace Server.API.Data.Entities
{
    public class Question
    {
        [Required]
        public string Id { get; init; } = Guid.NewGuid().ToString();
    }
}
