import React, { Component } from 'react';
import LogiqueMemoire from './LogiqueMemoire';


export default class GrilleJeu extends Component
{


  
    
    render()
    {
    return <div className="grilleMemoire apparition">{this.props.tabGrille.map((couleur, i) => <div key={i} className="carreMemoire" style={LogiqueMemoire.constructionEmplacementCouleur(i, couleur, this.props.taille)}></div>)}</div>
    }
}