
import React, { Component } from 'react'
import withRouter from "../../components/commun/withRouter";
import Reponses from "./Reponses";
import Logique from "./Logique";
import { message } from 'antd';
import ProgressBar from '../../components/commun/ProgressBar';
import FinEtape from '../concours/FinEtape';


class JeuPhoto extends Component {
    constructor(props) {
        super(props);
         this.id = parseInt(props.params.id);
        let logique = new Logique(this.id);
        this.donneesGlobal = logique.obtenirDonnee();
        this.donnee = logique.obtenirDonneeJeu();
        console.log(this.donnee);
        this.temps = 150;
        this.perdu = false;
        this.noQuestion = 0;
        this.fin = false;
        this.state = {
            question: [],
            reponses: [],
            etape: 1,
            photo: logique.obtenirPhoto(),
            afficheResultat: false
        }
    }

    nouvelleQuestion = () => {
        this.fin= false;
        if (this.noQuestion === this.donnee.length) {
            this.setState({ afficheResultat: true })
        }
        else {
            this.setState({
                question: this.donnee[this.noQuestion].question,
                reponses: this.donnee[this.noQuestion].reponses,
                animation: ' texte-animation'
            });
        }

    }

    componentDidMount() {
        this.nouvelleQuestion();
    }

    finJeu = () => {
        this.perdu = true;
        this.setState({ afficheResultat: true })
    }

    clicReponse = (no) => {
        if (this.fin) return; 
         this.fin = true;
        if (no === this.donnee[this.noQuestion].bonneReponse) {
          
            message.success('Bravo', 2, this.nouvelleQuestion)
        }
        else {
            message.error("Ce n'est pas la bonne réponse", 2, this.finJeu)
        }
        this.noQuestion++;
        this.setState({ animation: '' });
    }

    finProgress = () => {
        this.setState({
            etape: 2
        })
    }

    render() {
        return <React.Fragment>
            {this.state.afficheResultat ?
                <FinEtape donneesJeu={this.donneesGlobal} perdu={this.perdu}></FinEtape> :
                <React.Fragment>
                    {this.state.etape === 1 ?
                        <div className='pagePhoto '>
                            <div className="titreJeu">Regarde attentivement la photo</div>
                            <div className='affichePhoto'>
                                <img className="image imagePresentation" src={'/photos/' + this.state.photo} alt='jeu des indices'></img>
                                <ProgressBar temps={this.temps} finTimer={this.finProgress}></ProgressBar>
                            </div>
                        </div> :
                        <div className={'fontMoyenne margeAttente centre ' + this.state.animation}>
                            <div>{this.state.question}</div>
                            <div className='margeAttente'><Reponses clicReponse={this.clicReponse} reponses={this.state.reponses}></Reponses></div>
                        </div>}
                </React.Fragment>}
        </React.Fragment>
    }
}

export default withRouter(JeuPhoto);