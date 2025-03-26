import React, { Component } from 'react';




export default class Grille extends Component
{

   
    render()
    {
        return <div className="grilleCoupe">{this.props.tabGrille.map((mot, i) =>
             <div className="caseCoupe" key={i}>{mot}</div>)}
               </div>
    }
}