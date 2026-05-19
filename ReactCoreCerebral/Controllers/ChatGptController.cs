using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCoreCerebral.Models;
using ReactCoreCerebral.Services;
using System;
using System.Collections.Generic;
using System.Linq;
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
        

        [HttpPost("obtenirresultat")]
        public async Task<IActionResult> ObtenirResultat([FromBody] string prenom)
        {
            var maxScores = new Dictionary<string, int>
            {
                ["m"] = 620,
                ["c"] = 470,
                ["l"] = 600,
                ["p"] = 650,
                ["r"] = 960,
                ["d"] = 550
            };

            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1);

            var query = _dbTableau.Resultat2019
                .Where(x =>
                    x.noExo == 999 &&
                    x.date >= startDate &&
                    x.date < endDate &&
                    x.prenom == prenom);

            var data = query.ToList();

            var scoreTotal = data.Sum(x => x.nbFaute);

            var classements = data
                .GroupBy(x => x.listeFautes)
                .ToDictionary(
                    g => g.Key,
                    g => g.Sum(x => x.nbFaute)
                );

            var pourcentages = classements.ToDictionary(
                x => x.Key,
                x =>
                {
                    var max = maxScores.GetValueOrDefault(x.Key, 1);
                    return (int)Math.Round((double)x.Value / max * 100);
                }
            );

            var reponse = await new ChatGPTService(_openAiService, _dbTableau)
                .ObtenirResultatGpt(prenom, scoreTotal, pourcentages);
            return Ok(reponse);

        }
    }
}
