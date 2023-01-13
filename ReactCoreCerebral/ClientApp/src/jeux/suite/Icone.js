import React, { Component } from 'react';
import '../../style/jeux.css';
import suite1 from '../../images/suite1.png';
import suite2 from '../../images/suite2.png';
import suite3 from '../../images/suite3.png';
import suite4 from '../../images/suite4.png';

export default class Icone extends Component {
    constructor(props) {
        super(props);
        this.elementEnCours = 0;
        this.state = {
            numero: this.props.tabNombre[this.elementEnCours],
            affichage : true
        }
        this.timer = 0;
    }
    componentDidMount() {
        this.timer = setInterval(this.updateTimer, this.props.interval);
    }
    updateTimer = () => {
       
        this.elementEnCours++;
        if (this.elementEnCours < this.props.tabNombre.length) {
            this.setState({
                affichage: false
            }, this.finAffichage);
        }
        else {
           this.finTimer();
        }
    }

    finAffichage = () =>
    {
        this.setState({
            numero: this.props.tabNombre[this.elementEnCours],
            affichage : true
        }, this.updateElement);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateElement = () =>
    {
      this.props.updateElement(this.elementEnCours);
    }

    finTimer = () => {

        this.props.finElements();
        clearInterval(this.timer);
    }

findImage()
{
    switch(this.state.numero)
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
    return <div className="emplacementImageSuite">{this.state.affichage && <div className="animationSuite"><div className={"nombreSuite " + this.props.fond} style={{backgroundImage : "url("+ this.findImage()   + ")"}}></div></div>}</div>
    }
}