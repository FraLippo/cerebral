import { mots } from "../lettres/data";

export default function creerDonnee(nb)
{
    let tabJeu = [];
    for (let index = 0; index < nb; index++) {
       let  n = Math.floor(Math.random() * mots.length);
       let mot = mots[n].toLowerCase();
       tabJeu = [...tabJeu, ...mot,' '];
        
    }
    return tabJeu;
}