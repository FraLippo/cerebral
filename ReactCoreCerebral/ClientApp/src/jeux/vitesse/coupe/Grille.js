import React, { Component } from 'react';




export default class Grille extends Component
{

   


    render()
    {
        return <div className="grilleCoupe">{this.props.tabGrille.map((mot, i) =>
             <div className={`caseGrilleCoupe ${mot.etat === 'selection' ? 'caseGrilleSelCoupe' : ''}`} 
             onClick={() => this.props.clicGrille(i)} key={i}>
                <span className={`${mot.etat === 'enjeu' ? 'caseGrilleJeuCoupe' : ''}`}>{mot.syllabe}</span></div>)}
               </div>
    }
}