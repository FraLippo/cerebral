import React, { Component } from 'react';
import Grille from './Grille'
import GrilleJoueur from './GrilleJoueur';
import { Button, message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';

export default class JeuAddition extends Component {
    constructor(props) {
        super(props);
        let tab1 = new Array(16).fill(0);
        let tab2 = new Array(16).fill(0);
        let tabJoueur = new Array(16).fill(0);
        this.nbCases = 1;
        this.state =
        {
            tab1: this.construireTableau(tab1),
            tab2: this.construireTableau(tab2),
            tabJoueur,
            score: 0,
            finJeu: false
        }
        this.fin = false;



    }
    construireTableau = (tab) => {
        let x = 0
        for (let index = 0; index < this.nbCases; index++) {
            do {
                x = Math.floor(Math.random() * tab.length);
            } while (tab[x] === 1)
            tab[x] = 1;

        }
        return tab;
    }
    clic = (no) => {
        if (this.fin) return;
        let nouveauTabJoueur = [...this.state.tabJoueur];
        if (nouveauTabJoueur[no] === 0) {
            nouveauTabJoueur[no] = 1;
        }
        else {
            nouveauTabJoueur[no] = 0;
        }
        this.setState({ tabJoueur: nouveauTabJoueur });
    }

    jeuSuivant = () =>
    {
        
       
        if (this.nbCases> 10) this.nbCases = 10;
        let tab1 = new Array(16).fill(0);
        let tab2 = new Array(16).fill(0);
        let tabJoueur = new Array(16).fill(0);
        this.setState({tab1: this.construireTableau(tab1),
            tab2: this.construireTableau(tab2),
            tabJoueur,});
            this.fin = false;


    }

    termine = () => {
        if (this.fin) return;
        this.fin = true;
        let tabReponse = [];
        for (let index = 0; index < this.state.tab1.length; index++) {
            tabReponse[index] = this.state.tab1[index] ^ this.state.tab2[index];
        }
        console.log(tabReponse);
        let index = 0;
       
        while (index < this.state.tabJoueur.length && this.state.tabJoueur[index] === tabReponse[index]) {
         
            index++;
        }
        if (index === this.state.tabJoueur.length) {
            this.nbCases++;
            message.success('Bravo 👍',.5, this.jeuSuivant);
            this.setState({score : this.state.score + (this.nbCases*3)})
        }
        else {
            message.error('Pas la bonne solution',.8, this.jeuSuivant);
        }
    }

    finTimer = () => {
        this.setState({finJeu : true});
    }
  

    render() {

        return <div>
             {this.state.finJeu ?
                <Resultat score={this.state.score} typeExo='vitesseaddition'></Resultat> :
       <React.Fragment> <div className="jeuAddition">
            <div className="plateauAddition">
            <div className="grilleAddition">  <Grille tabGrille={this.state.tab1} taille={4} no={100}></Grille></div>
            <div className="tailleJeu">⊕</div>
            <div className="grilleAddition"><Grille tabGrille={this.state.tab2} taille={4} no={200}></Grille></div>
            <div className="tailleJeu">=</div>
            <div className="grilleAddition"><GrilleJoueur clic={this.clic} tabGrille={this.state.tabJoueur} taille={4} no={300}></GrilleJoueur></div>
          </div> 
          <div className="infoAddition">
            <div ><CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
           <div  className="marge10"><Button onClick={this.termine}>J'ai terminé</Button></div>
           </div>
           </div> 
           <div className="titreJeu">Addition XOR</div>
           <div>Vous devez additionner les 2 grilles violettes dans la grille rouge. Une case bleue ajoutée à une case blanche donne une case bleue. Attention ! Une case bleue ajoutée à une case bleue donne une case blanche.</div>
          </React.Fragment>}
        </div>
    }


}
