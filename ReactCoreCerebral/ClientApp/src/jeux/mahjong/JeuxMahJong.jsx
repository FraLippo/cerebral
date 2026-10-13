import React, { Component } from 'react';
import GrilleJoueur from './GrilleJoueur';
import LogiqueMah from './LogiqueMah';
import { message } from 'antd';
import CompteRebours from '../../components/commun/CompteRebours';
import ResultatCommun from '../../components/commun/ResultatCommun';
import withRouter from '../../components/commun/withRouter';

import { addGame } from '../../components/commun/localStorage';
import FinEtape from '../concours/FinEtape';
import { Helmet } from 'react-helmet';


class JeuxMah extends Component {

    constructor(props) {
        super();
        this.id = parseInt(props.params.id);
        this.logique = new LogiqueMah(this.id);
       
            this.dureeJeu = Date.now();
            this.tabOrigine = this.logique.obtenirGrille();
            this.state = {
                grille: this.tabOrigine,
                afficheErreur: false,
                afficheResultat: false,
                afficheRebours: true
            }
            this.perdu = false;
            this.reponseEnCours = false;
     
            addGame('jeuxmahjong', this.id);
       
        
    }
    afficheResultat = () => {
        this.setState({ afficheResultat: true });
        this.reponseEnCours = false;
    }

    clickImage = (no) => {
        if (!this.reponseEnCours) {
            let nouveauTableau = [...this.state.grille];

            const result = LogiqueMah.testResultat(nouveauTableau[no], nouveauTableau);

            if (result === "ok") {
                message.success("Bravo !", 1.2, this.afficheResultat);
                nouveauTableau[no] = -1;
                this.perdu = false;

            }
            if (result === "erreur") {
                message.error("Erreur. Ce n'est pas la bonne tuile.", 1.2, this.afficheResultat);
                this.perdu = true;
            }
            this.reponseEnCours = true;
            this.dureeJeu = Date.now() - this.dureeJeu;
            this.setState({ grille: nouveauTableau, afficheRebours: false });
        }
    }


    finTimer = () => {
        if (!this.reponseEnCours) {
            this.perdu = true;
            this.setState({ afficheResultat: true });
        }
    }

    render() {
    

        return <React.Fragment>
            <Helmet>
                <title>{"Jeu entrainement cérébral : retrouvez la tuile solitaire"}</title>
                <meta name="description" content={"Améliorez votre capacité de réaction en trouvant l'élément solitaire  le plus vite possible"} />
  

            </Helmet>
            <div> {this.state.afficheResultat ?
                this.logique.concours ? <FinEtape donneesJeu={this.logique.donnees} perdu={this.perdu}></FinEtape> : <ResultatCommun dureeMax={this.logique.obtenirTemps()} perdu={this.perdu} type='mahJong' prochainJeu={this.logique.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu}></ResultatCommun> :
                <div className="espaceJeuMah"><div className="joueurMah"><GrilleJoueur grille={this.state.grille} taille={this.logique.obtenirTaille()} clickImage={this.clickImage}></GrilleJoueur></div>
                    <div className="infoFamille">
                        <h1 className="couleurTitre espaceHaut">{"Retrouvez le solitaire"}</h1>
                        <p>{"Cliquez sur la tuile solitaire."}</p>
                        {this.state.afficheRebours && <div className="centre"><CompteRebours temps={this.logique.obtenirTemps()} finTimer={this.finTimer}></CompteRebours></div>}

                    </div>
                </div>}</div>
        </React.Fragment>


    }
}
export default withRouter(JeuxMah);