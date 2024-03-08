using QuizApp.Data.Entities;

namespace QuizApp.Data.Interfaces
{
    public interface IUserRepository
    {
        User GetById(string id);
    }
}