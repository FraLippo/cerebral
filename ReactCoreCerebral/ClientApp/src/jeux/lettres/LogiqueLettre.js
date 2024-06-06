

const listeNiveaux = [
    {
        titre : "débutante",
        intervalle : "2 ou 3"
    },
    {
        titre : "débutante",
        intervalle : "2 ou 3"
    },  {
        titre : "novice",
        intervalle : "3 ou 4"
    },  {
        titre : "novice",
        intervalle : "3 ou 4"
    },  {
        titre : "novice",
        intervalle : "3 ou 4"
    },  {
        titre : "amateur",
        intervalle : "3 ou 5"
    },  {
        titre : "amateur",
        intervalle : "3 ou 5"
    },  {
        titre : "amateur",
        intervalle : "3 ou 5"
    },  {
        titre : "intermédiaire",
        intervalle : "3 ou 6"
    },  {
        titre : "intermédiaire",
        intervalle : "4 ou 6"
    },  {
        titre : "étourdie",
        intervalle : "3 ou 7"
    },  {
        titre : "avancée",
        intervalle : "5 ou 6"
    },  {
        titre : "inconstante",
        intervalle : "3 ou 7"
    },  {
        titre : "inconstante",
        intervalle : "3 ou 7"
    },  {
        titre : "confirmée",
        intervalle : "4 ou 7"
    },  {
        titre : "confirmée",
        intervalle : "4 ou 7"
    },  {
        titre : "déconcertante",
        intervalle : "3 ou 8"
    },  {
        titre : "expérimentée",
        intervalle : "5 ou 7"
    },  {
        titre : "stressée",
        intervalle : "3 ou 8"
    },
    {
        titre : "experte",
        intervalle : "5 ou 9"
    },
    {
        titre : "ultime",
        intervalle : "6 ou 9"
    },
     
  ];  
export default class LogiqueLettre {


  

    static obtenirPrenom = () =>
  {
        const prenomsFeminins = [
            "Camille","Léa","Manon","Chloé","Zoé","Julie","Emma","Sarah","Laura","Anaïs","Claire","Lucie","Marion","Élise","Sophie","Alice","Marie","Eva","Louise","Inès", "Maryam", "Sofia", "Lina", "Nour"
        ];  
        let nb = Math.floor(Math.random() * prenomsFeminins.length);
        return prenomsFeminins[nb];
    }

    static obtenirNbNiveau = () =>
        {
  
              return listeNiveaux.length;
          }


    static obtenirNiveau = (niveau) =>
        {
           
             
              return listeNiveaux[niveau];
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