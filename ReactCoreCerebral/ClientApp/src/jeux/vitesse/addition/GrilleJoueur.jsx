import React, { Component } from 'react';
import Logique from '../chemin/Logique';


export default class GrilleJoueur extends Component
{

    clic = (event) =>
    {
        const id = parseInt(event.target.id);
        this.props.clic(id);
    }
  
  
    
    render()
    {
    return this.props.tabGrille.map((type, i) => <div id={i} key={i+this.props.no} className={"caseAdditionJoueur " + (type === 0 ? "videAddition" : "pleinAddition")} onClick={this.clic} style={Logique.constructionEmplacement(i, this.props.taille)} ></div>)
    

    }
}