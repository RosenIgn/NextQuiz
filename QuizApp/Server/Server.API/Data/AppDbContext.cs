using Microsoft.EntityFrameworkCore;
using Server.API.Data.Entities;
using System.Collections.Generic;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) //how to get default connection string from appsettings.json
    // {
    //     if (!optionsBuilder.IsConfigured)
    //     {
    //         // optionsBuilder.UseSqlServer("Server=.;Database=QuizDB;Trusted_Connection=True;TrustServerCertificate=True;");
    //         optionsBuilder.UseSqlServer(_configuration["ConnectionStrings:DbConnection"]);
    //     }
    // }
    public DbSet<Users> Users { get; set; }

}
