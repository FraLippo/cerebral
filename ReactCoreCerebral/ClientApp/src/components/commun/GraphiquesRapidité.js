
import React, { Component } from 'react';
import { verifierStatus } from '../../jeux/vitesse/commun/utilitaire';
import { readFirstName } from '../commun/localStorage';
import Podium from '../../jeux/vitesse/commun/Podium';
import { Progress } from 'antd';
import border from '../../images/border.png';

export default class GraphiqueRapidite extends Component {

    constructor() {
        super();
        this.prenom = '';

        this.state =
        {
            resultatsJoueur: [],
            tabPrenoms: [],
            pourcent: 0,
            message: ''

        }
        this.max = 0;

    }


    infoCatégorie() {
        let message = '';
       
        if (this.props.categorie === 'm') {

            this.max = 500;
            message = 'Ta capacité de mémorisation est : '
        } else if (this.props.categorie === 'l') {
            this.max = 400;
            message = 'Ton habilité verbale est ';
        }
        else if (this.props.categorie === 'p') {
            this.max = 450;
            message = 'Ta capacité de planification est ';
        }
        else if (this.props.categorie === 'c') {
            this.max = 320;
            message = 'Ta capacité de calcul est ';
        }
        else if (this.props.categorie === 'r') {
            this.max = 750;
            message = 'Ta capacité de concentration est ';
        }
        else if (this.props.categorie === 'd') {
            this.max = 150;
            message = 'Ton aptitude culturelle est ';
        }
        this.setState({
            message
        });

    }

    componentDidMount = () => {
        this.infoCatégorie();

        let prenom = readFirstName();
        if (prenom !== null) {
            this.prenom = prenom.includes('@') ? prenom.split('@')[0] : prenom;
        }
        this.envoyerMessage(prenom);
    }



    async envoyerMessage(prenom) {
        let url = new URL(process.env.REACT_APP_URL_RAPIDITECATEGORIE);
        var data = new FormData();
        data.append('categorie', this.props.categorie);
        data.append('prenom', prenom);

        const reponse = await fetch(url, {
            method: "POST",
            body: data
        })
        if (!verifierStatus(reponse.status)) {
            return;
        }
        if (reponse.ok) {
            const res = await reponse.json();

            let tabPrenoms = res.classementCategorie.map(x => x.prenom);
            const sum = Object.values(res.resultatsJoueur).reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            let pourcent = (sum / this.max) * 100;
            if (pourcent > 100) pourcent = 100;

          
        
            this.props.recupererResultatJoueur(prenom, res.resultatsJoueur);
            this.setState({
                tabPrenoms,
                pourcent

            })

        }
        else {
            alert("Désolé, il y a un problème.")
            window.location.href = "/"
        }

    }

    msgResultat() {
        if (this.state.pourcent < 25) return 'Faible';
        else if (this.state.pourcent < 50) return 'Satisfaisante';
        else if (this.state.pourcent < 75) return 'Bonne';
        else if (this.state.pourcent < 100) return 'Excellente';
        else if (this.state.pourcent = 100) return 'Exceptionnelle';
    }

    render() {
        return <div>
            <div className='centre'>Tu dois participer à tous les jeux sur cette page pour avoir une évaluation correcte.</div>
            <div className='plateauMonnaie marge20'>
                <Progress
                    type="circle"
                    percent={this.state.pourcent}
                    showInfo={false}
                    trailColor="rgba(0, 0, 0, 0.06)"
                    strokeColor="#ff8d25"
                    strokeWidth={20}
                />
            </div>

            <div className='centre'>
                {this.prenom !== '' && !this.prenom.includes('inconnu')&& <div className='fontMoyenne rougeV'>{this.prenom}</div>}
                <div className='fontMoyenne'>{this.state.message}  </div>
                <div className='fontMoyenne'><b>{this.msgResultat()}</b> </div>
                <div className="centre marge20"><img src={border} alt="bordure" width="100" height="41" ></img></div>


                <Podium tabPrenoms={this.state.tabPrenoms}></Podium>
                <div className='centre'></div>
                Le podium du mois en cours pour cette catégorie
            </div>




        </div>
    }
}