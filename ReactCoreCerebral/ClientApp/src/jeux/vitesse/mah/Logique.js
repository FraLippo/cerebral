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

import { tabGrilleInit } from './dataGrille';
export default class Logique
{
    constructor()
    {
        this.tabGrille = [];
        this.tabTuiles = [];
        this.tabTuilesImages = [ma1,ma2,ma3,ma4,ma5,ma6,ma7,ma8,ma9,ma10,ma11,ma12]
        
        this.taille = 0;
    }
  static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    constructionGrille()
    {
        this.tabGrille= tabGrilleInit[0];
        let tabTuileImageReduit = this.tabTuilesImages.slice(0,this.tabGrille.filter( x => x==1).length/2);
        let tabTuilesMelange =Logique.shuffleArray([...tabTuileImageReduit, ...tabTuileImageReduit]);
        let j = 0;
        for (let index = 0; index <  this.tabGrille.length; index++) {
            if ( this.tabGrille[index] > 0)
            {
                this.tabTuiles.push({pos : index, img : tabTuilesMelange[j], etat : 'initial' })
                j++;
            }
            
        }

    }


}