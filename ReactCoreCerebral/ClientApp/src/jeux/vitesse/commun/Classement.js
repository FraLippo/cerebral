import React, { Component } from 'react';
import withRouter from '../../../components/commun/withRouter';
import ClassementScore from './ClassementScore';
import ButtonLink from '../../../components/commun/ButtonLink';
import Ad from '../../../components/commun/adSense';
import { Helmet } from 'react-helmet';
import { moisEnFrancais} from '../../../components/commun/utilitaire';
import { nomType } from './utilitaire';

class Classement extends Component {

    constructor(props) {
        super(props);
        this.type = props.params.type;
        const d = new Date();
        this.nomMois = moisEnFrancais[d.getMonth()];

    }






    render() {
        return <div>
            <Helmet>
                <title>Les classements des jeux cérébraux</title>
                <meta name="description" content="Le classement des 20 premiers pour tous les jeux d'entrainement cérébral." />

            </Helmet>

            <h1>Le Classement du mois  {this.nomMois === 'août' || this.nomMois === 'avril' || this.nomMois === 'octobre' ? "d'" + this.nomMois : 'de ' + this.nomMois} </h1>
            <p>Classement des 20 meilleurs scores du mois en cours pour le jeu  <b>{nomType()}</b>. Le classement repart à 0 en début de chaque mois.</p>
            <div className="marge20 centre"><ButtonLink titre="Retour à l'accueil" href={'/'}></ButtonLink></div>
            <Ad></Ad>
            <ClassementScore typeExo={this.type}></ClassementScore>
        </div>

    }
}

export default withRouter(Classement);