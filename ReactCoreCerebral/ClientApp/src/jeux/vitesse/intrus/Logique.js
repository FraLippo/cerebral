import ballet1 from '../../../images/ballet1.jpg';
import ballet2 from '../../../images/ballet2.jpg';
import ballet3 from '../../../images/ballet3.jpg';
import ballet4 from '../../../images/ballet4.jpg';
import ballet5 from '../../../images/ballet5.jpg';

import fusee1 from '../../../images/fusee1.jpg';
import fusee2 from '../../../images/fusee2.jpg';
import fusee3 from '../../../images/fusee3.jpg';
import fusee4 from '../../../images/fusee4.jpg';
import fusee5 from '../../../images/fusee5.jpg';


import collier1 from '../../../images/collier1.jpg';
import collier2 from '../../../images/collier2.jpg';
import collier3 from '../../../images/collier3.jpg';
import collier4 from '../../../images/collier4.jpg';
import collier5 from '../../../images/collier5.jpg';


import bouquet1 from '../../../images/bouquet1.jpg';
import bouquet2 from '../../../images/bouquet2.jpg';
import bouquet3 from '../../../images/bouquet3.jpg';
import bouquet4 from '../../../images/bouquet4.jpg';
import bouquet5 from '../../../images/bouquet5.jpg';

import building1 from '../../../images/building1.jpg';
import building2 from '../../../images/building2.jpg';
import building3 from '../../../images/building3.jpg';
import building4 from '../../../images/building4.jpg';
import building5 from '../../../images/building5.jpg';

import mand1 from '../../../images/mand1.jpg';
import mand2 from '../../../images/mand2.jpg';
import mand3 from '../../../images/mand3.jpg';
import mand4 from '../../../images/mand4.jpg';
import mand5 from '../../../images/mand5.jpg';

import vert from '../../../images/vert.jpg';
import rouge from '../../../images/rouge.jpg';

export default class Logique {



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


    static obtenirImage(type, no) {
        if (no===5){
            return vert;
        } else if (no===6){
            return rouge;
        }

        if (type === "fusee") {
            switch (no) {
                case 0: return fusee1;
                case 1: return fusee2;
                case 2: return fusee3;
                case 3: return fusee4;
                case 4: return fusee5;
            }
        } else if (type === "bouquet") {
            switch (no) {
                case 0: return bouquet1;
                case 1: return bouquet2;
                case 2: return bouquet3;
                case 3: return bouquet4;
                case 4: return bouquet5;
            }
        }
        else if (type === "building") {
            switch (no) {
                case 0: return building1;
                case 1: return building2;
                case 2: return building3;
                case 3: return building4;
                case 4: return building5;
            }
        }
        else if (type === "ballet") {
            switch (no) {
                case 0: return ballet1;
                case 1: return ballet2;
                case 2: return ballet3;
                case 3: return ballet4;
                case 4: return ballet5;
            }
        } else if (type === "collier") {
            switch (no) {
                case 0: return collier1;
                case 1: return collier2;
                case 2: return collier3;
                case 3: return collier4;
                case 4: return collier5;
            }
        }
        else if (type === "manda") {
            switch (no) {
                case 0: return mand1;
                case 1: return mand2;
                case 2: return mand3;
                case 3: return mand4;
                case 4: return mand5;
            }
        }

    }

    static typeImage(noPartie){
        while (noPartie > 5){
            noPartie = noPartie - 6;
        }
        switch (noPartie) {
            case 0: return "ballet";
            case 1: return "collier";
             case 2: return "manda";
            case 3: return "building";
            case 4: return "fusee";
            case 5: return "bouquet";
           
        }

    }

    static creerTableauImage() {
        //tire un nombre entre 3 et 5
        let tailleImageVrai = Math.floor(Math.random() * 3) + 3;
        let tailleImageFaux = 9 - tailleImageVrai;
        let tableauImage = []; 
        let imageVrai = Math.floor(Math.random() * 5);
        for (let i = 0; i < tailleImageVrai; i++) {   
            tableauImage.push(imageVrai);
        }
        for (let i = 0; i < tailleImageFaux; i++) {
           //tire un nombre entre 0 et 4 qui n'est pas le nombre vrai
            let imageFaux = Math.floor(Math.random() * 5);
            while (imageFaux === imageVrai) {
                imageFaux = Math.floor(Math.random() * 5);
            }

            tableauImage.push(imageFaux);
        }
        //melange le tableau
        for (let i = tableauImage.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = tableauImage[i];
            tableauImage[i] = tableauImage[j];
            tableauImage[j] = temp;
        }
        return {imageVrai, nbImageFaux : tailleImageFaux, tableauImage}
    }

}