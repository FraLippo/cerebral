using CerebralCore.Donnees;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace CerebralCore.Hub
{
    public struct TempsMaj
    {
        public int Temps { get; private set; }
        public bool Maj { get; private set; }

        public TempsMaj(int t, bool m)
        {
            Temps = t;
            Maj = m;
        }
    }
    public class DonneesJeu : IDonneesJeu
    {
        public ConcurrentDictionary<int, InfoJeu> Jeux { get; set; }
        private IDictionnaire LesMots;

        public DonneesJeu(IDictionnaire lesMots)
        {
            Jeux = new ConcurrentDictionary<int, InfoJeu>();
            LesMots = lesMots;
        }

        public InfoJeu CreerNouvellePartie(int idGroupe, int niveau, int nbJoueurs)
        {
           
            if (!Jeux.ContainsKey(idGroupe))
            {
                
                var nouvellePartie = new InfoJeu(LesMots);
                nouvellePartie.Participants = new List<Participant>();
                nouvellePartie.Temps = 0;
                nouvellePartie.Manche = 0;
                nouvellePartie.Niveau = niveau;
                nouvellePartie.NbJoueurs = nbJoueurs;
                nouvellePartie.Etat = Etat.attente;
                Jeux[idGroupe] = nouvellePartie;         
            }
            return Jeux[idGroupe];
        }

        
        public void SupprimerJeuxSansJoueur(int noGroupe)
        {
            
            InfoJeu jeu;
            Jeux.TryRemove(noGroupe, out jeu);
        }

        public (InfoJeu,int) SupprimerJoueur(string connexionID)
        {
         
            InfoJeu partie = null;
            int groupe = 0;
            foreach (var jeu in Jeux)
            {
                var participant = jeu.Value.Participants.Find(x => x.ConnexionId == connexionID);
                if (participant != null)
                {
                    if (jeu.Value.NbJoueurs == 1)
                    {
                        jeu.Value.Participants.Clear();                    
                    }
                    else
                    {
                        jeu.Value.Participants.Remove(participant);
                    }
                    if (jeu.Value.Participants.Count() == 0)
                    {
                        SupprimerJeuxSansJoueur(jeu.Key);
                    }
                    else
                    {
                        partie = jeu.Value;
                        groupe = jeu.Key;
                    }

                    break;
                    
                }
            }
            return (partie,groupe);
          
        }

        public String ListerJoueurs(int id)
        {
            string noms = null;
            if (Jeux.ContainsKey(id))
            {
                var jeu = Jeux[id];
                noms = String.Join(" ", jeu?.Participants.Select(x => x.Prenom));
            }
            return noms;

        }

        public InfoJeu ObtenirPartieEnCours(int id)
        {
            if (Jeux.ContainsKey(id))
            {
                return Jeux[id];
            }
            return null;
        }

       

        public Dictionary<int, TempsMaj> MiseAJourTemps()
        {
            Dictionary<int, TempsMaj> jeuxTemps = new Dictionary<int, TempsMaj>();
            var maj = false;
            foreach (var jeu in Jeux)
            {
                var jeuEncours = jeu.Value;
                if (jeuEncours.Etat == Etat.jeu)
                {
                    jeuEncours.Temps--;
                    //On crée une réponse pour l'ordinateur
                    if (jeuEncours.NbJoueurs == 1)
                    {
                        var ordinateur = jeuEncours.ObtenirOrdinateur();
                        if (ordinateur != null && jeuEncours.Temps == ordinateur.TempsReponse)
                        {
                            ordinateur.MeilleurMot = ordinateur.MotOrdinateur;
                            maj = true;
                        }
                    }
                    jeuxTemps.Add(jeu.Key, new TempsMaj(jeu.Value.Temps, maj));
                    if (jeuEncours.Temps == 0)
                    {
                        jeuEncours.Etat = Etat.attente;
                    }
                }
            }
            return jeuxTemps;
        }

        

       

     
    }
}
