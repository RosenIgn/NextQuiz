using QuizApp.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using QuizApp.Data;
using QuizApp.Common.Requests.Auth;
using QuizApp.Domain.Services.JwtService;

namespace QuizApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly AppDbContext _context;
        
        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
        }

        // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterCredentialsRequest formData)
        {
            Users user = new(formData.Id, formData.Username, formData.Email, formData.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Registration successful");
        }
    }
}