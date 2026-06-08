import React, { Component } from 'react';
import woman from '../../../images/woman.png';
import euro from '../../../images/euro.png';


export default class Briques extends Component
{

    clic = (i) =>
    {
        this.props.clicMur(i);
    }
  
   

    
    render()
    {
    return this.props.tabBriques.map((element, i) => 
    <div key={i} onClick={() => this.clic(element.no)} className={element.etat === 'clic' ? "lettre-mur cache-mur" : element.selection ? "lettre-mur selection-mur" : "lettre-mur"}>
        {element.lettre}</div>)
        
    }
}