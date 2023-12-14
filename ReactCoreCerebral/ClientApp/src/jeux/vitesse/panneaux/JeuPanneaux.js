import React, { Component } from 'react';
import { choixQuestions, listePanneaux } from './Panneaux';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';


import { Helmet } from 'react-helmet';



export default class JeuPanneaux extends Component {

    constructor(props) {
        super();
        let tabPanneaux = listePanneaux();
        this.choixQuestions = choixQuestions();
        this.noQuestion = 0;
       
        this.state =
        {
            tabPanneaux,
            question: tabPanneaux[this.choixQuestions[this.noQuestion]].nom,
            score : 0,
            afficheResultat : false
        }
    }

    finJeu = () =>
    {
        if (this.noQuestion == this.state.tabPanneaux.length)
        {
            this.setState({afficheResultat : true, score : this.state.score + 50})
        }
    }

    clic = (event) => {
   
        const id = parseInt(event.currentTarget.id); 
            console.log("clic " + id);
        let score = this.state.score;
        let nouveauTabPanneau = [...this.state.tabPanneaux];
        if (nouveauTabPanneau[id].etat === 'fade-outRece fade') return;
            if (id === this.choixQuestions[this.noQuestion]) {
                nouveauTabPanneau[id].etat = 'fade-outRece fade';
                if (this.noQuestion < nouveauTabPanneau.length) {
                    console.log(this.noQuestion);
                    console.log(nouveauTabPanneau.length);
                    this.noQuestion++;
                }
                   
                 
                score += 2;
           }
            else {
                message.error("Ce n'est pas le bon panneau 😞");
                score = score > 4 ? score - 4 : 0;
            }
          
            this.setState({
                tabPanneaux: nouveauTabPanneau,
                question: this.noQuestion < nouveauTabPanneau.length ? nouveauTabPanneau[this.choixQuestions[this.noQuestion]].nom : "",
                score
            }, this.finJeu);
        
        
    }

    finTimer = () => {
        this.fin = true;
        this.setState({ afficheResultat: true });

    }

    render() {


        return <React.Fragment>
            <Helmet>
                <title>Retrouver les panneaux routiers</title>
                <meta name="description" content="Un jeu accessible à tous où vous devez être concentré pour trouver la tuile de mah-jong solitaire parmi une série de tuiles." />

            </Helmet>
            {this.state.afficheResultat ?
             <Resultat score={this.state.score} typeExo='vitessepanneauroutier'></Resultat> :
            <div className='jeuMatch'>
                <div className='grilleRece'>{this.state.tabPanneaux.map((info, i) => <div className='panneauRoute' key={i} onClick={this.clic} id={i} ><img key={i + 500} draggable="false" className={info.etat} src={info.id} alt="panneaux"></img></div>)}</div>
                <div>Clique sur le panneau représentant :</div>
                <div className='fontMoyenne'>{this.state.question}</div>
                <div className='espaceHaut'></div>
                <div>Score : {this.state.score}</div>
               <CompteRebours temps={120} finTimer={this.finTimer}></CompteRebours>

            </div>}


        </React.Fragment>


    }
}
