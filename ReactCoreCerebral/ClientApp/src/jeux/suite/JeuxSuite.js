import React, { Component } from 'react';
import { Button } from 'antd';
import Icone from './Icone';
import LogiqueSuite from './LogiqueSuite'
import '../../style/jeux.css';
import withRouter from '../../components/commun/withRouter';
import { addGame } from '../../components/commun/localStorage';
import ResultatCommunFaute from '../../components/commun/ResultatCommunFaute';
import { analytics } from '../../components/commun/analytics';
import { Helmet } from 'react-helmet';
import FinEtape from '../concours/FinEtape';
import intl from 'react-intl-universal';

class JeuxSuite extends Component {

    constructor(props) {
        super(props);
        this.idTest = parseInt(props.params.id);

        this.logique = new LogiqueSuite(this.idTest);
       

            this.elementEnCours = 0;
            this.tabReponse = this.logique.construireTableauReponse();
            this.tabReponseUtilisateur = Array(this.tabReponse.length).fill(false);
            this.nbFautes = 0;
            this.state =
            {
                fond: "normal",
                afficheResultat: false,
            }
   
            addGame('jeuxSuite', this.idTest);
            analytics();
        

    }
    updateElement = (id) => {
        this.elementEnCours = id;
        this.setState({
            fond: 'normal'
        })
    }

    finElements = () => {
        for (let index = 0; index < this.tabReponse.length; index++) {
            if (this.tabReponseUtilisateur[index] !== this.tabReponse[index]) {
                this.nbFautes++;
            }
        }
     
        this.setState({
            afficheResultat: true
        });
    }
    clickBouton = () => {
        if (this.state.fond === 'normal') {
            if (this.tabReponse[this.elementEnCours]) {
                this.setState({
                    fond: 'clignotantVert'
                });
            }
            else {
                this.setState({
                    fond: 'clignotantRouge'
                });
            }
            this.tabReponseUtilisateur[this.elementEnCours] = true;
        }
    }

    render() {
        return <div>
            <Helmet>
                <title>{intl.get('SUITE_TITLE')}</title>
                <meta name="description" content={intl.get('SUITE_META')} />
                <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxSuite/${this.idTest}`} />
                <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-sequence/${this.idTest}`} />


            </Helmet>
            {this.state.afficheResultat ?  this.logique.concours ? <FinEtape donneesJeu={this.logique.donnees} nbFautes={this.nbFautes}></FinEtape> :<ResultatCommunFaute prochainJeu={this.logique.obtenirProchainJeu()} type='suite' nbFautes={this.nbFautes} idTest={this.idTest}></ResultatCommunFaute> :
               <React.Fragment><h1>{intl.get('SUITE_TITRE')}</h1>
                <div className="gridSuite"><Icone interval={this.logique.donnees.vitesse} tabNombre={this.logique.donnees.tabNombre} fond={this.state.fond} updateElement={this.updateElement} finElements={this.finElements}></Icone>
                    <div className="boutonSuite">
                        <Button type="primary" onClick={this.clickBouton} size='large'>OK</Button>
                    </div>
                    <div className="texteSuite"><p>{intl.get('SUITE_EXPLICATION')}</p>
                    </div>
                </div></React.Fragment>} </div>
    }
}


export default withRouter(JeuxSuite);