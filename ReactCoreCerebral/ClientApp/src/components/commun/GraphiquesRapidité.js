
import React, { Component } from 'react';
import { verifierStatus, obtenirInfoCategorie, creerMsgResultat, lienVersCategorie } from '../../jeux/vitesse/commun/utilitaire';
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
            tabPodium: [],
            pourcent: 0,
            message: ''

        }
        this.max = 0;

    }


    infoCatégorie() {

        const r = obtenirInfoCategorie(this.props.categorie)
        this.max = r.max;

        this.setState({
            message: r.message
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

    getFractions(value) {
        return [
            value,
            Math.round(value * 3 / 4),
            Math.round(value * 1 / 2),
            Math.round(value * 1 / 4),
           0
        ];
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

            let tabPodium = res.classementCategorie;

            const sum = Object.values(res.resultatsJoueur).reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            let pourcent = (sum / this.max) * 100;
            if (pourcent > 100) pourcent = 100;
            let tabQuart = this.getFractions(this.max);
            let difference = 0;
         
            for (let i = 0; i < tabQuart.length-1; i++) {
              
                if (sum < tabQuart[i] && sum >= tabQuart[i+1]) {
                    
                    difference = tabQuart[i] - sum;
                  
                    break;
                }

            }

            this.props.recupererResultatJoueur(prenom, res.resultatsJoueur);
            this.setState({
                tabPodium,
                pourcent,
                difference,
                 classementJoueur : res.classementJoueur,
                scoreJoueur : res.scoreJoueur


            })

        }
        else {
            alert("Désolé, il y a un problème.")
            window.location.href = "/"
        }

    }


    render() {
        return <div>
             <h1 className='centre'>{`Résultats ${lienVersCategorie(this.props.categorie, 'nom')}`}</h1>
            {this.state.scoreJoueur === 0  && <div className='centre'>Tu n'as participé à aucun jeu dans cette catégorie.</div>}  
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
                {this.prenom !== '' && !this.prenom.includes('inconnu') && <div className='fontMoyenne rougeV'>{this.prenom}</div>}
                             <div className='fontMoyenne'>{this.state.message}  </div>   <div className='fontMoyenne'><b>{creerMsgResultat(this.state.pourcent)}</b> </div>

                     {this.state.scoreJoueur > 0  && <div className='marge20'>Ton score dans cette catégorie :  <strong>{this.state.scoreJoueur}</strong></div>}
            {this.state.scoreJoueur > 0  && <div>Ton classement du mois : {this.state.classementJoueur}</div>}
                {this.state.pourcent !== 100 && <div className="marge20">Tu dois marquer {this.state.difference} points pour atteindre le niveau suivant.</div>}
                <div className="centre marge20"><img src={border} alt="bordure" width="100" height="20" ></img></div>


                <Podium tabPodium={this.state.tabPodium} ></Podium>
                <div className='centre'></div>
                Le podium du mois en cours pour cette catégorie
            </div>




        </div>
    }
}