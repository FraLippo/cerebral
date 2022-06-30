import donneesJeuxConcours from "../../data/donneesJeuxConcours"


export default class LogiqueLettre {


    static findConcours(id)
    {
        this.jeu = donneesJeuxConcours.find(x => x.id === id);
        return this.jeu.idConcours;
    }

    static messageIntro = () =>
    {
        return [
            {
                id: 1,
                de : "evalquiz.com",
                contenu  : "Vous pouvez envoyer des messages aux autres joueurs lorsqu'ils sont connectés."
                
            }
        ]
    }

    static  constructionEmplacement(position) {

        return {
            gridColumnStart: position + 1,
            gridColumnEnd: position + 1,
            gridRowStart: 1,
            gridRowEnd: 1
        }
    }


    static modifierLettres = (mot) => {
        let nouveauMot = "";
        for (const lettre of mot) {


            switch (lettre) {
                case 'é':
                case 'è':
                case 'ê':
                case 'ë':
                    nouveauMot += 'e';
                    break;
                case 'à':
                case 'â':
                case 'ä':
                    nouveauMot += 'a';
                    break;
                case 'î':
                case 'ï':
                    nouveauMot += 'i';
                    break;
                case 'ô':
                case 'ö':
                    nouveauMot += 'o';
                    break;
                case 'ù':
                case 'û':
                case 'ü':
                    nouveauMot += 'u';
                    break;
                case 'ÿ':
                    nouveauMot += 'y'
                    break;
                case 'ç':
                    nouveauMot += 'c';
                    break;
                default:
                    nouveauMot += lettre;
                    break;
            }
            
        }return nouveauMot.toUpperCase();
    }

    static verifierLettresMot(dicoLettres, mot)
    {
        mot = LogiqueLettre.modifierLettres(mot);
     
       
        for (const lettre of mot) {
            if (dicoLettres.has(lettre) && dicoLettres.get(lettre) !== 0)
            {
                dicoLettres.set(lettre, dicoLettres.get(lettre)-1);           
            }
            else
            { 
                return false;
            }
        }
        return true;
    }
}