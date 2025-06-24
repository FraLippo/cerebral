import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille';
import { Button, message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';


const TAILLE = 12;
export default class JeuMah extends Component {

    constructor() {
        super();
        this.logique = new Logique();
        this.state = {
            tabTuiles: [],
            tabGrille: [],
            score: 0,
            afficheResultat: false
        }
    }

    nouvelleGrille = () => {
        this.logique.reset();
        this.logique.constructionGrille();
        this.setState({
            tabTuiles: this.logique.tabTuiles,
            tabGrille: this.logique.tabGrille
        })
    }

    componentDidMount() {
        this.nouvelleGrille();
    }



    tuilePossible(i) {
        if (this.state.tabTuiles[i].pos % TAILLE === 0) {
            return true;
        }
        if (this.state.tabTuiles[i].pos % TAILLE === TAILLE - 1) {
            return true;
        }
        if (this.state.tabTuiles[i].pos % TAILLE > 0 && this.state.tabGrille[this.state.tabTuiles[i].pos - 1] === 0) {
            return true;
        }
        if (this.state.tabTuiles[i].pos % TAILLE < TAILLE && this.state.tabGrille[this.state.tabTuiles[i].pos + 1] === 0) {
            return true;
        }
        return false;
    }
    verifiePaire = () => {
        let m = new Map();
        for (let index = 0; index < this.state.tabTuiles.length; index++) {


            if (this.tuilePossible(index) && this.state.tabTuiles[index].etat !== 'trouve') {

                if (m.has(this.state.tabTuiles[index].nom)) {
                    let v = m.get(this.state.tabTuiles[index].nom);
                    v.push(this.state.tabTuiles[index]);
                }
                else {
                    m.set(this.state.tabTuiles[index].nom, [this.state.tabTuiles[index]])
                }
            }

        }
        let erreur = false;
        for (const [key, tab] of m) {
            if (tab.length === 2) {
                tab[0].etat = 'selection';
                tab[1].etat = 'selection';
                erreur = true;
            }
        }
        if (erreur) {
            message.error('Il restait des possibilités (-20 points).', 2, this.nouvelleGrille)
            this.setState({
                tabTuiles: [...this.state.tabTuiles],
                score: this.state.score <= 20 ? 0 : this.state.score - 20
            }
            )
        }
        else {
            this.nouvelleGrille();
        }

   
    }

    clicTuile = (i) => {

        let score = this.state.score;
        let nouveauTabTuiles = [...this.state.tabTuiles];
        let nouveauTabGrille = [...this.state.tabGrille];

        if (nouveauTabTuiles[i].etat === 'selection') {

            nouveauTabTuiles[i].etat = 'initial'
        }
        else {


            if (this.tuilePossible(i)) {
                nouveauTabTuiles[i].etat = 'selection';
            }

            let tabResult = nouveauTabTuiles.filter(x => x.etat === 'selection');
            if (tabResult.length === 2) {
                if (tabResult[0].img === tabResult[1].img) {
                    score += 3;
                    tabResult[0].etat = 'trouve';
                    tabResult[1].etat = 'trouve';
                    nouveauTabGrille[tabResult[0].pos] = 0;
                    nouveauTabGrille[tabResult[1].pos] = 0
                }
                else {
                    tabResult[0].etat = 'initial';
                    tabResult[1].etat = 'initial';
                }
            }
        }
        let tabFin = nouveauTabTuiles.filter(x => x.etat !== 'trouve');
      
        if (tabFin.length === 0) {
            score += 5;
            message.success('Bravo (+ 5 points)', this.nouvelleGrille);
        }

        this.setState({
            tabTuiles: nouveauTabTuiles,
            tabGrille: nouveauTabGrille,
            score
        })
    }

       finTimer = () =>
    {
        this.setState({afficheResultat : true});
    }

    render() {
        return  <React.Fragment>
            <Helmet>
                <title>Le mahjong solitaire</title>
                        <meta name="description" content="Découvrez notre version du mahjong solitaire, un jeu de rapidité et de concentration." />
        
                    </Helmet>
               {this.state.afficheResultat ?  <Resultat score={this.state.score} typeExo='vitessemah'></Resultat>  :
        <div>
            <div className='centreGrilleMah'>
                <Grille taille={TAILLE} tabTuiles={this.state.tabTuiles} clicTuile={this.clicTuile}></Grille></div>

            <div className='centre margeMenu'><Button type='primary' onClick={this.verifiePaire}>Plus de paires possibles</Button></div>
       <div className='centre'>Score {this.state.score}</div>
               <div className="marge20 centre"> <CompteRebours temps={140} finTimer={this.finTimer}></CompteRebours></div>
       
       <div className='fontMoyenne margeMenu couleurTitre centre'>Mahjong Solitaire</div>
        </div>}</React.Fragment>
    }
}