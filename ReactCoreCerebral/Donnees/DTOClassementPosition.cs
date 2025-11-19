using System.Collections.Generic;

namespace ReactCoreCerebral.Donnees
{
    public class DTOClassementPosition
    {
        public List<DTOClassementScore> ClassementScores { get; set; }
        public int Position { get; set; }
        public int Score { get; set; }
    }
}
