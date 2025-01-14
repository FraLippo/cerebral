using CerebralCore.Donnees;
using CerebralCore.Models;
using Microsoft.AspNetCore.Mvc;
using ReactCoreCerebral.Donnees;
using ReactCoreCerebral.Models;
using System.Threading.Tasks;

namespace ReactCoreCerebral.Controllers
{
    public class MotController : Controller
    {
        private CerebralContext _db;
        private TableauContext _dbTableau;
        private readonly IDictionnaire LesMots;
        private readonly IDictionaryEnglish Words;

        public MotController(CerebralContext db, TableauContext dbTableau, IDictionnaire lesMots, IDictionaryEnglish words)
        {
            _db = db;
            _dbTableau = dbTableau;
            LesMots = lesMots;
            Words = words;

        }

        public DTOMotLettres ConstructionManche(int niveau)
        {
            var lettres = LesMots.LettreMelangees(niveau, 1);
            return new DTOMotLettres() { Lettres = lettres.Item1, Mot = lettres.Item2 };

        }

        public IActionResult VerifierMot(string mot)
        {
            var verif = LesMots.VerifierMot(mot);
            var resultat = verif != null;
            return Ok(new { resultat });

        }


        public IActionResult CheckWords(string mot)
        {
            var verif = Words.VerifierMot(mot);
            var resultat = verif != null;
            return Ok(new { resultat });

        }
    }
}
