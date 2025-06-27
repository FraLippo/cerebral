using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using CerebralCore.Models;
using Microsoft.AspNetCore.Mvc;
using ReactCoreCerebral.Donnees;
using ReactCoreCerebral.Models;

namespace ReactCerebralCore.Controllers
{
    public class ResultatController : Controller
    {
        private CerebralContext _db;
        private TableauContext _dbTableau;

        public ResultatController(CerebralContext db, TableauContext dbTableau)
        {
            _db = db;
            _dbTableau = dbTableau;
        }


        public async Task<IActionResult> JeuxPuzzle(int idTest, int DureeJeu, bool perdu, double dureeMax)
        {
            int classement = !perdu ? _db.Resultats.Where(x => x.NoTest == idTest && x.Duree < DureeJeu).Count() + 1 : -1;
            double meilleurTemps = _db.Resultats.Where(x => x.NoTest == idTest).Min(y => y.Duree) ?? 0;
            meilleurTemps = Math.Round(meilleurTemps / 1000, 2);
            int nbJoueurs = _db.Resultats.Where(x => x.NoTest == idTest).Count() + 1;
            double tempsMoyen = _db.Resultats.Where(x => x.NoTest == idTest).Average(y => y.Duree) ?? 0;
            tempsMoyen = Math.Round((tempsMoyen / 1000), 2);
            if (!perdu)
            {
                Resultat newResultat = new Resultat() { NoTest = idTest, Duree = DureeJeu };
                _db.Resultats.Add(newResultat);
                await _db.SaveChangesAsync();
            }
            //Stat
            var statTemps =
                       from d in _db.Resultats
                       where d.NoTest == idTest && d.Duree.Value < dureeMax * 1000
                       group d by Math.Floor((double)d.Duree.Value / (dureeMax * 100)) into tempsGroup
                       select new
                       {
                           xTemps = (((dureeMax / 2) + (tempsGroup.Key * dureeMax)) / 10).ToString(),
                           yNbJoueurs = tempsGroup.Count()

                       };


            return Ok(new { classement, meilleurTemps, nbJoueurs, tempsMoyen, statTemps });
        }
        [HttpPost]


        public async Task<IActionResult> JeuxEsp(int idTest, int nbFautes)
        {
            int classement = 0;
            double nombreFautesMoyen = 0;
            int sansFaute = 0;
            int nombreJoueurs = 0;


            classement = _db.Resultats.Where(x => x.NoTest == idTest && x.NbFautes < nbFautes).Count() + 1;
            nombreFautesMoyen = Math.Round(_db.Resultats.Where(x => x.NoTest == idTest).Average(x => x.NbFautes) ?? 0, 2);
            sansFaute = _db.Resultats.Where(x => x.NoTest == idTest && x.NbFautes == 0).Count();
            nombreJoueurs = _db.Resultats.Where(x => x.NoTest == idTest).Count() + 1;


            var nouveauTest = new Resultat();
            nouveauTest.NoTest = idTest;
            nouveauTest.NbFautes = nbFautes;


            _db.Resultats.Add(nouveauTest);
            await _db.SaveChangesAsync();


            return Ok(new { classement, nombreFautesMoyen, sansFaute, nombreJoueurs });
        }

        public async Task AjouterTableau(string prenom, string nomConcours)
        {
            //Horreur, Le listeFaute sert au nom !
            Resultat2019 result = new Resultat2019() { typeExo = "concours", date = DateTime.Now, prenom = prenom, listeFautes = nomConcours };
            _dbTableau.Resultat2019.Add(result);
            await _dbTableau.SaveChangesAsync();

        }

        public IActionResult LireTableau()
        {
            CultureInfo french = CultureInfo.CreateSpecificCulture("fr-FR");
            var listeMeilleurs = _dbTableau.Resultat2019.Where(x => x.nbFaute == 0 && x.typeExo == "concours" && x.date != null && x.prenom != null).OrderByDescending(x => x.date).Take(16).ToList();
            var listeMeilleursSimple = listeMeilleurs.Select(x => new
            {
                x.prenom,
                x.noExo,
                date = x.date.HasValue ? x.date.Value.ToString("f", french) : "Inconnu",
                titre = string.IsNullOrEmpty(x.listeFautes) ? "" : x.listeFautes
            });
            return Ok(listeMeilleursSimple);
        }


        public async Task AjouterTableauMot(string prenom, string niveau)
        {
            //Horreur, Le listeFaute sert au niveau !
            Resultat2019 result = new Resultat2019() { typeExo = "longmot", date = DateTime.Now, prenom = prenom, listeFautes = niveau };
            _dbTableau.Resultat2019.Add(result);
            await _dbTableau.SaveChangesAsync();

        }

        public IActionResult LireTableauMot()
        {
            //Tableau honneur
            CultureInfo french = CultureInfo.CreateSpecificCulture("fr-FR");
            var listeMeilleurs = _dbTableau.Resultat2019.Where(x => x.nbFaute == 0 && x.typeExo == "longmot" && x.date != null && x.prenom != null).OrderByDescending(x => x.date).Take(8).ToList();
            var listeMeilleursSimple = listeMeilleurs.Select(x => new
            {
                x.prenom,
                x.noExo,
                date = x.date.HasValue ? x.date.Value.ToString("f", french) : "Inconnu",
                niveau = string.IsNullOrEmpty(x.listeFautes) ? "" : x.listeFautes
            });

            //Concours du mois
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1);
          
            
            var classement = (
       from sc in _dbTableau.Resultat2019
       where sc.nbFaute == 0
          && sc.typeExo == "longmot"
          && sc.date != null
          && sc.date >= startDate
          && sc.date < endDate
       group sc by sc.prenom into grouping
       select new
       {
           Prenom = grouping.Key,
           Fautes = grouping.Select(x => x.listeFautes)
       }
   ).ToList() // passage en LINQ to Objects
   .Select(g => new DTOClassementMot
   {
       Prenom = g.Prenom,
       Score = g.Fautes.Select(f => (int)Math.Pow(int.Parse(f) / 5, 2)).Sum()
   })
   .OrderByDescending(x => x.Score)
   .Take(20)
   .ToList();
            var i = 0;
            classement.ForEach(x => x.Cle = i++);
            var resultClassement = classement.ToList();


            return Ok(new { honneur = listeMeilleursSimple, classement });
        }
    }
}