import React, { Component } from 'react';
import Logique from './Logique';

export default class Grille extends Component
{

    clickNumero = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        this.props.clickNumero(id);
      
    }
    render()
    {
        const caseBingo = this.props.taille === 4 ? 'caseBingo4' : 'caseBingo5';
        return <div className={this.props.taille === 4 ? 'grilleBingo4' : 'grilleBingo5'}>{this.props.grille.map((cellule, i) => <div className={cellule.couleur === 'noir' ? caseBingo + ' noirci' : cellule.couleur === 'bleu' ? caseBingo + ' caseBleu'  : caseBingo} onClick={this.clickNumero} key={i} id={i} style={Logique.constructionEmplacement(i, this.props.taille)}>{cellule.nombre}</div>)}</div>
    }
}