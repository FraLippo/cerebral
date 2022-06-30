using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CerebralCore.Hub
{

    
    public class FormatMessage
    {

        public static IEnumerable<MessageJoueurs> ListerInfoJoueurs(InfoJeu infoJeu)
        {
            List<MessageJoueurs> messageJoueurs = new List<MessageJoueurs>();
            foreach (var item in infoJeu.Participants)
            {
                MessageJoueurs m = new MessageJoueurs();
                m.Prenom = item.Prenom;

                if (String.IsNullOrEmpty(item.MeilleurMot))
                {
                    m.InfoJeu = "0 mot trouvé";
                }
                else
                {
                    m.InfoJeu = "Un mot trouvé de " + item.MeilleurMot.Length + (item.MeilleurMot.Length > 1 ? " lettres." : " lettre.");
                }
                m.Score = "Score : " + item.Score;
                messageJoueurs.Add(m);
            }
            messageJoueurs = messageJoueurs.OrderBy(x => x.Prenom).ToList();
            if (infoJeu.NbJoueurs >= 2 && infoJeu.Participants.Count == 1)
            {
                MessageJoueurs m = new MessageJoueurs();
                m.Prenom = "";
                m.InfoJeu = "En attente d'autres joueurs...";
                messageJoueurs.Add(m);
            }

            return messageJoueurs;
        }

        public static IEnumerable<MessageJoueurs> FinManche(InfoJeu infoJeu)
        {
            List<MessageJoueurs> messageJoueurs = new List<MessageJoueurs>();
            var gagnant = infoJeu.MeilleurMotJoueur();
            var meilleurMot = gagnant.Item1;
            var nbGagnant = gagnant.Item2;
            foreach (var item in infoJeu.Participants)
            {
                MessageJoueurs m = new MessageJoueurs();

                m.Prenom = item.Prenom;
                if (!String.IsNullOrWhiteSpace(item.MeilleurMot))
                {
                    m.Prenom += (m.Prenom == "Vous" ? " avez trouvé le mot " : " a trouvé le mot ") + item.MeilleurMot + ".";
                }
                m.InfoJeu = "";
                if (item.MeilleurMot.Length == meilleurMot)
                {
                    var points = 3;
                    if (infoJeu.Manche == 3) points = 6;
                    if (nbGagnant == 1)
                    {
                        if (item.Prenom == "L'ordinateur")
                        {
                            m.InfoJeu = "L'ordinateur a gagné la manche (+" + points + " points pour la victoire).";
                        }
                        else
                        {
                            m.InfoJeu = "Bravo ! Vous avez gagné la manche (+" + points + " points pour la victoire).";
          
                        }
                        

                    }
                    else
                    {
                        m.InfoJeu = "Egalité, pas de vainqueur pour cette manche.";
                    }
                }
                else
                {
                    m.InfoJeu = "La manche est perdue.";
                }
                m.Score += item.Score;

                m.Score = "Score : " + item.Score;
                messageJoueurs.Add(m);
            }
            messageJoueurs = messageJoueurs.OrderBy(x => x.Prenom).ToList();
            return messageJoueurs;
        }

        public static string AfficherInfoGagnant(InfoJeu infoJeu)
        {
            var maxScore = infoJeu.Participants.Max(x => x.Score);
            var gagnants = infoJeu.Participants.Where(x => x.Score == maxScore).ToList();

           
            if (gagnants.Count() == 1)
            {
                if (gagnants[0].Prenom == "L'ordinateur")
                {
                    return "L'ordinateur a gagné.";
                }
                if (infoJeu.NbJoueurs == 1)
                {
                    return "Bravo ! Vous avez gagné la partie.";
                } else
                {
                    return gagnants[0].Prenom + (gagnants[0].Prenom == "Vous" ? " avez gagné la partie." : " a gagné la partie.");
                }
            }
            else
            {
                var msg = "Egalité, ";
                for (int i = 0; i < gagnants.Count(); i++)
                {
                    msg += gagnants[i].Prenom;
                    if (i < gagnants.Count()-1)
                    {
                        msg += " et ";
                    }
                }
                msg += " n'ont pas pu se départager.";
                return msg;
            }
            
        }
       
    }
}
