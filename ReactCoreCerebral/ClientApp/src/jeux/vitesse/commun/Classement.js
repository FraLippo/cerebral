import React, { Component } from 'react';
import withRouter from '../../../components/commun/withRouter';
import ClassementScore from '../../../components/commun/ClassementScore';
import ButtonLink from '../../../components/commun/ButtonLink';
import Ad from '../../../components/commun/adSense';
import { Helmet } from 'react-helmet';

class Classement extends Component {

    constructor(props) {
        super(props);
        this.type = props.params.type;

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
                return "supprimer les images différentes";
            case "vitessePaire":
                return "Se souvenir de l'image précedente";
            case "vitesseCalcul":
                return "La grille de calcul mental";
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
            
            <h1>Le Classement</h1>
            <p>Classement des 20 meilleurs scores des 30 derniers jours pour le jeu de <b>{this.nomType()}</b></p>
            <div className="marge20 centre"><ButtonLink titre="Retour à l'accueil" href={'/'}></ButtonLink></div>
          <Ad></Ad>
            <ClassementScore typeExo={this.type}></ClassementScore>
        </div>

    }
}

export default withRouter(Classement);