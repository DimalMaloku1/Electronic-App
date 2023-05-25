using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ElectroShop.DTO;
using ElectroShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ElectroShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var userRoleExists = await _roleManager.RoleExistsAsync("User");
            if (!userRoleExists)
            {
                var userRole = new IdentityRole("User");
                var userRoleResult = await _roleManager.CreateAsync(userRole);
                if (!userRoleResult.Succeeded)
                {
                    return BadRequest(userRoleResult.Errors);
                }
            }

            var adminRoleExists = await _roleManager.RoleExistsAsync("Admin");
            if (!adminRoleExists)
            {
                var adminRole = new IdentityRole("Admin");
                var adminRoleResult = await _roleManager.CreateAsync(adminRole);
                if (!adminRoleResult.Succeeded)
                {
                    return BadRequest(adminRoleResult.Errors);
                }
            }

            await _userManager.AddToRoleAsync(user, "User");

            return Ok();
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return BadRequest("Invalid login attempt");
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            var token = await GenerateJwtTokenAsync(user);

            return Ok(new { Token = token });
        }


        private async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
        {
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        new Claim(JwtRegisteredClaimNames.UniqueName, user.Id),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.NameIdentifier, user.Id),


    };

            // Get the user's roles
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(1);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Get the current user's email
            string userEmail = User.FindFirstValue(ClaimTypes.Email);

            // Sign the user out
            await _signInManager.SignOutAsync();

            // Return information about the logged out user
             return Ok(new { message = $"User {userEmail} has been logged out." });
        }


        [Authorize(Roles = "User")]
        [HttpPost("makeAdmin")]
        public async Task<IActionResult> MakeAdmin(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            // Check if user already has the "Admin" role
            if (userRoles.Contains("Admin"))
            {
                return BadRequest("User is already an admin");
            }

            // Remove all existing roles
            var removeResult = await _userManager.RemoveFromRolesAsync(user, userRoles);
            if (!removeResult.Succeeded)
            {
                return BadRequest(removeResult.Errors);
            }

            // Add the "Admin" role
            var addResult = await _userManager.AddToRoleAsync(user, "Admin");
            if (!addResult.Succeeded)
            {
                return BadRequest(addResult.Errors);
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var userDTOs = new List<UserDTO>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                var userDTO = new UserDTO
                {
                    Id = user.Id,
                    Email = user.Email,
                    Roles = roles.ToList()
                };

                userDTOs.Add(userDTO);
            }

            return Ok(userDTOs);
        }

        [HttpGet("usersWithUserRole")]
        public IActionResult GetUsersWithUserRole()
        {
            var users = _userManager.GetUsersInRoleAsync("User").Result;
            var userDTOs = users.Select(user => new UserDTO
            {
                Id = user.Id,
                Email = user.Email
            }).ToList();

            return Ok(userDTOs);
        }
        [HttpGet("usersWithAdminRole")]
        public IActionResult GetUsersWithAdminRole()
        {
            var usersWithAdminRole = _userManager.GetUsersInRoleAsync("Admin").Result;

            var userDTOs = usersWithAdminRole.Select(user => new UserDTO
            {
                Id = user.Id,
                Email = user.Email
            }).ToList();

            return Ok(userDTOs);
        }
    }
}
