import React, { Component } from 'react';
import Logique from './Logique'
import Grille from './Grille';

export default class JeuMaitremot extends Component
{

   
    constructor(props)
    {
        super(props);
        let l = new Logique();
      for (let index = 0; index <5000; index++) {
            l.construireNouveauJeu();
        l.constructionListeReponse();
        
      }
       
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