import React, { Component } from 'react';
import Logique from '../chemin/Logique';


export default class Grille extends Component
{

   
  
    
    render()
    {
    return this.props.tabGrille.map((type, i) => <div key={i+this.props.no} className={"caseGrilleAddition " + (type === 0 ? "videAddition" : "pleinAddition")} style={Logique.constructionEmplacement(i, this.props.taille)} ></div>)
    

    }
}