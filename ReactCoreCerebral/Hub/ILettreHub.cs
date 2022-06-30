using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CerebralCore.Hub
{
    public interface ILettreHub
    {
        Task AfficheCompteRebours(int compte);
        Task AfficheInfoJoueur(IEnumerable<MessageJoueurs> messageJoueurs);

        Task AfficheMessage(string prenom, string message);

        Task CommencerManche(char[] lettres, int manche);

        Task EstValide(bool resultat);
        Task FinJeu(string msg);

       

    }
}
