import React, { Component } from 'react';
import Grille from './Grille';
import Vaisseau from './Vaisseau';
import { Button } from 'antd';

export default class JeuRobot extends Component {

    constructor() {
        super();
        let tabGrille = [[0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1],
        [0, 0, , 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0]]
        this.state = {
            tabGrille,
            position: { x: 3, y: 3 },
            rotationVaisseau: 1

        }
    }

    avanceDroite = () => {
        console.log('ff')
        window.setTimeout(() => {
            if (this.state.position.x + 1 < this.state.tabGrille[0].length && this.state.tabGrille[this.state.position.y][this.state.position.x + 1] === 1) {
                console.log(this.state.position)
                this.setState({
                    position: { x: this.state.position.x + 1, y: this.state.position.y }
                }, this.avanceDroite())
            }
        }, 100)
    }

    avanceGauche = () => {
        window.setTimeout(() => {
            if (this.state.position.x - 1 >= 0 && this.state.tabGrille[this.state.position.y][this.state.position.x - 1] === 1) {
                console.log(this.state.position)
                this.setState({
                    position: { x: this.state.position.x - 1, y: this.state.position.y }
                }, this.avanceGauche())
            }
        }, 100)
    }

    avanceBas = () => {
        window.setTimeout(() => {
            if (this.state.position.y - 1 >= 0 && this.state.tabGrille[this.state.position.y - 1][this.state.position.x] === 1) {
                console.log(this.state.position)
                this.setState({
                    position: { x: this.state.position.x, y: this.state.position.y-1
                     }
                }, this.avanceBas())
            }
        }, 100)
    }
    avanceHaut = () => {
        window.setTimeout(() => {
            if (this.state.position.y + 1 < this.state.tabGrille.length && this.state.tabGrille[this.state.position.y + 1][this.state.position.x] === 1) {
                console.log(this.state.position)
                this.setState({
                    position: { x: this.state.position.x, y: this.state.position.y+1
                     }
                }, this.avanceHaut())
            }
        }, 100)
    }

    clic = () => {
        if (this.state.rotationVaisseau === 1)
        {
            this.avanceDroite();
        }
        if (this.state.rotationVaisseau === 3)
            {
                this.avanceGauche();
            }
            if (this.state.rotationVaisseau === 2)
                {
                    this.avanceHaut();
                }
                if (this.state.rotationVaisseau === 0)
                    {
                        this.avanceBas();
                    }
    }

    tourneHoraire = () => {
        this.setState({
            rotationVaisseau: this.state.rotationVaisseau === 3 ? 0 : this.state.rotationVaisseau + 1
        })
    }

    tourneAntiHoraire = () => {
        this.setState({
            rotationVaisseau: this.state.rotationVaisseau === 0 ? 3 : this.state.rotationVaisseau - 1
        })
    }
    render() {
        return <div><h1>Le jeu du robot</h1>
            <div className='centreGrilleRobot'>
                <div className='grilleRobot'>
                    <Grille tabGrille={this.state.tabGrille}></Grille>
                    <Vaisseau position={this.state.position} rotationVaisseau={this.state.rotationVaisseau}></Vaisseau>
                </div>
                <Button onClick={this.clic}>Départ</Button>
                <Button onClick={this.tourneHoraire}>Fait tourner horaire</Button>
                <Button onClick={this.tourneAntiHoraire}>Fait tourner antihoraire</Button>
            </div>

        </div>
    }
}