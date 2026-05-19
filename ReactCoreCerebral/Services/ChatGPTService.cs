using Azure.Core;
using CerebralCore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReactCoreCerebral.Controllers;
using ReactCoreCerebral.Donnees;
using ReactCoreCerebral.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ReactCoreCerebral.Services
{
    public class ChatGPTService
    {

        private readonly OpenAiService _openAiService;
        private readonly TableauContext _dbTableau;

        public ChatGPTService(OpenAiService openAiService, TableauContext dbTableau)
        {
            _openAiService = openAiService;
            _dbTableau = dbTableau;
        }
        

        public async Task<string> ObtenirResultatGpt(string prenom, int scoreTotal, Dictionary<string, int> classements)
        {
      
                var requeteGpt = PreparerRequeteGpt(classements);
                var reponseGpt = await EnvoyerMessage(requeteGpt, prenom, scoreTotal);
                return reponseGpt;
       
        }
        private static string PreparerRequeteGpt(Dictionary<string, int> resultatCategorie)
        {
            return $@"
Voici les résultats d'un test cognitif standardisé (scores /100) :

Mémoire : {resultatCategorie.GetValueOrDefault("m")}
Calcul : {resultatCategorie.GetValueOrDefault("c")}
Planification : {resultatCategorie.GetValueOrDefault("p")}
Aptitude verbale : {resultatCategorie.GetValueOrDefault("l")}
Concentration : {resultatCategorie.GetValueOrDefault("r")}
Culture générale : {resultatCategorie.GetValueOrDefault("d")}

Consignes :

1. Analyse le profil cognitif de manière objective et structurée.

2. Propose 4 métiers adaptés au profil du joueur.
   - Chaque proposition doit être cohérente avec ses forces réelles
   - Évite toute suggestion irréaliste ou flatteuse

3. Pour chaque métier :
   - Explique précisément le lien avec les compétences mesurées
   - Mentionne clairement les limites ou fragilités du profil qui peuvent poser difficulté dans ce métier

4. Propose 1 à 2 axes d'amélioration concrets et réalistes pour améliorer les performances cognitives globales.

Ton :
- Neutre, factuel et professionnel
- Aucun humour
- Aucun jugement moral ou dévalorisation
- Pas de langage affectif ou motivant exagéré
- Analyse directe des forces et faiblesses

Contraintes :
- Utilise le tutoiement
- Réponds uniquement en HTML (sans <html>, <body>, ni CSS)
";

        }
        public async Task<string> EnvoyerMessage(string requete, string prenom, int scoreTotal)
        {
            var reponse = "";
            bool maj = false;

            var resultatUser = await _dbTableau.ReponseIA.FirstOrDefaultAsync(x => x.IdUser == prenom);

            if (resultatUser == null)
            {
                resultatUser = new ReponseIA() { Date = DateTime.Now, IdUser = prenom, Score = scoreTotal };
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
                if (scoreTotal > resultatUser.Score + 500 & !moisDifferents)
                {
                    change = true;
                }
                if (change)
                {
                    resultatUser.Date = DateTime.Now;
                    resultatUser.Score = scoreTotal;
                    maj = true;
                }
                else
                {
                    reponse = resultatUser.TexteIA;
                }
            }

            if (maj)
            {
                reponse = await _openAiService.EnvoyerMessageAsync(requete);
                resultatUser.TexteIA = reponse;
            }
            await _dbTableau.SaveChangesAsync();
            return reponse;

        }
    }

}
