import React, { Component } from 'react';
import donneesConcoursCerebral from '../../data/donneesConcoursCerebral';
import donneesConcoursCalcul from '../../data/donneesConcoursCalcul';
import donneesConcoursMot from '../../data/donneesConcoursMot';
import ButtonLink from '../../components/commun/ButtonLink';
import { prochainObjectif, imageJeu, titreJeu } from './logiqueConcours';
import { Steps } from 'antd';
import intl from 'react-intl-universal';

import { Helmet } from 'react-helmet';
import { readGameContest, addGameContest } from '../../components/commun/localStorage';
const { Step } = Steps;
let donneesConcours = [...donneesConcoursCerebral,...donneesConcoursCalcul,...donneesConcoursMot];



export default class DebutEtape extends Component {

    constructor(props) {
        super();
        this.erreur = false;
        const no = parseInt(props.match.params.no);
        this.concours = donneesConcours.find(x => x.id === no);
        if (this.concours == null) this.erreur = true;
        else {

            this.noEtape = parseInt(readGameContest(this.concours.id));
            if (this.noEtape === -1) {
                addGameContest(this.concours.id, 0);
                this.noEtape = 0;
            }
            this.jeu = this.concours.liste[this.noEtape];
    
        }
    }


    render() {
        return this.erreur ? <div className="centre"><ButtonLink titre={intl.get('DEFI_PB')} href={'/'}></ButtonLink></div> : <div>
              <Helmet>
                <title>{intl.get(this.concours.titre)}</title>
            </Helmet>
            <div className="centre"><h1 className="couleurTitre">{intl.get(this.concours.titre)}</h1>
            <p>{intl.get('DEFI_RESTE')} {this.concours.liste.length - this.noEtape} {this.concours.liste.length - this.noEtape === 1 ? intl.get('DEFI_ETAPE') : intl.get('DEFI_ETAPES')} {intl.get('DEFI_REUSSIR')}</p>
            <p className="margeHaut">{intl.get('DEFI_PROCHAIN')} <b>{titreJeu(this.jeu.titre)}</b></p>
            <p><ButtonLink titre={intl.get('DEFI_DEBUT')} href={'/' + intl.get(this.jeu.type) + '/' + this.jeu.id}></ButtonLink></p>
            <p>{intl.get('DEFI_OBJECTIF')} <b>{prochainObjectif(this.jeu.id)}</b></p>
            {imageJeu(this.jeu.titre)}
        </div>
            <div className="margeStep">
                <Steps current={this.noEtape} >
                    {this.concours.liste.map((jeu, i) => <Step key={i} title={titreJeu(jeu.titre)}></Step>)}
                    <Step title={intl.get('DEFI_FIN')}></Step>
                </Steps>

            </div>
            <p className="centre">{intl.get('DEFI_PROGRESSION')}</p>
        </div>

    }
}

