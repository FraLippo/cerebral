using Microsoft.AspNetCore.Mvc;
using ReactCoreCerebral.Services;
using System.Threading.Tasks;

namespace ReactCoreCerebral.Controllers
{
    public class GptRequest
    {
        public string Message { get; set; }
    }
    [ApiController]
    [Route("api/chatgpt")]
    public class ChatGptController : ControllerBase
    {
        private readonly OpenAiService _openAiService;

        public ChatGptController(OpenAiService openAiService)
        {
            _openAiService = openAiService;
        }

        [HttpPost("envoyermessage")]
        public async Task<IActionResult> EnvoyerMessage([FromBody] GptRequest input)
        {
            var reponse = await _openAiService.EnvoyerMessageAsync(input.Message);
            return Ok(reponse);
        }
    }
}
