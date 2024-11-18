import React, { Component } from 'react';


export default class Aide extends Component {


    clicLettre = (event) => {
        const id = parseInt(event.target.id);
        this.props.clicLettreAide(id)
    }
    
render()
{
    return <div className={`aideChasse`}>{this.props.aide.map((info, i) => 
    <div key={i} id={i+500} className={`caseChasse lettreAide${this.props.taille} caseCouleurChasse${this.props.taille} ${info.etat}`} onClick={this.clicLettre}>{info.lettre}</div>)}
    </div>
}
}