export default function CreerLettres() {
    const lettresOrdreUtilisation = ["I", "A", "S", "E", "N", "T", "R", "U", "L", "O", "D", "C", "P", "V", "B"];
    const lettreCentre = ["E", "A", "I", "S", "R", "E"];
    const voyelles = ["E", "A", "U", "I", "O"];
    const consonnes = ["S", "N", "T", "R", "L", "D", "C", "P", "V", "B"]
 let tabJeu = [];
   let tabLettres = [];
   let nb = 0;
    for (let index = 0; index < 7; index++) {
       
       if (index === 0)
       {
         tabLettres = lettreCentre;
       }
       else if (index < 3) {
            tabLettres = voyelles;
        } 
        else {
            tabLettres = consonnes;
        }
        
        do {
            nb = Math.floor(Math.random() * tabLettres.length);
        } while (tabJeu.includes(tabLettres[nb]));

        tabJeu.push(tabLettres[nb]);
        
    }
    let tabMelange = melangerTableau(tabJeu.slice(1));
    tabMelange.splice(3,0, tabJeu[0])


    return tabMelange;
}

function melangerTableau(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Générer un indice aléatoire
        [tableau[i], tableau[j]] = [tableau[j], tableau[i]]; // Échanger les éléments
    }
    return tableau;
}