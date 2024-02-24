using Microsoft.EntityFrameworkCore;
using Server.API.Data.Entities;
using System.Collections.Generic;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
    public DbSet<Users> Users { get; set; }

}
