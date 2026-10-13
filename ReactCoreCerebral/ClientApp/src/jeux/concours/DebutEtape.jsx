import React, { Component } from 'react';
import donneesConcoursCerebral from '../../data/donneesConcoursCerebral';
import donneesConcoursCalcul from '../../data/donneesConcoursCalcul';
import donneesConcoursMot from '../../data/donneesConcoursMot';
import ButtonLink from '../../components/commun/ButtonLink';
import { prochainObjectif, imageJeu, titreJeu, creerEtape } from './logiqueConcours';
import { Steps } from 'antd';

import { Helmet } from 'react-helmet';
import withRouter from '../../components/commun/withRouter';
import { readGameContest, addGameContest } from '../../components/commun/localStorage';

let donneesConcours = [...donneesConcoursCerebral,...donneesConcoursCalcul,...donneesConcoursMot];



class DebutEtape extends Component {

    constructor(props) {
        super();
        this.erreur = false;
        const no = parseInt(props.params.no);
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
        return this.erreur ? <div className="centre"><ButtonLink titre={"Désolé, il y a un problème."} href={'/'}></ButtonLink></div> : <div>
              <Helmet>
                <title>{this.concours.titre}</title>
            </Helmet>
            <div className="centre"><h1 className="couleurTitre">{this.concours.titre}</h1>
            <p>{"Il te reste"} {this.concours.liste.length - this.noEtape} {this.concours.liste.length - this.noEtape === 1 ? "étape" : "étapes"} {"pour réussir le défi."}</p>
            <p className="margeHaut">{"Prochain test :"} <b>{titreJeu(this.jeu.titre)}</b></p>
            <p><ButtonLink titre={"Commencer le jeu"} href={'/' + this.jeu.type + '/' + this.jeu.id}></ButtonLink></p>
            <p>{"Objectif prochain test :"} <b>{prochainObjectif(this.jeu.id)}</b></p>
            {imageJeu(this.jeu.titre)}
        </div>
            <div className="margeStep">
                
            
                <Steps current={this.noEtape} items={creerEtape(this.concours.liste)}>
                   
                </Steps>

          

            </div>
            <p className="centre">{"Votre progression est automatiquement sauvegardée."}</p>
        </div>

    }
}

export default withRouter(DebutEtape);

