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

        public MotController(CerebralContext db, TableauContext dbTableau, IDictionnaire lesMots)
        {
            _db = db;
            _dbTableau = dbTableau;
            LesMots = lesMots;
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
    }
}
