// import mah1 from '../../../images/mah1.png';
// import mah2 from '../../../images/mah2.png';
// import mah3 from '../../../images/mah3.png';
// import mah4 from '../../../images/mah4.png';
// import mah5 from '../../../images/mah5.png';
// import mah6 from '../../../images/mah6.png';
// import mah7 from '../../../images/mah7.png';
// import mah8 from '../../../images/mah8.png';
// import mah9 from '../../../images/mah9.png';

import mah1 from '../../../images/mah/ma4.png'
import mah2 from '../../../images/mah/ma5.png'
import mah3 from '../../../images/mah/ma7.png'
import mah4 from '../../../images/mah/ma9.png'
import mah5 from '../../../images/mah/ma10.png'
import mah6 from '../../../images/mah/ma11.png'
import mah7 from '../../../images/mah/ma12.png'
import mah8 from '../../../images/mah/ma20.png'
import mah9 from '../../../images/mah/ma14.png'
export default class Logique {
    constructor() {
        this.grilleEnCours = 0;
        this.tabDonnee = [[1, 8], [1, 4],[1, 8, 5],[1, 4, 6], [1, 6, 6, 3], [1, 6, 7, 4],[1, 5, 7, 2] , [1, 6, 3, 3, 4],  [1, 5, 3, 2, 2], [1, 5, 6, 7, 2],  [1, 3, 6, 7, 2]]
    

    }

    creerTableauImage() {
        let tabImage = [];
        //creer un tableau de 5 images sans doublon
        for (let index = 0; index < 5; index++) {
            let image = Math.floor(Math.random() * 9);
            if (tabImage.indexOf(image) === -1) {
                tabImage.push(image);
            }
            else {
                index--;
            }
        }
        return tabImage;
    }

    creerGrille() {
        let nouveauTab = new Array(25).fill(-1);
        let tabImage = this.creerTableauImage();

        const tabElement = this.tabDonnee[this.grilleEnCours];
        for (let index = 0; index < tabElement.length; index++) {
            let image = tabImage[index];
            let i = 0;
            while (i < tabElement[index]) {
                let position = Math.floor(Math.random() * 25);
                if (nouveauTab[position] === -1) {
                    nouveauTab[position] = image;
                    i++;
                }
            }


        }
        return nouveauTab;
    }


    static testResultat(no, grilleEnCours) {
        let tabResult = grilleEnCours.filter(x => x === no);
        if (tabResult.length === 1) {
            return "ok";
        }
        else {
            return "erreur";
        }

    }


    static constructionEmplacement(index, taille) {

        let y = (Math.floor(index / taille)) + 1;
        let x = index % taille + 1;
        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y,
        }
    }


    static obtenirImage(no) {
        switch (no) {
            case 0: return mah1;
            case 1: return mah2;
            case 2: return mah3;
            case 3: return mah4;
            case 4: return mah5;
            case 5: return mah6;
            case 6: return mah7;
            case 7: return mah8;
            case 8: return mah9;

            default:
                return mah1;
        }
    }



}