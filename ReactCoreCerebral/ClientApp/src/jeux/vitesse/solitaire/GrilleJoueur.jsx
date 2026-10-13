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
        return <div className="grilleMahj">{this.props.grille.map((no, i) => no !== -1 && <div  onClick={this.clickImage} key={i} id={i} style={Logique.constructionEmplacement(i, this.props.taille)}><img src={Logique.obtenirImage(no)}  alt={"tuile MahJong" + i} ></img></div>)}</div>
    }
}