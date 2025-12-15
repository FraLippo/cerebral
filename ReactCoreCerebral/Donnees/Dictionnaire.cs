using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CerebralCore.Donnees
{
    public class Dictionnaire : IDictionnaire
    {
        private HashSet<string> ListeMots;

        private char[] Voyelle = { 'a', 'e', 'i', 'o', 'u', 'y' };
        private char[] VoyelleTirage = { 'a', 'e', 'i', 'o', 'u', 'e','a','i','o','u','e','y', 'a', 'e', 'i', 'o', 'u','e' };
        private char[] ConsonneTirage = { 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v','r', 's', 'n', 'r','t','l','r','s', 'd','c','m','p','t', 'x', 'z', 'q' };
        Random R = new Random();
        public Dictionnaire()
        {
            var mots = File.ReadLines("c://dictionnaire//listeMots.txt");
            ListeMots = new HashSet<string>(mots);

        }

        


        public string VerifierMot(string mot)
        {
            StringBuilder nouveauMot = new StringBuilder();
            foreach (var lettre in mot)
            {
                switch (lettre)
                {
                    case 'é':
                    case 'è':
                    case 'ê':
                    case 'ë':
                        nouveauMot.Append('e');
                        break;
                    case 'à':
                    case 'â':
                    case 'ä':
                        nouveauMot.Append('a');
                        break;
                    case 'î':
                    case 'ï':
                        nouveauMot.Append('i');
                        break;
                    case 'ô':
                    case 'ö':
                        nouveauMot.Append('o');
                        break;
                    case 'ù':
                    case 'û':
                    case 'ü':
                        nouveauMot.Append('u');
                        break;
                    case 'ÿ':
                        nouveauMot.Append('y');
                        break;
                    case 'ç':
                        nouveauMot.Append('c');
                        break;
                    default:
                        nouveauMot.Append(lettre);
                        break;
                }

            }
            var motVerif = nouveauMot.ToString().ToUpper();

            return ListeMots.Contains(motVerif) ? motVerif : null;
        }

        private string ObtenirMotOrdinateur(int niveau)
        {
            int longueur = 0;
            
            switch (niveau)
            {
                case 0:
                    longueur = R.Next(2, 4);
                    break;
                case 1:
                    longueur = R.Next(2, 4);
                    break;
                case 2:
                    longueur = R.Next(3, 5);
                    break;
                case 3:
                    longueur = R.Next(3, 5);
                    break;
                case 4:
                    longueur = R.Next(3, 5);
                    break;
               
                case 5:
                    longueur = R.Next(3, 6);
                    break;
                case 6:
                    longueur = R.Next(3, 6);
                    break;
                case 7:
                    longueur = R.Next(3, 6);
                    break;
                case 8:
                    longueur = R.Next(3, 7);
                    break;
                case 9:
                    longueur = R.Next(4, 7);
                    break;
                case 10:
                    longueur = R.Next(4, 7);
                    break;
                case 11:
                    longueur = R.Next(5, 7);
                    break;
                case 12:
                    longueur = R.Next(3, 8);
                    break;
                case 13:
                    longueur = R.Next(3, 9);
                    break;
                case 14:
                    longueur = R.Next(4, 8);
                    break;
               
                case 15:
                    longueur = R.Next(4, 8);
                    break;
                case 16:
                    longueur = R.Next(3, 9);
                    break;
                case 17:
                    longueur = R.Next(6, 9);
                    break;
                case 18:
                    longueur = R.Next(4, 10);
                    break;
                case 19:
                    longueur = R.Next(5, 10);
                    break;
                case 20:
                    longueur = R.Next(6, 10);
                    break;
                
                default:
                    longueur = 4;
                    break;
            }

            var mots = ListeMots.Where(x => x.Length == longueur).ToList();
            var nb = R.Next(0, mots.Count());
            return mots[nb];
        }

        public int compterVoyelle(string mot)
        {
            int nb = 0;
            for (int i = 0; i < mot.Length; i++)
            {
                for (int j = 0; j < Voyelle.Length; j++)
                {
                    if (Voyelle[j] == mot[i]) nb++;
                }
            }
            return nb;
        }
        public bool modifierTirage(string mot, char lettre)
        {

            //Déjà une lettre difficile présente
            var lettresDifficile = "xyzwqy";
            if (lettresDifficile.Contains(lettre))
            {
                foreach (var l in lettresDifficile)
                {
                    if (mot.Contains(l)) return true;
                }
            }
            //Pas de lettre présente 3 fois
            if (mot.Contains(lettre))
            {
                int nb = 0;
                for (int i = 0; i < mot.Length; i++)
                {
                    if (mot[i] == lettre) nb++;
                    if (nb == 2) return true;
                }
            }
            return false;
        }

        public string ObtenirLettresEnPlus(string mot)
        {
            mot = mot.ToLower();
            var nbVoyelle = compterVoyelle(mot);
            var voyelle = mot.Length == 0 ? 5 : nbVoyelle >= 5 ? 0 : 4 - nbVoyelle;
            var consonne = 9 - mot.Length - voyelle;
            char[] tabLettres = new char[voyelle + consonne];


            for (int i = 0; i < consonne + voyelle; i++)
            {
                bool incorrect;
                int nb;
                char lettre;
                do
                {
                    nb = R.Next(0, i < voyelle ? VoyelleTirage.Length : ConsonneTirage.Length);
                    lettre = i < voyelle ? VoyelleTirage[nb] : ConsonneTirage[nb];
                    incorrect = modifierTirage(mot + new string(tabLettres), lettre);

                } while (incorrect);
                tabLettres[i] = lettre;
            }
            return new String(tabLettres).ToUpper();
        }

        public Tuple<string, string> LettreMelangees(int niveau, int nbJoueurs)
        {
            string motOrdinateur = "";
            if (nbJoueurs == 1)
            {
                motOrdinateur = ObtenirMotOrdinateur(niveau);
            }
            var lettres = ObtenirLettresEnPlus(motOrdinateur);

            List<char> lettresCompletes = new List<char>(motOrdinateur + lettres);
            char[] lettresMelangee = new char[lettresCompletes.Count()];
            Random r = new Random();
            for (int i = 0; i < lettresMelangee.Length; i++)
            {
                var nb = r.Next(0, lettresCompletes.Count());
                lettresMelangee[i] = lettresCompletes[nb];
                lettresCompletes.Remove(lettresMelangee[i]);
            }
            return Tuple.Create(new string(lettresMelangee), motOrdinateur);

        }
        }
    }

