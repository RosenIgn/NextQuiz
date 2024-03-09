using QuizApp.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using QuizApp.Data;
using QuizApp.Common.Requests.Auth;
using Microsoft.AspNetCore.Identity;
using QuizApp.Common.Requests;
using QuizApp.Domain;
using QuizApp.Data.Repositories;

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
        private readonly JwtService _jwtService;
        private readonly UserRepository _userRepository;

        public AuthController(AppDbContext dbContext, UserManager<User> userManager, SignInManager<User> signInManager, IPasswordHasher<User> passwordHasher, JwtService jwtService, UserRepository userRepository)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _passwordHasher = passwordHasher;
            _jwtService = jwtService;
            _userRepository = userRepository;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] CreateLoginRequest userData)
        {
            var user = await _userManager.FindByNameAsync(userData.Username);
            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user, userData.Password, false, false);
                if (result.Succeeded)
                {
                    var userId = await _userManager.GetUserIdAsync(user);
                    var jwt = _jwtService.Generate(userId);

                    Response.Cookies.Append("jwt", jwt, new CookieOptions
                    {
                        HttpOnly = true
                    });
                    var info = new { jwt = jwt};
                    return Ok(info);
                }
                return Ok("Batak si, wrong info");
            }
            else
            {
                return Ok("not found account");
            }
        }

        [HttpGet("GetUser")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt != null)
                {
                    var token = _jwtService.Verify(jwt);
                    string userId = token.Issuer;

                    var user = _userRepository.GetById(userId);
                    return Ok(user);
                }
                return Unauthorized();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok("success");
        }

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