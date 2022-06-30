using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CerebralCore.Hub
{
    public class Participant
    {
        public string Prenom { get; set; }
        public string ConnexionId { get; set; }
        public string MeilleurMot { get; set; } = "";
        public Etat Etat { get; set; }
        public int Score { get; set; } = 0;

       
    }
}
