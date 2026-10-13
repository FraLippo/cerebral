import React, { Component } from 'react';


export default class Grille extends Component {

     constructionEmplacement(index, taille) {

        let y = (Math.floor(index / taille)) + 1;
        let x = index % taille + 1;
        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y,
        }
    }
    clicLettre = (event) => {
        const id = parseInt(event.target.id);
        this.props.clicLettre(id)
    }
    
render()
{
    return <div className={`grilleChasse   grilleChasse${this.props.taille}`}>{this.props.lettres.map((info, i) => 
    <div key={i} id={i} className={`caseChasse caseCouleurChasse${this.props.taille} ${info.etat}`} onClick={this.clicLettre} style={this.constructionEmplacement(i, this.props.taille)}>{info.lettre}</div>)}
    </div>
}
}