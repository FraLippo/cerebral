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
    
            <ClassementScore typeExo={this.type}></ClassementScore>
            <Ad></Ad>
        </div>

    }
}

export default withRouter(Classement);