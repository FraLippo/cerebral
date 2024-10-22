import React, { Component } from 'react';
import { constructionEmplacement } from './utilitaire';
import drapeauRobot from '../../../images/drapeauRobot.png';
import { Button } from 'antd';

export default class CreationGrilleRobot extends Component {

    constructor() {
        super();
        let tabGrille = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]

        this.positionDepart = { x: 3, y: 3 };
        this.state = {
            tabGrille,
            etat: 'grille',
            tabDrapeau: []


        }
    }

    clic = (x, y) => {
        if (this.state.etat === 'grille') {
            let nouveauTabGrille = [...this.state.tabGrille];
            nouveauTabGrille[x][y] = nouveauTabGrille[x][y] === 1 ? 0 : 1;
            this.setState({ tabGrille: nouveauTabGrille });
        }
        if (this.state.etat === 'drapeau') {
            let nouveauTabDrapeau = [...this.state.tabDrapeau];
            let trouve = null;
            console.log(nouveauTabDrapeau)
            for (let index = 0; index < nouveauTabDrapeau.length; index++) {
                console.log(nouveauTabDrapeau[index])
                if (nouveauTabDrapeau[index].x === x && nouveauTabDrapeau[index].y === y) {
                    trouve = index;
                }
            }
            if (trouve != null) {
                nouveauTabDrapeau.splice(trouve, 1);
            }
            else {
                nouveauTabDrapeau.push({ x, y });
            }
            this.setState({ tabDrapeau: nouveauTabDrapeau });
        }
    }

    ajouterDrapeau = () => {
        this.setState({ etat: 'drapeau' });

    }
    creerGrille = () => {
        this.setState({ etat: 'grille' });

    }

    render() {
        return <div className='centreGrilleRobot'>
            <div className='grilleRobot'>
                {this.state.tabGrille.map((ligne, x) =>
                    ligne.map((lacase, y) =>
                        <div onClick={() => this.clic(x, y)} key={(x * ligne.length) + y} style={constructionEmplacement(x, y)} className={'caseGrilleRobot ' + (lacase === 1 ? 'caseGrilleRobotPlein' : '')}></div>))
                }

                {this.state.tabDrapeau.map((info, i) => <div onClick={() => this.clic(info.x, info.y)} key={i + 400} style={constructionEmplacement(info.x, info.y)}><img src={drapeauRobot} alt="drapeauRobot"></img></div>)}

            </div>
            <Button onClick={this.ajouterDrapeau}>Ajouter Drapeau</Button>
            <Button onClick={this.creerGrille}>Créer grille</Button>
            <p>{this.state.etat}</p>
        </div>
    }
}