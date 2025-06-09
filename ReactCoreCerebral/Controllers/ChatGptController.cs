using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCoreCerebral.Models;
using ReactCoreCerebral.Services;
using System;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ReactCoreCerebral.Controllers
{
    public class GptRequest
    {
        public string Message { get; set; }
        public string Prenom { get;set; }
        public int Score { get; set; }
    }
    [ApiController]
    [Route("api/chatgpt")]
    public class ChatGptController : ControllerBase
    {
        private readonly OpenAiService _openAiService;
        private readonly TableauContext _dbTableau;

        public ChatGptController(OpenAiService openAiService, TableauContext dbTableau)
        {
            _openAiService = openAiService;
            _dbTableau = dbTableau;
        }

        [HttpPost("envoyermessage")]
        public async Task<IActionResult> EnvoyerMessage([FromBody] GptRequest input)
        {
            var reponse = "";
            bool maj = false;
            if (input == null)
            {
                return BadRequest(string.Empty);
            }
                var resultatUser = await _dbTableau.ReponseIA.FirstOrDefaultAsync(x => x.IdUser == input.Prenom);

            if (resultatUser == null)
            {
                resultatUser = new ReponseIA() { Date = DateTime.Now, IdUser = input.Prenom, Score = input.Score };
                maj = true;
                _dbTableau.Add(resultatUser);
            }
            else
            {
                var change = false;
                var dj = DateTime.Now;
                bool moisDifferents = dj.Month != resultatUser.Date.Month || dj.Year != resultatUser.Date.Year;
                if (moisDifferents)
                {
                    change = true;
                }
                if (input.Score > resultatUser.Score + 200 & !moisDifferents)
                {
                    change = true;
                }
                if (change)
                {
                    resultatUser.Date = DateTime.Now;
                    resultatUser.Score = input.Score;
                    maj = true;
                }
                else
                {
                    reponse = resultatUser.TexteIA;
                }
            }
         
            if (maj)
            {
                reponse = await _openAiService.EnvoyerMessageAsync(input.Message);
                resultatUser.TexteIA = reponse;
            }
            await _dbTableau.SaveChangesAsync();
            return Ok(reponse);
           
        }
    }
}
