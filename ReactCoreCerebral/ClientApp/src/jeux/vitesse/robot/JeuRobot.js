import React, { Component } from 'react';
import Grille from './Grille';
import Vaisseau from './Vaisseau';
import { Button } from 'antd';
import Directions from './Directions'


export default class JeuRobot extends Component {

    constructor() {
        super();
        let tabGrille = [[0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1],
        [0, 0, , 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0]]
        this.positionDepart = { x: 3, y: 3 };
        this.state = {
            tabGrille,
            position: this.positionDepart,
            rotationVaisseau: 1,
            tabDirections: []

        }
        this.depEnCours = 0;
    }

    avanceDroite = () => {
        window.setTimeout(() => {
            if (this.state.position.x + 1 < this.state.tabGrille[0].length && this.state.tabGrille[this.state.position.y][this.state.position.x + 1] === 1) {
       
                this.setState({
                    position: { x: this.state.position.x + 1, y: this.state.position.y }
                }, this.avanceDroite())
            }
            else {
                this.finMouvement();
            }
        }, 125)
    }

    avanceGauche = () => {
        window.setTimeout(() => {
            if (this.state.position.x - 1 >= 0 && this.state.tabGrille[this.state.position.y][this.state.position.x - 1] === 1) {
       
                this.setState({
                    position: { x: this.state.position.x - 1, y: this.state.position.y }
                }, this.avanceGauche())
            }
            else {
                this.finMouvement();
            }
        }, 125)
    }

    avanceBas = () => {
        window.setTimeout(() => {
            if (this.state.position.y - 1 >= 0 && this.state.tabGrille[this.state.position.y - 1][this.state.position.x] === 1) {
      
                this.setState({
                    position: {
                        x: this.state.position.x, y: this.state.position.y - 1
                    }
                }, this.avanceBas())
            }
            else {
                this.finMouvement();
            }
        }, 125)
    }
    avanceHaut = () => {
        window.setTimeout(() => {
            if (this.state.position.y + 1 < this.state.tabGrille.length && this.state.tabGrille[this.state.position.y + 1][this.state.position.x] === 1) {
        
                this.setState({
                    position: {
                        x: this.state.position.x, y: this.state.position.y + 1
                    }
                }, this.avanceHaut())
            }
            else {
                this.finMouvement();
            }
        }, 125)
    }

    clic = () => {
       this.finMouvement();
    }
    finMouvement = () => {
        if (this.depEnCours < this.state.tabDirections.length) {
            let nouveauTabDirections = [...this.state.tabDirections];
            let dep = nouveauTabDirections[this.depEnCours].no;
       
            for (let index = 0; index < nouveauTabDirections.length; index++) {
            nouveauTabDirections[index].etat = 'repos'
         }
         console.log(nouveauTabDirections)
          nouveauTabDirections[this.depEnCours].etat = 'actif';
        
          this.setState({tabDirections: nouveauTabDirections});
       
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
    }
    tourneHoraire = () => {
        this.setState({
            rotationVaisseau: this.state.rotationVaisseau === 3 ? 0 : this.state.rotationVaisseau + 1
        });
        window.setTimeout(() => {
            this.finMouvement();
        }, 200);

    }

    tourneAntiHoraire = () => {
        this.setState({
            rotationVaisseau: this.state.rotationVaisseau === 0 ? 3 : this.state.rotationVaisseau - 1
        })
        window.setTimeout(() => {
            this.finMouvement();
        }, 200);
    }

    ajoutDirection = (no) => {
        let nouveauTabDirections = [...this.state.tabDirections];
        nouveauTabDirections.push({etat : 'repos' , no});
        this.setState({ tabDirections: nouveauTabDirections });

    }

    reset = () =>
    {
        this.setState({ tabDirections: [],
            position :this.positionDepart
         });
         this.depEnCours = 0;
    }

    render() {
        return <div><h1>Le jeu du robot</h1>
            <div className='centreGrilleRobot'>
                <div className='grilleRobot'>
                    <Grille tabGrille={this.state.tabGrille}></Grille>
                    <Vaisseau position={this.state.position} rotationVaisseau={this.state.rotationVaisseau}></Vaisseau>
                </div>
                <Directions ajoutDirection={this.ajoutDirection} reset={this.reset} tabDirections={this.state.tabDirections}></Directions>
                <Button onClick={this.clic}>Départ</Button>
                <Button onClick={this.tourneHoraire}>Fait tourner horaire</Button>
                <Button onClick={this.tourneAntiHoraire}>Fait tourner antihoraire</Button>
            </div>

        </div>
    }
}