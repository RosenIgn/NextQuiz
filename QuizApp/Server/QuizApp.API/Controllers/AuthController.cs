using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Server.API.Data.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly AppDbContext _context;
        
        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] Users formData)
        {
            string username = formData.Username;
            string email = formData.Email;
            string password = formData.Password;
            Users user = new Users(formData.Id, username, email, password);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Registration successful");
        }
    }
}