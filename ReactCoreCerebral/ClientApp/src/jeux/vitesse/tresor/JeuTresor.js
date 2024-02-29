import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Resultat from '../commun/Resultat';
import Grille from './Grille';
import Croix from './Croix';
import Directions from './Directions';
import { message } from 'antd';
import Nombres from './Nombre';
import CompteRebours from '../commun/CompteRebours';


const TAILLE = 36;

export default class JeuTresor extends Component {


    constructor(props) {
        super();
        this.noDirection = 0;
        this.state = {
            afficheResultat: false,
            tabGrille: new Array(TAILLE).fill(0),
            tabDirections: []
        }
        this.timer = 0;
        this.fin = false;
        this.nbEuros = 1;
        this.score = 0;
    }

    componentDidMount() {
        this.positionObjets(this.nbEuros);

    }

    positionObjets() {
        let nouveauTabGrille = [...this.state.tabGrille];
        let pos = Math.floor(Math.random() * TAILLE);
        nouveauTabGrille[pos] = 1;
   

        let nb = 0;
        let tabPositionsPiece = [11, 12, 13,5,7, -5,-7, 2, -2, -11, -12, -13];

        let x;
        do {
            x = 0;
            for (let index = 0; index < this.nbEuros; index++) {
                do {
                    x++;
                    nb = Math.floor(Math.random() * tabPositionsPiece.length);
                    if (x === 10000) break;

                } while (!(pos + tabPositionsPiece[nb] >= 0 && pos + tabPositionsPiece[nb] < this.state.tabGrille.length && ((pos % 6) - (pos + tabPositionsPiece[nb]) % 6 >= -1) && (pos % 6) - (pos + tabPositionsPiece[nb]) % 6 <= 1 && nouveauTabGrille[pos + tabPositionsPiece[nb]] === 0));


                pos += tabPositionsPiece[nb];
                nouveauTabGrille[pos] = 2;
            }
        } while (x === 1000) //boucle de sécurité
        this.setState({
            tabGrille: nouveauTabGrille
        })
    }
    clic = (type) => {
        if (this.fin) return;
        let nouveauTabDirections = [...this.state.tabDirections];
        if (type !== 'efface') {
            nouveauTabDirections.push(type);
        }
        else {
            nouveauTabDirections.pop();

        } 
        this.setState({
            tabDirections: nouveauTabDirections
        })
    }
    reset = () => {
        this.fin = false;
        this.noDirection = 0;
        window.clearTimeout(this.timer);
        this.setState({
            tabGrille: new Array(TAILLE).fill(0),
            tabDirections: []
        }, this.positionObjets)
    }

    componentWillUnmount() {
        window.clearTimeout(this.timer);
    }
    deplacement = () => {
        let nouveauTabGrille = [...this.state.tabGrille];

        let index = this.state.tabGrille.findIndex(x => x === 1);
        nouveauTabGrille[index] = 0;
        let dep = 0;
        if (this.state.tabDirections[this.noDirection] === "haut" && index >= 6) {
            dep -= 6;
        }
        if (this.state.tabDirections[this.noDirection] === "bas" && index <= 29) {
            dep += 6;
        }
        if (this.state.tabDirections[this.noDirection] === "gauche" && index % 6 !== 0) {
            dep--;
        }

        if (this.state.tabDirections[this.noDirection] === "droit" && (Math.floor(index / 6) * 6) + 5 !== index) {
            dep++;
        }

        if (nouveauTabGrille[index + dep] === 2) this.score += 2;
        if (dep === 0) return "perdu";

        nouveauTabGrille[index + dep] = 1;

        this.setState({
            tabGrille: nouveauTabGrille
        })

        let test = nouveauTabGrille.findIndex(x => x === 2);
        if (test === -1) return "gagne";

        return "ok";
    }

    ramassage = () => {
        if (this.noDirection < this.state.tabDirections.length) {

            let resultat = this.deplacement();

            if (resultat === "ok") {
                this.timer = window.setTimeout(this.ramassage, 200);
            }
            else if (resultat === "perdu") {
                this.score -= 5;
                message.error("Perdu", .9, this.reset);
                this.fin = true;
            } else if (resultat == "gagne") {
                this.score += 2;
                if (this.nbEuros < 7) this.nbEuros++;
                this.fin = true;
                message.success("Parfait 😃", .7, this.reset)
            }
            this.noDirection++;
        }
        else {
            this.score -= 5;
            this.fin = true;
            message.error("Perdu", .9, this.reset);

        }

    }
    finTimer = () => {
        window.clearTimeout(this.timer);
        if (this.score < 0) this.score = 0;
        this.setState({ afficheResultat: true });
    }

    render() {

        return <div>
            <Helmet>
                <title>Ramasser le trésor</title>
                <meta name="description" content="Un jeu cognitif pour les enfants et les seniors. Donner les bonnes indications pour que votre personnage ramasse toutes les pièces d'or." />
            </Helmet>
            {this.state.afficheResultat ?
                <Resultat score={this.score} typeExo='vitessetresor'></Resultat> :
                <div>
                    <div className='jeuTresor'>
                      
                        <div className="grilleTresor">
                            <Nombres></Nombres>
                            <Grille tabGrille={this.state.tabGrille} taille={6}></Grille>
                        </div>
                     
                     
                        <Croix ramassage={this.ramassage} clic={this.clic}></Croix>
                    
                    </div>  
                    <div className='infoTresor'>  
                      <Directions tabDirections={this.state.tabDirections} ></Directions>
                    <div className="centre marge10"><CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours></div>
                    <div className='titreJeu'>Ramasser les pièces d'or</div>
                     
                   
                    </div>

                </div>}
        </div>
    }


}
