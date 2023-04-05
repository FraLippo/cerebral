import React, { Component } from 'react';
import Grille from './Grille';
import Logique from './Logique';
import {message} from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import '../../../style/vitesse.css';

export default class JeuCalcul extends Component
{
    constructor(props)
    {
        super(props);
          this.logique = new Logique();
        this.nbDecouverte= 0;
        this.nbMax=15;
        this.state = {
            tabGrille : [],
            taille : 0,
            score : 0,
            afficheResultat : false,
            message: ''
        }
    }

    niveauSuivant = () => {  
        this.nbDecouverte= 0;
         this.logique.construireTableaux(this.nbMax,10);
        let tabGrille = this.logique.contruireChainesOperations();

       let message = this.logique.construireMessage();
      console.log(tabGrille);
        
       this.setState({ message, tabGrille});
       this.nbMax+= 10;
    }

    componentDidMount()
    {
        this.niveauSuivant();
    }

    clic = (no) => {
        let score = this.state.score;
        if (this.state.tabGrille[no].toString().length < 4) return;
        let nouveauTabGrille = [...this.state.tabGrille];
        if (this.logique.verifierResultat(no))
        {
            this.nbDecouverte++;
            nouveauTabGrille[no] = "";
            score++;

        }
        else
        {
            nouveauTabGrille[no] = this.logique.tabOperation[no].resultat;
            message.error("Mauvaise réponse");
            score--;
        }
        console.log(this.nbDecouverte)
        if (this.nbDecouverte === 2)
        {
            this.setState({ score});
            this.niveauSuivant();
        }
        else
        {

            this.setState({tabGrille : nouveauTabGrille, score});
        }


    }

    finTimer = () => {
        this.setState({afficheResultat : true});
    }
   
    render()
    {
return this.state.afficheResultat ? <Resultat score={this.state.score} typeExo='vitesseCalcul'></Resultat>:<div><div className="centreGrilleCalMen"><Grille clic={this.clic} taille={3} tabGrille={this.state.tabGrille}></Grille></div>
<div className="centre fontMoyenne messageCalMen">{this.state.message}</div>
<div className="centre marge20">Score: {this.state.score}</div>
<div className="centre"><CompteRebours finTimer={this.finTimer} temps={60}></CompteRebours></div>
</div>
}
}