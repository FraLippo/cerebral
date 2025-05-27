import React, { Component } from 'react';
import Logique from './Logique'


export default class JeuMaitremot extends Component
{

   
    constructor(props)
    {
        super(props);
        let l = new Logique();
        
      l.construireNouveauJeu();
        l.constructionListeReponse();
    }
    

    
    render()
    {
    return <div></div>
    }
}