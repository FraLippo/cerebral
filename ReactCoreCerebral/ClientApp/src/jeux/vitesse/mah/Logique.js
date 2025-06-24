import ma1 from '../../../images/mah/ma1.png'
import ma2 from '../../../images/mah/ma2.png'
import ma3 from '../../../images/mah/ma3.png'
import ma4 from '../../../images/mah/ma4.png'
import ma5 from '../../../images/mah/ma5.png'
import ma6 from '../../../images/mah/ma6.png'
import ma7 from '../../../images/mah/ma7.png'
import ma8 from '../../../images/mah/ma8.png'
import ma9 from '../../../images/mah/ma9.png'
import ma10 from '../../../images/mah/ma10.png'
import ma11 from '../../../images/mah/ma11.png'
import ma12 from '../../../images/mah/ma12.png'
import ma13 from '../../../images/mah/ma13.png'
import ma14 from '../../../images/mah/ma14.png'
import ma15 from '../../../images/mah/ma15.png'
import ma16 from '../../../images/mah/ma16.png'
import ma17 from '../../../images/mah/ma17.png'
import ma18 from '../../../images/mah/ma18.png'
import ma19 from '../../../images/mah/ma19.png'
import ma20 from '../../../images/mah/ma20.png'
import ma21 from '../../../images/mah/ma21.png'
import ma22 from '../../../images/mah/ma22.png'
import ma23 from '../../../images/mah/ma23.png'
import ma24 from '../../../images/mah/ma24.png'
import ma25 from '../../../images/mah/ma25.png'
import ma26 from '../../../images/mah/ma26.png'

import { tabGrilleInit } from './dataGrille';
export default class Logique {
    constructor() {
   
        this.images = { ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9, ma10, ma11, ma12, ma13, ma14, ma15, ma16, ma17, ma18, ma19, ma20, ma21, ma22, ma23, ma24, ma25, ma26 }
        this.reset();
        this.noJeu = -1;
        this.taille = 0;
    }
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    reset()
    {
        this.tabGrille = [];
        this.tabTuiles = [];
         this.tabTuilesImages = Array.from({ length: 26 }, (_, i) => {
            const nom = `ma${i + 1}`;
            return { img: this.images[nom], nom };
        });
    }
    constructionGrille() {
        let nb = -1;
        do
        {   
            nb = Math.floor(Math.random() * tabGrilleInit.length);
        }
        while (nb === this.noJeu);
        this.noJeu = nb;
        this.tabGrille = tabGrilleInit[nb];
        let tabTuileImageReduit = this.tabTuilesImages.slice(0, this.tabGrille.filter(x => x == 1).length / 2);
        let tabTuilesMelange = Logique.shuffleArray([...tabTuileImageReduit, ...tabTuileImageReduit]);
        let j = 0;
        for (let index = 0; index < this.tabGrille.length; index++) {
            if (this.tabGrille[index] > 0) {
                this.tabTuiles.push({ pos: index, img: tabTuilesMelange[j].img, etat: 'initial', nom: tabTuilesMelange[j].nom })
                j++;
            }

        }

    }


}