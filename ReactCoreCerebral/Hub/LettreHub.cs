using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace CerebralCore.Hub
{
    public class LettreHub : Hub<ILettreHub>
    {
        private IDonneesJeu DonneesJeu;
        public LettreHub(IDonneesJeu donneesJeu)
        {
            DonneesJeu = donneesJeu;
        }
        public async Task InscriptionJeu(int id, string prenom, int niveau, int nbJoueurs)
        {
            var partie = DonneesJeu.CreerNouvellePartie(id, niveau, nbJoueurs);
            partie.AjouterJoueur(Context.ConnectionId, prenom, nbJoueurs);

            await Groups.AddToGroupAsync(Context.ConnectionId, id.ToString());


            var msgJoueurs = FormatMessage.ListerInfoJoueurs(partie);
            await Clients.Group(id.ToString()).AfficheInfoJoueur(msgJoueurs);

        }


        public async override Task OnDisconnectedAsync(Exception exception)
        {
            (InfoJeu jeu, int partie ) = DonneesJeu.SupprimerJoueur(Context.ConnectionId);
            if (partie != 0)
            {
                var msgJoueurs = FormatMessage.ListerInfoJoueurs(jeu);
                await Clients.Group(partie.ToString()).AfficheInfoJoueur(msgJoueurs);
            }
            await base.OnDisconnectedAsync(exception);
        }


        public async Task InfoJeu(int id)
        {
            var partie = DonneesJeu.ObtenirPartieEnCours(id);
            if (partie != null)
            {
                var msgJoueurs = FormatMessage.ListerInfoJoueurs(partie);
                await Clients.Group(id.ToString()).AfficheInfoJoueur(msgJoueurs);
            }
        }

        public async Task NouveauMot(int id, string mot, string prenom)
        {
            var partie = DonneesJeu.ObtenirPartieEnCours(id);
            var motVerifie = partie.MotAccepte(mot);
            var resultat = !string.IsNullOrEmpty(motVerifie);
            await Clients.Client(Context.ConnectionId).EstValide(resultat);

            if (resultat && partie.ModifierMotJoueur(motVerifie, prenom))
            {
                var msgJoueurs = FormatMessage.ListerInfoJoueurs(partie);
                await Clients.Group(id.ToString()).AfficheInfoJoueur(msgJoueurs);
            }
        }



        public async Task FinJeu(int id)
        {
            var partie = DonneesJeu.ObtenirPartieEnCours(id);
            var msgFin = FormatMessage.AfficherInfoGagnant(partie);
            await Clients.Group(id.ToString()).FinJeu(msgFin);

        }


        public async Task NouveauJeu(int id)
        {
            var partie = DonneesJeu.ObtenirPartieEnCours(id);
            if (partie.Etat == Etat.attente)
            {
                if (partie.Manche == 3)
                {
                    partie.ResetNouveauJeu();
                }
                else
                {
                    partie.ResetNouvelleManche();
                }
            }
            await Clients.Group(id.ToString()).CommencerManche(partie.Lettres.ToCharArray(), partie.Manche);

            var msgJoueurs = FormatMessage.ListerInfoJoueurs(partie);
            await Clients.Group(id.ToString()).AfficheInfoJoueur(msgJoueurs);
        }

        public async Task NouveauMessage(int id, string prenom, string message)
        {      
            await Clients.Group(id.ToString()).AfficheMessage(prenom, message);
        }
    }
}

    

