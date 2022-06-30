import React, { Component } from 'react';
import '../../style/jeux.css';

export default class Carte extends Component {

    constructor() {
        super();
        this.state =
        {
            affichage: ""
        }
    }

    constructionEmplacement(position) {

        return {
            gridColumnStart: position + 1,
            gridColumnEnd: position + 1,
            gridRowStart: 1,
            gridRowEnd: 1
        }
    }

    clickCarte = (e) => {
        const id = parseInt(e.currentTarget.id);
        this.props.clickCarte(id);
       
    }

    render() {
        return <div className={"animationSuite carteCompte pointeur " + (!this.props.affichage && "cache")} id={this.props.position} onClick={this.clickCarte} style={this.constructionEmplacement(this.props.position)}>{this.props.nombre}</div>
    }

}