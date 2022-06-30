using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCoreCerebral.Models
{
    public class Resultat2019
    {
        public int id { get; set; }
        public int nbFaute { get; set; }
        public string listeFautes { get; set; }
        public int noExo { get; set; }
        public string typeExo { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public string prenom { get; set; }

    }
}
