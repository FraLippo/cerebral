
import React, { Component } from 'react';
import { donneesMots } from './listeMots';
import Mots from './Mots';
import Images from './Images';
import Choix from './Choix';
import { Button, message } from 'antd';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';
import JeuParcours from './JeuFlip';
import CompteRebours from '../commun/CompteRebours';

export default class JeuAlz extends Component {

    constructor() {
        super();
   
        this.state = {
            tabMots: [],
            afficheEtat: 'liste',
            tabImages: [...donneesMots],
            tabChoix: [],
            afficheResultat: false,
            noPartie : 0,
            score :0
        };
        this.noPartie = 0;
        this.tabPartie = [{  nbElements: 3 }, { nbElements: 4 }, {nbElements: 5 }]
        this.erreur = 0;
        this.erreurTotal = 0;
        this.stop = false;
        this.nbPipes = 3;

    }
   
    componentDidMount() {
        this.setState({ tabMots: this.tirageDonnees(),
            tabChoix: new Array(this.tabPartie[this.noPartie].nbElements).fill("vide"),
        noPartie : this.noPartie+1});
    }
    tirageDonnees = () => {
    
        let liste = [...donneesMots]
        let tabTirage = [];
        for (let index = 0; index < this.tabPartie[this.noPartie].nbElements; index++) {
            let nombreTire = Math.floor(Math.random() * liste.length);

            tabTirage.push(liste[nombreTire]);
            liste.splice(nombreTire, 1);
        }
        return tabTirage;

    }


    arriere = () => {
        if (this.stop) {return;}
        let nouveauChoix = [...this.state.tabChoix];
        for (let index = nouveauChoix.length - 1; index >= 0; index--) {
            if (nouveauChoix[index] !== "vide") {
                nouveauChoix[index] = "vide";
                break;
            }

            this.setState({ tabChoix: nouveauChoix });

        }
    }
    jeuReussi = () =>
        {
            this.setState({ 
                afficheEtat: 'souvenir'
            })
        }
    finMots = () =>
    {
        this.setState({ 
            afficheEtat: 'flip'
        })
    }
    choixImage = (id) => {
        if (this.stop) {return;}
        let score = this.state.score;
        let nouveauChoix = [...this.state.tabChoix];

        let place = nouveauChoix.findIndex(x => x === "vide");
        nouveauChoix[place] = this.state.tabImages[id];

        if (place === this.state.tabChoix.length - 1) {

            let tabReponse = [];
            let trouve = 0;
            for (let index = 0; index < this.state.tabMots.length; index++) {
        
                if (tabReponse.findIndex(x => x === nouveauChoix[index]) === -1) {
                    for (let j = 0; j < this.state.tabMots.length; j++) {
                        if (nouveauChoix[index] === this.state.tabMots[j]) {
                            trouve++;
                            tabReponse.push(nouveauChoix[index]);
                            break;
                        }
                    }
                }
            }
            this.erreur = this.state.tabMots.length - trouve;
            this.stop = true;
            if (this.erreur === 0) {
                message.success("Bravo", 2, this.nouvellePartie);
                score += 7;
            }
            else {
                message.error("Perdu, fautes : " + this.erreur, 2, this.nouvellePartie);
            }
        }
        this.setState({ tabChoix: nouveauChoix });
    }
    nouvellePartie = () => {
        this.noPartie++;
      
        this.nbPipes = this.tabPartie[this.noPartie].nbElements;
        this.erreurTotal += this.erreur;
        if (this.noPartie === this.tabPartie.length)
        {
            this.setState({score : this.state.score + 40,
                afficheResultat : true
            });
        }
        else
        {
            this.stop = false;
           
            this.erreur = 0;
            this.setState({ tabMots: this.tirageDonnees(),
                tabChoix: new Array(this.tabPartie[this.noPartie].nbElements).fill("vide"),
                afficheEtat: 'liste',
                noPartie : this.noPartie+1
            })
        }
    }

    finTimer = () =>
        {
            this.setState({afficheResultat : true});
        }
    render() {
       
        return <div>
             <Helmet>
                    <title>Test mémoire de long terme</title>
                    <meta name="description" content="Un jeu de mémorisation pour évaluer son âge mental. Retenez une liste de mots pour ensuite pouvoir choisir les dessins correspondants." />
                </Helmet>
             {this.state.afficheResultat ?  <Resultat score={this.state.score} typeExo='vitessealz'></Resultat> :
        <div> <div className='titreJeu'>Mémoire de long terme</div> 
        {this.state.afficheEtat === 'liste' ? <div><Mots finMots={this.finMots}  tabMots={this.state.tabMots}></Mots> </div>:
          
          this.state.afficheEtat === 'flip' ?  <JeuParcours jeuReussi={this.jeuReussi} nbPipes={this.nbPipes}></JeuParcours> :<div><div className="margeHaut10 centre fontMoyenne">Choisir les images qui correspondent aux mots que tu as retenus. L'ordre n'a aucune importance.</div>
            <Choix tabChoix={this.state.tabChoix} ></Choix>
           
            <Images tabImages={this.state.tabImages} choixImage={this.choixImage}></Images>
            <div className='margeHaut30'><Button onClick={this.arriere}>Revenir en arrière</Button></div>
            <p>Les icones proviennent du site Noun Project. </p>
        </div>}
        </div>}
        <div className='centre'>
          <div className="marge20"> <CompteRebours temps={30} finTimer={this.finTimer}></CompteRebours></div>
               <div className="marge20">Score : {this.state.score}</div></div>
        </div>
    }

}