
import React, { Component } from 'react';


export default class Saisie extends Component
{

  
   

    render()
    {
        return <React.Fragment>
            <React.Fragment>{this.props.tabSaisie.map((element, i) =>
             <div  className={element.lettre ===  '' ? 'lettre-vide-mur' : 'lettre-mur' } 
             key={i+400}>{element.lettre}</div>)}</React.Fragment>
             
             
             </React.Fragment>
    }
}