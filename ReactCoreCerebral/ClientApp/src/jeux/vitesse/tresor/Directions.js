import React, { Component } from 'react';

import flecheHaut from '../../../images/flecheHaut.png';
import flecheBas from '../../../images/flecheBas.png';
import flecheGauche from '../../../images/flecheGauche.png';
import flecheDroite from '../../../images/flecheDroite.png';
import woman from '../../../images/woman.png';
import euro from '../../../images/euro.png';

export default class Directions extends Component {

   

    no = 0;
    choixImage(type) {
        switch (type) {
            case "haut":
                return flecheHaut;
            case "bas":
                return flecheBas;
            case "droit":
                return flecheDroite;
            case "gauche":
                return flecheGauche;

        }
    }

    render() {
        return <div className="marge10 directionsTresor">{this.props.tabDirections.map((type, i) => <div id={this.no+100} key={++this.no} ><img src={this.choixImage(type)} alt="direction"></img></div>)}</div>
    }
}