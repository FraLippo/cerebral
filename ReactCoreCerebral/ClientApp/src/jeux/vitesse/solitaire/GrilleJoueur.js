import React, { Component } from 'react';

import Logique from './Logique';


export default class GrilleJoueur extends Component
{

    clickImage = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        this.props.clickImage(id);
      
    }
    render()
    {
        return <div className="grilleMah">{this.props.grille.map((no, i) => no !== -1 && <div  onClick={this.clickImage} key={i} id={i} style={Logique.constructionEmplacement(i, this.props.taille)}><img className="imageFamille" src={Logique.obtenirImage(no)}  alt={"jeu MahJong" + i} ></img></div>)}</div>
    }
}