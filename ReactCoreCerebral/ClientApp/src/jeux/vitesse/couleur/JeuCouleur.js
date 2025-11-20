import React, { Component } from 'react';
import '../../../style/vitesse.css';
import Logique from './Logique';
import withRouter from  '../../../components/commun/withRouter';
import { Button} from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';



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
            afficheFin : false,
            fond : ''
        }
    
    }
    componentDidMount() {
        // ajout gestion clavier Y/N
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        // suppression écouteur et nettoyage timer
        window.removeEventListener('keydown', this.handleKeyDown);
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }

    handleKeyDown = (e) => {
        if (this.state.afficheFin) return;
        const k = (e.key || '').toLowerCase();
        if (k === 'v') {
            // vrai
            this.clickVrai();
        } else if (k === 'f') {
            // faux
            this.clickFaux();
        }
    }

    nouveauTirage = () => {
        
        let donnee = this.logique.tirageAusort();
        this.resultat = donnee.resultat;
        this.setState({
            motHaut: donnee.motHaut,
            motBas: donnee.motBas,
            couleurBas: donnee.couleurBas,
            fond : Math.floor(Math.random()*3)
        }) 
    }

    debutTimer = () => {
        window.clearTimeout(this.timer);
         this.timer = window.setTimeout(() => {
            this.setState({resultat: ""})}, 1000);
    }
    clickVrai = () => {
        let resultat = this.resultat ? "Oui" : "Non";
        let score = this.resultat ? this.state.score + 2 : this.state.score - 2;
        if (score < 0) score = 0;
        this.setState({resultat: resultat, score});
       this.debutTimer();
       this.nouveauTirage();

    }

    clickFaux = () => {
        let resultat = this.resultat ? "Non" : "Oui";
        let score = this.resultat ? this.state.score - 2 : this.state.score + 2;
            if (score < 0) score = 0;
        this.setState({resultat: resultat, score});
        this.debutTimer();
        this.nouveauTirage();
    }

    finTimer = () => {
        this.setState({afficheFin: true});
          window.removeEventListener('keydown', this.handleKeyDown);
    }
   

    render() {
 
       
   
        return <React.Fragment> <Helmet>
                    <title>Le jeu des couleurs</title>
                    <meta name="description" content="Un jeu simple à comprendre mais difficile à mettre en pratique pour entrainer son cerveau à reconnaitre les couleurs. " />
                </Helmet>
            {this.state.afficheFin ? <Resultat score={this.state.score} typeExo='vitessecouleur'></Resultat>:<React.Fragment><div className="jeuCouleur"><div>Le mot dans la case du bas est <b>écrit</b> en :</div>
        <div className="caseCouleur">{this.state.motHaut}</div>
        <div className={"marge20 caseCouleur " + this.state.couleurBas + (this.state.score >= 15 ? " caseCouleur" + this.state.fond : "" )}><b>{this.state.motBas}</b></div>
        <div className={"reponseCouleur grandeLettre " + (this.state.resultat === 'Non' ? "lettreRougeor" : "")}>{this.state.resultat}</div>
        <div className="marge20"><Button type="primary" className="fontMoyenne" size="large" onClick={this.clickVrai}>Vrai</Button><Button size="large" type="primary" className="fontMoyenne margeGauche10" onClick={this.clickFaux}>Faux</Button></div>
        <div className='marge20 centre'>Score : {this.state.score}
        <div className="centre"><CompteRebours finTimer={this.finTimer} temps={40}></CompteRebours></div>
        <div className='centre'>Tu peux aussi utiliser les touches v (vrai) ou f (faux) de ton clavier.</div>
        </div>
        </div></React.Fragment>}</React.Fragment>
    }
}


export default withRouter(JeuCouleur);