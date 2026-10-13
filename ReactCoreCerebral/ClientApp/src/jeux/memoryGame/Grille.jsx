
import React, { Component } from 'react';
import Logique from './Logique';



export default class Grille extends Component {

    clickNumero = (event) => {
        const id = parseInt(event.currentTarget.id);
        this.props.clickNumero(id - 1000);

    }

    definirClasseCase = (donnee) => {
        if (donnee.contenu === 'X') {
            return 'liColVide';
        }
        else if (donnee.contenu === 'O') {
            return 'liColPlein';
        }
        else if (donnee.trouve) {
                return 'caseCache';
        }
        else
        {
            return 'imageMemory';
        }
        
    }

    definirClasseImage = (donnee) => {
        if (donnee.affiche) {
            return 'imageShow';
        }
        else
        {
            return 'imageHide';
        }
        
    }


  
    render() {
        return <div className={"grilleMemory" + (this.props.taille + 1)}>{this.props.grille.map((donnee, i) =>
            donnee.contenu !== '-1' && <div className={this.definirClasseCase(donnee)} onClick={this.clickNumero} key={i} id={i + 1000} style={Logique.constructionEmplacement(i, this.props.taille + 1)}>
                {donnee.contenu === 'X' || donnee.contenu === 'O' ? '' : <img className={this.definirClasseImage(donnee)} src={donnee.contenu} alt={"im" + i}></img>}</div>)}</div>
    }
}