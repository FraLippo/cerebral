import React, { Component } from 'react';
import Logique from './Logique';
import '../../../style/vitesse.css';


export default class Grille extends Component
{

    clic = (event) =>
    {
        const id = parseInt(event.target.id);
        this.props.clic(id);
    }
  
    
    render()
    {
    return <div className="grilleCalMen">{this.props.tabGrille.map((calcul, i) => 
    <div id={i} key={i} className="caseCalMen" style={Logique.constructionEmplacement(i, this.props.taille)} onClick={this.clic}>{calcul}</div>)}</div>
    }
}