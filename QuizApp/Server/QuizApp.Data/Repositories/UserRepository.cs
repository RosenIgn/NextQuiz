using QuizApp.Data.Entities;
using QuizApp.Data.Interfaces;

namespace QuizApp.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;
        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User GetById(string id)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Id == id);
        }
    }
}