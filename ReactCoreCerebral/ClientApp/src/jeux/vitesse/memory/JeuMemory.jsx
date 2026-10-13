import React, { Component } from 'react';
import {message } from "antd"
import Grille from './Grille';
import Resultat from '../commun/Resultat';
import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';

export default class JeuMemory extends Component {

    constructor(props) {
        super(props);

        let tabImage = ['🎉', '🎉', '🎈', '🎈', '🎲', '🎲', '🍕', '🍕', '🍩', '🍩', '🍿', '🍿', '🎠', '🎠', '🎸', '🎸',
         '🚀', '🚀', '🌈', '🌈', '🎬', '🎬', '🍦', '🍦','🎩', '🎩', '🎵', '🎵', '🎭', '🎭', '🎮', '🎮','🍔', '🍔', '😋', '😋']

        let tabGrille = [];
        for (let index = 0; index < tabImage.length; index++) {
            tabGrille.push({ image: tabImage[index], etat: 'vide', numero: index % 2 === 1 ? index - 1 : index });

        }
     
        tabGrille = this.shuffleArray(tabGrille);
        this.state =
        {
            score : 0,
            tabGrille,
            afficheResultat : false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        const margeEcran = document.querySelector('.margeEcran');
        if (margeEcran) { margeEcran.scrollTop = 0; }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Génère un indice aléatoire entre 0 et i inclus
            [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments d'indice i et j
        }
        return array;
    }

    clic = (id) => {
        let score = this.state.score;
        let nouveauTabGrille = [...this.state.tabGrille];
        if (nouveauTabGrille[id].etat === 'vide') {

            let selections = nouveauTabGrille.filter(x => x.etat === 'selection');
            nouveauTabGrille[id].etat = 'selection';
        
            if (selections.length === 1) {
                if (selections[0].numero === nouveauTabGrille[id].numero) {
                    selections[0].etat = 'trouve';
                    nouveauTabGrille[id].etat = 'trouve';
                    score += 5;
                }
              
            }
            if (selections.length === 2) {
                selections[0].etat = 'vide';
                selections[1].etat = 'vide';
            }
            if (nouveauTabGrille.find(x => x.etat !== 'trouve') == null)
            {
                score += 30;
                message.success("Bravo, terminé", 2, this.finTimer)
            }
            this.setState({ tabGrille: nouveauTabGrille, score });
        }
    }

    finTimer = () => {
     
        this.setState({afficheResultat : true});
    }



    render() {
        return <React.Fragment>
            <Helmet>
            <title>Le jeu du mémory</title>
            <meta name="description" content="Le jeu du memory, où il faut trouver des paires, transformé en test de rapidité. Serez-vous le plus rapide ?" />
        </Helmet>
        {this.state.afficheResultat ? <Resultat score={this.state.score} typeExo='vitessememory'></Resultat>:
            <div className="jeuMry">
            <Grille tabGrille={this.state.tabGrille} clic={this.clic}></Grille>
            <div className='marge20'>Score : {this.state.score}</div>
           <CompteRebours finTimer={this.finTimer} temps={60}></CompteRebours>
           <div className='marge20 titreJeu'>Le Memory</div>
           <p>Retrouve les paires cachées</p>
           <p>Notre Memory est une version revisitée du célèbre jeu du mémory : ici, c'est le joueur qui choisit le temps d'affichage des cartes avant qu'elles ne se retournent. Ce mode dynamique permet de travailler la mémoire visuelle, la rapidité d'analyse et la concentration, tout en offrant une expérience plus personnalisée et stimulante. Un excellent exercice cognitif pour progresser à son rythme.</p>
            </div>}
        </React.Fragment>

    }

}