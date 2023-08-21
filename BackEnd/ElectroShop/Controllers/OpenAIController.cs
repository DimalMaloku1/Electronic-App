using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Completions;
using ElectroShop.Models;
using ElectroShop.DTO;
using Microsoft.AspNetCore.Identity;
using ElectroShop.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace ElectroShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenAIController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly MyWorldDbContext _myWorldDbContext;
        private readonly IMapper _mapper;

        public OpenAIController(UserManager<ApplicationUser> userManager, MyWorldDbContext myWorldDbContext, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _myWorldDbContext = myWorldDbContext;
        }

        [HttpPost("getresult")]
       
        public async Task<IActionResult> GetResult([FromBody] MessageDTO messageDto)
        {
            try
            {
                string apikey = "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";
                var openai = new OpenAIAPI(apikey);
                CompletionRequest completion = new CompletionRequest();
                completion.Prompt = messageDto.UserMessage;
                completion.Model = OpenAI_API.Models.Model.DavinciText;
                completion.MaxTokens = 100;

                // Get the authenticated user's ID
                string userId = _userManager.GetUserId(User);

                // Convert UTC timestamp to Belgrade time zone
                TimeZoneInfo belgradeTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");
                DateTime belgradeTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, belgradeTimeZone);

                // Fetch the conversation for the user
                var existingConversation = await _myWorldDbContext.Conversations
                    .Include(c => c.Messages)
                    .FirstOrDefaultAsync(c => c.UserId == userId);

                if (existingConversation == null)
                {
                    // Create a new conversation and save it to the database
                    var newConversation = new Conversation
                    {
                        Timestamp = belgradeTime,
                        UserId = userId,
                        Messages = new List<Message>()
                    };

                    _myWorldDbContext.Conversations.Add(newConversation);
                    await _myWorldDbContext.SaveChangesAsync();

                    existingConversation = newConversation;
                }
                else
                {
                    // Update the existing conversation's timestamp
                    existingConversation.Timestamp = belgradeTime;
                    await _myWorldDbContext.SaveChangesAsync();
                }

                var result = await openai.Completions.CreateCompletionsAsync(completion);
                if (result != null && result.Completions.Count > 0)
                {
                    string botReply = result.Completions[0].Text;

                    // Save the message to the conversation
                    var message = new Message
                    {
                        Timestamp = belgradeTime,
                        UserId = userId,
                        UserMessage = messageDto.UserMessage,
                        BotReply = botReply,
                        Conversation = existingConversation
                    };

                    existingConversation.Messages.Add(message);
                    await _myWorldDbContext.SaveChangesAsync();

                    return Ok(new { BotReply = botReply, Timestamp = belgradeTime });
                }
                else
                {
                    return BadRequest("No response from bot");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpGet("getusermessages")]
       
        public async Task<IActionResult> GetUserMessages()
        {
            try
            {
                // Get the authenticated user's ID
                string userId = _userManager.GetUserId(User);

                // Fetch the conversation for the user
                var userConversation = await _myWorldDbContext.Conversations
                    .Include(c => c.Messages)
                    .Where(c => c.UserId == userId)
                    .FirstOrDefaultAsync();

                if (userConversation == null)
                {
                    return NotFound("User conversation not found");
                }

                var userMessages = userConversation.Messages;

                return Ok(userMessages);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
