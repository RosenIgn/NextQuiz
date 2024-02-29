using Microsoft.EntityFrameworkCore;
using QuizApp.Data.Entities;
using System.Collections.Generic;

namespace QuizApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }

    }
}