import React, { Component } from 'react';
import withRouter from '../../../components/commun/withRouter';
import ClassementScore from './ClassementScore';
import ButtonLink from '../../../components/commun/ButtonLink';
import Ad from '../../../components/commun/adSense';
import { Helmet } from 'react-helmet';
import { moisEnFrancais } from '../../../components/commun/utilitaire';

class Classement extends Component {

    constructor(props) {
        super(props);
        this.type = props.params.type;
        const d = new Date();
        this.nomMois = moisEnFrancais[d.getMonth()];

    }


    nomType = () => {
        switch (this.type) {
            case "vitesseCouleur":
                return "Reconnaissance des couleurs";
            case "vitesseSolitaire":
                return "La tuile solitaire";
            case "vitesseOrdre":
                return "Les nombres en ordre";
            case "vitesseIntrus":
                return "Supprimer les images différentes";
            case "vitessePaire":
                return "Se souvenir de l'image précedente";
            case "vitesseCalcul":
                return "La grille de calcul mental";
            case "vitesseOperation":
                return "Les 4 opérations";
                case "vitesseChemin":
                    return "Retrouver son chemin";
            default:
                return "";
        }
    }




    render() {
        return <div>
            <Helmet>
                <title>Les classements des jeux cérébraux</title>
                <meta name="description" content="Le classement des 20 premiers pour tous les jeux d'entrainement cérébral." />

            </Helmet>

            <h1>Le Classement du mois  {this.nomMois === 'août' || this.nomMois === 'avril' || this.nomMois === 'octobre' ? "d'" + this.nomMois : 'de ' + this.nomMois} </h1>
            <p>Classement des 20 meilleurs scores du mois en cours pour le jeu  <b>{this.nomType()}</b>. Le classement repart à 0 en début de chaque mois.</p>
            <div className="marge20 centre"><ButtonLink titre="Retour à l'accueil" href={'/'}></ButtonLink></div>
            <Ad></Ad>
            <ClassementScore typeExo={this.type}></ClassementScore>
        </div>

    }
}

export default withRouter(Classement);