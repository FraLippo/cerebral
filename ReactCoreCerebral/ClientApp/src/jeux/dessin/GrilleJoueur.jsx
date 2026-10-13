import React, { Component } from 'react';
import LogiqueMemoire from './LogiqueMemoire';


export default class GrilleJoueur extends Component
{
    constructor(props)
    {
        super(props);
        let tab= Array(this.props.taille * this.props.taille).fill('carreMemoire white');
        this.state = { tabCouleur : tab }
    }

  

    click = (event) =>
    {
        const id = parseInt(event.target.id);
        let couleur = this.state.tabCouleur[id].split(' ')[1];
        let nouveauTabCouleur = [...this.state.tabCouleur];
        let nouvelleCouleur = LogiqueMemoire.prochaineCouleur(couleur, this.props.nbCouleurs);
      
        nouveauTabCouleur[id] = 'carreMemoire ' + nouvelleCouleur;
            
        
        
        this.setState({tabCouleur : nouveauTabCouleur}, () => this.props.checkFin(id, nouvelleCouleur));
        
        
    }

    render()
    {
        return <div className={"grilleMemoire" + (this.props.grilleJeu ? " disabledMemoire" : "")} >{this.props.tabGrille.map((numero,i) => <div id={i} key={i} onClick={this.click} className={this.state.tabCouleur[i]} style={LogiqueMemoire.constructionEmplacement(i, this.props.taille)}></div>)}</div>
    }
}