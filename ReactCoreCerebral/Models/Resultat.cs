using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CerebralCore.Models
{
    public class Resultat
    {
        public int ID { get; set; }
        public int NoTest { get; set; }
        public int? Duree { get; set; }
        public int? NbFautes { get; set; }

    }
}
