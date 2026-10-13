import React, { Component } from 'react';


export default class Grille extends Component
{


    render()
    {
    return this.props.tabGrille.map((type, i) => <div key={i+this.props.no} className={type === 1 ? "caseCompletBleu" :type === 0? "caseVideComplet" : this.props.noJeu % 2 === 0? "caseVideComplet2"  :"caseBlancheComplet"} ></div>)
    

    }
}