import React, { Component } from 'react';
import Indice from './Indice';
import data from './dataCreation';
import Grille from './Grille';
import Logique from './Logique';


export default class CreationPicross extends Component {

    constructor(props) {
        super();
        const index = 0; //taille 4  1 pour taille 6
        let donnees = data[index];
        this.taille = donnees.taille;
        this.state =
        {
            tabIndiceX : donnees.indiceX,
            tabIndiceY : donnees.indiceY,
            tabJeu : new Array(this.taille * this.taille).fill(0)

        }

    }

    clic = (id) =>
    {
        let nouveauTabIndiceX = [...this.state.tabIndiceX];
        let nouveauTabIndiceY = [...this.state.tabIndiceY];
        let nouveauTabJeu = [...this.state.tabJeu];

        Logique.ajoutIndice(nouveauTabIndiceX, nouveauTabIndiceY, nouveauTabJeu, id, this.taille);


        this.setState({
            tabIndiceX : nouveauTabIndiceX,
            tabIndiceY : nouveauTabIndiceY,
            tabJeu: nouveauTabJeu,
         
        })
    }

    generer = () =>
    {
        return <div>
            <div>{"{"}</div>
            <div>"temps" : 1000,</div>
            <div>{"\"indiceX\" : "+ JSON.stringify(this.state.tabIndiceX) +","} </div>
            <div>{"\"indiceY\" : "+ JSON.stringify(this.state.tabIndiceY) + ","} </div>
            <div>{"\"taille\" : "+ this.taille + ","} </div>
            <div>{"\"resultat\" : "+ JSON.stringify(this.state.tabJeu)} </div>
            <div>{"}"}</div>
        </div>
    }

    render() {
        return <div className="JeuPicross">
            <div className="grilleCentre">
                <div className="grillePicross">
                    <Indice type="x"  indice={this.state.tabIndiceX} ></Indice>
                     <Indice type="y"  indice={this.state.tabIndiceY} ></Indice> 
                    <Grille taille={this.taille} tabJeu={this.state.tabJeu} clic={this.clic}></Grille>
                 
            </div> 
              <div className="margeGauche30">{this.generer()}</div>
            </div>

        </div>

    }
}