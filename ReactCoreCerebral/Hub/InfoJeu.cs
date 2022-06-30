using System;
using System.Collections.Generic;
using System.Linq;
using CerebralCore.Donnees;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;

namespace CerebralCore.Hub
{
    public enum Etat { attente, jeu, fin}
    public class InfoJeu
    {
        public string Lettres { get; set;}
        public int Temps { get; set; } = 11;
        public Etat Etat { get; set; } = Etat.attente;
        public int Niveau { get; set; }
        public int NbJoueurs { get; set; }
        public List<Participant> Participants { get; set; }
        public int Manche { get; set; } = 1;

        private IDictionnaire LesMots;

        public InfoJeu(IDictionnaire lesMots)
        {
            LesMots = lesMots;
        }


        public void AjouterJoueur( string connexionID, string prenom, int nbJoueur)
        {
           
            var joueur = Participants.FirstOrDefault(x => x.Prenom == prenom);
            if (joueur == null)
            {
                Participants.Add(new Participant() { Prenom = prenom, ConnexionId = connexionID, Etat = Etat.attente, MeilleurMot ="",Score = 0 });
                var ordinateur = ObtenirOrdinateur();
                if (nbJoueur == 1 && ordinateur == null)
                {
                    Participants.Add(new Ordinateur { Prenom = "L'ordinateur", ConnexionId = "null", Etat = Etat.attente, TempsReponse = 10, MeilleurMot = "", Score=0 }); ;
                }    
            }
            else
            {
                joueur.ConnexionId = connexionID;
            }
            
        }


        public Ordinateur ObtenirOrdinateur()
        {
            var ordinateur = Participants.FirstOrDefault(x => x.Prenom == "L'ordinateur");
            return ordinateur as Ordinateur;
        }
      

        public bool ModifierMotJoueur(string mot, string prenom)
        {
            var joueur = Participants.FirstOrDefault(x => x.Prenom == prenom);
            if (joueur != null && !string.IsNullOrEmpty(mot) && mot.Length > joueur.MeilleurMot.Length)
            {
                joueur.MeilleurMot = mot;
                return true;
            }
            return false;
        }

        public Tuple<int, int> MeilleurMotJoueur()
        {
            var maxMot = Participants.Max(x => x.MeilleurMot.Length);
            var gagnant = Participants.Where(x => x.MeilleurMot.Length == maxMot).ToList();

            var nbGagnant = gagnant.Count();
            if (nbGagnant == 1)
            {
                var points = Manche == 3 ? 6 : 3;
                gagnant[0].Score += points;
            }

            foreach (var g in gagnant)
            {
                g.Score += g.MeilleurMot.Length;
            }

            return Tuple.Create(maxMot, nbGagnant);
        }

        public string MotAccepte(string mot)
        {
            return LesMots.VerifierMot(mot);
        }

        public void GenererTirage()
       {
            var lettres = LesMots.LettreMelangees(Niveau, NbJoueurs);
            Lettres = lettres.Item1;

            if (NbJoueurs == 1)
            {
                var ordinateur = ObtenirOrdinateur();
                if (ordinateur != null)
                {
                    ordinateur.MotOrdinateur = lettres.Item2;
                    Random r = new Random();
                    ordinateur.TempsReponse = r.Next(3, 10);
                }

            }
       }

        private void Reset()
        {
            Temps = 30;
            Participants = Participants.Select(x => { x.MeilleurMot = ""; return x; }).ToList();
            Etat = Etat.jeu;
            GenererTirage();
        }

        public void ResetNouvelleManche()
        {
            Manche++;
            Reset();
        }


        public void ResetNouveauJeu()
        {
            Manche = 1;
            Participants = Participants.Select(x => { x.Score = 0; return x; }).ToList();
            Reset();
        }


    }
}
