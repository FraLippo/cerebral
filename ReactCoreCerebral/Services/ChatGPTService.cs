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
Voici les résultats d'un test cognitif standardisé.

Les scores sont indexés sur une moyenne de 100 :
- 100 correspond à un niveau moyen
- un score supérieur à 100 indique une performance au-dessus de la moyenne
- certains très bons profils peuvent dépasser largement 100
Résultats :
  Mémoire : {resultatCategorie.GetValueOrDefault("m")}
   Calcul : {resultatCategorie.GetValueOrDefault("c")}
Planification: {resultatCategorie.GetValueOrDefault("p")}
Aptitude verbale : {resultatCategorie.GetValueOrDefault("l")}
Concentration: {resultatCategorie.GetValueOrDefault("r")}
Culture générale : {resultatCategorie.GetValueOrDefault("d")}
Consignes :
1. Analyse le profil cognitif de manière objective et structurée.
2. Propose 4 métiers adaptés au profil.
   - Suggestions réalistes uniquement
   - Cohérentes avec les capacités observées
3. Pour chaque métier :
   - Explique le lien avec les compétences mesurées
   - Mentionne les limites possibles du profil
4. Propose 1 ou 2 axes d'amélioration concrets.
Ton :
- Neutre, factuel et professionnel
- Aucun humour
- Aucun langage affectif ou exagérément positif
- Analyse directe des forces et faiblesses
Contraintes importantes :
- Utilise le tutoiement
- Réponds uniquement en HTML (sans <html>, <body> ni CSS)
- Réponse STRICTEMENT limitée à 500 caractères maximum
- Sois extrêmement concis
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
