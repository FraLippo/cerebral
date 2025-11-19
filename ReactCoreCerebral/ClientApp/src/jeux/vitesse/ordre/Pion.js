import React, { Component } from 'react';


export default class Pion extends Component {



    rechercherCouleur() {
       return this.props.donnee.couleur
        
    }
    rechercherForme() {
        return this.props.donnee.forme

    }

     rechercherTaille() {
        return this.props.donnee.taille;
        
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

        return <div className={"pionOr" + " " +  this.rechercherCouleur() + " " + this.rechercherForme() + " "+ this.rechercherTaille()}  
        style ={this.props.donnee.emplacement === -1 ? 
            stylePourGrille 
     :        stylePourTableau} 
             onClick={this.clickPion} >
      
            {this.props.donnee.valeur}
        </div>

    }

}