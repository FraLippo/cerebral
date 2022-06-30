using System.Collections.Concurrent;
using System.Collections.Generic;

namespace CerebralCore.Hub
{
    public interface IDonneesJeu
    {
        ConcurrentDictionary<int, InfoJeu> Jeux { get; set; }
        InfoJeu CreerNouvellePartie(int idGroupe, int niveau, int nbJoueurs);
        string ListerJoueurs(int id);
        Dictionary<int, TempsMaj> MiseAJourTemps();
        InfoJeu ObtenirPartieEnCours(int id);
        (InfoJeu,int) SupprimerJoueur(string connexionID);
    }
}