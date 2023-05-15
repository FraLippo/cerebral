using CerebralCore.Models;
using Microsoft.AspNetCore.Mvc;
using ReactCoreCerebral.Models;
using System.Linq;
using System.Threading.Tasks;
using System;
using ReactCoreCerebral.Donnees;
using System.Collections.Generic;
using System.Globalization;
using System.Threading;
using System.Security.Cryptography.X509Certificates;

namespace ReactCoreCerebral.Controllers
{
    public class RapiditeController : Controller
    {
        private readonly TableauContext _dbTableau;


        public RapiditeController(TableauContext dbTableau)
        {
            _dbTableau = dbTableau;
        }


        public async Task<IActionResult> Resultat(string typeExo, int score, string prenom)
        {
            var ancienResultat = _dbTableau.Resultat2019.FirstOrDefault(x => x.prenom == prenom && x.typeExo == typeExo);
            if (ancienResultat != null)
            {
                if (score > ancienResultat.nbFaute)
                {
                    ancienResultat.date = DateTime.Now;
                    ancienResultat.nbFaute = score;
                }

            }
            else
            {
                Resultat2019 newResultat = new() { typeExo = typeExo, date = DateTime.Now, prenom = prenom, nbFaute = score, noExo = 999 };
                _dbTableau.Resultat2019.Add(newResultat);
            }
            await _dbTableau.SaveChangesAsync();

            var classement = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo && x.nbFaute > score).Count() + 1;
            var nbJoueurs = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo).Count();
            var moyenne = Math.Round(_dbTableau.Resultat2019.Where(x => x.typeExo == typeExo).Average(x => x.nbFaute), 2);
            var meilleur = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo).Max(x => x.nbFaute);


            return Ok(new { classement, nbJoueurs, moyenne, meilleur, prenom });
        }

        public IEnumerable<DTOClassementScore> Classement(string typeExo)
        {
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");
            var classement = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo && x.date >= startDate && x.date <= endDate).OrderByDescending(x => x.nbFaute).ThenByDescending(x => x.date).Take(20).
                Select(x => new DTOClassementScore() { Cle = 0, Prenom = x.prenom, Date = x.date.HasValue ? x.date.Value.ToShortDateString() : "", Score = x.nbFaute }).ToList();
            for (int i = 0; i < classement.Count; i++)
            {
                classement[i].Cle = i;
            }


            return classement;
        }

        public DTOInfoClassement ClassementMois(string prenom)
        {
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");

            var classement =
                             (from sc in _dbTableau.Resultat2019
                              where sc.noExo == 999 && sc.date >= startDate && sc.date <= endDate
                              group sc by sc.prenom into grouping
                              select new DTOClassement
                              {
                                  Cle = 0,
                                  Prenom = grouping.Key,
                                  Score = grouping.Sum(x => x.nbFaute),
                                  Position = 0

                              }).OrderByDescending(x => x.Score).ToList();

            int position = 0;
            int scorePrecedent = 0;
            int positionJoueur = 0;
            int scoreJoueur = 0;
            for (int i = 0; i < classement.Count; i++)
            {
                if (scorePrecedent != classement[i].Score)
                {
                    position = i+1;
                  
                }
                classement[i].Position = position;

                if (classement[i].Prenom == prenom)
                {
                    positionJoueur = position;
                    scoreJoueur = classement[i].Score;
                }
           
                scorePrecedent = classement[i].Score;   
                classement[i].Cle = i;
            }

            var classementJoueur = _dbTableau.Resultat2019.Where(x => x.noExo == 999 && x.date >= startDate && x.date <= endDate && x.prenom == prenom).Select( x => new DTOResultatJoueur() { NomJeu = x.typeExo, Score = x.nbFaute}).ToList();

            DTOInfoClassement DTOInfoJoueur = new() { ClassementJoueurs = classement, Classement = positionJoueur, Resultats = classementJoueur, ScoreTotal = scoreJoueur };                      
            return DTOInfoJoueur;
        }

        public IEnumerable<String> ClassementPodium()
        {
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");

            var classement =
                             (from sc in _dbTableau.Resultat2019
                              where sc.noExo == 999 && sc.date >= startDate && sc.date <= endDate
                              group sc by sc.prenom into grouping
                              select new DTOClassement
                              {
                                  Cle = 0,
                                  Prenom = grouping.Key,
                                  Score = grouping.Sum(x => x.nbFaute),
                                  Position = 0

                              }).OrderByDescending(x => x.Score).Take(3).Select(x => x.Prenom).ToList();
         
            
                for (int i = classement.Count; i < 3; i++)
                {
                    classement.Add("?");
                }
            
           

            return classement;
        }


    }
}
