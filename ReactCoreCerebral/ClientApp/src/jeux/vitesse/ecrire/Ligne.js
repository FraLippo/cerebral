import React, { Component } from 'react';



export default class Ligne extends Component
{

    
    render()
    {
    return <div className="espaceHaut ligneEcrire">{this.props.tabLettres.map((lettre,i) => <span id={i} key={i} className={i < this.props.position ? "caseEcrire caseEcrire1" :"caseEcrire"}>{lettre}</span>)}</div>
    }
}