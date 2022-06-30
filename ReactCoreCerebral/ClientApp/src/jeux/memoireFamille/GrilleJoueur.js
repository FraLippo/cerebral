import React, { Component } from 'react';

import LogiqueFamille from './LogiqueFamille';


export default class GrilleJoueur extends Component
{

    clickImage = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        this.props.clickImage(id);
        event.preventDefault();
      
    }

    bidon = (event) =>
    {
        event.preventDefault();
    }
    render()
    {
        return <div onClick={this.bidon} style={{touchAction: "manipulation"}} className="grilleFamille">{this.props.grille.map((no, i) => no !== -1 && <img className="imageFamille" key={i} style={LogiqueFamille.constructionEmplacement(i, this.props.taille)}  id={i} onClick={this.clickImage} src={LogiqueFamille.obtenirImage(no)}  alt={"jeu precedent" + i} ></img>)}</div>
    }
}