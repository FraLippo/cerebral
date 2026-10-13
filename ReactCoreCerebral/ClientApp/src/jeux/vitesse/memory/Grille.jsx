import React, { Component } from 'react';




export default class Grille extends Component
{

    clic = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        this.props.clic(id);
      
    }
    render()
    {
        return <div className="grilleMry">{this.props.tabGrille.map((info, i) =>
             <div  onClick={this.clic} className={info.etat === 'vide' ?"caseMry caseNoirMry" :info.etat === 'trouve' ? "caseMry changeCouleur" :"caseMry" } key={i} id={i}>{info.etat === 'vide' ? '' : info.image}
                </div>)}</div>
    }
}