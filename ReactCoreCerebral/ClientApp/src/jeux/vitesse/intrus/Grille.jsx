import React, { Component } from 'react';

import Logique from './Logique';


export default class Grille extends Component
{

    clicImage = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        this.props.clicImage(id);
      
    }
    render()
    {
        return <div className="grilleCalMen">{this.props.tabGrille.map((no, i) =>
             <div  onClick={this.clicImage} key={i} id={i} style={Logique.constructionEmplacement(i, this.props.taille)}>
                <img className='noInteraction'  src={Logique.obtenirImage(this.props.type,no)}  alt={"jeu intrus" + i} ></img></div>)}</div>
    }
}