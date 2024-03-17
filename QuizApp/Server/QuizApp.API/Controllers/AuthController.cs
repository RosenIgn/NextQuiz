using QuizApp.Data.Entities;
using Microsoft.AspNetCore.Mvc;
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
            if (userData.Username == "" || userData.Password == "")
            {
                return Ok(new { message = $"You have not entered a username or password." }); //do it with global var
            }
            var user = await _userManager.FindByNameAsync(userData.Username);
            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user, userData.Password, false, false);
                if (result.Succeeded)
                {
                    var userId = await _userManager.GetUserIdAsync(user);
                    var jwt = _jwtService.Generate(userId);

                    return Ok(new { Jwt = jwt, Success = true });
                }
                return Ok(new { message = "The password you entered is incorrect, please try again." }); //do it with global var
            }
            else
            {
                return Ok(new { message = $"No account found with username {userData.Username}." }); //do it with global var
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] CreateRegisterRequest registerData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = new()
            {
                UserName = registerData.Username,
                NormalizedUserName = registerData.Username.ToUpper(),
                Email = registerData.Email,
                NormalizedEmail = registerData.Email.ToUpper()
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, registerData.Password);

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }

            return Ok(new { message = $"Registration successful" }); //do it with global var
        }

        [HttpGet("GetUser")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");
                if (!string.IsNullOrEmpty(jwt))
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

        [HttpPost("ChangeUserData")]
        public async Task<IActionResult> ChangeUserData([FromBody] CreateUserDataRequest infoData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(infoData.CurrentUsername);

            if (user == null)
            {
                return Ok(new { message = $"No account found with username {infoData.CurrentUsername}." }); //do it with global var
            }
            var verificationResult = _passwordHasher.VerifyHashedPassword(user, infoData.CurrentPassword, infoData.Password);
            if (verificationResult == PasswordVerificationResult.Success)
            {
                user.UserName = infoData.Username;
                user.Email = infoData.Email;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    return BadRequest(ModelState);
                }
                return Ok(new { message = $"Success", Success = true }); //do it with global var
            }
            else
            {
                return Ok(new { message = $"The password is not correct." }); //do it with global var
            }
        }
        [HttpPost("ChangeUserPassword")]
        public async Task<IActionResult> ChangeUserPassword([FromBody] ChangePasswordRequest data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(data.CurrentUsername);

            if (user == null)
            {
                return Ok(new { message = $"No account found with username {data.CurrentUsername}." }); //do it with global var
            }
            var verificationResult = _passwordHasher.VerifyHashedPassword(user, data.CurrentPassword, data.Password);
            if (verificationResult == PasswordVerificationResult.Success)
            {
                user.PasswordHash = _passwordHasher.HashPassword(user, data.Password);
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    return BadRequest(ModelState);
                }

                return Ok(new { message = $"Success", Success = true }); //do it with global var
            }
            else
            {
                return Ok(new { message = $"The password is not correct." }); //do it with global var
            }
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            Response.Cookies.Delete("jwt");
            return Ok("success");
        }
    }
}