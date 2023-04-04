import React, { Component } from 'react';
import withRouter from '../../../components/commun/withRouter';
import ClassementScore from '../../../components/commun/ClassementScore';
import ButtonLink from '../../../components/commun/ButtonLink';

class Classement extends Component {

    constructor(props) {
        super(props);
        this.type = props.params.type;
    
        }

   
        nomType = () => {
            switch (this.type) {
                case "vitesseCouleur":
                    return "Reconnaissance des couleurs";
            }
        }
   

   

    render() {
        return <div><h1>Le Classement</h1>
        <p>Classement des 20 meilleurs scores du mois en cours pour le jeu de <b>{this.nomType()}</b></p>
        <div className="marge20 centre"><ButtonLink titre="Retour à l'accueil" href={'/'}></ButtonLink></div>
        <ClassementScore typeExo={this.type}></ClassementScore>
</div>

    }
}

export default withRouter(Classement);