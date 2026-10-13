import React, { Component } from 'react';



export default class Ligne extends Component
{

    
    render()
    {
    return <div className="espaceHaut ligneEcrire">{this.props.tabLettres.map((lettre,i) => <span id={i} key={i} className={i === this.props.position ? "caseEcrire caseEnCoursEcrire" :i < this.props.position ? "caseEcrire caseFiniEcrire" : "caseEcrire" }>{lettre}</span>)}</div>
    }
}