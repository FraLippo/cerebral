

const listeNiveaux = [
    {
        titre : "débutante",
        intervalle : "2 et 3"
    },
    {
        titre : "débutante",
        intervalle : "2 et 3"
    },  {
        titre : "novice",
        intervalle : "3 et 4"
    },  {
        titre : "novice",
        intervalle : "3 et 4"
    },  {
        titre : "novice",
        intervalle : "3 et 4"
    },  {
        titre : "amateur",
        intervalle : "3 et 5"
    },  {
        titre : "amateur",
        intervalle : "3 et 5"
    },  {
        titre : "amateur",
        intervalle : "3 et 5"
    },  {
        titre : "intermédiaire",
        intervalle : "3 et 6"
    },  {
        titre : "intermédiaire",
        intervalle : "4 et 6"
    },  {
        titre : "étourdie",
        intervalle : "3 et 7"
    },  {
        titre : "avancée",
        intervalle : "5 et 6"
    },  {
        titre : "inconstante",
        intervalle : "3 et 7"
    },  {
        titre : "inconstante",
        intervalle : "3 et 7"
    },  {
        titre : "confirmée",
        intervalle : "4 et 7"
    },  {
        titre : "confirmée",
        intervalle : "4 et 7"
    },  {
        titre : "déconcertante",
        intervalle : "3 et 8"
    },  {
        titre : "expérimentée",
        intervalle : "6 et 9"
    },  {
        titre : "stressée",
        intervalle : "4 et 9"
    },
    {
        titre : "experte",
        intervalle : "5 et 9"
    },
    {
        titre : "ultime",
        intervalle : "6 et 9"
    },
     
  ];  
export default class LogiqueLettre {


  

    static obtenirPrenom = () =>
  {
        const prenomsFeminins = [
            "Flo","Marie34","Manon","Élisabeth","Régine","Thana","Emma","Martine","Isabelle","Anaïs","Josiane","Lucie","Caro","Élise","Marie-Claude","Estelle","Marie","Kathleen","Louise","Inès", "Nounou", "Lola", "Lina", "Nour"
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