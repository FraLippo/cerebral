
import React, { Component } from 'react';
import Logique from './Logique';


export default class GrilleJoueur extends Component {

    clickNumero = (event) => {
        const id = parseInt(event.currentTarget.id);
        this.props.clickNumero(id - 1000);

    }

    definirClasse = (index) => {
        let sel = '';
        if (this.props.numeroEnCours !== -1) {
            let x = Math.floor(this.props.numeroEnCours / this.props.taille);
            if ((index >= x * this.props.taille && index < (x * this.props.taille) + this.props.taille) || (index % this.props.taille === this.props.numeroEnCours % this.props.taille)) {
                sel = " gros";
            }
        }
            if (this.props.numeroEnCours === index) {
                return 'nombreGrille pointInterrogation nombreSelectionF';
            }
            if (this.props.grilleOrigine[index] === '?') {
                return 'nombreGrille pointInterrogation' + sel;
            }
            if (index < this.props.taille || (index + 1) % this.props.taille === 0) {
                return 'nombreAddition' 
            }
            else {

                return "nombreGrille" + sel;
            }

        }
        render()
        {
            return <div className={"grilleFubuki" + this.props.taille + " apparition"}>{this.props.grille.map((no, i) => no !== -1 && <div className={this.definirClasse(i, no)} onClick={this.clickNumero} key={i} id={i + 1000} style={Logique.constructionEmplacement(i, this.props.taille)}>{no}</div>)}</div>
        }
    }