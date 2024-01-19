import React, { Component } from 'react';

import Resultat from '../commun/Resultat';
import Nombre from './Nombre';

import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';






export default class JeuNombre extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            finJeu: false,
            afficheRebours : false
        }  
    }



   
    render() {

        return (<div>
            <Helmet>
                <title>Se souvenir des nombres</title>
                <meta name="description" content="Vous devez vous souvenir des nombres affichés" />
            </Helmet>
            
            {!this.state.finJeu ? <React.Fragment>
                <div className="fontMoyenne couleurTitre">Se souvenir des nombres</div><div ><div className="centre">
                <Nombre nombre={1098}></Nombre>




                {this.state.afficheRebours && <CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours>}</div></div>
            </React.Fragment> : <Resultat  typeExo='vitesseordre'></Resultat>}
        </div>)
    }

}

