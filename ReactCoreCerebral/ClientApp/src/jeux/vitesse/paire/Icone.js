import React, { Component } from 'react';
import '../../../style/jeux.css';
import '../../../style/vitesse.css';
import suite1 from '../../../images/suite1.png';
import suite2 from '../../../images/suite2.png';
import suite3 from '../../../images/suite3.png';
import suite4 from '../../../images/suite4.png';

export default class Icone extends Component {
    
findImage()
{
    switch(this.props.numero)
    {
        case 1 :
            return suite1;
        case 2 : 
            return suite2;
        case 3 : 
        return suite3;
        case 4:
            return suite4;
        default:
            return suite1;
    }
}

    render() {
    return <div className="emplacementImageSuite"><div className={"nombreSuite " + (this.props.numJeu % 2 === 0 ? "animationSuite" : "animationSuite2")} style={{backgroundImage : "url("+ this.findImage()   + ")"}}></div></div>
    }
}