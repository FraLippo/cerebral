using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace CerebralCore.Hub
{
    public class Ordinateur : Participant
    {
        public string MotOrdinateur { get; set; }
        public int TempsReponse { get; set; }

        
    }
}
