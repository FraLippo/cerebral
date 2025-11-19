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


        public async Task<IActionResult> Resultat(string typeExo, int score, string prenom, string categorie)
        {
            prenom ??= "inconnuX"; // Pour éviter les nulls dans la base de données
            var ancienResultat = _dbTableau.Resultat2019.FirstOrDefault(x => x.prenom == prenom && x.typeExo == typeExo);
            var ancienScore = 0;
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1);
            if (ancienResultat != null)
            {

                ancienScore = ancienResultat.nbFaute;
                if (score > ancienResultat.nbFaute || !(ancienResultat.date >= startDate && ancienResultat.date < endDate))
                {
                    ancienResultat.date = DateTime.Now;
                    ancienResultat.nbFaute = score;
                }
            }
            else
            {
                Resultat2019 newResultat = new() { typeExo = typeExo, date = DateTime.Now, prenom = prenom, nbFaute = score, noExo = 999, listeFautes = categorie };
                _dbTableau.Resultat2019.Add(newResultat);
            }
            await _dbTableau.SaveChangesAsync();

            var classement = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo && x.nbFaute > score).Count() + 1;
            var nbJoueurs = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo).Count();
            var moyenne = Math.Round(_dbTableau.Resultat2019.Where(x => x.typeExo == typeExo).Average(x => x.nbFaute), 2);
            var ancien = ancienScore;


            return Ok(new { classement, nbJoueurs, moyenne, ancien, prenom });
        }

        public DTOCategorie Categorie(string prenom, string categorie)
        {
            prenom ??= "inconnuX"; // Pour éviter les nulls dans la base de données
            DTOCategorie resultCategorie = new();
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1);
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");
            var classement =
                             (from sc in _dbTableau.Resultat2019
                              where sc.noExo == 999 && sc.date >= startDate && sc.date < endDate && sc.listeFautes == categorie
                              group sc by sc.prenom into grouping
                              select new DTOClassement
                              {
                                  Cle = 0,
                                  Prenom = grouping.Key,
                                  Score = grouping.Sum(x => x.nbFaute),
                                  Position = 0

                              }).OrderByDescending(x => x.Score).Take(3).ToList();
            for (int i = 0; i < classement.Count; i++)
            {
                classement[i].Cle = i;
            }
            resultCategorie.ClassementCategorie = classement;

            if (prenom != "" && prenom != "inconnuX")
            {
                //Liste de tous les scores par jeu de la catégorie
                var resultatsJoueur = _dbTableau.Resultat2019.Where(x => x.listeFautes == categorie && x.prenom == prenom && x.date >= startDate && x.date < endDate)
                .ToDictionary(x => x.typeExo, x => x.nbFaute);
                resultCategorie.ResultatsJoueur = resultatsJoueur;

                //score du joueur dans la catégorie 
                var totalJoueur = resultatsJoueur.Values.Sum();
                resultCategorie.ScoreJoueur = totalJoueur;

                //classement du joueur dans la catégorie
                var joueursDevant =
     (from sc in _dbTableau.Resultat2019
      where sc.listeFautes == categorie
         && sc.date >= startDate
         && sc.date < endDate
      group sc by sc.prenom into g
      where g.Sum(x => x.nbFaute) > totalJoueur
      select g.Key).Count();
                resultCategorie.ClassementJoueur = joueursDevant + 1;



            }


            return resultCategorie;
        }

        public DTOClassementPosition Classement(string typeExo, string prenom)
        {
         
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1);
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");
            var classement = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo && x.date >= startDate && x.date < endDate).OrderByDescending(x => x.nbFaute).ThenByDescending(x => x.date).Take(20).
                Select(x => new DTOClassementScore() { Cle = 0, Prenom = x.prenom, Date = x.date.HasValue ? x.date.Value.ToShortDateString() : "", Score = x.nbFaute }).ToList();
            for (int i = 0; i < classement.Count; i++)
            {
                classement[i].Cle = i;
            }
            var score = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo && x.date >= startDate && x.date < endDate && x.prenom == prenom).Select(x => x.nbFaute).FirstOrDefault();

            var position = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo && x.date >= startDate && x.date < endDate && x.nbFaute > score).Count() + 1;
            var classementPosition = new DTOClassementPosition() { ClassementScores = classement, Position = position, Score = score };



            return classementPosition;
        }

        public DTOInfoClassement ClassementMois(string prenom)
        {
            prenom ??= "inconnuX"; // Pour éviter les nulls dans la base de données
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1);
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");

            var classement =
                             (from sc in _dbTableau.Resultat2019
                              where sc.noExo == 999 && sc.date >= startDate && sc.date < endDate
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
                    position = i + 1;

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

            var classementsJoueur = _dbTableau.Resultat2019.Where(x => x.noExo == 999 && x.date >= startDate && x.date < endDate && x.prenom == prenom).Select(x => new DTOResultatJoueur() { NomJeu = x.typeExo, Score = x.nbFaute, Categorie = x.listeFautes }).ToList();

            DTOInfoClassement DTOInfoJoueur = new() { ClassementJoueurs = classement.Take(10), NbJoueurs = classement.Count, Classement = positionJoueur, Resultats = classementsJoueur, ScoreTotal = scoreJoueur };
            return DTOInfoJoueur;
        }

        public IEnumerable<DTOPodium> ClassementPodium()
        {
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1);
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");

            var classement =
                             (from sc in _dbTableau.Resultat2019
                              where sc.noExo == 999 && sc.date >= startDate && sc.date < endDate
                              group sc by sc.prenom into grouping
                              select new DTOClassement
                              {
                                  Cle = 0,
                                  Prenom = grouping.Key,
                                  Score = grouping.Sum(x => x.nbFaute),
                                  Position = 0

                              }).OrderByDescending(x => x.Score).Take(3).Select(x => new DTOPodium { Prenom = x.Prenom, Score = x.Score }).ToList();


            for (int i = classement.Count; i < 3; i++)
            {
                classement.Add(new DTOPodium { Prenom = "?", Score = 0 });
            }



            return classement;
        }


    }
}
