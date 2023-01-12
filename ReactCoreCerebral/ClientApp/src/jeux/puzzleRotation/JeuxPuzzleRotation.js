import React, { Component } from 'react';
import Image from './Image';
import LogiquePuzzleRotation from './LogiquePuzzleRotation';
import ResultatCommun from '../../components/commun/ResultatCommun';
import withRouter from '../../components/commun/withRouter';
import { analytics } from '../../components/commun/analytics';
import { Helmet } from 'react-helmet';
import { addGame } from '../../components/commun/localStorage';
import CompteRebours from '../../components/commun/CompteRebours';
import FinEtape from '../concours/FinEtape';
import { message } from 'antd';
import intl from 'react-intl-universal';



class JeuxPuzzleRotation extends Component {

    constructor(props) {
        super(props);


        this.id = parseInt(props.params.id);
        this.logiquePuzzleRotation = new LogiquePuzzleRotation(this.id);

        this.donneesJeu = this.logiquePuzzleRotation.obtenirInfo();
        this.taille = this.logiquePuzzleRotation.obtenirTaille();
        this.explication = this.logiquePuzzleRotation.obtenirExplication();
        this.temps =  this.logiquePuzzleRotation.obtenirTemps();
        this.tabRotation = this.donneesJeu.map(cellule => cellule.rotation);
        this.perdu = false;
        this.state = {
            afficheResultat: false,
            afficheRebours : true
        }
        this.dureeJeu = Date.now();

        addGame('jeuxPuzzleRotation', this.id);
        analytics();
       
    }


    augmenterRotation = (id) => {
        const noRotation = this.tabRotation[id] + 1;
        if (noRotation === 4) {
            this.tabRotation[id] = 0;
        }
        else {
            this.tabRotation[id]++;
        }
        return noRotation;


    }

    verifierFin = () => {
        let fin = true;
        for (const item of this.tabRotation) {
            if (item !== 0) {
                fin = false;
                break;
            }
        }

        if (fin) {
            this.setState({ afficheRebours : false });
            message.success(intl.get('BRAVO'), 1.5, this.afficheResultat);
            this.dureeJeu = Date.now() - this.dureeJeu;
        }

    }
    afficheResultat = () => {
        this.setState({
            afficheResultat: true
        })
    }

    
    finJeu = () => {
        this.dureeJeu = this.logiquePuzzleRotation.obtenirTemps();
        this.perdu = true;
        this.setState({ afficheResultat: true });
    }

    render() {
        return <div className="espaceHaut">
            <Helmet>
                <title>{intl.get('ROTATION_TITLE')}</title>
                <meta name="description" content={intl.get('ROTATION_META')} />
                <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxPuzzleRotation/${this.id}`} />
                <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-rotate/${this.id}`} />


            </Helmet>

            <div> {this.state.afficheResultat ?  this.logiquePuzzleRotation.concours ? <FinEtape donneesJeu={this.logiquePuzzleRotation.donnees} perdu={this.perdu}></FinEtape> :<ResultatCommun perdu={this.perdu} prochainJeu={this.logiquePuzzleRotation.obtenirProchainJeu()} type='puzzleRotation' idTest={this.id} dureeJeu={this.dureeJeu} dureeMax={this.temps}></ResultatCommun> :
                <div className="main"><div className="container">

                    {this.donneesJeu.map(cellule => <Image key={cellule.position} verifierFin={this.verifierFin} augmenterRotation={this.augmenterRotation} taille={this.taille} nomImage={cellule.nomImage} position={cellule.position} rotation={cellule.rotation}></Image>)}


                </div><div className="espaceHaut lienFinal">{`${intl.get('ROTATION_PUZZLE')}  ${intl.get(this.explication)}`}</div>
                <div className="centre">{this.state.afficheRebours &&<CompteRebours temps={this.temps} finTimer={this.finJeu}></CompteRebours>}</div></div>}</div></div>
    }
}


export default withRouter(JeuxPuzzleRotation);
