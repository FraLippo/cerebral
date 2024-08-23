using System.Collections;
using System.Collections.Generic;

namespace ReactCoreCerebral.Donnees
{
    public class DTOCategorie
    {
        public IEnumerable<DTOClassement> ClassementCategorie { get; set; }
       public IDictionary<string,int> ResultatsJoueur { get; set; }
    }
}