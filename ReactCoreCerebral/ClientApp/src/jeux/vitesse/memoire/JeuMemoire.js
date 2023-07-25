import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille'
import { Button, message } from 'antd';
import Helmet from 'react-helmet';
import withRouter from '../../../components/commun/withRouter';

import Resultat from '../commun/Resultat';
import CompteRebours from '../commun/CompteRebours';



class JeuxMemoire extends Component {
    constructor(props) {
        super(props);
        this.stop = false;
        this.score =0;
        this.taille = 5;
        this.nbJeu = 0;
        this.nbCases = [3,3,3,3,4,4,4,5,5,6,7,8,9,10];
        this.state = {
            tabGrilleComplete: Logique.construireGrille(Array(this.taille * this.taille).fill(0), this.nbCases[this.nbJeu]),
            tabGrille: Array(this.taille * this.taille).fill(0),
            afficheResultat: false,
            type: 'memorisation'
        }

        this.fin = false;

    }

    nouveauJeu = () =>
    {
        this.fin = false;
        this.setState({ 
            tabGrilleComplete: Logique.construireGrille(Array(this.taille * this.taille).fill(0), this.nbCases[this.nbJeu]),
            tabGrille: Array(this.taille * this.taille).fill(0),
            type: 'memorisation' });
    }


    clic = (id) => {
        if (this.state.type === 'memorisation' || this.fin) return;
        let nouveauTabGrille = [...this.state.tabGrille];
        if (nouveauTabGrille[id] === 0) {
            
            nouveauTabGrille[id] = 1;
        }
        this.setState({ tabGrille: nouveauTabGrille });
        if (this.state.tabGrilleComplete[id] === 0) {
            this.fin = true;
            message.error('Mauvaise case', 1.5, this.nouveauJeu);
        }
        else
        {
            this.score++;
        }
        if (this.state.tabGrilleComplete.toString() === nouveauTabGrille.toString()) {
            if (this.nbJeu < this.nbCases.length-1)
            {
                this.nbJeu++;
            }
            this.fin = true;
            message.success('Bravo', 1.5, this.nouveauJeu);
        }


    }

    clicSuite = () => {
        this.setState({ type: 'jeu' })
    }

    finTimer = () =>
    {
        this.setState({afficheResultat : true});
    }

    render() {

        return <div>
            <Helmet>
                <title>Le jeu de la mémoire</title>
                <meta name="description" content="Un jeu de rapidité et de mémorisation pour tous les âges et toute la famille, le principe est simple : se souvenir de ce que l'on vient de voir." />
            </Helmet>
           {this.state.afficheResultat ?  <Resultat score={this.score} typeExo='vitesseMemoire'></Resultat>  :
           <React.Fragment>  <div className='titreJeu'>Le jeu de la mémoire</div>
            <div className="espaceTitreBas">Vous devez mémoriser les cercles qui s'affichent pour ensuite les reproduire à l'identique.</div> 
             <div className='jeuTimerMemoireV'>     
            {this.state.type === 'memorisation' ?  
                    <div className='centreMemoireV'><Grille tabGrille={this.state.tabGrilleComplete} taille={this.taille} clic={this.clic}></Grille>
                    <Button type='primary' className="tailleBoutonMemoireV marge10" onClick={this.clicSuite}>J'ai mémorisé</Button> </div> :
                <div className='centreMemoireV'><Grille tabGrille={this.state.tabGrille} taille={this.taille} clic={this.clic}></Grille>
                    <div  className="tailleBoutonMemoireV marge10">Reproduire le dessin</div></div>
                } <div className="timerMemoireV"> <CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
                
            </div></React.Fragment> }
           

        </div>
    }

}
export default withRouter(JeuxMemoire)