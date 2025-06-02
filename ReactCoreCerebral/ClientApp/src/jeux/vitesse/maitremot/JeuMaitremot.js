import React, { Component } from 'react';
import Logique from './Logique'
import Grille from './Grille';
import data from './data'
export default class JeuMaitremot extends Component
{

   
    constructor(props)
    {
        super(props);
      let l;
 let tab = [];

        let max = 2;
        let maxnb = 0;
      for (let index = 0; index <50; index++) { 
        let res = false;
          let nb = 0;
       do 
       {
          l  = new Logique(index);
            l.construireNouveauJeu();
            res = l.constructionListeReponse();
            nb++;
            if (nb > max)
            {
              max = nb;
         
            }
       
      } while (!res)
        
        
      }
      console.log('LES ERREURS');
      console.log(max);
  
       
        let t = l.tabListeMots;

        this.state = {
          tabListeReponse : t

        }
       
   

    }
    

    
    render()
    {
    return <div className='jeumaitre'>
      <div className='grillemaitre'><Grille tabListeReponse={this.state.tabListeReponse}></Grille></div></div>
    }
}