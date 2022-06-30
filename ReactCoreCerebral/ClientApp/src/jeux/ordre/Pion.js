import React, { Component } from 'react';

import '../../style/jeux.css';

export default class Pion extends Component {



    rechercherCouleur() {
        switch (this.props.donnee.couleur) {
            case "rouge":
                return " rouge";
            case "vert":
                return " vert";
            case "jaune":
                return " jaune";
            default:
                return " jaune";
        }
    }
    rechercherForme() {
        switch (this.props.donnee.forme) {
            case "cercle":
                return " cercle";        
            default:
                return "";
        }

    }

    clickPion = () =>
    {
        this.props.click(this.props.donnee.ordre);
    }

    render() {

        const stylePourGrille =
        {
            gridColumnStart: this.props.donnee.x, 
            gridColumnEnd:this.props.donnee.x , 
            gridRowStart: this.props.donnee.y, 
            gridRowEnd: this.props.donnee.y,
            cursor: "pointer",
            zIndex : 5
        };

        const stylePourTableau =
        {
            gridColumnStart: this.props.donnee.emplacement, 
            gridColumnEnd:this.props.donnee.emplacement , 
            gridRowStart: 9, 
            gridRowEnd: 9,
            zIndex : 5
        }

        return <div className={"pion" + this.rechercherCouleur() + this.rechercherForme()}  
        style ={this.props.donnee.emplacement === -1 ? 
            stylePourGrille 
     :        stylePourTableau} 
             onClick={this.clickPion} >
      
            {this.props.donnee.valeur}
        </div>

    }

}