using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CerebralCore.Hub
{
    public class TempsService : BackgroundService
    {
        private readonly IHubContext<LettreHub, ILettreHub> _tempsHub;
        private IDonneesJeu _donneesJeu;

        public TempsService(IHubContext<LettreHub, ILettreHub> tempsHub, IDonneesJeu donneesJeu)
        {
            _tempsHub = tempsHub;
            _donneesJeu = donneesJeu;
        }


        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {

                if (_donneesJeu.Jeux.Count() > 0)
                {
                    foreach (var jeu in _donneesJeu.MiseAJourTemps())
                    {
                        await _tempsHub.Clients.Group(jeu.Key.ToString()).AfficheCompteRebours(jeu.Value.Temps);
                        IEnumerable<MessageJoueurs> msgJoueurs = null;
                        if (jeu.Value.Maj)
                        {
                            msgJoueurs = FormatMessage.ListerInfoJoueurs(_donneesJeu.ObtenirPartieEnCours(jeu.Key));
                        }
                        if (jeu.Value.Temps == 0)
                        {
                            msgJoueurs = FormatMessage.FinManche(_donneesJeu.ObtenirPartieEnCours(jeu.Key));
                        }

                        if (msgJoueurs != null)
                        {
                            await _tempsHub.Clients.Group(jeu.Key.ToString()).AfficheInfoJoueur(msgJoueurs);
                        }
                    }

                }
                await Task.Delay(1000);
            }
        }
    }
}
