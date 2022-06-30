using System;

namespace CerebralCore.Donnees
{
    public interface IDictionnaire
    {
        Tuple<string, string> LettreMelangees(int niveau, int nbJoueurs);
        string VerifierMot(string mot);
    }
}