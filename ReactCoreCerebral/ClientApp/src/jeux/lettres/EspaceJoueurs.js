import React, { Component } from 'react';


export default class EspaceJoueur extends Component {

   
    render()
    {
        return <div className="grilleJoueurs">{this.props.msgJoueurs.map((msg,i) => <div key={i} className="animationSuite"><div>{msg.info1}<b className="lettreViolet">{msg.prenom}</b></div><div key={msg.infoJeu} className="animationSuite">{msg.infoJeu}</div><div>{msg.score}</div></div>)}</div>
    }
}