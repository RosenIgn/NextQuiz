using Microsoft.EntityFrameworkCore;
// using Server.API.Data.Entities;
using System.Collections.Generic;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    // public DbSet<Quiz> Quizes { get; set; }
    // public DbSet<Question> Questions { get; set; }
    // public DbSet<Answer> Answers { get; set; }

}
