import React, { Component } from 'react';
import '../../../style/vitesse.css';
import Logique from './Logique';
import withRouter from  '../../../components/commun/withRouter';
import { Button} from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';

class JeuCouleur extends Component {

    constructor(props) {
        super(props);
        this.logique = new Logique();
        let donnee = this.logique.tirageAusort();
        this.resultat = donnee.resultat;
        this.timer = null;
        this.state = {
            motHaut: donnee.motHaut,
            motBas: donnee.motBas,
            couleurBas: donnee.couleurBas,
            resultat: '',
            score: 0,
            afficheFin : false
        } 
    }

    nouveauTirage = () => {
        let donnee = this.logique.tirageAusort();
        this.resultat = donnee.resultat;
        this.setState({
            motHaut: donnee.motHaut,
            motBas: donnee.motBas,
            couleurBas: donnee.couleurBas,
        }) 
    }

    debutTimer = () => {
        window.clearTimeout(this.timer);
         this.timer = window.setTimeout(() => {
            this.setState({resultat: ""})}, 1000);
    }
    clickVrai = () => {
        let resultat = this.resultat ? "Oui" : "Non";
        let score = this.resultat ? this.state.score + 1 : this.state.score - 1;

        this.setState({resultat: resultat, score});
       this.debutTimer();
       this.nouveauTirage();

    }

    clickFaux = () => {
        let resultat = this.resultat ? "Non" : "Oui";
        let score = this.resultat ? this.state.score - 1 : this.state.score + 1;
        this.setState({resultat: resultat, score});
        this.debutTimer();
        this.nouveauTirage();
    }

    finTimer = () => {
        this.setState({afficheFin: true});
    }
   

    render() {
        return <React.Fragment>{this.state.afficheFin ? <Resultat score={this.state.score} typeExo='vitesseCouleur'></Resultat>:<React.Fragment><div>Score : {this.state.score}
        <div className="compteReboursVitesse"><CompteRebours finTimer={this.finTimer} temps={3}></CompteRebours></div>
        </div><div className="jeuCouleur"><div>Le mot dans la case du bas est <b>écrit</b> en :</div>
        <div className="caseCouleur">{this.state.motHaut}</div>
        <div className={"marge20 caseCouleur " + this.state.couleurBas + (this.state.score >= 15 ? " caseCouleur2" : "" )}><b>{this.state.motBas}</b></div>
        <div className="reponseCouleur grandeLettre">{this.state.resultat}</div>
        <div className="marge20"><Button type="primary" className="fontMoyenne" size="large" onClick={this.clickVrai}>Vrai</Button><Button size="large" type="primary" className="fontMoyenne margeGauche10" onClick={this.clickFaux}>Faux</Button></div>
        
        </div></React.Fragment>}</React.Fragment>
    }
}


export default withRouter(JeuCouleur);