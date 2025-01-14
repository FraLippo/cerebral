using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ReactCoreCerebral.Donnees
{
    public class DictionaryEnglish : IDictionaryEnglish
    {
        private readonly HashSet<string> ListeMots;

        public DictionaryEnglish()
        {
            var mots = File.ReadLines("c://dictionnaire//words.txt");
            ListeMots = new HashSet<string>(mots);
        }

        public string VerifierMot(string mot)
        {

            var motVerif = mot.ToString().ToUpper();

            return ListeMots.Contains(motVerif) ? motVerif : null;
        }

    }
}
