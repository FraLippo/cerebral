import React, { Component } from 'react';



export default class Grille extends Component
{

    clic = (event) =>
    {
        const id = parseInt(event.target.id);
        this.props.clic(id);
    }
    render()
    {
    return <div className="grilleRece">{this.props.tabGrille.map((contenu, i) => 
    <div key={i+1000} className={(contenu.toString().charCodeAt(0) >= 65 && contenu.toString().charCodeAt(0) <= 72) || (contenu >= 1 && contenu <=8)? "headerRece caseRece" : "caseRece"} >{contenu}</div>)}</div>
    }
}