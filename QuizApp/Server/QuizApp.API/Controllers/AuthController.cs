using QuizApp.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using QuizApp.Data;
using QuizApp.Common.Requests.Auth;
using Microsoft.AspNetCore.Identity;
using QuizApp.Common.Requests;
using QuizApp.Domain.Services.JwtService;

namespace QuizApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IPasswordHasher<User> _passwordHasher;
        
        public AuthController(AppDbContext context)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _passwordHasher = passwordHasher;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] CreateLoginRequest userData)
        {
            var user = await _userManager.FindByNameAsync(userData.Username);
            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user, userData.Password, false, false);
                if (result.Succeeded) 
                {
                    return Ok("I'm in");
                }
                return Ok("Batak si, wrong info");
            }
            else 
            {
                return Ok("not found account");
            }
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] CreateRegisterRequest registerData)
        {
            User user = new()
            {
                UserName = registerData.Username,
                NormalizedUserName = registerData.Username.ToUpper(),
                Email = registerData.Email,
                NormalizedEmail = registerData.Email.ToUpper()
            };
            user.PasswordHash = _passwordHasher.HashPassword(user, registerData.Password);
            
            await _userManager.CreateAsync(user);
            
            return Ok("Registration successful");
        }
    }
}