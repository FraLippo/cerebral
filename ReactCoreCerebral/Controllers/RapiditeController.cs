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

namespace ReactCoreCerebral.Controllers
{
    public class RapiditeController : Controller
    {
        private readonly  TableauContext _dbTableau;


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
                Resultat2019 newResultat = new() { typeExo = typeExo, date = DateTime.Now, prenom = prenom, nbFaute = score };
                _dbTableau.Resultat2019.Add(newResultat);
            }
                await _dbTableau.SaveChangesAsync();

            var classement = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo && x.nbFaute > score).Count() + 1;
            var nbJoueurs = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo).Count();
            var moyenne = Math.Round(_dbTableau.Resultat2019.Where(x => x.typeExo == typeExo).Average(x => x.nbFaute), 2);
            var meilleur = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo).Max(x => x.nbFaute);


            return Ok(new { classement, nbJoueurs, moyenne, meilleur, prenom});
        }

        public IEnumerable<DTOClassementScore> Classement(string typeExo)
        {
          
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");
            var classement = _dbTableau.Resultat2019.Where(x => x.typeExo == typeExo && x.date >= DateTime.Now.AddDays(-30)).OrderByDescending(x => x.nbFaute).ThenByDescending(x=> x.date).Take(20).
                Select(x => new DTOClassementScore() { Cle = 0,Prenom= x.prenom, Date = x.date.HasValue ? x.date.Value.ToShortDateString(): "", Score = x.nbFaute}).ToList();
            for (int i = 0; i < classement.Count; i++)
            {
                classement[i].Cle = i;
            }


            return classement;
        }
    }
}
