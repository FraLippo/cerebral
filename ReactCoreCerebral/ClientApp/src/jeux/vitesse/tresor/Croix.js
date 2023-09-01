import React, { Component } from 'react';

import flecheHaut from '../../../images/flecheHaut.png';
import flecheBas from '../../../images/flecheBas.png';
import flecheGauche from '../../../images/flecheGauche.png';
import flecheDroite from '../../../images/flecheDroite.png';
import { Button } from 'antd';

export default class Croix extends Component
{

    clic = (event) =>
    {
        const direction = event.currentTarget.id;
        this.props.clic(direction);
    }
  
 
    
    render()
    {
    return <div className="grilleCroix">
        <img src={flecheHaut} id="haut" onClick={this.clic} className="hautTresor flecheTresor" alt="flêche haut"></img>
        <img src={flecheBas} id="bas" onClick={this.clic}  className="basTresor flecheTresor " alt="flêche bas"></img>
        <img src={flecheGauche} id="gauche" onClick={this.clic}  className="gaucheTresor flecheTresor" alt="flêche gauche"></img>
        <img src={flecheDroite} id="droit" onClick={this.clic}  className="droitTresor flecheTresor" alt="flêche droit"></img>
        <Button className="effaceTresor" id="efface" onClick={this.clic}  >Efface</Button>
        <Button className='finTresor' onClick={this.props.ramassage}>Ramasser les pièces</Button>
    </div>
    }
}