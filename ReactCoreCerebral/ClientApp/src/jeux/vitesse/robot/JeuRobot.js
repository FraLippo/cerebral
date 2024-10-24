import React, { Component } from 'react';
import Grille from './Grille';
import Vaisseau from './Vaisseau';
import { Button, message } from 'antd';
import Directions from './Directions'
import Drapeaux from './Drapeaux';
import { tabDonnees } from './data';
import Resultat from '../commun/Resultat';
import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';


const NBJEUXTOTAL = 5;
export default class JeuRobot extends Component {

    constructor() {
        super();
        let tabGrille = [[0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1],
        [0, 0, , 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0]]
        this.fin = false;
        this.noJeu = 0;
        this.niveauxJeux = this.creerNiveaux();
        console.log(this.niveauxJeux);
        this.state = {
            tabGrille: this.niveauxJeux[this.noJeu].tabGrille,
            position: this.niveauxJeux[this.noJeu].positionDepart,
            rotationVaisseau: this.niveauxJeux[this.noJeu].rotation,
            tabDrapeaux: this.niveauxJeux[this.noJeu].tabDrapeaux,
            tabDirections: [],
            afficheResultat: false,
            score : 0

        }
        this.depEnCours = 0;
    }

    creerNiveaux() {
        let tabRange = [{ min: 0, max: 12 }, { min: 12, max: 14 }];
        let tabNiveauComplet = [];
        // let { min, max } = { ...tabRange[1] }
        // let m0 = 100, m1 = 0;
        // for (let index = 0; index < 1000; index++) {
        //       let nbHasard = Math.floor((Math.random() * max) + min);
        //     if (nbHasard < m0)
        //     {
        //         m0 = nbHasard
        //     }
        //     if (nbHasard > m1)
        //     {
        //         m1 = nbHasard
        //     }

        // }
    //   console.log("MAx " + m1);
    //   console.log("Min " + m0);
        let tabNiveau = [];
        for (let index = 0; index < NBJEUXTOTAL; index++) {
            let range = 0;
            if (index > 1) range = 1;
            let { min, max } = { ...tabRange[range] }
            let nbHasard = 0;
            do {
                nbHasard = Math.floor((Math.random() * max) + min);
            } while (tabNiveau.findIndex(x => x === nbHasard) !== -1);
            tabNiveau[index] = nbHasard;
        }
       
      for (let j = 0; j < NBJEUXTOTAL; j++) {
             tabNiveauComplet.push(tabDonnees[tabNiveau[j]]);
    //        tabNiveauComplet.push(tabDonnees[25]);
        }
        console.log(tabNiveauComplet);
        return tabNiveauComplet;


    }
    prochainNiveau = () => {
        this.fin = false;
        this.depEnCours = 0;
        this.noJeu++;
        if (this.noJeu >= NBJEUXTOTAL)
        {
            this.setState({
               score : this.state.score + 70
    
            });
            this.setState({afficheResultat : true});
        }
        else
        {
        this.setState({
            tabGrille: this.niveauxJeux[this.noJeu].tabGrille,
            position: this.niveauxJeux[this.noJeu].positionDepart,
            rotationVaisseau: this.niveauxJeux[this.noJeu].rotation,
            tabDrapeaux: this.niveauxJeux[this.noJeu].tabDrapeaux,
            tabDirections: []

        });
    }

    }

    verifierDrapeaux = () => {

        let index = this.state.tabDrapeaux.findIndex(coord => coord.x === this.state.position.x && coord.y === this.state.position.y)
        if (index !== -1) {
            let nouveauTabDrapeaux = [...this.state.tabDrapeaux];
            nouveauTabDrapeaux.splice(index, 1);
            this.setState({ tabDrapeaux: nouveauTabDrapeaux,
                score : this.state.score + 20
             });
            if (nouveauTabDrapeaux.length === 0) {
                this.fin = true;
                message.success("Bravo, tu as réussi", this.prochainNiveau);
            }
        }
    }

    avanceDroite = () => {
        this.verifierDrapeaux();

        window.setTimeout(() => {
            if (this.state.position.x + 1 < this.state.tabGrille[0].length && this.state.tabGrille[this.state.position.x + 1][this.state.position.y] === 1) {

                this.setState({
                    position: { x: this.state.position.x + 1, y: this.state.position.y }
                }, this.avanceDroite())
            }
            else {
                this.mouvement();
            }
        }, 125)
    }

    avanceGauche = () => {
        this.verifierDrapeaux();
        window.setTimeout(() => {
            if (this.state.position.x - 1 >= 0 && this.state.tabGrille[this.state.position.x - 1][this.state.position.y] === 1) {

                this.setState({
                    position: { x: this.state.position.x - 1, y: this.state.position.y }
                }, this.avanceGauche())
            }
            else {
                this.mouvement();
            }
        }, 125)
    }

    avanceBas = () => {
        this.verifierDrapeaux();
        window.setTimeout(() => {
            if (this.state.position.y - 1 >= 0 && this.state.tabGrille[this.state.position.x][this.state.position.y - 1] === 1) {

                this.setState({
                    position: {
                        x: this.state.position.x, y: this.state.position.y - 1
                    }
                }, this.avanceBas())
            }
            else {
                this.mouvement();
            }
        }, 125)
    }
    avanceHaut = () => {
        this.verifierDrapeaux();
        window.setTimeout(() => {
            if (this.state.position.y + 1 < this.state.tabGrille.length && this.state.tabGrille[this.state.position.x][this.state.position.y + 1] === 1) {

                this.setState({
                    position: {
                        x: this.state.position.x, y: this.state.position.y + 1
                    }
                }, this.avanceHaut())
            }
            else {
                this.mouvement();
            }
        }, 125)
    }

    clic = () => {
        if (this.depEnCours > 0) return;
       
       this.mouvement();
    
    }
    mouvement = () => {
        this.verifierDrapeaux();
        if (this.depEnCours < this.state.tabDirections.length) {
            let nouveauTabDirections = [...this.state.tabDirections];
            let dep = nouveauTabDirections[this.depEnCours].no;

            for (let index = 0; index < nouveauTabDirections.length; index++) {
                nouveauTabDirections[index].etat = 'repos'
            }

            nouveauTabDirections[this.depEnCours].etat = 'actif';

            this.setState({ tabDirections: nouveauTabDirections });

            if (dep === 1) {
                if (this.state.rotationVaisseau === 1) {
                    this.avanceDroite();
                }
                if (this.state.rotationVaisseau === 3) {
                    this.avanceGauche();
                }
                if (this.state.rotationVaisseau === 2) {
                    this.avanceHaut();
                }
                if (this.state.rotationVaisseau === 0) {
                    this.avanceBas();
                }
            }
            if (dep === 2) {
                this.tourneHoraire();
            }
            if (dep === 3) {
                this.tourneAntiHoraire();
            }

            this.depEnCours++;
        }
        else {
            if (!this.fin) {
                message.error("Erreur. Tu peux recommencer.", this.reset);
                this.depEnCours = 0;
                
            }
        }
    }
    tourneHoraire = () => {
        this.setState({
            rotationVaisseau: this.state.rotationVaisseau === 3 ? 0 : this.state.rotationVaisseau + 1
        });
        window.setTimeout(() => {
            this.mouvement();
        }, 200);

    }

    tourneAntiHoraire = () => {
        this.setState({
            rotationVaisseau: this.state.rotationVaisseau === 0 ? 3 : this.state.rotationVaisseau - 1
        })
        window.setTimeout(() => {
            this.mouvement();
        }, 200);
    }

    ajoutDirection = (no) => {
        if (this.depEnCours > 0) return;
        let nouveauTabDirections = [...this.state.tabDirections];
        nouveauTabDirections.push({ etat: 'repos', no });
        this.setState({ tabDirections: nouveauTabDirections });

    }


    reset = () => {
        if (this.depEnCours > 0) return;
        this.fin = false;
       
        this.setState({
            tabDirections: [],
            position: this.niveauxJeux[this.noJeu].positionDepart,
            rotationVaisseau: this.niveauxJeux[this.noJeu].rotation,
            tabDrapeaux: this.niveauxJeux[this.noJeu].tabDrapeaux,

        });
        this.depEnCours = 0;
    }

    finTimer = () =>
        {
            this.setState({afficheResultat : true});
        }

    render() {
        return <div>
            <Helmet>
                <title>Le jeu de la fusée</title>
                <meta name="description" content="Donne des instructions à une fusée dans un labyrinthe pour qu'il rammase tous les drapeaux." />

            </Helmet>
            {this.state.afficheResultat ?
                <Resultat score={this.state.score} typeExo='vitessefusee'></Resultat> :
            <div className='centreGrilleRobot noInteraction'>
                <div className='grilleRobot'>
                    <Grille tabGrille={this.state.tabGrille}></Grille>
                    <Vaisseau position={this.state.position} rotationVaisseau={this.state.rotationVaisseau}></Vaisseau>
                    <Drapeaux tabDrapeaux={this.state.tabDrapeaux}></Drapeaux>
                </div>
                <div className="espaceHaut"><Button type="primary" onClick={this.clic}>Départ</Button></div>
                <Directions ajoutDirection={this.ajoutDirection} reset={this.reset} tabDirections={this.state.tabDirections}></Directions>
<div className='espaceHaut'>Score : {this.state.score}</div>
<div className="marge20"> <CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
<h1>Le jeu de la fusée</h1>
<p>La fusée doit récupérer les drapeaux. Tu peux donner des instructions à la fusée avant son départ. La flèche ⬆️ permet de faire avancer la fusée dans la direction du nez de la fusée. Les autres flèches permettent de tourner la fusée d'un quart de tour. À chaque fois que la fusée rencontre un obstacle, elle s'arrête et tu peux la faire tourner.</p>
            </div>
    }
        </div>
    }
}