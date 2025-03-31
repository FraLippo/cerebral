import React, { Component } from 'react';
import { constructionEmplacement } from './utilitaire';
import drapeauRobot from '../../../images/drapeauRobot.png';
import { Button } from 'antd';
import vaisseauD from '../../../images/vaisseauD.png';
import vaisseauG from '../../../images/vaisseauG.png';
import vaisseauB from '../../../images/vaisseauB.png';
import vaisseauH from '../../../images/vaisseauH.png';
import { json } from 'react-router-dom';

export default class CreationGrilleRobot extends Component {

    constructor() {
        super();
        let tabGrille = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
        this.state = {
            tabGrille,
            etat: 'grille',
            tabDrapeau: [],
            positionDepart: { x: -1, y: -1, r:1 }
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

            for (let index = 0; index < nouveauTabDrapeau.length; index++) {
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
  
        if (this.state.etat === 'vaisseau') {
        
       
            if (x === -2 && y === -2) {
                let r = this.state.positionDepart.r === 3 ? 0 : this.state.positionDepart.r+1;
                this.setState({ positionDepart: { x: this.state.positionDepart.x, y : this.state.positionDepart.y,r } })
            }
            else
            {
                this.setState({ positionDepart: { x, y,r :1 } })
            }
        }

    }

    ajouterDrapeau = () => {
        this.setState({ etat: 'drapeau' });

    }
    creerGrille = () => {
        this.setState({ etat: 'grille' });

    }

    ajouterVaisseau = () => {
        this.setState({ etat: 'vaisseau' });
    }

    rotationVaisseau()
    {
        switch (this.state.positionDepart.r)
        {
            case 0 :
                return vaisseauH;
            case 1:
                return vaisseauD;
                case 2 :
                return vaisseauB;
            case 3:
                return vaisseauG;
            
        }
    }

    creerDonnees()
    {
        return '{</br>tabGrille : ' +  JSON.stringify(this.state.tabGrille) + ',</br>'+ 
        'tabDrapeaux : ' + JSON.stringify(this.state.tabDrapeau) + ',</br>' +
        'positionDepart : {x : ' + this.state.positionDepart.x + ',y : ' + this.state.positionDepart.y + '},</br>'+
        'rotation : ' + this.state.positionDepart.r + '</br>' +
        '}';
    }

    render() {
        return <div className='centreGrilleRobot'>
            <div className='grilleRobot'>
                {this.state.tabGrille.map((ligne, x) =>
                    ligne.map((lacase, y) =>
                        <div onClick={() => this.clic(x, y)} key={(x * ligne.length) + y} style={constructionEmplacement(x, y)} className={'caseGrilleRobot ' + (lacase === 1 ? 'caseGrilleRobotPlein' : '')}></div>))
                }

                {this.state.tabDrapeau.map((info, i) => <div onClick={() => this.clic(info.x, info.y)} key={i + 400} style={constructionEmplacement(info.x, info.y)}><img src={drapeauRobot} alt="drapeauRobot"></img></div>)}
                {this.state.positionDepart.x !== -1 && <div className='caseRobot' onClick={() => this.clic(-2,-2)} style={constructionEmplacement(this.state.positionDepart.x, this.state.positionDepart.y)}><img src={this.rotationVaisseau()} alt="vaisseau"></img></div>}
            </div>
            <Button onClick={this.ajouterDrapeau}>Ajouter Drapeau</Button>
            <Button onClick={this.ajouterVaisseau}>Ajouter Vaisseau</Button>
            <Button onClick={this.creerGrille}>Créer grille</Button>
            <p>{this.state.etat}</p>
            <p dangerouslySetInnerHTML={{__html: this.creerDonnees()}}></p>
        </div>
    }
}