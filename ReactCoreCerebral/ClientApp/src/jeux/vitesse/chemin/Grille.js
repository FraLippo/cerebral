import React, { Component } from 'react';
import Logique from './Logique';


export default class Grille extends Component
{

    clic = (event) =>
    {
        const id = parseInt(event.target.id);
        this.props.clic(id);
    }
  
    
    render()
    {
    return this.props.tabGrille.map((type, i) => <div id={i} key={i} className="caseChemin" style={Logique.constructionEmplacement(i, this.props.taille)} onClick={this.clic}></div>)
    

    }
}