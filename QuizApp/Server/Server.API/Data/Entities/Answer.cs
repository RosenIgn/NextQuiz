using System.ComponentModel.DataAnnotations;

namespace Server.API.Data.Entities
{
    public class Answer
    {
        [Required]
        public string Id { get; init; } = Guid.NewGuid().ToString();
    }
}
