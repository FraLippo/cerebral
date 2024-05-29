using System.Collections;
using System.Collections.Generic;
using System.Globalization;

namespace ReactCoreCerebral.Donnees
{
    public class DTOResultatJoueur
    {
        public string NomJeu { get; set; }
        public int Score { get; set; }

    }
    public class DTOInfoClassement
    {
        public IEnumerable<DTOClassement> ClassementJoueurs { get; set; }
        public IEnumerable<DTOResultatJoueur> Resultats { get; set; }
        public int ScoreTotal { get; set; }
        public int Classement { get; set; }

        public int NbJoueurs { get; set; }

    }
}
